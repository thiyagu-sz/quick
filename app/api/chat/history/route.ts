import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { requireAuth } from '@/app/lib/auth/requireAuth';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';

// Production Configuration
const CONFIG = {
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 60,
    WINDOW_SIZE: 60 * 1000, // 1 minute
  },
  CONCURRENCY: {
    MAX_CONCURRENT_REQUESTS: 5,
  },
  TIMEOUTS: {
    DATABASE_TIMEOUT: 10000, // 10 seconds
    REQUEST_TIMEOUT: 15000,  // 15 seconds
  },
  LIMITS: {
    MIN_LIMIT: 1,
    MAX_LIMIT: 50,
    DEFAULT_LIMIT: 10,
  },
} as const;

// Global concurrent request tracking (stateless via Map)
const concurrentRequests = new Map<string, number>();
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Utility functions
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

function generateIdempotencyHash(userId: string, params: URLSearchParams): string {
  const key = `${userId}_${params.toString()}`;
  return createHash('sha256').update(key).digest('hex');
}

function createTimeoutPromise(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms);
  });
}

// Rate limiting middleware
async function checkRateLimit(clientIP: string): Promise<boolean> {
  const now = Date.now();
  const key = `rate_limit_${clientIP}`;
  const current = rateLimitMap.get(key);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + CONFIG.RATE_LIMIT.WINDOW_SIZE,
    });
    return true;
  }

  if (current.count >= CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  current.count++;
  return true;
}

// Concurrency control middleware
async function acquireConcurrencySlot(clientIP: string): Promise<() => void> {
  const current = concurrentRequests.get(clientIP) || 0;
  
  if (current >= CONFIG.CONCURRENCY.MAX_CONCURRENT_REQUESTS) {
    throw new Error('Too many concurrent requests');
  }

  concurrentRequests.set(clientIP, current + 1);
  
  return () => {
    const updated = concurrentRequests.get(clientIP) || 1;
    if (updated <= 1) {
      concurrentRequests.delete(clientIP);
    } else {
      concurrentRequests.set(clientIP, updated - 1);
    }
  };
}

// Database query with transaction support
async function fetchChatHistory(
  supabase: any, 
  userId: string, 
  limit: number,
  idempotencyKey: string
): Promise<any[]> {
  const dbTimeout = createTimeoutPromise(CONFIG.TIMEOUTS.DATABASE_TIMEOUT);
  
  try {
    const { data: conversations, error } = await Promise.race([
      supabase
        .from('chat_conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(limit)
        .abortSignal(AbortSignal.timeout(CONFIG.TIMEOUTS.DATABASE_TIMEOUT)),
      dbTimeout,
    ]);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return [];
      }
      
      console.error(`Database error for user ${userId}:`, {
        error: error.message,
        code: error.code,
        idempotencyKey,
        timestamp: new Date().toISOString(),
      });
      
      throw new Error('Database query failed');
    }

    return conversations || [];
  } catch (error) {
    if (error instanceof Error && error.message.includes('timeout')) {
      throw new Error('Database query timeout');
    }
    throw error;
  }
}

// Main GET handler with comprehensive error isolation
export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestId = generateRequestId();
  const clientIP = getClientIP(request);
  const startTime = Date.now();
  
  // Request-scoped variables only
  let releaseConcurrency: (() => void) | null = null;
  
  try {
    // 1. Rate limiting
    const isAllowed = await checkRateLimit(clientIP);
    if (!isAllowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil(CONFIG.RATE_LIMIT.WINDOW_SIZE / 1000),
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(CONFIG.RATE_LIMIT.WINDOW_SIZE / 1000).toString(),
            'X-RateLimit-Limit': CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE.toString(),
            'X-RateLimit-Remaining': '0',
            'X-Request-ID': requestId,
          },
        }
      );
    }

    // 2. Concurrency control
    releaseConcurrency = await acquireConcurrencySlot(clientIP);

    // 3. Request timeout
    const requestTimeout = createTimeoutPromise(CONFIG.TIMEOUTS.REQUEST_TIMEOUT);

    // 4. Parse and validate request parameters
    const searchParams = request.nextUrl.searchParams;
    const rawLimit = searchParams.get('limit');
    const limit = Math.min(
      Math.max(
        parseInt(rawLimit || CONFIG.LIMITS.DEFAULT_LIMIT.toString(), 10) || CONFIG.LIMITS.DEFAULT_LIMIT,
        CONFIG.LIMITS.MIN_LIMIT
      ),
      CONFIG.LIMITS.MAX_LIMIT
    );

    // 5. Authentication
    const { user, supabase } = await Promise.race([
      requireAuth(request),
      requestTimeout,
    ]);

    // 6. Generate idempotency key
    const idempotencyKey = generateIdempotencyHash(user.id, searchParams);
    
    // 7. Fetch data with transaction support
    const conversations = await Promise.race([
      fetchChatHistory(supabase, user.id, limit, idempotencyKey),
      requestTimeout,
    ]);

    // 8. Generate response
    const responseData = { 
      conversations,
      meta: {
        count: conversations.length,
        limit,
        requestId,
        timestamp: new Date().toISOString(),
      }
    };
    
    const etag = createHash('md5').update(JSON.stringify(responseData)).digest('hex');
    
    // 9. Return response with comprehensive headers
    return NextResponse.json(responseData, {
      headers: {
        'ETag': etag,
        'X-Request-ID': requestId,
        'X-Cache': 'miss',
        'X-Response-Time': `${Date.now() - startTime}ms`,
        'Cache-Control': 'no-store, private',
        'X-RateLimit-Limit': CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE.toString(),
        'X-RateLimit-Remaining': (CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE - (rateLimitMap.get(`rate_limit_${clientIP}`)?.count || 0)).toString(),
      },
    });

  } catch (error) {
    return ErrorHandler.handle(error, 'GET /api/chat/history');
  } finally {
    // Always release concurrency slot
    if (releaseConcurrency) {
      releaseConcurrency();
    }
  }
}
