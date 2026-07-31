import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Palette, Volume2, Users, User, ExternalLink,
  ChevronRight, ChevronLeft, ChevronDown, Newspaper, Zap,
  BarChart3, GraduationCap, MessageSquare, Settings,
  FileText, Lightbulb, ImageIcon, Map,
  Globe, Minus, Square, X, Layers
} from "lucide-react";
import { TeamPhoto } from "@/components/TeamPhoto";
import { lpScreenshots } from "@/assets/lps";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/widgets/Tag";
import { NovidadeCard } from "@/components/widgets/NovidadeCard";
import { RoadmapTimeline } from "@/components/widgets/RoadmapTimeline";
import { novidadesMensais, mesNumero } from "@/data/novidades";
import { proximoMarco } from "@/data/roadmapMarcos";
import { teamMembers } from "@/data/time";
import { produtosFisicos, produtosFisicosDestaque } from "@/data/produtosFisicos";
import { ProdutoFisicoCard } from "@/components/ProdutosFisicos";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="currentColor" aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" />
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function NotionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
    </svg>
  );
}

interface AccessLink {
  label: string;
  desc: string;
  icon: React.ElementType;
  to?: string;
  href?: string;
  internal: boolean;
  newTab?: boolean;
  /** Destino ainda não disponível — renderiza card desabilitado com "Em breve". */
  soon?: boolean;
  gradient: string;
}

const accessLinks: AccessLink[] = [
  { label: "Design System", desc: "Componentes e tokens", icon: Palette, to: "/design-system", internal: true, gradient: "from-violet-500 to-purple-600" },
  { label: "Tom e Voz", desc: "Guia de comunicação", icon: Volume2, to: "/tom-e-voz", internal: true, gradient: "from-sky-500 to-blue-600" },
  { label: "Time de Produto", desc: "Organograma e pilares", icon: Users, to: "/time", internal: true, gradient: "from-fuchsia-500 to-pink-600" },
  { label: "Nossas Soluções", desc: "Guia dos produtos AUVP", icon: Layers, to: "/solucoes", internal: true, gradient: "from-amber-500 to-yellow-600" },
  { label: "Figma", desc: "Arquivos de design", icon: FigmaIcon, href: "https://figma.com", internal: false, gradient: "from-orange-500 to-red-500" },
  { label: "GitHub", desc: "Repositórios", icon: GitHubIcon, href: "https://github.com/produtosauvp", internal: false, gradient: "from-slate-600 to-slate-800" },
  { label: "Notion", desc: "Painel de produto", icon: NotionIcon, href: "https://app.notion.com/p/asupernova/Painel-de-produto-AUVP-Capital-7a710a972415406991fff5d560422fa4", internal: false, gradient: "from-neutral-600 to-neutral-800" },
  { label: "Comunidade", desc: "Fórum dos membros", icon: MessageSquare, href: "https://comunidade.auvp.com.br/", internal: false, gradient: "from-emerald-500 to-teal-600 dark:from-[#5A8770] dark:to-[#3d6b57]" },
];

interface ProdutoDigital {
  name: string;
  desc: string;
  /** Chave em `lpScreenshots` — produtos sem screenshot caem no placeholder. */
  slug?: string;
  /** Seção de Nossas Soluções ou LP própria do produto. */
  href?: string;
  /** Ainda sem link publicado — cartão fica com aspecto inativo. */
  soon?: boolean;
}

/* A ordem manda: os seis primeiros são os que ficam visíveis nas duas
   linhas iniciais; o resto entra atrás do "ver mais". */
const produtos: ProdutoDigital[] = [
  { name: "AUVP Capital", desc: "Plataforma de investimentos", slug: "capital", href: "https://auvpcapital.com.br/" },
  { name: "AUVP Escola", desc: "Plataforma de educação financeira", slug: "escola", href: "https://auvp.com.br/" },
  { name: "AUVP Sempre", desc: "Assinatura de evolução contínua", slug: "sempre", href: "https://www.auvp.com.br/auvp-sempre/" },
  { name: "AUVP ETFs", desc: "Os ETFs próprios da AUVP", slug: "etfs", href: "https://www.auvpetfs.com.br/" },
  { name: "AUVP Wealth", desc: "Gestão de grandes patrimônios", slug: "wealth", href: "https://auvpcapital.com.br/wealth/" },
  { name: "Private Day", desc: "O evento anual da AUVP", slug: "private-day", href: "https://privateday.auvp.com.br/" },
  { name: "AUVP Agro", desc: "Produtos do agronegócio", slug: "agro", href: "https://auvpagro.com.br/" },
  { name: "AUVP Câmbio", desc: "Operações de câmbio", slug: "cambio", href: "https://auvpcapital.com.br/cambio/" },
  { name: "AUVP Crédito", desc: "Soluções de crédito", slug: "credito", href: "https://auvpcapital.com.br/credito/" },
  { name: "AUVP Seguros", desc: "Produtos de seguro", slug: "seguros", href: "https://auvpcapital.com.br/seguros/" },
  { name: "AUVP Experience", desc: "Experiências premium", soon: true },
];

/** Quantas soluções aparecem antes do "ver mais" — duas linhas de três. */
const SOLUCOES_VISIVEIS = 6;

/** URL completa (sem protocolo) exibida na barra de "navegador" do card de produto digital. */
function produtoUrl(p: ProdutoDigital): string {
  if (!p.href) return "em breve";
  return p.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Velocidade constante do scroll do preview (px/s) — cadenciada, igual em todos os cards. */
const LP_SCROLL_SPEED = 45;

function ProdutoCard({ p }: { p: ProdutoDigital }) {
  const shot = p.slug ? lpScreenshots[p.slug] : undefined;
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [scroll, setScroll] = useState({ dist: 0, dur: 0 });
  const reducedMotion = useReducedMotion();

  /* A duração é derivada da distância real a rolar (altura renderizada da
     imagem menos a janela), então páginas longas e curtas rolam na MESMA
     velocidade — mudam só o tempo total. */
  const measure = useCallback(() => {
    const img = imgRef.current;
    const frame = frameRef.current;
    if (!img || !frame) return;
    const dist = Math.max(img.clientHeight - frame.clientHeight, 0);
    setScroll({ dist, dur: dist / LP_SCROLL_SPEED });
  }, []);

  const scrolling = hovered && !reducedMotion;

  const card = (
    <div
      onMouseEnter={() => { measure(); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card flex flex-col h-full transition-[transform,box-shadow,border-color] duration-300 ease-apple",
        p.soon ? "opacity-75" : "sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:border-primary/30 cursor-pointer"
      )}
    >
      {/* Janela de "navegador" (estilo Windows) com preview da LP — no hover, a página rola em velocidade constante */}
      <div className="border-b">
        <div className="flex items-center gap-2 pl-2.5 pr-3 py-2 bg-muted/60 border-b">
          <span className="flex-1 min-w-0 truncate rounded-md bg-background/80 border px-2 py-0.5 text-[9px] font-roboto text-muted-foreground">
            {produtoUrl(p)}
          </span>
          <span className="flex items-center gap-2 text-muted-foreground shrink-0">
            <Minus className="h-2.5 w-2.5" strokeWidth={2.5} />
            <Square className="h-2 w-2" strokeWidth={2.5} />
            <X className="h-2.5 w-2.5" strokeWidth={2.5} />
          </span>
        </div>
        <div ref={frameRef} className="relative h-40 sm:h-44 overflow-hidden bg-muted/40">
          {shot ? (
            <img
              ref={imgRef}
              src={shot}
              alt={`Página de ${p.name}`}
              loading="lazy"
              onLoad={measure}
              className="w-full h-auto will-change-transform"
              style={{
                transform: scrolling ? `translateY(-${scroll.dist}px)` : "translateY(0)",
                transition: scrolling
                  ? `transform ${scroll.dur}s linear`
                  : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          ) : (
            <div className="relative h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
              <span
                className="absolute h-20 w-20 rounded-full border border-primary/25"
                style={{ animation: "auvp-globe-ping 3s ease-out infinite" }}
              />
              <Globe
                className={cn("h-12 w-12 text-muted-foreground/30", p.soon && "grayscale")}
                strokeWidth={1.25}
                style={{ animation: "auvp-globe-float 5s ease-in-out infinite" }}
              />
            </div>
          )}
          {shot && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card/80 to-transparent" />
          )}
        </div>
      </div>
      {/* Conteúdo */}
      <div className="p-3.5 flex items-center gap-2 flex-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold font-anek text-foreground text-sm leading-snug">{p.name}</p>
            {p.soon && <Tag tone="neutral" className="text-[9px] shrink-0">Em breve</Tag>}
          </div>
          <p className="text-xs text-muted-foreground font-roboto leading-snug mt-0.5">{p.desc}</p>
        </div>
        {!p.soon && (
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 sm:group-hover:text-primary transition-colors duration-300" />
        )}
      </div>
    </div>
  );

  if (p.soon) {
    return <div aria-disabled="true" className="cursor-default">{card}</div>;
  }
  return <a href={p.href} target="_blank" rel="noopener noreferrer">{card}</a>;
}

interface DocLink {
  label: string;
  icon: React.ElementType;
  href?: string;
  /** Documento ainda não publicado — renderiza item desabilitado com "Em breve". */
  soon?: boolean;
}

const docs: DocLink[] = [
  { label: "Playbook de Produto", icon: BookOpen, soon: true },
  { label: "Diretrizes de Acessibilidade", icon: FileText, soon: true },
  { label: "Processo de Discovery", icon: Lightbulb, soon: true },
  { label: "Protocolo de Lançamento", icon: Zap, soon: true },
  { label: "Guia de Pesquisa com Usuário", icon: MessageSquare, soon: true },
  { label: "Padrões de API e Integrações", icon: Settings, soon: true },
];

/** Destaques do portfólio no Hub — o catálogo completo mora em /produtos-fisicos. */
const portfolioDestaques = produtosFisicosDestaque;

interface MuralCard {
  titulo: string;
  descricao: string;
  /** Link externo da novidade — cards sem link levam para /novidades. */
  link?: string;
  /** Imagem do card. Enquanto não há artes próprias, usa screenshots das LPs como placeholder. */
  img: string;
}

/** Rótulo da edição exibida no carrossel — sempre o mês mais recente. */
const muralMesLabel = `${novidadesMensais[0].mes} ${novidadesMensais[0].ano}`;

/** Cards do carrossel do Mural de Novidades — derivados das novidades mais recentes. */
const muralNovidades: MuralCard[] = novidadesMensais[0].items.map((item, i) => {
  const shots = Object.values(lpScreenshots);
  return {
    titulo: item.titulo,
    descricao: item.descricao,
    link: item.link,
    img: shots[i % shots.length],
  };
});

function MuralNovidadesCarousel({ items }: { items: MuralCard[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  /* O autoplay é dirigido pela barra de progresso do indicador ativo
     (onAnimationEnd → próximo slide): barra e troca de slide nunca
     dessincronizam, e pausar a animação pausa o avanço no mesmo ponto.
     Com prefers-reduced-motion a animação global vira ~0ms e dispararia
     onAnimationEnd em loop — nesse caso a barra nem é renderizada. */
  const autoplay = items.length > 1 && !reducedMotion;

  return (
    /* O wrapper envolve card + navegação: interagir com qualquer um dos
       dois (hover ou foco por teclado) pausa o autoplay. */
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="group relative rounded-2xl border bg-card overflow-hidden transition-[border-color,box-shadow] duration-300 ease-apple sm:hover:border-primary/30 sm:hover:shadow-xl">
        {/* Slides empilhados com crossfade. Altura fixa — o card nunca muda
            de tamanho entre slides (sem layout shift). Cada slide é
            clicável — novidades com link externo abrem em nova aba; as
            demais levam ao mural completo. */}
        <div className="relative h-[360px] sm:h-64">
          {items.map((item, i) => {
            const ativo = i === index;
            const slide = (
              <div className="flex h-full flex-col sm:flex-row">
                <div className="h-36 sm:h-full sm:w-2/5 bg-muted/50 border-b sm:border-b-0 sm:border-r shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt=""
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-apple sm:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex-1 min-w-0 px-5 pb-5 pt-4 sm:py-6 sm:px-8 flex flex-col justify-center gap-2.5 overflow-hidden">
                  <span className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold font-roboto uppercase tracking-wider text-primary">
                    {muralMesLabel}
                  </span>
                  <p className="font-bold font-anek text-lg sm:text-2xl text-foreground leading-tight line-clamp-2 sm:group-hover:text-primary transition-colors duration-300">{item.titulo}</p>
                  <p className="text-sm text-muted-foreground font-roboto leading-relaxed line-clamp-3">{item.descricao}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold font-roboto text-primary">
                    {item.link ? "Ver novidade" : "Ver no mural"}
                    <ChevronRight className="h-3 w-3 transition-transform duration-300 ease-apple sm:group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            );
            const slideClasses = cn(
              "absolute inset-0 transition-opacity duration-500 ease-apple",
              ativo ? "opacity-100" : "opacity-0 pointer-events-none"
            );
            return item.link ? (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={slideClasses}
                aria-label={item.titulo}
                aria-hidden={!ativo}
                tabIndex={ativo ? 0 : -1}
              >
                {slide}
              </a>
            ) : (
              <Link
                key={i}
                to="/novidades"
                className={slideClasses}
                aria-label={item.titulo}
                aria-hidden={!ativo}
                tabIndex={ativo ? 0 : -1}
              >
                {slide}
              </Link>
            );
          })}
        </div>
      </div>
      {/* Navegação fora do card: setas + indicadores em linha própria. */}
      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Novidade anterior"
            className="h-8 w-8 flex items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors duration-300 sm:hover:text-primary sm:hover:border-primary/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para novidade ${i + 1}`}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-primary/20" : "w-1.5 bg-muted-foreground/30 sm:hover:bg-muted-foreground/50"
                )}
              >
                {i === index &&
                  (autoplay ? (
                    <span
                      key={index}
                      onAnimationEnd={() => go(1)}
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      style={{ animation: "mural-progress 6s linear forwards", animationPlayState: paused ? "paused" : "running" }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-primary" />
                  ))}
              </button>
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Próxima novidade"
            className="h-8 w-8 flex items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors duration-300 sm:hover:text-primary sm:hover:border-primary/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: "Como acesso o Design System?", a: "Clique em 'Design System' nos Acessos Rápidos ou use o menu de navegação global no canto superior esquerdo." },
  { q: "O que é o Manual de Tom e Voz?", a: "É o guia de comunicação verbal da AUVP, com diretrizes de linguagem para cada área e produto da empresa." },
  { q: "Como sugiro um novo componente?", a: "A proposição de um novo componente deve vir via solicitação no ClickUp." },
  { q: "Com que frequência o Design System é atualizado?", a: "O Design System é atualizado continuamente. Novidades são comunicadas no Mural de Novidades desta Central." },
];

// ─── Team Carousel ────────────────────────────────────────────────────────────

const EASE_APPLE = "cubic-bezier(0.22, 1, 0.36, 1)";

function TeamCarousel() {
  const items = [...teamMembers, ...teamMembers];
  const CARD_W = 144;  // w-36
  const GAP    = 12;   // gap-3
  const STRIDE = CARD_W + GAP;
  const LOOP_W = teamMembers.length * STRIDE;

  const navigate     = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const offsetRef    = useRef(0);
  const pausedRef    = useRef(false);
  const rafRef       = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const SIGMA = 220;
    const BASE  = 0.88;
    const PEAK  = 1.06;

    const tick = () => {
      if (!pausedRef.current && !reducedMotion) {
        offsetRef.current = (offsetRef.current + 0.55) % LOOP_W;
      }
      const container = containerRef.current;
      const track     = trackRef.current;
      if (container && track) {
        track.style.transform = `translateX(-${offsetRef.current}px)`;
        const cx = container.offsetWidth / 2;
        const children = track.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const cardCenter = i * STRIDE - offsetRef.current + CARD_W / 2;
          const dist = Math.abs(cardCenter - cx);
          const t = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
          el.style.zIndex = String(Math.round(t * 10));
          const photoEl = el.firstElementChild as HTMLElement;
          if (photoEl) {
            photoEl.style.transform = `scale(${(BASE + (PEAK - BASE) * t).toFixed(3)})`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [LOOP_W, reducedMotion]);

  return (
    <div
      ref={containerRef}
      onClick={() => navigate('/time')}
      onMouseEnter={() => { setIsHovered(true);  pausedRef.current = true;  }}
      onMouseLeave={() => { setIsHovered(false); pausedRef.current = false; }}
      className="cursor-pointer"
    >
      {/* Cards — overflow-hidden para clipar o scroll horizontal */}
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          className="flex gap-3 py-4"
          style={{ width: `${items.length * STRIDE}px` }}
        >
          {items.map((member, i) => (
            <div
              key={i}
              className="relative shrink-0 w-36 text-center"
            >
              {/* Foto — recebe o scale do JS */}
              <div
                style={{ transformOrigin: "50% 100%" }}
                className="rounded-2xl border bg-card overflow-hidden shadow-md"
              >
                <div className="relative w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                  <TeamPhoto
                    id={member.id}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full"
                    fallback={<User className="h-8 w-8 text-primary/30" strokeWidth={1.5} />}
                  />
                </div>
              </div>
              {/* Texto — fora do elemento escalado, sempre estático */}
              <div className="px-2 pt-2 pb-1">
                <p className="font-bold font-anek text-foreground text-[11px] leading-tight">{member.name}</p>
                <p className="text-[9px] text-muted-foreground font-roboto mt-0.5 leading-snug">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — altura fixa, sempre no fluxo, conteúdo anima com opacity/transform */}
      <div style={{ height: "52px", overflow: "hidden" }}>
        <div className="flex flex-col items-center gap-1 pt-3 pb-1 w-full">
          {/* Linha que cresce do centro para as extremidades */}
          <div
            className="w-full h-px bg-border"
            style={{
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "center",
              transition: isHovered
                ? `transform 400ms ${EASE_APPLE}`
                : `transform 0ms`,
            }}
          />
          {/* Seta — surge do centro da linha */}
          <div
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(-4px)",
              transition: isHovered
                ? `opacity 200ms ${EASE_APPLE} 310ms, transform 200ms ${EASE_APPLE} 310ms`
                : `opacity 80ms ${EASE_APPLE}, transform 80ms ${EASE_APPLE}`,
            }}
          >
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50" />
          </div>
          {/* Texto */}
          <span
            style={{
              opacity: isHovered ? 1 : 0,
              transition: isHovered
                ? `opacity 200ms ${EASE_APPLE} 420ms`
                : `opacity 60ms ${EASE_APPLE}`,
            }}
            className="text-[10px] font-bold font-sora uppercase tracking-[0.14em] text-muted-foreground"
          >
            Conheça o Time
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Scroll reveal + section helpers ────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-apple will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}

function RotatingPreview({ items }: { items: string[] }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (items.length <= 1 || reducedMotion) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setFading(false);
      }, 250);
    }, 2800);
    return () => clearInterval(timer);
  }, [items.length, reducedMotion]);

  return (
    <p
      className="text-[10px] font-roboto text-muted-foreground truncate"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 250ms" }}
    >
      {items[idx]}
    </p>
  );
}

function SectionHeader({ title, action }: { icon?: React.ElementType; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-4 md:mb-6 flex-wrap">
      <h2 className="text-base sm:text-xl font-bold font-anek text-foreground">{title}</h2>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default function Hub() {
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  const hora = new Date().getHours();
  const saudacao =
    hora < 5 ? "Boa madrugada, time 🌙" :
    hora < 12 ? "Bom dia, time ☀️" :
    hora < 18 ? "Boa tarde, time 🌤️" :
    "Boa noite, time 🌙";
  const proximo = proximoMarco();
  const [verTodasSolucoes, setVerTodasSolucoes] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(320px circle at ${e.clientX}px ${e.clientY}px, var(--spotlight), transparent 80%)`;
    }
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.background = "none";
  }, []);

  return (
    <PageShell
      /* py = px: o respiro acima do primeiro card é o mesmo das laterais. */
      mainClassName="py-4 md:py-8 space-y-10 md:space-y-16"
      rootProps={{ onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }}
      overlay={<div ref={spotlightRef} className="pointer-events-none fixed inset-0 z-[30]" aria-hidden="true" />}
    >
        {/* Hero + Carousel */}
        <div>
          <Reveal>
            <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-card pt-6 px-5 pb-8 sm:pt-8 sm:px-8 sm:pb-28 md:pt-12 md:px-12 md:pb-36">
              <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative">
                <p className="text-sm text-muted-foreground font-roboto mb-2">
                  <span className="font-semibold text-foreground/80">{saudacao}</span>
                  <span className="mx-2 text-border">•</span>
                  {todayCapitalized}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-anek text-foreground mb-3 leading-[1.05]">
                  Central do Time de <span className="text-primary">Produto</span>
                </h1>
                <p className="text-sm sm:text-lg text-muted-foreground mb-4 max-w-2xl font-roboto leading-relaxed">
                  Encontre ferramentas, documentações, informações sobre nosso time e os sistemas em um único lugar.
                </p>
                {proximo && (
                  <button
                    onClick={() => document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="group inline-flex items-center gap-2 mb-5 md:mb-7 rounded-full border bg-background/70 backdrop-blur px-3 py-1.5 text-xs font-roboto text-muted-foreground sm:hover:border-primary/40 sm:hover:text-foreground transition-colors max-w-full"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="font-bold text-foreground shrink-0">Próximo marco · {proximo.periodo}</span>
                    <proximo.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{proximo.titulo}</span>
                    <ChevronRight className="h-3 w-3 shrink-0 sm:group-hover:translate-x-0.5 transition-transform duration-300 ease-apple" />
                  </button>
                )}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                  {/* Mobile only: Nosso Time (sm+ tem o carrossel) */}
                  <Link to="/time" className="sm:hidden inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] border border-input bg-background text-foreground text-sm font-semibold font-sora uppercase">
                    <Users className="h-4 w-4" />
                    Nosso Time
                  </Link>
                  <Link to="/design-system" className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] bg-primary text-primary-foreground text-sm font-semibold font-sora uppercase border border-primary sm:hover:bg-transparent sm:hover:text-primary transition-all duration-300 ease-apple sm:hover:-translate-y-0.5">
                    <Palette className="h-4 w-4" />
                    Design System
                  </Link>
                  <Link to="/tom-e-voz" className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] border border-input bg-background text-foreground text-sm font-semibold font-sora uppercase sm:hover:bg-accent sm:hover:text-accent-foreground transition-all duration-300 ease-apple sm:hover:-translate-y-0.5">
                    <Volume2 className="h-4 w-4" />
                    Manual de Tom e Voz
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Carrossel — apenas sm+ */}
          <div className="hidden sm:block relative z-10 sm:-mt-20 md:-mt-24 drop-shadow-2xl sm:px-6 md:px-12">
            <TeamCarousel />
          </div>
        </div>

        {/* Acessos Rápidos — agora antes das Novidades */}
        <Reveal className="sm:-mt-32 md:-mt-48">
          <section>
            <SectionHeader icon={Zap} title="Acessos Rápidos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {accessLinks.map((link, i) => {
                const Icon = link.icon;
                const content = (
                  <div className={cn(
                    "group relative overflow-hidden rounded-2xl border bg-card p-3 sm:p-4 flex items-center gap-3 h-full transition-[transform,box-shadow,border-color] duration-300 ease-apple",
                    link.soon
                      ? "opacity-75"
                      : "sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:border-primary/30"
                  )}>
                    <div className={cn(
                      "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm shrink-0 transition-transform duration-300 ease-apple",
                      !link.soon && "sm:group-hover:scale-110",
                      link.soon && "grayscale-[0.4]",
                      link.gradient
                    )}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold font-anek text-sm text-foreground leading-snug">{link.label}</p>
                      <p className="text-xs text-muted-foreground font-roboto mt-0.5">{link.desc}</p>
                    </div>
                    {link.soon ? (
                      <Tag tone="neutral" className="text-[9px] shrink-0">Em breve</Tag>
                    ) : !link.internal ? (
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-primary -translate-x-1 opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 transition-all duration-300 ease-apple shrink-0" />
                    )}
                  </div>
                );
                if (link.soon) {
                  return <div key={i} aria-disabled="true" className="cursor-default">{content}</div>;
                }
                return link.internal ? (
                  <Link key={i} to={link.to!} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noopener noreferrer" : undefined}>{content}</Link>
                ) : (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">{content}</a>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Mural de Novidades */}
        <Reveal>
          <section>
            <SectionHeader
              icon={Newspaper}
              title="Mural de Novidades"
              action={
                <Link to="/novidades" className="group inline-flex items-center gap-1.5 text-xs font-semibold font-roboto text-primary sm:hover:underline">
                  Ver mural completo <ChevronRight className="h-3.5 w-3.5 sm:group-hover:translate-x-0.5 transition-transform duration-300 ease-apple" />
                </Link>
              }
            />
            <MuralNovidadesCarousel items={muralNovidades} />
          </section>
        </Reveal>

        {/* Produtos */}
        <Reveal>
          <section>
            <SectionHeader icon={BarChart3} title="Soluções Digitais" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {(verTodasSolucoes ? produtos : produtos.slice(0, SOLUCOES_VISIVEIS)).map((p, i) => (
                <ProdutoCard key={i} p={p} />
              ))}
            </div>
            {produtos.length > SOLUCOES_VISIVEIS && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => setVerTodasSolucoes((v) => !v)}
                  aria-expanded={verTodasSolucoes}
                  className="group inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-xs font-semibold font-roboto text-foreground transition-[border-color,color,box-shadow] duration-300 ease-apple sm:hover:border-primary/40 sm:hover:text-primary sm:hover:shadow-sm"
                >
                  {verTodasSolucoes
                    ? "Ver menos"
                    : `Ver mais ${produtos.length - SOLUCOES_VISIVEIS} soluções`}
                  <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-apple", verTodasSolucoes && "rotate-180")} />
                </button>
              </div>
            )}
          </section>
        </Reveal>

        {/* Portfólio */}
        <Reveal>
          <section>
            <SectionHeader icon={ImageIcon} title="Portfólio de Produtos Físicos" />
            <p className="text-sm text-muted-foreground font-roboto -mt-2 mb-4 max-w-2xl">
              Brindes, kits e materiais de marca que o time planeja, desenha e produz.
              Abaixo, os quatro destaques — o catálogo completo fica na página de Produtos Físicos.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {portfolioDestaques.map((item) => (
                <ProdutoFisicoCard key={item.slug} item={item} />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              <Link
                to="/produtos-fisicos"
                className="group inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-xs font-semibold font-roboto text-foreground transition-[border-color,color,box-shadow] duration-300 ease-apple sm:hover:border-primary/40 sm:hover:text-primary sm:hover:shadow-sm"
              >
                Ver todos os {produtosFisicos.length} produtos
                <ChevronRight className="h-3.5 w-3.5 shrink-0 sm:group-hover:translate-x-0.5 transition-transform duration-300 ease-apple" />
              </Link>
            </div>
          </section>
        </Reveal>

        {/* Atualizações da Escola */}
        <Reveal>
          <section>
            <SectionHeader icon={Newspaper} title="Atualizações da Escola" />
            {/* Duas colunas no desktop; `items-start` evita que um item aberto
                estique o vizinho da mesma linha. */}
            <Accordion type="single" collapsible className="grid gap-2 sm:grid-cols-2 items-start">
              {novidadesMensais.map((n, i) => (
                <AccordionItem
                  key={i}
                  value={`mes-${i}`}
                  /* Aberto, o mês ocupa a linha inteira: o conteúdo é longo e,
                     em meia coluna, deixaria a coluna vizinha vazia. */
                  className="rounded-2xl border bg-card overflow-hidden group data-[state=open]:sm:col-span-2"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 transition-colors data-[state=open]:border-b [&>svg]:shrink-0">
                    <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                      <div className="flex flex-col h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 leading-none">
                        <span className="text-[8px] font-bold font-roboto uppercase tracking-wider mt-1.5">mês</span>
                        <span className="text-base font-extrabold font-anek leading-none">{mesNumero(n.mes)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold font-anek text-foreground text-sm leading-tight">{n.mes} {n.ano}</p>
                          <span className="text-[10px] font-roboto text-muted-foreground">{n.items.length} atualizações</span>
                        </div>
                        {/* Preview rotativo — visível apenas quando colapsado */}
                        <div className="group-data-[state=open]:hidden mt-0.5">
                          <RotatingPreview items={n.items.map(item => `${item.emoji} ${item.titulo}`)} />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-5 pb-6 pt-4 space-y-5">
                      {n.intro && (
                        <p className="text-sm font-roboto text-muted-foreground leading-relaxed">{n.intro}</p>
                      )}
                      <div className="space-y-5">
                        {n.items.map((item, j) => (
                          <NovidadeCard key={j} item={item} />
                        ))}
                      </div>
                      {n.spoiler.length > 0 && (
                        <div className="pt-4 border-t">
                          <p className="text-[10px] font-bold font-roboto uppercase tracking-wider text-muted-foreground mb-3">
                            🚀 O que vem por aí
                          </p>
                          <ul className="space-y-1.5">
                            {n.spoiler.map((s, k) => (
                              <li key={k} className="text-xs font-roboto text-muted-foreground">{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {n.rodape && (
                        <p className="text-xs font-roboto text-muted-foreground italic border-t pt-4">{n.rodape}</p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </Reveal>

        {/* Docs e Playbooks */}
        <Reveal>
          <section>
            <SectionHeader icon={FileText} title="Documentações e Playbooks" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {docs.map((d, i) => {
                const Icon = d.icon;
                const inner = (
                  <>
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 transition-transform duration-300 ease-apple",
                      !d.soon && "sm:group-hover:scale-110"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{d.label}</span>
                    {d.soon ? (
                      <Tag tone="neutral" className="text-[9px] ml-auto shrink-0">Em breve</Tag>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto sm:group-hover:translate-x-0.5 sm:group-hover:text-primary transition-all duration-300 ease-apple" />
                    )}
                  </>
                );
                if (d.soon) {
                  return (
                    <div key={i} aria-disabled="true" className="flex items-center gap-3 p-3.5 rounded-xl border bg-card opacity-75 cursor-default">
                      {inner}
                    </div>
                  );
                }
                return (
                  <a key={i} href={d.href} className="group flex items-center gap-3 p-3.5 rounded-xl border bg-card sm:hover:bg-muted/50 sm:hover:border-primary/30 transition-[background-color,border-color] duration-300 ease-apple">
                    {inner}
                  </a>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Roadmap */}
        <Reveal>
          <section id="roadmap">
            <SectionHeader icon={Map} title="A trilha do Time de Produto" />
            <p className="text-sm text-muted-foreground font-roboto -mt-2 mb-4 max-w-2xl">
              O que já entregamos, o que está rolando agora e o que vem por aí.
              Arraste a onda para os lados, use as setas ou clique num marco para ver os detalhes.
            </p>
            <RoadmapTimeline />
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section>
            <SectionHeader icon={MessageSquare} title="Perguntas Frequentes" />
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium font-roboto text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground font-roboto">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </Reveal>
    </PageShell>
  );
}
