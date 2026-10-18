// Guide pages (SEO plan vread-revenue-lab/seo/accessibilite.md, C1 to C4), published 2026-10-17.
//  - C1 /modele-declaration-accessibilite/ (FR): the official RGAA model in full + a filled example.
//  - C2 /de/muster-barrierefreiheitserklaerung/ (DE): BFSG Anlage 3 Muster + filled example, free information.
//  - C3 /obligations-boutique-en-ligne/ (FR): what an online shop must do (EAA, code de la consommation, art. 47).
//  - C4 /prix-audit-accessibilite/ (FR): free tools, our automated audit, full RGAA audit on quote.
// Every legal fact was read on the official text on 2026-10-17 (Légifrance through a browser, gesetze-im-internet.de,
// accessibilite.numerique.gouv.fr, bundesfachstelle-barrierefreiheit.de, mlbf-barrierefrei.de, the Commission's
// harmonised-standards list). No market price is quoted: we have no verifiable source for one.
// The template and example documents are produced by the generator's own engine (src/lib/statement.js), so the
// page, the downloads and the tool cannot drift apart. One primary call to action (.btn) per page.
import { SITE, ROUTES, RELEASE_DL, SAMPLE, CONTACT, PRICE } from './site.js';
import { url, ogImage } from './layout.js';
import { ORG_REF, MAX_PAGES } from './order.js';
import { buildDocument } from '../lib/statement.js';
import { toHtmlFragment } from '../lib/render.js';

export const GUIDES_DATE = '2026-10-17';
const CHECKED = { fr: '17 octobre 2026', de: '17. Oktober 2026' };
const PUB_DIRECTOR = 'Tanguy Warsmann';
const abs = (path) => SITE.origin + url(path);

const NB = ' ';
/** French typography on text nodes only: non-breaking space before : ; ? ! » and after «, in « 149 € », « 24 h », « 1 500 ». */
export function frTypo(html) {
  return html
    .split(/(<[^>]+>)/)
    .map((s) => (s.startsWith('<') ? s : s
      .replace(/ ([:;?!»])/g, `${NB}$1`)
      .replace(/« /g, `«${NB}`)
      .replace(/(\d) (€|%|h\b|M€)/g, `$1${NB}$2`)
      .replace(/(\d) (\d{3})(?!\d)/g, `$1${NB}$2`)))
    .join('');
}
/** Placeholders [ … ] of a template, highlighted (text nodes only). */
const marks = (html) => html.split(/(<[^>]+>)/).map((s) => (s.startsWith('<') ? s : s.replace(/\[[^\]]+\]/g, (m) => `<span class="ph">${m}</span>`))).join('');
const strip = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const a = (href, text, extra = '') => `<a href="${href}"${extra}>${text}</a>`;

// Official sources (all opened on 2026-10-17).
const S = {
  rgaaDecl: 'https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/',
  rgaaMentions: 'https://accessibilite.numerique.gouv.fr/obligations/mentions-et-pages-obligatoires/',
  rgaaEval: 'https://accessibilite.numerique.gouv.fr/obligations/evaluation-conformite/',
  rgaaCrit: 'https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/',
  rgaa5: 'https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/',
  ara: 'https://ara.numerique.gouv.fr/',
  wave: 'https://wave.webaim.org/',
  lighthouse: 'https://developer.chrome.com/docs/lighthouse/overview',
  hs: 'https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards_en',
  dirFr: 'https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32019L0882',
  loi2023: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047281777',
  l41213: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047284913',
  section: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000048180103/',
  d41257: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048180389',
  d2023: 'https://www.legifrance.gouv.fr/eli/decret/2023/10/9/ECOI2310697D/jo/texte',
  arrete2023: 'https://www.legifrance.gouv.fr/eli/arrete/2023/10/9/ECOI2311693A/jo/texte',
  r4514: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048180406',
  cp13113: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417259',
  cp13141: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417342',
  d2026_883: 'https://www.legifrance.gouv.fr/eli/decret/2026/9/23/PMEC2614497D/jo/texte',
  art47: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050213',
  art471: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050174',
  d2019: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038811937',
  d2026_816: 'https://www.legifrance.gouv.fr/eli/decret/2026/8/24/PRMJ2432005D/jo/texte',
  bfsg2: 'https://www.gesetze-im-internet.de/bfsg/__2.html',
  bfsg3: 'https://www.gesetze-im-internet.de/bfsg/__3.html',
  bfsg14: 'https://www.gesetze-im-internet.de/bfsg/__14.html',
  bfsg37: 'https://www.gesetze-im-internet.de/bfsg/__37.html',
  bfsg38: 'https://www.gesetze-im-internet.de/bfsg/__38.html',
  anl3: 'https://www.gesetze-im-internet.de/bfsg/anlage_3.html',
  bfsgv12: 'https://www.gesetze-im-internet.de/bfsgv/__12.html',
  bfsgv19: 'https://www.gesetze-im-internet.de/bfsgv/__19.html',
  bitv7: 'https://www.gesetze-im-internet.de/bitv_2_0/__7.html',
  faqDe: 'https://www.bundesfachstelle-barrierefreiheit.de/DE/Barrierefreiheitsstaerkungsgesetz/FAQ-Dienstleistungen/faq-dienstleistungen_node.html',
  mlbf: 'https://www.mlbf-barrierefrei.de/',
};

const T_FR = {
  crumbs: 'Fil d’Ariane',
  home: 'Générateur',
  byline: (d) => `Par Jalonel · publié le ${d} · textes officiels vérifiés le ${d}`,
  sourcesTitle: 'Sources',
  sourcesIntro: `Textes officiels consultés le ${CHECKED.fr}. En cas de doute, seul le texte publié fait foi.`,
  aboutTitle: 'À propos de cette page',
  about: `Rédigée par Jalonel, marque de READ FRANCE SAS (SIREN 988 741 773), avec l’aide d’Octave, notre assistant IA, à partir des textes officiels listés ci-dessus, relus le ${CHECKED.fr}. Information, pas un conseil juridique. Directeur de la publication : ${PUB_DIRECTOR}. Une erreur, ou un texte paru depuis ? Écrivez à ${a(`mailto:${CONTACT}`, CONTACT)}.`,
  faqTitle: 'Questions fréquentes',
};
const T_DE = {
  crumbs: 'Brotkrumennavigation',
  home: 'Generator',
  byline: (d) => `Von Jalonel · veröffentlicht am ${d} · Gesetzestexte geprüft am ${d}`,
  sourcesTitle: 'Quellen',
  sourcesIntro: `Amtliche Texte, abgerufen am ${CHECKED.de}. Maßgeblich ist allein der veröffentlichte Gesetzestext.`,
  aboutTitle: 'Über diese Seite',
  about: `Verfasst von Jalonel, einer Marke der READ FRANCE SAS (Paris, SIREN 988 741 773), mit Hilfe von Octave, unserem KI-Assistenten, anhand der oben verlinkten amtlichen Texte, geprüft am ${CHECKED.de}. Nur zur Information, keine Rechtsberatung. Verantwortlich für den Inhalt: ${PUB_DIRECTOR}. Ein Fehler oder eine neue Fassung? Schreiben Sie an ${a(`mailto:${CONTACT}`, CONTACT)}.`,
  faqTitle: 'Häufige Fragen',
};

function crumbsNav(lang, name) {
  const t = lang === 'de' ? T_DE : T_FR;
  return `<nav class="crumbs" aria-label="${t.crumbs}"><ol><li>${a(url(ROUTES.home[lang]), t.home)}</li><li aria-current="page">${name}</li></ol></nav>`;
}
function sourcesBlock(lang, items) {
  const t = lang === 'de' ? T_DE : T_FR;
  return `<section class="lp-section" data-section="sources" aria-labelledby="src-title">
<h2 id="src-title">${t.sourcesTitle}</h2>
<p class="fine">${t.sourcesIntro}</p>
<ul class="src-list sources-cited">${items.map(([href, text]) => `<li>${a(href, text)}</li>`).join('')}</ul>
</section>
<aside class="about guide-about" aria-labelledby="about-title">
<h2 id="about-title">${t.aboutTitle}</h2>
<p>${t.about}</p>
</aside>`;
}
function faqBlock(lang, faq) {
  const t = lang === 'de' ? T_DE : T_FR;
  return `<section class="lp-section" data-section="faq" aria-labelledby="faq-title">
<h2 id="faq-title">${t.faqTitle}</h2>
<div class="faq">
${faq.map(([q, ans], i) => `<details id="faq-${i + 1}"><summary>${q}</summary><div class="faq-a">${ans}</div></details>`).join('\n')}
</div>
</section>`;
}
const docBox = (doc, label) => `<div class="doc-sample" role="region" aria-label="${label}" tabindex="0">
${marks(toHtmlFragment(doc, { shift: 2 }))}
</div>`;

function jsonLd({ lang, path, headline, description, crumb, faq }) {
  const graph = [
    {
      '@type': 'Article',
      headline,
      description,
      inLanguage: lang,
      url: abs(path),
      mainEntityOfPage: abs(path),
      image: ogImage(lang),
      datePublished: GUIDES_DATE,
      dateModified: GUIDES_DATE,
      author: ORG_REF,
      publisher: ORG_REF,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: (lang === 'de' ? T_DE : T_FR).home, item: abs(ROUTES.home[lang]) },
        { '@type': 'ListItem', position: 2, name: crumb },
      ],
    },
  ];
  if (faq) graph.push({ '@type': 'FAQPage', mainEntity: faq.map(([q, ans]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(ans) } })) });
  return { '@context': 'https://schema.org', '@graph': graph };
}

const AUDIT = url(ROUTES.audit.fr);
const PRICE_NET = `${PRICE.ttc} net`;
const VAT_NOTE = 'TVA non applicable, art. 293 B du CGI';
const DL = (name) => RELEASE_DL + name;

// ------------------------------------------------------------------------------------------------
// C1. Modèle de déclaration d’accessibilité (FR)
// ------------------------------------------------------------------------------------------------

/** The official model, verbatim from accessibilite.numerique.gouv.fr (read 2026-10-17, Licence Ouverte 2.0). */
const OFFICIAL_MODEL = `<p>[Nom de l’organisme concerné] s’engage à rendre [son (ses) site(s) internet, intranet, extranet et son (ses) application(s) mobile(s), etc.] accessibles conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.</p>
<p>À cette fin, il met en œuvre la stratégie et les actions suivantes [liens vers le schéma pluriannuel et vers le plan d’action de l’année en cours incluant le bilan des actions réalisées l’année précédente].</p>
<p>Cette déclaration d’accessibilité s’applique à [Nom du site web de l’application mobile, ou d’un autre service auquel la déclaration s’applique].</p>
<h3>État de conformité</h3>
<p>[Nom du site web, de l’application mobile, ou d’un autre service concerné] est [totalement / partiellement / non] conforme avec [pour les sites : le référentiel général d’amélioration de l’accessibilité / autre protocole de test utilisé ; pour les autres services de communication : protocole de test utilisé].</p>
<h3>Résultat des tests</h3>
<p>L’audit de conformité réalisé [en interne / par la société NNN] révèle que :</p>
<p>[pourcentage de critères RGAA respectés] des critères RGAA sont respectés.</p>
<p>[Facultatif] Le taux moyen de conformité du service en ligne s’élève à [taux moyen de conformité du service en ligne].</p>
<p>[Détailler ici les résultats des tests ou insérer un lien vers le rapport de test]</p>
<h3>Contenus non accessibles</h3>
<p>Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.</p>
<h4>Non conformité</h4>
<p>[Lister la/les non-conformité(s) du/de la/des site(s) internet/application(s) mobile(s) et/ou décrire quels section(s)/contenu(s)/fonction(s) ne sont pas encore conformes, indiquer les alternatives s’il y a lieu].</p>
<h4>Dérogations pour charge disproportionnée</h4>
<p>[Lister la/le/les section(s)/contenu(s)/fonction(s) non accessible(s) pour laquelle/lequel/lesquels la dérogation pour charge disproportionnée est temporairement invoquée, indiquer les alternatives s’il y a lieu].</p>
<h4>Contenus non soumis à l’obligation d’accessibilité</h4>
<p>[Lister la/le/les section(s)/contenu(s)/fonction(s) non accessible(s) qui n’entre(nt) pas dans le champ d’application de la législation applicable, indiquer les alternatives s’il y a lieu].</p>
<h3>Établissement de cette déclaration d’accessibilité</h3>
<p>Cette déclaration a été établie le [JJ mois AAAA]. Elle a été mise à jour le [JJ mois AAAA].</p>
<h4>Technologies utilisées pour la réalisation [Du site web / De l’application mobile / Du service…]</h4>
<p>[Liste des technologies utilisées]</p>
<h4>Environnement de test</h4>
<p>Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité</p>
<p>[Indiquer les combinaisons utilisées pour effectuer les vérifications de conformité]</p>
<h4>Les outils utilisés lors de l’évaluation</h4>
<p>[Indiquer les outils utilisés]</p>
<h4>Pages du site ayant fait l’objet de la vérification de conformité</h4>
<p>[Indiquer la liste des pages qui ont été testées]</p>
<h3>Retour d’information et contact</h3>
<p>Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du [site internet / application mobile / Autre service] pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.</p>
<ul><li>Envoyer un message [url du formulaire en ligne]</li><li>Contacter [Nom de l’entité responsable du service en ligne] [url d’une page avec les coordonnées de l’entité]</li></ul>
<h3>Voies de recours</h3>
<p>Cette procédure est à utiliser dans le cas suivant.</p>
<p>Vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.</p>
<ul><li>Écrire un message au Défenseur des droits (https://www.defenseurdesdroits.fr/nous-contacter-355)</li><li>Contacter le délégué du Défenseur des droits près de chez vous (https://www.defenseurdesdroits.fr/carte-des-delegues)</li><li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07</li></ul>`;

/** Fictitious shop, no audit yet: what the generator outputs for these answers (two placeholders filled in). */
function frExample() {
  const doc = buildDocument('fr', 'rgaa', {
    orgName: 'Maison Exemple SAS',
    siteName: 'la boutique en ligne Maison Exemple',
    auditType: 'none',
    statementDate: GUIDES_DATE,
    nonConformities: [
      'Filtres de la liste de produits (taille, couleur) : utilisables à la souris seulement. Alternative : recherche par mot-clé, utilisable au clavier.',
      'Photos des fiches produit : une partie n’a pas d’alternative textuelle. La description écrite du produit reste disponible.',
      'Vidéos de démonstration : sans sous-titres. Transcription envoyée sur demande à l’adresse ci-dessous.',
      'Fenêtre d’inscription à la lettre d’information : le bouton de fermeture n’a pas de nom lisible par un lecteur d’écran. La fenêtre se ferme aussi avec la touche Échap.',
    ].join('\n'),
    derogations: 'Aucune.',
    exempted: 'Avis clients publiés par des tiers et non modérés par Maison Exemple SAS.',
    technologies: 'HTML, CSS, JavaScript, PHP',
    testEnv: 'Aucun audit à ce jour. Constats internes faits avec Firefox et le lecteur d’écran NVDA.',
    tools: 'Mini-test axe-core de A11y Kit, sur les pages ci-dessous (test automatique partiel)',
    pages: ['Accueil', 'Catégorie Linge de maison', 'Fiche produit', 'Panier', 'Livraison et paiement', 'Contact', 'Mentions légales', 'Accessibilité'].join('\n'),
    contactEmail: 'accessibilite@maison-exemple.example',
    support: 'Commande et aide par téléphone, du lundi au vendredi de 9 h à 18 h, au numéro indiqué sur la page Contact.',
  });
  for (const b of doc.blocks) {
    if (b.t !== 'p' || typeof b.runs !== 'string') continue;
    if (b.runs.startsWith('À cette fin')) b.runs = 'À cette fin, elle met en œuvre la stratégie et les actions suivantes : schéma pluriannuel de mise en accessibilité 2026-2028 et plan d’action 2026, publiés sur la page Accessibilité.';
    b.runs = b.runs.replace('[Indiquer la date prévue de l’audit.]', 'Un audit complet est prévu au premier trimestre 2027.');
  }
  return doc;
}

const C1 = {
  path: ROUTES.modele.fr,
  title: 'Modèle de déclaration d’accessibilité RGAA et exemple rempli',
  description: 'Le modèle officiel de déclaration d’accessibilité (RGAA) en entier, un exemple rempli sans audit, et ce qu’une boutique en ligne doit publier à la place.',
  h1: 'Modèle de déclaration d’accessibilité, avec un exemple rempli',
  crumb: 'Modèle de déclaration d’accessibilité',
};
const C1_FAQ = [
  ['Une PME doit-elle publier une déclaration au format RGAA ?', `<p>Non, sauf si elle relève du secteur public ou si son chiffre d’affaires moyen réalisé en France sur les trois derniers exercices dépasse 250 millions d’euros (${a(S.d2019, 'décret n° 2019-768, art. 2')}). Si elle vend en ligne à des particuliers sans être une microentreprise, elle doit en revanche publier les informations d’accessibilité de l’Acte européen (${a(S.d41257, 'code de la consommation, art. D. 412-57')}).</p>`],
  ['Peut-on indiquer un taux obtenu avec un outil gratuit ?', `<p>Non. Le taux de la déclaration se calcule sur les 106 critères du RGAA 4.1.2, testés sur un échantillon de pages (${a(S.rgaaEval, 'méthode de la DINUM')}). Un outil automatique ne vérifie qu’une partie de ces critères : il détecte une image sans alternative textuelle (critère 1.1), pas une alternative qui décrit mal l’image (critère 1.3).</p>`],
  ['Où publier la déclaration ?', `<p>Sur une page « Accessibilité » du site, accessible depuis la page d’accueil et depuis toutes les autres pages, en général par un lien de pied de page. La DINUM recommande une adresse du type « www.nomdusite.fr/accessibilite ». Pour une application mobile : sur le site de l’organisme qui l’a développée ou avec les informations de téléchargement, l’état de conformité étant rappelé dans l’application.</p>`],
  ['Que risque une entreprise de plus de 250 M€ qui ne publie rien ?', `<p>L’Arcom contrôle la déclaration, le schéma pluriannuel et la mention en page d’accueil. Elle met d’abord en demeure, publiquement ; faute de mise en conformité, la sanction peut atteindre 25 000 €, et une nouvelle sanction est possible si le manquement dure six mois de plus (${a(S.art471, 'loi n° 2005-102, art. 47-1')}). Le plafond de 50 000 € prévu par le même article vise le défaut d’accessibilité des organismes publics et assimilés.</p>`],
];

function c1Body() {
  const ex = frExample();
  return `${crumbsNav('fr', C1.crumb)}
<section class="hero guide-hero" data-section="hero">
<p class="eyebrow">Modèle officiel RGAA · exemple commenté</p>
<h1>${C1.h1}</h1>
<p class="lead">Voici le modèle obligatoire de déclaration d’accessibilité tel que la DINUM le publie sur accessibilite.numerique.gouv.fr (texte relevé le ${CHECKED.fr}), puis un exemple rempli pour une boutique fictive qui n’a pas encore fait d’audit. Ce format s’impose aux organismes publics et aux entreprises dont le chiffre d’affaires moyen en France dépasse 250 millions d’euros. Une boutique en ligne plus petite publie un autre document, les informations d’accessibilité prévues par l’Acte européen : le tableau ci-dessous dit lequel vous concerne.</p>
<div class="cta-row">
<a class="btn btn-lg" href="${url(ROUTES.home.fr)}">Générer ma déclaration (gratuit)</a>
<a class="text-link" href="${DL('modele-declaration-accessibilite-rgaa-fr.docx')}" data-mesure="free_download">Télécharger le modèle vierge (Word)</a>
</div>
<p class="byline">${T_FR.byline(CHECKED.fr)}</p>
</section>

<section class="lp-section" data-section="quel-document" aria-labelledby="who-title">
<h2 id="who-title">Quel document votre site doit publier</h2>
<div class="prose"><p>Deux textes coexistent et leurs noms se ressemblent. L’${a(S.art47, 'article 47 de la loi n° 2005-102')} exige une « déclaration d’accessibilité » au format reproduit plus bas. Le code de la consommation, qui transpose l’Acte européen sur l’accessibilité (directive (UE) 2019/882), exige des « informations » sur l’accessibilité du service, sans format imposé et sans état de conformité.</p></div>
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="who-title">
<table><thead><tr><th scope="col">Votre situation</th><th scope="col">Ce que vous publiez</th><th scope="col">Texte</th></tr></thead><tbody>
<tr><th scope="row">Organisme public, ou entreprise dont le chiffre d’affaires moyen en France sur les trois derniers exercices dépasse 250 M€</th><td>La déclaration d’accessibilité de cette page, un schéma pluriannuel d’au plus trois ans, le plan d’action de l’année et la mention « Accessibilité : totalement, partiellement ou non conforme » en page d’accueil</td><td>${a(S.art47, 'Loi n° 2005-102, art. 47, III et IV')} ; ${a(S.d2019, 'décret n° 2019-768, art. 2')}</td></tr>
<tr><th scope="row">Entreprise qui vend en ligne à des particuliers et n’est pas une microentreprise</th><td>Les informations sur l’accessibilité du service, dans les CGV ou un document équivalent, sous forme écrite et orale</td><td>${a(S.d41257, 'Code de la consommation, art. D. 412-57')} et son annexe</td></tr>
<tr><th scope="row">Microentreprise qui fournit des services : moins de 10 personnes, et chiffre d’affaires annuel ou total du bilan d’au plus 2 M€</th><td>Rien d’obligatoire pour ses services. Une page volontaire reste utile à vos clients.</td><td>${a(S.l41213, 'Code de la consommation, art. L. 412-13, I')}</td></tr>
</tbody></table></div>
<div class="prose"><p>Une enseigne qui dépasse 250 M€ et vend à des particuliers publie les deux documents. Les ventes réservées aux professionnels ne sont pas visées : la directive définit le commerce électronique comme un service fourni « en vue de conclure un contrat avec un consommateur » (art. 3, point 30).</p></div>
</section>

<section class="lp-section" data-section="modele" aria-labelledby="model-title">
<h2 id="model-title">Le modèle officiel, en entier</h2>
<div class="prose"><p>Texte reproduit à l’identique depuis la page ${a(S.rgaaDecl, '« Déclaration d’accessibilité » du site de la DINUM')} (Licence Ouverte 2.0), qui précise que la déclaration « adopte obligatoirement ce format ». Les passages entre crochets sont à remplacer par vos informations.</p></div>
<div class="doc-sample" role="region" aria-label="Modèle officiel de déclaration d’accessibilité" tabindex="0">
${marks(OFFICIAL_MODEL)}
</div>
<p class="fine">Le même modèle, prérempli par notre générateur avec la version 4.1.2 du RGAA : ${a(DL('modele-declaration-accessibilite-rgaa-fr.docx'), 'Word (.docx)', ' data-mesure="free_download"')} · ${a(DL('modele-declaration-accessibilite-rgaa-fr.md'), 'Markdown (.md)', ' data-mesure="free_download"')}.</p>
</section>

<section class="lp-section" data-section="commentaire" aria-labelledby="parts-title">
<h2 id="parts-title">Ce qu’il faut écrire, partie par partie</h2>
<div class="prose">
<h3>L’engagement et le périmètre</h3>
<p>Le nom attendu est celui de l’entité juridique qui édite le site (« Maison Exemple SAS »), la marque seule ne suffit pas à identifier le responsable. Listez chaque site couvert. Pour une application mobile, la déclaration est publiée sur le site de l’organisme qui l’a développée ou avec les informations de téléchargement, et l’état de conformité est rappelé dans l’application. Le deuxième paragraphe renvoie au schéma pluriannuel et au plan d’action de l’année : la page « Accessibilité » doit les contenir ou y mener (${a(S.rgaaMentions, 'mentions et pages obligatoires')}).</p>
<h3>L’état de conformité</h3>
<p>Trois valeurs seulement. « Totalement conforme » si tous les critères du RGAA sont respectés, « partiellement conforme » si au moins 50 % le sont, « non conforme » si moins de 50 % le sont ou s’il n’existe aucun résultat d’audit en cours de validité. Sans audit, la seule mention possible est donc « non conforme », même si le site vous paraît en bon état.</p>
<h3>Le résultat des tests</h3>
<p>Le pourcentage s’obtient en divisant le nombre de critères validés par le nombre de critères applicables, sur tout l’échantillon : un critère invalidé sur une seule page compte comme non validé. Le RGAA 4.1.2 compte 106 critères. Une note Lighthouse sur 100, ou le chiffre affiché par un widget, ne mesure pas la même chose et n’a pas sa place ici. Le « taux moyen de conformité », moyenne des taux de chaque page, est facultatif.</p>
<h3>Les contenus non accessibles</h3>
<p>Trois listes distinctes. Les non-conformités décrivent ce qui ne fonctionne pas et l’alternative proposée (« vidéo sans sous-titres ; transcription envoyée sur demande »). Les dérogations pour charge disproportionnée doivent être expliquées et motivées. Les contenus non soumis à l’obligation sont ceux que le décret n° 2019-768 exempte ; le ${a(S.d2026_816, 'décret n° 2026-816 du 24 août 2026')} a aligné ces exemptions sur les dates de l’Acte européen. Écrivez « Aucun » plutôt que de laisser une rubrique vide.</p>
<h3>L’établissement de la déclaration</h3>
<p>Indiquez la date, les technologies (HTML, CSS, JavaScript, le CMS), l’environnement de test, c’est-à-dire le navigateur et le lecteur d’écran utilisés ensemble (par exemple NVDA avec Firefox), les outils et la liste des pages testées. La ${a(S.rgaaEval, 'méthode de la DINUM')} fixe un échantillon minimal : accueil, contact, mentions légales, page « Accessibilité », plan du site, aide et authentification quand elles existent, au moins une page par type de service, toutes les pages d’un processus (pour une boutique : panier, livraison, paiement), puis des pages tirées au hasard pour au moins 10 % de l’échantillon.</p>
<p>La déclaration est à mettre à jour après une modification substantielle ou une refonte, trois ans après sa publication, et 18 mois après la publication d’une nouvelle version du référentiel. La DINUM annonce le ${a(S.rgaa5, 'RGAA 5')} pour fin 2026.</p>
<h3>Le contact et les voies de recours</h3>
<p>Le mécanisme de contact doit lui-même être accessible : une adresse e-mail ou un formulaire. Pour les organismes de l’article 47, la DINUM fixe un délai de réponse d’une semaine à compter de l’envoi de la réclamation. Le paragraphe sur le Défenseur des droits se recopie tel quel, adresse postale comprise.</p>
</div>
<p class="callout info">Sans audit, votre statut reste « non conforme ». Pour savoir quels défauts corriger d’abord, notre ${a(AUDIT, `audit automatisé teste ${MAX_PAGES} pages sur ordinateur et mobile pour ${PRICE_NET}`)} (${VAT_NOTE}, entreprises immatriculées en France). Il ne donne pas de taux RGAA : la page ${a(url(ROUTES.prix.fr), 'Prix d’un audit d’accessibilité')} compare les trois niveaux d’audit.</p>
</section>

<section class="lp-section" data-section="exemple" aria-labelledby="ex-title">
<h2 id="ex-title">Exemple rempli : une boutique sans audit</h2>
<div class="prose"><p>Maison Exemple SAS et sa boutique sont fictives. Le document ci-dessous sort de notre générateur, avec des réponses saisies comme le ferait une enseigne qui publie la déclaration RGAA sans avoir encore fait auditer son site. Nous avons seulement complété deux passages entre crochets : le lien vers le schéma pluriannuel et la date de l’audit prévu.</p></div>
${docBox(ex, 'Exemple rempli de déclaration d’accessibilité, boutique fictive')}
<div class="prose"><p>Trois choses à remarquer. La rubrique « Résultat des tests » dit qu’aucun audit n’a été fait, ce qui justifie le statut « non conforme ». Les défauts listés viennent de constats internes, chacun avec une solution de rechange pour le client. La date d’audit prévue donne une échéance que le lecteur peut vérifier.</p></div>
</section>

<section class="lp-section" data-section="erreurs" aria-labelledby="err-title">
<h2 id="err-title">Six erreurs qui rendent une déclaration inexacte</h2>
<ol class="prose err-list">
<li>Écrire « partiellement conforme » sans audit, ou d’après un test automatique. Le statut dépend d’un audit des critères RGAA, et un outil automatique n’en vérifie qu’une partie.</li>
<li>Recopier la note d’un outil (Lighthouse, widget) comme taux de conformité.</li>
<li>Publier la déclaration en image ou en PDF scanné. Elle doit être publiée dans un format accessible.</li>
<li>La rendre difficile à trouver. La page « Accessibilité » doit être accessible depuis la page d’accueil et depuis n’importe quelle page.</li>
<li>Oublier la mention « Accessibilité : non conforme » en page d’accueil, obligatoire pour les organismes de l’article 47 (${a(S.rgaaMentions, 'DINUM')}).</li>
<li>Confondre avec l’accessibilité des bâtiments. L’attestation d’accessibilité d’un établissement recevant du public (ERP) relève d’un autre dispositif, sans rapport avec le site.</li>
</ol>
</section>

<section class="lp-section" data-section="boutique" aria-labelledby="eaa-title">
<h2 id="eaa-title">Pour une boutique en ligne : les informations de l’Acte européen</h2>
<div class="prose">
<p>Le code de la consommation demande aux prestataires de services, dont les sites marchands, d’établir des informations qui expliquent comment le service respecte les exigences d’accessibilité (${a(S.d41257, 'art. D. 412-57, 2°')}). Elles sont mises à la disposition du public sous forme écrite et orale, y compris de façon accessible, et conservées aussi longtemps que le service est disponible. L’annexe de l’article les place « dans les clauses et conditions générales ou dans un document équivalent » et en fixe le contenu :</p>
<ul>
<li>a) une description générale du service dans des formats accessibles ;</li>
<li>b) les descriptions et explications nécessaires pour comprendre son fonctionnement (pour une boutique : recherche, panier, paiement, livraison, retours) ;</li>
<li>c) la manière dont les exigences d’accessibilité sont remplies ;</li>
<li>et (point III) des informations montrant que le procédé de prestation du service et son suivi assurent sa conformité.</li>
</ul>
<p>Ce document ne comporte ni état de conformité ni pourcentage. Le générateur le produit sous le nom « Informations d’accessibilité du service ». Le guide ${a(url(ROUTES.boutique.fr), 'Accessibilité : ce qu’une boutique en ligne doit faire')} détaille les exigences techniques, l’exemption, les délais et les sanctions.</p>
</div>
</section>

${faqBlock('fr', C1_FAQ)}

${sourcesBlock('fr', [
    [S.rgaaDecl, 'DINUM, « Déclaration d’accessibilité » (modèle obligatoire, statuts, validité, publication)'],
    [S.rgaaMentions, 'DINUM, « Mentions et pages obligatoires »'],
    [S.rgaaEval, 'DINUM, « Évaluation de la conformité » (échantillon, calcul du taux)'],
    [S.art47, 'Loi n° 2005-102 du 11 février 2005, article 47'],
    [S.art471, 'Loi n° 2005-102, article 47-1 (contrôle et sanctions de l’Arcom)'],
    [S.d2019, 'Décret n° 2019-768 du 24 juillet 2019, article 2 (seuil de 250 M€)'],
    [S.d2026_816, 'Décret n° 2026-816 du 24 août 2026'],
    [S.l41213, 'Code de la consommation, article L. 412-13'],
    [S.d41257, 'Code de la consommation, article D. 412-57'],
    [S.d2023, 'Décret n° 2023-931 du 9 octobre 2023 (annexe de l’article D. 412-57)'],
  ])}`;
}

// ------------------------------------------------------------------------------------------------
// C2. Muster Barrierefreiheitserklärung (DE)
// ------------------------------------------------------------------------------------------------

function deExample() {
  return buildDocument('de', 'eaa', {
    country: 'DE',
    orgName: 'Beispiel Handels GmbH',
    siteName: 'Beispiel-Shop',
    serviceDescription: 'Der Beispiel-Shop verkauft Haushaltswaren an Privatkundinnen und Privatkunden in Deutschland. Bestellen kann man über die Website, mit oder ohne Kundenkonto.',
    operation: [
      'Produkte finden: Suchfeld und Kategorien; die Filter lassen sich per Tastatur bedienen.',
      'Warenkorb: Menge ändern oder Artikel entfernen; der Gesamtpreis steht als Text da.',
      'Bestellung: als Gast oder mit Kundenkonto; Fehlermeldungen erscheinen als Text direkt am Feld.',
      'Bezahlung: Rechnung, Lastschrift oder Kreditkarte über die eingebundene Seite unseres Zahlungsdienstleisters.',
      'Lieferung und Rücksendung: Versandbestätigung per E-Mail, Retourenschein als HTML-Seite und als PDF.',
    ].join('\n'),
    auditType: 'self',
    auditDate: '2026-09-15',
    standard: 'en301549',
    features: ['keyboard', 'alt', 'contrast', 'zoom', 'forms', 'payment', 'support'],
    support: 'Hilfe bei der Bestellung per E-Mail oder telefonisch, Montag bis Freitag von 9 bis 17 Uhr, unter der Nummer im Impressum.',
    monitoring: 'Neue Funktionen prüfen wir vor der Veröffentlichung mit Tastatur und Screenreader. Hinweise auf Barrieren beantworten wir innerhalb von fünf Werktagen.',
    contactEmail: 'barrierefreiheit@beispiel-shop.example',
    statementDate: GUIDES_DATE,
  });
}

const C2 = {
  path: ROUTES.muster.de,
  title: 'Muster Barrierefreiheitserklärung für Online-Shops (BFSG)',
  description: 'Kostenloses Muster nach BFSG Anlage 3 für Online-Shops, komplett auf der Seite: Text, ausgefülltes Beispiel, MLBF als Behörde, Veröffentlichung.',
  h1: 'Muster: Barrierefreiheitserklärung für Online-Shops nach BFSG Anlage 3',
  crumb: 'Muster Barrierefreiheitserklärung',
};
const C2_FAQ = [
  ['Gilt das Muster auch für Österreich?', `<p>Nein. In Österreich gilt das Barrierefreiheitsgesetz (BaFG) mit eigenem Wortlaut und eigener Behörde. Wir haben es noch nicht geprüft, und dieses Muster nennt die deutsche MLBF.</p>`],
  ['Muss ich vorher ein Audit machen lassen?', `<p>Eine Prüfung durch Dritte schreibt das BFSG nicht vor. Es verlangt, dass die Dienstleistung die Anforderungen erfüllt (${a(S.bfsg14, '§ 14 Abs. 1 Nr. 1')}) und dass Sie beschreiben, wie (Anlage 3 Buchstabe c). Ohne eigene Prüfung lässt sich das kaum belegen. Kostenlos anfangen können Sie mit unserem ${a(url(ROUTES.check.de), 'Selbsttest in 20 Punkten')}.</p>`],
  ['Muss ich bekannte Barrieren auflisten?', `<p>Nein, das verlangt das BFSG nicht (${a(S.faqDe, 'FAQ der Bundesfachstelle')}, Frage 2). Stellen Sie aber fest, dass Ihr Shop die Anforderungen nicht erfüllt, müssen Sie Korrekturmaßnahmen ergreifen und die Marktüberwachungsbehörde unverzüglich informieren (${a(S.bfsg14, '§ 14 Abs. 4')}).</p>`],
  ['Kann ich das kostenpflichtige Audit aus Deutschland bestellen?', `<p>Nein. Wir verkaufen es nur an Unternehmen mit Sitz in Frankreich: Die Bestellung verlangt eine SIREN-Nummer, Bestellformular und AGB sind auf Französisch. Muster, Generator und Selbsttest bleiben für alle kostenlos.</p>`],
];

function c2Body() {
  const blank = buildDocument('de', 'eaa', { country: 'DE' });
  const ex = deExample();
  return `${crumbsNav('de', C2.crumb)}
<section class="hero guide-hero" data-section="hero">
<p class="eyebrow">Kostenlos · vollständiger Text auf der Seite</p>
<h1>${C2.h1}</h1>
<p class="lead">Hier steht ein vollständiges Muster für die Informationen zur Barrierefreiheit, die Online-Shops seit dem 28. Juni 2025 nach § 14 und Anlage 3 BFSG veröffentlichen müssen, dazu ein ausgefülltes Beispiel. Das Muster deckt die vier Pflichtangaben a bis d ab und nennt die MLBF in Magdeburg als zuständige Marktüberwachungsbehörde. Sie dürfen es frei übernehmen und anpassen.</p>
<p class="callout info fr-only">Kostenlose Information, keine Rechtsberatung. Unser kostenpflichtiges Audit verkaufen wir ausschließlich an Unternehmen mit Sitz in Frankreich (SIREN-Nummer). Für Shops in Deutschland sind Muster, Generator und Selbsttest kostenlos; eine Bestellung ist nicht möglich.</p>
<div class="cta-row">
<a class="btn btn-lg" href="${url(ROUTES.home.de)}">Muster im Generator ausfüllen (kostenlos)</a>
<a class="text-link" href="${DL('vorlage-barrierefreiheitserklaerung-bfsg-de.docx')}" data-mesure="free_download">Leere Vorlage herunterladen (Word)</a>
</div>
<p class="byline">${T_DE.byline(CHECKED.de)}</p>
</section>

<section class="lp-section" data-section="wer" aria-labelledby="who-title">
<h2 id="who-title">Wer die Informationen veröffentlichen muss</h2>
<div class="prose">
<p>Das BFSG erfasst Dienstleistungen im elektronischen Geschäftsverkehr: digitale Dienste, die über Websites und Apps angeboten und „auf individuelle Anfrage eines Verbrauchers im Hinblick auf den Abschluss eines Verbrauchervertrags erbracht werden“ (${a(S.bfsg2, '§ 2 Nr. 26 BFSG')}). Ein Shop, der nur an Unternehmen verkauft, fällt nicht darunter.</p>
<p>Ausgenommen sind Kleinstunternehmen, die Dienstleistungen anbieten: weniger als zehn Beschäftigte und entweder höchstens 2 Mio. € Jahresumsatz oder höchstens 2 Mio. € Jahresbilanzsumme (${a(S.bfsg2, '§ 2 Nr. 17')}, ${a(S.bfsg3, '§ 3 Abs. 3')}). Die Ausnahme gilt nur für Dienstleistungen, nicht für Produkte. Dienstleistungsverträge, die vor dem 28. Juni 2025 geschlossen wurden, dürfen bis zu ihrem Ablauf unverändert weiterlaufen, längstens bis zum 27. Juni 2030 (${a(S.bfsg38, '§ 38 Abs. 1')}).</p>
</div>
</section>

<section class="lp-section" data-section="begriffe" aria-labelledby="terms-title">
<h2 id="terms-title">Barrierefreiheitserklärung oder Informationen zur Barrierefreiheit?</h2>
<div class="prose">
<p>Im Alltag heißt die Seite meist „Barrierefreiheitserklärung“. Das Gesetz spricht von „Informationen über Dienstleistungen, die den Barrierefreiheitsanforderungen entsprechen“ (${a(S.anl3, 'Anlage 3')}). Die Bundesfachstelle Barrierefreiheit unterscheidet sie ausdrücklich von der „Erklärung zur Barrierefreiheit“ nach dem Behindertengleichstellungsgesetz, die öffentliche Stellen des Bundes veröffentlichen: Dort sind nicht barrierefreie Inhalte aufzuzählen und zu begründen, nach dem BFSG nicht (${a(S.faqDe, 'FAQ, Stand August 2025')}).</p>
<p>Einen Seitentitel schreibt das Gesetz nicht vor, es kommt auf den Inhalt an. Für Behörden gilt ein anderes Muster, das des Durchführungsbeschlusses (EU) 2018/1523 (${a(S.bitv7, '§ 7 Abs. 4 BITV 2.0')}); es passt nicht für einen Shop.</p>
</div>
</section>

<section class="lp-section" data-section="muster" aria-labelledby="muster-title">
<h2 id="muster-title">Das Muster</h2>
<div class="prose"><p>So erzeugt unser Generator das Dokument ohne Angaben. Eckige Klammern ersetzen Sie durch Ihre Angaben; der Text zur MLBF bleibt, wie er ist.</p></div>
${docBox(blank, 'Muster Barrierefreiheitserklärung nach BFSG Anlage 3')}
<p class="fine">Dasselbe Muster als Datei: ${a(DL('vorlage-barrierefreiheitserklaerung-bfsg-de.docx'), 'Word (.docx)', ' data-mesure="free_download"')} · ${a(DL('vorlage-barrierefreiheitserklaerung-bfsg-de.md'), 'Markdown (.md)', ' data-mesure="free_download"')}.</p>
<h3 id="map-title">Welche Pflichtangabe wo steht</h3>
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="map-title">
<table><thead><tr><th scope="col">Abschnitt im Muster</th><th scope="col">Anlage 3 Nr. 1</th><th scope="col">Was hineingehört</th></tr></thead><tbody>
<tr><th scope="row">Allgemeine Beschreibung der Dienstleistung</th><td>a)</td><td>Zwei, drei Sätze: was Sie verkaufen, an wen, über welche Website oder App. Die Beschreibung selbst muss in barrierefreiem Format vorliegen.</td></tr>
<tr><th scope="row">Erläuterungen zur Durchführung der Dienstleistung</th><td>b)</td><td>Die Schritte vom Suchen bis zur Rücksendung, in einfacher Sprache.</td></tr>
<tr><th scope="row">Wie die Dienstleistung die Barrierefreiheitsanforderungen erfüllt</th><td>c)</td><td>Geprüfter Standard (etwa EN 301 549 V3.2.1, die WCAG 2.1 Stufe AA enthält), Datum und Art der Prüfung, umgesetzte Maßnahmen wie Tastaturbedienung oder beschriftete Formularfelder.</td></tr>
<tr><th scope="row">Zuständige Marktüberwachungsbehörde</th><td>d)</td><td>MLBF AöR, Carl-Miller-Straße 6, 39112 Magdeburg, kontakt@mlbf-barrierefrei.de (${a(S.mlbf, 'Impressum der MLBF')}).</td></tr>
<tr><th scope="row">Unterstützung und Alternativen, Kontakt</th><td>nicht in Anlage 3</td><td>Wie Kundinnen und Kunden Hilfe bekommen. Gibt es einen Kundenservice, muss er nach ${a(S.bfsgv12, '§ 12 Nr. 4 BFSGV')} über Barrierefreiheit mit barrierefreien Kommunikationsmitteln informieren.</td></tr>
</tbody></table></div>
<div class="prose"><p>Für Online-Shops kommen die Zusatzanforderungen aus ${a(S.bfsgv19, '§ 19 BFSGV')} hinzu: Informationen zur Barrierefreiheit der verkauften Produkte, soweit der Hersteller sie liefert, sowie barrierefreie Identifizierungs-, Authentifizierungs-, Sicherheits- und Zahlungsfunktionen. Beschreiben Sie unter Buchstabe c, wie Ihr Bezahlvorgang das erfüllt.</p></div>
</section>

<section class="lp-section" data-section="beispiel" aria-labelledby="ex-title">
<h2 id="ex-title">Ausgefülltes Beispiel</h2>
<div class="prose"><p>Die Beispiel Handels GmbH ist erfunden. Das Beispiel zeigt, wie konkret die Angaben sein sollten: welcher Standard, wann und wie geprüft, was umgesetzt ist, wie man Hilfe bekommt.</p></div>
${docBox(ex, 'Ausgefülltes Beispiel einer Barrierefreiheitserklärung, fiktiver Shop')}
</section>

<section class="lp-section" data-section="veroeffentlichen" aria-labelledby="pub-title">
<h2 id="pub-title">Wo und wie Sie die Informationen veröffentlichen</h2>
<ul class="prose src-list">
<li>In den AGB oder „auf andere deutlich wahrnehmbare Weise“ (${a(S.anl3, 'Anlage 3 Nr. 1')}). Die Bundesfachstelle empfiehlt einen Link „Barrierefreiheit“ im Kopf- oder Fußbereich der Website, der auf die Seite mit den Informationen führt.</li>
<li>In barrierefreier Form: über mehr als einen sensorischen Kanal, als Text, aus dem sich andere Formate erzeugen lassen, mit angemessener Schriftgröße, ausreichendem Kontrast und ausreichenden Abständen (${a(S.bfsgv12, '§ 12 Nr. 2 BFSGV')}). Eine normale HTML-Seite erfüllt das nach unserer Einschätzung leichter als ein PDF.</li>
<li>Aufbewahren, solange Sie die Dienstleistung anbieten (${a(S.bfsg14, '§ 14 Abs. 2 BFSG')}), und nach Änderungen am Shop aktualisieren.</li>
<li>Eine Schlichtungsstelle müssen Sie nicht nennen. Für Schlichtungen zum BFSG ist die Schlichtungsstelle nach § 16 BGG zuständig (FAQ der Bundesfachstelle, Frage 5).</li>
</ul>
</section>

<section class="lp-section" data-section="bussgeld" aria-labelledby="fine-title">
<h2 id="fine-title">Was ein Verstoß kosten kann</h2>
<div class="prose">
<p>Wer eine Dienstleistung entgegen § 14 Abs. 1 anbietet, also auch ohne die Informationen nach Anlage 3, handelt ordnungswidrig. Die Geldbuße reicht bis 100.000 € (${a(S.bfsg37, '§ 37 Abs. 1 Nr. 8 und Abs. 2')}). Wer der Behörde eine verlangte Auskunft nicht oder nicht richtig erteilt (§ 14 Abs. 5), riskiert bis 10.000 € (§ 37 Abs. 1 Nr. 6). Zuständig ist die gemeinsame Marktüberwachungsstelle der Länder, die ${a(S.mlbf, 'MLBF AöR')} in Magdeburg.</p>
<p>Die Beträge sind Höchstgrenzen. Wie die MLBF sie in der Praxis bemisst, steht nicht im Gesetz.</p>
</div>
</section>

${faqBlock('de', C2_FAQ)}

${sourcesBlock('de', [
    [S.bfsg2, 'BFSG § 2 (Begriffsbestimmungen, Nr. 17 und 26)'],
    [S.bfsg3, 'BFSG § 3 Abs. 3 (Ausnahme für Kleinstunternehmen)'],
    [S.bfsg14, 'BFSG § 14 (Pflichten des Dienstleistungserbringers)'],
    [S.anl3, 'BFSG Anlage 3 (Informationen über Dienstleistungen)'],
    [S.bfsg37, 'BFSG § 37 (Bußgeldvorschriften)'],
    [S.bfsg38, 'BFSG § 38 (Übergangsbestimmungen)'],
    [S.bfsgv12, 'BFSGV § 12 (Allgemeine Anforderungen an Dienstleistungen)'],
    [S.bfsgv19, 'BFSGV § 19 (Elektronischer Geschäftsverkehr)'],
    [S.bitv7, 'BITV 2.0 § 7 (Erklärung zur Barrierefreiheit öffentlicher Stellen)'],
    [S.faqDe, 'Bundesfachstelle Barrierefreiheit, FAQ zu den Informationen nach Anlage 3 (Stand August 2025)'],
    [S.mlbf, 'MLBF AöR, Marktüberwachungsstelle der Länder (Anschrift im Impressum)'],
  ])}`;
}

// ------------------------------------------------------------------------------------------------
// C4. Prix d’un audit d’accessibilité (FR)
// ------------------------------------------------------------------------------------------------

const C4 = {
  path: ROUTES.prix.fr,
  title: 'Prix d’un audit d’accessibilité : 0 €, 149 € ou sur devis',
  description: 'Outils gratuits, audit automatisé de 20 pages à 149 € net, audit RGAA complet sur devis : ce que chaque niveau prouve, ce qu’il ne prouve pas, et pour qui.',
  h1: 'Prix d’un audit d’accessibilité : du test gratuit à l’audit RGAA complet',
  crumb: 'Prix d’un audit d’accessibilité',
};
const C4_FAQ = [
  ['Un audit automatique suffit-il ?', `<p>Pour savoir quoi corriger en premier, souvent oui. Pour une déclaration au format RGAA avec un taux, non : il ne couvre qu’une partie des critères et ne remplace pas la vérification humaine. Notre rapport le dit en première page et ne donne aucun taux.</p>`],
  ['Un audit est-il obligatoire pour une boutique en ligne ?', `<p>L’${a(S.d41257, 'article D. 412-57')} du code de la consommation n’impose pas d’audit par un tiers. Il impose un service conforme aux exigences et des informations qui expliquent comment il l’est. Pour les organismes de l’article 47, la DINUM précise que l’audit peut être une auto-évaluation ou être confié à un tiers (${a(S.rgaaEval, 'évaluation de la conformité')}).</p>`],
  ['Combien de temps un audit reste-t-il valable ?', `<p>Pour la déclaration RGAA, jusqu’à une modification substantielle ou une refonte du site, et au plus trois ans ; elle doit aussi être mise à jour dans les 18 mois qui suivent la publication d’une nouvelle version du référentiel (${a(S.rgaaDecl, 'DINUM')}). Le RGAA 5 est annoncé pour fin 2026.</p>`],
  ['Pourquoi aucun prix de marché pour l’audit complet ?', `<p>Parce que nous n’avons pas de relevé de prix vérifiable à vous donner, et qu’un chiffre sans source vous induirait en erreur. Demandez deux ou trois devis sur le même échantillon de pages : c’est la seule comparaison qui tienne.</p>`],
];

function c4Body() {
  const sample = SAMPLE.fr;
  return `${crumbsNav('fr', C4.crumb)}
<section class="hero guide-hero" data-section="hero">
<p class="eyebrow">Trois niveaux, ce que chacun prouve</p>
<h1>${C4.h1}</h1>
<p class="lead">Il existe trois niveaux d’audit. Les outils gratuits coûtent 0 € et vous laissent faire l’analyse. Notre audit automatisé teste ${MAX_PAGES} pages pour ${PRICE_NET}, rapport sous 24 h ouvrées, pour les entreprises immatriculées en France. Un audit RGAA complet se fait sur devis : un auditeur vérifie à la main les 106 critères du RGAA sur un échantillon de pages, ce qui représente plusieurs jours de travail. Seul ce dernier donne un taux de conformité.</p>
<p class="byline">${T_FR.byline(CHECKED.fr)}</p>
</section>

<section class="lp-section" data-section="comparatif" aria-labelledby="cmp-title">
<h2 id="cmp-title">Les trois niveaux côte à côte</h2>
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="cmp-title">
<table class="cmp"><thead><tr><th scope="col"><span class="sr-only">Critère</span></th><th scope="col">Outils gratuits</th><th scope="col">Audit automatisé A11y Kit</th><th scope="col">Audit RGAA complet</th></tr></thead><tbody>
<tr><th scope="row">Prix</th><td>0 €</td><td>${PRICE_NET} (${VAT_NOTE})</td><td>Sur devis</td></tr>
<tr><th scope="row">Qui fait le travail</th><td>Vous</td><td>Notre robot (moteur axe-core), sans relecture humaine</td><td>Un auditeur, interne ou externe</td></tr>
<tr><th scope="row">Ce qui est testé</th><td>La page ouverte, ou l’extrait de code collé</td><td>Jusqu’à ${MAX_PAGES} pages publiques, sur ordinateur (1 280 px) et sur mobile (390 px)</td><td>Les critères applicables parmi les 106 du RGAA 4.1.2, sur un échantillon représentatif</td></tr>
<tr><th scope="row">Délai</th><td>Immédiat</td><td>Rapport PDF sous 24 h ouvrées</td><td>Plusieurs jours de travail, plus le délai de l’auditeur</td></tr>
<tr><th scope="row">Taux de conformité RGAA</th><td>Non</td><td>Non</td><td>Oui</td></tr>
<tr><th scope="row">Permet d’écrire « partiellement » ou « totalement conforme »</th><td>Non</td><td>Non</td><td>Oui, selon le taux obtenu</td></tr>
<tr><th scope="row">Sert surtout à</th><td>Repérer des erreurs sur une page</td><td>Savoir quoi corriger d’abord sur le site</td><td>Publier une déclaration RGAA avec un taux</td></tr>
</tbody></table></div>
</section>

<section class="lp-section" data-section="gratuit" aria-labelledby="free-title">
<h2 id="free-title">Les outils gratuits : ce qu’ils trouvent, et où ils s’arrêtent</h2>
<div class="prose">
<p>Un outil vérifie les règles qu’on peut tester sans jugement humain. Il sait qu’une image n’a pas d’alternative textuelle (critère RGAA 1.1) ; il ne sait pas si l’alternative « IMG_2041 » décrit le produit (critère 1.3). Aucun ne fournit de taux RGAA.</p>
<ul class="src-list">
<li>${a(S.lighthouse, 'Lighthouse')} (Google) : outil open source intégré aux outils de développement de Chrome. Sa catégorie « Accessibility » note la page ouverte.</li>
<li>${a(S.wave, 'WAVE')} (WebAIM) : on saisit l’adresse d’une page, ou on passe par l’extension pour Chrome, Firefox et Edge. Il signale des erreurs et aide la vérification humaine.</li>
<li>${a(S.ara, 'Ara')} (DINUM) : outil de l’État pour conduire soi-même un audit RGAA, partiel (25 ou 50 critères) ou complet (106 critères), puis générer le rapport et la déclaration. Il n’analyse pas le site automatiquement et demande de bien connaître la méthode RGAA.</li>
<li>Notre ${a(url(ROUTES.check.fr), 'mini-test')} : vous collez le code HTML d’une page, axe-core 4.13 l’analyse dans votre navigateur et rien n’est envoyé. La même page propose une grille de 20 vérifications manuelles.</li>
</ul>
</div>
</section>

<section class="lp-section" data-section="audit-automatise" aria-labelledby="auto-title">
<h2 id="auto-title">L’audit automatisé à ${PRICE_NET}</h2>
<div class="prose">
<p>C’est notre offre. Le moteur du mini-test passe sur jusqu’à ${MAX_PAGES} pages de votre site : celles que vous indiquez, ou celles trouvées en suivant les liens depuis l’adresse du site, sur le même domaine et dans le respect de son fichier robots.txt. Chaque page est testée sur ordinateur et sur mobile. Le rapport PDF classe les problèmes par gravité, donne pour chaque élément en cause son sélecteur, un extrait de code et la correspondance RGAA indicative, puis liste les 20 vérifications manuelles qu’un robot ne peut pas faire.</p>
<p>Ses limites sont écrites dans les CGV : pas de relecture humaine, pas de pages derrière une connexion ni de paiement réel, aucun taux de conformité, aucune attestation. Il est réservé aux entreprises immatriculées en France (numéro SIREN demandé à la commande). Rapport non livré dans les 5 jours ouvrés suivant le paiement : vous pouvez demander l’annulation et le remboursement intégral (CGV, art. 7).</p>
<p>${a(url(sample.html), 'Exemple de rapport')} produit par la vraie chaîne d’audit sur une page de boutique fictive, volontairement défectueuse (1 page, 2 tailles d’écran, 7 types de problèmes), aussi ${a(url(sample.pdf), 'en PDF', ' type="application/pdf"')}.</p>
</div>
<div class="cta-row">
<a class="btn btn-lg" href="${AUDIT}">Voir l’audit à 149 € et commander</a>
</div>
</section>

<section class="lp-section" data-section="audit-complet" aria-labelledby="full-title">
<h2 id="full-title">L’audit RGAA complet : pourquoi il est sur devis</h2>
<div class="prose">
<p>La méthode officielle explique le temps passé. L’échantillon comprend au minimum l’accueil, le contact, les mentions légales, la page « Accessibilité », le plan du site, l’aide et l’authentification quand elles existent ; au moins une page par type de service ; toutes les pages d’un processus, donc pour une boutique le panier, la livraison et le paiement ; des pages d’aspect différent ; et des pages tirées au hasard pour au moins 10 % de l’échantillon (${a(S.rgaaEval, 'DINUM')}). Chaque page est vérifiée sur les critères applicables, dont certains demandent des tests avec un lecteur d’écran. Le taux se calcule ensuite critère par critère : un critère invalidé sur une seule page compte comme non validé.</p>
<p>Selon notre lecture de cette méthode, cela représente plusieurs jours de travail d’un auditeur pour un site marchand. Le devis dépend surtout du nombre de pages de l’échantillon, de la longueur des parcours (compte client, tunnel de commande) et des documents téléchargeables à tester. Nous ne publions pas de fourchette de prix, faute de source vérifiable. Jalonel ne réalise pas d’audit complet.</p>
<h3>Ce qu’il faut demander dans un devis</h3>
<ul>
<li>La liste des pages de l’échantillon, parcours d’achat inclus.</li>
<li>Le référentiel et sa version : RGAA 4.1.2 aujourd’hui, le ${a(S.rgaa5, 'RGAA 5')} étant annoncé par la DINUM pour fin 2026.</li>
<li>L’environnement de test : navigateurs et lecteurs d’écran utilisés.</li>
<li>Les livrables : rapport, grille des critères, taux, projet de déclaration.</li>
<li>Un contre-audit après corrections, inclus ou chiffré à part.</li>
</ul>
</div>
</section>

<section class="lp-section" data-section="choisir" aria-labelledby="choose-title">
<h2 id="choose-title">Quel niveau selon votre situation</h2>
<ul class="next-list">
<li><h3>Microentreprise qui vend en ligne</h3><p>Moins de 10 personnes, et chiffre d’affaires annuel ou total du bilan d’au plus 2 M€ : vos services sont dispensés des exigences d’accessibilité (${a(S.l41213, 'code de la consommation, art. L. 412-13')}). Les outils gratuits suffisent pour améliorer le site.</p></li>
<li><h3>Boutique soumise à l’Acte européen, sans audit</h3><p>Commencez par l’audit automatisé ou les outils gratuits, corrigez le parcours d’achat, puis publiez les informations d’accessibilité. Ce document n’exige pas de taux RGAA (${a(url(ROUTES.boutique.fr), 'obligations d’une boutique en ligne')}).</p></li>
<li><h3>Organisme public, ou entreprise de plus de 250 M€ de chiffre d’affaires en France</h3><p>Pour afficher autre chose que « non conforme » dans la déclaration RGAA, il faut un audit des critères : un audit complet, interne ou externe (${a(url(ROUTES.modele.fr), 'modèle de déclaration commenté')}).</p></li>
<li><h3>Agence web</h3><p>Avec l’accord du client, l’audit automatisé donne un état des lieux du site avant un devis de refonte ou de corrections.</p></li>
</ul>
</section>

${faqBlock('fr', C4_FAQ)}

${sourcesBlock('fr', [
    [S.rgaaEval, 'DINUM, « Évaluation de la conformité » (échantillon, environnement de test, calcul du taux)'],
    [S.rgaaCrit, 'DINUM, RGAA 4.1.2, « Critères et tests » (106 critères ; critères 1.1 et 1.3)'],
    [S.rgaaDecl, 'DINUM, « Déclaration d’accessibilité » (statuts et validité)'],
    [S.rgaa5, 'DINUM, annonce du RGAA 5'],
    [S.ara, 'Ara, outil d’audit RGAA de la DINUM'],
    [S.wave, 'WebAIM, WAVE'],
    [S.lighthouse, 'Google, présentation de Lighthouse'],
    [S.l41213, 'Code de la consommation, article L. 412-13'],
    [S.d41257, 'Code de la consommation, article D. 412-57'],
  ])}`;
}

// ------------------------------------------------------------------------------------------------
// C3. Accessibilité : ce qu’une boutique en ligne doit faire (FR)
// ------------------------------------------------------------------------------------------------

const C3 = {
  path: ROUTES.boutique.fr,
  title: 'Accessibilité d’une boutique en ligne : obligations 2026',
  description: 'Ce qu’une boutique en ligne doit publier et corriger (Acte européen, code de la consommation, art. 47), exemption des microentreprises, délais, sanctions.',
  h1: 'Accessibilité : ce qu’une boutique en ligne doit faire',
  crumb: 'Obligations d’une boutique en ligne',
};
const C3_FAQ = [
  ['Je vends aussi aux professionnels : suis-je concerné ?', `<p>Oui pour la partie du service ouverte aux particuliers. Selon notre lecture de la directive (art. 3, point 30), un site réservé aux professionnels, sur lequel un consommateur ne peut pas commander, n’entre pas dans la définition du commerce électronique.</p>`],
  ['Ma plateforme (Shopify, PrestaShop, WooCommerce) me met-elle en conformité ?', `<p>Pas d’elle-même. Le prestataire du service, c’est vous : l’exigence porte sur le site tel qu’il est publié, avec votre thème, vos contenus, vos applications et votre page de paiement (${a(S.d41257, 'art. D. 412-57, 1°')}). Un thème accessible aide, il ne suffit pas à le prouver.</p>`],
  ['Un widget d’accessibilité suffit-il ?', `<p>Selon nous, non. Les exigences portent sur le service lui-même : pages, formulaires, paiement. Un module ajouté par-dessus ne corrige pas une étiquette absente dans le code du formulaire de commande.</p>`],
  ['Une microentreprise doit-elle publier quelque chose ?', `<p>Non pour ses services : la dispense couvre les exigences d’accessibilité « et toutes les obligations qui y sont liées » (${a(S.l41213, 'art. L. 412-13, I')}). Publier volontairement une page « Accessibilité » reste utile à vos clients.</p>`],
];

function c3Body() {
  return `${crumbsNav('fr', C3.crumb)}
<section class="hero guide-hero" data-section="hero">
<p class="eyebrow">Acte européen sur l’accessibilité et droit français</p>
<h1>${C3.h1}</h1>
<p class="lead">Depuis le 28 juin 2025, une boutique qui vend en ligne à des particuliers doit rendre son site accessible et publier des informations qui expliquent comment, dans ses CGV ou un document équivalent (code de la consommation, art. L. 412-13 et D. 412-57). Les microentreprises qui fournissent des services en sont dispensées : moins de 10 personnes, et un chiffre d’affaires annuel ou un total du bilan d’au plus 2 millions d’euros. Ne pas établir ou ne pas publier ces informations est puni de l’amende des contraventions de 5e classe, soit 1 500 € au plus pour une personne physique et 7 500 € pour une société. Au-delà de 250 millions d’euros de chiffre d’affaires moyen en France, l’article 47 de la loi de 2005 s’ajoute.</p>
<p class="byline">${T_FR.byline(CHECKED.fr)}</p>
</section>

<section class="lp-section" data-section="concerne" aria-labelledby="who-title">
<h2 id="who-title">Êtes-vous concerné ? Quatre questions</h2>
<ol class="decision prose">
<li><h3>Vendez-vous à des particuliers, sur un site ou une application ?</h3><p>Non : les règles du commerce électronique ne vous visent pas. Elles portent sur les services fournis « à la demande individuelle d’un consommateur en vue de conclure un contrat avec un consommateur » (${a(S.dirFr, 'directive (UE) 2019/882')}, art. 3, point 30). Oui : passez à la question 2.</p></li>
<li><h3>Êtes-vous une microentreprise ?</h3><p>Moins de 10 personnes, et chiffre d’affaires annuel ou total du bilan d’au plus 2 M€ : vous êtes dispensé des exigences d’accessibilité pour vos services et de toutes les obligations liées (${a(S.l41213, 'art. L. 412-13, I')}). Le ${a(S.d2026_883, 'décret n° 2026-883 du 23 septembre 2026')} a inscrit cette définition à l’article D. 412-50-1, par renvoi à la directive. Sinon, les obligations décrites plus bas s’appliquent.</p></li>
<li><h3>Votre chiffre d’affaires moyen en France dépasse-t-il 250 M€ ?</h3><p>La moyenne se calcule sur les trois derniers exercices clos (${a(S.d2019, 'décret n° 2019-768, art. 2')}). Si oui, l’${a(S.art47, 'article 47 de la loi n° 2005-102')} ajoute la déclaration d’accessibilité au format RGAA, un schéma pluriannuel et une mention en page d’accueil.</p></li>
<li><h3>Vendez-vous des produits de la liste ?</h3><p>Ordinateurs et systèmes d’exploitation grand public, terminaux de paiement, équipements terminaux grand public pour les communications électroniques ou l’accès aux médias audiovisuels, liseuses numériques (${a(S.section, 'art. D. 412-49')}). Pour ces produits, vous êtes distributeur, avec les obligations de l’article D. 412-54. L’exemption des microentreprises ne vaut que pour les services.</p></li>
</ol>
<p class="prose">Le questionnaire du ${a(url(ROUTES.home.fr), 'générateur gratuit')} pose ces questions et affiche une indication à partir de vos réponses.</p>
</section>

<section class="lp-section" data-section="exigences" aria-labelledby="req-title">
<h2 id="req-title">Ce que le site doit respecter</h2>
<div class="prose">
<p>Les exigences sont fixées par l’${a(S.arrete2023, 'arrêté du 9 octobre 2023')}. Pour les services de commerce électronique, son article 9 (5°) demande :</p>
<ul>
<li>a) de fournir les informations relatives à l’accessibilité des produits et services mis en vente, lorsque l’opérateur économique responsable les fournit ;</li>
<li>b) de rendre perceptibles, utilisables, compréhensibles et robustes les fonctions d’identification, de sécurité et de paiement fournies dans le cadre du service ;</li>
<li>c) de fournir des méthodes d’identification, des signatures électroniques et des services de paiement qui le soient aussi.</li>
</ul>
<p>Ces quatre adjectifs sont les principes des WCAG. Aucune norme harmonisée n’est encore publiée pour la directive 2019/882 : sur la ${a(S.hs, 'liste de la Commission européenne')} consultée le ${CHECKED.fr}, la rubrique « Accessibility » ne contient que celle des sites du secteur public (directive 2016/2102). Il n’y a donc pas de présomption de conformité. Pour tester, la norme EN 301 549 V3.2.1, qui reprend les WCAG 2.1 niveau AA, et le RGAA 4.1.2 servent de référence.</p>
<h3>Les contenus qui ne sont pas soumis</h3>
<p>L’${a(S.section, 'article D. 412-50, III')} exclut cinq catégories de contenus des sites et applications :</p>
<ul>
<li>les médias temporels préenregistrés (vidéos, sons) publiés avant le 28 juin 2025 ;</li>
<li>les fichiers bureautiques publiés avant le 28 juin 2025 ;</li>
<li>les cartes et services de cartographie en ligne, si les informations essentielles des cartes de navigation sont fournies sous une forme numérique accessible ;</li>
<li>les contenus de tiers ni financés, ni développés, ni contrôlés par vous, comme des avis clients non modérés ;</li>
<li>les archives, c’est-à-dire les contenus qui ne sont ni actualisés ni modifiés après le 28 juin 2025.</li>
</ul>
<p>Une fiche produit, un panier ou une page de paiement ne relèvent d’aucune de ces catégories.</p>
</div>
</section>

<section class="lp-section" data-section="publier" aria-labelledby="pub-title">
<h2 id="pub-title">Ce qu’il faut publier, et où</h2>
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="pub-title">
<table><thead><tr><th scope="col">Document</th><th scope="col">Qui</th><th scope="col">Où</th><th scope="col">Contenu</th></tr></thead><tbody>
<tr><th scope="row">Informations sur l’accessibilité du service</th><td>Toute boutique qui vend à des particuliers, sauf microentreprise</td><td>CGV ou document équivalent ; forme écrite et orale, accessible ; conservées tant que le service est proposé</td><td>Description générale, fonctionnement, manière dont les exigences sont remplies, suivi de la conformité (${a(S.d41257, 'annexe de l’art. D. 412-57')})</td></tr>
<tr><th scope="row">Déclaration d’accessibilité (format RGAA)</th><td>Entreprises de plus de 250 M€ et secteur public</td><td>Page « Accessibilité » accessible depuis toutes les pages</td><td>Modèle obligatoire de la DINUM : état de conformité, contenus non accessibles, contact, recours</td></tr>
<tr><th scope="row">Schéma pluriannuel et plan d’action de l’année</th><td>Mêmes organismes</td><td>Page « Accessibilité », ou lien depuis celle-ci</td><td>Durée de trois ans au plus, décliné en plans annuels (${a(S.art47, 'art. 47, III')})</td></tr>
<tr><th scope="row">Mention « Accessibilité : … conforme »</th><td>Mêmes organismes</td><td>Page d’accueil</td><td>Totalement, partiellement ou non conforme</td></tr>
</tbody></table></div>
<p class="prose">Les informations du code de la consommation ne demandent ni état de conformité ni pourcentage. Notre générateur produit les deux documents ; le format RGAA est commenté, avec un exemple rempli, sur la page ${a(url(ROUTES.modele.fr), 'Modèle de déclaration d’accessibilité')}.</p>
</section>

<section class="lp-section" data-section="autres-obligations" aria-labelledby="duty-title">
<h2 id="duty-title">Les autres obligations du prestataire</h2>
<div class="prose">
<p>L’${a(S.d41257, 'article D. 412-57')} ajoute des procédures pour que le service reste conforme quand il évolue (3°). En cas de non-conformité, il faut prendre les mesures correctives et en informer immédiatement les autorités de contrôle des États où le service est fourni (4°). Sur demande motivée de ces autorités, vous leur communiquez les informations qui démontrent la conformité et coopérez avec elles (5°).</p>
<h3>La charge disproportionnée</h3>
<p>Une exigence peut être écartée si elle impose une charge disproportionnée ou une modification fondamentale du service (${a(S.l41213, 'art. L. 412-13, II')}). Il faut alors une évaluation fondée sur les critères de l’annexe de l’article D. 412-60 : coûts nets de la mise en conformité rapportés aux coûts totaux et au chiffre d’affaires, avantage estimé pour les personnes handicapées. Les éléments sont conservés cinq ans. Une entreprise qui reçoit un financement extérieur pour améliorer l’accessibilité d’un service ne peut pas invoquer la charge disproportionnée pour ce service.</p>
<h3>Si vous vendez des produits : leur sécurité</h3>
<p>Cette règle ne relève pas de l’accessibilité, mais elle touche les mêmes fiches produit. Depuis le 13 décembre 2024, le règlement (UE) 2023/988 sur la sécurité générale des produits (GPSR) impose d’indiquer dans chaque offre en ligne le nom et les coordonnées du fabricant, de quoi identifier le produit et ses avertissements de sécurité (art. 19). Pour rédiger ces mentions : ${a('https://gpsr.jalonel.com/', 'générateur gratuit de fiche produit GPSR')}.</p>
</div>
</section>

<section class="lp-section" data-section="dates" aria-labelledby="dates-title">
<h2 id="dates-title">Les dates à retenir</h2>
<ul class="next-list">
<li><h3>28 juin 2025</h3><p>Les règles s’appliquent aux services fournis après cette date (${a(S.loi2023, 'loi n° 2023-171, art. 16, VIII, A')}).</p></li>
<li><h3>28 juin 2030</h3><p>Fin de la période transitoire. Les contrats de services conclus avant le 28 juin 2025 peuvent s’appliquer sans modification jusqu’à leur terme, au plus tard à cette date (VIII, C). Les produits utilisés légalement avant le 28 juin 2025 pour fournir le service peuvent l’être jusqu’au 28 juin 2030 (VIII, B). Un site marchand n’est pas un contrat conclu avant 2025 : ses nouvelles ventes relèvent des règles actuelles.</p></li>
<li><h3>25 septembre 2026</h3><p>Entrée en vigueur du décret n° 2026-883, qui définit la microentreprise par renvoi à la directive et oblige les autorités à transmettre certains documents aux consommateurs dans un format accessible.</p></li>
<li><h3>Fin 2026</h3><p>Publication annoncée du ${a(S.rgaa5, 'RGAA 5')} par la DINUM. Pour les organismes de l’article 47, la déclaration sera à mettre à jour dans les 18 mois.</p></li>
</ul>
</section>

<section class="lp-section" data-section="sanctions" aria-labelledby="sanc-title">
<h2 id="sanc-title">Contrôles et sanctions</h2>
<div class="prose">
<p>Les agents de la DGCCRF recherchent et constatent les manquements à l’article L. 412-13. Pour certains secteurs, d’autres autorités sont aussi habilitées : l’Arcep pour les communications électroniques, l’Arcom pour l’accès aux médias audiovisuels, l’ACPR, l’AMF et la Banque de France pour la banque (code de la consommation, art. L. 511-25-1, créé par la ${a(S.loi2023, 'loi n° 2023-171')}).</p>
<p>Pour une boutique, l’${a(S.r4514, 'article R. 451-4, 10°')} punit de l’amende des contraventions de 5e classe le fait de fournir un service qui ne respecte pas les exigences, de ne pas établir, publier ou conserver les informations d’accessibilité, de ne pas informer les autorités d’une non-conformité, ou de ne pas leur communiquer les documents demandés. Le maximum est de 1 500 € pour une personne physique (${a(S.cp13113, 'code pénal, art. 131-13')}) et de 7 500 € pour une personne morale, soit le quintuple (${a(S.cp13141, 'art. 131-41')}). La récidive est réprimée plus lourdement (art. R. 451-4, II).</p>
<p>Pour une entreprise de plus de 250 M€, l’Arcom contrôle la déclaration, le schéma pluriannuel et la mention en page d’accueil. Elle met en demeure et rend la mise en demeure publique ; sans mise en conformité, elle peut prononcer une sanction jusqu’à 25 000 €, puis une nouvelle si le manquement dure six mois de plus (${a(S.art471, 'loi n° 2005-102, art. 47-1')}). Le plafond de 50 000 € du même article vise le défaut d’accessibilité des organismes publics et assimilés. Les anciennes amendes de l’article 8 du décret n° 2019-768 ont été abrogées par le ${a(S.d2026_816, 'décret n° 2026-816 du 24 août 2026')}.</p>
<p>Les montants cités sur certains sites varient. Ceux de cette page sont ceux des textes, liés ci-dessus.</p>
</div>
</section>

<section class="lp-section" data-section="commencer" aria-labelledby="start-title">
<h2 id="start-title">Par où commencer</h2>
<ol class="decision prose">
<li><p>Vérifiez si vous êtes concerné avec les quatre questions ci-dessus, ou avec le questionnaire du ${a(url(ROUTES.home.fr), 'générateur')}.</p></li>
<li><p>Repérez les défauts de vos pages clés, parcours d’achat en premier : accueil, liste et fiche produit, panier, livraison, paiement, compte client. Gratuitement avec la ${a(url(ROUTES.check.fr), 'grille en 20 points et le mini-test')}, ou en faisant analyser ${MAX_PAGES} pages par notre audit automatisé (${PRICE_NET}, ${VAT_NOTE}, entreprises immatriculées en France).</p>
<p><a class="btn" href="${AUDIT}">Faire analyser ${MAX_PAGES} pages – 149 € net</a></p></li>
<li><p>Corrigez d’abord ce qui bloque un achat : un bouton sans nom, un champ sans étiquette, un paiement impossible au clavier.</p></li>
<li><p>Rédigez les informations d’accessibilité avec le générateur, publiez-les dans vos CGV ou sur une page « Accessibilité » liée depuis le pied de page, et mettez-les à jour à chaque évolution du site.</p></li>
<li><p>Si l’article 47 vous concerne, faites réaliser un audit RGAA complet pour la déclaration. Les trois niveaux d’audit et leurs limites sont comparés sur la page ${a(url(ROUTES.prix.fr), 'Prix d’un audit d’accessibilité')}.</p></li>
</ol>
</section>

${faqBlock('fr', C3_FAQ)}

${sourcesBlock('fr', [
    [S.dirFr, 'Directive (UE) 2019/882 (EUR-Lex, français)'],
    [S.loi2023, 'Loi n° 2023-171 du 9 mars 2023, article 16 (dont VIII, dates d’application)'],
    [S.l41213, 'Code de la consommation, article L. 412-13'],
    [S.section, 'Code de la consommation, articles D. 412-49 à D. 412-62'],
    [S.d41257, 'Code de la consommation, article D. 412-57'],
    [S.d2023, 'Décret n° 2023-931 du 9 octobre 2023 (annexes)'],
    [S.arrete2023, 'Arrêté du 9 octobre 2023, article 9'],
    [S.d2026_883, 'Décret n° 2026-883 du 23 septembre 2026'],
    [S.r4514, 'Code de la consommation, article R. 451-4'],
    [S.cp13113, 'Code pénal, article 131-13'],
    [S.cp13141, 'Code pénal, article 131-41'],
    [S.art47, 'Loi n° 2005-102, article 47'],
    [S.art471, 'Loi n° 2005-102, article 47-1'],
    [S.d2019, 'Décret n° 2019-768, article 2'],
    [S.d2026_816, 'Décret n° 2026-816 du 24 août 2026'],
    [S.hs, 'Commission européenne, liste des normes harmonisées'],
    [S.rgaa5, 'DINUM, annonce du RGAA 5'],
  ])}
<p class="prose fine">Les textes sont aussi résumés, avec les versions allemande et européenne, sur la page ${a(url(ROUTES.sources.fr), 'Obligations et sources')}.</p>`;
}

// ------------------------------------------------------------------------------------------------

function page(def, lang, body, faq) {
  const typo = lang === 'fr' ? frTypo : (s) => s;
  return {
    id: `guide-${def.path.replace(/\W+/g, '-').replace(/^-|-$/g, '')}`,
    lang,
    path: def.path,
    title: typo(def.title),
    description: typo(def.description),
    body: typo(body),
    updated: GUIDES_DATE,
    ogType: 'article',
    jsonld: jsonLd({ lang, path: def.path, headline: def.h1, description: def.description, crumb: def.crumb, faq }),
  };
}

/** The four guide pages, ready for PAGES. */
export function guidePages() {
  return [
    page(C1, 'fr', c1Body(), C1_FAQ),
    page(C3, 'fr', c3Body(), C3_FAQ),
    page(C4, 'fr', c4Body(), C4_FAQ),
    page(C2, 'de', c2Body(), C2_FAQ),
  ];
}
