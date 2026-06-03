/**
 * Design / responsive / UX tests (Category D) — Playwright (Chromium).
 *
 * Viewports: mobile 375x667, tablet 768x1024, desktop 1440x900.
 * Pages: "/" (landing), "/login" (public), "/chat" (mocked auth + mocked /api/chat).
 *
 * IMPORTANT: app/globals.css sets `body { overflow-x: hidden; max-width:100vw }`, so
 * `document.scrollWidth > clientWidth` is ALWAYS false — a naive "no horizontal scroll"
 * assertion passes vacuously. We instead scan getBoundingClientRect() of every VISIBLE
 * element and flag any that STARTS inside the viewport but extends past it (true layout
 * overflow), which rects still report under overflow:hidden.
 *
 * Two kinds of checks:
 *  - HARD assertions (the minimum bar that a healthy app should pass): no visible element
 *    overflows by >5px; on /chat the input is visible and within the viewport.
 *  - SOFT audit (non-failing): collects <44px tap targets, sub-12px fonts, and any
 *    overflowers, attaching them as annotations so they're reported without gating CI.
 *
 * Run:  npx playwright install chromium   (once)
 *       npx playwright test tests/responsive/responsive.spec.ts
 */
import { test, expect, Page } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 667 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

const FAKE_SESSION = {
  access_token: 'fake-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: 'fake-refresh-token',
  user: {
    id: 'e2e-user', aud: 'authenticated', role: 'authenticated',
    email: 'e2e@quicknotes.test', app_metadata: {}, user_metadata: { full_name: 'E2E Tester' },
    created_at: new Date().toISOString(),
  },
};

async function mockAuthAndChat(page: Page) {
  await page.addInitScript((s) => localStorage.setItem('quicknotes-auth-token', JSON.stringify(s)), FAKE_SESSION);
  await page.route('**/auth/v1/user**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FAKE_SESSION.user) }));
  await page.route('**/auth/v1/token**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FAKE_SESSION) }));
  await page.route('**/rest/v1/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  // Default /api/chat mock so the page is functional if a message is sent.
  await page.route('**/api/chat', (r) =>
    r.fulfill({
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
      body: 'data: {"content":"Short answer."}\n\ndata: [DONE]\n\n',
    }),
  );
}

/**
 * Returns visible elements that overflow the viewport horizontally, plus all
 * interactive tap targets <44px and any visible text rendered <12px.
 */
async function auditViewport(page: Page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const TOL = 5;
    const isVisible = (el: Element) => {
      // checkVisibility (Chromium) handles display/visibility/opacity/content-visibility.
      const anyEl = el as any;
      if (typeof anyEl.checkVisibility === 'function') {
        if (!anyEl.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false;
      }
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const describe = (el: Element) => {
      const e = el as HTMLElement;
      const cls = (typeof e.className === 'string' ? e.className : '').split(/\s+/).slice(0, 3).join('.');
      return `${el.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${cls ? '.' + cls : ''}`.slice(0, 80);
    };

    const all = Array.from(document.querySelectorAll('*'));
    const overflowers: string[] = [];
    const smallFonts: string[] = [];
    for (const el of all) {
      if (!isVisible(el)) continue;
      const r = el.getBoundingClientRect();
      // True overflow: starts inside the viewport but extends past the right edge.
      if (r.left < vw - 1 && r.right > vw + TOL) {
        overflowers.push(`${describe(el)} [right=${Math.round(r.right)} vw=${vw}]`);
      }
      // Sub-12px fonts on elements with direct text.
      const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent || '').trim().length > 0);
      if (hasText) {
        const fs = parseFloat(getComputedStyle(el).fontSize || '16');
        if (fs && fs < 12) smallFonts.push(`${describe(el)} [${fs}px]`);
      }
    }

    const interactiveSel = 'button, a[href], input:not([type=hidden]), textarea, select, [role=button]';
    const smallTargets: string[] = [];
    for (const el of Array.from(document.querySelectorAll(interactiveSel))) {
      if (!isVisible(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 44 || r.height < 44) {
        smallTargets.push(`${describe(el)} [${Math.round(r.width)}x${Math.round(r.height)}]`);
      }
    }
    // De-dup for readability.
    const uniq = (a: string[]) => Array.from(new Set(a));
    return { overflowers: uniq(overflowers), smallFonts: uniq(smallFonts), smallTargets: uniq(smallTargets) };
  });
}

// ── Public pages: hard no-overflow assertion + soft audit ────────────────────
for (const vp of VIEWPORTS) {
  for (const path of ['/', '/login']) {
    test(`[${vp.name}] ${path} — no horizontal overflow (+ a11y audit)`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300); // let fonts/layout settle

      const { overflowers, smallFonts, smallTargets } = await auditViewport(page);

      if (smallFonts.length) testInfo.annotations.push({ type: 'a11y-font<12px', description: `${path}@${vp.width}: ${smallFonts.join(' | ')}` });
      if (smallTargets.length) testInfo.annotations.push({ type: 'a11y-tap<44px', description: `${path}@${vp.width}: ${smallTargets.slice(0, 20).join(' | ')}` });
      if (overflowers.length) testInfo.annotations.push({ type: 'overflow', description: `${path}@${vp.width}: ${overflowers.join(' | ')}` });

      // HARD: nothing visible should overflow the viewport horizontally.
      expect(overflowers, `Horizontal overflow at ${vp.width}px on ${path}`).toEqual([]);
    });
  }
}

// ── Chat page (mocked auth): layout + input reachability + long content ──────
for (const vp of VIEWPORTS) {
  test(`[${vp.name}] /chat — input reachable, no overflow, tap-target audit`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await mockAuthAndChat(page);
    await page.goto('/chat', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Welcome to QuickNotes')).toBeVisible({ timeout: 20_000 });

    // Input is visible and fully within the viewport.
    const input = page.getByPlaceholder('Paste your content...');
    await expect(input).toBeVisible();
    const box = await input.boundingBox();
    expect(box, 'chat input should have a box').not.toBeNull();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(-1);
      expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1);
    }

    const { overflowers, smallFonts, smallTargets } = await auditViewport(page);
    if (smallFonts.length) testInfo.annotations.push({ type: 'a11y-font<12px', description: `/chat@${vp.width}: ${smallFonts.join(' | ')}` });
    if (smallTargets.length) testInfo.annotations.push({ type: 'a11y-tap<44px', description: `/chat@${vp.width}: ${smallTargets.slice(0, 20).join(' | ')}` });
    if (overflowers.length) testInfo.annotations.push({ type: 'overflow', description: `/chat@${vp.width}: ${overflowers.join(' | ')}` });

    expect(overflowers, `Horizontal overflow at ${vp.width}px on /chat`).toEqual([]);
  });
}

// ── Long content must not break layout (mobile is the worst case) ────────────
test('[mobile-375] /chat — long message + long streamed response do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await mockAuthAndChat(page);
  // Override with a very long streamed answer (no spaces → worst case for wrapping).
  const longWord = 'Supercalifragilistic' + 'a'.repeat(400);
  await page.route('**/api/chat', (r) =>
    r.fulfill({
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
      body: `data: {"content":"${longWord} "}\n\ndata: {"content":"${'word '.repeat(300)}"}\n\ndata: [DONE]\n\n`,
    }),
  );
  await page.goto('/chat', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Welcome to QuickNotes')).toBeVisible({ timeout: 20_000 });

  const input = page.getByPlaceholder('Paste your content...');
  await input.fill('A'.repeat(1200)); // long user input
  await input.press('Enter');
  await expect(page.getByText(/word word/).first()).toBeVisible({ timeout: 15_000 });
  await page.waitForTimeout(300);

  const { overflowers } = await auditViewport(page);
  expect(overflowers, `Long content overflowed at 375px: ${overflowers.join(' | ')}`).toEqual([]);
});
