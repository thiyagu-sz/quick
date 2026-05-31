# FIX PRIORITY PLAN
> Generated: 2026-05-30 | DO NOT IMPLEMENT UNTIL APPROVED

---

## PRIORITY 1 — CRITICAL BUGS (Must fix before next deployment)

### P1-A: Commit professionalPdfGenerator.ts to git

**Problem:** HTML-based PDF generator exists only as unstaged changes; reverts to jsPDF after any git operation.  
**Action:**
1. Verify `app/lib/professionalPdfGenerator.ts` contains the HTML version (starts with `function esc(`)
2. `git add app/lib/professionalPdfGenerator.ts`
3. `git commit -m "fix(pdf): commit HTML-based PDF generator (not jsPDF)"`
4. Verify `npm run build` passes (route imports `generatePrintableHTML` which now exists)

**Files:** `app/lib/professionalPdfGenerator.ts`  
**Effort:** 5 min

---

### P1-B: Fix POST /api/notes/generate Stub

**Problem:** "Generate Now" button on notes page calls POST which returns a static message.  
**Action:** Change `app/notes/[id]/page.tsx` "Generate Now" button to call `GET /api/notes/generate?collectionId=${collectionId}` instead of POST. The response shape is `{ status, progress, currentFile }` — update the handler accordingly.

**Files:** `app/notes/[id]/page.tsx` (button onClick)  
**Effort:** 15 min

---

### P1-C: Fix Export Route — Add Bearer Token Auth

**Problem:** Chat export saves fail in production (401) because export route doesn't read `Authorization` header.  
**Action:** Replace the custom cookie client in `app/api/chat/export/route.ts` with `requireAuth(request)` from `app/lib/auth/requireAuth.ts` — the same pattern used by all other routes.

**Files:** `app/api/chat/export/route.ts`  
**Effort:** 10 min

---

### P1-D: Remove puppeteer from package.json

**Problem:** Unused 400MB dependency bloating builds and likely causing Vercel size limit issues.  
**Action:** `npm uninstall puppeteer` → commit `package.json` and `package-lock.json`

**Files:** `package.json`  
**Effort:** 5 min

---

### P1-E: Fix CORS Header for PDF Route

**Problem:** `Access-Control-Allow-Origin: ''` (empty string) is invalid; breaks PDF export in browsers.  
**Action:** Change `process.env.NEXT_PUBLIC_SITE_URL || ''` to `process.env.NEXT_PUBLIC_SITE_URL || '*'`

**Files:** `app/api/chat/pdf/route.ts:47`  
**Effort:** 2 min

---

## PRIORITY 2 — REGRESSION BUGS (Fix in next sprint)

### P2-A: Fix AiService.complete() System Message Role

**Problem:** System messages become user messages, degrading note quality.  
**Action:** `app/lib/ai/aiService.ts:209` — change `(m.role === 'assistant' ? 'assistant' : 'user')` to `m.role as 'user' | 'assistant' | 'system'`

**Files:** `app/lib/ai/aiService.ts`  
**Effort:** 5 min

---

### P2-B: Remove Dead PDF Code

**Problem:** `pdfGenerator.ts` and `reportGenerator.ts` are orphaned (no imports), causing developer confusion.  
**Action:** Delete both files. Verify no imports remain with `grep -r "pdfGenerator" app/` first.

**Files:** `app/lib/pdfGenerator.ts`, `app/lib/reportGenerator.ts`  
**Effort:** 5 min

---

### P2-C: Fix Sidebar Double-Fetch on Navigation

**Problem:** History fetched 2× on every page navigation; auth subscription re-created on every pathname change.  
**Action:** Move the `useEffect` body to `useEffect([], [])` (empty deps). Keep `pathname` only for the mobile menu close effect (which is a separate `useEffect` already).

**Files:** `app/components/Sidebar.tsx:164`  
**Effort:** 10 min

---

### P2-D: Remove Duplicate RLS Migration File

**Problem:** Two files with identical content create schema management confusion.  
**Action:** Delete `supabase/migrations/add_rls_policies.sql` (undated version). Keep `20240101000000_add_rls_policies.sql`.

**Files:** `supabase/migrations/add_rls_policies.sql`  
**Effort:** 2 min

---

## PRIORITY 3 — PERFORMANCE FIXES

### P3-A: Increase Redis Cache TTL from 10s to 60s

**Action:** `app/api/chat/history/route.ts:13` — change `10` to `60`. Cache invalidation on save is already implemented via `upstashRedis.del()`.

**Files:** `app/api/chat/history/route.ts`  
**Effort:** 2 min

---

### P3-B: Fix Dashboard N+1 Queries

**Problem:** 18+ DB queries to load dashboard with 5 collections.  
**Action:** Replace the two separate `map` loops in `fetchDocuments()` with a single parallel fetch:
```ts
const [collectionsResult, documentCounts, notesCounts] = await Promise.all([
  supabase.from('collections').select('id, name, created_at').eq('user_id', currentUser.id).order('created_at', { ascending: false }),
  supabase.from('document_collections').select('collection_id, count').eq('user_id', currentUser.id),
  supabase.from('notes').select('collection_id').eq('user_id', currentUser.id),
]);
```
Then join in JavaScript. Reduces from 18 queries to 3.

**Files:** `app/dashboard/page.tsx`  
**Effort:** 45 min

---

### P3-C: Create HNSW Vector Index in Supabase

**Action:** Run in Supabase SQL editor:
```sql
-- First check dimensions:
SELECT vector_dims(embedding) FROM document_chunks LIMIT 1;
-- Then create index (use dimension from above):
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding
  ON document_chunks
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```
This is a **manual database operation**, not a code change.

**Effort:** 5 min (DB operation, run during low traffic)

---

### P3-D: Fix Exports Page N+1 Queries

**Action:** Replace `for...of` loop with `Promise.all`:
```ts
const notesResults = await Promise.all(
  collections.map(c => supabase.from('notes').select('id, content, created_at')
    .eq('collection_id', c.id).eq('user_id', currentUser.id).order('created_at', {ascending: false}).limit(1))
);
```

**Files:** `app/exports/page.tsx:85`  
**Effort:** 20 min

---

### P3-E: Unify History Limit Between Sidebar and Chat Page

**Action:** Both Sidebar (`limit=3`) and chat page (`limit=10`) should use the same limit to share Redis cache keys. Change Sidebar to `limit=10`.

**Files:** `app/components/Sidebar.tsx:126`  
**Effort:** 2 min

---

## PRIORITY 4 — CODE CLEANUP

### P4-A: Remove Unused Dependencies

```
npm uninstall react-markdown rehype-raw remark-gfm puppeteer
```
*(verify react-markdown has no hidden usages first)*

**Effort:** 10 min

---

### P4-B: Fix Dashboard Stub UI Elements

Add proper `onClick` handlers or remove the non-functional:
- Search input: add `onChange` + filter state
- Bell button: add navigation to a notifications page or remove
- "New folder" button: add navigation to `/upload` or add a create dialog

**Files:** `app/dashboard/page.tsx:314,320,387`  
**Effort:** 30–60 min (depending on desired behavior)

---

### P4-C: Verify Environment Variables Checklist in README

Add a `DEPLOYMENT_CHECKLIST.md` or update README with the full list from `DEPLOYMENT_AUDIT.md`.  
**Effort:** 15 min

---

## PRIORITY 5 — REFACTORING

### P5-A: Persist Saved Folders to Database

**Problem:** Saved items lost across devices.  
**Action:**
1. Create `saved_collections(id, user_id, collection_id, created_at)` table with RLS
2. Replace `localStorage.setItem('savedFolders')` with Supabase insert/delete
3. Load saved state from DB on mount

**Files:** `app/dashboard/page.tsx`, `app/saved/page.tsx`, new migration  
**Effort:** 2–3 hours

---

### P5-B: Replace Custom Markdown Renderer with react-markdown

OR remove react-markdown and keep the custom renderer. Currently both coexist. Pick one.

**Effort:** 2–4 hours (if migrating to react-markdown)

---

### P5-C: Extract Dashboard Stats to a Supabase RPC Function

Instead of 18 queries, create a single `get_dashboard_stats(user_id)` Postgres function.  
**Effort:** 3–4 hours

---

## IMPLEMENTATION ORDER RECOMMENDATION

```
Week 1 (critical fixes):
  P1-A Commit PDF generator to git
  P1-B Fix notes generate POST stub
  P1-C Fix export route auth
  P1-D Remove puppeteer
  P1-E Fix CORS empty string
  P2-A Fix AiService role mapping

Week 2 (regressions + performance):
  P2-B Delete dead PDF code
  P2-C Fix Sidebar double-fetch
  P3-A Increase Redis TTL
  P3-C Create HNSW index (DB operation)
  P3-E Unify history limit

Week 3 (cleanup + medium perf):
  P3-B Fix Dashboard N+1
  P3-D Fix Exports N+1
  P4-A Remove unused dependencies
  P2-D Remove duplicate migration

Future:
  P4-B Stub UI elements
  P5-A Persist saved folders
  P5-B Markdown renderer decision
```
