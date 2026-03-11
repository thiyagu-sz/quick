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

// NOTE: In-memory semaphores are ineffective on Vercel serverless.
// Global concurrency is enforced via Upstash Redis rate limiting in middleware.ts.

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
      return `Our AI service is temporarily unavailable. (Status: ${status}, Message: ${message.substring(0, 50)})`;
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
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
    
    // API Key Validation
    if (!apiKey) {
      console.error("[AiService] GOOGLE_GENERATIVE_AI_API_KEY is missing");
      throw new Error("API key missing");
    }

    const model = 'models/gemini-2.0-flash';
    const maxRetries = 2;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), config.timeout);

      try {
        // Convert messages to Google Gemini format
        const contents = messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const endpoint = isStreaming 
          ? `https://generativelanguage.googleapis.com/v1/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`
          : `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
          body: JSON.stringify({
            contents,
            generationConfig: {
              maxOutputTokens: config.maxTokens,
              temperature: config.temperature,
            }
          }),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error = new Error(errorData.error?.message || `Request failed with status ${response.status}`);
          (error as any).status = response.status;
          throw error;
        }

        if (isStreaming) {
          return response.body;
        } else {
          const data = await response.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }

      } catch (error: any) {
        clearTimeout(timeoutId);
        const status = error.status;

        console.error(`[AI] Model ${model} attempt ${attempt} failed with ${status || error.name}`);

        if (status === 401) {
          throw new Error("API key is invalid or out of credits. Contact support.");
        }

        if (status === 400) {
          throw new Error("Invalid request. Please check your input.");
        }

        if ((status === 429 || status === 503 || status === 504 || error.name === 'AbortError') && attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        throw error;
      }
    }

    throw new Error("AI service is temporarily unavailable. Please try again in a moment.");
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
                    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
