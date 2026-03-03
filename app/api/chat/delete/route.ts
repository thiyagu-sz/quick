import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/app/lib/auth/requireAuth';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';

export async function DELETE(request: NextRequest) {
  try {
    const { user, supabase } = await requireAuth(request);

    const searchParams = request.nextUrl.searchParams;
    const conversationId = searchParams.get('id');

    if (!conversationId) {
      throw new AppError('Conversation ID is required', 400, 'BAD_REQUEST');
    }

    // First verify the conversation belongs to this user
    const { data: conversation, error: convError } = await supabase
      .from('chat_conversations')
      .select('id')
      .eq('id', conversationId)
      .eq('user_id', user.id)
      .single();

    if (convError || !conversation) {
      throw new AppError('Conversation not found', 404, 'NOT_FOUND');
    }

    // Delete messages first (foreign key constraint)
    const { error: messagesError } = await supabase
      .from('chat_messages')
      .delete()
      .eq('conversation_id', conversationId)
      .eq('user_id', user.id);

    if (messagesError) {
      throw new AppError('Failed to delete messages', 500, 'DB_ERROR', messagesError);
    }

    // Then delete the conversation
    const { error: deleteError } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', conversationId)
      .eq('user_id', user.id);

    if (deleteError) {
      throw new AppError('Failed to delete conversation', 500, 'DB_ERROR', deleteError);
    }

    return NextResponse.json({ success: true, message: 'Conversation deleted' });
  } catch (error) {
    return ErrorHandler.handle(error, 'DELETE /api/chat/delete');
  }
}
