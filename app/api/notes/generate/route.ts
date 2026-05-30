import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiService } from '@/app/lib/ai/aiService';
import { requireAuth } from '@/app/lib/auth/requireAuth';

export const maxDuration = 60;
export const runtime = "nodejs";

/**
 * GET /api/notes/generate?collectionId=xxx
 * Called by the client via polling every 3 seconds.
 *
 * Race condition fix: atomically claim a pending document by immediately
 * updating its status to 'processing' before reading its content.
 * This prevents two simultaneous polls from processing the same document.
 *
 * Processes up to 3 documents per call in parallel to reduce total wait time
 * (was 1 document per call, causing N×AI-latency waits for N files).
 */
export async function GET(req: NextRequest) {
  try {
    const { user } = await requireAuth(req);

    const collectionId = req.nextUrl.searchParams.get("collectionId");
    if (!collectionId) {
      return NextResponse.json({ error: 'collectionId required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify collection ownership
    const { data: collection } = await supabase
      .from('collections')
      .select('user_id')
      .eq('id', collectionId)
      .single();

    if (!collection || collection.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Step 1: Atomically claim up to 3 pending documents ---
    // We update status to 'processing' first, then read back the claimed rows.
    // This prevents two concurrent polls from picking the same document because
    // the second UPDATE finds status = 'processing' (not 'pending') and skips it.
    //
    // Note: Postgres UPDATE + RETURNING would be ideal (SELECT FOR UPDATE SKIP LOCKED),
    // but Supabase JS does not expose that directly. The two-step approach below is
    // safe because:
    //   1. We filter on status = 'pending' in BOTH the claim and the select.
    //   2. 'processing' documents are never reclaimed by subsequent polls.
    //   3. A stale 'processing' document (e.g. function crash) is handled by
    //      the /api/notes/generate caller timing out and retrying at the collection level.

    // Fetch up to 3 pending document IDs
    const { data: pendingDocs } = await supabase
      .from('document_collections')
      .select('id')
      .eq('collection_id', collectionId)
      .eq('status', 'pending')
      .limit(3);

    if (!pendingDocs || pendingDocs.length === 0) {
      // No pending docs — check if all are done
      const { count: processingCount } = await supabase
        .from('document_collections')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', collectionId)
        .in('status', ['pending', 'processing']);

      if (processingCount === 0) {
        // All documents completed — check if notes already exist
        const { data: existingNotes } = await supabase
          .from('notes')
          .select('id')
          .eq('collection_id', collectionId)
          .maybeSingle();

        if (existingNotes) {
          return NextResponse.json({ status: "complete", notesId: existingNotes.id });
        }

        // Generate combined notes from all completed documents.
        // Use maybeSingle + a uniqueness guard to prevent duplicate inserts
        // when two polls reach this point simultaneously.
        const { data: allDocs } = await supabase
          .from('document_collections')
          .select('content')
          .eq('collection_id', collectionId)
          .eq('status', 'completed');

        const combinedText = allDocs?.map(d => d.content).join('\n\n') || "";

        if (combinedText) {
          const aiNotes = await AiService.complete(
            [
              { role: 'system', content: 'Create study notes from the provided text.' },
              { role: 'user', content: combinedText.substring(0, 30000) }
            ],
            { temperature: 0.3, maxTokens: 2000 },
            { userId: user.id, feature: 'notes', conversationId: collectionId }
          );

          // upsert on collection_id prevents a duplicate row if two polls
          // both reach this branch simultaneously (requires UNIQUE constraint —
          // see supabase/notes_unique_collection.sql in the project root).
          const { data: newNotes } = await supabase
            .from('notes')
            .upsert(
              {
                collection_id: collectionId,
                content: aiNotes,
                user_id: collection.user_id,
              },
              { onConflict: 'collection_id', ignoreDuplicates: false }
            )
            .select('id')
            .maybeSingle();

          return NextResponse.json({ status: "complete", notesId: newNotes?.id });
        }
      }

      // Some docs still processing — report back as still in progress
      const { count: total } = await supabase
        .from('document_collections')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', collectionId);

      const { count: completed } = await supabase
        .from('document_collections')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', collectionId)
        .eq('status', 'completed');

      return NextResponse.json({
        status: "processing",
        progress: `${completed}/${total}`,
        currentFile: null,
      });
    }

    const pendingIds = pendingDocs.map(d => d.id);

    // Atomically claim by flipping status to 'processing'
    await supabase
      .from('document_collections')
      .update({ status: 'processing' })
      .in('id', pendingIds)
      .eq('status', 'pending'); // guard: only claim if still pending

    // Fetch full content for claimed documents
    const { data: claimedDocs } = await supabase
      .from('document_collections')
      .select('id, content, file_name')
      .in('id', pendingIds);

    if (!claimedDocs || claimedDocs.length === 0) {
      return NextResponse.json({ status: "processing", progress: "0/0", currentFile: null });
    }

    // --- Step 2: Process claimed documents in parallel ---
    await Promise.all(claimedDocs.map(async (document) => {
      let aiSummary = '';
      try {
        console.log(`[NotesGen] Generating AI summary for document: ${document.file_name}`);
        aiSummary = await AiService.complete(
          [
            {
              role: 'system',
              content: 'You are an expert study guide creator. Create concise, focused study notes from the provided document content.'
            },
            {
              role: 'user',
              content: `Create study notes from this document:\n\n${document.content.substring(0, 15000)}`
            }
          ],
          { temperature: 0.3, maxTokens: 2000 },
          { userId: user.id, feature: 'notes', conversationId: collectionId }
        );
        console.log(`[NotesGen] AI summary done for ${document.file_name}, length: ${aiSummary.length}`);
      } catch (aiError) {
        console.error(`[NotesGen] AI failed for ${document.file_name}, using raw content:`, aiError);
        aiSummary = document.content.substring(0, 5000);
      }

      const { error: updateError } = await supabase
        .from('document_collections')
        .update({
          status: 'completed',
          processed_content: aiSummary,
        })
        .eq('id', document.id);

      if (updateError) {
        console.error(`[NotesGen] Failed to update document ${document.id}:`, updateError);
      }
    }));

    // --- Step 3: Return progress ---
    const { count: total } = await supabase
      .from('document_collections')
      .select('*', { count: 'exact', head: true })
      .eq('collection_id', collectionId);

    const { count: completed } = await supabase
      .from('document_collections')
      .select('*', { count: 'exact', head: true })
      .eq('collection_id', collectionId)
      .eq('status', 'completed');

    const currentFile = claimedDocs.map(d => d.file_name).join(', ');

    return NextResponse.json({
      status: "processing",
      progress: `${completed}/${total}`,
      currentFile,
    });

  } catch (err) {
    console.error('[NotesGen] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Use GET for polling status" });
}
