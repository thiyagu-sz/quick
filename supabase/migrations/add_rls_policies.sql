-- =====================================================
-- REPAIR RLS POLICIES (Fix Account Leakage)
-- =====================================================
-- Run this in your Supabase SQL Editor to enforce strict data isolation.
-- =====================================================

-- 1. CHAT_CONVERSATIONS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "chat_conversations_policy" ON public.chat_conversations;
CREATE POLICY "chat_conversations_policy" ON public.chat_conversations
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. CHAT_MESSAGES
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "chat_messages_policy" ON public.chat_messages;
CREATE POLICY "chat_messages_policy" ON public.chat_messages
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. DOCUMENTS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "documents_policy" ON public.documents;
CREATE POLICY "documents_policy" ON public.documents
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. DOCUMENT_CHUNKS
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "document_chunks_policy" ON public.document_chunks;
CREATE POLICY "document_chunks_policy" ON public.document_chunks
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. DOCUMENT_COLLECTIONS
ALTER TABLE public.document_collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "document_collections_policy" ON public.document_collections;
CREATE POLICY "document_collections_policy" ON public.document_collections
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 6. COLLECTIONS
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "collections_policy" ON public.collections;
CREATE POLICY "collections_policy" ON public.collections
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 7. NOTES
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notes_policy" ON public.notes;
CREATE POLICY "notes_policy" ON public.notes
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 8. CHAT_EXPORTS
ALTER TABLE public.chat_exports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "chat_exports_policy" ON public.chat_exports;
CREATE POLICY "chat_exports_policy" ON public.chat_exports
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 9. FEEDBACK
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "feedback_insert_policy" ON public.feedback;
DROP POLICY IF EXISTS "feedback_select_policy" ON public.feedback;

-- Anyone can submit feedback
CREATE POLICY "feedback_insert_policy" ON public.feedback
FOR INSERT WITH CHECK (true);

-- Users can only see their own feedback (or admin via custom role check if needed)
CREATE POLICY "feedback_select_policy" ON public.feedback
FOR SELECT USING (auth.uid() = user_id OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true);
