import type React from "react";
import {
  Home, GraduationCap, Wallet, LayoutGrid, MessageCircle, Video,
  Route, Layers, Award, PiggyBank, ArrowUpRight, Target,
  BarChart3, LineChart, BookOpen, Calculator, FlaskConical, FileText,
} from "lucide-react";

/**
 * Navegação de exemplo do catálogo de menus
 * -----------------------------------------
 * Os doze modelos de menu (`MenusSuperiores` e `MenusLaterais`) usam ESTA
 * lista, e só ela. O catálogo existe para comparar formas de navegar, não
 * conteúdos: com os mesmos destinos em todos os modelos, a diferença que
 * sobra na tela é exatamente a decisão de design que a liderança precisa
 * tomar. Trocar um rótulo aqui troca em todos os doze de uma vez.
 *
 * A hierarquia é a mesma para todo mundo — o que muda é quanto dela cada
 * modelo consegue mostrar: os planos usam só o primeiro nível, os mega
 * menus e o drawer abrem os filhos, e a árvore mostra grupo + item + filho.
 */

export type SubItemMenu = {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
};

export type ItemMenu = {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  /** Badge de contagem — usado pelos modelos que comportam status. */
  contador?: string;
  filhos?: SubItemMenu[];
};

export const MENU_AUVP: ItemMenu[] = [
  {
    id: "inicio",
    label: "Início",
    desc: "Visão geral da sua conta e dos próximos passos",
    icon: Home,
  },
  {
    id: "aulas",
    label: "Aulas",
    desc: "Trilhas, módulos e certificados da AUVP Escola",
    icon: GraduationCap,
    contador: "12",
    filhos: [
      { id: "trilhas", label: "Trilhas", desc: "O caminho recomendado do início ao fim.", icon: Route },
      { id: "modulos", label: "Módulos", desc: "Todo o conteúdo por tema.", icon: Layers },
      { id: "certificados", label: "Certificados", desc: "O que você já concluiu.", icon: Award },
    ],
  },
  {
    id: "financas",
    label: "Minhas Finanças",
    desc: "Patrimônio, aportes e metas acompanhados de perto",
    icon: Wallet,
    filhos: [
      { id: "patrimonio", label: "Patrimônio", desc: "Onde o seu dinheiro está hoje.", icon: PiggyBank },
      { id: "aportes", label: "Aportes", desc: "Histórico e próximos movimentos.", icon: ArrowUpRight },
      { id: "metas", label: "Metas", desc: "Objetivos e quanto falta para cada um.", icon: Target },
    ],
  },
  {
    id: "ferramentas",
    label: "Ferramentas",
    desc: "Analítica, PIAR, dicionário e calculadoras",
    icon: LayoutGrid,
    filhos: [
      { id: "analitica", label: "Analítica", desc: "Indicadores e comparações de ativos.", icon: BarChart3 },
      { id: "piar", label: "PIAR", desc: "O seu perfil de investidor na prática.", icon: LineChart },
      { id: "dicionario", label: "Dicionário", desc: "O mercado explicado em português.", icon: BookOpen },
      { id: "calculadoras", label: "Calculadoras", desc: "Rendimentos, câmbio e juros compostos.", icon: Calculator },
      { id: "simuladores", label: "Simuladores", desc: "Cenários antes de decidir.", icon: FlaskConical },
      { id: "relatorios", label: "Relatórios", desc: "Exportações da sua carteira.", icon: FileText },
    ],
  },
  {
    id: "comunidade",
    label: "Comunidade",
    desc: "Fórum de dúvidas e conversas com o time",
    icon: MessageCircle,
    contador: "3",
  },
  {
    id: "lives",
    label: "Lives",
    desc: "Agenda e histórico das transmissões",
    icon: Video,
  },
];

/** Agrupamento usado pelos modelos que organizam a lista em blocos. */
export const GRUPOS_MENU_AUVP: Array<{ titulo: string; ids: string[] }> = [
  { titulo: "Plataforma", ids: ["inicio", "aulas", "financas"] },
  { titulo: "Recursos", ids: ["ferramentas", "comunidade", "lives"] },
];

/**
 * Produtos do ecossistema — usados pelo modelo de portal em duas linhas.
 * Cada produto pinta a faixa superior com a sua cor e expõe um recorte da
 * MESMA lista de destinos: trocar de produto troca o que está disponível,
 * sem inventar itens que não existem no catálogo.
 *
 * As cores vão em HSL literal (e não em classe Tailwind) porque a faixa
 * precisa ser a cor da marca em qualquer tema — as travas de contraste de
 * `.dark` no index.css reescreveriam uma classe de paleta.
 */
export const PRODUTOS_MENU_AUVP = [
  {
    id: "capital",
    label: "AUVP Capital",
    fundo: "155 93% 11%",
    texto: "0 0% 100%",
    itens: ["inicio", "financas", "ferramentas", "lives"],
  },
  {
    id: "escola",
    label: "AUVP Escola",
    fundo: "42 84% 63%",
    texto: "155 93% 11%",
    itens: ["inicio", "aulas", "ferramentas", "comunidade"],
  },
  {
    id: "comunidade",
    label: "AUVP Comunidade",
    fundo: "214 84% 32%",
    texto: "0 0% 100%",
    itens: ["inicio", "comunidade", "lives"],
  },
] as const;

/** Links secundários — barra de utilitários, coluna editorial e rodapés. */
export const UTILITARIOS_MENU_AUVP = [
  "Central de ajuda",
  "Código de Ética",
  "Fale com o time",
];

/** O item que abre por padrão nos modelos com painel, para comparar igual. */
export const ITEM_PADRAO_MENU = "ferramentas";

export const itemMenu = (id: string): ItemMenu =>
  MENU_AUVP.find((i) => i.id === id)!;

export const gruposComItens = () =>
  GRUPOS_MENU_AUVP.map((g) => ({ titulo: g.titulo, itens: g.ids.map(itemMenu) }));
