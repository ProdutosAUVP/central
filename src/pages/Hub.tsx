import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalNav } from "@/components/GlobalNav";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  BookOpen, Palette, Volume2, Users, User, ExternalLink,
  Sun, Moon, ChevronRight, ChevronLeft, Newspaper, Zap,
  BarChart3, GraduationCap, MessageSquare, Settings,
  FileText, Lightbulb, ImageIcon, CalendarDays
} from "lucide-react";
import { teamPhotos } from "@/assets/team";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const novidades = [
  {
    tag: "Design System",
    tagColor: "bg-emerald-100 text-emerald-800",
    title: "Novos componentes de data viz",
    desc: "Paleta de 8 cores otimizada para gráficos de pizza, barras e linhas com suporte a dark mode.",
    date: "Mai 2025",
  },
  {
    tag: "Tom e Voz",
    tagColor: "bg-blue-100 text-blue-800",
    title: "Manual atualizado com novos produtos",
    desc: "Agro, Analítica, Câmbio e Seguros ganham sessões de tom e voz específicas.",
    date: "Abr 2025",
  },
  {
    tag: "Time",
    tagColor: "bg-purple-100 text-purple-800",
    title: "Organograma atualizado",
    desc: "Novos membros no time de Produto. Veja quem é quem e como nos conectamos.",
    date: "Mar 2025",
  },
];

const accessLinks = [
  { label: "Design System", desc: "Componentes e tokens", icon: Palette, to: "/design-system", internal: true, gradient: "from-violet-500 to-purple-600" },
  { label: "Tom e Voz", desc: "Guia de comunicação", icon: Volume2, to: "/tom-e-voz", internal: true, gradient: "from-sky-500 to-blue-600" },
  { label: "Time de Produto", desc: "Organograma e pilares", icon: Users, to: "/time", internal: true, gradient: "from-fuchsia-500 to-pink-600" },
  { label: "Figma", desc: "Arquivos de design", icon: ExternalLink, href: "https://figma.com", internal: false, gradient: "from-orange-500 to-red-500" },
  { label: "GitHub", desc: "Repositórios", icon: ExternalLink, href: "https://github.com/produtosauvp", internal: false, gradient: "from-slate-600 to-slate-800" },
  { label: "Notion", desc: "Documentações", icon: FileText, href: "#", internal: false, gradient: "from-neutral-600 to-neutral-800" },
  { label: "Analytics", desc: "Métricas de produto", icon: BarChart3, href: "#", internal: false, gradient: "from-emerald-500 to-teal-600" },
  { label: "AUVP Escola", desc: "Plataforma de cursos", icon: GraduationCap, to: "/escola", internal: true, newTab: true, gradient: "from-amber-500 to-orange-600" },
];

const produtos = [
  { name: "AUVP Capital", desc: "Plataforma de investimentos", status: "Ativo", statusColor: "bg-green-100 text-green-700" },
  { name: "AUVP Escola", desc: "Plataforma de educação financeira", status: "Ativo", statusColor: "bg-green-100 text-green-700", to: "/escola" },
  { name: "AUVP Analítica", desc: "Análise de investimentos", status: "Beta", statusColor: "bg-yellow-100 text-yellow-700" },
  { name: "AUVP Agro", desc: "Produtos do agronegócio", status: "Em desenvolvimento", statusColor: "bg-blue-100 text-blue-700" },
  { name: "AUVP Câmbio", desc: "Operações de câmbio", status: "Beta", statusColor: "bg-yellow-100 text-yellow-700" },
  { name: "AUVP Crédito", desc: "Soluções de crédito", status: "Em desenvolvimento", statusColor: "bg-blue-100 text-blue-700" },
  { name: "AUVP Seguros", desc: "Produtos de seguro", status: "Em desenvolvimento", statusColor: "bg-blue-100 text-blue-700" },
  { name: "AUVP Experience", desc: "Experiências premium", status: "Planejado", statusColor: "bg-gray-100 text-gray-600" },
];

const docs = [
  { label: "Playbook de Produto", icon: BookOpen, href: "#" },
  { label: "Diretrizes de Acessibilidade", icon: FileText, href: "#" },
  { label: "Processo de Discovery", icon: Lightbulb, href: "#" },
  { label: "Protocolo de Lanaçamento", icon: Zap, href: "#" },
  { label: "Guia de Pesquisa com Usuário", icon: MessageSquare, href: "#" },
  { label: "Padrões de API e Integrações", icon: Settings, href: "#" },
];

const portfolio = [
  { nome: "Kit de Onboarding", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800", desc: "Caderno, caneta e carta de boas-vindas entregues no primeiro dia.", img: "" },
  { nome: "Camiseta AUVP", tag: "Brinde", tagColor: "bg-blue-100 text-blue-800", desc: "Camiseta preta com bordado do olho dourado da AUVP.", img: "" },
  { nome: "Caneca Sardinha", tag: "Brinde", tagColor: "bg-blue-100 text-blue-800", desc: "Caneca de porcelana com design exclusivo para o time.", img: "" },
  { nome: "Cartão de Visitas", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800", desc: "Cartão premium com verniz localizado e dados de contato.", img: "" },
  { nome: "Banner de Evento", tag: "Evento", tagColor: "bg-purple-100 text-purple-800", desc: "Banner retrátil 100×200 cm usado nos eventos e workshops.", img: "" },
  { nome: "Pasta Corporativa", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800", desc: "Pasta A4 com impressão da marca e bolso interno.", img: "" },
  { nome: "Ecobag AUVP", tag: "Brinde", tagColor: "bg-blue-100 text-blue-800", desc: "Sacola de algodão cru com silk do olho AUVP.", img: "" },
  { nome: "Planner Sardinha", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800", desc: "Planner anual exclusivo com seções de metas e OKRs.", img: "" },
];

interface Evento {
  date: string; // "YYYY-MM-DD"
  titulo: string;
  tag: string;
  tagColor: string;
}

const eventos: Evento[] = [
  { date: "2025-06-02", titulo: "Sprint Planning — Q2 Sprint 6", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800" },
  { date: "2025-06-09", titulo: "Design Review semanal", tag: "Design", tagColor: "bg-purple-100 text-purple-800" },
  { date: "2025-06-16", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800" },
  { date: "2025-06-16", titulo: "Sprint Planning — Q2 Sprint 7", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800" },
  { date: "2025-06-23", titulo: "Retrospectiva do mês", tag: "Processo", tagColor: "bg-amber-100 text-amber-800" },
  { date: "2025-06-30", titulo: "Product Roadmap Review Q3", tag: "Roadmap", tagColor: "bg-rose-100 text-rose-800" },
  { date: "2025-07-07", titulo: "Sprint Planning — Q3 Sprint 1", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800" },
  { date: "2025-07-14", titulo: "Design Review semanal", tag: "Design", tagColor: "bg-purple-100 text-purple-800" },
  { date: "2025-07-16", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800" },
  { date: "2025-07-21", titulo: "Workshop de UX Research", tag: "Time", tagColor: "bg-cyan-100 text-cyan-800" },
  { date: "2025-07-28", titulo: "Retrospectiva Q3 Sprint 1", tag: "Processo", tagColor: "bg-amber-100 text-amber-800" },
  { date: "2025-08-04", titulo: "Sprint Planning — Q3 Sprint 2", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800" },
  { date: "2025-08-18", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800" },
  { date: "2025-08-25", titulo: "Review de OKRs Q3", tag: "Roadmap", tagColor: "bg-rose-100 text-rose-800" },
  { date: "2025-09-01", titulo: "Kick-off Q4", tag: "Processo", tagColor: "bg-amber-100 text-amber-800" },
  { date: "2025-09-15", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800" },
];

const MESES_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS_PT  = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

function CalendarioWidget() {
  const hoje = new Date();
  const [viewYear,  setViewYear]  = useState(hoje.getFullYear());
  const [viewMonth, setViewMonth] = useState(hoje.getMonth()); // 0-based

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const eventDates = new Set(
    eventos
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
      })
      .map(e => new Date(e.date).getDate())
  );

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (d: number) =>
    d === hoje.getDate() && viewMonth === hoje.getMonth() && viewYear === hoje.getFullYear();

  // Upcoming events: months strictly after the viewed month
  const nextMonthStart = new Date(viewYear, viewMonth + 1, 1);
  const upcoming = eventos
    .filter(e => new Date(e.date) >= nextMonthStart)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Group upcoming by month label
  const upcomingByMonth: { label: string; items: Evento[] }[] = [];
  for (const e of upcoming) {
    const d = new Date(e.date);
    const label = `${MESES_PT[d.getMonth()]} ${d.getFullYear()}`;
    const last = upcomingByMonth[upcomingByMonth.length - 1];
    if (last && last.label === label) last.items.push(e);
    else upcomingByMonth.push({ label, items: [e] });
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Calendário */}
      <div className="rounded-xl border bg-card p-5 shrink-0 w-full md:w-auto">
        {/* Navegação */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-bold font-anek text-foreground text-sm">
            {MESES_PT[viewMonth]} {viewYear}
          </span>
          <button onClick={nextMonth} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Cabeçalho dias */}
        <div className="grid grid-cols-7 mb-1">
          {DIAS_PT.map(d => (
            <div key={d} className="text-center text-[10px] font-bold text-muted-foreground font-roboto py-1">{d}</div>
          ))}
        </div>

        {/* Grid de dias */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => (
            <div key={i} className="flex flex-col items-center py-0.5">
              {day ? (
                <div className={cn(
                  "h-8 w-8 flex flex-col items-center justify-center rounded-full text-xs font-roboto font-medium relative",
                  isToday(day) && "bg-primary text-primary-foreground",
                  !isToday(day) && eventDates.has(day) && "bg-primary/10 text-primary font-bold",
                  !isToday(day) && !eventDates.has(day) && "text-foreground"
                )}>
                  {day}
                  {eventDates.has(day) && !isToday(day) && (
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary" />
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Eventos do mês visualizado */}
        {(() => {
          const thisMonthEvents = eventos.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
          });
          if (thisMonthEvents.length === 0) return null;
          return (
            <div className="mt-4 pt-4 border-t space-y-2">
              {thisMonthEvents.map((e, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-roboto w-6 shrink-0 text-right">
                    {new Date(e.date).getDate()}
                  </span>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-roboto shrink-0", e.tagColor)}>
                    {e.tag}
                  </span>
                  <span className="text-xs font-roboto text-foreground truncate">{e.titulo}</span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Próximas datas marcadas — coluna direita */}
      {upcomingByMonth.length > 0 && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-roboto mb-3">
            Próximas datas marcadas
          </p>
          <div className="space-y-4">
            {upcomingByMonth.map((group, gi) => (
              <div key={gi}>
                <p className="text-[11px] font-bold text-primary uppercase tracking-widest font-roboto mb-2">{group.label}</p>
                <div className="space-y-2">
                  {group.items.map((e, i) => {
                    const d = new Date(e.date);
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                        <div className="flex flex-col items-center justify-center h-10 w-10 rounded-lg bg-primary/10 shrink-0">
                          <span className="text-[10px] font-bold text-primary font-roboto uppercase">{MESES_PT[d.getMonth()].slice(0,3)}</span>
                          <span className="text-sm font-bold text-primary font-anek leading-none">{d.getDate()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold font-anek text-foreground truncate">{e.titulo}</p>
                          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-roboto", e.tagColor)}>{e.tag}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: "Como acesso o Design System?", a: "Clique em 'Design System' nos Acessos Rápidos ou use o menu de navegação global no canto superior esquerdo." },
  { q: "O que é o Manual de Tom e Voz?", a: "É o guia de comunicação verbal da AUVP, com diretrizes de linguagem para cada área e produto da empresa." },
  { q: "Como sugiro um novo componente?", a: "Abra uma issue no repositório do Design System no GitHub ou entre em contato com o time de Produto." },
  { q: "Com que frequência o Design System é atualizado?", a: "O Design System é atualizado continuamente. Novidades são comunicadas na seção 'Novidades do Mês' desta Central." },
];

// ─── Team Carousel ────────────────────────────────────────────────────────────

const TEAM_CAROUSEL = [
  { id: "raul",     name: "Raul Sena",           role: "Fundador e CEO"         },
  { id: "beatriz",  name: "Beatriz Henriques",    role: "Diretora de Produto"    },
  { id: "daniel",   name: "Daniel Machado",       role: "Coordenador de Produto" },
  { id: "debora",   name: "Debora Sanders",       role: "Analista de CX"         },
  { id: "ariadne",  name: "Ariadne Carneiro",     role: "Gerente de Produto"     },
  { id: "armando",  name: "Armando Neto",         role: "Designer de Produto"    },
  { id: "eria",     name: "Éria Alencar",         role: "Designer de Produto"    },
  { id: "mateus",   name: "Mateus Graff",         role: "Redator"                },
  { id: "jeniffer", name: "Jeniffer Nascimento",  role: "Analista de Produto"    },
  { id: "elane",    name: "Elane Rodrigues",      role: "Analista de Produto"    },
  { id: "ana",      name: "Ana Beatriz Melo",     role: "Assistente de Produto"  },
  { id: "hiago",    name: "Hiago Felipe Sousa",   role: "Assistente de Produto"  },
];

function TeamCarousel() {
  const items = [...TEAM_CAROUSEL, ...TEAM_CAROUSEL];
  return (
    <Link
      to="/time"
      className="group relative block overflow-hidden rounded-2xl cursor-pointer"
      aria-label="Conheça nosso time"
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="flex items-center gap-2 font-bold font-anek text-foreground text-lg drop-shadow">
          Conheça nosso time
          <ChevronRight className="h-5 w-5 text-primary" />
        </span>
      </div>

      {/* Scrolling strip */}
      <div
        className="flex gap-3 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ width: "max-content" }}
      >
        {items.map((member, i) => (
          <div
            key={i}
            className="shrink-0 w-36 rounded-2xl border bg-card text-center overflow-hidden shadow-md"
          >
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
              {teamPhotos[member.id] ? (
                <img
                  src={teamPhotos[member.id]}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <User className="h-8 w-8 text-primary/30" strokeWidth={1.5} />
              )}
            </div>
            <div className="px-2 pt-2 pb-3">
              <p className="font-bold font-anek text-foreground text-[11px] leading-tight">{member.name}</p>
              <p className="text-[9px] text-muted-foreground font-roboto mt-0.5 leading-snug">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Link>
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

function SectionHeader({ icon: Icon, title, action }: { icon: React.ElementType; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold font-anek text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export default function Hub() {
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  const [portfolioExpanded, setPortfolioExpanded] = useState(false);
  const portfolioVisible = portfolioExpanded ? portfolio : portfolio.slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <GlobalNav />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10 space-y-16">
        {/* Hero + Carousel */}
        <div>
          <Reveal>
            <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-card pt-8 px-8 pb-28 md:pt-12 md:px-12 md:pb-36">
              <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative">
                <p className="text-sm text-muted-foreground font-roboto mb-2">{todayCapitalized}</p>
                <h1 className="text-3xl md:text-5xl font-bold font-anek text-foreground mb-3 leading-[1.05]">
                  Central <span className="text-primary">AUVP</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-7 max-w-2xl font-roboto leading-relaxed">
                  Central de Produto do Time de Produto. Encontre ferramentas, documentações, o time e os sistemas em um único lugar.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/design-system" className="inline-flex items-center gap-2 h-10 px-5 rounded-[5px] bg-primary text-primary-foreground text-sm font-semibold font-sora uppercase border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 ease-apple hover:-translate-y-0.5">
                    <Palette className="h-4 w-4" />
                    Design System
                  </Link>
                  <Link to="/tom-e-voz" className="inline-flex items-center gap-2 h-10 px-5 rounded-[5px] border border-input bg-background text-foreground text-sm font-semibold font-sora uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-apple hover:-translate-y-0.5">
                    <Volume2 className="h-4 w-4" />
                    Manual de Tom e Voz
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Carousel overlapping the hero bottom — the drop-shadow creates the 3D lift effect */}
          <div className="relative z-10 -mt-20 md:-mt-24 drop-shadow-2xl">
            <TeamCarousel />
          </div>
        </div>

        {/* Acessos Rápidos — agora antes das Novidades */}
        <Reveal>
          <section>
            <SectionHeader icon={Zap} title="Acessos Rápidos" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {accessLinks.map((link, i) => {
                const Icon = link.icon;
                const content = (
                  <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 flex flex-col gap-2 h-full transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 ease-apple group-hover:scale-110", link.gradient)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {!link.internal ? (
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-primary -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-apple" />
                      )}
                    </div>
                    <p className="font-bold font-anek text-sm text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground font-roboto">{link.desc}</p>
                  </div>
                );
                return link.internal ? (
                  <Link key={i} to={link.to!} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noopener noreferrer" : undefined}>{content}</Link>
                ) : (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">{content}</a>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Novidades */}
        <Reveal>
          <section>
            <SectionHeader
              icon={Newspaper}
              title="Novidades do Mês"
              action={
                <Link to="/novidades" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-xs font-semibold font-roboto text-primary hover:underline">
                  Ver mais <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300 ease-apple" />
                </Link>
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {novidades.map((n, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border bg-card p-5 flex flex-col gap-3 transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-emerald-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-apple" />
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit font-roboto", n.tagColor)}>{n.tag}</span>
                  <h3 className="font-semibold font-anek text-foreground leading-snug">{n.title}</h3>
                  <p className="text-sm text-muted-foreground font-roboto leading-relaxed flex-1">{n.desc}</p>
                  <p className="text-xs text-muted-foreground font-roboto">{n.date}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Produtos */}
        <Reveal>
          <section>
            <SectionHeader icon={BarChart3} title="Produtos Internos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {produtos.map((p, i) => {
                const card = (
                  <div className={cn(
                    "group relative overflow-hidden rounded-2xl border bg-card p-4 flex flex-col gap-2 h-full transition-[transform,box-shadow,border-color] duration-300 ease-apple",
                    p.to ? "hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 cursor-pointer" : "hover:border-primary/20 hover:shadow-md"
                  )}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold font-anek text-foreground text-sm">{p.name}</p>
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-roboto shrink-0", p.statusColor)}>{p.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-roboto">{p.desc}</p>
                  </div>
                );
                return p.to ? (
                  <Link key={i} to={p.to} target="_blank" rel="noopener noreferrer">{card}</Link>
                ) : (
                  <div key={i}>{card}</div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Portfólio */}
        <Reveal>
          <section>
            <SectionHeader
              icon={ImageIcon}
              title="Portfólio de Produtos Físicos"
              action={portfolio.length > 4 && (
                <button
                  onClick={() => setPortfolioExpanded(e => !e)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold font-roboto text-primary hover:underline"
                >
                  {portfolioExpanded ? "Ver menos" : "Ver mais"} <ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-300 ease-apple", portfolioExpanded && "rotate-90")} />
                </button>
              )}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioVisible.map((item, i) => (
                <div key={i} className="group rounded-2xl border bg-card overflow-hidden flex flex-col transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                  <div className="aspect-square bg-muted/50 flex flex-col items-center justify-center gap-2 border-b overflow-hidden">
                    {item.img ? (
                      <img src={item.img} alt={item.nome} className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-muted-foreground/40 transition-transform duration-300 ease-apple group-hover:scale-110 group-hover:text-primary/40" />
                        <span className="text-[10px] text-muted-foreground font-roboto">Adicionar foto</span>
                      </>
                    )}
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded w-fit font-roboto", item.tagColor)}>{item.tag}</span>
                    <p className="font-semibold font-anek text-foreground text-sm leading-snug">{item.nome}</p>
                    <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Docs e Playbooks */}
        <Reveal>
          <section>
            <SectionHeader icon={FileText} title="Documentações e Playbooks" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {docs.map((d, i) => {
                const Icon = d.icon;
                return (
                  <a key={i} href={d.href} className="group flex items-center gap-3 p-3.5 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/30 transition-[background-color,border-color] duration-300 ease-apple">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 transition-transform duration-300 ease-apple group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{d.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 group-hover:text-primary transition-all duration-300 ease-apple" />
                  </a>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Calendário */}
        <Reveal>
          <section>
            <SectionHeader icon={CalendarDays} title="Calendário" />
            <CalendarioWidget />
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section>
            <SectionHeader icon={MessageSquare} title="Perguntas Frequentes" />
            <Accordion type="single" collapsible className="w-full max-w-2xl">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium font-roboto text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground font-roboto">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </Reveal>
      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-muted-foreground font-roboto">Central AUVP — Time de Produto &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
