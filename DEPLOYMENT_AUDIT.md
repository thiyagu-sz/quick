# DEPLOYMENT AUDIT
> Generated: 2026-05-30

---

## 1. REQUIRED ENVIRONMENT VARIABLES

| Variable | Used In | Required | If Missing |
|----------|---------|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | All DB calls | YES | App non-functional |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All DB calls | YES | App non-functional |
| `SUPABASE_SERVICE_ROLE_KEY` | `save`, `export`, `notes/generate` routes | YES for RLS bypass | Falls back to auth client — may fail on RLS-protected tables |
| `OPENROUTER_API_KEY` | All AI calls | YES | All AI features broken |
| `UPSTASH_REDIS_REST_URL` | Rate limiting, history cache | NO | Falls back to in-memory (not cross-instance) |
| `UPSTASH_REDIS_REST_TOKEN` | Same | NO | Same |
| `OPENAI_API_KEY` | Embedding generation | NO | Falls back to hash-based embedding (RAG quality degraded) |
| `NEXT_PUBLIC_SITE_URL` | CORS headers in PDF route | NO | Empty CORS header → PDF export may fail in some browsers |
| `AI_MODEL` | Default AI model | NO | Falls back to `deepseek/deepseek-r1` |
| `FALLBACK_MODEL` | Fallback AI model | NO | Falls back to `meta-llama/llama-3.3-70b-instruct` |
| `MAX_TOKENS` | AI token limit | NO | Falls back to 4096 |
| `DEBUG_MODE` | Error logging verbosity | NO | Defaults to false |

---

## 2. PRODUCTION-ONLY BUGS

### PO-01: SUPABASE_SERVICE_ROLE_KEY Missing → RLS Failures

`app/api/chat/save/route.ts:66–71`:
```ts
const supabase = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : authClient; // Fallback to auth client if no service key
```

If `SUPABASE_SERVICE_ROLE_KEY` is not in Vercel environment:
- Falls back to `authClient` (user-scoped)
- Inserts use `auth.uid()` from the JWT
- **BUT**: the cookie-based client's JWT is verified differently from the Bearer token client
- RLS policy `WITH CHECK (auth.uid() = user_id)` may fail silently

**Impact:** Chat history not saved in production if service key is missing.

---

### PO-02: NEXT_PUBLIC_SITE_URL Empty → CORS Blocks PDF

`app/api/chat/pdf/route.ts:47`:
```ts
'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '',
```

An empty string `''` as `Access-Control-Allow-Origin` is **not a valid origin**. Browsers will reject responses with `ACAO: ''`. The PDF window.open() would succeed (same-origin write), but any subsequent `fetch()` from the opened window would fail.

**Fix:** Use `'*'` or always set `NEXT_PUBLIC_SITE_URL` in Vercel.

---

### PO-03: Export Route Cookie Auth Fails in Production

`app/api/chat/export/route.ts` uses cookie-based auth as primary strategy. In Vercel's serverless functions:
- Browser → fetch('/api/chat/export', headers: {Authorization: Bearer xxx})
- Server reads cookies first (`await cookies()`)
- If cookie doesn't match the session, user check fails
- Falls through — but the Bearer fallback is not implemented in this route

The `chat/page.tsx` sends `Authorization: Bearer ${token}`, but the export route doesn't check Bearer token at all — it only reads cookies. In production, cookies may not be forwarded for cross-origin or API-only requests.

---

### PO-04: Upstash Redis Not Required → Per-Instance Rate Limiting

Without `UPSTASH_REDIS_REST_URL`, rate limiting falls back to in-memory:
```ts
if (!ratelimit) {
  return { success: true, remaining: 15, resetIn: 0 }; // Always allow
}
```

This means **no rate limiting at all** without Redis. On Vercel, each cold-start Lambda instance has fresh in-memory state. A user can bypass rate limits by triggering enough cold starts.

---

## 3. BUILD CONFIGURATION

### `package.json` Scripts
```json
"dev": "next dev --webpack",  // Forces Webpack (not Turbopack)
"build": "next build",
```

The `--webpack` flag in dev means the development experience uses Webpack bundler, not Turbopack. This is intentional (likely for compatibility) but means slower dev server HMR.

### No `vercel.json` Present
No `vercel.json` found. This means:
- All defaults apply
- No custom build commands
- No custom region routing
- `maxDuration` is set per-route in the route files themselves (15s, 60s, 120s)

### `puppeteer` on Vercel
`puppeteer: ^24.34.0` downloads Chromium at install time. Vercel's Lambda:
- Maximum install size: 50MB (Lambda function zip)
- Puppeteer + Chromium: ~200–400MB

**Puppeteer almost certainly causes build failures or function size limit errors on Vercel.** If the build succeeds, it's because Vercel is caching the layer, not because it's within limits.

---

## 4. NEXT.JS VERSION

`next: 16.1.1` — This is a **very recent** version (Next.js 16). As of this audit:
- `react: 19.2.3` — React 19 stable
- `eslint-config-next: 16.1.1` — matching ESLint config

The `"babel-plugin-react-compiler": "1.0.0"` in devDependencies suggests React Compiler may be configured. If active, it can cause unexpected memoization of components that were previously re-rendering correctly.

---

## 5. DEPLOYMENT CHECKLIST

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Vercel
- [ ] `OPENROUTER_API_KEY` set in Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://quicknotess.space` (or actual domain)
- [ ] `UPSTASH_REDIS_REST_URL` set (for cross-instance rate limiting + history cache)
- [ ] `UPSTASH_REDIS_REST_TOKEN` set
- [ ] `puppeteer` removed from `package.json` (prevents build failure)
- [ ] `professionalPdfGenerator.ts` (HTML version) committed to git
- [ ] Migration `001_concurrency_fixes.sql` confirmed applied in production Supabase
- [ ] HNSW vector index created manually in Supabase SQL editor
- [ ] `chat_exports` table exists in production Supabase
