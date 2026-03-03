import { NextResponse } from 'next/server';
import { CONFIG } from './config';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * ⚠️ SERVERLESS LIMITATION: This rate limiter is in-memory.
 * On Vercel, concurrent requests may run in separate instances.
 * This only limits rates within a single warm instance.
 * For true cross-instance rate limiting, migrate to Upstash Redis:
 * https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */
export async function rateLimit(identifier: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + CONFIG.RATE_LIMIT.WINDOW_MS,
    });
    return { success: true, remaining: CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE - 1 };
  }

  if (entry.count >= CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
    return { success: false, remaining: 0, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { 
    success: true, 
    remaining: CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE - entry.count 
  };
}
