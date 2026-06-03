import { OpenRouterGateway } from './openrouterGateway';
import { GeminiGateway } from './geminiGateway';
import { CONFIG } from '../config';
import { AppError } from '../errors/errorHandler';

// Route to Gemini when the model name is a Gemini model and the API key is present.
function isGeminiModel(model: string) {
  return model.startsWith('gemini') || model.startsWith('google/gemini');
}
function useGemini(model: string) {
  return isGeminiModel(model) && !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;
}

// Every embedding in this system is 384-dimensional so it fits the
// document_chunks.embedding VECTOR(384) column and the match_documents(vector(384))
// RPC. The OpenAI path requests dimensions:384; the fallbacks are 384-dim too.
// Changing this requires changing the DB column and the SQL function in lockstep.
const EMBEDDING_DIMENSIONS = 384;

// ── Gemini transient-failure retry ───────────────────────────────────────────
// The Gemini gateway has no built-in retry/fallback (unlike OpenRouter). Wrap its
// calls so transient 429/500/502/503 are retried with exponential backoff + jitter
// (max 2 retries). 400/401/403 are NOT retried.
const RETRYABLE_GEMINI_STATUS = new Set([429, 500, 502, 503]);

function geminiStatusFromError(err: any): number | null {
  // GeminiGateway throws Error('Gemini <status>: ...') — parse the EXACT status
  // token (no loose substring match), so e.g. a "25000ms" timeout is never read
  // as a 500.
  const m = /Gemini (\d{3})\b/.exec(err?.message ?? '');
  return m ? parseInt(m[1], 10) : null;
}

async function withGeminiRetry<T>(label: string, fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  let lastErr: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;
      const status = geminiStatusFromError(err);
      const retryable = status !== null && RETRYABLE_GEMINI_STATUS.has(status);
      if (!retryable || attempt === maxRetries) throw err; // 400/401/403/non-Gemini → no retry
      const base = Math.pow(2, attempt) * 500; // 500ms, then 1000ms
      const delay = base + Math.floor(Math.random() * base * 0.5); // + jitter
      console.warn(`[AiService] ${label}: Gemini ${status} — retry ${attempt + 1}/${maxRetries} in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

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
  initialRetryDelay: 1000,
};

/**
 * Metadata attached to all requests for observability
 */
interface RequestMetadata {
  userId: string;
  feature: 'chat' | 'notes' | 'upload' | 'embedding';
  conversationId?: string;
  environment: string | undefined;
}

/**
 * Central AI Service Layer via Cloudflare AI Gateway
 * Cloudflare handles: retries, failover, caching, rate limiting, analytics
 */
export class AiService {
  /**
   * Returns a user-friendly error message
   */
  private static getSafeUserMessage(error: any): string {
    const message = error?.message || '';
    const status = error?.status || 0;

    if (error?.name === 'AbortError' || message.includes('timeout')) {
      return 'The AI model is currently busy. Please try again in a moment.';
    }

    if (status === 429 || message.includes('rate limit')) {
      return 'The AI service is temporarily busy. Please try again shortly.';
    }

    if (status === 401 || status === 403 || message.includes('auth') || message.includes('key')) {
      return 'Our AI service is temporarily unavailable.';
    }

    if (status >= 500) {
      return 'The AI service is temporarily unavailable. Please try again in a few moments.';
    }

    return 'Our AI service encountered an error. Please try again.';
  }

  /**
   * Streaming chat response via Cloudflare AI Gateway
   * Gateway handles retries, failover, caching automatically
   */
  static async streamChat(
    messages: { role: string; content: string }[],
    config: Partial<AiConfig> = {},
    metadata?: Partial<RequestMetadata>
  ): Promise<ReadableStream> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const encoder = new TextEncoder();

    try {
      console.log('[AiService] Streaming via OpenRouter', {
        feature: metadata?.feature || 'chat',
        messageCount: messages.length,
      });

      // Convert messages for API
      const apiMessages = messages.map(m => ({
        role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant' | 'system',
        content: m.content,
      }));

      const systemPrompt = 'You are an elite academic research assistant for QuickNotes. Provide professional, publication-ready responses.';
      const allMessages = [{ role: 'system', content: systemPrompt }, ...apiMessages];

      const streamResponse = useGemini(finalConfig.model)
        ? await withGeminiRetry('streamChat', () => GeminiGateway.streamRequest({ model: finalConfig.model, messages: allMessages, temperature: finalConfig.temperature, max_tokens: finalConfig.maxTokens }))
        : await OpenRouterGateway.streamRequest({ model: finalConfig.model, messages: allMessages as any, temperature: finalConfig.temperature, max_tokens: finalConfig.maxTokens });

      const gemini = useGemini(finalConfig.model);

      // Convert provider SSE stream → frontend SSE format: data: {"content":"..."}
      return new ReadableStream({
        async start(controller) {
          try {
            const reader = streamResponse.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              buffer += chunk;

              const lines = buffer.split('\n');
              buffer = lines[lines.length - 1]; // Keep incomplete line in buffer

              for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i].trim();
                if (line.startsWith('data: ')) {
                  try {
                    const jsonStr = line.slice(6);
                    if (jsonStr === '[DONE]') {
                      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                      continue;
                    }
                    const data = JSON.parse(jsonStr);
                    // Gemini: candidates[0].content.parts[0].text
                    // OpenRouter/OpenAI: choices[0].delta.content
                    const content = gemini
                      ? data.candidates?.[0]?.content?.parts?.[0]?.text
                      : data.choices?.[0]?.delta?.content;
                    if (content) {
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                      );
                    }
                  } catch (e) {
                    // Skip JSON parse errors
                  }
                }
              }
            }

            // Flush remaining buffer
            if (buffer.trim().startsWith('data: ')) {
              try {
                const jsonStr = buffer.trim().slice(6);
                if (jsonStr !== '[DONE]') {
                  const data = JSON.parse(jsonStr);
                  const content = gemini
                    ? data.candidates?.[0]?.content?.parts?.[0]?.text
                    : data.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    );
                  }
                }
              } catch (e) {
                // Skip
              }
            }

            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error: any) {
            console.error('[AiService] Stream processing error:', error.message);
            const safeMessage = AiService.getSafeUserMessage(error);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: safeMessage })}\n\n`)
            );
            controller.close();
          }
        },
      });
    } catch (error: any) {
      console.error('[AiService] Stream initialization failed:', error.message);
      return new ReadableStream({
        start(controller) {
          const safeMessage = AiService.getSafeUserMessage(error);
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: safeMessage })}\n\n`)
          );
          controller.close();
        },
      });
    }
  }

  /**
   * Non-streaming completion via Cloudflare AI Gateway
   */
  static async complete(
    messages: { role: string; content: string }[],
    config: Partial<AiConfig> = {},
    metadata?: Partial<RequestMetadata>
  ): Promise<string> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    try {
      console.log('[AiService] Completing via OpenRouter', {
        feature: metadata?.feature || 'notes',
        messageCount: messages.length,
      });

      const apiMessages = messages.map(m => ({
        role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant' | 'system',
        content: m.content,
      }));

      const completionMessages = [
        { role: 'system', content: 'You are an expert study guide creator. Create concise, focused study notes.' },
        ...apiMessages,
      ];

      const content = useGemini(finalConfig.model)
        ? await withGeminiRetry('complete', () => GeminiGateway.complete({ model: finalConfig.model, messages: completionMessages, temperature: finalConfig.temperature, max_tokens: finalConfig.maxTokens }))
        : await OpenRouterGateway.complete({ model: finalConfig.model, messages: completionMessages as any, temperature: finalConfig.temperature, max_tokens: finalConfig.maxTokens });

      console.log('[AiService] Completion successful', {
        contentLength: content.length,
      });

      return content;
    } catch (error: any) {
      console.error('[AiService] Completion failed:', error.message);
      const safeMessage = this.getSafeUserMessage(error);
      throw new AppError(safeMessage, 500, 'AI_ERROR', error);
    }
  }

  /**
   * Generates embeddings via OpenAI or fallback hash
   */
  static async generateEmbedding(
    text: string,
    userId: string = 'unknown'
  ): Promise<number[]> {
    try {
      const generateFallbackEmbedding = (inputText: string): number[] => {
        const hash = inputText.split('').reduce((acc, char) => {
          const h = ((acc << 5) - acc) + char.charCodeAt(0);
          return h & h;
        }, 0);
        return new Array(EMBEDDING_DIMENSIONS)
          .fill(0)
          .map((_, i) => Math.sin((hash + i) * 0.1) * 0.1);
      };

      const apiKey = process.env.OPENAI_API_KEY?.trim();
      if (!apiKey || apiKey === '' || apiKey === 'your_openai_api_key_here') {
        return generateFallbackEmbedding(text);
      }

      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: text,
            // Request 384-dim output so it matches the document_chunks column and
            // the match_documents(vector(384)) RPC. text-embedding-3 models support
            // shortening via this parameter.
            dimensions: EMBEDDING_DIMENSIONS,
          }),
          signal: AbortSignal.timeout(15000),
        });

        if (!response.ok) {
          console.warn('[AiService] OpenAI embedding failed, using fallback');
          return generateFallbackEmbedding(text);
        }

        const data = await response.json();
        const embedding = data.data?.[0]?.embedding;

        if (!embedding || !Array.isArray(embedding)) {
          return generateFallbackEmbedding(text);
        }

        // Guard: a wrong-dimension vector would corrupt document_chunks / break
        // match_documents. If the provider ever returns a different size, use the
        // (correctly-sized) fallback rather than storing a mismatched vector.
        if (embedding.length !== EMBEDDING_DIMENSIONS) {
          console.warn(`[AiService] OpenAI returned ${embedding.length} dims, expected ${EMBEDDING_DIMENSIONS} — using fallback`);
          return generateFallbackEmbedding(text);
        }

        return embedding;
      } catch (error) {
        console.warn('[AiService] Embedding error, using fallback:', (error as Error).message);
        return generateFallbackEmbedding(text);
      }
    } catch (error) {
      console.warn('[AiService] Unexpected embedding error');
      return new Array(EMBEDDING_DIMENSIONS).fill(0);
    }
  }
}
