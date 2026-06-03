/**
 * Frontend / streaming behavior — browser (Playwright) — QuickNotes' #3 concern.
 *
 * Strategy: mock Supabase auth (so the page mounts as a logged-in user) and mock
 * POST /api/chat with deterministic SSE, then assert the UI behavior described in
 * the audit. No real backend needed.
 *
 * Run:  npx playwright install chromium   (once)
 *       npx playwright test tests/e2e/chat.spec.ts
 *
 * Selectors target the real DOM in app/chat/page.tsx:
 *   - input: textarea placeholder "Paste your content..."
 *   - send/stop: the single <button> inside the footer (Send icon → X while loading)
 * If the markup changes, update these.
 */
import { test, expect, Page } from '@playwright/test';

const FAKE_SESSION = {
  access_token: 'fake-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: 'fake-refresh-token',
  user: {
    id: 'e2e-user',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'e2e@quicknotes.test',
    app_metadata: {},
    user_metadata: { full_name: 'E2E Tester' },
    created_at: new Date().toISOString(),
  },
};

/** Wrap SSE `data:` frames. Pass a raw string for control frames like [DONE]. */
function sse(frames: string[]): string {
  return frames.map((f) => `data: ${f}\n\n`).join('');
}
const token = (s: string) => JSON.stringify({ content: s });

async function mockAuth(page: Page) {
  // Seed the persisted Supabase session before any app script runs.
  await page.addInitScript((session) => {
    localStorage.setItem('quicknotes-auth-token', JSON.stringify(session));
  }, FAKE_SESSION);

  // GoTrue getUser() → return the user object directly.
  await page.route('**/auth/v1/user**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FAKE_SESSION.user) }),
  );
  // Token refresh (if attempted) → return a session.
  await page.route('**/auth/v1/token**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FAKE_SESSION) }),
  );
  // Any Supabase REST read (e.g. loadChatHistory) → empty list.
  await page.route('**/rest/v1/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }),
  );
}

async function gotoChat(page: Page) {
  await mockAuth(page);
  await page.goto('/chat');
  // Page mounts logged-in → welcome screen visible.
  await expect(page.getByText('Welcome to QuickNotes')).toBeVisible({ timeout: 20_000 });
}

async function send(page: Page, text: string) {
  const input = page.getByPlaceholder('Paste your content...');
  await input.click();
  await input.fill(text);
  await input.press('Enter');
}

test.describe('streaming UI', () => {
  test('renders the streamed answer and completes on [DONE]', async ({ page }) => {
    await page.route('**/api/chat', (route) =>
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
        body: sse([
          token('The water '),
          token('cycle has '),
          token('three stages.'),
          JSON.stringify({ conversationId: 'conv-e2e-1', sources: [] }),
          '[DONE]',
        ]),
      }),
    );
    await gotoChat(page);
    await send(page, 'Explain the water cycle in three stages clearly.');

    // Assembled assistant content is rendered…
    await expect(page.getByText(/three stages\./)).toBeVisible({ timeout: 15_000 });
    // …and the "thinking" loader clears after [DONE] (stream completed cleanly).
    await expect(page.getByText('AI is thinking... wait a minute...')).toBeHidden({ timeout: 15_000 });
  });

  test('a stream that DROPS without [DONE] does not hang the UI forever', async ({ page }) => {
    // Content frames but no [DONE] and no final event; connection then closes.
    await page.route('**/api/chat', (route) =>
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
        body: sse([token('Partial answer that never finishes')]),
      }),
    );
    await gotoChat(page);
    await send(page, 'Give me a long explanation of photosynthesis please.');

    // Partial text shows, AND the loader clears because reader `done` fires →
    // finally{} sets isLoading=false. (This is the "closed stream" case — handled.)
    await expect(page.getByText(/Partial answer/)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('AI is thinking... wait a minute...')).toBeHidden({ timeout: 15_000 });
    // Input is usable again (not stuck disabled).
    await expect(page.getByPlaceholder('Paste your content...')).toBeEnabled();
    // NOTE: the genuinely-unhandled case is a stream that stays OPEN but SILENT
    // (no bytes, no close). There is no client inactivity timeout, so that WOULD
    // hang — see the SHOULD-FIX in docs/QUICKNOTES_MASTER.md §12. Not simulated
    // here because it would just hang the test.
  });

  test('rapid double-send does NOT fire a duplicate request', async ({ page }) => {
    let calls = 0;
    await page.route('**/api/chat', (route) => {
      calls++;
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
        body: sse([token('done'), '[DONE]']),
      });
    });
    await gotoChat(page);

    const input = page.getByPlaceholder('Paste your content...');
    await input.click();
    await input.fill('Summarize the French Revolution in key points.');
    await input.press('Enter');
    await input.press('Enter'); // 2nd Enter — input is now cleared, must be a no-op

    await expect(page.getByText('done')).toBeVisible({ timeout: 15_000 });
    expect(calls, 'second Enter must not fire a second /api/chat request').toBe(1);
    // Guard is state-based (isLoading/empty input); the server in-flight lock
    // (429) is the real protection. See §12 SHOULD-FIX (add a sync ref lock).
  });

  test('clicking Cancel aborts the in-flight request (AbortController)', async ({ page }) => {
    // Hold the response open so the request is in-flight when we cancel.
    await page.route('**/api/chat', async (route) => {
      await new Promise((r) => setTimeout(r, 6000));
      try {
        await route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
          body: sse([token('late'), '[DONE]']),
        });
      } catch {
        /* request was aborted by the client — expected */
      }
    });
    await gotoChat(page);
    await send(page, 'Write a very long essay about thermodynamics.');

    // Loader appears while streaming…
    await expect(page.getByText('AI is thinking... wait a minute...')).toBeVisible({ timeout: 10_000 });
    // …click the footer send/stop button (now an X) to cancel.
    await page.locator('footer button').click();

    await expect(page.getByText('Request cancelled.')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('AI is thinking... wait a minute...')).toBeHidden({ timeout: 10_000 });
  });

  test('a 429 shows a clear retry message, not a crash', async ({ page }) => {
    await page.route('**/api/chat', (route) =>
      route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ retryAfter: 2, message: 'Too many requests. Please slow down.' }),
      }),
    );
    await gotoChat(page);
    await send(page, 'Explain Newton’s laws of motion in detail.');

    // Sanitized rate-limit message surfaces (toast + assistant bubble), no crash.
    await expect(page.getByText(/Too many requests/i).first()).toBeVisible({ timeout: 10_000 });
    // The page is still alive (input present).
    await expect(page.getByPlaceholder('Paste your content...')).toBeVisible();
  });

  test('logout cleanup hook clears in-memory chat state (no stale messages)', async ({ page }) => {
    await page.route('**/api/chat', (route) =>
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
        body: sse([token('Remembered answer'), '[DONE]']),
      }),
    );
    await gotoChat(page);
    await send(page, 'Summarize the causes of World War I in key points.');
    await expect(page.getByText(/Remembered answer/)).toBeVisible({ timeout: 15_000 });

    // The chat page wires a logout cleanup hook: window 'authChangeClear' →
    // setMessages([]) / setChatHistory([]) / setCurrentConversationId(null).
    // (Full Supabase SIGNED_OUT → /login redirect is driven by the Sidebar logout
    // in the real app; this verifies the client-state-clear path deterministically.)
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('authChangeClear')));

    // Stale assistant message is gone; the empty/welcome state returns.
    await expect(page.getByText(/Remembered answer/)).toBeHidden({ timeout: 10_000 });
    await expect(page.getByText('Welcome to QuickNotes')).toBeVisible({ timeout: 10_000 });
  });
});
