#!/usr/bin/env node
/**
 * Extrai os design tokens de src/index.css para JSON consumível pelo Figma.
 *
 * Os tokens moram em quatro blocos do CSS, um por combinação de marca × tema.
 * Cada bloco carrega só o que sobrescreve os anteriores, então o script aplica
 * a cascata na ordem do arquivo para produzir o conjunto completo de cada modo.
 *
 * Saída: docs/figma/design-tokens.json
 *   - modes[]  → um por marca × tema, no formato de Variables do Figma
 *   - tokens{} → um por variável, com o valor de cada modo lado a lado
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const css = readFileSync(resolve(raiz, "src/index.css"), "utf8");

/* Ordem = cascata. Cada modo herda de todos os seletores anteriores da lista. */
const MODOS = [
  { nome: "capital-light", seletores: [":root"] },
  { nome: "escola-light", seletores: [":root", ".escola"] },
  { nome: "capital-dark", seletores: [":root", ".dark"] },
  { nome: "escola-dark", seletores: [":root", ".escola", ".dark", ".dark.escola"] },
];

/** Devolve o corpo do primeiro bloco cujo seletor bate exatamente. */
function corpoDoBloco(seletor) {
  const escapado = seletor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // O seletor pode vir sozinho ou numa lista (".dark.escola,\n  .escola .dark {").
  const abertura = new RegExp(`(?:^|[},])\\s*${escapado}\\s*(?:,[^{]*)?\\{`, "m");
  const m = abertura.exec(css);
  if (!m) throw new Error(`Seletor não encontrado em src/index.css: ${seletor}`);

  let profundidade = 1;
  let i = m.index + m[0].length;
  const inicio = i;
  while (i < css.length && profundidade > 0) {
    if (css[i] === "{") profundidade++;
    else if (css[i] === "}") profundidade--;
    i++;
  }
  return css.slice(inicio, i - 1);
}

/** Extrai os pares --nome: valor de um corpo de bloco, ignorando comentários. */
function variaveis(corpo) {
  const limpo = corpo.replace(/\/\*[\s\S]*?\*\//g, "");
  const saida = {};
  for (const [, nome, valor] of limpo.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    saida[nome] = valor.trim();
  }
  return saida;
}

const HSL = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/;

/** Classifica o valor para o Figma: COLOR, FLOAT ou STRING. */
function classificar(valor, nome) {
  // Fontes: o Figma liga a variavel ao estilo de texto pela familia sozinha,
  // sem o fallback do stack. O valor original do CSS fica guardado em `css`.
  if (nome.startsWith("--font")) {
    const familia = valor.split(",")[0].trim().replace(/^['"]|['"]$/g, "");
    return { tipo: "STRING", valor: familia, css: valor };
  }
  const hsl = HSL.exec(valor);
  if (hsl) {
    const [, h, s, l] = hsl.map(Number);
    return { tipo: "COLOR", valor: hslParaHex(h, s, l), css: valor };
  }
  const rem = /^(-?\d*\.?\d+)rem$/.exec(valor);
  if (rem) return { tipo: "FLOAT", valor: Number(rem[1]) * 16, css: valor };
  const px = /^(-?\d*\.?\d+)px$/.exec(valor);
  if (px) return { tipo: "FLOAT", valor: Number(px[1]), css: valor };
  return { tipo: "STRING", valor, css: valor };
}

function hslParaHex(h, s, l) {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  const setor = Math.floor(h / 60) % 6;
  const [r, g, b] = [
    [c, x, 0], [x, c, 0], [0, c, x],
    [0, x, c], [x, 0, c], [c, 0, x],
  ][setor];
  const canal = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${canal(r)}${canal(g)}${canal(b)}`.toUpperCase();
}

/* --- Monta a cascata de cada modo --- */
const cache = new Map();
const porModo = {};
for (const modo of MODOS) {
  const acumulado = {};
  for (const seletor of modo.seletores) {
    if (!cache.has(seletor)) cache.set(seletor, variaveis(corpoDoBloco(seletor)));
    Object.assign(acumulado, cache.get(seletor));
  }
  porModo[modo.nome] = acumulado;
}

/* --- Pivota para uma entrada por token, com todos os modos juntos --- */
const nomes = [...new Set(Object.values(porModo).flatMap(Object.keys))].sort();
const tokens = {};
const semValor = [];

for (const nome of nomes) {
  const entrada = { modos: {} };
  for (const modo of MODOS) {
    const bruto = porModo[modo.nome][nome];
    if (bruto === undefined) continue;
    const { tipo, valor, css: origem } = classificar(bruto, nome);
    entrada.tipo ??= tipo;
    entrada.modos[modo.nome] = { valor, css: origem };
  }
  if (Object.keys(entrada.modos).length < MODOS.length) semValor.push(nome);
  // Tokens que referenciam outros (ex.: hsl(var(--primary) / 0.07)) viram alias
  // no Figma; marcamos para o agente resolver na hora de criar a variável.
  // A varredura cobre todos os modos: um token pode ser literal num modo e
  // derivado em outro, e nem todo token existe no primeiro modo da lista.
  if (Object.values(entrada.modos).some(({ css }) => css.includes("var(--"))) {
    entrada.derivado = true;
  }
  tokens[nome] = entrada;
}

const saida = {
  origem: "src/index.css",
  colecao: "AUVP Design Tokens",
  modos: MODOS.map((m) => m.nome),
  tokens,
};

const destino = resolve(raiz, "docs/figma/design-tokens.json");
mkdirSync(dirname(destino), { recursive: true });
writeFileSync(destino, JSON.stringify(saida, null, 2) + "\n");

const porTipo = Object.values(tokens).reduce((acc, t) => {
  acc[t.tipo] = (acc[t.tipo] ?? 0) + 1;
  return acc;
}, {});
console.log(`${nomes.length} tokens → docs/figma/design-tokens.json`);
console.log(`  por tipo: ${Object.entries(porTipo).map(([k, v]) => `${k}=${v}`).join(", ")}`);
if (semValor.length) {
  console.log(`  definidos em parte dos modos (${semValor.length}): ${semValor.join(", ")}`);
}
