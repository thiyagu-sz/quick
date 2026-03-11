---
description: Repository Information Overview
alwaysApply: true
---

# QuickNotes (ai-study-notes) Information

## Summary
**QuickNotes** is a production-grade AI-powered study assistant SaaS. It transforms educational documents (PDF, DOCX, PPTX, TXT) into personalized, structured study materials such as exam-focused summaries, concept definitions, and presentation-ready notes. The system utilizes OpenRouter for LLM inference (primary models: DeepSeek, Llama) and Supabase for authentication, database, and storage. It features a robust document processing pipeline and a streaming AI chat interface for note refinement.

## Structure
The project follows the **Next.js App Router** architecture:
- **`app/`**: Contains all frontend pages and backend API routes.
  - **`api/`**: Serverless functions for document processing (`upload`), AI chat (`chat`), and note generation (`notes/generate`).
  - **`chat/`**, **`upload/`**, **`dashboard/`**, **`notes/`**: Main application modules.
  - **`lib/`**: Shared utilities, AI services, and configuration.
- **`supabase/`**: Database migrations and RLS policies.
- **`docs/`**: Technical documentation including ML system design and architecture analysis.
- **`public/`**: Static assets like logos and icons.
- **`logoss/`**: Brand assets.

## Language & Runtime
**Language**: TypeScript  
**Version**: Node.js 18+, Next.js 16.1.1, React 19.2.3  
**Build System**: Next.js (Webpack/Turbo)  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- **Framework**: `next` (16.1.1), `react` (19.2.3), `react-dom`
- **AI/LLM**: `OpenRouter API` (Inference), `deepseek/deepseek-r1` (Default), `meta-llama/llama-3.3-70b-instruct` (Fallback)
- **Backend/BaaS**: `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`, `@supabase/ssr`
- **Rate Limiting**: `@upstash/ratelimit`, `@upstash/redis` (Redis-backed global limit: 10 req/min/user)
- **Document Parsing**: `pdfjs-dist`, `mammoth`, `pdf-parse`, `pdf2json`
- **Export/PDF**: `jspdf`, `puppeteer`
- **UI/Icons**: `lucide-react`, `tailwindcss`, `@radix-ui/react-*`
- **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`

**Development Dependencies**:
- **Testing**: `jest`, `ts-jest`, `@testing-library/react`, `@playwright/test`
- **Linting**: `eslint`, `eslint-config-next`
- **Styling**: `tailwindcss` (v4), `postcss`
- **Compiler**: `babel-plugin-react-compiler`

## Build & Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

## Testing
**Framework**: Jest with `ts-jest` for unit/integration; Playwright for E2E.  
**Test Location**: `**/__tests__/**/*.ts(x)` or `**/*.test.ts(x)`.  
**Naming Convention**: `*.test.ts`, `*.test.tsx`.  
**Configuration**: `jest.config.js`, `jest.setup.js`.

**Run Command**:
```bash
# Run Jest tests
npm test

# Run Playwright E2E tests
npx playwright test
```

## Main Files & Resources
- **Frontend Entry**: `app/page.tsx`
- **API Endpoints**:
  - `app/api/upload/route.ts`: Document processing and text extraction (non-blocking, returns 202).
  - `app/api/chat/route.ts`: LLM-powered chat orchestration with SSE streaming.
  - `app/api/notes/generate/route.ts`: Background note generation worker.
- **Configuration**:
  - `app/lib/config.ts`: Centralized application settings (AI models, timeouts, rate limits).
  - `middleware.ts`: Edge rate limiter using Upstash Redis.
  - `next.config.ts`: Next.js configuration.
  - `tsconfig.json`: TypeScript configuration.
- **Documentation**:
  - `README.md`: Project overview and quick start.
  - `docs/ML-SYSTEM-DESIGN.md`: Machine Learning system design details.
  - `ENV_SETUP.md`: Environment variable requirements.

## AI Error Handling
The `AiService` (in `app/lib/ai/aiService.ts`) implements a `getSafeUserMessage` method that sanitizes technical API errors:
- **401/403/Auth Errors**: Returns `"Our AI service is temporarily unavailable."`
- **429/Rate Limits**: Returns `"The AI model is currently busy. Please try again in a moment."`
- **504/Timeouts**: Returns `"The AI model is currently busy. Please try again in a moment."`
- **Retry Strategy**: Jittered exponential backoff (2 retries per model) with fail-fast on 401.
