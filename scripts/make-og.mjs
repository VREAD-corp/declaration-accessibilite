// Renders src/assets/og-{fr,de,en}.png (1200x630) from scripts/og/og.html with Playwright.
// Run once when the branding or the wording changes: node scripts/make-og.mjs
// The PNGs are then reduced to a small palette (PIL quantize, see the commit) to stay under ~40 KB.
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';

const tpl = pathToFileURL(new URL('./og/og.html', import.meta.url).pathname).href;
const browser = await chromium.launch();
for (const lang of ['fr', 'de', 'en']) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`${tpl}?lang=${lang}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL(`../src/assets/og-${lang}.png`, import.meta.url).pathname });
  await page.close();
}
await browser.close();
