# DEPENDENCY AUDIT
**QuickNotes — package.json Full Analysis**
Generated: 2026-05-30

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Confirmed Used | 22 |
| ⚠️ Possibly Unused / Review | 7 |
| ❌ Likely Unused (safe to remove) | 5–6 |

---

## Production Dependencies (`dependencies`)

### ✅ `@supabase/supabase-js@2.89.0`
- **Purpose:** Core database client for PostgreSQL operations and client-side auth.
- **Where used:** `app/lib/supabase.ts`, `app/api/chat/export/route.ts`, `app/api/chat/save/route.ts`, `worker/worker.ts`
- **Safe to remove:** No — core dependency.

### ⚠️ `@supabase/auth-helpers-nextjs@0.15.0`
- **Purpose:** Older Supabase Next.js auth helpers (legacy package).
- **Where used:** No imports found in any `.ts` or `.tsx` file. The modern `@supabase/ssr` is used instead.
- **Last import:** None found.
- **Safe to remove:** Likely yes — superseded by `@supabase/ssr`. However, Next.js or another package might have a transitive dependency on it. Check `npm ls @supabase/auth-helpers-nextjs` before removing.
- **Confidence:** 75%

### ✅ `@supabase/ssr@0.5.2`
- **Purpose:** Server-side Supabase client with cookie support for Next.js App Router.
- **Where used:** `app/lib/auth/requireAuth.ts`, `app/api/chat/save/route.ts`, `app/auth/callback/route.ts`, `app/api/feedback/route.ts`
- **Safe to remove:** No — critical for server auth.

### ✅ `@upstash/ratelimit@2.0.8`
- **Purpose:** Redis-backed rate limiting with sliding window algorithm.
- **Where used:** `app/lib/rateLimiter.redis.ts`, `app/api/chat/history/route.ts`
- **Safe to remove:** No — core rate limiting mechanism.

### ✅ `@upstash/redis@1.36.3`
- **Purpose:** Upstash Redis HTTP REST client (works in serverless without TCP connections).
- **Where used:** `app/lib/rateLimiter.redis.ts`
- **Safe to remove:** No — needed for Redis operations in serverless.

### ✅ `@vercel/analytics@1.6.1`
- **Purpose:** Real-user analytics (page views, interactions).
- **Where used:** `app/layout.tsx` (Analytics component)
- **Safe to remove:** No — production analytics.

### ✅ `@vercel/speed-insights@1.3.1`
- **Purpose:** Core Web Vitals Real User Monitoring.
- **Where used:** `app/layout.tsx` (SpeedInsights component)
- **Safe to remove:** No — production monitoring.

### ✅ `bullmq@5.76.10`
- **Purpose:** Production-grade job queue for async background processing.
- **Where used:** `worker/queues.ts`, `worker/worker.ts`
- **Safe to remove:** No — needed for the embedding worker. Note: Only used when `REDIS_URL` is configured. If the worker is never deployed, this adds to bundle size unnecessarily. However, `upload/route.ts` lazy-imports it, so it doesn't bundle into Vercel functions.

### ❌ `class-variance-authority@0.7.1`
- **Purpose:** Type-safe component variant management (typically used with Tailwind + Radix).
- **Where used:** Zero imports found across all `.ts` and `.tsx` files.
- **Last import:** None.
- **Safe to remove:** Yes — confirmed unused.
- **Confidence:** 90%

### ❌ `clsx@2.1.1`
- **Purpose:** Conditional className utility.
- **Where used:** Zero imports found.
- **Last import:** None.
- **Safe to remove:** Yes — confirmed unused.
- **Confidence:** 90%

### ✅ `ioredis@5.10.1`
- **Purpose:** Full-featured Redis TCP client for Node.js (used by BullMQ).
- **Where used:** `worker/queues.ts`
- **Safe to remove:** No — BullMQ requires a TCP Redis connection (not HTTP).

### ✅ `jspdf@4.1.0`
- **Purpose:** Client-side PDF generation in the browser.
- **Where used:** `app/lib/clientPdfGenerator.ts`, `app/exports/page.tsx` (direct usage)
- **Safe to remove:** No — actively used for PDF downloads.

### ✅ `lucide-react@0.562.0`
- **Purpose:** SVG icon library.
- **Where used:** All page components — upload, chat, dashboard, exports, sidebar, etc.
- **Safe to remove:** No — pervasively used.

### ✅ `mammoth@1.11.0`
- **Purpose:** DOCX text extraction.
- **Where used:** `app/api/upload/route.ts`
- **Safe to remove:** No — needed for Word document support.

### ✅ `next@16.1.1`
- **Purpose:** React framework.
- **Safe to remove:** No — core framework.

### ✅ `pdf-parse@2.4.5`
- **Purpose:** PDF text extraction (third fallback).
- **Where used:** `app/api/upload/route.ts` (tertiary fallback after pdfjs and pdf2json)
- **Safe to remove:** Potentially — this is the third of three PDF parsers. If pdfjs-dist and pdf2json are sufficient, this could be removed. However, the fallback chain handles edge cases. Risk: some PDFs may fail without this fallback.
- **Confidence:** 40% — not recommended without testing the fallback chain.

### ✅ `pdf2json@4.0.0`
- **Purpose:** PDF text extraction (second fallback).
- **Where used:** `app/api/upload/route.ts` (secondary fallback)
- **Safe to remove:** Potentially — same reasoning as pdf-parse. Removing would mean pdfjs-dist is the only parser. Risk: pdfjs-dist has had compatibility issues in serverless environments (hence the fallback chain).
- **Confidence:** 30% — not recommended.

### ✅ `pdfjs-dist@5.4.530`
- **Purpose:** Primary PDF text extraction.
- **Where used:** `app/api/upload/route.ts` (primary, tried first)
- **Safe to remove:** No — primary PDF parser.

### ✅ `react@19.2.3`
- **Purpose:** UI library.
- **Safe to remove:** No — core.

### ✅ `react-dom@19.2.3`
- **Purpose:** DOM rendering.
- **Safe to remove:** No — core.

### ✅ `react-markdown@10.1.0`
- **Purpose:** Renders markdown in React components.
- **Where used:** `app/lib/markdown.tsx`
- **Safe to remove:** No — used for chat message rendering.

### ❌ `@radix-ui/react-dialog@1.1.15`
- **Purpose:** Accessible dialog/modal primitive.
- **Where used:** Zero imports found.
- **Last import:** None.
- **Safe to remove:** Yes — modals use custom `div` overlays.
- **Confidence:** 90%

### ❌ `@radix-ui/react-icons@1.3.2`
- **Purpose:** Radix UI icon set.
- **Where used:** Zero imports found. Icons are all from `lucide-react`.
- **Last import:** None.
- **Safe to remove:** Yes.
- **Confidence:** 95%

### ❌ `@radix-ui/react-slot@1.2.4`
- **Purpose:** Polymorphic component slot primitive (used with CVA).
- **Where used:** Zero imports found.
- **Last import:** None.
- **Safe to remove:** Yes — no CVA pattern in use.
- **Confidence:** 85%

### ✅ `rehype-raw@7.0.0`
- **Purpose:** Allows raw HTML in react-markdown output.
- **Where used:** `app/lib/markdown.tsx`
- **Safe to remove:** No — used with react-markdown.

### ✅ `remark-gfm@4.0.1`
- **Purpose:** GitHub Flavored Markdown support (tables, strikethrough, etc.).
- **Where used:** `app/lib/markdown.tsx`
- **Safe to remove:** No — used with react-markdown.

### ⚠️ `tailwind-merge@3.4.0`
- **Purpose:** Merges Tailwind classes, resolving conflicts (e.g., `text-red-500 text-blue-500` → `text-blue-500`).
- **Where used:** Zero imports found across the entire app.
- **Note:** Often used together with `clsx` for the `cn()` utility pattern. Since neither `clsx` nor any `cn()` helper function was found, this package appears unused.
- **Safe to remove:** Likely yes.
- **Confidence:** 85%

---

## DevDependencies (`devDependencies`)

### ✅ `@playwright/test@1.58.2`
- **Purpose:** End-to-end testing framework.
- **Safe to remove:** No — e2e tests.

### ✅ `@tailwindcss/postcss@4`
- **Purpose:** PostCSS plugin for Tailwind v4.
- **Safe to remove:** No — required for Tailwind v4 compilation.

### ✅ `@testing-library/jest-dom@6.9.1`
- **Purpose:** Custom Jest matchers for DOM assertions.
- **Safe to remove:** No — used in component tests.

### ✅ `@testing-library/react@16.3.2`
- **Purpose:** React component testing utilities.
- **Safe to remove:** No — used in component tests.

### ✅ `@testing-library/user-event@14.6.1`
- **Purpose:** User interaction simulation for tests.
- **Safe to remove:** No — used in tests.

### ⚠️ `@types/dotenv@6.1.1`
- **Purpose:** TypeScript types for `dotenv`.
- **Note:** `dotenv` is also a devDependency. The `@types/dotenv` package is typically only needed for older dotenv versions; modern `dotenv` ships its own types. Check if `@types/dotenv` is actually needed.
- **Safe to remove:** Possibly — low risk.
- **Confidence:** 60%

### ✅ `@types/jest@30.0.0`
- **Purpose:** TypeScript types for Jest.
- **Safe to remove:** No — needed for test type checking.

### ✅ `@types/node@20`
- **Purpose:** TypeScript types for Node.js APIs.
- **Safe to remove:** No — used throughout.

### ✅ `@types/react@19` + `@types/react-dom@19`
- **Purpose:** TypeScript types for React 19.
- **Safe to remove:** No — core.

### ✅ `autoprefixer@10.4.27`
- **Purpose:** PostCSS autoprefixer for CSS vendor prefixes.
- **Safe to remove:** No — required for CSS compatibility.

### ✅ `babel-plugin-react-compiler@1.0.0`
- **Purpose:** Enables React Compiler (automatic memoization) during build.
- **Safe to remove:** No — React Compiler is enabled in `next.config.ts`.

### ✅ `cross-env@10.1.0`
- **Purpose:** Cross-platform environment variable setting in npm scripts.
- **Safe to remove:** Possibly — check if any npm script uses `cross-env`. Used in test scripts for Windows compatibility.
- **Confidence:** 70%

### ✅ `dotenv@17.3.1`
- **Purpose:** Loads `.env` files in non-Next.js contexts (e.g., Jest tests).
- **Safe to remove:** No — needed for tests that load env vars.

### ✅ `eslint@9` + `eslint-config-next@16.1.1`
- **Purpose:** Linting.
- **Safe to remove:** No — code quality tooling.

### ✅ `jest@30.2.0` + `jest-environment-jsdom@30.2.0`
- **Purpose:** Unit testing.
- **Safe to remove:** No — test infrastructure.

### ✅ `postcss@8.5.6`
- **Purpose:** CSS transformation framework.
- **Safe to remove:** No — required for Tailwind.

### ✅ `tailwindcss@4.2.1`
- **Purpose:** CSS framework.
- **Safe to remove:** No — core styling.

### ✅ `ts-jest@29.4.6`
- **Purpose:** TypeScript transformation for Jest.
- **Safe to remove:** No — needed to run TypeScript tests.

### ✅ `ts-node@10.9.2`
- **Purpose:** TypeScript execution for Node.js scripts.
- **Safe to remove:** No — used for worker scripts.

### ✅ `tsx@4.21.0`
- **Purpose:** Fast TypeScript execution (used to run `worker/worker.ts`).
- **Safe to remove:** No — worker startup command.

### ✅ `typescript@5`
- **Purpose:** TypeScript compiler.
- **Safe to remove:** No — core.

---

## Removal Impact Summary

If all confirmed-unused packages are removed:

```json
// Remove from dependencies:
"@radix-ui/react-dialog": "^1.1.15",
"@radix-ui/react-icons": "^1.3.2",
"@radix-ui/react-slot": "^1.2.4",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"tailwind-merge": "^3.4.0"
```

**Estimated bundle size reduction:** ~120–180 KB minified (Radix UI + CVA + clsx + tailwind-merge)

**Steps to verify before removing:**
1. Run `npm ls <package>` to check for transitive dependencies.
2. Run `npx depcheck` for a comprehensive scan.
3. Run `npm remove <package>` in a branch.
4. Run `npm run build` and verify no build errors.
5. Run `npm test` and verify all tests pass.

---

## Recommended `npm` Command

After approval of SAFE_CLEANUP_PLAN.md:

```bash
npm remove @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

Then verify:
```bash
npm run build && npm test
```
