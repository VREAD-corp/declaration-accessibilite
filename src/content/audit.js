import { ISSUES, RELEASE_DL, ROUTES } from './site.js';
import { url } from './layout.js';

export const INTEREST_ISSUE = `${ISSUES}/1`;

export const auditBodies = {
  fr: `<section class="hero">
<p><span class="status-pill">Bientôt – aucune commande possible pour l’instant</span></p>
<h1>Audit automatisé partiel : 149 € net</h1>
<p class="lead">Un rapport clair sur les problèmes d’accessibilité qu’un robot peut détecter sur vos pages clés, avec des brouillons de déclaration et de plan d’action à compléter. Ce service n’est <strong>pas encore ouvert</strong> : nous le décrivons ici tel qu’il serait livré.</p>
<p class="price">149 € net <span class="hint">(TVA non applicable, art. 293 B du CGI) – réservé aux professionnels</span></p>
</section>
<h2>Ce que comprendrait l’audit</h2>
<ul>
<li><strong>Jusqu’à 10 pages publiques</strong> choisies par vous (accueil, liste de produits, fiche produit, panier, étapes de commande avant le paiement, contact, CGV…).</li>
<li><strong>Deux tailles d’écran</strong> : ordinateur (1 280 px) et mobile (390 px).</li>
<li>Analyse par le moteur open source <strong>axe-core</strong> (règles WCAG 2.0, 2.1 et 2.2, niveaux A et AA), dans un navigateur Chromium.</li>
<li>Un <strong>rapport</strong> en français, allemand ou anglais (HTML et Word) : problèmes détectés classés par gravité, critères WCAG et RGAA correspondants, éléments concernés (sélecteur et extrait de code), pages touchées, capture de chaque page, points « à vérifier » que l’outil n’a pas pu trancher.</li>
<li>La <strong>liste des vérifications manuelles</strong> que l’automate ne peut pas faire, à réaliser vous-même ou à confier à un auditeur.</li>
<li>Un <strong>brouillon de déclaration d’accessibilité</strong> (modèle RGAA ou informations BFSG/EAA) et un <strong>brouillon de plan d’action</strong> pré-remplis avec les problèmes trouvés, à relire et valider par vous.</li>
<li>Une <strong>relecture humaine</strong> du rapport avant envoi et <strong>un échange écrit</strong> de questions-réponses sur le rapport.</li>
<li>Délai visé : <strong>5 jours ouvrés</strong> après réception des adresses et de votre autorisation écrite d’analyser le site.</li>
</ul>
<h2>Ce que l’audit ne comprendrait pas</h2>
<ul>
<li><strong>Pas d’audit de conformité complet.</strong> Les tests automatiques ne repèrent qu’une partie des défauts ; un audit RGAA complet porte sur 106 critères vérifiés à la main.</li>
<li><strong>Pas de taux ni d’attestation de conformité</strong>, pas de label, pas de certificat.</li>
<li>Pas de conseil juridique, pas de correction de votre site, pas de « widget » ou surcouche d’accessibilité.</li>
<li>Pas de pages nécessitant une connexion, ni de paiement réel.</li>
</ul>
<h2>Voir un exemple</h2>
<p>Un <a href="${RELEASE_DL}exemple-rapport-audit-automatise-fr.html">exemple de rapport</a> (page de démonstration volontairement défectueuse) est téléchargeable gratuitement.</p>
<h2>Être prévenu de l’ouverture</h2>
<p>Nous ne prenons pas de commande et n’encaissons aucun paiement aujourd’hui. Si ce service vous intéresse, ajoutez une réaction 👍 ou abonnez-vous au <a href="${INTEREST_ISSUE}">ticket public « Liste d’intérêt »</a> sur GitHub (compte GitHub nécessaire, n’y publiez pas d’informations confidentielles).</p>
<p>En attendant, le <a href="${url(ROUTES.home.fr)}">générateur</a>, l’<a href="${url(ROUTES.check.fr)}">auto-contrôle et le mini-test</a> sont gratuits. Projet de conditions de vente : <a href="${url(ROUTES.cgv.fr)}">CGV (projet, non applicable)</a>.</p>`,
  de: `<section class="hero">
<p><span class="status-pill">Bald verfügbar – noch keine Bestellung möglich</span></p>
<h1>Teilautomatisierte Barrierefreiheitsprüfung: 149 € netto</h1>
<p class="lead">Ein verständlicher Bericht über die Barrieren, die ein Prüfautomat auf Ihren wichtigsten Seiten finden kann, mit Entwürfen für Erklärung und Maßnahmenplan. Der Dienst ist <strong>noch nicht geöffnet</strong>: Hier steht, was er enthalten würde.</p>
<p class="price">149 € netto <span class="hint">(keine Umsatzsteuer ausgewiesen gemäß Art. 293 B CGI) – nur für Unternehmen</span></p>
</section>
<h2>Was die Prüfung enthalten würde</h2>
<ul>
<li><strong>Bis zu 10 öffentliche Seiten</strong> Ihrer Wahl (Startseite, Kategorie, Produktseite, Warenkorb, Bestellschritte vor der Zahlung, Kontakt, AGB …).</li>
<li><strong>Zwei Bildschirmgrößen</strong>: Desktop (1.280 px) und Mobil (390 px).</li>
<li>Prüfung mit der Open-Source-Engine <strong>axe-core</strong> (WCAG 2.0, 2.1 und 2.2, Stufen A und AA) in Chromium.</li>
<li>Ein <strong>Bericht</strong> auf Deutsch, Französisch oder Englisch (HTML und Word): gefundene Probleme nach Schweregrad, zugehörige WCAG-Kriterien, betroffene Elemente (Selektor, Codeauszug), betroffene Seiten, Screenshot jeder Seite, „zu prüfende“ Punkte.</li>
<li>Die <strong>Liste der manuellen Prüfungen</strong>, die ein Automat nicht leisten kann.</li>
<li>Ein <strong>Entwurf der Barrierefreiheitsinformationen</strong> (BFSG/EAA) und ein <strong>Entwurf des Maßnahmenplans</strong>, vorausgefüllt mit den Befunden, zur Prüfung durch Sie.</li>
<li><strong>Menschliche Durchsicht</strong> des Berichts vor Versand und <strong>eine schriftliche Rückfragerunde</strong>.</li>
<li>Ziel-Lieferzeit: <strong>5 Werktage</strong> nach Erhalt der Adressen und Ihrer schriftlichen Erlaubnis zur Prüfung.</li>
</ul>
<h2>Was nicht enthalten wäre</h2>
<ul>
<li><strong>Keine vollständige Konformitätsprüfung.</strong> Automatische Tests finden nur einen Teil der Barrieren.</li>
<li><strong>Kein Konformitätsgrad, kein Zertifikat, kein Siegel.</strong></li>
<li>Keine Rechtsberatung, keine Behebung, kein Overlay-Widget.</li>
<li>Keine Seiten hinter einem Login, keine echte Zahlung.</li>
</ul>
<h2>Beispiel ansehen</h2>
<p>Ein <a href="${RELEASE_DL}beispiel-bericht-automatisierte-pruefung-de.html">Beispielbericht</a> (absichtlich fehlerhafte Demo-Seite) steht kostenlos zum Download bereit.</p>
<h2>Benachrichtigt werden</h2>
<p>Wir nehmen derzeit keine Bestellungen an und kassieren nichts. Bei Interesse reagieren Sie mit 👍 oder abonnieren Sie das <a href="${INTEREST_ISSUE}">öffentliche Issue „Interessentenliste“</a> auf GitHub (GitHub-Konto nötig; keine vertraulichen Angaben posten).</p>`,
  en: `<section class="hero">
<p><span class="status-pill">Coming soon – no orders accepted yet</span></p>
<h1>Partial automated accessibility audit: €149 net</h1>
<p class="lead">A clear report on the accessibility issues an automated engine can detect on your key pages, with draft statement and action plan to complete. This service is <strong>not open yet</strong>: this page describes exactly what it would include.</p>
<p class="price">€149 net <span class="hint">(VAT not applicable, art. 293 B of the French tax code) – businesses only</span></p>
</section>
<h2>What the audit would include</h2>
<ul>
<li><strong>Up to 10 public pages</strong> you choose (home, category, product page, cart, checkout steps before payment, contact, terms…).</li>
<li><strong>Two screen sizes</strong>: desktop (1,280 px) and mobile (390 px).</li>
<li>Analysis with the open-source <strong>axe-core</strong> engine (WCAG 2.0, 2.1 and 2.2 rules, levels A and AA) in Chromium.</li>
<li>A <strong>report</strong> in English, French or German (HTML and Word): detected issues by severity, matching WCAG (and RGAA) criteria, affected elements (selector and code excerpt), affected pages, a screenshot of each page, “needs review” items.</li>
<li>The <strong>list of manual checks</strong> automation cannot do.</li>
<li>A <strong>draft accessibility statement</strong> (EAA Annex V information) and a <strong>draft action plan</strong> pre-filled with the findings, for you to review.</li>
<li><strong>Human review</strong> of the report before delivery and <strong>one written Q&amp;A round</strong>.</li>
<li>Target turnaround: <strong>5 working days</strong> after receiving the URLs and your written authorisation to scan.</li>
</ul>
<h2>What it would not include</h2>
<ul>
<li><strong>Not a full conformance audit.</strong> Automated tests only find part of the issues.</li>
<li><strong>No conformance score, certificate or badge.</strong></li>
<li>No legal advice, no fixing of your site, no overlay widget.</li>
<li>No pages behind a login, no real payment.</li>
</ul>
<h2>See an example</h2>
<p>A <a href="${RELEASE_DL}sample-report-automated-audit-en.html">sample report</a> (deliberately flawed demo page) is free to download.</p>
<h2>Get notified</h2>
<p>We take no orders and no payments today. If you are interested, add a 👍 reaction to or subscribe to the <a href="${INTEREST_ISSUE}">public “interest list” issue</a> on GitHub (GitHub account needed; do not post confidential information).</p>`,
};
