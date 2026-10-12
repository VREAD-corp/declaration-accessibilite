// Static site build: src/ -> dist/. No framework, no network.
import { mkdirSync, rmSync, writeFileSync, copyFileSync, readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE } from '../src/content/pages.js';
import { OPEN, SALES } from '../src/content/site.js';
import { checkoutConfigJs } from './checkout-pages.mjs';
import { AUDIT_PAY_LABEL, AUDIT_TERMS_VERSION } from '../src/content/order.js';
import { layout } from '../src/content/layout.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });

function write(rel, content) {
  const p = join(dist, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
}
function copy(from, rel) {
  const p = join(dist, rel);
  mkdirSync(dirname(p), { recursive: true });
  copyFileSync(join(root, from), p);
}

// pages (a page with `file` is written at that path, e.g. commander.html)
for (const page of PAGES) write(page.file || join(page.path, 'index.html').replace(/^\//, ''), layout(page));
// 404
const notFound = PAGES.find((p) => p.id === '404');
if (notFound) write('404.html', layout(notFound));

// assets
copy('src/assets/site.css', 'assets/site.css');
for (const f of readdirSync(join(root, 'src/assets'))) if (f.endsWith('.js')) copy(`src/assets/${f}`, `assets/js/${f}`);
for (const f of readdirSync(join(root, 'src/lib'))) copy(`src/lib/${f}`, `assets/js/lib/${f}`);
copy('src/data/rgaa-map.js', 'assets/js/data/rgaa-map.js');
copy('src/data/axe-rgaa.js', 'assets/js/data/axe-rgaa.js');
copy('src/assets/favicon.svg', 'favicon.svg');
// anonymous, cookieless audience measurement: verbatim copy of VREAD-corp/octave-checkout gas/web/mesure.js
copy('src/mesure/mesure.js', 'mesure.js');
for (const f of readdirSync(join(root, 'src/assets/img'))) copy(`src/assets/img/${f}`, `assets/img/${f}`);
// sample reports of the paid audit, produced by the real audit runner on the demo page: served as .html
// (opens in the browser, unlike a GitHub release asset) and as the PDF format actually delivered
for (const f of readdirSync(join(root, 'src/samples'))) {
  if (f.endsWith('.html')) write(`exemples/${f}`, readFileSync(join(root, 'src/samples', f), 'utf8').replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex">'));
  else copy(`src/samples/${f}`, `exemples/${f}`);
}
// axe-core (MPL-2.0) bundled unmodified, with its licence
copy('node_modules/axe-core/axe.min.js', 'assets/vendor/axe/axe.min.js');
copy('node_modules/axe-core/LICENSE', 'assets/vendor/axe/LICENSE.txt');
copy('node_modules/axe-core/locales/fr.json', 'assets/vendor/axe/fr.json');
copy('node_modules/axe-core/locales/de.json', 'assets/vendor/axe/de.json');
const axeVersion = JSON.parse(readFileSync(join(root, 'node_modules/axe-core/package.json'))).version;
write('assets/vendor/axe/VERSION.txt', `axe-core ${axeVersion} (https://github.com/dequelabs/axe-core), Mozilla Public License 2.0, unmodified.\n`);

// paid audit order flow: only while SALES_OPEN is true (pay.js / order.js are verbatim copies of
// VREAD-corp/octave-checkout gas/web/, the shared octave-pay-gas checkout scripts)
if (OPEN) {
  for (const f of ['pay.js', 'order.js', 'audit-order.js']) copy(`src/checkout/${f}`, `assets/checkout/${f}`);
  write(
    'assets/checkout/checkout-config.js',
    checkoutConfigJs(SALES, {
      termsUrl: `${SITE.base}cgv-pro.html`,
      orderPage: 'commande.html',
      termsVersion: AUDIT_TERMS_VERSION,
      payLabel: AUDIT_PAY_LABEL,
      laterText: 'Si vous fermez cette page, votre commande est tout de même enregistrée automatiquement dans les 10 minutes ; le rapport et la facture vous sont envoyés par e-mail sous 24 h ouvrées.',
    })
  );
}

// deliberately inaccessible demo page (noindex, not in sitemap) for the sample audit report
copy('src/demo/boutique-demo.html', 'demo/boutique-demo/index.html');

// sitemap + robots
const urls = PAGES.filter((p) => p.id !== '404' && !p.noindex && !p.file);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (p) => `<url><loc>${SITE.origin}${SITE.base}${p.path.replace(/^\//, '')}</loc><lastmod>${p.updated || SITE.updated}</lastmod>${(p.alternates || [])
      .map((a) => `<xhtml:link rel="alternate" hreflang="${a.lang}" href="${SITE.origin}${SITE.base}${a.path.replace(/^\//, '')}"/>`)
      .join('')}</url>`
  )
  .join('\n')}
</urlset>
`
);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}${SITE.base}sitemap.xml\n`);
write('.nojekyll', '');
if (!existsSync(join(dist, 'index.html'))) throw new Error('no index');
console.log(`built ${PAGES.length} pages into dist/`);
