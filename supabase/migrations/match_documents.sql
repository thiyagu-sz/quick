-- =====================================================================
-- match_documents() — semantic search over document_chunks for RAG
-- =====================================================================
-- DIMENSION: vector(384).
--   Chosen to match BOTH:
--     (a) document_chunks.embedding  → VECTOR(384)   (existing column)
--     (b) AiService.generateEmbedding → now always 384-dim
--         (OpenAI text-embedding-3-small requested with dimensions:384,
--          and the hash/zero fallbacks are 384). See app/lib/ai/aiService.ts.
--   The vector(n) here MUST equal the dimension the app stores, or every
--   query/insert errors. Do not change one without the others.
--
-- ⚠️ NOT ACTIVE YET. The chat route gates RAG behind RAG_ENABLED=false
--    (app/api/chat/route.ts) because the upload pipeline does not yet write
--    rows into document_chunks. Deploy this function, populate document_chunks
--    with 384-dim embeddings, then flip RAG_ENABLED to true.
--
-- Run in the Supabase SQL Editor (requires the pgvector `vector` extension,
-- already enabled by COMPLETE_DATABASE_SETUP.sql).
-- =====================================================================

create extension if not exists vector;

create or replace function match_documents(
  query_embedding vector(384),
  match_threshold float,
  match_count int,
  user_id uuid
)
returns table (
  id uuid,
  content text,
  document_name text,
  similarity float
)
language sql
stable
as $$
  select
    dc.id,
    dc.content,
    d.name as document_name,
    1 - (dc.embedding <=> query_embedding) as similarity
  from document_chunks dc
  left join documents d on d.id = dc.document_id
  where dc.user_id = match_documents.user_id          -- qualified: arg vs column
    and dc.embedding is not null
    and 1 - (dc.embedding <=> query_embedding) > match_threshold
  order by dc.embedding <=> query_embedding            -- cosine distance, ascending
  limit match_count;
$$;

-- When RAG is re-enabled, the chat route should read `document_name` from each
-- returned row for the "sources" labels (RPC rows are flat, not nested under
-- a `documents` relation like the fallback select).
--
-- Recommended ANN index once chunks exist (run during low traffic; HNSW locks
-- the table briefly):
--   create index if not exists idx_document_chunks_embedding
--     on document_chunks using hnsw (embedding vector_cosine_ops)
--     with (m = 16, ef_construction = 64);
