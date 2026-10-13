// Sales page of the paid « audit automatisé partiel » (built while SALES_OPEN is true).
// Every fact below comes from the audit runner (VREAD-corp/declaration-accessibilite-audit: scan.mjs,
// report.mjs, process-audits.mjs), the B2B terms (cgv-pro.html, order.js) or the sources page.
// The order form itself lives in order.js (commander.html) and is not touched here.
import { PRICE, ROUTES, SAMPLE, CONTACT } from './site.js';
import { url } from './layout.js';
import { MAX_PAGES } from './order.js';

const ORDER = url(ROUTES.order.fr);
// Founders (facts from vread.fr/presse and Vincent Cance's CV; same block on every outils.vread.fr site).
const FOUNDERS = [
  {
    name: 'Tanguy Warsmann',
    photo: 'tanguy-warsmann.webp',
    role: { fr: 'Fondateur &amp; CEO', de: 'Gründer &amp; CEO', en: 'Founder &amp; CEO' },
    bio: {
      fr: 'Formé aux lettres à la Sorbonne puis à emlyon business school, il a travaillé chez Cartier, puis chez AR/Factory, où il a piloté la stratégie de contenus shopping de médias comme Ouest-France, 20 Minutes et Le Figaro.',
      de: 'Nach einem Literaturstudium an der Sorbonne und einem Studium an der emlyon business school arbeitete er bei Cartier und danach bei AR/Factory, wo er die Shopping-Content-Strategie von Medien wie Ouest-France, 20 Minutes und Le Figaro leitete.',
      en: 'After studying literature at the Sorbonne and then at emlyon business school, he worked at Cartier and then at AR/Factory, where he led the shopping-content strategy of media such as Ouest-France, 20 Minutes and Le Figaro.',
    },
  },
  {
    name: 'Vincent Cance',
    photo: 'vincent-cance.webp',
    role: { fr: 'Cofondateur &amp; CTO', de: 'Mitgründer &amp; CTO', en: 'Co-founder &amp; CTO' },
    bio: {
      fr: 'Développeur full stack web et mobile, il a été cofondateur et CTO de Genipatient, un logiciel de gestion de cabinet pour ostéopathes.',
      de: 'Als Full-Stack-Entwickler für Web und Mobile war er Mitgründer und CTO von Genipatient, einer Praxisverwaltungssoftware für Osteopathen.',
      en: 'A full-stack web and mobile developer, he was co-founder and CTO of Genipatient, practice-management software for osteopaths.',
    },
  },
];
const img = (lang, p) => url(`assets/img/rapport-${lang}-p${p}.webp`);
const srcset = (lang, p) => `${url(`assets/img/rapport-${lang}-p${p}-380.webp`)} 380w, ${img(lang, p)} 760w`;
const HERO_SIZES = '(min-width: 56rem) 22rem, 17rem';
const GALLERY_SIZES = '(min-width: 56rem) 22rem, calc(100vw - 4rem)';

const T = {
  fr: {
    eyebrow: 'Audit d’accessibilité automatisé · Acte européen (EAA) · RGAA',
    h1: `Audit d’accessibilité automatisé de vos ${MAX_PAGES} pages clés, sur ordinateur et mobile`,
    lead: 'Le rapport PDF arrive par e-mail sous 24 h ouvrées, avec la liste des corrections par priorité : chaque problème détecté, sa gravité, les éléments en cause et le critère WCAG ou RGAA correspondant.',
    cta: 'Commander l’audit – 149 €',
    ctaNote: '',
    second: ['Tester d’abord un extrait gratuitement', ROUTES.check.fr],
    limits: 'Analyse automatisée avec axe-core, sans relecture humaine. Ce n’est pas un audit RGAA complet.',
    visualAlt: 'Première page d’un rapport d’exemple : synthèse des problèmes détectés, classés par gravité',
    visualCaption: 'Rapport réel, généré sur notre page de démonstration',
    whyTitle: 'Ce qui s’applique depuis le 28 juin 2025',
    why: [
      'L’Acte européen sur l’accessibilité (directive (UE) 2019/882, loi n° 2023-171 en France) vise les sites qui vendent à des particuliers et plusieurs autres services aux consommateurs. Les entreprises concernées doivent publier des informations sur l’accessibilité de leur service ; ne pas les établir ou ne pas les publier relève de l’amende des contraventions de 5e classe (code de la consommation, art. R. 451-4).',
      'Pour rédiger ces informations ou faire chiffrer des corrections, il faut d’abord la liste des défauts, page par page. Un audit RGAA complet la donne : un auditeur vérifie à la main les 106 critères, sur devis, en jours de travail. Notre audit relève en 24 h ouvrées ce qu’un robot peut détecter, et ne remplace pas cet audit complet.',
    ],
    whyMore: ['Textes officiels et exemptions', ROUTES.sources.fr],
    getTitle: 'Ce que vous recevez',
    get: [
      `${MAX_PAGES} pages publiques au plus, celles que vous indiquez ou, à défaut, celles trouvées en suivant les liens depuis l’adresse du site (même domaine, fichier robots.txt respecté).`,
      'Chaque page testée sur ordinateur (1 280 px) et sur mobile (390 px), avec détection du défilement horizontal sur mobile.',
      'Les problèmes classés par gravité (critique, sérieuse, modérée, mineure), avec le critère WCAG, la correspondance RGAA indicative et le nombre de pages et d’éléments touchés.',
      'Pour chaque élément en cause, son sélecteur et un extrait de code : votre développeur ou votre agence sait où corriger.',
      'Les 20 vérifications manuelles que l’automate ne peut pas faire, à réaliser vous-même ou à confier à un auditeur.',
      'Un PDF en français, allemand ou anglais, avec captures des pages et la facture acquittée. Les intitulés des règles du moteur axe-core restent en anglais.',
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
    whoTitle: 'À qui il sert',
    who: [
      'Vous vendez en ligne à des particuliers et l’Acte européen vous concerne : le rapport dit quels défauts corriger d’abord.',
      'Vous êtes une agence ou un indépendant du web et voulez un état des lieux du site d’un client, avec son autorisation, avant une refonte ou un devis de corrections.',
      'Vous rédigez votre déclaration d’accessibilité ou les informations exigées par l’EAA et voulez partir de constats réels.',
    ],
    whoNot: 'Il ne vous servira pas si vous avez besoin d’une attestation ou d’un taux de conformité, si votre site vend uniquement à des professionnels (ventes non visées par l’EAA) ou si votre entreprise n’est pas immatriculée en France : la commande demande un numéro SIREN.',
    offerTitle: `Audit automatisé partiel d’accessibilité : ${PRICE.ttc} net`,
    offerVat: 'TVA non applicable, art. 293 B du CGI. Paiement unique par carte (Stripe). Réservé aux entreprises immatriculées en France (SIREN).',
    offerList: [`Jusqu’à ${MAX_PAGES} pages, ordinateur et mobile`, 'Rapport PDF sous 24 h ouvrées après le paiement', 'Problèmes classés par gravité, éléments et code en cause', '20 vérifications manuelles à faire ensuite', 'Facture acquittée envoyée avec le rapport'],
    offerGuarantee: 'Rapport non livré dans les 5 jours ouvrés suivant le paiement : vous pouvez demander l’annulation et le remboursement intégral (CGV, art. 7).',
    offerNot: 'Non inclus : relecture humaine, correction du site, pages derrière une connexion. Aucun taux de conformité ni attestation.',
    offerTerms: 'Conditions générales de vente',
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Mon site est-il concerné ?', `<p>En France, l’Acte européen sur l’accessibilité (directive (UE) 2019/882, transposée par la loi n° 2023-171) s’applique depuis le 28 juin 2025 aux services fournis aux consommateurs, notamment le <strong>commerce en ligne</strong> (vente à des particuliers sur un site ou une application), les services bancaires aux consommateurs, les livres numériques, le transport de voyageurs et les communications électroniques. Les ventes uniquement entre professionnels ne sont pas visées.</p>
<p>Les <strong>microentreprises qui fournissent des services</strong> en sont dispensées : moins de 10 personnes <em>et</em> chiffre d’affaires annuel ou total du bilan n’excédant pas 2 millions d’euros (code de la consommation, art. L. 412-13). L’article 47 de la loi n° 2005-102 impose une déclaration au format RGAA aux organismes publics et aux entreprises dont le chiffre d’affaires en France dépasse 250 millions d’euros.</p>
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
    foundersLabel: 'Fondateurs',
    portrait: 'Portrait de',
    more: 'Tous nos outils',
    legal: `Sources : <a href="${url(ROUTES.sources.fr)}">textes officiels et champ d’application</a> · <a href="${url(ROUTES.cgvPro.fr)}">CGV</a> · <a href="${url(ROUTES.legal.fr)}">mentions légales</a>. Produit indépendant : il n’est ni validé ni recommandé par l’État.`,
    bar: ['Audit 20 pages · 149 €', 'Commander'],
  },
  de: {
    eyebrow: 'Nur für Unternehmen mit Sitz in Frankreich',
    h1: `Automatisiertes Barrierefreiheits-Audit von ${MAX_PAGES} Seiten für Unternehmen in Frankreich`,
    lead: 'Bis zu 20 Seiten, auf Desktop und Mobil getestet. Der PDF-Bericht kommt innerhalb von 24 Arbeitsstunden per E-Mail und nennt jedes gefundene Problem, seine Schwere, die betroffenen Elemente und das WCAG-Kriterium.',
    cta: 'Als Unternehmen in Frankreich bestellen – 149 €',
    ctaNote: '',
    frOnly: 'Wir verkaufen dieses Audit nur an Unternehmen, die in Frankreich eingetragen sind: Die Bestellung verlangt eine SIREN-Nummer, Bestellformular und AGB sind auf Französisch. Für Shops in Deutschland und Österreich sind der Generator für die Barrierefreiheitserklärung, der Selbsttest und die Mini-Prüfung kostenlos.',
    free: ['Kostenlosen Generator öffnen', ROUTES.home.de],
    second: ['Mini-Prüfung kostenlos', ROUTES.check.de],
    limits: 'Automatisierte Prüfung mit axe-core, ohne menschliche Durchsicht. Keine vollständige Konformitätsprüfung.',
    visualAlt: 'Erste Seite eines Beispielberichts: Übersicht der gefundenen Probleme nach Schweregrad',
    visualCaption: 'Echter Bericht, erstellt auf unserer Demo-Seite',
    whyTitle: 'Was seit dem 28. Juni 2025 gilt',
    why: [
      'Der European Accessibility Act und das BFSG gelten für Online-Shops, die an Verbraucher verkaufen, und für weitere Dienstleistungen für Verbraucher. Wer eine Dienstleistung entgegen § 14 Abs. 1 BFSG anbietet, riskiert ein Bußgeld bis 100.000 € (§ 37).',
      'Vor der Erklärung und vor Korrekturen brauchen Sie eine Liste der Barrieren, Seite für Seite. Eine vollständige Prüfung macht ein Prüfer von Hand, nach Aufwand. Das automatisierte Audit liefert in 24 Arbeitsstunden, was ein Automat finden kann, und ersetzt diese Prüfung nicht.',
    ],
    whyMore: ['Gesetzestexte und Ausnahmen', ROUTES.sources.de],
    getTitle: 'Was Sie erhalten',
    get: [
      `Höchstens ${MAX_PAGES} öffentliche Seiten, von Ihnen angegeben oder über Links ab der Startadresse gefunden (gleiche Domain, robots.txt beachtet).`,
      'Jede Seite auf Desktop (1.280 px) und Mobil (390 px) getestet, mit Erkennung von horizontalem Scrollen.',
      'Probleme nach Schweregrad, mit WCAG-Kriterium und Anzahl betroffener Seiten und Elemente.',
      'Selektor und Codeauszug jedes betroffenen Elements, damit Ihre Entwickler wissen, wo sie ansetzen.',
      '20 manuelle Prüfungen, die ein Automat nicht leisten kann.',
      'Ein PDF auf Deutsch, Französisch oder Englisch mit Screenshots und quittierter Rechnung. Die Regeltitel von axe-core bleiben englisch.',
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
      'Ihr Unternehmen ist in Frankreich eingetragen, verkauft online an Verbraucher und will wissen, welche Barrieren zuerst zu beheben sind.',
      'Sie sind eine Agentur in Frankreich und brauchen, mit Erlaubnis des Kunden, einen Überblick über dessen Website.',
    ],
    whoNot: 'Nicht für Sie, wenn Ihr Unternehmen nicht in Frankreich eingetragen ist, wenn Sie nur an Unternehmen verkaufen oder wenn Sie ein Konformitätszertifikat brauchen.',
    offerTitle: `Automatisierte Teilprüfung der Barrierefreiheit: 149 € netto`,
    offerVat: 'Keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI. Einmalzahlung per Karte (Stripe). Nur für in Frankreich eingetragene Unternehmen (SIREN).',
    offerList: [`Bis zu ${MAX_PAGES} Seiten, Desktop und Mobil`, 'PDF-Bericht innerhalb von 24 Arbeitsstunden', 'Probleme nach Schweregrad, betroffene Elemente', '20 manuelle Prüfungen', 'Quittierte Rechnung mit dem Bericht'],
    offerGuarantee: 'Kein Bericht innerhalb von 5 Werktagen nach Zahlung: Sie können Stornierung und volle Erstattung verlangen (AGB, Art. 7).',
    offerNot: 'Nicht enthalten: menschliche Durchsicht, Behebung, Seiten hinter einem Login. Kein Konformitätsgrad, kein Zertifikat.',
    offerTerms: 'AGB (Französisch)',
    faqTitle: 'Häufige Fragen',
    faq: [
      ['Kann ich aus Deutschland oder Österreich bestellen?', `<p>Nein. Die Bestellung verlangt eine französische SIREN-Nummer, Bestellformular, Rechnung und AGB sind auf Französisch. Den <a href="${url(ROUTES.home.de)}">Generator</a> und die <a href="${url(ROUTES.check.de)}">Mini-Prüfung</a> können Sie kostenlos nutzen.</p>`],
      ['Betrifft das meine Website?', `<p>Das BFSG (Umsetzung der Richtlinie (EU) 2019/882) gilt seit dem 28. Juni 2025 u. a. für den <strong>elektronischen Geschäftsverkehr</strong> mit Verbrauchern, Bankdienstleistungen, E-Books, Personenbeförderung und Telekommunikation. <strong>Kleinstunternehmen, die Dienstleistungen erbringen</strong> (weniger als 10 Beschäftigte und Jahresumsatz oder Jahresbilanzsumme höchstens 2 Mio. €), sind ausgenommen (BFSG § 3 Abs. 3). Details: <a href="${url(ROUTES.sources.de)}">Pflichten und Quellen</a>. Keine Rechtsberatung.</p>`],
      ['Ist das eine vollständige Prüfung?', '<p>Nein. Automatische Tests finden nur einen Teil der Barrieren; der Bericht nennt keinen Konformitätsgrad und ist keine Bescheinigung.</p>'],
      ['Was mache ich mit dem Bericht?', `<p>Geben Sie ihn an Ihre Entwickler oder Agentur, beheben Sie zuerst „kritische“ und „ernste“ Probleme im Kaufprozess, führen Sie die 20 manuellen Prüfungen durch und erstellen Sie Ihre Erklärung mit dem <a href="${url(ROUTES.home.de)}">kostenlosen Generator</a>.</p>`],
      ['Wie schnell?', '<p>Innerhalb von 24 Arbeitsstunden nach Zahlungsbestätigung (Montag bis Freitag, ohne französische Feiertage).</p>'],
      ['Erstattung?', `<p>Laut <a href="${url(ROUTES.cgvPro.fr)}" hreflang="fr">AGB</a>: volle Erstattung auf Wunsch, wenn der Bericht nicht innerhalb von 5 Werktagen nach Zahlung geliefert wird. Kein Widerrufsrecht (Verkauf zwischen Unternehmen).</p>`],
    ],
    aboutTitle: 'Über uns',
    about: '<strong>READ FRANCE SAS</strong>, Paris (SIREN 988 741 773), entwickelt Werkzeuge und Kits, mit denen Unternehmen regulatorische Pflichten erfüllen: digitale Barrierefreiheit, Qualiopi, Produktsicherheit.',
    contact: 'Fragen vor der Bestellung?',
    foundersLabel: 'Gründer',
    portrait: 'Porträt von',
    more: 'Alle unsere Werkzeuge',
    legal: `Quellen: <a href="${url(ROUTES.sources.de)}">Gesetzestexte und Anwendungsbereich</a> · <a href="${url(ROUTES.legal.de)}">Impressum</a>. Unabhängiges Produkt, nicht staatlich geprüft oder empfohlen.`,
    bar: ['Prüfung 20 Seiten · 149 €', 'Bestellen'],
  },
  en: {
    eyebrow: 'For companies registered in France only',
    h1: `Automated accessibility audit of ${MAX_PAGES} pages for companies in France`,
    lead: 'Up to 20 pages, tested on desktop and mobile. The PDF report is e-mailed within 24 business hours and lists every issue detected, its severity, the elements involved and the WCAG criterion.',
    cta: 'Order as a company in France – €149',
    ctaNote: '',
    frOnly: 'We sell this audit only to companies registered in France: the order form asks for a SIREN number, and the form and terms of sale are in French. Outside France, the accessibility statement generator, the self-check and the mini-test are free.',
    free: ['Open the free generator', ROUTES.home.en],
    second: ['Free mini-test', ROUTES.check.en],
    limits: 'Automated analysis with axe-core, no human review. Not a full conformance audit.',
    visualAlt: 'First page of a sample report: summary of detected issues by severity',
    visualCaption: 'Real report, generated on our demo page',
    whyTitle: 'What applies since 28 June 2025',
    why: [
      'The European Accessibility Act (Directive (EU) 2019/882) covers online shops that sell to consumers and several other consumer services. Covered businesses must publish accessibility information about their service; in France, failing to draw up or publish it is a 5th-class contravention (Code de la consommation, art. R. 451-4).',
      'Before writing that information or getting fixes quoted, you need a list of issues, page by page. A full audit is done by hand by an auditor, on quote, in days of work. Our automated audit finds in 24 business hours what a machine can detect, and does not replace that full audit.',
    ],
    whyMore: ['Official texts and exemptions', ROUTES.sources.en],
    getTitle: 'What you get',
    get: [
      `At most ${MAX_PAGES} public pages, the ones you list or those found by following links from your site address (same domain, robots.txt respected).`,
      'Each page tested on desktop (1,280 px) and mobile (390 px), with horizontal-scroll detection on mobile.',
      'Issues ranked by severity, with the WCAG criterion and the number of pages and elements affected.',
      'The selector and a code excerpt of each element involved, so your developer knows where to fix.',
      '20 manual checks that automation cannot do.',
      'A PDF in English, French or German, with page screenshots and the paid invoice.',
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
      'Your company is registered in France, sells to consumers online and wants to know which issues to fix first.',
      'You run a web agency in France and, with a client’s permission, want a baseline of their site before quoting a redesign.',
    ],
    whoNot: 'It is not for you if your company is not registered in France, if you only sell to businesses, or if you need a certificate of conformity.',
    offerTitle: 'Partial automated accessibility audit: €149 net',
    offerVat: 'VAT not applicable, art. 293 B of the French tax code. One-off card payment (Stripe). Companies registered in France only (SIREN).',
    offerList: [`Up to ${MAX_PAGES} pages, desktop and mobile`, 'PDF report within 24 business hours', 'Issues by severity, elements and code involved', '20 manual checks to do next', 'Paid invoice sent with the report'],
    offerGuarantee: 'No report within 5 working days of payment: you can ask for cancellation and a full refund (terms, art. 7).',
    offerNot: 'Not included: human review, fixing your site, pages behind a login. No conformance rate or certificate.',
    offerTerms: 'Terms of sale (French)',
    faqTitle: 'Frequently asked questions',
    faq: [
      ['Can I order from outside France?', `<p>No. The order form asks for a French SIREN number, and the form, invoice and terms are in French. The <a href="${url(ROUTES.home.en)}">generator</a> and the <a href="${url(ROUTES.check.en)}">mini-test</a> are free to use from anywhere.</p>`],
      ['Is my site concerned?', `<p>Since 28 June 2025 the European Accessibility Act (Directive (EU) 2019/882) applies to consumer services such as <strong>e-commerce</strong>, consumer banking, e-books, passenger transport and electronic communications. <strong>Microenterprises providing services</strong> (fewer than 10 staff and annual turnover or balance sheet total of at most €2 million) are exempt (art. 4(5)). Business-to-business sales only are not covered. Details: <a href="${url(ROUTES.sources.en)}">obligations and sources</a>. Not legal advice.</p>`],
      ['Is this a full audit?', '<p>No. Automated tests only find part of the issues; the report gives no conformance rate and is not a certificate.</p>'],
      ['What do I do with the report?', `<p>Hand it to your developer or agency, fix “critical” and “serious” issues on the purchase path first, do the 20 manual checks, then draft your statement with the <a href="${url(ROUTES.home.en)}">free generator</a>.</p>`],
      ['How fast?', '<p>Within 24 business hours of payment confirmation (Monday to Friday, excluding French public holidays).</p>'],
      ['Refunds?', `<p>Per the <a href="${url(ROUTES.cgvPro.fr)}" hreflang="fr">terms</a>: full refund on request if the report is not delivered within 5 working days of payment. No withdrawal right (business-to-business sale).</p>`],
    ],
    aboutTitle: 'About us',
    about: '<strong>READ FRANCE SAS</strong>, based in Paris (SIREN 988 741 773), builds tools and kits that help businesses meet regulatory obligations: digital accessibility, Qualiopi, product safety.',
    contact: 'A question before ordering?',
    foundersLabel: 'Founders',
    portrait: 'Portrait of',
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
  // DE and EN: the audit is sold to companies registered in France only (founder decision 2026-10-13, no
  // sales in Germany). Those pages lead with the free tools; the order button stays in the offer card.
  const heroCta = t.frOnly
    ? `<p class="callout info fr-only">${t.frOnly}</p>
<div class="cta-row">
<a class="btn btn-lg" href="${url(t.free[1])}">${t.free[0]}</a>
<a class="text-link" href="${url(t.second[1])}">${t.second[0]} →</a>
</div>`
    : `<div class="cta-row">
<a class="btn btn-lg" href="${ORDER}"${orderAttrs}>${t.cta}</a>
<a class="text-link" href="${url(t.second[1])}">${t.second[0]} →</a>
</div>`;
  return `<section class="lp-hero" data-section="hero">
<div class="lp-hero-text">
<p class="eyebrow">${t.eyebrow}</p>
<h1>${t.h1}</h1>
<p class="lead">${t.lead}</p>
${heroCta}
${t.ctaNote ? `<p class="fine">${t.ctaNote}</p>\n` : ''}<p class="fine limits">${t.limits}</p>
</div>
<figure class="lp-hero-visual">
<a class="doc-stack" href="${url(sample.html)}">
<img class="doc doc-3" src="${img(lang, 5)}" srcset="${srcset(lang, 5)}" sizes="${HERO_SIZES}" alt="" width="760" height="1075" loading="lazy" decoding="async">
<img class="doc doc-2" src="${img(lang, 2)}" srcset="${srcset(lang, 2)}" sizes="${HERO_SIZES}" alt="" width="760" height="1075" loading="lazy" decoding="async">
<img class="doc doc-1" src="${img(lang, 1)}" srcset="${srcset(lang, 1)}" sizes="${HERO_SIZES}" alt="${t.visualAlt}" width="760" height="1075" fetchpriority="high">
</a>
<figcaption>${t.visualCaption}</figcaption>
</figure>
</section>

<section class="lp-section" data-section="pourquoi" aria-labelledby="why-title">
<h2 id="why-title">${t.whyTitle}</h2>
<div class="prose">${t.why.map((p) => `<p>${p}</p>`).join('\n')}</div>
<p><a href="${url(t.whyMore[1])}">${t.whyMore[0]} →</a></p>
</section>

<section class="lp-section" data-section="livrables" aria-labelledby="get-title">
<h2 id="get-title">${t.getTitle}</h2>
<ul class="ticks">${t.get.map((g) => `<li>${check}<span>${g}</span></li>`).join('')}</ul>
</section>

<section class="lp-section" id="exemple" aria-labelledby="gallery-title">
<h2 id="gallery-title">${t.galleryTitle}</h2>
<p>${t.galleryIntro}</p>
<div class="gallery">
${t.shots.map(([alt, cap], i) => `<figure><a href="${url(sample.html)}"><img src="${img(lang, [1, 2, 5][i])}" srcset="${srcset(lang, [1, 2, 5][i])}" sizes="${GALLERY_SIZES}" alt="${alt}" width="760" height="1075" loading="lazy" decoding="async"></a><figcaption>${cap}</figcaption></figure>`).join('\n')}
</div>
<div class="btn-row">
<a class="btn secondary" href="${url(sample.html)}">${t.openHtml}</a>
<a class="btn secondary" href="${url(sample.pdf)}" type="application/pdf">${t.openPdf}</a>
</div>
</section>

<section class="lp-section" data-section="pour-qui" aria-labelledby="who-title">
<h2 id="who-title">${t.whoTitle}</h2>
<ul class="who-list">${t.who.map((p) => `<li>${p}</li>`).join('')}</ul>
<p class="callout">${t.whoNot}</p>
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

<section class="lp-section" data-section="faq" aria-labelledby="faq-title">
<h2 id="faq-title">${t.faqTitle}</h2>
<div class="faq">
${t.faq.map(([q, a], i) => `<details id="faq-${i + 1}"><summary>${q}</summary><div class="faq-a">${a}</div></details>`).join('\n')}
</div>
</section>

<section class="lp-section about" data-section="fondateurs" aria-labelledby="about-title">
<div class="about-intro">
<p class="eyebrow">${t.aboutTitle}</p>
<h2 id="about-title">READ FRANCE SAS, Paris</h2>
<p>${t.about}</p>
</div>
<ul class="founders" aria-label="${t.foundersLabel}">
${FOUNDERS.map((f) => `<li class="founder">
<img class="founder-photo" src="${url(`assets/img/${f.photo}`)}" width="112" height="112" alt="${t.portrait} ${f.name}" loading="lazy" decoding="async">
<div><h3 class="founder-name">${f.name}</h3><p class="founder-role">${f.role[lang]}</p></div>
<p class="founder-bio">${f.bio[lang]}</p>
</li>`).join('\n')}
</ul>
<p class="about-foot">${t.contact} <a href="mailto:${CONTACT}">${CONTACT}</a> · <a href="https://outils.vread.fr/">${t.more}</a></p>
</section>

<p class="fine sources-line">${t.legal}</p>

${t.frOnly ? '' : `<div class="cta-bar"><span>${t.bar[0]}</span><a class="btn" href="${ORDER}"${orderAttrs}>${t.bar[1]} →</a></div>`}`;
}

export const auditSalesBodies = { fr: auditPage('fr'), de: auditPage('de'), en: auditPage('en') };
