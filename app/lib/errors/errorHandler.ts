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
  '429': "The AI model is currently busy. Please try again in a moment.",
  'RATE_LIMIT': "The AI model is currently busy. Please try again in a moment.",
  'TIMEOUT': "The AI model is currently busy. Please try again in a moment.",
  '401': "Our AI service is temporarily unavailable.",
  'UNAUTHORIZED': "Our AI service is temporarily unavailable.",
  '500': "Our AI service is temporarily unavailable.",
  'ECONNREFUSED': "Our AI service is temporarily unavailable.",
  'ABORT_ERROR': "The AI model is currently busy. Please try again in a moment.",
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
      // Map based on message or code
      const errorStr = `${error.message || ''} ${error.code || ''}`.toUpperCase();
      
      for (const [key, val] of Object.entries(ERROR_MAP)) {
        if (errorStr.includes(key)) {
          message = val;
          code = key;
          if (key === '429' || key === 'RATE_LIMIT') statusCode = 429;
          if (key === '401' || key === 'UNAUTHORIZED') statusCode = 401;
          break;
        }
      }
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
}
