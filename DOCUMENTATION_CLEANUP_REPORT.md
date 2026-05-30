# DOCUMENTATION CLEANUP REPORT
**QuickNotes — Documentation Audit**
Generated: 2026-05-30 | DO NOT DELETE ANYTHING until SAFE_CLEANUP_PLAN.md is approved

---

## Summary

| Category | Count |
|----------|-------|
| KEEP | 6 |
| MERGE | 3 |
| ARCHIVE | 8 |
| DELETE | 11 |

Total documentation files found (excluding node_modules): **28**

---

## Category: KEEP

These files contain accurate, non-duplicated, actively useful information.

### K1. `README.md`
- **Reason:** Primary project overview. Entry point for any developer or reviewer. Contains setup instructions, tech stack overview, and running instructions.
- **Action:** Keep. Review periodically to ensure it reflects the current AI provider (OpenRouter, not Portkey/Cloudflare/Gemini).

### K2. `SUPABASE_SCHEMA.md`
- **Reason:** Contains the authoritative SQL schema for the project. Developers need this to set up the database. Critical for onboarding and deployment.
- **Action:** Keep. Add `chat_exports` table definition which is missing.

### K3. `DEPLOYMENT.md`
- **Reason:** Contains deployment instructions for Vercel. Actively needed for production deployments.
- **Action:** Keep. May need updating to remove references to Portkey/Cloudflare/Gemini gateways that no longer exist.

### K4. `FEEDBACK_SYSTEM.md`
- **Reason:** Documents the feedback collection feature schema and setup. This is a specific, non-redundant document.
- **Action:** Keep.

### K5. `PRODUCTION_CHECKLIST.md`
- **Reason:** Pre-deployment verification checklist. Valuable for maintaining deployment discipline.
- **Action:** Keep. Update to remove checklist items for Portkey/Cloudflare/Gemini.

### K6. `docs/ML-SYSTEM-DESIGN.md`
- **Reason:** Describes the ML system design principles (RAG, embeddings, chunking strategy). Contains architectural reasoning that is not in code comments.
- **Action:** Keep.

---

## Category: MERGE

These files should be consolidated into an existing KEEP file.

### M1. `PROJECT_DOCUMENTATION.md` → merge into `README.md`
- **Issue:** Large general documentation file that duplicates README content.
- **Action:** Extract any non-overlapping sections (if any) into README.md, then delete PROJECT_DOCUMENTATION.md.
- **Risk:** Low — primarily duplication.

### M2. `COMPREHENSIVE_PROJECT_GUIDE.md` → merge into `README.md`
- **Issue:** Another comprehensive guide that duplicates README and deployment documentation.
- **Action:** Review for unique content (e.g., detailed feature explanations), migrate to README, then delete.
- **Risk:** Low.

### M3. `docs/ml-systems-design.md` → merge into `docs/ML-SYSTEM-DESIGN.md`
- **Issue:** This is a literal duplicate of `docs/ML-SYSTEM-DESIGN.md`. Two files in the same folder with near-identical names.
- **Evidence:** Both files exist in `docs/` directory. One should be the canonical version.
- **Action:** Diff the two files, keep whichever is more complete/recent, delete the other.
- **Risk:** Very low — pure duplicate.

---

## Category: ARCHIVE

These files document historical decisions or completed fix investigations. They are not actively needed but should be kept for reference in a separate `docs/archive/` folder rather than polluting the root.

### A1. `GEMINI_MIGRATION_GUIDE.md`
- **Reason:** Documents the migration from Google Gemini to the current AI setup. Historically interesting but no longer actionable.
- **Action:** Move to `docs/archive/gemini-migration.md`.

### A2. `CHAT_HISTORY_FIX.md`
- **Reason:** Documents a bug fix for chat history. The fix has been applied (see `app/api/chat/history/route.ts` which references the P1.4 fix). Historical only.
- **Action:** Move to `docs/archive/`.

### A3. `RATE_LIMIT_FIX.md`
- **Reason:** Documents the rate limiting consolidation (moving from middleware to API routes). Fix is complete — `middleware.ts` is now a pass-through.
- **Action:** Move to `docs/archive/`.

### A4. `PDF_EXPORT_FIX_DOCUMENTATION.md`
- **Reason:** Documents a specific PDF export bug fix. Fix is complete (`professionalPdfGenerator.ts` is the active implementation).
- **Action:** Move to `docs/archive/`.

### A5. `PDF_FIX_SUMMARY.md`
- **Reason:** Summary of the PDF fix. Duplicate content with PDF_EXPORT_FIX_DOCUMENTATION.md.
- **Action:** Move to `docs/archive/` (or delete after A4 is archived).

### A6. `README_PDF_FIX.md`
- **Reason:** Another PDF fix README. Redundant with the other PDF fix docs.
- **Action:** Move to `docs/archive/`.

### A7. `MCQ_IMPLEMENTATION_COMPLETE.md`
- **Reason:** Documents that MCQ implementation is complete. The feature is live. This is a completion report, not ongoing documentation.
- **Action:** Move to `docs/archive/`.

### A8. `MCQ_VERIFICATION_REPORT.md`
- **Reason:** Verification report for MCQ feature. Historical record.
- **Action:** Move to `docs/archive/`.

---

## Category: DELETE

These files are redundant, auto-generated, or temporary and provide no lasting value.

### D1. `MCQ_DOCUMENTATION_INDEX.md`
- **Reason:** Index to MCQ documentation files. If the MCQ docs are being archived/deleted, this index is pointless.
- **Evidence:** References other MCQ docs that themselves are being archived/deleted.

### D2. `MCQ_FEATURE_IMPLEMENTATION.md`
- **Reason:** Detailed implementation notes for MCQ. The implementation is complete and is readable directly in `app/api/upload/route.ts` (`generateFormatPrompt('mcqs', ...)`). Implementation docs that duplicate code are dead weight.

### D3. `MCQ_QUICK_REFERENCE.md`
- **Reason:** Quick reference for MCQ format. The MCQ format is already documented in code and in the main project guide.

### D4. `MCQ_VISUAL_ARCHITECTURE.md`
- **Reason:** Visual architecture for MCQ specifically. The MCQ feature is a single format variant of the note generation system, not complex enough to warrant its own architecture diagram.

### D5. `PDF_ARCHITECTURE_VISUAL_GUIDE.md`
- **Reason:** Visual guide for PDF architecture. The PDF flow is now documented in `CURRENT_SYSTEM_ARCHITECTURE.md` (this audit). Redundant.

### D6. `PDF_DOCUMENTATION_INDEX.md`
- **Reason:** Index to 7 PDF documentation files. If many of those are being cleaned up, the index is useless.

### D7. `PDF_EXECUTIVE_SUMMARY.md`
- **Reason:** Executive summary of PDF implementation. This is internal implementation context for a past decision, not lasting documentation.

### D8. `PDF_EXPORT_DEPLOYMENT_CHECKLIST.md`
- **Reason:** Deployment checklist specifically for the PDF export feature. The main `PRODUCTION_CHECKLIST.md` supersedes this.

### D9. `PDF_TESTING_GUIDE.md`
- **Reason:** Testing guide for PDF export. Testing procedures belong in CI/README, not as standalone docs. The tests themselves in `pdfGenerator.test.ts` are the canonical test documentation.

### D10. `copy-functionality-test.md`
- **Reason:** Appears to be a temporary test document, not a proper documentation file.
- **Evidence:** Named like a test log, not a design document.

### D11. `PATENT_DOCUMENT.md`
- **Reason:** Contains a patent application document. This does not belong in the project root of a code repository. It contains no technical guidance for developers.
- **Action:** Delete from repo (or move to a private location outside the codebase). Patent documentation is not source documentation.

---

## Untracked Documentation (.zencoder/)

The `.zencoder/chats/` directory contains AI conversation exports:
- `.zencoder/chats/38c971c8.../`
- `.zencoder/chats/b5ddb708.../`
- `.zencoder/chats/e829dd51.../`

These are AI IDE tool artifacts. They should be added to `.gitignore` and not committed.

---

## Untracked Analysis Documents (from git status)

The following untracked files appeared in git status. They appear to be AI-generated analysis documents:
- `AGENTS.md` — Agent configuration doc (keep if used, ignore if not)
- `IMPLEMENTATION_GUIDE.md` — Implementation guide (review vs. existing docs)
- `PRODUCTION_FAILURE_ANALYSIS.md` — Failure analysis (archive or delete)
- `PRODUCTION_FAILURE_ANALYSIS.pdf` — PDF of the above (delete)
- `PRODUCTION_STABILITY_ANALYSIS.md` — Stability analysis (archive or delete)
- `QUICK_FIXES_COPY_PASTE.md` — Copy-paste fix snippets (delete after fixes applied)

---

## Recommended Final Documentation Structure

```
/
├── README.md                          # Single entry point (merged from PROJECT_DOCUMENTATION, COMPREHENSIVE_PROJECT_GUIDE)
├── SUPABASE_SCHEMA.md                 # Database schema (add chat_exports table)
├── DEPLOYMENT.md                      # Deployment guide (update AI gateway references)
├── FEEDBACK_SYSTEM.md                 # Feedback feature setup
├── PRODUCTION_CHECKLIST.md            # Pre-deploy checklist
├── CURRENT_SYSTEM_ARCHITECTURE.md     # THIS AUDIT (new, comprehensive)
├── UNUSED_CODE_REPORT.md              # THIS AUDIT (new)
├── DOCUMENTATION_CLEANUP_REPORT.md   # THIS AUDIT (new)
├── DEPENDENCY_AUDIT.md                # THIS AUDIT (new)
├── SAFE_CLEANUP_PLAN.md               # THIS AUDIT (new)
└── docs/
    ├── ML-SYSTEM-DESIGN.md            # ML architecture (keep canonical)
    └── archive/                       # Historical records
        ├── gemini-migration.md
        ├── chat-history-fix.md
        ├── rate-limit-fix.md
        ├── pdf-export-fix.md
        └── mcq-implementation-complete.md
```
