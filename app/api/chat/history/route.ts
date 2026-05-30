import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { requireAuth } from '@/app/lib/auth/requireAuth';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';
import { upstashRedis } from '@/app/lib/rateLimiter.redis';

export const maxDuration = 15;
export const runtime = 'nodejs';

// 60s TTL: cache is invalidated on every save/delete anyway, so a longer TTL
// purely improves hit rate during a session without serving stale data.
// At 10s the cache was expiring faster than a normal reading pace, causing
// a DB hit on every navigation after any pause.
const HISTORY_CACHE_TTL_SECONDS = 60;

const CONFIG = {
  TIMEOUTS: {
    // 3s DB timeout: if Postgres takes longer than this, the index is missing.
    // Fail fast and return 503 rather than blocking the user for 10 seconds.
    DATABASE_TIMEOUT: 3000,
    REQUEST_TIMEOUT: 8000,
  },
  LIMITS: {
    MIN_LIMIT: 1,
    MAX_LIMIT: 50,
    DEFAULT_LIMIT: 10,
  },
} as const;

// Redis-backed rate limiter: globally consistent across all Vercel instances.
// Falls back to allow-all when Redis is not configured (development).
const historyRatelimit = upstashRedis
  ? new Ratelimit({
      redis: upstashRedis,
      limiter: Ratelimit.slidingWindow(60, '1 m'),
      prefix: 'quicknotes:history',
    })
  : null;

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

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestId = generateRequestId();
  const clientIP = getClientIP(request);
  const startTime = Date.now();

  try {
    // 1. Rate limiting — Redis-backed, globally consistent across all Vercel instances.
    //    Replaces the previous per-instance in-memory Map which allowed N×limit per key
    //    when N warm Lambda instances existed simultaneously.
    if (historyRatelimit) {
      const { success } = await historyRatelimit.limit(clientIP);
      if (!success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded', retryAfter: 60 },
          {
            status: 429,
            headers: {
              'Retry-After': '60',
              'X-RateLimit-Limit': '60',
              'X-RateLimit-Remaining': '0',
              'X-Request-ID': requestId,
            },
          }
        );
      }
    }

    // 2. Request timeout wrapper
    const requestTimeout = createTimeoutPromise(CONFIG.TIMEOUTS.REQUEST_TIMEOUT);

    // 3. Parse and validate parameters
    const searchParams = request.nextUrl.searchParams;
    const rawLimit = searchParams.get('limit');
    const limit = Math.min(
      Math.max(
        parseInt(rawLimit || CONFIG.LIMITS.DEFAULT_LIMIT.toString(), 10) || CONFIG.LIMITS.DEFAULT_LIMIT,
        CONFIG.LIMITS.MIN_LIMIT
      ),
      CONFIG.LIMITS.MAX_LIMIT
    );

    // 4. Authentication
    const { user, supabase } = await Promise.race([requireAuth(request), requestTimeout]);
    if (!supabase) {
      throw new AppError('Failed to initialize database client', 500, 'CONFIG_ERROR');
    }

    // 5. Idempotency key + Redis cache key
    const idempotencyKey = generateIdempotencyHash(user.id, searchParams);
    const cacheKey = `chat-history:${user.id}:${limit}`;

    // 6a. Redis cache check
    if (upstashRedis) {
      try {
        const cached = await upstashRedis.get<string>(cacheKey);
        if (cached) {
          const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
          return NextResponse.json(parsed, {
            headers: {
              'X-Cache': 'hit',
              'X-Request-ID': requestId,
              'X-Response-Time': `${Date.now() - startTime}ms`,
              'Cache-Control': 'no-store, private',
            },
          });
        }
      } catch {
        // Redis unavailable — fall through to DB
      }
    }

    // 6b. Fetch from DB
    const conversations = await Promise.race([
      fetchChatHistory(supabase, user.id, limit, idempotencyKey),
      requestTimeout,
    ]);

    // 7. Build response
    const responseData = {
      conversations,
      meta: {
        count: conversations.length,
        limit,
        requestId,
        timestamp: new Date().toISOString(),
      },
    };

    // 7a. Store in Redis cache (fire-and-forget)
    if (upstashRedis) {
      upstashRedis
        .set(cacheKey, JSON.stringify(responseData), { ex: HISTORY_CACHE_TTL_SECONDS })
        .catch(() => {});
    }

    const etag = createHash('md5').update(JSON.stringify(responseData)).digest('hex');

    return NextResponse.json(responseData, {
      headers: {
        'ETag': etag,
        'X-Request-ID': requestId,
        'X-Cache': 'miss',
        'X-Response-Time': `${Date.now() - startTime}ms`,
        'Cache-Control': 'no-store, private',
      },
    });
  } catch (error) {
    return ErrorHandler.handle(error, 'GET /api/chat/history');
  }
}
