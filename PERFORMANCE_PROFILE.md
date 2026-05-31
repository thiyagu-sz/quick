# PERFORMANCE PROFILE
> Generated: 2026-05-30

---

## BOTTLENECK RANKINGS

### CRITICAL

| # | Bottleneck | Where | Cause | Est. Impact |
|---|-----------|-------|-------|-------------|
| C1 | No HNSW vector index on embeddings | RAG search, every AI message | Commented out in migration | Full table scan O(N) per chat |
| C2 | puppeteer installed but unused | Build time, cold start | Never removed | +400MB install, possible Vercel build failure |
| C3 | professionalPdfGenerator.ts reverts to jsPDF | PDF export | Not committed to git | Feature completely broken after any git reset |

---

### HIGH

| # | Bottleneck | Where | Cause | Est. Impact |
|---|-----------|-------|-------|-------------|
| H1 | Dashboard: 18 DB queries per page load | Dashboard page | N+1 + duplicated queries | ~2–4s extra load time |
| H2 | Exports page: O(N) sequential queries | Exports page | `for...of await` instead of `Promise.all` | Scales linearly with collections |
| H3 | Sidebar: 2× history fetch on every navigation | Sidebar | Double trigger (fetchUser + INITIAL_SESSION) | 2 extra DB round-trips per navigation |
| H4 | Full chat_messages table scan for dedup | Every message save | No limit on dedup query | ~10ms extra per message in large convos |
| H5 | Export route auth fails in production | Export tracking | No Bearer token support | All export saves fail silently |

---

### MEDIUM

| # | Bottleneck | Where | Cause | Est. Impact |
|---|-----------|-------|-------|-------------|
| M1 | Redis cache TTL = 10s (too aggressive) | History API | Low TTL constant | 6× more DB queries per user/min than needed |
| M2 | Chat page + Sidebar fetch history separately | Every chat page load | Separate components, separate limits | 2 concurrent HTTP+DB calls |
| M3 | Streaming draft save: 300ms debounce resets on every token | Chat draft save | Large dependency array | Hundreds of localStorage writes during streaming |
| M4 | AiService.complete() strips 'system' role | Note generation | Wrong role mapping | Lower AI note quality |
| M5 | Supabase singleton cleared then recreated on sign-out | Auth flow | clearSupabaseClient() + new getSupabaseClient() | Brief delay on sign-out |
| M6 | circuit breaker is per-Lambda instance | OpenRouter failover | Module-level state | Doesn't share failure state across Vercel instances |

---

### LOW

| # | Bottleneck | Where | Cause | Est. Impact |
|---|-----------|-------|-------|-------------|
| L1 | react-markdown + rehype-raw + remark-gfm installed but unused | Bundle size | Not removed | ~50–100KB extra bundle |
| L2 | Dashboard "Search" renders but does nothing | UX | No handler | No perf impact; UX confusion |
| L3 | Duplicate RLS migration file | Schema management | Not cleaned up | Confusion only |
| L4 | All collections fetched twice in Dashboard (collections list + recent activity) | Dashboard | Two separate `collections` queries | 1 extra DB query |

---

## FEATURE PERFORMANCE PROFILES

### Login / Auth
- **Steps:** Cookie check → Bearer token check → Supabase JWT verify
- **Bottleneck:** `requireAuth` calls `supabase.auth.getUser()` on every API route → ~50ms per call
- **Rating:** Acceptable

### Upload
- **Steps:** File → text extraction → chunking → embedding → insert chunks → update status
- **Bottleneck:** PDF text extraction (pdfjs-dist) + embedding generation (OpenAI or hash fallback) + sequential chunk inserts
- **Rating:** SLOW (60s max function duration)

### History Loading
- **Steps:** Auth check → Redis GET → (miss) → DB SELECT → Redis SET
- **Bottleneck:** 2× concurrent calls; 10s TTL means frequent miss
- **Rating:** SLOW in production (no Redis), ACCEPTABLE with Redis

### Note Generation
- **Steps:** Poll GET every 3s → claim docs → AI summary per doc → update status → combine → upsert notes
- **Bottleneck:** AI latency per document (can be 5–30s per doc with DeepSeek)
- **Rating:** ACCEPTABLE (parallel processing added in 001 migration)

### PDF Generation
- **Steps:** Auth check → `generatePrintableHTML()` → return HTML → client opens window → user prints
- **Bottleneck:** Google Fonts load (may block print)
- **Rating:** FAST when working

### Dashboard Loading
- **Steps:** Auth → 3 parallel queries → N×2 sequential queries per collection
- **Bottleneck:** N+1 collection queries (18 queries for 5 collections)
- **Rating:** SLOW

### Chat Message Send
- **Steps:** Auth → rate limit → dedup check → DB insert → embedding → RAG search → AI stream → DB insert
- **Bottleneck:** RAG full scan (no HNSW index), DeepSeek R1 reasoning phase (30–90s)
- **Rating:** AI latency is expected; RAG scan is avoidable
