// Sources and scope pages. Facts verified on official sites on 2026-10-11.
const a = (href, text) => `<a href="${href}">${text}</a>`;

const U = {
  dir: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj',
  dirFr: 'https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32019L0882',
  dirDe: 'https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32019L0882',
  dec2018: 'https://eur-lex.europa.eu/eli/dec_impl/2018/1523/oj',
  hs: 'https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards_en',
  loi2023: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047281777',
  l41213: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047284913',
  d2023: 'https://www.legifrance.gouv.fr/eli/decret/2023/10/9/ECOI2310697D/jo/texte',
  d41257: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048180389',
  dSection: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000048180103/',
  r4514: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048180406',
  arrete2023: 'https://www.legifrance.gouv.fr/eli/arrete/2023/10/9/ECOI2311693A/jo/texte',
  d2026_883: 'https://www.legifrance.gouv.fr/eli/decret/2026/9/23/PMEC2614497D/jo/texte',
  art47: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050213',
  art471: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050174',
  d2019: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038811937',
  d2026_816: 'https://www.legifrance.gouv.fr/eli/decret/2026/8/24/PRMJ2432005D/jo/texte',
  rgaaDecl: 'https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/',
  rgaaSchema: 'https://accessibilite.numerique.gouv.fr/obligations/schema-pluriannuel/',
  rgaaMentions: 'https://accessibilite.numerique.gouv.fr/obligations/mentions-et-pages-obligatoires/',
  rgaa5: 'https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/',
  rgaaRepo: 'https://github.com/DISIC/RGAA',
  bfsg: 'https://www.gesetze-im-internet.de/bfsg/BJNR297010021.html',
  bfsg2: 'https://www.gesetze-im-internet.de/bfsg/__2.html',
  bfsg3: 'https://www.gesetze-im-internet.de/bfsg/__3.html',
  bfsg14: 'https://www.gesetze-im-internet.de/bfsg/__14.html',
  bfsg17: 'https://www.gesetze-im-internet.de/bfsg/__17.html',
  bfsg37: 'https://www.gesetze-im-internet.de/bfsg/__37.html',
  bfsg38: 'https://www.gesetze-im-internet.de/bfsg/__38.html',
  anl3: 'https://www.gesetze-im-internet.de/bfsg/anlage_3.html',
  bfsgv: 'https://www.gesetze-im-internet.de/bfsgv/BJNR092800022.html',
  bfsgv19: 'https://www.gesetze-im-internet.de/bfsgv/__19.html',
  faq: 'https://www.bundesfachstelle-barrierefreiheit.de/DE/Barrierefreiheitsstaerkungsgesetz/FAQ-Dienstleistungen/faq-dienstleistungen_node.html',
  mlbf: 'https://www.mlbf-barrierefrei.de/',
  bitv7: 'https://www.gesetze-im-internet.de/bitv_2_0/__7.html',
};

const VERIFIED = { fr: 'Textes consultés le 11 octobre 2026', de: 'Stand der Quellen: 11. Oktober 2026', en: 'Sources checked on 11 October 2026' };

export const sourcesBodies = {
  fr: {
    title: 'Acte européen sur l’accessibilité : obligations et sanctions',
    h1: 'Acte européen sur l’accessibilité : textes officiels et champ d’application',
    description: 'Directive (UE) 2019/882, loi n° 2023-171, article 47 de la loi de 2005, BFSG : qui publie quoi, exemption des microentreprises, sanctions, textes liés.',
    body: `<section class="hero"><h1>Acte européen sur l’accessibilité : textes officiels et champ d’application</h1>
<p class="lead">${VERIFIED.fr}. Résumé informatif : seuls les textes officiels liés font foi. Ce n’est pas un conseil juridique.</p></section>

<h2 id="eaa">Acte européen sur l’accessibilité (directive (UE) 2019/882)</h2>
<ul class="src-list">
<li>La directive s’applique depuis le <strong>28 juin 2025</strong> (art. 31). Les contrats de services conclus avant cette date peuvent continuer sans modification jusqu’à leur terme, au plus tard le 28 juin 2030 (art. 32 ; en France : loi n° 2023-171, art. 16, VIII, C).</li>
<li>Le commerce électronique couvre les « services fournis à distance, au moyen de sites internet et de services sur appareils mobiles, par voie électronique et à la demande individuelle d’un consommateur en vue de conclure un contrat avec un consommateur » (art. 3, point 30). Les ventes uniquement entre professionnels ne sont donc pas visées.</li>
<li>Le prestataire publie des informations qui expliquent comment le service respecte les exigences d’accessibilité, selon l’annexe V, « dans les clauses et conditions générales ou dans un document équivalent » ; ces informations sont mises à disposition du public par écrit et oralement, y compris de façon accessible, et conservées tant que le service est proposé (art. 13, § 2). L’annexe V demande : a) une description générale du service dans des formats accessibles ; b) les descriptions et explications nécessaires pour comprendre le fonctionnement du service ; c) une description de la manière dont le service respecte les exigences de l’annexe I.</li>
<li>Exigences propres au commerce électronique (annexe I, section IV, g) : fournir les informations sur l’accessibilité des produits et services vendus lorsque le fabricant les fournit ; rendre perceptibles, utilisables, compréhensibles et robustes les fonctions d’identification, de sécurité et de paiement.</li>
<li>Un prestataire qui invoque une charge disproportionnée (art. 14 et annexe VI) doit la documenter dans une évaluation conservée cinq ans, renouvelée au moins tous les cinq ans ou quand le service change ; l’information de l’autorité ne s’applique pas aux microentreprises.</li>
<li>À la date de consultation, aucune référence de norme harmonisée au titre de la directive 2019/882 n’est publiée au Journal officiel de l’UE (${a(U.hs, 'liste de la Commission')}) ; il n’y a donc pas encore de présomption de conformité. La norme EN 301 549 V3.2.1 (qui intègre les WCAG 2.1 niveau AA) sert de référence courante.</li>
</ul>
<p>Texte : ${a(U.dirFr, 'directive (UE) 2019/882 (EUR-Lex, français)')}.</p>

<h2 id="micro">Exemption des microentreprises (services)</h2>
<p>Une microentreprise emploie <strong>moins de 10 personnes</strong> <em>et</em> a un chiffre d’affaires annuel <em>ou</em> un total du bilan annuel qui n’excède pas <strong>2 millions d’euros</strong> (directive, art. 3, point 23). Les microentreprises qui fournissent des services sont dispensées des exigences d’accessibilité et des obligations qui y sont liées (art. 4, § 5).</p>
<ul class="src-list">
<li>France : « Les entreprises employant moins de dix personnes qui fournissent des services et dont le chiffre d’affaires annuel n’excède pas deux millions d’euros ou dont le total du bilan n’excède pas deux millions d’euros sont dispensées des exigences d’accessibilité […] et de toutes les obligations qui y sont liées » (${a(U.l41213, 'code de la consommation, art. L. 412-13, I')}). Le ${a(U.d2026_883, 'décret n° 2026-883 du 23 septembre 2026')} renvoie à la définition de l’article 3 de la directive (art. D. 412-50-1).</li>
<li>Allemagne : ${a(U.bfsg2, 'BFSG § 2 Nr. 17')} (définition) et ${a(U.bfsg3, '§ 3 Abs. 3')} (exemption).</li>
<li>L’exemption vise les <strong>services</strong> uniquement, pas les produits.</li>
</ul>
<p>Le générateur applique cette logique : exemption probable si « moins de 10 personnes » <em>et</em> « chiffre d’affaires ou bilan ≤ 2 M€ ».</p>

<h2 id="fr-eaa">Transposition française pour les produits et services</h2>
<ul class="src-list">
<li>${a(U.loi2023, 'Loi n° 2023-171 du 9 mars 2023, article 16')} : crée l’article L. 412-13 du code de la consommation et désigne les autorités de contrôle (art. L. 511-25-1 : agents de la DGCCRF, et autorités sectorielles).</li>
<li>${a(U.d2023, 'Décret n° 2023-931 du 9 octobre 2023')} : articles ${a(U.dSection, 'D. 412-49 à D. 412-62')} du code de la consommation. L’${a(U.d41257, 'article D. 412-57, 2°')} impose d’établir les informations de son annexe (« Informations sur les services conformes aux exigences en matière d’accessibilité »), de les mettre à disposition sous forme écrite et orale et de les conserver.</li>
<li>${a(U.arrete2023, 'Arrêté du 9 octobre 2023')}, article 9, 5° : exigences pour les services de commerce électronique.</li>
<li>Sanction : ne pas établir, publier ou conserver ces informations est puni de l’amende des contraventions de 5e classe (${a(U.r4514, 'art. R. 451-4, 10°, b')}) : 1 500 € au plus pour une personne physique, le quintuple pour une personne morale (code pénal, art. 131-13 et 131-41).</li>
</ul>

<h2 id="fr-47">Article 47 de la loi n° 2005-102 et déclaration RGAA</h2>
<ul class="src-list">
<li>L’article vise aussi les entreprises dont le chiffre d’affaires moyen réalisé en France sur les trois derniers exercices dépasse <strong>250 millions d’euros</strong> (${a(U.d2019, 'décret n° 2019-768, art. 2')}).</li>
<li>Obligations (${a(U.art47, 'art. 47, III et IV')}) : publier une <strong>déclaration d’accessibilité</strong> au ${a(U.rgaaDecl, 'format obligatoire')}, un <strong>schéma pluriannuel</strong> d’au plus trois ans décliné en ${a(U.rgaaSchema, 'plans d’actions annuels')}, et une ${a(U.rgaaMentions, 'mention en page d’accueil')} « Accessibilité : totalement / partiellement / non conforme ».</li>
<li>État de conformité : <em>totalement</em> si tous les critères du RGAA sont respectés ; <em>partiellement</em> si au moins 50 % ; <em>non conforme</em> s’il n’existe aucun résultat d’audit en cours de validité ou si moins de 50 % sont respectés (${a(U.rgaaDecl, 'accessibilite.numerique.gouv.fr')}).</li>
<li>Sanctions : l’Arcom peut prononcer une sanction pouvant atteindre 25 000 € pour les obligations des III et IV et 50 000 € pour l’obligation d’accessibilité (${a(U.art471, 'art. 47-1')}). Les anciennes amendes de l’article 8 du décret n° 2019-768 ont été abrogées par le ${a(U.d2026_816, 'décret n° 2026-816 du 24 août 2026')}.</li>
<li>Référentiel : <strong>RGAA 4.1.2</strong> en vigueur. Le ${a(U.rgaa5, 'RGAA 5')} est annoncé pour fin 2026 ; les déclarations antérieures resteront valables 18 mois (dans la limite de trois ans).</li>
</ul>

<h2 id="de">En Allemagne, le BFSG</h2>
<ul class="src-list">
<li>${a(U.bfsg14, '§ 14 BFSG')} et ${a(U.anl3, 'annexe 3 (Anlage 3)')} : informations dans les CGV « ou de toute autre manière clairement perceptible », avec a) description générale, b) explications sur le fonctionnement, c) manière dont les exigences sont respectées, d) <strong>autorité de surveillance du marché compétente</strong> (${a(U.mlbf, 'MLBF, Magdeburg')}).</li>
<li>Amende jusqu’à 100 000 € (${a(U.bfsg37, '§ 37')}) ; période transitoire jusqu’au 27 juin 2030 (${a(U.bfsg38, '§ 38')}).</li>
<li>Selon la ${a(U.faq, 'Bundesfachstelle Barrierefreiheit')}, ces informations se distinguent de la déclaration des organismes publics et n’ont pas à lister les non-conformités.</li>
</ul>

<h2 id="limits">Limites des tests automatiques</h2>
<p>Les outils automatiques, dont axe-core utilisé ici, ne vérifient qu’une partie des critères. Ni le mini-test ni l’audit automatisé partiel ne permettent d’affirmer qu’un site est conforme. Aucun outil ou « widget » ne rend un site conforme à lui seul.</p>

<h2 id="licences">Réutilisation</h2>
<p>Textes du site accessibilite.numerique.gouv.fr et référentiel ${a(U.rgaaRepo, 'RGAA 4.1')} : Licence Ouverte 2.0 (Etalab). Textes législatifs : documents publics.</p>`,
  },
  de: {
    title: 'BFSG und European Accessibility Act: Pflichten und Quellen',
    h1: 'BFSG und European Accessibility Act: Gesetzestexte und Anwendungsbereich',
    description: 'BFSG § 14 und Anlage 3, BFSGV § 19, Richtlinie (EU) 2019/882: Pflichten für Online-Shops, Ausnahme für Kleinstunternehmen, Bußgeld, amtliche Links.',
    body: `<section class="hero"><h1>BFSG und European Accessibility Act: Gesetzestexte und Anwendungsbereich</h1>
<p class="lead">${VERIFIED.de}. Zusammenfassung nur zur Information; maßgeblich sind die verlinkten amtlichen Texte. Keine Rechtsberatung.</p></section>

<h2 id="bfsg">Barrierefreiheitsstärkungsgesetz (BFSG)</h2>
<ul class="src-list">
<li><strong>Seit 28. Juni 2025</strong> anwendbar (${a(U.bfsg, 'BFSG')}). Verträge über Dienstleistungen, die vor dem 28. Juni 2025 geschlossen wurden, dürfen bis längstens 27. Juni 2030 unverändert fortbestehen (${a(U.bfsg38, '§ 38')}).</li>
<li>Dienstleistungen im elektronischen Geschäftsverkehr sind über Webseiten und Apps elektronisch und auf individuelle Anfrage eines Verbrauchers im Hinblick auf den Abschluss eines Verbrauchervertrags erbrachte Dienste (${a(U.bfsg2, '§ 2 Nr. 26')}). Reine B2B-Angebote sind nicht erfasst.</li>
<li>Die Informationspflicht (${a(U.bfsg14, '§ 14 Abs. 1 Nr. 2')}, ${a(U.anl3, 'Anlage 3')}) verlangt, in den AGB oder auf andere deutlich wahrnehmbare Weise angeben, wie die Dienstleistung die Barrierefreiheitsanforderungen erfüllt, mit a) allgemeiner Beschreibung in barrierefreiem Format, b) Erläuterungen zur Durchführung, c) Beschreibung der Erfüllung der Anforderungen, d) Angabe der zuständigen Marktüberwachungsbehörde. Die Informationen sind aufzubewahren, solange die Dienstleistung angeboten wird (§ 14 Abs. 2).</li>
<li>Für Online-Shops gelten ${a(U.bfsgv19, '§ 19 BFSGV')} (Informationen zur Barrierefreiheit der angebotenen Produkte, barrierefreie Identifizierung, Authentifizierung, Sicherheits- und Zahlungsfunktionen) und § 12 ${a(U.bfsgv, 'BFSGV')} (wahrnehmbar, bedienbar, verständlich, robust).</li>
<li>Wer sich auf eine unverhältnismäßige Belastung beruft (${a(U.bfsg17, '§ 17')} und Anlage 4), muss die Beurteilung dokumentieren, fünf Jahre aufbewahren, mindestens alle fünf Jahre erneuern; die Mitteilung an die Behörde gilt nicht für Kleinstunternehmen.</li>
<li>Das Bußgeld beträgt <strong>bis 100.000 €</strong>, u. a. für das Anbieten einer Dienstleistung entgegen § 14 Abs. 1 (${a(U.bfsg37, '§ 37')}).</li>
<li>Zuständig für die Marktüberwachung ist die ${a(U.mlbf, 'Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR)')}, Carl-Miller-Straße 6, 39112 Magdeburg.</li>
<li>Laut ${a(U.faq, 'FAQ der Bundesfachstelle Barrierefreiheit')} (Stand August 2025) sind die „Informationen nach Anlage 3 BFSG“ von der „Erklärung zur Barrierefreiheit“ nach dem BGG zu unterscheiden; Nichtkonformitäten müssen nicht angegeben werden. Empfohlen wird ein Link „Barrierefreiheit“ im Kopf- oder Fußbereich der Website. Ein amtliches Muster für private Unternehmen gibt es nicht; das Muster nach ${a(U.dec2018, 'Durchführungsbeschluss (EU) 2018/1523')} gilt für öffentliche Stellen (${a(U.bitv7, 'BITV 2.0 § 7')}).</li>
</ul>

<h2 id="klein">Ausnahme für Kleinstunternehmen</h2>
<p>Ein Kleinstunternehmen beschäftigt <strong>weniger als zehn Personen</strong> <em>und</em> erzielt entweder einen Jahresumsatz von <strong>höchstens 2 Mio. €</strong> <em>oder</em> hat eine Jahresbilanzsumme von höchstens 2 Mio. € (${a(U.bfsg2, '§ 2 Nr. 17 BFSG')}). Für Kleinstunternehmen, die Dienstleistungen anbieten oder erbringen, gilt die Pflicht nach § 3 Abs. 1 nicht (${a(U.bfsg3, '§ 3 Abs. 3 BFSG')}; Art. 4 Abs. 5 der ${a(U.dirDe, 'Richtlinie (EU) 2019/882')}). Die Ausnahme gilt nur für Dienstleistungen, nicht für Produkte.</p>

<h2 id="eu">Richtlinie (EU) 2019/882</h2>
<p>Art. 13 Abs. 2 und Anhang V (Informationen über Dienstleistungen), Art. 14 (unverhältnismäßige Belastung), Art. 31 (Anwendung ab 28. Juni 2025). Bis heute ist keine harmonisierte Norm zur Richtlinie 2019/882 im Amtsblatt veröffentlicht (${a(U.hs, 'Liste der Kommission')}); EN 301 549 V3.2.1 dient als gängige Referenz. Text: ${a(U.dirDe, 'EUR-Lex (deutsch)')}.</p>

<h2 id="limits">Grenzen automatischer Tests</h2>
<p>Automatische Werkzeuge wie axe-core prüfen nur einen Teil der Kriterien. Weder die Mini-Prüfung noch die teilautomatisierte Prüfung belegen Konformität. Kein Werkzeug und kein „Overlay“ macht eine Website allein barrierefrei.</p>`,
  },
  en: {
    title: 'European Accessibility Act: scope and official sources',
    h1: 'European Accessibility Act: official texts and scope',
    description: 'Directive (EU) 2019/882 Annex V, the microenterprise exemption, French and German transpositions (Code de la consommation, BFSG), linked to official texts.',
    body: `<section class="hero"><h1>European Accessibility Act: official texts and scope</h1>
<p class="lead">${VERIFIED.en}. Informative summary only: the linked official texts prevail. Not legal advice.</p></section>

<h2 id="eaa">Directive (EU) 2019/882 (European Accessibility Act)</h2>
<ul class="src-list">
<li>The Directive applies from <strong>28 June 2025</strong> (Art. 31). Service contracts agreed before that date may continue unchanged until they expire, but no longer than five years (Art. 32).</li>
<li>E-commerce services are “services provided at a distance, through websites and mobile device-based services by electronic means and at the individual request of a consumer with a view to concluding a consumer contract” (Art. 3(30)). Business-to-business-only sales are not covered.</li>
<li>The information duty (Art. 13(2) and Annex V) requires the provider to explain how the service meets the accessibility requirements, in the general terms and conditions or an equivalent document, made available in written and oral format, including in an accessible way, and kept as long as the service is operated. Annex V lists: (a) a general description of the service in accessible formats; (b) descriptions and explanations needed to understand the operation of the service; (c) how the Annex I requirements are met. Point 3 also asks for information showing that the service delivery process and its monitoring ensure compliance.</li>
<li>E-commerce requirements (Annex I, Section IV(g)) cover accessibility information on products and services sold when provided by the responsible economic operator; identification, security and payment functions that are perceivable, operable, understandable and robust.</li>
<li>A provider claiming a disproportionate burden (Art. 14, Annex VI) needs a documented assessment, kept five years, renewed at least every five years; notifying the authority does not apply to microenterprises.</li>
<li>As of the date above, no harmonised standard under Directive 2019/882 has been published in the Official Journal (${a(U.hs, 'Commission list')}), so there is no presumption of conformity yet. EN 301 549 V3.2.1 (which includes WCAG 2.1 level AA) is the usual reference.</li>
</ul>
<p>Text: ${a(U.dir, 'Directive (EU) 2019/882 on EUR-Lex')}.</p>

<h2 id="micro">Microenterprise exemption (services)</h2>
<p>A microenterprise employs <strong>fewer than 10 persons</strong> <em>and</em> has an annual turnover <em>or</em> an annual balance sheet total not exceeding <strong>€2 million</strong> (Art. 3(23)). “Microenterprises providing services shall be exempt from complying with the accessibility requirements […] and any obligations relating to the compliance with those requirements” (Art. 4(5)). Member States must provide guidelines and tools for microenterprises (Art. 4(6)). The exemption covers services only, not products.</p>
<ul class="src-list">
<li>France: ${a(U.l41213, 'Code de la consommation, art. L. 412-13, I')}.</li>
<li>Germany: ${a(U.bfsg2, 'BFSG § 2 No. 17')} and ${a(U.bfsg3, '§ 3(3)')}.</li>
</ul>

<h2 id="national">National transpositions</h2>
<ul class="src-list">
<li>France transposed it through ${a(U.loi2023, 'law 2023-171, art. 16')} and ${a(U.d2023, 'decree 2023-931')} (Code de la consommation ${a(U.d41257, 'art. D. 412-57')} and its annex); enforcement is by the DGCCRF, with fines of the 5th class of contraventions (${a(U.r4514, 'art. R. 451-4')}). Large companies (average French turnover above €250 million) must also follow ${a(U.art47, 'article 47 of law 2005-102')}: RGAA-format statement, multi-year plan, homepage mention.</li>
<li>In Germany, ${a(U.bfsg14, 'BFSG § 14')} and ${a(U.anl3, 'Annex 3')} also require naming the competent market surveillance authority (${a(U.mlbf, 'MLBF')}); fines reach €100,000 (${a(U.bfsg37, '§ 37')}).</li>
<li>Public sector bodies follow Directive (EU) 2016/2102 and the model statement of ${a(U.dec2018, 'Implementing Decision (EU) 2018/1523')}.</li>
</ul>

<h2 id="limits">Limits of automated testing</h2>
<p>Automated tools such as axe-core only check part of the criteria. Neither the mini-test nor the partial automated audit can show that a site conforms. No tool or overlay makes a website accessible by itself.</p>`,
  },
};
