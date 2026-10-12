// Paid « audit automatisé partiel » (octave-pay-gas): offer pages while SALES_OPEN is true, the order
// page (commander.html), the Stripe return page (commande.html) and the B2B terms (cgv-pro.html).
// CGV drafted by Octave (assistant IA de READ FRANCE SAS) on 12 October 2026: NOT legal advice, to be
// reviewed by a lawyer. The audit is automated and partial: never an RGAA conformity audit, never a rate.
import { SITE, SALES, PRICE, ROUTES, RELEASE_DL } from './site.js';
import { url } from './layout.js';
import { orderFormHtml, orderPageBody, checkoutCsp, orderCsp, payButtonText, TERMS_DATE } from '../../scripts/checkout-pages.mjs';

export const AUDIT_TERMS_VERSION = 'cgv-pro-audit-2026-10-12';
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
  fr: `<section class="hero">
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
<li>Vente réservée aux professionnels (entreprises immatriculées en France, SIREN obligatoire). <a href="${url(ROUTES.cgvPro.fr)}">Conditions générales de vente</a> (version du ${TERMS_DATE}).</li>
</ul>
<h2>Voir un exemple</h2>
<p>Un <a href="${RELEASE_DL}${sample('fr')}">exemple de rapport</a> (page de démonstration volontairement défectueuse) est téléchargeable gratuitement.</p>
<p>Pour rédiger votre déclaration d’accessibilité, le <a href="${url(ROUTES.home.fr)}">générateur</a> reste gratuit, comme l’<a href="${url(ROUTES.check.fr)}">auto-contrôle et le mini-test</a>.</p>`,
  de: `<section class="hero">
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
  en: `<section class="hero">
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
  fr: ['Audit accessibilité automatique EAA et RGAA (partiel) – 20 pages', `Analyse axe-core jusqu’à 20 pages (EAA, RGAA), rapport PDF sous 24 h ouvrées. ${PRICE.ttc} net, TVA non applicable, art. 293 B du CGI. Pas un audit de conformité.`],
  de: ['Automatisierte Barrierefreiheitsprüfung BFSG/EAA – Teilprüfung', 'axe-core-Teilprüfung, bis 20 Seiten, PDF in 24 Arbeitsstunden. 149 € netto, keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI. Keine Konformitätsprüfung.'],
  en: ['Automated accessibility audit for the EAA (partial) – 20 pages', 'Partial axe-core scan of up to 20 pages, PDF in 24 business hours. €149 net, VAT not applicable, art. 293 B of the French tax code. Not a conformance audit.'],
};

/** schema.org publisher of the site (same @id on every page that declares it). */
export const ORG_JSONLD = {
  '@type': 'Organization',
  '@id': 'https://outils.vread.fr/#org',
  name: 'READ FRANCE SAS',
  legalName: 'READ FRANCE',
  url: 'https://outils.vread.fr/',
  address: { '@type': 'PostalAddress', streetAddress: '11 rue Rouvet', postalCode: '75019', addressLocality: 'Paris', addressCountry: 'FR' },
  identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '988741773' },
};

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
      ORG_JSONLD,
      {
        '@type': 'Product',
        name,
        description,
        url: SITE.origin + url(ROUTES.audit[lang]),
        brand: { '@type': 'Brand', name: SITE.brand },
        sku: 'a11y-audit-auto',
        offers: {
          '@type': 'Offer',
          price: (SALES.amount / 100).toFixed(2),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: SITE.origin + url(ROUTES.order.fr),
          seller: { '@id': ORG_JSONLD['@id'] },
        },
      },
    ],
  };
}

const extraFieldsHtml = `  <fieldset class="field-group"><legend>Site à analyser</legend>
    <label class="field"><span>Adresse du site</span>
      <input type="text" name="siteUrl" data-octave-extra inputmode="url" autocomplete="url" required maxlength="300" placeholder="https://www.exemple.fr/" aria-describedby="site-help"></label>
    <p id="site-help" class="small muted">Point de départ de l’analyse. Pages publiques uniquement : pas de pages derrière une connexion, pas de paiement.</p>
    <label class="field"><span>Pages à analyser (facultatif : une adresse par ligne, ${MAX_PAGES} au maximum)</span>
      <textarea name="pages" data-octave-extra data-max="${MAX_PAGES}" rows="5" maxlength="6400" spellcheck="false" aria-describedby="pages-help pages-count"></textarea></label>
    <p id="pages-help" class="small muted">Laissez vide pour une exploration automatique : jusqu’à ${MAX_PAGES} pages du même site trouvées en suivant les liens depuis l’adresse ci-dessus, en respectant son fichier robots.txt. Les chemins du type /panier sont acceptés.</p>
    <p id="pages-count" class="small muted" aria-live="polite"></p>
    <label class="field"><span>Langue du rapport</span>
      <select name="reportLang" data-octave-extra><option value="fr" selected>Français</option><option value="de" lang="de">Deutsch</option><option value="en" lang="en">English</option></select></label>
  </fieldset>
`;

const afterTermsHtml = `  <label class="check"><input type="checkbox" name="scanAuthorized" data-octave-extra="bool" required>
    <span>J’atteste que l’entreprise ci-dessus est titulaire du site indiqué ou dûment autorisée par son titulaire, et j’autorise READ FRANCE SAS à analyser automatiquement ses pages publiques pour cette prestation.</span></label>
`;

export const orderBody = `<section class="hero">
<h1>Commander l’audit automatisé partiel d’accessibilité</h1>
<div class="callout"><p><strong>Analyse automatisée et partielle</strong> (moteur axe-core) de jusqu’à ${MAX_PAGES} pages : ce n’est <strong>pas un audit de conformité RGAA</strong> et le rapport ne donne <strong>aucun taux de conformité</strong>. Détail sur la page <a href="${url(ROUTES.audit.fr)}">Audit</a>.</p></div>
</section>
${orderFormHtml({
  config: SALES,
  productName: PRODUCT_NAME,
  cgvUrl: url(ROUTES.cgvPro.fr),
  intro: 'Vente réservée aux professionnels (entreprises immatriculées en France, SIREN obligatoire). Le rapport PDF et la facture acquittée sont envoyés par e-mail sous 24 h ouvrées après le paiement.',
  emailLabel: 'E-mail professionnel (réception du rapport et de la facture)',
  extraFieldsHtml,
  afterTermsHtml,
  payLabel: AUDIT_PAY_LABEL,
})}`;

export const orderScripts = `<script src="${url('assets/checkout/checkout-config.js')}"></script>
<script src="https://js.stripe.com/v3/"></script>
<script src="${url('assets/checkout/pay.js')}"></script>
<script src="${url('assets/checkout/audit-order.js')}"></script>
`;

export const orderReturnBody = orderPageBody();
export const orderReturnScripts = `<script src="${url('assets/checkout/checkout-config.js')}"></script>
<script src="${url('assets/checkout/order.js')}"></script>
`;
export const ORDER_CSP = SALES.SALES_OPEN ? checkoutCsp(SALES) : '';
export const ORDER_RETURN_CSP = SALES.SALES_OPEN ? orderCsp(SALES) : '';

export const cgvProBody = `<!--
  CGV B2B rédigées par Octave (assistant IA de READ FRANCE SAS) le 12 octobre 2026.
  CE N'EST PAS UN CONSEIL JURIDIQUE : texte à faire relire par un avocat ou un juriste.
-->
<div class="legal-text">
<h1>Conditions générales de vente aux professionnels – audit automatisé partiel d’accessibilité</h1>
<p class="hint">Version du ${TERMS_DATE} (référence ${AUDIT_TERMS_VERSION}).</p>
<h2>1. Vendeur</h2>
<p>${SELLER.name}, ${SELLER.form} au capital de ${SELLER.capital}, dont le siège social est situé ${SELLER.address}, immatriculée sous le numéro SIREN ${SELLER.siren} (${SELLER.rcs}), bénéficiant de la franchise en base de TVA (TVA non applicable, art. 293 B du CGI), représentée par ${SELLER.president}, président (ci-après « le Vendeur »). Contact : en répondant à l’e-mail de confirmation de commande. Voir aussi les <a href="${url(ROUTES.legal.fr)}">mentions légales</a>.</p>
<h2>2. Champ d’application et acceptation</h2>
<p>Les présentes conditions générales de vente (« CGV ») s’appliquent exclusivement à la prestation « ${PRODUCT_NAME} » (la « Prestation ») commandée en ligne par un <strong>professionnel</strong> (l’« Acheteur ») : une entreprise immatriculée en France, identifiée par son numéro SIREN, qui commande pour les besoins de son activité. La Prestation n’est pas proposée aux consommateurs.</p>
<p>La personne qui commande déclare agir au nom et pour le compte de l’entreprise indiquée et avoir le pouvoir de l’engager. Avant de payer, l’Acheteur accepte expressément les présentes CGV en cochant la case prévue ; la version acceptée est conservée avec la commande. Les CGV prévalent sur toute condition d’achat de l’Acheteur, sauf accord écrit contraire du Vendeur.</p>
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
<p>Le prix est de <strong>${PRICE.sentence}</strong> par commande, payable en une fois. Le prix applicable est celui affiché sur la page de commande au moment de la validation ; il figure sur la facture, qui porte la mention « TVA non applicable, art. 293 B du CGI ».</p>
<h2>6. Commande et paiement</h2>
<p>L’Acheteur renseigne sur la page « Commander » : l’adresse du site et, le cas échéant, les pages à analyser, la langue du rapport, son adresse électronique, la raison sociale et le SIREN de l’entreprise, l’adresse de facturation, puis ses données de carte. Il valide en cliquant sur le bouton de paiement (par exemple « ${payButtonText(AUDIT_PAY_LABEL, SALES.amount)} »).</p>
<p>Le paiement s’effectue <strong>par carte bancaire, au comptant, via le prestataire de paiement Stripe</strong> (Stripe Payments Europe, Ltd.). Le Vendeur n’a jamais accès aux données de carte. Le contrat est formé à la confirmation du paiement par Stripe.</p>
<h2>7. Délai et livraison</h2>
<p>Le rapport et la facture acquittée sont envoyés à l’adresse électronique indiquée <strong>sous 24 heures ouvrées</strong> à compter de la confirmation du paiement. Les heures ouvrées s’entendent du lundi au vendredi, hors jours fériés en France : une commande passée le vendredi soir ou le week-end est livrée au plus tard le premier jour ouvré suivant. La livraison est réputée effectuée à l’envoi du courrier électronique. Lorsque le rapport est trop volumineux pour être joint, il est mis à disposition par un lien de téléchargement valable 90 jours.</p>
<p>Si le site est inaccessible ou ne peut être analysé (erreur du serveur, blocage du robot, absence de page publique), le Vendeur relance l’analyse puis prend contact avec l’Acheteur. À défaut de livraison dans les 5 jours ouvrés suivant le paiement, l’Acheteur peut demander l’annulation de la commande et le remboursement intégral du prix.</p>
<h2>8. Absence de droit de rétractation</h2>
<p>La vente étant conclue entre professionnels, pour les besoins de l’activité de l’Acheteur, le droit de rétractation prévu par le code de la consommation <strong>ne s’applique pas</strong>.</p>
<h2>9. Usage du rapport</h2>
<p>L’Acheteur peut utiliser le rapport pour ses besoins internes et le communiquer à ses prestataires (agence web, développeurs, auditeur). Il s’interdit de le présenter comme un audit de conformité, une attestation ou un certificat, ou d’en déduire un taux de conformité. Le Vendeur reste titulaire des droits sur la présentation et les textes du rapport.</p>
<h2>10. Responsabilité</h2>
<p>Le Vendeur est tenu d’une obligation de moyens. Le rapport décrit l’état des pages analysées à la date de l’analyse ; il ne garantit ni la conformité du site à une norme ou à une obligation légale, ni l’absence de réclamation ou de sanction. La responsabilité du Vendeur ne peut être engagée qu’en cas de faute prouvée et pour les seuls dommages directs ; elle est en tout état de cause <strong>limitée au prix payé</strong> pour la commande concernée. Ces limitations ne s’appliquent pas en cas de faute lourde ou dolosive.</p>
<h2>11. Facturation et pénalités de retard</h2>
<p>Une facture conforme à l’article 242 nonies A de l’annexe II du code général des impôts est établie à la livraison du rapport et envoyée en PDF avec celui-ci. L’Acheteur garantit l’exactitude des données de facturation qu’il fournit. Le prix étant payé comptant à la commande, aucun escompte n’est accordé. Conformément à l’article L441-10 du code de commerce, toute somme non payée à son échéance entraîne de plein droit des <strong>pénalités de retard au taux égal à trois fois le taux d’intérêt légal</strong> et une <strong>indemnité forfaitaire pour frais de recouvrement de 40 €</strong> (article D441-5 du code de commerce).</p>
<h2>12. Données personnelles</h2>
<p>Le Vendeur, responsable de traitement, traite les données fournies lors de la commande (adresse électronique, raison sociale, SIREN, adresse de facturation, adresse du site et des pages à analyser, données de commande et de paiement, à l’exclusion des données de carte, traitées par Stripe) pour exécuter la Prestation, établir la facture, tenir sa comptabilité et prévenir la fraude. Bases légales : exécution du contrat et obligations légales.</p>
<p>Destinataires : Stripe (paiement) ; Google (registre des commandes et des factures, envoi des courriers électroniques et stockage des rapports, au moyen de Google Apps Script, Gmail, Sheets et Drive) ; GitHub (exécution de l’analyse dans un dépôt privé, GitHub Actions) ; le cas échéant l’expert-comptable du Vendeur. Ces prestataires peuvent traiter des données hors de l’Union européenne, dans le cadre des garanties prévues par le RGPD. Durées : adresses analysées et rapport, <strong>90 jours après la livraison</strong> ; factures et pièces comptables, 10 ans (article L123-22 du code de commerce) ; autres données de commande, 5 ans.</p>
<p>Toute personne concernée dispose de droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité, qu’elle exerce en répondant à l’e-mail de commande ; elle peut introduire une réclamation auprès de la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>. Voir aussi la <a href="${url(ROUTES.privacy.fr)}">politique de confidentialité</a>.</p>
<h2>13. Droit applicable et juridiction</h2>
<p>Les présentes CGV sont soumises au <strong>droit français</strong>. Les parties recherchent d’abord une solution amiable. À défaut, tout litige relève de la <strong>compétence exclusive des tribunaux de Paris</strong>.</p>
<h2>14. Dispositions diverses</h2>
<p>Le Vendeur peut modifier les présentes CGV ; la version applicable est celle acceptée par l’Acheteur lors de sa commande. Si une clause est déclarée nulle, les autres demeurent applicables.</p>
<p class="hint">Version du ${TERMS_DATE}.</p>
</div>`;

export const privacyOrderSection = {
  fr: `<h2>Commande de l’audit automatisé</h2>
<p>Lorsque vous commandez l’<a href="${url(ROUTES.audit.fr)}">audit automatisé partiel</a>, et seulement dans ce cas, READ FRANCE SAS (responsable de traitement) reçoit les données saisies sur la page de commande : adresse électronique, raison sociale, SIREN, adresse de facturation, adresse du site et des pages à analyser, langue du rapport. Elles servent à réaliser l’analyse, envoyer le rapport et la facture, tenir la comptabilité et prévenir la fraude (exécution du contrat et obligations légales).</p>
<ul>
<li>Destinataires : Stripe (paiement ; les données de carte sont saisies chez Stripe et ne nous parviennent jamais), Google (Apps Script, Gmail, Sheets et Drive : registre des commandes, envoi des e-mails, stockage du rapport), GitHub (exécution de l’analyse dans un dépôt privé). Transferts hors UE encadrés par les garanties du RGPD.</li>
<li>Durées : adresses analysées et rapport supprimés 90 jours après la livraison ; factures conservées 10 ans ; autres données de commande 5 ans.</li>
<li>Vos droits (accès, rectification, effacement, limitation, opposition, portabilité) s’exercent en répondant à l’e-mail de commande ; réclamation possible auprès de la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>.</li>
<li>La page de commande charge le module de paiement de Stripe (js.stripe.com), qui peut déposer des cookies nécessaires à la sécurité du paiement. Aucun autre cookie ni traceur.</li>
</ul>`,
  de: `<h2>Bestellung der automatisierten Prüfung</h2>
<p>Nur wenn Sie die kostenpflichtige automatisierte Prüfung bestellen (für Unternehmen mit Sitz in Frankreich), verarbeitet die READ FRANCE SAS die Bestelldaten (E-Mail, Firma, SIREN, Rechnungsadresse, zu prüfende Adressen) zur Vertragserfüllung. Empfänger: Stripe (Zahlung), Google (E-Mail, Register, Speicherung des Berichts), GitHub (Durchführung der Prüfung in einem privaten Repository). Prüfadressen und Bericht werden 90 Tage nach Lieferung gelöscht, Rechnungen 10 Jahre aufbewahrt. Einzelheiten auf der französischen Seite.</p>`,
  en: `<h2>Ordering the automated audit</h2>
<p>Only when you order the paid automated audit (companies registered in France), READ FRANCE SAS processes the order data (e-mail, company, SIREN, billing address, URLs to scan) to perform the contract. Recipients: Stripe (payment), Google (e-mail, register, report storage), GitHub (runs the scan in a private repository). Scanned URLs and the report are deleted 90 days after delivery; invoices are kept 10 years. Details on the French page.</p>`,
};

export const cgvDraftReplaced = `<div class="legal-text">
<h1>Conditions générales de vente</h1>
<p>L’ancien projet de conditions publié sur cette page est remplacé par les <a href="${url(ROUTES.cgvPro.fr)}">conditions générales de vente aux professionnels de l’audit automatisé partiel</a> (version du ${TERMS_DATE}), applicables aux commandes passées depuis cette date.</p>
</div>`;

export { SITE };
