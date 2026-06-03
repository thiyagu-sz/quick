/**
 * Upload stability — API level (Playwright `request`). QuickNotes concern #4.
 *
 * Prereqs:
 *   node tests/fixtures/make-fixtures.mjs     # creates the PDFs used here
 *   node tests/load/seed-users.mjs            # or set TOKEN_A
 *   npm run dev                               # real Supabase needed (creates rows)
 * Run:
 *   npx playwright test tests/upload/upload.spec.ts
 *
 * These create real rows (collections / document_collections) under the seeded
 * user. Use a throwaway/test Supabase project.
 */
import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function firstToken(): string | undefined {
  if (process.env.TOKEN_A) return process.env.TOKEN_A;
  const p = join(process.cwd(), 'tests/load/tokens.json');
  if (!existsSync(p)) return undefined;
  try {
    return JSON.parse(readFileSync(p, 'utf8'))[0]?.accessToken;
  } catch {
    return undefined;
  }
}

const TOKEN = firstToken();
const FIX = (f: string) => join(process.cwd(), 'tests/fixtures', f);
const haveFixtures = existsSync(FIX('large.pdf')) && existsSync(FIX('corrupt.pdf'));

function pdf(name: string) {
  return { name, mimeType: 'application/pdf', buffer: readFileSync(FIX(name)) };
}
const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

test.describe.serial('upload stability', () => {
  test.skip(!TOKEN, 'Needs a seeded token: run `node tests/load/seed-users.mjs`');
  test.skip(!haveFixtures, 'Needs fixtures: run `node tests/fixtures/make-fixtures.mjs`');

  test('large multi-page PDF is accepted (202) well under the 60s timeout', async ({ request }) => {
    const started = Date.now();
    const res = await request.post('/api/upload', {
      headers: auth(TOKEN!),
      multipart: {
        collectionName: `audit-large-${Date.now()}`,
        outputType: 'key-points',
        wordCount: '100',
        files: pdf('large.pdf'),
      },
      timeout: 60_000,
    });
    const elapsed = Date.now() - started;
    expect(res.status(), `expected 202, got ${res.status()}`).toBe(202);
    expect(elapsed, 'must finish under the 60s function budget').toBeLessThan(60_000);
    const body = await res.json();
    expect(body.status).toBe('processing');
    expect(Array.isArray(body.documents)).toBeTruthy();
  });

  test('unsupported file type is rejected with 400', async ({ request }) => {
    const res = await request.post('/api/upload', {
      headers: auth(TOKEN!),
      multipart: {
        collectionName: `audit-bad-type-${Date.now()}`,
        outputType: 'key-points',
        wordCount: '100',
        files: { name: 'pic.png', mimeType: 'image/png', buffer: readFileSync(FIX('sample.pdf')) },
      },
    });
    expect(res.status(), 'unsupported MIME must be 400').toBe(400);
    const body = await res.json();
    expect(JSON.stringify(body)).toMatch(/supported format|not a supported/i);
  });

  test('a corrupt PDF is rejected with 422 (extraction error surfaced, not silent 202)', async ({ request }) => {
    // Fixed 2026-06-02: when no file yields text, the route now returns 422 with
    // `details`, instead of a silent 202 with documents:[].
    const res = await request.post('/api/upload', {
      headers: auth(TOKEN!),
      multipart: {
        collectionName: `audit-corrupt-${Date.now()}`,
        outputType: 'key-points',
        wordCount: '100',
        files: pdf('corrupt.pdf'),
      },
    });
    expect(res.status(), 'corrupt-only upload must be 422').toBe(422);
    const body = await res.json();
    expect(JSON.stringify(body)).toMatch(/no readable text|extract/i);
    expect(Array.isArray(body.details), 'should list per-file errors').toBeTruthy();
  });

  test('concurrent uploads from one user stay graceful (202/429, never 5xx)', async ({ request }) => {
    const fire = () =>
      request.post('/api/upload', {
        headers: auth(TOKEN!),
        multipart: {
          collectionName: `audit-concurrent-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          outputType: 'key-points',
          wordCount: '100',
          files: pdf('large.pdf'),
        },
        timeout: 60_000,
      });

    const results = await Promise.all([fire(), fire(), fire(), fire()]);
    const statuses = results.map((r) => r.status());
    // The per-user in-flight lock may turn some into 429 (timing-dependent); the
    // invariant that matters for "don't OOM/crash" is: every response is graceful.
    for (const s of statuses) {
      expect([202, 429], `unexpected status ${s} (statuses=${statuses.join(',')})`).toContain(s);
    }
    expect(statuses.some((s) => s === 202), 'at least one upload should be accepted').toBeTruthy();
  });

  test.fixme('embeddings should be generated in parallel batches (KNOWN BROKEN)', async () => {
    // Documents the gap honestly rather than asserting a passing "batched" claim:
    // app/api/upload/route.ts defines chunkText()/generateAINotes() but NEVER calls
    // them, generates NO embeddings, and leaves document_chunks empty. RAG is inert.
    // Re-enable this test once chunking + batched embeddings are implemented and
    // wired to document_chunks (and the 1536-vs-384 dimension mismatch is fixed).
  });
});
