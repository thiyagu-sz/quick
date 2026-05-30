-- ============================================================
-- QuickNotes Schema + Concurrency Fixes
-- Run in Supabase SQL Editor
-- ============================================================
-- Discovered via schema inspection: document_collections and
-- document_chunks are missing columns the application code
-- expects. This migration adds them and creates all indexes.
-- ============================================================

-- ── 1. Add missing columns to document_collections ──────────
-- The upload route stores file metadata + raw content + status
-- in this table, but the current schema only has the FK columns.

ALTER TABLE document_collections
  ADD COLUMN IF NOT EXISTS file_name        text,
  ADD COLUMN IF NOT EXISTS file_type        text,
  ADD COLUMN IF NOT EXISTS file_size        bigint,
  ADD COLUMN IF NOT EXISTS content          text,
  ADD COLUMN IF NOT EXISTS status           text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS processed_content text;

-- ── 2. Add missing collection_id to document_chunks ─────────
-- The upload route and worker insert chunks with collection_id,
-- but the current schema only has document_id.

ALTER TABLE document_chunks
  ADD COLUMN IF NOT EXISTS collection_id uuid REFERENCES collections(id) ON DELETE CASCADE;

-- ── 3. UNIQUE constraint on notes(collection_id) ─────────────
-- Prevents duplicate notes rows when two simultaneous polls
-- both reach the "generate combined notes" branch.
-- The upsert in /api/notes/generate uses this for conflict resolution.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'notes_collection_id_unique'
      AND conrelid = 'notes'::regclass
  ) THEN
    ALTER TABLE notes
      ADD CONSTRAINT notes_collection_id_unique UNIQUE (collection_id);
  END IF;
END $$;

-- ── 4. Indexes ───────────────────────────────────────────────

-- chat_conversations: sidebar history query
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_updated
  ON chat_conversations (user_id, updated_at DESC);

-- chat_messages: message dedup check on every send
--   (md5 keeps index compact vs indexing full text column)
CREATE INDEX IF NOT EXISTS idx_chat_messages_dedup
  ON chat_messages (conversation_id, role, md5(content));

-- chat_messages: loading a full conversation
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_created
  ON chat_messages (conversation_id, created_at);

-- document_collections: notes polling query (every 3s per active upload)
CREATE INDEX IF NOT EXISTS idx_document_collections_collection_status
  ON document_collections (collection_id, status);

-- document_chunks: RAG lookup by user
CREATE INDEX IF NOT EXISTS idx_document_chunks_user_collection
  ON document_chunks (user_id, collection_id);

-- ── 5. pgvector HNSW index (run separately after checking dims) ──
--
-- First check what dimension your embeddings are:
--   SELECT vector_dims(embedding) FROM document_chunks LIMIT 1;
--
-- Then uncomment and run the matching block below.
-- HNSW creation briefly locks the table — run during low traffic.
--
-- OpenAI text-embedding-3-small (1536-dim):
-- CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding
--   ON document_chunks
--   USING hnsw (embedding vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);
--
-- Hash fallback embedding (384-dim):
-- CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding
--   ON document_chunks
--   USING hnsw (embedding vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);
