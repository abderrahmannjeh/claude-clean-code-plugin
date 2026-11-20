#!/usr/bin/env node
// Injects Clean Code guidance into Claude's context.
// SessionStart  -> full rule summary once per session.
// PostToolUse   -> short self-review reminder after a code file is written/edited.

const path = require("path");

const CODE_EXTENSIONS = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".vue", ".svelte",
  ".py", ".java", ".kt", ".kts", ".scala", ".go", ".rs", ".rb", ".php",
  ".cs", ".fs", ".c", ".h", ".cpp", ".hpp", ".cc", ".swift", ".m",
  ".dart", ".lua", ".pl", ".r", ".sh", ".ps1", ".sql",
]);

const SESSION_CONTEXT = [
  "[clean-code plugin] Chaque fois que tu écris ou modifies du code, applique les règles Clean Code",
  "(charge le skill `clean-code:clean-code` pour le détail) :",
  "- Noms qui révèlent l'intention, pas de nombres/chaînes magiques.",
  "- Fonctions petites, une seule responsabilité, ≤ 3 arguments, guard clauses plutôt que if imbriqués.",
  "- SRP, faible couplage, DRY, KISS, YAGNI.",
  "- Commentaires pour le pourquoi uniquement ; pas de code mort.",
  "- Erreurs gérées explicitement, jamais de catch vide.",
  "Les conventions existantes du projet priment sur ces règles.",
].join("\n");

const EDIT_REMINDER =
  "[clean-code plugin] Relis le code que tu viens d'écrire avec la checklist Clean Code " +
  "(nommage, fonctions courtes/SRP, duplication, nombres magiques, gestion d'erreurs, commentaires). " +
  "Corrige tout écart avant de continuer, sans réécrire ce que tu n'as pas touché.";

function readStdin() {
  return new Promise((resolve) => {
    let raw = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (raw += chunk));
    process.stdin.on("end", () => resolve(raw));
  });
}

function parseEvent(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function isCodeFile(filePath) {
  if (!filePath) return false;
  return CODE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function contextFor(event) {
  if (event.hook_event_name === "SessionStart") return SESSION_CONTEXT;
  if (event.hook_event_name === "PostToolUse") {
    const filePath = event.tool_input && event.tool_input.file_path;
    return isCodeFile(filePath) ? EDIT_REMINDER : null;
  }
  return null;
}

async function main() {
  const event = parseEvent(await readStdin());
  const additionalContext = contextFor(event);
  if (!additionalContext) return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: event.hook_event_name,
        additionalContext,
      },
    })
  );
}

main();
