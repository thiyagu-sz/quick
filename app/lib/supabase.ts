import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Pattern A fix: singleton removed — a fresh client is created on every call.
// Supabase persists the token in localStorage (storageKey) on its own, so no
// in-memory singleton is needed. The old singleton caused cross-user contamination
// because its in-memory JWT outlived the previous user's signOut call.
export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
  }

  try {
    new URL(supabaseUrl);
  } catch {
    throw new Error(`Invalid Supabase URL: ${supabaseUrl}. Must be a valid HTTP or HTTPS URL.`);
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      storageKey: 'quicknotes-auth-token',
    },
  });
}

// No-op kept for call-site compatibility; singleton has been removed.
export function clearSupabaseClient(): void {}

// Pattern B/C fix: wipe every Supabase-owned localStorage key so the next
// sign-in always starts from a clean slate, not a previous user's leftovers.
export function clearSupabaseStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith('sb-') || k.startsWith('supabase') || k === 'quicknotes-auth-token')
      .forEach(k => localStorage.removeItem(k));
  } catch { /* ignore */ }
}

export default getSupabaseClient;

