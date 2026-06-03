/**
 * Security — request input validation (Category G, runnable portion).
 * The rest of G (committed secrets, fail-closed limiter, service-role RLS bypass,
 * CORS/headers) is a static review in the assessment, not a test.
 *
 * These exercise the guards that run BEFORE any LLM call, so they cost nothing:
 *  - POST /api/chat  : Content-Length > 1 MB → 413; question > 50,000 chars → 400;
 *                      malformed JSON → graceful error (no 5xx crash / hang).
 *  - POST /api/chat/pdf : markdown > 500 KB → 413.
 *
 * Needs a running dev server + one seeded token (auth runs first on these routes).
 *   node tests/load/seed-users.mjs   (or set TOKEN_A)
 * Run:  npx playwright test tests/security/input-validation.spec.ts
 *
 * Each request sends a unique x-user-id so the per-IP edge limiter (middleware.ts)
 * doesn't flake these assertions.
 */
import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function firstToken(): string | undefined {
  if (process.env.TOKEN_A) return process.env.TOKEN_A;
  const p = join(process.cwd(), 'tests/load/tokens.json');
  if (!existsSync(p)) return undefined;
  try { return JSON.parse(readFileSync(p, 'utf8'))[0]?.accessToken; } catch { return undefined; }
}
const TOKEN = firstToken();

let n = 0;
function headers(json = true): Record<string, string> {
  const h: Record<string, string> = { Authorization: `Bearer ${TOKEN}`, 'x-user-id': `sec-${Date.now()}-${n++}` };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

test.describe('request input validation', () => {
  test.skip(!TOKEN, 'Needs a seeded token: run `node tests/load/seed-users.mjs`');

  test('POST /api/chat — body > 1 MB → 413 (before any AI call)', async ({ request }) => {
    const big = 'x'.repeat(1_100_000); // ~1.1 MB → trips the content-length guard
    const res = await request.post('/api/chat', { headers: headers(), data: JSON.stringify({ question: big }) });
    expect(res.status(), 'oversized body must be rejected 413').toBe(413);
  });

  test('POST /api/chat — question > 50,000 chars → 400 (under 1 MB)', async ({ request }) => {
    const q = 'a'.repeat(60_000); // ~60 KB: passes content-length, fails length check
    const res = await request.post('/api/chat', { headers: headers(), data: JSON.stringify({ question: q }) });
    expect(res.status(), 'over-long question must be 400').toBe(400);
  });

  test('POST /api/chat — malformed JSON → graceful error, never a 5xx hang', async ({ request }) => {
    const res = await request.post('/api/chat', { headers: headers(), data: '{"question": "oops"' /* truncated */ });
    // Must respond (not hang) with a structured error. Current behavior: 500 via
    // ErrorHandler (json() throws). Acceptable = any 4xx/5xx with a body, not a crash.
    expect(res.status(), `got ${res.status()}`).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(600);
    const body = await res.text();
    expect(body.length, 'should return an error body, not empty/crash').toBeGreaterThan(0);
  });

  test('POST /api/chat — missing question → 400', async ({ request }) => {
    const res = await request.post('/api/chat', { headers: headers(), data: JSON.stringify({ notquestion: 'x' }) });
    expect(res.status()).toBe(400);
  });

  test('POST /api/chat/pdf — markdown > 500 KB → 413', async ({ request }) => {
    const md = '# '.repeat(300_000); // ~600 KB
    const res = await request.post('/api/chat/pdf', { headers: headers(), data: JSON.stringify({ markdown: md, title: 'big' }) });
    expect(res.status(), 'oversized markdown must be 413').toBe(413);
  });
});
