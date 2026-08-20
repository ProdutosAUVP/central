#!/usr/bin/env node
/**
 * Gera o preview local dos widgets para a captura web → Figma (Fase C do guia).
 *
 * Os snippets de src/components/widgets/html-snippets/ não servem para captura
 * como estão, por dois motivos:
 *
 * 1. Onze deles usam `hsl(var(--token))` mas nenhum declara `:root` — abertos
 *    direto no navegador, a cor cai no fallback ou fica inválida.
 * 2. Dezoito são fragmentos, não documentos: não têm <head> onde injetar nada.
 *
 * Este script resolve os dois: injeta o bloco `:root` com os tokens do modo
 * escolhido (lidos de docs/figma/design-tokens.json) e o script de captura do
 * Figma, envolvendo os fragmentos num documento completo com Tailwind e as três
 * famílias tipográficas.
 *
 * É o que faz o `bindVariables=true` da captura funcionar: com os tokens
 * declarados, o Figma reconhece as cores e liga as camadas às variáveis da
 * coleção em vez de trazer hex solto.
 *
 * Uso:
 *   node scripts/figma/build-preview.mjs [modo]     # padrão: capital-light
 *
 * Saída: public/_figma-preview/ — fica dentro de public/ para o dev server do
 * Vite servir sem configuração extra, e está no .gitignore justamente por isso:
 * versionado, entraria no build do GitHub Pages.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ORIGEM = resolve(raiz, "src/components/widgets/html-snippets");
const DESTINO = resolve(raiz, "public/_figma-preview");
const MODO = process.argv[2] || "capital-light";

const { tokens, modos } = JSON.parse(
  readFileSync(resolve(raiz, "docs/figma/design-tokens.json"), "utf8"),
);
if (!modos.includes(MODO)) {
  console.error(`modo desconhecido: ${MODO}\nmodos disponíveis: ${modos.join(", ")}`);
  process.exit(1);
}

/* O browser precisa do HSL cru que `hsl(var(--token))` espera — o hex do JSON
   serve ao Figma, não à página. Por isso lemos `css` e não `valor`. */
const declaracoes = [];
for (const [nome, t] of Object.entries(tokens)) {
  const m = t.modos[MODO];
  if (m) declaracoes.push(`  ${nome}: ${m.css};`);
}

const TOKENS = `<style id="auvp-tokens">\n:root {\n${declaracoes.join("\n")}\n}\n</style>`;
const CAPTURA = `<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async><\/script>`;
const FONTES = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@400;500;600;700;800&family=Roboto:wght@400;500;600;700&family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  .font-anek{font-family:'Anek Latin',sans-serif}
  .font-roboto{font-family:'Roboto',sans-serif}
  .font-sora{font-family:'Sora',sans-serif}
</style>`;

/** Envolve um fragmento num documento completo, pronto para captura. */
function envolver(nome, fragmento) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${nome} — AUVP preview</title>
<script src="https://cdn.tailwindcss.com"><\/script>
${FONTES}
${TOKENS}
${CAPTURA}
</head>
<body style="margin:0;padding:48px;background:hsl(var(--background));color:hsl(var(--foreground));font-family:'Roboto',sans-serif;">
<div id="alvo" style="display:inline-block;min-width:320px;">
${fragmento}
</div>
</body>
</html>`;
}

rmSync(DESTINO, { recursive: true, force: true });
mkdirSync(DESTINO, { recursive: true });

const todos = readdirSync(ORIGEM).filter((f) => f.endsWith(".html"));

/* A família livro-* é dividida: livro-base.html tem só o <style> compartilhado
   ("inclua uma vez", diz o comentário do arquivo) e os outros seis trazem a
   marcação que depende dele. Capturados soltos, o base sai em branco — não tem
   marcação nenhuma — e os demais saem sem estilo. Por isso o base entra como
   prefixo dos irmãos e não vira captura própria. */
const BASE_LIVRO = "livro-base.html";
const cssLivro = todos.includes(BASE_LIVRO)
  ? readFileSync(resolve(ORIGEM, BASE_LIVRO), "utf8")
  : "";

const arquivos = todos.filter((f) => f !== BASE_LIVRO);
const completos = [];
const envolvidos = [];

for (const arq of arquivos) {
  const bruto = readFileSync(resolve(ORIGEM, arq), "utf8");
  const corpo = arq.startsWith("livro-") ? `${cssLivro}\n${bruto}` : bruto;
  let saida;
  if (corpo.includes("</head>")) {
    saida = corpo.replace("</head>", `${TOKENS}\n${CAPTURA}\n</head>`);
    completos.push(arq);
  } else {
    saida = envolver(arq.replace(".html", ""), corpo);
    envolvidos.push(arq);
  }
  writeFileSync(resolve(DESTINO, arq), saida);
}

/* Índice para abrir tudo de uma vez e conferir antes de capturar. */
const lista = arquivos.map((a) => `<li><a href="./${a}">${a}</a></li>`).join("\n");
writeFileSync(
  resolve(DESTINO, "index.html"),
  envolver("Índice", `<h1 class="font-anek" style="font-size:32px;font-weight:700;margin:0 0 16px">Preview dos widgets</h1><ul>${lista}</ul>`),
);

console.log(`modo: ${MODO} — ${declaracoes.length} tokens injetados`);
console.log(`  documentos completos: ${completos.length}`);
console.log(`  fragmentos envolvidos: ${envolvidos.length}`);
console.log(`  → public/_figma-preview/ (${arquivos.length} widgets + índice)`);
console.log(`\nDev server: npm run dev`);
console.log(`Índice:     http://localhost:8080/central/_figma-preview/`);
