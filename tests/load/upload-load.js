/**
 * k6 load test — POST /api/upload (multipart) — concurrency for the upload path.
 *
 * Lower ceiling (10 → 25 VUs): each upload holds a 60s function slot, and the
 * per-user in-flight lock serializes a single user's uploads (2nd → 429 INFLIGHT).
 * With distinct seeded users (one token per VU) this measures cross-user upload
 * concurrency. Asserts 202 (accepted) or graceful 429 — never 5xx / OOM.
 *
 * Prereqs:
 *   node tests/fixtures/make-fixtures.mjs     # creates tests/fixtures/sample.pdf
 *   node tests/load/seed-users.mjs           # tokens.json
 *   npm run dev
 * Run:
 *   k6 run -e BASE_URL=http://localhost:3000 -e TOKENS_FILE=./tests/load/tokens.json tests/load/upload-load.js
 */
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const TOKENS_FILE = __ENV.TOKENS_FILE || './tests/load/tokens.json';

const tokens = new SharedArray('tokens', () => {
  const raw = JSON.parse(open(TOKENS_FILE));
  return raw.map((t) => t.accessToken);
});

// Read the fixture once (binary). Generate it with make-fixtures.mjs first.
const pdfBin = open('./tests/fixtures/sample.pdf', 'b');

const serverErrors = new Rate('server_errors');
const accepted = new Rate('accepted_202');

export const options = {
  scenarios: {
    ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 25 },
        { duration: '20s', target: 0 },
      ],
      gracefulStop: '65s',
    },
  },
  thresholds: {
    server_errors: ['rate<0.02'],
  },
};

export default function () {
  if (tokens.length === 0) throw new Error('No tokens — run: node tests/load/seed-users.mjs');
  const token = tokens[(__VU - 1) % tokens.length];

  const res = http.post(
    `${BASE_URL}/api/upload`,
    {
      collectionName: `loadtest-${__VU}-${__ITER}`,
      outputType: 'key-points',
      wordCount: '100',
      files: http.file(pdfBin, 'sample.pdf', 'application/pdf'),
    },
    {
      headers: { Authorization: `Bearer ${token}` }, // let k6 set multipart Content-Type
      timeout: '65s',
      tags: { name: 'POST /api/upload' },
    },
  );

  serverErrors.add(res.status >= 500);
  accepted.add(res.status === 202);

  check(res, {
    '202 accepted or 429 inflight': (r) => r.status === 202 || r.status === 429,
    'never 5xx': (r) => r.status < 500,
  });
}
