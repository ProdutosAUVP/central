/**
 * Fotos dos colaboradores do time de Produto e CX.
 * Importadas como URLs via Vite. As chaves correspondem aos ids em `orgPeople`.
 * Quem não tiver foto aqui cai no placeholder padrão.
 */
import raul from "./team/raul.jpg?url";
import beatriz from "./team/beatriz.jpg?url";
import lilian from "./team/lilian.jpg?url";
import debora from "./team/debora.jpeg?url";
import daniel from "./team/daniel.jpg?url";
import ariadne from "./team/ariadne.png?url";
import armando from "./team/armando.png?url";
import eria from "./team/eria.png?url";
import mateus from "./team/mateus.jpg?url";
import jeniffer from "./team/jeniffer.jpeg?url";
import elane from "./team/elane.jpg?url";
import ana from "./team/ana.jpg?url";
import hiago from "./team/hiago.png?url";

import raulCareca from "./team/careca/raul.webp?url";
import beatrizCareca from "./team/careca/beatriz.webp?url";
import lilianCareca from "./team/careca/lilian.webp?url";
import deboraCareca from "./team/careca/debora.webp?url";
import danielCareca from "./team/careca/daniel.webp?url";
import ariadneCareca from "./team/careca/ariadne.webp?url";
import armandoCareca from "./team/careca/armando.webp?url";
import eriaCareca from "./team/careca/eria.webp?url";
import mateusCareca from "./team/careca/mateus.webp?url";
import jenifferCareca from "./team/careca/jeniffer.webp?url";
import elaneCareca from "./team/careca/elane.webp?url";
import anaCareca from "./team/careca/ana.webp?url";
import hiagoCareca from "./team/careca/hiago.webp?url";

export const teamPhotos: Record<string, string> = {
  raul,
  beatriz,
  lilian,
  debora,
  daniel,
  ariadne,
  armando,
  eria,
  mateus,
  jeniffer,
  elane,
  ana,
  hiago,
};

/**
 * Versões careca das fotos — easter egg do "Modo Megabrain" (ou modo
 * Ricardo), ativado digitando "megabrain" em qualquer página. Quem não
 * tiver versão careca cai na foto normal.
 */
export const teamPhotosCareca: Record<string, string> = {
  raul: raulCareca,
  beatriz: beatrizCareca,
  lilian: lilianCareca,
  debora: deboraCareca,
  daniel: danielCareca,
  ariadne: ariadneCareca,
  armando: armandoCareca,
  eria: eriaCareca,
  mateus: mateusCareca,
  jeniffer: jenifferCareca,
  elane: elaneCareca,
  ana: anaCareca,
  hiago: hiagoCareca,
};
