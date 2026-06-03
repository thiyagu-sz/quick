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
 * If Redis is missing OR unreachable, this falls back to a per-instance
 * in-memory limiter — it does NOT fail open. The fallback keeps the same
 * per-minute cap so an abuser is still blocked even when Upstash is down.
 */

const WINDOW_MS = 60_000;
const FALLBACK_LIMIT = 15; // requests / minute / user — matches the Upstash window

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
      limiter: Ratelimit.slidingWindow(FALLBACK_LIMIT, '1 m'),
      analytics: true,
      prefix: 'quicknotes:ratelimit',
    })
  : null;

// ── In-memory fallback (per serverless instance) ─────────────────────────────
// Activated only when Redis is absent or throws. Not global across instances,
// but enforces a real cap instead of allowing everything.
const memHits = new Map<string, number[]>();
let memFallbackLogged = false;

function logFallbackOnce(reason: string) {
  if (!memFallbackLogged) {
    memFallbackLogged = true;
    console.warn(`[RateLimit] Redis down → in-memory fallback active (${reason})`);
  }
}

function memRateLimit(userId: string): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const hits = (memHits.get(userId) ?? []).filter((t) => t > cutoff);

  if (hits.length >= FALLBACK_LIMIT) {
    memHits.set(userId, hits);
    const resetIn = Math.max(Math.ceil((hits[0] + WINDOW_MS - now) / 1000), 1);
    return { success: false, remaining: 0, resetIn };
  }

  hits.push(now);
  memHits.set(userId, hits);
  if (memHits.size > 10_000) {
    for (const [k, v] of memHits) if (v.every((t) => t <= cutoff)) memHits.delete(k);
  }
  return { success: true, remaining: FALLBACK_LIMIT - hits.length, resetIn: 0 };
}

/**
 * Global rate limiter with Redis → in-memory fallback (never fail-open).
 */
export async function globalRateLimit(userId: string) {
  if (!ratelimit) {
    // No Redis configured — still enforce a per-instance cap.
    return memRateLimit(userId);
  }

  try {
    const { success, remaining, reset } = await ratelimit.limit(userId);
    const now = Date.now();
    const resetIn = Math.ceil((reset - now) / 1000);

    if (!success) {
      console.warn(`[RateLimit] User ${userId} exceeded quota. Reset in ${resetIn}s`);
    }

    return { success, remaining, resetIn };
  } catch (error) {
    // Redis unreachable: fall back to the in-memory limiter, NOT to allow-all.
    logFallbackOnce('globalRateLimit');
    return memRateLimit(userId);
  }
}

// Shared Redis client for cache operations (chat history, etc.)
export { redis as upstashRedis };

const INFLIGHT_PREFIX = 'quicknotes:inflight';

// In-memory in-flight locks (per instance) for the Redis-down path.
const memInflight = new Map<string, number>(); // key -> expiry (ms)

function memAcquire(key: string, ttlSeconds: number): boolean {
  const now = Date.now();
  const exp = memInflight.get(key);
  if (exp && exp > now) return false; // still locked
  memInflight.set(key, now + ttlSeconds * 1000);
  if (memInflight.size > 10_000) {
    for (const [k, e] of memInflight) if (e <= now) memInflight.delete(k);
  }
  return true;
}

/**
 * Acquire a per-user in-flight lock for an endpoint.
 * Returns true if acquired, false if the user already has a request running.
 * Key self-expires after ttlSeconds so a crash never permanently blocks a user.
 * When Redis is down it uses a per-instance in-memory lock instead of failing open.
 */
export async function acquireInflight(userId: string, endpoint: string, ttlSeconds: number): Promise<boolean> {
  const key = `${INFLIGHT_PREFIX}:${userId}:${endpoint}`;
  if (!redis) return memAcquire(key, ttlSeconds);
  try {
    const result = await redis.set(key, '1', { nx: true, ex: ttlSeconds });
    return result !== null; // SET NX returns 'OK' on success, null if key already existed
  } catch {
    // Redis error: fall back to a per-instance in-flight guard (not fail-open).
    logFallbackOnce('acquireInflight');
    return memAcquire(key, ttlSeconds);
  }
}

/**
 * Release a per-user in-flight lock. Errors are swallowed — the TTL is the safety net.
 */
export async function releaseInflight(userId: string, endpoint: string): Promise<void> {
  const key = `${INFLIGHT_PREFIX}:${userId}:${endpoint}`;
  memInflight.delete(key); // clear any in-memory lock regardless of Redis state
  if (!redis) return;
  try {
    await redis.del(key);
  } catch { /* TTL handles cleanup */ }
}
