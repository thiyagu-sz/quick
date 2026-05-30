# SAFE CLEANUP PLAN
**QuickNotes — Approved Deletion & Cleanup Strategy**
Generated: 2026-05-30 | Review all reports before executing any wave.

> **BEFORE ANY DELETION:**
> 1. Create a cleanup branch: `git checkout -b cleanup-architecture`
> 2. Run the full test suite: `npm test`
> 3. Run a production build: `npm run build`
> 4. After each wave, verify tests and build still pass before proceeding to next wave.

---

## Wave 1 — 100% Safe Deletions

**Risk Level: NONE**
These files are confirmed unused (verified by grep, no imports, no references) and have confirmed active replacements.

### Files to Delete

#### W1-1: `app/lib/rateLimiter.ts`
- **Reason:** Completely replaced by `app/lib/rateLimiter.redis.ts`. Zero imports anywhere.
- **Risk:** None. The replacement is already in production.
- **Rollback:** `git checkout app/lib/rateLimiter.ts`
- **Command:** `git rm app/lib/rateLimiter.ts`

#### W1-2: `middleware.ts`
- **Reason:** Registered no-op. Only calls `NextResponse.next()`. The file's own JSDoc confirms it does nothing.
- **Risk:** None. Deleting a no-op file cannot break functionality.
- **Rollback:** `git checkout middleware.ts`
- **Command:** `git rm middleware.ts`

#### W1-3: `docs/ml-systems-design.md`
- **Reason:** Duplicate of `docs/ML-SYSTEM-DESIGN.md`. Only one canonical ML design document is needed.
- **Risk:** None — exact duplicate.
- **Rollback:** `git checkout docs/ml-systems-design.md`
- **Command:** `git rm docs/ml-systems-design.md`

### Environment Variables to Remove from `.env.local`

These variables have zero references in any source file. Removing them from `.env.local` cleans up confusion:

```bash
# Remove these from .env.local:
PORTKEY_API_KEY
PORTKEY_GATEWAY_URL
PORTKEY_CHAT_CONFIG_ID
PORTKEY_NOTES_CONFIG_ID
CLOUDFLARE_GATEWAY_URL
CLOUDFLARE_API_KEY
CF_ACCOUNT_ID
GOOGLE_GENERATIVE_AI_API_KEY
```

> Also remove from Vercel Dashboard → Project Settings → Environment Variables if set there.

### Fix the `AI_MODEL` Variable Mismatch

```bash
# Current (wrong): AI_MODEL=gemini-2.0-flash-001
# OpenRouter model identifier format: provider/model-name
# Fix to either:
AI_MODEL=deepseek/deepseek-r1
# Or remove the variable entirely to use the code default (deepseek/deepseek-r1)
```

---

## Wave 2 — Likely Safe Deletions

**Risk Level: LOW**
These files are unused in production but have test coverage. Tests will fail — that is expected and acceptable because the tests test dead code. Confirm no hidden production usage before executing.

### Files to Delete

#### W2-1: `app/lib/pdfGenerator.ts`
- **Reason:** Only referenced in its own test file. Not imported by any production route or component. Active PDF generation uses `professionalPdfGenerator.ts` and `clientPdfGenerator.ts`.
- **Verification before delete:**
  ```bash
  # Must return 0 results (excluding the test file itself):
  grep -r "pdfGenerator\|generateProfessionalHTML" app/ --include="*.ts" --include="*.tsx" | grep -v ".test."
  ```
- **Risk:** Low. Tests for this file will break — that is expected since the tests test dead code.
- **Rollback:** `git checkout app/lib/pdfGenerator.ts`
- **Command:** `git rm app/lib/pdfGenerator.ts`

#### W2-2: `app/lib/pdfGenerator.test.ts`
- **Reason:** Tests a file that will be deleted (pdfGenerator.ts). Once W2-1 is done, this test file is invalid.
- **Risk:** None after W2-1 is executed.
- **Command:** `git rm app/lib/pdfGenerator.test.ts`

#### W2-3: `app/lib/reportGenerator.ts`
- **Reason:** Only imported by `pdfGenerator.ts` (deleted in W2-1). No other imports.
- **Verification before delete:**
  ```bash
  grep -r "reportGenerator\|ProfessionalReportGenerator" app/ --include="*.ts" --include="*.tsx" | grep -v ".test."
  ```
- **Risk:** Low after W2-1 is complete.
- **Command:** `git rm app/lib/reportGenerator.ts`

#### W2-4: `app/lib/reportGenerator.test.ts`
- **Reason:** Tests `reportGenerator.ts` which will be deleted.
- **Risk:** None after W2-3.
- **Command:** `git rm app/lib/reportGenerator.test.ts`

### npm Packages to Remove

```bash
# Confirmed unused (zero imports):
npm remove @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

**Verification before removing:**
```bash
# Should return no results for each package:
grep -r "@radix-ui\|class-variance\|from.*clsx\|tailwind-merge" app/ --include="*.ts" --include="*.tsx"
```

**Post-removal verification:**
```bash
npm run build  # Must pass
npm test       # Must pass (some test failures expected only for W2-1 to W2-4 file deletions)
```

---

## Wave 3 — Manual Review Required

**Risk Level: MEDIUM**
These items require human judgment, verification in a deployed environment, or checking against Supabase schema.

### W3-1: Remove `app/api/notes/generate` POST endpoint
- **Reason:** The POST handler returns only `{ message: "Use GET for polling status" }`. The client never calls it. However, removing a public API endpoint requires verifying no external clients use it.
- **Action:** Review API call logs in Vercel dashboard. If zero POST calls to `/api/notes/generate` in the last 30 days, remove the `POST` export from `app/api/notes/generate/route.ts`.
- **Risk:** Medium — external API callers or Postman collections may depend on it.
- **Rollback:** `git checkout app/api/notes/generate/route.ts`

### W3-2: Remove `@supabase/auth-helpers-nextjs`
- **Reason:** Superseded by `@supabase/ssr`. No direct imports found.
- **Action:** Run `npm ls @supabase/auth-helpers-nextjs` to check if any transitive dependency requires it. If none, remove.
- **Risk:** Medium — transitive dependency risk.
- **Command (if safe):** `npm remove @supabase/auth-helpers-nextjs`
- **Verification:** `npm run build && npm test`

### W3-3: Verify `documents` Table vs `document_collections`
- **Problem:** Dashboard queries `supabase.from('documents')` for `totalDocuments` count, but the upload route inserts into `document_collections`, not `documents`. The dashboard stat may always show 0.
- **Action:** 
  1. Check Supabase SQL editor — does the `documents` table exist and have rows?
  2. If the table is empty/doesn't exist, fix `app/dashboard/page.tsx` to count from `document_collections` instead.
- **Risk:** Medium — modifying the dashboard query may change displayed statistics.

### W3-4: Fix or Remove `app/saved/page.tsx`
- **Problem:** The `/saved` route exists but may not display the localStorage-bookmarked folders from the dashboard.
- **Action:**
  1. Open the live app and navigate to `/saved`.
  2. If the page is blank or non-functional, either implement localStorage reading or redirect to `/dashboard`.
- **Risk:** Low — static page with no backend dependencies.

### W3-5: Add `chat_exports` Table to Supabase Schema
- **Problem:** `app/api/chat/export/route.ts` inserts into `chat_exports` table and `app/exports/page.tsx` reads from it, but the table is not in `SUPABASE_SCHEMA.md`.
- **Action:**
  1. Check if `chat_exports` table exists in Supabase dashboard.
  2. If not, run this migration:
  ```sql
  CREATE TABLE IF NOT EXISTS chat_exports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT,
    type TEXT CHECK (type IN ('pdf', 'doc')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ALTER TABLE chat_exports ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can manage own exports" ON chat_exports
    FOR ALL USING (auth.uid() = user_id);
  ```
  3. Add to `SUPABASE_SCHEMA.md`.
- **Risk:** Zero for schema addition (additive change).

### W3-6: Documentation Cleanup (See DOCUMENTATION_CLEANUP_REPORT.md)
- **Action:** Follow the KEEP/MERGE/ARCHIVE/DELETE categories from that report.
- **Priority files to delete first (low risk):**
  - `MCQ_DOCUMENTATION_INDEX.md`
  - `MCQ_QUICK_REFERENCE.md`
  - `PDF_DOCUMENTATION_INDEX.md`
  - `PDF_EXECUTIVE_SUMMARY.md`
  - `copy-functionality-test.md`
  - `PRODUCTION_FAILURE_ANALYSIS.pdf` (binary, no value in git)
- **Commands:**
  ```bash
  git rm MCQ_DOCUMENTATION_INDEX.md MCQ_QUICK_REFERENCE.md PDF_DOCUMENTATION_INDEX.md PDF_EXECUTIVE_SUMMARY.md copy-functionality-test.md PRODUCTION_FAILURE_ANALYSIS.pdf
  ```

### W3-7: Add `.gitignore` Entries
The following should be added to `.gitignore`:
```
# Zencoder AI conversation exports
.zencoder/chats/

# One-off utility scripts
convert-pdf.mjs
convert-to-pdf.js

# PDF audit artifacts
PRODUCTION_FAILURE_ANALYSIS.pdf
```

---

## Never Delete

The following must NEVER be deleted without a full migration plan:

| File/Directory | Reason |
|---------------|--------|
| `app/auth/callback/route.ts` | OAuth callback — deleting breaks all Google login |
| `app/lib/auth/requireAuth.ts` | Auth middleware — deleting breaks all API security |
| `app/lib/errors/errorHandler.ts` | Error handling — deleting breaks all API error responses |
| `app/lib/supabase.ts` | Client Supabase — deleting breaks all client-side data access |
| `app/lib/rateLimiter.redis.ts` | Active rate limiter — deleting removes DDoS protection |
| `app/lib/ai/aiService.ts` | AI gateway — deleting breaks all AI features |
| `app/lib/ai/openrouterGateway.ts` | LLM connection — deleting breaks chat and notes |
| `app/api/upload/route.ts` | Core upload — deleting breaks document ingestion |
| `app/api/chat/route.ts` | Core chat — deleting breaks the primary product feature |
| `app/api/notes/generate/route.ts` (GET only) | Note generation — deleting breaks the primary product feature |
| `SUPABASE_SCHEMA.md` | Database schema — deleting loses critical setup information |
| `worker/worker.ts` + `worker/queues.ts` | Background embedding — deleting breaks async processing |
| `.env.local` | Environment config — deleting breaks all services |
| `package.json` + `package-lock.json` | Dependency manifest |
| `next.config.ts` | Build configuration |
| `tsconfig.json` | TypeScript configuration |

---

## Execution Checklist

```
[ ] git checkout -b cleanup-architecture
[ ] npm test  (baseline — all tests pass)
[ ] npm run build  (baseline — build succeeds)

[ ] Wave 1: Delete rateLimiter.ts, middleware.ts, docs/ml-systems-design.md
[ ] Wave 1: Clean up .env.local (remove 8 unused vars, fix AI_MODEL)
[ ] npm test && npm run build  (should still pass)
[ ] git commit -m "cleanup(wave1): remove no-op middleware and dead in-memory rate limiter"

[ ] Wave 2: Verify grep results for pdfGenerator, reportGenerator, radix-ui
[ ] Wave 2: git rm pdfGenerator.ts pdfGenerator.test.ts reportGenerator.ts reportGenerator.test.ts
[ ] Wave 2: npm remove @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-slot class-variance-authority clsx tailwind-merge
[ ] npm test && npm run build
[ ] git commit -m "cleanup(wave2): remove unused PDF generators and radix-ui/cva dependencies"

[ ] Wave 3: Manually review each item, fix chat_exports schema, fix documents table query
[ ] Wave 3: Documentation cleanup per DOCUMENTATION_CLEANUP_REPORT.md
[ ] Wave 3: Add .gitignore entries
[ ] npm test && npm run build
[ ] git commit -m "cleanup(wave3): fix schema issues, clean documentation"

[ ] Open PR for review
[ ] Deploy to staging
[ ] Verify all features work in production
[ ] Merge to main
```
