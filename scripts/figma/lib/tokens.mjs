/**
 * Fonte única da leitura de tokens e da forma canônica usada na sincronização
 * com o Figma.
 *
 * Existe para que `extract-tokens.mjs` (que escreve o JSON) e `sync.mjs` (que
 * confere) nunca discordem sobre o que é um token nem sobre como ele vira
 * texto comparável. Duplicar essa lógica seria o jeito mais fácil de os dois
 * lados divergirem sem ninguém perceber.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
export const CAMINHO_CSS = resolve(RAIZ, "src/index.css");
export const CAMINHO_JSON = resolve(RAIZ, "docs/figma/design-tokens.json");

/* Ordem = cascata. Cada modo herda de todos os seletores anteriores da lista. */
export const MODOS = [
  { nome: "capital-light", seletores: [":root"] },
  { nome: "escola-light", seletores: [":root", ".escola"] },
  { nome: "capital-dark", seletores: [":root", ".dark"] },
  { nome: "escola-dark", seletores: [":root", ".escola", ".dark", ".dark.escola"] },
];

/** Ordem dos modos na forma canônica — precisa bater com o lado do Figma. */
export const ORDEM_MODOS = MODOS.map((m) => m.nome);

const HSL = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/;

/** Devolve o corpo do primeiro bloco cujo seletor bate exatamente. */
function corpoDoBloco(css, seletor) {
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

/** Classifica o valor para o Figma: COLOR, FLOAT ou STRING. */
function classificar(valor, nome) {
  // Fontes: o Figma liga a variável ao estilo de texto pela família sozinha, sem
  // o fallback do stack. O valor original do CSS fica guardado em `css`.
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

/**
 * Lê o CSS e devolve o mapa completo de tokens por modo.
 * @returns {{ tokens: object, nomes: string[], semValor: string[] }}
 */
export function extrairTokens(css = readFileSync(CAMINHO_CSS, "utf8")) {
  const cache = new Map();
  const porModo = {};
  for (const modo of MODOS) {
    const acumulado = {};
    for (const seletor of modo.seletores) {
      if (!cache.has(seletor)) cache.set(seletor, variaveis(corpoDoBloco(css, seletor)));
      Object.assign(acumulado, cache.get(seletor));
    }
    porModo[modo.nome] = acumulado;
  }

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

  return { tokens, nomes, semValor };
}

/**
 * Serializa os tokens numa string estável, no MESMO formato que o snippet do
 * Figma produz. É o que permite comparar os dois lados por um número só.
 *
 * ⚠️ Mudar este formato exige mudar o snippet junto (veja `sync.mjs snippet`).
 * O `tamanho` impresso ao lado do hash serve de alarme: se os dois lados
 * divergirem no algoritmo, o tamanho quase sempre difere antes do hash.
 */
export function formaCanonica(tokens) {
  const linhas = [];
  for (const [nome, t] of Object.entries(tokens)) {
    if (FORA_DA_CONFERENCIA.has(nome)) continue;
    const nomeFigma = nomeNoFigma(nome, t.tipo);
    const partes = ORDEM_MODOS.map((modo) => {
      const m = t.modos[modo];
      if (!m) return `${modo}=AUSENTE`;
      // Todo COLOR conferível é opaco; o único com alpha está fora da lista.
      if (t.tipo === "COLOR") return `${modo}=${m.valor}@${(1).toFixed(3)}`;
      return `${modo}=${m.valor}`;
    });
    linhas.push(`${nomeFigma}|${t.tipo}|${escoposDe(nome, t.tipo).join(",")}|var(${nome})|${partes.join(";")}`);
  }
  linhas.sort();
  return linhas.join("\n");
}

/** djb2 — barato, estável e suficiente para detectar divergência. */
export function hash(texto) {
  let h = 5381;
  for (let i = 0; i < texto.length; i++) h = (((h << 5) + h) ^ texto.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

/* --- Espelho da organização usada no Figma ---------------------------------
   Estes dois mapas reproduzem as decisões tomadas ao criar as variáveis. Se a
   organização mudar no Figma, muda aqui também — senão a conferência acusa
   divergência que não existe. */

const GRUPOS = [
  ["color/base", ["background","foreground","card","card-foreground","popover","popover-foreground","muted","muted-foreground","border","input","ring"]],
  ["color/brand", ["primary","primary-emphasis","primary-foreground","secondary","secondary-emphasis","secondary-foreground","accent","accent-foreground","brand","brand-dark","brand-foreground","brand-gradient-from","brand-gradient-to","brand-hover","cta","cta-emphasis","cta-foreground"]],
  ["color/status", ["success","success-foreground","warning","warning-foreground","info","info-foreground","error","error-foreground","destructive","destructive-foreground"]],
  ["color/chart", ["chart-1","chart-2","chart-3","chart-4","chart-5","chart-6","chart-7","chart-8","chart-seq-1","chart-seq-2","chart-seq-3","chart-seq-4","chart-seq-5","chart-div-mid","chart-div-neg","chart-div-pos"]],
  ["color/sidebar", ["sidebar-background","sidebar-foreground","sidebar-border","sidebar-ring","sidebar-accent","sidebar-accent-foreground","sidebar-primary","sidebar-primary-foreground"]],
  ["color/effect", ["spotlight"]],
  ["number", ["radius"]],
  ["string", ["font-body","font-display","font-ui"]],
];

/** Nome da variável no Figma (grupo/nome), a partir do nome CSS. */
export function nomeNoFigma(nomeCss, tipo) {
  const curto = nomeCss.replace(/^--/, "");
  for (const [grupo, itens] of GRUPOS) {
    if (itens.includes(curto)) return `${grupo}/${curto}`;
  }
  // Token novo no CSS que ainda não foi agrupado no Figma.
  const fallback = tipo === "FLOAT" ? "number" : tipo === "STRING" ? "string" : "color/base";
  return `${fallback}/${curto}`;
}

/** Scopes aplicados à variável no Figma. */
export function escoposDe(nomeCss, tipo) {
  const curto = nomeCss.replace(/^--/, "");
  if (tipo === "FLOAT") return ["CORNER_RADIUS"];
  if (tipo === "STRING") return ["FONT_FAMILY"];
  if (/-foreground$/.test(curto)) return ["TEXT_FILL"];
  if (/^(border|input|ring|sidebar-border|sidebar-ring)$/.test(curto)) return ["STROKE_COLOR"];
  return ["FRAME_FILL", "SHAPE_FILL"];
}

/**
 * Tokens deliberadamente fora da conferência automática.
 *
 * Não é uma lacuna escondida: é que a forma no CSS e a forma no Figma não são
 * comparáveis por regra, então conferi-los automaticamente daria falso alarme
 * em toda execução. Cada um precisa de olho humano quando mudar.
 *
 * ⚠️ O snippet do Figma (veja `sync.mjs snippet`) precisa pular exatamente os
 * mesmos nomes, senão os dois lados nunca batem.
 */
export const FORA_DA_CONFERENCIA_MOTIVO = {
  "--spotlight":
    "Não existe em :root (só no bloco .light) e nos modos escuros vale " +
    "hsl(var(--primary) / 0.07). Alias no Figma não carrega opacidade, então a " +
    "variável guarda cor literal com alpha — forma incomparável com a do CSS.",
};

export const FORA_DA_CONFERENCIA = new Set(Object.keys(FORA_DA_CONFERENCIA_MOTIVO));

/** Nomes correspondentes no Figma, para o snippet pular os mesmos. */
export const FORA_DA_CONFERENCIA_FIGMA = [...FORA_DA_CONFERENCIA].map((n) =>
  nomeNoFigma(n, "COLOR"),
);
