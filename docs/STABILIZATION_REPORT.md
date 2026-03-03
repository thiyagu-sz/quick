# QuickNotes Production Stabilization Report

## 1. Full Architecture Stabilization Document
The system has been refactored from a fragmented, hardcoded structure into a centralized, service-oriented architecture designed for high concurrency (50+ users) and production reliability.

### Key Stabilization Pillars:
- **Centralized AI Orchestration**: All LLM calls pass through `AiService` for consistent handling.
- **Strict Data Isolation**: Removed service role bypasses to enforce Row Level Security (RLS) at the database level.
- **Resource Protection**: Global concurrency limiting and per-user rate limiting prevent system exhaustion.
- **Resilient Streaming**: Implemented a "Spying Stream" (TransformStream) to handle DB persistence without delaying user response.

## 2. Recommended Folder Structure
```text
app/
├── api/
│   ├── chat/
│   │   ├── route.ts          # Unified chat endpoint (RAG + Stream + Persistence)
│   │   ├── history/route.ts  # Secure conversation list
│   │   └── load/route.ts     # Secure message loader
│   └── upload/route.ts       # Centralized processing via AiService
├── lib/
│   ├── ai/
│   │   └── aiService.ts      # LLM logic (Semaphore, Retries, Timeout)
│   ├── auth/
│   │   └── requireAuth.ts    # Secure server-side auth utility
│   ├── errors/
│   │   └── errorHandler.ts   # Mapping and structured logging
│   ├── config.ts             # Environment-based constants
│   ├── rateLimiter.ts        # In-memory user throttling
│   └── supabase.ts           # Client singleton and logout cleanup
```

## 3. Implementation Summary

### Concurrency & Reliability (Phase 2 & 6)
- **Global Semaphore**: Limits parallel AI calls to 8 (configurable) to prevent serverless memory/rate-limit issues.
- **Timeout Wrapper**: 30s hard timeout using `AbortController`.
- **Exponential Backoff**: 2 retries (500ms -> 1500ms) for transient API errors.
- **User Throttling**: 15 requests per minute per user.

### Security & Isolation (Phase 5)
- **RLS Enforcement**: Removed all `SUPABASE_SERVICE_ROLE_KEY` usages from chat routes.
- **Auth Middleware**: `requireAuth.ts` ensures every request is validated via Supabase Auth.
- **Logout Cleanup**: `clearSupabaseClient()` resets singleton state on frontend logout.

### Error Handling (Phase 3)
- **errorHandler.ts**: Maps raw errors (429, 500) to safe messages: *"We're currently optimizing our AI engine..."*
- **Structured Logging**: AI metrics (model, duration, status) logged as JSON for observability.

### Chat Persistence (Phase 4)
- **Idempotent Save**: User message saved before LLM call. Assistant message saved via `TransformStream.flush()` ensuring atomic completion.

## 4. Vercel Deployment Checklist
1. [ ] **Environment Variables**:
   - `OPENROUTER_API_KEY`: Required for AI.
   - `AI_MODEL`: Set to `google/gemini-2.0-flash-001` or similar.
   - `SUPABASE_SERVICE_ROLE_KEY`: (Internal use only, not used in chat).
2. [ ] **Supabase Policies**: Run `SUPABASE_RLS_POLICIES.sql` to ensure RLS is active.
3. [ ] **Database Indexes**: Ensure indexes exist on `user_id` and `conversation_id`.
4. [ ] **Rate Limiting**: For multi-region scaling, replace `rateLimiter.ts` (Map) with Upstash Redis.

## 5. Monitoring Recommendations
- **Structured Logs**: Filter logs for `AI_CALL_METRICS` to track latency and error rates.
- **Error Codes**: Monitor `RATE_LIMIT` and `TIMEOUT` codes in the error handler.

## 6. Recommended Paid Model (50+ Concurrent Users)
For 50+ concurrent users, **Anthropic Claude 3.5 Sonnet** (via OpenRouter) or **Google Gemini 1.5 Pro (Paid Tier)** is recommended.
- **Why**: Higher throughput limits, better reasoning for complex academic content, and reliable uptime.
- **Config**: Set `AI_CONCURRENCY=15` in production for these models.
