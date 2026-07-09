import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

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
import { LivroDefault, LivroVariants, LivroCustomColor, LivroIcone, LivroIlustrado, LivroTexturado, LivroTamanhos, LivroResponsivo } from "@/components/widgets/Livro";
import livroBaseHtml from "@/components/widgets/html-snippets/livro-base.html?raw";
import livroDefaultHtml from "@/components/widgets/html-snippets/livro-default.html?raw";
import livroVariantsHtml from "@/components/widgets/html-snippets/livro-variants.html?raw";
import livroCustomHtml from "@/components/widgets/html-snippets/livro-custom.html?raw";
import livroIconHtml from "@/components/widgets/html-snippets/livro-icon.html?raw";
import livroIllustrationHtml from "@/components/widgets/html-snippets/livro-illustration.html?raw";
import livroTexturedHtml from "@/components/widgets/html-snippets/livro-textured.html?raw";
import livroResponsivoHtml from "@/components/widgets/html-snippets/livro-responsivo.html?raw";
import { CheckboxDefault, CheckboxDisabled } from "@/components/widgets/CheckboxGeist";
import checkboxGeistSrc from "@/components/widgets/CheckboxGeist?raw";
import checkboxHtml from "@/components/widgets/html-snippets/checkbox.html?raw";
import { ChoiceboxRadio, ChoiceboxCheckbox, ChoiceboxDisabled } from "@/components/widgets/ChoiceboxGeist";
import choiceboxGeistSrc from "@/components/widgets/ChoiceboxGeist?raw";
import choiceboxHtml from "@/components/widgets/html-snippets/choicebox.html?raw";
import gradeCurricularSrc from "@/components/widgets/GradeCurricular?raw";
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
import tabelaPrecosHtml from "@/components/widgets/html-snippets/tabela-precos.html?raw";
import jornadaHeroiSrc from "@/components/widgets/JornadaHeroi?raw";
import jornadaHeroiHtml from "@/components/widgets/html-snippets/jornada-heroi.html?raw";
import marcaLogosSrc from "@/components/widgets/MarcaLogos?raw";
import marcaLogosHtml from "@/components/widgets/html-snippets/marca-logos.html?raw";
import paletaDataVizSrc from "@/components/widgets/PaletaDataViz?raw";
import iconesSrc from "@/components/widgets/Icones?raw";
import layoutEspacamentoSrc from "@/components/widgets/LayoutEspacamento?raw";
import contagemRegressivaSrc from "@/components/widgets/ContagemRegressiva?raw";
import faqDuvidasSrc from "@/components/widgets/FaqDuvidas?raw";
import widgetsFlutuantesSrc from "@/components/widgets/WidgetsFlutuantes?raw";
import calculadoraRendimentosSrc from "@/components/widgets/CalculadoraRendimentos?raw";
import calculadoraSrc from "@/components/widgets/Calculadora?raw";
import tooltipsPopupsSrc from "@/components/widgets/TooltipsPopups?raw";
import graficoPizzaSrc from "@/components/widgets/GraficoPizza?raw";
import graficoPizzaLegendasSrc from "@/components/widgets/GraficoPizzaLegendas?raw";
import cardsContainersSrc from "@/components/widgets/CardsContainers?raw";
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
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { Tag } from "@/components/widgets/Tag";
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
  ChevronRight, ChevronLeft, CalendarIcon, SquareCheck, Table as TableIcon,
  Sun, Moon
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

import { sections, categoryLabels, type SectionDefWithKeywords } from "@/data/designSystemSections";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchButton } from "@/components/SearchButton";

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
  const { theme } = useTheme();

  React.useEffect(() => {
    if (!ref.current) return;
    const raw = getComputedStyle(ref.current).getPropertyValue(`--${cssVar}`).trim();
    const parts = raw.replace(/%/g, "").split(/\s+/).map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const [r, g, b] = hslToRgb(parts[0], parts[1], parts[2]);
      setHex(rgbToHex(r, g, b));
      setRgb(`${r}, ${g}, ${b}`);
    }
  }, [cssVar, theme]);

  const [copied, setCopied] = useState(false);
  const copyHex = () => {
    if (!hex) return;
    navigator.clipboard?.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="space-y-2" ref={ref}>
      <button
        type="button"
        onClick={copyHex}
        title={hex ? `Copiar ${hex}` : name}
        aria-label={hex ? `Copiar ${hex}` : name}
        className="h-24 w-full rounded-lg border flex items-end p-3 cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ backgroundColor: `hsl(var(--${cssVar}))` }}
      >
        <span className="text-xs font-semibold" style={{ color: `hsl(var(--${fgVar}))` }}>
          {copied ? "Copiado! ✓" : name}
        </span>
      </button>
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
  const [brandOpen, setBrandOpen] = useState(true);
  const { brand, setBrand } = useBrand();
  const { toast } = useToast();

  // Reseta para Capital ao sair do Design System
  useEffect(() => {
    return () => { setBrand("capital"); };
  }, []);

  const handleBrandPreview = (b: "capital" | "escola") => {
    if (b === "escola") document.documentElement.classList.add("escola");
    else document.documentElement.classList.remove("escola");
  };
  const handleBrandRevert = () => {
    if (brand === "escola") document.documentElement.classList.add("escola");
    else document.documentElement.classList.remove("escola");
  };

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
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
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
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-foreground/10">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold font-anek">Design System</p>
                      <p className="text-xs text-muted-foreground">AUVP</p>
                    </div>
                  </div>
                </div>

                <div className="px-3 pt-3">
                  {/* Seletor de produto */}
                  <div className="pb-3 mb-2 border-b">
                    <button
                      type="button"
                      onClick={() => setBrandOpen((o) => !o)}
                      className="w-full flex items-start justify-between gap-2 px-1 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <span>Produto</span>
                      <ChevronRight className={cn("mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform", brandOpen && "rotate-90")} />
                    </button>
                    {brandOpen && (
                      <div className="space-y-0.5 mt-1">
                        {[
                          { id: "capital" as const, label: "AUVP Capital", color: "hsl(155,93%,11%)" },
                          { id: "escola" as const, label: "AUVP Escola", color: "hsl(42,84%,63%)" },
                        ].map((b) => (
                          <button
                            key={b.id}
                            onMouseEnter={() => handleBrandPreview(b.id)}
                            onMouseLeave={handleBrandRevert}
                            onClick={() => setBrand(b.id)}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm font-medium text-left transition-colors duration-150",
                              brand === b.id
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            <span className="h-3 w-3 rounded-[3px] shrink-0" style={{ backgroundColor: brand === b.id ? "currentColor" : b.color }} />
                            {b.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SearchButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex gap-0 relative px-4 md:px-8">
        {/* Sidebar Nav — Desktop only */}
        <nav className="sticky top-16 h-[calc(100vh-4rem)] w-56 shrink-0 border-r py-6 pr-4 overflow-y-auto hidden md:block">
          {/* Seletor de produto */}
          <div className="px-2 pb-3 mb-3 border-b">
            <button
              type="button"
              onClick={() => setBrandOpen((o) => !o)}
              className="w-full flex items-start justify-between gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <span>Produto</span>
              <ChevronRight className={cn("mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform", brandOpen && "rotate-90")} />
            </button>
            {brandOpen && (
              <div className="space-y-0.5 mt-1">
                {[
                  { id: "capital" as const, label: "AUVP Capital", color: "hsl(155,93%,11%)" },
                  { id: "escola" as const, label: "AUVP Escola", color: "hsl(42,84%,63%)" },
                ].map((b) => (
                  <button
                    key={b.id}
                    onMouseEnter={() => handleBrandPreview(b.id)}
                    onMouseLeave={handleBrandRevert}
                    onClick={() => setBrand(b.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm font-medium text-left transition-colors duration-150",
                      brand === b.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="h-3 w-3 rounded-[3px] shrink-0" style={{ backgroundColor: brand === b.id ? "currentColor" : b.color }} />
                    {b.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          <section id="intro"><Introducao /></section>

          <Separator />
          <section id="marca">
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
            <SectionThemeToggle bare title="Marca & Logos" description="Aplicações oficiais de marca AUVP. Use sempre os arquivos originais sem distorções nem recortes." code={marcaLogosSrc} htmlCode={marcaLogosHtml}><MarcaLogos /></SectionThemeToggle>
          </section>

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
              <SectionThemeToggle bare title="Paleta de Dados & Gráficos" description="Conjunto expandido de cores derivado da identidade de marca, usado em tabelas com múltiplas categorias, gráficos de pizza, barras, linhas e mapas de calor." code={paletaDataVizSrc} selfDocumented><PaletaDataViz /></SectionThemeToggle>
            </div>
          </section>

          <Separator />
          <section id="icons">
            <h2 className="text-2xl font-bold mb-2">Ícones</h2>
            <p className="text-muted-foreground mb-6">Biblioteca de ícones Phosphor Icons utilizada em todo o ecossistema AUVP.</p>
            <SectionThemeToggle bare title="Ícones Phosphor" description="Biblioteca Phosphor Icons utilizada em todo o ecossistema AUVP. Inclui variantes regular, bold e fill." code={iconesSrc} selfDocumented><Icones /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="elevation">
            <h2 className="text-2xl font-bold mb-2">Sombras & Elevação</h2>
            <p className="text-muted-foreground mb-6">Escala de sombras para hierarquia de profundidade. O hover oficial de cards usa <code className="bg-muted px-1 rounded text-sm font-mono">0 8px 24px rgba(0,0,0,0.06)</code> com <code className="bg-muted px-1 rounded text-sm font-mono">translateY(-2px)</code>.</p>
            <ComponentShowcase
              title="Escala de Elevação"
              description="Do mais sutil (inputs) ao mais elevado (modais). Sombras nunca substituem borda em fundos escuros — combine com border."
              code={`<div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
  {[
    { cls: "shadow-sm", uso: "Inputs e elementos sutis" },
    { cls: "shadow-md", uso: "Cards em destaque leve" },
    { cls: "shadow-lg", uso: "Popovers e dropdowns" },
    { cls: "shadow-xl", uso: "Modais e ferramentas" },
  ].map((s) => (
    <div key={s.cls} className={\`bg-card border border-border rounded-xl p-6 text-center \${s.cls}\`}>
      <p className="font-mono text-sm font-bold text-foreground">{s.cls}</p>
      <p className="text-xs text-muted-foreground mt-1">{s.uso}</p>
    </div>
  ))}
</div>

{/* Hover oficial de cards do DS */}
<div className="bg-card border border-border rounded-xl p-6 text-center transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer w-full max-w-xs">
  <p className="font-bold text-foreground font-anek">Hover oficial de card</p>
  <p className="text-xs text-muted-foreground mt-1">shadow 0 8px 24px rgba(0,0,0,0.06) + translateY(-2px) em 240ms</p>
</div>`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {[
                  { cls: "shadow-sm", uso: "Inputs e elementos sutis" },
                  { cls: "shadow-md", uso: "Cards em destaque leve" },
                  { cls: "shadow-lg", uso: "Popovers e dropdowns" },
                  { cls: "shadow-xl", uso: "Modais e ferramentas" },
                ].map((s) => (
                  <div key={s.cls} className={`bg-card border border-border rounded-xl p-6 text-center ${s.cls}`}>
                    <p className="font-mono text-sm font-bold text-foreground">{s.cls}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.uso}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer w-full max-w-xs">
                <p className="font-bold text-foreground font-anek">Hover oficial de card</p>
                <p className="text-xs text-muted-foreground mt-1">shadow 0 8px 24px rgba(0,0,0,0.06) + translateY(-2px) em 240ms</p>
              </div>
            </ComponentShowcase>
          </section>

          <Separator />
          <section id="motion">
            <h2 className="text-2xl font-bold mb-2">Motion & Animações</h2>
            <p className="text-muted-foreground mb-6">Durações e easings padronizados. Animações via JS devem respeitar <code className="bg-muted px-1 rounded text-sm font-mono">prefers-reduced-motion</code> (hook <code className="bg-muted px-1 rounded text-sm font-mono">useReducedMotion</code>); as de CSS já são neutralizadas globalmente.</p>
            <ComponentShowcase
              title="Durações & Easings"
              description="Passe o cursor sobre os cards para sentir cada duração. 240ms ease é o padrão do sistema; 320ms nas LPs da Escola."
              code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
  {[
    { ms: "150ms", cls: "duration-150", uso: "Micro-interações: ícones, toggles, tooltips" },
    { ms: "240ms", cls: "duration-[240ms]", uso: "Padrão do sistema: botões, cards, hovers" },
    { ms: "320ms", cls: "duration-[320ms]", uso: "Escola LP: cards translúcidos e destaques" },
  ].map((d) => (
    <div key={d.ms} className={\`bg-card border border-border rounded-xl p-6 text-center transition-all ease-out hover:-translate-y-1 hover:shadow-md cursor-pointer \${d.cls}\`}>
      <p className="font-mono text-2xl font-bold text-foreground">{d.ms}</p>
      <p className="text-xs text-muted-foreground mt-2">{d.uso}</p>
    </div>
  ))}
</div>

{/* Easings oficiais */}
<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
  <div className="rounded-lg border border-border bg-muted/30 p-4">
    <p className="font-mono font-bold text-foreground">ease / ease-out</p>
    <p className="text-xs text-muted-foreground mt-1">Padrão para hovers e transições de cor/sombra.</p>
  </div>
  <div className="rounded-lg border border-border bg-muted/30 p-4">
    <p className="font-mono font-bold text-foreground">cubic-bezier(0.175, 0.885, 0.32, 1.275)</p>
    <p className="text-xs text-muted-foreground mt-1">Overshoot sutil — popups e balões dos widgets flutuantes.</p>
  </div>
</div>`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {[
                  { ms: "150ms", cls: "duration-150", uso: "Micro-interações: ícones, toggles, tooltips" },
                  { ms: "240ms", cls: "duration-[240ms]", uso: "Padrão do sistema: botões, cards, hovers" },
                  { ms: "320ms", cls: "duration-[320ms]", uso: "Escola LP: cards translúcidos e destaques" },
                ].map((d) => (
                  <div key={d.ms} className={`bg-card border border-border rounded-xl p-6 text-center transition-all ease-out hover:-translate-y-1 hover:shadow-md cursor-pointer ${d.cls}`}>
                    <p className="font-mono text-2xl font-bold text-foreground">{d.ms}</p>
                    <p className="text-xs text-muted-foreground mt-2">{d.uso}</p>
                  </div>
                ))}
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="font-mono font-bold text-foreground">ease / ease-out</p>
                  <p className="text-xs text-muted-foreground mt-1">Padrão para hovers e transições de cor/sombra.</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="font-mono font-bold text-foreground">cubic-bezier(0.175, 0.885, 0.32, 1.275)</p>
                  <p className="text-xs text-muted-foreground mt-1">Overshoot sutil — popups e balões dos widgets flutuantes.</p>
                </div>
              </div>
            </ComponentShowcase>
          </section>


          {/* ===== LAYOUT & ESTRUTURA ===== */}
          <Separator />
          <section id="layout">
            <h2 className="text-2xl font-bold mb-2">Layout & Espaçamento</h2>
            <p className="text-muted-foreground mb-6">Ritmo vertical e alinhamento baseados em múltiplos de 15px.</p>
            <SectionThemeToggle bare title="Layout & Espaçamento" description="Ritmo vertical e alinhamento baseados em múltiplos de 15px. Container max-w-1200px, padding inline 24px, seções alternam entre #FFF → #F2F2F2 → #000." code={layoutEspacamentoSrc} selfDocumented><LayoutEspacamento /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="cards-containers">
            <h2 className="text-2xl font-bold mb-2">Cards & Containers</h2>
            <p className="text-muted-foreground mb-6">Regras para criar cards e áreas destacadas dentro de dobras institucionais.</p>
            <ComponentShowcase
              title="Cards & Containers"
              description="Border radius 12px sempre. Contraste baixo entre card e fundo da dobra. Dobra preta → card #1B1B1B. Dobra cinza → card #FFF. Dobra branca → card #F2F2F2."
              code={cardsContainersSrc}
              showToggle={false}
            >
              <CardsContainers />
            </ComponentShowcase>
          </section>


          {/* ===== BOTÕES & AÇÕES ===== */}
          <Separator />
          <section id="buttons">
            <h2 className="text-2xl font-bold mb-2">Botões</h2>
            <p className="text-muted-foreground mb-6">
              Fonte Sora Bold em caixa alta, border-radius de 5px e hover que revela a borda
              (fundo transparente). Pílulas (rounded-full) só são permitidas em ferramentas.
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
    height:40px; padding:0.5rem 1.25rem; border-radius:5px; font-family:'Sora',sans-serif;
    font-weight:600; text-transform:uppercase; font-size:14px;
    border:1px solid transparent; cursor:pointer; transition:all 0.2s; }
  .btn-lg { padding:1rem 2rem; height:48px; font-size:14px; letter-spacing:0.05em; }

  /* Padrão (default) — hover revela a borda */
  .btn-default { background:var(--primary,#023619); color:#fff; border-color:var(--primary,#023619); }
  .btn-default:hover { background:transparent; color:var(--primary,#023619); }

  /* CTA Landing Page */
  .btn-cta { background:#023619; color:#fff; }
  .btn-cta:hover { background:transparent; color:#023619; border-color:#023619; }

  /* CTA Invertido (para fundos escuros) — hover atenua o fundo claro.
     No tema escuro: fundo verde-acento #5A8770, texto quase-preto #0D0D0D. */
  .btn-cta-inverted { background:#fafafa; color:#023619; border-color:#023619; }
  .btn-cta-inverted:hover { background:#e0e0e0; }

  /* Secundário */
  .btn-secondary { background:var(--secondary,#15472F); color:#fff;
    border-color:var(--secondary,#15472F); }
  .btn-secondary:hover { background:transparent; color:var(--secondary,#15472F); }

  /* Contorno (outline) — hover usa a cor de acento */
  .btn-outline { background:transparent; color:inherit; border-color:#dfe3df; }
  .btn-outline:hover { background:var(--accent,#023619); color:#fff; }

  /* Fantasma (ghost) — hover usa a cor de acento */
  .btn-ghost { background:transparent; color:inherit; border-color:transparent; }
  .btn-ghost:hover { background:var(--accent,#023619); color:#fff; }

  /* Link */
  .btn-link { background:transparent; color:var(--primary,#023619); border:none; padding:0;
    text-decoration:none; }
  .btn-link:hover { text-decoration:underline; }

  /* Destrutivo */
  .btn-destructive { background:#e11414; color:#fff; border-color:#e11414; }
  .btn-destructive:hover { background:rgba(225,20,20,0.9); }
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
    border-radius:5px; font-family:'Sora',sans-serif; font-weight:700; text-transform:uppercase;
    cursor:pointer; }
  .btn-sm      { height:36px; padding:0 0.75rem;  font-size:12px; }
  .btn-default { height:40px; padding:0 1.25rem;  font-size:14px; }
  .btn-lg      { height:48px; padding:0 2rem;     font-size:14px; }
  .btn-xl      { height:56px; padding:0 2.5rem;   font-size:16px; }
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
                code={`<div className="bg-[hsl(155_93%_11%)] dark:bg-[hsl(0_0%_18%)] p-8 rounded-lg">
  <Button variant="cta-inverted" size="lg">Começar Agora</Button>
</div>`}
                htmlCode={`<div style="background:#023619; padding:2rem; border-radius:0.5rem;">\n  <button style="background:#fafafa; color:#023619; padding:1rem 2rem; border-radius:5px; font-family:'Sora'; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; font-size:14px; border:1px solid #fafafa; cursor:pointer;">COMEÇAR AGORA</button>\n</div>\n<!-- Hover: background #e0e0e0 (atenuação leve, mantém contraste) -->\n<!-- Tema escuro: background #5A8770, texto #0D0D0D, hover clareia p/ #74a18c -->`}>
                <div className="bg-[hsl(155_93%_11%)] dark:bg-[hsl(0_0%_18%)] p-8 rounded-lg flex items-center gap-4 w-full">
                  <Button variant="cta-inverted" size="lg">Começar Agora</Button>
                </div>
              </ComponentShowcase>
            </div>
          </section>

          <Separator />
          <section id="floaters">
            <h2 className="text-2xl font-bold mb-2">Widgets Flutuantes</h2>
            <p className="text-muted-foreground mb-6">Botões flutuantes (WhatsApp, Porquinho da Economia) com animação contínua.</p>
            <SectionThemeToggle bare title="Widgets Flutuantes" description="Botões flutuantes fixos (WhatsApp e Porquinho da Economia) com animação pulse contínua, posicionamento fixed e z-index elevado." code={widgetsFlutuantesSrc} selfDocumented><WidgetsFlutuantes /></SectionThemeToggle>
          </section>


          {/* ===== SEÇÕES DE PÁGINA ===== */}
          <Separator />
          <section id="grade">
            <h2 className="text-2xl font-bold mb-2">Grade Curricular</h2>
            <p className="text-muted-foreground mb-6">Abas pill-style com cards translúcidos em grid responsivo.</p>
            <ComponentShowcase title="Grade Curricular" description="Tabs com categorias e cards de módulos"
              code={gradeCurricularSrc}
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

          <Separator />
          <section id="countdown">
            <h2 className="text-2xl font-bold mb-2">Contagem Regressiva</h2>
            <p className="text-muted-foreground mb-6">Widget dinâmico focado em escassez, utilizando cards com backdrop-blur e transparência.</p>
            <SectionThemeToggle bare title="Contagem Regressiva" description="Widget de countdown dinâmico focado em escassez. Cards com backdrop-blur e transparência. Exibe dias, horas, minutos e segundos em tempo real." code={contagemRegressivaSrc} selfDocumented><ContagemRegressiva /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="faq">
            <h2 className="text-2xl font-bold mb-2">Dropdown</h2>
            <p className="text-muted-foreground mb-6">Componente global de dropdown para páginas de vendas, com temas claro e escuro.</p>
            <SectionThemeToggle bare title="Dropdown / FAQ" description="Accordion para páginas de vendas com temas claro e escuro. Ícone de + que gira para × na abertura. Transição suave de altura." code={faqDuvidasSrc} selfDocumented><FaqDuvidas /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="pricing">
            <h2 className="text-2xl font-bold mb-2">Tabela de Preços</h2>
            <p className="text-muted-foreground mb-6">Toggle animado com cards translúcidos, badges de desconto e CTA.</p>
            <SectionThemeToggle bare title="Tabela de Preços" description="Toggle animado mensal/anual com cards translúcidos, badge de desconto percentual e CTA primário em destaque." code={tabelaPrecosSrc} htmlCode={tabelaPrecosHtml}><TabelaPrecos /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="journey">
            <h2 className="text-2xl font-bold mb-2">Jornada do Herói</h2>
            <p className="text-muted-foreground mb-6">Timeline interativa com pontos clicáveis e barra de progresso animada.</p>
            <SectionThemeToggle bare title="Jornada do Herói" description="Timeline interativa com pontos clicáveis, barra de progresso animada e painel de conteúdo contextual para cada etapa da jornada." code={jornadaHeroiSrc} htmlCode={jornadaHeroiHtml}><JornadaHeroi /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="site-calc">
            <h2 className="text-2xl font-bold mb-2">Calculadora de Rendimentos</h2>
            <p className="text-muted-foreground mb-6">Widget de simulação para landing pages com tipografia e CTAs do tema Sites.</p>
            <SectionThemeToggle bare title="Calculadora de Rendimentos" description="Widget de simulação para landing pages com slider de valor, resultado animado e CTAs do tema Sites. Identidade visual Capital/Escola via contexto de marca." code={calculadoraRendimentosSrc} selfDocumented><CalculadoraRendimentos /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="tool-calc">
            <h2 className="text-2xl font-bold mb-2">Calculadora de Câmbio</h2>
            <p className="text-muted-foreground mb-6">Ferramenta interativa de conversão de moedas com IOF, VET e identidade visual da marca ({brand === "capital" ? "Capital" : "Escola"}).</p>
            <SectionThemeToggle bare title="Calculadora de Câmbio" description="Ferramenta interativa de conversão de moedas com cálculo automático de IOF, VET e exibição de cotação. Suporta múltiplas moedas e sentidos de conversão." code={calculadoraSrc} selfDocumented><Calculadora /></SectionThemeToggle>
          </section>


          {/* ===== FEEDBACK & OVERLAYS ===== */}
          <Separator />
          <section id="tooltips">
            <h2 className="text-2xl font-bold mb-2">Tooltips & Popups</h2>
            <p className="text-muted-foreground mb-6">Elementos flutuantes e guias de interação para Landing Pages.</p>
            <SectionThemeToggle bare title="Tooltips & Popups" description="Elementos flutuantes ancorados ao gatilho: tooltip simples (hover), popover com conteúdo rico (clique) e popup de destaque para Landing Pages." code={tooltipsPopupsSrc} selfDocumented><TooltipsPopups /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="notifications">
            <h2 className="text-2xl font-bold mb-2">Notificações</h2>
            <p className="text-muted-foreground mb-6">Pilha persistente de mensagens com tipos semânticos (success / info / warning / error). Diferente do Toast: usadas para fluxos longos como uploads, salvamentos automáticos e alertas de sistema.</p>
            <Notifications />
          </section>

          <Separator />
          <section id="popconfirm">
            <h2 className="text-2xl font-bold mb-2">Popconfirm</h2>
            <p className="text-muted-foreground mb-6">Confirmação inline ancorada ao gatilho — alternativa leve ao Dialog para ações destrutivas rápidas.</p>
            <PopconfirmWidget />
          </section>

          <Separator />
          <section id="spin">
            <h2 className="text-2xl font-bold mb-2">Spin (Loading)</h2>
            <p className="text-muted-foreground mb-6">Indicador de carregamento com mensagem opcional em Sora uppercase. Inclui modo overlay para encobrir áreas durante operações assíncronas.</p>
            <SpinTipWidget />
          </section>

          <Separator />
          <section id="progress-geist">
            <h2 className="text-2xl font-bold mb-2">Progress Bar</h2>
            <p className="text-muted-foreground mb-6">Barra de progresso minimalista inspirada no Geist: trilha clara, preenchimento sólido e cantos totalmente arredondados.</p>
            <ProgressGeistWidget />
          </section>

          <Separator />
          <section id="skeleton-avancado">
            <h2 className="text-2xl font-bold mb-2">Skeleton Avançado</h2>
            <p className="text-muted-foreground mb-6">Composições prontas de skeletons (lista com avatar, card de conteúdo, tabela) para evitar layout shift durante o carregamento.</p>
            <SkeletonAvancado />
          </section>

          <Separator />
          <section id="empty">
            <h2 className="text-2xl font-bold mb-2">Empty (Estado Vazio)</h2>
            <p className="text-muted-foreground mb-6">Placeholder para listas, buscas e tabelas sem dados, com ícone, descrição e CTA opcional para guiar a próxima ação.</p>
            <EmptyWidget />
          </section>

          <Separator />
          <section id="result">
            <h2 className="text-2xl font-bold mb-2">Result</h2>
            <p className="text-muted-foreground mb-6">Tela de feedback após operações críticas (sucesso, erro, acesso negado) usando tokens semânticos success / error / warning.</p>
            <ResultWidget />
          </section>

          <Separator />
          <section id="dialog">
            <h2 className="text-2xl font-bold mb-2">Modal (Dialog)</h2>
            <p className="text-muted-foreground mb-6">Sobreposição centralizada para formulários curtos e confirmações críticas. Para ações destrutivas, use o <strong>AlertDialog</strong> — ele exige uma escolha explícita (sem fechar clicando fora).</p>
            <ComponentShowcase
              title="Dialog & AlertDialog"
              description="Dialog para edições rápidas; AlertDialog para confirmações destrutivas. O conteúdo abre em portal e segue o tema global da página."
              showToggle={false}
              code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Abrir modal</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Editar apelido</DialogTitle>
      <DialogDescription>Como você prefere ser chamado dentro da plataforma?</DialogDescription>
    </DialogHeader>
    <div className="grid gap-1.5 py-2">
      <Label htmlFor="apelido">Apelido</Label>
      <Input id="apelido" placeholder="Ex.: Raul" />
    </div>
    <DialogFooter>
      <Button variant="ghost">Cancelar</Button>
      <Button>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir conta</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita. Sua conta e todos os dados associados serão removidos permanentemente.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Excluir
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Abrir modal</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Editar apelido</DialogTitle>
                    <DialogDescription>Como você prefere ser chamado dentro da plataforma?</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-1.5 py-2">
                    <Label htmlFor="apelido">Apelido</Label>
                    <Input id="apelido" placeholder="Ex.: Raul" />
                  </div>
                  <DialogFooter>
                    <Button variant="ghost">Cancelar</Button>
                    <Button>Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Excluir conta</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Sua conta e todos os dados associados serão removidos permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ComponentShowcase>
          </section>

          <Separator />
          <section id="toast">
            <h2 className="text-2xl font-bold mb-2">Toast</h2>
            <p className="text-muted-foreground mb-6">Mensagem temporária e auto-descartável para feedback imediato de ações. Diferente das <strong>Notificações</strong>, que persistem em pilha para fluxos longos.</p>
            <ComponentShowcase
              title="Toast"
              description="Dispare pelo hook useToast. Variante destructive para erros. O toast abre em portal e segue o tema global da página."
              showToggle={false}
              code={`import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

<Button
  variant="outline"
  onClick={() => toast({ title: "Alterações salvas", description: "Suas preferências foram atualizadas." })}
>
  Toast padrão
</Button>
<Button
  variant="outline"
  onClick={() => toast({ variant: "destructive", title: "Erro ao salvar", description: "Tente novamente em instantes." })}
>
  Toast destrutivo
</Button>`}
            >
              <Button
                variant="outline"
                onClick={() => toast({ title: "Alterações salvas", description: "Suas preferências foram atualizadas." })}
              >
                Toast padrão
              </Button>
              <Button
                variant="outline"
                onClick={() => toast({ variant: "destructive", title: "Erro ao salvar", description: "Tente novamente em instantes." })}
              >
                Toast destrutivo
              </Button>
            </ComponentShowcase>
          </section>


          <Separator />
          <section id="drawer-simples">
            <h2 className="text-2xl font-bold mb-2">Drawer</h2>
            <p className="text-muted-foreground mb-6">Painel lateral simples para edição, detalhes ou formulários secundários sem sair do contexto principal.</p>
            <DrawerSimples />
          </section>

          <Separator />
          <section id="drawer-multi">
            <h2 className="text-2xl font-bold mb-2">Drawer Multi-nível</h2>
            <p className="text-muted-foreground mb-6">Drawers empilhados (push) que preservam a hierarquia em fluxos detalhados de edição sem perder o contexto da camada anterior.</p>
            <DrawerMultiNivel />
          </section>


          {/* ===== NAVEGAÇÃO ===== */}
          <Separator />
          <section id="steps">
            <h2 className="text-2xl font-bold mb-2">Steps (Wizard)</h2>
            <p className="text-muted-foreground mb-6">Etapas numeradas com estados completo / atual / pendente e linha de progresso para fluxos guiados.</p>
            <StepsWidget />
          </section>

          <Separator />
          <section id="anchor">
            <h2 className="text-2xl font-bold mb-2">Anchor (Scroll Spy)</h2>
            <p className="text-muted-foreground mb-6">Menu lateral de âncoras que destaca a seção visível enquanto o usuário rola a página.</p>
            <AnchorWidget />
          </section>

          <Separator />
          <section id="tabs-geist">
            <h2 className="text-2xl font-bold mb-2">Tabs</h2>
            <p className="text-muted-foreground mb-6">Tabs minimalistas inspiradas no Geist: indicador em barra sob a aba ativa e divisor inferior contínuo, sem fundos coloridos.</p>
            <TabsGeistWidget />
          </section>

          <Separator />
          <section id="tour">
            <h2 className="text-2xl font-bold mb-2">Tour</h2>
            <p className="text-muted-foreground mb-6">Onboarding guiado em sequência: overlay escuro com spotlight no elemento alvo e popover com descrição e navegação.</p>
            <TourWidget />
          </section>

          <Separator />
          <section id="breadcrumb">
            <h2 className="text-2xl font-bold mb-2">Breadcrumb</h2>
            <p className="text-muted-foreground mb-6">Trilha de navegação hierárquica. Use ellipsis para colapsar níveis intermediários em caminhos profundos.</p>
            <ComponentShowcase
              title="Breadcrumb"
              description="Último item é a página atual (sem link). Roboto 14px, separador chevron."
              code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Cursos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Renda Fixa na Prática</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Início</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Cursos</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Renda Fixa na Prática</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ComponentShowcase>
          </section>

          <Separator />
          <section id="pagination">
            <h2 className="text-2xl font-bold mb-2">Pagination</h2>
            <p className="text-muted-foreground mb-6">Navegação entre páginas de listas e tabelas. Página ativa com borda; ellipsis para intervalos longos.</p>
            <ComponentShowcase
              title="Pagination"
              description="Anterior/Próxima nas extremidades, página ativa destacada com isActive."
              code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" className="w-auto gap-1 px-3">
        <ChevronLeft className="h-4 w-4" /> Anterior
      </PaginationLink>
    </PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" className="w-auto gap-1 px-3">
        Próxima <ChevronRight className="h-4 w-4" />
      </PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="#" className="w-auto gap-1 px-3">
                      <ChevronLeft className="h-4 w-4" /> Anterior
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="w-auto gap-1 px-3">
                      Próxima <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </ComponentShowcase>
          </section>


          {/* ===== ENTRADA DE DADOS ===== */}
          <Separator />
          <section id="form-inputs">
            <h2 className="text-2xl font-bold mb-2">Inputs & Formulários</h2>
            <p className="text-muted-foreground mb-6">Campos base de formulário: texto, textarea, select, radio e slider. Labels em Roboto; mensagens de erro em <code className="bg-muted px-1 rounded text-sm font-mono">text-destructive</code> abaixo do campo.</p>
            <div className="space-y-6">
              <ComponentShowcase
                title="Campos de Texto"
                description="Estados: padrão, erro (aria-invalid + mensagem) e desabilitado. Textarea para textos longos."
                code={`<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="nome">Nome</Label>
  <Input id="nome" placeholder="Seu nome completo" />
</div>

<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email-erro">E-mail</Label>
  <Input
    id="email-erro"
    type="email"
    defaultValue="email-invalido"
    aria-invalid="true"
    className="border-destructive focus-visible:ring-destructive"
  />
  <p className="text-xs text-destructive">Informe um e-mail válido.</p>
</div>

<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="desabilitado">Desabilitado</Label>
  <Input id="desabilitado" placeholder="Campo desabilitado" disabled />
</div>

<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="mensagem">Mensagem</Label>
  <Textarea id="mensagem" placeholder="Escreva sua mensagem..." />
</div>`}
              >
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" placeholder="Seu nome completo" />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="email-erro">E-mail</Label>
                  <Input
                    id="email-erro"
                    type="email"
                    defaultValue="email-invalido"
                    aria-invalid="true"
                    className="border-destructive focus-visible:ring-destructive"
                  />
                  <p className="text-xs text-destructive">Informe um e-mail válido.</p>
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="desabilitado">Desabilitado</Label>
                  <Input id="desabilitado" placeholder="Campo desabilitado" disabled />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea id="mensagem" placeholder="Escreva sua mensagem..." />
                </div>
              </ComponentShowcase>

              <ComponentShowcase
                title="Seleção (Select & Radio)"
                description="Select para listas longas; RadioGroup para até 4 opções visíveis."
                code={`<div className="grid w-full max-w-sm gap-1.5">
  <Label>Perfil de investidor</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Selecione um perfil" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="conservador">Conservador</SelectItem>
      <SelectItem value="moderado">Moderado</SelectItem>
      <SelectItem value="arrojado">Arrojado</SelectItem>
    </SelectContent>
  </Select>
</div>

<RadioGroup defaultValue="mensal" className="gap-3">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="mensal" id="r-mensal" />
    <Label htmlFor="r-mensal">Aporte mensal</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="unico" id="r-unico" />
    <Label htmlFor="r-unico">Aporte único</Label>
  </div>
</RadioGroup>`}
              >
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label>Perfil de investidor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservador">Conservador</SelectItem>
                      <SelectItem value="moderado">Moderado</SelectItem>
                      <SelectItem value="arrojado">Arrojado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <RadioGroup defaultValue="mensal" className="gap-3">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mensal" id="r-mensal" />
                    <Label htmlFor="r-mensal">Aporte mensal</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="unico" id="r-unico" />
                    <Label htmlFor="r-unico">Aporte único</Label>
                  </div>
                </RadioGroup>
              </ComponentShowcase>

              <ComponentShowcase
                title="Slider"
                description="Para valores numéricos em faixa contínua. Thumb na cor primária da marca ativa."
                code={`<div className="grid w-full max-w-sm gap-3">
  <Label>Valor do aporte</Label>
  <Slider defaultValue={[5000]} max={10000} step={100} />
</div>`}
              >
                <div className="grid w-full max-w-sm gap-3">
                  <Label>Valor do aporte</Label>
                  <Slider defaultValue={[5000]} max={10000} step={100} />
                </div>
              </ComponentShowcase>
            </div>
          </section>

          <Separator />
          <section id="segmented">
            <h2 className="text-2xl font-bold mb-2">Switch</h2>
            <p className="text-muted-foreground mb-6">Toggle compacto para alternar entre poucas opções (períodos, modos de visualização) ou estados binários (on/off).</p>
            <div className="space-y-6">
              <SegmentedWidget />
              <SwitchSimplesWidget />
              <SwitchDisabledWidget />
            </div>
          </section>

          <Separator />
          <section id="upload-preview">
            <h2 className="text-2xl font-bold mb-2">Upload com Preview</h2>
            <p className="text-muted-foreground mb-6">Dropzone de imagens com preview em grid, progresso simulado, contagem e remoção individual.</p>
            <UploadComPreview />
          </section>

          <Separator />
          <section id="calendar">
            <h2 className="text-2xl font-bold mb-2">Calendário</h2>
            <p className="text-muted-foreground mb-6">Componentes de calendário para seleção de data única, intervalo de datas e versão compacta em popover. Localização em <code className="bg-muted px-1 rounded text-sm font-mono">pt-BR</code>.</p>
            <CalendarioWidget />
          </section>

          <Separator />
          <section id="rate">
            <h2 className="text-2xl font-bold mb-2">Rate (Avaliação)</h2>
            <p className="text-muted-foreground mb-6">Estrelas interativas com hover preview, suporte a meias estrelas e modo somente-leitura. Cor padrão usa o token semântico <code className="bg-muted px-1 rounded text-sm font-mono">warning</code>.</p>
            <RateWidget />
          </section>

          <Separator />
          <section id="mentions">
            <h2 className="text-2xl font-bold mb-2">Mentions</h2>
            <p className="text-muted-foreground mb-6">Textarea que detecta '@' (menções) ou '#' (tags) e abre sugestões em popover ancorado ao caret.</p>
            <MentionsWidget />
          </section>

          <Separator />
          <section id="cascader">
            <h2 className="text-2xl font-bold mb-2">Cascader</h2>
            <p className="text-muted-foreground mb-6">Drill-down em colunas para navegar categorias hierárquicas (alternativa ao TreeSelect com colunas lado a lado).</p>
            <CascaderWidget />
          </section>

          <Separator />
          <section id="tool-autocomplete">
            <h2 className="text-2xl font-bold mb-2">AutoComplete</h2>
            <p className="text-muted-foreground mb-6">Input com sugestões filtradas em popover, navegação por teclado (↑ ↓ Enter Esc) e highlight do trecho buscado.</p>
            <AutoCompleteWidget />
          </section>

          <Separator />
          <section id="tool-treeselect">
            <h2 className="text-2xl font-bold mb-2">TreeSelect</h2>
            <p className="text-muted-foreground mb-6">Select hierárquico com nodes expansíveis para classes de ativos, taxonomias e categorias aninhadas.</p>
            <TreeSelectWidget />
          </section>

          <Separator />
          <section id="tool-transfer">
            <h2 className="text-2xl font-bold mb-2">Transfer</h2>
            <p className="text-muted-foreground mb-6">Transferência de itens entre listas (disponíveis ↔ selecionados) com checkboxes, busca e ações em massa.</p>
            <TransferWidget />
          </section>

          <Separator />
          <section id="checkbox">
            <h2 className="text-2xl font-bold mb-2">Checkbox</h2>
            <p className="text-muted-foreground mb-6">Caixa de seleção para escolhas binárias e múltiplas. Suporta estados <strong>checked</strong>, <strong>disabled</strong> e <strong>indeterminate</strong>.</p>

            <div className="space-y-6">
              <ComponentShowcase
                title="Default"
                description="Checkbox controlado com estado de marcado/desmarcado."
                code={checkboxGeistSrc}
                htmlCode={checkboxHtml}
              >
                <CheckboxDefault />
              </ComponentShowcase>

              <ComponentShowcase
                title="Disabled"
                description="Estados desabilitados: padrão, marcado e indeterminado."
                code={checkboxGeistSrc}
                htmlCode={checkboxHtml}
              >
                <CheckboxDisabled />
              </ComponentShowcase>
            </div>
          </section>

          <Separator />
          <section id="choicebox">
            <h2 className="text-2xl font-bold mb-2">Choicebox</h2>
            <p className="text-muted-foreground mb-6">Cartões de seleção em grupo, em formato <strong>radio</strong> (escolha única) ou <strong>checkbox</strong> (múltipla). Cada item exibe título e descrição.</p>

            <div className="space-y-6">
              <ComponentShowcase
                title="Radio (escolha única)"
                description="Grupo de cartões com seleção única usando type='radio'."
                code={choiceboxGeistSrc}
                htmlCode={choiceboxHtml}
              >
                <ChoiceboxRadio />
              </ComponentShowcase>

              <ComponentShowcase
                title="Checkbox (múltipla escolha)"
                description="Grupo de cartões permitindo seleção múltipla usando type='checkbox'."
                code={choiceboxGeistSrc}
                htmlCode={choiceboxHtml}
              >
                <ChoiceboxCheckbox />
              </ComponentShowcase>

              <ComponentShowcase
                title="Disabled"
                description="Grupo inteiro desabilitado e item individual desabilitado."
                code={choiceboxGeistSrc}
                htmlCode={choiceboxHtml}
              >
                <ChoiceboxDisabled />
              </ComponentShowcase>
            </div>
          </section>



          {/* ===== EXIBIÇÃO DE DADOS ===== */}
          <Separator />
          <section id="statistic">
            <h2 className="text-2xl font-bold mb-2">Statistic (KPIs)</h2>
            <p className="text-muted-foreground mb-6">Cards numéricos com contagem progressiva animada, prefixos/sufixos e tendência (up/down) em tokens semânticos.</p>
            <StatisticWidget />
          </section>

          <Separator />
          <section id="timeline">
            <h2 className="text-2xl font-bold mb-2">Timeline</h2>
            <p className="text-muted-foreground mb-6">Linha do tempo vertical com estados semânticos (concluído, ativo, pendente, erro) para histórico e jornada do usuário.</p>
            <TimelineWidget />
          </section>

          <Separator />
          <section id="tree">
            <h2 className="text-2xl font-bold mb-2">Tree</h2>
            <p className="text-muted-foreground mb-6">Árvore expansível com ícones de pasta/arquivo para explorar estruturas hierárquicas profundas.</p>
            <TreeWidget />
          </section>

          <Separator />
          <section id="descriptions">
            <h2 className="text-2xl font-bold mb-2">Descriptions</h2>
            <p className="text-muted-foreground mb-6">Lista de propriedades chave/valor em grid responsivo. Padrão para páginas de detalhe (perfil, pedido, fatura).</p>
            <DescriptionsWidget />
          </section>

          <Separator />
          <section id="tabela">
            <h2 className="text-2xl font-bold mb-2">Tabela</h2>
            <p className="text-muted-foreground mb-6">Tabela enxuta inspirada no Geist: cabeçalho discreto em caixa alta, zebra sutil nas linhas e última coluna alinhada à direita.</p>
            <div className="space-y-6">
              <TabelaWidget />
              <TabelaBorderedWidget />
            </div>
          </section>

          <Separator />
          <section id="watermark">
            <h2 className="text-2xl font-bold mb-2">Watermark (Marca d'água)</h2>
            <p className="text-muted-foreground mb-6">Texto repetido em diagonal sobre conteúdo sensível (relatórios, dashboards internos), gerado via canvas em data URL.</p>
            <WatermarkWidget />
          </section>

          <Separator />
          <section id="tool-graficos">
            <h2 className="text-2xl font-bold mb-2">Gráficos</h2>
            <p className="text-muted-foreground mb-6">
              Padrão oficial de donut charts AUVP e suas variações de legenda (horizontal abaixo,
              em linha única, ou vertical à esquerda/direita do gráfico).
            </p>
            <div className="space-y-10">
              <SectionThemeToggle bare title="Gráfico Donut (Pizza)" description="Padrão oficial de donut chart AUVP. Cor primária da marca na fatia de maior valor. Legenda abaixo com swatches e percentuais." code={graficoPizzaSrc} selfDocumented aiFood={false}><GraficoPizza /></SectionThemeToggle>
              <SectionThemeToggle bare title="Gráfico Donut com Legendas" description="Variações de posição da legenda: horizontal abaixo, em linha única e vertical lateral ao gráfico. Mesmas cores e regras do donut padrão." code={graficoPizzaLegendasSrc} selfDocumented><GraficoPizzaLegendas /></SectionThemeToggle>
            </div>
          </section>

          <Separator />
          <section id="tags-badges">
            <h2 className="text-2xl font-bold mb-2">Badges & Tags</h2>
            <p className="text-muted-foreground mb-6">Badge (shadcn) para status simples; <strong>Tag</strong> tokenizada para categorias e estados — usa os tokens <code className="bg-muted px-1 rounded text-sm font-mono">--chart-*</code> e semânticos, adaptando-se a light/dark e às marcas Capital/Escola.</p>
            <div className="space-y-6">
              <ComponentShowcase
                title="Badge"
                description="Quatro variantes do componente base."
                code={`import { Badge } from "@/components/ui/badge";

<Badge>Padrão</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="destructive">Destrutivo</Badge>
<Badge variant="outline">Contorno</Badge>`}
              >
                <Badge>Padrão</Badge>
                <Badge variant="secondary">Secundário</Badge>
                <Badge variant="destructive">Destrutivo</Badge>
                <Badge variant="outline">Contorno</Badge>
              </ComponentShowcase>

              <ComponentShowcase
                title="Tag (tokenizada)"
                description="Tons semânticos (success/warning/info/error) e categóricos (chart-1 a chart-8). Nunca use classes Tailwind de cor hardcoded em tags."
                code={`import { Tag } from "@/components/widgets/Tag";

{/* Tons semânticos */}
<Tag tone="success">Success</Tag>
<Tag tone="warning">Warning</Tag>
<Tag tone="info">Info</Tag>
<Tag tone="error">Error</Tag>
<Tag tone="neutral">Neutral</Tag>
<Tag tone="primary">Primary</Tag>

{/* Tons categóricos (paleta de dataviz) */}
<Tag tone="green">Green</Tag>
<Tag tone="violet">Violet</Tag>
<Tag tone="amber">Amber</Tag>
<Tag tone="blue">Blue</Tag>
<Tag tone="magenta">Magenta</Tag>
<Tag tone="brick">Brick</Tag>
<Tag tone="olive">Olive</Tag>
<Tag tone="graphite">Graphite</Tag>`}
              >
                <Tag tone="success">Success</Tag>
                <Tag tone="warning">Warning</Tag>
                <Tag tone="info">Info</Tag>
                <Tag tone="error">Error</Tag>
                <Tag tone="neutral">Neutral</Tag>
                <Tag tone="primary">Primary</Tag>
                <Tag tone="green">Green</Tag>
                <Tag tone="violet">Violet</Tag>
                <Tag tone="amber">Amber</Tag>
                <Tag tone="blue">Blue</Tag>
                <Tag tone="magenta">Magenta</Tag>
                <Tag tone="brick">Brick</Tag>
                <Tag tone="olive">Olive</Tag>
                <Tag tone="graphite">Graphite</Tag>
              </ComponentShowcase>
            </div>
          </section>

          <Separator />
          <section id="avatar">
            <h2 className="text-2xl font-bold mb-2">Avatar</h2>
            <p className="text-muted-foreground mb-6">Representação de usuários com fallback em iniciais (Anek, fundo muted). Grupos empilhados com contador para listas de participantes.</p>
            <ComponentShowcase
              title="Avatar"
              description="Tamanhos, fallback em iniciais e grupo empilhado com excedente."
              code={`import { Avatar, AvatarFallback } from "@/components/ui/avatar";

{/* Tamanhos */}
<Avatar className="h-8 w-8"><AvatarFallback className="text-xs">RS</AvatarFallback></Avatar>
<Avatar><AvatarFallback>RS</AvatarFallback></Avatar>
<Avatar className="h-14 w-14"><AvatarFallback className="text-lg">RS</AvatarFallback></Avatar>

{/* Grupo empilhado */}
<div className="flex -space-x-3">
  <Avatar className="border-2 border-background"><AvatarFallback>RS</AvatarFallback></Avatar>
  <Avatar className="border-2 border-background"><AvatarFallback>AC</AvatarFallback></Avatar>
  <Avatar className="border-2 border-background"><AvatarFallback>MF</AvatarFallback></Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback className="bg-primary text-primary-foreground text-xs">+12</AvatarFallback>
  </Avatar>
</div>`}
            >
              <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">RS</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>RS</AvatarFallback></Avatar>
              <Avatar className="h-14 w-14"><AvatarFallback className="text-lg">RS</AvatarFallback></Avatar>
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-background"><AvatarFallback>RS</AvatarFallback></Avatar>
                <Avatar className="border-2 border-background"><AvatarFallback>AC</AvatarFallback></Avatar>
                <Avatar className="border-2 border-background"><AvatarFallback>MF</AvatarFallback></Avatar>
                <Avatar className="border-2 border-background">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">+12</AvatarFallback>
                </Avatar>
              </div>
            </ComponentShowcase>
          </section>


          {/* ===== PLATAFORMA DE AULAS ===== */}
          <Separator />
          <section id="plat-courses">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Visualização de Cursos</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Grid de cursos com progresso e fácil retomada de aulas.</p>
            <SectionThemeToggle bare title="Visualização de Cursos" description="Grid de cursos com cards de progresso, thumbnail, badge de conclusão e botão de retomada de aula. Light/dark mode." code={platCursosSrc} htmlCode={platCursosHtml}><PlataformaCursos /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-player">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Interface do Player</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">O vídeo é o core da plataforma. Controles com overlay e auto-hide.</p>
            <SectionThemeToggle bare title="Interface do Player" description="Player de vídeo com overlay de controles, barra de progresso clicável, volume, fullscreen e auto-hide dos controles após inatividade." code={platPlayerSrc} htmlCode={platPlayerHtml}><PlataformaPlayer /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-playlist">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Lista de Aulas (Playlist)</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Estados: Assistindo, Concluído e Bloqueado.</p>
            <SectionThemeToggle bare title="Lista de Aulas (Playlist)" description="Lista lateral de aulas com três estados visuais distintos: Assistindo (destaque amarelo), Concluído (check verde) e Bloqueado (cadeado + opacidade reduzida)." code={platPlaylistSrc} htmlCode={platPlaylistHtml}><PlataformaPlaylist /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-dashboard">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Dashboard do Aluno</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Estatísticas, atividade semanal e conquistas.</p>
            <SectionThemeToggle bare title="Dashboard do Aluno" description="Painel com KPIs (aulas assistidas, tempo total, streak), gráfico de barras de atividade semanal e grid de conquistas desbloqueadas." code={platDashboardSrc} htmlCode={platDashboardHtml}><PlataformaDashboard /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-notes">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Notas & Anotações</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Notas sincronizadas com timestamp do vídeo.</p>
            <SectionThemeToggle bare title="Notas & Anotações" description="Bloco de notas vinculado ao timestamp do vídeo. Permite criar, editar e excluir notas com carimbos de tempo clicáveis para navegar na aula." code={platNotasSrc} htmlCode={platNotasHtml}><PlataformaNotas /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-rating">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Avaliação de Aulas</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Rating por estrelas com feedback textual.</p>
            <SectionThemeToggle bare title="Avaliação de Aulas" description="Sistema de rating por estrelas com hover preview e campo de feedback textual opcional. Exibe média e distribuição de notas." code={platRatingSrc} htmlCode={platRatingHtml}><PlataformaRating /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-certificates">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Certificados</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Certificados de conclusão emitidos automaticamente ao finalizar módulos.</p>
            <SectionThemeToggle bare title="Certificados" description="Certificados de conclusão emitidos automaticamente ao finalizar módulos. Card com nome do aluno, curso, data e botão de download PDF." code={platCertificadosSrc} htmlCode={platCertificadosHtml}><PlataformaCertificados /></SectionThemeToggle>
          </section>

          <Separator />
          <section id="plat-community">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Comunidade & Dúvidas</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-muted-foreground mb-6">Fórum de dúvidas com votos e respostas de instrutores.</p>
            <SectionThemeToggle bare title="Comunidade & Dúvidas" description="Fórum de dúvidas com votos positivos/negativos, respostas de instrutores destacadas, filtros por status e paginação." code={platComunidadeSrc} htmlCode={platComunidadeHtml}><PlataformaComunidade /></SectionThemeToggle>
          </section>

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
                description="Capa padrão: seção superior colorida + área inferior branca com título e sulco de lombada."
                code={`import { Livro } from "@/components/widgets/Livro";

export function LivroDefault() {
  return <Livro title="The user experience of the Frontend Cloud" />;
}`}
                htmlCode={livroBaseHtml + "\n" + livroDefaultHtml}
              >
                <LivroDefault />
              </ComponentShowcase>

              <ComponentShowcase
                title="Variants"
                description="simple remove o sulco da lombada; stripe adiciona uma faixa horizontal decorativa."
                code={`import { Livro } from "@/components/widgets/Livro";

export function LivroVariants() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
      <Livro title="The user experience of the Frontend Cloud" variant="simple" width={196} />
      <Livro title="The user experience of the Frontend Cloud" variant="stripe" width={196} />
    </div>
  );
}`}
                htmlCode={livroBaseHtml + "\n" + livroVariantsHtml}
              >
                <LivroVariants />
              </ComponentShowcase>

              <ComponentShowcase
                title="Custom color"
                description="Cores via color. Ao definir textColor, a capa inteira usa a cor de destaque — ideal para capas monocromáticas."
                code={`import { Livro } from "@/components/widgets/Livro";

export function LivroCustomColor() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro color="#9D2127" title="How Vercel improves your website's search engine ranking" />
      <Livro color="#7DC1C1" textColor="white" title="Design Engineering at Vercel" variant="simple" />
      <Livro color="#FED954" title="The user experience of the Frontend Cloud" />
    </div>
  );
}`}
                htmlCode={livroBaseHtml + "\n" + livroCustomHtml}
              >
                <LivroCustomColor />
              </ComponentShowcase>

              <ComponentShowcase
                title="Icon"
                description="Ícone ou logo exibido na seção superior colorida via prop icon."
                code={`import { Livro } from "@/components/widgets/Livro";

// IconBarChart, IconOpenBook e IconCoin são SVGs internos de Livro.tsx —
// a prop \`icon\` aceita qualquer ReactNode (ex.: ícones lucide-react).
export function LivroIcone() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro icon={<IconBarChart size={40} />} title="Fundamentos de Finanças" />
      <Livro icon={<IconOpenBook size={40} />} title="Guia Completo de Investimentos" />
      <Livro icon={<IconCoin size={40} />} title="Renda Fixa na Prática" />
    </div>
  );
}`}
                htmlCode={livroBaseHtml + "\n" + livroIconHtml}
              >
                <LivroIcone />
              </ComponentShowcase>

              <ComponentShowcase
                title="Illustration"
                description="Ilustração decorativa que preenche a seção superior via prop illustration."
                code={`import { Livro } from "@/components/widgets/Livro";

// IllustrationLines e IllustrationDots são SVGs internos de Livro.tsx —
// a prop \`illustration\` aceita qualquer ReactNode.
export function LivroIlustrado() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro illustration={<IllustrationLines />} title="The user experience of the Frontend Cloud" />
      <Livro illustration={<IllustrationDots />} title="The user experience of the Frontend Cloud" variant="simple" />
    </div>
  );
}`}
                htmlCode={livroBaseHtml + "\n" + livroIllustrationHtml}
              >
                <LivroIlustrado />
              </ComponentShowcase>

              <ComponentShowcase
                title="Textured"
                description="textured aplica uma textura de pontos sobre a capa sólida. Combine com textColor para controlar a cor do título."
                code={`import { Livro } from "@/components/widgets/Livro";

export function LivroTexturado() {
  return (
    <div className="flex flex-col gap-8 flex-initial">
      <div className="flex flex-row items-baseline justify-start gap-8 flex-wrap">
        <Livro color="#7DC1C1" textured title="Design Engineering at Vercel" />
        <Livro color="#9D2127" textured title="Design Engineering at Vercel" />
        <Livro color="#FED954" textured title="Design Engineering at Vercel" />
      </div>
      <div className="flex flex-row items-baseline justify-start gap-8 flex-wrap">
        <Livro color="#7DC1C1" textColor="white" textured title="Design Engineering at Vercel" variant="simple" />
        <Livro color="#9D2127" textColor="#ece4db" textured title="Design Engineering at Vercel" variant="simple" />
        <Livro color="#FED954" textColor="#9d3b05" textured title="Design Engineering at Vercel" variant="simple" />
      </div>
    </div>
  );
}`}
                htmlCode={livroBaseHtml + "\n" + livroTexturedHtml}
              >
                <LivroTexturado />
              </ComponentShowcase>

              <ComponentShowcase
                title="Sizes"
                description="Largura customizável via prop width (pixels). A altura é calculada automaticamente (ratio 1:1.32)."
                code={`import { Livro } from "@/components/widgets/Livro";

export function LivroTamanhos() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro title="The user experience of the Frontend Cloud" width={300} />
      <Livro title="The user experience of the Frontend Cloud" width={200} />
      <Livro title="The user experience of the Frontend Cloud" width={150} />
    </div>
  );
}`}
                htmlCode={livroBaseHtml + "\n<!-- width={300} -->\n<div class=\"lv\" style=\"--w:300px;\">...</div>\n<!-- width={200} -->\n<div class=\"lv\" style=\"--w:200px;\">...</div>\n<!-- width={150} -->\n<div class=\"lv\" style=\"--w:150px;\">...</div>"}
              >
                <LivroTamanhos />
              </ComponentShowcase>

              <ComponentShowcase
                title="Responsive"
                description="Largura responsiva com objeto { sm, md } por breakpoint."
                code={`import { Livro } from "@/components/widgets/Livro";

export function LivroResponsivo() {
  return <Livro title="The user experience of the Frontend Cloud" width={{ sm: 150, md: 196 }} />;
}`}
                htmlCode={livroBaseHtml + "\n" + livroResponsivoHtml}
              >
                <LivroResponsivo />
              </ComponentShowcase>
            </div>
          </section>


          <Separator />
          <section id="ai-food"><AIFood /></section>

          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}
