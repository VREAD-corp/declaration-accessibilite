// Static site build: src/ -> dist/. No framework, no network.
import { mkdirSync, rmSync, writeFileSync, copyFileSync, readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE } from '../src/content/pages.js';
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

// pages
for (const page of PAGES) write(join(page.path, 'index.html').replace(/^\//, ''), layout(page));
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
// axe-core (MPL-2.0) bundled unmodified, with its licence
copy('node_modules/axe-core/axe.min.js', 'assets/vendor/axe/axe.min.js');
copy('node_modules/axe-core/LICENSE', 'assets/vendor/axe/LICENSE.txt');
copy('node_modules/axe-core/locales/fr.json', 'assets/vendor/axe/fr.json');
copy('node_modules/axe-core/locales/de.json', 'assets/vendor/axe/de.json');
const axeVersion = JSON.parse(readFileSync(join(root, 'node_modules/axe-core/package.json'))).version;
write('assets/vendor/axe/VERSION.txt', `axe-core ${axeVersion} (https://github.com/dequelabs/axe-core), Mozilla Public License 2.0, unmodified.\n`);

// deliberately inaccessible demo page (noindex, not in sitemap) for the sample audit report
copy('src/demo/boutique-demo.html', 'demo/boutique-demo/index.html');

// sitemap + robots
const urls = PAGES.filter((p) => p.id !== '404' && !p.noindex);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (p) => `<url><loc>${SITE.origin}${SITE.base}${p.path.replace(/^\//, '')}</loc><lastmod>${SITE.updated}</lastmod>${(p.alternates || [])
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
