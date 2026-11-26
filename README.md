# Gaucho · Parlons de ce qui compte

Une web app en français, pensée d'abord pour le mobile, qui aide à **convaincre un proche de voter à gauche par une conversation honnête** : partir de ses préoccupations, apporter des chiffres vérifiés, répondre aux objections sans mépris.

## Ce que fait l'application

- **Profils** : 4 portes d'entrée selon la personne (ne vote plus, tentée par le RN, plutôt au centre, jeune non votant). Rien n'est enregistré sur elle.
- **Sujets** : la personne choisit jusqu'à 3 préoccupations (pouvoir d'achat, justice fiscale, santé, logement, climat, retraites, sécurité, école, travail). L'app génère un argumentaire sur mesure : une question pour ouvrir la discussion, deux chiffres clés animés, le constat, les propositions de la gauche et **la nuance à connaître**. Partage en un geste avec un lien qui ouvre directement le bon sujet, ou en image (chiffre, source et nuance).
- **Mode « À table »** : une fiche plein écran par sujet pour le moment de la discussion (question, chiffre, nuance), l'écran reste allumé.
- **Aller voter** : dates de la présidentielle 2027, liens officiels pour vérifier son inscription, s'inscrire ou faire une procuration, et un plan de vote en 3 questions.
- **Objections** : 10 objections courantes (impôts, dette, exil fiscal, « tous pareils », SMIC, immigration, RN, fraude sociale, héritage, dépenses publiques), avec d'abord ce qu'elles ont de vrai, puis une réponse sourcée. Recherche instantanée.
- **Dialogue** : 5 étapes de conversation inspirées de la recherche (Kalla et Broockman, Pons), avec ses limites, ce qu'il faut éviter, et une carte pour finir avec respect si la personne ne votera pas à gauche.
- **Hors ligne** : la version hébergée fonctionne sans réseau (service worker).
- **Quiz vrai ou faux** sur les idées reçues, partageable.
- **Ce que la gauche a changé** : frise de 1936 à aujourd'hui.
- **Sources et méthode** : la liste complète des sources.

Design : thème sombre et clair, fond animé en dégradé, cartes en verre dépoli, transitions de page (View Transitions API), compteurs animés, barre de navigation flottante sur mobile. Respecte `prefers-reduced-motion`.

## Charte d'honnêteté

1. Aucun chiffre sans source : `npm test` échoue si un contenu n'a pas de source valide.
2. Chaque sujet inclut l'objection la plus solide (« la nuance à connaître »).
3. Les sources engagées (fondation, ONG, programme politique) sont présentées comme telles.
4. Les propositions de référence sont celles du programme du Nouveau Front populaire (2024), commun aux partis de gauche ; elles sont à mettre à jour quand les programmes 2027 seront publiés.

Chiffres vérifiés le 26 novembre 2026. Toutes les données sont dans [`data.js`](data.js).

## Lancer en local

Aucune dépendance ni étape de build :

```bash
npm start          # ou : python3 -m http.server 8080
# puis ouvrir http://localhost:8080
npm test           # vérifie que chaque contenu a une source
```

## Mettre en ligne

C'est un site statique : GitHub Pages (Settings → Pages → « Deploy from a branch »), Netlify ou Vercel fonctionnent tels quels.
