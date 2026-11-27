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
- **Fiche pour la personne** (`#/fiche/<sujet>`) : ce qu'ouvre un lien partagé. Écrite pour celle ou celui qui le reçoit, avec « Vérifier : » sur chaque source, ce qui fait débat et un lien pour vérifier son inscription. Le message partagé commence par une question.
- **Image à partager** carrée ou au format story, avec la nuance complète, l'adresse, un QR code, la mention « outil militant pro-gauche » et une référence.
- **D'où vient ce chiffre** : définition et année des données sous chaque chiffre, badge quand la donnée a plus de cinq ans. Le quiz et la frise affichent aussi leurs nuances, et chaque date de la frise a sa source.
- **Entraînement** aux objections en cartes à retourner, **fiche mémo** imprimable, **kit terrain** A5 avec QR code.
- **Compte à rebours** et rappel à ajouter à l'agenda (.ics), page **Quoi de neuf**, installation comme une appli (icônes PNG, bouton discret).
- **À propos, mentions légales, confidentialité** : aucun cookie, aucune mesure d'audience, polices hébergées avec l'application.
- **Période de réserve** (art. L49 du code électoral) : du vendredi minuit au dimanche 20 h avant chaque tour, le partage est désactivé et un bandeau l'explique. Pour tester : `?date=2027-04-17T10:00:00Z`.

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

**Avant toute mise en ligne publique**, compléter `EDITEUR` dans `data.js` : éditeur, directeur de la publication, contact, hébergeur (obligatoires, loi pour la confiance dans l'économie numérique), imprimeur pour le kit papier, et l'adresse publique du site (`site`) pour les QR codes et les liens partagés. Ne pas acheter de publicité pour l'application (art. L52-1 du code électoral).

Après chaque modification des sujets, régénérer les pages d'aperçu par sujet (`s/`), les images Open Graph (`og/`) et les icônes (`icons/`) :

```bash
SITE=https://exemple.fr/ npm run generer
```

C'est un site statique : GitHub Pages (Settings → Pages → « Deploy from a branch »), Netlify ou Vercel fonctionnent tels quels.
