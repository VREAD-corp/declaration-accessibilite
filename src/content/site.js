import { fileURLToPath } from 'node:url';
import { loadSalesConfig, prices } from '../../scripts/checkout-pages.mjs';

/** sales.config.json (SALES_OPEN gate of the paid audit; SALES_CONFIG overrides the path for test builds). */
export const SALES = loadSalesConfig(fileURLToPath(new URL('../..', import.meta.url)));
export const OPEN = SALES.SALES_OPEN === true;
export const PRICE = prices(SALES);

export const SITE = {
  brand: 'A11y Kit',
  // SITE_ORIGIN / SITE_BASE: a move to a custom domain needs no code change.
  // Since 2026-10-16 the site is served at the root of accessibilite.jalonel.com (brand Jalonel, READ FRANCE SAS).
  origin: process.env.SITE_ORIGIN || 'https://accessibilite.jalonel.com',
  base: process.env.SITE_BASE || '/',
  repo: 'https://github.com/VREAD-corp/declaration-accessibilite',
  updated: '2026-10-11',
};

/** Behaviour counters + A/B framework (cro.js, verbatim copy of VREAD-corp/octave-checkout gas/web/jalonel/cro.js): same
 * France backend as mesure.js (octave-checkout Apps Script). Primary CTAs = the non-secondary .btn buttons/links. */
export const CRO = {
  site: 'declaration-accessibilite',
  api: 'https://script.google.com/macros/s/AKfycbzD1IRL8QALluKGZxgGiORFP6-DkC_qFJYR9aOxZiimxa06nbCqpzUI-9iLblp6V2VY/exec',
  hosts: 'accessibilite.jalonel.com',
  cta: '[data-cta],.btn:not(.secondary)',
};

export const RELEASE_DL = `${SITE.repo}/releases/latest/download/`;
export const ISSUES = `${SITE.repo}/issues`;
/** Public contact (replaces GitHub issues as the contact channel). */
export const CONTACT = 'contact@jalonel.com';
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
  // Guide pages (2026-10-17). One language each: different legal regimes, so no hreflang between them.
  modele: { fr: '/modele-declaration-accessibilite/' },
  prix: { fr: '/prix-audit-accessibilite/' },
  boutique: { fr: '/obligations-boutique-en-ligne/' },
  muster: { de: '/de/muster-barrierefreiheitserklaerung/' },
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
    { path: ROUTES.audit.de, label: OPEN ? 'Audit (nur Firmen in FR)' : 'Audit 149 € (bald)' },
    { path: ROUTES.sources.de, label: 'Pflichten und Quellen' },
  ],
  en: [
    { path: ROUTES.home.en, label: 'Generator' },
    { path: ROUTES.check.en, label: 'Free mini-test' },
    { path: ROUTES.audit.en, label: OPEN ? 'Audit (France only)' : 'Audit €149 (coming soon)' },
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
    product: 'Une marque Jalonel',
    brandUrl: 'https://jalonel.com/',
    noTracking: OPEN ? 'Mesure d’audience et de navigation anonyme, agrégée par jour, sans cookie ni donnée personnelle. Le générateur et le mini-test n’envoient rien de ce que vous saisissez.' : 'Mesure d’audience et de navigation anonyme, agrégée par jour, sans cookie ni donnée personnelle ; rien de ce que vous saisissez n’est envoyé.',
    footerLinks: [
      { path: ROUTES.legal.fr, label: 'Mentions légales' },
      { path: ROUTES.privacy.fr, label: 'Confidentialité' },
      ...(OPEN ? [{ path: ROUTES.cgvPro.fr, label: 'CGV (audit)' }] : []),
      { path: ROUTES.sources.fr, label: 'Sources officielles' },
      { path: ROUTES.modele.fr, label: 'Modèle de déclaration' },
      { path: ROUTES.boutique.fr, label: 'Obligations d’une boutique en ligne' },
      { path: ROUTES.prix.fr, label: 'Prix d’un audit' },
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
    product: 'Eine Marke von Jalonel',
    brandUrl: 'https://jalonel.com/en/',
    noTracking: OPEN ? 'Anonyme, tageweise zusammengefasste Reichweiten- und Nutzungsmessung, ohne Cookies und ohne personenbezogene Daten. Generator und Mini-Prüfung senden nichts von Ihren Eingaben.' : 'Anonyme, tageweise zusammengefasste Reichweiten- und Nutzungsmessung, ohne Cookies und ohne personenbezogene Daten; Ihre Eingaben werden nicht übertragen.',
    footerLinks: [
      { path: ROUTES.legal.de, label: 'Impressum' },
      { path: ROUTES.privacy.de, label: 'Datenschutz' },
      { path: ROUTES.sources.de, label: 'Amtliche Quellen' },
      { path: ROUTES.muster.de, label: 'Muster Barrierefreiheitserklärung' },
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
    product: 'A Jalonel brand',
    brandUrl: 'https://jalonel.com/en/',
    noTracking: OPEN ? 'Anonymous audience and usage measurement, aggregated per day, with no cookies and no personal data. The generator and the mini-test send nothing you type.' : 'Anonymous audience and usage measurement, aggregated per day, with no cookies and no personal data; nothing you type is sent anywhere.',
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
