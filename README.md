# A11y Kit – générateur de déclaration d’accessibilité

**Site : https://accessibilite.jalonel.com/** (FR · [DE](https://accessibilite.jalonel.com/de/) · [EN](https://accessibilite.jalonel.com/en/))

2026-10-16: moved to https://accessibilite.jalonel.com/ (brand Jalonel, a brand of READ FRANCE SAS). L’ancienne adresse https://outils.vread.fr/declaration-accessibilite/ redirige (301) vers la nouvelle. Domaine personnalisé GitHub Pages `accessibilite.jalonel.com` (build par workflow ; le build écrit aussi `dist/CNAME` et la clé IndexNow ; `SITE_ORIGIN`/`SITE_BASE` par défaut : `https://accessibilite.jalonel.com` et `/`).

Outil gratuit, entièrement côté navigateur, pour rédiger :

- la **déclaration d’accessibilité** selon le modèle RGAA (France, art. 47 loi n° 2005-102) ;
- les **informations d’accessibilité du service** exigées par l’Acte européen sur l’accessibilité (directive (UE) 2019/882, annexe V) – en allemand selon le § 14 et l’annexe 3 du BFSG ;
- un **schéma pluriannuel / plan d’action** ;
- une **grille d’auto-contrôle en 20 points** (WCAG 2.1, correspondances RGAA 4.1) ;
- un **mini-test automatique** d’un extrait HTML avec axe-core, exécuté dans un cadre isolé sans accès réseau.

Exports Word (.docx), HTML et Markdown. Rien de ce que vous saisissez n’est envoyé : pas de serveur pour le générateur ni le mini-test, pas de cookie. Une mesure d’audience anonyme (`mesure.js`, sans cookie ni donnée personnelle) compte les pages vues et quelques clics.

Les **modèles vierges** (`scripts/templates.mjs`) sont servis par le site lui-même sous `/telechargements/` (écrits dans `dist/telechargements/` par `npm run build` ; `npm run templates` les écrit aussi dans `release/`).

> Information uniquement. Ni conseil juridique, ni audit, ni attestation de conformité. Les tests automatiques ne détectent qu’une partie des problèmes d’accessibilité.

## Développement

```sh
npm ci
npm test            # tests unitaires (node:test)
npm run build       # génère dist/
npm run serve       # http://localhost:4173/
BASE_URL=http://localhost:4173/ npm run e2e   # Playwright (local)
npm run e2e         # Playwright sur le site en ligne
npm run templates   # génère les modèles de la Release dans release/
```

Le déploiement GitHub Pages se fait par GitHub Actions à chaque push sur `main` (tests puis build).

## Licences

- Code : MIT (voir `LICENSE`).
- [axe-core](https://github.com/dequelabs/axe-core) 4.13.0 : Mozilla Public License 2.0, distribué sans modification dans `dist/assets/vendor/axe/` avec sa licence.
- Correspondances WCAG → RGAA : générées depuis le référentiel officiel [RGAA 4.1](https://github.com/DISIC/RGAA) (DINUM/DISIC), Licence Ouverte 2.0 (`scripts/rgaa-4.1-criteres.json`).

Une marque Jalonel (https://jalonel.com/). Jalonel est une marque de READ FRANCE SAS.
