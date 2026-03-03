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
  'gemini-2.0-flash',
  'gemini-flash-latest',
  'gemini-2.0-flash-lite',
  'gemini-pro-latest'
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

    if (error.name === 'AbortError' || message.includes('timeout')) {
      return "Our AI service is temporarily busy. Please retry.";
    }
    
    if (status === 429 || message.includes('rate limit') || message.includes('quota')) {
      return "We're currently optimizing our AI engine due to high demand. Please try again shortly.";
    }

    if (status === 401 || message.includes('auth') || message.includes('key')) {
      return "AI service authentication error. Please contact support.";
    }

    return "We've encountered a temporary hiccup. Please try again in a moment.";
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
                const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
                if (!apiKey) throw new Error('GOOGLE_GEMINI_API_KEY is not configured');

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

                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;

                  const chunk = decoder.decode(value);
                  const lines = chunk.split('\n');

                  for (const line of lines) {
                    if (line.startsWith('data: ')) {
                      const dataStr = line.slice(6);
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
          const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
          if (!apiKey) throw new Error('GOOGLE_GEMINI_API_KEY is not configured');

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
