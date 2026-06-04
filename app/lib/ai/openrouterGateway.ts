import { CONFIG } from '../config';

interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface OpenRouterCompletion {
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ─── Circuit Breaker ─────────────────────────────────────────────────────────
// Per-instance state (each Vercel Lambda has its own). Provides approximate
// protection: after 5 consecutive failures the circuit opens for 30s, causing
// immediate errors instead of burning 3s of retry delays per user.
const FAILURE_THRESHOLD = 5;
const CIRCUIT_RESET_MS = 30_000;

let consecutiveFailures = 0;
let circuitOpenUntil = 0;

function recordSuccess() {
  consecutiveFailures = 0;
}

function recordFailure() {
  consecutiveFailures++;
  if (consecutiveFailures >= FAILURE_THRESHOLD) {
    circuitOpenUntil = Date.now() + CIRCUIT_RESET_MS;
    console.warn(`[OpenRouterGateway] Circuit breaker opened for ${CIRCUIT_RESET_MS / 1000}s after ${consecutiveFailures} consecutive failures`);
  }
}

function isCircuitOpen(): boolean {
  if (circuitOpenUntil > Date.now()) return true;
  if (circuitOpenUntil !== 0) {
    // Reset after the window expires
    circuitOpenUntil = 0;
    consecutiveFailures = 0;
    console.log('[OpenRouterGateway] Circuit breaker reset — trying again');
  }
  return false;
}

// A 429 from OpenRouter means "busy / rate-limited" — expected when several users
// stream at once and already retried with backoff inside fetchWithRetry. It must
// NOT count toward the circuit breaker: otherwise two concurrent users hitting the
// upstream concurrency cap would trip the (shared, per-instance) breaker and turn
// transient 429s into 30s of hard 500s for EVERYONE on that Lambda. Only genuine
// outages (5xx / network / timeout) should open the circuit.
function isBusyError(err: any): boolean {
  if (err?.status === 429) return true;
  const msg = String(err?.message ?? '');
  return /\b429\b/.test(msg) || /high demand/i.test(msg);
}

// Record a failed attempt against the breaker, skipping "busy" (429) responses.
function recordFailureUnlessBusy(err: any) {
  if (isBusyError(err)) return;
  recordFailure();
}
// ─────────────────────────────────────────────────────────────────────────────

export class OpenRouterGateway {
  private static apiKey = process.env.OPENROUTER_API_KEY;
  private static baseUrl = 'https://openrouter.ai/api/v1/chat/completions';

  static validateConfig(): void {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY not set in environment');
    }
  }

  private static buildHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://quicknotess.space',
      'X-Title': 'QuickNotes AI Study Assistant',
    };
  }

  // Exponential backoff retry on 429 / 5xx errors
  private static async fetchWithRetry(
    payload: OpenRouterRequest,
    model: string,
    attempt: number
  ): Promise<Response> {
    console.log('[OpenRouterGateway] Request', { model, attempt, stream: payload.stream });

    // Streaming: 90s to accommodate DeepSeek R1's chain-of-thought reasoning phase
    // (30–90s before first output token). Non-streaming (notes): 35s is sufficient.
    const timeoutMs = payload.stream ? 90000 : 35000;

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify({ ...payload, model }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      const isRetryable = response.status === 429 || response.status >= 500;
      if (isRetryable && attempt < CONFIG.AI.RETRY_ATTEMPTS) {
        // Jitter prevents concurrent retries from all hitting OpenRouter at the same millisecond.
        const base = Math.pow(2, attempt) * 1000;
        const jitter = Math.floor(Math.random() * base * 0.5);
        const delay = base + jitter;
        console.warn(`[OpenRouterGateway] ${response.status} — retry in ${delay}ms`, { model, attempt });
        await new Promise(r => setTimeout(r, delay));
        return this.fetchWithRetry(payload, model, attempt + 1);
      }
      const errorText = await response.text().catch(() => '');
      console.error('[OpenRouterGateway] Error', {
        status: response.status,
        statusText: response.statusText,
        body: errorText.substring(0, 300),
      });
      // Use a distinct prefix on 429 so ErrorHandler maps it to the right user message.
      const msg = response.status === 429
        ? 'OpenRouter 429: High demand — please retry in a few seconds'
        : `OpenRouter ${response.status}: ${response.statusText}`;
      throw new Error(msg);
    }

    return response;
  }

  // Primary entry point — checks circuit breaker, retries on primary model,
  // then falls back to FALLBACK_MODEL on persistent failure.
  static async request(payload: OpenRouterRequest): Promise<Response> {
    this.validateConfig();

    if (isCircuitOpen()) {
      throw new Error('AI service temporarily unavailable. Please try again in 30 seconds.');
    }

    try {
      const response = await this.fetchWithRetry(payload, payload.model, 0);
      recordSuccess();
      return response;
    } catch (primaryError: any) {
      const fallback = CONFIG.AI.FALLBACK_MODEL;
      if (payload.model !== fallback) {
        console.warn('[OpenRouterGateway] Primary model failed, trying fallback', {
          primary: payload.model,
          fallback,
          error: primaryError.message,
        });
        try {
          const fallbackResponse = await this.fetchWithRetry(payload, fallback, 0);
          recordSuccess();
          return fallbackResponse;
        } catch (fallbackError: any) {
          recordFailureUnlessBusy(fallbackError);
          throw fallbackError;
        }
      }
      recordFailureUnlessBusy(primaryError);
      throw primaryError;
    }
  }

  // Stream request — returns ReadableStream for SSE
  static async streamRequest(
    payload: OpenRouterRequest
  ): Promise<ReadableStream<Uint8Array>> {
    const response = await this.request({
      ...payload,
      stream: true,
    });

    if (!response.body) {
      throw new Error('No response body from OpenRouter');
    }

    return response.body;
  }

  // Non-streaming completion for note generation
  static async complete(payload: OpenRouterRequest): Promise<string> {
    const response = await this.request({
      ...payload,
      stream: false,
    });

    const data = (await response.json()) as OpenRouterCompletion;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from OpenRouter');
    }

    return content;
  }
}
