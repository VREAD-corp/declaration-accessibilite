import { SITE, ROUTES, RELEASE_DL, OPEN, PRICE } from './site.js';
import { AUDIT_META_OPEN, auditJsonLd, ORG_REF, orderBody, orderScripts, orderReturnBody, orderReturnScripts, ORDER_CSP, ORDER_RETURN_CSP, cgvProBody, privacyOrderSection, cgvDraftReplaced } from './order.js';
import { url } from './layout.js';
import { formHtml } from './form.js';
import { legalBodies, privacyBodies, cgvBody } from './legal.js';
import { auditBodies } from './audit.js';
import { auditSalesBodies } from './audit-open.js';
import { sourcesBodies } from './sources.js';
import { DOCS } from '../lib/statement.js';
import { CHECKS, rgaaFor } from '../lib/checklist.js';
import { TEMPLATE_FILES } from '../lib/templates-list.js';

export { SITE };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const HOME = {
  fr: {
    title: 'Déclaration d’accessibilité : générateur gratuit RGAA et EAA',
    description: 'Déclaration d’accessibilité modèle RGAA, informations de l’Acte européen (EAA), schéma pluriannuel. Gratuit, rien n’est envoyé. Export Word, HTML.',
    h1: 'Générateur de déclaration d’accessibilité',
    lead: 'Pour les sites et boutiques en ligne visés par l’Acte européen sur l’accessibilité (directive (UE) 2019/882, applicable depuis le 28 juin 2025) ou par l’article 47 de la loi n° 2005-102. Le questionnaire compte 7 parties ; l’aperçu se met à jour à chaque réponse et s’exporte en Word, HTML ou Markdown.',
    badges: ['Gratuit', 'Saisies jamais envoyées', 'Modèle RGAA + informations EAA', 'HTML · Markdown · Word'],
    warn: '<strong>Cet outil met en forme vos réponses ; il ne vérifie pas votre site et ne garantit aucune conformité.</strong> Une déclaration doit refléter un audit réel. Sans audit, l’état indiqué est « non conforme ».',
    formTitle: 'Questionnaire',
    previewTitle: 'Aperçu du document',
    docLabel: 'Document à générer',
    export: 'Exporter',
    exportBtns: { docx: 'Word (.docx)', html: 'Page HTML', md: 'Markdown', 'copy-html': 'Copier le HTML', 'copy-md': 'Copier le Markdown' },
    saveTitle: 'Vos réponses',
    saveText: 'Elles restent sur cet appareil (stockage local du navigateur). Vous pouvez les sauvegarder dans un fichier pour les reprendre ailleurs.',
    saveJson: 'Enregistrer mes réponses (.json)',
    loadJson: 'Reprendre un fichier de réponses',
    reset: 'Effacer mes réponses',
    noscript: 'Le générateur nécessite JavaScript. Vous pouvez aussi télécharger les modèles vierges ci-dessous.',
    tplTitle: 'Modèles gratuits à télécharger',
    tplText: 'Versions vierges à compléter :',
    eyebrow: 'Gratuit · sans inscription · vos saisies restent chez vous',
    start: 'Commencer le questionnaire',
    promo: {
      title: 'Les défauts de vos 20 pages clés, en 24 h',
      text: 'Vos 20 pages clés testées sur ordinateur et mobile : rapport PDF sous 24 h ouvrées, problèmes classés par gravité, éléments à corriger.',
      cta: 'Voir l’audit – 149 €',
      fine: '149 € net, TVA non applicable (art. 293 B du CGI). Analyse automatisée : ce n’est pas un audit RGAA complet.',
      alt: 'Aperçu d’un rapport d’audit : synthèse des problèmes classés par gravité',
    },
    nextTitle: 'Après la déclaration',
    gpsr: 'Vous vendez des produits en ligne ? Le règlement GPSR impose aussi des informations de sécurité sur chaque fiche produit : <a href="https://outils.vread.fr/kit-gpsr-vendeurs/">générateur gratuit de fiche produit GPSR</a>.',
    next: [
      ['Vérifier les bases', `L’<a href="${url(ROUTES.check.fr)}">auto-contrôle en 20 points</a> se fait à la main sur vos pages clés ; le mini-test passe un extrait HTML au moteur axe-core, dans votre navigateur.`],
      ['Comprendre vos obligations', `Moins de 10 personnes et 2 M€ de chiffre d’affaires ou de bilan au plus : vous êtes probablement exempté. Les textes et les sanctions sont sur la page <a href="${url(ROUTES.sources.fr)}">obligations et sources</a>.`],
      ['Aller plus loin', OPEN ? `L’<a href="${url(ROUTES.audit.fr)}">audit automatisé</a> teste jusqu’à 20 pages de votre site sur ordinateur et mobile : rapport PDF sous 24 h ouvrées.` : `Un <a href="${url(ROUTES.audit.fr)}">audit automatisé partiel à 149 € net</a> (TVA non applicable, art. 293 B du CGI) est en préparation (pas encore de commande possible).`],
    ],
  },
  de: {
    title: 'Barrierefreiheitserklärung: kostenloser Generator nach BFSG',
    description: 'Informationen zur Barrierefreiheit nach § 14 BFSG und Anlage 3 kostenlos erstellen, mit Maßnahmenplan. Eingaben bleiben im Browser. Export Word, HTML.',
    h1: 'Generator für Barrierefreiheitserklärungen',
    lead: 'Für Websites und Online-Shops, die unter den European Accessibility Act (Richtlinie (EU) 2019/882) und das Barrierefreiheitsstärkungsgesetz (BFSG, seit 28. Juni 2025 anwendbar) fallen. Der Fragebogen hat 7 Teile; die Vorschau folgt Anlage 3, ändert sich mit jeder Antwort und lässt sich als Word, HTML oder Markdown exportieren.',
    badges: ['Kostenlos', 'Eingaben bleiben lokal', 'Nach BFSG Anlage 3', 'HTML · Markdown · Word'],
    warn: '<strong>Dieses Werkzeug formatiert Ihre Angaben; es prüft Ihre Website nicht und garantiert keine Konformität.</strong> Die Angaben müssen dem tatsächlichen Stand entsprechen.',
    formTitle: 'Fragebogen',
    previewTitle: 'Vorschau',
    docLabel: 'Zu erstellendes Dokument',
    export: 'Exportieren',
    exportBtns: { docx: 'Word (.docx)', html: 'HTML-Seite', md: 'Markdown', 'copy-html': 'HTML kopieren', 'copy-md': 'Markdown kopieren' },
    saveTitle: 'Ihre Angaben',
    saveText: 'Sie bleiben auf diesem Gerät (lokaler Browserspeicher). Sie können sie in einer Datei sichern, um woanders weiterzumachen.',
    saveJson: 'Angaben speichern (.json)',
    loadJson: 'Angaben aus Datei laden',
    reset: 'Angaben löschen',
    noscript: 'Der Generator benötigt JavaScript. Sie können auch die leeren Vorlagen unten herunterladen.',
    tplTitle: 'Kostenlose Vorlagen',
    tplText: 'Leere Vorlagen zum Ausfüllen:',
    eyebrow: 'Kostenlos · ohne Anmeldung · Eingaben bleiben lokal',
    start: 'Fragebogen starten',
    promo: {
      title: 'Wissen, was auf Ihrer Website blockiert',
      text: 'Ihre 20 wichtigsten Seiten auf Desktop und Mobil geprüft: PDF-Bericht in 24 Arbeitsstunden, Probleme nach Schweregrad (für Unternehmen mit Sitz in Frankreich).',
      cta: 'Zur Prüfung – 149 €',
      fine: '149 € netto, keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI. Automatisierte Prüfung, keine Konformitätsprüfung.',
      alt: 'Vorschau eines Prüfberichts: Übersicht der Probleme nach Schweregrad',
    },
    nextTitle: 'Nach der Erklärung',
    gpsr: 'Sie verkaufen Produkte online? Die Produktsicherheitsverordnung (GPSR) verlangt außerdem Sicherheitsangaben in jedem Produktangebot: <a href="https://outils.vread.fr/kit-gpsr-vendeurs/en/" hreflang="en">kostenloser GPSR-Generator für Produktangaben (auf Englisch)</a>.',
    next: [
      ['Grundlagen prüfen', `Den <a href="${url(ROUTES.check.de)}">Selbsttest in 20 Punkten</a> machen Sie von Hand auf Ihren wichtigsten Seiten; die Mini-Prüfung testet einen HTML-Auszug mit axe-core, direkt im Browser.`],
      ['Pflichten verstehen', `Weniger als 10 Beschäftigte und höchstens 2 Mio. € Umsatz oder Bilanzsumme: Dann greift wahrscheinlich die Ausnahme nach § 3 Abs. 3 BFSG. Gesetzestexte und Bußgelder stehen unter <a href="${url(ROUTES.sources.de)}">Pflichten und Quellen</a>.`],
      ['Audit nur für Unternehmen in Frankreich', OPEN ? `Unser <a href="${url(ROUTES.audit.de)}">automatisiertes Audit</a> (149 € netto) verkaufen wir nur an Unternehmen mit Sitz in Frankreich (SIREN). Für Shops in Deutschland und Österreich bleiben Generator, Selbsttest und Mini-Prüfung kostenlos.` : `Eine <a href="${url(ROUTES.audit.de)}">teilautomatisierte Prüfung für 149 € netto</a> (keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI) ist in Vorbereitung (noch keine Bestellung möglich).`],
    ],
  },
  en: {
    title: 'Free accessibility statement generator (EAA, Annex V)',
    description: 'Draft the accessibility information required by the European Accessibility Act (Annex V, Directive 2019/882). Free, nothing leaves your browser.',
    h1: 'Accessibility statement generator',
    lead: 'For websites and online shops covered by the European Accessibility Act (Directive (EU) 2019/882, applicable since 28 June 2025). The questionnaire has 7 parts; the preview follows Annex V, updates with each answer and exports to Word, HTML or Markdown. The French (RGAA) and German (BFSG) versions are on the FR and DE pages.',
    badges: ['Free', 'Your input stays local', 'EAA Annex V structure', 'HTML · Markdown · Word'],
    warn: '<strong>This tool formats your answers; it does not test your website and guarantees no conformity.</strong> What you publish must reflect your real situation.',
    formTitle: 'Questionnaire',
    previewTitle: 'Document preview',
    docLabel: 'Document to generate',
    export: 'Export',
    exportBtns: { docx: 'Word (.docx)', html: 'HTML page', md: 'Markdown', 'copy-html': 'Copy HTML', 'copy-md': 'Copy Markdown' },
    saveTitle: 'Your answers',
    saveText: 'They stay on this device (browser local storage). You can save them to a file to continue elsewhere.',
    saveJson: 'Save my answers (.json)',
    loadJson: 'Load an answers file',
    reset: 'Erase my answers',
    noscript: 'The generator needs JavaScript. You can also download the blank templates below.',
    tplTitle: 'Free templates',
    tplText: 'Blank templates to fill in:',
    eyebrow: 'Free · no sign-up · your input stays local',
    start: 'Start the questionnaire',
    promo: {
      title: 'Find out what blocks users on your site',
      text: 'Your 20 key pages tested on desktop and mobile: PDF report within 24 business hours, issues ranked by severity (companies registered in France).',
      cta: 'See the audit – €149',
      fine: '€149 net, VAT not applicable (art. 293 B of the French tax code). Automated analysis, not a full conformance audit.',
      alt: 'Preview of an audit report: summary of issues ranked by severity',
    },
    nextTitle: 'After the statement',
    gpsr: 'Do you sell products online? The General Product Safety Regulation (GPSR) also requires safety information on every product listing: <a href="https://outils.vread.fr/kit-gpsr-vendeurs/en/">free GPSR product information generator</a>.',
    next: [
      ['Check the basics', `The <a href="${url(ROUTES.check.en)}">20-point self-check</a> is done by hand on your key pages; the mini-test runs an HTML snippet through axe-core, in your browser.`],
      ['Understand your obligations', `Fewer than 10 staff and at most €2 million in turnover or balance sheet total: the microenterprise exemption probably applies. The texts and fines are on the <a href="${url(ROUTES.sources.en)}">obligations and sources</a> page.`],
      ['Audit for companies in France only', OPEN ? `We sell our <a href="${url(ROUTES.audit.en)}">automated audit</a> (€149 net) only to companies registered in France (SIREN). Elsewhere, the generator, the self-check and the mini-test stay free.` : `A <a href="${url(ROUTES.audit.en)}">partial automated audit at €149 net</a> (VAT not applicable, art. 293 B of the French tax code) is in preparation (no orders yet).`],
    ],
  },
};

function templatesList(lang) {
  return `<ul>${TEMPLATE_FILES.filter((f) => f.lang === lang)
    .map((f) => `<li><a href="${RELEASE_DL}${f.name}">${esc(f.label)}</a> <span class="hint">(${f.name.split('.').pop().toUpperCase()})</span></li>`)
    .join('')}</ul>`;
}

function homeBody(lang) {
  const h = HOME[lang];
  const docs = DOCS[lang];
  // The paid audit is sold to companies registered in France only (founder decision 2026-10-13: no sales
  // in Germany), so the DE and EN generators are free-tool pages: no audit promo in the hero.
  const showPromo = OPEN && lang === 'fr';
  const promo = showPromo
    ? `<aside class="audit-promo" id="audit-offer" aria-labelledby="promo-title">
<div class="promo-thumb"><img src="${url(`assets/img/rapport-${lang}-p1.webp`)}" srcset="${url(`assets/img/rapport-${lang}-p1-380.webp`)} 380w, ${url(`assets/img/rapport-${lang}-p1.webp`)} 760w" sizes="7rem" alt="${esc(h.promo.alt)}" width="760" height="1075" decoding="async"></div>
<div>
<h2 id="promo-title">${esc(h.promo.title)}</h2>
<p>${esc(h.promo.text)}</p>
<p><a class="btn" href="${url(ROUTES.audit[lang])}">${esc(h.promo.cta)}</a></p>
<p class="fine">${esc(h.promo.fine)}</p>
</div>
</aside>`
    : '';
  return `<section data-section="hero" class="lp-hero gen-hero${showPromo ? '' : ' solo'}">
<div class="lp-hero-text">
<p class="eyebrow">${esc(h.eyebrow)}</p>
<h1>${esc(h.h1)}</h1>
<p class="lead">${esc(h.lead)}</p>
<ul class="badges">${h.badges.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
<p><a class="text-link" href="#form-title">${esc(h.start)} ↓</a></p>
</div>
${promo}
</section>
<noscript><p class="callout">${esc(h.noscript)}</p></noscript>
<div class="grid gen-grid">
<section data-section="generateur" aria-labelledby="form-title">
<h2 id="form-title">${esc(h.formTitle)}</h2>
<p class="note">${h.warn}</p>
<form id="gen-form" novalidate>
${formHtml(lang)}
</form>
<div class="save-box">
<h3 class="save-title">${esc(h.saveTitle)}</h3>
<p class="hint">${esc(h.saveText)}</p>
<div class="btn-row">
<button type="button" class="btn secondary" id="save-json">${esc(h.saveJson)}</button>
<label class="btn secondary" for="import-json">${esc(h.loadJson)}</label>
<input type="file" id="import-json" accept="application/json,.json" class="sr-only">
<button type="button" class="btn secondary" id="reset">${esc(h.reset)}</button>
</div>
</div>
</section>
<section data-section="apercu" class="preview-col" aria-labelledby="preview-title">
<h2 id="preview-title">${esc(h.previewTitle)}</h2>
<fieldset class="choices" id="doc-choice"><legend>${esc(h.docLabel)}</legend><div class="doc-choice">
${docs.map((d, i) => `<div class="choice"><input type="radio" name="doc" id="doc-${d.id}" value="${d.id}"${i === 0 ? ' checked' : ''}><label for="doc-${d.id}">${esc(d.label)}</label></div>`).join('')}
</div></fieldset>
<div id="export" role="group" aria-label="${esc(h.export)}" class="btn-row">
${Object.entries(h.exportBtns).map(([k, v], i) => `<button type="button" class="btn${i > 2 ? ' secondary' : ''}" data-fmt="${k}" data-mesure="free_download">${esc(v)}</button>`).join('\n')}
</div>
<p id="export-status" role="status" class="hint"></p>
<div class="preview" id="preview" tabindex="0" aria-label="${esc(h.previewTitle)}"></div>
</section>
</div>
<section data-section="modeles" aria-labelledby="tpl-title">
<h2 id="tpl-title">${esc(h.tplTitle)}</h2>
<p>${esc(h.tplText)}</p>
${templatesList(lang)}
</section>
<section data-section="suite" aria-labelledby="next-title">
<h2 id="next-title">${esc(h.nextTitle)}</h2>
<ul class="next-list">${h.next.map(([title, text]) => `<li><h3>${esc(title)}</h3><p>${text}</p></li>`).join('')}</ul>
<p>${h.gpsr}</p>
</section>`;
}

const CHECK = {
  fr: {
    title: 'Auto-contrôle d’accessibilité en 20 points et mini-test axe-core',
    description: '20 vérifications manuelles avec correspondances WCAG 2.1 et RGAA 4.1, et un test automatique gratuit d’un extrait HTML avec axe-core, exécuté dans votre navigateur.',
    h1: 'Auto-contrôle et mini-test',
    lead: 'Deux outils rapides pour repérer des problèmes fréquents. Ni l’un ni l’autre ne mesure la conformité.',
    listTitle: 'Auto-contrôle en 20 points',
    listIntro: 'À faire sur vos pages clés (accueil, fiche produit, panier, commande). Correspondances RGAA issues du référentiel officiel RGAA 4.1 (DISIC, Licence Ouverte 2.0).',
    dl: 'Télécharger la grille (Word)',
    head: ['#', 'Vérification', 'Comment tester', 'WCAG 2.1', 'RGAA 4.1'],
    mcTitle: 'Mini-test automatique d’un extrait HTML',
    mcIntro: 'Collez le code HTML d’une page ou d’un composant (clic droit › « Afficher le code source », ou l’inspecteur du navigateur). Le test s’exécute dans votre navigateur avec axe-core 4.13 ; le code n’est envoyé nulle part.',
    mcNote: 'Les scripts du code collé sont retirés et aucune ressource externe n’est chargée (images, CSS, polices). Pour tester les contrastes, collez aussi le CSS dans une balise &lt;style&gt;.',
    label: 'Code HTML à tester',
    run: 'Lancer le mini-test',
    example: 'Insérer un exemple défectueux',
    i18n: {
      empty: 'Collez d’abord du code HTML.',
      running: 'Test en cours…',
      done: 'Test terminé.',
      error: 'Le test n’a pas pu aboutir :',
      frameTitle: 'Cadre de test isolé',
      summary: 'Résultat : {v} type(s) de problème détecté(s) automatiquement ({vn} élément(s)), {r} point(s) à vérifier manuellement ({rn} élément(s)). Ce n’est pas une mesure de conformité.',
      violations: 'Problèmes détectés',
      review: 'À vérifier manuellement',
      impact: 'Gravité',
      impacts: { critical: 'critique', serious: 'sérieuse', moderate: 'modérée', minor: 'mineure' },
      elements: 'Éléments',
      more: '… et {n} autre(s)',
      learn: 'Explication détaillée (Deque, en anglais)',
      none: 'Aucun problème détecté automatiquement sur cet extrait. Cela ne signifie pas qu’il est accessible : la plupart des critères demandent une vérification humaine.',
      limits: 'Les tests automatiques ne détectent qu’une partie des problèmes d’accessibilité. Ce résultat ne permet pas de déterminer un état ou un taux de conformité. Les correspondances RGAA affichées sont indicatives.',
    },
  },
  de: {
    title: 'Barrierefreiheits-Selbsttest in 20 Punkten und axe-core-Mini-Prüfung',
    description: '20 manuelle Prüfpunkte mit WCAG-2.1-Zuordnung und eine kostenlose automatische Prüfung eines HTML-Auszugs mit axe-core, direkt im Browser.',
    h1: 'Selbsttest und Mini-Prüfung',
    lead: 'Zwei schnelle Werkzeuge, um häufige Probleme zu finden. Keines davon misst Konformität.',
    listTitle: 'Selbsttest in 20 Punkten',
    listIntro: 'Auf Ihren wichtigsten Seiten durchführen (Startseite, Produktseite, Warenkorb, Bestellung).',
    dl: 'Checkliste herunterladen (Word)',
    head: ['#', 'Prüfpunkt', 'So testen', 'WCAG 2.1', 'RGAA 4.1'],
    mcTitle: 'Automatische Mini-Prüfung eines HTML-Auszugs',
    mcIntro: 'Fügen Sie den HTML-Code einer Seite oder Komponente ein (Rechtsklick › „Seitenquelltext anzeigen“ oder Entwicklertools). Die Prüfung läuft in Ihrem Browser mit axe-core 4.13; der Code wird nirgendwohin gesendet.',
    mcNote: 'Skripte im eingefügten Code werden entfernt, externe Ressourcen (Bilder, CSS, Schriften) werden nicht geladen. Für Kontrastprüfungen das CSS in einem &lt;style&gt;-Element mit einfügen.',
    label: 'Zu prüfender HTML-Code',
    run: 'Mini-Prüfung starten',
    example: 'Fehlerhaftes Beispiel einfügen',
    i18n: {
      empty: 'Bitte zuerst HTML-Code einfügen.',
      running: 'Prüfung läuft …',
      done: 'Prüfung abgeschlossen.',
      error: 'Die Prüfung ist fehlgeschlagen:',
      frameTitle: 'Isolierter Prüfrahmen',
      summary: 'Ergebnis: {v} Problemart(en) automatisch gefunden ({vn} Element(e)), {r} Punkt(e) manuell zu prüfen ({rn} Element(e)). Dies ist keine Konformitätsmessung.',
      violations: 'Gefundene Probleme',
      review: 'Manuell zu prüfen',
      impact: 'Schwere',
      impacts: { critical: 'kritisch', serious: 'ernst', moderate: 'mittel', minor: 'gering' },
      elements: 'Elemente',
      more: '… und {n} weitere',
      learn: 'Ausführliche Erklärung (Deque, Englisch)',
      none: 'Automatisch wurde kein Problem gefunden. Das heißt nicht, dass der Auszug barrierefrei ist: Die meisten Kriterien erfordern eine menschliche Prüfung.',
      limits: 'Automatische Tests finden nur einen Teil der Barrieren. Dieses Ergebnis sagt nichts über Konformität aus. Die RGAA-Zuordnung ist unverbindlich.',
    },
  },
  en: {
    title: '20-point accessibility self-check and axe-core mini-test',
    description: '20 manual checks mapped to WCAG 2.1, plus a free automated test of an HTML snippet with axe-core, run in your browser.',
    h1: 'Self-check and mini-test',
    lead: 'Two quick tools to spot common problems. Neither measures conformance.',
    listTitle: '20-point self-check',
    listIntro: 'Do it on your key pages (home, product page, cart, checkout).',
    dl: 'Download the checklist (Word)',
    head: ['#', 'Check', 'How to test', 'WCAG 2.1', 'RGAA 4.1'],
    mcTitle: 'Automated mini-test of an HTML snippet',
    mcIntro: 'Paste the HTML of a page or component (right-click › “View page source”, or the browser inspector). The test runs in your browser with axe-core 4.13; the code is not sent anywhere.',
    mcNote: 'Scripts in the pasted code are removed and no external resource is loaded (images, CSS, fonts). To test contrast, paste the CSS in a &lt;style&gt; element too.',
    label: 'HTML code to test',
    run: 'Run the mini-test',
    example: 'Insert a flawed example',
    i18n: {
      empty: 'Paste some HTML first.',
      running: 'Testing…',
      done: 'Test finished.',
      error: 'The test could not complete:',
      frameTitle: 'Isolated test frame',
      summary: 'Result: {v} issue type(s) detected automatically ({vn} element(s)), {r} item(s) needing manual review ({rn} element(s)). This is not a conformance measure.',
      violations: 'Detected issues',
      review: 'Needs manual review',
      impact: 'Severity',
      impacts: { critical: 'critical', serious: 'serious', moderate: 'moderate', minor: 'minor' },
      elements: 'Elements',
      more: '… and {n} more',
      learn: 'Detailed explanation (Deque)',
      none: 'No issue detected automatically in this snippet. That does not mean it is accessible: most criteria need human review.',
      limits: 'Automated tests only find part of accessibility issues. This result does not tell you a conformance status or rate. RGAA mappings are indicative.',
    },
  },
};

/** Lead-in from the free mini-test result to the paid audit (display only, while SALES_OPEN). */
const UPSELL = {
  fr: { upsell: '{n} point(s) relevé(s) sur cet extrait → l’audit vérifie jusqu’à 20 pages de votre site, sur ordinateur et mobile, pour 149 €.', upsellNone: 'Rien de détecté sur cet extrait ? L’audit vérifie jusqu’à 20 pages de votre site, sur ordinateur et mobile, pour 149 €.', upsellCta: 'Voir l’audit et un exemple de rapport', upsellHref: url(ROUTES.audit.fr) },
  de: { upsell: '{n} Punkt(e) in diesem Auszug gefunden → das Audit testet bis zu 20 Seiten Ihrer Website auf Desktop und Mobil, für 149 € (nur für Unternehmen in Frankreich).', upsellNone: 'Nichts gefunden? Das Audit testet bis zu 20 Seiten Ihrer Website auf Desktop und Mobil, für 149 € (nur für Unternehmen in Frankreich).', upsellCta: 'Prüfung und Beispielbericht ansehen', upsellHref: url(ROUTES.audit.de) },
  en: { upsell: '{n} item(s) flagged in this snippet → the audit checks up to 20 pages of your site, on desktop and mobile, for €149 (companies registered in France only).', upsellNone: 'Nothing detected in this snippet? The audit checks up to 20 pages of your site, on desktop and mobile, for €149 (companies registered in France only).', upsellCta: 'See the audit and a sample report', upsellHref: url(ROUTES.audit.en) },
};

export const EXAMPLE_SNIPPET = `<style>.promo{color:#aaa;background:#fff}</style>
<header><img src="logo.png"><a href="/panier"><img src="cart.svg"></a></header>
<h3>Nouveautés</h3>
<p class="promo">-20 % sur tout le site</p>
<form><input type="email" placeholder="Votre e-mail"><button></button></form>
<a href="/cgv">cliquez ici</a>`;

function checkBody(lang) {
  const c = CHECK[lang];
  const tpl = TEMPLATE_FILES.find((f) => f.lang === lang && f.kind === 'checklist' && f.name.endsWith('.docx'));
  return `<section class="hero" data-section="hero"><h1>${esc(c.h1)}</h1><p class="lead">${esc(c.lead)}</p></section>
<section data-section="auto-controle" aria-labelledby="list-title">
<h2 id="list-title">${esc(c.listTitle)}</h2>
<p>${esc(c.listIntro)}</p>
${tpl ? `<p><a class="btn secondary" href="${RELEASE_DL}${tpl.name}" data-mesure="free_download">${esc(c.dl)}</a></p>` : ''}
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="list-title">
<table><thead><tr>${c.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>
${CHECKS.map((k, i) => `<tr><td>${i + 1}</td><th scope="row">${esc(k[lang][0])}</th><td>${esc(k[lang][1])}</td><td>${k.wcag.join(', ')}</td><td>${rgaaFor(k.wcag).join(', ')}</td></tr>`).join('\n')}
</tbody></table></div>
</section>
<section data-section="mini-test" aria-labelledby="mc-title">
<h2 id="mc-title">${esc(c.mcTitle)}</h2>
<p>${esc(c.mcIntro)}</p>
<p class="callout info">${c.mcNote}</p>
<form id="minicheck" data-axe-src="${url('assets/vendor/axe/axe.min.js')}"${lang !== 'en' ? ` data-axe-locale="${url(`assets/vendor/axe/${lang}.json`)}"` : ''}>
<div class="field"><label for="snippet">${esc(c.label)}</label>
<textarea id="snippet" name="snippet" rows="10" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div>
<div class="btn-row"><button class="btn" type="submit" data-mesure="free_download">${esc(c.run)}</button>
<button class="btn secondary" type="button" id="mc-example">${esc(c.example)}</button></div>
<p id="mc-status" role="status"></p>
</form>
<div id="mc-results" class="results"></div>
<script type="application/json" id="mc-i18n">${JSON.stringify(OPEN ? { ...c.i18n, ...UPSELL[lang] } : c.i18n).replace(/</g, '\\u003c')}</script>
<script type="application/json" id="mc-example-src">${JSON.stringify(EXAMPLE_SNIPPET).replace(/</g, '\\u003c')}</script>
</section>`;
}

const NOT_FOUND = `<h1>Page introuvable / Seite nicht gefunden / Page not found</h1>
<ul><li><a href="${url('/')}" lang="fr">Accueil</a></li><li><a href="${url('/de/')}" lang="de">Startseite</a></li><li><a href="${url('/en/')}" lang="en">Home</a></li></ul>`;

const META = {
  audit: {
    fr: ['Audit automatisé partiel d’accessibilité – 149 € net (bientôt)', 'Audit automatisé partiel à 149 € net (TVA non applicable, art. 293 B du CGI) : 10 pages, 2 tailles d’écran, axe-core, rapport. Pas encore de commande possible.'],
    de: ['Teilautomatisierte Barrierefreiheitsprüfung – 149 € (bald)', 'Teilautomatisierte Prüfung für 149 € netto (keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI): 10 Seiten, axe-core, Bericht. Noch keine Bestellung möglich.'],
    en: ['Partial automated accessibility audit – €149 (coming soon)', 'Partial automated audit at €149 net (VAT not applicable, art. 293 B of the French tax code): 10 pages, axe-core, report. No orders yet.'],
  },
  legal: {
    fr: ['Mentions légales – A11y Kit', 'Éditeur, hébergeur, licences et avertissement du générateur de déclaration d’accessibilité A11y Kit.'],
    de: ['Impressum – A11y Kit', 'Anbieter, Hosting, Lizenzen und Hinweise zum Barrierefreiheitserklärungs-Generator A11y Kit.'],
    en: ['Legal notice – A11y Kit', 'Publisher, host, licences and disclaimer of the A11y Kit accessibility statement generator.'],
  },
  privacy: {
    fr: ['Confidentialité – A11y Kit', 'Aucune donnée personnelle collectée, aucun cookie : tout se passe dans votre navigateur.'],
    de: ['Datenschutz – A11y Kit', 'Keine personenbezogenen Daten, keine Cookies: alles läuft in Ihrem Browser.'],
    en: ['Privacy – A11y Kit', 'No personal data collected, no cookies: everything runs in your browser.'],
  },
};

function alternates(key, lang) {
  return Object.entries(ROUTES[key])
    .filter(([l]) => l !== lang)
    .map(([l, path]) => ({ lang: l, path }));
}

const PRIVACY_OPEN_DESC = {
  fr: 'Le générateur et le mini-test ne collectent rien de ce que vous saisissez ; la commande de l’audit payant traite les données de commande.',
  de: 'Generator und Mini-Prüfung erheben keine Ihrer Eingaben; die Bestellung der kostenpflichtigen Prüfung verarbeitet Bestelldaten.',
  en: 'The generator and mini-test collect nothing you type; ordering the paid audit processes order data.',
};

/** Privacy notice once the paid audit is on sale: the free tools still collect nothing; the order does. */
function privacyOpen(lang) {
  const lead = {
    fr: ['<p><strong>Ce site ne collecte aucune donnée personnelle.</strong></p>', '<p><strong>Le générateur, l’auto-contrôle et le mini-test ne collectent aucune donnée personnelle.</strong> Seule la commande de l’audit payant en traite (voir plus bas).</p>'],
    de: ['<p><strong>Diese Website erhebt keine personenbezogenen Daten.</strong></p>', '<p><strong>Generator, Selbsttest und Mini-Prüfung erheben keine personenbezogenen Daten.</strong> Nur die Bestellung der kostenpflichtigen Prüfung verarbeitet Daten (siehe unten).</p>'],
    en: ['<p><strong>This website collects no personal data.</strong></p>', '<p><strong>The generator, the self-check and the mini-test collect no personal data.</strong> Only ordering the paid audit does (see below).</p>'],
  }[lang];
  const body = privacyBodies[lang];
  if (!body.includes(lead[0])) throw new Error(`privacy ${lang}: lead sentence changed`);
  const i = body.lastIndexOf('</div>');
  return body.replace(lead[0], lead[1]).slice(0, i + lead[1].length - lead[0].length) + privacyOrderSection[lang] + '\n</div>';
}

const BREADCRUMB_HOME = { fr: 'Générateur', de: 'Generator', en: 'Generator' };
const abs = (path) => SITE.origin + SITE.base + path.replace(/^\//, '');

/** Sources pages: Article (legal summary, dated) + BreadcrumbList. Facts checked 2026-10-11, page edited 2026-10-13. */
function sourcesJsonLd(lang) {
  const src = sourcesBodies[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: src.h1,
        description: src.description,
        inLanguage: lang,
        url: abs(ROUTES.sources[lang]),
        mainEntityOfPage: abs(ROUTES.sources[lang]),
        datePublished: '2026-10-11',
        dateModified: '2026-10-13',
        author: ORG_REF,
        publisher: ORG_REF,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: BREADCRUMB_HOME[lang], item: abs(ROUTES.home[lang]) },
          { '@type': 'ListItem', position: 2, name: src.h1 },
        ],
      },
    ],
  };
}

const LANGS = ['fr', 'de', 'en'];
export const PAGES = [];
for (const lang of LANGS) {
  const h = HOME[lang];
  PAGES.push({
    id: 'home',
    lang,
    path: ROUTES.home[lang],
    title: h.title,
    description: h.description,
    alternates: alternates('home', lang),
    body: homeBody(lang),
    scripts: ['assets/js/app.js'],
    updated: '2026-10-13',
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: h.h1,
          url: SITE.origin + SITE.base + ROUTES.home[lang].replace(/^\//, ''),
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Any (web browser)',
          inLanguage: lang,
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
          publisher: ORG_REF,
        },
      ],
    },
  });
  PAGES.push({
    id: 'check',
    lang,
    path: ROUTES.check[lang],
    title: CHECK[lang].title,
    description: CHECK[lang].description,
    alternates: alternates('check', lang),
    body: checkBody(lang),
    scripts: ['assets/js/minicheck.js', 'assets/js/example.js'],
  });
  PAGES.push({
    id: 'audit',
    lang,
    path: ROUTES.audit[lang],
    title: (OPEN ? AUDIT_META_OPEN : META.audit)[lang][0],
    description: (OPEN ? AUDIT_META_OPEN : META.audit)[lang][1],
    alternates: alternates('audit', lang),
    body: OPEN ? auditSalesBodies[lang] : auditBodies[lang],
    jsonld: OPEN ? auditJsonLd(lang) : undefined,
    updated: '2026-10-13',
  });
  PAGES.push({
    id: 'sources',
    lang,
    path: ROUTES.sources[lang],
    title: sourcesBodies[lang].title,
    description: sourcesBodies[lang].description,
    alternates: alternates('sources', lang),
    body: sourcesBodies[lang].body,
    updated: '2026-10-13',
    jsonld: sourcesJsonLd(lang),
  });
  PAGES.push({ id: 'legal', lang, path: ROUTES.legal[lang], title: META.legal[lang][0], description: META.legal[lang][1], alternates: alternates('legal', lang), body: legalBodies[lang] });
  PAGES.push({ id: 'privacy', lang, path: ROUTES.privacy[lang], title: META.privacy[lang][0], description: OPEN ? PRIVACY_OPEN_DESC[lang] : META.privacy[lang][1], alternates: alternates('privacy', lang), body: OPEN ? privacyOpen(lang) : privacyBodies[lang], updated: '2026-10-13' });
}
PAGES.push({
  id: 'cgv',
  lang: 'fr',
  path: ROUTES.cgv.fr,
  title: OPEN ? 'Conditions générales de vente – A11y Kit' : 'Conditions générales de vente (projet) – A11y Kit',
  description: OPEN ? 'Les conditions générales de vente de l’audit automatisé partiel sont publiées sur la page CGV pro.' : 'Projet de conditions générales de vente de l’audit automatisé partiel, en attente de validation. Aucune vente ouverte.',
  body: OPEN ? cgvDraftReplaced : cgvBody,
  noindex: true,
});
if (OPEN) {
  const ORDER_NOTE = 'Mesure d’audience et de navigation anonyme, agrégée par jour, sans cookie ni donnée personnelle. Les données de commande sont transmises à Stripe et à notre service de commande (voir Confidentialité).';
  PAGES.push({ id: 'order', lang: 'fr', path: ROUTES.order.fr, file: 'commander.html', title: 'Commander l’audit automatisé partiel d’accessibilité – A11y Kit', description: 'Commande de l’audit automatisé partiel (axe-core, jusqu’à 20 pages, rapport PDF sous 24 h ouvrées), réservée aux professionnels.', body: orderBody, bodyScripts: orderScripts, csp: ORDER_CSP, noindex: true, noTracking: ORDER_NOTE });
  PAGES.push({ id: 'order-return', lang: 'fr', path: ROUTES.orderReturn.fr, file: 'commande.html', title: 'Votre commande – A11y Kit', description: 'Confirmation de commande de l’audit automatisé partiel.', body: orderReturnBody, bodyScripts: orderReturnScripts, csp: ORDER_RETURN_CSP, noindex: true, noTracking: ORDER_NOTE });
  PAGES.push({ id: 'cgv-pro', lang: 'fr', path: ROUTES.cgvPro.fr, file: 'cgv-pro.html', title: 'Conditions générales de vente aux professionnels – audit automatisé – A11y Kit', description: 'CGV B2B de l’audit automatisé partiel d’accessibilité (version du 13 octobre 2026).', body: cgvProBody, noindex: true });
}
PAGES.push({ id: '404', lang: 'fr', path: '/404/', title: 'Page introuvable – A11y Kit', description: 'Page introuvable.', body: NOT_FOUND });
