/**
 * Fotos dos produtos físicos AUVP (brindes, kits e materiais de marca).
 * Versões otimizadas (WebP, quadrado de 900px) geradas a partir dos mockups
 * tratados em `PRODUTOS FÍSICOS TRATADOS/`, com o fundo do estúdio estendido
 * até fechar o quadrado — assim todos os cards do catálogo têm o mesmo
 * enquadramento. As chaves correspondem ao `slug` de cada item em
 * `src/data/produtosFisicos.ts`.
 */
import agendaAuvp from "./produtos-fisicos/agenda-auvp.webp?url";
import boneCapitalismo from "./produtos-fisicos/bone-capitalismo.webp?url";
import bourbonAuvp from "./produtos-fisicos/bourbon-auvp.webp?url";
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
  "caneca-auvp-dourada": canecaAuvpDourada,
  "caneca-porcelana": canecaPorcelana,
  "canivete-agro": caniveteAgro,
  ecobag,
  "garrafa-olho": garrafaOlho,
  "meia-sardinha": meiaSardinha,
  "porta-cartao-preto": portaCartaoPreto,
  "vela-aromatica": velaAromatica,
};
