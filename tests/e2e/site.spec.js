import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Our checks are not visits: mesure.js sends them to the excluded counters (octave_notrack=1, reason notrack).
test.beforeEach(async ({ page }) => { await page.addInitScript(() => { try { localStorage.setItem('octave_notrack', '1'); } catch {} }); });

const AXE = readFileSync(new URL('../../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');

async function sitemapPaths(request, baseURL) {
  const res = await request.get(new URL('sitemap.xml', baseURL).href);
  expect(res.status()).toBe(200);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

function trackForeignRequests(page, baseURL) {
  const origin = new URL(baseURL).origin;
  const foreign = [];
  page.on('request', (r) => {
    const u = r.url();
    if (u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('about:')) return;
    // anonymous audience measurement (mesure.js, live host only): allowed, but must never carry the user's input
    if (/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec\?action=track$/.test(u)) {
      if ((r.postData() || '').includes('<')) foreign.push(u);
      return;
    }
    if (!u.startsWith(origin)) foreign.push(u);
  });
  return foreign;
}

test('every page renders, has one h1, no console errors, no horizontal scroll, no axe violations', async ({ page, request, baseURL }) => {
  const paths = await sitemapPaths(request, baseURL);
  expect(paths.length).toBeGreaterThanOrEqual(18);
  paths.push(new URL('cgv/', baseURL).pathname); // noindex draft, still must be accessible
  const titles = new Set();
  for (const p of paths) {
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(`${p}: ${m.text()}`));
    page.on('pageerror', (e) => errors.push(`${p}: ${e.message}`));
    const res = await page.goto(new URL(p, baseURL).href);
    expect(res.status(), p).toBe(200);
    await expect(page.locator('h1'), p).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title), `duplicate title ${title}`).toBe(false);
    titles.add(title);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `horizontal scroll on ${p}`).toBeLessThanOrEqual(0);
    await page.addScriptTag({ content: AXE });
    const violations = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
      return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
    });
    expect(violations, `axe on ${p}`).toEqual([]);
    expect(errors).toEqual([]);
    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
  }
});

test('all links on all pages resolve', async ({ page, request, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'once is enough');
  test.setTimeout(600000);
  const paths = await sitemapPaths(request, baseURL);
  const links = new Set();
  for (const p of paths) {
    await page.goto(new URL(p, baseURL).href);
    for (const href of await page.$$eval('a[href], link[rel="stylesheet"], link[rel="icon"], script[src]', (els) => els.map((e) => e.href || e.src)))
      if (/^https?:/.test(href)) links.add(href.split('#')[0]);
  }
  // Official sites behind bot protection (Légifrance, EUR-Lex) answer 202/403 to scripts:
  // retry those in a real browser page, and only annotate if still blocked.
  const PROTECTED = /(^|\.)(legifrance\.gouv\.fr|eur-lex\.europa\.eu|economie\.gouv\.fr)$/;
  const bad = [];
  const blocked = [];
  // Release assets: check names against the GitHub API instead of downloading them,
  // so tests never inflate the download-count KPI.
  const DL = /^https:\/\/github\.com\/VREAD-corp\/declaration-accessibilite\/releases\/latest\/download\/(.+)$/;
  const rel = await request.get('https://api.github.com/repos/VREAD-corp/declaration-accessibilite/releases/latest');
  expect(rel.status()).toBe(200);
  const assets = new Set((await rel.json()).assets.map((x) => x.name));
  for (const l of [...links]) {
    const m = l.match(DL);
    if (!m) continue;
    links.delete(l);
    if (!assets.has(decodeURIComponent(m[1]))) bad.push(`missing release asset ${m[1]}`);
  }
  for (const l of links) {
    const r = await request.get(l, { maxRedirects: 5, timeout: 30000 }).catch((e) => ({ status: () => String(e.message).slice(0, 80) }));
    let s = r.status();
    if (s === 200 || (s >= 300 && s < 400) || (s > 200 && s < 300 && !PROTECTED.test(new URL(l).hostname))) continue;
    if (PROTECTED.test(new URL(l).hostname)) {
      const resp = await page.goto(l, { timeout: 45000 }).catch(() => null);
      s = resp ? resp.status() : 'error';
      if (s >= 200 && s < 400) continue;
      blocked.push(`${s} ${l}`);
      continue;
    }
    bad.push(`${s} ${l}`);
  }
  if (blocked.length) test.info().annotations.push({ type: 'bot-protected (not verified)', description: blocked.join('\n') });
  console.log(`checked ${links.size} links; bot-protected unverified: ${blocked.length}`);
  expect(bad).toEqual([]);
});

test('FR generator: verdict, preview, exports, nothing leaves the browser', async ({ page, baseURL }) => {
  const foreign = trackForeignRequests(page, baseURL);
  await page.goto(baseURL);
  await page.getByLabel('Nom de l’organisation').fill('Boutique Exemple SAS');
  await page.getByLabel('Nom du site ou du service').fill('boutique-exemple.fr');
  await page.getByLabel('Adresse du site').fill('https://boutique-exemple.fr');
  await page.getByLabel('Adresse e-mail de contact accessibilité').fill('a11y@boutique-exemple.fr');
  await page.locator('#r-consumerService-yes').check();
  await page.locator('#r-staff-lt10').check();
  await page.locator('#r-smallFinance-yes').check();
  await expect(page.locator('#verdict')).toContainText('microentreprise');
  await page.locator('#r-staff-gte10').check();
  await expect(page.locator('#verdict')).toContainText('Acte européen');
  await page.locator('#r-auditType-none').check();
  await expect(page.locator('#preview')).toContainText('non conforme');
  await expect(page.locator('#preview')).toContainText('Boutique Exemple SAS');
  await expect(page.locator('#preview')).toContainText('Défenseur des droits');

  for (const [fmt, ext] of [['docx', '.docx'], ['html', '.html'], ['md', '.md']]) {
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator(`button[data-fmt="${fmt}"]`).click()]);
    expect(dl.suggestedFilename()).toMatch(new RegExp(`\\${ext}$`));
    const path = await dl.path();
    const buf = readFileSync(path);
    if (ext === '.docx') expect(buf.subarray(0, 2).toString()).toBe('PK');
    else expect(buf.toString()).toContain('Boutique Exemple SAS');
  }
  await page.locator('#doc-plan').check();
  await expect(page.locator('#preview')).toContainText('Schéma pluriannuel');
  await page.locator('#doc-eaa').check();
  await expect(page.locator('#preview h3').first()).toContainText('accessibilité');

  // answers survive a reload (localStorage, this device only)
  await page.reload();
  await expect(page.getByLabel('Nom de l’organisation')).toHaveValue('Boutique Exemple SAS');
  page.once('dialog', (d) => d.accept());
  await page.locator('#reset').click();
  await expect(page.getByLabel('Nom de l’organisation')).toHaveValue('');
  expect(foreign).toEqual([]);
});

test('DE and EN generators produce BFSG / Annex V documents', async ({ page, baseURL }) => {
  await page.goto(new URL('de/', baseURL).href);
  await page.getByLabel('Name der Organisation').fill('Muster GmbH');
  await expect(page.locator('#preview')).toContainText('Muster GmbH');
  await expect(page.locator('#preview')).toContainText('BFSG');
  await expect(page.locator('#preview')).toContainText('Marktüberwachung');
  await page.goto(new URL('en/', baseURL).href);
  await page.getByLabel('Organisation name').fill('Example Ltd');
  await expect(page.locator('#preview')).toContainText('Example Ltd');
  await expect(page.locator('#preview')).toContainText('Annex V');
});

test('mini-test runs axe-core in the browser on a pasted snippet without network', async ({ page, baseURL }) => {
  const foreign = trackForeignRequests(page, baseURL);
  await page.goto(new URL('verification/', baseURL).href);
  await page.locator('#mc-example').click();
  await page.getByRole('button', { name: 'Lancer le mini-test' }).click();
  await expect(page.locator('#mc-summary')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('#mc-results')).toContainText('image-alt');
  await expect(page.locator('#mc-results')).toContainText('RGAA 1.1');
  await expect(page.locator('#mc-results')).not.toContainText('%');
  expect(foreign).toEqual([]);
});

test('cro.js (behaviour counters) loads on the pages, no A/B test, nothing sent under octave_notrack=1', async ({ page, request, baseURL }) => {
  const sent = [];
  page.on('request', (r) => { if (/script\.google\.com/.test(r.url()) && /"kind":"cro"/.test(r.postData() || '')) sent.push(r.url()); });
  const res = await request.get(new URL('cro.js', baseURL).href);
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('Octave cro.js');
  for (const p of ['', 'audit/', 'de/', 'en/audit/', 'confidentialite/', 'exemples/exemple-rapport-audit-fr.html']) {
    await page.goto(new URL(`${p}${p.includes('?') ? '&' : '?'}octave_notrack=1`, baseURL).href);
    const tag = page.locator('script[src$="/cro.js"]');
    await expect(tag, p).toHaveCount(1);
    await expect(tag, p).toHaveAttribute('data-site', 'declaration-accessibilite');
    await expect(tag, p).toHaveAttribute('data-hosts', 'accessibilite.jalonel.com outils.vread.fr');
    await page.waitForFunction(() => window.octaveCro && typeof window.octaveCro.goal === 'function');
    expect(await page.evaluate(() => [window.OCTAVE_XP, window.octaveCro.v('price'), [...document.documentElement.attributes].some((a) => a.name.startsWith('data-xp-'))])).toEqual([undefined, undefined, false]);
    await page.evaluate(() => { window.octaveCro.goal('download'); dispatchEvent(new Event('pagehide')); });
  }
  expect(sent).toEqual([]);
});
