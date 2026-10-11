// Questionnaire definition (labels in FR / DE / EN) and its HTML rendering.
// Field names are language-neutral so answers survive a language switch.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const YN = {
  fr: { yes: 'Oui', no: 'Non', unsure: 'Je ne sais pas' },
  de: { yes: 'Ja', no: 'Nein', unsure: 'Weiß nicht' },
  en: { yes: 'Yes', no: 'No', unsure: 'Not sure' },
};

import { FEATURES } from '../lib/statement.js';


const L = {
  fr: {
    s1: '1. Votre situation (indicatif)',
    country: ['Pays dont le droit s’applique', { FR: 'France', DE: 'Allemagne', EU: 'Autre pays de l’UE' }],
    publicBody: ['Êtes-vous un organisme public (administration, collectivité, établissement public) ?', 'Les organismes publics relèvent d’autres textes (directive 2016/2102, RGAA, BITV 2.0).'],
    consumerService: ['Fournissez-vous en ligne un service aux consommateurs couvert par l’Acte européen sur l’accessibilité ?', 'Par exemple : vente en ligne (commerce électronique), services bancaires aux consommateurs, livres numériques, transport de voyageurs (sites, applis, billetterie), communications électroniques.'],
    staff: ['Effectif', { lt10: 'Moins de 10 personnes', gte10: '10 personnes ou plus' }],
    smallFinance: ['Chiffre d’affaires annuel ou total du bilan annuel inférieur ou égal à 2 millions d’euros ?', 'Il suffit que l’un des deux montants soit sous le seuil.'],
    frLarge: ['France : votre chiffre d’affaires moyen en France dépasse-t-il 250 millions d’euros ?', 'Moyenne des trois derniers exercices (décret n° 2019-768, art. 2). Au-delà, l’article 47 de la loi n° 2005-102 impose la déclaration au format RGAA et le schéma pluriannuel.'],
    s2: '2. Organisation et site',
    orgName: ['Nom de l’organisation', ''],
    siteName: ['Nom du site ou du service', ''],
    siteUrl: ['Adresse du site', 'Ex. https://www.exemple.fr'],
    contactEmail: ['Adresse e-mail de contact accessibilité', ''],
    contactForm: ['Lien vers un formulaire de contact (facultatif)', ''],
    contactPostal: ['Adresse postale (facultatif)', ''],
    contactPhone: ['Téléphone (facultatif)', ''],
    s3: '3. Évaluation',
    auditType: ['Une évaluation de l’accessibilité a-t-elle été réalisée ?', { none: 'Non, aucun audit', self: 'Oui, en interne', external: 'Oui, par un tiers' }],
    auditDate: ['Date de l’audit', ''],
    auditor: ['Réalisé par', 'Nom de la personne, de l’équipe ou du prestataire'],
    standard: ['Référentiel utilisé', { rgaa412: 'RGAA 4.1.2', wcag21aa: 'WCAG 2.1 niveau AA', wcag22aa: 'WCAG 2.2 niveau AA', en301549: 'EN 301 549 V3.2.1' }],
    rate: ['Taux de conformité obtenu lors de l’audit (%)', 'Uniquement si un audit complet a été réalisé. Laissez vide sinon. Cet outil ne calcule aucun taux.'],
    s4: '4. Contenus non accessibles',
    nonConformities: ['Non-conformités connues', 'Une par ligne. Ex. « Le tunnel de paiement n’est pas utilisable au clavier (critère 7.3). »'],
    derogations: ['Dérogations pour charge disproportionnée', 'Une par ligne, avec la justification et, si possible, l’alternative proposée.'],
    exempted: ['Contenus non soumis à l’obligation', 'Une par ligne. Ex. cartes interactives, contenus de tiers non financés ni contrôlés.'],
    s5: '5. Comment la déclaration a été établie',
    statementDate: ['Date de la déclaration', ''],
    technologies: ['Technologies utilisées sur le site', 'Ex. HTML, CSS, JavaScript'],
    testEnv: ['Environnement de test', 'Une combinaison par ligne. Ex. « NVDA 2025.3 et Firefox 140 »'],
    tools: ['Outils utilisés', 'Un par ligne. Ex. « axe-core », « Colour Contrast Analyser »'],
    pages: ['Pages vérifiées', 'Une par ligne : nom et adresse'],
    s6: '6. Description du service (Acte européen sur l’accessibilité)',
    serviceDescription: ['Description du service', 'Ce que propose le site, en quelques phrases simples.'],
    operation: ['Fonctionnement du service', 'Les étapes, en termes simples. Ex. recherche de produits, panier, création de compte facultative, paiement, confirmation par e-mail, livraison, retours.'],
    features: ['Mesures d’accessibilité en place', 'Cochez uniquement ce qui est vérifié.'],
    otherFeatures: ['Autres mesures', 'Une par ligne'],
    support: ['Assistance et solutions alternatives', 'Ex. commande par téléphone, accompagnement par e-mail sous 2 jours ouvrés.'],
    monitoring: ['Suivi dans la durée', 'Comment vous vérifiez que le service reste accessible (annexe V, point 3) : tests avant mise en production, audit annuel, traitement des retours.'],
    burden: ['Exigences pour lesquelles vous invoquez une charge disproportionnée', 'Une par ligne : exigence concernée, raison, date de l’évaluation. Laissez vide si aucune.'],
    s7: '7. Plan d’action (schéma pluriannuel)',
    planStart: ['Première année du plan', ''],
    responsible: ['Personne ou équipe responsable', ''],
    resources: ['Moyens (humains, budget, prestataires)', ''],
    actions1: ['Actions prévues – année 1', 'Une par ligne'],
    actions2: ['Actions prévues – année 2', 'Une par ligne'],
    actions3: ['Actions prévues – année 3', 'Une par ligne'],
    training: ['Formation et sensibilisation', 'Une par ligne'],
  },
  de: {
    s1: '1. Ihre Situation (unverbindlich)',
    country: ['Land, dessen Recht gilt', { FR: 'Frankreich', DE: 'Deutschland', EU: 'Anderes EU-Land' }],
    publicBody: ['Sind Sie eine öffentliche Stelle (Behörde, Kommune, öffentliche Einrichtung)?', 'Öffentliche Stellen fallen unter andere Vorschriften (Richtlinie 2016/2102, BITV 2.0).'],
    consumerService: ['Erbringen Sie online eine Dienstleistung für Verbraucher, die unter den European Accessibility Act fällt?', 'Zum Beispiel: Online-Handel (Dienstleistungen im elektronischen Geschäftsverkehr), Bankdienstleistungen für Verbraucher, E-Books, Personenbeförderung (Websites, Apps, Tickets), Telekommunikation.'],
    staff: ['Beschäftigte', { lt10: 'Weniger als 10 Personen', gte10: '10 Personen oder mehr' }],
    smallFinance: ['Jahresumsatz oder Jahresbilanzsumme höchstens 2 Mio. Euro?', 'Es genügt, wenn einer der beiden Werte unter der Schwelle liegt.'],
    frLarge: ['Nur Frankreich: durchschnittlicher Umsatz in Frankreich über 250 Mio. Euro?', 'Durchschnitt der letzten drei Geschäftsjahre (Décret n° 2019-768, Art. 2); dann gelten RGAA-Erklärung und Mehrjahresplan nach Art. 47 Loi n° 2005-102.'],
    s2: '2. Organisation und Website',
    orgName: ['Name der Organisation', ''],
    siteName: ['Name der Website oder Dienstleistung', ''],
    siteUrl: ['Adresse der Website', 'z. B. https://www.beispiel.de'],
    contactEmail: ['E-Mail-Adresse für Barrierefreiheit', ''],
    contactForm: ['Link zu einem Kontaktformular (optional)', ''],
    contactPostal: ['Postanschrift (optional)', ''],
    contactPhone: ['Telefon (optional)', ''],
    s3: '3. Bewertung',
    auditType: ['Wurde die Barrierefreiheit geprüft?', { none: 'Nein, keine Prüfung', self: 'Ja, intern', external: 'Ja, durch Dritte' }],
    auditDate: ['Datum der Prüfung', ''],
    auditor: ['Durchgeführt von', 'Name der Person, des Teams oder Dienstleisters'],
    standard: ['Verwendeter Standard', { rgaa412: 'RGAA 4.1.2', wcag21aa: 'WCAG 2.1 Stufe AA', wcag22aa: 'WCAG 2.2 Stufe AA', en301549: 'EN 301 549 V3.2.1' }],
    rate: ['Konformitätsgrad laut Prüfung (%)', 'Nur für die französische RGAA-Erklärung. Dieses Werkzeug berechnet keinen Wert.'],
    s4: '4. Nicht barrierefreie Inhalte',
    nonConformities: ['Bekannte Mängel (optional)', 'Einer pro Zeile. Nach BFSG nicht vorgeschrieben, aber transparent. z. B. „Der Bezahlvorgang ist nicht per Tastatur bedienbar.“'],
    derogations: ['Ausnahmen wegen unverhältnismäßiger Belastung', 'Eine pro Zeile, mit Begründung und möglichst der angebotenen Alternative.'],
    exempted: ['Nicht erfasste Inhalte', 'Einer pro Zeile, z. B. eingebettete Inhalte Dritter, die Sie weder finanzieren noch kontrollieren.'],
    s5: '5. Erstellung der Erklärung',
    statementDate: ['Datum der Erklärung', ''],
    technologies: ['Verwendete Technologien', 'z. B. HTML, CSS, JavaScript'],
    testEnv: ['Testumgebung', 'Eine Kombination pro Zeile, z. B. „NVDA 2025.3 mit Firefox 140“'],
    tools: ['Verwendete Werkzeuge', 'Eines pro Zeile, z. B. „axe-core“'],
    pages: ['Geprüfte Seiten', 'Eine pro Zeile: Name und Adresse'],
    s6: '6. Beschreibung der Dienstleistung (BFSG / EAA)',
    serviceDescription: ['Allgemeine Beschreibung der Dienstleistung', 'Was die Website anbietet, in einfachen Sätzen.'],
    operation: ['Erläuterungen zur Durchführung der Dienstleistung', 'Die Schritte in einfachen Worten, z. B. Produktsuche, Warenkorb, optionales Kundenkonto, Bezahlung, Bestätigung per E-Mail, Lieferung, Rücksendung.'],
    features: ['Umgesetzte Barrierefreiheitsmaßnahmen', 'Nur ankreuzen, was geprüft ist.'],
    otherFeatures: ['Weitere Maßnahmen', 'Eine pro Zeile'],
    support: ['Unterstützung und Alternativen', 'z. B. Bestellung per Telefon, Hilfe per E-Mail innerhalb von 2 Werktagen.'],
    monitoring: ['Sicherstellung im Betrieb (optional)', 'Wie Sie prüfen, dass die Dienstleistung barrierefrei bleibt: Tests vor Releases, jährliche Prüfung, Umgang mit Rückmeldungen.'],
    burden: ['Anforderungen, für die Sie eine unverhältnismäßige Belastung geltend machen', 'Eine pro Zeile: Anforderung, Grund, Datum der Beurteilung. Leer lassen, wenn keine.'],
    s7: '7. Maßnahmenplan',
    planStart: ['Erstes Jahr des Plans', ''],
    responsible: ['Verantwortliche Person oder Team', ''],
    resources: ['Ressourcen (Personal, Budget, Dienstleister)', ''],
    actions1: ['Geplante Maßnahmen – Jahr 1', 'Eine pro Zeile'],
    actions2: ['Geplante Maßnahmen – Jahr 2', 'Eine pro Zeile'],
    actions3: ['Geplante Maßnahmen – Jahr 3', 'Eine pro Zeile'],
    training: ['Schulung und Sensibilisierung', 'Eine pro Zeile'],
  },
  en: {
    s1: '1. Your situation (indicative)',
    country: ['Country whose law applies', { FR: 'France', DE: 'Germany', EU: 'Other EU country' }],
    publicBody: ['Are you a public sector body (administration, local authority, public institution)?', 'Public sector bodies fall under other rules (Directive 2016/2102 and its national transpositions).'],
    consumerService: ['Do you provide an online service to consumers covered by the European Accessibility Act?', 'For example: e-commerce, consumer banking, e-books, passenger transport (websites, apps, ticketing), electronic communications.'],
    staff: ['Staff', { lt10: 'Fewer than 10 persons', gte10: '10 persons or more' }],
    smallFinance: ['Annual turnover or annual balance sheet total of €2 million or less?', 'Only one of the two needs to be under the threshold.'],
    frLarge: ['France only: average turnover in France above €250 million?', 'Average of the last three financial years (decree 2019-768, art. 2); above it, article 47 of law 2005-102 requires the RGAA statement and multi-year plan.'],
    s2: '2. Organisation and website',
    orgName: ['Organisation name', ''],
    siteName: ['Website or service name', ''],
    siteUrl: ['Website address', 'e.g. https://www.example.com'],
    contactEmail: ['Accessibility contact email', ''],
    contactForm: ['Link to a contact form (optional)', ''],
    contactPostal: ['Postal address (optional)', ''],
    contactPhone: ['Phone (optional)', ''],
    s3: '3. Evaluation',
    auditType: ['Has accessibility been evaluated?', { none: 'No, no audit', self: 'Yes, internally', external: 'Yes, by a third party' }],
    auditDate: ['Audit date', ''],
    auditor: ['Carried out by', 'Person, team or provider'],
    standard: ['Standard used', { rgaa412: 'RGAA 4.1.2', wcag21aa: 'WCAG 2.1 level AA', wcag22aa: 'WCAG 2.2 level AA', en301549: 'EN 301 549 V3.2.1' }],
    rate: ['Compliance rate found by the audit (%)', 'Only used by the French RGAA statement. This tool never computes a rate.'],
    s4: '4. Non-accessible content',
    nonConformities: ['Known issues', 'One per line, e.g. “Checkout cannot be completed with a keyboard.”'],
    derogations: ['Disproportionate burden claims', 'One per line, with the justification and, if possible, the alternative offered.'],
    exempted: ['Content outside the scope', 'One per line, e.g. third-party content you neither fund nor control.'],
    s5: '5. How this statement was prepared',
    statementDate: ['Statement date', ''],
    technologies: ['Technologies used', 'e.g. HTML, CSS, JavaScript'],
    testEnv: ['Test environment', 'One combination per line, e.g. “NVDA 2025.3 with Firefox 140”'],
    tools: ['Tools used', 'One per line, e.g. “axe-core”'],
    pages: ['Pages checked', 'One per line: name and address'],
    s6: '6. Service description (European Accessibility Act)',
    serviceDescription: ['General description of the service', 'What the website offers, in plain sentences.'],
    operation: ['How the service works', 'The steps in plain words, e.g. product search, cart, optional account, payment, email confirmation, delivery, returns.'],
    features: ['Accessibility measures in place', 'Tick only what has been checked.'],
    otherFeatures: ['Other measures', 'One per line'],
    support: ['Support and alternatives', 'e.g. phone ordering, email help within 2 working days.'],
    monitoring: ['Ongoing monitoring', 'How you make sure the service stays accessible (Annex V, point 3): tests before releases, yearly audit, handling feedback.'],
    burden: ['Requirements for which you claim a disproportionate burden', 'One per line: requirement, reason, date of assessment. Leave empty if none.'],
    s7: '7. Action plan',
    planStart: ['First year of the plan', ''],
    responsible: ['Responsible person or team', ''],
    resources: ['Resources (staff, budget, providers)', ''],
    actions1: ['Planned actions – year 1', 'One per line'],
    actions2: ['Planned actions – year 2', 'One per line'],
    actions3: ['Planned actions – year 3', 'One per line'],
    training: ['Training and awareness', 'One per line'],
  },
};

let uid = 0;
function text(lang, name, type = 'text', attrs = '') {
  const [label, hint] = L[lang][name];
  const id = `f-${name}`;
  const hintId = hint ? `${id}-hint` : '';
  return `<div class="field"><label for="${id}">${esc(label)}</label>${hint ? `<span class="hint" id="${hintId}">${esc(hint)}</span>` : ''}<input type="${type}" id="${id}" name="${name}"${hintId ? ` aria-describedby="${hintId}"` : ''} ${attrs}></div>`;
}
function area(lang, name) {
  const [label, hint] = L[lang][name];
  const id = `f-${name}`;
  const hintId = hint ? `${id}-hint` : '';
  return `<div class="field"><label for="${id}">${esc(label)}</label>${hint ? `<span class="hint" id="${hintId}">${esc(hint)}</span>` : ''}<textarea id="${id}" name="${name}"${hintId ? ` aria-describedby="${hintId}"` : ''}></textarea></div>`;
}
function radios(lang, name, options, hint) {
  const def = L[lang][name];
  const label = def[0];
  const opts = options || def[1];
  const h = hint ?? (typeof def[1] === 'string' ? def[1] : '');
  uid++;
  const hintId = h ? `h-${name}` : '';
  return `<fieldset class="choices"${hintId ? ` aria-describedby="${hintId}"` : ''}><legend>${esc(label)}</legend>${h ? `<span class="hint" id="${hintId}">${esc(h)}</span>` : ''}${Object.entries(opts)
    .map(([v, l]) => `<div class="choice"><input type="radio" id="r-${name}-${v}" name="${name}" value="${v}"><label for="r-${name}-${v}">${esc(l)}</label></div>`)
    .join('')}</fieldset>`;
}
function select(lang, name) {
  const [label, opts] = L[lang][name];
  return `<div class="field"><label for="f-${name}">${esc(label)}</label><select id="f-${name}" name="${name}">${Object.entries(opts)
    .map(([v, l]) => `<option value="${v}">${esc(l)}</option>`)
    .join('')}</select></div>`;
}
function checks(lang, name) {
  const [label, hint] = L[lang][name];
  return `<fieldset class="choices" aria-describedby="h-${name}"><legend>${esc(label)}</legend><span class="hint" id="h-${name}">${esc(hint)}</span>${Object.entries(FEATURES)
    .map(([v, l]) => `<div class="choice"><input type="checkbox" id="c-${v}" name="${name}" value="${v}"><label for="c-${v}">${esc(l[lang])}</label></div>`)
    .join('')}</fieldset>`;
}

export function formHtml(lang) {
  const yn = YN[lang];
  const l = L[lang];
  return `
<fieldset><legend>${esc(l.s1)}</legend>
${select(lang, 'country')}
${radios(lang, 'publicBody', { yes: yn.yes, no: yn.no })}
${radios(lang, 'consumerService', { yes: yn.yes, no: yn.no, unsure: yn.unsure })}
${radios(lang, 'staff')}
${radios(lang, 'smallFinance', { yes: yn.yes, no: yn.no })}
<div data-show-country="FR">${radios(lang, 'frLarge', { yes: yn.yes, no: yn.no })}</div>
<div class="verdict" id="verdict" role="status"></div>
</fieldset>
<fieldset><legend>${esc(l.s2)}</legend>
${text(lang, 'orgName', 'text', 'autocomplete="organization"')}
${text(lang, 'siteName')}
${text(lang, 'siteUrl', 'url', 'inputmode="url"')}
${text(lang, 'contactEmail', 'email', 'autocomplete="email"')}
${text(lang, 'contactForm', 'url')}
${text(lang, 'contactPostal', 'text', 'autocomplete="street-address"')}
${text(lang, 'contactPhone', 'tel', 'autocomplete="tel"')}
</fieldset>
<fieldset><legend>${esc(l.s3)}</legend>
${radios(lang, 'auditType')}
<div data-show-audit>
${text(lang, 'auditDate', 'date')}
${text(lang, 'auditor')}
${select(lang, 'standard')}
${text(lang, 'rate', 'number', 'min="0" max="100" step="0.1" inputmode="decimal"')}
</div>
</fieldset>
<fieldset><legend>${esc(l.s4)}</legend>
${area(lang, 'nonConformities')}
${area(lang, 'derogations')}
${area(lang, 'exempted')}
</fieldset>
<fieldset><legend>${esc(l.s5)}</legend>
${text(lang, 'statementDate', 'date')}
${text(lang, 'technologies')}
${area(lang, 'testEnv')}
${area(lang, 'tools')}
${area(lang, 'pages')}
</fieldset>
<fieldset><legend>${esc(l.s6)}</legend>
${area(lang, 'serviceDescription')}
${area(lang, 'operation')}
${checks(lang, 'features')}
${area(lang, 'otherFeatures')}
${area(lang, 'support')}
${area(lang, 'monitoring')}
${area(lang, 'burden')}
</fieldset>
<fieldset><legend>${esc(l.s7)}</legend>
${text(lang, 'planStart', 'number', 'min="2025" max="2040" inputmode="numeric"')}
${text(lang, 'responsible')}
${area(lang, 'resources')}
${area(lang, 'actions1')}
${area(lang, 'actions2')}
${area(lang, 'actions3')}
${area(lang, 'training')}
</fieldset>`;
}
