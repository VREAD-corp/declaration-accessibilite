// Sales gate (SALES_OPEN) of the paid « audit automatisé partiel » and its B2B order page.
//  - SALES_OPEN=false: no order page, no Stripe.js, no checkout script, the audit page says « bientôt ».
//  - SALES_OPEN=true (test build: fake endpoint, pk_test_): order page with the audit fields, CSP, B2B terms
//    (cgv-pro.html), order page; a browser run with a stubbed Stripe.js and endpoint checks the form.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const repoConfig = JSON.parse(readFileSync(join(ROOT, 'sales.config.json'), 'utf8'));
const tmp = mkdtempSync(join(tmpdir(), 'a11y-sales-gate-'));
const BUY_MARKERS = [/js\.stripe\.com/, /commander\.html/, /commande\.html/, /checkout-config/, /octave-pay/, /pk_(live|test)_/, /script\.google\.com/];

function build(config, env = {}) {
  const cfg = join(tmp, `cfg-${Math.random().toString(36).slice(2)}.json`);
  writeFileSync(cfg, JSON.stringify(config));
  const out = join(tmp, `out-${Math.random().toString(36).slice(2)}`);
  // build.mjs always writes dist/: build in place, then copy the result aside.
  execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: ROOT, env: { ...process.env, SALES_CONFIG: cfg, ...env }, stdio: 'pipe' });
  execFileSync('cp', ['-r', join(ROOT, 'dist'), out]);
  return out;
}
const files = (dir) => readdirSync(dir, { recursive: true }).map(String).filter((f) => statSync(join(dir, f)).isFile());
const text = (html) => html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;| | /g, ' ').replace(/\s+/g, ' ');
const OPEN_CFG = { ...repoConfig, SALES_OPEN: true, endpoint: 'https://octave-test.invalid/exec', publishableKey: 'pk_test_fakeForGateTest123' };

let closedDir, openDir;
before(() => {
  closedDir = build({ ...repoConfig, SALES_OPEN: false });
  openDir = build(OPEN_CFG, { SALES_ALLOW_TEST: '1' });
  execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: ROOT, stdio: 'pipe' }); // leave dist/ as committed config
});

test('committed config is coherent: product a11y-audit-20, 149 € net (293 B), closed or open with the Apps Script URL and a LIVE key', () => {
  assert.equal(repoConfig.product, 'a11y-audit-20');
  assert.equal(repoConfig.amount, 14900);
  assert.equal(repoConfig.VAT, 'franchise293B');
  if (!repoConfig.SALES_OPEN) return;
  assert.match(repoConfig.endpoint, /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]{20,}\/exec$/);
  assert.match(repoConfig.publishableKey, /^pk_live_[A-Za-z0-9]+$/);
});

test('SALES_OPEN=false: no buy UI anywhere, audit page still « bientôt »', () => {
  for (const f of ['commander.html', 'commande.html', 'cgv-pro.html', 'assets/checkout/pay.js', 'assets/checkout/checkout-config.js']) assert.ok(!existsSync(join(closedDir, f)), `${f} must not exist`);
  for (const f of files(closedDir).filter((x) => /\.(html|js|xml|txt)$/.test(x) && !x.startsWith('assets/vendor/'))) {
    const body = readFileSync(join(closedDir, f), 'utf8');
    for (const re of BUY_MARKERS) assert.doesNotMatch(body, re, `${f} contains ${re}`);
  }
  assert.match(readFileSync(join(closedDir, 'audit/index.html'), 'utf8'), /Bientôt – aucune commande possible/);
});

test('config validation: SALES_OPEN=true needs the Apps Script URL and a LIVE publishable key', () => {
  assert.throws(() => build({ ...repoConfig, SALES_OPEN: true, endpoint: 'https://evil.example/exec', publishableKey: 'pk_live_abc' }));
  assert.throws(() => build({ ...repoConfig, SALES_OPEN: true, endpoint: 'https://script.google.com/macros/s/AKfycbTESTTESTTESTTESTTEST/exec', publishableKey: 'pk_test_abc' }));
});

test('SALES_OPEN=true: offer page, order page (audit fields, attestation, CSP), order return page, not in the sitemap', () => {
  const audit = text(readFileSync(join(openDir, 'audit/index.html'), 'utf8'));
  assert.match(audit, /Audit automatisé partiel d’accessibilité : 149,00 € net/);
  assert.match(audit, /jusqu’à 20 pages/);
  assert.match(audit, /sous 24 h ouvrées/);
  assert.match(audit, /Ce n’est pas un audit de conformité RGAA/);
  assert.match(audit, /Aucun taux de conformité/);
  assert.doesNotMatch(audit, /bientôt|\bHT\b|TTC/i);
  const order = readFileSync(join(openDir, 'commander.html'), 'utf8');
  assert.match(order, /<meta name="robots" content="noindex">/);
  assert.match(order, /<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https:\/\/js\.stripe\.com/);
  assert.match(order, /connect-src 'self' https:\/\/script\.google\.com https:\/\/script\.googleusercontent\.com https:\/\/octave-test\.invalid/);
  for (const n of ['email', 'company', 'siren', 'addressLine1', 'postalCode', 'city', 'terms', 'siteUrl', 'scanAuthorized']) assert.match(order, new RegExp(`name="${n}"[^>]*required|required[^>]*name="${n}"`), n);
  assert.match(order, /name="pages" data-octave-extra data-max="20"/);
  assert.match(order, /name="scanAuthorized" data-octave-extra="bool" required/);
  assert.match(order, /name="reportLang" data-octave-extra/);
  assert.match(text(order), /pas un audit de conformité RGAA/);
  assert.match(text(order), /149,00 € net \(TVA non applicable, art\. 293 B du CGI\)/);
  assert.match(order, /href="\/declaration-accessibilite\/cgv-pro\.html"/);
  assert.match(text(order), /Les données de commande sont transmises à Stripe/);
  assert.doesNotMatch(text(readFileSync(join(openDir, 'audit/index.html'), 'utf8')), /aucune donnée envoyée/);
  const ret = readFileSync(join(openDir, 'commande.html'), 'utf8');
  assert.match(ret, /id="order-status"/);
  assert.match(ret, /connect-src 'self' https:\/\/script\.google\.com/);
  assert.doesNotMatch(ret, /js\.stripe\.com/);
  for (const f of ['pay.js', 'order.js']) assert.equal(readFileSync(join(openDir, 'assets/checkout', f), 'utf8'), readFileSync(join(ROOT, 'src/checkout', f), 'utf8'));
  const cfg = readFileSync(join(openDir, 'assets/checkout/checkout-config.js'), 'utf8');
  assert.match(cfg, /"product":"a11y-audit-20"/);
  assert.match(cfg, /"orderPage":"commande\.html"/);
  assert.doesNotMatch(readFileSync(join(openDir, 'sitemap.xml'), 'utf8'), /commande|commander|cgv-pro/);
});

const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
  const d = JSON.parse(m[1]);
  return d['@graph'] ?? [d];
});
const ORG_ID = 'https://outils.vread.fr/#org';

test('SALES_OPEN=true: audit pages carry parseable Product JSON-LD (149.00 EUR, InStock) and the Organization with its SIREN', () => {
  for (const [path, lang] of [['audit/index.html', 'fr'], ['en/audit/index.html', 'en'], ['de/audit/index.html', 'de']]) {
    const html = readFileSync(join(openDir, path), 'utf8');
    const nodes = jsonLd(html);
    const product = nodes.find((n) => n['@type'] === 'Product');
    assert.ok(product, `${path}: Product`);
    assert.equal(product.sku, 'a11y-audit-auto');
    assert.equal(product.brand.name, 'A11y Kit');
    assert.equal(product.url, `https://outils.vread.fr/declaration-accessibilite/${path.replace('index.html', '')}`);
    assert.match(product.description, lang === 'de' ? /Keine Konformitätsprüfung/ : lang === 'en' ? /Not a conformance audit/ : /pas un audit de conformité/);
    assert.equal(product.offers['@type'], 'Offer');
    assert.equal(product.offers.price, (repoConfig.amount / 100).toFixed(2));
    assert.equal(product.offers.price, '149.00');
    assert.equal(product.offers.priceCurrency, 'EUR');
    assert.equal(product.offers.availability, 'https://schema.org/InStock');
    assert.equal(product.offers.url, 'https://outils.vread.fr/declaration-accessibilite/commander.html');
    assert.equal(product.offers.seller['@id'], ORG_ID);
    assert.ok(!('valueAddedTaxIncluded' in product.offers));
    const org = nodes.find((n) => n['@type'] === 'Organization');
    assert.equal(org['@id'], ORG_ID);
    assert.equal(org.legalName, 'READ FRANCE');
    assert.deepEqual(org.identifier, { '@type': 'PropertyValue', propertyID: 'SIREN', value: '988741773' });
    assert.equal(org.address.postalCode, '75019');
    assert.match(html, /<meta name="description" content="[^"]*net[^"]*293 B/);
  }
  for (const path of ['index.html', 'en/index.html', 'de/index.html']) {
    const nodes = jsonLd(readFileSync(join(openDir, path), 'utf8'));
    assert.ok(nodes.some((n) => n['@type'] === 'WebApplication' && n.publisher['@id'] === ORG_ID), path);
    assert.equal(nodes.find((n) => n['@type'] === 'Organization').identifier.value, '988741773', path);
  }
  for (const path of ['audit/index.html', 'en/audit/index.html', 'de/audit/index.html']) {
    assert.ok(!jsonLd(readFileSync(join(closedDir, path), 'utf8')).some((n) => n['@type'] === 'Product'), `closed ${path}: no Product`);
  }
});

test('B2B terms (cgv-pro.html): service clauses, authorisation, 24 h ouvrées, no conformity claim, data retention', () => {
  const html = readFileSync(join(openDir, 'cgv-pro.html'), 'utf8');
  assert.match(html, /<!--[\s\S]*PAS UN CONSEIL JURIDIQUE[\s\S]*-->/);
  const t = text(html);
  for (const re of [
    /[Vv]ersion du 12 octobre 2026/, /cgv-pro-audit-2026-10-12/,
    /READ FRANCE SAS, société par actions simplifiée \(SAS\) au capital de 1 000 €/, /SIREN 988 741 773/, /TVA non applicable, art\. 293 B du CGI/,
    /professionnel/, /accepte expressément/,
    /analyse automatisée et partielle/, /au plus 20 pages/, /robots\.txt/,
    /ne constitue pas un audit de conformité/, /ne donne aucun taux de conformité/,
    /Autorisation d’analyse/, /titulaire du site/, /garantit le Vendeur contre toute réclamation/,
    /149,00 € net de taxe/, /Stripe/, /sous 24 heures ouvrées/, /5 jours ouvrés/,
    /droit de rétractation[^.]*ne s’applique pas/, /limitée au prix payé/,
    /trois fois le taux d’intérêt légal/, /40 €/, /90 jours après la livraison/, /10 ans/, /GitHub/, /CNIL/,
    /compétence exclusive des tribunaux de Paris/,
  ]) assert.match(t, re, String(re));
  assert.doesNotMatch(t, /\d+\s?%\s*(de conformité|conforme)/);
  const privacy = text(readFileSync(join(openDir, 'confidentialite/index.html'), 'utf8'));
  assert.match(privacy, /Commande de l’audit automatisé/);
  assert.match(privacy, /supprimés 90 jours après la livraison/);
  assert.doesNotMatch(privacy, /Ce site ne collecte aucune donnée personnelle/);
  assert.match(text(readFileSync(join(openDir, 'mentions-legales/index.html'), 'utf8')), /Capital social : 1 000 €/);
});

// Minimal Stripe.js stand-in: Payment Element that becomes "ready", elements.submit() ok.
const FAKE_STRIPE = `window.Stripe = function () { return {
  elements: function () { return { create: function () { var h = {}; return { on: function (e, f) { h[e] = f; }, mount: function (sel) { document.querySelector(sel).textContent = '[carte]'; setTimeout(function () { h.ready && h.ready(); }, 10); } }; }, submit: function () { return Promise.resolve({}); }, update: function () {} }; },
  confirmPayment: function () { return Promise.resolve({ error: { message: 'stub: no payment in tests' } }); } }; };`;

let server, browser, base;
before(async () => {
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
  server = createServer((req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^\/+/, '').replace(/^declaration-accessibilite\/?/, '');
    if (!p || p.endsWith('/')) p += 'index.html';
    try {
      const body = readFileSync(join(openDir, p));
      res.writeHead(200, { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('404');
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}/declaration-accessibilite/`;
});
after(async () => {
  await browser?.close();
  server?.close();
});

test('browser: audit fields are checked (same site, ≤ 20 pages, attestation) and sent in createIntent.extra', async () => {
  const { chromium } = await import('@playwright/test');
  browser ??= await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && !/Content Security Policy|ERR_|Failed to load resource/.test(m.text()) && errors.push(m.text()));
  const posts = [];
  await page.route('https://js.stripe.com/**', (r) => r.fulfill({ contentType: 'text/javascript', body: FAKE_STRIPE }));
  await page.route('https://octave-test.invalid/**', async (r) => {
    const req = r.request();
    if (req.method() === 'GET') return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, product: 'a11y-audit-20', name: 'Audit', amount: 14900, currency: 'eur', label: '149,00 € net (TVA non applicable, art. 293 B du CGI)', termsVersion: 'cgv-pro-audit-2026-10-12' }) });
    posts.push(JSON.parse(req.postData()));
    return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: false, error: 'stub', message: 'stub: arrêt avant paiement' }) });
  });
  await page.goto(base + 'commander.html');
  await page.waitForSelector('#octave-pay[data-ready="1"]', { timeout: 10000 });
  await page.fill('input[name="email"]', 'achat@entreprise.example');
  await page.fill('input[name="company"]', 'Boutique Exemple SAS');
  await page.fill('input[name="siren"]', '732 829 320');
  await page.fill('input[name="addressLine1"]', '1 place Exemple');
  await page.fill('input[name="postalCode"]', '75011');
  await page.fill('input[name="city"]', 'Paris');
  await page.check('input[name="terms"]');
  await page.fill('input[name="siteUrl"]', 'www.boutique-exemple.fr');
  await page.fill('textarea[name="pages"]', 'https://autre.fr/x');
  await page.check('input[name="scanAuthorized"]');
  await page.click('#pay-button');
  assert.match(await page.$eval('textarea[name="pages"]', (i) => i.validationMessage), /appartenir au site/);
  await page.fill('textarea[name="pages"]', Array.from({ length: 21 }, (_, i) => `/p${i}`).join('\n'));
  await page.click('#pay-button');
  assert.match(await page.$eval('textarea[name="pages"]', (i) => i.validationMessage), /20 pages au maximum/);
  await page.fill('textarea[name="pages"]', '/\n/panier');
  await page.uncheck('input[name="scanAuthorized"]');
  await page.click('#pay-button');
  assert.equal(await page.$eval('input[name="scanAuthorized"]', (i) => i.validity.valueMissing), true);
  assert.equal(posts.length, 0);
  await page.check('input[name="scanAuthorized"]');
  await page.selectOption('select[name="reportLang"]', 'en');
  await page.click('#pay-button');
  await page.waitForSelector('#pay-error:not([hidden])');
  assert.equal(posts.length, 1);
  assert.deepEqual(posts[0].extra, { siteUrl: 'www.boutique-exemple.fr', pages: '/\n/panier', reportLang: 'en', scanAuthorized: true });
  assert.equal(posts[0].product, 'a11y-audit-20');
  assert.equal(posts[0].termsVersion, 'cgv-pro-audit-2026-10-12');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 0, `horizontal scroll ${overflow}px`);
  assert.deepEqual(errors, []);
  await page.close();
});
