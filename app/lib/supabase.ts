import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singleton: Supabase v2 uses navigator.locks (Web Locks API) internally to
// serialize token refresh. Creating multiple clients with the same storageKey
// causes each new instance to steal the lock from the previous one, producing
// "Lock broken by another request with the 'steal' option" console errors.
// One instance per browser session avoids all lock contention.
// On sign-out, call clearSupabaseClient() + clearSupabaseStorage() so the
// next sign-in starts from a clean slate (prevents cross-user contamination).
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

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

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      storageKey: 'quicknotes-auth-token',
    },
  });
  return supabaseInstance;
}

// Call after sign-out so the next sign-in gets a fresh client with no stale JWT.
export function clearSupabaseClient(): void {
  supabaseInstance = null;
}

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

