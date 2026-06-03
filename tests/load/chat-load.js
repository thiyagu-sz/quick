/**
 * k6 load test — POST /api/chat (streaming) — QuickNotes' #1 concern: concurrency.
 *
 * Ramps 10 → 25 → 50 → 100 VUs. Each VU uses a distinct seeded JWT.
 * k6 buffers the full SSE response before returning, so res.timings.duration is
 * the FULL-response time (good for p95 of a complete answer).
 *
 * Run:
 *   node tests/load/seed-users.mjs           # writes tokens.json (needs SUPABASE_* env)
 *   npm run dev                              # in another terminal
 *   k6 run -e BASE_URL=http://localhost:3000 -e TOKENS_FILE=./tests/load/tokens.json tests/load/chat-load.js
 *
 * READ tests/load/README.md FIRST — the per-IP edge limiter will cap a
 * single-machine run at ~10 req/min unless you relax limits for the test env.
 * 429 is EXPECTED and counts as PASS; 5xx / timeouts are FAIL.
 */
import http from 'k6/http';
import { check } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import { SharedArray } from 'k6/data';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const TOKENS_FILE = __ENV.TOKENS_FILE || './tests/load/tokens.json';

const tokens = new SharedArray('tokens', () => {
  const raw = JSON.parse(open(TOKENS_FILE));
  return raw.map((t) => t.accessToken);
});

const errorRate = new Rate('errors'); // non-200, non-429
const rateLimited = new Rate('rate_limited'); // 429 (expected, informational)
const serverErrors = new Rate('server_errors'); // 5xx (must stay low)
const timeouts = new Counter('timeouts'); // status 0 (timeout / conn reset)
const fullResponse = new Trend('full_response_ms', true);

export const options = {
  scenarios: {
    ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 25 },
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '125s',
    },
  },
  // Thresholds make `k6 run` exit non-zero on failure (CI-friendly).
  // Tune full_response_ms p95 to ~3× your measured single-user baseline.
  thresholds: {
    server_errors: ['rate<0.02'], // < 2% 5xx
    errors: ['rate<0.05'], // < 5% unexpected errors (429 excluded)
    full_response_ms: ['p(95)<60000'], // p95 full answer < 60s
  },
};

export default function () {
  if (tokens.length === 0) {
    throw new Error('No tokens — run: node tests/load/seed-users.mjs');
  }
  const token = tokens[(__VU - 1) % tokens.length];

  const res = http.post(
    `${BASE_URL}/api/chat`,
    JSON.stringify({ question: 'Summarize the water cycle in three concise bullet points.' }),
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      timeout: '125s',
      tags: { name: 'POST /api/chat' },
    },
  );

  fullResponse.add(res.timings.duration);
  const is429 = res.status === 429;
  const is5xx = res.status >= 500;
  rateLimited.add(is429);
  serverErrors.add(is5xx);
  errorRate.add(!(res.status === 200 || is429));
  if (res.status === 0) timeouts.add(1);

  check(res, {
    'status 200 or 429 (graceful)': (r) => r.status === 200 || r.status === 429,
    'never 5xx': (r) => r.status < 500,
    'no timeout (status!=0)': (r) => r.status !== 0,
  });
}
