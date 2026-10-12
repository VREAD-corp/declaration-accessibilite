# A11y Kit – générateur de déclaration d’accessibilité

**Site : https://outils.vread.fr/declaration-accessibilite/** (FR · [DE](https://outils.vread.fr/declaration-accessibilite/de/) · [EN](https://outils.vread.fr/declaration-accessibilite/en/))

Outil gratuit, entièrement côté navigateur, pour rédiger :

- la **déclaration d’accessibilité** selon le modèle RGAA (France, art. 47 loi n° 2005-102) ;
- les **informations d’accessibilité du service** exigées par l’Acte européen sur l’accessibilité (directive (UE) 2019/882, annexe V) – en allemand selon le § 14 et l’annexe 3 du BFSG ;
- un **schéma pluriannuel / plan d’action** ;
- une **grille d’auto-contrôle en 20 points** (WCAG 2.1, correspondances RGAA 4.1) ;
- un **mini-test automatique** d’un extrait HTML avec axe-core, exécuté dans un cadre isolé sans accès réseau.

Exports Word (.docx), HTML et Markdown. Aucune donnée n’est envoyée : pas de serveur, pas de cookie, pas de mesure d’audience.

Les **modèles vierges** sont publiés dans les [Releases](https://github.com/VREAD-corp/declaration-accessibilite/releases).

> Information uniquement. Ni conseil juridique, ni audit, ni attestation de conformité. Les tests automatiques ne détectent qu’une partie des problèmes d’accessibilité.

## Développement

```sh
npm ci
npm test            # tests unitaires (node:test)
npm run build       # génère dist/
npm run serve       # http://localhost:4173/declaration-accessibilite/
BASE_URL=http://localhost:4173/declaration-accessibilite/ npm run e2e   # Playwright (local)
npm run e2e         # Playwright sur le site en ligne
npm run templates   # génère les modèles de la Release dans release/
```

Le déploiement GitHub Pages se fait par GitHub Actions à chaque push sur `main` (tests puis build).

## Licences

- Code : MIT (voir `LICENSE`).
- [axe-core](https://github.com/dequelabs/axe-core) 4.13.0 : Mozilla Public License 2.0, distribué sans modification dans `dist/assets/vendor/axe/` avec sa licence.
- Correspondances WCAG → RGAA : générées depuis le référentiel officiel [RGAA 4.1](https://github.com/DISIC/RGAA) (DINUM/DISIC), Licence Ouverte 2.0 (`scripts/rgaa-4.1-criteres.json`).

Un produit de READ FRANCE SAS.
