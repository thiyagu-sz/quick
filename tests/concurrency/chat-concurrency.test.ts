/**
 * Headline concurrency test for the affected endpoint (POST /api/chat).
 *
 * Fires N concurrent requests from N DISTINCT users through the REAL route +
 * AiService (semaphore) + OpenRouterGateway (circuit breaker), mocking only the
 * boundaries: auth, Redis, and the OpenRouter network call. Asserts:
 *   1. No request ever 500s — overflow is shed as 429, success is 200.
 *   2. Per-user isolation: each user's stream echoes ONLY that user's own marker.
 *
 * Raise N for heavier runs:  CONCURRENCY_N=50 npm test -- tests/concurrency
 */

// Small concurrency cap + retries off, so overflow is exercised and tests are fast.
jest.mock('@/app/lib/config', () => {
  const CONFIG = {
    DEBUG_MODE: false,
    AI: {
      DEFAULT_MODEL: 'primary',
      FALLBACK_MODEL: 'fallback',
      MAX_TOKENS: 64,
      TEMPERATURE: 0.7,
      TIMEOUT: 25000,
      CONCURRENCY_LIMIT: 4,
      RETRY_ATTEMPTS: 0,
    },
    RATE_LIMIT: { MAX_REQUESTS_PER_MINUTE: 15, WINDOW_MS: 60000 },
    DATABASE: { TIMEOUT: 10000 },
    AUTH: { SESSION_TTL: 3600 },
  };
  return { __esModule: true, CONFIG, default: CONFIG };
});

// Auth boundary: resolve a DISTINCT user per request from the x-test-user header,
// each with its own correct-shaped Supabase mock (self-contained — no out-of-scope refs).
jest.mock('@/app/lib/auth/requireAuth', () => ({
  requireAuth: jest.fn(async (request: any) => {
    const id = request.headers.get('x-test-user');
    const makeBuilder = () => {
      const b: any = {
        select: () => b,
        eq: () => b,
        in: () => b,
        order: () => b,
        update: () => b,
        delete: () => b,
        insert: () => b, // chainable AND awaitable (see then)
        limit: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: { id: `conv-${id}` }, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        then: (resolve: any) => resolve({ data: null, error: null }),
      };
      return b;
    };
    return { user: { id }, supabase: { from: () => makeBuilder() } };
  }),
}));

// Redis boundary: always allow; never the source of failure here.
jest.mock('@/app/lib/rateLimiter.redis', () => ({
  globalRateLimit: jest.fn(async () => ({ success: true, remaining: 99, resetIn: 0 })),
  acquireInflight: jest.fn(async () => true),
  releaseInflight: jest.fn(async () => {}),
  upstashRedis: null,
}));

import { POST } from '@/app/api/chat/route';

const N = Number(process.env.CONCURRENCY_N ?? 8);
const marker = (i: number) => `MARK${i}END`;

// Build an OpenRouter-style SSE stream that echoes a single content token.
function providerStream(content: string): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  const chunks = [
    `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`,
    'data: [DONE]\n\n',
  ];
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) controller.enqueue(enc.encode(chunks[i++]));
      else controller.close();
    },
  });
}

// Minimal NextRequest-like object the route actually uses.
function makeRequest(userId: string, question: string): any {
  const bodyStr = JSON.stringify({ question });
  const h: Record<string, string> = {
    'content-length': String(bodyStr.length),
    'x-test-user': userId,
  };
  return {
    headers: { get: (k: string) => h[k.toLowerCase()] ?? null },
    json: async () => JSON.parse(bodyStr),
    signal: { addEventListener: () => {} },
  };
}

describe(`POST /api/chat — ${N} concurrent users`, () => {
  beforeEach(() => {
    // Network boundary: echo back the requesting user's own marker so we can
    // prove no cross-wiring between concurrent streams.
    (global as any).fetch = jest.fn(async (_url: string, init: any) => {
      const body = JSON.parse(init.body);
      const userText = [...body.messages].reverse().find((m: any) => m.role === 'user')?.content ?? '';
      const found = /MARK\d+END/.exec(userText)?.[0] ?? 'MARK_UNKNOWN';
      return { ok: true, status: 200, body: providerStream(`ANSWER:${found}`) };
    });
  });

  it('never returns 500 and keeps each user’s data isolated', async () => {
    const responses = await Promise.all(
      Array.from({ length: N }, (_, i) => POST(makeRequest(`user-${i}`, marker(i)) as any)),
    );

    const statuses = responses.map((r) => r.status);

    // (1) No 500s — every response is a 200 stream or a graceful 429 (busy).
    expect(statuses.every((s) => s === 200 || s === 429)).toBe(true);
    expect(statuses.filter((s) => s === 500)).toHaveLength(0);
    expect(statuses.filter((s) => s === 200).length).toBeGreaterThan(0);

    // (2) Per-user isolation: each 200 body contains ONLY its own marker.
    await Promise.all(
      responses.map(async (res, i) => {
        if (res.status !== 200) return;
        const text = await res.text();
        expect(text).toContain(marker(i)); // own answer present
        for (let j = 0; j < N; j++) {
          if (j !== i) expect(text).not.toContain(marker(j)); // no one else's
        }
      }),
    );
  });
});
