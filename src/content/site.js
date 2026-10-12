import { fileURLToPath } from 'node:url';
import { loadSalesConfig, prices } from '../../scripts/checkout-pages.mjs';

/** sales.config.json (SALES_OPEN gate of the paid audit; SALES_CONFIG overrides the path for test builds). */
export const SALES = loadSalesConfig(fileURLToPath(new URL('../..', import.meta.url)));
export const OPEN = SALES.SALES_OPEN === true;
export const PRICE = prices(SALES);

export const SITE = {
  brand: 'A11y Kit',
  // SITE_ORIGIN / SITE_BASE: a move to a custom domain needs no code change.
  origin: process.env.SITE_ORIGIN || 'https://outils.vread.fr',
  base: process.env.SITE_BASE || '/declaration-accessibilite/',
  repo: 'https://github.com/VREAD-corp/declaration-accessibilite',
  updated: '2026-10-11',
};

export const RELEASE_DL = `${SITE.repo}/releases/latest/download/`;
export const ISSUES = `${SITE.repo}/issues`;
/** Public contact (replaces GitHub issues as the contact channel). */
export const CONTACT = 'octave@vread.fr';
/** Sample report of the paid audit, served as real pages (HTML opens in the browser) + the delivered PDF format. */
export const SAMPLE = {
  fr: { html: 'exemples/exemple-rapport-audit-fr.html', pdf: 'exemples/exemple-rapport-audit-fr.pdf' },
  de: { html: 'exemples/beispiel-bericht-pruefung-de.html', pdf: 'exemples/beispiel-bericht-pruefung-de.pdf' },
  en: { html: 'exemples/sample-report-audit-en.html', pdf: 'exemples/sample-report-audit-en.pdf' },
};

export const ROUTES = {
  home: { fr: '/', de: '/de/', en: '/en/' },
  check: { fr: '/verification/', de: '/de/pruefung/', en: '/en/check/' },
  audit: { fr: '/audit/', de: '/de/audit/', en: '/en/audit/' },
  sources: { fr: '/sources/', de: '/de/quellen/', en: '/en/sources/' },
  legal: { fr: '/mentions-legales/', de: '/de/impressum/', en: '/en/legal-notice/' },
  privacy: { fr: '/confidentialite/', de: '/de/datenschutz/', en: '/en/privacy/' },
  cgv: { fr: '/cgv/' },
  // Built only while SALES_OPEN is true (noindex, not in the sitemap).
  order: { fr: '/commander.html' },
  orderReturn: { fr: '/commande.html' },
  cgvPro: { fr: '/cgv-pro.html' },
};

export const NAV = {
  fr: [
    { path: ROUTES.home.fr, label: 'Générateur' },
    { path: ROUTES.check.fr, label: 'Mini-test gratuit' },
    { path: ROUTES.audit.fr, label: OPEN ? 'Audit 20 pages – 149 €' : 'Audit 149 € (bientôt)' },
    { path: ROUTES.sources.fr, label: 'Obligations et sources' },
  ],
  de: [
    { path: ROUTES.home.de, label: 'Generator' },
    { path: ROUTES.check.de, label: 'Mini-Prüfung' },
    { path: ROUTES.audit.de, label: OPEN ? 'Prüfung 20 Seiten – 149 €' : 'Audit 149 € (bald)' },
    { path: ROUTES.sources.de, label: 'Pflichten und Quellen' },
  ],
  en: [
    { path: ROUTES.home.en, label: 'Generator' },
    { path: ROUTES.check.en, label: 'Free mini-test' },
    { path: ROUTES.audit.en, label: OPEN ? '20-page audit – €149' : 'Audit €149 (coming soon)' },
    { path: ROUTES.sources.en, label: 'Obligations and sources' },
  ],
};

export const CHROME = {
  fr: {
    skip: 'Aller au contenu',
    navLabel: 'Navigation principale',
    langLabel: 'Langue',
    menu: 'Menu',
    disclaimer:
      '<strong>Information uniquement.</strong> Cet outil aide à rédiger des documents à partir de vos réponses. Il ne constitue ni un conseil juridique, ni un audit, ni une attestation de conformité.',
    product: 'Un produit de READ FRANCE SAS',
    noTracking: OPEN ? 'Aucun cookie, aucun traceur. Le générateur et le mini-test n’envoient rien de ce que vous saisissez ; seule une mesure d’audience anonyme est faite.' : 'Aucun cookie, aucun traceur ; rien de ce que vous saisissez n’est envoyé (seule une mesure d’audience anonyme est faite).',
    footerLinks: [
      { path: ROUTES.legal.fr, label: 'Mentions légales' },
      { path: ROUTES.privacy.fr, label: 'Confidentialité' },
      ...(OPEN ? [{ path: ROUTES.cgvPro.fr, label: 'CGV (audit)' }] : []),
      { path: ROUTES.sources.fr, label: 'Sources officielles' },
      { path: `mailto:${CONTACT}`, label: `Contact : ${CONTACT}`, external: true },
      { path: `${SITE.repo}/releases`, label: 'Modèles vierges', external: true },
      { path: SITE.repo, label: 'Code source', external: true },
    ],
  },
  de: {
    skip: 'Zum Inhalt springen',
    navLabel: 'Hauptnavigation',
    langLabel: 'Sprache',
    menu: 'Menü',
    disclaimer:
      '<strong>Nur zur Information.</strong> Dieses Werkzeug hilft, Dokumente aus Ihren Angaben zu erstellen. Es ist keine Rechtsberatung, keine Prüfung und keine Konformitätsbescheinigung.',
    product: 'Ein Produkt der READ FRANCE SAS',
    noTracking: OPEN ? 'Keine Cookies, kein Tracking. Generator und Mini-Prüfung senden nichts von Ihren Eingaben; nur eine anonyme Reichweitenmessung findet statt.' : 'Keine Cookies, kein Tracking; Ihre Eingaben werden nicht übertragen (nur anonyme Reichweitenmessung).',
    footerLinks: [
      { path: ROUTES.legal.de, label: 'Impressum' },
      { path: ROUTES.privacy.de, label: 'Datenschutz' },
      { path: ROUTES.sources.de, label: 'Amtliche Quellen' },
      { path: `mailto:${CONTACT}`, label: `Kontakt: ${CONTACT}`, external: true },
      { path: `${SITE.repo}/releases`, label: 'Leere Vorlagen', external: true },
      { path: SITE.repo, label: 'Quellcode', external: true },
    ],
  },
  en: {
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    langLabel: 'Language',
    menu: 'Menu',
    disclaimer:
      '<strong>Information only.</strong> This tool helps you draft documents from your own answers. It is not legal advice, not an audit and not a certificate of conformity.',
    product: 'A product of READ FRANCE SAS',
    noTracking: OPEN ? 'No cookies, no tracking. The generator and the mini-test send nothing you type; only anonymous audience measurement is done.' : 'No cookies, no tracking; nothing you type is sent anywhere (only anonymous audience measurement).',
    footerLinks: [
      { path: ROUTES.legal.en, label: 'Legal notice' },
      { path: ROUTES.privacy.en, label: 'Privacy' },
      { path: ROUTES.sources.en, label: 'Official sources' },
      { path: `mailto:${CONTACT}`, label: `Contact: ${CONTACT}`, external: true },
      { path: `${SITE.repo}/releases`, label: 'Blank templates', external: true },
      { path: SITE.repo, label: 'Source code', external: true },
    ],
  },
};
