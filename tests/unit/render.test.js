import { test } from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import { toHtml, toHtmlFragment, toMarkdown, toDocx, safeHref } from '../../src/lib/render.js';
import { crc32 } from '../../src/lib/zip.js';

const doc = {
  title: 'Déclaration <test>',
  lang: 'fr',
  blocks: [
    { t: 'h1', text: 'Titre & <script>' },
    { t: 'p', runs: ['Bonjour ', { text: 'lien', href: 'https://exemple.fr/?a=1&b=2' }, ' et ', { text: 'gras', b: true }] },
    { t: 'note', runs: 'Remarque' },
    { t: 'ul', items: ['un', 'deux *étoile*'] },
    { t: 'ol', items: ['premier', 'second'] },
    { t: 'table', head: ['A', 'B'], rows: [['1', 'x|y']] },
    { t: 'p', runs: [{ text: 'mal', href: 'javascript:alert(1)' }] },
  ],
};

test('crc32 matches known value', () => {
  assert.equal(crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
});

test('safeHref only allows http(s), mailto, tel and bare emails', () => {
  assert.equal(safeHref('javascript:alert(1)'), '');
  assert.equal(safeHref('a@b.fr'), 'mailto:a@b.fr');
  assert.equal(safeHref('www.x.fr'), 'https://www.x.fr');
  assert.equal(safeHref('https://x.fr'), 'https://x.fr');
});

test('HTML escapes content and drops unsafe links', () => {
  const html = toHtml(doc);
  assert.match(html, /<html lang="fr">/);
  assert.match(html, /<title>Déclaration &lt;test&gt;<\/title>/);
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('javascript:'));
  assert.match(html, /href="https:\/\/exemple.fr\/\?a=1&amp;b=2"/);
  assert.match(html, /<th scope="col">A<\/th>/);
  const frag = toHtmlFragment(doc);
  assert.ok(frag.startsWith('<h1>'));
});

test('Markdown escapes special characters', () => {
  const md = toMarkdown(doc);
  assert.match(md, /^# Titre & \\<script\\>/);
  assert.match(md, /- deux \\\*étoile\\\*/);
  assert.match(md, /2\. second/);
  assert.match(md, /\| 1 \| x\\\|y \|/);
  assert.match(md, /\[lien\]\(<https:\/\/exemple.fr\/\?a=1&b=2>\)/);
});

test('DOCX is a valid zip with the expected parts and escaped XML', async () => {
  const bytes = toDocx(doc);
  const z = await JSZip.loadAsync(bytes, { checkCRC32: true });
  for (const p of ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/styles.xml', 'word/numbering.xml', 'word/_rels/document.xml.rels', 'docProps/core.xml'])
    assert.ok(z.file(p), p);
  const xml = await z.file('word/document.xml').async('string');
  assert.match(xml, /Titre &amp; &lt;script&gt;/);
  assert.match(xml, /<w:pStyle w:val="Title"\/>/);
  assert.match(xml, /<w:tblHeader\/>/);
  const rels = await z.file('word/_rels/document.xml.rels').async('string');
  assert.match(rels, /TargetMode="External"/);
  assert.ok(!rels.includes('javascript'));
  const styles = await z.file('word/styles.xml').async('string');
  assert.match(styles, /w:lang w:val="fr-FR"/);
});
