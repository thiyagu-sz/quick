/**
 * QuickNotes Professional PDF Generator
 *
 * Generates browser-printable HTML from markdown.
 * The HTML is opened in a new window where the user clicks "Save as PDF"
 * (or it auto-prints), producing SaaS-grade output via the browser's native
 * PDF renderer — fonts, colors, tables, and code blocks all render correctly.
 *
 * Architecture:
 *   markdown → markdownToHtml() → HTML template string → UTF-8 ArrayBuffer
 *   Route returns Content-Type: text/html
 *   Client opens in new window → user prints / auto-print triggers
 */

// ─── HTML escape ─────────────────────────────────────────────────────────────

function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Inline markdown ─────────────────────────────────────────────────────────
// Processes: ***bold-italic***, **bold**, __bold__, *italic*, _italic_,
//            ~~strikethrough~~, `code`, [text](url) → text only

function inline(raw: string): string {
  let t = esc(raw);
  // Bold-italic: ***text***
  t = t.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold: **text** or __text__
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(?<!_)__(?!_)(.+?)(?<!_)__(?!_)/g, '<strong>$1</strong>');
  // Italic: *text* (not bold) or _text_ (not bold)
  t = t.replace(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  t = t.replace(/(?<!_)_(?!_)([^_\n]+?)(?<!_)_(?!_)/g, '<em>$1</em>');
  // Strikethrough: ~~text~~
  t = t.replace(/~~(.+?)~~/g, '<del>$1</del>');
  // Inline code: `code`
  t = t.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  // Links: [text](url) → just the text
  t = t.replace(/\[([^\]]+)\]\([^\)]*\)/g, '$1');
  return t;
}

// ─── Table renderer ──────────────────────────────────────────────────────────

function renderTable(rows: string[]): string {
  const dataRows = rows.filter(r => !/^\|[-: |]+\|$/.test(r.trim()));
  if (dataRows.length === 0) return '';

  let html = '<div class="table-wrap"><table>';
  dataRows.forEach((row, i) => {
    const cells = row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
    const tag = i === 0 ? 'th' : 'td';
    html += `<tr>${cells.map(c => `<${tag}>${inline(c.trim())}</${tag}>`).join('')}</tr>`;
  });
  return html + '</table></div>';
}

// ─── Code block renderer ─────────────────────────────────────────────────────

function renderCodeBlock(lines: string[], lang: string): string {
  const escaped = lines.map(l => esc(l)).join('\n');
  const label = lang ? `<span class="code-lang">${esc(lang.toLowerCase())}</span>` : '';
  return `<div class="code-wrapper">${label}<pre><code>${escaped}</code></pre></div>`;
}

// ─── List stack helpers ───────────────────────────────────────────────────────

type ListItem = { depth: number; ordered: boolean };

function getIndentDepth(line: string): number {
  const match = line.match(/^(\s*)/);
  if (!match) return 0;
  const spaces = match[1].length;
  // Treat 2 or more spaces as one indent level
  return Math.floor(spaces / 2);
}

// ─── Markdown → HTML ─────────────────────────────────────────────────────────

function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  let html = '';

  let listStack: ListItem[] = [];   // stack of open list contexts
  let inCodeBlock = false;
  let codeLang = '';
  let codeLines: string[] = [];
  let tableLines: string[] = [];
  let inTable = false;
  let paraLines: string[] = [];
  let inBlockquote = false;
  let bqLines: string[] = [];

  function flushPara() {
    if (paraLines.length === 0) return;
    const text = paraLines.join(' ').trim();
    if (text) html += `<p>${inline(text)}</p>\n`;
    paraLines = [];
  }

  function flushLists() {
    while (listStack.length > 0) {
      const top = listStack.pop()!;
      html += top.ordered ? '</ol>\n' : '</ul>\n';
    }
  }

  function flushTable() {
    if (!inTable) return;
    if (tableLines.length > 0) html += renderTable(tableLines) + '\n';
    tableLines = [];
    inTable = false;
  }

  function flushBlockquote() {
    if (!inBlockquote) return;
    const inner = bqLines.map(l => `<p>${inline(l)}</p>`).join('\n');
    html += `<blockquote>${inner}</blockquote>\n`;
    bqLines = [];
    inBlockquote = false;
  }

  function flushAll() {
    flushPara();
    flushLists();
    flushTable();
    flushBlockquote();
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // ── Code block ───────────────────────────────────────────────────────────
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        flushAll();
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim();
        codeLines = [];
      } else {
        inCodeBlock = false;
        html += renderCodeBlock(codeLines, codeLang) + '\n';
        codeLines = [];
        codeLang = '';
      }
      continue;
    }
    if (inCodeBlock) { codeLines.push(line); continue; }

    // ── Table ────────────────────────────────────────────────────────────────
    if (trimmed.startsWith('|')) {
      flushPara(); flushLists(); flushBlockquote();
      inTable = true;
      tableLines.push(trimmed);
      continue;
    }
    if (inTable && !trimmed.startsWith('|')) { flushTable(); }

    // ── Empty line ───────────────────────────────────────────────────────────
    if (!trimmed) {
      flushPara();
      flushLists();
      flushBlockquote();
      continue;
    }

    // ── Horizontal rule ──────────────────────────────────────────────────────
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushAll();
      html += '<hr>\n';
      continue;
    }

    // ── Headings ─────────────────────────────────────────────────────────────
    const h1 = trimmed.match(/^# (.+)/);
    const h2 = trimmed.match(/^## (.+)/);
    const h3 = trimmed.match(/^### (.+)/);
    const h4 = trimmed.match(/^#### (.+)/);
    const h5 = trimmed.match(/^##### (.+)/);

    if (h1) { flushAll(); html += `<h1>${inline(h1[1])}</h1>\n`; continue; }
    if (h2) { flushAll(); html += `<h2>${inline(h2[1])}</h2>\n`; continue; }
    if (h3) { flushAll(); html += `<h3>${inline(h3[1])}</h3>\n`; continue; }
    if (h4) { flushAll(); html += `<h4>${inline(h4[1])}</h4>\n`; continue; }
    if (h5) { flushAll(); html += `<h5>${inline(h5[1])}</h5>\n`; continue; }

    // ── Blockquote ───────────────────────────────────────────────────────────
    if (trimmed.startsWith('> ')) {
      flushPara(); flushLists();
      inBlockquote = true;
      bqLines.push(trimmed.slice(2));
      continue;
    }
    if (inBlockquote && !trimmed.startsWith('> ')) { flushBlockquote(); }

    // ── MCQ: question ────────────────────────────────────────────────────────
    if (/^Q\d+\./.test(trimmed)) {
      flushAll();
      html += `<p class="mcq-question">${inline(trimmed)}</p>\n`;
      continue;
    }

    // ── MCQ: answer options ──────────────────────────────────────────────────
    if (/^[A-D]\./.test(trimmed)) {
      flushPara(); flushLists();
      html += `<p class="mcq-option">${inline(trimmed)}</p>\n`;
      continue;
    }

    // ── MCQ: correct answer ──────────────────────────────────────────────────
    if (trimmed.startsWith('Correct Answer:')) {
      flushAll();
      html += `<p class="mcq-answer">${esc(trimmed)}</p>\n`;
      continue;
    }

    // ── MCQ: explanation ─────────────────────────────────────────────────────
    if (trimmed.startsWith('Explanation:')) {
      flushAll();
      html += `<p class="mcq-explanation">${inline(trimmed)}</p>\n`;
      continue;
    }

    // ── Lists (unordered and ordered, with nesting) ───────────────────────────
    const depth = getIndentDepth(line);
    const ulMatch = trimmed.match(/^[-*+] (.+)/);
    const olMatch = trimmed.match(/^\d+\. (.+)/);

    if (ulMatch || olMatch) {
      flushPara();
      const isOrdered = !!olMatch;
      const itemText = inline((ulMatch ? ulMatch[1] : olMatch![1]));

      if (listStack.length === 0) {
        // Start first list
        html += isOrdered ? '<ol>\n' : '<ul>\n';
        listStack.push({ depth, ordered: isOrdered });
      } else {
        const top = listStack[listStack.length - 1];
        if (depth > top.depth) {
          // Nest deeper
          html += isOrdered ? '<ol>\n' : '<ul>\n';
          listStack.push({ depth, ordered: isOrdered });
        } else if (depth < top.depth) {
          // Pop back up to matching depth
          while (listStack.length > 0 && listStack[listStack.length - 1].depth > depth) {
            const popped = listStack.pop()!;
            html += popped.ordered ? '</ol>\n' : '</ul>\n';
          }
        } else if (isOrdered !== top.ordered) {
          // Same depth but different list type — close and reopen
          const popped = listStack.pop()!;
          html += popped.ordered ? '</ol>\n' : '</ul>\n';
          html += isOrdered ? '<ol>\n' : '<ul>\n';
          listStack.push({ depth, ordered: isOrdered });
        }
      }

      html += `<li>${itemText}</li>\n`;
      continue;
    }

    // ── Regular paragraph text ───────────────────────────────────────────────
    flushLists();
    flushBlockquote();
    paraLines.push(trimmed);
  }

  flushAll();
  return html;
}

// ─── Intro extractor ─────────────────────────────────────────────────────────

function extractIntro(markdown: string): string {
  const lines = markdown.split('\n');
  for (const line of lines) {
    const t = line.trim();
    if (
      t &&
      !t.startsWith('#') &&
      !t.startsWith('-') &&
      !t.startsWith('*') &&
      !t.startsWith('|') &&
      !t.startsWith('>') &&
      !t.startsWith('`') &&
      t.length > 15
    ) {
      return t.replace(/\*\*/g, '').replace(/_/g, '').substring(0, 200);
    }
  }
  return 'AI-generated study material from QuickNotes';
}

// ─── HTML template ───────────────────────────────────────────────────────────

function buildHtml(title: string, intro: string, bodyHtml: string): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const safeTitle = esc(title);
  const safeIntro = esc(intro);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${safeTitle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
/* ── Reset ────────────────────────────────────────────────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ── @page rules ─────────────────────────────────────────────────────────── */
@page{
  size:A4;
  margin:18mm 22mm 26mm 22mm;
}
@page:first{margin:0}
@page{
  @bottom-left{
    content:"QuickNotes";
    font-family:'Inter',sans-serif;
    font-size:7.5pt;
    color:#9999bb;
    letter-spacing:.04em;
  }
  @bottom-right{
    content:counter(page)" / "counter(pages);
    font-family:'Inter',sans-serif;
    font-size:7.5pt;
    color:#9999bb;
  }
}
@page:first{
  @bottom-left{content:none}
  @bottom-right{content:none}
}

/* ── Base ────────────────────────────────────────────────────────────────── */
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{
  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  font-size:10.5pt;line-height:1.75;color:#1e1e2e;background:#fff;
}

/* ── Cover ───────────────────────────────────────────────────────────────── */
.cover{
  height:297mm;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  background:linear-gradient(150deg,#0f0e1a 0%,#1d1850 50%,#0f0e1a 100%);
  color:#fff;page-break-after:always;padding:64px 56px;
  text-align:center;position:relative;overflow:hidden;
}
.cover::before{
  content:'';position:absolute;top:-100px;right:-60px;
  width:420px;height:420px;
  background:radial-gradient(circle,rgba(94,78,255,.28) 0%,transparent 68%);
  pointer-events:none;
}
.cover::after{
  content:'';position:absolute;bottom:0;left:0;right:0;
  height:2px;background:linear-gradient(90deg,transparent,#5e4eff 30%,#00b4ff 70%,transparent);
}
.cover-brand{
  display:flex;align-items:center;gap:14px;
  margin-bottom:60px;
}
.cover-brand svg{width:38px;height:38px}
.cover-brand-name{
  font-size:14pt;font-weight:600;letter-spacing:.08em;
  color:rgba(255,255,255,.75);text-transform:uppercase;
}
.cover-title{
  font-size:28pt;font-weight:700;line-height:1.2;
  margin-bottom:22px;max-width:540px;color:#fff;
  letter-spacing:-.01em;
}
.cover-divider{
  width:40px;height:2px;
  background:linear-gradient(90deg,#5e4eff,#00b4ff);
  border-radius:2px;margin:0 auto 22px;
}
.cover-subtitle{
  font-size:11pt;font-weight:400;
  color:rgba(255,255,255,.55);max-width:460px;
  line-height:1.7;margin-bottom:52px;
}
.cover-meta{
  font-size:8.5pt;color:rgba(255,255,255,.3);
  letter-spacing:.05em;text-transform:uppercase;
}

/* ── Content wrapper ─────────────────────────────────────────────────────── */
.content{max-width:172mm;margin:0 auto;padding:0}

/* ── Headings ────────────────────────────────────────────────────────────── */
h1{
  font-size:20pt;font-weight:700;color:#0f0f1a;letter-spacing:-.02em;
  margin:32px 0 14px;line-height:1.2;page-break-after:avoid;
}
h2{
  font-size:15pt;font-weight:600;color:#12122a;letter-spacing:-.01em;
  margin:30px 0 12px;padding-bottom:8px;
  border-bottom:2px solid #5e4eff;line-height:1.3;
  page-break-after:avoid;
}
h3{
  font-size:12.5pt;font-weight:600;color:#24243e;
  margin:22px 0 8px;line-height:1.3;page-break-after:avoid;
}
h4{
  font-size:11pt;font-weight:600;color:#34344e;
  margin:16px 0 6px;page-break-after:avoid;
}
h5{
  font-size:10.5pt;font-weight:600;color:#44446a;
  margin:12px 0 4px;page-break-after:avoid;
}

/* ── Body text ───────────────────────────────────────────────────────────── */
p{margin:8px 0;color:#2a2a3e;line-height:1.75;orphans:3;widows:3}

/* ── Lists ───────────────────────────────────────────────────────────────── */
ul,ol{margin:10px 0 10px 0;padding-left:24px}
li{margin:5px 0;color:#2a2a3e;line-height:1.68;padding-left:2px}
ul li::marker{color:#5e4eff;font-size:.9em}
ol li::marker{font-weight:600;color:#5e4eff}
li ul,li ol{margin-top:4px;margin-bottom:4px;padding-left:20px}
li ul li::marker{color:#8878ff}
li ol li::marker{color:#8878ff}

/* ── Blockquote ──────────────────────────────────────────────────────────── */
blockquote{
  margin:14px 0;padding:12px 18px;
  border-left:3px solid #5e4eff;
  background:#f6f5ff;color:#44446a;
  border-radius:0 6px 6px 0;
  page-break-inside:avoid;
}
blockquote p{margin:4px 0;color:inherit;font-size:.97em}

/* ── Inline code ─────────────────────────────────────────────────────────── */
code{
  font-family:'JetBrains Mono','Fira Code','Cascadia Code','Consolas','Courier New',monospace;
  font-size:9pt;background:#eeecff;color:#4835b5;
  padding:1px 5px;border-radius:3px;
  border:1px solid rgba(94,78,255,.15);
}

/* ── Code block ──────────────────────────────────────────────────────────── */
.code-wrapper{
  position:relative;margin:16px 0;
  border-radius:8px;overflow:hidden;
  page-break-inside:avoid;
  border:1px solid #1a1a2e;
}
.code-lang{
  display:block;background:#1a1a2e;
  padding:6px 16px;
  font-family:'JetBrains Mono',monospace;
  font-size:7.5pt;color:rgba(255,255,255,.38);
  letter-spacing:.07em;text-transform:uppercase;
}
.code-wrapper pre{
  margin:0;padding:14px 16px;background:#13111f;
  overflow-x:hidden;
}
.code-wrapper pre code{
  font-family:'JetBrains Mono','Fira Code','Cascadia Code','Consolas','Courier New',monospace;
  font-size:8.5pt;background:transparent;color:#cdd6f4;
  padding:0;border-radius:0;line-height:1.65;border:none;
  white-space:pre-wrap;word-break:break-all;
}

/* ── Tables ──────────────────────────────────────────────────────────────── */
.table-wrap{
  margin:16px 0;overflow:hidden;border-radius:8px;
  border:1px solid #e2e2f0;page-break-inside:avoid;
}
table{
  width:100%;border-collapse:collapse;font-size:10pt;
}
th{
  background:#5e4eff;color:#fff;
  padding:9px 14px;text-align:left;
  font-weight:600;font-size:9.5pt;
  letter-spacing:.01em;
}
td{
  padding:8px 14px;border-bottom:1px solid #eaeaf4;
  color:#2a2a3e;
}
tr:last-child td{border-bottom:none}
tr:nth-child(even) td{background:#f8f8ff}

/* ── HR ──────────────────────────────────────────────────────────────────── */
hr{border:none;border-top:1px solid #e2e2f0;margin:24px 0}

/* ── Inline formatting ───────────────────────────────────────────────────── */
strong{font-weight:600;color:#0f0f1a}
em{font-style:italic;color:#3c3c58}
del{text-decoration:line-through;color:#888899;opacity:.8}
sup{font-size:.78em;color:#5e4eff;vertical-align:super}

/* ── MCQ styles ──────────────────────────────────────────────────────────── */
.mcq-question{
  font-weight:600;color:#0f0f1a;font-size:11pt;
  margin:20px 0 8px;page-break-after:avoid;
}
.mcq-option{
  margin:3px 0 3px 20px;color:#34344e;font-size:10.5pt;
}
.mcq-answer{
  display:inline-block;margin:8px 0 4px;
  background:#dcfce7;color:#166534;
  padding:4px 14px;border-radius:5px;
  font-weight:600;font-size:9.5pt;letter-spacing:.01em;
}
.mcq-explanation{
  margin:3px 0 16px;color:#55556e;
  font-size:9.5pt;font-style:italic;line-height:1.6;
}

/* ── Screen: toolbar ─────────────────────────────────────────────────────── */
.toolbar{
  position:fixed;top:0;left:0;right:0;height:52px;
  background:#0f0e1a;display:flex;align-items:center;
  justify-content:space-between;padding:0 24px;
  z-index:9999;box-shadow:0 2px 16px rgba(0,0,0,.5);
  border-bottom:1px solid rgba(94,78,255,.3);
}
.toolbar-brand{
  color:rgba(255,255,255,.8);font-size:14px;
  font-weight:600;display:flex;align-items:center;gap:10px;
  letter-spacing:.01em;
}
.toolbar-actions{display:flex;gap:10px}
.btn-save{
  background:linear-gradient(135deg,#5e4eff,#4a3fd4);
  color:#fff;border:none;
  padding:8px 22px;border-radius:6px;font-size:13px;
  font-weight:500;cursor:pointer;font-family:inherit;
  transition:opacity .15s;letter-spacing:.01em;
}
.btn-save:hover{opacity:.88}
.btn-close{
  background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);
  border:1px solid rgba(255,255,255,.15);
  padding:8px 16px;border-radius:6px;font-size:13px;
  cursor:pointer;font-family:inherit;transition:background .15s;
}
.btn-close:hover{background:rgba(255,255,255,.12)}

/* ── Screen: add top padding for toolbar ────────────────────────────────── */
@media screen{
  body{padding-top:52px}
  .content{padding:28px 36px;max-width:880px}
  .table-wrap{overflow-x:auto}
}

/* ── Print ───────────────────────────────────────────────────────────────── */
@media print{
  .toolbar{display:none!important}
  body{padding-top:0}
  .content{padding:0;max-width:100%}
  h1,h2,h3,h4,h5{page-break-after:avoid}
  li,tr,blockquote,.code-wrapper,.mcq-question{page-break-inside:avoid}
  .code-wrapper pre{white-space:pre-wrap;word-break:break-all}
  a{color:inherit;text-decoration:none}
  p{orphans:3;widows:3}
  .table-wrap{page-break-inside:avoid}
}
</style>
</head>
<body>

<!-- Print toolbar (hidden in PDF) -->
<div class="toolbar">
  <div class="toolbar-brand">
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5e4eff"/>
          <stop offset="100%" stop-color="#00b4ff"/>
        </linearGradient>
      </defs>
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

<!-- Cover page -->
<div class="cover">
  <div class="cover-brand">
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5e4eff"/>
          <stop offset="100%" stop-color="#00b4ff"/>
        </linearGradient>
      </defs>
      <polygon points="30,20 70,20 85,35 45,35" fill="url(#cg)" opacity=".9"/>
      <polygon points="70,20 85,35 85,75 70,60" fill="#4a3fd9" opacity=".8"/>
      <polygon points="30,20 45,35 45,75 30,60" fill="#6e5dff" opacity=".7"/>
      <polygon points="45,35 85,35 85,75 45,75" fill="url(#cg)" opacity=".6"/>
      <polygon points="30,60 45,75 85,75 70,60" fill="#3a2fcf" opacity=".85"/>
    </svg>
    <span class="cover-brand-name">QuickNotes</span>
  </div>
  <h1 class="cover-title">${safeTitle}</h1>
  <div class="cover-divider"></div>
  <p class="cover-subtitle">${safeIntro}</p>
  <p class="cover-meta">Generated ${dateStr} &nbsp;·&nbsp; AI Study Assistant</p>
</div>

<!-- Document content -->
<div class="content">
${bodyHtml}
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

/**
 * Generates a print-ready HTML string from markdown content.
 * The caller is responsible for serving this as text/html.
 */
export function generatePrintableHTML(markdown: string, title: string): string {
  const bodyHtml = markdownToHtml(markdown);
  const intro    = extractIntro(markdown);
  return buildHtml(title, intro, bodyHtml);
}

/**
 * ProfessionalPdfGenerator — maintained for backward-compatibility.
 * generate() now returns the HTML as a UTF-8-encoded ArrayBuffer
 * instead of a jsPDF binary. The API route must serve it as text/html.
 */
export class ProfessionalPdfGenerator {
  constructor(_options: Partial<ProPDFOptions> = {}) {}

  public generate(options: ProPDFOptions): ArrayBuffer {
    const html = generatePrintableHTML(options.content, options.title || 'Study Notes');
    return new TextEncoder().encode(html).buffer;
  }

  public generateBlob(options: ProPDFOptions): Blob {
    const html = generatePrintableHTML(options.content, options.title || 'Study Notes');
    return new Blob([html], { type: 'text/html; charset=utf-8' });
  }
}

export async function imageToBase64(_imagePath: string): Promise<string> {
  return '';
}
