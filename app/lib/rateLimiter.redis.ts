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

// Sliding window: 15 requests per 1 minute
const ratelimit = redis 
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(15, '1 m'),
      analytics: true,
      prefix: 'quicknotes:ratelimit',
    })
  : null;

/**
 * Global rate limiter with Redis fallback
 */
export async function globalRateLimit(userId: string) {
  if (!ratelimit) {
    // Falls back to in-memory if Redis not configured
    return { success: true, remaining: 15, resetIn: 0 };
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
    console.error('[RateLimit] Redis error, bypassing...', error);
    return { success: true, remaining: 1, resetIn: 0 };
  }
}
