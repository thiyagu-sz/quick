import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const EDGE_LIMIT = 10; // requests / minute / key — matches the Upstash window below

// Configure rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(EDGE_LIMIT, "1 m"), // 10 requests per user per minute
  analytics: false,
});

// ── In-memory fallback (per edge isolate) ────────────────────────────────────
// Used ONLY when Upstash is unreachable. It is not global across isolates, but
// it still blocks a single abuser hammering one instance — far safer than the
// previous behavior of removing ALL limits when Redis was down.
const fallbackHits = new Map<string, number[]>();
let fallbackActive = false; // logged on transition, not per request

function fallbackAllow(key: string): { success: boolean; retryAfter: number } {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const hits = (fallbackHits.get(key) ?? []).filter((t) => t > cutoff);

  if (hits.length >= EDGE_LIMIT) {
    fallbackHits.set(key, hits);
    const retryAfter = Math.max(Math.ceil((hits[0] + WINDOW_MS - now) / 1000), 1);
    return { success: false, retryAfter };
  }

  hits.push(now);
  fallbackHits.set(key, hits);

  // Bound memory under a key-flood: drop fully-expired buckets occasionally.
  if (fallbackHits.size > 10_000) {
    for (const [k, v] of fallbackHits) {
      if (v.every((t) => t <= cutoff)) fallbackHits.delete(k);
    }
  }
  return { success: true, retryAfter: 0 };
}

function tooManyRequests(retryAfter: number) {
  return NextResponse.json(
    {
      error: "Too many requests. Please slow down.",
      retryAfter,
      message: "Too many requests. Please wait a moment and try again.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export async function middleware(req: NextRequest) {
  // Only rate-limit AI and document endpoints
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/api/chat") &&
      !path.startsWith("/api/upload") &&
      !path.startsWith("/api/notes")) {
    return NextResponse.next();
  }

  // Identify user by header, cookie, or IP
  const userId =
    req.headers.get("x-user-id") ||
    req.cookies.get("sb-access-token")?.value ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "anonymous";

  try {
    const { success, reset } = await ratelimit.limit(userId);

    // Redis answered — note recovery once if we were in fallback mode.
    if (fallbackActive) {
      fallbackActive = false;
      console.warn("[RateLimit] Redis recovered → in-memory fallback disabled");
    }

    if (!success) {
      const retryAfter = Math.max(Math.ceil((reset - Date.now()) / 1000), 1);
      return tooManyRequests(retryAfter);
    }
  } catch (error) {
    // Redis is unreachable: DO NOT fail open. Enforce a per-isolate in-memory
    // limit so abusers are still blocked and Gemini cost stays bounded.
    if (!fallbackActive) {
      fallbackActive = true;
      console.error("[RateLimit] Redis down → in-memory fallback active", error);
    }
    const { success, retryAfter } = fallbackAllow(userId);
    if (!success) return tooManyRequests(retryAfter);
  }

  return NextResponse.next();
}

// Configure which paths middleware should run on
export const config = {
  matcher: [
    "/api/chat/:path*",
    "/api/upload/:path*",
    "/api/notes/:path*"
  ],
};
