/**
 * Artes próprias das entregas do Mural de Novidades.
 *
 * Diferente das screenshots de landing page (`src/assets/lps.ts`), que são
 * prints altos e recortados pelo topo, estas são capas em formato paisagem:
 * têm título centralizado e não podem ser cortadas nas laterais. Por isso o
 * carrossel do Hub as renderiza contidas (`object-contain`) sobre um fundo
 * desfocado da própria imagem, em vez de preencher o painel por corte.
 *
 * Geradas em WebP (largura máxima 960px) a partir dos originais em
 * `docs/fotos-originais/`. As chaves são as usadas em `destaque.imagem`
 * (`src/data/novidades.ts`).
 */
import moduloAnalitica from "./novidades/modulo-analitica.webp?url";
import moduloIndicadores from "./novidades/modulo-indicadores.webp?url";
import cadernoExercicios from "./novidades/caderno-exercicios.webp?url";
import minhaAuvp from "./novidades/minha-auvp.webp?url";
import escolaRegravada from "./novidades/escola-regravada.webp?url";

export const novidadeArtes: Record<string, string> = {
  "modulo-analitica": moduloAnalitica,
  "modulo-indicadores": moduloIndicadores,
  "caderno-exercicios": cadernoExercicios,
  "minha-auvp": minhaAuvp,
  "escola-regravada": escolaRegravada,
};
