import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalNav } from "@/components/GlobalNav";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  BookOpen, Palette, Volume2, Users, User, ExternalLink,
  Sun, Moon, ChevronRight, ChevronLeft, ChevronDown, Newspaper, Zap,
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
    tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]",
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

const accessLinks = [
  { label: "Design System", desc: "Componentes e tokens", icon: Palette, to: "/design-system", internal: true, gradient: "from-violet-500 to-purple-600" },
  { label: "Tom e Voz", desc: "Guia de comunicação", icon: Volume2, to: "/tom-e-voz", internal: true, gradient: "from-sky-500 to-blue-600" },
  { label: "Time de Produto", desc: "Organograma e pilares", icon: Users, to: "/time", internal: true, gradient: "from-fuchsia-500 to-pink-600" },
  { label: "Figma", desc: "Arquivos de design", icon: FigmaIcon, href: "https://figma.com", internal: false, gradient: "from-orange-500 to-red-500" },
  { label: "GitHub", desc: "Repositórios", icon: GitHubIcon, href: "https://github.com/produtosauvp", internal: false, gradient: "from-slate-600 to-slate-800" },
  { label: "Notion", desc: "Documentações", icon: NotionIcon, href: "#", internal: false, gradient: "from-neutral-600 to-neutral-800" },
  { label: "Analytics", desc: "Métricas de produto", icon: BarChart3, href: "#", internal: false, gradient: "from-emerald-500 to-teal-600 dark:from-[#5A8770] dark:to-[#3d6b57]" },
  { label: "AUVP Escola", desc: "Plataforma de cursos", icon: GraduationCap, to: "/escola", internal: true, newTab: true, gradient: "from-amber-500 to-orange-600" },
];

const produtos = [
  { name: "AUVP Capital", desc: "Plataforma de investimentos", status: "Ativo", statusColor: "bg-green-100 text-green-700 dark:bg-[#5A8770]/15 dark:text-[#5A8770]" },
  { name: "AUVP Escola", desc: "Plataforma de educação financeira", status: "Ativo", statusColor: "bg-green-100 text-green-700 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", to: "/escola" },
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
  { nome: "Kit de Onboarding", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", desc: "Caderno, caneta e carta de boas-vindas entregues no primeiro dia.", img: "" },
  { nome: "Camiseta AUVP", tag: "Brinde", tagColor: "bg-blue-100 text-blue-800", desc: "Camiseta preta com bordado do olho dourado da AUVP.", img: "" },
  { nome: "Caneca Sardinha", tag: "Brinde", tagColor: "bg-blue-100 text-blue-800", desc: "Caneca de porcelana com design exclusivo para o time.", img: "" },
  { nome: "Cartão de Visitas", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", desc: "Cartão premium com verniz localizado e dados de contato.", img: "" },
  { nome: "Banner de Evento", tag: "Evento", tagColor: "bg-purple-100 text-purple-800", desc: "Banner retrátil 100×200 cm usado nos eventos e workshops.", img: "" },
  { nome: "Pasta Corporativa", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", desc: "Pasta A4 com impressão da marca e bolso interno.", img: "" },
  { nome: "Ecobag AUVP", tag: "Brinde", tagColor: "bg-blue-100 text-blue-800", desc: "Sacola de algodão cru com silk do olho AUVP.", img: "" },
  { nome: "Planner Sardinha", tag: "Material Impresso", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", desc: "Planner anual exclusivo com seções de metas e OKRs.", img: "" },
];

interface Evento {
  date: string; // "YYYY-MM-DD"
  titulo: string;
  tag: string;
  tagColor: string;
  hora?: string;
  responsavel?: string;
  descricao?: string;
}

const eventos: Evento[] = [
  { date: "2026-06-23", titulo: "Sprint Planning — Q2 Sprint 12", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800", hora: "10:00", responsavel: "Daniel Machado", descricao: "Alinhamento e planejamento das entregas do sprint." },
  { date: "2026-06-24", titulo: "Design Review Semanal", tag: "Design", tagColor: "bg-purple-100 text-purple-800", hora: "14:00", responsavel: "Armando & Éria" },
  { date: "2026-06-30", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", hora: "09:00", responsavel: "Beatriz Henriques", descricao: "Nova turma com novidades no produto educacional." },
  { date: "2026-06-30", titulo: "Product Roadmap Review Q3", tag: "Roadmap", tagColor: "bg-rose-100 text-rose-800", hora: "16:00", responsavel: "Beatriz Henriques", descricao: "Revisão do roadmap e prioridades para o Q3." },
  { date: "2026-07-07", titulo: "Sprint Planning — Q3 Sprint 1", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800", hora: "10:00", responsavel: "Daniel Machado" },
  { date: "2026-07-10", titulo: "Workshop de UX Research", tag: "Time", tagColor: "bg-cyan-100 text-cyan-800", hora: "09:00", responsavel: "Ariadne Carneiro", descricao: "Metodologias de pesquisa qualitativa com usuários reais." },
  { date: "2026-07-14", titulo: "Design Review Semanal", tag: "Design", tagColor: "bg-purple-100 text-purple-800", hora: "14:00", responsavel: "Armando & Éria" },
  { date: "2026-07-16", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", hora: "09:00", responsavel: "Beatriz Henriques" },
  { date: "2026-07-21", titulo: "Retrospectiva Q3 Sprint 1", tag: "Processo", tagColor: "bg-amber-100 text-amber-800", hora: "15:00", responsavel: "Daniel Machado", descricao: "Pontos de melhoria e lições aprendidas no sprint." },
  { date: "2026-08-03", titulo: "Sprint Planning — Q3 Sprint 2", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800", hora: "10:00", responsavel: "Daniel Machado" },
  { date: "2026-08-11", titulo: "Review de OKRs Q3", tag: "Roadmap", tagColor: "bg-rose-100 text-rose-800", hora: "14:00", responsavel: "Beatriz Henriques", descricao: "Análise de progresso dos OKRs trimestrais." },
  { date: "2026-08-17", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", hora: "09:00", responsavel: "Beatriz Henriques" },
  { date: "2026-09-01", titulo: "Kick-off Q4", tag: "Processo", tagColor: "bg-amber-100 text-amber-800", hora: "10:00", responsavel: "Beatriz Henriques", descricao: "Alinhamento estratégico para o último trimestre do ano." },
  { date: "2026-09-08", titulo: "Sprint Planning — Q4 Sprint 1", tag: "Sprint", tagColor: "bg-blue-100 text-blue-800", hora: "10:00", responsavel: "Daniel Machado" },
  { date: "2026-09-15", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tagColor: "bg-emerald-100 text-emerald-800 dark:bg-[#5A8770]/15 dark:text-[#5A8770]", hora: "09:00", responsavel: "Beatriz Henriques" },
  { date: "2026-09-22", titulo: "Design Review Semanal", tag: "Design", tagColor: "bg-purple-100 text-purple-800", hora: "14:00", responsavel: "Armando & Éria" },
  { date: "2026-09-28", titulo: "Retrospectiva Q4 Sprint 1", tag: "Processo", tagColor: "bg-amber-100 text-amber-800", hora: "15:00", responsavel: "Daniel Machado" },
];

const MESES_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS_PT  = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

function CalendarioWidget() {
  const hoje = new Date();
  const [viewYear,  setViewYear]  = useState(hoje.getFullYear());
  const [viewMonth, setViewMonth] = useState(hoje.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const prevMonth = () => {
    setSelectedDay(null);
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    setSelectedDay(null);
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isToday = (d: number) =>
    d === hoje.getDate() && viewMonth === hoje.getMonth() && viewYear === hoje.getFullYear();

  const eventsByDay = new Map<number, Evento[]>();
  eventos.forEach(e => {
    const [y, m] = e.date.split("-").map(Number);
    if (y === viewYear && m - 1 === viewMonth) {
      const day = Number(e.date.split("-")[2]);
      if (!eventsByDay.has(day)) eventsByDay.set(day, []);
      eventsByDay.get(day)!.push(e);
    }
  });

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedEvents = selectedDay ? (eventsByDay.get(selectedDay) ?? []) : [];

  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b">
        <button onClick={prevMonth} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-bold font-anek text-foreground">{MESES_PT[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 border-b">
        {DIAS_PT.map((d, i) => (
          <div key={d} className={cn("py-2 text-center text-[10px] font-bold text-muted-foreground font-roboto uppercase tracking-wider", i < 6 && "border-r border-border")}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const dayEvents = day ? (eventsByDay.get(day) ?? []) : [];
          const isSelected = day !== null && selectedDay === day;
          const hasEvents = dayEvents.length > 0;
          return (
            <div
              key={i}
              className={cn(
                "min-h-[52px] sm:min-h-[88px] border-b flex flex-col p-1 sm:p-1.5 transition-colors duration-150",
                i % 7 !== 6 && "border-r border-border",
                day && hasEvents && "cursor-pointer",
                isSelected && "bg-primary/5",
                day && hasEvents && !isSelected && "hover:bg-muted/40",
                !day && "bg-muted/20"
              )}
              onClick={() => {
                if (day && hasEvents) setSelectedDay(isSelected ? null : day);
              }}
            >
              {day !== null && (
                <>
                  <div className="flex justify-end">
                    <span className={cn(
                      "h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs font-medium font-roboto",
                      isToday(day) && "bg-primary text-primary-foreground font-bold",
                      isSelected && !isToday(day) && "ring-1 ring-primary text-primary",
                      !isToday(day) && !isSelected && "text-foreground/80"
                    )}>
                      {day}
                    </span>
                  </div>
                  {/* Mobile: dots indicating events (tap to see detail) */}
                  {hasEvents && (
                    <div className="flex sm:hidden flex-wrap gap-0.5 mt-0.5 px-0.5">
                      {dayEvents.slice(0, 3).map((_, ei) => (
                        <span key={ei} className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary/60" />
                      ))}
                    </div>
                  )}
                  {/* sm+: text chips */}
                  <div className="hidden sm:flex flex-col gap-0.5 mt-0.5">
                    {dayEvents.slice(0, 2).map((e, ei) => (
                      <span
                        key={ei}
                        className={cn("text-[9px] font-bold font-roboto px-1.5 py-0.5 rounded truncate leading-tight", e.tagColor)}
                        title={e.titulo}
                      >
                        {e.titulo}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-muted-foreground font-roboto px-1">+{dayEvents.length - 2}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel — expands below grid when a day with events is selected */}
      {selectedDay !== null && selectedEvents.length > 0 && (
        <div className="border-t px-3 sm:px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-roboto">
              {selectedDay} de {MESES_PT[viewMonth]} — {selectedEvents.length} evento{selectedEvents.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-[10px] font-semibold font-roboto text-primary hover:underline"
            >
              Fechar
            </button>
          </div>
          {selectedEvents.map((e, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border bg-background">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="font-semibold font-anek text-foreground text-sm leading-snug">{e.titulo}</p>
                  <span className={cn("text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-roboto shrink-0", e.tagColor)}>{e.tag}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3 flex-wrap">
                  {e.hora && <span className="text-[11px] font-roboto text-muted-foreground">{e.hora}</span>}
                  {e.responsavel && (
                    <span className="text-[11px] font-roboto text-muted-foreground flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground inline-block shrink-0" />
                      {e.responsavel}
                    </span>
                  )}
                </div>
                {e.descricao && <p className="mt-1.5 text-[11px] text-muted-foreground font-roboto leading-snug">{e.descricao}</p>}
              </div>
            </div>
          ))}
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
  { id: "raul",     name: "Raul Sena",           role: "Fundador e CEO",         bio: "Fundou a AUVP com a missão de democratizar os investimentos no Brasil." },
  { id: "beatriz",  name: "Beatriz Henriques",    role: "Diretora de Produto",    bio: "Lidera a estratégia de produto e a visão de longo prazo da plataforma." },
  { id: "daniel",   name: "Daniel Machado",       role: "Coordenador de Produto", bio: "Coordena sprints e a entrega contínua de valor ao usuário final." },
  { id: "debora",   name: "Debora Sanders",       role: "Analista de CX",         bio: "Garante a melhor experiência possível para cada cliente AUVP." },
  { id: "ariadne",  name: "Ariadne Carneiro",     role: "Gerente de Produto",     bio: "Conduz discovery, roadmap e priorização das iniciativas do produto." },
  { id: "armando",  name: "Armando Neto",         role: "Designer de Produto",    bio: "Cria interfaces funcionais e refinadas para a plataforma." },
  { id: "eria",     name: "Éria Alencar",         role: "Designer de Produto",    bio: "Cuida de identidade visual, marca e componentes do design system." },
  { id: "mateus",   name: "Mateus Graff",         role: "Redator",                bio: "Define o tom e a voz da AUVP em todos os canais e produtos." },
  { id: "jeniffer", name: "Jeniffer Nascimento",  role: "Analista de Produto",    bio: "Analisa dados e métricas para embasar decisões de produto." },
  { id: "elane",    name: "Elane Rodrigues",      role: "Analista de Produto",    bio: "Conduz pesquisas com usuários e validação de hipóteses." },
  { id: "ana",      name: "Ana Beatriz Melo",     role: "Assistente de Produto",  bio: "Apoia as iniciativas de produto e os processos internos do time." },
  { id: "hiago",    name: "Hiago Felipe Sousa",   role: "Assistente de Produto",  bio: "Contribui com análises, documentação e execução de projetos." },
];

const EASE_APPLE = "cubic-bezier(0.22, 1, 0.36, 1)";

function TeamCarousel() {
  const items = [...TEAM_CAROUSEL, ...TEAM_CAROUSEL];
  const CARD_W = 144;  // w-36
  const GAP    = 12;   // gap-3
  const STRIDE = CARD_W + GAP;
  const LOOP_W = TEAM_CAROUSEL.length * STRIDE;

  const navigate     = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const offsetRef    = useRef(0);
  const pausedRef    = useRef(false);
  const rafRef       = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const SIGMA = 220;
    const BASE  = 0.88;
    const PEAK  = 1.06;

    const tick = () => {
      if (!pausedRef.current) {
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
  }, [LOOP_W]);

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

function SectionHeader({ icon: Icon, title, action }: { icon: React.ElementType; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-4 md:mb-6 flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-base sm:text-xl font-bold font-anek text-foreground">{title}</h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default function Hub() {
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  const [portfolioExpanded, setPortfolioExpanded] = useState(false);
  const portfolioVisible = portfolioExpanded ? portfolio : portfolio.slice(0, 4);

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
    <div className="min-h-screen bg-background flex flex-col" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={spotlightRef} className="pointer-events-none fixed inset-0 z-[30]" aria-hidden="true" />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <GlobalNav />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-10 space-y-10 md:space-y-16">
        {/* Hero + Carousel */}
        <div>
          <Reveal>
            <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-card pt-6 px-5 pb-20 sm:pt-8 sm:px-8 sm:pb-28 md:pt-12 md:px-12 md:pb-36">
              <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative">
                <p className="text-sm text-muted-foreground font-roboto mb-2">{todayCapitalized}</p>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-anek text-foreground mb-3 leading-[1.05]">
                  Central <span className="text-primary">AUVP</span>
                </h1>
                <p className="text-sm sm:text-lg text-muted-foreground mb-5 md:mb-7 max-w-2xl font-roboto leading-relaxed">
                  Central de Produto do Time de Produto. Encontre ferramentas, documentações, o time e os sistemas em um único lugar.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                  <Link to="/design-system" className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] bg-primary text-primary-foreground text-sm font-semibold font-sora uppercase border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 ease-apple hover:-translate-y-0.5">
                    <Palette className="h-4 w-4" />
                    Design System
                  </Link>
                  <Link to="/tom-e-voz" className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] border border-input bg-background text-foreground text-sm font-semibold font-sora uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-apple hover:-translate-y-0.5">
                    <Volume2 className="h-4 w-4" />
                    Manual de Tom e Voz
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Carousel overlapping the hero bottom — the drop-shadow creates the 3D lift effect */}
          <div className="relative z-10 -mt-12 sm:-mt-20 md:-mt-24 drop-shadow-2xl px-2 sm:px-6 md:px-12">
            <TeamCarousel />
          </div>
        </div>

        {/* Acessos Rápidos — agora antes das Novidades */}
        <Reveal className="-mt-4 sm:-mt-8 md:-mt-14">
          <section>
            <SectionHeader icon={Zap} title="Acessos Rápidos" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {accessLinks.map((link, i) => {
                const Icon = link.icon;
                const content = (
                  <div className="group relative overflow-hidden rounded-2xl border bg-card p-3 sm:p-4 flex flex-col gap-2 h-full transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className={cn("flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 ease-apple group-hover:scale-110", link.gradient)}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {novidades.map((n, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border bg-card p-5 flex flex-col gap-3 transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-emerald-500 dark:to-[#5A8770] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-apple" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
          <section className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <SectionHeader icon={MessageSquare} title="Perguntas Frequentes" />
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm font-medium font-roboto text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground font-roboto">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
