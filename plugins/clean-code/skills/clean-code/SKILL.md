---
name: clean-code
description: Règles Clean Code à appliquer CHAQUE FOIS que tu écris, modifies ou refactorises du code (toutes langues). Utilise ce skill avant d'écrire une fonction, une classe, un module ou un correctif, et pour relire du code existant.
---

# Clean Code — règles à appliquer en écrivant du code

Applique ces règles **pendant** l'écriture, pas après. Elles passent après les conventions
déjà en place dans le projet (style, linter, architecture) : si le projet fait autrement,
suis le projet.

## 1. Nommage
- Noms qui révèlent l'intention : `elapsedDays`, pas `d` ; `isValidEmail()`, pas `check()`.
- Classes = noms (`InvoiceRepository`), fonctions = verbes (`calculateTotal`).
- Booléens préfixés : `is`, `has`, `can`, `should`.
- Pas d'abréviations obscures, pas de mots parasites (`data`, `info`, `manager`, `helper`) sans raison.
- Un seul mot par concept dans tout le code (`fetch` OU `get` OU `retrieve`, pas les trois).
- Pas de nombres/chaînes magiques : constantes nommées (`MAX_RETRIES = 3`).

## 2. Fonctions
- Petites et focalisées : **une seule responsabilité**, idéalement < 20 lignes.
- Un seul niveau d'abstraction par fonction.
- Peu d'arguments (≤ 3). Au-delà, regrouper dans un objet/paramètre nommé.
- Pas d'argument booléen « drapeau » qui change le comportement : faire deux fonctions.
- Pas d'effets de bord cachés ; séparer commande (modifie) et requête (renvoie).
- Retours anticipés (guard clauses) plutôt que `if` imbriqués ; profondeur d'imbrication ≤ 2–3.

## 3. Classes et modules
- Principe de responsabilité unique (SRP) : une seule raison de changer.
- Haute cohésion, faible couplage ; dépendre d'abstractions, injecter les dépendances.
- Encapsuler : exposer le minimum, garder l'état interne privé.
- Composition plutôt qu'héritage, sauf vraie relation « est un ».

## 4. DRY / KISS / YAGNI
- Pas de duplication de logique : extraire dès la 2ᵉ–3ᵉ répétition réelle.
- La solution la plus simple qui marche ; pas d'abstraction spéculative.
- Ne pas coder ce qui n'est pas demandé.

## 5. Commentaires
- Le code doit s'expliquer seul ; renommer/extraire plutôt que commenter.
- Commenter le **pourquoi** (décision, contrainte, contournement), jamais le **quoi**.
- Pas de code commenté laissé en place, pas de commentaires obsolètes.
- Docstrings/JSDoc pour les API publiques.

## 6. Gestion des erreurs
- Exceptions/erreurs typées plutôt que codes de retour magiques.
- Ne jamais avaler une erreur (`catch {}` vide) ; logger ou propager avec contexte.
- Valider les entrées aux frontières (API, fichiers, utilisateur).
- Éviter de renvoyer/passer `null` ; préférer Optional, valeur par défaut, ou erreur explicite.

## 7. Formatage et structure
- Respecter le formateur/linter du projet.
- Code lu de haut en bas : fonctions appelantes au-dessus des appelées.
- Variables déclarées au plus près de leur usage.
- Fichiers courts et cohérents ; regrouper ce qui change ensemble.

## 8. Tests
- Code testable (dépendances injectables, fonctions pures quand possible).
- Quand tu ajoutes une logique non triviale, propose ou écris un test (F.I.R.S.T : rapide,
  indépendant, répétable, auto-validant, écrit à temps).
- Un concept par test, nom de test descriptif.

## Checklist avant de rendre le code
1. Chaque nom dit-il ce qu'il fait / contient ?
2. Chaque fonction fait-elle une seule chose, en peu de lignes ?
3. Y a-t-il de la duplication, des nombres magiques, du code mort ?
4. Les erreurs sont-elles gérées explicitement ?
5. Les commentaires expliquent-ils le pourquoi (et seulement ça) ?
6. Est-ce la solution la plus simple ?

Si une règle est volontairement enfreinte (performance, contrainte du projet), dis-le en une ligne.
