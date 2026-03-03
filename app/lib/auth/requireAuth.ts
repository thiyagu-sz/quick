import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { AppError } from '@/app/lib/errors/errorHandler';

/**
 * Middleware-like function for API routes to require authentication
 * and return a Supabase client authorized as the user.
 * 
 * Strategy 1: Bearer Token (Authorization header)
 * Strategy 2: Cookies (Standard browser session)
 */
export async function requireAuth(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new AppError('Server configuration error', 500, 'CONFIG_ERROR');
  }

  let user = null;
  let supabase = null;
  let authError = null;

  // --- Strategy 1: Bearer Token ---
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    const result = await supabase.auth.getUser();
    user = result.data.user;
    authError = result.error;
  }

  // --- Strategy 2: Cookies (Fallback) ---
  if (!user) {
    const cookieStore = await cookies();
    supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: any) {
          try {
            cookiesToSet.forEach(({ name, value, options }: any) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Read-only in some Next.js contexts, safe to ignore
          }
        },
      },
    });
    const result = await supabase.auth.getUser();
    user = result.data.user;
    authError = result.error;
  }

  if (authError || !user) {
    throw new AppError('Unauthorized access. Please log in.', 401, 'UNAUTHORIZED');
  }

  return { user, supabase };
}
