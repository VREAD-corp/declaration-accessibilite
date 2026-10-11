import { SITE, ROUTES, RELEASE_DL } from './site.js';
import { url } from './layout.js';
import { formHtml } from './form.js';
import { legalBodies, privacyBodies, cgvBody } from './legal.js';
import { auditBodies } from './audit.js';
import { sourcesBodies } from './sources.js';
import { DOCS } from '../lib/statement.js';
import { CHECKS, rgaaFor } from '../lib/checklist.js';
import { TEMPLATE_FILES } from '../lib/templates-list.js';

export { SITE };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const HOME = {
  fr: {
    title: 'Générateur gratuit de déclaration d’accessibilité (RGAA, EAA)',
    description: 'Rédigez gratuitement votre déclaration d’accessibilité (modèle RGAA), les informations exigées par l’Acte européen sur l’accessibilité et un schéma pluriannuel. Tout reste dans votre navigateur. Export HTML, Markdown, Word.',
    h1: 'Générateur de déclaration d’accessibilité',
    lead: 'Pour les sites et boutiques en ligne concernés par l’Acte européen sur l’accessibilité (directive (UE) 2019/882, applicable depuis le 28 juin 2025) et par l’article 47 de la loi de 2005. Répondez aux questions, relisez, exportez.',
    badges: ['Gratuit', 'Aucune donnée envoyée', 'Modèle RGAA + informations EAA', 'HTML · Markdown · Word'],
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
    tplText: 'Versions vierges à compléter, hébergées sur GitHub :',
    nextTitle: 'Et ensuite ?',
    next: [
      ['Vérifier les bases', `Faites l’<a href="${url(ROUTES.check.fr)}">auto-contrôle en 20 points</a> et le mini-test automatique d’un extrait HTML.`],
      ['Comprendre vos obligations', `Textes officiels, exemption des microentreprises et autorités de contrôle : <a href="${url(ROUTES.sources.fr)}">sources et champ d’application</a>.`],
      ['Aller plus loin', `Un <a href="${url(ROUTES.audit.fr)}">audit automatisé partiel à 149 € HT</a> est en préparation (pas encore de commande possible).`],
    ],
  },
  de: {
    title: 'Kostenloser Generator für Barrierefreiheitserklärungen (BFSG, EAA)',
    description: 'Erstellen Sie kostenlos die Barrierefreiheitsinformationen nach § 14 BFSG und Anlage 3 sowie einen Maßnahmenplan. Alles bleibt in Ihrem Browser. Export als HTML, Markdown, Word.',
    h1: 'Generator für Barrierefreiheitserklärungen',
    lead: 'Für Websites und Online-Shops, die unter den European Accessibility Act (Richtlinie (EU) 2019/882) und das Barrierefreiheitsstärkungsgesetz (BFSG, seit 28. Juni 2025 anwendbar) fallen. Fragen beantworten, prüfen, exportieren.',
    badges: ['Kostenlos', 'Keine Datenübertragung', 'Nach BFSG Anlage 3', 'HTML · Markdown · Word'],
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
    tplText: 'Leere Vorlagen zum Ausfüllen, gehostet auf GitHub:',
    nextTitle: 'Wie weiter?',
    next: [
      ['Grundlagen prüfen', `Machen Sie den <a href="${url(ROUTES.check.de)}">Selbsttest in 20 Punkten</a> und die automatische Mini-Prüfung eines HTML-Auszugs.`],
      ['Pflichten verstehen', `Gesetzestexte, Ausnahme für Kleinstunternehmen, Marktüberwachung: <a href="${url(ROUTES.sources.de)}">Quellen und Anwendungsbereich</a>.`],
      ['Weitergehen', `Eine <a href="${url(ROUTES.audit.de)}">teilautomatisierte Prüfung für 149 € netto</a> ist in Vorbereitung (noch keine Bestellung möglich).`],
    ],
  },
  en: {
    title: 'Free accessibility statement generator (EAA, Annex V)',
    description: 'Draft the accessibility information required by the European Accessibility Act (Annex V of Directive 2019/882) and an action plan for free. Everything stays in your browser. Export to HTML, Markdown, Word.',
    h1: 'Accessibility statement generator',
    lead: 'For websites and online shops covered by the European Accessibility Act (Directive (EU) 2019/882, applicable since 28 June 2025). Answer the questions, review, export. French (RGAA) and German (BFSG) versions are available in those languages.',
    badges: ['Free', 'No data sent', 'EAA Annex V structure', 'HTML · Markdown · Word'],
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
    tplText: 'Blank templates to fill in, hosted on GitHub:',
    nextTitle: 'What next?',
    next: [
      ['Check the basics', `Run the <a href="${url(ROUTES.check.en)}">20-point self-check</a> and the automated mini-test of an HTML snippet.`],
      ['Understand your obligations', `Official texts, the microenterprise exemption and enforcement: <a href="${url(ROUTES.sources.en)}">sources and scope</a>.`],
      ['Go further', `A <a href="${url(ROUTES.audit.en)}">partial automated audit at €149</a> is in preparation (no orders yet).`],
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
  return `<section class="hero">
<h1>${esc(h.h1)}</h1>
<p class="lead">${esc(h.lead)}</p>
<ul class="badges">${h.badges.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
<div class="callout">${h.warn}</div>
<noscript><p class="callout">${esc(h.noscript)}</p></noscript>
</section>
<div class="grid gen-grid">
<section aria-labelledby="form-title">
<h2 id="form-title">${esc(h.formTitle)}</h2>
<form id="gen-form" novalidate>
${formHtml(lang)}
</form>
</section>
<section class="preview-col" aria-labelledby="preview-title">
<h2 id="preview-title">${esc(h.previewTitle)}</h2>
<fieldset class="choices" id="doc-choice"><legend>${esc(h.docLabel)}</legend><div class="doc-choice">
${docs.map((d, i) => `<div class="choice"><input type="radio" name="doc" id="doc-${d.id}" value="${d.id}"${i === 0 ? ' checked' : ''}><label for="doc-${d.id}">${esc(d.label)}</label></div>`).join('')}
</div></fieldset>
<div id="export" role="group" aria-label="${esc(h.export)}" class="btn-row">
${Object.entries(h.exportBtns).map(([k, v], i) => `<button type="button" class="btn${i > 2 ? ' secondary' : ''}" data-fmt="${k}">${esc(v)}</button>`).join('\n')}
</div>
<p id="export-status" role="status" class="hint"></p>
<div class="preview" id="preview" tabindex="0" aria-label="${esc(h.previewTitle)}"></div>
<h3>${esc(h.saveTitle)}</h3>
<p class="hint">${esc(h.saveText)}</p>
<div class="btn-row">
<button type="button" class="btn secondary" id="save-json">${esc(h.saveJson)}</button>
<label class="btn secondary" for="import-json">${esc(h.loadJson)}</label>
<input type="file" id="import-json" accept="application/json,.json" class="sr-only">
<button type="button" class="btn secondary" id="reset">${esc(h.reset)}</button>
</div>
</section>
</div>
<section aria-labelledby="tpl-title">
<h2 id="tpl-title">${esc(h.tplTitle)}</h2>
<p>${esc(h.tplText)}</p>
${templatesList(lang)}
</section>
<section aria-labelledby="next-title">
<h2 id="next-title">${esc(h.nextTitle)}</h2>
<div class="cards">${h.next.map(([title, text]) => `<div class="card"><h3>${esc(title)}</h3><p>${text}</p></div>`).join('')}</div>
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
      limits: 'Les tests automatiques ne détectent qu’une partie des problèmes d’accessibilité. Ce résultat ne permet pas de déterminer un état ou un taux de conformité.',
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
      limits: 'Automatische Tests finden nur einen Teil der Barrieren. Dieses Ergebnis sagt nichts über Konformität aus.',
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
      limits: 'Automated tests only find part of accessibility issues. This result does not tell you a conformance status or rate.',
    },
  },
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
  return `<section class="hero"><h1>${esc(c.h1)}</h1><p class="lead">${esc(c.lead)}</p></section>
<section aria-labelledby="list-title">
<h2 id="list-title">${esc(c.listTitle)}</h2>
<p>${esc(c.listIntro)}</p>
${tpl ? `<p><a class="btn secondary" href="${RELEASE_DL}${tpl.name}">${esc(c.dl)}</a></p>` : ''}
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="list-title">
<table><thead><tr>${c.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>
${CHECKS.map((k, i) => `<tr><td>${i + 1}</td><th scope="row">${esc(k[lang][0])}</th><td>${esc(k[lang][1])}</td><td>${k.wcag.join(', ')}</td><td>${rgaaFor(k.wcag).join(', ')}</td></tr>`).join('\n')}
</tbody></table></div>
</section>
<section aria-labelledby="mc-title">
<h2 id="mc-title">${esc(c.mcTitle)}</h2>
<p>${esc(c.mcIntro)}</p>
<p class="callout info">${c.mcNote}</p>
<form id="minicheck" data-axe-src="${url('assets/vendor/axe/axe.min.js')}"${lang !== 'en' ? ` data-axe-locale="${url(`assets/vendor/axe/${lang}.json`)}"` : ''}>
<div class="field"><label for="snippet">${esc(c.label)}</label>
<textarea id="snippet" name="snippet" rows="10" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div>
<div class="btn-row"><button class="btn" type="submit">${esc(c.run)}</button>
<button class="btn secondary" type="button" id="mc-example">${esc(c.example)}</button></div>
<p id="mc-status" role="status"></p>
</form>
<div id="mc-results" class="results"></div>
<script type="application/json" id="mc-i18n">${JSON.stringify(c.i18n).replace(/</g, '\\u003c')}</script>
<script type="application/json" id="mc-example-src">${JSON.stringify(EXAMPLE_SNIPPET).replace(/</g, '\\u003c')}</script>
</section>`;
}

const NOT_FOUND = `<h1>Page introuvable / Seite nicht gefunden / Page not found</h1>
<ul><li><a href="${url('/')}" lang="fr">Accueil</a></li><li><a href="${url('/de/')}" lang="de">Startseite</a></li><li><a href="${url('/en/')}" lang="en">Home</a></li></ul>`;

const META = {
  audit: {
    fr: ['Audit automatisé partiel d’accessibilité – 149 € HT (bientôt)', 'Description de l’audit automatisé partiel à 149 € HT : 10 pages, 2 tailles d’écran, axe-core, rapport et brouillons de documents. Pas encore de commande possible.'],
    de: ['Teilautomatisierte Barrierefreiheitsprüfung – 149 € (bald)', 'Was die teilautomatisierte Prüfung für 149 € netto enthalten würde: 10 Seiten, 2 Bildschirmgrößen, axe-core, Bericht und Entwürfe. Noch keine Bestellung möglich.'],
    en: ['Partial automated accessibility audit – €149 (coming soon)', 'What the €149 partial automated audit would include: 10 pages, 2 screen sizes, axe-core, report and draft documents. No orders yet.'],
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
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: h.h1,
      url: SITE.origin + SITE.base + ROUTES.home[lang].replace(/^\//, ''),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (web browser)',
      inLanguage: lang,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@type': 'Organization', name: 'READ FRANCE SAS' },
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
    title: META.audit[lang][0],
    description: META.audit[lang][1],
    alternates: alternates('audit', lang),
    body: auditBodies[lang],
  });
  PAGES.push({
    id: 'sources',
    lang,
    path: ROUTES.sources[lang],
    title: sourcesBodies[lang].title,
    description: sourcesBodies[lang].description,
    alternates: alternates('sources', lang),
    body: sourcesBodies[lang].body,
  });
  PAGES.push({ id: 'legal', lang, path: ROUTES.legal[lang], title: META.legal[lang][0], description: META.legal[lang][1], alternates: alternates('legal', lang), body: legalBodies[lang] });
  PAGES.push({ id: 'privacy', lang, path: ROUTES.privacy[lang], title: META.privacy[lang][0], description: META.privacy[lang][1], alternates: alternates('privacy', lang), body: privacyBodies[lang] });
}
PAGES.push({
  id: 'cgv',
  lang: 'fr',
  path: ROUTES.cgv.fr,
  title: 'Conditions générales de vente (projet) – A11y Kit',
  description: 'Projet de conditions générales de vente de l’audit automatisé partiel, en attente de validation. Aucune vente ouverte.',
  body: cgvBody,
  noindex: true,
});
PAGES.push({ id: '404', lang: 'fr', path: '/404/', title: 'Page introuvable – A11y Kit', description: 'Page introuvable.', body: NOT_FOUND });
