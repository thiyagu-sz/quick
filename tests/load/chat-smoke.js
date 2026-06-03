/**
 * k6 SMOKE test — the minimum bar: "can it handle a small class?" (10 concurrent users).
 *
 * Constant 10 VUs for 30s against POST /api/chat. This is the floor — if this fails,
 * do not even bother with the full ramp (tests/load/chat-load.js).
 *
 * Prereqs + the rate-limit caveat are identical to chat-load.js — READ
 * tests/load/README.md. From one machine the edge limiter keys by IP (~10/min),
 * so for a meaningful concurrency number either relax limits in the test env or
 * send a unique per-VU x-user-id. With 10 distinct seeded tokens + relaxed test
 * limits this measures a real 10-user class.
 *
 * Run:
 *   node tests/load/seed-users.mjs        # needs >=10 tokens for a true 10-user test
 *   npm run dev
 *   k6 run -e BASE_URL=http://localhost:3000 -e TOKENS_FILE=./tests/load/tokens.json tests/load/chat-smoke.js
 *
 * PASS (minimum bar): 0 5xx, 0 timeouts, p95 full-response < 30s. 429 is acceptable
 * (limiter working) but at only 10 users with distinct tokens you should see few/none.
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
const rateLimited = new Rate('rate_limited'); // 429 (informational)
const serverErrors = new Rate('server_errors'); // 5xx (must be 0)
const timeouts = new Counter('timeouts');
const fullResponse = new Trend('full_response_ms', true);

export const options = {
  scenarios: {
    smoke: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '125s',
    },
  },
  // Minimum-bar thresholds — stricter than the ramp. Any 5xx/timeout fails the smoke.
  thresholds: {
    server_errors: ['rate==0'],
    timeouts: ['count==0'],
    full_response_ms: ['p(95)<30000'],
  },
};

export default function () {
  if (tokens.length === 0) throw new Error('No tokens — run: node tests/load/seed-users.mjs');
  const token = tokens[(__VU - 1) % tokens.length];

  const res = http.post(
    `${BASE_URL}/api/chat`,
    JSON.stringify({ question: 'List three study tips in one short sentence each.' }),
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      timeout: '125s',
      tags: { name: 'POST /api/chat (smoke)' },
    },
  );

  fullResponse.add(res.timings.duration);
  const is429 = res.status === 429;
  rateLimited.add(is429);
  serverErrors.add(res.status >= 500);
  errorRate.add(!(res.status === 200 || is429));
  if (res.status === 0) timeouts.add(1);

  check(res, {
    'status 200 or 429': (r) => r.status === 200 || r.status === 429,
    'never 5xx': (r) => r.status < 500,
    'no timeout': (r) => r.status !== 0,
  });
}
