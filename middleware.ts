import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Configure rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per user per minute
  analytics: false,
});

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

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { 
          error: "Too many requests. Please slow down.", 
          retryAfter,
          message: "Too many requests. Please wait a moment and try again."
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        }
      );
    }
  } catch (error) {
    // If Redis is down, allow the request to pass to avoid blocking users
    console.error("Middleware rate limit error:", error);
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
