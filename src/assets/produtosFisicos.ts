/**
 * Fotos dos produtos físicos AUVP (brindes, kits e materiais de marca).
 * Versões otimizadas (WebP, 900×1200 — 3:4, a proporção nativa dos mockups)
 * geradas a partir dos mockups tratados em `PRODUTOS FÍSICOS TRATADOS/`.
 * Todas têm o mesmo formato para que a foto preencha o card inteiro, sem
 * faixa de fundo sobrando. As chaves correspondem ao `slug` de cada item em
 * `src/data/produtosFisicos.ts`.
 *
 * Produtos com dois lados (a caneca AUPO11, por exemplo) registram a segunda
 * foto na chave `<slug>-verso` — é por ela que o card acha o verso e liga a
 * virada no hover.
 */
import agendaAuvp from "./produtos-fisicos/agenda-auvp.webp?url";
import boneCapitalismo from "./produtos-fisicos/bone-capitalismo.webp?url";
import bourbonAuvp from "./produtos-fisicos/bourbon-auvp.webp?url";
import canecaAupo11 from "./produtos-fisicos/caneca-aupo11.webp?url";
import canecaAupo11Verso from "./produtos-fisicos/caneca-aupo11-verso.webp?url";
import canecaAuvpDourada from "./produtos-fisicos/caneca-auvp-dourada.webp?url";
import canecaPorcelana from "./produtos-fisicos/caneca-porcelana.webp?url";
import caniveteAgro from "./produtos-fisicos/canivete-agro.webp?url";
import ecobag from "./produtos-fisicos/ecobag.webp?url";
import garrafaOlho from "./produtos-fisicos/garrafa-olho.webp?url";
import meiaSardinha from "./produtos-fisicos/meia-sardinha.webp?url";
import portaCartaoPreto from "./produtos-fisicos/porta-cartao-preto.webp?url";
import velaAromatica from "./produtos-fisicos/vela-aromatica.webp?url";

export const produtosFisicosFotos: Record<string, string> = {
  "agenda-auvp": agendaAuvp,
  "bone-capitalismo": boneCapitalismo,
  "bourbon-auvp": bourbonAuvp,
  "caneca-aupo11": canecaAupo11,
  "caneca-aupo11-verso": canecaAupo11Verso,
  "caneca-auvp-dourada": canecaAuvpDourada,
  "caneca-porcelana": canecaPorcelana,
  "canivete-agro": caniveteAgro,
  ecobag,
  "garrafa-olho": garrafaOlho,
  "meia-sardinha": meiaSardinha,
  "porta-cartao-preto": portaCartaoPreto,
  "vela-aromatica": velaAromatica,
};
