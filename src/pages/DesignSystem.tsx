import React, { useState } from "react";
import { BrandToggle } from "@/components/design-system/BrandToggle";

import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { SectionThemeToggle } from "@/components/design-system/SectionThemeToggle";
import { GradeCurricular } from "@/components/widgets/GradeCurricular";
import { TabelaPrecos } from "@/components/widgets/TabelaPrecos";
import { JornadaHeroi } from "@/components/widgets/JornadaHeroi";
import { AIFood } from "@/components/widgets/AIFood";
import { MarcaLogos } from "@/components/widgets/MarcaLogos";
import { GlobalNav } from "@/components/GlobalNav";
import { Icones } from "@/components/widgets/Icones";
import { PaletaDataViz } from "@/components/widgets/PaletaDataViz";
import { GraficoPizza } from "@/components/widgets/GraficoPizza";
import { GraficoPizzaLegendas } from "@/components/widgets/GraficoPizzaLegendas";
import { Introducao } from "@/components/widgets/Introducao";
import { LayoutEspacamento } from "@/components/widgets/LayoutEspacamento";
import { ContagemRegressiva } from "@/components/widgets/ContagemRegressiva";
import { TooltipsPopups } from "@/components/widgets/TooltipsPopups";
import { FaqDuvidas } from "@/components/widgets/FaqDuvidas";
import { WidgetsFlutuantes } from "@/components/widgets/WidgetsFlutuantes";

import { Calculadora } from "@/components/widgets/Calculadora";
import { CalculadoraRendimentos } from "@/components/widgets/CalculadoraRendimentos";
import { CardsContainers } from "@/components/widgets/CardsContainers";
import { PlataformaCursos } from "@/components/widgets/PlataformaCursos";
import { PlataformaPlayer } from "@/components/widgets/PlataformaPlayer";
import { PlataformaPlaylist } from "@/components/widgets/PlataformaPlaylist";
import { PlataformaDashboard } from "@/components/widgets/PlataformaDashboard";
import { PlataformaNotas } from "@/components/widgets/PlataformaNotas";
import { PlataformaRating } from "@/components/widgets/PlataformaRating";
import { PlataformaComunidade } from "@/components/widgets/PlataformaComunidade";
import { PlataformaCertificados } from "@/components/widgets/PlataformaCertificados";
import { LivroDefault, LivroVariants, LivroCustomColor, LivroResponsivo } from "@/components/widgets/Livro";
import livroBaseHtml from "@/components/widgets/html-snippets/livro-base.html?raw";
import livroDefaultHtml from "@/components/widgets/html-snippets/livro-default.html?raw";
import livroVariantsHtml from "@/components/widgets/html-snippets/livro-variants.html?raw";
import livroCustomHtml from "@/components/widgets/html-snippets/livro-custom.html?raw";
import livroResponsivoHtml from "@/components/widgets/html-snippets/livro-responsivo.html?raw";
import { CheckboxDefault, CheckboxDisabled } from "@/components/widgets/CheckboxGeist";
import checkboxHtml from "@/components/widgets/html-snippets/checkbox.html?raw";
import { ChoiceboxRadio, ChoiceboxCheckbox, ChoiceboxDisabled } from "@/components/widgets/ChoiceboxGeist";
import choiceboxHtml from "@/components/widgets/html-snippets/choicebox.html?raw";
import platCursosSrc from "@/components/widgets/PlataformaCursos?raw";
import platPlayerSrc from "@/components/widgets/PlataformaPlayer?raw";
import platPlaylistSrc from "@/components/widgets/PlataformaPlaylist?raw";
import platDashboardSrc from "@/components/widgets/PlataformaDashboard?raw";
import platNotasSrc from "@/components/widgets/PlataformaNotas?raw";
import platRatingSrc from "@/components/widgets/PlataformaRating?raw";
import platComunidadeSrc from "@/components/widgets/PlataformaComunidade?raw";
import platCertificadosSrc from "@/components/widgets/PlataformaCertificados?raw";
import platCursosHtml from "@/components/widgets/html-snippets/plataforma-cursos.html?raw";
import platPlayerHtml from "@/components/widgets/html-snippets/plataforma-player.html?raw";
import platPlaylistHtml from "@/components/widgets/html-snippets/plataforma-playlist.html?raw";
import platDashboardHtml from "@/components/widgets/html-snippets/plataforma-dashboard.html?raw";
import platNotasHtml from "@/components/widgets/html-snippets/plataforma-notas.html?raw";
import platRatingHtml from "@/components/widgets/html-snippets/plataforma-rating.html?raw";
import platComunidadeHtml from "@/components/widgets/html-snippets/plataforma-comunidade.html?raw";
import platCertificadosHtml from "@/components/widgets/html-snippets/plataforma-certificados.html?raw";
import tabelaPrecosSrc from "@/components/widgets/TabelaPrecos?raw";
import jornadaHeroiSrc from "@/components/widgets/JornadaHeroi?raw";
import marcaLogosSrc from "@/components/widgets/MarcaLogos?raw";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useBrand } from "@/contexts/BrandContext";
import { olhoBranco, olhoPreto } from "@/assets/olhos";

import {
  Palette, Type, Square, MousePointer,
  AlertCircle, Info, ArrowRight, GraduationCap, DollarSign, Map, Bot,
  Download, Shapes, BookOpen, Video, ListOrdered, BarChart3, PenLine, Star, MessageCircle,
  Layout, Calculator, Clock, HelpCircle, Award, MessageSquare, Package, Menu, PieChart as PieChartIcon,
  Bell, ShieldAlert, Loader2, Layers, PanelRightOpen,
  ArrowLeftRight, FolderTree, UploadCloud, Star as StarIcon, ListFilter, Search,
  ListChecks, ToggleLeft, Anchor as AnchorIcon, AtSign, Columns3,
  Activity, GitCommit, ListTree, ClipboardList, Inbox as InboxIcon, CheckCircle2, Compass, Stamp,
  ChevronRight, CalendarIcon, SquareCheck, Table as TableIcon
} from "lucide-react";
import { Notifications } from "@/components/widgets/Notifications";
import { PopconfirmWidget } from "@/components/widgets/Popconfirm";
import { SpinTipWidget } from "@/components/widgets/SpinTip";
import { SkeletonAvancado } from "@/components/widgets/SkeletonAvancado";
import { DrawerMultiNivel, DrawerSimples } from "@/components/widgets/DrawerMultiNivel";
import { TransferWidget } from "@/components/widgets/Transfer";
import { TreeSelectWidget } from "@/components/widgets/TreeSelect";
import { UploadComPreview } from "@/components/widgets/UploadComPreview";
import { CalendarioWidget } from "@/components/widgets/Calendario";
import { RateWidget } from "@/components/widgets/Rate";
import { AutoCompleteWidget } from "@/components/widgets/AutoComplete";
import { StepsWidget } from "@/components/widgets/Steps";
import { SegmentedWidget, SwitchSimplesWidget, SwitchDisabledWidget } from "@/components/widgets/Segmented";
import { AnchorWidget } from "@/components/widgets/Anchor";
import { TabsGeistWidget } from "@/components/widgets/TabsGeist";
import { MentionsWidget } from "@/components/widgets/Mentions";
import { CascaderWidget } from "@/components/widgets/Cascader";
import { StatisticWidget } from "@/components/widgets/Statistic";
import { TimelineWidget } from "@/components/widgets/Timeline";
import { TreeWidget } from "@/components/widgets/Tree";
import { DescriptionsWidget } from "@/components/widgets/Descriptions";
import { TabelaWidget, TabelaBorderedWidget } from "@/components/widgets/Tabela";
import { ProgressGeistWidget } from "@/components/widgets/ProgressGeist";
import { EmptyWidget } from "@/components/widgets/Empty";
import { ResultWidget } from "@/components/widgets/Result";
import { TourWidget } from "@/components/widgets/Tour";
import { WatermarkWidget } from "@/components/widgets/Watermark";

type SectionDef = {
  id: string;
  label: string;
  icon: React.ElementType;
  category: string;
};

type SectionDefWithKeywords = SectionDef & { keywords?: string };

// IMPORTANTE: a ORDEM deste array deve corresponder à ordem em que as
// seções aparecem no JSX (DOM). O scroll-spy usa esta ordem para decidir o
// item ativo, evitando "saltos" quando categorias estão intercaladas no DOM.
const sections: SectionDefWithKeywords[] = [
  // FUNDAMENTOS
  { id: "intro", label: "Introdução", icon: Info, category: "fundamentos", keywords: "início boas-vindas overview" },
  { id: "marca", label: "Marca & Logos", icon: Download, category: "fundamentos", keywords: "logo brand identidade download svg png" },
  { id: "typography", label: "Tipografia", icon: Type, category: "fundamentos", keywords: "fonte fontes texto sora roboto anek" },
  { id: "colors", label: "Cores", icon: Palette, category: "fundamentos", keywords: "paleta cor token hsl" },
  { id: "icons", label: "Ícones", icon: Shapes, category: "fundamentos", keywords: "iconografia phosphor svg" },

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

  // NAVEGAÇÃO
  { id: "drawer-simples", label: "Drawer", icon: PanelRightOpen, category: "navegacao", keywords: "drawer painel lateral sheet" },
  { id: "drawer-multi", label: "Drawer Multi-nível", icon: PanelRightOpen, category: "navegacao", keywords: "drawer menu lateral nested" },
  { id: "steps", label: "Steps (Wizard)", icon: ListChecks, category: "navegacao", keywords: "wizard passos etapas stepper" },
  { id: "segmented", label: "Switch", icon: ToggleLeft, category: "navegacao", keywords: "segmented toggle aba switch" },
  { id: "tabs-geist", label: "Tabs", icon: Columns3, category: "navegacao", keywords: "tabs abas guia geist underline" },
  { id: "anchor", label: "Anchor (Scroll Spy)", icon: AnchorIcon, category: "navegacao", keywords: "scroll spy âncora navegação" },
  { id: "tour", label: "Tour", icon: Compass, category: "navegacao", keywords: "onboarding tour guia spotlight" },

  // ENTRADA DE DADOS
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

const categoryLabels: Record<string, string> = {
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

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function ColorSwatch({ name, cssVar, fgVar }: { name: string; cssVar: string; fgVar: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");

  React.useEffect(() => {
    if (!ref.current) return;
    const raw = getComputedStyle(ref.current).getPropertyValue(`--${cssVar}`).trim();
    const parts = raw.replace(/%/g, "").split(/\s+/).map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const [r, g, b] = hslToRgb(parts[0], parts[1], parts[2]);
      setHex(rgbToHex(r, g, b));
      setRgb(`${r}, ${g}, ${b}`);
    }
  });

  return (
    <div className="space-y-2" ref={ref}>
      <div className="h-24 rounded-lg border flex items-end p-3" style={{ backgroundColor: `hsl(var(--${cssVar}))` }}>
        <span className="text-xs font-semibold" style={{ color: `hsl(var(--${fgVar}))` }}>{name}</span>
      </div>
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground font-mono">--{cssVar}</p>
        {hex && <p className="text-xs text-foreground font-mono font-semibold">{hex}</p>}
        {rgb && <p className="text-xs text-muted-foreground font-mono">rgb({rgb})</p>}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { brand } = useBrand();

  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const q = normalize(searchQuery.trim());
  const filteredSections = q
    ? sections.filter((s) =>
        normalize(`${s.label} ${s.keywords ?? ""} ${s.id}`).includes(q)
      )
    : sections;

  const navBlocks = React.useMemo(() => {
    return filteredSections.reduce<Array<{ key: string; category: string; items: SectionDefWithKeywords[] }>>((acc, section) => {
      const lastBlock = acc[acc.length - 1];
      if (!lastBlock || lastBlock.category !== section.category) {
        acc.push({
          key: `${section.category}-${section.id}`,
          category: section.category,
          items: [section],
        });
        return acc;
      }

      lastBlock.items.push(section);
      return acc;
    }, []);
  }, [filteredSections]);

  const activeBlockKey = navBlocks.find((block) =>
    block.items.some((item) => item.id === activeSection)
  )?.key;

  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({
    "fundamentos-intro": true,
  });

  React.useEffect(() => {
    if (!activeBlockKey) return;
    setOpenBlocks((prev) => (prev[activeBlockKey] ? prev : { ...prev, [activeBlockKey]: true }));
  }, [activeBlockKey]);

  const isBlockOpen = (blockKey: string) => (q ? true : openBlocks[blockKey] ?? blockKey === navBlocks[0]?.key);
  const toggleBlock = (blockKey: string) => setOpenBlocks((prev) => ({ ...prev, [blockKey]: !isBlockOpen(blockKey) }));

  // Suprime o scroll-spy durante navegação programática (clique no menu)
  // para evitar que a animação do scroll suave seja interrompida ou que o
  // highlight pisque em seções intermediárias.
  const isNavigatingRef = React.useRef(false);
  const navTimerRef = React.useRef<number | null>(null);

  // Scroll-spy via IntersectionObserver: rastreia TODAS as seções no DOM.
  React.useEffect(() => {
    const allIds = sections.map((s) => s.id);
    const visibleSet = new Set<string>();

    const computeActive = () => {
      if (isNavigatingRef.current) return;

      const candidates = Array.from(visibleSet)
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.getBoundingClientRect().top } : null;
        })
        .filter((x): x is { id: string; top: number } => x !== null)
        .sort((a, b) => a.top - b.top);

      let nextId: string | null = null;
      if (candidates.length > 0) {
        nextId = candidates[0].id;
      } else {
        const above = allIds
          .map((id) => {
            const el = document.getElementById(id);
            return el ? { id, top: el.getBoundingClientRect().top } : null;
          })
          .filter((x): x is { id: string; top: number } => x !== null && x.top < 120)
          .sort((a, b) => b.top - a.top);
        nextId = above[0]?.id ?? allIds[0];
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        nextId = allIds[allIds.length - 1];
      }

      if (nextId) setActiveSection((prev) => (prev === nextId ? prev : nextId!));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSet.add(entry.target.id);
          else visibleSet.delete(entry.target.id);
        }
        computeActive();
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
    );

    const observed: Element[] = [];
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => {
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [filteredSections]);

  // Mantém o item ativo visível dentro da sidebar — porém NUNCA durante
  // navegação programática (scrollIntoView na sidebar interrompe o smooth
  // scroll da janela e provoca o efeito de "clicar duas vezes").
  React.useEffect(() => {
    if (isNavigatingRef.current) return;
    const el = document.querySelector<HTMLElement>(`[data-nav-id="${activeSection}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeSection]);

  // Todas as seções estão sempre montadas; a busca filtra apenas a sidebar.
  const isVisible = (_sectionId: string) => true;

  // Navega para uma seção (sempre presente no DOM).
  const goToSection = React.useCallback((id: string) => {
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (!el) {
        if (attempt < 10) requestAnimationFrame(() => tryScroll(attempt + 1));
        return;
      }

      // Trava o scroll-spy enquanto a animação roda.
      isNavigatingRef.current = true;
      setActiveSection(id);

      const targetTop = el.getBoundingClientRect().top + window.scrollY - 80;
      const maxTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const top = Math.min(Math.max(targetTop, 0), maxTop);
      const releaseDelay = Math.min(1600, Math.max(750, Math.abs(window.scrollY - top) * 0.9));

      window.scrollTo({ top, behavior: "smooth" });

      // Libera o spy depois da animação. Como `scrollend` ainda não tem
      // suporte amplo, usamos um timer de fallback (~700ms é suficiente
      // para qualquer scroll dentro da página).
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
      navTimerRef.current = window.setTimeout(() => {
        isNavigatingRef.current = false;
        // Reafirma o highlight no item alvo após o scroll terminar.
        setActiveSection(id);
      }, releaseDelay);
    };
    tryScroll();
  }, []);

  React.useEffect(() => {
    return () => {
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-lg",
                      brand === "capital" ? "bg-brand-dark" : "bg-brand"
                    )}>
                      <img
                        src={brand === "capital" ? olhoBranco.url : olhoPreto.url}
                        alt="AUVP Logo"
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <BrandToggle />
                      <p className="text-xs text-muted-foreground">Design System</p>
                    </div>
                  </div>
                </div>

                <div className="px-3 pt-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar componente..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 h-9 font-roboto text-sm"
                    />
                  </div>
                </div>

                <nav className="px-2 pb-6 pt-3">
                  {filteredSections.length === 0 ? (
                    <p className="px-3 py-6 text-sm text-muted-foreground text-center font-roboto">
                      Nenhum componente encontrado.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {navBlocks.map((block) => {
                        const open = isBlockOpen(block.key);
                        return (
                          <div key={block.key}>
                            <button
                              type="button"
                              onClick={() => toggleBlock(block.key)}
                              className="w-full flex items-start justify-between gap-2 px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                              <span className="flex-1 text-left leading-tight">{categoryLabels[block.category] || block.category}</span>
                              <ChevronRight className={cn("mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-90")} />
                            </button>
                            {open && (
                              <ul className="space-y-0.5 mt-1 mb-1">
                                {block.items.map(({ id, label, icon: Icon }) => (
                                  <li key={id}>
                                    <button
                                      data-nav-id={id}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setTimeout(() => goToSection(id), 250);
                                      }}
                                      className={cn(
                                        "w-full flex items-center gap-3 pl-6 pr-3 py-2 rounded-md text-sm font-medium text-left leading-tight transition-colors duration-150",
                                        activeSection === id
                                          ? "bg-primary text-primary-foreground"
                                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                      )}
                                    >
                                       <Icon className="h-4 w-4 shrink-0" />
                                      <span className="flex-1 text-left">{label}</span>
                                      {block.category === "plataforma" && (
                                        <span className="ml-1 inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-1.5 py-0 text-[9px] font-bold uppercase tracking-wider">Beta</span>
                                      )}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <GlobalNav />
            <div className="hidden sm:block ml-2">
              <BrandToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container flex gap-0 relative px-4 md:px-8">
        {/* Sidebar Nav — Desktop only */}
        <nav className="sticky top-16 h-[calc(100vh-4rem)] w-56 shrink-0 border-r py-6 pr-4 overflow-y-auto hidden md:block">
          <div className="px-2 mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar componente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 font-roboto text-sm"
              />
            </div>
          </div>

          {filteredSections.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted-foreground text-center font-roboto">
              Nenhum componente encontrado.
            </p>
          ) : (
            <div className="space-y-1">
              {navBlocks.map((block) => {
                const open = isBlockOpen(block.key);
                return (
                  <div key={block.key}>
                    <button
                      type="button"
                      onClick={() => toggleBlock(block.key)}
                      className="w-full flex items-start justify-between gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <span className="flex-1 text-left leading-tight">{categoryLabels[block.category] || block.category}</span>
                      <ChevronRight className={cn("mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-90")} />
                    </button>
                    {open && (
                      <ul className="space-y-0.5 mt-1 mb-1">
                        {block.items.map(({ id, label, icon: Icon }) => (
                          <li key={id}>
                            <button
                              data-nav-id={id}
                              onClick={() => goToSection(id)}
                              className={cn(
                                "w-full flex items-center gap-3 pl-6 pr-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-left leading-tight",
                                activeSection === id
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="flex-1 text-left">{label}</span>
                              {block.category === "plataforma" && (
                                <span className="ml-1 inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-1.5 py-0 text-[9px] font-bold uppercase tracking-wider">Beta</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </nav>

        {/* Main content */}
        <main className="flex-1 py-6 md:py-8 pl-0 md:pl-8 space-y-12 md:space-y-16 min-w-0 overflow-hidden">

          {/* ===== GERAL ===== */}
          {isVisible("intro") && <section id="intro"><Introducao /></section>}

          {isVisible("marca") && <>
          {isVisible("intro") && <Separator />}
          <section id="marca" className={!isVisible("intro") ? "pt-0" : ""}>
            <h2 className="text-2xl font-bold mb-2">Marca & Logos</h2>
            <p className="text-muted-foreground mb-6">Repositório oficial das aplicações da marca. Utilize sempre os arquivos originais sem distorções.</p>
            <div className="rounded-xl border border-border bg-muted/40 p-4 md:p-5 mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5 md:mt-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  A maioria das demais marcas do ecossistema AUVP não possui diretrizes próprias, mas segue as boas práticas deste design system.
                  Os arquivos podem ser encontrados e baixados no repositório oficial.
                </p>
              </div>
              <a
                href="https://drive.google.com/drive/folders/1iZV0YPxFN9CxoB7SgiwZII6Bl4Supqbv?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="shrink-0">
                  <Download className="h-4 w-4 mr-2" />
                  Repositório
                </Button>
              </a>
            </div>
            <SectionThemeToggle bare code={marcaLogosSrc}><MarcaLogos /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("typography") && <>
          <Separator />
          <section id="typography">
            <h2 className="text-2xl font-bold mb-2">Tipografia</h2>
            <p className="text-muted-foreground mb-6">Três famílias tipográficas: <strong>Anek Latin</strong> (títulos), <strong>Roboto</strong> (corpo, labels e legendas) e <strong>Sora</strong> (exclusiva para botões).</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { name: "Anek Latin", role: "Títulos & Headers", weights: "400–800", url: "https://fonts.google.com/specimen/Anek+Latin" },
                { name: "Roboto", role: "Corpo, labels & legendas", weights: "300, 400, 500, 700", url: "https://fonts.google.com/specimen/Roboto" },
                { name: "Sora", role: "Exclusiva para botões (CTA)", weights: "700", url: "https://fonts.google.com/specimen/Sora" },
              ].map((font) => (
                <a
                  key={font.name}
                  href={font.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-xl p-5 bg-muted/30 hover:bg-muted/60 transition-colors group block"
                >
                  <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{font.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{font.role}</p>
                  <p className="text-xs text-muted-foreground">Pesos: {font.weights}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent mt-3">
                    Google Fonts ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-3 overflow-hidden">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-anek">Título 1 — Anek Latin Bold</h1>
              <h2 className="text-2xl md:text-3xl font-bold font-anek">Título 2 — Anek Latin Bold</h2>
              <h3 className="text-xl md:text-2xl font-semibold font-anek">Título 3 — Anek Latin SemiBold</h3>
              <h4 className="text-lg md:text-xl font-semibold font-anek">Título 4 — Anek Latin SemiBold</h4>
              <p className="text-base font-roboto">Corpo — Roboto Regular 16px. Investir com inteligência começa aqui.</p>
              <p className="text-sm text-muted-foreground font-roboto">Texto pequeno — Roboto Regular 14px. Texto secundário e descrições.</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold font-roboto">Label — Roboto Bold 12px Uppercase</p>
              <button className="bg-primary text-primary-foreground px-4 md:px-6 py-2.5 md:py-3 font-sora font-bold text-[13px] uppercase tracking-wider rounded-xl">Botão — Sora Bold 13px (exclusivo)</button>
            </div>
          </section>
          </>}

          {isVisible("colors") && <>
          <Separator />
          <section id="colors">
            <h2 className="text-2xl font-bold mb-2">Cores</h2>
            <p className="text-muted-foreground mb-6">Paleta de cores semânticas do tema {brand === "capital" ? "AUVP Capital (Verde)" : "AUVP Escola (Dourado)"}</p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Primary", var: "primary", fg: "primary-foreground" },
                { name: "Secondary", var: "secondary", fg: "secondary-foreground" },
                { name: "Accent", var: "accent", fg: "accent-foreground" },
                { name: "Muted", var: "muted", fg: "muted-foreground" },
                { name: "Background", var: "background", fg: "foreground" },
                { name: "Card", var: "card", fg: "card-foreground" },
                { name: "Destructive", var: "destructive", fg: "destructive-foreground" },
                { name: "Border", var: "border", fg: "foreground" },
              ].map(({ name, var: v, fg }) => (
                <ColorSwatch key={v} name={name} cssVar={v} fgVar={fg} />
              ))}
            </div>

            <div className="mt-8 p-5 rounded-xl border border-border bg-muted/30">
              <h3 className="text-base font-bold mb-1 font-anek">Verde de Acento — Modo Escuro</h3>
              <p className="text-sm text-muted-foreground mb-4 font-roboto">
                Tom <code className="text-xs bg-background px-1.5 py-0.5 rounded">#5A8770</code> usado pontualmente
                em ícones, numerações e textos de destaque sobre fundos escuros, mantendo a UI baseada em preto/branco/cinza.
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-16 rounded-xl border border-border shrink-0"
                  style={{ backgroundColor: "#5A8770" }}
                  aria-label="Swatch verde de acento"
                />
                <div className="grid grid-cols-3 gap-3 text-xs font-roboto">
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider mb-0.5">HEX</div>
                    <div className="font-mono">#5A8770</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider mb-0.5">RGB</div>
                    <div className="font-mono">90, 135, 112</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider mb-0.5">HSL</div>
                    <div className="font-mono">145, 20%, 44%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base font-bold mb-1 font-anek">Cores de Texto</h3>
              <p className="text-sm text-muted-foreground mb-4 font-roboto">
                Tons base para textos. No modo escuro, eles invertem automaticamente:
                <strong className="text-foreground"> preto puro</strong> vira <strong className="text-foreground">branco puro</strong> e
                <strong className="text-foreground"> cinza escuro</strong> vira <strong className="text-foreground">cinza claro</strong>.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Preto puro",  bg: "#000000", fg: "#FFFFFF", token: "--text-strong (light)", hex: "#000000", rgb: "0, 0, 0" },
                  { name: "Cinza escuro", bg: "#404040", fg: "#FFFFFF", token: "--text-muted (light)",  hex: "#404040", rgb: "64, 64, 64" },
                  { name: "Branco puro", bg: "#FFFFFF", fg: "#000000", token: "--text-strong (dark)",  hex: "#FFFFFF", rgb: "255, 255, 255" },
                  { name: "Cinza claro", bg: "#BFBFBF", fg: "#000000", token: "--text-muted (dark)",   hex: "#BFBFBF", rgb: "191, 191, 191" },
                ].map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div className="h-24 rounded-lg border flex items-end p-3" style={{ backgroundColor: c.bg }}>
                      <span className="text-xs font-semibold" style={{ color: c.fg }}>{c.name}</span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground font-mono">{c.token}</p>
                      <p className="text-xs text-foreground font-mono font-semibold">{c.hex}</p>
                      <p className="text-xs text-muted-foreground font-mono">rgb({c.rgb})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-2">Paleta para Dados e Gráficos</h3>
              <p className="text-muted-foreground mb-6">
                Conjunto expandido de cores derivado da identidade da marca, usado em tabelas com múltiplas categorias,
                gráficos de pizza, barras, linhas e mapas de calor. As cores se adaptam automaticamente entre Capital e Escola.
              </p>
              <SectionThemeToggle bare selfDocumented><PaletaDataViz /></SectionThemeToggle>
            </div>
          </section>
          </>}

          {isVisible("icons") && <>
          <Separator />
          <section id="icons">
            <h2 className="text-2xl font-bold mb-2">Ícones</h2>
            <p className="text-muted-foreground mb-6">Biblioteca de ícones Phosphor Icons utilizada em todo o ecossistema AUVP.</p>
            <SectionThemeToggle bare selfDocumented><Icones /></SectionThemeToggle>
          </section>
          </>}


          {/* ===== LAYOUT & ESTRUTURA ===== */}
          {isVisible("layout") && <>
          <Separator />
          <section id="layout">
            <h2 className="text-2xl font-bold mb-2">Layout & Espaçamento</h2>
            <p className="text-muted-foreground mb-6">Ritmo vertical e alinhamento baseados em múltiplos de 15px.</p>
            <SectionThemeToggle bare selfDocumented><LayoutEspacamento /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("cards-containers") && <>
          <Separator />
          <section id="cards-containers">
            <h2 className="text-2xl font-bold mb-2">Cards & Containers</h2>
            <p className="text-muted-foreground mb-6">Regras para criar cards e áreas destacadas dentro de dobras institucionais.</p>
            <CardsContainers />
          </section>
          </>}

          {isVisible("buttons") && <>
          <Separator />
          <section id="buttons">
            <h2 className="text-2xl font-bold mb-2">Botões</h2>
            <p className="text-muted-foreground mb-6">
              {brand === "capital"
                ? "Capital: bordas retas (rounded-none), fonte Sora Bold 700, hover revela borda."
                : "Escola: bordas arredondadas (rounded-xl), fonte Sora Bold 700, hover revela borda."}
            </p>
            <div className="space-y-6">
              <ComponentShowcase title="Variantes de Botão" description="Todos os estilos disponíveis"
                code={`import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// 8 variantes disponíveis
<Button>Padrão</Button>
<Button variant="cta" size="lg">CTA Landing Page</Button>
<Button variant="cta-inverted" size="lg">CTA Invertido</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Contorno</Button>
<Button variant="ghost">Fantasma</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destrutivo</Button>`}
                htmlCode={`<!-- Base compartilhada por todas as variantes -->
<style>
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:0.5rem;
    padding:0.625rem 1.25rem; border-radius:12px; font-family:'Sora',sans-serif;
    font-weight:700; text-transform:uppercase; font-size:13px; letter-spacing:0.02em;
    border:1px solid transparent; cursor:pointer; transition:all 0.2s; }
  .btn-lg { padding:1rem 2rem; height:48px; font-size:14px; }

  /* Padrão (default) */
  .btn-default { background:var(--primary,#023619); color:#fff; border-color:var(--primary,#023619); }
  .btn-default:hover { background:transparent; color:var(--primary,#023619); }

  /* CTA Landing Page */
  .btn-cta { background:#023619; color:#fff; border-radius:0; }
  .btn-cta:hover { background:transparent; color:#023619; border-color:#023619; }

  /* CTA Invertido (para fundos escuros) */
  .btn-cta-inverted { background:#fafafa; color:#023619; border-color:#fafafa; border-radius:0; }
  .btn-cta-inverted:hover { background:#e0e0e0; border-color:#e0e0e0; }

  /* Secundário */
  .btn-secondary { background:var(--secondary,#f1f1f1); color:var(--secondary-foreground,#111);
    border-color:var(--secondary,#f1f1f1); }
  .btn-secondary:hover { background:transparent; color:var(--secondary-foreground,#111); }

  /* Contorno (outline) */
  .btn-outline { background:transparent; color:inherit; border-color:#e5e5e5; }
  .btn-outline:hover { background:#f5f5f5; }

  /* Fantasma (ghost) */
  .btn-ghost { background:transparent; color:inherit; border-color:transparent; }
  .btn-ghost:hover { background:#f5f5f5; }

  /* Link */
  .btn-link { background:transparent; color:var(--primary,#023619); border:none; padding:0;
    text-decoration:none; }
  .btn-link:hover { text-decoration:underline; }

  /* Destrutivo */
  .btn-destructive { background:#dc2626; color:#fff; border-color:#dc2626; }
  .btn-destructive:hover { background:#b91c1c; border-color:#b91c1c; }
</style>

<button class="btn btn-default">PADRÃO</button>
<button class="btn btn-lg btn-cta">CTA LANDING PAGE</button>
<button class="btn btn-lg btn-cta-inverted">CTA INVERTIDO</button>
<button class="btn btn-secondary">SECUNDÁRIO</button>
<button class="btn btn-outline">CONTORNO</button>
<button class="btn btn-ghost">FANTASMA</button>
<button class="btn btn-link">LINK</button>
<button class="btn btn-destructive">DESTRUTIVO</button>`}>
                <Button>Padrão</Button>
                <Button variant="cta" size="lg">CTA Landing Page</Button>
                <Button variant="cta-inverted" size="lg">CTA Invertido</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="outline">Contorno</Button>
                <Button variant="ghost">Fantasma</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destrutivo</Button>
              </ComponentShowcase>
              <ComponentShowcase title="Tamanhos" description="sm, default, lg, xl, icon"
                code={`import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
<Button size="xl">Extra Grande</Button>
<Button size="icon"><ArrowRight className="h-4 w-4" /></Button>`}
                htmlCode={`<style>
  .btn { display:inline-flex; align-items:center; justify-content:center;
    background:var(--primary,#023619); color:#fff; border:1px solid var(--primary,#023619);
    border-radius:12px; font-family:'Sora',sans-serif; font-weight:700; text-transform:uppercase;
    cursor:pointer; }
  .btn-sm      { height:36px; padding:0 0.75rem;  font-size:12px; }
  .btn-default { height:40px; padding:0 1.25rem;  font-size:13px; }
  .btn-lg      { height:48px; padding:0 2rem;     font-size:14px; }
  .btn-xl      { height:56px; padding:0 2.5rem;   font-size:15px; }
  .btn-icon    { height:40px; width:40px; padding:0; }
</style>

<button class="btn btn-sm">PEQUENO</button>
<button class="btn btn-default">PADRÃO</button>
<button class="btn btn-lg">GRANDE</button>
<button class="btn btn-xl">EXTRA GRANDE</button>
<button class="btn btn-icon" aria-label="Avançar">→</button>`}>
                <Button size="sm">Pequeno</Button>
                <Button size="default">Padrão</Button>
                <Button size="lg">Grande</Button>
                <Button size="xl">Extra Grande</Button>
                <Button size="icon"><ArrowRight className="h-4 w-4" /></Button>
              </ComponentShowcase>
              <ComponentShowcase title="CTA em Fundo Escuro" description="Comportamento do botão invertido"
                code={`<Button variant="cta-inverted" size="lg">Começar Agora</Button>`}
                htmlCode={`<div style="background:#023619; padding:2rem; border-radius:0.5rem;">\n  <button style="background:#fff; color:#023619; padding:1rem 2rem; border-radius:12px; font-family:'Sora'; font-weight:700; text-transform:uppercase; font-size:13px; border:none; cursor:pointer;">COMEÇAR AGORA</button>\n</div>`}>
                <div className="bg-[hsl(155_93%_11%)] dark:bg-[hsl(0_0%_18%)] p-8 rounded-lg flex items-center gap-4 w-full">
                  <Button variant="cta-inverted" size="lg">Começar Agora</Button>
                </div>
              </ComponentShowcase>
            </div>
          </section>
          </>}


          {/* ===== SEÇÕES DE PÁGINA ===== */}
          {isVisible("grade") && <>
          <Separator />
          <section id="grade">
            <h2 className="text-2xl font-bold mb-2">Grade Curricular</h2>
            <p className="text-muted-foreground mb-6">Abas pill-style com cards translúcidos em grid responsivo.</p>
            <ComponentShowcase title="Grade Curricular" description="Tabs com categorias e cards de módulos"
              code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const categories = [
  { id: "fundamentos", label: "Fundamentos" },
  { id: "renda-fixa", label: "Renda Fixa" },
  { id: "acoes", label: "Ações" },
];

const modules = {
  fundamentos: [
    { icon: BookOpen, number: "01", title: "Mentalidade Financeira", description: "Construa uma base sólida." },
    { icon: BarChart3, number: "02", title: "Reserva de Emergência", description: "Proteção financeira essencial." },
  ],
};

<Tabs defaultValue="fundamentos">
  <TabsList className="flex flex-wrap gap-2 bg-transparent">
    {categories.map((cat) => (
      <TabsTrigger key={cat.id} value={cat.id} className="rounded-full px-6 py-3 text-[13px] font-bold uppercase">
        {cat.label}
      </TabsTrigger>
    ))}
  </TabsList>
  {Object.entries(modules).map(([key, items]) => (
    <TabsContent key={key} value={key}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((mod) => (
          <div key={mod.number} className="bg-background/60 border rounded-xl p-6">
            <h4 className="font-bold text-sm">{mod.title}</h4>
            <p className="text-xs text-muted-foreground">{mod.description}</p>
          </div>
        ))}
      </div>
    </TabsContent>
  ))}
</Tabs>`}
              htmlCode={`<!-- Grade Curricular -->
<style>
  .grade-container { background: #f5f5f5; padding: 2rem; border-radius: 1rem; border: 1px solid #e5e5e5; }
  .grade-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; }
  .grade-tab { padding: 0.75rem 1.5rem; border-radius: 9999px; border: 1px solid #e5e5e5; background: rgba(255,255,255,0.4); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; color: #888; transition: all 0.2s; }
  .grade-tab.active { background: var(--primary, #023619); color: #fff; border-color: var(--primary, #023619); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .grade-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
  .grade-card { background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.05); border-radius: 0.75rem; padding: 1.5rem; transition: all 0.2s; }
  .grade-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .grade-card-icon { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; background: rgba(2,54,25,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; }
  .grade-card h4 { font-size: 0.875rem; font-weight: 700; margin-bottom: 0.25rem; }
  .grade-card p { font-size: 0.75rem; color: #888; line-height: 1.5; }
  .grade-number { font-size: 0.7rem; font-weight: 700; color: var(--primary, #023619); text-transform: uppercase; letter-spacing: 0.1em; }
</style>

<div class="grade-container">
  <div class="grade-tabs">
    <button class="grade-tab active" onclick="showTab('fundamentos')">Fundamentos</button>
    <button class="grade-tab" onclick="showTab('renda-fixa')">Renda Fixa</button>
    <button class="grade-tab" onclick="showTab('acoes')">Ações</button>
    <button class="grade-tab" onclick="showTab('fiis')">FIIs</button>
  </div>
  <div id="tab-fundamentos" class="grade-grid">
    <div class="grade-card">
      <div class="grade-card-icon">📖</div>
      <span class="grade-number">01</span>
      <h4>Mentalidade Financeira</h4>
      <p>Construa uma base sólida para suas decisões.</p>
    </div>
    <div class="grade-card">
      <div class="grade-card-icon">📊</div>
      <span class="grade-number">02</span>
      <h4>Reserva de Emergência</h4>
      <p>Monte sua proteção financeira essencial.</p>
    </div>
  </div>
</div>

<script>
function showTab(tabId) {
  document.querySelectorAll('.grade-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  // Toggle tab content visibility
}
</script>`}>
              <GradeCurricular />
            </ComponentShowcase>
          </section>
          </>}

          {isVisible("countdown") && <>
          <Separator />
          <section id="countdown">
            <h2 className="text-2xl font-bold mb-2">Contagem Regressiva</h2>
            <p className="text-muted-foreground mb-6">Widget dinâmico focado em escassez, utilizando cards com backdrop-blur e transparência.</p>
            <SectionThemeToggle bare selfDocumented><ContagemRegressiva /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("faq") && <>
          <Separator />
          <section id="faq">
            <h2 className="text-2xl font-bold mb-2">Dropdown</h2>
            <p className="text-muted-foreground mb-6">Componente global de dropdown para páginas de vendas, com temas claro e escuro.</p>
            <SectionThemeToggle bare selfDocumented><FaqDuvidas /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("pricing") && <>
          <Separator />
          <section id="pricing">
            <h2 className="text-2xl font-bold mb-2">Tabela de Preços</h2>
            <p className="text-muted-foreground mb-6">Toggle animado com cards translúcidos, badges de desconto e CTA.</p>
            <SectionThemeToggle bare code={tabelaPrecosSrc}><TabelaPrecos /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("journey") && <>
          <Separator />
          <section id="journey">
            <h2 className="text-2xl font-bold mb-2">Jornada do Herói</h2>
            <p className="text-muted-foreground mb-6">Timeline interativa com pontos clicáveis e barra de progresso animada.</p>
            <SectionThemeToggle bare code={jornadaHeroiSrc}><JornadaHeroi /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("floaters") && <>
          <Separator />
          <section id="floaters">
            <h2 className="text-2xl font-bold mb-2">Widgets Flutuantes</h2>
            <p className="text-muted-foreground mb-6">Botões flutuantes (WhatsApp, Porquinho da Economia) com animação contínua.</p>
            <SectionThemeToggle bare selfDocumented><WidgetsFlutuantes /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("site-calc") && <>
          <Separator />
          <section id="site-calc">
            <h2 className="text-2xl font-bold mb-2">Calculadora de Rendimentos</h2>
            <p className="text-muted-foreground mb-6">Widget de simulação para landing pages com tipografia e CTAs do tema Sites.</p>
            <SectionThemeToggle bare selfDocumented><CalculadoraRendimentos /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("tool-calc") && <>
          <Separator />
          <section id="tool-calc">
            <h2 className="text-2xl font-bold mb-2">Calculadora de Câmbio</h2>
            <p className="text-muted-foreground mb-6">Ferramenta interativa de conversão de moedas com IOF, VET e identidade visual da marca ({brand === "capital" ? "Capital" : "Escola"}).</p>
            <SectionThemeToggle bare selfDocumented><Calculadora /></SectionThemeToggle>
          </section>
          </>}


          {/* ===== FEEDBACK & OVERLAYS ===== */}
          {isVisible("tooltips") && <>
          <Separator />
          <section id="tooltips">
            <h2 className="text-2xl font-bold mb-2">Tooltips & Popups</h2>
            <p className="text-muted-foreground mb-6">Elementos flutuantes e guias de interação para Landing Pages.</p>
            <SectionThemeToggle bare selfDocumented><TooltipsPopups /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("notifications") && <>
          <Separator />
          <section id="notifications">
            <h2 className="text-2xl font-bold mb-2">Notificações</h2>
            <p className="text-muted-foreground mb-6">Pilha persistente de mensagens com tipos semânticos (success / info / warning / error). Diferente do Toast: usadas para fluxos longos como uploads, salvamentos automáticos e alertas de sistema.</p>
            <Notifications />
          </section>
          </>}

          {isVisible("popconfirm") && <>
          <Separator />
          <section id="popconfirm">
            <h2 className="text-2xl font-bold mb-2">Popconfirm</h2>
            <p className="text-muted-foreground mb-6">Confirmação inline ancorada ao gatilho — alternativa leve ao Dialog para ações destrutivas rápidas.</p>
            <PopconfirmWidget />
          </section>
          </>}

          {isVisible("spin") && <>
          <Separator />
          <section id="spin">
            <h2 className="text-2xl font-bold mb-2">Spin (Loading)</h2>
            <p className="text-muted-foreground mb-6">Indicador de carregamento com mensagem opcional em Sora uppercase. Inclui modo overlay para encobrir áreas durante operações assíncronas.</p>
            <SpinTipWidget />
          </section>
          </>}

          {isVisible("skeleton-avancado") && <>
          <Separator />
          <section id="skeleton-avancado">
            <h2 className="text-2xl font-bold mb-2">Skeleton Avançado</h2>
            <p className="text-muted-foreground mb-6">Composições prontas de skeletons (lista com avatar, card de conteúdo, tabela) para evitar layout shift durante o carregamento.</p>
            <SkeletonAvancado />
          </section>
          </>}

          {isVisible("empty") && <>
          <Separator />
          <section id="empty">
            <h2 className="text-2xl font-bold mb-2">Empty (Estado Vazio)</h2>
            <p className="text-muted-foreground mb-6">Placeholder para listas, buscas e tabelas sem dados, com ícone, descrição e CTA opcional para guiar a próxima ação.</p>
            <EmptyWidget />
          </section>
          </>}

          {isVisible("result") && <>
          <Separator />
          <section id="result">
            <h2 className="text-2xl font-bold mb-2">Result</h2>
            <p className="text-muted-foreground mb-6">Tela de feedback após operações críticas (sucesso, erro, acesso negado) usando tokens semânticos success / error / warning.</p>
            <ResultWidget />
          </section>
          </>}


          {/* ===== NAVEGAÇÃO ===== */}
          {isVisible("drawer-simples") && <>
          <Separator />
          <section id="drawer-simples">
            <h2 className="text-2xl font-bold mb-2">Drawer</h2>
            <p className="text-muted-foreground mb-6">Painel lateral simples para edição, detalhes ou formulários secundários sem sair do contexto principal.</p>
            <DrawerSimples />
          </section>
          </>}

          {isVisible("drawer-multi") && <>
          <Separator />
          <section id="drawer-multi">
            <h2 className="text-2xl font-bold mb-2">Drawer Multi-nível</h2>
            <p className="text-muted-foreground mb-6">Drawers empilhados (push) que preservam a hierarquia em fluxos detalhados de edição sem perder o contexto da camada anterior.</p>
            <DrawerMultiNivel />
          </section>
          </>}

          {isVisible("steps") && <>
          <Separator />
          <section id="steps">
            <h2 className="text-2xl font-bold mb-2">Steps (Wizard)</h2>
            <p className="text-muted-foreground mb-6">Etapas numeradas com estados completo / atual / pendente e linha de progresso para fluxos guiados.</p>
            <StepsWidget />
          </section>
          </>}

          {isVisible("segmented") && <>
          <Separator />
          <section id="segmented">
            <h2 className="text-2xl font-bold mb-2">Switch</h2>
            <p className="text-muted-foreground mb-6">Toggle compacto para alternar entre poucas opções (períodos, modos de visualização) ou estados binários (on/off).</p>
            <SegmentedWidget />
            <div className="mt-6">
              <SwitchSimplesWidget />
            </div>
            <div className="mt-6">
              <SwitchDisabledWidget />
            </div>
          </section>
          </>}

          {isVisible("anchor") && <>
          <Separator />
          <section id="anchor">
            <h2 className="text-2xl font-bold mb-2">Anchor (Scroll Spy)</h2>
            <p className="text-muted-foreground mb-6">Menu lateral de âncoras que destaca a seção visível enquanto o usuário rola a página.</p>
            <AnchorWidget />
          </section>
          </>}

          {isVisible("tabs-geist") && <>
          <Separator />
          <section id="tabs-geist">
            <h2 className="text-2xl font-bold mb-2">Tabs</h2>
            <p className="text-muted-foreground mb-6">Tabs minimalistas inspiradas no Geist: indicador em barra sob a aba ativa e divisor inferior contínuo, sem fundos coloridos.</p>
            <TabsGeistWidget />
          </section>
          </>}

          {isVisible("tour") && <>
          <Separator />
          <section id="tour">
            <h2 className="text-2xl font-bold mb-2">Tour</h2>
            <p className="text-muted-foreground mb-6">Onboarding guiado em sequência: overlay escuro com spotlight no elemento alvo e popover com descrição e navegação.</p>
            <TourWidget />
          </section>
          </>}


          {/* ===== ENTRADA DE DADOS ===== */}
          {isVisible("upload-preview") && <>
          <Separator />
          <section id="upload-preview">
            <h2 className="text-2xl font-bold mb-2">Upload com Preview</h2>
            <p className="text-muted-foreground mb-6">Dropzone de imagens com preview em grid, progresso simulado, contagem e remoção individual.</p>
            <UploadComPreview />
          </section>
          </>}

          {isVisible("calendar") && <>
          <Separator />
          <section id="calendar">
            <h2 className="text-2xl font-bold mb-2">Calendário</h2>
            <p className="text-muted-foreground mb-6">Componentes de calendário para seleção de data única, intervalo de datas e versão compacta em popover. Localização em <code className="bg-muted px-1 rounded text-sm font-mono">pt-BR</code>.</p>
            <CalendarioWidget />
          </section>
          </>}

          {isVisible("rate") && <>
          <Separator />
          <section id="rate">
            <h2 className="text-2xl font-bold mb-2">Rate (Avaliação)</h2>
            <p className="text-muted-foreground mb-6">Estrelas interativas com hover preview, suporte a meias estrelas e modo somente-leitura. Cor padrão usa o token semântico <code className="bg-muted px-1 rounded text-sm font-mono">warning</code>.</p>
            <RateWidget />
          </section>
          </>}

          {isVisible("mentions") && <>
          <Separator />
          <section id="mentions">
            <h2 className="text-2xl font-bold mb-2">Mentions</h2>
            <p className="text-muted-foreground mb-6">Textarea que detecta '@' (menções) ou '#' (tags) e abre sugestões em popover ancorado ao caret.</p>
            <MentionsWidget />
          </section>
          </>}

          {isVisible("cascader") && <>
          <Separator />
          <section id="cascader">
            <h2 className="text-2xl font-bold mb-2">Cascader</h2>
            <p className="text-muted-foreground mb-6">Drill-down em colunas para navegar categorias hierárquicas (alternativa ao TreeSelect com colunas lado a lado).</p>
            <CascaderWidget />
          </section>
          </>}

          {isVisible("tool-autocomplete") && <>
          <Separator />
          <section id="tool-autocomplete">
            <h2 className="text-2xl font-bold mb-2">AutoComplete</h2>
            <p className="text-muted-foreground mb-6">Input com sugestões filtradas em popover, navegação por teclado (↑ ↓ Enter Esc) e highlight do trecho buscado.</p>
            <AutoCompleteWidget />
          </section>
          </>}

          {isVisible("tool-treeselect") && <>
          <Separator />
          <section id="tool-treeselect">
            <h2 className="text-2xl font-bold mb-2">TreeSelect</h2>
            <p className="text-muted-foreground mb-6">Select hierárquico com nodes expansíveis para classes de ativos, taxonomias e categorias aninhadas.</p>
            <TreeSelectWidget />
          </section>
          </>}

          {isVisible("tool-transfer") && <>
          <Separator />
          <section id="tool-transfer">
            <h2 className="text-2xl font-bold mb-2">Transfer</h2>
            <p className="text-muted-foreground mb-6">Transferência de itens entre listas (disponíveis ↔ selecionados) com checkboxes, busca e ações em massa.</p>
            <TransferWidget />
          </section>
          </>}

          {isVisible("checkbox") && <>
          <Separator />
          <section id="checkbox">
            <h2 className="text-2xl font-bold mb-2">Checkbox</h2>
            <p className="text-muted-foreground mb-6">Caixa de seleção para escolhas binárias e múltiplas. Suporta estados <strong>checked</strong>, <strong>disabled</strong> e <strong>indeterminate</strong>.</p>

            <div className="space-y-6">
              <ComponentShowcase
                title="Default"
                description="Checkbox controlado com estado de marcado/desmarcado."
                code={`import { Checkbox } from 'geist/components';\nimport { useState, type JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  const [checked, setChecked] = useState(false);\n  return (\n    <Checkbox checked={checked} onChange={(): void => setChecked((b) => !b)}>\n      Option 1\n    </Checkbox>\n  );\n}`}
                htmlCode={checkboxHtml}
              >
                <CheckboxDefault />
              </ComponentShowcase>

              <ComponentShowcase
                title="Disabled"
                description="Estados desabilitados: padrão, marcado e indeterminado."
                code={`import { Checkbox } from 'geist/components';\nimport type { JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  return (\n    <div className="flex flex-col items-stretch justify-start gap-4 flex-initial">\n      <Checkbox disabled>Disabled</Checkbox>\n      <Checkbox checked disabled>\n        Disabled Checked\n      </Checkbox>\n      <Checkbox disabled indeterminate>\n        Disabled Indeterminate\n      </Checkbox>\n    </div>\n  );\n}`}
                htmlCode={checkboxHtml}
              >
                <CheckboxDisabled />
              </ComponentShowcase>
            </div>
          </section>
          </>}

          {isVisible("choicebox") && <>
          <Separator />
          <section id="choicebox">
            <h2 className="text-2xl font-bold mb-2">Choicebox</h2>
            <p className="text-muted-foreground mb-6">Cartões de seleção em grupo, em formato <strong>radio</strong> (escolha única) ou <strong>checkbox</strong> (múltipla). Cada item exibe título e descrição.</p>

            <div className="space-y-6">
              <ComponentShowcase
                title="Radio (escolha única)"
                description="Grupo de cartões com seleção única usando type='radio'."
                code={`'use client';\nimport { ChoiceboxGroup } from 'geist/components';\nimport { useState, type JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  const [value, setValue] = useState('trial');\n  return (\n    <ChoiceboxGroup\n      direction="row"\n      label="select a plan"\n      onChange={setValue}\n      type="radio"\n      value={value}\n    >\n      <ChoiceboxGroup.Item description="Free for two weeks" title="Pro Trial" value="trial" />\n      <ChoiceboxGroup.Item description="Get started now" title="Pro" value="pro" />\n    </ChoiceboxGroup>\n  );\n}`}
                htmlCode={choiceboxHtml}
              >
                <ChoiceboxRadio />
              </ComponentShowcase>

              <ComponentShowcase
                title="Checkbox (múltipla escolha)"
                description="Grupo de cartões permitindo seleção múltipla usando type='checkbox'."
                code={`'use client';\nimport { ChoiceboxGroup } from 'geist/components';\nimport { useState, type JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  const [value, setValue] = useState([] as string[]);\n  return (\n    <ChoiceboxGroup\n      direction="row"\n      label="select a plan"\n      onChange={setValue}\n      type="checkbox"\n      value={value}\n    >\n      <ChoiceboxGroup.Item description="Free for two weeks" title="Pro Trial" value="trial" />\n      <ChoiceboxGroup.Item description="Get started now" title="Pro" value="pro" />\n    </ChoiceboxGroup>\n  );\n}`}
                htmlCode={choiceboxHtml}
              >
                <ChoiceboxCheckbox />
              </ComponentShowcase>

              <ComponentShowcase
                title="Disabled"
                description="Grupo inteiro desabilitado e item individual desabilitado."
                code={`'use client';\nimport { ChoiceboxGroup } from 'geist/components';\nimport { useState, type JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  const [value, setValue] = useState('');\n  const [value2, setValue2] = useState([] as string[]);\n  return (\n    <div className="flex flex-col items-stretch justify-start gap-6 flex-initial">\n      <ChoiceboxGroup direction="row" disabled label="Choicebox group disabled" onChange={setValue} showLabel type="radio" value={value}>\n        <ChoiceboxGroup.Item description="Free for two weeks" title="Pro Trial" value="trial" />\n        <ChoiceboxGroup.Item description="Get started now" title="Pro" value="pro" />\n      </ChoiceboxGroup>\n      <ChoiceboxGroup direction="row" label="Single input disabled" onChange={setValue2} showLabel type="checkbox" value={value2}>\n        <ChoiceboxGroup.Item description="Free for two weeks" disabled title="Pro Trial" value="trial" />\n        <ChoiceboxGroup.Item description="Get started now" title="Pro" value="pro" />\n      </ChoiceboxGroup>\n    </div>\n  );\n}`}
                htmlCode={choiceboxHtml}
              >
                <ChoiceboxDisabled />
              </ComponentShowcase>
            </div>
          </section>
          </>}



          {/* ===== EXIBIÇÃO DE DADOS ===== */}
          {isVisible("statistic") && <>
          <Separator />
          <section id="statistic">
            <h2 className="text-2xl font-bold mb-2">Statistic (KPIs)</h2>
            <p className="text-muted-foreground mb-6">Cards numéricos com contagem progressiva animada, prefixos/sufixos e tendência (up/down) em tokens semânticos.</p>
            <StatisticWidget />
          </section>
          </>}

          {isVisible("timeline") && <>
          <Separator />
          <section id="timeline">
            <h2 className="text-2xl font-bold mb-2">Timeline</h2>
            <p className="text-muted-foreground mb-6">Linha do tempo vertical com estados semânticos (concluído, ativo, pendente, erro) para histórico e jornada do usuário.</p>
            <TimelineWidget />
          </section>
          </>}

          {isVisible("tree") && <>
          <Separator />
          <section id="tree">
            <h2 className="text-2xl font-bold mb-2">Tree</h2>
            <p className="text-muted-foreground mb-6">Árvore expansível com ícones de pasta/arquivo para explorar estruturas hierárquicas profundas.</p>
            <TreeWidget />
          </section>
          </>}

          {isVisible("descriptions") && <>
          <Separator />
          <section id="descriptions">
            <h2 className="text-2xl font-bold mb-2">Descriptions</h2>
            <p className="text-muted-foreground mb-6">Lista de propriedades chave/valor em grid responsivo. Padrão para páginas de detalhe (perfil, pedido, fatura).</p>
            <DescriptionsWidget />
          </section>
          </>}

          {isVisible("tabela") && <>
          <Separator />
          <section id="tabela">
            <h2 className="text-2xl font-bold mb-2">Tabela</h2>
            <p className="text-muted-foreground mb-6">Tabela enxuta inspirada no Geist: cabeçalho discreto em caixa alta, zebra sutil nas linhas e última coluna alinhada à direita.</p>
            <TabelaWidget />
            <div className="mt-6">
              <TabelaBorderedWidget />
            </div>
          </section>
          </>}

          {isVisible("progress-geist") && <>
          <Separator />
          <section id="progress-geist">
            <h2 className="text-2xl font-bold mb-2">Progress Bar</h2>
            <p className="text-muted-foreground mb-6">Barra de progresso minimalista inspirada no Geist: trilha clara, preenchimento sólido e cantos totalmente arredondados.</p>
            <ProgressGeistWidget />
          </section>
          </>}

          {isVisible("watermark") && <>
          <Separator />
          <section id="watermark">
            <h2 className="text-2xl font-bold mb-2">Watermark (Marca d'água)</h2>
            <p className="text-muted-foreground mb-6">Texto repetido em diagonal sobre conteúdo sensível (relatórios, dashboards internos), gerado via canvas em data URL.</p>
            <WatermarkWidget />
          </section>
          </>}

          {isVisible("tool-graficos") && <>
          <Separator />
          <section id="tool-graficos">
            <h2 className="text-2xl font-bold mb-2">Gráficos</h2>
            <p className="text-muted-foreground mb-6">
              Padrão oficial de donut charts AUVP e suas variações de legenda (horizontal abaixo,
              em linha única, ou vertical à esquerda/direita do gráfico).
            </p>
            <div className="space-y-10">
              <SectionThemeToggle bare selfDocumented><GraficoPizza /></SectionThemeToggle>
              <SectionThemeToggle bare selfDocumented><GraficoPizzaLegendas /></SectionThemeToggle>
            </div>
          </section>
          </>}


          {/* ===== PLATAFORMA DE AULAS ===== */}
          {isVisible("plat-courses") && <>
          <Separator />
          <section id="plat-courses">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Visualização de Cursos</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Grid de cursos com progresso e fácil retomada de aulas.</p>
            <SectionThemeToggle bare code={platCursosSrc} htmlCode={platCursosHtml}><PlataformaCursos /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-player") && <>
          <Separator />
          <section id="plat-player">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Interface do Player</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">O vídeo é o core da plataforma. Controles com overlay e auto-hide.</p>
            <SectionThemeToggle bare code={platPlayerSrc} htmlCode={platPlayerHtml}><PlataformaPlayer /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-playlist") && <>
          <Separator />
          <section id="plat-playlist">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Lista de Aulas (Playlist)</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Estados: Assistindo, Concluído e Bloqueado.</p>
            <SectionThemeToggle bare code={platPlaylistSrc} htmlCode={platPlaylistHtml}><PlataformaPlaylist /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-dashboard") && <>
          <Separator />
          <section id="plat-dashboard">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Dashboard do Aluno</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Estatísticas, atividade semanal e conquistas.</p>
            <SectionThemeToggle bare code={platDashboardSrc} htmlCode={platDashboardHtml}><PlataformaDashboard /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-notes") && <>
          <Separator />
          <section id="plat-notes">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Notas & Anotações</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Notas sincronizadas com timestamp do vídeo.</p>
            <SectionThemeToggle bare code={platNotasSrc} htmlCode={platNotasHtml}><PlataformaNotas /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-rating") && <>
          <Separator />
          <section id="plat-rating">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Avaliação de Aulas</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Rating por estrelas com feedback textual.</p>
            <SectionThemeToggle bare code={platRatingSrc} htmlCode={platRatingHtml}><PlataformaRating /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-certificates") && <>
          <Separator />
          <section id="plat-certificates">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Certificados</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Certificados de conclusão emitidos automaticamente ao finalizar módulos.</p>
            <SectionThemeToggle bare code={platCertificadosSrc} htmlCode={platCertificadosHtml}><PlataformaCertificados /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-community") && <>
          <Separator />
          <section id="plat-community">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Comunidade & Dúvidas</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Fórum de dúvidas com votos e respostas de instrutores.</p>
            <SectionThemeToggle bare code={platComunidadeSrc} htmlCode={platComunidadeHtml}><PlataformaComunidade /></SectionThemeToggle>
          </section>
          </>}

          {isVisible("plat-livro") && <>
          <Separator />
          <section id="plat-livro">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Livro</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Capas 3D inspiradas no <em>Book</em> do Geist (Vercel). Use para hero de módulos, trilhas e
              landing de cursos. Para tiles repetidos no dashboard, prefira <strong>Card</strong> — Livro é
              decorativo demais para listas longas.
            </p>

            <div className="space-y-6">
              <ComponentShowcase
                title="Default"
                description="Capa padrão com cor primária da marca."
                code={`import { Book } from 'geist/components';\nimport type { JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  return <Book title="The user experience of the Frontend Cloud" />;\n}`}
                htmlCode={livroBaseHtml + "\n" + livroDefaultHtml}
              >
                <LivroDefault />
              </ComponentShowcase>

              <ComponentShowcase
                title="Variants"
                description="Variantes simple (apenas título) e stripe (com faixa horizontal)."
                code={`import { Book } from 'geist/components';\nimport type { JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  return (\n    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">\n      <Book\n        title="The user experience of the Frontend Cloud"\n        variant="simple"\n        width={196}\n      />\n      <Book\n        title="The user experience of the Frontend Cloud"\n        variant="stripe"\n        width={196}\n      />\n    </div>\n  );\n}`}
                htmlCode={livroBaseHtml + "\n" + livroVariantsHtml}
              >
                <LivroVariants />
              </ComponentShowcase>

              <ComponentShowcase
                title="Custom color"
                description="Cores customizadas via prop color e textColor."
                code={`import { Book } from 'geist/components';\nimport type { JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  return (\n    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">\n      <Book\n        color="#9D2127"\n        title="How Vercel improves your website's search engine ranking"\n      />\n      <Book\n        color="#7DC1C1"\n        textColor="white"\n        title="Design Engineering at Vercel"\n        variant="simple"\n      />\n      <Book color="#FED954" title="The user experience of the Frontend Cloud" />\n    </div>\n  );\n}`}
                htmlCode={livroBaseHtml + "\n" + livroCustomHtml}
              >
                <LivroCustomColor />
              </ComponentShowcase>

              <ComponentShowcase
                title="Responsive"
                description="Largura responsiva com objeto { sm, md } por breakpoint."
                code={`import { Book } from 'geist/components';\nimport type { JSX } from 'react';\n\nexport function Component(): JSX.Element {\n  return (\n    <Book\n      title="The user experience of the Frontend Cloud"\n      width={{ sm: 150, md: 196 }}\n    />\n  );\n}`}
                htmlCode={livroBaseHtml + "\n" + livroResponsivoHtml}
              >
                <LivroResponsivo />
              </ComponentShowcase>
            </div>
          </section>
          </>}


          {isVisible("ai-food") && <>
          <Separator />
          <section id="ai-food"><AIFood /></section>
          </>}

          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}
