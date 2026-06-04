// Runs via `setupFiles` (before any test-file module is imported) for the audit
// Jest project. Several modules read env vars at import time — e.g.
// OpenRouterGateway initializes a static `apiKey` from process.env, and
// requireAuth/supabase read the Supabase URL/key. Provide safe dummy values so
// those modules load in tests; real secrets (if present) are left untouched.
process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'test-openrouter-key';
process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key';
// Keep the concurrency acquire budget tiny so overflow tests don't wait seconds.
process.env.AI_ACQUIRE_TIMEOUT_MS = process.env.AI_ACQUIRE_TIMEOUT_MS || '200';
