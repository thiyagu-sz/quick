/**
 * BullMQ Embedding Worker
 *
 * Processes document embedding jobs queued by /api/upload.
 * Run this process OUTSIDE of Vercel — e.g. on Railway, Fly.io, or a VPS:
 *
 *   REDIS_URL=redis://... NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *   OPENAI_API_KEY=... npx tsx worker/worker.ts
 *
 * Required env vars:
 *   REDIS_URL                  — real Redis TCP URL (not Upstash HTTP)
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   OPENAI_API_KEY             — optional; falls back to hash embedding if absent
 */

import { Worker, Job } from 'bullmq';
import { createClient } from '@supabase/supabase-js';
import { connection, uploadQueue, UploadJobData } from './queues';

// ─── Supabase client ─────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Embedding helpers ────────────────────────────────────────────────────────

function hashEmbedding(text: string): number[] {
  const hash = text.split('').reduce((acc, char) => {
    const h = ((acc << 5) - acc) + char.charCodeAt(0);
    return h & h;
  }, 0);
  return new Array(384).fill(0).map((_, i) => Math.sin((hash + i) * 0.1) * 0.1);
}

async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    return hashEmbedding(text);
  }
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'text-embedding-3-small', input: text }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return hashEmbedding(text);
    const data = await res.json();
    return data.data?.[0]?.embedding ?? hashEmbedding(text);
  } catch {
    return hashEmbedding(text);
  }
}

function chunkText(text: string, size = 1000, overlap = 200) {
  const chunks: { content: string; start: number; end: number }[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    chunks.push({ content: text.substring(start, end), start, end });
    start = end - overlap;
  }
  return chunks;
}

// ─── Job processor ────────────────────────────────────────────────────────────

async function processEmbeddingJob(job: Job<UploadJobData>): Promise<void> {
  const { documentId, collectionId, userId } = job.data;

  console.log(`[Worker] Processing job ${job.id} for document ${documentId}`);

  // 1. Fetch raw text from document_collections
  const { data: doc, error: fetchErr } = await supabase
    .from('document_collections')
    .select('content, file_name')
    .eq('id', documentId)
    .single();

  if (fetchErr || !doc) {
    throw new Error(`Document ${documentId} not found: ${fetchErr?.message}`);
  }

  const { content, file_name } = doc;
  if (!content || content.trim().length === 0) {
    console.warn(`[Worker] No content for document ${documentId} (${file_name}), skipping embedding`);
    return;
  }

  // 2. Chunk text
  const chunks = chunkText(content, 1000, 200);
  console.log(`[Worker] ${chunks.length} chunks for ${file_name}`);

  // 3. Generate embeddings in batches of 10
  const BATCH_SIZE = 10;
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const embeddings = await Promise.all(batch.map(c => generateEmbedding(c.content)));

    const records = batch.map((chunk, idx) => ({
      collection_id: collectionId,
      document_id: documentId,
      user_id: userId,
      content: chunk.content,
      chunk_index: i + idx,
      embedding: embeddings[idx],
    }));

    const { error: insertErr } = await supabase.from('document_chunks').insert(records);
    if (insertErr) {
      console.error(`[Worker] Chunk insert error (batch ${i / BATCH_SIZE + 1}):`, insertErr.message);
    } else {
      console.log(`[Worker] Inserted batch ${i / BATCH_SIZE + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`);
    }

    // Progress update so BullMQ dashboard shows progress
    await job.updateProgress(Math.round(((i + BATCH_SIZE) / chunks.length) * 100));
  }

  console.log(`[Worker] Completed embeddings for ${file_name}`);
}

// ─── Start worker ─────────────────────────────────────────────────────────────

const worker = new Worker<UploadJobData>(
  'upload-processing',
  processEmbeddingJob,
  {
    connection,
    concurrency: 3, // process up to 3 documents simultaneously
  }
);

worker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});

worker.on('error', (err) => {
  console.error('[Worker] Worker error:', err.message);
});

console.log('[Worker] Embedding worker started. Waiting for jobs...');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('[Worker] SIGTERM received, closing worker...');
  await worker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('[Worker] SIGINT received, closing worker...');
  await worker.close();
  process.exit(0);
});
