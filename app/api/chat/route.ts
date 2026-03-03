import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { AiService } from '@/app/lib/ai/aiService';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';
import { globalRateLimit } from '@/app/lib/rateLimiter.redis';
import { requireAuth } from '@/app/lib/auth/requireAuth';

// Configuration
const MAX_CONTEXT_CHUNKS = 5;

/**
 * Generate embedding for text (OpenAI with fallback)
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  
  const generateFallbackEmbedding = (inputText: string): number[] => {
    const hash = inputText.split('').reduce((acc, char) => {
      const hash = ((acc << 5) - acc) + char.charCodeAt(0);
      return hash & hash;
    }, 0);
    return new Array(384).fill(0).map((_, i) => Math.sin((hash + i) * 0.1) * 0.1);
  };
  
  if (!apiKey || apiKey === '' || apiKey === 'your_openai_api_key_here') {
    return generateFallbackEmbedding(text);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    });

    if (!response.ok) return generateFallbackEmbedding(text);

    const data = await response.json();
    return data.data?.[0]?.embedding || generateFallbackEmbedding(text);
  } catch (error) {
    return generateFallbackEmbedding(text);
  }
}

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
        `Rate limit exceeded. Please try again in ${limitResult.resetIn}s.`,
        429,
        'RATE_LIMIT'
      );
    }

    // 3. Parse Request
    const { question, prompt: instructionPrompt, conversationId, title } = await request.json();
    if (!question) throw new AppError('Question is required', 400, 'BAD_REQUEST');

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

    // 6. RAG & Context Preparation
    const embedding = await generateEmbedding(question);
    const chunks = await searchSimilarChunks(supabase, user.id, embedding);
    
    const context = chunks.map((c: any) => c.content).join('\n\n---\n\n');
    const sources = Array.from(new Set(chunks.map((c: any) => c.documents?.name || 'Unknown')));

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
    const stream = await AiService.streamChat(messages);

    // Create a spying stream to capture assistant content
    let assistantContent = '';
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk);
        // data: {"content":"..."}\n\n
        const lines = text.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) assistantContent += data.content;
            } catch (e) {}
          }
        }
        controller.enqueue(chunk);
      },
      async flush(controller) {
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
      }
    });

    return new Response(stream.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Remaining': limitResult.remaining.toString(),
      },
    });

  } catch (error) {
    return ErrorHandler.handle(error, 'POST /api/chat');
  }
}
