import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/app/lib/auth/requireAuth';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';

export async function GET(request: NextRequest) {
  try {
    const { user, supabase } = await requireAuth(request);
    if (!supabase) {
      throw new AppError('Failed to initialize database client', 500, 'CONFIG_ERROR');
    }

    const searchParams = request.nextUrl.searchParams;
    const conversationId = searchParams.get('id');

    if (!conversationId) {
      throw new AppError('Conversation ID is required', 400, 'BAD_REQUEST');
    }

    // Run both queries in parallel — halves latency vs sequential fetches
    const [convResult, msgResult] = await Promise.all([
      supabase
        .from('chat_conversations')
        .select('id, title, created_at')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .single(),
      supabase
        .from('chat_messages')
        .select('id, role, content, sources, created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true }),
    ]);

    if (convResult.error || !convResult.data) {
      throw new AppError('Conversation not found', 404, 'NOT_FOUND');
    }
    if (msgResult.error) {
      throw new AppError('Failed to load messages', 500, 'DB_ERROR', msgResult.error);
    }

    return NextResponse.json({
      conversation: convResult.data,
      messages: msgResult.data || [],
    });
  } catch (error) {
    return ErrorHandler.handle(error, 'GET /api/chat/load');
  }
}
