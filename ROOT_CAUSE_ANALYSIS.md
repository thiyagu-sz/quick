# ROOT CAUSE ANALYSIS
> Generated: 2026-05-30

---

## RCA-01: professionalPdfGenerator.ts Keeps Reverting

**Issue:** PDF export (HTML-based, SaaS-grade) stops working after every git checkout, branch switch, or linter run.

**Likely Cause:** The HTML version of `professionalPdfGenerator.ts` was **never committed to git**. The file in the git index contains the old jsPDF class. Every time git restores tracked files (checkout, reset, pull, branch switch), the HTML version is overwritten by the committed jsPDF version.

**Evidence:**
- System reminder notes: *"f:\...\professionalPdfGenerator.ts was modified, either by the user or by a linter"* — showing the reverted jsPDF content beginning with `import { jsPDF } from 'jspdf'`
- The route `app/api/chat/pdf/route.ts` imports `generatePrintableHTML` which only exists in the HTML version → TypeScript error confirms the file is the wrong version
- The issue has occurred multiple times across sessions (requires re-fixing each time)

**Affected Files:** `app/lib/professionalPdfGenerator.ts`  
**Risk:** CRITICAL — PDF export is completely broken in production after any deployment  
**Recommended Fix:** `git add app/lib/professionalPdfGenerator.ts && git commit`

---

## RCA-02: Notes Page "Generate Now" Always Returns Static Message

**Issue:** Clicking "Generate Now" on `notes/[id]/page.tsx` when notes are not yet available does nothing useful.

**Likely Cause:** The frontend calls `POST /api/notes/generate` but the POST handler is a stub:
```ts
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Use GET for polling status" });
}
```
The actual generation logic is in the GET handler. The note generation was designed to be triggered automatically by the client polling GET, but the manual trigger button calls POST.

**Evidence:** `app/notes/[id]/page.tsx:422` calls POST; `app/api/notes/generate/route.ts:236` returns static message.

**Affected Files:**
- `app/api/notes/generate/route.ts` (POST stub)
- `app/notes/[id]/page.tsx` (calls wrong method)

**Risk:** HIGH — Manual note regeneration is non-functional  
**Recommended Fix:** Change frontend to call `GET /api/notes/generate?collectionId=xxx` instead of POST, OR implement the POST handler to delegate to the GET logic.

---

## RCA-03: Chat Export History Not Saved (Exports Page Empty "From Chat")

**Issue:** The Exports page never shows "From chat" exports even after PDFs are exported from the chat page.

**Likely Cause (chain of two bugs):**
1. `app/api/chat/export/route.ts` uses cookie-based auth. In production, the browser sends a Bearer token in the `Authorization` header (from `pdfSession.access_token`). The export route doesn't read Bearer tokens → auth fails → 401 → export record not saved.
2. Even if auth passes, `chat_exports` table may not exist in production (no CREATE TABLE migration found).

**Evidence:**
- `app/chat/page.tsx:1494`: sends `Authorization: Bearer ${session.access_token}`
- `app/api/chat/export/route.ts:24`: uses only cookie-based `createClient` — no Bearer token fallback
- `app/exports/page.tsx:124`: queries `chat_exports` table, handles error gracefully (empty instead of crash)

**Affected Files:**
- `app/api/chat/export/route.ts`
- Production Supabase (missing `chat_exports` table)

**Risk:** HIGH — Exports page history is non-functional  
**Recommended Fix:** Add Bearer token support to export route; confirm `chat_exports` table exists in production.

---

## RCA-04: Dashboard Loads 18 DB Queries for 5 Collections

**Issue:** Dashboard page is slow, especially with many collections.

**Likely Cause:** Two N+1 patterns stacked on top of each other:
1. `collectionsWithCounts`: 1 query per collection for document count
2. `collectionsWithStatus`: 2 queries per collection (notes check + document count — duplicated from step 1)

**Evidence:** `app/dashboard/page.tsx:165–253` — two separate `map` loops each doing per-collection queries, with the second loop duplicating work from the first.

**Affected Files:** `app/dashboard/page.tsx`  
**Risk:** HIGH — scales O(N) with collection count, will become unusable with >20 collections  
**Recommended Fix:** Single RPC call with joins, or Supabase `select('*, document_collections(count), notes(id)')` with embedded counts.

---

## RCA-05: Sidebar History Fetched Twice on Every Navigation

**Issue:** Chat history loads slowly/flickers on navigation.

**Likely Cause:** `useEffect([pathname])` re-creates the Supabase auth subscription and calls `fetchUser()` on every pathname change. Simultaneously, the subscription fires `INITIAL_SESSION` which also calls `loadChatHistory()`. Both are triggered within milliseconds of each other.

**Evidence:** `app/components/Sidebar.tsx:164–199` — subscription setup is inside `useEffect([pathname])`.

**Affected Files:** `app/components/Sidebar.tsx`  
**Risk:** MEDIUM — causes unnecessary DB load, possible flickering  
**Recommended Fix:** Move subscription setup to `useEffect([], [])` (mount only). Remove `pathname` from dependency array.

---

## RCA-06: AiService.complete() Loses System Message Role

**Issue:** Note generation quality may be lower than expected; system instructions sent as user messages.

**Likely Cause:** `aiService.ts:209` maps all non-assistant roles to `'user'`:
```ts
role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant' | 'system',
```
The type annotation claims it can be `'system'` but the runtime value is always `'assistant'` or `'user'`.

**Evidence:** `app/lib/ai/aiService.ts:209`; `OpenRouterMessage` type does accept `'system'`.

**Affected Files:** `app/lib/ai/aiService.ts`  
**Risk:** MEDIUM — AI notes may be lower quality  
**Recommended Fix:** `role: m.role as 'user' | 'assistant' | 'system'`

---

## RCA-07: puppeteer Bloating Dependencies

**Issue:** Slow npm installs, potentially failing Vercel builds.

**Likely Cause:** `puppeteer: ^24.34.0` was added to `package.json` but never used — likely added speculatively for server-side PDF generation that was never implemented.

**Evidence:** Zero `import puppeteer` or `require('puppeteer')` found anywhere in the codebase.

**Affected Files:** `package.json`  
**Risk:** HIGH — Vercel function size limits may be exceeded; build times are inflated  
**Recommended Fix:** `npm uninstall puppeteer`

---

## RCA-08: RAG Full Table Scan (No HNSW Index)

**Issue:** Every AI chat message performs a slow vector similarity search.

**Likely Cause:** The HNSW index creation was commented out in `001_concurrency_fixes.sql` because it requires knowing the embedding dimensions first.

**Evidence:** `supabase/migrations/001_concurrency_fixes.sql:68–86` (entire HNSW block commented out).

**Affected Files:** Production Supabase schema  
**Risk:** CRITICAL for scale — O(N) scan degrades with every uploaded document chunk  
**Recommended Fix:** Check embedding dimensions with `SELECT vector_dims(embedding) FROM document_chunks LIMIT 1;` then create the index manually.

---

## RCA-09: Saved Items Are Device-Local Only

**Issue:** Users bookmark collections but lose them on other devices or when clearing browser data.

**Likely Cause:** Feature was implemented quickly using localStorage without DB persistence. No `saved_collections` or `user_preferences` table was created.

**Evidence:** `app/dashboard/page.tsx:66–87` — full save logic uses `localStorage.setItem('savedFolders', ...)`.

**Affected Files:** `app/dashboard/page.tsx`, `app/saved/page.tsx`  
**Risk:** MEDIUM — data loss on device switch  
**Recommended Fix:** Add a `saved_collections(user_id, collection_id, created_at)` table; sync save state on mount.
