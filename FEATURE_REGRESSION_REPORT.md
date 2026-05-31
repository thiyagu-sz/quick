# FEATURE REGRESSION REPORT
> Generated: 2026-05-30 | Auditor: Production Audit System

---

## SUMMARY TABLE

| # | Feature | Severity | Status |
|---|---------|----------|--------|
| 1 | PDF export – `professionalPdfGenerator.ts` reverts to jsPDF | CRITICAL | Regression |
| 2 | Notes page "Generate Now" button (POST route) | CRITICAL | Broken |
| 3 | `pdfGenerator.ts` / `reportGenerator.ts` – dead code | HIGH | Orphaned |
| 4 | Export API route – no Bearer token auth | HIGH | Regression |
| 5 | `AiService.complete()` – system messages become user messages | HIGH | Bug |
| 6 | Dashboard search input – no handler | MEDIUM | Stub UI |
| 7 | Bell notification button – no handler | LOW | Stub UI |
| 8 | "New folder" button – no handler | MEDIUM | Stub UI |
| 9 | Saved items – localStorage only, not synced to DB | MEDIUM | Partial impl. |
| 10 | `puppeteer` installed but never imported | HIGH | Dead dependency |
| 11 | `react-markdown` installed but chat uses custom renderer | LOW | Dead dependency |
| 12 | CORS header empty if `NEXT_PUBLIC_SITE_URL` not set | HIGH | Config gap |
| 13 | Duplicate RLS migration files | LOW | Drift |

---

## FR-01: professionalPdfGenerator.ts Reverts to jsPDF Version

**Feature:** PDF export via browser print dialog  
**Expected:** `generatePrintableHTML()` exported, returns styled HTML string  
**Current:** File contains old `ProfessionalPdfGenerator` class (jsPDF), does NOT export `generatePrintableHTML`. Route `app/api/chat/pdf/route.ts` imports `generatePrintableHTML` → TypeScript error on build  
**Files:**
- `app/lib/professionalPdfGenerator.ts` (reverts)
- `app/api/chat/pdf/route.ts` (imports `generatePrintableHTML`)
**Confidence:** 100%  
**Regression source:** The jsPDF version is committed in git. Every time a build/linter runs or the user reverts unstaged changes, the file resets. The HTML version exists only in-memory/unstaged.

---

## FR-02: Notes Page "Generate Now" POST Route Returns Static Message

**Feature:** Manual note regeneration from `notes/[id]/page.tsx`  
**Expected:** POSTing to `/api/notes/generate` triggers AI note generation  
**Current:** `POST /api/notes/generate` returns `{ message: "Use GET for polling status" }` — no generation happens.  
The frontend calls it as:
```ts
const res = await fetch('/api/notes/generate', { method: 'POST', body: JSON.stringify({ collectionId }) })
```
The response is 200 OK with a useless message, so the UI shows no error but notes are never generated.  
**Files:**
- `app/notes/[id]/page.tsx:422` (calls POST)
- `app/api/notes/generate/route.ts:236` (POST stub)
**Confidence:** 100%  
**Regression source:** The POST handler was deliberately left as a stub, but the frontend still calls POST. The feature should either call GET with `?collectionId=xxx` or the POST handler needs to be implemented.

---

## FR-03: pdfGenerator.ts / reportGenerator.ts — Dead Orphaned Code

**Feature:** Legacy PDF generator for notes page  
**Expected:** `generateProfessionalHTML()` used by notes page  
**Current:** The import was removed from `notes/[id]/page.tsx` in the last audit fix session. Neither `pdfGenerator.ts` nor `reportGenerator.ts` is imported anywhere in the codebase anymore.  
**Files:**
- `app/lib/pdfGenerator.ts` (no imports found)
- `app/lib/reportGenerator.ts` (no imports found, only `pdfGenerator.ts` imports it)
**Confidence:** 95%  
**Impact:** Dead code adds ~400 lines. Confuses future developers. No runtime impact.

---

## FR-04: Export API Route — No Bearer Token Support

**Feature:** Track export history in `chat_exports` table  
**Expected:** Export saved when user clicks "Export PDF/DOC" from chat  
**Current:** `app/api/chat/export/route.ts` creates a cookie-based auth client first. Bearer token is NOT the primary strategy. In production Vercel deployments, server-side cookies are unreliable for API routes called from client-side `fetch`. This causes 401 on export saves in production.  
**Files:**
- `app/api/chat/export/route.ts:16-37`
- `app/chat/page.tsx:1494` (calls with Bearer token in header)
**Confidence:** 90%  
**Impact:** Chat exports are never saved to `chat_exports` table → Exports page shows no "From chat" items.

---

## FR-05: AiService.complete() — System Messages Converted to User Role

**Feature:** Note generation from uploaded documents  
**Expected:** System prompt sent as `role: 'system'` to the AI  
**Current:** `AiService.complete()` maps roles: `role: (m.role === 'assistant' ? 'assistant' : 'user')`. This means any `system` message passed to `complete()` becomes `user` role. The notes generate route sends `{ role: 'system', content: 'Create study notes...' }` which arrives at OpenRouter as a `user` message. OpenRouter still processes it but the AI model may produce lower quality or differently formatted notes.  
**Files:**
- `app/lib/ai/aiService.ts:209` (`complete()` role mapping)
- `app/api/notes/generate/route.ts:103` (passes system message)
**Confidence:** 100%

---

## FR-06: Dashboard Search — No Handler

**Feature:** Search documents from Dashboard  
**Expected:** Input filters collections by name  
**Current:** `<input type="text" placeholder="Search documents..." />` — no `onChange`, no `value` state, no filtering logic, no API call. Pure decorative element.  
**Files:** `app/dashboard/page.tsx:314`  
**Confidence:** 100%

---

## FR-07: Bell Notification — No Handler

**Feature:** Notifications UI  
**Expected:** Shows notifications or navigates to notification list  
**Current:** `<button><Bell /></button>` — no `onClick`, no state, no API.  
**Files:** `app/dashboard/page.tsx:320`  
**Confidence:** 100%

---

## FR-08: "New Folder" Button — No Handler

**Feature:** Create collection from Dashboard  
**Expected:** Opens dialog to create a new collection  
**Current:** `<button>New folder</button>` — no `onClick`, no API call. Clicking does nothing.  
**Files:** `app/dashboard/page.tsx:387`  
**Confidence:** 100%

---

## FR-09: Saved Items — localStorage Only, Not Database-Synced

**Feature:** Save/unsave collections from Dashboard → view in Saved page  
**Expected:** Saved state persists across devices and browser sessions  
**Current:** `localStorage.setItem('savedFolders', ...)` — saved only in current browser. Switching devices, clearing cookies, or using incognito loses all saved items. No DB table or API for saved folders.  
**Files:**
- `app/dashboard/page.tsx:86` (toggle, reads/writes localStorage)
- `app/saved/page.tsx:51` (reads localStorage)
**Confidence:** 100%

---

## FR-10: puppeteer — Installed But Never Used

**Feature:** Potentially intended for server-side PDF generation  
**Expected:** Used somewhere in the codebase  
**Current:** `puppeteer: ^24.34.0` in `package.json`. Zero imports across the entire codebase. Puppeteer is ~400MB and downloads Chromium on `npm install`. This severely increases:
- Install time
- Vercel build time  
- Docker/CI image size
- Cold start time

**Files:** `package.json:37`  
**Confidence:** 100%

---

## FR-11: react-markdown — Installed But Chat Uses Custom Renderer

**Feature:** Markdown rendering in chat  
**Expected:** `react-markdown` renders AI responses  
**Current:** `app/chat/page.tsx` imports `renderMarkdown` from `app/lib/markdown.tsx` (custom implementation). `react-markdown`, `rehype-raw`, and `remark-gfm` in `package.json` are unused dead weight.  
**Files:** `package.json:36-41`, `app/lib/markdown.tsx`  
**Confidence:** 85% (may be used in a page not scanned; audit showed no direct imports)

---

## FR-12: CORS Header Empty String If NEXT_PUBLIC_SITE_URL Not Set

**Feature:** PDF export API CORS headers  
**Expected:** `Access-Control-Allow-Origin: https://quicknotess.space`  
**Current:** `'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || ''` — empty string is not a valid CORS origin header. Browsers reject empty-string ACAO. If env var is missing in production, the PDF API returns CORS errors to the browser.  
**Files:** `app/api/chat/pdf/route.ts:47`  
**Confidence:** 90%

---

## FR-13: Duplicate RLS Migration Files

**Feature:** Database RLS policies  
**Expected:** Single source of truth for RLS policies  
**Current:** Two files with identical content:
- `supabase/migrations/add_rls_policies.sql` (no date prefix — will run BEFORE numbered migrations in some tools)
- `supabase/migrations/20240101000000_add_rls_policies.sql` (date-prefixed)

If both are applied, `DROP POLICY IF EXISTS` prevents errors but it creates confusion about which is canonical.  
**Confidence:** 100%
