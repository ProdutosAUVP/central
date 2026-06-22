/**
 * Snippet mirror verifier
 * ------------------------------------------------------------
 * Para cada widget em src/components/widgets/*.tsx:
 *  1. Extrai os "labels de preview" (strings pt-BR vis\u00edveis na JSX do componente)
 *  2. Extrai o corpo das abas React e HTML/CSS/JS dos CodeBlocks
 *  3. Garante que cada label aparece em ambas as abas
 *
 * Para cada arquivo em src/components/widgets/html-snippets/*.html:
 *  1. Localiza o widget que o importa em DesignSystem.tsx
 *  2. Garante que os labels do widget aparecem no HTML standalone
 *
 * Falha quando >=3 labels significativos faltam num snippet.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const WIDGETS_DIR = path.join(ROOT, "components/widgets");
const SNIPPETS_DIR = path.join(WIDGETS_DIR, "html-snippets");
const DS_PATH = path.join(ROOT, "pages/DesignSystem.tsx");

const FAIL_THRESHOLD = 3; // labels faltando para falhar
const SKIP_MARKER = "snippet-mirror-skip";

// Ignora termos genéricos / técnicos que não são labels de UI
const IGNORE = new Set([
  "React", "HTML", "CSS", "JS", "TypeScript", "TSX", "JSX",
  "TODO", "FIXME", "Lorem", "Ipsum", "Lovable", "Tailwind",
  "true", "false", "null", "undefined",
]);

function readWidgetFiles(): string[] {
  return fs.readdirSync(WIDGETS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => path.join(WIDGETS_DIR, f));
}

/** Extrai conteúdo de uma template-literal `code: \`...\`` para um label específico */
function extractTabCode(source: string, tabLabel: string): string | null {
  // Procura `label: "<tabLabel>"` e em seguida `code: \`...\``
  const labelRe = new RegExp(
    `label\\s*:\\s*["']${tabLabel.replace(/[/]/g, "\\/")}["'][\\s\\S]{0,300}?code\\s*:\\s*\``,
    "g"
  );
  const m = labelRe.exec(source);
  if (!m) return null;
  const start = m.index + m[0].length;
  // Encontra o fechamento da template-literal: backtick não escapado seguido de `,` `\n` ou `}`
  let i = start;
  while (i < source.length) {
    const ch = source[i];
    if (ch === "\\") { i += 2; continue; }
    if (ch === "`") return source.slice(start, i);
    i++;
  }
  return null;
}

/** Remove todas as template-literals de CodeBlock (code: `...`) para evitar self-match */
function stripCodeBlocks(source: string): string {
  return source.replace(/code\s*:\s*`[\s\S]*?(?<!\\)`/g, "code: ``");
}

/** Extrai labels visíveis no preview (textos pt-BR em JSX e atributos de UI) */
function extractPreviewLabels(source: string): Set<string> {
  const cleaned = stripCodeBlocks(source);
  const labels = new Set<string>();

  // 1) Texto JSX entre tags: >Algum Texto<
  const jsxText = /[>}]\s*([A-ZÀ-Úa-zà-ú][^<>{}\n]{3,60}?)\s*[<{]/g;
  let m: RegExpExecArray | null;
  while ((m = jsxText.exec(cleaned))) {
    const t = m[1].trim();
    if (isLabelLike(t)) labels.add(t);
  }

  // 2) Atributos de UI: placeholder, title, aria-label, alt
  const attrRe = /(?:placeholder|title|aria-label|alt|label)\s*=\s*["']([A-ZÀ-Ú][^"']{3,60})["']/g;
  while ((m = attrRe.exec(cleaned))) {
    if (isLabelLike(m[1])) labels.add(m[1].trim());
  }

  return labels;
}

function isLabelLike(s: string): boolean {
  if (!s || s.length < 4 || s.length > 50) return false;
  if (!/[A-Za-zÀ-ú]/.test(s)) return false;
  if (/^[a-z][a-z0-9-]*$/.test(s)) return false;        // class-like
  if (/[{}<>$]/.test(s)) return false;                  // template/JSX leftover
  if (/^https?:|^\/|^#/i.test(s)) return false;         // URLs / paths
  if (/^[A-Z][A-Za-z]+\.[A-Za-z]/.test(s)) return false; // Module.Member
  if (IGNORE.has(s.split(/\s+/)[0])) return false;
  // Pelo menos uma letra maiúscula inicial OU contém espaço (texto natural)
  return /^[A-ZÀ-Ú]/.test(s) || /\s/.test(s);
}

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function findMissing(labels: Set<string>, haystack: string): string[] {
  const hay = normalize(haystack);
  const missing: string[] = [];
  for (const label of labels) {
    if (!hay.includes(normalize(label))) missing.push(label);
  }
  return missing;
}

describe("Snippet mirror — CodeBlock tabs", () => {
  const widgetFiles = readWidgetFiles();

  for (const file of widgetFiles) {
    const name = path.basename(file, ".tsx");
    const source = fs.readFileSync(file, "utf8");

    if (source.includes(SKIP_MARKER)) continue;
    if (!source.includes("CodeBlock")) continue;

    const reactCode = extractTabCode(source, "React");
    const htmlCode = extractTabCode(source, "HTML / CSS / JS")
      ?? extractTabCode(source, "HTML/CSS/JS")
      ?? extractTabCode(source, "HTML");

    if (!reactCode && !htmlCode) continue;

    const labels = extractPreviewLabels(source);
    if (labels.size === 0) continue;

    if (reactCode) {
      it(`${name} → aba React contém labels do preview`, () => {
        const missing = findMissing(labels, reactCode);
        if (missing.length >= FAIL_THRESHOLD) {
          throw new Error(
            `${missing.length} labels ausentes na aba React de ${name}:\n  - ${missing.slice(0, 10).join("\n  - ")}`
          );
        }
        expect(missing.length).toBeLessThan(FAIL_THRESHOLD);
      });
    }

    if (htmlCode) {
      it(`${name} → aba HTML contém labels do preview`, () => {
        const missing = findMissing(labels, htmlCode);
        if (missing.length >= FAIL_THRESHOLD) {
          throw new Error(
            `${missing.length} labels ausentes na aba HTML de ${name}:\n  - ${missing.slice(0, 10).join("\n  - ")}`
          );
        }
        expect(missing.length).toBeLessThan(FAIL_THRESHOLD);
      });
    }
  }
});

describe("Snippet mirror — html-snippets/*.html", () => {
  if (!fs.existsSync(SNIPPETS_DIR)) return;
  const dsSource = fs.existsSync(DS_PATH) ? fs.readFileSync(DS_PATH, "utf8") : "";

  // Mapeia cada html-snippet ao widget que o importa
  const importRe = /import\s+\w+\s+from\s+["']@\/components\/widgets\/([A-Za-z]+)["']\s*;[\s\S]*?import\s+\w+\s+from\s+["']@\/components\/widgets\/html-snippets\/([a-z-]+\.html)\?raw["']/g;
  const map = new Map<string, string>();
  let m: RegExpExecArray | null;
  while ((m = importRe.exec(dsSource))) {
    map.set(m[2], m[1]);
  }

  // Fallback heurístico por nome
  for (const file of fs.readdirSync(SNIPPETS_DIR)) {
    if (!file.endsWith(".html")) continue;
    if (map.has(file)) continue;
    const guess = file
      .replace(/\.html$/, "")
      .split("-")
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join("");
    const widgetPath = path.join(WIDGETS_DIR, `${guess}.tsx`);
    if (fs.existsSync(widgetPath)) map.set(file, guess);
  }

  for (const file of fs.readdirSync(SNIPPETS_DIR)) {
    if (!file.endsWith(".html")) continue;
    const widgetName = map.get(file);
    const htmlContent = fs.readFileSync(path.join(SNIPPETS_DIR, file), "utf8");

    it(`${file} ↔ widget associado compartilha labels`, () => {
      if (!widgetName) {
        // Sem widget mapeado: validação mínima — arquivo existe e não está vazio
        expect(htmlContent.length).toBeGreaterThan(50);
        return;
      }
      const widgetPath = path.join(WIDGETS_DIR, `${widgetName}.tsx`);
      if (!fs.existsSync(widgetPath)) return;
      const widgetSrc = fs.readFileSync(widgetPath, "utf8");
      if (widgetSrc.includes(SKIP_MARKER)) return;
      const labels = extractPreviewLabels(widgetSrc);
      if (labels.size === 0) return;
      const missing = findMissing(labels, htmlContent);
      if (missing.length >= FAIL_THRESHOLD) {
        throw new Error(
          `${missing.length} labels do widget ${widgetName} ausentes em ${file}:\n  - ${missing.slice(0, 10).join("\n  - ")}`
        );
      }
      expect(missing.length).toBeLessThan(FAIL_THRESHOLD);
    });
  }
});
