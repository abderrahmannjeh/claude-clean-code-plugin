---
description: Relit le code (diff courant ou fichier donné) selon les règles Clean Code et propose les corrections
argument-hint: "[fichier ou dossier]"
---

Charge le skill `clean-code:clean-code`, puis relis selon ses règles :
- si `$ARGUMENTS` est fourni : ce fichier ou dossier ;
- sinon : les changements non commités (`git diff` et `git diff --staged`).

Pour chaque problème, donne : `fichier:ligne`, la règle enfreinte, et la correction proposée.
Classe-les du plus important au moins important. Ne modifie rien sans mon accord.
