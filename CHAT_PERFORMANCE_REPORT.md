# CHAT HISTORY PERFORMANCE REPORT
> Generated: 2026-05-30

---

## 1. QUERY COUNT PER HISTORY LOAD

### Sidebar `loadChatHistory()` — API path (with Redis miss)
```
1. supabase.auth.getSession()        — client SDK call
2. GET /api/chat/history              — HTTP round-trip
   └─ requireAuth → supabase.auth.getUser()    (Strategy 1: Bearer)
   └─ Redis GET chat-history:{userId}:3        (cache miss)
   └─ SELECT chat_conversations WHERE user_id = ?  LIMIT 3
   └─ Redis SET (async, fire-and-forget)
```
**Total: 1 auth + 1 HTTP + 1 Redis GET + 1 DB SELECT = 4 operations per load**

### Sidebar `loadChatHistory()` — Supabase direct fallback (when API returns empty)
```
+ supabase.from('chat_conversations').select().eq().order().limit(3)
```
**Adds 1 more DB query when API returns empty (even if not a real miss).**

---

## 2. HOW MANY TIMES IS HISTORY FETCHED PER PAGE LOAD

The Sidebar component has **3 separate triggers** that call `loadChatHistory()`:

```
Trigger 1: useEffect([pathname]) → fetchUser() → loadChatHistory()
Trigger 2: useEffect([pathname]) → onAuthStateChange('INITIAL_SESSION') → loadChatHistory()
Trigger 3: useEffect([]) → 'chatSaved' event → loadChatHistory()
```

On **every page navigation** (pathname changes), triggers 1 AND 2 both fire simultaneously because:
- `fetchUser()` runs immediately
- Supabase also fires `INITIAL_SESSION` on the subscription setup

**Result: 2 simultaneous history fetches on every page navigation.**

With Redis:
- First request gets a cache miss → DB query → writes cache
- Second request (50–200ms later) may get a cache hit OR another miss if Redis write hasn't completed

Without Redis:
- 2 simultaneous DB queries on every navigation

---

## 3. CHAT PAGE HISTORY LOAD (separate from Sidebar)

`app/chat/page.tsx` `loadChatHistory()` also calls `/api/chat/history?limit=10` independently of the Sidebar. When the chat page loads, **both** the Sidebar AND the page fetch history simultaneously:

- Sidebar: `/api/chat/history?limit=3`
- Chat page: `/api/chat/history?limit=10`

These have **different cache keys** (`chat-history:{userId}:3` vs `chat-history:{userId}:10`), so they never share a cache hit. Two DB queries on chat page load.

---

## 4. DEDUPLICATION CHECK ON EVERY MESSAGE SAVE

`app/api/chat/save/route.ts:109–120`:
```ts
const { data: existingMessages } = await supabase
  .from('chat_messages')
  .select('id, role, content')
  .eq('conversation_id', conversationId)
  .order('created_at', { ascending: true });

const newMessages = messages.filter(msg =>
  !existingMessages?.some(e => e.role === msg.role && e.content === msg.content)
);
```

**Problem:** This fetches ALL messages for a conversation (`no LIMIT`), then does an O(N²) in-memory comparison. For a 50-message conversation, this:
1. Transfers all 50 messages over the network
2. Iterates M×N times (M new messages × N existing messages)

With the `idx_chat_messages_dedup` index (`conversation_id, role, md5(content)`) from migration `001_concurrency_fixes.sql`, this could be a single indexed lookup — but the code doesn't use that index. It fetches all messages instead.

---

## 5. REDIS CACHE TTL — TOO AGGRESSIVE

```ts
const HISTORY_CACHE_TTL_SECONDS = 10;
```

10 seconds is extremely short. With a user actively using the app:
- Every 10 seconds the cache expires
- Next request hits DB again
- Rate: up to 6 DB queries per minute per user just for history

**Recommended:** 30–60 seconds. Cache is invalidated on save anyway via `upstashRedis.del(cacheKey)`.

---

## 6. MISSING INDEX — pgvector HNSW

`supabase/migrations/001_concurrency_fixes.sql` has:
```sql
-- HNSW creation briefly locks the table — run during low traffic.
-- Uncomment and run the matching block below.
-- CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding ...
```

The HNSW index is **commented out** and must be run manually. Without it, every RAG query in `app/api/chat/route.ts` performs a **sequential scan** of all `document_chunks` for cosine similarity. For large datasets this is `O(N)` per query instead of `O(log N)`.

---

## 7. RECOMMENDED FIXES

| Fix | Impact | Effort |
|-----|--------|--------|
| Deduplicate Sidebar history triggers (remove double-fire on mount) | High | Low |
| Increase Redis cache TTL from 10s to 60s | High | Low |
| Unify Sidebar and chat-page history calls (same limit=10) | Medium | Low |
| Replace full-message dedup fetch with indexed query | High | Medium |
| Uncomment and apply HNSW pgvector index | Critical for RAG | Low |
| Remove `pathname` from Sidebar useEffect dep array | Medium | Low |

---

## 8. QUERY BOTTLENECK RANKING

| Bottleneck | Frequency | Severity |
|-----------|-----------|----------|
| 2× history fetches on every navigation | Every page change | HIGH |
| Full `chat_messages` table scan for dedup | Every message send | HIGH |
| No HNSW index on embeddings (RAG full scan) | Every AI message | CRITICAL |
| 10s Redis TTL (cache expires 6×/min) | Constant | MEDIUM |
| Separate cache keys for limit=3 and limit=10 | Every page load | MEDIUM |
