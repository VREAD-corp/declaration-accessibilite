// Sales page of the paid « audit automatisé partiel » (built while SALES_OPEN is true).
// Every fact below comes from the audit runner (VREAD-corp/declaration-accessibilite-audit: scan.mjs,
// report.mjs, process-audits.mjs), the B2B terms (cgv-pro.html, order.js) or the sources page.
// The order form itself lives in order.js (commander.html) and is not touched here.
import { PRICE, ROUTES, SAMPLE, CONTACT } from './site.js';
import { url } from './layout.js';
import { MAX_PAGES } from './order.js';

const ORDER = url(ROUTES.order.fr);
const img = (lang, p) => url(`assets/img/rapport-${lang}-p${p}.webp`);

const T = {
  fr: {
    eyebrow: 'Audit d’accessibilité automatisé · Acte européen (EAA) · RGAA',
    h1: `Vos ${MAX_PAGES} pages clés testées sur ordinateur et mobile, avec la liste des corrections par priorité`,
    lead: 'Un rapport PDF envoyé par e-mail sous 24 h ouvrées : chaque problème détecté, sa gravité, les éléments en cause et le critère WCAG / RGAA correspondant.',
    cta: 'Commander l’audit – 149 €',
    ctaNote: '',
    second: ['Tester d’abord un extrait gratuitement', ROUTES.check.fr],
    limits: 'Analyse automatisée avec axe-core, sans relecture humaine. Ce n’est pas un audit RGAA complet.',
    visualAlt: 'Première page d’un rapport d’exemple : synthèse des problèmes détectés, classés par gravité',
    visualCaption: 'Rapport réel, généré sur notre page de démonstration',
    whyTitle: 'Pourquoi maintenant',
    why: [
      ['Depuis le 28 juin 2025', `L’Acte européen sur l’accessibilité s’applique aux sites marchands et à plusieurs services aux consommateurs. Les entreprises concernées doivent publier des informations sur l’accessibilité de leur service.`],
      ['Savoir où vous en êtes', 'Avant de rédiger une déclaration ou de commander des corrections, il faut une liste concrète des défauts. Le rapport vous la donne page par page.'],
      ['Un premier tri rapide', 'Un audit RGAA complet est réalisé à la main par un auditeur, critère par critère (106 critères), et se chiffre sur devis, en jours de travail. L’audit automatisé relève en 24 h ce qu’un robot peut détecter : un point de départ, pas un substitut.'],
    ],
    whyMore: ['Textes officiels et exemptions', ROUTES.sources.fr],
    getTitle: 'Ce que vous recevez',
    get: [
      `<strong>Jusqu’à ${MAX_PAGES} pages publiques</strong> testées : celles que vous indiquez, ou à défaut celles trouvées en suivant les liens depuis l’adresse du site (même domaine, fichier robots.txt respecté).`,
      '<strong>Deux tailles d’écran</strong> : ordinateur (1 280 px) et mobile (390 px), avec détection du défilement horizontal sur mobile.',
      '<strong>Les problèmes classés par gravité</strong> (critique, sérieuse, modérée, mineure) : critère WCAG, correspondance RGAA indicative, nombre de pages et d’éléments touchés.',
      '<strong>Les éléments en cause</strong> : sélecteur et extrait de code, pour que votre développeur ou votre agence corrige sans chercher.',
      '<strong>Les 20 vérifications manuelles</strong> que l’automate ne peut pas faire, à réaliser vous-même ou à confier à un auditeur.',
      '<strong>Un PDF en français, allemand ou anglais</strong> (les intitulés des règles du moteur axe-core restent en anglais), avec captures des pages et la facture acquittée.',
    ],
    galleryTitle: 'Un exemple de rapport',
    galleryIntro: 'Rapport produit par la chaîne d’audit réelle sur une page de boutique fictive, volontairement défectueuse (1 page, 2 tailles d’écran, 7 types de problèmes).',
    shots: [
      ['Synthèse : les problèmes détectés, classés par gravité, avec les critères WCAG et RGAA', '1. Synthèse par gravité'],
      ['Détail par problème : éléments concernés, extrait de code et pages touchées', '2. Éléments à corriger'],
      ['Liste des vérifications manuelles à faire après l’analyse automatique', '3. Vérifications manuelles'],
    ],
    openHtml: 'Ouvrir l’exemple dans le navigateur',
    openPdf: 'Télécharger l’exemple en PDF (format livré)',
    whoTitle: 'Pour qui',
    who: [
      ['Boutiques et services en ligne', 'Vous vendez à des particuliers en ligne et l’Acte européen sur l’accessibilité vous concerne : vous voulez la liste des défauts à corriger en priorité.'],
      ['Agences et indépendants du web', 'Vous voulez un état des lieux rapide du site d’un client, avant une refonte ou un devis de corrections (avec son autorisation).'],
      ['Entreprises qui rédigent leur déclaration', 'Vous préparez votre déclaration d’accessibilité ou les informations exigées par l’EAA et voulez partir de constats réels.'],
    ],
    offerTitle: `Audit automatisé partiel d’accessibilité : ${PRICE.ttc} net`,
    offerVat: 'TVA non applicable, art. 293 B du CGI. Paiement unique par carte (Stripe). Réservé aux entreprises immatriculées en France (SIREN).',
    offerList: [`Jusqu’à ${MAX_PAGES} pages, ordinateur et mobile`, 'Rapport PDF sous 24 h ouvrées après le paiement', 'Problèmes classés par gravité, éléments et code en cause', '20 vérifications manuelles à faire ensuite', 'Facture acquittée envoyée avec le rapport'],
    offerGuarantee: 'Rapport non livré dans les 5 jours ouvrés suivant le paiement : vous pouvez demander l’annulation et le remboursement intégral (CGV, art. 7).',
    offerNot: 'Non inclus : relecture humaine, correction du site, pages derrière une connexion. Aucun taux de conformité ni attestation.',
    offerTerms: 'Conditions générales de vente',
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Mon site est-il concerné ?', `<p>En France, l’Acte européen sur l’accessibilité (directive (UE) 2019/882, transposée par la loi n° 2023-171) s’applique depuis le 28 juin 2025 aux services fournis aux consommateurs, notamment le <strong>commerce en ligne</strong> (vente à des particuliers sur un site ou une application), les services bancaires aux consommateurs, les livres numériques, le transport de voyageurs et les communications électroniques. Les ventes uniquement entre professionnels ne sont pas visées.</p>
<p>Les <strong>microentreprises qui fournissent des services</strong> en sont dispensées : moins de 10 personnes <em>et</em> chiffre d’affaires annuel ou total du bilan n’excédant pas 2 millions d’euros (code de la consommation, art. L. 412-13). Par ailleurs, l’article 47 de la loi n° 2005-102 impose une déclaration au format RGAA aux organismes publics et aux entreprises dont le chiffre d’affaires en France dépasse 250 millions d’euros.</p>
<p>Le questionnaire du <a href="${url(ROUTES.home.fr)}">générateur gratuit</a> donne une première indication ; les textes sont sur la page <a href="${url(ROUTES.sources.fr)}">Obligations et sources</a>. Ce n’est pas un conseil juridique.</p>`],
      ['Est-ce un audit RGAA ?', `<p>Non. Ce n’est pas un audit de conformité RGAA (ni WCAG / EN 301 549) : les tests automatiques ne repèrent qu’une partie des défauts, et un audit complet vérifie à la main les 106 critères du RGAA sur un échantillon de pages. Le rapport ne donne donc aucun taux de conformité et ne vaut pas attestation.</p>`],
      ['Que faire du rapport ?', `<ol><li>Transmettez-le à votre développeur ou à votre agence (les CGV l’autorisent) et corrigez d’abord les problèmes « critiques » et « sérieux », en commençant par le parcours d’achat.</li><li>Faites les 20 vérifications manuelles listées, idéalement avec un lecteur d’écran.</li><li>Rédigez votre déclaration d’accessibilité ou les informations exigées par l’EAA avec le <a href="${url(ROUTES.home.fr)}">générateur gratuit</a> : tant qu’aucun audit complet n’a été réalisé, l’état à indiquer reste « non conforme ».</li></ol>`],
      ['Quel délai ?', `<p>Le rapport et la facture sont envoyés <strong>sous 24 heures ouvrées</strong> après la confirmation du paiement (du lundi au vendredi, hors jours fériés) : une commande passée le vendredi soir ou le week-end est livrée au plus tard le premier jour ouvré suivant. L’analyse est automatique. Si le site ne peut pas être analysé (serveur en erreur, robot bloqué), l’analyse est relancée puis nous vous contactons.</p>`],
      ['Puis-je être remboursé ?', `<p>Selon les <a href="${url(ROUTES.cgvPro.fr)}">CGV</a> : si le rapport n’est pas livré dans les 5 jours ouvrés suivant le paiement, vous pouvez demander l’annulation et le remboursement intégral (art. 7) ; si nous refusons ou interrompons une analyse faute d’autorisation certaine, nous remboursons le prix (art. 4). La vente étant conclue entre professionnels, il n’y a pas de droit de rétractation (art. 8).</p>`],
      ['Quelles pages sont analysées ?', `<p>L’analyse porte sur jusqu’à ${MAX_PAGES} pages publiques du site : celles que vous listez à la commande (adresses ou chemins comme /panier), ou à défaut celles trouvées en suivant les liens depuis l’adresse du site, sur le même domaine et dans le respect de son fichier robots.txt. Les pages derrière une connexion et le paiement réel ne sont pas analysés.</p>`],
      ['Ai-je le droit de faire analyser ce site ?', `<p>Oui si votre entreprise en est titulaire ou si son titulaire vous y autorise : vous l’attestez en cochant une case à la commande. Les pages sont consultées comme le ferait un visiteur, à un rythme modéré.</p>`],
    ],
    aboutTitle: 'Qui sommes-nous',
    about: `<strong>READ FRANCE SAS</strong>, société basée à Paris (SIREN 988 741 773), édite des outils et des kits pour aider les entreprises à respecter leurs obligations réglementaires : accessibilité numérique, Qualiopi, sécurité des produits.`,
    contact: 'Une question avant de commander ?',
    more: 'Tous nos outils',
    legal: `Sources : <a href="${url(ROUTES.sources.fr)}">textes officiels et champ d’application</a> · <a href="${url(ROUTES.cgvPro.fr)}">CGV</a> · <a href="${url(ROUTES.legal.fr)}">mentions légales</a>. Produit indépendant : il n’est ni validé ni recommandé par l’État.`,
    bar: ['Audit 20 pages · 149 €', 'Commander'],
  },
  de: {
    eyebrow: 'Automatisierte Barrierefreiheitsprüfung · EAA · BFSG',
    h1: `Ihre ${MAX_PAGES} wichtigsten Seiten auf Desktop und Mobil geprüft, mit priorisierter Korrekturliste`,
    lead: 'Ein PDF-Bericht per E-Mail innerhalb von 24 Arbeitsstunden: jedes gefundene Problem, seine Schwere, die betroffenen Elemente und das passende WCAG-Kriterium.',
    cta: 'Prüfung bestellen – 149 €',
    ctaNote: 'Bestellung auf Französisch, nur für in Frankreich eingetragene Unternehmen (SIREN).',
    second: ['Erst einen Auszug kostenlos testen', ROUTES.check.de],
    limits: 'Automatisierte Prüfung mit axe-core, ohne menschliche Durchsicht. Keine vollständige Konformitätsprüfung.',
    visualAlt: 'Erste Seite eines Beispielberichts: Übersicht der gefundenen Probleme nach Schweregrad',
    visualCaption: 'Echter Bericht, erstellt auf unserer Demo-Seite',
    whyTitle: 'Warum jetzt',
    why: [
      ['Seit 28. Juni 2025', 'Der European Accessibility Act und das BFSG gelten für Online-Shops und weitere Dienstleistungen für Verbraucher.'],
      ['Wissen, wo Sie stehen', 'Vor Erklärung und Korrekturen brauchen Sie eine konkrete Liste der Barrieren, Seite für Seite.'],
      ['Schneller erster Überblick', 'Eine vollständige Prüfung erfolgt manuell durch Prüfer und wird nach Aufwand angeboten. Die automatisierte Prüfung liefert in 24 Stunden, was ein Automat finden kann: ein Startpunkt, kein Ersatz.'],
    ],
    whyMore: ['Gesetzestexte und Ausnahmen', ROUTES.sources.de],
    getTitle: 'Was Sie erhalten',
    get: [
      `<strong>Bis zu ${MAX_PAGES} öffentliche Seiten</strong>: von Ihnen angegeben oder automatisch über Links gefunden (gleiche Domain, robots.txt beachtet).`,
      '<strong>Desktop (1.280 px) und Mobil (390 px)</strong>, mit Erkennung von horizontalem Scrollen.',
      '<strong>Probleme nach Schweregrad</strong>, mit WCAG-Kriterium und Anzahl betroffener Seiten und Elemente.',
      '<strong>Betroffene Elemente</strong>: Selektor und Codeauszug für Ihre Entwickler.',
      '<strong>20 manuelle Prüfungen</strong>, die ein Automat nicht leisten kann.',
      '<strong>PDF auf Deutsch, Französisch oder Englisch</strong> (Regeltitel von axe-core auf Englisch), mit Screenshots und quittierter Rechnung.',
    ],
    galleryTitle: 'Beispielbericht',
    galleryIntro: 'Erstellt mit der echten Prüfkette auf einer absichtlich fehlerhaften, fiktiven Shop-Seite (1 Seite, 2 Bildschirmgrößen, 7 Problemarten).',
    shots: [
      ['Übersicht: gefundene Probleme nach Schweregrad mit WCAG-Kriterien', '1. Übersicht nach Schweregrad'],
      ['Details je Problem: betroffene Elemente, Codeauszug und Seiten', '2. Zu behebende Elemente'],
      ['Liste der manuellen Prüfungen nach der automatischen Analyse', '3. Manuelle Prüfungen'],
    ],
    openHtml: 'Beispiel im Browser öffnen',
    openPdf: 'Beispiel als PDF herunterladen (Lieferformat)',
    whoTitle: 'Für wen',
    who: [
      ['Online-Shops', 'Sie verkaufen online an Verbraucher und möchten wissen, welche Barrieren Sie zuerst beheben.'],
      ['Agenturen und Freelancer', 'Schneller Überblick über die Website eines Kunden (mit dessen Erlaubnis).'],
      ['Unternehmen mit Erklärungspflicht', 'Sie erstellen die Barrierefreiheitsinformationen und brauchen echte Befunde.'],
    ],
    offerTitle: `Automatisierte Teilprüfung der Barrierefreiheit: 149 € netto`,
    offerVat: 'Keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI. Einmalzahlung per Karte (Stripe). Nur für in Frankreich eingetragene Unternehmen (SIREN).',
    offerList: [`Bis zu ${MAX_PAGES} Seiten, Desktop und Mobil`, 'PDF-Bericht innerhalb von 24 Arbeitsstunden', 'Probleme nach Schweregrad, betroffene Elemente', '20 manuelle Prüfungen', 'Quittierte Rechnung mit dem Bericht'],
    offerGuarantee: 'Kein Bericht innerhalb von 5 Werktagen nach Zahlung: Sie können Stornierung und volle Erstattung verlangen (AGB, Art. 7).',
    offerNot: 'Nicht enthalten: menschliche Durchsicht, Behebung, Seiten hinter einem Login. Kein Konformitätsgrad, kein Zertifikat.',
    offerTerms: 'AGB (Französisch)',
    faqTitle: 'Häufige Fragen',
    faq: [
      ['Betrifft das meine Website?', `<p>Das BFSG (Umsetzung der Richtlinie (EU) 2019/882) gilt seit dem 28. Juni 2025 u. a. für den <strong>elektronischen Geschäftsverkehr</strong> mit Verbrauchern, Bankdienstleistungen, E-Books, Personenbeförderung und Telekommunikation. <strong>Kleinstunternehmen, die Dienstleistungen erbringen</strong> (weniger als 10 Beschäftigte und Jahresumsatz oder Jahresbilanzsumme höchstens 2 Mio. €), sind ausgenommen (BFSG § 3 Abs. 3). Details: <a href="${url(ROUTES.sources.de)}">Pflichten und Quellen</a>. Keine Rechtsberatung.</p>`],
      ['Ist das eine vollständige Prüfung?', '<p>Nein. Automatische Tests finden nur einen Teil der Barrieren; der Bericht nennt keinen Konformitätsgrad und ist keine Bescheinigung.</p>'],
      ['Was mache ich mit dem Bericht?', `<p>Geben Sie ihn an Ihre Entwickler oder Agentur, beheben Sie zuerst „kritische“ und „ernste“ Probleme im Kaufprozess, führen Sie die 20 manuellen Prüfungen durch und erstellen Sie Ihre Erklärung mit dem <a href="${url(ROUTES.home.de)}">kostenlosen Generator</a>.</p>`],
      ['Wie schnell?', '<p>Innerhalb von 24 Arbeitsstunden nach Zahlungsbestätigung (Montag bis Freitag, ohne französische Feiertage).</p>'],
      ['Erstattung?', `<p>Laut <a href="${url(ROUTES.cgvPro.fr)}" hreflang="fr">AGB</a>: volle Erstattung auf Wunsch, wenn der Bericht nicht innerhalb von 5 Werktagen nach Zahlung geliefert wird. Kein Widerrufsrecht (Verkauf zwischen Unternehmen).</p>`],
    ],
    aboutTitle: 'Über uns',
    about: '<strong>READ FRANCE SAS</strong>, Paris (SIREN 988 741 773), entwickelt Werkzeuge und Kits, mit denen Unternehmen regulatorische Pflichten erfüllen: digitale Barrierefreiheit, Qualiopi, Produktsicherheit.',
    contact: 'Fragen vor der Bestellung?',
    more: 'Alle unsere Werkzeuge',
    legal: `Quellen: <a href="${url(ROUTES.sources.de)}">Gesetzestexte und Anwendungsbereich</a> · <a href="${url(ROUTES.legal.de)}">Impressum</a>. Unabhängiges Produkt, nicht staatlich geprüft oder empfohlen.`,
    bar: ['Prüfung 20 Seiten · 149 €', 'Bestellen'],
  },
  en: {
    eyebrow: 'Automated accessibility audit · European Accessibility Act',
    h1: `Your ${MAX_PAGES} key pages tested on desktop and mobile, with a prioritised list of fixes`,
    lead: 'A PDF report e-mailed within 24 business hours: every issue detected, its severity, the elements involved and the matching WCAG criterion.',
    cta: 'Order the audit – €149',
    ctaNote: 'Ordering is in French and open to companies registered in France (SIREN).',
    second: ['Test a snippet for free first', ROUTES.check.en],
    limits: 'Automated analysis with axe-core, no human review. Not a full conformance audit.',
    visualAlt: 'First page of a sample report: summary of detected issues by severity',
    visualCaption: 'Real report, generated on our demo page',
    whyTitle: 'Why now',
    why: [
      ['Since 28 June 2025', 'The European Accessibility Act applies to online shops and other consumer services. Covered businesses must publish accessibility information about their service.'],
      ['Know where you stand', 'Before writing a statement or ordering fixes, you need a concrete list of issues, page by page.'],
      ['A fast first pass', 'A full audit is done by hand by an auditor and priced on quote, in days of work. The automated audit gives you in 24 hours what a machine can detect: a starting point, not a substitute.'],
    ],
    whyMore: ['Official texts and exemptions', ROUTES.sources.en],
    getTitle: 'What you get',
    get: [
      `<strong>Up to ${MAX_PAGES} public pages</strong>: the ones you list, or those found by following links from your site address (same domain, robots.txt respected).`,
      '<strong>Desktop (1,280 px) and mobile (390 px)</strong>, with horizontal-scroll detection on mobile.',
      '<strong>Issues ranked by severity</strong>, with the WCAG criterion and the number of pages and elements affected.',
      '<strong>The elements involved</strong>: selector and code excerpt for your developer.',
      '<strong>20 manual checks</strong> automation cannot do.',
      '<strong>A PDF in English, French or German</strong>, with page screenshots and the paid invoice.',
    ],
    galleryTitle: 'A sample report',
    galleryIntro: 'Produced by the real audit pipeline on a deliberately flawed, fictitious shop page (1 page, 2 screen sizes, 7 issue types).',
    shots: [
      ['Summary: detected issues ranked by severity with WCAG criteria', '1. Summary by severity'],
      ['Details per issue: affected elements, code excerpt and pages', '2. Elements to fix'],
      ['List of manual checks to do after the automated scan', '3. Manual checks'],
    ],
    openHtml: 'Open the sample in your browser',
    openPdf: 'Download the sample PDF (delivered format)',
    whoTitle: 'Who it is for',
    who: [
      ['Online shops and consumer services', 'You sell to consumers online and want to know which issues to fix first.'],
      ['Web agencies and freelancers', 'A quick baseline of a client’s site before a redesign or a quote (with their permission).'],
      ['Businesses writing their statement', 'You are preparing your EAA accessibility information and want real findings to start from.'],
    ],
    offerTitle: 'Partial automated accessibility audit: €149 net',
    offerVat: 'VAT not applicable, art. 293 B of the French tax code. One-off card payment (Stripe). Companies registered in France only (SIREN).',
    offerList: [`Up to ${MAX_PAGES} pages, desktop and mobile`, 'PDF report within 24 business hours', 'Issues by severity, elements and code involved', '20 manual checks to do next', 'Paid invoice sent with the report'],
    offerGuarantee: 'No report within 5 working days of payment: you can ask for cancellation and a full refund (terms, art. 7).',
    offerNot: 'Not included: human review, fixing your site, pages behind a login. No conformance rate or certificate.',
    offerTerms: 'Terms of sale (French)',
    faqTitle: 'Frequently asked questions',
    faq: [
      ['Is my site concerned?', `<p>Since 28 June 2025 the European Accessibility Act (Directive (EU) 2019/882) applies to consumer services such as <strong>e-commerce</strong>, consumer banking, e-books, passenger transport and electronic communications. <strong>Microenterprises providing services</strong> (fewer than 10 staff and annual turnover or balance sheet total of at most €2 million) are exempt (art. 4(5)). Business-to-business sales only are not covered. Details: <a href="${url(ROUTES.sources.en)}">obligations and sources</a>. Not legal advice.</p>`],
      ['Is this a full audit?', '<p>No. Automated tests only find part of the issues; the report gives no conformance rate and is not a certificate.</p>'],
      ['What do I do with the report?', `<p>Hand it to your developer or agency, fix “critical” and “serious” issues on the purchase path first, do the 20 manual checks, then draft your statement with the <a href="${url(ROUTES.home.en)}">free generator</a>.</p>`],
      ['How fast?', '<p>Within 24 business hours of payment confirmation (Monday to Friday, excluding French public holidays).</p>'],
      ['Refunds?', `<p>Per the <a href="${url(ROUTES.cgvPro.fr)}" hreflang="fr">terms</a>: full refund on request if the report is not delivered within 5 working days of payment. No withdrawal right (business-to-business sale).</p>`],
    ],
    aboutTitle: 'About us',
    about: '<strong>READ FRANCE SAS</strong>, based in Paris (SIREN 988 741 773), builds tools and kits that help businesses meet regulatory obligations: digital accessibility, Qualiopi, product safety.',
    contact: 'A question before ordering?',
    more: 'All our tools',
    legal: `Sources: <a href="${url(ROUTES.sources.en)}">official texts and scope</a> · <a href="${url(ROUTES.legal.en)}">legal notice</a>. Independent product, not endorsed or validated by any government.`,
    bar: ['20-page audit · €149', 'Order'],
  },
};

const check = '<svg class="tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M7.7 13.6 4.4 10.3l-1.2 1.2 4.5 4.5 9.6-9.6-1.2-1.2z" fill="currentColor"/></svg>';

function auditPage(lang) {
  const t = T[lang];
  const sample = SAMPLE[lang];
  const orderAttrs = lang === 'fr' ? '' : ' hreflang="fr"';
  return `<section class="lp-hero">
<div class="lp-hero-text">
<p class="eyebrow">${t.eyebrow}</p>
<h1>${t.h1}</h1>
<p class="lead">${t.lead}</p>
<div class="cta-row">
<a class="btn btn-lg" href="${ORDER}"${orderAttrs}>${t.cta}</a>
<a class="text-link" href="${url(t.second[1])}">${t.second[0]} →</a>
</div>
${t.ctaNote ? `<p class="fine">${t.ctaNote}</p>\n` : ''}<p class="fine limits">${t.limits}</p>
</div>
<figure class="lp-hero-visual">
<a class="doc-stack" href="${url(sample.html)}">
<img class="doc doc-3" src="${img(lang, 5)}" alt="" width="760" height="1075" loading="lazy" decoding="async">
<img class="doc doc-2" src="${img(lang, 2)}" alt="" width="760" height="1075" loading="lazy" decoding="async">
<img class="doc doc-1" src="${img(lang, 1)}" alt="${t.visualAlt}" width="760" height="1075" fetchpriority="high">
</a>
<figcaption>${t.visualCaption}</figcaption>
</figure>
</section>

<section class="lp-section" aria-labelledby="why-title">
<h2 id="why-title">${t.whyTitle}</h2>
<div class="cards cards-3">${t.why.map(([h, p]) => `<div class="card"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
<p><a href="${url(t.whyMore[1])}">${t.whyMore[0]} →</a></p>
</section>

<section class="lp-section" aria-labelledby="get-title">
<h2 id="get-title">${t.getTitle}</h2>
<ul class="ticks">${t.get.map((g) => `<li>${check}<span>${g}</span></li>`).join('')}</ul>
</section>

<section class="lp-section" id="exemple" aria-labelledby="gallery-title">
<h2 id="gallery-title">${t.galleryTitle}</h2>
<p>${t.galleryIntro}</p>
<div class="gallery">
${t.shots.map(([alt, cap], i) => `<figure><a href="${url(sample.html)}"><img src="${img(lang, [1, 2, 5][i])}" alt="${alt}" width="760" height="1075" loading="lazy" decoding="async"></a><figcaption>${cap}</figcaption></figure>`).join('\n')}
</div>
<div class="btn-row">
<a class="btn secondary" href="${url(sample.html)}">${t.openHtml}</a>
<a class="btn secondary" href="${url(sample.pdf)}" type="application/pdf">${t.openPdf}</a>
</div>
</section>

<section class="lp-section" aria-labelledby="who-title">
<h2 id="who-title">${t.whoTitle}</h2>
<div class="cards cards-3">${t.who.map(([h, p]) => `<div class="card"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
</section>

<section class="lp-section" id="offre" aria-labelledby="offer-title">
<div class="offer-card">
<div>
<h2 id="offer-title">${t.offerTitle}</h2>
<p class="fine">${t.offerVat}</p>
<ul class="ticks">${t.offerList.map((g) => `<li>${check}<span>${g}</span></li>`).join('')}</ul>
</div>
<div class="offer-side">
<p class="offer-price">${lang === 'en' ? '€149' : '149 €'}</p>
<a class="btn btn-lg" href="${ORDER}"${orderAttrs}>${t.cta}</a>
<p class="fine">${t.offerGuarantee}</p>
<p class="fine">${t.offerNot}</p>
<p class="fine"><a href="${url(ROUTES.cgvPro.fr)}"${orderAttrs}>${t.offerTerms}</a></p>
</div>
</div>
</section>

<section class="lp-section" aria-labelledby="faq-title">
<h2 id="faq-title">${t.faqTitle}</h2>
<div class="faq">
${t.faq.map(([q, a]) => `<details><summary>${q}</summary><div class="faq-a">${a}</div></details>`).join('\n')}
</div>
</section>

<section class="lp-section about" aria-labelledby="about-title">
<!-- TODO founder photo/name -->
<h2 id="about-title">${t.aboutTitle}</h2>
<p>${t.about}</p>
<p>${t.contact} <a href="mailto:${CONTACT}">${CONTACT}</a> · <a href="https://outils.vread.fr/">${t.more}</a></p>
</section>

<p class="fine sources-line">${t.legal}</p>

<div class="cta-bar"><span>${t.bar[0]}</span><a class="btn" href="${ORDER}"${orderAttrs}>${t.bar[1]} →</a></div>`;
}

export const auditSalesBodies = { fr: auditPage('fr'), de: auditPage('de'), en: auditPage('en') };
