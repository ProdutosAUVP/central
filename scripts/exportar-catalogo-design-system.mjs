#!/usr/bin/env node
/**
 * Exporta o catálogo visual do Design System.
 *
 * Renderiza /design-system num Chromium headless e captura, um a um, todos os
 * `<ComponentShowcase>` da página — nos temas claro e escuro — em PNG (raster
 * de alta resolução) e SVG (vetor real, gerado por dom-to-svg).
 *
 * Uso:
 *   npm run build
 *   node scripts/exportar-catalogo-design-system.mjs [--limite=N] [--tema=claro|escuro]
 *
 * Saída: catalogo-design-system/
 */

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import os from "node:os";
import crypto from "node:crypto";
import { execFileSync, execFile } from "node:child_process";
import { promisify } from "node:util";
import { chromium } from "playwright";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(RAIZ, "dist");
const SAIDA = path.join(RAIZ, "catalogo-design-system");
const BASE = "/central";
const PORTA = 4319;

/** Escala do PNG. 3x cobre uso em telas retina e em impressão. */
const ESCALA_PNG = 3;
const LARGURA_VIEWPORT = 1440;
const ALTURA_VIEWPORT = 1100;

/** Fontes da marca, para que o SVG aberto no navegador use a tipografia certa. */
const IMPORT_FONTES =
  "@import url('https://fonts.googleapis.com/css2?family=Anek+Latin:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Sora:wght@500;600;700&display=swap');";

const TEMAS = [
  { id: "claro", classe: "light", storage: "light" },
  { id: "escuro", classe: "dark", storage: "dark" },
];

const argv = process.argv.slice(2);
const arg = (nome) => {
  const hit = argv.find((a) => a.startsWith(`--${nome}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};
const LIMITE = Number(arg("limite") ?? 0) || 0;
const TEMA_FILTRO = arg("tema");

// ---------------------------------------------------------------------------
// Metadados das seções (categoria / rótulo) lidos da fonte única do projeto.
// ---------------------------------------------------------------------------

function lerSecoes() {
  const src = fs.readFileSync(path.join(RAIZ, "src/data/designSystemSections.ts"), "utf8");

  const secoes = new Map();
  const reSecao = /\{\s*id:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*icon:\s*[^,]+,\s*category:\s*"([^"]+)"/g;
  for (const m of src.matchAll(reSecao)) {
    secoes.set(m[1], { id: m[1], label: m[2], categoria: m[3] });
  }

  const categorias = new Map();
  const blocoCat = src.match(/export const categoryLabels[^{]*\{([\s\S]*?)\n\};/);
  if (blocoCat) {
    for (const m of blocoCat[1].matchAll(/"?([\w-]+)"?:\s*"([^"]+)"/g)) {
      categorias.set(m[1], m[2]);
    }
  }

  if (!secoes.size) throw new Error("Não consegui ler as seções de designSystemSections.ts");
  return { secoes, categorias };
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function slug(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " e ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

/** Servidor estático mínimo para o dist, respeitando a base /central/. */
function servirDist() {
  const tipos = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".mp3": "audio/mpeg",
    ".json": "application/json; charset=utf-8",
    ".woff2": "font/woff2",
    ".ico": "image/x-icon",
  };

  const servidor = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (rel.startsWith(BASE)) rel = rel.slice(BASE.length);
    let alvo = path.join(DIST, rel);
    if (!alvo.startsWith(DIST)) {
      res.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(alvo) || fs.statSync(alvo).isDirectory()) {
      // Fallback de SPA: qualquer rota desconhecida devolve o index.
      alvo = path.join(DIST, "index.html");
    }
    res.writeHead(200, { "content-type": tipos[path.extname(alvo)] ?? "application/octet-stream" });
    fs.createReadStream(alvo).pipe(res);
  });

  return new Promise((resolve) => {
    servidor.listen(PORTA, "127.0.0.1", () => resolve(servidor));
  });
}

/** Empacota o dom-to-svg num IIFE injetável na página. */
function empacotarDomToSvg() {
  const destino = path.join(RAIZ, "node_modules/.cache/dom-to-svg.iife.js");
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  execFileSync(
    path.join(RAIZ, "node_modules/.bin/esbuild"),
    [
      path.join(RAIZ, "node_modules/dom-to-svg/lib/index.js"),
      "--bundle",
      "--format=iife",
      "--global-name=DomToSvg",
      "--platform=browser",
      `--outfile=${destino}`,
    ],
    { stdio: "pipe" }
  );
  return destino;
}

// ---------------------------------------------------------------------------
// Rede externa
// ---------------------------------------------------------------------------

const execFileAsync = promisify(execFile);
const UA_CHROME =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/**
 * Busca um recurso externo por fora do Chromium.
 *
 * Ambientes com proxy corporativo costumam recusar o CONNECT do navegador
 * mesmo quando o `curl` passa. Como as fontes da marca e os SVGs de logo vêm
 * de fora do projeto, servimos esses pedidos por aqui e devolvemos o conteúdo
 * ao navegador — sem isso o catálogo sairia com fonte de fallback e cards vazios.
 */
const cacheExterno = new Map();
async function buscarExterno(url) {
  if (cacheExterno.has(url)) return cacheExterno.get(url);

  const base = path.join(os.tmpdir(), `ds-cat-${crypto.randomUUID()}`);
  try {
    await execFileAsync("curl", [
      "-sSL", "--max-time", "40", "-A", UA_CHROME,
      "-D", `${base}.h`, "-o", `${base}.b`, url,
    ]);
    const cabecalhos = await fsp.readFile(`${base}.h`, "latin1");
    const corpo = await fsp.readFile(`${base}.b`);
    const ct = [...cabecalhos.matchAll(/^content-type:\s*(.+)$/gim)].pop()?.[1].trim();
    const recurso = { body: corpo, contentType: ct || "application/octet-stream" };
    cacheExterno.set(url, recurso);
    return recurso;
  } finally {
    await fsp.rm(`${base}.h`, { force: true });
    await fsp.rm(`${base}.b`, { force: true });
  }
}

/** Rola a página inteira para forçar o carregamento de imagens lazy. */
async function rolarPaginaToda(page) {
  await page.evaluate(async () => {
    const passo = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
  await page.evaluate(async () => {
    const imgs = [...document.images].filter((i) => !i.complete);
    await Promise.all(
      imgs.map((i) => new Promise((r) => {
        i.addEventListener("load", r, { once: true });
        i.addEventListener("error", r, { once: true });
        setTimeout(r, 3000);
      }))
    );
  });
}

/**
 * Fecha o SVG gerado pelo dom-to-svg:
 *  - pinta o fundo do componente (o dom-to-svg não desenha o fundo do elemento raiz);
 *  - injeta o @import das fontes da marca;
 *  - acrescenta <title>/<desc> com o nome catalogado.
 */
function finalizarSvg(svg, { fundo, titulo, descricao, tema }) {
  const vb = svg.match(/viewBox="([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)"/);
  const partes = [];

  partes.push(
    `<title>${escaparXml(titulo)}</title>`,
    `<desc>${escaparXml(`${descricao ? descricao + " — " : ""}Design System AUVP · tema ${tema}`)}</desc>`
  );
  if (vb) {
    partes.push(
      `<rect x="${vb[1]}" y="${vb[2]}" width="${vb[3]}" height="${vb[4]}" fill="${fundo}"/>`
    );
  }

  // O CSS vai em CDATA: a URL do Google Fonts tem `&` e um SVG é XML, onde um
  // `&` solto quebra o parser — o arquivo abriria em branco no navegador.
  const estilo = `<style><![CDATA[${IMPORT_FONTES}]]></style>`;
  let out = svg.replace(/<style\s*\/>/, estilo);
  if (!out.includes("<style>")) {
    out = out.replace(/(<svg[^>]*>)/, `$1${estilo}`);
  }
  out = out.replace(/(<\/style>)/, `$1${partes.join("")}`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${out}\n`;
}

function escaparXml(s = "") {
  return String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c]));
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

const { secoes, categorias } = lerSecoes();

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/ não encontrado. Rode `npm run build` antes.");
  process.exit(1);
}

const bundleDomToSvg = empacotarDomToSvg();
const servidor = await servirDist();
const executablePath = process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

// Alguns ambientes (CI, sandbox) só saem para a internet via proxy. Sem ele o
// Chromium não baixaria as fontes do Google Fonts nem os SVGs de logo hospedados
// fora do projeto, e as capturas sairiam com fonte de fallback e caixas vazias.
const proxyUrl = process.env.HTTPS_PROXY ?? process.env.https_proxy;
const browser = await chromium.launch({
  ...(fs.existsSync(executablePath) ? { executablePath } : {}),
  ...(proxyUrl ? { proxy: { server: proxyUrl, bypass: "127.0.0.1,localhost" } } : {}),
});

const catalogo = new Map();
const falhas = [];

for (const tema of TEMAS) {
  if (TEMA_FILTRO && TEMA_FILTRO !== tema.id) continue;

  const ctx = await browser.newContext({
    viewport: { width: LARGURA_VIEWPORT, height: ALTURA_VIEWPORT },
    deviceScaleFactor: ESCALA_PNG,
    reducedMotion: "reduce",
    colorScheme: tema.storage,
    // O proxy do ambiente reassina o TLS com CA própria.
    ignoreHTTPSErrors: Boolean(proxyUrl),
  });
  await ctx.addInitScript(([chave, valor]) => {
    try {
      localStorage.setItem("auvp-theme", valor);
    } catch (e) { /* sem storage, o colorScheme cobre */ }
  }, ["auvp-theme", tema.storage]);

  const page = await ctx.newPage();
  await page.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(`http://127.0.0.1:${PORTA}`) || url.startsWith("data:") || url.startsWith("blob:")) {
      return route.continue();
    }
    // Widgets de feedback e métricas só atrapalhariam a captura.
    if (/userback\.io|clarity\.ms/.test(url)) return route.abort();
    try {
      const recurso = await buscarExterno(url);
      return route.fulfill({
        status: 200,
        body: recurso.body,
        contentType: recurso.contentType,
        headers: { "access-control-allow-origin": "*", "cache-control": "max-age=3600" },
      });
    } catch {
      return route.abort();
    }
  });

  console.log(`\n▸ tema ${tema.id}: carregando /design-system`);
  await page.goto(`http://127.0.0.1:${PORTA}${BASE}/design-system`, {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.waitForSelector("[data-ds-showcase]", { timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  const fontesOk = await page.evaluate(() =>
    ["Anek Latin", "Roboto", "Sora"].every((f) => document.fonts.check(`16px "${f}"`))
  );
  if (!fontesOk) console.warn("  ⚠ fontes da marca não carregaram — a captura usará fallback");
  await rolarPaginaToda(page);
  // Congela animações para que a captura seja determinística.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-duration:.001ms!important;animation-delay:0ms!important;transition-duration:.001ms!important;transition-delay:0ms!important;caret-color:transparent!important}`,
  });
  // A casca da página (header sticky, sidebar e widgets flutuantes) é pintada
  // por cima do componente e apareceria dentro do recorte do PNG. Escondê-la
  // com `visibility` preserva o layout — nada se desloca — e limpa a captura.
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      if (el.closest("[data-ds-showcase]")) continue;
      const pos = getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") {
        el.style.setProperty("visibility", "hidden", "important");
      }
    }
  });

  await page.addScriptTag({ path: bundleDomToSvg });

  const itens = await page.evaluate(() => {
    const els = [...document.querySelectorAll("[data-ds-showcase]")];
    return els.map((el, i) => {
      const secao = el.closest("section[id]");
      return {
        indice: i,
        titulo: el.getAttribute("data-ds-showcase") ?? "",
        descricao: el.getAttribute("data-ds-description") ?? "",
        secaoId: secao?.id ?? "",
      };
    });
  });

  const lista = LIMITE ? itens.slice(0, LIMITE) : itens;
  console.log(`  ${lista.length} componentes a capturar`);

  const usados = new Map();

  for (const item of lista) {
    const secao = secoes.get(item.secaoId) ?? { label: item.secaoId || "Outros", categoria: "outros" };
    const categoria = secao.categoria;
    // O caminho reproduz a navegação do Design System: categoria › seção › componente.
    // Assim variantes homônimas ("Default", "Tamanhos") continuam com o nome
    // real do componente sem colidir entre si.
    const pasta = path.join(slug(categoria), slug(secao.label));

    // SectionThemeToggle cai em "Componente" quando não recebe título próprio;
    // nesse caso o nome catalogado é o da seção.
    const titulo = item.titulo && item.titulo !== "Componente" ? item.titulo : secao.label;
    let nome = slug(titulo) || `componente-${item.indice + 1}`;
    const chaveNome = `${pasta}/${nome}`;
    const repetido = (usados.get(chaveNome) ?? 0) + 1;
    usados.set(chaveNome, repetido);
    if (repetido > 1) nome = `${nome}-${repetido}`;

    const handle = (await page.$$("[data-ds-showcase]"))[item.indice];
    const alvo = await handle.$("[data-ds-preview]");
    if (!alvo) {
      falhas.push({ tema: tema.id, titulo: item.titulo, motivo: "sem área de preview" });
      continue;
    }

    await alvo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);

    const dirPng = path.join(SAIDA, tema.id, "png", pasta);
    const dirSvg = path.join(SAIDA, tema.id, "svg", pasta);
    await fsp.mkdir(dirPng, { recursive: true });
    await fsp.mkdir(dirSvg, { recursive: true });

    const caixa = await alvo.boundingBox();

    // PNG — raster fiel, em 3x.
    try {
      await alvo.screenshot({ path: path.join(dirPng, `${nome}.png`), animations: "disabled" });
    } catch (erro) {
      falhas.push({ tema: tema.id, titulo: item.titulo, motivo: `png: ${erro.message}` });
    }

    // SVG — vetor real (retângulos, textos e imagens embutidas em data URI).
    try {
      const bruto = await page.evaluate(async (indice) => {
        const raiz = document.querySelectorAll("[data-ds-showcase]")[indice];
        const el = raiz.querySelector("[data-ds-preview]");
        const fundo = getComputedStyle(el).backgroundColor;
        const doc = window.DomToSvg.elementToSVG(el);
        await window.DomToSvg.inlineResources(doc.documentElement);
        return { svg: new XMLSerializer().serializeToString(doc), fundo };
      }, item.indice);

      const svg = finalizarSvg(bruto.svg, {
        fundo: bruto.fundo && bruto.fundo !== "rgba(0, 0, 0, 0)" ? bruto.fundo : tema.id === "escuro" ? "rgb(10,10,10)" : "rgb(255,255,255)",
        titulo,
        descricao: item.descricao,
        tema: tema.id,
      });
      // Um SVG é XML: qualquer caractere solto derruba o parser e o arquivo
      // abre em branco. Vale conferir antes de gravar.
      const erroXml = await page.evaluate((texto) => {
        const doc = new DOMParser().parseFromString(texto, "image/svg+xml");
        return doc.querySelector("parsererror")?.textContent?.slice(0, 160) ?? null;
      }, svg);
      if (erroXml) throw new Error(`XML inválido — ${erroXml}`);

      await fsp.writeFile(path.join(dirSvg, `${nome}.svg`), svg, "utf8");
    } catch (erro) {
      falhas.push({ tema: tema.id, titulo: item.titulo, motivo: `svg: ${erro.message}` });
    }

    const chave = `${pasta}/${nome}`;
    const registro = catalogo.get(chave) ?? {
      nome: titulo,
      arquivo: nome,
      descricao: item.descricao || undefined,
      categoria,
      categoriaLabel: categorias.get(categoria) ?? categoria,
      secao: secao.label,
      secaoId: item.secaoId,
      ancora: `/design-system#${item.secaoId}`,
      ordem: item.indice,
      arquivos: {},
    };
    registro.arquivos[tema.id] = {
      png: `${tema.id}/png/${pasta}/${nome}.png`,
      svg: `${tema.id}/svg/${pasta}/${nome}.svg`,
    };
    if (caixa) registro.dimensoes = { largura: Math.round(caixa.width), altura: Math.round(caixa.height) };
    catalogo.set(chave, registro);

    process.stdout.write(`  · ${pasta}/${nome}\n`);
  }

  await ctx.close();
}

await browser.close();
servidor.close();

// ---------------------------------------------------------------------------
// Índice: catalogo.json + README.md
// ---------------------------------------------------------------------------

const registros = [...catalogo.values()].sort((a, b) => a.ordem - b.ordem);

await fsp.writeFile(
  path.join(SAIDA, "catalogo.json"),
  JSON.stringify(
    {
      gerado_por: "scripts/exportar-catalogo-design-system.mjs",
      origem: "/design-system",
      temas: TEMAS.map((t) => t.id),
      formatos: ["svg", "png"],
      escala_png: ESCALA_PNG,
      largura_viewport: LARGURA_VIEWPORT,
      total: registros.length,
      componentes: registros,
    },
    null,
    2
  ) + "\n",
  "utf8"
);

const porCategoria = new Map();
for (const r of registros) {
  if (!porCategoria.has(r.categoria)) porCategoria.set(r.categoria, new Map());
  const porSecao = porCategoria.get(r.categoria);
  if (!porSecao.has(r.secao)) porSecao.set(r.secao, []);
  porSecao.get(r.secao).push(r);
}

const totalArquivos = registros.reduce(
  (n, r) => n + Object.values(r.arquivos).reduce((m, a) => m + Object.keys(a).length, 0),
  0
);

const linhas = [];
linhas.push("# Catálogo do Design System — AUVP");
linhas.push("");
linhas.push(
  `Todos os componentes do Design System exportados **um a um**, nos temas **claro** e **escuro**, em **SVG** (vetor) e **PNG** (${ESCALA_PNG}× — alta resolução).`
);
linhas.push("");
linhas.push("As imagens contêm **só o componente**, sobre o fundo do tema. Nada da interface do Design System em si — nem cabeçalho da página, nem barra lateral, nem o cartão de pré-visualização com o título e o botão de código.");
linhas.push("");
linhas.push(`**${registros.length} componentes** · ${totalArquivos} arquivos · gerado a partir de \`/design-system\`.`);
linhas.push("");
linhas.push("## Como a pasta está organizada");
linhas.push("");
linhas.push("```");
linhas.push("catalogo-design-system/");
linhas.push("├── catalogo.json   # índice legível por máquina (nome, categoria, seção, âncora, dimensões)");
linhas.push("├── claro/");
linhas.push("│   ├── svg/<categoria>/<seção>/<componente>.svg");
linhas.push("│   └── png/<categoria>/<seção>/<componente>.png");
linhas.push("└── escuro/");
linhas.push("    ├── svg/<categoria>/<seção>/<componente>.svg");
linhas.push("    └── png/<categoria>/<seção>/<componente>.png");
linhas.push("```");
linhas.push("");
linhas.push("O caminho reproduz a navegação de `/design-system`: **categoria › seção › componente**. O nome do arquivo é o nome do componente no Design System, sem acento e em minúsculas — por isso variantes homônimas de componentes diferentes (`livro/default` e `checkbox/default`) não se confundem.");
linhas.push("");
linhas.push("## Notas sobre os formatos");
linhas.push("");
linhas.push("- **SVG** — vetor de verdade: cada caixa vira `<rect>`, cada texto vira `<text>` e as imagens entram embutidas em data URI. Escala sem perda e dá para inspecionar ou editar. As larguras de texto são fixadas com `textLength`, então o layout se mantém mesmo sem as fontes da marca instaladas; abrindo o arquivo no navegador, as fontes vêm do Google Fonts via `@import`. Cada arquivo traz `<title>` e `<desc>` com o nome e a descrição do componente.");
linhas.push(`- **PNG** — captura fiel do componente renderizado, em ${ESCALA_PNG}× (viewport de ${LARGURA_VIEWPORT}px). É a referência pixel-perfect, inclusive de sombras, gradientes e desfoques.`);
linhas.push("");
linhas.push("## Como regerar");
linhas.push("");
linhas.push("```bash");
linhas.push("npm install --no-save playwright dom-to-svg");
linhas.push("npm run build");
linhas.push("node scripts/exportar-catalogo-design-system.mjs");
linhas.push("```");
linhas.push("");
linhas.push("O script abre `/design-system` num Chromium headless e captura tudo que estiver marcado com `data-ds-showcase` — ou seja, todo `<ComponentShowcase>` e todo `<SectionThemeToggle>`. Componente novo no Design System entra no catálogo sozinho, sem mexer no script.");
linhas.push("");
linhas.push("## Índice");
linhas.push("");

for (const [categoria, porSecao] of porCategoria) {
  linhas.push(`### ${categorias.get(categoria) ?? categoria}`);
  linhas.push("");
  linhas.push("| Seção | Componente | Claro | Escuro |");
  linhas.push("| --- | --- | --- | --- |");
  for (const [secao, itens] of porSecao) {
    itens.forEach((r, i) => {
      const link = (a) => (a ? `[SVG](${encodeURI(a.svg)}) · [PNG](${encodeURI(a.png)})` : "—");
      const rotuloSecao = i === 0 ? `[${secao}](https://produtosauvp.github.io/central/design-system#${r.secaoId})` : "";
      linhas.push(`| ${rotuloSecao} | **${r.nome}** | ${link(r.arquivos.claro)} | ${link(r.arquivos.escuro)} |`);
    });
  }
  linhas.push("");
}

await fsp.writeFile(path.join(SAIDA, "README.md"), linhas.join("\n"), "utf8");

console.log(`\n✓ ${registros.length} componentes exportados em ${path.relative(RAIZ, SAIDA)}/`);
if (falhas.length) {
  console.log(`\n⚠ ${falhas.length} falhas:`);
  for (const f of falhas) console.log(`  - [${f.tema}] ${f.titulo}: ${f.motivo}`);
}
