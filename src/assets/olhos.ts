/**
 * Olhos AUVP — importados diretamente como módulos Vite.
 *
 * Usar `?url`  → Vite resolve o caminho correto no build (sem depender de
 *                paths absolutos que quebram no GitHub Pages).
 * Usar `?raw`  → string do SVG para gerar Blob no download (sem fetch).
 *
 * Uso nos componentes:
 *   import { olhoBranco, olhoPreto, olhoAmarelo } from "@/assets/olhos";
 *   <img src={olhoBranco.url} />
 *   downloadSvgBlob(olhoBranco.raw, "olho-branco");
 */

import olhoBrancoUrl  from "./olho-branco.svg?url";
import olhoBrancoRaw  from "./olho-branco.svg?raw";
import olhoPretUrl    from "./olho-preto.svg?url";
import olhoPretRaw    from "./olho-preto.svg?raw";
import olhoAmareloUrl from "./olho-amarelo.svg?url";
import olhoAmareloRaw from "./olho-amarelo.svg?raw";

export const olhoBranco  = { url: olhoBrancoUrl,  raw: olhoBrancoRaw  };
export const olhoPreto   = { url: olhoPretUrl,    raw: olhoPretRaw    };
export const olhoAmarelo = { url: olhoAmareloUrl, raw: olhoAmareloRaw };

/** Faz o download de um SVG diretamente da string (sem fetch de URL). */
export function downloadSvgBlob(svgRaw: string, filename: string): void {
  const blob    = new Blob([svgRaw], { type: "image/svg+xml;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const a       = document.createElement("a");
  a.href        = blobUrl;
  a.download    = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

/** Renderiza um SVG (via string) num canvas e faz download como PNG 4×. */
export function downloadPngFromSvg(svgRaw: string, filename: string): void {
  const blob = new Blob([svgRaw], { type: "image/svg+xml;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const img  = new Image();
  img.onload = () => {
    const scale  = 4;
    const canvas = document.createElement("canvas");
    canvas.width  = (img.naturalWidth  || 400) * scale;
    canvas.height = (img.naturalHeight || 250) * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) { URL.revokeObjectURL(url); return; }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    canvas.toBlob((pngBlob) => {
      if (!pngBlob) return;
      const pngUrl = URL.createObjectURL(pngBlob);
      const a      = document.createElement("a");
      a.href       = pngUrl;
      a.download   = `${filename}.png`;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };
  img.src = url;
}

// ─── .ico ─────────────────────────────────────────────────────────────────
// O formato ICO moderno aceita imagens PNG embutidas (um PNG por tamanho),
// suportado pelo Windows e pelos navegadores. Geramos um PNG quadrado por
// tamanho a partir do SVG e empacotamos tudo num único arquivo .ico.

const ICO_SIZES = [16, 32, 48, 64, 128, 256];

function loadImageFromSvg(svgRaw: string): Promise<{ img: HTMLImageElement; revoke: () => void }> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgRaw], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => resolve({ img, revoke: () => URL.revokeObjectURL(url) });
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Falha ao carregar SVG")); };
    img.src = url;
  });
}

function renderSquarePng(img: HTMLImageElement, size: number): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) { reject(new Error("Canvas indisponível")); return; }
    const naturalW = img.naturalWidth || size;
    const naturalH = img.naturalHeight || size;
    const scale = Math.min(size / naturalW, size / naturalH);
    const w = naturalW * scale;
    const h = naturalH * scale;
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    canvas.toBlob((pngBlob) => {
      if (!pngBlob) { reject(new Error("Falha ao gerar PNG")); return; }
      pngBlob.arrayBuffer().then(resolve).catch(reject);
    }, "image/png");
  });
}

/** Empacota uma lista de PNGs (um por tamanho) num arquivo .ico (formato PNG-in-ICO). */
function buildIco(images: { size: number; data: ArrayBuffer }[]): Blob {
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * images.length;
  const totalSize = dirSize + images.reduce((sum, i) => sum + i.data.byteLength, 0);

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, images.length, true);

  let offset = dirSize;
  images.forEach((image, i) => {
    const entryOffset = headerSize + entrySize * i;
    const dim = image.size >= 256 ? 0 : image.size;
    bytes[entryOffset] = dim;
    bytes[entryOffset + 1] = dim;
    bytes[entryOffset + 2] = 0;
    bytes[entryOffset + 3] = 0;
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, image.data.byteLength, true);
    view.setUint32(entryOffset + 12, offset, true);

    bytes.set(new Uint8Array(image.data), offset);
    offset += image.data.byteLength;
  });

  return new Blob([buffer], { type: "image/x-icon" });
}

async function svgRawToIcoBlob(svgRaw: string): Promise<Blob> {
  const { img, revoke } = await loadImageFromSvg(svgRaw);
  try {
    const images = await Promise.all(
      ICO_SIZES.map(async (size) => ({ size, data: await renderSquarePng(img, size) }))
    );
    return buildIco(images);
  } finally {
    revoke();
  }
}

/** Gera um .ico (múltiplos tamanhos, PNG embutido) a partir de um SVG (string) e baixa. */
export async function downloadIcoFromSvg(svgRaw: string, filename: string): Promise<void> {
  try {
    const icoBlob = await svgRawToIcoBlob(svgRaw);
    const icoUrl = URL.createObjectURL(icoBlob);
    const a = document.createElement("a");
    a.href = icoUrl;
    a.download = `${filename}.ico`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(icoUrl);
  } catch {
    console.error("Erro ao gerar ICO");
  }
}

/** Baixa um SVG remoto (fetch) como .ico. */
export async function downloadIcoFetch(src: string, filename: string): Promise<void> {
  try {
    const resp = await fetch(src);
    const svgRaw = await resp.text();
    await downloadIcoFromSvg(svgRaw, filename);
  } catch {
    console.error("Erro ao gerar ICO");
  }
}
