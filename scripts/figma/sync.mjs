#!/usr/bin/env node
/**
 * Confere se código, JSON de tokens e arquivo Figma continuam sincronizados.
 *
 * Por que não é automático dos dois lados
 * ---------------------------------------
 * A REST API de variáveis do Figma (ler e escrever) é exclusiva do plano
 * Enterprise. A AUVP está no Pro, então nenhum CI consegue falar com as
 * variáveis do arquivo. O caminho que funciona no Pro é a Plugin API, que só
 * roda dentro do Figma — na prática, via MCP numa sessão do Claude Code.
 *
 * Este script divide o problema em duas metades, e automatiza a que dá:
 *
 *   1. CSS → JSON   (`check`)   — 100% automatizável, roda no CI, sem rede.
 *   2. JSON → Figma (`snippet`) — precisa de uma sessão com o MCP do Figma.
 *
 * A ponte entre as duas é um hash canônico: os dois lados serializam os tokens
 * no mesmo formato e reduzem a um número. Números iguais, lados sincronizados.
 *
 * Uso:
 *   node scripts/figma/sync.mjs check          # falha se o JSON estiver defasado
 *   node scripts/figma/sync.mjs hash           # imprime só o hash local
 *   node scripts/figma/sync.mjs snippet        # imprime o JS para rodar no Figma
 *   node scripts/figma/sync.mjs diff <arquivo> # diz QUAIS tokens divergem
 *
 * O `diff` recebe o dump canônico devolvido pelo snippet. Saber que os hashes
 * diferem não resolve nada sozinho; saber que são dois tokens e quais, sim.
 */
import { readFileSync } from "node:fs";
import { relative } from "node:path";

import {
  CAMINHO_JSON,
  CAMINHO_CSS,
  RAIZ,
  ORDEM_MODOS,
  extrairTokens,
  formaCanonica,
  hash,
  FORA_DA_CONFERENCIA_MOTIVO,
  FORA_DA_CONFERENCIA_FIGMA,
} from "./lib/tokens.mjs";

const rel = (p) => relative(RAIZ, p).replace(/\\/g, "/");
const comando = process.argv[2] || "check";

/* ---------------------------------------------------------------- check --- */

function check() {
  const { tokens, semValor } = extrairTokens();
  const canon = formaCanonica(tokens);
  const h = hash(canon);

  let commitado;
  try {
    commitado = JSON.parse(readFileSync(CAMINHO_JSON, "utf8"));
  } catch {
    console.error(`✗ ${rel(CAMINHO_JSON)} não existe. Rode: node scripts/figma/extract-tokens.mjs`);
    process.exit(1);
  }

  const divergencias = [];
  const nomesCss = Object.keys(tokens);
  const nomesJson = Object.keys(commitado.tokens ?? {});

  for (const nome of nomesCss) {
    if (!nomesJson.includes(nome)) {
      divergencias.push(`+ ${nome} — existe no CSS, falta no JSON`);
      continue;
    }
    for (const modo of ORDEM_MODOS) {
      const a = tokens[nome].modos[modo];
      const b = commitado.tokens[nome].modos?.[modo];
      if (!a && !b) continue;
      if (!a || !b || a.valor !== b.valor) {
        divergencias.push(
          `~ ${nome} [${modo}] — CSS diz ${a ? a.valor : "ausente"}, JSON diz ${b ? b.valor : "ausente"}`,
        );
      }
    }
  }
  for (const nome of nomesJson) {
    if (!nomesCss.includes(nome)) divergencias.push(`- ${nome} — está no JSON mas sumiu do CSS`);
  }

  console.log(`${rel(CAMINHO_CSS)} → ${nomesCss.length} tokens`);
  console.log(`hash canônico: ${h}  (${canon.length} caracteres)`);
  if (semValor.length) {
    console.log(`definidos em parte dos modos: ${semValor.join(", ")}`);
  }

  if (divergencias.length) {
    console.error(`\n✗ ${rel(CAMINHO_JSON)} está defasado — ${divergencias.length} divergência(s):\n`);
    for (const d of divergencias.slice(0, 30)) console.error(`   ${d}`);
    if (divergencias.length > 30) console.error(`   … e mais ${divergencias.length - 30}`);
    console.error(`\nRode: node scripts/figma/extract-tokens.mjs`);
    process.exit(1);
  }

  console.log(`\n✓ ${rel(CAMINHO_JSON)} está em dia com o CSS.`);
  console.log(`\nPara conferir o Figma, rode 'node scripts/figma/sync.mjs snippet'`);
  console.log(`e compare o hash de lá com ${h}.`);
}

/* --------------------------------------------------------------- snippet --- */

function snippet() {
  const fora = JSON.stringify(FORA_DA_CONFERENCIA_FIGMA);
  const ordem = JSON.stringify(ORDEM_MODOS);

  console.log(`// Cole em use_figma (MCP do Figma) com o arquivo do design system aberto.
//
// Devolve o hash do lado do Figma e o dump canônico. Compare o hash com o de
// 'node scripts/figma/sync.mjs check'. Se diferirem, salve o campo 'dump' num
// arquivo e rode 'node scripts/figma/sync.mjs diff <arquivo>' para ver quais
// tokens divergem e em que modo.
//
// ⚠️ Este snippet espelha formaCanonica() de scripts/figma/lib/tokens.mjs.
// Mudou lá, muda aqui. O 'tamanho' serve de alarme: se os algoritmos
// divergirem, o tamanho quase sempre difere antes do hash.

const COLECAO = "AUVP Design Tokens";
const ORDEM = ${ordem};
const FORA = new Set(${fora});

const colecoes = await figma.variables.getLocalVariableCollectionsAsync();
const colecao = colecoes.find((c) => c.name === COLECAO);
if (!colecao) throw new Error("coleção não encontrada: " + COLECAO);

const modoId = Object.fromEntries(colecao.modes.map((m) => [m.name, m.modeId]));
const faltando = ORDEM.filter((m) => !modoId[m]);
if (faltando.length) throw new Error("modos ausentes no Figma: " + faltando.join(", "));

const dois = (n) => Math.round(n * 255).toString(16).padStart(2, "0").toUpperCase();
const paraHex = (c) => "#" + dois(c.r) + dois(c.g) + dois(c.b);

const linhas = [];
for (const vid of colecao.variableIds) {
  const v = await figma.variables.getVariableByIdAsync(vid);
  if (FORA.has(v.name)) continue;
  const partes = ORDEM.map((modo) => {
    const got = v.valuesByMode[modoId[modo]];
    if (got === undefined) return modo + "=AUSENTE";
    if (v.resolvedType === "COLOR") {
      const a = got.a === undefined ? 1 : got.a;
      return modo + "=" + paraHex(got) + "@" + a.toFixed(3);
    }
    return modo + "=" + String(got);
  });
  linhas.push(
    v.name + "|" + v.resolvedType + "|" + v.scopes.join(",") +
    "|" + ((v.codeSyntax || {}).WEB || "") + "|" + partes.join(";")
  );
}
linhas.sort();
const canon = linhas.join("\\n");

let h = 5381;
for (let i = 0; i < canon.length; i++) h = (((h << 5) + h) ^ canon.charCodeAt(i)) >>> 0;

return { variaveisConferidas: linhas.length, tamanho: canon.length, hash: h.toString(16), dump: canon };`);
}

/* ------------------------------------------------------------------ hash --- */

function apenasHash() {
  const { tokens } = extrairTokens();
  const canon = formaCanonica(tokens);
  console.log(hash(canon));
}

/* ------------------------------------------------------------------ diff --- */

function diff(caminho) {
  if (!caminho) {
    console.error("uso: node scripts/figma/sync.mjs diff <arquivo-com-o-dump-do-figma>");
    console.error("o dump vem do snippet — veja 'node scripts/figma/sync.mjs snippet'");
    process.exit(1);
  }

  let doFigma;
  try {
    doFigma = readFileSync(caminho, "utf8");
  } catch {
    console.error(`✗ não consegui ler ${caminho}`);
    process.exit(1);
  }

  const { tokens } = extrairTokens();
  const local = formaCanonica(tokens);

  /** Quebra a forma canônica em mapa nome → resto da linha. */
  const emMapa = (texto) =>
    new Map(
      texto
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((linha) => {
          const corte = linha.indexOf("|");
          return [linha.slice(0, corte), linha.slice(corte + 1)];
        }),
    );

  const a = emMapa(local);
  const b = emMapa(doFigma);

  const soNoCodigo = [...a.keys()].filter((k) => !b.has(k));
  const soNoFigma = [...b.keys()].filter((k) => !a.has(k));
  const diferentes = [...a.keys()].filter((k) => b.has(k) && a.get(k) !== b.get(k));

  console.log(`código: ${a.size} variáveis   figma: ${b.size} variáveis`);

  if (!soNoCodigo.length && !soNoFigma.length && !diferentes.length) {
    console.log(`\n✓ Sincronizados. Hash ${hash(local)} nos dois lados.`);
    return;
  }

  if (soNoCodigo.length) {
    console.log(`\n► Existem no código e faltam no Figma (${soNoCodigo.length}):`);
    for (const n of soNoCodigo) console.log(`   ${n}`);
  }
  if (soNoFigma.length) {
    console.log(`\n► Existem no Figma e sumiram do código (${soNoFigma.length}):`);
    for (const n of soNoFigma) console.log(`   ${n}`);
  }
  if (diferentes.length) {
    console.log(`\n► Valores divergentes (${diferentes.length}):`);
    for (const n of diferentes) {
      console.log(`\n   ${n}`);
      // Mostra só os campos que realmente mudaram, campo a campo.
      const ca = a.get(n).split("|");
      const cb = b.get(n).split("|");
      const rotulos = ["tipo", "scopes", "code syntax", "valores"];
      for (let i = 0; i < rotulos.length; i++) {
        if (ca[i] === cb[i]) continue;
        if (rotulos[i] !== "valores") {
          console.log(`     ${rotulos[i]}: código=${ca[i]}  figma=${cb[i]}`);
          continue;
        }
        const va = Object.fromEntries((ca[i] ?? "").split(";").map((p) => p.split("=")));
        const vb = Object.fromEntries((cb[i] ?? "").split(";").map((p) => p.split("=")));
        for (const modo of ORDEM_MODOS) {
          if (va[modo] === vb[modo]) continue;
          console.log(`     ${modo}: código=${va[modo]}  figma=${vb[modo]}`);
        }
      }
    }
  }

  console.log(`\nhash — código: ${hash(local)}   figma: ${hash(doFigma.trim())}`);
  process.exitCode = 1;
}

/* ------------------------------------------------------------------------- */

if (comando === "check") check();
else if (comando === "snippet") snippet();
else if (comando === "hash") apenasHash();
else if (comando === "diff") diff(process.argv[3]);
else {
  console.error(`comando desconhecido: ${comando}`);
  console.error(`use: check | hash | snippet | diff <arquivo>`);
  process.exit(1);
}

// Tokens fora da conferência aparecem no check para não virarem lacuna calada.
if (comando === "check" && Object.keys(FORA_DA_CONFERENCIA_MOTIVO).length) {
  console.log(`\nFora da conferência automática (precisam de olho humano):`);
  for (const [nome, motivo] of Object.entries(FORA_DA_CONFERENCIA_MOTIVO)) {
    console.log(`   ${nome} — ${motivo}`);
  }
}
