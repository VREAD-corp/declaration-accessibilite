// Document model -> HTML / Markdown / DOCX. Pure functions, no DOM needed.
//
// A document is { title, lang, blocks } where blocks are:
//   { t: 'h1'|'h2'|'h3', text }
//   { t: 'p', runs }            runs: string | Run | Run[]
//   { t: 'note', runs }         informative note (rendered in italics)
//   { t: 'ul'|'ol', items }     items: runs[]
//   { t: 'table', head, rows }  head: string[], rows: (runs)[][]
// Run = string | { text, href?, b?, i? }

import { zip } from './zip.js';

export function toRuns(r) {
  if (r == null) return [];
  if (Array.isArray(r)) return r.flatMap((x) => toRuns(x));
  if (typeof r === 'string') return r === '' ? [] : [{ text: r }];
  return [r];
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeHref(href) {
  const h = String(href || '').trim();
  if (/^(https?:|mailto:|tel:)/i.test(h)) return h;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(h)) return 'mailto:' + h;
  if (/^www\./i.test(h)) return 'https://' + h;
  return '';
}

function runsHtml(runs) {
  return toRuns(runs)
    .map((r) => {
      let s = escapeHtml(r.text);
      if (r.b) s = `<strong>${s}</strong>`;
      if (r.i) s = `<em>${s}</em>`;
      const href = r.href && safeHref(r.href);
      if (href) s = `<a href="${escapeHtml(href)}">${s}</a>`;
      return s;
    })
    .join('');
}

/** Body HTML fragment (no <html> wrapper). `shift` demotes headings (for embedding in a page). */
export function toHtmlFragment(doc, { shift = 0 } = {}) {
  const out = [];
  for (const b of doc.blocks) {
    switch (b.t) {
      case 'h1':
      case 'h2':
      case 'h3': {
        const tag = `h${Math.min(6, Number(b.t[1]) + shift)}`;
        out.push(`<${tag}>${escapeHtml(b.text)}</${tag}>`);
        break;
      }
      case 'p':
        out.push(`<p>${runsHtml(b.runs)}</p>`);
        break;
      case 'note':
        out.push(`<p class="note"><em>${runsHtml(b.runs)}</em></p>`);
        break;
      case 'ul':
      case 'ol':
        out.push(`<${b.t}>${b.items.map((it) => `<li>${runsHtml(it)}</li>`).join('')}</${b.t}>`);
        break;
      case 'table':
        out.push(
          `<table><thead><tr>${b.head.map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${b.rows
            .map((row) => `<tr>${row.map((c) => `<td>${runsHtml(c)}</td>`).join('')}</tr>`)
            .join('')}</tbody></table>`
        );
        break;
      default:
        throw new Error('Unknown block ' + b.t);
    }
  }
  return out.join('\n');
}

/** Standalone, accessible HTML page. */
export function toHtml(doc) {
  return `<!doctype html>
<html lang="${escapeHtml(doc.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(doc.title)}</title>
<style>
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.6;max-width:46rem;margin:0 auto;padding:1.5rem 1rem;color:#1a1a1a;background:#fff}
h1{font-size:1.9rem;line-height:1.2}h2{margin-top:2rem}a{color:#0b5394}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #767676;padding:.4rem;text-align:left;vertical-align:top}
.note{color:#3d3d3d}
</style>
</head>
<body>
<main>
${toHtmlFragment(doc)}
</main>
</body>
</html>
`;
}

function mdEscape(s) {
  return String(s).replace(/([\\`*_[\]<>|])/g, '\\$1');
}

function runsMd(runs) {
  return toRuns(runs)
    .map((r) => {
      let s = mdEscape(r.text);
      if (r.b) s = `**${s}**`;
      if (r.i) s = `*${s}*`;
      const href = r.href && safeHref(r.href);
      if (href) s = `[${s}](<${href}>)`;
      return s;
    })
    .join('');
}

export function toMarkdown(doc) {
  const out = [];
  for (const b of doc.blocks) {
    switch (b.t) {
      case 'h1':
        out.push(`# ${mdEscape(b.text)}`);
        break;
      case 'h2':
        out.push(`## ${mdEscape(b.text)}`);
        break;
      case 'h3':
        out.push(`### ${mdEscape(b.text)}`);
        break;
      case 'p':
        out.push(runsMd(b.runs));
        break;
      case 'note':
        out.push(`> ${runsMd(b.runs)}`);
        break;
      case 'ul':
        out.push(b.items.map((it) => `- ${runsMd(it)}`).join('\n'));
        break;
      case 'ol':
        out.push(b.items.map((it, i) => `${i + 1}. ${runsMd(it)}`).join('\n'));
        break;
      case 'table':
        out.push(
          [
            `| ${b.head.map(mdEscape).join(' | ')} |`,
            `| ${b.head.map(() => '---').join(' | ')} |`,
            ...b.rows.map((row) => `| ${row.map((c) => runsMd(c).replace(/\n/g, ' ')).join(' | ')} |`),
          ].join('\n')
        );
        break;
      default:
        throw new Error('Unknown block ' + b.t);
    }
  }
  return out.join('\n\n') + '\n';
}

// ---------- DOCX ----------

function x(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    // strip characters not allowed in XML 1.0
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '');
}

const LANG_TAG = { fr: 'fr-FR', de: 'de-DE', en: 'en-GB' };

export function toDocx(doc) {
  const rels = [];
  const nums = []; // {abstractId}
  let relSeq = 10;

  const runXml = (r) => {
    const props = `${r.b ? '<w:b/>' : ''}${r.i ? '<w:i/>' : ''}`;
    const t = `<w:r>${props || r.href ? `<w:rPr>${r.href && safeHref(r.href) ? '<w:rStyle w:val="Hyperlink"/>' : ''}${props}</w:rPr>` : ''}<w:t xml:space="preserve">${x(r.text)}</w:t></w:r>`;
    const href = r.href && safeHref(r.href);
    if (href) {
      const id = `rId${relSeq++}`;
      rels.push(`<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${x(href)}" TargetMode="External"/>`);
      return `<w:hyperlink r:id="${id}">${t}</w:hyperlink>`;
    }
    return t;
  };
  const runsXml = (runs) => toRuns(runs).map(runXml).join('');
  const para = (runs, style, extra = '') =>
    `<w:p><w:pPr>${style ? `<w:pStyle w:val="${style}"/>` : ''}${extra}</w:pPr>${runsXml(runs)}</w:p>`;

  const body = [];
  for (const b of doc.blocks) {
    switch (b.t) {
      case 'h1':
        body.push(para(b.text, 'Title'));
        break;
      case 'h2':
        body.push(para(b.text, 'Heading1'));
        break;
      case 'h3':
        body.push(para(b.text, 'Heading2'));
        break;
      case 'p':
        body.push(para(b.runs));
        break;
      case 'note':
        body.push(para(toRuns(b.runs).map((r) => ({ ...r, i: true }))));
        break;
      case 'ul':
      case 'ol': {
        const numId = nums.length + 1;
        nums.push(b.t === 'ul' ? 1 : 2);
        for (const it of b.items) body.push(para(it, 'ListParagraph', `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${numId}"/></w:numPr>`));
        break;
      }
      case 'table': {
        const cell = (runs, header) =>
          `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/></w:tcPr>${para(header ? toRuns(runs).map((r) => ({ ...r, b: true })) : runs)}</w:tc>`;
        body.push(
          `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="5000" w:type="pct"/><w:tblLook w:val="0420" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>` +
            `<w:tr><w:trPr><w:tblHeader/></w:trPr>${b.head.map((h) => cell(h, true)).join('')}</w:tr>` +
            b.rows.map((row) => `<w:tr>${row.map((c) => cell(c, false)).join('')}</w:tr>`).join('') +
            `</w:tbl>`
        );
        body.push('<w:p/>');
        break;
      }
      default:
        throw new Error('Unknown block ' + b.t);
    }
  }

  const lang = LANG_TAG[doc.lang] || doc.lang;
  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document ${W}><w:body>${body.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1418" w:right="1418" w:bottom="1418" w:left="1418" w:header="709" w:footer="709" w:gutter="0"/></w:sectPr></w:body></w:document>`;

  const heading = (id, name, size, outline) =>
    `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="320" w:after="120"/>${outline != null ? `<w:outlineLvl w:val="${outline}"/>` : ''}</w:pPr><w:rPr><w:b/><w:color w:val="1F3864"/><w:sz w:val="${size}"/></w:rPr></w:style>`;
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles ${W}>
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:lang w:val="${lang}"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
${heading('Title', 'Title', 40, 0)}
${heading('Heading1', 'heading 1', 30, 1)}
${heading('Heading2', 'heading 2', 26, 2)}
<w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="720"/><w:spacing w:after="60"/></w:pPr></w:style>
<w:style w:type="character" w:styleId="Hyperlink"><w:name w:val="Hyperlink"/><w:rPr><w:color w:val="0B5394"/><w:u w:val="single"/></w:rPr></w:style>
<w:style w:type="table" w:styleId="TableGrid"><w:name w:val="Table Grid"/><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="767676"/><w:left w:val="single" w:sz="4" w:space="0" w:color="767676"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="767676"/><w:right w:val="single" w:sz="4" w:space="0" w:color="767676"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="767676"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="767676"/></w:tblBorders><w:tblCellMar><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>`;

  const lvl = (fmt, text) =>
    `<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/><w:lvlText w:val="${text}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr>${fmt === 'bullet' ? '<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/></w:rPr>' : ''}</w:lvl>`;
  const numberingXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering ${W}>
<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/>${lvl('bullet', '')}</w:abstractNum>
<w:abstractNum w:abstractNumId="2"><w:multiLevelType w:val="singleLevel"/>${lvl('decimal', '%1.')}</w:abstractNum>
${nums.map((a, i) => `<w:num w:numId="${i + 1}"><w:abstractNumId w:val="${a}"/>${a === 2 ? '<w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride>' : ''}</w:num>`).join('')}
</w:numbering>`;

  const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
${rels.join('\n')}
</Relationships>`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
</Types>`;

  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
</Relationships>`;

  const core = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>${x(doc.title)}</dc:title><dc:language>${x(lang)}</dc:language>
</cp:coreProperties>`;

  return zip([
    { name: '[Content_Types].xml', data: contentTypes },
    { name: '_rels/.rels', data: rootRels },
    { name: 'docProps/core.xml', data: core },
    { name: 'word/document.xml', data: documentXml },
    { name: 'word/styles.xml', data: stylesXml },
    { name: 'word/numbering.xml', data: numberingXml },
    { name: 'word/_rels/document.xml.rels', data: docRels },
  ]);
}
