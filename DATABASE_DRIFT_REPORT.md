# DATABASE DRIFT REPORT
> Generated: 2026-05-30

---

## 1. KNOWN TABLES (from code references)

| Table | Referenced In | Migration Source |
|-------|--------------|------------------|
| `chat_conversations` | chat routes, history API | Not in any migration file |
| `chat_messages` | chat routes, load API | Not in any migration file |
| `chat_exports` | export route, exports page | Not in any migration file |
| `collections` | dashboard, notes, uploads | Not in any migration file |
| `documents` | dashboard, upload route | Not in any migration file |
| `document_chunks` | upload route, RAG search | Not in migration (columns added in 001) |
| `document_collections` | upload route, notes generate | Columns ADDED in `001_concurrency_fixes.sql` |
| `notes` | notes page, generate route | UNIQUE constraint in `001_concurrency_fixes.sql` |
| `feedback` | feedback route | In `20240101000000_add_rls_policies.sql` (RLS only) |

---

## 2. MIGRATION FILES ANALYSIS

### `supabase/migrations/add_rls_policies.sql` (no date prefix)
- Adds RLS policies for all 9 tables
- **Duplicate** of `20240101000000_add_rls_policies.sql`
- The undated file will sort BEFORE the dated file in alphabetical order
- In Supabase CLI migrations, undated files are not applied automatically

### `supabase/migrations/20240101000000_add_rls_policies.sql`
- Identical content to the undated file
- Canonical version (date-prefixed)

### `supabase/migrations/001_concurrency_fixes.sql`
- Adds missing columns to `document_collections`
- Adds `collection_id` to `document_chunks`
- Adds UNIQUE constraint on `notes(collection_id)` (inside DO block)
- Creates 5 performance indexes
- HNSW vector index is **commented out** (must be run manually)

---

## 3. TABLES WITH NO CREATE MIGRATION

The following tables are referenced in code but have no `CREATE TABLE` migration:

- `chat_conversations`
- `chat_messages`
- `chat_exports`
- `collections`
- `documents`
- `document_chunks` (base table)

These were presumably created directly in Supabase Studio. This creates schema drift risk: the production schema is the source of truth, not the migration files.

---

## 4. COLUMN DRIFT RISKS

### `document_collections` — Columns Added in 001 Migration

| Column | Migration | Risk if Missing |
|--------|-----------|----------------|
| `file_name` | `001_concurrency_fixes.sql` | Upload breaks (column not found) |
| `file_type` | Same | Upload breaks |
| `file_size` | Same | Upload breaks |
| `content` | Same | Document text storage fails |
| `status` | Same | Notes generation status tracking fails |
| `processed_content` | Same | AI summary storage fails |

**If `001_concurrency_fixes.sql` was NOT run in production**, all of the above columns are missing. The upload route would return 500 errors.

### `document_chunks` — `collection_id` Column

Added by `001_concurrency_fixes.sql`. If missing:
- RAG search still works (uses `user_id`)
- But collection-scoped chunk retrieval fails
- The HNSW index on `(user_id, collection_id)` cannot be created

### `notes` — UNIQUE constraint on `collection_id`

The upsert in `app/api/notes/generate/route.ts` uses `onConflict: 'collection_id'`. If the UNIQUE constraint doesn't exist:
- Upsert silently inserts a duplicate row
- `notes/[id]/page.tsx` query with `.limit(1).order('created_at', {ascending: false})` returns the latest, but stale rows accumulate

---

## 5. RLS POLICY GAPS

### `chat_exports` Table

The RLS migration covers `chat_exports`. But the `app/api/chat/export/route.ts` uses `supabaseServiceKey` (bypasses RLS). If the service key is missing, it falls back to the auth client. With RLS enabled and `auth.uid()` check, inserts via auth client will fail if `user_id` doesn't match the JWT user.

### `feedback` Table

Policy allows INSERT from anyone (`WITH CHECK (true)`) but SELECT only for the owner or admin. This is intentional for anonymous feedback, but `app/api/feedback/route.ts` should be verified to not require auth for INSERT.

---

## 6. MISSING INDEXES SUMMARY

| Index | Status | Impact |
|-------|--------|--------|
| `idx_chat_conversations_user_updated` | In 001 migration (applied if 001 was run) | History query speed |
| `idx_chat_messages_dedup` | In 001 migration | Message dedup speed |
| `idx_chat_messages_conversation_created` | In 001 migration | Conversation load speed |
| `idx_document_collections_collection_status` | In 001 migration | Notes polling speed |
| `idx_document_chunks_user_collection` | In 001 migration | RAG search speed |
| HNSW vector index on embeddings | **Commented out** — must be run manually | RAG full table scan without it |

---

## 7. SCHEMA VERIFICATION QUERY

Run this in Supabase SQL editor to verify migration status:

```sql
-- Check if 001_concurrency_fixes columns exist
SELECT column_name FROM information_schema.columns
WHERE table_name = 'document_collections'
  AND column_name IN ('file_name', 'content', 'status', 'processed_content');

-- Check UNIQUE constraint on notes
SELECT conname FROM pg_constraint
WHERE conname = 'notes_collection_id_unique' AND conrelid = 'notes'::regclass;

-- Check indexes
SELECT indexname FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname IN (
    'idx_chat_conversations_user_updated',
    'idx_chat_messages_dedup',
    'idx_document_collections_collection_status'
  );

-- Check if chat_exports table exists
SELECT to_regclass('public.chat_exports');
```
