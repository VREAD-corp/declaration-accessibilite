// Mentions légales / Impressum / Legal notice, privacy notices, CGV draft.
// Publisher data from the public French company registry
// (recherche-entreprises.api.gouv.fr, SIREN 988 741 773, read 2026-10-11).
import { SITE, ROUTES, CONTACT } from './site.js';
import { url } from './layout.js';

const PUB = {
  name: 'READ FRANCE',
  form: { fr: 'société par actions simplifiée (SAS)', de: 'Société par actions simplifiée (SAS, vereinfachte Aktiengesellschaft französischen Rechts)', en: 'société par actions simplifiée (SAS, French simplified joint-stock company)' },
  siren: '988 741 773',
  siret: '988 741 773 00010',
  address: '11 rue Rouvet, 75019 Paris, France',
  director: 'Tanguy Warsmann',
};
const HOST = 'GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (GitHub Pages)';

export const legalBodies = {
  fr: `<div class="legal-text">
<h1>Mentions légales</h1>
<h2>Éditeur</h2>
<p>${PUB.name}, ${PUB.form.fr}<br>SIREN ${PUB.siren} – SIRET du siège ${PUB.siret}<br>Siège social : ${PUB.address}<br>Capital social : 1 000 €.</p>
<p>Directeur de la publication : ${PUB.director}, président.</p>
<p>Jalonel est une marque de READ FRANCE SAS.</p>
<h2>Contact</h2>
<p>Par e-mail : <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
<!-- TODO phone -->
<h2>Hébergement</h2>
<p>${HOST}.</p>
<h2>Propriété intellectuelle et licences</h2>
<ul>
<li>Logiciel du site et du générateur : licence MIT.</li>
<li>Correspondances WCAG/RGAA : référentiel RGAA 4.1, DISIC (direction interministérielle du numérique), <a href="https://github.com/DISIC/RGAA">github.com/DISIC/RGAA</a>, Licence Ouverte 2.0.</li>
<li>Moteur de test axe-core 4.13.0 : Deque Systems, Inc., Mozilla Public License 2.0, fourni sans modification (<a href="${url('assets/vendor/axe/LICENSE.txt')}">licence</a>).</li>
<li>Textes législatifs et réglementaires cités : documents publics, liens vers les sources officielles sur la page <a href="${url(ROUTES.sources.fr)}">Sources</a>.</li>
</ul>
<h2>Avertissement</h2>
<p>Les contenus et documents générés sont fournis à titre d’information. Ils ne constituent pas un conseil juridique et n’attestent pas de la conformité d’un site. Vous restez responsable des informations que vous publiez.</p>
</div>`,
  de: `<div class="legal-text">
<h1>Impressum</h1>
<p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).</p>
<h2>Anbieter</h2>
<p>${PUB.name}, ${PUB.form.de}<br>SIREN ${PUB.siren} (französisches Unternehmensregister) – SIRET ${PUB.siret}<br>Sitz: ${PUB.address}<br>Vertreten durch den Präsidenten ${PUB.director}.</p>
<p>Inhaltlich verantwortlich: ${PUB.director}.</p>
<p>Jalonel ist eine Marke der READ FRANCE SAS.</p>
<h2>Kontakt</h2>
<p>E-Mail: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
<!-- TODO phone -->
<h2>Hosting</h2>
<p>${HOST}.</p>
<h2>Lizenzen</h2>
<ul>
<li>Software der Website und des Generators: MIT-Lizenz.</li>
<li>WCAG/RGAA-Zuordnung: RGAA 4.1, DISIC, Licence Ouverte 2.0.</li>
<li>axe-core 4.13.0: Deque Systems, Inc., Mozilla Public License 2.0, unverändert (<a href="${url('assets/vendor/axe/LICENSE.txt')}">Lizenz</a>).</li>
</ul>
<h2>Hinweis</h2>
<p>Die Inhalte und erzeugten Dokumente dienen nur der Information. Sie sind keine Rechtsberatung und bescheinigen keine Konformität.</p>
</div>`,
  en: `<div class="legal-text">
<h1>Legal notice</h1>
<h2>Publisher</h2>
<p>${PUB.name}, ${PUB.form.en}<br>SIREN ${PUB.siren} – SIRET ${PUB.siret}<br>Registered office: ${PUB.address}<br>Publication director: ${PUB.director}, president.</p>
<p>Jalonel is a brand of READ FRANCE SAS.</p>
<h2>Contact</h2>
<p>E-mail: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
<!-- TODO phone -->
<h2>Hosting</h2>
<p>${HOST}.</p>
<h2>Licences</h2>
<ul>
<li>Site and generator software: MIT licence.</li>
<li>WCAG/RGAA mapping: RGAA 4.1, DISIC, Licence Ouverte 2.0.</li>
<li>axe-core 4.13.0: Deque Systems, Inc., Mozilla Public License 2.0, unmodified (<a href="${url('assets/vendor/axe/LICENSE.txt')}">licence</a>).</li>
</ul>
<h2>Disclaimer</h2>
<p>Content and generated documents are for information only. They are not legal advice and do not certify conformity.</p>
</div>`,
};

export const privacyBodies = {
  fr: `<div class="legal-text">
<h1>Confidentialité</h1>
<p><strong>Ce site ne collecte aucune donnée personnelle.</strong></p>
<ul>
<li>Aucun compte, aucun formulaire envoyé, aucun cookie, aucun traceur tiers ; seule une mesure d’audience anonyme est faite (voir ci-dessous). Aucun bandeau cookies n’est donc nécessaire.</li>
<li>Le questionnaire et le mini-test fonctionnent entièrement dans votre navigateur. Vos réponses et le code HTML que vous collez ne sont envoyés à aucun serveur.</li>
<li>Pour vous éviter de tout ressaisir, vos réponses sont enregistrées dans le stockage local de votre navigateur (localStorage), sur votre appareil uniquement. Le bouton « Effacer mes réponses » les supprime.</li>
<li>Le mini-test exécute le code collé dans un cadre isolé qui bloque tout chargement externe (images, feuilles de style, scripts distants).</li>
<li>L’hébergeur GitHub peut enregistrer des données techniques de connexion (adresse IP, par exemple) pour la sécurité du service : voir la <a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité de GitHub</a>.</li>
<li>Les modèles vierges sont téléchargés depuis ce site ; le clic est compté dans la mesure d’audience anonyme décrite ci-dessous, sans aucune information sur vous.</li>
</ul>
<p><strong>Mesure d’audience et de comportement.</strong> Nous mesurons la fréquentation et l’usage de ce site de façon anonyme et agrégée, uniquement pour ses propres statistiques et pour l’améliorer : pages vues, clics vers la page de commande et étapes de la commande, domaine du site d’origine et paramètres de campagne (utm) éventuels, et aussi profondeur de défilement, sections de la page atteintes, temps écoulé avant le premier clic sur un bouton, formulaires commencés ou envoyés et le <em>nom</em> du dernier champ touché (jamais son contenu : rien de ce que vous saisissez n’est lu ni envoyé), questions de la FAQ ouvertes, liens sortants (seulement le nom de domaine), erreurs techniques (une empreinte anonyme du message d’erreur), vitesse d’affichage (indicateurs Core Web Vitals) et clics répétés sur un même élément. Seuls des totaux journaliers sont conservés, dans un tableur de READ FRANCE hébergé par Google.</p>
<ul>
<li>Aucun cookie, aucun identifiant, aucune adresse IP conservée, aucune donnée personnelle, aucun suivi d’un site à l’autre ; rien n’est partagé ni vendu, ni recoupé avec d’autres données.</li>
<li>Tests A/B : certains visiteurs peuvent voir une autre version d’un titre, d’un bouton ou d’un prix. La lettre de la version est gardée dans le stockage de session de l’onglet (sessionStorage, effacé à la fermeture de l’onglet) ou choisie selon la date (sans aucun stockage) ; elle n’est jamais rattachée à une personne. Le prix payé est toujours celui affiché.</li>
<li>Opposition : le réglage « Do Not Track » ou « Global Privacy Control » de votre navigateur arrête toute mesure. Les robots d’indexation et les navigateurs automatisés (reconnus dans votre navigateur, sans que sa signature soit transmise) sont comptés à part ou pas du tout, et une page préchargée n’est comptée que si vous l’ouvrez.</li>
<li>Strictement agrégée, limitée aux statistiques propres à ce site, sans suivi d’un site à l’autre, sans recoupement avec un autre traitement ni transmission à des tiers, cette mesure entre dans l’exemption de consentement prévue pour la mesure d’audience (article 82 de la loi Informatique et Libertés, lignes directrices et recommandation de la CNIL du 17 septembre 2020 sur les cookies et autres traceurs) : aucun bandeau de consentement n’est donc nécessaire.</li>
</ul>
<p class="hint">Mise à jour : 13 octobre 2026.</p>
<p>Pour toute question : <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
</div>`,
  de: `<div class="legal-text">
<h1>Datenschutz</h1>
<p><strong>Diese Website erhebt keine personenbezogenen Daten.</strong></p>
<ul>
<li>Keine Konten, keine übermittelten Formulare, keine Cookies, keine Tracker; nur eine anonyme Reichweitenmessung (siehe unten). Ein Cookie-Banner ist daher nicht nötig.</li>
<li>Fragebogen und Mini-Prüfung laufen vollständig in Ihrem Browser. Ihre Angaben und eingefügter HTML-Code werden an keinen Server gesendet.</li>
<li>Damit Sie nicht alles neu eingeben müssen, werden Ihre Angaben im lokalen Speicher Ihres Browsers (localStorage) nur auf Ihrem Gerät gespeichert. Die Schaltfläche „Angaben löschen“ entfernt sie.</li>
<li>Die Mini-Prüfung führt den eingefügten Code in einem isolierten Rahmen aus, der jedes externe Nachladen blockiert.</li>
<li>Der Hoster GitHub kann technische Verbindungsdaten (z. B. IP-Adresse) zur Sicherheit verarbeiten: siehe <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">GitHub-Datenschutzerklärung</a>.</li>
<li>Die leeren Vorlagen werden von dieser Website heruntergeladen; der Klick wird in der unten beschriebenen anonymen Reichweitenmessung gezählt, ohne Daten über Sie.</li>
</ul>
<p><strong>Reichweiten- und Nutzungsmessung.</strong> Wir messen die Nutzung dieser Website anonym und zusammengefasst, nur für ihre eigene Statistik und um sie zu verbessern: Seitenaufrufe, Klicks zur Bestellseite und Bestellschritte, Domain der verweisenden Website und gegebenenfalls Kampagnenparameter (utm), außerdem Scrolltiefe, erreichte Seitenabschnitte, Zeit bis zum ersten Klick auf eine Schaltfläche, begonnene oder abgeschickte Formulare und den <em>Namen</em> des zuletzt berührten Feldes (nie dessen Inhalt: nichts von Ihren Eingaben wird gelesen oder gesendet), geöffnete FAQ-Fragen, ausgehende Links (nur die Domain), technische Fehler (ein anonymer Fingerabdruck der Fehlermeldung), Ladegeschwindigkeit (Core Web Vitals) und wiederholte Klicks auf dasselbe Element. Aufbewahrt werden nur Tagessummen, in einer Tabelle von READ FRANCE, gehostet bei Google.</p>
<ul>
<li>Keine Cookies, keine Kennung, keine gespeicherte IP-Adresse, keine personenbezogenen Daten, kein websiteübergreifendes Tracking; nichts wird weitergegeben, verkauft oder mit anderen Daten verknüpft.</li>
<li>A/B-Tests: Manche Besucher sehen eine andere Version einer Überschrift, einer Schaltfläche oder eines Preises. Der Buchstabe der Version wird im Sitzungsspeicher des Tabs (sessionStorage, beim Schließen des Tabs gelöscht) gehalten oder nach dem Datum gewählt (ganz ohne Speicherung); er wird nie einer Person zugeordnet. Berechnet wird immer der angezeigte Preis.</li>
<li>Widerspruch: Die Einstellung „Do Not Track“ oder „Global Privacy Control“ Ihres Browsers beendet jede Messung. Suchmaschinen-Crawler und automatisierte Browser (in Ihrem Browser erkannt, ohne dass dessen Kennung übermittelt wird) werden getrennt oder gar nicht gezählt, und eine vorab geladene Seite zählt nur, wenn Sie sie öffnen.</li>
<li>Da sie strikt zusammengefasst, auf die eigene Statistik dieser Website beschränkt, nicht websiteübergreifend, nicht mit anderen Verarbeitungen verknüpft und ohne Weitergabe ist, erfüllt sie die Kriterien der französischen Datenschutzbehörde CNIL für eine Ausnahme von der Einwilligungspflicht bei der Reichweitenmessung (Art. 82 des französischen Datenschutzgesetzes „Informatique et Libertés“, Leitlinien und Empfehlung der CNIL vom 17. September 2020 zu Cookies und anderen Trackern); ein Einwilligungsbanner ist daher nicht nötig.</li>
</ul>
<p class="hint">Stand: 13. Oktober 2026.</p>
</div>`,
  en: `<div class="legal-text">
<h1>Privacy</h1>
<p><strong>This website collects no personal data.</strong></p>
<ul>
<li>No accounts, no submitted forms, no cookies, no third-party trackers; only anonymous audience measurement (see below). No cookie banner is therefore needed.</li>
<li>The questionnaire and the mini-test run entirely in your browser. Your answers and any HTML you paste are not sent to any server.</li>
<li>To save you retyping, your answers are kept in your browser’s local storage (localStorage), on your device only. The “Erase my answers” button deletes them.</li>
<li>The mini-test runs pasted code in an isolated frame that blocks every external load.</li>
<li>The host, GitHub, may process technical connection data (such as IP addresses) for security: see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub privacy statement</a>.</li>
<li>Blank templates are downloaded from this site; the click is counted in the anonymous audience measurement described below, with nothing about you.</li>
</ul>
<p><strong>Audience and behaviour measurement.</strong> We measure visits to and use of this website anonymously and in aggregate, only for its own statistics and to improve it: page views, clicks to the order page and order steps, the referring site’s domain and any campaign (utm) parameters, and also scroll depth, page sections reached, time before the first click on a button, forms started or submitted and the <em>name</em> of the last field touched (never its content: nothing you type is read or sent), FAQ questions opened, outbound links (domain only), technical errors (an anonymous fingerprint of the error message), page speed (Core Web Vitals) and repeated clicks on the same element. Only daily totals are kept, in a READ FRANCE spreadsheet hosted by Google.</p>
<ul>
<li>No cookie, no identifier, no IP address kept, no personal data, no cross-site tracking; nothing is shared, sold or combined with other data.</li>
<li>A/B tests: some visitors may see a different version of a headline, a button or a price. The version letter is kept in the tab’s session storage (sessionStorage, deleted when the tab closes) or chosen by date (no storage at all); it is never linked to a person. The price charged is always the one displayed.</li>
<li>Opting out: your browser’s “Do Not Track” or “Global Privacy Control” setting stops all measurement. Search-engine crawlers and automated browsers (recognised in your browser, without its signature being sent) are counted separately or not at all, and a preloaded page counts only if you open it.</li>
<li>Strictly aggregated, limited to this website’s own statistics, with no cross-site tracking, no combination with other processing and no transfer, it meets the criteria of the French data protection authority (CNIL) for the audience-measurement exemption from consent (article 82 of the French Data Protection Act “Informatique et Libertés”, CNIL guidelines and recommendation of 17 September 2020 on cookies and other trackers), so no consent banner is needed.</li>
</ul>
<p class="hint">Updated 13 October 2026.</p>
</div>`,
};

export const cgvBody = `<div class="legal-text">
<p class="callout"><strong>Projet – non applicable.</strong> Ces conditions générales de vente sont un projet en attente de validation par le président de READ FRANCE SAS. <strong>Aucune vente n’est ouverte</strong> : l’audit automatisé partiel n’est pas encore commercialisé et aucune commande n’est acceptée.</p>
<h1>Conditions générales de vente – projet</h1>
<h2>1. Objet</h2>
<p>Les présentes conditions régissent la prestation « Audit automatisé partiel d’accessibilité » (ci-après « la prestation ») proposée par READ FRANCE SAS, SIREN ${PUB.siren}, ${PUB.address} (ci-après « le prestataire »), telle que décrite sur la page <a href="${url(ROUTES.audit.fr)}">Audit</a>.</p>
<h2>2. Clients</h2>
<p>La prestation est destinée aux professionnels (entreprises, associations, indépendants) agissant pour les besoins de leur activité. Elle n’est pas proposée aux consommateurs.</p>
<h2>3. Contenu de la prestation</h2>
<p>Analyse automatisée, avec le moteur open source axe-core, d’au plus 10 adresses (URL) publiques fournies par le client, sur deux tailles d’écran ; remise d’un rapport et de brouillons de documents décrits sur la page Audit ; relecture humaine du rapport ; un échange écrit de questions-réponses sur le rapport. La prestation ne comprend ni audit de conformité complet, ni taux de conformité, ni attestation, ni conseil juridique, ni correction du site.</p>
<h2>4. Autorisation</h2>
<p>Le client déclare être titulaire du site analysé ou autorisé par son titulaire, et autorise le prestataire à le consulter de façon automatisée pour les besoins de la prestation.</p>
<h2>5. Prix et paiement</h2>
<p>149 € net (TVA non applicable, art. 293 B du CGI), payable à la commande par carte via un prestataire de paiement. Une facture est émise.</p>
<h2>6. Délai</h2>
<p>Délai indicatif de 5 jours ouvrés à compter de la réception du paiement, des adresses à analyser et de l’autorisation. En cas de dépassement de plus de 10 jours ouvrés, le client peut demander l’annulation et le remboursement intégral.</p>
<h2>7. Obligation de moyens et limites</h2>
<p>Les tests automatisés ne détectent qu’une partie des défauts d’accessibilité. Le rapport décrit l’état des pages analysées à la date de l’analyse ; il ne garantit pas la conformité du site à une norme ni l’absence de réclamation ou de sanction. La responsabilité du prestataire est limitée au montant payé pour la prestation.</p>
<h2>8. Données</h2>
<p>Le prestataire traite les adresses analysées et les coordonnées de contact du client pour exécuter la prestation et les conserve pendant la durée nécessaire à la facturation et aux obligations comptables. Le rapport et les captures d’écran sont supprimés 90 jours après la livraison, sauf demande contraire du client.</p>
<h2>9. Droit applicable</h2>
<p>Droit français. À défaut d’accord amiable, compétence des tribunaux de Paris.</p>
</div>`;
