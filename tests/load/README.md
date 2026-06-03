# QuickNotes load + concurrency tests (k6)

These prove (or disprove) behavior under load — which **cannot** be established by
reading code. Run them before trusting any "ready for N users" claim.

## 0. Install k6 (once)
```
winget install k6.k6     # Windows
# or: choco install k6   |   brew install k6   |   https://k6.io/docs/get-started/installation/
```

## 1. Get valid test JWTs
The chat/upload routes require `Authorization: Bearer <supabase access_token>`.
Three ways:

1. **Browser (1 user, fastest):** log in to the app → DevTools → Application →
   Local Storage → key `quicknotes-auth-token` → copy the `access_token` field.
2. **Script (many users — required for real concurrency):**
   ```
   node tests/load/seed-users.mjs            # default 100 users → tests/load/tokens.json
   SEED_USERS=25 node tests/load/seed-users.mjs
   ```
   Needs `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (auto-loaded from `.env.local`).
   ⚠️ `tokens.json` holds live JWTs (~1h expiry) — **do not commit it**; re-run
   before each session.
3. **Supabase dashboard:** Auth → add users, then sign in via the script.

## 2. Make the upload fixture (once)
```
node tests/fixtures/make-fixtures.mjs
```

## 3. Run
```
npm run dev    # terminal A

# terminal B:
k6 run -e BASE_URL=http://localhost:3000 -e TOKENS_FILE=./tests/load/tokens.json tests/load/chat-load.js
k6 run -e BASE_URL=http://localhost:3000 -e TOKENS_FILE=./tests/load/tokens.json tests/load/upload-load.js
```

## ⚠️ Rate-limit caveat — read before interpreting results
Three limiters stack on `/api/chat`, and a naive single-machine run will mostly
produce **429s**, not real concurrency:

| Limiter | Keyed by | Limit | File |
|--------|----------|-------|------|
| Edge `middleware.ts` | `x-user-id` → `sb-access-token` cookie → **IP** | 10 / min | `middleware.ts:6-26` |
| In-route `globalRateLimit` | `user.id` | 15 / min | `rateLimiter.redis.ts:23-29` |
| In-flight lock | `user.id` | 1 concurrent | `app/api/chat/route.ts:72` |

k6 sends only `Authorization: Bearer …` (no `x-user-id`, no cookie), so at the
edge **all VUs from one machine share one IP → ~10 req/min total**, regardless of
VU count. To measure true *handler* concurrency, in the **local/staging test env
only** do one of:
- **(a)** temporarily raise the `Ratelimit.slidingWindow(...)` numbers in
  `middleware.ts` and `app/lib/rateLimiter.redis.ts`, or
- **(b)** add a unique per-VU `x-user-id` header in `chat-load.js` so the edge
  limiter buckets per virtual user.
**Keep production limits as-is.**

## How to read the result (pass/fail)
- **429 = PASS signal**, not failure. It proves the limiter works. Excess load
  should degrade to 429, never to 5xx or a hung/timed-out stream.
- **FAIL** if: `server_errors` (5xx) ≥ 2%, `timeouts` > ~1%, or `full_response_ms`
  p95 blows past ~3× your single-user baseline.
- Establish the **single-user baseline first**: `SEED_USERS=1` then run with 1 VU
  (edit stages to `target:1`) and note `full_response_ms` p95 = `b`. Judge the
  ramped run relative to `b` (see the threshold table in `docs/QUICKNOTES_MASTER.md` §17).

## Cost warning
Every 200 chat response burns real Gemini tokens on the key in your env. Prefer a
throwaway Google project/key for load runs; never point these at production.
