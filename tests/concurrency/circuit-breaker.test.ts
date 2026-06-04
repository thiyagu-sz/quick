// Bug 1 regression: the shared (per-instance) OpenRouter circuit breaker must NOT
// open on upstream 429s ("busy", expected under concurrency) — only on genuine
// 5xx/network outages. Otherwise two concurrent users hitting the upstream
// concurrency cap trip the breaker and everyone gets hard 500s for 30s.

// Mock config so retries are off (no real backoff timers slowing the test) and
// the primary/fallback models are distinct.
jest.mock('@/app/lib/config', () => {
  const CONFIG = {
    DEBUG_MODE: false,
    AI: {
      DEFAULT_MODEL: 'primary',
      FALLBACK_MODEL: 'fallback',
      MAX_TOKENS: 64,
      TEMPERATURE: 0.7,
      TIMEOUT: 25000,
      CONCURRENCY_LIMIT: 50,
      RETRY_ATTEMPTS: 0,
    },
    RATE_LIMIT: { MAX_REQUESTS_PER_MINUTE: 15, WINDOW_MS: 60000 },
    DATABASE: { TIMEOUT: 10000 },
    AUTH: { SESSION_TTL: 3600 },
  };
  return { __esModule: true, CONFIG, default: CONFIG };
});

const res = (status: number, ok: boolean) => ({
  ok,
  status,
  statusText: `status-${status}`,
  text: async () => '',
  json: async () => ({ choices: [{ message: { content: 'hi' }, finish_reason: 'stop' }] }),
  body: {},
});

describe('OpenRouter circuit breaker', () => {
  // Re-require the gateway per test so its module-level breaker state is fresh.
  let OpenRouterGateway: typeof import('@/app/lib/ai/openrouterGateway').OpenRouterGateway;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    OpenRouterGateway = require('@/app/lib/ai/openrouterGateway').OpenRouterGateway;
    fetchMock = jest.fn();
    (global as any).fetch = fetchMock;
  });

  const call = () =>
    OpenRouterGateway.request({ model: 'primary', messages: [], temperature: 0.7, max_tokens: 10 } as any);

  it('stays CLOSED after many concurrent 429s, then serves a healthy request', async () => {
    fetchMock.mockResolvedValue(res(429, false)); // upstream "busy"

    // 6 concurrent busy failures — more than the 5-failure threshold.
    const results = await Promise.allSettled(Array.from({ length: 6 }, call));
    expect(results.every((r) => r.status === 'rejected')).toBe(true);

    // Breaker must still be closed: a now-healthy upstream succeeds (fetch is hit).
    fetchMock.mockResolvedValue(res(200, true));
    const r: any = await call();
    expect(r.ok).toBe(true);
  });

  it('OPENS after 5 genuine 5xx failures and fast-fails without calling fetch', async () => {
    fetchMock.mockResolvedValue(res(500, false));

    for (let i = 0; i < 5; i++) {
      await call().catch(() => {});
    }

    const fetchCallsBefore = fetchMock.mock.calls.length;
    await expect(call()).rejects.toThrow(/temporarily unavailable/i);
    // Open circuit short-circuits: no new upstream call was made.
    expect(fetchMock.mock.calls.length).toBe(fetchCallsBefore);
  });
});
