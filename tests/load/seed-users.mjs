/**
 * Seeds N Supabase test users and mints a real access-token (JWT) for each,
 * writing them to tests/load/tokens.json for the k6 load scripts + Playwright specs.
 *
 * Requires env (auto-loaded from .env.local if present):
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Usage:
 *   node tests/load/seed-users.mjs            # 100 users (default)
 *   SEED_USERS=25 node tests/load/seed-users.mjs
 *
 * NOTE: tokens.json contains live JWTs (≈1h expiry) — DO NOT commit it.
 *       Re-run this right before a load session so tokens are fresh.
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Best-effort load of .env.local (dotenv is a devDependency).
try {
  const { config } = await import('dotenv');
  config({ path: '.env.local' });
} catch { /* dotenv optional */ }

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const N = parseInt(process.env.SEED_USERS || '100', 10);
const PASSWORD = process.env.SEED_PASSWORD || 'LoadTest!2026-quicknotes';

if (!url || !serviceKey || !anonKey) {
  console.error(
    'Missing env. Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY (or put them in .env.local).',
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
const anon = createClient(url, anonKey, { auth: { persistSession: false } });

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokens = [];

console.log(`Seeding ${N} users against ${url} …`);
for (let i = 0; i < N; i++) {
  const email = `loadtest+${i}@quicknotes.test`;

  // Create (idempotent — ignore "already registered").
  const { error: createErr } = await admin.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
  });
  if (createErr && !/registered|already|exists/i.test(createErr.message)) {
    console.warn(`  createUser(${email}) warning: ${createErr.message}`);
  }

  // Sign in to obtain a usable access token.
  const { data, error } = await anon.auth.signInWithPassword({ email, password: PASSWORD });
  if (error || !data?.session) {
    console.warn(`  sign-in failed for ${email}: ${error?.message || 'no session'}`);
    continue;
  }
  tokens.push({ email, userId: data.user.id, accessToken: data.session.access_token });
  if ((i + 1) % 25 === 0) console.log(`  …${i + 1}/${N}`);
}

const outFile = join(__dirname, 'tokens.json');
writeFileSync(outFile, JSON.stringify(tokens, null, 2));
console.log(`\nWrote ${tokens.length} tokens → ${outFile}`);
if (tokens.length < N) {
  console.log('Some users failed to sign in — check email-confirmation settings in Supabase Auth.');
}
console.log('Next: k6 run -e BASE_URL=http://localhost:3000 -e TOKENS_FILE=./tests/load/tokens.json tests/load/chat-load.js');
