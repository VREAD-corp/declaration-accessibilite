// Quick self-check: 20 manual checks anyone can do in about an hour.
// WCAG 2.1 success criteria are given per item; RGAA 4.1 criteria are derived
// from the official RGAA correspondence table (src/data/rgaa-map.js).
// This is NOT an audit and does not measure conformance.

import { WCAG_TO_RGAA } from '../data/rgaa-map.js';

export const CHECKS = [
  {
    id: 'keyboard',
    wcag: ['2.1.1', '2.1.2'],
    fr: ['Tout se fait au clavier', 'Débranchez la souris. Avec Tab, Maj+Tab, Entrée, Espace et les flèches, parcourez le menu, la recherche, une fiche produit, le panier et le paiement. Vous ne devez jamais rester bloqué.'],
    de: ['Alles ist per Tastatur bedienbar', 'Maus weglegen. Mit Tab, Umschalt+Tab, Enter, Leertaste und Pfeiltasten durch Menü, Suche, Produktseite, Warenkorb und Bezahlung gehen. Man darf nirgends hängen bleiben.'],
    en: ['Everything works with a keyboard', 'Put the mouse away. Using Tab, Shift+Tab, Enter, Space and arrow keys, go through the menu, search, a product page, the cart and checkout. You must never get stuck.'],
  },
  {
    id: 'focus',
    wcag: ['2.4.7'],
    fr: ['Le focus est visible', 'En tabulant, vous voyez toujours où vous êtes (contour, soulignement…), y compris sur les boutons et les champs.'],
    de: ['Der Fokus ist sichtbar', 'Beim Tabben sieht man immer, wo man ist (Rahmen, Unterstreichung …), auch bei Buttons und Feldern.'],
    en: ['Focus is visible', 'While tabbing, you can always see where you are (outline, underline…), including on buttons and fields.'],
  },
  {
    id: 'order',
    wcag: ['2.4.3'],
    fr: ['L’ordre de tabulation est logique', 'Le focus suit l’ordre de lecture et ne saute pas au hasard dans la page ; une fenêtre modale garde le focus et le rend à la fermeture.'],
    de: ['Die Tab-Reihenfolge ist logisch', 'Der Fokus folgt der Lesereihenfolge und springt nicht zufällig; ein modaler Dialog hält den Fokus und gibt ihn beim Schließen zurück.'],
    en: ['Tab order makes sense', 'Focus follows the reading order and does not jump around; a modal dialog keeps focus and returns it when closed.'],
  },
  {
    id: 'skip',
    wcag: ['2.4.1'],
    fr: ['Un lien d’évitement existe', 'À la première tabulation, un lien « Aller au contenu » apparaît et fonctionne.'],
    de: ['Es gibt einen Sprunglink', 'Beim ersten Tab erscheint ein Link „Zum Inhalt springen“, und er funktioniert.'],
    en: ['There is a skip link', 'On the first Tab press a “Skip to content” link appears and works.'],
  },
  {
    id: 'alt',
    wcag: ['1.1.1'],
    fr: ['Les images utiles ont une alternative', 'Les photos produits, logos et icônes-boutons ont un texte alternatif pertinent ; les images décoratives ont alt="" (vérifiable avec le mini-test ci-dessous).'],
    de: ['Informative Bilder haben einen Alternativtext', 'Produktfotos, Logos und Icon-Buttons haben einen passenden Alternativtext; dekorative Bilder haben alt="" (mit dem Mini-Test unten prüfbar).'],
    en: ['Meaningful images have a text alternative', 'Product photos, logos and icon buttons have a relevant text alternative; decorative images have alt="" (the mini-check below can help).'],
  },
  {
    id: 'contrast',
    wcag: ['1.4.3', '1.4.11'],
    fr: ['Les contrastes sont suffisants', 'Texte : au moins 4,5:1 (3:1 pour le grand texte). Bordures de champs et icônes utiles : au moins 3:1. Vérifiez les prix, boutons, mentions grises et bandeaux.'],
    de: ['Die Kontraste reichen aus', 'Text: mindestens 4,5:1 (3:1 für großen Text). Feldränder und wichtige Icons: mindestens 3:1. Preise, Buttons, graue Hinweise und Banner prüfen.'],
    en: ['Contrast is sufficient', 'Text: at least 4.5:1 (3:1 for large text). Field borders and meaningful icons: at least 3:1. Check prices, buttons, grey notes and banners.'],
  },
  {
    id: 'color',
    wcag: ['1.4.1'],
    fr: ['La couleur n’est pas le seul indice', 'Les erreurs, les liens dans le texte, les tailles indisponibles ou les étapes ne sont pas signalés uniquement par une couleur.'],
    de: ['Farbe ist nicht das einzige Merkmal', 'Fehler, Links im Fließtext, nicht verfügbare Größen oder Schritte werden nicht nur durch Farbe gekennzeichnet.'],
    en: ['Colour is not the only cue', 'Errors, links in text, unavailable sizes or steps are not shown by colour alone.'],
  },
  {
    id: 'zoom',
    wcag: ['1.4.4', '1.4.10'],
    fr: ['Zoom à 200 % et écran de 320 px', 'Zoomez à 200 %, puis réduisez la fenêtre à 320 px de large : tout reste lisible et utilisable, sans défilement horizontal.'],
    de: ['Zoom auf 200 % und 320 px Breite', 'Auf 200 % zoomen und das Fenster auf 320 px verkleinern: alles bleibt lesbar und bedienbar, ohne horizontales Scrollen.'],
    en: ['Zoom to 200% and 320 px width', 'Zoom to 200%, then shrink the window to 320 px wide: everything stays readable and usable, without horizontal scrolling.'],
  },
  {
    id: 'headings',
    wcag: ['1.3.1', '2.4.6'],
    fr: ['Les titres structurent la page', 'Chaque page a un titre principal (h1) et des sous-titres hiérarchisés qui décrivent les sections.'],
    de: ['Überschriften gliedern die Seite', 'Jede Seite hat eine Hauptüberschrift (h1) und gegliederte Zwischenüberschriften, die die Abschnitte beschreiben.'],
    en: ['Headings structure the page', 'Each page has one main heading (h1) and nested sub-headings that describe the sections.'],
  },
  {
    id: 'title',
    wcag: ['2.4.2'],
    fr: ['Chaque page a un titre unique', 'L’onglet du navigateur affiche un titre qui distingue la page (ex. « Panier – Ma Boutique »).'],
    de: ['Jede Seite hat einen eigenen Titel', 'Der Browser-Tab zeigt einen Titel, der die Seite unterscheidet (z. B. „Warenkorb – Mein Shop“).'],
    en: ['Each page has a unique title', 'The browser tab shows a title that tells pages apart (e.g. “Cart – My Shop”).'],
  },
  {
    id: 'lang',
    wcag: ['3.1.1'],
    fr: ['La langue est déclarée', 'La balise html porte l’attribut lang correct (ex. lang="fr").'],
    de: ['Die Sprache ist angegeben', 'Das html-Element hat das richtige lang-Attribut (z. B. lang="de").'],
    en: ['The language is declared', 'The html element has the correct lang attribute (e.g. lang="en").'],
  },
  {
    id: 'links',
    wcag: ['2.4.4'],
    fr: ['Les liens sont explicites', 'Pas de « cliquez ici » ou « en savoir plus » seuls : l’intitulé ou son contexte dit où mène le lien.'],
    de: ['Links sind aussagekräftig', 'Kein alleinstehendes „hier klicken“ oder „mehr“: Linktext oder Kontext sagen, wohin der Link führt.'],
    en: ['Links are descriptive', 'No bare “click here” or “read more”: the link text or its context says where it goes.'],
  },
  {
    id: 'labels',
    wcag: ['1.3.1', '3.3.2', '4.1.2'],
    fr: ['Chaque champ a une étiquette', 'Les champs (recherche, adresse, carte bancaire, newsletter) ont un libellé visible et lié au champ, pas seulement un texte d’exemple.'],
    de: ['Jedes Feld hat eine Beschriftung', 'Felder (Suche, Adresse, Karte, Newsletter) haben eine sichtbare, verknüpfte Beschriftung, nicht nur einen Platzhaltertext.'],
    en: ['Every field has a label', 'Fields (search, address, card, newsletter) have a visible label tied to the field, not just placeholder text.'],
  },
  {
    id: 'errors',
    wcag: ['3.3.1', '3.3.3'],
    fr: ['Les erreurs sont expliquées', 'Soumettez un formulaire vide : l’erreur est décrite en texte, près du champ, avec une suggestion de correction.'],
    de: ['Fehler werden erklärt', 'Ein leeres Formular absenden: Der Fehler wird als Text am Feld beschrieben, mit einem Korrekturvorschlag.'],
    en: ['Errors are explained', 'Submit an empty form: the error is described in text, near the field, with a suggestion to fix it.'],
  },
  {
    id: 'status',
    wcag: ['4.1.3'],
    fr: ['Les messages de statut sont annoncés', '« Produit ajouté au panier », « 3 résultats » : avec un lecteur d’écran (NVDA, VoiceOver), le message est lu sans déplacer le focus.'],
    de: ['Statusmeldungen werden angesagt', '„In den Warenkorb gelegt“, „3 Treffer“: Mit Screenreader (NVDA, VoiceOver) wird die Meldung vorgelesen, ohne dass der Fokus springt.'],
    en: ['Status messages are announced', '“Added to cart”, “3 results”: with a screen reader (NVDA, VoiceOver) the message is read without moving focus.'],
  },
  {
    id: 'media',
    wcag: ['1.2.2', '1.2.5'],
    fr: ['Les vidéos ont des sous-titres', 'Les vidéos avec paroles ont des sous-titres synchronisés ; les informations visuelles importantes sont décrites.'],
    de: ['Videos haben Untertitel', 'Videos mit Sprache haben synchrone Untertitel; wichtige visuelle Informationen werden beschrieben.'],
    en: ['Videos have captions', 'Videos with speech have synchronised captions; important visual information is described.'],
  },
  {
    id: 'motion',
    wcag: ['2.2.2'],
    fr: ['Les animations peuvent être arrêtées', 'Carrousels et bandeaux défilants ont un bouton pause et ne bougent pas plus de 5 secondes sans contrôle.'],
    de: ['Animationen lassen sich stoppen', 'Karussells und Laufbänder haben einen Pause-Button und bewegen sich nicht länger als 5 Sekunden ohne Steuerung.'],
    en: ['Motion can be paused', 'Carousels and scrolling banners have a pause button and do not move for more than 5 seconds without a control.'],
  },
  {
    id: 'time',
    wcag: ['2.2.1'],
    fr: ['Pas de délai bloquant', 'Si une session ou un panier expire, l’utilisateur est prévenu et peut prolonger le délai.'],
    de: ['Keine blockierenden Zeitlimits', 'Läuft eine Sitzung oder ein Warenkorb ab, wird man gewarnt und kann die Zeit verlängern.'],
    en: ['No blocking time limits', 'If a session or cart expires, the user is warned and can extend the time.'],
  },
  {
    id: 'auth',
    wcag: ['1.1.1', '3.3.2'],
    fr: ['Connexion, CAPTCHA et paiement accessibles', 'Un CAPTCHA a une alternative (audio ou autre) ; la création de compte, la connexion et le paiement (y compris 3-D Secure) se font au clavier et au lecteur d’écran.'],
    de: ['Login, CAPTCHA und Bezahlung barrierefrei', 'Ein CAPTCHA hat eine Alternative (Audio o. Ä.); Registrierung, Login und Bezahlung (inkl. 3-D Secure) funktionieren per Tastatur und Screenreader.'],
    en: ['Login, CAPTCHA and payment are accessible', 'A CAPTCHA has an alternative (audio or other); sign-up, login and payment (including 3-D Secure) work with a keyboard and a screen reader.'],
  },
  {
    id: 'docs',
    wcag: ['1.1.1', '1.3.1'],
    fr: ['Les documents téléchargeables sont accessibles', 'CGV, factures, notices en PDF : texte sélectionnable, titres balisés, ou une version HTML équivalente.'],
    de: ['Downloads sind barrierefrei', 'AGB, Rechnungen, Anleitungen als PDF: markierbarer Text, getaggte Überschriften oder eine gleichwertige HTML-Version.'],
    en: ['Downloadable documents are accessible', 'Terms, invoices, manuals as PDF: selectable text, tagged headings, or an equivalent HTML version.'],
  },
];

export function rgaaFor(wcagList) {
  const out = [];
  for (const sc of wcagList) for (const c of WCAG_TO_RGAA[sc] || []) if (!out.includes(c)) out.push(c);
  return out.sort((a, b) => {
    const [a1, a2] = a.split('.').map(Number);
    const [b1, b2] = b.split('.').map(Number);
    return a1 - b1 || a2 - b2;
  });
}

const HEAD = {
  fr: ['#', 'Vérification', 'Comment tester', 'WCAG 2.1', 'RGAA 4.1', 'Résultat (oui / non / n.a.)'],
  de: ['#', 'Prüfpunkt', 'So testen', 'WCAG 2.1', 'RGAA 4.1', 'Ergebnis (ja / nein / n. a.)'],
  en: ['#', 'Check', 'How to test', 'WCAG 2.1', 'RGAA 4.1', 'Result (yes / no / n/a)'],
};

const TXT = {
  fr: {
    title: 'Auto-contrôle rapide d’accessibilité (20 points)',
    intro: 'Ces 20 vérifications manuelles repèrent des problèmes fréquents sur un site ou une boutique en ligne. Elles ne constituent pas un audit et ne permettent pas de déterminer un état de conformité : un audit complet RGAA comporte 106 critères.',
    src: 'Correspondances RGAA issues du référentiel RGAA 4.1 (DISIC, Licence Ouverte 2.0).',
  },
  de: {
    title: 'Schneller Barrierefreiheits-Selbsttest (20 Punkte)',
    intro: 'Diese 20 manuellen Prüfungen finden häufige Probleme auf einer Website oder in einem Online-Shop. Sie ersetzen keine Prüfung nach WCAG/EN 301 549 und sagen nichts über Konformität aus.',
    src: 'RGAA-Zuordnung aus dem französischen Referenzrahmen RGAA 4.1 (DISIC, Licence Ouverte 2.0).',
  },
  en: {
    title: 'Quick accessibility self-check (20 points)',
    intro: 'These 20 manual checks find common problems on a website or online shop. They are not an audit and do not tell you whether you conform to WCAG or EN 301 549.',
    src: 'RGAA mapping from the French RGAA 4.1 reference (DISIC, Licence Ouverte 2.0).',
  },
};

/** Checklist as a document model (for export). */
export function checklistDoc(lang) {
  const t = TXT[lang];
  return {
    title: t.title,
    lang,
    blocks: [
      { t: 'h1', text: t.title },
      { t: 'p', runs: t.intro },
      {
        t: 'table',
        head: HEAD[lang],
        rows: CHECKS.map((c, i) => [String(i + 1), c[lang][0], c[lang][1], c.wcag.join(', '), rgaaFor(c.wcag).join(', '), '']),
      },
      { t: 'note', runs: t.src },
    ],
  };
}
