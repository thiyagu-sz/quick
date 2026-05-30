-- ============================================================
-- QuickNotes Chat Performance Indexes
-- Run in Supabase SQL Editor → SQL Editor → New Query
--
-- These indexes are the primary fix for 10–20 second history
-- load times. Without them every history query is a sequential
-- scan of the entire chat_conversations table.
-- ============================================================

-- ── 1. CRITICAL: chat history sidebar query ──────────────────
-- Powers: GET /api/chat/history
-- Query:  SELECT … FROM chat_conversations
--         WHERE user_id = ? ORDER BY updated_at DESC LIMIT 10
--
-- Without this index: sequential scan → sort all rows → 5–15s
-- With this index:    index scan → 10–50ms
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_updated
  ON chat_conversations (user_id, updated_at DESC);

-- ── 2. Conversation message loading ──────────────────────────
-- Powers: GET /api/chat/load
-- Query:  SELECT … FROM chat_messages
--         WHERE conversation_id = ? ORDER BY created_at ASC
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_created
  ON chat_messages (conversation_id, created_at ASC);

-- ── 3. Message dedup check on every send ─────────────────────
-- Powers: POST /api/chat/save (dedup query)
-- Query:  SELECT … FROM chat_messages
--         WHERE conversation_id = ? ORDER BY created_at DESC LIMIT 20
--
-- md5 keeps the index compact — avoids indexing full message text
CREATE INDEX IF NOT EXISTS idx_chat_messages_dedup
  ON chat_messages (conversation_id, role, md5(content));

-- ── 4. Conversation ownership check ──────────────────────────
-- Powers: GET /api/chat/load (ownership verification)
-- Query:  SELECT … WHERE id = ? AND user_id = ?
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_conversation
  ON chat_messages (user_id, conversation_id);

-- ── Verification ─────────────────────────────────────────────
-- Run after applying to confirm all indexes exist:
--
-- SELECT indexname, tablename
-- FROM pg_indexes
-- WHERE schemaname = 'public'
--   AND indexname IN (
--     'idx_chat_conversations_user_updated',
--     'idx_chat_messages_conversation_created',
--     'idx_chat_messages_dedup',
--     'idx_chat_messages_user_conversation'
--   )
-- ORDER BY tablename, indexname;
--
-- Expected: 4 rows returned.
