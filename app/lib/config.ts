/**
 * QuickNotes Production Configuration
 */
export const CONFIG = {
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  AI: {
    // Use a FAST streaming model, not a reasoning one. Reasoning models
    // (deepseek-r1, openrouter/auto→o1/r1) think 30–90s before the first token
    // and blow the Vercel Hobby function cap (≤60s) → timeout/500. Fast models
    // stream first tokens in 1–3s. Override per deploy via AI_MODEL / FALLBACK_MODEL.
    DEFAULT_MODEL: process.env.AI_MODEL || 'meta-llama/llama-3.3-70b-instruct',
    FALLBACK_MODEL: process.env.FALLBACK_MODEL || 'meta-llama/llama-3.1-8b-instruct',
    MAX_TOKENS: parseInt(process.env.MAX_TOKENS || process.env.AI_MAX_TOKENS || '4096', 10),
    TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    TIMEOUT: parseInt(process.env.AI_TIMEOUT || '25000', 10),
    CONCURRENCY_LIMIT: parseInt(process.env.AI_CONCURRENCY || '8', 10),
    RETRY_ATTEMPTS: 2,
  },
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: parseInt(process.env.RATE_LIMIT || '15', 10),
    WINDOW_MS: 60 * 1000,
  },
  DATABASE: {
    TIMEOUT: 10000,
  },
  AUTH: {
    SESSION_TTL: 3600,
  }
} as const;

export default CONFIG;
