module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/AI-SAAS/app/api/chat/history/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
// Production Configuration
const CONFIG = {
    RATE_LIMIT: {
        MAX_REQUESTS_PER_MINUTE: 60,
        WINDOW_SIZE: 60 * 1000
    },
    CONCURRENCY: {
        MAX_CONCURRENT_REQUESTS: 5
    },
    TIMEOUTS: {
        DATABASE_TIMEOUT: 10000,
        REQUEST_TIMEOUT: 15000
    },
    CACHE: {
        TTL: 30000
    },
    LIMITS: {
        MIN_LIMIT: 1,
        MAX_LIMIT: 50,
        DEFAULT_LIMIT: 10
    }
};
// Global concurrent request tracking (stateless via Map)
const concurrentRequests = new Map();
const rateLimitMap = new Map();
const requestCache = new Map();
// Utility functions
function getClientIP(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    return forwarded?.split(',')[0] || realIP || 'unknown';
}
function generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}
function generateIdempotencyHash(userId, params) {
    const key = `${userId}_${params.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('sha256').update(key).digest('hex');
}
function createTimeoutPromise(ms) {
    return new Promise((_, reject)=>{
        setTimeout(()=>reject(new Error(`Request timeout after ${ms}ms`)), ms);
    });
}
// Rate limiting middleware
async function checkRateLimit(clientIP) {
    const now = Date.now();
    const key = `rate_limit_${clientIP}`;
    const current = rateLimitMap.get(key);
    if (!current || now > current.resetTime) {
        rateLimitMap.set(key, {
            count: 1,
            resetTime: now + CONFIG.RATE_LIMIT.WINDOW_SIZE
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
async function acquireConcurrencySlot(clientIP) {
    const current = concurrentRequests.get(clientIP) || 0;
    if (current >= CONFIG.CONCURRENCY.MAX_CONCURRENT_REQUESTS) {
        throw new Error('Too many concurrent requests');
    }
    concurrentRequests.set(clientIP, current + 1);
    return ()=>{
        const updated = concurrentRequests.get(clientIP) || 1;
        if (updated <= 1) {
            concurrentRequests.delete(clientIP);
        } else {
            concurrentRequests.set(clientIP, updated - 1);
        }
    };
}
// Cache management
function getCachedResponse(cacheKey, ifNoneMatch) {
    const cached = requestCache.get(cacheKey);
    if (!cached || Date.now() - cached.timestamp > CONFIG.CACHE.TTL) {
        requestCache.delete(cacheKey);
        return null;
    }
    // Check ETag for conditional requests
    if (ifNoneMatch && ifNoneMatch === cached.etag) {
        return {
            data: null,
            etag: cached.etag
        };
    }
    return cached;
}
function setCachedResponse(cacheKey, data, etag) {
    requestCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        etag
    });
    // Cleanup old cache entries (simple LRU-like behavior)
    if (requestCache.size > 1000) {
        const oldestKey = requestCache.keys().next().value;
        if (oldestKey) {
            requestCache.delete(oldestKey);
        }
    }
}
// Authentication with timeout
async function authenticateRequest(request) {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://wxpweyodcgnczgtnpebh.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cHdleW9kY2duY3pndG5wZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzI4NDQsImV4cCI6MjA4Nzk0ODg0NH0.1rDf9dqhAh3JPl62YAPogkc--fyUNRRPlGy4c5Glbew");
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Create timeout promise for auth operations
    const authTimeout = createTimeoutPromise(CONFIG.TIMEOUTS.DATABASE_TIMEOUT);
    // Cookie-based authentication
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
        cookies: {
            get (name) {
                return cookieStore.get(name)?.value;
            }
        }
    });
    let user = null;
    let authError = null;
    try {
        // Race authentication against timeout
        const cookieAuthResult = await Promise.race([
            authClient.auth.getUser(),
            authTimeout
        ]);
        user = cookieAuthResult.data.user;
        authError = cookieAuthResult.error;
    } catch (error) {
        if (error instanceof Error && error.message.includes('timeout')) {
            throw new Error('Authentication timeout');
        }
        throw error;
    }
    // Fallback to Bearer token if cookie auth fails
    if ((authError || !user) && request.headers.get('Authorization')?.startsWith('Bearer ')) {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader.substring(7);
        const tokenClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
        try {
            const tokenAuthResult = await Promise.race([
                tokenClient.auth.getUser(),
                createTimeoutPromise(CONFIG.TIMEOUTS.DATABASE_TIMEOUT)
            ]);
            if (tokenAuthResult.data.user && !tokenAuthResult.error) {
                user = tokenAuthResult.data.user;
                authError = null;
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes('timeout')) {
                throw new Error('Token authentication timeout');
            }
        }
    }
    if (authError || !user) {
        throw new Error('Unauthorized');
    }
    // Create service client with timeout
    const supabase = supabaseServiceKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
        auth: {
            persistSession: false
        }
    }) : authClient;
    return {
        user,
        supabase
    };
}
// Database query with transaction support
async function fetchChatHistory(supabase, userId, limit, idempotencyKey) {
    const dbTimeout = createTimeoutPromise(CONFIG.TIMEOUTS.DATABASE_TIMEOUT);
    try {
        // Use transaction for consistency
        const { data: conversations, error } = await Promise.race([
            supabase.from('chat_conversations').select('id, title, created_at, updated_at').eq('user_id', userId).order('updated_at', {
                ascending: false
            }).limit(limit).abortSignal(AbortSignal.timeout(CONFIG.TIMEOUTS.DATABASE_TIMEOUT)),
            dbTimeout
        ]);
        if (error) {
            // Handle specific error cases
            if (error.code === '42P01' || error.message?.includes('does not exist')) {
                return [];
            }
            // Log error with context but don't expose details
            console.error(`Database error for user ${userId}:`, {
                error: error.message,
                code: error.code,
                idempotencyKey,
                timestamp: new Date().toISOString()
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
async function GET(request) {
    const requestId = generateRequestId();
    const clientIP = getClientIP(request);
    const startTime = Date.now();
    // Request-scoped variables only
    let releaseConcurrency = null;
    try {
        // 1. Rate limiting
        const isAllowed = await checkRateLimit(clientIP);
        if (!isAllowed) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Rate limit exceeded',
                retryAfter: Math.ceil(CONFIG.RATE_LIMIT.WINDOW_SIZE / 1000)
            }, {
                status: 429,
                headers: {
                    'Retry-After': Math.ceil(CONFIG.RATE_LIMIT.WINDOW_SIZE / 1000).toString(),
                    'X-RateLimit-Limit': CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE.toString(),
                    'X-RateLimit-Remaining': '0',
                    'X-Request-ID': requestId
                }
            });
        }
        // 2. Concurrency control
        releaseConcurrency = await acquireConcurrencySlot(clientIP);
        // 3. Request timeout
        const requestTimeout = createTimeoutPromise(CONFIG.TIMEOUTS.REQUEST_TIMEOUT);
        // 4. Parse and validate request parameters
        const searchParams = request.nextUrl.searchParams;
        const rawLimit = searchParams.get('limit');
        const limit = Math.min(Math.max(parseInt(rawLimit || CONFIG.LIMITS.DEFAULT_LIMIT.toString(), 10) || CONFIG.LIMITS.DEFAULT_LIMIT, CONFIG.LIMITS.MIN_LIMIT), CONFIG.LIMITS.MAX_LIMIT);
        // 5. Authentication
        const { user, supabase } = await Promise.race([
            authenticateRequest(request),
            requestTimeout
        ]);
        // 6. Generate idempotency key
        const idempotencyKey = generateIdempotencyHash(user.id, searchParams);
        const cacheKey = `chat_history_${user.id}_${limit}`;
        // 7. Check cache and conditional requests
        const ifNoneMatch = request.headers.get('if-none-match');
        const cached = getCachedResponse(cacheKey, ifNoneMatch);
        if (cached) {
            if (cached.data === null) {
                // ETag matched, return 304
                return new __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
                    status: 304,
                    headers: {
                        'ETag': cached.etag,
                        'X-Request-ID': requestId,
                        'X-Cache': 'hit-conditional'
                    }
                });
            }
            // Return cached data
            return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cached.data, {
                headers: {
                    'ETag': cached.etag,
                    'X-Request-ID': requestId,
                    'X-Cache': 'hit',
                    'Cache-Control': 'private, max-age=30'
                }
            });
        }
        // 8. Fetch data with transaction support
        const conversations = await Promise.race([
            fetchChatHistory(supabase, user.id, limit, idempotencyKey),
            requestTimeout
        ]);
        // 9. Generate response
        const responseData = {
            conversations,
            meta: {
                count: conversations.length,
                limit,
                requestId,
                timestamp: new Date().toISOString()
            }
        };
        const etag = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('md5').update(JSON.stringify(responseData)).digest('hex');
        // 10. Cache the response
        setCachedResponse(cacheKey, responseData, etag);
        // 11. Return response with comprehensive headers
        return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(responseData, {
            headers: {
                'ETag': etag,
                'X-Request-ID': requestId,
                'X-Cache': 'miss',
                'X-Response-Time': `${Date.now() - startTime}ms`,
                'Cache-Control': 'private, max-age=30',
                'X-RateLimit-Limit': CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE.toString(),
                'X-RateLimit-Remaining': (CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE - (rateLimitMap.get(`rate_limit_${clientIP}`)?.count || 0)).toString()
            }
        });
    } catch (error) {
        // Comprehensive error isolation and logging
        const errorDetails = {
            requestId,
            clientIP,
            timestamp: new Date().toISOString(),
            responseTime: Date.now() - startTime,
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: ("TURBOPACK compile-time truthy", 1) ? error.stack : "TURBOPACK unreachable"
            } : 'Unknown error'
        };
        console.error('Chat history API error:', errorDetails);
        // Determine error response based on error type
        let statusCode = 500;
        let errorMessage = 'Internal server error';
        if (error instanceof Error) {
            if (error.message.includes('timeout')) {
                statusCode = 504;
                errorMessage = 'Request timeout';
            } else if (error.message.includes('Unauthorized')) {
                statusCode = 401;
                errorMessage = 'Unauthorized';
            } else if (error.message.includes('Too many concurrent requests')) {
                statusCode = 429;
                errorMessage = 'Too many concurrent requests';
            } else if (error.message.includes('Rate limit')) {
                statusCode = 429;
                errorMessage = 'Rate limit exceeded';
            } else if (error.message.includes('Missing Supabase configuration')) {
                statusCode = 503;
                errorMessage = 'Service temporarily unavailable';
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage,
            requestId,
            timestamp: new Date().toISOString()
        }, {
            status: statusCode,
            headers: {
                'X-Request-ID': requestId,
                'X-Response-Time': `${Date.now() - startTime}ms`
            }
        });
    } finally{
        // Always release concurrency slot
        if (releaseConcurrency) {
            releaseConcurrency();
        }
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b942a6c5._.js.map