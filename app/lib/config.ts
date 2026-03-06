/**
 * QuickNotes Production Configuration
 */
export const CONFIG = {
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  AI: {
    DEFAULT_MODEL: process.env.AI_MODEL || 'deepseek/deepseek-r1',
    FALLBACK_MODEL: process.env.FALLBACK_MODEL || 'meta-llama/llama-3.3-70b-instruct',
    MAX_TOKENS: parseInt(process.env.MAX_TOKENS || process.env.AI_MAX_TOKENS || '4096', 10),
    TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    TIMEOUT: parseInt(process.env.AI_TIMEOUT || '30000', 10),
    CONCURRENCY_LIMIT: parseInt(process.env.AI_CONCURRENCY || '8', 10),
    RETRY_ATTEMPTS: 3,
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
