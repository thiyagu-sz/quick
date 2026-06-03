/**
 * Auth failures & cross-user isolation — API level (Playwright `request`).
 *
 * Covers QuickNotes' #2 concern: 401 enforcement, invalid-token rejection, and
 * the CRITICAL cross-user data-leak test against the service-role routes that
 * bypass RLS (chat/save, chat/load, notes/generate).
 *
 * Prereq for the cross-user + positive tests: two seeded JWTs.
 *   node tests/load/seed-users.mjs            (writes tests/load/tokens.json)
 *   — or set env TOKEN_A / TOKEN_B.
 * The no-token / invalid-token / anonymous-feedback tests need only a running
 * dev server (they don't require seeded users).
 *
 * Run:  npx playwright test tests/auth/auth.spec.ts
 *
 * NOTE: each request sends a unique `x-user-id` header. That header ONLY changes
 * the edge rate-limiter's bucket key (middleware.ts) — it does NOT authenticate —
 * so it keeps these auth assertions from flaking on the 10/min-per-IP edge limit.
 */
import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

type Seed = { accessToken: string; userId?: string; email?: string };

function loadTokens(): Seed[] {
  if (process.env.TOKEN_A && process.env.TOKEN_B) {
    return [{ accessToken: process.env.TOKEN_A }, { accessToken: process.env.TOKEN_B }];
  }
  const p = join(process.cwd(), 'tests/load/tokens.json');
  if (!existsSync(p)) return [];
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return [];
  }
}

const tokens = loadTokens();
const haveTwo = tokens.length >= 2;
const TOKEN_A = tokens[0]?.accessToken;
const TOKEN_B = tokens[1]?.accessToken;

let n = 0;
function headers(token?: string): Record<string, string> {
  const h: Record<string, string> = { 'x-user-id': `pwtest-${Date.now()}-${n++}` };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

const NIL_UUID = '00000000-0000-0000-0000-000000000000';

// Every route here MUST reject an unauthenticated/invalid caller.
const protectedRoutes = [
  { name: 'GET /api/chat/history', method: 'GET', path: '/api/chat/history?limit=5' },
  { name: 'GET /api/chat/load', method: 'GET', path: `/api/chat/load?id=${NIL_UUID}` },
  { name: 'DELETE /api/chat/delete', method: 'DELETE', path: `/api/chat/delete?id=${NIL_UUID}` },
  { name: 'POST /api/chat', method: 'POST', path: '/api/chat', data: { question: 'x' } },
  { name: 'POST /api/upload', method: 'POST', path: '/api/upload', data: {} },
  { name: 'GET /api/notes/generate', method: 'GET', path: `/api/notes/generate?collectionId=${NIL_UUID}` },
  { name: 'POST /api/chat/pdf', method: 'POST', path: '/api/chat/pdf', data: { markdown: '# x' } },
  { name: 'POST /api/chat/save', method: 'POST', path: '/api/chat/save', data: { title: 'x', messages: [{ role: 'user', content: 'x' }] } },
  { name: 'POST /api/chat/export', method: 'POST', path: '/api/chat/export', data: { title: 'x', content: 'x', type: 'pdf' } },
] as const;

async function call(request: any, r: { method: string; path: string; data?: unknown }, token?: string) {
  const opts: any = { headers: headers(token) };
  if (r.method === 'GET') return request.get(r.path, opts);
  if (r.method === 'DELETE') return request.delete(r.path, opts);
  return request.post(r.path, { ...opts, data: r.data ?? {} });
}

test.describe('No token → 401 on every protected route', () => {
  for (const r of protectedRoutes) {
    test(`${r.name} → 401 without a token`, async ({ request }) => {
      const res = await call(request, r);
      expect(res.status(), `${r.name} must reject anonymous`).toBe(401);
    });
  }
});

test.describe('Invalid/garbage token → 401, never 200', () => {
  for (const r of protectedRoutes) {
    test(`${r.name} → 401 with a bogus token`, async ({ request }) => {
      const res = await call(request, r, 'not-a-real-jwt.deadbeef.signature');
      expect(res.status(), `${r.name} must reject invalid token`).toBe(401);
      expect(res.status(), `${r.name} must never 200 on bad token`).not.toBe(200);
    });
  }
});

test.describe('Anonymous feedback is intentionally allowed (NOT 401)', () => {
  test('POST /api/feedback without auth is not rejected as unauthorized', async ({ request }) => {
    const res = await request.post('/api/feedback', {
      headers: headers(),
      data: { email: 'anon@quicknotes.test', message: 'audit anonymous feedback check' },
    });
    // May be 200 (saved) or 503 (table missing) — but must NOT be 401.
    expect(res.status(), 'feedback allows anonymous').not.toBe(401);
  });
});

test.describe.serial('Cross-user isolation (the critical data-leak test)', () => {
  test.skip(!haveTwo, 'Needs 2 seeded tokens: run `node tests/load/seed-users.mjs`');

  const SECRET = `SECRET_OF_B_${Date.now()}`;
  let convId = '';

  test('B creates a private conversation via the service-role save route', async ({ request }) => {
    const res = await request.post('/api/chat/save', {
      headers: headers(TOKEN_B),
      data: { title: `B-private-${Date.now()}`, messages: [{ role: 'user', content: SECRET }] },
    });
    expect(res.ok(), `save failed: ${res.status()}`).toBeTruthy();
    const body = await res.json();
    convId = body.id;
    expect(convId, 'expected a conversation id').toBeTruthy();
  });

  test('A CANNOT load B’s conversation (no leak)', async ({ request }) => {
    const res = await request.get(`/api/chat/load?id=${convId}`, { headers: headers(TOKEN_A) });
    expect(res.status(), 'A reading B’s conversation must be 404').toBe(404);
    const text = await res.text();
    expect(text, 'B’s secret message must not appear in A’s response').not.toContain(SECRET);
  });

  test('A’s history does not contain B’s conversation', async ({ request }) => {
    const res = await request.get('/api/chat/history?limit=50', { headers: headers(TOKEN_A) });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const ids = (body.conversations ?? []).map((c: any) => c.id);
    expect(ids, 'A must not see B’s conversation id').not.toContain(convId);
  });

  test('A CANNOT delete B’s conversation', async ({ request }) => {
    const res = await request.delete(`/api/chat/delete?id=${convId}`, { headers: headers(TOKEN_A) });
    expect(res.status(), 'A deleting B’s conversation must be 404').toBe(404);
  });

  test('A CANNOT drive notes/generate for a collection it does not own', async ({ request }) => {
    // Ownership gate in notes/generate: non-owned/missing collection → 403.
    const res = await request.get(`/api/notes/generate?collectionId=${NIL_UUID}`, { headers: headers(TOKEN_A) });
    expect([403, 404], `expected forbidden, got ${res.status()}`).toContain(res.status());
  });

  test('Bearer auth positively works (B can read its own history)', async ({ request }) => {
    const res = await request.get('/api/chat/history?limit=5', { headers: headers(TOKEN_B) });
    expect(res.ok(), 'valid Bearer token should authenticate').toBeTruthy();
  });
});

// Cookie-based auth (vs Bearer) is exercised by the browser flow in
// tests/e2e/chat.spec.ts, where the Supabase session is read from localStorage
// and sent as cookies by the SDK. This API-level file uses Bearer only.
