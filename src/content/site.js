import { fileURLToPath } from 'node:url';
import { loadSalesConfig, prices } from '../../scripts/checkout-pages.mjs';

/** sales.config.json (SALES_OPEN gate of the paid audit; SALES_CONFIG overrides the path for test builds). */
export const SALES = loadSalesConfig(fileURLToPath(new URL('../..', import.meta.url)));
export const OPEN = SALES.SALES_OPEN === true;
export const PRICE = prices(SALES);

export const SITE = {
  brand: 'A11y Kit',
  // SITE_ORIGIN / SITE_BASE: a move to a custom domain needs no code change.
  origin: process.env.SITE_ORIGIN || 'https://vread-corp.github.io',
  base: process.env.SITE_BASE || '/declaration-accessibilite/',
  repo: 'https://github.com/VREAD-corp/declaration-accessibilite',
  updated: '2026-10-11',
};

export const RELEASE_DL = `${SITE.repo}/releases/latest/download/`;
export const ISSUES = `${SITE.repo}/issues`;

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
    { path: ROUTES.check.fr, label: 'Auto-contrôle et mini-test' },
    { path: ROUTES.audit.fr, label: OPEN ? 'Audit automatisé 149 €' : 'Audit 149 € (bientôt)' },
    { path: ROUTES.sources.fr, label: 'Sources et champ d’application' },
  ],
  de: [
    { path: ROUTES.home.de, label: 'Generator' },
    { path: ROUTES.check.de, label: 'Selbsttest und Mini-Prüfung' },
    { path: ROUTES.audit.de, label: OPEN ? 'Automatisierte Prüfung 149 €' : 'Audit 149 € (bald)' },
    { path: ROUTES.sources.de, label: 'Quellen und Anwendungsbereich' },
  ],
  en: [
    { path: ROUTES.home.en, label: 'Generator' },
    { path: ROUTES.check.en, label: 'Self-check and mini-test' },
    { path: ROUTES.audit.en, label: OPEN ? 'Automated audit €149' : 'Audit €149 (coming soon)' },
    { path: ROUTES.sources.en, label: 'Sources and scope' },
  ],
};

export const CHROME = {
  fr: {
    skip: 'Aller au contenu',
    navLabel: 'Navigation principale',
    langLabel: 'Langue',
    disclaimer:
      '<strong>Information uniquement.</strong> Cet outil aide à rédiger des documents à partir de vos réponses. Il ne constitue ni un conseil juridique, ni un audit, ni une attestation de conformité.',
    product: 'Un produit de READ FRANCE SAS',
    noTracking: OPEN ? 'Aucun cookie, aucun traceur. Le générateur et le mini-test n’envoient aucune donnée.' : 'Aucun cookie, aucun traceur, aucune donnée envoyée.',
    footerLinks: [
      { path: ROUTES.legal.fr, label: 'Mentions légales' },
      { path: ROUTES.privacy.fr, label: 'Confidentialité' },
      ...(OPEN ? [{ path: ROUTES.cgvPro.fr, label: 'CGV (audit)' }] : []),
      { path: ROUTES.sources.fr, label: 'Sources officielles' },
      { path: `${SITE.repo}/releases`, label: 'Modèles gratuits (GitHub)', external: true },
      { path: SITE.repo, label: 'Code source', external: true },
    ],
  },
  de: {
    skip: 'Zum Inhalt springen',
    navLabel: 'Hauptnavigation',
    langLabel: 'Sprache',
    disclaimer:
      '<strong>Nur zur Information.</strong> Dieses Werkzeug hilft, Dokumente aus Ihren Angaben zu erstellen. Es ist keine Rechtsberatung, keine Prüfung und keine Konformitätsbescheinigung.',
    product: 'Ein Produkt der READ FRANCE SAS',
    noTracking: OPEN ? 'Keine Cookies, kein Tracking. Generator und Mini-Prüfung senden keine Daten.' : 'Keine Cookies, kein Tracking, keine Datenübertragung.',
    footerLinks: [
      { path: ROUTES.legal.de, label: 'Impressum' },
      { path: ROUTES.privacy.de, label: 'Datenschutz' },
      { path: ROUTES.sources.de, label: 'Amtliche Quellen' },
      { path: `${SITE.repo}/releases`, label: 'Kostenlose Vorlagen (GitHub)', external: true },
      { path: SITE.repo, label: 'Quellcode', external: true },
    ],
  },
  en: {
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    langLabel: 'Language',
    disclaimer:
      '<strong>Information only.</strong> This tool helps you draft documents from your own answers. It is not legal advice, not an audit and not a certificate of conformity.',
    product: 'A product of READ FRANCE SAS',
    noTracking: OPEN ? 'No cookies, no tracking. The generator and the mini-test send no data.' : 'No cookies, no tracking, no data sent anywhere.',
    footerLinks: [
      { path: ROUTES.legal.en, label: 'Legal notice' },
      { path: ROUTES.privacy.en, label: 'Privacy' },
      { path: ROUTES.sources.en, label: 'Official sources' },
      { path: `${SITE.repo}/releases`, label: 'Free templates (GitHub)', external: true },
      { path: SITE.repo, label: 'Source code', external: true },
    ],
  },
};
