# QuickNotes System Architecture & Analysis

## 1. Current Architecture Overview
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS
- **Backend**: Next.js Serverless API Routes
- **Database/Auth**: Supabase (Postgres, Auth, Storage)
- **AI Integration**: Google Gemini (via `fetch` in API routes) / OpenAI (for embeddings)
- **Deployment**: Vercel

## 2. API Route Flow Analysis
- **Authentication**: Most routes manually create a Supabase client using `cookies()` or a `Bearer` token from the `Authorization` header.
- **Request Handling**: Each route handles its own validation, authentication, and logic.
- **Data Access**: Some routes use `SUPABASE_SERVICE_ROLE_KEY`, bypassing Row Level Security (RLS).

## 3. LLM Integration Flow
- **Direct Fetch**: LLM calls (Gemini) are made directly using `fetch` within the `streamChatResponse` function in `api/chat/route.ts`.
- **Streaming**: Uses `ReadableStream` and `TextEncoder` for real-time response delivery.
- **Embeddings**: Generated via OpenAI with a manual hash-based fallback.

## 4. Chat Persistence Logic
- **Decoupled Save**: Chat saving is handled by a separate `/api/chat/save` route, likely triggered by the frontend after streaming completes or during the process.
- **Duplicate Prevention**: Done via client-side/server-side filtering (fetch-then-insert), which is non-atomic.
- **Idempotency**: Minimal idempotency control in the `save` route.

## 5. Authentication Handling
- **Methods**: JWT via cookies (Supabase Auth) and Bearer tokens for API calls.
- **Client Creation**: Inconsistent creation of Supabase clients across different routes (some use `createServerClient`, others use `createClient`).

## 6. Identified Architectural Weaknesses
- **Logic Duplication**: Auth logic, retry logic, and LLM configuration are duplicated across routes.
- **Lack of Centralization**: No central service layer for AI or database operations.
- **Hardcoded Models**: Gemini model names are hardcoded in API routes.

## 7. Concurrency Bottlenecks
- **No Global Limit**: Multiple users can trigger unlimited parallel LLM calls, potentially hitting rate limits or exhausting server resources.
- **Stateless Concurrency Control**: The `history` route uses a local `Map` for concurrency, which is ineffective in a multi-instance serverless environment (Vercel).

## 8. Security Vulnerabilities
- **RLS Bypass**: Extensive use of `SUPABASE_SERVICE_ROLE_KEY` in API routes removes the safety net provided by Supabase RLS.
- **Data Leakage**: Relying on `user_id` filters in code instead of RLS increases the risk of cross-user data exposure if a filter is missed.

## 9. Data Isolation Risks
- **Account Switching**: Potential for stale data or leaked history if frontend state isn't cleared and RLS isn't strictly enforced.
- **Caching**: Module-level caches (like in the `history` route) may persist across requests in the same serverless execution context, potentially leaking data if not keyed correctly.

## 10. Model Switching Limitations
- **Hardcoding**: Switching from Gemini to another model would require updating multiple files and handlers.

## 11. Streaming + DB Write Race Conditions
- **Delayed Save**: Saving the assistant's message after the stream finishes (from the frontend) can lead to lost messages if the user navigates away or closes the tab before the save call completes.
- **Duplicate Messages**: Multiple save calls for the same message can occur due to retries or frontend logic issues.
