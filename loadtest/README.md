# QuickNotes Load Test

## Install k6

```bash
# macOS
brew install k6

# Windows (Chocolatey)
choco install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" \
  | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6
```

## Create test user tokens safely

1. In the Supabase dashboard → Authentication → Users, create 5–10 dedicated test accounts (e.g. `loadtest1@yourapp.com` … `loadtest10@yourapp.com`).
2. Obtain JWTs — use the Supabase JS client or `curl`:

```bash
curl -X POST 'https://<project>.supabase.co/auth/v1/token?grant_type=password' \
  -H 'apikey: <anon-key>' \
  -H 'Content-Type: application/json' \
  -d '{"email":"loadtest1@yourapp.com","password":"<password>"}' \
  | jq -r '.access_token'
```

3. Store tokens in a `.env.loadtest` file (never commit this):

```
TEST_TOKEN_1=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TEST_TOKEN_2=eyJ...
...
TEST_TOKEN_10=eyJ...
BASE_URL=https://quicknotess.space
```

## Run the tests

### All 3 scenarios at once

```bash
source .env.loadtest   # or use export for each var
k6 run \
  -e BASE_URL=$BASE_URL \
  -e TEST_TOKEN_1=$TEST_TOKEN_1 \
  -e TEST_TOKEN_2=$TEST_TOKEN_2 \
  loadtest/concurrency-test.js
```

### Individual scenarios (useful for targeting one bottleneck)

```bash
# Scenario A only — history reads
k6 run --scenario history_reads \
  -e BASE_URL=$BASE_URL -e TEST_TOKEN_1=$TEST_TOKEN_1 \
  loadtest/concurrency-test.js

# Scenario B only — concurrent chat
k6 run --scenario concurrent_chat \
  -e BASE_URL=$BASE_URL -e TEST_TOKEN_1=$TEST_TOKEN_1 \
  loadtest/concurrency-test.js

# Scenario C only — notes generation polling
k6 run --scenario notes_generation \
  -e BASE_URL=$BASE_URL -e TEST_TOKEN_1=$TEST_TOKEN_1 \
  loadtest/concurrency-test.js
```

## Reading the results

k6 prints a summary table at the end. Key columns:

| Metric | What it means |
|--------|---------------|
| `read_latency p(95)` | 95th-percentile response time for history reads. **Must be < 3s.** |
| `http_req_failed` | Fraction of requests that got a 4xx/5xx. **Must be < 5%.** |
| `error_rate` | Custom metric: fraction of requests with unexpected status. **Must be < 1%.** |
| `db_connection_errors` | Count of "too many connections" errors in response bodies. **Must be 0.** |
| `ai_429_errors` | Count of OpenRouter 429s that reached the client (after retries). Informational. |
| `chat_latency p(50/95)` | Streaming chat latency. p50 < 10s, p95 < 60s is healthy. |

### App is concurrency-ready when:

- `read_latency{scenario:A_history_reads} p(95)` < 3000ms ✓
- `error_rate` < 0.01 ✓
- `db_connection_errors` == 0 ✓
- No Vercel function timeout errors in logs (HTTP 504)

### App is NOT ready when:

- DB connection errors appear → connection pool exhausted; check Supabase dashboard → Logs → Postgres
- `http_req_failed` > 5% → likely Vercel concurrency limit or Supabase free-tier DB saturation
- Chat p95 > 60s → DeepSeek R1 reasoning phase is too slow; consider switching to `FALLBACK_MODEL`

## Capacity recommendation (Task 8)

**Architecture note:** The app uses the Supabase JS client (REST/PostgREST), which does NOT hold raw Postgres connections. Each DB operation is a short HTTP call. The "transaction pooler port 6543" only helps if you add a direct `pg`/Prisma connection.

### Current limits (free tier, 60 max_connections, 22 idle)

| Scenario | Safe concurrency | Bottleneck |
|----------|-----------------|------------|
| Read-only (history) | ~40–60 concurrent users | GoTrue auth query per request |
| Mix (reads + occasional chat) | ~15–25 active users | PostgREST pool + 120s Vercel function slots |
| All heavy (chat) | ~8–10 simultaneous streams | Vercel function concurrency + auth pool |

**The 120s `maxDuration` on the chat route is the primary limiting factor** — not DB connections. Each streaming chat occupies a Vercel function slot for up to 120s. Vercel Pro allows ~1000 concurrent invocations; the DB pool will saturate first on the free Supabase tier.

### After moving to transaction pooler (for any future direct pg connections)

PostgREST connections wouldn't change, but raw pg queries would mux through pgBouncer:
- Effective concurrent users: ~3–5× more raw SQL capacity
- Practical limit still ~15–25 active chatting users due to OpenRouter rate limits

### When to upgrade Supabase plan

- Free → Pro when you sustain > 15 concurrent active users OR see `db_connection_errors > 0` in the load test
- Pro gives 200 max_connections (vs 60), removing the DB bottleneck

### Manual checklist (Supabase + Vercel dashboard)

1. **Transaction pooler URL** (for any future direct SQL):  
   Supabase Dashboard → Project Settings → Database → Connection Pooling → **Transaction mode** → copy the URL with port **6543**.  
   Set it as `DATABASE_POOLER_URL` in Vercel environment variables.

2. **Session expiry** (fix zombie sessions holding auth slots):  
   Supabase Dashboard → Authentication → Policies → JWT expiry: set to **3600s (1 hour)** max.  
   Under Auth → Email → set "Session duration" to 1 hour.

3. **Stop zombie connections**:  
   Run in Supabase SQL editor to see idle connections:  
   ```sql
   SELECT count(*), state, wait_event_type
   FROM pg_stat_activity
   GROUP BY state, wait_event_type
   ORDER BY count DESC;
   ```
   If `idle` connections > 15, reduce PostgREST pool size in Supabase Dashboard → API → DB Pool Size.

4. **OpenRouter paid tier**:  
   Free tier: 20 req/min. The current retry+jitter logic handles bursts, but > 5 concurrent chat users will hit the limit regularly. Upgrade to a paid OpenRouter plan for higher RPM, or add a per-deployment API key rotation.

5. **Vercel env var to update** (if you add direct pg):  
   `DATABASE_URL` → replace with the pooler URL from step 1.
