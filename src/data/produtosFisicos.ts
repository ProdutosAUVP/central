import type { TagTone } from "@/components/widgets/Tag";
import { produtosFisicosFotos } from "@/assets/produtosFisicos";

/**
 * Catálogo dos produtos físicos AUVP — brindes, kits e materiais de marca que
 * o time de Produto planeja, desenha e produz.
 *
 * As fotos são as originais do acervo (`docs/fotos-originais/produtos-fisicos/`),
 * ainda sem tratamento de estúdio, otimizadas para WebP em `src/assets/produtos-fisicos/`.
 * Ao substituir por fotos tratadas, basta trocar o arquivo mantendo o mesmo slug.
 */

export type CategoriaProdutoFisico =
  | "Papelaria"
  | "Drinkware"
  | "Vestuário"
  | "Acessórios"
  | "Bebidas"
  | "Casa & mesa"
  | "Sacolas & caixas"
  | "Premiação";

export interface ProdutoFisico {
  /** Slug do arquivo em `src/assets/produtos-fisicos/` — também serve de key. */
  slug: string;
  nome: string;
  categoria: CategoriaProdutoFisico;
  desc: string;
  /** URL da foto otimizada, resolvida a partir do slug. */
  img: string;
}

/** Cor da tag de cada categoria — tokens do Design System (ver Tag.tsx). */
export const categoriaTone: Record<CategoriaProdutoFisico, TagTone> = {
  "Papelaria": "blue",
  "Drinkware": "green",
  "Vestuário": "magenta",
  "Acessórios": "violet",
  "Bebidas": "amber",
  "Casa & mesa": "olive",
  "Sacolas & caixas": "graphite",
  "Premiação": "brick",
};

/** Ordem curada: os itens mais icônicos primeiro (a Home mostra os 8 iniciais). */
const catalogo: Omit<ProdutoFisico, "img">[] = [
  {
    slug: "caderneta-olho",
    nome: "Caderneta AUVP (olho dourado)",
    categoria: "Papelaria",
    desc: "Caderneta tipo Moleskine, capa preta com o olho AUVP em dourado e elástico de fechamento.",
  },
  {
    slug: "caneca-porcelana",
    nome: "Caneca de porcelana AUVP",
    categoria: "Drinkware",
    desc: "Caneca preta com o lembrete que virou lema: “Coma, durma, aporte, pare de reclamar.”",
  },
  {
    slug: "meia-sardinha",
    nome: "Meia Investidor Sardinha",
    categoria: "Vestuário",
    desc: "Meia vermelha com o símbolo do Investidor Sardinha bordado no cano.",
  },
  {
    slug: "garrafa-olho",
    nome: "Garrafa térmica AUVP",
    categoria: "Drinkware",
    desc: "Garrafa térmica preta fosca com o olho AUVP aplicado em dourado.",
  },
  {
    slug: "bone-capitalismo",
    nome: "Boné “O capitalismo é simplesmente maravilhoso”",
    categoria: "Vestuário",
    desc: "Boné vermelho com patch bordado circular — um dos brindes mais pedidos da comunidade.",
  },
  {
    slug: "carteira-couro",
    nome: "Carteira AUVP",
    categoria: "Acessórios",
    desc: "Carteira de couro preto com a marca AUVP gravada em baixo relevo.",
  },
  {
    slug: "cachaca-sardinha",
    nome: "Cachaça Investidor Sardinha",
    categoria: "Bebidas",
    desc: "Garrafa de 750 ml em edição especial numerada, com rótulo “Cachaça na Confiança”.",
  },
  {
    slug: "ecobag",
    nome: "Ecobag “Bolsa? Só a de valores”",
    categoria: "Sacolas & caixas",
    desc: "Sacola de algodão preta com estampa em silk e trocadilho da casa.",
  },
  {
    slug: "agenda-auvp",
    nome: "Agenda AUVP",
    categoria: "Papelaria",
    desc: "Agenda preta com elástico e a frase “Projetar futuro. Realizar com consistência.”",
  },
  {
    slug: "caderneta-ondas",
    nome: "Caderneta AUVP (ondas)",
    categoria: "Papelaria",
    desc: "Versão da caderneta com ondas concêntricas douradas ao redor do olho.",
  },
  {
    slug: "livro-seis-licoes",
    nome: "Livro “As Seis Lições”",
    categoria: "Papelaria",
    desc: "Clássico de Ludwig von Mises (LVM Editora), presente recorrente para membros e time.",
  },
  {
    slug: "porta-pin",
    nome: "Porta pin AUVP",
    categoria: "Papelaria",
    desc: "Cartão de apresentação do pin: “Exclusivo para quem faz história com a AUVP.”",
  },
  {
    slug: "caneca-sardinha",
    nome: "Caneca Investidor Sardinha",
    categoria: "Drinkware",
    desc: "Caneca preta com grafismo dourado de ondas concêntricas em volta do olho.",
  },
  {
    slug: "caneca-verde",
    nome: "Caneca térmica AUVP Capital",
    categoria: "Drinkware",
    desc: "Caneca de inox verde com alça e a marca AUVP Capital gravada a laser.",
  },
  {
    slug: "garrafa-inox",
    nome: "Garrafa térmica AUVP (tampa inox)",
    categoria: "Drinkware",
    desc: "Versão da garrafa com tampa em inox escovado e marca aplicada em branco.",
  },
  {
    slug: "bourbon-auvp",
    nome: "Bourbon AUVP “Punch Me Up”",
    categoria: "Bebidas",
    desc: "Garrafa de bourbon com rótulo autoral, feita para as ativações e eventos.",
  },
  {
    slug: "broche-sardinha",
    nome: "Broche Investidor Sardinha",
    categoria: "Acessórios",
    desc: "Broche esmaltado vermelho com acabamento dourado e o símbolo do Investidor Sardinha.",
  },
  {
    slug: "pin-auvp",
    nome: "Pin AUVP",
    categoria: "Acessórios",
    desc: "Pin metálico dourado no formato do olho AUVP.",
  },
  {
    slug: "porta-cartao-marrom",
    nome: "Porta-cartão AUVP caramelo",
    categoria: "Acessórios",
    desc: "Porta-cartão de couro caramelo, costura aparente e olho AUVP gravado.",
  },
  {
    slug: "porta-cartao-preto-slim",
    nome: "Porta-cartão AUVP preto (slim)",
    categoria: "Acessórios",
    desc: "Modelo slim em couro preto, com quatro compartimentos e marca em baixo relevo.",
  },
  {
    slug: "porta-cartao-preto",
    nome: "Porta-cartão AUVP preto (dobrável)",
    categoria: "Acessórios",
    desc: "Modelo dobrável em couro preto com o olho AUVP gravado na capa.",
  },
  {
    slug: "canivete-agro",
    nome: "Canivete AUVP Agro",
    categoria: "Acessórios",
    desc: "Canivete com cabo de madeira e gravação AUVP Agro, entregue em caixa kraft.",
  },
  {
    slug: "kit-saleiro",
    nome: "Kit saleiro AUVP Capital",
    categoria: "Casa & mesa",
    desc: "Lata de flor de sal com a marca AUVP Capital, apresentada em caixa rígida preta.",
  },
  {
    slug: "vela-aromatica",
    nome: "Vela aromática AUVP",
    categoria: "Casa & mesa",
    desc: "Vela de flor de laranjeira em pote de vidro com tampa dourada.",
  },
  {
    slug: "meia-capital",
    nome: "Meia AUVP Capital",
    categoria: "Vestuário",
    desc: "Meia verde com o olho AUVP Capital bordado em branco.",
  },
  {
    slug: "sacola-verde",
    nome: "Sacola AUVP Capital",
    categoria: "Sacolas & caixas",
    desc: "Sacola rígida verde com alça vazada e marca AUVP Capital em dourado.",
  },
  {
    slug: "caixa-cartonada",
    nome: "Caixa AUVP",
    categoria: "Sacolas & caixas",
    desc: "Caixa cartonada preta com o olho AUVP em hot stamping dourado.",
  },
  {
    slug: "caixa-mdf",
    nome: "Caixa AUVP em MDF",
    categoria: "Sacolas & caixas",
    desc: "Caixa preta de MDF com o símbolo aplicado em vermelho, usada nos kits maiores.",
  },
  {
    slug: "placa-dns",
    nome: "Placa DNS — 1 milhão investido",
    categoria: "Premiação",
    desc: "Premiação de quem alcança R$ 1 milhão investido; na foto, o estojo rígido com a marca em dourado.",
  },
];

export const produtosFisicos: ProdutoFisico[] = catalogo.map((p) => ({
  ...p,
  img: produtosFisicosFotos[p.slug],
}));

/** Categorias na ordem em que aparecem no catálogo — usada nos filtros. */
export const categoriasProdutosFisicos = Array.from(
  new Set(produtosFisicos.map((p) => p.categoria))
) as CategoriaProdutoFisico[];
