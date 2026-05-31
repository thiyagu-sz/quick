# PDF SYSTEM AUDIT
> Generated: 2026-05-30

---

## 1. ALL PDF FILES IN THE CODEBASE

| File | Size | Purpose | Status |
|------|------|---------|--------|
| `app/lib/professionalPdfGenerator.ts` | ~400 lines | PRIMARY: markdown → HTML → print | **BROKEN** (keeps reverting to jsPDF) |
| `app/lib/clientPdfGenerator.ts` | ~390 lines | FALLBACK: jsPDF binary PDF | Fixed (stripInlineMarkdown added) |
| `app/lib/pdfGenerator.ts` | ~390 lines | LEGACY: markdown → HTML (notes page) | **ORPHANED** (no imports) |
| `app/lib/reportGenerator.ts` | ~100 lines | Helper used only by pdfGenerator.ts | **ORPHANED** |
| `app/api/chat/pdf/route.ts` | ~55 lines | API endpoint returning text/html | Active |

---

## 2. WHICH IMPLEMENTATION IS ACTUALLY USED

### Chat page (`app/chat/page.tsx`)
```
handleExport('pdf') → POST /api/chat/pdf → professionalPdfGenerator.generatePrintableHTML()
                                          → returns text/html
                    → client opens new window with toolbar → user prints → PDF
Fallback (server fail or popup blocked):
                    → generateClientPDF() from clientPdfGenerator.ts → jsPDF binary blob
```

### Notes page (`app/notes/[id]/page.tsx`)
```
exportToPDF() → POST /api/chat/pdf { markdown, title }  ← FIXED in last session
              → returns text/html → opens in new window
```
*Previously was sending `{html, filename}` which returned 400 — now fixed.*

### Exports page (`app/exports/page.tsx`)
```
handleExport() → POST /api/chat/pdf { markdown, title } → returns text/html
              → window.open(blob URL) → win.print() auto-triggered
```

---

## 3. THE REVERT PROBLEM — ROOT CAUSE

The `professionalPdfGenerator.ts` file contains the jsPDF class as the **git-committed version**. The HTML-based rewrite exists only as an **unstaged/uncommitted change**.

Every time:
- `git checkout` or `git reset` runs
- A linter auto-formats and overwrites
- The user reverts in IDE

…the jsPDF version returns.

**Evidence:** The system-reminder in the session notes: `"f:\...\professionalPdfGenerator.ts was modified, either by the user or by a linter"` — showing the reverted content which begins `import { jsPDF } from 'jspdf'`.

**Fix required:** The HTML version must be committed to git. The jsPDF version should be the fallback (`clientPdfGenerator.ts`) not the primary.

---

## 4. IMPORT CHAIN VERIFICATION

### `app/api/chat/pdf/route.ts` imports:
```ts
import { generatePrintableHTML } from '@/app/lib/professionalPdfGenerator';
```
**Current state of professionalPdfGenerator.ts:** Exports only `ProfessionalPdfGenerator` class and `ProPDFOptions` interface. Does NOT export `generatePrintableHTML`.

**Result:** TypeScript compilation error. Build would fail on `npm run build`.

### `app/notes/[id]/page.tsx` — FIXED
Old (broken): `import { generateProfessionalHTML } from '@/app/lib/pdfGenerator'`  
New (fixed): No import, calls API directly with `{markdown, title}`.

### `app/lib/pdfGenerator.ts` imports:
```ts
import ProfessionalReportGenerator from './reportGenerator';
```
`pdfGenerator.ts` is itself not imported anywhere. This entire chain is dead.

---

## 5. LEGACY vs ACTIVE CODE COMPARISON

| Generator | Export method | Auth | Page numbers | Markdown | Inline code |
|-----------|--------------|------|--------------|----------|-------------|
| `professionalPdfGenerator.ts` (HTML) | browser print | ✓ | via @page | Full | Dark theme |
| `clientPdfGenerator.ts` (jsPDF) | binary blob | N/A | via footer loop | **partial** (fixed) | gray box |
| `pdfGenerator.ts` (legacy HTML) | abandoned | N/A | ✗ | partial | stripped |

---

## 6. DEAD DEPENDENCIES

| Package | Used? | Size | Action |
|---------|-------|------|--------|
| `jspdf` | Only in fallback | ~3MB | Keep (fallback only) |
| `puppeteer` | **Never** | ~400MB + Chromium | **Remove** |
| `pdf-parse` | Upload route for PDF text extraction | ~2MB | Keep |
| `pdf2json` | Upload route | ~5MB | Verify usage |
| `pdfjs-dist` | Upload route | ~50MB | Keep |

---

## 7. WHICH IMPLEMENTATION SHOULD BE USED

**Primary (recommended):** `professionalPdfGenerator.ts` — HTML + browser print  
**Rationale:**
- Zero server-side dependencies (no Chromium, no headless browser)
- Vercel-compatible (no binary executables)
- Fonts, CSS, colors render correctly via browser engine
- Same approach used by Notion, Linear, Coda
- Cover page, page numbers, code blocks work correctly

**Fallback:** `clientPdfGenerator.ts` (jsPDF)  
**Trigger:** Server PDF call fails OR popup is blocked

**Remove:** `pdfGenerator.ts`, `reportGenerator.ts`, `puppeteer`

---

## 8. ACTION ITEMS

1. **COMMIT** the HTML version of `professionalPdfGenerator.ts` to git immediately
2. **Remove** `pdfGenerator.ts` and `reportGenerator.ts` (dead code)
3. **Remove** `puppeteer` from `package.json`
4. **Fix** CORS header: replace empty string with `'*'` or the actual domain
5. **Verify** build passes with `npm run build`
