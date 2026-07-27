import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AlertCircle, Clock, ExternalLink, Globe, Layers, ListChecks, Tag as TagIcon,
  Target, HelpCircle, Wrench, BadgeCheck, Gift, GraduationCap, RefreshCw,
  BarChart3, Globe2, Tractor, Landmark, Table2, Shirt, UserPlus, Laptop,
  CreditCard, Video as VideoIcon, Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/widgets/Tag";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  solucoesSections,
  type Aula, type Modulo, type InfoCard, type FeatureItem, type QuickInfo,
  escolaInfo, escolaHero, escolaPublico, escolaFeatures, escolaDuracao,
  escolaModulos, obsAjustesRegulares, escolaFerramentas, escolaGarantia,
  sempreInfo, sempreHero, sempreModulos, sempreBeneficios,
  proInfo, proHero, proFeatures, proCronograma,
  analiticaInfo, analiticaHero, analiticaFeatures,
  internacionalInfo, internacionalHero, internacionalModalidades,
  internacionalFeatures, internacionalCronograma,
  agroInfo, agroHero, agroPlataforma, agroConsultoria, agroFazendas,
  contaInfo, contaHero, contaInvestimentos, contaBanking, contaPlanos,
  contaBeneficios, cartaoModulos, cartaoDestaques, contaVideos,
  resumoProdutos,
} from "@/data/solucoes";

/* ============================================================
   Blocos de apoio
   ============================================================ */

const quickInfoIcons = { investimento: TagIcon, site: Globe, acesso: Clock } as const;

function QuickInfoBar({ items, className }: { items: QuickInfo[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, i) => {
        const Icon = quickInfoIcons[item.tipo];
        return (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm font-roboto text-foreground"
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" />
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                {item.texto}
              </a>
            ) : (
              item.texto
            )}
          </span>
        );
      })}
    </div>
  );
}

function ParaQuemE({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-r-xl border border-l-4 border-l-primary bg-card p-5 shadow-sm">
      <p className="text-sm md:text-base text-muted-foreground font-roboto leading-relaxed">
        <strong className="text-foreground font-semibold">Para quem é:</strong> {children}
      </p>
    </div>
  );
}

function ObsBanner({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-[hsl(var(--error)/0.35)] bg-[hsl(var(--error)/0.07)] px-5 py-4",
        className
      )}
    >
      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-[hsl(var(--error))]" />
      <p className="text-sm font-roboto leading-relaxed text-foreground">
        <strong className="font-semibold">Observação:</strong> {children}
      </p>
    </div>
  );
}

function BlocoTitle({ icon: Icon, children, as: As = "h3" }: { icon: React.ElementType; children: React.ReactNode; as?: "h2" | "h3" | "h4" }) {
  return (
    <As className="flex items-center gap-3 text-xl md:text-2xl font-bold font-anek text-foreground mb-4">
      <Icon className="h-6 w-6 shrink-0 text-primary" />
      {children}
    </As>
  );
}

function FeatureList({ items, cols = 1 }: { items: FeatureItem[]; cols?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", cols === 2 && "md:grid-cols-2")}>
      {items.map((f, i) => {
        const Icon = f.icon;
        return (
          <li key={i} className="flex items-start gap-4 rounded-xl border bg-card p-5">
            <Icon className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
            <p className="text-sm text-muted-foreground font-roboto leading-relaxed">
              {f.destaque && <strong className="text-foreground font-semibold">{f.destaque} </strong>}
              {f.texto}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function InfoCardGrid({ cards, cols }: { cards: InfoCard[]; cols: 3 | 4 }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="group rounded-xl border bg-card overflow-hidden flex flex-col transition-[transform,box-shadow,border-color] duration-300 ease-apple sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:border-primary/30"
          >
            {card.img && (
              <img
                src={card.img}
                alt={card.titulo}
                loading="lazy"
                className="w-full aspect-video object-cover border-b"
              />
            )}
            <div className="p-5 flex flex-col gap-2 flex-1">
              {Icon && (
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <p className="font-bold font-anek text-foreground">{card.titulo}</p>
              <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{card.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ClassTable({ aulas }: { aulas: Aula[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-sm font-roboto">
        <thead>
          <tr className="bg-muted/60 text-left">
            <th className="px-4 py-2.5 font-anek font-bold text-xs uppercase tracking-wider text-foreground whitespace-nowrap">Aula</th>
            <th className="px-4 py-2.5 font-anek font-bold text-xs uppercase tracking-wider text-foreground w-full">Título</th>
            <th className="px-4 py-2.5 font-anek font-bold text-xs uppercase tracking-wider text-foreground text-right">Duração</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2.5 whitespace-nowrap font-semibold text-primary">{aula.num}</td>
              <td className="px-4 py-2.5 text-foreground">{aula.titulo}</td>
              <td className="px-4 py-2.5 text-right text-muted-foreground whitespace-nowrap">{aula.duracao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModuloList({ modulos, idPrefix }: { modulos: Modulo[]; idPrefix: string }) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {modulos.map((mod, i) => {
        const Icon = mod.icon;
        return (
          <AccordionItem
            key={i}
            value={`${idPrefix}-${i}`}
            className="rounded-xl border bg-card overflow-hidden data-[state=open]:border-primary/30 transition-colors"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline gap-4 text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 min-w-0">
                {mod.img ? (
                  <img
                    src={mod.img}
                    alt={mod.titulo}
                    loading="lazy"
                    className="w-full md:w-52 aspect-video object-cover rounded-lg border shrink-0"
                  />
                ) : Icon ? (
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground shrink-0 border">
                    <Icon className="h-7 w-7" />
                  </span>
                ) : null}
                <div className="min-w-0">
                  <p className="font-bold font-anek text-base md:text-lg text-foreground leading-snug">{mod.titulo}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mod.meta.map((m, j) => (
                      <Tag key={j} tone="neutral" className="text-[10px]">{m}</Tag>
                    ))}
                  </div>
                  {mod.desc && (
                    <p className="text-sm text-muted-foreground font-roboto leading-relaxed mt-2">{mod.desc}</p>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 space-y-4">
              <ClassTable aulas={mod.aulas} />
              {mod.obs && <ObsBanner>{mod.obs}</ObsBanner>}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function CronogramaTable({ colunas, linhas }: { colunas: string[]; linhas: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card max-w-3xl">
      <table className="w-full text-sm font-roboto">
        <thead>
          <tr className="bg-muted/60 text-left">
            {colunas.map((c, i) => (
              <th
                key={c}
                className={cn(
                  "px-4 py-2.5 font-anek font-bold text-xs uppercase tracking-wider text-foreground",
                  i === colunas.length - 1 && "text-right"
                )}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2.5 whitespace-nowrap font-semibold text-primary">{linha[0]}</td>
              <td className="px-4 py-2.5 text-foreground w-full">{linha[1]}</td>
              <td className="px-4 py-2.5 text-right text-muted-foreground">{linha[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Velocidade constante do preview rolável (px/s) — igual aos cards de LP do Hub. */
const PREVIEW_SCROLL_SPEED = 45;

/** Janela com a LP do produto que rola no hover, no mesmo padrão do Hub. */
function LpPreview({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [scroll, setScroll] = useState({ dist: 0, dur: 0 });
  const reducedMotion = useReducedMotion();

  const measure = useCallback(() => {
    const img = imgRef.current;
    const frame = frameRef.current;
    if (!img || !frame) return;
    const dist = Math.max(img.clientHeight - frame.clientHeight, 0);
    setScroll({ dist, dur: dist / PREVIEW_SCROLL_SPEED });
  }, []);

  const scrolling = hovered && !reducedMotion;

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => { measure(); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className="relative h-72 md:h-full md:min-h-[420px] overflow-hidden rounded-xl border bg-muted/40 shadow-sm"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
}

interface ProdutoHeroProps {
  badge: string;
  titulo: string;
  img: string;
  info: QuickInfo[];
  paraQuemE: React.ReactNode;
  children?: React.ReactNode;
}

function ProdutoHero({ badge, titulo, img, info, paraQuemE, children }: ProdutoHeroProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-stretch">
      <LpPreview src={img} alt={titulo} />
      <div className="flex flex-col justify-center gap-4">
        <div>
          <Tag tone="primary" className="mb-3">{badge}</Tag>
          <h2 className="text-2xl md:text-3xl font-bold font-anek text-foreground">{titulo}</h2>
        </div>
        <QuickInfoBar items={info} />
        <ParaQuemE>{paraQuemE}</ParaQuemE>
        {children}
      </div>
    </div>
  );
}

function DemoVideo({ src, className }: { src: string; className?: string }) {
  return (
    <video
      className={cn(
        "w-full max-w-[260px] aspect-[9/16] rounded-2xl border-4 border-card bg-black object-cover shadow-lg",
        className
      )}
      autoPlay
      muted
      loop
      playsInline
      controls
    >
      <source src={src} type="video/mp4" />
      O seu navegador não suporta a tag de vídeo.
    </video>
  );
}

/* ============================================================
   Subnavegação com scrollspy
   ============================================================ */

function SolucoesSubnav() {
  const [activeId, setActiveId] = useState(solucoesSections[0].id);

  useEffect(() => {
    const onScroll = () => {
      let current = solucoesSections[0].id;
      for (const section of solucoesSections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 160) current = section.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-14 md:top-16 z-40 -mx-4 md:-mx-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <nav
        aria-label="Produtos"
        className="flex gap-1 overflow-x-auto px-4 md:px-8 py-2 timeline-scrollbar"
      >
        {solucoesSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => goTo(section.id)}
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-anek border transition-colors",
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-transparent hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ============================================================
   Página
   ============================================================ */

export default function SolucoesPage() {
  const location = useLocation();

  // Rola até a âncora do hash (#auvp-escola etc.) — links do guia antigo
  // continuam funcionando após o redirecionamento para a Central.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <PageShell width="7xl" footer="Nossas Soluções — Produtos AUVP" mainClassName="pb-16">
      <SolucoesSubnav />

      {/* Hero da página */}
      <div className="py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
          <Layers className="h-3.5 w-3.5" /> Nossas Soluções
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">
          O ecossistema de produtos AUVP
        </h1>
        <p className="text-muted-foreground font-roboto max-w-2xl">
          Tudo sobre cada solução da AUVP em um só lugar: para quem é, o que entrega,
          cronogramas de conteúdo, ferramentas, planos e condições — o material de
          consulta oficial do time.
        </p>
      </div>

      <div className="space-y-24">

        {/* ==================== AUVP ESCOLA ==================== */}
        <section id="auvp-escola" className="scroll-mt-32 space-y-16">
          <ProdutoHero
            badge={escolaHero.badge}
            titulo="AUVP Escola"
            img={escolaHero.img}
            info={escolaInfo}
            paraQuemE={escolaHero.paraQuemE}
          />

          <div id="escola-publico" className="scroll-mt-32">
            <BlocoTitle icon={Target}>É para quem busca:</BlocoTitle>
            <InfoCardGrid cards={escolaPublico} cols={3} />
          </div>

          <div id="escola-o-que-e" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={HelpCircle}>O que é AUVP?</BlocoTitle>
            <p className="text-muted-foreground font-roboto">
              O treinamento da AUVP Escola é um guia completo para dominar o mundo dos investimentos.
            </p>
            <FeatureList items={escolaFeatures} />
            <p className="inline-flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm font-roboto text-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <strong className="font-semibold">{escolaDuracao}</strong>
            </p>
          </div>

          <div id="escola-cronograma" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={ListChecks}>Cronograma de conteúdo</BlocoTitle>
            <p className="text-sm text-muted-foreground font-roboto italic">
              * Clique nos módulos abaixo para expandir e ver a lista de aulas e durações.
            </p>
            <ModuloList modulos={escolaModulos} idPrefix="escola" />
            <ObsBanner>{obsAjustesRegulares}</ObsBanner>
          </div>

          <div id="escola-ferramentas" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={Wrench}>Ferramentas AUVP</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">
              A AUVP possui uma área com todas as ferramentas necessárias para apoio às aulas,
              isso inclui um sistema de orçamento doméstico, de metas, de primeiro milhão e de
              ativos e passivos.
            </p>
            <InfoCardGrid cards={escolaFerramentas} cols={4} />
            <div className="rounded-xl border bg-muted/40 p-6">
              <BlocoTitle icon={Shirt} as="h4">Produtos físicos</BlocoTitle>
              <p className="text-muted-foreground font-roboto text-sm">
                Também temos a nossa loja Investidor Sardinha, onde o aluno encontra itens clássicos
                da nossa comunidade. Para acessar,{" "}
                <a
                  href="https://loja.investidorsardinha.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline underline-offset-2"
                >
                  clique aqui
                </a>.
              </p>
            </div>
          </div>

          <div id="escola-garantia" className="scroll-mt-32">
            <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-t-4 border-t-primary bg-card p-6 md:p-8">
              <img
                src={escolaGarantia.selo}
                alt="Selo Aprendizado Garantido"
                loading="lazy"
                className="h-32 w-32 object-contain shrink-0"
              />
              <div>
                <BlocoTitle icon={BadgeCheck}>{escolaGarantia.titulo}</BlocoTitle>
                <p className="text-base md:text-lg text-foreground font-roboto leading-relaxed">
                  {escolaGarantia.texto}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== AUVP SEMPRE ==================== */}
        <section id="auvp-sempre" className="scroll-mt-32 space-y-16 border-t pt-16">
          <ProdutoHero
            badge={sempreHero.badge}
            titulo="AUVP Sempre"
            img={sempreHero.img}
            info={sempreInfo}
            paraQuemE={<span id="sempre-publico" className="scroll-mt-32">{sempreHero.paraQuemE}</span>}
          />

          <div id="sempre-o-que-e" className="scroll-mt-32 space-y-4">
            <BlocoTitle icon={RefreshCw}>O que é AUVP Sempre?</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">{sempreHero.oQueE}</p>
          </div>

          <div id="sempre-cronograma" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={ListChecks}>O que encontro na AUVP Sempre?</BlocoTitle>
            <p className="text-sm text-muted-foreground font-roboto italic">
              * Clique nos módulos extras abaixo para expandir e ver a lista de aulas e durações.
            </p>
            <ModuloList modulos={sempreModulos} idPrefix="sempre" />
            <ObsBanner>{obsAjustesRegulares}</ObsBanner>
          </div>

          <div id="sempre-ferramentas" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={Gift}>Benefícios da Assinatura</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">
              Além das aulas sempre atualizadas, a AUVP Sempre oferece{" "}
              <strong className="text-foreground">acesso contínuo às ferramentas de ponta</strong>{" "}
              para a tomada de decisão.
            </p>
            <InfoCardGrid cards={sempreBeneficios} cols={3} />
          </div>
        </section>

        {/* ==================== AUVP PRO ==================== */}
        <section id="auvp-pro" className="scroll-mt-32 space-y-16 border-t pt-16">
          <ProdutoHero
            badge={proHero.badge}
            titulo="AUVP PRO"
            img={proHero.img}
            info={proInfo}
            paraQuemE={<span id="pro-publico" className="scroll-mt-32">{proHero.paraQuemE}</span>}
          />

          <div id="pro-o-que-e" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={GraduationCap}>O que é AUVP PRO?</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">{proHero.oQueE}</p>
            <p className="text-muted-foreground font-roboto max-w-3xl">
              Cada certificação contará com um curso exclusivo dentro da nossa plataforma.
              Com esse treinamento o aluno encontrará:
            </p>
            <FeatureList items={proFeatures} cols={2} />
          </div>

          <div id="pro-cronograma" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={ListChecks}>Cronograma de conteúdo</BlocoTitle>
            <p className="text-muted-foreground font-roboto">{proCronograma.intro}</p>
            <CronogramaTable colunas={proCronograma.colunas} linhas={proCronograma.linhas} />
            <ObsBanner>{proCronograma.obs}</ObsBanner>
          </div>
        </section>

        {/* ==================== AUVP ANALÍTICA ==================== */}
        <section id="auvp-analitica" className="scroll-mt-32 space-y-16 border-t pt-16">
          <ProdutoHero
            badge={analiticaHero.badge}
            titulo="AUVP Analítica"
            img={analiticaHero.img}
            info={analiticaInfo}
            paraQuemE={<span id="analitica-publico" className="scroll-mt-32">{analiticaHero.paraQuemE}</span>}
          >
            <ObsBanner>{analiticaHero.obs}</ObsBanner>
          </ProdutoHero>

          <div id="analitica-o-que-e" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={BarChart3}>O que é AUVP Analítica?</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">{analiticaHero.oQueE}</p>
            <p className="text-muted-foreground font-roboto max-w-3xl">{analiticaHero.freemium}</p>
            <FeatureList items={analiticaFeatures} />
          </div>
        </section>

        {/* ==================== AUVP INTERNACIONAL ==================== */}
        <section id="auvp-internacional" className="scroll-mt-32 space-y-16 border-t pt-16">
          <ProdutoHero
            badge={internacionalHero.badge}
            titulo="AUVP Internacional"
            img={internacionalHero.img}
            info={internacionalInfo}
            paraQuemE={<span id="internacional-publico" className="scroll-mt-32">{internacionalHero.paraQuemE}</span>}
          >
            <ObsBanner>
              {internacionalModalidades.intro}
              <span className="block mt-2 space-y-1">
                {internacionalModalidades.itens.map((item, i) => (
                  <span key={i} className="block">
                    <strong className="font-semibold">{item.destaque}</strong> {item.texto}
                  </span>
                ))}
              </span>
            </ObsBanner>
          </ProdutoHero>

          <div id="internacional-o-que-e" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={Globe2}>O que é AUVP Internacional?</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">{internacionalHero.oQueE}</p>
            <p className="text-muted-foreground font-roboto max-w-3xl">
              Com nossos especialistas, o aluno aprenderá tudo o que precisa para:
            </p>
            <FeatureList items={internacionalFeatures} cols={2} />
            <p className="inline-flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm font-roboto text-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <strong className="font-semibold">{internacionalHero.duracao}</strong>
            </p>
          </div>

          <div id="internacional-cronograma" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={ListChecks}>Cronograma de conteúdo</BlocoTitle>
            <CronogramaTable colunas={internacionalCronograma.colunas} linhas={internacionalCronograma.linhas} />
            <ObsBanner>{obsAjustesRegulares}</ObsBanner>
          </div>
        </section>

        {/* ==================== AUVP AGRO ==================== */}
        <section id="auvp-agro" className="scroll-mt-32 space-y-16 border-t pt-16">
          <ProdutoHero
            badge={agroHero.badge}
            titulo="AUVP Agro"
            img={agroHero.img}
            info={agroInfo}
            paraQuemE={<span id="agro-publico" className="scroll-mt-32">{agroHero.paraQuemE}</span>}
          />

          <div id="agro-o-que-e" className="scroll-mt-32 space-y-4">
            <BlocoTitle icon={Tractor}>O que é AUVP Agro?</BlocoTitle>
            {agroHero.oQueE.map((p, i) => (
              <p key={i} className="text-muted-foreground font-roboto max-w-3xl">{p}</p>
            ))}
          </div>

          <div id="agro-subprodutos" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={Layers}>Subprodutos da AUVP Agro</BlocoTitle>
            <Accordion type="multiple" className="rounded-xl border bg-card divide-y overflow-hidden">
              <AccordionItem value="plataforma" className="border-b-0">
                <AccordionTrigger className="px-5 py-4 font-anek font-semibold text-foreground hover:no-underline">
                  1. Plataforma Agro
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-6 space-y-6 bg-muted/30 pt-5 border-t">
                  <p className="text-muted-foreground font-roboto">{agroPlataforma.desc}</p>

                  <div className="rounded-xl border bg-foreground text-background p-6 max-w-md">
                    <p className="text-xs font-bold font-anek uppercase tracking-wider text-primary mb-4">
                      Plataforma Agro (1 ano)
                    </p>
                    {agroPlataforma.precos.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 py-3 font-roboto text-sm border-b border-background/15 last:border-b-0"
                      >
                        <span>{p.label}</span>
                        <span className="font-bold text-base">{p.valor}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-bold font-anek text-foreground mb-3">Benefícios Inclusos</h4>
                    <FeatureList items={agroPlataforma.beneficios} cols={2} />
                  </div>

                  <div id="agro-cronograma" className="scroll-mt-32">
                    <h4 className="font-bold font-anek text-foreground mb-3">Aulas e Treinamentos</h4>
                    <div className="space-y-3">
                      {agroPlataforma.treinamentos.map((t, i) => {
                        const Icon = t.icon;
                        return (
                          <div key={i} className="flex items-start gap-4 rounded-xl border bg-card p-5">
                            <span className="flex h-11 w-11 items-center justify-center rounded-lg border bg-background text-foreground shrink-0">
                              <Icon className="h-5 w-5" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-bold font-anek text-foreground">{t.titulo}</p>
                                <Tag tone="neutral" className="text-[10px]">{t.badge}</Tag>
                              </div>
                              <p className="text-sm text-muted-foreground font-roboto mt-1">{t.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <ObsBanner className="mt-4">{agroPlataforma.obs}</ObsBanner>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="consultoria" className="border-b-0">
                <AccordionTrigger className="px-5 py-4 font-anek font-semibold text-foreground hover:no-underline">
                  2. Consultoria Agro
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-6 pt-5 bg-muted/30 border-t">
                  <ul className="space-y-3">
                    {agroConsultoria.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground font-roboto leading-relaxed">
                        <strong className="text-foreground font-semibold">{item.destaque}</strong> {item.texto}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fazendas" id="agro-fazendas" className="border-b-0 scroll-mt-32">
                <AccordionTrigger className="px-5 py-4 font-anek font-semibold text-foreground hover:no-underline">
                  3. AUVP Fazendas
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-6 pt-5 space-y-4 bg-muted/30 border-t">
                  <QuickInfoBar items={agroFazendas.info} />
                  <p className="text-muted-foreground font-roboto">{agroFazendas.desc}</p>
                  <ObsBanner>{agroFazendas.obs}</ObsBanner>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ==================== CONTA AUVP ==================== */}
        <section id="auvp-conta" className="scroll-mt-32 space-y-16 border-t pt-16">
          <ProdutoHero
            badge={contaHero.badge}
            titulo="Conta AUVP"
            img={contaHero.img}
            info={contaInfo}
            paraQuemE={<span id="conta-publico" className="scroll-mt-32">{contaHero.paraQuemE}</span>}
          />

          <div id="conta-o-que-e" className="scroll-mt-32 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {[contaInvestimentos, contaBanking].map((conta) => {
                const Icon = conta.icon;
                return (
                  <div key={conta.titulo} className="space-y-4">
                    <BlocoTitle icon={Icon}>{conta.titulo}</BlocoTitle>
                    {conta.intro.map((p, i) => (
                      <p key={i} className="text-muted-foreground font-roboto text-sm leading-relaxed">{p}</p>
                    ))}
                    <ul className="space-y-2">
                      {conta.itens.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground font-roboto"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground font-roboto text-sm leading-relaxed">{conta.fechamento}</p>
                  </div>
                );
              })}
            </div>
            <ObsBanner>A estrutura de investimentos e a conta banking estão integradas ao BTG Pactual.</ObsBanner>
          </div>

          <div id="conta-modelos" className="scroll-mt-32 space-y-5">
            <BlocoTitle icon={Handshake}>Modelos de contratação</BlocoTitle>
            <p className="text-muted-foreground font-roboto max-w-3xl">
              Na AUVP, sabemos que cada pessoa investe de um jeito. Por isso, oferecemos diferentes
              planos, que combinam com seu momento, são três opções com taxas justas, benefícios
              reais e zero conflito de interesse.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {contaPlanos.map((plano) => (
                <div
                  key={plano.tag}
                  className={cn(
                    "rounded-2xl border p-7 flex flex-col transition-[transform,box-shadow] duration-300 ease-apple sm:hover:-translate-y-1 sm:hover:shadow-lg",
                    plano.destaque ? "bg-foreground text-background border-foreground" : "bg-card"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-bold font-anek uppercase tracking-wider mb-4",
                      plano.destaque ? "text-primary" : "text-primary"
                    )}
                  >
                    {plano.tag}
                  </p>
                  <p
                    className={cn(
                      "text-sm font-roboto leading-relaxed mb-6",
                      plano.destaque ? "text-background/80" : "text-muted-foreground"
                    )}
                  >
                    {plano.desc}
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm font-bold font-roboto mb-1">{plano.taxaLabel}</p>
                    <p className={cn("text-xl font-bold font-anek", plano.destaque ? "text-primary" : "text-primary")}>
                      {plano.taxa}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-roboto italic mt-1",
                        plano.destaque ? "text-background/70" : "text-muted-foreground"
                      )}
                    >
                      {plano.taxaDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center">
              <a
                href="https://auvpcapital.com.br/planos/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-anek font-bold text-primary underline underline-offset-4"
              >
                Clique aqui e conheça os planos da AUVP Capital
                <ExternalLink className="h-4 w-4" />
              </a>
            </p>
          </div>

          <div id="conta-abertura" className="scroll-mt-32">
            <div className="rounded-xl border bg-muted/40 p-6 md:p-8 space-y-4">
              <BlocoTitle icon={UserPlus}>Como funciona a abertura de conta na AUVP?</BlocoTitle>
              <p className="text-muted-foreground font-roboto">
                Existem várias formas de abrir conta com a AUVP, o processo pode ser feito
                diretamente pelo nosso site ou pelo app "BTG Investimentos".
              </p>
              <ObsBanner>Quem já possui conta no BTG, pode apenas solicitar a troca de assessoria.</ObsBanner>
            </div>
          </div>

          <div id="conta-plataforma" className="scroll-mt-32">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <BlocoTitle icon={Laptop}>Como funciona nossa plataforma de investimentos?</BlocoTitle>
                <p className="text-muted-foreground font-roboto">
                  Abrindo a conta na nossa plataforma de investimentos, já se tem acesso automático
                  à plataforma de investimentos, que atua em parceria com o BTG Pactual.
                </p>
              </div>
              <div className="flex justify-center">
                <DemoVideo src={contaVideos.plataforma} />
              </div>
            </div>
          </div>

          <div id="conta-beneficios" className="scroll-mt-32 space-y-12">
            <div className="space-y-5">
              <BlocoTitle icon={Landmark}>Benefícios da AUVP Capital</BlocoTitle>
              <p className="text-muted-foreground font-roboto">Abrindo uma conta na AUVP Capital, você garante:</p>
              <FeatureList items={contaBeneficios} cols={2} />
            </div>

            <div className="space-y-5">
              <BlocoTitle icon={CreditCard}>Benefícios Cartão AUVP</BlocoTitle>
              <p className="text-muted-foreground font-roboto max-w-3xl">
                <strong className="text-foreground">Módulos de Benefícios:</strong> personalize seu
                cartão com até 5 módulos exclusivos, ajustando os benefícios conforme suas
                preferências e necessidades. Veja quais são eles:
              </p>
              <Accordion type="multiple" className="rounded-xl border bg-card divide-y overflow-hidden">
                {cartaoModulos.map((mod) => (
                  <AccordionItem key={mod.titulo} value={mod.titulo} className="border-b-0">
                    <AccordionTrigger className="px-5 py-4 font-anek font-semibold text-foreground hover:no-underline">
                      {mod.titulo}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pt-4 bg-muted/30 border-t">
                      <ul className="space-y-2">
                        {mod.itens.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-roboto leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="grid lg:grid-cols-[1fr_minmax(280px,340px)] gap-4">
                <div className="flex flex-col gap-4">
                  {cartaoDestaques.map((card) => {
                    const Icon = card.icon!;
                    return (
                      <div key={card.titulo} className="flex items-start gap-4 rounded-xl border bg-card p-6 flex-1">
                        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-bold font-anek text-foreground mb-1">{card.titulo}</p>
                          <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{card.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-xl border bg-card p-6 flex flex-col items-center text-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <VideoIcon className="h-5 w-5" />
                  </span>
                  <p className="font-bold font-anek text-foreground">Demonstração no App BTG</p>
                  <DemoVideo src={contaVideos.appBtg} className="max-w-[240px]" />
                </div>
              </div>

              <ObsBanner>O cartão AUVP Capital está sujeito a análise de crédito.</ObsBanner>
            </div>
          </div>
        </section>

        {/* ==================== RESUMO ==================== */}
        <section id="resumo-produtos" className="scroll-mt-32 space-y-5 border-t pt-16">
          <div>
            <Tag tone="primary" className="mb-3">Tabela Comparativa</Tag>
            <BlocoTitle icon={Table2} as="h2">Resumo de Produtos</BlocoTitle>
            <p className="text-muted-foreground font-roboto">
              Consulte rapidamente as informações objetivas de cada produto do ecossistema AUVP.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full min-w-[800px] text-sm font-roboto text-left">
              <thead>
                <tr className="bg-muted/60">
                  {["Produto", "Investimento", "Para quem é", "Duração / Tempo de Acesso", "Site Oficial"].map((h) => (
                    <th key={h} className="px-5 py-3 font-anek font-bold text-xs uppercase tracking-wider text-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resumoProdutos.map((p) => (
                  <tr key={p.produto} className="border-t align-top hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-anek font-bold text-primary whitespace-nowrap">{p.produto}</td>
                    <td className="px-5 py-4 text-foreground">{p.investimento}</td>
                    <td className="px-5 py-4 text-muted-foreground leading-relaxed">{p.paraQuemE}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.duracao}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <a
                        href={p.site.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2"
                      >
                        {p.site.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
