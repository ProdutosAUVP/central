import type { LucideIcon } from "lucide-react";
import { Boxes, CupSoda, Gem, Home, NotebookPen, Shirt, Wine } from "lucide-react";
import type { TagTone } from "@/components/widgets/Tag";
import { produtosFisicosFotos } from "@/assets/produtosFisicos";

/**
 * Catálogo dos produtos físicos AUVP — brindes, kits e materiais de marca que
 * o time de Produto planeja, desenha e produz.
 *
 * A lista espelha os mockups tratados em `PRODUTOS FÍSICOS TRATADOS/`: cada
 * item aqui tem uma foto de estúdio correspondente. Para incluir um produto
 * novo, adicione o mockup à pasta, gere o WebP em
 * `src/assets/produtos-fisicos/` com o mesmo slug e registre o item abaixo.
 */

export type CategoriaProdutoFisico =
  | "Canecas e garrafas"
  | "Vestuário"
  | "Papelaria"
  | "Acessórios"
  | "Bebidas"
  | "Casa & mesa"
  | "Sacolas & caixas";

export interface ProdutoFisico {
  /** Slug do arquivo em `src/assets/produtos-fisicos/` — também serve de key. */
  slug: string;
  nome: string;
  categoria: CategoriaProdutoFisico;
  desc: string;
  /** URL da foto otimizada, resolvida a partir do slug. */
  img: string;
}

/** Identidade visual de cada categoria — tom do Design System + ícone. */
export const categoriaVisual: Record<
  CategoriaProdutoFisico,
  { tone: TagTone; icon: LucideIcon }
> = {
  "Canecas e garrafas": { tone: "green", icon: CupSoda },
  "Vestuário": { tone: "magenta", icon: Shirt },
  "Papelaria": { tone: "blue", icon: NotebookPen },
  "Acessórios": { tone: "violet", icon: Gem },
  "Bebidas": { tone: "amber", icon: Wine },
  "Casa & mesa": { tone: "olive", icon: Home },
  "Sacolas & caixas": { tone: "graphite", icon: Boxes },
};

/**
 * Ordem curada: os quatro primeiros são os mesmos, e na mesma ordem, do
 * destaque do Hub (`PRODUTOS_FISICOS_DESTAQUE`), para que "Todos os
 * produtos" comece do jeito que a Central já mostrou na home. O resto do
 * catálogo segue livre.
 */
const catalogo: Omit<ProdutoFisico, "img">[] = [
  {
    slug: "bourbon-auvp",
    nome: "Licor AUVP “Punch Me Up”",
    categoria: "Bebidas",
    desc: "Garrafa de 700 ml com rótulo autoral, feita para as ativações e eventos.",
  },
  {
    slug: "meia-sardinha",
    nome: "Meia Investidor Sardinha",
    categoria: "Vestuário",
    desc: "Meia vermelha com o símbolo do Investidor Sardinha no cano e recado bordado na ponta do pé.",
  },
  {
    slug: "bone-capitalismo",
    nome: "Boné “O capitalismo é simplesmente maravilhoso”",
    categoria: "Vestuário",
    desc: "Boné vermelho com patch bordado circular — um dos brindes mais pedidos da comunidade.",
  },
  {
    slug: "canivete-agro",
    nome: "Canivete AUVP Agro",
    categoria: "Acessórios",
    desc: "Canivete com cabo de madeira e gravação AUVP Agro, entregue em caixa kraft.",
  },
  {
    slug: "garrafa-olho",
    nome: "Garrafa térmica AUVP",
    categoria: "Canecas e garrafas",
    desc: "Garrafa térmica preta fosca com o olho AUVP aplicado em dourado.",
  },
  {
    slug: "caneca-auvp-dourada",
    nome: "Caneca AUVP II — grafismo dourado",
    categoria: "Canecas e garrafas",
    desc: "Caneca preta fosca com o grafismo de ondas concêntricas e o olho AUVP em dourado.",
  },
  {
    slug: "caneca-porcelana",
    nome: "Caneca AUVP I — “Coma, durma, aporte”",
    categoria: "Canecas e garrafas",
    desc: "Caneca de porcelana preta com o lembrete que virou lema: “Coma, durma, aporte, pare de reclamar.”",
  },
  {
    slug: "agenda-auvp",
    nome: "Agenda AUVP",
    categoria: "Papelaria",
    desc: "Agenda preta com elástico e a frase “Projetar futuro. Realizar com consistência.”",
  },
  {
    slug: "ecobag",
    nome: "Ecobag “Bolsa? Só a de valores”",
    categoria: "Sacolas & caixas",
    desc: "Sacola de algodão preta com estampa em silk e o trocadilho da casa.",
  },
  {
    slug: "porta-cartao-preto",
    nome: "Porta-cartão AUVP preto",
    categoria: "Acessórios",
    desc: "Porta-cartão dobrável em couro preto com a marca AUVP gravada em baixo relevo.",
  },
  {
    slug: "vela-aromatica",
    nome: "Vela aromática AUVP",
    categoria: "Casa & mesa",
    desc: "Vela de flor de laranjeira (193 g) em pote de vidro com tampa dourada.",
  },
];

export const produtosFisicos: ProdutoFisico[] = catalogo.map((p) => ({
  ...p,
  img: produtosFisicosFotos[p.slug],
}));

/**
 * Vitrine do Hub — os quatro produtos escolhidos a dedo para a home.
 * A seleção é por slug, e não pelos primeiros do catálogo, para reordenar
 * o catálogo sem mexer sem querer no que aparece na página inicial.
 */
export const PRODUTOS_FISICOS_DESTAQUE = [
  "bourbon-auvp",
  "meia-sardinha",
  "bone-capitalismo",
  "canivete-agro",
] as const;

/** Os produtos da vitrine, na ordem acima. */
export const produtosFisicosDestaque = PRODUTOS_FISICOS_DESTAQUE
  .map((slug) => produtosFisicos.find((p) => p.slug === slug))
  .filter((p): p is ProdutoFisico => Boolean(p));

/** Categorias na ordem em que aparecem no catálogo — usada nos filtros. */
export const categoriasProdutosFisicos = Array.from(
  new Set(produtosFisicos.map((p) => p.categoria))
) as CategoriaProdutoFisico[];

/** Quantos produtos cada categoria tem — mostrado nos filtros. */
export const contagemPorCategoria = produtosFisicos.reduce(
  (acc, p) => {
    acc[p.categoria] = (acc[p.categoria] ?? 0) + 1;
    return acc;
  },
  {} as Record<CategoriaProdutoFisico, number>
);
