// Sales gate (SALES_OPEN) of the paid « audit automatisé partiel » and its B2B order page.
//  - SALES_OPEN=false: no order page, no Stripe.js, no checkout script, the audit page says « bientôt ».
//  - SALES_OPEN=true (test build: fake endpoint, pk_test_): order page with the audit fields, CSP, B2B terms
//    (cgv-pro.html), order page; a browser run with a stubbed Stripe.js and endpoint checks the form.
//  - quotesEnabled (quote / bank-transfer form, octave-checkout gas/web/devis-form.html + devis.js): committed
//    false → no quote block, no devis.js tag; true (temp config only) → block right after #octave-pay.
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

let closedDir, openDir, quotesDir;
before(() => {
  closedDir = build({ ...repoConfig, SALES_OPEN: false });
  openDir = build({ ...OPEN_CFG, quotesEnabled: false }, { SALES_ALLOW_TEST: '1' });
  quotesDir = build({ ...OPEN_CFG, quotesEnabled: true }, { SALES_ALLOW_TEST: '1' });
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
  // mesure.js / cro.js: shared measurement snippets (verbatim copies); mesure.js only names the order form id to
  // count checkout_start, and the cro.js tag names the measurement backend (data-api), not a buy UI
  for (const f of files(closedDir).filter((x) => /\.(html|js|xml|txt)$/.test(x) && !x.startsWith('assets/vendor/') && x !== 'mesure.js' && x !== 'cro.js')) {
    const body = readFileSync(join(closedDir, f), 'utf8').replace(/<script src="[^"]*\/cro\.js" [^>]*><\/script>/g, '');
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

const OCTAVE_WEB = [process.env.OCTAVE_CHECKOUT_WEB, join(ROOT, '..', 'octave-checkout', 'gas', 'web'), join(ROOT, '..', '..', 'octave-checkout', 'gas', 'web')].find((d) => d && existsSync(join(d, 'devis.js')));
const ids = (html) => [...html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const EXTRA_NAMES = ['siteUrl', 'pages', 'reportLang', 'scanAuthorized'];

test('quotesEnabled: committed false; false → no quote block nor devis.js tag; config carries the boolean', () => {
  assert.equal(repoConfig.quotesEnabled, false);
  const order = readFileSync(join(openDir, 'commander.html'), 'utf8');
  assert.doesNotMatch(order, /octave-devis/);
  assert.doesNotMatch(order, /devis\.js/);
  assert.match(readFileSync(join(openDir, 'assets/checkout/checkout-config.js'), 'utf8'), /"quotesEnabled":false/);
  const dflt = build((({ quotesEnabled, ...c }) => c)(OPEN_CFG), { SALES_ALLOW_TEST: '1' }); // key absent → false
  assert.match(readFileSync(join(dflt, 'assets/checkout/checkout-config.js'), 'utf8'), /"quotesEnabled":false/);
  assert.doesNotMatch(readFileSync(join(dflt, 'commander.html'), 'utf8'), /octave-devis/);
  assert.throws(() => build({ ...OPEN_CFG, quotesEnabled: 'yes' }, { SALES_ALLOW_TEST: '1' }));
});

test('quotesEnabled=true: quote block once right after #octave-pay, devis.js after pay.js, unique ids, order fields copied', () => {
  const order = readFileSync(join(quotesDir, 'commander.html'), 'utf8');
  assert.equal(order.match(/id="octave-devis-box"/g).length, 1);
  assert.equal(order.match(/<form id="octave-devis"/g).length, 1);
  assert.match(order, /<form id="octave-pay"[\s\S]*?<\/form>\s*<details id="octave-devis-box" class="card devis-box" hidden>/);
  const scripts = [...order.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1].split('/').pop());
  assert.equal(scripts.indexOf('devis.js'), scripts.indexOf('pay.js') + 1);
  assert.equal(scripts.filter((s) => s === 'devis.js').length, 1);
  const all = ids(order);
  assert.deepEqual(all.filter((x, i) => all.indexOf(x) !== i), [], 'duplicate ids');
  for (const html of [order]) for (const m of html.matchAll(/aria-describedby="([^"]+)"/g)) for (const id of m[1].split(' ')) assert.ok(all.includes(id), `aria-describedby → #${id}`);
  const quote = order.slice(order.indexOf('<form id="octave-devis"'), order.indexOf('</details>', order.indexOf('<form id="octave-devis"')));
  const card = order.slice(order.indexOf('<form id="octave-pay"'), order.indexOf('<details id="octave-devis-box"'));
  const extras = (html) => [...html.matchAll(/<(?:input|textarea|select)\b[^>]*>/g)].map((m) => m[0]).filter((t) => /data-octave-extra/.test(t)).map((t) => `${/name="([^"]+)"/.exec(t)[1]}=${/data-octave-extra(?:="([^"]*)")?/.exec(t)[1] ?? ''}`);
  assert.deepEqual(extras(quote).sort(), extras(card).sort());
  assert.deepEqual(extras(quote).map((e) => e.split('=')[0]).sort(), [...EXTRA_NAMES].sort());
  assert.match(quote, /name="scanAuthorized" data-octave-extra="bool" required/);
  assert.match(quote, /<div class="hp" aria-hidden="true">.*name="website" tabindex="-1"/);
  assert.match(quote, /class="terms-link" href="\/declaration-accessibilite\/cgv-pro\.html"/);
  assert.match(quote, /\(version du 12 octobre 2026\)/);
  assert.doesNotMatch(quote, /\{\{|\}\}/);
  assert.match(readFileSync(join(quotesDir, 'assets/checkout/checkout-config.js'), 'utf8'), /"quotesEnabled":true/);
  assert.match(readFileSync(join(quotesDir, 'assets/site.css'), 'utf8'), /\.hp\{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden\}/);
  for (const f of ['pay.js', 'devis.js']) assert.equal(readFileSync(join(quotesDir, 'assets/checkout', f), 'utf8'), readFileSync(join(ROOT, 'src/checkout', f), 'utf8'));
});

test('vendored pay.js / devis.js / order.js are identical to octave-checkout gas/web', { skip: !OCTAVE_WEB && 'octave-checkout checkout not found (set OCTAVE_CHECKOUT_WEB)' }, () => {
  for (const f of ['pay.js', 'devis.js', 'order.js']) assert.equal(readFileSync(join(ROOT, 'src/checkout', f), 'utf8'), readFileSync(join(OCTAVE_WEB, f), 'utf8'), f);
});

const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
  const d = JSON.parse(m[1]);
  return d['@graph'] ?? [d];
});
const ORG_ID = 'https://outils.vread.fr/#org';

test('SALES_OPEN=true: audit pages carry parseable Product JSON-LD (149.00 EUR, InStock) referencing the hub Organization by @id', () => {
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
    assert.equal(product.offers.shippingDetails.shippingRate.value, '0');
    assert.equal(product.offers.shippingDetails.shippingDestination.addressCountry, 'FR');
    assert.equal(product.offers.hasMerchantReturnPolicy.returnPolicyCategory, 'https://schema.org/MerchantReturnNotPermitted');
    assert.equal(product.offers.hasMerchantReturnPolicy.merchantReturnLink, 'https://outils.vread.fr/declaration-accessibilite/cgv-pro.html');
    assert.equal(product.image, `https://outils.vread.fr/declaration-accessibilite/assets/og-${lang}.png`);
    // the full Organization lives on the hub only (https://outils.vread.fr/#org): no duplicated node here
    assert.ok(!nodes.some((n) => n['@type'] === 'Organization'), `${path}: no standalone Organization`);
    assert.ok(!html.includes('"legalName"') && !html.includes('"identifier"'), `${path}: no duplicated Organization data`);
    assert.match(html, /<meta name="description" content="[^"]*net[^"]*293 B/);
  }
  for (const path of ['index.html', 'en/index.html', 'de/index.html']) {
    const nodes = jsonLd(readFileSync(join(openDir, path), 'utf8'));
    assert.ok(nodes.some((n) => n['@type'] === 'WebApplication' && n.publisher['@id'] === ORG_ID && n.publisher.name === 'READ FRANCE SAS'), path);
    assert.ok(!nodes.some((n) => n['@type'] === 'Organization'), `${path}: no standalone Organization`);
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

let server, browser, base, serveDir;
before(async () => {
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
  server = createServer((req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^\/+/, '').replace(/^declaration-accessibilite\/?/, '');
    if (!p || p.endsWith('/')) p += 'index.html';
    try {
      const body = readFileSync(join(serveDir ?? openDir, p));
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
  assert.equal(posts[0].expectedAmount, 14900);
  assert.equal(await page.textContent('#pay-button'), 'Payer 149\u00a0€ et commander l’audit');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 0, `horizontal scroll ${overflow}px`);
  assert.deepEqual(errors, []);
  await page.close();
});

test('browser (quotesEnabled=true): devis.js shows the box and posts action quote with the same extra fields', async () => {
  const { chromium } = await import('@playwright/test');
  browser ??= await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  const posts = [];
  await page.route('https://js.stripe.com/**', (r) => r.fulfill({ contentType: 'text/javascript', body: FAKE_STRIPE }));
  await page.route('https://octave-test.invalid/**', async (r) => {
    const req = r.request();
    if (req.method() === 'GET') return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, product: 'a11y-audit-20', name: 'Audit', amount: 14900, currency: 'eur', label: '149,00 €', termsVersion: 'cgv-pro-audit-2026-10-12' }) });
    posts.push(JSON.parse(req.postData()));
    return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, quote: 'D-2026-0001', email_masked: 'a***@entreprise.example' }) });
  });
  serveDir = quotesDir;
  await page.goto(base + 'commander.html');
  await page.waitForSelector('#octave-devis-box:not([hidden])');
  await page.click('#octave-devis-box summary');
  const q = '#octave-devis ';
  await page.fill(q + 'input[name="siteUrl"]', 'www.boutique-exemple.fr');
  await page.fill(q + 'textarea[name="pages"]', '/\n/panier');
  await page.selectOption(q + 'select[name="reportLang"]', 'de');
  await page.fill(q + 'input[name="email"]', 'achat@entreprise.example');
  await page.fill(q + 'input[name="company"]', 'Boutique Exemple SAS');
  await page.fill(q + 'input[name="siren"]', '732 829 320');
  await page.fill(q + 'input[name="addressLine1"]', '1 place Exemple');
  await page.fill(q + 'input[name="postalCode"]', '75011');
  await page.fill(q + 'input[name="city"]', 'Paris');
  await page.check(q + 'input[name="terms"]');
  await page.click('#devis-button');
  assert.equal(posts.length, 0, 'scanAuthorized is required');
  await page.check(q + 'input[name="scanAuthorized"]');
  await page.click('#devis-button');
  await page.waitForSelector('#devis-ok:not([hidden])');
  assert.equal(posts.length, 1);
  assert.equal(posts[0].action, 'quote');
  assert.equal(posts[0].product, 'a11y-audit-20');
  assert.equal(posts[0].expectedAmount, 14900);
  assert.equal(posts[0].termsVersion, 'cgv-pro-audit-2026-10-12');
  assert.deepEqual(posts[0].extra, { siteUrl: 'www.boutique-exemple.fr', pages: '/\n/panier', reportLang: 'de', scanAuthorized: true });
  assert.match(await page.textContent('#devis-ok'), /D-2026-0001/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 0, `horizontal scroll ${overflow}px`);
  assert.deepEqual(errors, []);
  await page.close();
  serveDir = undefined;
});
