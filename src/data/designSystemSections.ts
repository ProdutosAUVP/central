import type React from "react";
import {
  Palette, Type, Square, Info, GraduationCap, DollarSign, Map, Bot,
  Download, Shapes, BookOpen, Video, ListOrdered, BarChart3, PenLine, Star, MessageCircle,
  Layout, Calculator, Clock, HelpCircle, Award, MessageSquare, Package,
  PieChart as PieChartIcon,
  Bell, ShieldAlert, Loader2, Layers, PanelRightOpen,
  ArrowLeftRight, FolderTree, UploadCloud, Star as StarIcon, Search,
  ListChecks, ToggleLeft, Anchor as AnchorIcon, AtSign, Columns3,
  Activity, GitCommit, ListTree, ClipboardList, Inbox as InboxIcon, CheckCircle2, Compass, Stamp,
  CalendarIcon, SquareCheck, Table as TableIcon,
  Zap, AppWindow, BellRing, ChevronRight as ChevronRightIcon,
  Tag as TagIcon, CircleUser,
} from "lucide-react";

export type SectionDef = {
  id: string;
  label: string;
  icon: React.ElementType;
  category: string;
};

export type SectionDefWithKeywords = SectionDef & { keywords?: string };

// IMPORTANTE: a ORDEM deste array deve corresponder à ordem em que as
// seções aparecem no JSX (DOM) de DesignSystem.tsx. O scroll-spy usa esta
// ordem para decidir o item ativo, evitando "saltos" quando categorias
// estão intercaladas no DOM. A command palette também consome esta lista.
export const sections: SectionDefWithKeywords[] = [
  // FUNDAMENTOS
  { id: "intro", label: "Introdução", icon: Info, category: "fundamentos", keywords: "início boas-vindas overview" },
  { id: "marca", label: "Marca & Logos", icon: Download, category: "fundamentos", keywords: "logo brand identidade download svg png" },
  { id: "typography", label: "Tipografia", icon: Type, category: "fundamentos", keywords: "fonte fontes texto sora roboto anek" },
  { id: "colors", label: "Cores", icon: Palette, category: "fundamentos", keywords: "paleta cor token hsl" },
  { id: "icons", label: "Ícones", icon: Shapes, category: "fundamentos", keywords: "iconografia phosphor svg" },
  { id: "elevation", label: "Sombras & Elevação", icon: Layers, category: "fundamentos", keywords: "sombra shadow elevação profundidade hover" },
  { id: "motion", label: "Motion & Animações", icon: Zap, category: "fundamentos", keywords: "animação transição duração easing movimento reduced-motion" },

  // LAYOUT & ESTRUTURA
  { id: "layout", label: "Layout & Espaçamento", icon: Layout, category: "layout", keywords: "grid spacing padding margin" },
  { id: "cards-containers", label: "Cards & Containers", icon: Package, category: "layout", keywords: "caixa box container card" },
  { id: "buttons", label: "Botões", icon: Square, category: "layout", keywords: "button cta ação click" },

  // SEÇÕES DE PÁGINA
  { id: "grade", label: "Grade Curricular", icon: GraduationCap, category: "secoes", keywords: "curso aula grade ementa" },
  { id: "countdown", label: "Contagem Regressiva", icon: Clock, category: "secoes", keywords: "countdown timer contagem" },
  { id: "faq", label: "Dropdown", icon: HelpCircle, category: "secoes", keywords: "faq dúvida pergunta accordion dropdown" },
  { id: "pricing", label: "Tabela de Preços", icon: DollarSign, category: "secoes", keywords: "preço plano pricing assinatura" },
  { id: "journey", label: "Jornada do Herói", icon: Map, category: "secoes", keywords: "jornada herói storytelling" },
  { id: "floaters", label: "Widgets Flutuantes", icon: MessageCircle, category: "secoes", keywords: "whatsapp flutuante float botão" },
  { id: "site-calc", label: "Calculadora de Rendimentos", icon: Calculator, category: "secoes", keywords: "calculadora rendimento simulação" },
  { id: "tool-calc", label: "Calculadora de Câmbio", icon: Calculator, category: "secoes", keywords: "calculadora câmbio cambio dólar euro conversão moeda" },

  // FEEDBACK & OVERLAYS
  { id: "tooltips", label: "Tooltips & Popups", icon: MessageSquare, category: "feedback", keywords: "tooltip popover hint dica" },
  { id: "notifications", label: "Notificações", icon: Bell, category: "feedback", keywords: "toast alert aviso" },
  { id: "popconfirm", label: "Popconfirm", icon: ShieldAlert, category: "feedback", keywords: "confirmação confirm dialog" },
  { id: "spin", label: "Spin (Loading)", icon: Loader2, category: "feedback", keywords: "loading carregando spinner" },
  { id: "skeleton-avancado", label: "Skeleton Avançado", icon: Layers, category: "feedback", keywords: "skeleton placeholder loading" },
  { id: "empty", label: "Empty (Vazio)", icon: InboxIcon, category: "feedback", keywords: "vazio nenhum nada empty state" },
  { id: "result", label: "Result", icon: CheckCircle2, category: "feedback", keywords: "resultado sucesso erro 404 403" },
  { id: "dialog", label: "Modal (Dialog)", icon: AppWindow, category: "feedback", keywords: "modal dialog janela sobreposição confirmação alert" },
  { id: "toast", label: "Toast", icon: BellRing, category: "feedback", keywords: "toast snackbar aviso mensagem temporária" },

  // NAVEGAÇÃO
  { id: "drawer-simples", label: "Drawer", icon: PanelRightOpen, category: "navegacao", keywords: "drawer painel lateral sheet" },
  { id: "drawer-multi", label: "Drawer Multi-nível", icon: PanelRightOpen, category: "navegacao", keywords: "drawer menu lateral nested" },
  { id: "steps", label: "Steps (Wizard)", icon: ListChecks, category: "navegacao", keywords: "wizard passos etapas stepper" },
  { id: "segmented", label: "Switch", icon: ToggleLeft, category: "navegacao", keywords: "segmented toggle aba switch" },
  { id: "tabs-geist", label: "Tabs", icon: Columns3, category: "navegacao", keywords: "tabs abas guia geist underline" },
  { id: "anchor", label: "Anchor (Scroll Spy)", icon: AnchorIcon, category: "navegacao", keywords: "scroll spy âncora navegação" },
  { id: "tour", label: "Tour", icon: Compass, category: "navegacao", keywords: "onboarding tour guia spotlight" },
  { id: "breadcrumb", label: "Breadcrumb", icon: ChevronRightIcon, category: "navegacao", keywords: "breadcrumb trilha caminho migalha navegação" },
  { id: "pagination", label: "Pagination", icon: ListOrdered, category: "navegacao", keywords: "paginação páginas anterior próxima lista" },

  // ENTRADA DE DADOS
  { id: "form-inputs", label: "Inputs & Formulários", icon: PenLine, category: "entrada", keywords: "input campo formulário texto textarea select radio slider label erro validação" },
  { id: "upload-preview", label: "Upload com Preview", icon: UploadCloud, category: "entrada", keywords: "upload arquivo file imagem" },
  { id: "calendar", label: "Calendário", icon: CalendarIcon, category: "entrada", keywords: "calendar calendário data date picker agenda intervalo período" },
  { id: "rate", label: "Rate (Avaliação)", icon: StarIcon, category: "entrada", keywords: "rating estrela nota avaliação" },
  { id: "mentions", label: "Mentions", icon: AtSign, category: "entrada", keywords: "menção @ usuário tag" },
  { id: "cascader", label: "Cascader", icon: Columns3, category: "entrada", keywords: "cascade hierárquico cascata" },
  { id: "tool-autocomplete", label: "AutoComplete", icon: Search, category: "entrada", keywords: "busca autocomplete sugestão input" },
  { id: "tool-treeselect", label: "TreeSelect", icon: FolderTree, category: "entrada", keywords: "select hierárquico árvore" },
  { id: "tool-transfer", label: "Transfer", icon: ArrowLeftRight, category: "entrada", keywords: "transfer lista shuttle" },
  { id: "checkbox", label: "Checkbox", icon: SquareCheck, category: "entrada", keywords: "checkbox seleção marcar opção" },
  { id: "choicebox", label: "Choicebox", icon: CheckCircle2, category: "entrada", keywords: "choicebox cartão opção radio plano" },

  // EXIBIÇÃO DE DADOS
  { id: "statistic", label: "Statistic (KPIs)", icon: Activity, category: "exibicao", keywords: "kpi métrica número estatística" },
  { id: "timeline", label: "Timeline", icon: GitCommit, category: "exibicao", keywords: "linha tempo timeline histórico" },
  { id: "tree", label: "Tree", icon: ListTree, category: "exibicao", keywords: "árvore hierarquia tree" },
  { id: "descriptions", label: "Descriptions", icon: ClipboardList, category: "exibicao", keywords: "descrição lista chave valor" },
  { id: "tabela", label: "Tabela", icon: TableIcon, category: "exibicao", keywords: "tabela table grid linhas colunas geist zebra" },
  { id: "progress-geist", label: "Progress Bar", icon: Activity, category: "exibicao", keywords: "progress bar progresso barra carregamento geist" },
  { id: "watermark", label: "Watermark", icon: Stamp, category: "exibicao", keywords: "marca dágua watermark proteção" },
  { id: "tool-graficos", label: "Gráficos", icon: PieChartIcon, category: "exibicao", keywords: "chart pizza donut gráfico pie legenda horizontal vertical lateral" },
  { id: "tags-badges", label: "Badges & Tags", icon: TagIcon, category: "exibicao", keywords: "badge tag etiqueta rótulo status chip" },
  { id: "avatar", label: "Avatar", icon: CircleUser, category: "exibicao", keywords: "avatar foto usuário iniciais perfil grupo" },

  // PLATAFORMA DE AULAS
  { id: "plat-courses", label: "Visualização de Cursos", icon: BookOpen, category: "plataforma", keywords: "ead curso plataforma" },
  { id: "plat-player", label: "Video Player", icon: Video, category: "plataforma", keywords: "player vídeo aula" },
  { id: "plat-playlist", label: "Lista de Aulas", icon: ListOrdered, category: "plataforma", keywords: "playlist aulas lista" },
  { id: "plat-dashboard", label: "Dashboard do Aluno", icon: BarChart3, category: "plataforma", keywords: "dashboard aluno progresso" },
  { id: "plat-notes", label: "Notas & Anotações", icon: PenLine, category: "plataforma", keywords: "anotação nota notes" },
  { id: "plat-rating", label: "Avaliação de Aulas", icon: Star, category: "plataforma", keywords: "rating aula avaliação" },
  { id: "plat-certificates", label: "Certificados", icon: Award, category: "plataforma", keywords: "certificado conclusão diploma" },
  { id: "plat-community", label: "Comunidade & Dúvidas", icon: MessageCircle, category: "plataforma", keywords: "comunidade fórum dúvida" },
  { id: "plat-livro", label: "Livro", icon: BookOpen, category: "plataforma", keywords: "livro book capa cover ebook módulo" },

  // AI-FOOD
  { id: "ai-food", label: "AI-Food (Prompt)", icon: Bot, category: "ai-food", keywords: "ia gpt prompt gerador master" },
];

export const categoryLabels: Record<string, string> = {
  fundamentos: "Fundamentos",
  layout: "Layout & Estrutura",
  feedback: "Feedback & Overlays",
  navegacao: "Navegação",
  entrada: "Entrada de Dados",
  exibicao: "Exibição de Dados",
  secoes: "Seções de Página",
  plataforma: "Plataforma de Aulas",
  "ai-food": "AI-Food",
};
