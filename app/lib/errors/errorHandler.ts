import { NextResponse } from 'next/server';
import { CONFIG } from '../config';

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Maps technical errors to user-friendly SaaS messages
 */
const ERROR_MAP: Record<string, string> = {
  // AI provider busy (OpenRouter 429) — distinct from the user's own rate limit
  '429': "The AI is busy right now. Please retry in a few seconds.",
  // User's own rate limit is an AppError with a specific message; this catches
  // any other RATE_LIMIT strings that slip through as plain Errors
  'RATE_LIMIT': "You are sending requests too quickly. Please wait before trying again.",
  // Timed out waiting for the AI — likely a very long document
  'TIMEOUT': "That took too long. Try a shorter question or document.",
  'ABORT_ERROR': "That took too long. Try a shorter question or document.",
  // Session / auth
  '401': "Your session has expired. Please log in again.",
  'UNAUTHORIZED': "Your session has expired. Please log in again.",
  // DB / infra errors
  'DB_ERROR': "Service is under heavy load. Please try again in a moment.",
  '500': "Service is temporarily unavailable. Please try again.",
  'ECONNREFUSED': "Service is temporarily unavailable. Please try again.",
};

/**
 * Central Error Handler for API routes
 */
export class ErrorHandler {
  /**
   * Logs error with structured format
   */
  static log(error: any, context?: string) {
    const timestamp = new Date().toISOString();
    const errorDetails = {
      timestamp,
      context,
      name: error.name || 'Error',
      message: error.message || 'Unknown error',
      code: error.code,
      stack: (process.env.NODE_ENV === 'development' || CONFIG.DEBUG_MODE) ? error.stack : undefined,
      details: error.details,
    };

    // Structured logging for production (can be piped to CloudWatch/Datadog)
    console.error(JSON.stringify(errorDetails));
  }

  /**
   * Logs debug information when DEBUG_MODE is enabled
   */
  static debug(message: string, data?: any) {
    if (CONFIG.DEBUG_MODE) {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        type: 'DEBUG',
        message,
        data
      }));
    }
  }

  /**
   * Handles error and returns a safe NextResponse
   */
  static handle(error: any, context?: string): NextResponse {
    this.log(error, context);

    let statusCode = 500;
    let message = "An unexpected error occurred. Please try again.";
    let code = 'INTERNAL_ERROR';

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;
      code = error.code || 'APP_ERROR';
    } else {
      // Precise classification — see classifyPlainError(). No loose substring
      // matching on status codes (which previously made a "25000ms" timeout match
      // "500"), and timeout/abort is checked BEFORE any 5xx classification.
      const mapped = ErrorHandler.classifyPlainError(error);
      statusCode = mapped.statusCode;
      message = mapped.message;
      code = mapped.code;
    }

    // In production, NEVER expose raw error details to the client
    return NextResponse.json(
      {
        success: false,
        message, // friendly message at top level as requested
        error: {
          code,
        },
      },
      { status: statusCode }
    );
  }

  /**
   * Classify a non-AppError into { statusCode, message, code } WITHOUT loose
   * substring matching on status codes. Precedence:
   *   1) abort / timeout   (checked BEFORE any 5xx classification)
   *   2) exact error.code  (RATE_LIMIT / UNAUTHORIZED / DB_ERROR / ECONN…)
   *   3) numeric error.status / statusCode, else a precise (word-boundaried)
   *      status token from the message — never matches digits inside "25000".
   *   4) generic 500
   */
  private static classifyPlainError(error: any): { statusCode: number; message: string; code: string } {
    const name = String(error?.name || '');
    const rawCode = String(error?.code || '');
    const msg = String(error?.message || '');
    const numericStatus =
      typeof error?.status === 'number' ? error.status
      : typeof error?.statusCode === 'number' ? error.statusCode
      : null;

    // 1) Abort / timeout FIRST.
    if (name === 'AbortError' || rawCode === 'ABORT_ERROR') {
      return { statusCode: 500, message: ERROR_MAP['ABORT_ERROR'], code: 'ABORT_ERROR' };
    }
    if (rawCode === 'TIMEOUT' || rawCode === 'ETIMEDOUT' || /\b(timed out|timeout)\b/i.test(msg)) {
      return { statusCode: 500, message: ERROR_MAP['TIMEOUT'], code: 'TIMEOUT' };
    }

    // 2) Exact code matches — no substring search.
    if (rawCode === 'RATE_LIMIT') return { statusCode: 429, message: ERROR_MAP['RATE_LIMIT'], code: 'RATE_LIMIT' };
    if (rawCode === 'UNAUTHORIZED') return { statusCode: 401, message: ERROR_MAP['401'], code: 'UNAUTHORIZED' };
    if (rawCode === 'ECONNREFUSED' || rawCode === 'ENOTFOUND') return { statusCode: 500, message: ERROR_MAP['ECONNREFUSED'], code: rawCode };
    if (rawCode === 'DB_ERROR') return { statusCode: 500, message: ERROR_MAP['DB_ERROR'], code: 'DB_ERROR' };

    // 3) Numeric status (object field preferred; else a precise token in the message).
    const status = numericStatus ?? ErrorHandler.statusFromMessage(msg);
    if (status !== null) {
      if (status === 429) return { statusCode: 429, message: ERROR_MAP['429'], code: '429' };
      if (status === 401 || status === 403) return { statusCode: 401, message: ERROR_MAP['401'], code: String(status) };
      if (status >= 500) return { statusCode: status, message: ERROR_MAP['500'], code: String(status) };
    }

    // 4) Default — never leak internals.
    return { statusCode: 500, message: 'An unexpected error occurred. Please try again.', code: 'INTERNAL_ERROR' };
  }

  /** Extract a standalone 4xx/5xx status token from a message (word-boundaried). */
  private static statusFromMessage(msg: string): number | null {
    const m = /\b([45]\d{2})\b/.exec(msg);
    return m ? parseInt(m[1], 10) : null;
  }
}
