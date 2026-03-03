-- =====================================================
-- REPAIR RLS POLICIES (Fix Account Leakage)
-- =====================================================
-- Run this in your Supabase SQL Editor to enforce strict data isolation.
-- =====================================================

-- 1. CHAT_CONVERSATIONS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_chat_conversations" ON public.chat_conversations;
CREATE POLICY "user_isolation_chat_conversations"
  ON public.chat_conversations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. CHAT_MESSAGES
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_chat_messages" ON public.chat_messages;
CREATE POLICY "user_isolation_chat_messages"
  ON public.chat_messages
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. DOCUMENTS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_documents" ON public.documents;
CREATE POLICY "user_isolation_documents"
  ON public.documents
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. DOCUMENT_CHUNKS
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_document_chunks" ON public.document_chunks;
CREATE POLICY "user_isolation_document_chunks"
  ON public.document_chunks
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. DOCUMENT_COLLECTIONS
ALTER TABLE public.document_collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_document_collections" ON public.document_collections;
CREATE POLICY "user_isolation_document_collections"
  ON public.document_collections
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. COLLECTIONS
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_collections" ON public.collections;
CREATE POLICY "user_isolation_collections"
  ON public.collections
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. NOTES
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_notes" ON public.notes;
CREATE POLICY "user_isolation_notes"
  ON public.notes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. CHAT_EXPORTS
ALTER TABLE public.chat_exports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_isolation_chat_exports" ON public.chat_exports;
CREATE POLICY "user_isolation_chat_exports"
  ON public.chat_exports
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 9. FEEDBACK
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "feedback_insert" ON public.feedback;
DROP POLICY IF EXISTS "feedback_select" ON public.feedback;

CREATE POLICY "feedback_insert" ON public.feedback
  FOR INSERT WITH CHECK (true);

CREATE POLICY "feedback_select" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true);

-- VERIFICATION
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
