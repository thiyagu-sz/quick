import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the QuickNotes audit suite (added 2026-06-01).
 *
 * Runs only *.spec.ts files under tests/ (Jest owns *.test.ts).
 *  - tests/auth/   → API-level auth + cross-user isolation (uses request fixture)
 *  - tests/e2e/    → browser streaming/UI tests (mock /api/chat + Supabase)
 *  - tests/upload/ → API-level upload stability
 *
 * BASE_URL defaults to the local dev server. The webServer block will start
 * `npm run dev` automatically unless a server is already running on that port.
 * Auth/upload specs hit your real Supabase project, so the dev server must have
 * a working .env.local. The e2e spec mocks the network and needs no backend.
 */
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  // Auth/upload specs create real rows and depend on ordering within a file,
  // so keep workers modest and let each file run serially internally.
  fullyParallel: false,
  workers: process.env.CI ? 1 : 2,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  timeout: 120_000, // /api/chat can stream up to 120s
  expect: { timeout: 15_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    // No global Content-Type: Playwright sets application/json for `data:` and
    // multipart/form-data for `multipart:` automatically. A global JSON header
    // would corrupt the upload spec's multipart boundary.
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
