/**
 * Generates deterministic PDF fixtures used by the upload tests/load scripts:
 *   tests/fixtures/sample.pdf   — 1 page, extractable text
 *   tests/fixtures/large.pdf    — 60 pages, extractable text (multi-page path)
 *   tests/fixtures/corrupt.pdf  — has a %PDF header but is not a valid PDF
 *   tests/fixtures/empty.pdf    — 0 bytes
 *
 * These are tiny hand-built PDFs (Helvetica/Type1, real text operators) so
 * pdfjs-dist extracts actual words. They are NOT large scanned files — the
 * "large" one exercises the multi-page loop, not raw file size.
 *
 * Run:  node tests/fixtures/make-fixtures.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const enc = (s) => Buffer.from(s, 'latin1');

/** Build a minimal valid PDF from an array of page text strings. */
function buildPdf(pageTexts) {
  const n = pageTexts.length;
  const objects = {};
  objects[1] = `<</Type /Catalog /Pages 2 0 R>>`;
  const kids = [];
  for (let i = 0; i < n; i++) kids.push(`${4 + i * 2} 0 R`);
  objects[2] = `<</Type /Pages /Kids [${kids.join(' ')}] /Count ${n}>>`;
  objects[3] = `<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>`;
  for (let i = 0; i < n; i++) {
    const pageId = 4 + i * 2;
    const contentId = 5 + i * 2;
    objects[pageId] =
      `<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ` +
      `/Resources <</Font <</F1 3 0 R>>>> /Contents ${contentId} 0 R>>`;
    const text = pageTexts[i].replace(/([()\\])/g, '\\$1');
    const stream = `BT /F1 12 Tf 72 720 Td (${text}) Tj ET`;
    objects[contentId] =
      `<</Length ${Buffer.byteLength(stream, 'latin1')}>>\nstream\n${stream}\nendstream`;
  }

  const maxId = 3 + n * 2;
  let out = enc('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const offsets = new Array(maxId + 1).fill(0);
  for (let id = 1; id <= maxId; id++) {
    offsets[id] = out.length;
    out = Buffer.concat([out, enc(`${id} 0 obj\n${objects[id]}\nendobj\n`)]);
  }
  const xrefStart = out.length;
  let xref = `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= maxId; id++) {
    xref += String(offsets[id]).padStart(10, '0') + ' 00000 n \n';
  }
  const trailer = `trailer\n<</Size ${maxId + 1} /Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF\n`;
  return Buffer.concat([out, enc(xref), enc(trailer)]);
}

// sample.pdf — single page
const sample = buildPdf([
  'QuickNotes upload fixture. The water cycle moves water through evaporation, ' +
    'condensation, and precipitation. Photosynthesis converts light into chemical energy.',
]);
writeFileSync(join(__dirname, 'sample.pdf'), sample);

// large.pdf — 60 pages
const pages = [];
for (let i = 1; i <= 60; i++) {
  pages.push(
    `Page ${i}. Topic ${i}: mitochondria, osmosis, and thermodynamics. ` +
      `Key term ${i}: an exam-relevant definition appears here for extraction testing.`,
  );
}
const large = buildPdf(pages);
writeFileSync(join(__dirname, 'large.pdf'), large);

// corrupt.pdf — header but garbage body (pdfjs should fail → route returns 202 with no docs)
writeFileSync(
  join(__dirname, 'corrupt.pdf'),
  enc('%PDF-1.4\nthis is not a real pdf body \x00\x01\x02 truncated'),
);

// empty.pdf — 0 bytes
writeFileSync(join(__dirname, 'empty.pdf'), Buffer.alloc(0));

console.log('Wrote fixtures:');
console.log(`  sample.pdf   ${sample.length} bytes (1 page)`);
console.log(`  large.pdf    ${large.length} bytes (60 pages)`);
console.log(`  corrupt.pdf  (invalid body)`);
console.log(`  empty.pdf    0 bytes`);
