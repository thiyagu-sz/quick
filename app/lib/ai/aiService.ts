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
  initialRetryDelay: 1000, // 1s as requested
};

const FALLBACK_MODELS = [
  CONFIG.AI.FALLBACK_MODEL,
  'meta-llama/llama-3-8b-instruct:free',
  'google/gemini-2.0-flash-001'
];

/**
 * ⚠️ SERVERLESS LIMITATION: This semaphore is in-memory.
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
 * Central AI Service Layer (OpenRouter / AI Agnostic)
 */
export class AiService {
  /**
   * Returns a user-friendly error message
   */
  private static getSafeUserMessage(error: any): string {
    const message = error?.message || '';
    const status = error?.status || 0;

    // Internal Logging
    console.error("AI API ERROR:", {
      status,
      message,
      name: error.name,
      timestamp: new Date().toISOString()
    });

    if (error.name === 'AbortError' || message.includes('timeout')) {
      return "The AI model is currently busy. Please try again in a moment.";
    }
    
    if (status === 429 || message.includes('rate limit')) {
      return "The AI model is currently busy. Please try again in a moment.";
    }

    if (status === 401 || status === 403 || message.includes('auth') || message.includes('key')) {
      return "Our AI service is temporarily unavailable.";
    }

    return "Our AI service is temporarily unavailable. Please try again shortly.";
  }

  /**
   * Centralized AI Request Handler with Retry & Fallback
   */
  static async safeAIRequest(
    messages: { role: string; content: string }[],
    options: Partial<AiConfig> = {},
    isStreaming: boolean = false
  ): Promise<any> {
    const config = { ...DEFAULT_CONFIG, ...options };
    
    // API Key Validation
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("[AiService] OPENROUTER_API_KEY is missing");
      throw new Error("API key missing");
    }

    let lastError: any = null;
    const modelsToTry = [config.model, ...FALLBACK_MODELS.filter(m => m !== config.model)];

    // Concurrency Protection
    await globalSemaphore.acquire();

    try {
      for (const currentModel of modelsToTry) {
        let retryDelay = config.initialRetryDelay;

        for (let attempt = 0; attempt <= config.retryAttempts; attempt++) {
          const abortController = new AbortController();
          const timeoutId = setTimeout(() => abortController.abort(), config.timeout);

          try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://quicknotes.ai", // Required by OpenRouter
                "X-Title": "QuickNotes",
              },
              signal: abortController.signal,
              body: JSON.stringify({
                model: currentModel,
                messages,
                max_tokens: config.maxTokens,
                temperature: config.temperature,
                stream: isStreaming,
              }),
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              const error = new Error(errorData.error?.message || `Request failed with status ${response.status}`);
              (error as any).status = response.status;
              throw error;
            }

            // SUCCESS!
            if (isStreaming) {
              return response.body;
            } else {
              const data = await response.json();
              return data.choices?.[0]?.message?.content || "";
            }

          } catch (error: any) {
            clearTimeout(timeoutId);
            lastError = error;

            // Retry Logic: Only retry on network errors, timeouts, or rate limits
            const isRetryable = 
              error.name === 'AbortError' || 
              error.status === 429 || 
              error.status >= 500 ||
              error.message.includes('fetch');

            if (isRetryable && attempt < config.retryAttempts) {
              console.warn(`[AiService] Attempt ${attempt + 1} failed for ${currentModel}. Retrying in ${retryDelay}ms...`);
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              retryDelay *= 2; // Exponential Backoff: 1s -> 2s -> 4s
              continue;
            }

            // If not retryable or max attempts reached for this model, break and try next model
            break;
          }
        }
      }

      // If we reach here, all models and retries failed
      throw lastError;

    } finally {
      globalSemaphore.release();
    }
  }

  /**
   * Generates embeddings for text (OpenAI)
   */
  static async generateEmbedding(text: string): Promise<number[]> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    
    const generateFallbackEmbedding = (inputText: string): number[] => {
      const hash = inputText.split('').reduce((acc, char) => {
        const hash = ((acc << 5) - acc) + char.charCodeAt(0);
        return hash & hash;
      }, 0);
      return new Array(384).fill(0).map((_, i) => Math.sin((hash + i) * 0.1) * 0.1);
    };
    
    if (!apiKey || apiKey === '' || apiKey === 'your_openai_api_key_here') {
      return generateFallbackEmbedding(text);
    }

    let retryDelay = 1000;
    for (let attempt = 0; attempt <= 2; attempt++) {
      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: text,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return data.data?.[0]?.embedding || generateFallbackEmbedding(text);
        }

        if (response.status === 429 && attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2;
          continue;
        }

        break;
      } catch (error) {
        if (attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2;
          continue;
        }
      }
    }

    return generateFallbackEmbedding(text);
  }

  /**
   * Generates a streaming chat response
   */
  static async streamChat(
    messages: { role: string; content: string }[],
    config: Partial<AiConfig> = {}
  ): Promise<ReadableStream> {
    const encoder = new TextEncoder();
    
    try {
      const body = await this.safeAIRequest(messages, config, true);
      if (!body) throw new Error("No response body");

      return new ReadableStream({
        async start(controller) {
          const reader = body.getReader();
          const decoder = new TextDecoder();
          let lineBuffer = "";

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              lineBuffer += decoder.decode(value, { stream: true });
              const lines = lineBuffer.split("\n");
              lineBuffer = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || trimmed === "data: [DONE]") continue;

                if (trimmed.startsWith("data: ")) {
                  try {
                    const data = JSON.parse(trimmed.slice(6));
                    const content = data.choices?.[0]?.delta?.content;
                    if (content) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                    }
                  } catch (e) {
                    // Ignore malformed JSON chunks
                  }
                }
              }
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        }
      });

    } catch (error: any) {
      return new ReadableStream({
        start(controller) {
          const safeMessage = AiService.getSafeUserMessage(error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: safeMessage })}\n\n`));
          controller.close();
        }
      });
    }
  }

  /**
   * Non-streaming completion
   */
  static async complete(
    messages: { role: string; content: string }[],
    config: Partial<AiConfig> = {}
  ): Promise<string> {
    try {
      return await this.safeAIRequest(messages, config, false);
    } catch (error: any) {
      throw new AppError(AiService.getSafeUserMessage(error), 500, 'AI_ERROR', error);
    }
  }
}
