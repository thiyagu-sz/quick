# UNUSED CODE REPORT
**QuickNotes — Dead Code Detection**
Generated: 2026-05-30 | DO NOT DELETE WITHOUT REVIEWING SAFE_CLEANUP_PLAN.md

---

## Summary

| Category | Count | Impact |
|----------|-------|--------|
| Unused source files (production) | 4 | Low-Medium |
| No-op files (registered but do nothing) | 1 | Low |
| Unused npm packages | 5–6 | Medium (bundle bloat) |
| Unused environment variables | 7 | Low (config bloat) |
| Unused test-only code | 2 | Low |
| Untracked utility scripts | 2 | Low |

---

## 1. Unused Source Files

### 1.1 `app/lib/rateLimiter.ts` — In-Memory Rate Limiter
- **Why it appears unused:** Zero imports found across the entire codebase (`grep` of `from.*rateLimiter` returns only `rateLimiter.redis` imports). This file was the original rate limiter but was completely replaced by `rateLimiter.redis.ts` which provides global Redis-backed rate limiting.
- **Evidence:**
  - `app/api/chat/route.ts` imports `globalRateLimit` from `rateLimiter.redis` ✓
  - `app/api/chat/history/route.ts` imports `upstashRedis` from `rateLimiter.redis` ✓
  - `app/api/chat/delete/route.ts` imports `upstashRedis` from `rateLimiter.redis` ✓
  - `app/api/chat/save/route.ts` imports `upstashRedis` from `rateLimiter.redis` ✓
  - `rateLimiter.ts` has **0 imports** from any other file
  - The file itself contains a comment: "⚠️ SERVERLESS LIMITATION: This rate limiter is in-memory. On Vercel, concurrent requests may run in separate instances."
- **Risk if deleted:** None. The active rate limiter is `rateLimiter.redis.ts`.
- **Confidence: 100%**

---

### 1.2 `app/lib/pdfGenerator.ts` — HTML PDF Generator (Old Version)
- **Why it appears unused:** This file exports `generateProfessionalHTML()` which wraps `reportGenerator.ts`. It is **only referenced in its own test file** (`app/lib/pdfGenerator.test.ts`). No production route or component imports it.
- **Evidence:**
  - `grep "pdfGenerator"` in `*.tsx` files → **0 results**
  - `grep "generateProfessionalHTML"` in `*.tsx` files → **0 results**
  - `grep "pdfGenerator"` in `*.ts` files → only `pdfGenerator.ts` itself and `pdfGenerator.test.ts`
  - Active PDF route (`app/api/chat/pdf/route.ts`) imports from `professionalPdfGenerator` (different file)
  - Active client PDF (`app/chat/page.tsx`) imports from `clientPdfGenerator`
- **Risk if deleted:** Tests in `pdfGenerator.test.ts` will break. The tests themselves test dead code.
- **Confidence: 95%**

---

### 1.3 `app/lib/reportGenerator.ts` — Content Cleaning Utility
- **Why it appears unused:** Only imported by `app/lib/pdfGenerator.ts` (itself unused in production) and its own test file `app/lib/reportGenerator.test.ts`. Contains `ProfessionalReportGenerator` class for stripping URLs, metadata, founder info from content.
- **Evidence:**
  - Only import chain: `reportGenerator.test.ts` → `reportGenerator.ts` ← `pdfGenerator.ts` ← `pdfGenerator.test.ts`
  - No production route or page imports `reportGenerator`
  - `professionalPdfGenerator.ts` (the active PDF generator) does NOT import `reportGenerator.ts`
- **Note:** This utility strips developer personal info (the regex strips "thiyagu", VIT Vellore, etc.) which suggests it was used during an earlier iteration where AI outputs contained that content.
- **Risk if deleted:** Tests in `reportGenerator.test.ts` will break. The tests test dead code.
- **Confidence: 90%**

---

### 1.4 `app/lib/rateLimiter.ts` test — `app/lib/` (no test file found)
- No standalone test for rateLimiter.ts was found. Deletion is clean.

---

## 2. No-Op Files

### 2.1 `middleware.ts` — Pass-Through Middleware
- **Why it appears unused:** The middleware is registered for `/api/:path*` but its handler is a single line: `return NextResponse.next()`. It does nothing. The file's own JSDoc comment confirms: "This middleware now only passes through requests. Rate limiting is centralized in app/lib/rateLimiter.redis.ts."
- **Evidence:**
  ```typescript
  export async function middleware(req: NextRequest) {
    // Rate limiting handled in API routes via globalRateLimit()
    return NextResponse.next();
  }
  ```
- **Impact of keeping it:** Minimal — Next.js middleware runs on every matched request, adding a small cold-start overhead. More importantly, it confuses future developers about where rate limiting lives.
- **Risk if deleted:** None. All actual logic is in individual API routes.
- **Confidence: 100%**

---

## 3. Unused npm Packages

The following packages appear in `package.json` but have **zero import statements** anywhere in the `app/` directory (confirmed via grep across all `.ts` and `.tsx` files):

### 3.1 `@radix-ui/react-dialog@1.1.15`
- **Why unused:** No `import ... from '@radix-ui/react-dialog'` found. Modals are implemented using custom components (`StatusModal.tsx`, `ConfirmationModal.tsx`) using raw `div` overlays.
- **Evidence:** `grep "@radix-ui"` across app/ → 0 results
- **Confidence: 90%** (could theoretically be used in a file not yet read, but all .tsx and .ts files were searched)

### 3.2 `@radix-ui/react-icons@1.3.2`
- **Why unused:** No imports found. Icons are from `lucide-react` package throughout the app.
- **Evidence:** `grep "@radix-ui/react-icons"` → 0 results; lucide-react is used in 10+ files
- **Confidence: 95%**

### 3.3 `@radix-ui/react-slot@1.2.4`
- **Why unused:** No imports found. `Slot` is typically used with `class-variance-authority` for polymorphic buttons, but that pattern is not present.
- **Evidence:** `grep "@radix-ui"` → 0 results
- **Confidence: 85%**

### 3.4 `class-variance-authority@0.7.1`
- **Why unused:** No `cva()` calls or `import ... from 'class-variance-authority'` found. Component variants are handled via inline template literals.
- **Evidence:** `grep "class-variance|cva\("` across all .tsx/.ts files → 0 results
- **Confidence: 90%**

### 3.5 `clsx@2.1.1`
- **Why unused:** No `import clsx` or `from 'clsx'` found. Class name concatenation uses template literals directly.
- **Evidence:** `grep "from.*clsx"` → 0 results
- **Confidence: 90%**

### 3.6 `tailwind-merge@3.4.0`
- **Why unused:** No `import.*twMerge` or `tailwind-merge` found. Would be used alongside `clsx`/`cva` for Tailwind class deduplication.
- **Evidence:** `grep "tailwind-merge"` → 0 results
- **Confidence: 85%**

### 3.7 `@supabase/auth-helpers-nextjs@0.15.0`
- **Why potentially unused:** The app uses `@supabase/ssr` (the modern replacement) for server-side auth. `auth-helpers-nextjs` is the older package. No imports of the old package were found in app/ code.
- **Evidence:** All server auth uses `createServerClient` from `@supabase/ssr`; all client auth uses `getSupabaseClient()` from `app/lib/supabase.ts` which uses `@supabase/supabase-js` directly.
- **Confidence: 75%** (lower confidence because auth packages can be transitively used)

---

## 4. Unused Environment Variables

All seven variables below have **zero references** in any source file under `app/` or `worker/`:

| Variable | Confidence | Notes |
|----------|------------|-------|
| `PORTKEY_API_KEY` | 100% | Portkey gateway was replaced by direct OpenRouter calls |
| `PORTKEY_GATEWAY_URL` | 100% | Same as above |
| `PORTKEY_CHAT_CONFIG_ID` | 100% | Same as above |
| `PORTKEY_NOTES_CONFIG_ID` | 100% | Same as above |
| `CLOUDFLARE_GATEWAY_URL` | 100% | Cloudflare AI gateway was replaced by direct OpenRouter calls |
| `CLOUDFLARE_API_KEY` | 100% | Same as above |
| `CF_ACCOUNT_ID` | 100% | Same as above |
| `GOOGLE_GENERATIVE_AI_API_KEY` | 100% | Google Gemini API key — Gemini was migrated away from (see GEMINI_MIGRATION_GUIDE.md) |

**Additional concern:**
- `AI_MODEL=gemini-2.0-flash-001` — This IS read via `CONFIG.AI.DEFAULT_MODEL` → passed to OpenRouter as the model parameter. However, `gemini-2.0-flash-001` is not a valid OpenRouter model identifier (should be `google/gemini-2.0-flash-001`). This means the system falls back to `CONFIG.AI.FALLBACK_MODEL` (`meta-llama/llama-3.3-70b-instruct`) for notes but `openrouter/auto` for streaming chat (hardcoded in aiService.ts).

---

## 5. Unused API Endpoints

### 5.1 `POST /api/notes/generate`
- **Why unused:** This endpoint returns only `{ message: "Use GET for polling status" }`. The actual functionality uses `GET`. No client code calls `POST /api/notes/generate`.
- **Evidence:** See `app/api/notes/generate/route.ts` lines 236-238
- **Confidence: 100%**

---

## 6. Untracked Utility Scripts

These files appear in `git status` as untracked (`??`) and are not referenced by any other file:

### 6.1 `convert-pdf.mjs`
- **Why appears unused:** Untracked file, not imported anywhere.
- **Evidence:** `git status` shows `?? convert-pdf.mjs`; no imports found
- **Purpose:** Unknown — likely a one-off conversion script.
- **Confidence: 70%** (could be a manual utility needed occasionally)

### 6.2 `convert-to-pdf.js`
- **Why appears unused:** Untracked file, not imported anywhere.
- **Evidence:** `git status` shows `?? convert-to-pdf.js`
- **Purpose:** Unknown — likely a one-off conversion script.
- **Confidence: 70%**

---

## 7. Dead Code Within Active Files

### 7.1 `app/lib/ai/aiService.ts` — Unused Metadata Parameter
- The `metadata` parameter in `streamChat()` and `complete()` is accepted but the `userId` and `conversationId` fields from it are never used (the comment says "Cloudflare handles: retries, failover, caching" but Cloudflare gateway is no longer used).
- **Impact:** Low — just unused function parameters.
- **Confidence: 80%**

### 7.2 `app/dashboard/page.tsx` — `documents` Table Query
- The dashboard queries `supabase.from('documents').select('id', { count: 'exact' })` for `totalDocuments`. However, the upload route writes to `document_collections`, not `documents`. This count will always be 0 unless `documents` is separately populated.
- **Impact:** Medium — stat card always shows 0 for "Total Documents".
- **Confidence: 95%**

### 7.3 `app/lib/clientPdfGenerator.ts` — `generateClientPDF` Helper
- The exported `generateClientPDF()` helper function at the bottom of `clientPdfGenerator.ts` wraps the `ClientPDFGenerator` class. Only the class is needed; the helper adds no value.
- **Impact:** None — minor dead code within an active file.
- **Confidence: 60%**

---

## 8. Partially Wired Features

### 8.1 `app/saved/page.tsx`
- The `/saved` route exists in the app. The dashboard `toggleSaveFolder()` saves folder IDs to localStorage. However, `app/saved/page.tsx` likely does not read this localStorage state to display saved folders.
- **Status:** ⚠️ Page exists but is incomplete. Sidebar probably links to it.
- **Confidence: 65%** (page not fully read)

### 8.2 `app/api/chat/export/route.ts` + `chat_exports` table
- The export API saves to `chat_exports` table. The exports page reads from it. However, `chat_exports` is not defined in `SUPABASE_SCHEMA.md`. Error handling exists for the missing table case.
- **Status:** ⚠️ Feature partially implemented — requires manual schema migration.
- **Confidence: 80%**

---

## 9. Test Files for Dead Code

These test files test code that is itself unused in production. They are technically "active" tests, but they test dead code:

| Test File | Tests | Status |
|-----------|-------|--------|
| `app/lib/pdfGenerator.test.ts` | `generateProfessionalHTML()` from `pdfGenerator.ts` | Tests dead code |
| `app/lib/reportGenerator.test.ts` | `ProfessionalReportGenerator` from `reportGenerator.ts` | Tests dead code |

---

## Confidence Score Legend
- **90-100%:** Virtually certain — confirmed by grep, no imports found, confirmed replacement exists
- **70-89%:** High confidence — evidence strongly suggests unused, minor uncertainty remains
- **50-69%:** Moderate confidence — likely unused but manual verification recommended before deletion
