import { NextRequest } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { AiService } from '@/app/lib/ai/aiService';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';
import { globalRateLimit, acquireInflight, releaseInflight } from '@/app/lib/rateLimiter.redis';
import { requireAuth } from '@/app/lib/auth/requireAuth';

// Vercel Hobby caps function duration at 60s (with Fluid Compute; ~10s without),
// and silently clamps anything higher — so declaring 120 does nothing on Hobby.
// Pair this with a FAST model (see config.ts) so streams finish under the cap.
// Raise to 120/300 only on Pro with a slow/reasoning model.
export const maxDuration = 60;
export const runtime = 'nodejs';

// Configuration
const MAX_CONTEXT_CHUNKS = 5;

// RAG is OFF until vectors align: the upload pipeline does not populate
// document_chunks and match_documents() is not deployed, so RAG only added an
// embedding API call + a failing RPC and returned no context. Flip to true once
// chunks are populated AND supabase/migrations/match_documents.sql (vector(384))
// is deployed. // TODO: re-enable RAG once vectors align.
const RAG_ENABLED = false;

/**
 * RAG: Search for similar document chunks
 */
async function searchSimilarChunks(
  supabase: SupabaseClient,
  userId: string,
  queryEmbedding: number[]
) {
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.5,
    match_count: MAX_CONTEXT_CHUNKS,
    user_id: userId,
  });

  if (error) {
    console.error('RPC match_documents error:', error);
    // Fallback to basic search if RPC fails
    const { data: fallbackData } = await supabase
      .from('document_chunks')
      .select('content, documents(name)')
      .eq('user_id', userId)
      .limit(MAX_CONTEXT_CHUNKS);
    return fallbackData || [];
  }

  return data || [];
}

/**
 * Main POST handler
 */
export async function POST(request: NextRequest) {
  // Hoisted so the catch block can release the lock if we throw after acquiring it.
  let inflightUserId: string | null = null;

  try {
    // 1. Authentication
    const { user, supabase } = await requireAuth(request);
    if (!supabase) {
      throw new AppError('Failed to initialize database client', 500, 'CONFIG_ERROR');
    }
    ErrorHandler.debug('Auth context', { userId: user.id });

    // 2. Global Rate Limiting (Redis-backed)
    const limitResult = await globalRateLimit(user.id);
    if (!limitResult.success) {
      throw new AppError(
        `You are sending requests too quickly. Please wait ${limitResult.resetIn}s before trying again.`,
        429,
        'RATE_LIMIT'
      );
    }

    // Per-user concurrency guard: one active 120s stream per user prevents
    // double-connections that each hold Vercel function slots and auth queries.
    inflightUserId = user.id;
    if (!await acquireInflight(user.id, 'chat', 130)) {
      throw new AppError(
        'You already have a chat request in progress. Please wait for it to complete.',
        429,
        'INFLIGHT'
      );
    }

    // 3. Parse Request
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > 1_000_000) {
      throw new AppError('Request body too large (max 1 MB)', 413, 'PAYLOAD_TOO_LARGE');
    }

    const { question, prompt: instructionPrompt, conversationId, title } = await request.json();
    if (!question) throw new AppError('Question is required', 400, 'BAD_REQUEST');
    if (typeof question === 'string' && question.length > 50_000) {
      throw new AppError('Question too long (max 50,000 characters)', 400, 'BAD_REQUEST');
    }

    // 4. Conversation Management (Idempotent)
    let activeConversationId = conversationId;
    
    // Check if message already exists in this conversation to avoid duplicates
    // This happens because the frontend might have already saved it
    if (activeConversationId) {
      const { data: existingMsg } = await supabase
        .from('chat_messages')
        .select('id')
        .eq('conversation_id', activeConversationId)
        .eq('role', 'user')
        .eq('content', question)
        .limit(1);
      
      if (!existingMsg || existingMsg.length === 0) {
        // Save User Message ONLY if it doesn't exist yet
        await supabase.from('chat_messages').insert({
          conversation_id: activeConversationId,
          user_id: user.id,
          role: 'user',
          content: question,
        });
      }
    } else {
      // New conversation - create it
      const { data: newConv, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title: title || question.substring(0, 50) + '...',
        })
        .select('id')
        .single();
      
      if (convError) throw new AppError('Failed to create conversation', 500, 'DB_ERROR', convError);
      activeConversationId = newConv.id;
      
      // Save the user message for the new conversation
      await supabase.from('chat_messages').insert({
        conversation_id: activeConversationId,
        user_id: user.id,
        role: 'user',
        content: question,
      });
      
      ErrorHandler.debug('Created new conversation', { conversationId: activeConversationId });
    }

    // 6. RAG & Context Preparation — skipped while RAG_ENABLED is false.
    // No embedding call, no match_documents RPC: we answer without document
    // context instead of paying for an embedding + a failing RPC every message.
    let context = '';
    let sources: string[] = [];
    if (RAG_ENABLED) {
      const embedding = await AiService.generateEmbedding(question);
      const chunks = await searchSimilarChunks(supabase, user.id, embedding);
      context = chunks.map((c: any) => c.content).join('\n\n---\n\n');
      sources = Array.from(new Set(chunks.map((c: any) => c.documents?.name || 'Unknown')));
    }

    // Use the instruction prompt if provided, otherwise build a default one
    const finalPrompt = instructionPrompt || `You are an elite academic research assistant for QuickNotes.
${context ? `Use the following context to answer: \n${context}\n\n` : ''}
User Question: ${question}

Rules:
- Professional, publication-ready tone.
- Do NOT mention founders or developers.
- Use markdown for formatting.`;

    // 7. AI Call & Stream Spying
    const messages = [{ role: 'user', content: finalPrompt }];
    ErrorHandler.debug('LLM Call Start', { conversationId: activeConversationId });
    const stream = await AiService.streamChat(messages, {}, { userId: user.id, feature: 'chat', conversationId: activeConversationId });

    // Create a spying stream to capture assistant content
    let assistantContent = '';
    let accumulatedSize = 0;
    const MAX_RESPONSE_SIZE_MB = 10;
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Heartbeat keeps the SSE connection alive through proxy idle timeouts (Cloudflare, Vercel edge).
    // Without this, models with long reasoning phases (deepseek-r1) trigger a 30s proxy timeout
    // before the first token arrives, silently dropping the stream.
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

    const transformStream = new TransformStream({
      start(controller) {
        heartbeatInterval = setInterval(() => {
          try {
            // SSE comment lines (starting with ':') are ignored by browsers but reset proxy timers
            controller.enqueue(encoder.encode(': heartbeat\n\n'));
          } catch {
            // Stream already closed — interval will be cleared in flush/cancel
          }
        }, 15000);
      },
      transform(chunk, controller) {
        const text = decoder.decode(chunk);
        // data: {"content":"..."}\n\n
        accumulatedSize += chunk.byteLength;

        // Check buffer size to prevent OOM
        if (accumulatedSize > MAX_RESPONSE_SIZE_MB * 1024 * 1024) {
          ErrorHandler.log(
            new AppError(`Response exceeded max buffer size (>${MAX_RESPONSE_SIZE_MB}MB)`, 413, 'RESPONSE_TOO_LARGE'),
            'Streaming buffer limit'
          );
          controller.error(new Error(`Response too large (>${MAX_RESPONSE_SIZE_MB}MB)`));
          return;
        }

        const lines = text.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) assistantContent += data.content;
            } catch (e) {
              ErrorHandler.debug('SSE parse error', { line: line.substring(0, 100) });
            }
          }
        }
        controller.enqueue(chunk);
      },
      async flush(controller) {
        if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
        // Release inflight lock now that the stream is done (success path).
        releaseInflight(user.id, 'chat').catch(() => {});

        // Save assistant message AFTER streaming completes
        if (assistantContent) {
          ErrorHandler.debug('LLM Call End', {
            conversationId: activeConversationId,
            contentLength: assistantContent.length
          });

          const { error: insertError } = await supabase.from('chat_messages').insert({
            conversation_id: activeConversationId,
            user_id: user.id,
            role: 'assistant',
            content: assistantContent,
            sources: sources,
          });

          if (!insertError) {
            ErrorHandler.debug('Assistant message saved to DB', { conversationId: activeConversationId });
          } else {
            console.error('Failed to save assistant message:', insertError);
          }
        }
        // Send conversationId at the end if it was new
        const endData = `data: ${JSON.stringify({ conversationId: activeConversationId, sources })}\n\n`;
        controller.enqueue(encoder.encode(endData));
        // SSE [DONE] sentinel so frontend knows stream ended cleanly
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      },
    });

    // Clear the heartbeat interval if the client disconnects before flush() runs.
    // request.signal fires on tab close / navigation away, preventing a zombie
    // interval from running for the remaining maxDuration of the function.
    request.signal.addEventListener('abort', () => {
      if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
      // Release inflight lock on client disconnect so the user isn't blocked.
      releaseInflight(user.id, 'chat').catch(() => {});
      ErrorHandler.debug('Client disconnected — heartbeat cleared', { conversationId: activeConversationId });
    }, { once: true });

    return new Response(stream.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Remaining': limitResult.remaining.toString(),
      },
    });

  } catch (error: any) {
    // Release inflight lock on any pre-stream error (auth fail, DB error, etc.)
    if (inflightUserId) releaseInflight(inflightUserId, 'chat').catch(() => {});
    // DEBUG: Log the actual error details
    console.error('[CHAT ROUTE RAW ERROR]', {
      status: error?.status,
      statusCode: error?.statusCode,
      message: error?.message,
      name: error?.name,
      code: error?.code,
    });
    return ErrorHandler.handle(error, 'POST /api/chat');
  }
}
