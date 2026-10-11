// Legal references used inside generated documents and the applicability
// verdict. Verified against official sources on 2026-10-11 (see /sources/).

export const URLS = {
  dir: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj',
  dirFr: 'https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32019L0882',
  dirDe: 'https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32019L0882',
  l41213: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047284913',
  d41257: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048180389',
  loi2005art47: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050213',
  loi2005art471: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050174',
  rgaaDecl: 'https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/',
  ddd: 'https://www.defenseurdesdroits.fr/nous-contacter-355',
  dddDelegues: 'https://www.defenseurdesdroits.fr/carte-des-delegues',
  bfsg14: 'https://www.gesetze-im-internet.de/bfsg/__14.html',
  bfsgAnl3: 'https://www.gesetze-im-internet.de/bfsg/anlage_3.html',
  bfsg3: 'https://www.gesetze-im-internet.de/bfsg/__3.html',
  bfsg2: 'https://www.gesetze-im-internet.de/bfsg/__2.html',
  mlbf: 'https://www.mlbf-barrierefrei.de/',
};

const L = (text, href) => ({ text, href });

export const LEGAL = {
  fr: {
    eaaBasis: 'l’article D. 412-57 du code de la consommation et à son annexe (transposition de l’annexe V de la directive (UE) 2019/882, dite « Acte européen sur l’accessibilité »)',
    standardHint: 'RGAA 4.1.2, WCAG 2.1 niveau AA ou EN 301 549 V3.2.1',
    planBasis: 'Pour les entreprises soumises à l’article 47 de la loi n° 2005-102, ce schéma est obligatoire, d’une durée maximale de trois ans, et décliné en plans d’actions annuels.',
    recoursIntro: [
      'Cette procédure est à utiliser dans le cas suivant.',
      'Vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.',
    ],
    recoursItems: [
      [L('Écrire un message au Défenseur des droits', URLS.ddd)],
      [L('Contacter le délégué du Défenseur des droits près de chez vous', URLS.dddDelegues)],
      ['Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07'],
    ],
  },
  de: {
    basis: '§ 14 und Anlage 3 des Barrierefreiheitsstärkungsgesetzes (BFSG), zur Umsetzung von Anhang V der Richtlinie (EU) 2019/882',
    standardHint: 'EN 301 549 V3.2.1 bzw. WCAG 2.1 Stufe AA',
  },
  en: {
    basis: 'Article 13 and Annex V of Directive (EU) 2019/882 (European Accessibility Act) and the national law transposing it',
    standardHint: 'EN 301 549 V3.2.1 or WCAG 2.1 level AA',
  },
  authority: {
    FR: {
      fr: ['Le respect des exigences d’accessibilité des services de commerce électronique est contrôlé par la Direction générale de la concurrence, de la consommation et de la répression des fraudes (DGCCRF), conformément à l’article L. 511-25-1 du code de la consommation.'],
      de: ['In Frankreich ist die Generaldirektion für Wettbewerb, Verbraucherschutz und Betrugsbekämpfung (DGCCRF) zuständig (Art. L. 511-25-1 Code de la consommation).'],
      en: ['In France, compliance of e-commerce services is checked by the Directorate-General for Competition, Consumer Affairs and Fraud Control (DGCCRF), under article L. 511-25-1 of the Consumer Code.'],
    },
    DE: {
      fr: [['En Allemagne, l’autorité de surveillance du marché compétente est la Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR), Carl-Miller-Straße 6, 39112 Magdeburg, ', L('www.mlbf-barrierefrei.de', URLS.mlbf), '.']],
      de: [['Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR), Carl-Miller-Straße 6, 39112 Magdeburg, E-Mail: ', L('kontakt@mlbf-barrierefrei.de', 'mailto:kontakt@mlbf-barrierefrei.de'), ', Website: ', L('www.mlbf-barrierefrei.de', URLS.mlbf)]],
      en: [['In Germany, the competent market surveillance authority is the Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR), Carl-Miller-Straße 6, 39112 Magdeburg, ', L('www.mlbf-barrierefrei.de', URLS.mlbf), '.']],
    },
    EU: {
      fr: ['[Nom et coordonnées de l’autorité de surveillance du marché compétente dans votre État membre.]'],
      de: ['[Name und Kontaktdaten der zuständigen Marktüberwachungsbehörde Ihres Mitgliedstaats.]'],
      en: ['[Name and contact details of the competent market surveillance authority in your Member State.]'],
    },
  },
  verdicts: {
    fr: {
      title: 'Résultat indicatif',
      disclaimer: 'Indication générale fondée sur vos réponses, pas un avis juridique. Vérifiez les textes cités sur la page Sources.',
      microExempt: [
        'Selon vos réponses, vous seriez une microentreprise (moins de 10 personnes et chiffre d’affaires annuel ou total du bilan d’au plus 2 M€). Les microentreprises qui fournissent des services sont dispensées des exigences d’accessibilité des services et des obligations qui y sont liées (directive 2019/882, art. 4, § 5 ; code de la consommation, art. L. 412-13, I).',
        'Publier volontairement des informations d’accessibilité reste utile pour vos clients. L’exemption ne vaut que pour les services, pas pour les produits.',
      ],
      applies: [
        'Selon vos réponses, votre service en ligne aux consommateurs entre dans le champ de l’Acte européen sur l’accessibilité (services fournis après le 28 juin 2025). Vous devez notamment publier les informations prévues à l’annexe V, dans vos conditions générales ou un document équivalent, sous une forme accessible (code de la consommation, art. D. 412-57).',
        'Le document « Informations d’accessibilité du service » de ce générateur suit cette structure.',
      ],
      checkSize: ['Indiquez votre effectif et votre chiffre d’affaires ou total du bilan pour savoir si l’exemption des microentreprises peut s’appliquer.'],
      notService: [
        'Si vous ne fournissez pas de service en ligne à des consommateurs (par exemple vente uniquement entre professionnels), les règles de l’Acte européen sur le commerce électronique ne s’appliquent en principe pas : elles visent les services fournis « en vue de conclure un contrat avec un consommateur » (directive 2019/882, art. 3, point 30).',
      ],
      checkService: [
        'Le commerce électronique au sens de la directive couvre la vente en ligne de tout produit ou service à des consommateurs, via un site ou une application. D’autres services sont visés : banque de détail, livres numériques, transport de voyageurs, communications électroniques, services donnant accès à des services de médias audiovisuels.',
      ],
      public: ['Les organismes publics relèvent principalement de la directive (UE) 2016/2102 et, en France, de l’article 47 de la loi n° 2005-102 (déclaration selon le modèle RGAA et schéma pluriannuel).'],
      frPublic: ['Utilisez le document « Déclaration d’accessibilité (modèle RGAA) » et le « Schéma pluriannuel ».'],
      frArt47: [
        'Avec un chiffre d’affaires moyen en France supérieur à 250 M€ (décret n° 2019-768, art. 2), l’article 47 de la loi n° 2005-102 vous impose aussi une déclaration d’accessibilité selon le format RGAA, un schéma pluriannuel d’au plus trois ans, et la mention « Accessibilité : totalement / partiellement / non conforme » en page d’accueil. L’Arcom peut prononcer une sanction jusqu’à 25 000 € pour ces obligations (art. 47-1).',
      ],
    },
    de: {
      title: 'Unverbindliche Einschätzung',
      disclaimer: 'Allgemeine Einschätzung auf Grundlage Ihrer Angaben, keine Rechtsberatung. Prüfen Sie die genannten Vorschriften auf der Seite Quellen.',
      microExempt: [
        'Nach Ihren Angaben wären Sie ein Kleinstunternehmen (weniger als 10 Beschäftigte und Jahresumsatz oder Jahresbilanzsumme höchstens 2 Mio. €). Für Kleinstunternehmen, die Dienstleistungen anbieten oder erbringen, gelten die Barrierefreiheitsanforderungen nicht (§ 3 Abs. 3 BFSG, § 2 Nr. 17 BFSG; Art. 4 Abs. 5 Richtlinie 2019/882).',
        'Freiwillige Informationen zur Barrierefreiheit sind trotzdem hilfreich. Die Ausnahme gilt nur für Dienstleistungen, nicht für Produkte.',
      ],
      applies: [
        'Nach Ihren Angaben fällt Ihre Online-Dienstleistung für Verbraucher unter das BFSG (seit 28. Juni 2025). Sie müssen die Informationen nach Anlage 3 in Ihren AGB oder auf andere deutlich wahrnehmbare Weise barrierefrei zugänglich machen (§ 14 Abs. 1 Nr. 2 BFSG), einschließlich der zuständigen Marktüberwachungsbehörde.',
        'Ein Verstoß kann mit einer Geldbuße bis zu 100.000 € geahndet werden (§ 37 BFSG).',
      ],
      checkSize: ['Geben Sie Beschäftigtenzahl und Umsatz oder Bilanzsumme an, um zu sehen, ob die Ausnahme für Kleinstunternehmen greifen kann.'],
      notService: [
        'Wenn Sie keine Online-Dienstleistung für Verbraucher erbringen (z. B. reiner B2B-Shop), gelten die BFSG-Regeln für den elektronischen Geschäftsverkehr grundsätzlich nicht: Sie betreffen Dienste „im Hinblick auf den Abschluss eines Verbrauchervertrags“ (§ 2 Nr. 26 BFSG).',
      ],
      checkService: [
        'Dienstleistungen im elektronischen Geschäftsverkehr umfassen den Online-Verkauf von Produkten und Dienstleistungen an Verbraucher über Websites und Apps. Weitere erfasste Dienste: Bankdienstleistungen für Verbraucher, E-Books, Personenbeförderung, Telekommunikation.',
      ],
      public: ['Öffentliche Stellen des Bundes fallen unter die BITV 2.0 und das BGG (Erklärung zur Barrierefreiheit nach dem Muster des Durchführungsbeschlusses (EU) 2018/1523), Landesstellen unter das jeweilige Landesrecht.'],
      dePublic: ['Dieser Generator ist auf private Anbieter nach dem BFSG ausgerichtet.'],
      frPublic: [],
      frArt47: [],
    },
    en: {
      title: 'Indicative result',
      disclaimer: 'General indication based on your answers, not legal advice. Check the cited texts on the Sources page.',
      microExempt: [
        'Based on your answers, you would be a microenterprise (fewer than 10 persons and annual turnover or balance sheet total of €2 million or less). Microenterprises providing services are exempt from the service accessibility requirements and related obligations (Directive 2019/882, Art. 4(5); definition in Art. 3(23)).',
        'Publishing accessibility information voluntarily is still useful to customers. The exemption only covers services, not products.',
      ],
      applies: [
        'Based on your answers, your online service to consumers is covered by the European Accessibility Act (services provided after 28 June 2025). You must make the Annex V information available in your general terms and conditions or an equivalent document, in an accessible form, in written and oral format (Art. 13(2)).',
        'The “Accessibility statement” document of this generator follows that structure.',
      ],
      checkSize: ['Enter your staff and turnover or balance sheet total to see whether the microenterprise exemption may apply.'],
      notService: [
        'If you do not provide an online service to consumers (e.g. business-to-business sales only), the EAA e-commerce rules generally do not apply: they cover services provided “with a view to concluding a consumer contract” (Directive 2019/882, Art. 3(30)).',
      ],
      checkService: [
        'E-commerce in the directive covers the online sale of any product or service to consumers through websites and apps. Other covered services: consumer banking, e-books, passenger transport, electronic communications, audiovisual media services access.',
      ],
      public: ['Public sector bodies are mainly covered by Directive (EU) 2016/2102 and its national transpositions (model statement in Implementing Decision (EU) 2018/1523).'],
      frPublic: ['In France, use the French version of this tool for the RGAA statement and multi-year plan.'],
      frArt47: ['In France, companies with average French turnover above €250 million must also publish an RGAA-format statement and a multi-year plan (law 2005-102, art. 47; decree 2019-768, art. 2). Use the French version of this tool.'],
      dePublic: [],
    },
  },
};
