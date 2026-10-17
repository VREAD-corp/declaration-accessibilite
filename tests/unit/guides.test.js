// Guide pages (2026-10-17): C1 modèle, C2 Muster (DE), C3 boutique, C4 prix.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PAGES } from '../../src/content/pages.js';
import { layout } from '../../src/content/layout.js';

const GUIDES = ['/modele-declaration-accessibilite/', '/obligations-boutique-en-ligne/', '/prix-audit-accessibilite/', '/de/muster-barrierefreiheitserklaerung/'];
const find = (path) => PAGES.find((p) => p.path === path);
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1])['@graph']);

test('the four guide pages exist, are indexable, in the sitemap set, with a canonical and no hreflang', () => {
  for (const path of GUIDES) {
    const page = find(path);
    assert.ok(page, path);
    assert.ok(!page.noindex && !page.file, `${path} indexable`);
    assert.equal(page.updated, '2026-10-17');
    assert.ok(page.title.length <= 60, `${path} title ${page.title.length}`);
    assert.ok(page.description.length <= 155, `${path} description ${page.description.length}`);
    const html = layout(page);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://accessibilite\\.jalonel\\.com${path}">`));
    assert.doesNotMatch(html, /hreflang="(fr|de|en|x-default)" href/, `${path}: different legal regimes, no hreflang`);
    assert.equal((html.match(/<h1>/g) || []).length, 1, `${path}: one h1`);
  }
});

test('one primary call to action per guide page, cro.js and mesure.js present', () => {
  for (const path of GUIDES) {
    const html = layout(find(path));
    const primary = [...html.matchAll(/class="btn(?! secondary)[^"]*"/g)];
    assert.equal(primary.length, 1, `${path}: ${primary.length} primary buttons`);
    assert.match(html, /<script src="\/cro\.js" data-site="declaration-accessibilite"/);
    assert.match(html, /<script src="\/mesure\.js" defer>/);
  }
});

test('Article + BreadcrumbList (+ FAQPage) JSON-LD, dated, by the Jalonel organisation', () => {
  for (const path of GUIDES) {
    const nodes = jsonLd(layout(find(path)));
    const article = nodes.find((n) => n['@type'] === 'Article');
    assert.ok(article, path);
    assert.equal(article.datePublished, '2026-10-17');
    assert.equal(article.author['@id'], 'https://jalonel.com/#org');
    assert.ok(nodes.find((n) => n['@type'] === 'BreadcrumbList'), `${path} breadcrumb`);
    const faq = nodes.find((n) => n['@type'] === 'FAQPage');
    assert.ok(faq && faq.mainEntity.length >= 4, `${path} FAQPage`);
    assert.ok(!nodes.some((n) => /Review|AggregateRating/.test(n['@type'])), 'no reviews');
  }
});

test('C1 shows the official model in full and a filled example with the forced « non conforme » status', () => {
  const t = text(layout(find(GUIDES[0])));
  for (const s of ['adopte obligatoirement ce format', '[totalement / partiellement / non] conforme', 'Libre réponse 71120', 'Maison Exemple SAS', 'la boutique en ligne Maison Exemple est non conforme', 'Aucun audit de conformité en cours de validité']) assert.ok(t.includes(s), s);
});

test('C2 (DE) is free information, names the MLBF and says the paid audit is for companies registered in France only', () => {
  const t = text(layout(find(GUIDES[3])));
  assert.match(t, /ausschließlich an Unternehmen mit Sitz in Frankreich \(SIREN-Nummer\)/);
  assert.match(t, /Carl-Miller-Straße 6, 39112 Magdeburg/);
  assert.match(t, /Beispiel Handels GmbH/);
  assert.doesNotMatch(layout(find(GUIDES[3])), /href="\/commander\.html"/, 'no order link on the DE page');
});

test('C4 quotes no market price: the only amounts are 0 €, our 149 € and the sourced thresholds (2 M€, 250 M€)', () => {
  const t = text(layout(find(GUIDES[2]))).replace(/ /g, ' ');
  const amounts = [...t.matchAll(/(\d[\d ,.]*)\s?(?:€|M€)/g)].map((m) => m[1].trim().replace(/[ ,.]00$/, ''));
  for (const amt of amounts) assert.ok(['0', '149', '2', '250'].includes(amt), `unexpected amount ${amt} €`);
  assert.match(t, /Sur devis/);
  assert.match(t, /plusieurs jours de travail/);
});
