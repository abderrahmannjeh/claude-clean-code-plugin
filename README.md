# Plugin Claude Code : clean-code

Fait appliquer à Claude les règles Clean Code automatiquement à chaque écriture de code.

## Ce que fait le plugin
| Élément | Rôle |
|---|---|
| Hook `SessionStart` | Injecte un résumé des règles au début de chaque session. |
| Hook `PostToolUse` (Write/Edit/MultiEdit) | Après chaque fichier de code modifié, demande à Claude de se relire avec la checklist. |
| Skill `clean-code` | Les règles complètes (nommage, fonctions, SRP, DRY, erreurs, commentaires, tests). |
| Commande `/clean-code:clean-review [fichier]` | Revue Clean Code du diff courant ou d'un fichier. |

Prérequis : Node.js dans le PATH (utilisé par le hook).

## Installation
Dans Claude Code :
```
/plugin marketplace add abderrahmannjeh/claude-clean-code-plugin
/plugin install clean-code@clean-code-marketplace
```
Redémarrez la session pour activer les hooks.

## Personnaliser
- Règles : `plugins/clean-code/skills/clean-code/SKILL.md`
- Textes injectés et extensions de fichiers surveillées : `plugins/clean-code/hooks/inject-rules.js`
