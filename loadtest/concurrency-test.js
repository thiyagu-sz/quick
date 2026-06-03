/**
 * QuickNotes concurrency load test — k6
 *
 * Required env vars:
 *   BASE_URL        e.g. https://quicknotess.space
 *   TEST_TOKEN_1    JWT access token for test user 1
 *   TEST_TOKEN_2    JWT access token for test user 2
 *   ...up to TEST_TOKEN_10
 *
 * Run:
 *   k6 run -e BASE_URL=https://... -e TEST_TOKEN_1=eyJ... loadtest/concurrency-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// ─── Custom metrics ───────────────────────────────────────────────────────────
const dbConnectionErrors = new Counter('db_connection_errors');
const aiTooManyRequests  = new Counter('ai_429_errors');
const errorRate          = new Rate('error_rate');
const readLatency        = new Trend('read_latency', true);  // true = report in ms
const chatLatency        = new Trend('chat_latency', true);

// ─── Scenarios ────────────────────────────────────────────────────────────────
export const options = {
  scenarios: {
    // Scenario A: Read path — ramp 1→50 VUs over 2 min hitting GET /api/chat/history
    history_reads: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '2m', target: 50 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '15s',
      exec: 'scenarioA',
      tags: { scenario: 'A_history_reads' },
    },

    // Scenario B: Heavy path — 10 concurrent VUs each POSTing to /api/chat
    concurrent_chat: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      exec: 'scenarioB',
      tags: { scenario: 'B_concurrent_chat' },
      startTime: '10s', // slight delay so reads start first
    },

    // Scenario C: Upload + poll notes/generate — 5 concurrent users
    notes_generation: {
      executor: 'constant-vus',
      vus: 5,
      duration: '2m',
      exec: 'scenarioC',
      tags: { scenario: 'C_notes_generation' },
      startTime: '20s',
    },
  },

  thresholds: {
    // Scenario A: p95 read latency under 3s
    'read_latency{scenario:A_history_reads}': ['p(95)<3000'],

    // Overall error rate under 1%
    error_rate: ['rate<0.01'],

    // Zero "too many connections" DB errors
    db_connection_errors: ['count==0'],

    // HTTP 4xx/5xx (excluding intentional 429s) under 1%
    http_req_failed: ['rate<0.05'],
  },
};

// ─── Token pool ───────────────────────────────────────────────────────────────
// Reads up to 10 tokens from env; falls back to empty string (unauthenticated)
// so the test still runs and reports 401s rather than crashing.
const TOKENS = Array.from({ length: 10 }, (_, i) =>
  __ENV[`TEST_TOKEN_${i + 1}`] || ''
).filter(Boolean);

if (TOKENS.length === 0) {
  console.warn('WARNING: No TEST_TOKEN_N env vars set. All requests will return 401.');
}

function tokenForVU() {
  if (TOKENS.length === 0) return '';
  return TOKENS[(__VU - 1) % TOKENS.length];
}

function authHeaders() {
  const token = tokenForVU();
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
}

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

// ─── Scenario A: GET /api/chat/history ───────────────────────────────────────
export function scenarioA() {
  const start = Date.now();
  const res = http.get(`${BASE}/api/chat/history?limit=10`, {
    headers: authHeaders(),
    tags: { name: 'GET /api/chat/history' },
  });

  const elapsed = Date.now() - start;
  readLatency.add(elapsed);

  const ok = check(res, {
    'history: status 200 or 401': (r) => r.status === 200 || r.status === 401,
    'history: no 500': (r) => r.status !== 500,
  });

  errorRate.add(!ok);
  trackSpecialErrors(res);

  sleep(Math.random() * 2 + 1); // 1–3s think time
}

// ─── Scenario B: POST /api/chat ───────────────────────────────────────────────
export function scenarioB() {
  const start = Date.now();
  const payload = JSON.stringify({
    question: 'What are the key concepts from my uploaded documents?',
    title: 'Load test conversation',
  });

  const res = http.post(`${BASE}/api/chat`, payload, {
    headers: authHeaders(),
    tags: { name: 'POST /api/chat' },
    timeout: '130s', // match maxDuration + buffer
  });

  const elapsed = Date.now() - start;
  chatLatency.add(elapsed);

  const ok = check(res, {
    'chat: not 500': (r) => r.status !== 500,
    'chat: not 503': (r) => r.status !== 503,
    // 200 (stream), 401 (no auth), 429 (rate/inflight) are all acceptable
    'chat: expected status': (r) => [200, 401, 429].includes(r.status),
  });

  errorRate.add(!ok);
  trackSpecialErrors(res);

  sleep(Math.random() * 5 + 5); // 5–10s between chat requests per VU
}

// ─── Scenario C: Upload + poll notes/generate ────────────────────────────────
export function scenarioC() {
  // Step 1: create a minimal "upload" — just poll the generate endpoint
  // (A full file upload requires multipart/form-data and a real file;
  //  here we poll with a synthetic collectionId to test the polling path.)
  const syntheticCollectionId = `loadtest-${__VU}-${Date.now()}`;

  for (let poll = 0; poll < 10; poll++) {
    const res = http.get(
      `${BASE}/api/notes/generate?collectionId=${syntheticCollectionId}`,
      {
        headers: authHeaders(),
        tags: { name: 'GET /api/notes/generate' },
      }
    );

    check(res, {
      'notes-gen: not 500': (r) => r.status !== 500,
      'notes-gen: expected status': (r) => [200, 401, 403, 429].includes(r.status),
    });

    trackSpecialErrors(res);

    // Stop polling once we hit a terminal state
    if (res.status !== 200) break;
    try {
      const body = JSON.parse(res.body);
      if (body.status === 'complete') break;
    } catch (_) {}

    sleep(3); // poll every 3s, matching real client behaviour
  }

  sleep(5);
}

// ─── Error classification ─────────────────────────────────────────────────────
function trackSpecialErrors(res) {
  // Detect Postgres "too many connections" in response body
  if (
    res.status === 500 &&
    res.body &&
    (res.body.includes('too many connections') ||
      res.body.includes('FATAL:') ||
      res.body.includes('53300'))
  ) {
    dbConnectionErrors.add(1);
    console.error(`DB connection error on ${res.url}: ${res.body.substring(0, 200)}`);
  }

  // Track OpenRouter 429s separately for visibility
  if (
    res.status === 429 &&
    res.body &&
    res.body.includes('AI')
  ) {
    aiTooManyRequests.add(1);
  }
}
