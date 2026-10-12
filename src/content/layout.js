import { SITE, NAV, CHROME, ROUTES } from './site.js';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const url = (path) => SITE.base + path.replace(/^\//, '');
export const abs = (path) => SITE.origin + url(path);

const LOCALE = { fr: 'fr_FR', de: 'de_DE', en: 'en_GB' };
const LANG_NAMES = { fr: 'Français', de: 'Deutsch', en: 'English' };

export function layout(page) {
  const c = CHROME[page.lang];
  const nav = NAV[page.lang]
    .map((n) => `<li><a href="${url(n.path)}"${n.path === ROUTES.audit[page.lang] ? ' class="nav-cta"' : ''}${n.path === page.path ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`)
    .join('');
  const alts = page.alternates || [];
  const langLinks = ['fr', 'de', 'en']
    .map((l) => {
      const a = l === page.lang ? { path: page.path } : alts.find((x) => x.lang === l) || { path: NAV[l][0].path };
      return `<li><a href="${url(a.path)}" hreflang="${l}" lang="${l}"${l === page.lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}<span class="sr-only"> – ${LANG_NAMES[l]}</span></a></li>`;
    })
    .join('');
  const hreflang = page.id === '404' ? '' : [{ lang: page.lang, path: page.path }, ...alts]
    .map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${abs(a.path)}">`)
    .join('\n') + (alts.length ? `\n<link rel="alternate" hreflang="x-default" href="${abs(page.lang === 'en' ? page.path : (alts.find((a) => a.lang === 'en') || page).path)}">` : '');
  const jsonld = page.jsonld ? `<script type="application/ld+json">${JSON.stringify(page.jsonld).replace(/</g, '\\u003c')}</script>` : '';
  const scripts = (page.scripts || []).map((s) => `<script type="module" src="${url(s)}"></script>`).join('\n');
  return `<!doctype html>
<html lang="${page.lang}">
<head>
<meta charset="utf-8">
${page.csp ? `<meta http-equiv="Content-Security-Policy" content="${esc(page.csp)}">\n` : ''}<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex || page.id === '404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${abs(page.path)}">`}
${hreflang}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.brand)}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${abs(page.path)}">
<meta property="og:locale" content="${LOCALE[page.lang]}">
<meta name="twitter:card" content="summary">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="${url('favicon.svg')}" type="image/svg+xml">
${page.head || ''}<link rel="stylesheet" href="${url('assets/site.css')}">
${jsonld}
</head>
<body>
<a class="skip" href="#main">${esc(c.skip)}</a>
<header class="site-header">
<div class="wrap header-row">
<a class="brand" href="${url(NAV[page.lang][0].path)}"><span class="brand-mark" aria-hidden="true">A11y</span><span class="brand-text">${esc(SITE.brand)}<span class="brand-by">READ FRANCE</span></span></a>
<div class="header-desktop">
<nav class="site-nav" aria-label="${esc(c.navLabel)}"><ul>${nav}</ul></nav>
<nav class="lang-switch" aria-label="${esc(c.langLabel)}"><ul>${langLinks}</ul></nav>
</div>
<details class="menu">
<summary>${esc(c.menu)}</summary>
<div class="menu-panel">
<nav class="site-nav" aria-label="${esc(c.navLabel)}"><ul>${nav}</ul></nav>
<nav class="lang-switch" aria-label="${esc(c.langLabel)}"><ul>${langLinks}</ul></nav>
</div>
</details>
</div>
</header>
<main id="main" tabindex="-1">
<div class="wrap">
${page.body}
</div>
</main>
<footer class="site-footer">
<div class="wrap">
<p>${c.disclaimer}</p>
<ul>
${c.footerLinks.map((l) => `<li><a href="${l.external ? l.path : url(l.path)}"${l.lang ? ` hreflang="${l.lang}"` : ''}>${esc(l.label)}</a></li>`).join('\n')}
</ul>
<p>${esc(c.product)} (SIREN 988 741 773, Paris) · ${esc(page.noTracking || c.noTracking)}</p>
</div>
</footer>
<script src="${url('mesure.js')}" defer></script>
${page.bodyScripts || ''}${scripts}
</body>
</html>
`;
}
