// Document engine: answers -> document model (see render.js).
// Pure, no DOM. Empty answers become [bracketed placeholders], so the same
// code builds both the live preview and the blank templates.
//
// This file formats the user's own answers. It never computes a conformance
// status from automated results and never states that a site conforms unless
// the user reports an audit result.

import { LEGAL } from './legal-refs.js';

export const FEATURES = {
  keyboard: { fr: 'Navigation et achat possibles entièrement au clavier', de: 'Navigation und Kauf vollständig per Tastatur möglich', en: 'Navigation and purchase fully possible with a keyboard' },
  screenreader: { fr: 'Compatibilité testée avec des lecteurs d’écran', de: 'Kompatibilität mit Screenreadern getestet', en: 'Compatibility tested with screen readers' },
  alt: { fr: 'Alternatives textuelles pour les images porteuses d’information', de: 'Alternativtexte für informative Bilder', en: 'Text alternatives for meaningful images' },
  contrast: { fr: 'Contrastes de couleurs suffisants', de: 'Ausreichende Farbkontraste', en: 'Sufficient colour contrast' },
  zoom: { fr: 'Agrandissement du texte jusqu’à 200 % et affichage sur petit écran', de: 'Textvergrößerung bis 200 % und Darstellung auf kleinen Bildschirmen', en: 'Text resizing up to 200% and small-screen display' },
  forms: { fr: 'Formulaires étiquetés, erreurs signalées en texte', de: 'Beschriftete Formulare, Fehler werden als Text gemeldet', en: 'Labelled forms, errors reported in text' },
  captions: { fr: 'Sous-titres pour les vidéos', de: 'Untertitel für Videos', en: 'Captions for videos' },
  payment: { fr: 'Identification, authentification et paiement utilisables sans la vue ni la souris', de: 'Identifizierung, Authentifizierung und Bezahlung ohne Sehen und ohne Maus nutzbar', en: 'Identification, authentication and payment usable without sight or a mouse' },
  docs: { fr: 'Documents (CGV, factures) disponibles dans un format accessible', de: 'Dokumente (AGB, Rechnungen) in barrierefreiem Format verfügbar', en: 'Documents (terms, invoices) available in an accessible format' },
  support: { fr: 'Service client joignable par plusieurs canaux (écrit et oral)', de: 'Kundenservice über mehrere Kanäle erreichbar (schriftlich und mündlich)', en: 'Customer support reachable through several channels (written and spoken)' },
};

export const DOCS = {
  fr: [
    { id: 'rgaa', label: 'Déclaration d’accessibilité (modèle RGAA)' },
    { id: 'eaa', label: 'Informations d’accessibilité du service (Acte européen)' },
    { id: 'plan', label: 'Schéma pluriannuel et plan d’action' },
    { id: 'checklist', label: 'Grille d’auto-contrôle' },
  ],
  de: [
    { id: 'eaa', label: 'Barrierefreiheitserklärung (BFSG)' },
    { id: 'plan', label: 'Maßnahmenplan' },
    { id: 'checklist', label: 'Selbsttest-Checkliste' },
  ],
  en: [
    { id: 'eaa', label: 'Accessibility statement (EAA Annex V)' },
    { id: 'plan', label: 'Action plan' },
    { id: 'checklist', label: 'Self-check checklist' },
  ],
};

export const UI = {
  fr: {
    downloaded: 'Fichier « {f} » généré dans votre navigateur.',
    copied: 'Copié dans le presse-papiers.',
    copyFailed: 'Copie impossible : sélectionnez le texte de l’aperçu manuellement.',
    imported: 'Réponses chargées.',
    importFailed: 'Ce fichier n’a pas pu être lu.',
    confirmReset: 'Effacer toutes vos réponses enregistrées sur cet appareil ?',
    cleared: 'Réponses effacées.',
  },
  de: {
    downloaded: 'Datei „{f}“ wurde in Ihrem Browser erzeugt.',
    copied: 'In die Zwischenablage kopiert.',
    copyFailed: 'Kopieren nicht möglich: Bitte den Text der Vorschau manuell markieren.',
    imported: 'Angaben geladen.',
    importFailed: 'Diese Datei konnte nicht gelesen werden.',
    confirmReset: 'Alle auf diesem Gerät gespeicherten Angaben löschen?',
    cleared: 'Angaben gelöscht.',
  },
  en: {
    downloaded: 'File “{f}” generated in your browser.',
    copied: 'Copied to the clipboard.',
    copyFailed: 'Copy failed: select the preview text manually.',
    imported: 'Answers loaded.',
    importFailed: 'This file could not be read.',
    confirmReset: 'Erase all answers saved on this device?',
    cleared: 'Answers erased.',
  },
};

const lines = (s) =>
  String(s || '')
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);

const v = (s) => String(s ?? '').trim();
const ph = (s, placeholder) => v(s) || `[${placeholder}]`;

const SEP = { fr: ' : ', de: ': ', en: ': ' };
const DATE_LOCALE = { fr: 'fr-FR', de: 'de-DE', en: 'en-GB' };
export function fmtDate(iso, lang) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v(iso));
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.toLocaleDateString(DATE_LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const STANDARDS = {
  rgaa412: 'RGAA 4.1.2',
  wcag21aa: { fr: 'WCAG 2.1 niveau AA', de: 'WCAG 2.1 Stufe AA', en: 'WCAG 2.1 level AA' },
  wcag22aa: { fr: 'WCAG 2.2 niveau AA', de: 'WCAG 2.2 Stufe AA', en: 'WCAG 2.2 level AA' },
  en301549: 'EN 301 549 V3.2.1',
};
const std = (key, lang) => {
  const s = STANDARDS[key];
  return !s ? null : typeof s === 'string' ? s : s[lang];
};

/** RGAA status from the audit rate given by the user (official rule, see LEGAL.fr.rgaaStatus). */
export function rgaaStatus(a) {
  if (a.auditType !== 'self' && a.auditType !== 'external') return a.auditType === 'none' ? 'non' : null;
  const r = parseFloat(String(a.rate || '').replace(',', '.'));
  if (!Number.isFinite(r) || r < 0 || r > 100) return null;
  if (r === 100) return 'total';
  if (r >= 50) return 'partial';
  return 'non';
}

function contactItems(a, lang) {
  const P = { fr: ['E-mail', 'Formulaire de contact', 'Courrier', 'Téléphone'], de: ['E-Mail', 'Kontaktformular', 'Post', 'Telefon'], en: ['Email', 'Contact form', 'Post', 'Phone'] }[lang];
  const sep = SEP[lang];
  const items = [];
  items.push([P[0] + sep, v(a.contactEmail) ? { text: v(a.contactEmail), href: v(a.contactEmail) } : `[${{ fr: 'adresse e-mail', de: 'E-Mail-Adresse', en: 'email address' }[lang]}]`]);
  if (v(a.contactForm)) items.push([P[1] + sep, { text: v(a.contactForm), href: v(a.contactForm) }]);
  if (v(a.contactPostal)) items.push([P[2] + sep + v(a.contactPostal)]);
  if (v(a.contactPhone)) items.push([P[3] + sep, { text: v(a.contactPhone), href: 'tel:' + v(a.contactPhone).replace(/[^\d+]/g, '') }]);
  return items;
}

// ---------------- FR: RGAA model ----------------

function frRgaa(a) {
  // Mandatory format: https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/
  const org = ph(a.orgName, 'Nom de l’organisme concerné');
  const site = ph(a.siteName, 'Nom du site web');
  const url = v(a.siteUrl);
  const status = rgaaStatus(a);
  const audited = a.auditType === 'self' || a.auditType === 'external';
  const date = fmtDate(a.statementDate, 'fr') || '[JJ mois AAAA]';
  const b = [];
  b.push({ t: 'h1', text: 'Déclaration d’accessibilité' });
  b.push({ t: 'p', runs: `${org} s’engage à rendre ${url || v(a.siteName) ? 'son site internet' : '[son (ses) site(s) internet, intranet, extranet et son (ses) application(s) mobile(s), etc.]'} accessible${url || v(a.siteName) ? '' : 's'} conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.` });
  b.push({ t: 'p', runs: 'À cette fin, il met en œuvre la stratégie et les actions suivantes : [liens vers le schéma pluriannuel et vers le plan d’action de l’année en cours incluant le bilan des actions réalisées l’année précédente].' });
  b.push({ t: 'p', runs: ['Cette déclaration d’accessibilité s’applique à ', url ? { text: `${site} (${url})`, href: url } : site, '.'] });

  b.push({ t: 'h2', text: 'État de conformité' });
  const statusText = { total: 'totalement conforme', partial: 'partiellement conforme', non: 'non conforme' }[status] || '[totalement / partiellement / non] conforme';
  let s = `${site} est ${statusText} avec le référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1.2`;
  if (status === 'partial') s += ' en raison des non-conformités et des dérogations énumérées ci-dessous';
  b.push({ t: 'p', runs: s + '.' });

  b.push({ t: 'h2', text: 'Résultat des tests' });
  if (audited) {
    const rate = v(a.rate);
    const d = fmtDate(a.auditDate, 'fr');
    b.push({ t: 'p', runs: `L’audit de conformité réalisé ${a.auditType === 'external' ? `par ${ph(a.auditor, 'la société NNN')}` : 'en interne'}${d ? ` le ${d}` : ''} révèle que :` });
    b.push({ t: 'p', runs: `${rate ? `${rate.replace('.', ',')} %` : '[pourcentage de critères RGAA respectés]'} des critères RGAA sont respectés.` });
    if (a.standard && a.standard !== 'rgaa412') b.push({ t: 'note', runs: `Attention : référentiel indiqué pour l’audit : ${std(a.standard, 'fr')}. Le format officiel attend un audit selon le RGAA.` });
  } else if (a.auditType === 'none') {
    b.push({ t: 'p', runs: 'Aucun audit de conformité en cours de validité n’a été réalisé à ce jour : le service est donc déclaré non conforme. [Indiquer la date prévue de l’audit.]' });
  } else {
    b.push({ t: 'p', runs: 'L’audit de conformité réalisé [en interne / par la société NNN] révèle que :' });
    b.push({ t: 'p', runs: '[pourcentage de critères RGAA respectés] des critères RGAA sont respectés.' });
  }

  b.push({ t: 'h2', text: 'Contenus non accessibles' });
  b.push({ t: 'p', runs: 'Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.' });
  b.push({ t: 'h3', text: 'Non conformité' });
  const nc = lines(a.nonConformities);
  b.push(nc.length ? { t: 'ul', items: nc } : { t: 'p', runs: '[Lister les non-conformités et/ou décrire quels sections, contenus ou fonctions ne sont pas encore conformes, indiquer les alternatives s’il y a lieu.]' });
  b.push({ t: 'h3', text: 'Dérogations pour charge disproportionnée' });
  const dr = lines(a.derogations);
  b.push(dr.length ? { t: 'ul', items: dr } : { t: 'p', runs: '[Aucune / lister les sections, contenus ou fonctions pour lesquels la dérogation est temporairement invoquée, indiquer les alternatives s’il y a lieu.]' });
  b.push({ t: 'h3', text: 'Contenus non soumis à l’obligation d’accessibilité' });
  const ex = lines(a.exempted);
  b.push(ex.length ? { t: 'ul', items: ex } : { t: 'p', runs: '[Aucun / lister les contenus qui n’entrent pas dans le champ de la législation applicable, indiquer les alternatives s’il y a lieu.]' });

  b.push({ t: 'h2', text: 'Établissement de cette déclaration d’accessibilité' });
  b.push({ t: 'p', runs: `Cette déclaration a été établie le ${date}.` });
  b.push({ t: 'h3', text: 'Technologies utilisées pour la réalisation du site web' });
  b.push({ t: 'ul', items: (v(a.technologies) || '[HTML, CSS, JavaScript]').split(',').map((x) => x.trim()).filter(Boolean) });
  b.push({ t: 'h3', text: 'Environnement de test' });
  b.push({ t: 'p', runs: 'Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité :' });
  const env = lines(a.testEnv);
  b.push({ t: 'ul', items: env.length ? env : ['[ex. NVDA et Firefox]', '[ex. JAWS et Chrome]', '[ex. VoiceOver et Safari]'] });
  b.push({ t: 'h3', text: 'Les outils utilisés lors de l’évaluation' });
  const tools = lines(a.tools);
  b.push({ t: 'ul', items: tools.length ? tools : ['[Indiquer les outils utilisés]'] });
  b.push({ t: 'h3', text: 'Pages du site ayant fait l’objet de la vérification de conformité' });
  const pages = lines(a.pages);
  b.push({ t: 'ol', items: pages.length ? pages : ['[Accueil – adresse]', '[Contact – adresse]', '[Mentions légales – adresse]', '[Accessibilité – adresse]'] });

  b.push({ t: 'h2', text: 'Retour d’information et contact' });
  b.push({ t: 'p', runs: `Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site internet ${site} pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.` });
  b.push({ t: 'ul', items: contactItems(a, 'fr') });
  if (v(a.support)) b.push({ t: 'p', runs: v(a.support) });

  b.push({ t: 'h2', text: 'Voies de recours' });
  for (const p of LEGAL.fr.recoursIntro) b.push({ t: 'p', runs: p });
  b.push({ t: 'ul', items: LEGAL.fr.recoursItems });
  return { title: 'Déclaration d’accessibilité', lang: 'fr', blocks: b };
}

// ---------------- EAA / BFSG service information ----------------

const EAA_T = {
  fr: {
    title: 'Informations sur l’accessibilité du service',
    subtitle: 'Informations prévues à l’annexe de l’article D. 412-57 du code de la consommation (Acte européen sur l’accessibilité)',
    intro: (org, site) => `${org} fournit ces informations sur la manière dont ${site} répond aux exigences d’accessibilité, conformément à ${LEGAL.fr.eaaBasis}.`,
    general: 'Description générale du service',
    operation: 'Fonctionnement du service',
    how: 'Comment le service répond aux exigences d’accessibilité',
    eval: (a, lang) => evalSentence(a, lang),
    features: 'Mesures en place :',
    known: 'Limites connues',
    knownNone: 'Aucune limite connue à ce jour. [À compléter après évaluation.]',
    burden: 'Exigences faisant l’objet d’une charge disproportionnée',
    support: 'Assistance et solutions alternatives',
    monitoring: 'Suivi de l’accessibilité du service',
    phMonitoring: 'Comment l’accessibilité est vérifiée dans la durée : tests avant chaque mise en production, audit annuel, traitement des retours',
    contact: 'Nous contacter',
    authority: 'Autorité de contrôle',
    date: (d) => `Informations établies le ${d}.`,
    phDesc: 'Description du service, en quelques phrases simples',
    phOp: 'Étapes : recherche, panier, commande, paiement, confirmation, livraison, retours',
    phFeat: 'Liste des mesures d’accessibilité vérifiées',
  },
  de: {
    title: 'Barrierefreiheitserklärung',
    subtitle: 'Informationen zur Barrierefreiheit der Dienstleistung nach § 14 und Anlage 3 BFSG',
    intro: (org, site) => `${org} stellt hiermit die Informationen darüber bereit, wie ${site} die Barrierefreiheitsanforderungen erfüllt (${LEGAL.de.basis}).`,
    general: 'Allgemeine Beschreibung der Dienstleistung',
    operation: 'Erläuterungen zur Durchführung der Dienstleistung',
    how: 'Wie die Dienstleistung die Barrierefreiheitsanforderungen erfüllt',
    eval: (a, lang) => evalSentence(a, lang),
    features: 'Umgesetzte Maßnahmen:',
    known: 'Bekannte Einschränkungen',
    knownNone: 'Derzeit keine bekannten Einschränkungen. [Nach Prüfung ergänzen.]',
    burden: 'Anforderungen, für die eine unverhältnismäßige Belastung geltend gemacht wird',
    support: 'Unterstützung und Alternativen',
    monitoring: 'Sicherstellung der Barrierefreiheit',
    phMonitoring: '',
    contact: 'Kontakt',
    authority: 'Zuständige Marktüberwachungsbehörde',
    date: (d) => `Stand: ${d}.`,
    phDesc: 'Beschreibung der Dienstleistung in einfachen Sätzen',
    phOp: 'Schritte: Suche, Warenkorb, Bestellung, Bezahlung, Bestätigung, Lieferung, Rücksendung',
    phFeat: 'Liste der geprüften Barrierefreiheitsmaßnahmen',
  },
  en: {
    title: 'Accessibility statement',
    subtitle: 'Information on the accessibility of the service under Annex V of Directive (EU) 2019/882',
    intro: (org, site) => `${org} provides this information on how ${site} meets the accessibility requirements, as required by ${LEGAL.en.basis}.`,
    general: 'General description of the service',
    operation: 'How the service works',
    how: 'How the service meets the accessibility requirements',
    eval: (a, lang) => evalSentence(a, lang),
    features: 'Measures in place:',
    known: 'Known limitations',
    knownNone: 'No known limitations at this time. [Complete after evaluation.]',
    burden: 'Requirements subject to a disproportionate burden',
    support: 'Support and alternatives',
    monitoring: 'How accessibility is maintained',
    phMonitoring: 'How accessibility is checked over time: tests before each release, yearly audit, handling of feedback',
    contact: 'Contact us',
    authority: 'Enforcement authority',
    date: (d) => `Information prepared on ${d}.`,
    phDesc: 'Description of the service in plain sentences',
    phOp: 'Steps: search, cart, order, payment, confirmation, delivery, returns',
    phFeat: 'List of checked accessibility measures',
  },
};

function evalSentence(a, lang) {
  const standard = std(a.standard, lang) || { fr: '[référentiel]', de: '[Standard]', en: '[standard]' }[lang];
  const d = fmtDate(a.auditDate, lang);
  if (a.auditType === 'external')
    return {
      fr: `Le service a été évalué par ${ph(a.auditor, 'prestataire')}${d ? ` le ${d}` : ''} au regard de ${standard}.`,
      de: `Die Dienstleistung wurde${d ? ` am ${d}` : ''} von ${ph(a.auditor, 'Prüfstelle')} anhand von ${standard} geprüft.`,
      en: `The service was evaluated by ${ph(a.auditor, 'provider')}${d ? ` on ${d}` : ''} against ${standard}.`,
    }[lang];
  if (a.auditType === 'self')
    return {
      fr: `Le service a fait l’objet d’une auto-évaluation${d ? ` le ${d}` : ''} au regard de ${standard}.`,
      de: `Die Dienstleistung wurde${d ? ` am ${d}` : ''} intern anhand von ${standard} bewertet.`,
      en: `The service was self-assessed${d ? ` on ${d}` : ''} against ${standard}.`,
    }[lang];
  if (a.auditType === 'none')
    return {
      fr: 'Aucune évaluation complète de l’accessibilité n’a encore été réalisée. Les mesures ci-dessous décrivent l’état connu à ce jour.',
      de: 'Eine vollständige Prüfung der Barrierefreiheit wurde noch nicht durchgeführt. Die folgenden Angaben beschreiben den derzeit bekannten Stand.',
      en: 'No full accessibility evaluation has been carried out yet. The measures below describe the situation as currently known.',
    }[lang];
  return {
    fr: `[Indiquer comment le service a été évalué : auto-évaluation ou audit, date, référentiel (ex. ${LEGAL.fr.standardHint}).]`,
    de: `[Angeben, wie die Dienstleistung bewertet wurde: Selbstbewertung oder Prüfung, Datum, Standard (z. B. ${LEGAL.de.standardHint}).]`,
    en: `[State how the service was evaluated: self-assessment or audit, date, standard (e.g. ${LEGAL.en.standardHint}).]`,
  }[lang];
}

function eaaDoc(lang, a) {
  const T = EAA_T[lang];
  const org = ph(a.orgName, { fr: 'Nom de l’organisation', de: 'Name der Organisation', en: 'Organisation name' }[lang]);
  const site = ph(a.siteName, { fr: 'nom du site', de: 'Name der Website', en: 'website name' }[lang]);
  const url = v(a.siteUrl);
  const country = a.country || { fr: 'FR', de: 'DE', en: 'EU' }[lang];
  const b = [];
  b.push({ t: 'h1', text: `${T.title}${v(a.siteName) ? ` – ${v(a.siteName)}` : ''}` });
  b.push({ t: 'p', runs: [{ text: T.subtitle, b: true }] });
  b.push({ t: 'p', runs: T.intro(org, url ? `${site} (${url})` : site) });
  b.push({ t: 'h2', text: T.general });
  b.push({ t: 'p', runs: v(a.serviceDescription) || `[${T.phDesc}]` });
  b.push({ t: 'h2', text: T.operation });
  const op = lines(a.operation);
  b.push(op.length > 1 ? { t: 'ul', items: op } : { t: 'p', runs: op[0] || `[${T.phOp}]` });
  b.push({ t: 'h2', text: T.how });
  b.push({ t: 'p', runs: T.eval(a, lang) });
  const feats = [...(a.features || []).filter((k) => FEATURES[k]).map((k) => FEATURES[k][lang]), ...lines(a.otherFeatures)];
  b.push({ t: 'p', runs: T.features });
  b.push({ t: 'ul', items: feats.length ? feats : [`[${T.phFeat}]`] });
  const nc = lines(a.nonConformities);
  // BFSG: non-conformities need not be listed (Bundesfachstelle FAQ); shown only if the user lists some.
  if (nc.length || lang !== 'de') {
    b.push({ t: 'h3', text: T.known });
    b.push(nc.length ? { t: 'ul', items: nc } : { t: 'p', runs: T.knownNone });
  }
  const burden = [...lines(a.burden), ...lines(a.derogations)];
  if (burden.length) {
    b.push({ t: 'h3', text: T.burden });
    b.push({ t: 'ul', items: burden });
  }
  b.push({ t: 'h2', text: T.support });
  b.push({ t: 'p', runs: v(a.support) || { fr: '[Comment obtenir de l’aide ou une alternative : téléphone, e-mail, délai de réponse.]', de: '[Wie man Hilfe oder eine Alternative erhält: Telefon, E-Mail, Antwortzeit.]', en: '[How to get help or an alternative: phone, email, response time.]' }[lang] });
  if (v(a.monitoring) || T.phMonitoring) {
    b.push({ t: 'h2', text: T.monitoring });
    b.push({ t: 'p', runs: v(a.monitoring) || `[${T.phMonitoring}]` });
  }
  b.push({ t: 'h2', text: T.contact });
  b.push({ t: 'ul', items: contactItems(a, lang) });
  const auth = LEGAL.authority[country]?.[lang] || LEGAL.authority.EU[lang];
  b.push({ t: 'h2', text: T.authority });
  for (const p of auth) b.push({ t: 'p', runs: p });
  b.push({ t: 'p', runs: T.date(fmtDate(a.statementDate, lang) || { fr: '[date]', de: '[Datum]', en: '[date]' }[lang]) });
  return { title: T.title, lang, blocks: b };
}

// ---------------- Action plan ----------------

const PLAN_T = {
  fr: {
    title: (y1, y3) => `Schéma pluriannuel de mise en accessibilité ${y1}-${y3}`,
    intro: (org) => `Ce document présente la politique de ${org} pour rendre ses services numériques accessibles, et le plan d’action annuel qui la met en œuvre. ${LEGAL.fr.planBasis}`,
    org: 'Organisation et responsabilités',
    resp: 'Référent ou équipe en charge de l’accessibilité',
    res: 'Moyens',
    scope: 'Périmètre',
    training: 'Formation et sensibilisation',
    procurement: 'Prise en compte dans les projets et les achats',
    procurementItems: ['Exigences d’accessibilité intégrées aux cahiers des charges et contrats des prestataires.', 'Tests d’accessibilité (automatiques et manuels) avant chaque mise en production importante.', 'Recueil et traitement des retours des utilisateurs.'],
    plan: (y) => `Plan d’action ${y}`,
    follow: 'Suivi',
    followText: 'Le plan d’action est mis à jour chaque année et la déclaration d’accessibilité après chaque évaluation.',
    head: ['Action', 'Échéance', 'Responsable', 'État'],
    ph: '[action]',
  },
  de: {
    title: (y1, y3) => `Maßnahmenplan Barrierefreiheit ${y1}–${y3}`,
    intro: (org) => `Dieses Dokument beschreibt, wie ${org} seine digitalen Dienste barrierefrei macht, und die jährlichen Maßnahmen dazu. Ein solcher Plan ist für private Unternehmen nach dem BFSG nicht vorgeschrieben, hilft aber bei Umsetzung und Nachweis.`,
    org: 'Organisation und Verantwortung',
    resp: 'Verantwortliche Person oder Team',
    res: 'Ressourcen',
    scope: 'Geltungsbereich',
    training: 'Schulung und Sensibilisierung',
    procurement: 'Berücksichtigung in Projekten und Einkauf',
    procurementItems: ['Barrierefreiheitsanforderungen in Lastenheften und Dienstleisterverträgen.', 'Barrierefreiheitstests (automatisch und manuell) vor jedem größeren Release.', 'Erfassung und Bearbeitung von Rückmeldungen der Nutzenden.'],
    plan: (y) => `Maßnahmen ${y}`,
    follow: 'Fortschreibung',
    followText: 'Der Plan wird jährlich aktualisiert, die Barrierefreiheitsinformationen nach jeder Bewertung.',
    head: ['Maßnahme', 'Frist', 'Verantwortlich', 'Status'],
    ph: '[Maßnahme]',
  },
  en: {
    title: (y1, y3) => `Accessibility action plan ${y1}–${y3}`,
    intro: (org) => `This document sets out how ${org} makes its digital services accessible and the yearly actions to do so. Such a plan is not required of private companies by the EAA itself, but it helps implementation and accountability.`,
    org: 'Organisation and responsibilities',
    resp: 'Responsible person or team',
    res: 'Resources',
    scope: 'Scope',
    training: 'Training and awareness',
    procurement: 'Projects and procurement',
    procurementItems: ['Accessibility requirements included in specifications and supplier contracts.', 'Accessibility testing (automated and manual) before every major release.', 'Collecting and handling user feedback.'],
    plan: (y) => `Actions ${y}`,
    follow: 'Review',
    followText: 'The plan is updated every year and the accessibility statement after every evaluation.',
    head: ['Action', 'Deadline', 'Owner', 'Status'],
    ph: '[action]',
  },
};

function planDoc(lang, a) {
  const T = PLAN_T[lang];
  const y1 = parseInt(a.planStart, 10) || null;
  const Y = (i) => (y1 ? String(y1 + i) : { fr: `[année ${i + 1}]`, de: `[Jahr ${i + 1}]`, en: `[year ${i + 1}]` }[lang]);
  const org = ph(a.orgName, { fr: 'Nom de l’organisation', de: 'Name der Organisation', en: 'Organisation name' }[lang]);
  const b = [];
  const title = T.title(Y(0), Y(2));
  b.push({ t: 'h1', text: title });
  b.push({ t: 'p', runs: T.intro(org) });
  b.push({ t: 'h2', text: T.org });
  b.push({ t: 'p', runs: T.resp + SEP[lang] + ph(a.responsible, { fr: 'nom, fonction', de: 'Name, Funktion', en: 'name, role' }[lang]) });
  b.push({ t: 'h3', text: T.res });
  b.push({ t: 'p', runs: v(a.resources) || { fr: '[Moyens humains et financiers, prestataires]', de: '[Personal, Budget, Dienstleister]', en: '[Staff, budget, providers]' }[lang] });
  b.push({ t: 'h3', text: T.scope });
  b.push({ t: 'p', runs: v(a.siteUrl) ? [{ text: ph(a.siteName, a.siteUrl), href: a.siteUrl }, ` (${v(a.siteUrl)})`] : ph(a.siteName, { fr: 'sites, applications et documents concernés', de: 'betroffene Websites, Apps und Dokumente', en: 'websites, apps and documents covered' }[lang]) });
  b.push({ t: 'h3', text: T.training });
  const tr = lines(a.training);
  b.push({ t: 'ul', items: tr.length ? tr : [{ fr: '[Formation des équipes contenu, design et développement]', de: '[Schulung der Teams Inhalt, Design und Entwicklung]', en: '[Training for content, design and development teams]' }[lang]] });
  b.push({ t: 'h3', text: T.procurement });
  b.push({ t: 'ul', items: T.procurementItems });
  for (let i = 0; i < 3; i++) {
    b.push({ t: 'h2', text: T.plan(Y(i)) });
    const acts = lines(a[`actions${i + 1}`]);
    b.push({ t: 'table', head: T.head, rows: (acts.length ? acts : [T.ph]).map((x) => [x, Y(i), '', '']) });
  }
  b.push({ t: 'h2', text: T.follow });
  b.push({ t: 'p', runs: T.followText });
  return { title, lang, blocks: b };
}

export function buildDocument(lang, id, answers = {}) {
  const a = { features: [], ...answers };
  if (id === 'rgaa') return frRgaa(a);
  if (id === 'eaa') return eaaDoc(lang, a);
  if (id === 'plan') return planDoc(lang, a);
  throw new Error('unknown document ' + id);
}

/** Indicative applicability verdict, as document blocks. */
export function verdictBlocks(lang, scope, a) {
  const V = LEGAL.verdicts[lang];
  const out = [{ t: 'h3', text: V.title }];
  const msg = V[scope.eaa];
  if (msg) for (const p of msg) out.push({ t: 'p', runs: p });
  if (scope.national && V[scope.national]) for (const p of V[scope.national]) out.push({ t: 'p', runs: p });
  out.push({ t: 'p', runs: [{ text: V.disclaimer, i: true }] });
  return out;
}
