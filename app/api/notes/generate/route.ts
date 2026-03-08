import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiService } from '@/app/lib/ai/aiService';

export const maxDuration = 60;
export const runtime = "nodejs";

/**
 * GET /api/notes/generate?collectionId=xxx
 * Called by the client via polling every 3 seconds
 * Processes one pending document per call to stay within timeout
 */
export async function GET(req: NextRequest) {
  try {
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

    // 1. Fetch next "pending" document for this collection
    const { data: document, error: fetchError } = await supabase
      .from('document_collections')
      .select('id, content, file_name')
      .eq('collection_id', collectionId)
      .eq('status', 'pending')
      .limit(1)
      .single();

    if (fetchError || !document) {
      // Check if all documents are completed
      const { count } = await supabase
        .from('document_collections')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', collectionId)
        .eq('status', 'pending');

      if (count === 0) {
        // All documents processed, check if notes exist
        const { data: notes } = await supabase
          .from('notes')
          .select('id')
          .eq('collection_id', collectionId)
          .single();

        if (notes) {
          return NextResponse.json({ status: "complete", notesId: notes.id });
        }
        
        // If no notes, generate them from all completed documents
        const { data: allDocs } = await supabase
          .from('document_collections')
          .select('content')
          .eq('collection_id', collectionId);
        
        const combinedText = allDocs?.map(d => d.content).join('\n\n') || "";
        
        if (combinedText) {
          const aiNotes = await AiService.complete([
            { role: 'system', content: 'Create study notes from the provided text.' },
            { role: 'user', content: combinedText.substring(0, 30000) }
          ]);

          const { data: newNotes } = await supabase
            .from('notes')
            .insert({
              collection_id: collectionId,
              content: aiNotes,
              user_id: (await supabase.from('collections').select('user_id').eq('id', collectionId).single()).data?.user_id
            })
            .select()
            .single();

          return NextResponse.json({ status: "complete", notesId: newNotes?.id });
        }
      }
      
      return NextResponse.json({ status: "complete" });
    }

    // 2. Run AI processing for that one document (Optional: individual summary)
    // For now, we just mark it as processing/completed
    await supabase
      .from('document_collections')
      .update({ status: 'processing' })
      .eq('id', document.id);

    // 3. Update document status to "completed"
    await supabase
      .from('document_collections')
      .update({ status: 'completed' })
      .eq('id', document.id);

    // 4. Return status and progress
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
      currentFile: document.file_name
    });

  } catch (err) {
    console.error('Generate notes worker error:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    // Keep compatibility with existing POST if needed, but GET is preferred for polling
    return NextResponse.json({ message: "Use GET for polling status" });
}
