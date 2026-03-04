import { CONFIG } from '../config';
import { AppError } from '../errors/errorHandler';

/**
 * AI Service configuration
 */
export interface AiConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  timeout: number;
  concurrencyLimit: number;
  retryAttempts: number;
  initialRetryDelay: number;
}

const DEFAULT_CONFIG: AiConfig = {
  model: CONFIG.AI.DEFAULT_MODEL,
  maxTokens: CONFIG.AI.MAX_TOKENS,
  temperature: CONFIG.AI.TEMPERATURE,
  timeout: CONFIG.AI.TIMEOUT,
  concurrencyLimit: CONFIG.AI.CONCURRENCY_LIMIT,
  retryAttempts: CONFIG.AI.RETRY_ATTEMPTS,
  initialRetryDelay: 500,
};

// Fallback models if primary is busy
const FALLBACK_MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.5-flash-8b',
  'gemini-1.5-flash-latest'
];

/**
 * ⚠️ SERVERLESS LIMITATION: This semaphore is in-memory.
 * On Vercel, concurrent requests may run in separate instances.
 * This only limits concurrency within a single warm instance.
 * For true cross-instance limits, migrate to Upstash Redis:
 * https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */
class Semaphore {
  private count: number;
  private queue: Array<() => void> = [];

  constructor(limit: number) {
    this.count = limit;
  }

  async acquire(): Promise<void> {
    if (this.count > 0) {
      this.count--;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) next();
    } else {
      this.count++;
    }
  }
}

const globalSemaphore = new Semaphore(DEFAULT_CONFIG.concurrencyLimit);

/**
 * Central AI Service Layer (Native Google Gemini)
 */
export class AiService {
  /**
   * Returns a user-friendly error message based on the internal error
   */
  private static getSafeUserMessage(error: any): string {
    const message = error?.message || '';
    const status = parseInt(message.match(/\((\d+)\)/)?.[1] || '0');

    // 🚀 LOG FULL ERROR FOR DEVELOPER (Visible in server console)
    console.error(`[AiService] AI Call Error Context:`, {
      status,
      message,
      name: error.name,
      timestamp: new Date().toISOString()
    });

    if (error.name === 'AbortError' || message.includes('timeout')) {
      return "Our AI service is temporarily busy. Please retry.";
    }
    
    if (status === 429 || message.includes('rate limit') || message.includes('quota')) {
      return "We're currently optimizing our AI engine due to high demand. Please try again shortly.";
    }

    if (status === 401 || status === 403 || message.includes('auth') || message.includes('key') || message.includes('permission')) {
      return "AI service authentication error. Your API key might be invalid or not authorized for this model. Please contact support.";
    }

    if (status === 400) {
      return "The AI engine received an invalid request. This could be due to safety filters or context length. Try a different question.";
    }

    return "We've encountered a temporary hiccup. Please try again or check if Generative Language API is enabled in your Google Cloud project.";
  }

  /**
   * Maps standard messages to Google Gemini format
   */
  private static mapToGemini(messages: { role: string; content: string }[]) {
    // Separate system message if present
    const systemMessage = messages.find(m => m.role === 'system');
    const chatMessages = messages.filter(m => m.role !== 'system');

    return {
      contents: chatMessages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      system_instruction: systemMessage ? {
        parts: [{ text: systemMessage.content }]
      } : undefined
    };
  }

  /**
   * Generates a streaming chat response with concurrency control, timeout, and retries.
   * Includes 🚀 PROFESSIONAL MODEL FALLBACK strategy
   */
  static async streamChat(
    messages: { role: string; content: string }[],
    config: Partial<AiConfig> = {}
  ): Promise<ReadableStream> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    
    return new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const startTime = Date.now();
        
        try {
          await globalSemaphore.acquire();
          
          let lastError: any = null;
          let retryDelay = finalConfig.initialRetryDelay;
          
          // Try primary model first, then fall back on 429/Busy errors
          const modelsToTry = [finalConfig.model, ...FALLBACK_MODELS.filter(m => m !== finalConfig.model)];

          for (const currentModel of modelsToTry) {
            for (let attempt = 0; attempt <= finalConfig.retryAttempts; attempt++) {
              const abortController = new AbortController();
              const timeoutId = setTimeout(() => abortController.abort(), finalConfig.timeout);

              try {
                const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
                if (!apiKey) {
                  console.error('[AiService] GOOGLE_GENERATIVE_AI_API_KEY is missing from process.env');
                  throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured');
                }
                
                // Debug log (masked)
                console.log(`[AiService] Using API Key: ${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 3)}`);

                // Extract model name from currentModel
                const modelName = currentModel.includes('/') 
                  ? currentModel.split('/').pop() 
                  : currentModel;

                const geminiPayload = AiService.mapToGemini(messages);

                const response = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: abortController.signal,
                    body: JSON.stringify({
                      ...geminiPayload,
                      generationConfig: {
                        maxOutputTokens: finalConfig.maxTokens,
                        temperature: finalConfig.temperature,
                      },
                    }),
                  }
                );

                clearTimeout(timeoutId);

                if (!response.ok) {
                  const errorData = await response.text();
                  const errorStatus = response.status;
                  console.error(`[AiService] Gemini API error (${errorStatus}):`, errorData);
                  
                  // If rate limited or service busy, try next model or retry
                  if (errorStatus === 429 || errorStatus === 503) {
                    console.warn(`[AiService] Model ${currentModel} rate limited (${errorStatus}).`);
                    throw new Error(`Gemini API error (${errorStatus}): ${errorData}`);
                  }
                  
                  throw new Error(`Gemini API error (${errorStatus}): ${errorData}`);
                }

                if (!response.body) throw new Error('No response body from AI');

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let lineBuffer = '';

                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;

                  const chunk = decoder.decode(value, { stream: true });
                  lineBuffer += chunk;
                  
                  const lines = lineBuffer.split('\n');
                  lineBuffer = lines.pop() || ''; // Keep the last incomplete line in the buffer

                  for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('data: ')) {
                      const dataStr = trimmedLine.slice(6);
                      try {
                        const parsed = JSON.parse(dataStr);
                        const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (content) {
                          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                        }
                      } catch (e) {}
                    }
                  }
                }

                console.log(`[AiService] Success using ${currentModel} on attempt ${attempt + 1}`);
                controller.close();
                return; // 🚀 COMPLETE SUCCESS

              } catch (error: any) {
                clearTimeout(timeoutId);
                lastError = error;
                const status = parseInt(error.message.match(/\((\d+)\)/)?.[1] || '0');

                // Logic for next attempt or next model
                if (status === 429 || status === 503 || error.name === 'AbortError') {
                  if (attempt < finalConfig.retryAttempts) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    retryDelay *= 2;
                    continue; // Retry SAME model
                  }
                  // If all retries failed for THIS model, the loop moves to next model in modelsToTry
                } else {
                  // Fatal error (401, 400), don't bother retrying or falling back
                  throw error;
                }
              }
            }
          }

          // If we exhaust all models
          throw lastError;

        } catch (error: any) {
          console.error('[AiService] Fatal error in streamChat:', error);
          const safeMessage = AiService.getSafeUserMessage(error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: safeMessage })}\n\n`));
          controller.close();
        } finally {
          globalSemaphore.release();
        }
      }
    });
  }

  /**
   * Non-streaming completion
   */
  static async complete(
    messages: { role: string; content: string }[],
    config: Partial<AiConfig> = {}
  ): Promise<string> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    await globalSemaphore.acquire();
    const startTime = Date.now();

    try {
      let lastError: any = null;
      let retryDelay = finalConfig.initialRetryDelay;

      for (let attempt = 0; attempt <= finalConfig.retryAttempts; attempt++) {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), finalConfig.timeout);

        try {
          const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
          if (!apiKey) throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured');

          const modelName = finalConfig.model.includes('/') 
            ? finalConfig.model.split('/').pop() 
            : finalConfig.model;

          const geminiPayload = AiService.mapToGemini(messages);

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              signal: abortController.signal,
              body: JSON.stringify({
                ...geminiPayload,
                generationConfig: {
                  maxOutputTokens: finalConfig.maxTokens,
                  temperature: finalConfig.temperature,
                },
              }),
            }
          );

          clearTimeout(timeoutId);

          if (!response.ok) {
            const errorData = await response.text();
            console.error(`[AiService] Gemini API error (${response.status}):`, errorData);
            throw new Error(`Gemini API error (${response.status}): ${errorData}`);
          }

          const data = await response.json();
          const duration = Date.now() - startTime;
          console.log(JSON.stringify({
            type: 'AI_CALL_METRICS',
            model: finalConfig.model,
            duration,
            status: 'success',
            attempt: attempt + 1
          }));
          
          return data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        } catch (error: any) {
          clearTimeout(timeoutId);
          lastError = error;
          if (attempt < finalConfig.retryAttempts) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            retryDelay *= 2;
            continue;
          }
        }
      }
      throw lastError;
    } catch (error: any) {
      const duration = Date.now() - startTime;
      console.error(JSON.stringify({
        type: 'AI_CALL_METRICS',
        model: finalConfig.model,
        duration,
        status: 'error',
        error: error.message
      }));
      throw new AppError(AiService.getSafeUserMessage(error), 500, 'AI_ERROR', error);
    } finally {
      globalSemaphore.release();
    }
  }
}
