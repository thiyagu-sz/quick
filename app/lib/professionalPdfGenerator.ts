/**
 * QuickNotes Professional PDF Generator
 *
 * Architecture: markdown → HTML string → text/html response
 * Client opens in new window, user clicks "Save as PDF" in toolbar.
 * Browser PDF engine handles fonts, gradients, tables, and page numbers.
 *
 * No jsPDF. No Puppeteer. No binary dependencies. Vercel-safe.
 */

// ─── HTML escape ──────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Inline markdown ──────────────────────────────────────────────────────────
// ***bold-italic*** / **bold** / __bold__ / *italic* / _italic_
// ~~strike~~ / `code` / [text](url) → text only

function inline(raw: string): string {
  let t = esc(raw);
  t = t.replace(/\*\*\*(.+?)\*\*\*/g,           '<strong><em>$1</em></strong>');
  t = t.replace(/\*\*(.+?)\*\*/g,                '<strong>$1</strong>');
  t = t.replace(/(?<!_)__(?!_)(.+?)(?<!_)__(?!_)/g, '<strong>$1</strong>');
  t = t.replace(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  t = t.replace(/(?<!_)_(?!_)([^_\n]+?)(?<!_)_(?!_)/g,      '<em>$1</em>');
  t = t.replace(/~~(.+?)~~/g,                    '<del>$1</del>');
  t = t.replace(/`([^`\n]+)`/g,                  '<code>$1</code>');
  t = t.replace(/\[([^\]]+)\]\([^\)]*\)/g,       '$1');
  return t;
}

// ─── Table renderer ───────────────────────────────────────────────────────────

function renderTable(rows: string[]): string {
  const data = rows.filter(r => !/^\|[-: |]+\|$/.test(r.trim()));
  if (!data.length) return '';
  let html = '<div class="table-wrap"><table>';
  data.forEach((row, i) => {
    const cells = row.split('|').filter((_, j, a) => j > 0 && j < a.length - 1);
    const tag = i === 0 ? 'th' : 'td';
    html += `<tr>${cells.map(c => `<${tag}>${inline(c.trim())}</${tag}>`).join('')}</tr>`;
  });
  return html + '</table></div>';
}

// ─── Code block renderer ──────────────────────────────────────────────────────

function renderCodeBlock(lines: string[], lang: string): string {
  const code = lines.map(l => esc(l)).join('\n');
  const label = lang ? `<span class="code-lang">${esc(lang.toLowerCase())}</span>` : '';
  return `<div class="code-wrap">${label}<pre><code>${code}</code></pre></div>`;
}

// ─── List indent depth ────────────────────────────────────────────────────────

function indentDepth(line: string): number {
  const m = line.match(/^(\s*)/);
  return m ? Math.floor(m[1].length / 2) : 0;
}

// ─── Markdown → HTML body ─────────────────────────────────────────────────────

function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  let html = '';

  type ListFrame = { depth: number; ordered: boolean };
  let listStack: ListFrame[] = [];
  let inCode = false, codeLang = '', codeLines: string[] = [];
  let inTable = false, tableLines: string[] = [];
  let inBq = false, bqLines: string[] = [];
  let paraLines: string[] = [];

  const flushPara = () => {
    if (!paraLines.length) return;
    const t = paraLines.join(' ').trim();
    if (t) html += `<p>${inline(t)}</p>\n`;
    paraLines = [];
  };
  const flushLists = () => {
    while (listStack.length) html += listStack.pop()!.ordered ? '</ol>\n' : '</ul>\n';
  };
  const flushTable = () => {
    if (!inTable) return;
    if (tableLines.length) html += renderTable(tableLines) + '\n';
    tableLines = []; inTable = false;
  };
  const flushBq = () => {
    if (!inBq) return;
    html += `<blockquote>${bqLines.map(l => `<p>${inline(l)}</p>`).join('\n')}</blockquote>\n`;
    bqLines = []; inBq = false;
  };
  const flushAll = () => { flushPara(); flushLists(); flushTable(); flushBq(); };

  for (const line of lines) {
    const tr = line.trim();

    // Code fence
    if (tr.startsWith('```')) {
      if (!inCode) { flushAll(); inCode = true; codeLang = tr.slice(3).trim(); codeLines = []; }
      else { inCode = false; html += renderCodeBlock(codeLines, codeLang) + '\n'; codeLines = []; codeLang = ''; }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    // Table
    if (tr.startsWith('|')) {
      flushPara(); flushLists(); flushBq();
      inTable = true; tableLines.push(tr); continue;
    }
    if (inTable && !tr.startsWith('|')) flushTable();

    // Blank line
    if (!tr) { flushPara(); flushLists(); flushBq(); continue; }

    // HR
    if (/^[-*_]{3,}$/.test(tr)) { flushAll(); html += '<hr>\n'; continue; }

    // Headings h1–h5
    const hm = tr.match(/^(#{1,5}) (.+)/);
    if (hm) { flushAll(); html += `<h${hm[1].length}>${inline(hm[2])}</h${hm[1].length}>\n`; continue; }

    // Blockquote
    if (tr.startsWith('> ')) {
      flushPara(); flushLists();
      inBq = true; bqLines.push(tr.slice(2)); continue;
    }
    if (inBq && !tr.startsWith('> ')) flushBq();

    // MCQ patterns
    if (/^Q\d+\./.test(tr)) { flushAll(); html += `<p class="mcq-q">${inline(tr)}</p>\n`; continue; }
    if (/^[A-D]\./.test(tr)) { flushPara(); flushLists(); html += `<p class="mcq-opt">${inline(tr)}</p>\n`; continue; }
    if (tr.startsWith('Correct Answer:')) { flushAll(); html += `<p class="mcq-ans">${esc(tr)}</p>\n`; continue; }
    if (tr.startsWith('Explanation:')) { flushAll(); html += `<p class="mcq-exp">${inline(tr)}</p>\n`; continue; }

    // Lists (nested)
    const depth = indentDepth(line);
    const ul = tr.match(/^[-*+] (.+)/);
    const ol = tr.match(/^\d+\. (.+)/);
    if (ul || ol) {
      flushPara();
      const ordered = !!ol;
      const text = inline((ul ? ul[1] : ol![1]));
      if (!listStack.length) {
        html += ordered ? '<ol>\n' : '<ul>\n';
        listStack.push({ depth, ordered });
      } else {
        const top = listStack[listStack.length - 1];
        if (depth > top.depth) {
          html += ordered ? '<ol>\n' : '<ul>\n';
          listStack.push({ depth, ordered });
        } else if (depth < top.depth) {
          while (listStack.length && listStack[listStack.length - 1].depth > depth)
            html += listStack.pop()!.ordered ? '</ol>\n' : '</ul>\n';
        } else if (ordered !== top.ordered) {
          html += listStack.pop()!.ordered ? '</ol>\n' : '</ul>\n';
          html += ordered ? '<ol>\n' : '<ul>\n';
          listStack.push({ depth, ordered });
        }
      }
      html += `<li>${text}</li>\n`;
      continue;
    }

    // Paragraph
    flushLists(); flushBq();
    paraLines.push(tr);
  }

  flushAll();
  return html;
}

// ─── Smart title extraction ───────────────────────────────────────────────────

/** Strip all markdown markers from a heading string. */
function cleanHeading(s: string): string {
  return s.replace(/\*\*/g, '').replace(/\*/g, '').replace(/_/g, '')
          .replace(/`/g, '').replace(/[#\[\]]/g, '').trim();
}

/** Title-case a string, treating common minor words correctly. */
function toTitleCase(s: string): string {
  const minor = new Set(['a','an','the','and','but','or','for','nor','on','at','to','by','in','of','up','as','vs']);
  return s.split(' ').map((w, i) => {
    if (!w) return w;
    return (i > 0 && minor.has(w.toLowerCase())) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

/** Stop-words ignored when deriving a topic from headings. */
const STOP = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by','from',
  'is','are','was','were','be','been','have','has','had','do','does','did',
  'will','would','could','should','may','might','can',
  'introduction','overview','summary','notes','key','points','concepts',
  'topics','study','types','uses','applications','examples','definition',
  'important','basic','advanced','chapter','unit','module','part',
]);

/**
 * Find the most-prominent topic noun(s) from a set of heading strings.
 * Returns a title-cased phrase (1–3 words) or empty string if nothing found.
 */
function dominantTopic(headings: string[]): string {
  const freq: Record<string, number> = {};
  for (const h of headings) {
    for (const w of h.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)) {
      if (w.length > 2 && !STOP.has(w)) freq[w] = (freq[w] || 0) + 1;
    }
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return '';

  const top = sorted.slice(0, 3).map(([w]) => w);
  // Prefer a two-word phrase that appears adjacent in any heading
  if (top.length >= 2) {
    const pair = `${top[0]} ${top[1]}`;
    if (headings.some(h => h.toLowerCase().includes(pair))) return toTitleCase(pair);
  }
  return toTitleCase(top[0]);
}

/**
 * Choose a professional suffix that matches the content type.
 * e.g. MCQ → "Quiz", architecture-heavy → "Architecture and Concepts"
 */
function contentSuffix(md: string): string {
  const lower = md.toLowerCase();
  const lines = md.split('\n');
  if (lines.filter(l => /^Q\d+\./.test(l.trim())).length >= 3) return 'Quiz';
  if (/\barchitecture\b|\bcomponents?\b|\bstructure\b/.test(lower)) return 'Architecture and Concepts';
  if ((lower.match(/\bvs\.?\b|\bversus\b|\bdifference\b/g) || []).length >= 2) return 'Comparison';
  if (/\bintroduction\b|\bwhat is\b|\boverview\b/.test(lower)) return 'Overview';
  return 'Fundamentals';
}

/**
 * Derive a clean 3–8 word cover title from AI-generated markdown.
 * Priority: H1 → H2 → heading topic analysis → passedTitle (if short) → fallback.
 */
function extractTitle(md: string, passedTitle: string): string {
  // 1. H1 heading — the AI always generates one for structured notes
  const h1 = md.match(/^#\s+(.+?)$/m);
  if (h1) {
    const words = cleanHeading(h1[1]).split(/\s+/).filter(Boolean);
    if (words.length >= 2) return toTitleCase(words.slice(0, 8).join(' '));
  }

  // 2. First H2 heading — next most authoritative
  const h2 = md.match(/^##\s+(.+?)$/m);
  if (h2) {
    const words = cleanHeading(h2[1]).split(/\s+/).filter(Boolean);
    if (words.length >= 2) return toTitleCase(words.slice(0, 8).join(' '));
  }

  // 3. Derive topic from all headings in the document
  const headings = [...md.matchAll(/^#{1,3}\s+(.+?)$/gm)].map(m => cleanHeading(m[1]));
  if (headings.length >= 2) {
    const topic = dominantTopic(headings);
    if (topic) return toTitleCase(`${topic} ${contentSuffix(md)}`);
  }

  // 4. passedTitle only if it looks like a real title (short, no sentence verbs early)
  if (passedTitle && passedTitle !== 'Study Notes' && passedTitle !== 'Chat Conversation') {
    const words = passedTitle.trim().split(/\s+/).filter(Boolean);
    const sentenceVerbs = new Set(['has','have','is','are','was','were','will','would','can','could','should','that','which']);
    const looksSentence = words.length > 8 || (words.length > 2 && sentenceVerbs.has((words[1] || '').toLowerCase()));
    if (!looksSentence) return toTitleCase(words.slice(0, 8).join(' '));
    // passedTitle looks like raw pasted content — extract topic from it
    const topic = dominantTopic([passedTitle]);
    if (topic) return toTitleCase(`${topic} ${contentSuffix(md)}`);
  }

  // 5. Final fallback
  return 'Study Notes';
}

// ─── HTML template ────────────────────────────────────────────────────────────

function buildHtml(title: string, body: string): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
/* ── Reset ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ── @page ── */
@page{size:A4;margin:18mm 22mm 26mm 22mm}
@page:first{margin:0}
@page{
  @bottom-left{content:"QuickNotes";font-family:'Inter',sans-serif;font-size:7.5pt;color:#9999bb;letter-spacing:.04em}
  @bottom-right{content:counter(page)" / "counter(pages);font-family:'Inter',sans-serif;font-size:7.5pt;color:#9999bb}
}
@page:first{@bottom-left{content:none}@bottom-right{content:none}}

/* ── Base ── */
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:10.5pt;line-height:1.75;color:#1e1e2e;background:#fff}

/* ── Cover ── */
.cover{
  height:297mm;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:linear-gradient(150deg,#0f0e1a 0%,#1d1850 50%,#0f0e1a 100%);
  color:#fff;page-break-after:always;padding:64px 56px;text-align:center;position:relative;overflow:hidden;
}
.cover::before{content:'';position:absolute;top:-100px;right:-60px;width:420px;height:420px;background:radial-gradient(circle,rgba(94,78,255,.28) 0%,transparent 68%);pointer-events:none}
.cover::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#5e4eff 30%,#00b4ff 70%,transparent)}
.cover-brand{display:flex;align-items:center;gap:14px;margin-bottom:60px}
.cover-brand svg{width:38px;height:38px}
.cover-brand-name{font-size:14pt;font-weight:600;letter-spacing:.08em;color:rgba(255,255,255,.75);text-transform:uppercase}
.cover-title{font-size:28pt;font-weight:700;line-height:1.2;margin-bottom:22px;max-width:540px;letter-spacing:-.01em}
.cover-divider{width:40px;height:2px;background:linear-gradient(90deg,#5e4eff,#00b4ff);border-radius:2px;margin:0 auto 36px}
.cover-meta{font-size:8.5pt;color:rgba(255,255,255,.3);letter-spacing:.05em;text-transform:uppercase}

/* ── Content ── */
.content{max-width:172mm;margin:0 auto}

/* ── Headings ── */
h1{font-size:20pt;font-weight:700;color:#0f0f1a;letter-spacing:-.02em;margin:32px 0 14px;line-height:1.2;page-break-after:avoid}
h2{font-size:15pt;font-weight:600;color:#12122a;letter-spacing:-.01em;margin:30px 0 12px;padding-bottom:8px;border-bottom:2px solid #5e4eff;line-height:1.3;page-break-after:avoid}
h3{font-size:12.5pt;font-weight:600;color:#24243e;margin:22px 0 8px;line-height:1.3;page-break-after:avoid}
h4{font-size:11pt;font-weight:600;color:#34344e;margin:16px 0 6px;page-break-after:avoid}
h5{font-size:10.5pt;font-weight:600;color:#44446a;margin:12px 0 4px;page-break-after:avoid}

/* ── Body ── */
p{margin:8px 0;color:#2a2a3e;line-height:1.75;orphans:3;widows:3}

/* ── Lists ── */
ul,ol{margin:10px 0;padding-left:24px}
li{margin:5px 0;color:#2a2a3e;line-height:1.68;padding-left:2px}
ul li::marker{color:#5e4eff;font-size:.9em}
ol li::marker{font-weight:600;color:#5e4eff}
li ul,li ol{margin-top:4px;margin-bottom:4px;padding-left:20px}

/* ── Blockquote ── */
blockquote{margin:14px 0;padding:12px 18px;border-left:3px solid #5e4eff;background:#f6f5ff;color:#44446a;border-radius:0 6px 6px 0;page-break-inside:avoid}
blockquote p{margin:4px 0;color:inherit;font-size:.97em}

/* ── Inline code ── */
code{font-family:'JetBrains Mono','Fira Code','Cascadia Code',Consolas,'Courier New',monospace;font-size:9pt;background:#eeecff;color:#4835b5;padding:1px 5px;border-radius:3px;border:1px solid rgba(94,78,255,.15)}

/* ── Code block ── */
.code-wrap{margin:16px 0;border-radius:8px;overflow:hidden;page-break-inside:avoid;border:1px solid #1a1a2e}
.code-lang{display:block;background:#1a1a2e;padding:6px 16px;font-family:'JetBrains Mono',monospace;font-size:7.5pt;color:rgba(255,255,255,.38);letter-spacing:.07em;text-transform:uppercase}
.code-wrap pre{margin:0;padding:14px 16px;background:#13111f;overflow-x:hidden}
.code-wrap pre code{font-family:'JetBrains Mono','Fira Code',Consolas,'Courier New',monospace;font-size:8.5pt;background:transparent;color:#cdd6f4;padding:0;border-radius:0;line-height:1.65;border:none;white-space:pre-wrap;word-break:break-all}

/* ── Tables ── */
.table-wrap{margin:16px 0;overflow:hidden;border-radius:8px;border:1px solid #e2e2f0;page-break-inside:avoid}
table{width:100%;border-collapse:collapse;font-size:10pt}
th{background:#5e4eff;color:#fff;padding:9px 14px;text-align:left;font-weight:600;font-size:9.5pt;letter-spacing:.01em}
td{padding:8px 14px;border-bottom:1px solid #eaeaf4;color:#2a2a3e}
tr:last-child td{border-bottom:none}
tr:nth-child(even) td{background:#f8f8ff}

/* ── HR ── */
hr{border:none;border-top:1px solid #e2e2f0;margin:24px 0}

/* ── Inline formatting ── */
strong{font-weight:600;color:#0f0f1a}
em{font-style:italic;color:#3c3c58}
del{text-decoration:line-through;color:#888899;opacity:.8}

/* ── MCQ ── */
.mcq-q{font-weight:600;color:#0f0f1a;font-size:11pt;margin:20px 0 8px;page-break-after:avoid}
.mcq-opt{margin:3px 0 3px 20px;color:#34344e;font-size:10.5pt}
.mcq-ans{display:inline-block;margin:8px 0 4px;background:#dcfce7;color:#166534;padding:4px 14px;border-radius:5px;font-weight:600;font-size:9.5pt}
.mcq-exp{margin:3px 0 16px;color:#55556e;font-size:9.5pt;font-style:italic;line-height:1.6}

/* ── Toolbar (screen only) ── */
.toolbar{position:fixed;top:0;left:0;right:0;height:52px;background:#0f0e1a;display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:9999;box-shadow:0 2px 16px rgba(0,0,0,.5);border-bottom:1px solid rgba(94,78,255,.3)}
.toolbar-brand{color:rgba(255,255,255,.8);font-size:14px;font-weight:600;display:flex;align-items:center;gap:10px;letter-spacing:.01em}
.toolbar-actions{display:flex;gap:10px}
.btn-save{background:linear-gradient(135deg,#5e4eff,#4a3fd4);color:#fff;border:none;padding:8px 22px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;letter-spacing:.01em}
.btn-save:hover{opacity:.88}
.btn-close{background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.15);padding:8px 16px;border-radius:6px;font-size:13px;cursor:pointer;font-family:inherit}
.btn-close:hover{background:rgba(255,255,255,.12)}

/* ── Screen layout ── */
@media screen{body{padding-top:52px}.content{padding:28px 36px;max-width:880px}.table-wrap{overflow-x:auto}}

/* ── Print ── */
@media print{
  .toolbar{display:none!important}
  body{padding-top:0}
  .content{padding:0;max-width:100%}
  h1,h2,h3,h4,h5{page-break-after:avoid}
  li,tr,blockquote,.code-wrap,.mcq-q{page-break-inside:avoid}
  .code-wrap pre{white-space:pre-wrap;word-break:break-all}
  a{color:inherit;text-decoration:none}
  p{orphans:3;widows:3}
}
</style>
</head>
<body>

<div class="toolbar">
  <div class="toolbar-brand">
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5e4eff"/><stop offset="100%" stop-color="#00b4ff"/></linearGradient></defs>
      <polygon points="30,20 70,20 85,35 45,35" fill="url(#g)" opacity=".9"/>
      <polygon points="70,20 85,35 85,75 70,60" fill="#4a3fd9" opacity=".8"/>
      <polygon points="30,20 45,35 45,75 30,60" fill="#6e5dff" opacity=".7"/>
      <polygon points="45,35 85,35 85,75 45,75" fill="url(#g)" opacity=".6"/>
      <polygon points="30,60 45,75 85,75 70,60" fill="#3a2fcf" opacity=".85"/>
    </svg>
    QuickNotes — PDF Preview
  </div>
  <div class="toolbar-actions">
    <button class="btn-save" onclick="window.print()">&#8595; Save as PDF</button>
    <button class="btn-close" onclick="window.close()">&#10005; Close</button>
  </div>
</div>

<div class="cover">
  <div class="cover-brand">
    <svg viewBox="0 0 100 100" fill="none">
      <defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5e4eff"/><stop offset="100%" stop-color="#00b4ff"/></linearGradient></defs>
      <polygon points="30,20 70,20 85,35 45,35" fill="url(#cg)" opacity=".9"/>
      <polygon points="70,20 85,35 85,75 70,60" fill="#4a3fd9" opacity=".8"/>
      <polygon points="30,20 45,35 45,75 30,60" fill="#6e5dff" opacity=".7"/>
      <polygon points="45,35 85,35 85,75 45,75" fill="url(#cg)" opacity=".6"/>
      <polygon points="30,60 45,75 85,75 70,60" fill="#3a2fcf" opacity=".85"/>
    </svg>
    <span class="cover-brand-name">QuickNotes</span>
  </div>
  <div class="cover-title">${esc(title)}</div>
  <div class="cover-divider"></div>
  <p class="cover-meta">Generated ${date} &nbsp;·&nbsp; AI Study Assistant</p>
</div>

<div class="content">
${body}
</div>

</body>
</html>`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface ProPDFOptions {
  title: string;
  content: string;
  author?: string;
  includeTableOfContents?: boolean;
  includePageNumbers?: boolean;
  logoBase64?: string;
  brandColor?: string;
}

/** Primary export — returns a complete, print-ready HTML string. */
export function generatePrintableHTML(markdown: string, passedTitle: string): string {
  const title = extractTitle(markdown, passedTitle);
  return buildHtml(title, markdownToHtml(markdown));
}

/** Backward-compatible class wrapper (route uses this constructor + .generate()). */
export class ProfessionalPdfGenerator {
  constructor(_opts: Partial<ProPDFOptions> = {}) {}

  public generate(opts: ProPDFOptions): ArrayBuffer {
    const title = extractTitle(opts.content, opts.title || 'Study Notes');
    const html  = buildHtml(title, markdownToHtml(opts.content));
    return new TextEncoder().encode(html).buffer;
  }

  public generateBlob(opts: ProPDFOptions): Blob {
    const title = extractTitle(opts.content, opts.title || 'Study Notes');
    const html  = buildHtml(title, markdownToHtml(opts.content));
    return new Blob([html], { type: 'text/html; charset=utf-8' });
  }
}

export async function imageToBase64(_path: string): Promise<string> { return ''; }
