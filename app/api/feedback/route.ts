import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

interface FeedbackPayload {
  userId?: string;
  email: string;
  message: string;
  rating?: number;
  category?: string;
  title?: string;
  features?: string[];
  improvements?: string;
  wouldRecommend?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body: FeedbackPayload = await request.json();

    // 1. Create Supabase server client that respects cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    // 2. Get current user session
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Validation
    if (!body.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new AppError('Valid email is required', 400, 'BAD_REQUEST');
    }

    if (!body.message?.trim()) {
      throw new AppError('Message is required', 400, 'BAD_REQUEST');
    }

    // 4. Insert feedback
    // We use the authenticated client even for anonymous feedback
    // If the user is logged in, supabase.auth.getUser() will have filled their context
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          user_id: user?.id || null,
          email: body.email.trim(),
          message: body.message.trim(),
          category: body.category || 'general',
          rating: body.rating || 5,
          title: body.title || '',
          features: body.features || [],
          improvements: body.improvements || '',
          would_recommend: body.wouldRecommend ?? true,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase feedback error:', error);
      if (error.code === '42P01') {
        throw new AppError('Feedback system not yet initialized. Please run FEEDBACK_SCHEMA.sql in Supabase.', 503, 'SERVICE_UNAVAILABLE', error);
      }
      throw new AppError(`Failed to save feedback: ${error.message}`, 500, 'DB_ERROR', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
      feedbackId: data?.[0]?.id,
    });
  } catch (error) {
    return ErrorHandler.handle(error, 'POST /api/feedback');
  }
}

// GET endpoint to fetch feedback stats (admin only)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');

    // Fetch feedback stats
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new AppError('Failed to fetch feedback stats', 500, 'DB_ERROR', error);

    // Calculate stats
    const stats = {
      total: data?.length || 0,
      averageRating: data?.length 
        ? Number((data.reduce((acc, item) => acc + (item.rating || 0), 0) / data.length).toFixed(1))
        : 0,
      categoryBreakdown: data?.reduce((acc: any, item: any) => {
        const cat = item.category || 'general';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {},
      recentFeedback: data?.slice(0, 5) || [],
    };

    return NextResponse.json(stats);
  } catch (error) {
    return ErrorHandler.handle(error, 'GET /api/feedback');
  }
}
