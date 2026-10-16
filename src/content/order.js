// Paid « audit automatisé partiel » (octave-pay-gas): offer pages while SALES_OPEN is true, the order
// page (commander.html), the Stripe return page (commande.html) and the B2B terms (cgv-pro.html).
// CGV drafted by Octave (assistant IA de READ FRANCE SAS) on 12 October 2026, updated on 13 October 2026 for
// « paiement par virement sur devis » (vread-revenue-lab legal/REVUE-CGV-VIREMENT.md §3, Audit variants):
// NOT legal advice, to be reviewed by a lawyer. The audit is automated and partial: never an RGAA conformity audit, never a rate.
import { SITE, SALES, PRICE, ROUTES, RELEASE_DL } from './site.js';
import { url, ogImage } from './layout.js';
import { orderFormHtml, orderPageBody, checkoutCsp, orderCsp, payButtonText } from '../../scripts/checkout-pages.mjs';

// Audit CGV version: id sent with every order / quote (checkout-config.js termsVersion; the octave-pay-gas
// CATALOG entry a11y-audit-20 must carry the same id) and date shown on the CGV, the audit page and both
// checkboxes of commander.html.
export const AUDIT_TERMS_VERSION = 'cgv-pro-audit-2026-10-13';
export const AUDIT_TERMS_DATE = '13 octobre 2026';
// « Commander » button ({prix} = the price: « Payer 149 € et commander l’audit »).
export const AUDIT_PAY_LABEL = 'Payer {prix} et commander l’audit';
export const MAX_PAGES = 20;
const PRODUCT_NAME = 'Audit automatisé partiel d’accessibilité – jusqu’à 20 pages';

const SELLER = {
  name: 'READ FRANCE SAS',
  form: 'société par actions simplifiée (SAS)',
  capital: '1 000 €',
  address: '11 rue Rouvet, 75019 Paris, France',
  siren: '988 741 773',
  rcs: 'RCS Paris 988 741 773',
  president: 'Tanguy Warsmann',
};

const sample = (lang) =>
  ({ fr: 'exemple-rapport-audit-automatise-fr.html', de: 'beispiel-bericht-automatisierte-pruefung-de.html', en: 'sample-report-automated-audit-en.html' })[lang];

export const auditOpenBodies = {
  fr: `<section class="hero" data-section="hero">
<p><span class="status-pill">Disponible – commande en ligne</span></p>
<h1>Audit automatisé partiel d’accessibilité : ${PRICE.ttc} net</h1>
<p class="lead">Un rapport PDF clair sur les problèmes d’accessibilité qu’un robot peut détecter sur <strong>jusqu’à ${MAX_PAGES} pages</strong> de votre site, envoyé par e-mail <strong>sous 24 h ouvrées</strong>. C’est une analyse <strong>automatisée et partielle</strong> : ce n’est pas un audit de conformité RGAA et elle ne donne aucun taux de conformité.</p>
<p class="price">${PRICE.ttc} net <span class="hint">(TVA non applicable, art. 293 B du CGI) – réservé aux professionnels immatriculés en France (SIREN)</span></p>
<p><a class="btn" href="${url(ROUTES.order.fr)}">Commander l’audit</a></p>
</section>
<h2>Ce que comprend l’audit</h2>
<ul>
<li><strong>Jusqu’à ${MAX_PAGES} pages publiques</strong> de votre site : celles que vous indiquez, ou à défaut celles trouvées en suivant les liens depuis l’adresse du site (même domaine uniquement, fichier robots.txt respecté).</li>
<li><strong>Deux tailles d’écran</strong> : ordinateur (1 280 px) et mobile (390 px).</li>
<li>Analyse par le moteur open source <strong>axe-core 4.13</strong> (règles WCAG 2.0, 2.1 et 2.2, niveaux A et AA), dans un navigateur Chromium.</li>
<li>Un <strong>rapport PDF</strong> en français, allemand ou anglais : problèmes détectés classés par gravité, critères WCAG et correspondances RGAA indicatives, éléments concernés (sélecteur et extrait de code), pages touchées, statut HTTP, défilement horizontal sur mobile, points « à vérifier » que l’outil n’a pas pu trancher, captures d’écran.</li>
<li>La <strong>liste des 20 vérifications manuelles</strong> que l’automate ne peut pas faire, à réaliser vous-même ou à confier à un auditeur.</li>
<li><strong>Livraison par e-mail sous 24 h ouvrées</strong> après le paiement, avec la facture acquittée.</li>
</ul>
<h2>Ce que l’audit ne comprend pas</h2>
<ul>
<li><strong>Ce n’est pas un audit de conformité RGAA</strong> (ni WCAG / EN 301 549). Les tests automatiques ne repèrent qu’une partie des défauts ; un audit RGAA complet porte sur 106 critères vérifiés à la main.</li>
<li><strong>Aucun taux de conformité</strong>, aucune attestation, aucun label, aucun certificat.</li>
<li>Pas de relecture humaine du rapport avant l’envoi, pas de conseil juridique, pas de correction de votre site, pas de « widget » ou surcouche d’accessibilité.</li>
<li>Pas de pages nécessitant une connexion, ni de paiement réel.</li>
</ul>
<h2>Avant de commander</h2>
<ul>
<li>Vous devez être <strong>titulaire du site ou autorisé par son titulaire</strong> à le faire analyser : vous l’attestez à la commande.</li>
<li>Vente réservée aux professionnels (entreprises immatriculées en France, SIREN obligatoire). <a href="${url(ROUTES.cgvPro.fr)}">Conditions générales de vente</a> (version du ${AUDIT_TERMS_DATE}).</li>
</ul>
<h2>Voir un exemple</h2>
<p>Un <a href="${RELEASE_DL}${sample('fr')}">exemple de rapport</a> (page de démonstration volontairement défectueuse) est téléchargeable gratuitement.</p>
<p>Pour rédiger votre déclaration d’accessibilité, le <a href="${url(ROUTES.home.fr)}">générateur</a> reste gratuit, comme l’<a href="${url(ROUTES.check.fr)}">auto-contrôle et le mini-test</a>.</p>`,
  de: `<section class="hero" data-section="hero">
<p><span class="status-pill">Verfügbar für Unternehmen mit Sitz in Frankreich</span></p>
<h1>Automatisierte Teilprüfung der Barrierefreiheit: 149 € netto</h1>
<p class="lead">Ein PDF-Bericht über die Barrieren, die ein Prüfautomat auf <strong>bis zu ${MAX_PAGES} Seiten</strong> Ihrer Website finden kann, per E-Mail <strong>innerhalb von 24 Arbeitsstunden</strong>. Es ist eine <strong>automatisierte Teilprüfung</strong>: keine Konformitätsprüfung und kein Konformitätsgrad.</p>
<p class="price">149 € netto <span class="hint">(keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI) – nur für in Frankreich eingetragene Unternehmen (SIREN-Nummer)</span></p>
<p>Die Bestellung erfolgt auf Französisch; der Bericht kann auf Deutsch erstellt werden. <a class="btn" href="${url(ROUTES.order.fr)}" hreflang="fr" lang="fr">Commander l’audit</a></p>
</section>
<h2>Inhalt</h2>
<ul>
<li><strong>Bis zu ${MAX_PAGES} öffentliche Seiten</strong>: von Ihnen angegeben oder automatisch über Links der Startadresse gefunden (nur dieselbe Domain, robots.txt wird beachtet).</li>
<li>Desktop (1.280 px) und Mobil (390 px), Engine <strong>axe-core 4.13</strong> (WCAG 2.0, 2.1, 2.2, Stufen A und AA).</li>
<li>Ein <strong>PDF-Bericht</strong> (Deutsch, Französisch oder Englisch): Probleme nach Schweregrad, WCAG-Kriterien, betroffene Elemente und Seiten, „zu prüfende“ Punkte, Screenshots, Liste der manuellen Prüfungen.</li>
</ul>
<h2>Nicht enthalten</h2>
<ul>
<li><strong>Keine Konformitätsprüfung</strong> (weder RGAA noch WCAG/EN 301 549), <strong>kein Konformitätsgrad</strong>, kein Zertifikat, kein Siegel.</li>
<li>Keine menschliche Durchsicht vor Versand, keine Rechtsberatung, keine Behebung, kein Overlay-Widget, keine Seiten hinter einem Login.</li>
</ul>
<h2>Beispiel ansehen</h2>
<p>Ein <a href="${RELEASE_DL}${sample('de')}">Beispielbericht</a> (absichtlich fehlerhafte Demo-Seite) steht kostenlos zum Download bereit.</p>`,
  en: `<section class="hero" data-section="hero">
<p><span class="status-pill">Available to companies registered in France</span></p>
<h1>Partial automated accessibility audit: €149 net</h1>
<p class="lead">A PDF report on the accessibility issues an automated engine can detect on <strong>up to ${MAX_PAGES} pages</strong> of your website, e-mailed <strong>within 24 business hours</strong>. It is an <strong>automated, partial</strong> analysis: not a conformance audit, and it gives no conformance rate.</p>
<p class="price">€149 net <span class="hint">(VAT not applicable, art. 293 B of the French tax code) – companies registered in France only (SIREN number)</span></p>
<p>Ordering is in French; the report can be written in English. <a class="btn" href="${url(ROUTES.order.fr)}" hreflang="fr" lang="fr">Commander l’audit</a></p>
</section>
<h2>What it includes</h2>
<ul>
<li><strong>Up to ${MAX_PAGES} public pages</strong>: the ones you list, or those found by following links from the site address (same domain only, robots.txt respected).</li>
<li>Desktop (1,280 px) and mobile (390 px), <strong>axe-core 4.13</strong> engine (WCAG 2.0, 2.1, 2.2, levels A and AA).</li>
<li>A <strong>PDF report</strong> (English, French or German): issues by severity, WCAG criteria, affected elements and pages, “needs review” items, screenshots, the list of manual checks.</li>
</ul>
<h2>What it does not include</h2>
<ul>
<li><strong>Not a conformance audit</strong> (RGAA, WCAG or EN 301 549), <strong>no conformance rate</strong>, certificate or badge.</li>
<li>No human review before delivery, no legal advice, no fixing, no overlay widget, no pages behind a login.</li>
</ul>
<h2>See an example</h2>
<p>A <a href="${RELEASE_DL}${sample('en')}">sample report</a> (deliberately flawed demo page) is free to download.</p>`,
};

export const AUDIT_META_OPEN = {
  fr: ['Audit d’accessibilité automatisé : 20 pages, 149 € (RGAA)', `Audit d’accessibilité automatisé et partiel (RGAA, EAA) de 20 pages, rapport PDF sous 24 h ouvrées. ${PRICE.ttc} net, TVA non applicable, art. 293 B du CGI.`],
  de: ['Automatisiertes Barrierefreiheits-Audit (nur Firmen in FR)', 'Automatisierte Teilprüfung, bis 20 Seiten, PDF in 24 Arbeitsstunden. 149 € netto, keine USt. ausgewiesen (Art. 293 B CGI). Nur Firmen in Frankreich.'],
  en: ['Automated accessibility audit for companies in France', 'Partial automated audit of up to 20 pages, PDF in 24 business hours. €149 net, VAT not applicable (art. 293 B CGI). Companies registered in France only.'],
};

/** Reference to the publisher entity defined once on the hub (https://outils.vread.fr/), never duplicated here. */
export const ORG_REF = { '@type': 'Organization', '@id': 'https://outils.vread.fr/#org', name: 'READ FRANCE SAS' };

const AUDIT_LD_TEXT = {
  fr: ['Audit automatisé partiel d’accessibilité (jusqu’à 20 pages)', 'Rapport PDF d’une analyse automatisée et partielle (moteur axe-core, règles WCAG A et AA, ordinateur et mobile) de jusqu’à 20 pages publiques, avec correspondances RGAA indicatives et liste des vérifications manuelles, envoyé sous 24 h ouvrées. Ce n’est pas un audit de conformité RGAA, WCAG ou EAA et il ne donne aucun taux de conformité.'],
  de: ['Automatisierte Teilprüfung der Barrierefreiheit (bis zu 20 Seiten)', 'PDF-Bericht einer automatisierten Teilprüfung (axe-core, WCAG-Regeln A und AA, Desktop und Mobil) von bis zu 20 öffentlichen Seiten mit Liste der manuellen Prüfungen, Lieferung innerhalb von 24 Arbeitsstunden. Keine Konformitätsprüfung nach BFSG, EAA oder WCAG und kein Konformitätsgrad.'],
  en: ['Partial automated accessibility audit (up to 20 pages)', 'PDF report of an automated, partial scan (axe-core engine, WCAG A and AA rules, desktop and mobile) of up to 20 public pages, with the list of manual checks, delivered within 24 business hours. Not a conformance audit (EAA, WCAG or RGAA) and no conformance rate.'],
};

/** JSON-LD of the audit landing pages (only built while SALES_OPEN is true): seller + Product with its Offer. */
export function auditJsonLd(lang) {
  const [name, description] = AUDIT_LD_TEXT[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name,
        description,
        url: SITE.origin + url(ROUTES.audit[lang]),
        image: ogImage(lang),
        brand: { '@type': 'Brand', name: SITE.brand },
        sku: 'a11y-audit-auto',
        offers: {
          '@type': 'Offer',
          price: (SALES.amount / 100).toFixed(2),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: SITE.origin + url(ROUTES.order.fr),
          seller: { '@id': ORG_REF['@id'] },
          // PDF report e-mailed within 24 business hours, French businesses only; B2B sale, no withdrawal right (CGV art. 8).
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
              transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'FR',
            returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
            merchantReturnLink: SITE.origin + url(ROUTES.cgvPro.fr),
          },
        },
      },
    ],
  };
}

// Order fields (data-octave-extra, sent by pay.js / devis.js in body.extra). `sfx`: id suffix, '' for the card
// form, '-devis' for the quote form copy (plain inputs: audit-order.js only binds the card form; the server
// checks the fields again for both).
const extraFieldsHtml = (sfx = '') => `  <fieldset class="field-group"><legend>Site à analyser</legend>
    <label class="field"><span>Adresse du site</span>
      <input type="text" name="siteUrl" data-octave-extra inputmode="url" autocomplete="url" required maxlength="300" placeholder="https://www.exemple.fr/" aria-describedby="site-help${sfx}"></label>
    <p id="site-help${sfx}" class="small muted">Point de départ de l’analyse. Pages publiques uniquement : pas de pages derrière une connexion, pas de paiement.</p>
    <label class="field"><span>Pages à analyser (facultatif : une adresse par ligne, ${MAX_PAGES} au maximum)</span>
      <textarea name="pages" data-octave-extra data-max="${MAX_PAGES}" rows="5" maxlength="6400" spellcheck="false" aria-describedby="pages-help${sfx}${sfx ? '' : ' pages-count'}"></textarea></label>
    <p id="pages-help${sfx}" class="small muted">Laissez vide pour une exploration automatique : jusqu’à ${MAX_PAGES} pages du même site trouvées en suivant les liens depuis l’adresse ci-dessus, en respectant son fichier robots.txt. Les chemins du type /panier sont acceptés.</p>
${sfx ? '' : '    <p id="pages-count" class="small muted" aria-live="polite"></p>\n'}    <label class="field"><span>Langue du rapport</span>
      <select name="reportLang" data-octave-extra><option value="fr" selected>Français</option><option value="de" lang="de">Deutsch</option><option value="en" lang="en">English</option></select></label>
  </fieldset>
`;

const afterTermsHtml = `  <label class="check"><input type="checkbox" name="scanAuthorized" data-octave-extra="bool" required>
    <span>J’atteste que l’entreprise ci-dessus est titulaire du site indiqué ou dûment autorisée par son titulaire, et j’autorise READ FRANCE SAS à analyser automatiquement ses pages publiques pour cette prestation.</span></label>
`;
const indent = (html) => html.replace(/^(?=.)/gm, '  ');

export const orderBody = `<section class="hero" data-section="hero">
<h1>Commander l’audit automatisé partiel d’accessibilité</h1>
<div class="callout"><p><strong>Analyse automatisée et partielle</strong> (moteur axe-core) de jusqu’à ${MAX_PAGES} pages : ce n’est <strong>pas un audit de conformité RGAA</strong> et le rapport ne donne <strong>aucun taux de conformité</strong>. Détail sur la page <a href="${url(ROUTES.audit.fr)}">Audit</a>.</p></div>
</section>
${orderFormHtml({
  config: SALES,
  productName: PRODUCT_NAME,
  cgvUrl: url(ROUTES.cgvPro.fr),
  intro: 'Vente réservée aux professionnels (entreprises immatriculées en France, SIREN obligatoire). Le rapport PDF et la facture acquittée sont envoyés par e-mail sous 24 h ouvrées après le paiement.',
  emailLabel: 'E-mail professionnel (réception du rapport et de la facture)',
  extraFieldsHtml: extraFieldsHtml(),
  afterTermsHtml,
  // quote form copy (shared devisFormHtml has no after-terms slot: the attestation follows the site fields)
  devisExtraFieldsHtml: indent(extraFieldsHtml('-devis') + afterTermsHtml.replace('l’entreprise ci-dessus', 'l’entreprise indiquée ci-dessous')),
  payLabel: AUDIT_PAY_LABEL,
  termsDate: AUDIT_TERMS_DATE,
}).replace('<section class="checkout"', '<section class="checkout" data-section="commande"')}`;

export const orderScripts = `<script src="${url('assets/checkout/checkout-config.js')}"></script>
<script src="https://js.stripe.com/v3/"></script>
<script src="${url('assets/checkout/pay.js')}"></script>
${SALES.quotesEnabled === true ? `<script src="${url('assets/checkout/devis.js')}"></script>\n` : ''}<script src="${url('assets/checkout/audit-order.js')}"></script>
`;

export const orderReturnBody = orderPageBody();
export const orderReturnScripts = `<script src="${url('assets/checkout/checkout-config.js')}"></script>
<script src="${url('assets/checkout/order.js')}"></script>
`;
export const ORDER_CSP = SALES.SALES_OPEN ? checkoutCsp(SALES) : '';
export const ORDER_RETURN_CSP = SALES.SALES_OPEN ? orderCsp(SALES) : '';

export const cgvProBody = `<!--
  CGV B2B rédigées par Octave (assistant IA de READ FRANCE SAS) le 12 octobre 2026, mises à jour le 13 octobre 2026
  (paiement par virement sur devis, d'après la revue REVUE-CGV-VIREMENT.md ; articles 2, 5, 6, 7, 11, 12 et 14),
  publiées le 16 octobre 2026 avec l'accord du dirigeant. CE N'EST PAS UN CONSEIL JURIDIQUE : une relecture par un
  avocat ou un juriste reste recommandée.
-->
<div class="legal-text">
<h1>Conditions générales de vente aux professionnels – audit automatisé partiel d’accessibilité</h1>
<p class="hint">Version du ${AUDIT_TERMS_DATE} (référence ${AUDIT_TERMS_VERSION}).</p>
<h2>1. Vendeur</h2>
<p>${SELLER.name}, ${SELLER.form} au capital de ${SELLER.capital}, dont le siège social est situé ${SELLER.address}, immatriculée sous le numéro SIREN ${SELLER.siren} (${SELLER.rcs}), bénéficiant de la franchise en base de TVA (TVA non applicable, art. 293 B du CGI), représentée par ${SELLER.president}, président (ci-après « le Vendeur »). Contact : en répondant à l’e-mail de confirmation de commande. Voir aussi les <a href="${url(ROUTES.legal.fr)}">mentions légales</a>.</p>
<h2>2. Champ d’application et acceptation</h2>
<p>Les présentes conditions générales de vente (« CGV ») s’appliquent exclusivement à la prestation « ${PRODUCT_NAME} » (la « Prestation ») commandée en ligne par un <strong>professionnel</strong> (l’« Acheteur ») : une entreprise immatriculée en France, identifiée par son numéro SIREN, qui commande pour les besoins de son activité. La Prestation n’est pas proposée aux consommateurs.</p>
<p>La personne qui commande déclare agir au nom et pour le compte de l’entreprise indiquée et avoir le pouvoir de l’engager. Avant de payer par carte ou de demander un devis, l’Acheteur accepte expressément les présentes CGV en cochant la case prévue ; la version acceptée est conservée avec la commande. Les CGV prévalent sur toute condition d’achat de l’Acheteur, sauf accord écrit contraire du Vendeur.</p>
<h2>3. Description de la Prestation</h2>
<p>La Prestation est une <strong>analyse automatisée et partielle</strong> de l’accessibilité de pages web publiques, réalisée avec le moteur open source axe-core (règles WCAG 2.0, 2.1 et 2.2, niveaux A et AA) dans un navigateur Chromium, sur deux tailles d’écran (1 280 px et 390 px) :</p>
<ul>
<li>au plus <strong>${MAX_PAGES} pages</strong> appartenant au site indiqué par l’Acheteur : les pages qu’il liste, ou à défaut les pages trouvées en suivant les liens depuis l’adresse du site, sur le même domaine, dans le respect du fichier robots.txt du site ;</li>
<li>la remise d’un <strong>rapport au format PDF</strong>, en français, en allemand ou en anglais au choix de l’Acheteur, décrivant les problèmes détectés automatiquement, les éléments et pages concernés, les points nécessitant une vérification manuelle et la liste des vérifications manuelles à mener.</li>
</ul>
<p>La Prestation est entièrement automatisée. <strong>Elle ne constitue pas un audit de conformité</strong> au référentiel général d’amélioration de l’accessibilité (RGAA), aux WCAG ou à la norme EN 301 549 : les tests automatiques ne détectent qu’une partie des défauts d’accessibilité. Le rapport <strong>ne donne aucun taux de conformité</strong> et ne vaut ni attestation, ni certificat, ni label, ni conseil juridique. Ne sont pas compris : la relecture humaine du rapport, la correction du site, l’analyse de pages nécessitant une connexion ou un paiement.</p>
<h2>4. Autorisation d’analyse</h2>
<p>L’Acheteur garantit qu’il est titulaire du site indiqué ou qu’il est dûment autorisé par son titulaire à en faire analyser les pages publiques, et il l’atteste en cochant la case prévue lors de la commande. Il garantit le Vendeur contre toute réclamation d’un tiers fondée sur l’absence d’une telle autorisation. Les pages sont consultées comme le ferait un visiteur, à un rythme modéré, sans tentative de contournement d’une protection. Le Vendeur peut refuser ou interrompre une analyse s’il a un doute sérieux sur l’autorisation ; il rembourse alors le prix.</p>
<h2>5. Prix</h2>
<p>Le prix est de <strong>${PRICE.sentence}</strong> par commande, payable en une fois. Le prix applicable est celui affiché sur la page de commande au moment de la validation du paiement par carte ou, en cas de paiement par virement, celui indiqué sur le devis, ferme pendant sa durée de validité de trente (30) jours (article 6) ; il figure sur la facture, qui porte la mention « TVA non applicable, art. 293 B du CGI ».</p>
<h2>6. Commande et paiement</h2>
<p>L’Acheteur renseigne sur la page « Commander » l’adresse du site et, le cas échéant, les pages à analyser, la langue du rapport, son adresse électronique, la raison sociale et le SIREN de l’entreprise, l’adresse de facturation, puis choisit son mode de paiement.</p>
<p>Le prix est payable comptant et d’avance, en une fois, au choix de l’Acheteur :</p>
<ul>
<li>par carte bancaire : l’Acheteur saisit ses données de carte dans un module sécurisé de Stripe, auxquelles le Vendeur n’a jamais accès, et valide en cliquant sur le bouton de paiement (par exemple « ${payButtonText(AUDIT_PAY_LABEL, SALES.amount)} ») ; le contrat est formé à la confirmation du paiement par Stripe ; en cas de refus du paiement, la commande n’est pas enregistrée ;</li>
<li>par virement bancaire SEPA en euros, après demande de devis sur la même page, dans les conditions ci-dessous.</li>
</ul>
<p>Les paiements sont traités par le prestataire de services de paiement Stripe (pour l’Espace économique européen : Stripe Payments Europe, Limited et Stripe Technology Europe, Limited, sociétés de droit irlandais).</p>
<p><strong>Devis.</strong> Le devis est adressé à l’Acheteur par courrier électronique. Il indique le produit, le prix, sa date de fin de validité, l’IBAN et le BIC à utiliser — un numéro de compte bancaire virtuel attribué par Stripe, dont le bénéficiaire est le Vendeur, propre à l’Acheteur et identique pour tous ses devis — et une référence propre au devis, à reporter dans le libellé du virement. Le devis constitue une offre du Vendeur, valable trente (30) jours à compter de son émission ; le prix y est ferme pendant cette durée.</p>
<p><strong>Formation du contrat.</strong> Le contrat est formé, et la commande devient ferme, à la réception par Stripe, pendant la durée de validité du devis, de l’intégralité de son montant : ce paiement vaut acceptation du devis. Les présentes CGV, acceptées lors de la demande de devis et rappelées sur celui-ci, s’appliquent au contrat. Un paiement partiel ne forme pas le contrat et ne déclenche ni la livraison ni le début du service ; l’Acheteur est informé du solde restant à virer avec la même référence. Les frais bancaires éventuels de l’Acheteur restent à sa charge : le montant reçu par Stripe doit être égal au montant du devis.</p>
<p><strong>Expiration.</strong> À défaut de paiement intégral pendant sa durée de validité, le devis devient caduc. Si le paiement reste partiel à l’expiration, le Vendeur invite l’Acheteur à le compléter ; à défaut de paiement intégral dans les trente (30) jours suivant l’expiration, les sommes reçues lui sont remboursées. Un paiement reçu après l’expiration est, au choix du Vendeur, accepté aux conditions du devis — le contrat est alors formé à l’envoi par le Vendeur de la livraison ou de la confirmation de commande — ou remboursé.</p>
<p><strong>Affectation des paiements.</strong> Le paiement est affecté au devis dont la référence figure dans le libellé du virement. À défaut de référence exploitable, il est affecté au devis en cours de l’Acheteur dont le montant correspond, le plus ancien en premier ; une somme reçue au-delà du montant d’un devis peut être affectée aux autres devis en cours de l’Acheteur. L’Acheteur, qui a demandé ces devis, accepte que cette affectation vaille paiement et acceptation du devis concerné.</p>
<p><strong>Remboursements.</strong> Toute somme reçue qui n’est pas affectée à une commande (excédent, paiement en double, paiement partiel ou tardif non accepté) est remboursée à l’Acheteur dans un délai de trente (30) jours suivant sa réception ou, pour un paiement partiel, suivant le terme prévu ci-dessus. Tout remboursement dû en application des présentes CGV est effectué par le moyen de paiement utilisé : sur la carte débitée, ou par virement sur le compte bancaire d’origine. Lorsque Stripe ne dispose pas des coordonnées bancaires de l’Acheteur, elle les lui demande par courrier électronique ; le délai court alors à compter de leur communication.</p>
<p><strong>Définition.</strong> Dans les présentes CGV, la « confirmation du paiement » désigne la confirmation par Stripe d’un paiement par carte ou la réception par Stripe de l’intégralité du montant d’un devis pendant sa durée de validité, ou, pour un paiement tardif, son acceptation par le Vendeur.</p>
<h2>7. Délai et livraison</h2>
<p>Le rapport et la facture acquittée sont envoyés à l’adresse électronique indiquée <strong>sous 24 heures ouvrées</strong> à compter de la confirmation du paiement. Les heures ouvrées s’entendent du lundi au vendredi, hors jours fériés en France : une commande passée le vendredi soir ou le week-end est livrée au plus tard le premier jour ouvré suivant. La livraison est réputée effectuée à l’envoi du courrier électronique. Lorsque le rapport est trop volumineux pour être joint, il est mis à disposition par un lien de téléchargement valable 90 jours.</p>
<p>Si le site est inaccessible ou ne peut être analysé (erreur du serveur, blocage du robot, absence de page publique), le Vendeur relance l’analyse puis prend contact avec l’Acheteur. À défaut de livraison dans les 5 jours ouvrés suivant la confirmation du paiement, l’Acheteur peut demander l’annulation de la commande et le remboursement intégral du prix.</p>
<h2>8. Absence de droit de rétractation</h2>
<p>La vente étant conclue entre professionnels, pour les besoins de l’activité de l’Acheteur, le droit de rétractation prévu par le code de la consommation <strong>ne s’applique pas</strong>.</p>
<h2>9. Usage du rapport</h2>
<p>L’Acheteur peut utiliser le rapport pour ses besoins internes et le communiquer à ses prestataires (agence web, développeurs, auditeur). Il s’interdit de le présenter comme un audit de conformité, une attestation ou un certificat, ou d’en déduire un taux de conformité. Le Vendeur reste titulaire des droits sur la présentation et les textes du rapport.</p>
<h2>10. Responsabilité</h2>
<p>Le Vendeur est tenu d’une obligation de moyens. Le rapport décrit l’état des pages analysées à la date de l’analyse ; il ne garantit ni la conformité du site à une norme ou à une obligation légale, ni l’absence de réclamation ou de sanction. La responsabilité du Vendeur ne peut être engagée qu’en cas de faute prouvée et pour les seuls dommages directs ; elle est en tout état de cause <strong>limitée au prix payé</strong> pour la commande concernée. Ces limitations ne s’appliquent pas en cas de faute lourde ou dolosive.</p>
<h2>11. Facturation et pénalités de retard</h2>
<p>Une facture conforme à l’article L441-9 du code de commerce et à l’article 242 nonies A de l’annexe II du code général des impôts est établie pour chaque commande et envoyée en PDF par courrier électronique à la livraison du rapport, avec celui-ci. À compter de la date à laquelle le Vendeur y sera tenu, la facture est émise et transmise sous forme électronique dans les conditions prévues par la réglementation sur la facturation électronique. L’Acheteur garantit l’exactitude des données de facturation qu’il fournit.</p>
<p>Le prix est payable comptant et d’avance, en une fois : à la commande en cas de paiement par carte, pendant la durée de validité du devis en cas de paiement par virement (article 6). La facture, établie à la livraison du rapport, est acquittée. Escompte pour paiement anticipé : néant.</p>
<p>Conformément à l’article L441-10 du code de commerce, toute somme non payée à son échéance entraîne de plein droit, sans rappel préalable, des <strong>pénalités de retard au taux égal à trois fois le taux d’intérêt légal</strong>, ainsi qu’une <strong>indemnité forfaitaire pour frais de recouvrement de 40 €</strong> (article D441-5 du code de commerce), sans préjudice d’une indemnisation complémentaire sur justificatifs si les frais de recouvrement exposés sont supérieurs.</p>
<h2>12. Données personnelles</h2>
<p>Le Vendeur, responsable de traitement, traite les données fournies lors de la demande de devis ou de la commande (adresse électronique, raison sociale, SIREN, adresse de facturation, référence interne éventuelle, adresse du site et des pages à analyser, données de commande et de paiement, à l’exclusion des données de carte, traitées par Stripe). En cas de paiement par virement, il traite également les données que la banque de l’Acheteur transmet avec le virement et que Stripe lui communique : nom du titulaire du compte émetteur, BIC, quatre derniers chiffres de l’IBAN, date, montant et libellé du virement.</p>
<p>Ces données servent à établir et suivre le devis, exécuter la Prestation, établir la facture, effectuer les remboursements, tenir la comptabilité et prévenir la fraude. Bases légales : mesures précontractuelles et exécution du contrat ; obligations légales (comptables et fiscales).</p>
<p>Destinataires : Stripe (paiement par carte ; pour le virement, attribution du numéro de compte virtuel, réception et rapprochement des fonds, remboursements), qui traite aussi certaines de ces données pour son propre compte, notamment pour la prévention de la fraude et la lutte contre le blanchiment, selon sa politique de confidentialité ; Google (envoi des courriers électroniques, tenue du registre des devis, des commandes et des factures et stockage des rapports, au moyen de Google Apps Script, Gmail, Sheets et Drive) ; GitHub (exécution de l’analyse dans un dépôt privé, GitHub Actions) ; et le cas échéant l’expert-comptable du Vendeur. Ces prestataires peuvent traiter des données hors de l’Union européenne, dans le cadre des garanties prévues par le RGPD (décision d’adéquation ou clauses contractuelles types).</p>
<p>Durées : factures et pièces comptables, y compris les données du virement qui s’y rapportent, 10 ans (article L123-22 du code de commerce) ; autres données de commande, 5 ans après la commande ; adresses analysées et rapport, <strong>90 jours après la livraison</strong> ; devis non suivis de commande, 1 an après leur expiration.</p>
<p>Toute personne concernée dispose de droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité, qu’elle exerce auprès du Vendeur (contact ci-dessus) ; elle peut introduire une réclamation auprès de la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>. Voir aussi la <a href="${url(ROUTES.privacy.fr)}">politique de confidentialité</a>.</p>
<h2>13. Droit applicable et juridiction</h2>
<p>Les présentes CGV sont soumises au <strong>droit français</strong>. Les parties recherchent d’abord une solution amiable. À défaut, tout litige relève de la <strong>compétence exclusive des tribunaux de Paris</strong>.</p>
<h2>14. Dispositions diverses</h2>
<p>Le Vendeur peut modifier les présentes CGV ; la version applicable est celle acceptée par l’Acheteur lors de sa commande ou de sa demande de devis, rappelée sur le devis. Si une clause est déclarée nulle, les autres demeurent applicables.</p>
<p class="hint">Version du ${AUDIT_TERMS_DATE}.</p>
</div>`;

export const privacyOrderSection = {
  fr: `<h2>Commande de l’audit automatisé</h2>
<p>Lorsque vous commandez l’<a href="${url(ROUTES.audit.fr)}">audit automatisé partiel</a> ou en demandez un devis, et seulement dans ces cas, READ FRANCE SAS (responsable de traitement) reçoit les données saisies sur la page de commande : adresse électronique, raison sociale, SIREN, adresse de facturation, référence interne éventuelle, adresse du site et des pages à analyser, langue du rapport. En cas de paiement par virement, elle reçoit aussi, par l’intermédiaire de Stripe, les données que votre banque transmet avec le virement : nom du titulaire du compte émetteur, BIC, quatre derniers chiffres de l’IBAN, date, montant et libellé du virement. Ces données servent à établir et suivre le devis, réaliser l’analyse, envoyer le rapport et la facture, effectuer les remboursements, tenir la comptabilité et prévenir la fraude (mesures précontractuelles et exécution du contrat ; obligations légales comptables et fiscales).</p>
<ul>
<li>Destinataires : Stripe (paiement par carte, les données de carte étant saisies chez Stripe et ne nous parvenant jamais ; pour le virement, numéro de compte virtuel, réception et rapprochement des fonds, remboursements), qui traite aussi certaines données pour son propre compte (prévention de la fraude, lutte contre le blanchiment) ; Google (Apps Script, Gmail, Sheets et Drive : registre des devis et des commandes, envoi des e-mails, stockage du rapport) ; GitHub (exécution de l’analyse dans un dépôt privé). Transferts hors UE encadrés par les garanties du RGPD.</li>
<li>Durées : adresses analysées et rapport supprimés 90 jours après la livraison ; factures et pièces comptables, y compris les données du virement qui s’y rapportent, conservées 10 ans ; autres données de commande 5 ans ; devis non suivis de commande, 1 an après leur expiration.</li>
<li>Vos droits (accès, rectification, effacement, limitation, opposition, portabilité) s’exercent en répondant à l’e-mail de commande ; réclamation possible auprès de la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>.</li>
<li>La page de commande charge le module de paiement de Stripe (js.stripe.com), qui peut déposer des cookies nécessaires à la sécurité du paiement. Aucun autre cookie ni traceur.</li>
</ul>`,
  de: `<h2>Bestellung der automatisierten Prüfung</h2>
<p>Nur wenn Sie die kostenpflichtige automatisierte Prüfung bestellen (für Unternehmen mit Sitz in Frankreich), verarbeitet die READ FRANCE SAS die Bestelldaten (E-Mail, Firma, SIREN, Rechnungsadresse, zu prüfende Adressen) zur Vertragserfüllung. Bei Zahlung per Überweisung (auf Angebot) erhält sie über Stripe zudem die Überweisungsdaten (Name des Kontoinhabers, BIC, letzte vier Ziffern der IBAN, Datum, Betrag, Verwendungszweck). Empfänger: Stripe (Zahlung), Google (E-Mail, Register, Speicherung des Berichts), GitHub (Durchführung der Prüfung in einem privaten Repository). Prüfadressen und Bericht werden 90 Tage nach Lieferung gelöscht, Rechnungen samt zugehörigen Überweisungsdaten 10 Jahre aufbewahrt, nicht angenommene Angebote 1 Jahr nach Ablauf gelöscht. Einzelheiten auf der französischen Seite.</p>`,
  en: `<h2>Ordering the automated audit</h2>
<p>Only when you order the paid automated audit (companies registered in France), READ FRANCE SAS processes the order data (e-mail, company, SIREN, billing address, URLs to scan) to perform the contract. When paying by bank transfer (on quote), it also receives through Stripe the transfer data (account holder name, BIC, last four IBAN digits, date, amount, reference). Recipients: Stripe (payment), Google (e-mail, register, report storage), GitHub (runs the scan in a private repository). Scanned URLs and the report are deleted 90 days after delivery; invoices, with the related transfer data, are kept 10 years; quotes not taken up are deleted 1 year after they expire. Details on the French page.</p>`,
};

export const cgvDraftReplaced = `<div class="legal-text">
<h1>Conditions générales de vente</h1>
<p>L’ancien projet de conditions publié sur cette page est remplacé, depuis le 12 octobre 2026, par les <a href="${url(ROUTES.cgvPro.fr)}">conditions générales de vente aux professionnels de l’audit automatisé partiel</a> (version en vigueur : ${AUDIT_TERMS_DATE}).</p>
</div>`;

export { SITE };
