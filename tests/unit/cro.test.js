// cro.js (aggregate behaviour counters + A/B framework, VREAD-corp/octave-checkout gas/web/cro.js):
// the vendored portable check passes on our copy, the build ships it, and every page loads it before mesure.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { PAGES } from '../../src/content/pages.js';
import { layout } from '../../src/content/layout.js';
import { CRO } from '../../src/content/site.js';

const ROOT = resolve(import.meta.dirname, '..', '..');

test('cro.check.mjs (vendored byte-identical) passes on src/mesure/cro.js', () => {
  const out = execFileSync(process.execPath, [join(ROOT, 'tests/cro/cro.check.mjs'), join(ROOT, 'src/mesure/cro.js')], { encoding: 'utf8' });
  assert.match(out, /cro\.js: ok/);
});

test('the build copies cro.js to the site root and tags the sample reports', () => {
  const build = readFileSync(join(ROOT, 'scripts/build.mjs'), 'utf8');
  assert.match(build, /copy\('src\/mesure\/cro\.js', 'cro\.js'\)/);
  assert.match(build, /\$\{croTag\(\)\}\\n<\/body>/);
});

test('every page loads cro.js (site id, France backend, live host, primary-CTA selector), before mesure.js, no A/B test', () => {
  assert.equal(CRO.api, readFileSync(join(ROOT, 'src/mesure/mesure.js'), 'utf8').match(/fetch\('([^?']+)\?action=track'/)[1], 'same backend as mesure.js');
  assert.ok(PAGES.length >= 18);
  for (const page of PAGES) {
    const html = layout(page);
    const tag = html.match(/<script src="\/declaration-accessibilite\/cro\.js" ([^>]*)><\/script>/);
    assert.ok(tag, `${page.id}/${page.lang}: no cro.js tag`);
    assert.match(tag[1], /data-site="declaration-accessibilite"/);
    assert.match(tag[1], /data-api="https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec"/);
    assert.match(tag[1], /data-hosts="outils\.vread\.fr"/);
    assert.match(tag[1], /data-cta="\[data-cta\],\.btn:not\(\.secondary\)"/);
    assert.doesNotMatch(tag[1], /type="module"/);
    assert.ok(html.indexOf('/cro.js"') < html.indexOf('/mesure.js"'), `${page.id}: cro.js after mesure.js`);
    assert.doesNotMatch(html, /OCTAVE_XP/, 'no experiment configured on this site');
  }
});

test('main sections, FAQ items and forms are measurable', () => {
  const html = (id, lang = 'fr') => layout(PAGES.find((p) => p.id === id && p.lang === lang));
  const home = html('home');
  for (const s of ['hero', 'generateur', 'apercu', 'modeles', 'suite']) assert.match(home, new RegExp(`<section[^>]* data-section="${s}"`), s);
  assert.match(home, /<form id="gen-form"/);
  assert.match(html('check'), /<form id="minicheck"/);
  const audit = html('audit');
  for (const s of ['hero', 'faq', 'fondateurs']) assert.match(audit, new RegExp(`data-section="${s}"`), s);
  if (/id="offre"/.test(audit)) assert.match(audit, /<details id="faq-1">/);
  assert.match(home, /<details class="menu" data-faq="menu">/);
});
