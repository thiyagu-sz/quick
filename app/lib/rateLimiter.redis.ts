import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { AppError } from './errors/errorHandler';

/**
 * 🚀 PROFESSIONAL REDIS RATE LIMITER (Global across all instances)
 * 
 * Requirements:
 * 1. UPSTASH_REDIS_REST_URL
 * 2. UPSTASH_REDIS_REST_TOKEN
 * 
 * If these are missing, this falls back to the in-memory limiter.
 */

const redis = process.env.UPSTASH_REDIS_REST_URL 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// UNIFIED: Sliding window: 20 requests per 1 minute per user
// This is the ONLY rate limiter. Middleware no longer has duplicate limiting.
const ratelimit = redis 
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),  // ✅ UNIFIED LIMIT
      analytics: true,
      prefix: 'quicknotes:ratelimit',
    })
  : null;

/**
 * Global rate limiter with Redis fallback
 * This is the ONLY rate limiting mechanism in the system.
 * Middleware.ts no longer duplicates this logic.
 */
export async function globalRateLimit(userId: string) {
  if (!ratelimit) {
    // Falls back to unrestricted if Redis not configured (development mode)
    return { success: true, remaining: 20, resetIn: 0 };
  }

  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(userId);
    const now = Date.now();
    const resetIn = Math.ceil((reset - now) / 1000);

    if (!success) {
      console.warn(`[RateLimit] User ${userId} exceeded quota. Reset in ${resetIn}s`);
    }

    return { success, remaining, resetIn };
  } catch (error) {
    console.error('[RateLimit] Redis error, bypassing to avoid blocking users...', error);
    // On Redis error, allow request (fail-open for availability)
    return { success: true, remaining: 1, resetIn: 0 };
  }
}

// Reusable Upstash Redis client for caching (null when not configured)
export { redis as upstashRedis };
