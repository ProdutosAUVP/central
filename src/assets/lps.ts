/**
 * Screenshots das landing pages dos produtos digitais AUVP.
 * Versões otimizadas (WebP, 640px de largura, topo da página) geradas a partir
 * dos originais em `docs/fotos-originais/`. As chaves correspondem aos slugs
 * usados em `produtos` no Hub. Produtos sem screenshot caem no placeholder.
 */
import capital from "./lps/capital.webp?url";
import escola from "./lps/escola.webp?url";
import analitica from "./lps/analitica.webp?url";
import agro from "./lps/agro.webp?url";
import cambio from "./lps/cambio.webp?url";
import credito from "./lps/credito.webp?url";
import seguros from "./lps/seguros.webp?url";
import etfs from "./lps/etfs.webp?url";

export const lpScreenshots: Record<string, string> = {
  capital,
  escola,
  analitica,
  agro,
  cambio,
  credito,
  seguros,
  etfs,
};
