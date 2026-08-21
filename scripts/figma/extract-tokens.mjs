#!/usr/bin/env node
/**
 * Extrai os design tokens de src/index.css para JSON consumível pelo Figma.
 *
 * Os tokens moram em quatro blocos do CSS, um por combinação de marca × tema.
 * Cada bloco carrega só o que sobrescreve os anteriores, então a leitura aplica
 * a cascata na ordem do arquivo para produzir o conjunto completo de cada modo.
 *
 * A leitura em si vive em lib/tokens.mjs, compartilhada com sync.mjs — assim o
 * script que escreve o JSON e o que confere nunca discordam sobre o que é um
 * token nem sobre como ele vira texto comparável.
 *
 * Saída: docs/figma/design-tokens.json
 *   - modos[]  → um por marca × tema, no formato de Variables do Figma
 *   - tokens{} → um por variável, com o valor de cada modo lado a lado
 *   - hash     → impressão digital canônica, usada para comparar com o Figma
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, relative } from "node:path";

import {
  RAIZ,
  CAMINHO_JSON,
  MODOS,
  extrairTokens,
  formaCanonica,
  hash,
} from "./lib/tokens.mjs";

const { tokens, nomes, semValor } = extrairTokens();
const impressao = hash(formaCanonica(tokens));

const saida = {
  origem: "src/index.css",
  colecao: "AUVP Design Tokens",
  modos: MODOS.map((m) => m.nome),
  /* Impressão digital do conjunto, no mesmo formato que o snippet do Figma
     produz. Comparar este valor com o de lá diz, num número só, se o arquivo
     e o código continuam sincronizados. Veja scripts/figma/sync.mjs. */
  hash: impressao,
  tokens,
};

mkdirSync(dirname(CAMINHO_JSON), { recursive: true });
writeFileSync(CAMINHO_JSON, JSON.stringify(saida, null, 2) + "\n");

const porTipo = Object.values(tokens).reduce((acc, t) => {
  acc[t.tipo] = (acc[t.tipo] ?? 0) + 1;
  return acc;
}, {});

const rel = relative(RAIZ, CAMINHO_JSON).replace(/\\/g, "/");
console.log(`${nomes.length} tokens → ${rel}`);
console.log(`  por tipo: ${Object.entries(porTipo).map(([k, v]) => `${k}=${v}`).join(", ")}`);
console.log(`  hash canônico: ${impressao}`);
if (semValor.length) {
  console.log(`  definidos em parte dos modos (${semValor.length}): ${semValor.join(", ")}`);
}
