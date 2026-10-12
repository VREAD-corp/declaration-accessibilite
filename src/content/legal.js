// Mentions légales / Impressum / Legal notice, privacy notices, CGV draft.
// Publisher data from the public French company registry
// (recherche-entreprises.api.gouv.fr, SIREN 988 741 773, read 2026-10-11).
import { SITE, ISSUES, ROUTES } from './site.js';
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
<h2>Contact</h2>
<p>En attendant l’ouverture d’une adresse e-mail dédiée, vous pouvez nous écrire via les <a href="${ISSUES}">tickets GitHub du projet</a> (les tickets sont publics : n’y indiquez pas d’informations personnelles ou confidentielles).</p>
<h2>Hébergement</h2>
<p>${HOST}.</p>
<h2>Propriété intellectuelle et licences</h2>
<ul>
<li>Code source du site : licence MIT, <a href="${SITE.repo}">${SITE.repo}</a>.</li>
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
<h2>Kontakt</h2>
<p>Bis eine eigene E-Mail-Adresse eingerichtet ist, erreichen Sie uns über die <a href="${ISSUES}">GitHub-Issues des Projekts</a> (öffentlich – bitte keine persönlichen oder vertraulichen Angaben).</p>
<h2>Hosting</h2>
<p>${HOST}.</p>
<h2>Lizenzen</h2>
<ul>
<li>Quellcode: MIT-Lizenz, <a href="${SITE.repo}">${SITE.repo}</a>.</li>
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
<h2>Contact</h2>
<p>Until a dedicated mailbox exists, please use the <a href="${ISSUES}">project’s GitHub issues</a> (public – do not post personal or confidential information).</p>
<h2>Hosting</h2>
<p>${HOST}.</p>
<h2>Licences</h2>
<ul>
<li>Source code: MIT licence, <a href="${SITE.repo}">${SITE.repo}</a>.</li>
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
<li>Aucun compte, aucun formulaire envoyé, aucun cookie, aucun outil de mesure d’audience ni traceur tiers. Aucun bandeau cookies n’est donc nécessaire.</li>
<li>Le questionnaire et le mini-test fonctionnent entièrement dans votre navigateur. Vos réponses et le code HTML que vous collez ne sont envoyés à aucun serveur.</li>
<li>Pour vous éviter de tout ressaisir, vos réponses sont enregistrées dans le stockage local de votre navigateur (localStorage), sur votre appareil uniquement. Le bouton « Effacer mes réponses » les supprime.</li>
<li>Le mini-test exécute le code collé dans un cadre isolé qui bloque tout chargement externe (images, feuilles de style, scripts distants).</li>
<li>L’hébergeur GitHub peut enregistrer des données techniques de connexion (adresse IP, par exemple) pour la sécurité du service : voir la <a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité de GitHub</a>.</li>
<li>Le téléchargement des modèles se fait depuis GitHub (page « Releases ») ; GitHub compte le nombre de téléchargements, sans nous transmettre d’information sur vous.</li>
</ul>
<p>Pour toute question : <a href="${ISSUES}">tickets GitHub du projet</a>.</p>
</div>`,
  de: `<div class="legal-text">
<h1>Datenschutz</h1>
<p><strong>Diese Website erhebt keine personenbezogenen Daten.</strong></p>
<ul>
<li>Keine Konten, keine übermittelten Formulare, keine Cookies, keine Reichweitenmessung, keine Tracker. Ein Cookie-Banner ist daher nicht nötig.</li>
<li>Fragebogen und Mini-Prüfung laufen vollständig in Ihrem Browser. Ihre Angaben und eingefügter HTML-Code werden an keinen Server gesendet.</li>
<li>Damit Sie nicht alles neu eingeben müssen, werden Ihre Angaben im lokalen Speicher Ihres Browsers (localStorage) nur auf Ihrem Gerät gespeichert. Die Schaltfläche „Angaben löschen“ entfernt sie.</li>
<li>Die Mini-Prüfung führt den eingefügten Code in einem isolierten Rahmen aus, der jedes externe Nachladen blockiert.</li>
<li>Der Hoster GitHub kann technische Verbindungsdaten (z. B. IP-Adresse) zur Sicherheit verarbeiten: siehe <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">GitHub-Datenschutzerklärung</a>.</li>
<li>Vorlagen werden über GitHub (Releases) heruntergeladen; GitHub zählt die Downloads, ohne uns Daten über Sie zu übermitteln.</li>
</ul>
</div>`,
  en: `<div class="legal-text">
<h1>Privacy</h1>
<p><strong>This website collects no personal data.</strong></p>
<ul>
<li>No accounts, no submitted forms, no cookies, no analytics, no third-party trackers. No cookie banner is therefore needed.</li>
<li>The questionnaire and the mini-test run entirely in your browser. Your answers and any HTML you paste are not sent to any server.</li>
<li>To save you retyping, your answers are kept in your browser’s local storage (localStorage), on your device only. The “Erase my answers” button deletes them.</li>
<li>The mini-test runs pasted code in an isolated frame that blocks every external load.</li>
<li>The host, GitHub, may process technical connection data (such as IP addresses) for security: see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub privacy statement</a>.</li>
<li>Templates are downloaded from GitHub Releases; GitHub counts downloads without sending us anything about you.</li>
</ul>
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
