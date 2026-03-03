# QuickNotes Production Architecture Fix Plan

## PHASE 1: SYSTEM ANALYSIS & DOCUMENTATION (MANDATORY)
- [x] Current architecture overview
- [x] API route flow analysis
- [x] LLM integration flow
- [x] Chat persistence logic
- [x] Authentication handling (JWT + Supabase)
- [x] Identified architectural weaknesses
- [x] Concurrency bottlenecks
- [x] Security vulnerabilities
- [x] Data isolation risks
- [x] Model switching limitations
- [x] Streaming + DB write race conditions

## PHASE 2: CONCURRENCY HANDLING (CRITICAL)
- [x] Implement Global Concurrency Limiter (p-limit/semaphore)
- [x] Implement Timeout Wrapper (AbortController)
- [x] Implement Retry with Exponential Backoff
- [x] Create Central AI Service Layer (`lib/ai/aiService.ts`)

## PHASE 3: USER-FRIENDLY ERROR HANDLING
- [x] Create Error Handler (`lib/errors/errorHandler.ts`)
- [x] Map technical errors to safe user messages
- [x] Implement structured logging

## PHASE 4: CHAT SAVE + RELOAD FIX
- [x] Save user message BEFORE LLM call
- [x] Save assistant message AFTER streaming completes
- [x] Ensure idempotency and correct sorting (created_at ASC)
- [x] Verify data isolation in `GET /api/chat/history`

## PHASE 5: ACCOUNT SWITCHING SECURITY FIX (CRITICAL)
- [x] Enforce Supabase RLS on all tables
- [x] Create Auth Middleware (`lib/auth/requireAuth.ts`)
- [x] Implement Frontend Logout Cleanup

## PHASE 6: PRODUCTION HARDENING
- [x] Structured logging & duration tracking
- [x] Per-user rate limiting (15 requests/min)
- [x] Environment-based config (`lib/config.ts`)

## PHASE 7: MODEL SWITCH READY
- [x] Remove hardcoded models from API routes
- [x] Centralize model configuration

## PHASE 8: FINAL OUTPUT & VERIFICATION
- [x] Generate Architecture Stabilization Document
- [x] Final Vercel deployment checklist

## PHASE 9: BUG FIXING (401 & UI)
- [x] Fix 401 Unauthorized in chat API (Bearer token fallback)
- [x] Fix [object Object] UI error (improved JSON error parsing)

## PHASE 10: FEEDBACK SUBMISSION FIX
- [x] Update feedback DB schema (add user_id)
- [x] Update feedback API route (include user_id, rating, message)
- [x] Improve frontend feedback error handling

## PHASE 11: FEEDBACK SYSTEM INITIALIZATION & VERIFICATION
- [x] Improve API error reporting to distinguish initialization errors
- [x] Provide `FEEDBACK_SCHEMA.sql` for manual execution in Supabase
- [x] Ensure all required fields are correctly mapped in `FeedbackForm.tsx`

## PHASE 12: QA AUDIT (MANDATORY)
- [x] Verify all LLM calls use `aiService`
- [x] Audit concurrency limiter (semaphore) implementation
- [x] Verify retry logic and exponential backoff
- [x] Audit `requireAuth` middleware usage across all routes
- [x] Verify RLS policies on all critical tables
- [x] Audit Chat persistence (ordering and isolation)

## PHASE 13: VERIFICATION PLAN & TEST SCRIPTS
- [x] Create manual test checklist
- [x] Generate Vitest unit test examples
- [x] Create Playwright E2E test scripts for core flows
- [x] Implement k6 load test script (50 concurrent users)

## PHASE 14: FEEDBACK SYSTEM DEEP DIVE & FIX
- [x] Audit Feedback API insert/select logic
- [x] Verify Feedback RLS policies
- [x] Ensure dashboard correctly displays feedback stats

## PHASE 15: DEBUG LOGGING MODE
- [x] Implement `DEBUG_MODE` environment variable
- [x] Add structured logging for Auth, LLM calls, and DB operations

## PHASE 16: MIGRATE AI SERVICE TO GOOGLE GEMINI NATIVE
- [x] Update `AiService.ts` to use Google Gemini API
- [x] Align environment variable names (use `GOOGLE_GEMINI_API_KEY`)
- [x] Update request/response mapping for Gemini format
- [x] Maintain concurrency, timeout, and retry logic

## PHASE 17: FIX FEEDBACK SCHEMA CONFLICTS
- [x] Update `FEEDBACK_SCHEMA.sql` with robust migration logic
- [x] Add missing columns (`category`, `rating`, `title`, etc.) to existing `feedback` table
- [x] Rename `feedback_type` to `category` if it exists
- [x] Verify `COMPLETE_DATABASE_SETUP.sql` alignment

## PHASE 18: DATABASE INTEGRITY & PERSISTENCE AUDIT
- [x] Audit table schemas, keys, and constraints
- [x] Verify chat and feedback insert flows (timing and isolation)
- [x] Audit RLS policies for all tables (SELECT/INSERT/UPDATE/DELETE)
- [x] Test cross-account data leakage in API endpoints
- [x] Verify message ordering and duplicate prevention
- [x] Generate Database Integrity Report and SQL verification queries

## PHASE 19: ALIGN FEEDBACK API WITH ACTUAL SCHEMA
- [x] Map `category` field to `feedback_type` in API route
- [x] Remove non-existent columns from INSERT payload
- [x] Update GET stats to use actual column names

## PHASE 20: REPAIR FEEDBACK RLS POLICIES
- [x] Provide SQL to drop ALL conflicting feedback policies
- [x] Create unified INSERT policy for both anon and auth users
- [x] Ensure `user_id` is handled correctly in RLS `WITH CHECK`

## PHASE 21: DIAGNOSE STATE SYNC & DATA LEAK (MANDATORY)
- [x] Identify why chat history persists between user switches (Fixed via aggressive `onAuthStateChange` cleanup)
- [x] Identify why deleted chats reappear or have sync delays (Fixed via `DELETE` API fix and global event sync)
- [x] Analyze split state between Sidebar and Chat page (Fixed via `authChangeClear` event)

## PHASE 23: PROFESSIONAL PRODUCTION HARDENING
- [x] Implement Global Redis Rate Limiter (`lib/rateLimiter.redis.ts`)
- [x] Implement Model Fallback strategy in `AiService` (Gemini 2.0 -> 1.5 Flash -> 1.5 Pro)
- [x] Update Chat API to use Global Rate Limiting
- [x] Fix Model Switch reliability for 50+ concurrent users

## PHASE 24: FINAL VERIFICATION & CLEANUP
- [x] Verify Redis rate limiting connectivity
- [x] Test model fallback by simulating 429 error
- [x] Final check of RLS isolation between users
- [x] Remove temporary debug logs

## PHASE 25: SIGNOUT FLOW FIX
- [x] Implement hard redirect (`window.location.href`) in `handleSignOut`
- [x] Implement hard redirect in `onAuthStateChange` for `SIGNED_OUT` events
- [x] Ensure all state is cleared before redirect
