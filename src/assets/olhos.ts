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
