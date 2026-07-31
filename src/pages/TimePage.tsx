import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { TeamPhoto } from "@/components/TeamPhoto";
import { EstruturaIsometrica, ProdutoCubeGraphic } from "@/components/widgets/EstruturaIsometrica";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  Database, Palette, Rocket, ListOrdered, FileText, Users, Gift, MessageCircle, Lightbulb,
  Search, Monitor, PenTool, Settings, Heart, ChevronRight, ChevronDown, User, X,
} from "lucide-react";
import { areaIcons } from "@/data/areasEmpresa";
import { cn } from "@/lib/utils";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ─── Org Data ─────────────────────────────────────────────────────────────────

type OrgColor =
  | "ceo" | "director" | "coordinator"
  | "cx" | "product-senior" | "product-pleno" | "product-junior";

interface OrgPerson {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: OrgColor;
  level: string;
  /** Seniority rank — lower number = higher seniority. Same rank → same row in org chart. */
  rank: number;
  description: string;
  responsibilities: string[];
}

// Each value is a complete static string so Tailwind includes all classes
const gradients: Record<OrgColor, string> = {
  ceo:             "from-rose-700 via-red-800 to-red-950",
  director:        "from-purple-500 via-purple-700 to-fuchsia-800",
  coordinator:     "from-emerald-600 via-emerald-700 to-green-900",
  cx:              "from-indigo-600 via-indigo-800 to-violet-900",
  "product-senior":"from-amber-500 via-amber-600 to-orange-700",
  "product-pleno": "from-cyan-500 via-cyan-600 to-teal-700",
  "product-junior":"from-slate-400 via-slate-500 to-gray-600",
};

// Outline fino do card de detalhes — acompanha a cor da área da pessoa
const outlineColors: Record<OrgColor, string> = {
  ceo:             "border-rose-700 dark:border-rose-400",
  director:        "border-purple-600 dark:border-purple-400",
  coordinator:     "border-emerald-600 dark:border-emerald-400",
  cx:              "border-indigo-600 dark:border-indigo-400",
  "product-senior":"border-amber-500 dark:border-amber-400",
  "product-pleno": "border-cyan-500 dark:border-cyan-400",
  "product-junior":"border-slate-400 dark:border-slate-400",
};

const levelColors: Record<OrgColor, string> = {
  ceo:             "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
  director:        "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
  coordinator:     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  cx:              "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300",
  "product-senior":"bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  "product-pleno": "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300",
  "product-junior":"bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300",
};

const orgPeople: Record<string, OrgPerson> = {
  raul: {
    id: "raul", name: "Raul Sena", role: "Fundador e CEO",
    initials: "RS", color: "ceo", level: "CEO", rank: 0,
    description: "Placeholder: Visionário e fundador da AUVP, responsável pela direção estratégica e crescimento da empresa.",
    responsibilities: ["Visão e estratégia da empresa", "Cultura organizacional", "Parcerias estratégicas", "Decisões de alto impacto"],
  },
  beatriz: {
    id: "beatriz", name: "Beatriz Henriques", role: "Sócia e Diretora de Produto",
    initials: "BH", color: "director", level: "Diretora", rank: 1,
    description: "Placeholder: Dirige o time de produto e CX, conectando visão de negócio com execução e liderando os dois braços da área.",
    responsibilities: ["Direção estratégica de produto", "Gestão e desenvolvimento do time", "CX estratégico", "Alinhamento cross-funcional"],
  },
  lilian: {
    id: "lilian", name: "Lilian Araújo", role: "Especialista em CX",
    initials: "LA", color: "cx", level: "Especialista", rank: 2,
    description: "Especialista em experiência do cliente, responsável pela gestão da jornada, retenção e fidelização dos membros — conectando áreas e indicadores como NPS, CSAT e churn para evoluir a experiência de ponta a ponta.",
    responsibilities: [
      "Gestão da jornada do cliente",
      "Estratégias de retenção e fidelização",
      "Desenvolvimento e acompanhamento de processos e indicadores tais como NPS, CSAT e churn",
      "Treinamento e capacitação do time em boas práticas de relacionamento",
      "Desenho e implantação de ações e projetos para evolução do Health Score dos clientes",
      "Integração entre áreas para aprimorar a experiência do cliente",
    ],
  },
  debora: {
    id: "debora", name: "Debora Sanders", role: "Analista de CX Sênior II",
    initials: "DS", color: "cx", level: "Sênior", rank: 3,
    description: "Analista de CX Sênior, responsável por conectar a voz do cliente às decisões estratégicas por meio de pesquisas e análises de jornada, apoiando a evolução contínua dos produtos.",
    responsibilities: ["Pesquisa com usuários (qualitativa e quantitativa)", "Análise de jornadas e touchpoints", "Mapeamento de oportunidades de experiência", "Benchmarking de CX", "Apoio estratégico às decisões de produto"],
  },
  daniel: {
    id: "daniel", name: "Daniel Machado", role: "Coordenador de produto",
    initials: "DM", color: "coordinator", level: "Coordenador", rank: 2,
    description: "Líder de Produto responsável pela gestão estratégica e operacional da área, garantindo a eficiência, a qualidade e o alinhamento entre negócio e tecnologia.",
    responsibilities: ["Priorização de iniciativas", "Coordenação de equipes multidisciplinares", "Governança e acompanhamento de indicadores", "Gestão de pessoas", "Alinhamento entre negócio, tecnologia e operação"],
  },
  ariadne: {
    id: "ariadne", name: "Ariadne Carneiro", role: "Gerente de produto",
    initials: "AC", color: "product-senior", level: "Gerente", rank: 3,
    description: "Responsável pelo ciclo completo de produto, da identificação de oportunidades à entrega e mensuração de impacto.",
    responsibilities: ["Estratégia, roadmap e priorização baseada em evidências", "Discovery contínuo", "Ponte entre design, engenharia e stakeholders", "Diagnóstico de problemas e acompanhamento de métricas de impacto"],
  },
  armando: {
    id: "armando", name: "Armando Neto", role: "Designer de Produto Pl. I",
    initials: "AN", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Designer de produto pleno, responsável por interfaces digitais e protótipos de alta fidelidade.",
    responsibilities: ["Design Gráfico", "UI/UX Design", "Prototipação e wireframes", "Design system", "Colaboração em pesquisas"],
  },
  eria: {
    id: "eria", name: "Éria Alencar", role: "Designer de Produto Pl. I",
    initials: "EA", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Designer de produto pleno responsável por visual design, UI/UX e produtos físicos.",
    responsibilities: ["Branding e identidade", "UI/UX design", "Produtos físicos", "Materiais digitais"],
  },
  mateus: {
    id: "mateus", name: "Mateus Graff", role: "Redator / Roteirista Pl. I",
    initials: "MG", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Redator e roteirista, responsável por conteúdo estratégico e copywriting.",
    responsibilities: ["Copywriting de produto", "Comunicação corporativa e institucional", "Materiais educativos", "Roteiros", "Revisão editorial"],
  },
  jeniffer: {
    id: "jeniffer", name: "Jeniffer Nascimento", role: "Analista de Produto Pl. I",
    initials: "JN", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Analista de produto pleno, focada em análise de dados, requisitos e divulgação.",
    responsibilities: ["Análise de dados e métricas", "Levantamento de requisitos", "Documentação de produto", "Desenvolvimento de materiais", "Estratégia de divulgação de produto", "Redação publicitária", "Revisão de materiais didáticos"],
  },
  elane: {
    id: "elane", name: "Elane Rodrigues", role: "Analista de Produto Jr. I",
    initials: "ER", color: "product-junior", level: "Júnior", rank: 5,
    description: "Analista de Produto Júnior com foco em CX, apoiando o desenvolvimento de produtos digitais e a evolução da experiência do usuário.",
    responsibilities: ["Gestão e refinamento de backlog", "Histórias de usuário e critérios de aceite", "Discovery, pesquisa e benchmarking", "Mapeamento de jornadas e fluxos", "Homologação e melhoria contínua"],
  },
  ana: {
    id: "ana", name: "Ana Beatriz Melo", role: "Assistente de Produto",
    initials: "AB", color: "product-junior", level: "Júnior", rank: 5,
    description: "Viabiliza a execução da estratégia por meio da organização da operação, integração entre áreas e suporte analítico às iniciativas do time.",
    responsibilities: ["Suporte operacional ao time de Produto", "Organização e melhoria de processos internos", "Análise de dados, métricas e apoio à tomada de decisão", "Comunicação e alinhamento entre áreas", "Produção de copy e conteúdos para o produto", "Apoio à documentação e padronização de processos internos"],
  },
  hiago: {
    id: "hiago", name: "Hiago Felipe Sousa", role: "Assistente de Produto",
    initials: "HF", color: "product-junior", level: "Júnior", rank: 5,
    description: "Placeholder: Assistente de produto, contribui com as demandas do time e no desenvolvimento de entregas.",
    responsibilities: ["Suporte às demandas do time", "Análise básica de dados", "Criação de documentações", "Apoio em pesquisas"],
  },
};

// ─── Person Card ──────────────────────────────────────────────────────────────
// Clean org-node: white card, colored top accent, gradient avatar (photo placeholder)

type CardSize = "lg" | "md" | "sm";

const cardDims: Record<CardSize, { w: number; avatar: number }> = {
  lg: { w: 188, avatar: 60 },
  md: { w: 164, avatar: 52 },
  sm: { w: 146, avatar: 44 },
};

function PersonCard({
  id,
  activeId,
  onToggle,
  size = "md",
  cardRef,
}: {
  id: string;
  activeId: string | null;
  onToggle: (id: string) => void;
  size?: CardSize;
  cardRef?: (el: HTMLButtonElement | null) => void;
}) {
  const person = orgPeople[id];
  const isActive = activeId === id;
  const { w, avatar } = cardDims[size];

  return (
    <button
      ref={cardRef}
      onClick={(e) => { e.stopPropagation(); onToggle(id); }}
      style={{ width: w }}
      className={cn(
        "relative shrink-0 rounded-xl border bg-card text-center cursor-pointer overflow-hidden",
        "flex flex-col items-center px-3 pt-4 pb-3 transition-all duration-200 outline-none",
        "focus-visible:outline-2 focus-visible:outline-primary",
        isActive
          ? "border-primary shadow-lg ring-2 ring-primary/30 -translate-y-0.5"
          : "border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      {/* Colored top accent — groups people by area at a glance */}
      <div className={cn("absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r", gradients[person.color])} />

      {/* Avatar — real photo when available, gradient initials as fallback */}
      <TeamPhoto
        id={id}
        alt={person.name}
        className="rounded-full shadow ring-2 ring-card"
        style={{ width: avatar, height: avatar }}
        fallback={
          <div
            className={cn("rounded-full bg-gradient-to-br flex items-center justify-center font-bold font-anek text-white shadow ring-2 ring-card", gradients[person.color])}
            style={{ width: avatar, height: avatar, fontSize: Math.round(avatar * 0.38) }}
          >
            {person.initials}
          </div>
        }
      />

      <p className="mt-2 font-bold font-anek text-foreground text-[13px] leading-tight">{person.name}</p>
      <p className="text-[11px] text-muted-foreground font-roboto mt-0.5 leading-snug">{person.role}</p>
      <span
        className={cn(
          "mt-2 inline-block rounded-full px-2 py-[3px] text-[9px] font-bold font-roboto uppercase tracking-wider",
          levelColors[person.color]
        )}
      >
        {person.level}
      </span>
    </button>
  );
}

// ─── Connectors ───────────────────────────────────────────────────────────────
// Connectors are drawn as a single SVG overlay sitting behind the cards. Lines
// run straight and only bend (with a small rounded corner) at the turning
// points, measured from the live DOM so every point stays connected at any
// viewport width.

type EdgeKind = "v" | "hl" | "hr";

/** Parent → child edges of the org tree. Ids match node refs registered below.
 *  - "v"  : child sits below the parent (vertical elbow)
 *  - "hl" : child sits to the LEFT of the parent, same row (horizontal)
 *  - "hr" : child sits to the RIGHT of the parent, same row (horizontal) */
const ORG_EDGES: { from: string; to: string; kind: EdgeKind; dashed?: boolean }[] = [
  { from: "raul", to: "beatriz", kind: "v" },
  { from: "beatriz", to: "lilian", kind: "v", dashed: true },
  { from: "beatriz", to: "debora", kind: "v" },
  { from: "beatriz", to: "daniel", kind: "v" },
  { from: "daniel", to: "cat-gerencia",    kind: "v" },
  { from: "daniel", to: "cat-designers",   kind: "v" },
  { from: "daniel", to: "cat-analistas",   kind: "v" },
  { from: "daniel", to: "cat-conteudo",    kind: "v" },
  { from: "daniel", to: "cat-assistencia", kind: "v" },
  { from: "cat-gerencia",    to: "ariadne",  kind: "v" },
  { from: "cat-designers",   to: "armando",  kind: "v" },
  { from: "cat-designers",   to: "eria",     kind: "v" },
  { from: "cat-analistas",   to: "jeniffer", kind: "v" },
  { from: "cat-analistas",   to: "elane",    kind: "v" },
  { from: "cat-conteudo",    to: "mateus",   kind: "v" },
  { from: "cat-assistencia", to: "ana",      kind: "v" },
  { from: "cat-assistencia", to: "hiago",    kind: "v" },
];

// Corner radius (px) for the rounded turning points of the connector lines.
const CORNER = 9;

/** Vertical elbow: straight down, straight across, straight down — rounded only
 *  at the two turns. Collapses to a single straight line when perfectly aligned. */
function elbowPath(x1: number, y1: number, x2: number, y2: number): string {
  if (Math.abs(x1 - x2) < 0.5) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const ym = (y1 + y2) / 2;
  const dir = x2 > x1 ? 1 : -1;
  const r = Math.max(0, Math.min(CORNER, Math.abs(x2 - x1) / 2, Math.abs(ym - y1), Math.abs(y2 - ym)));
  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${ym - r}`,
    `Q ${x1} ${ym} ${x1 + dir * r} ${ym}`,
    `L ${x2 - dir * r} ${ym}`,
    `Q ${x2} ${ym} ${x2} ${ym + r}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

// Vertical gap (px) between a node row and the next — gives the connectors room
// to turn and keeps the tree legible.
const ROW_GAP = 44;

/** A category heading that anchors connector lines down to its members. */
function CategoryLabel({
  label,
  nodeRef,
}: {
  label: string;
  nodeRef: (el: HTMLElement | null) => void;
}) {
  return (
    <span
      ref={nodeRef}
      className="text-[9px] font-bold font-roboto tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap"
    >
      {label}
    </span>
  );
}

/** One category column: a heading on top, its members in a row below. */
function CategoryColumn({
  catId,
  label,
  ids,
  activeId,
  onToggle,
  registerNode,
}: {
  catId: string;
  label: string;
  ids: string[];
  activeId: string | null;
  onToggle: (id: string) => void;
  registerNode: (id: string) => (el: HTMLElement | null) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <CategoryLabel label={label} nodeRef={registerNode(catId)} />
      <div className="flex items-start gap-2" style={{ marginTop: ROW_GAP }}>
        {ids.map((id) => (
          <PersonCard
            key={id}
            id={id}
            activeId={activeId}
            onToggle={onToggle}
            size="sm"
            cardRef={registerNode(id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Team Grid ────────────────────────────────────────────────────────────────

// Lilian aparece apenas no organograma — fora do grid de cards.
const TEAM_ORDER = [
  "raul", "beatriz",
  "daniel", "debora",
  "ariadne", "armando",
  "eria", "mateus", "jeniffer",
  "elane", "ana", "hiago",
];

function MemberCard({
  id,
  active,
  onSelect,
}: {
  id: string;
  active: boolean;
  onSelect: (id: string, el: HTMLElement) => void;
}) {
  const person = orgPeople[id];
  return (
    <button
      onClick={(e) => onSelect(id, e.currentTarget)}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card text-center overflow-hidden outline-none shadow-md transition-[transform,box-shadow,border-color] duration-300 ease-apple will-change-transform",
        active
          ? "border-primary shadow-xl ring-2 ring-primary/30 -translate-y-1"
          : "hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
      )}
    >
      {/* Photo fills the entire top of the card; gradient + icon as fallback */}
      <div className={cn("relative w-full aspect-square bg-gradient-to-br flex items-center justify-center overflow-hidden", gradients[person.color])}>
        <TeamPhoto
          id={id}
          alt={person.name}
          className="absolute inset-0 h-full w-full"
          fallback={<User className="h-10 w-10 text-white/70" strokeWidth={1.5} />}
        />
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col items-center">
        <p className="font-bold font-anek text-foreground text-[13px] leading-tight">{person.name}</p>
        <p className="text-[11px] text-muted-foreground font-roboto mt-0.5 leading-snug">{person.role}</p>
        <span className={cn("mt-2 inline-block rounded-full px-2 py-[3px] text-[9px] font-bold font-roboto uppercase tracking-wider", levelColors[person.color])}>
          {person.level}
        </span>
      </div>
    </button>
  );
}

// ─── Detail Popover ───────────────────────────────────────────────────────────
// Shared detail card content, shown in a floating popover anchored right next to
// the selected card/node (in the member grid and in the org chart alike).

function PersonDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const person = orgPeople[id];
  return (
    <div className={cn("relative rounded-2xl border bg-card shadow-xl overflow-hidden", outlineColors[person.color])}>
      <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Photo — real when available, gradient icon fallback */}
              <TeamPhoto
                id={id}
                alt={person.name}
                className="rounded-xl shadow shrink-0"
                style={{ width: 48, height: 48 }}
                fallback={
                  <div
                    className={cn("rounded-xl flex items-center justify-center text-white shadow bg-gradient-to-br shrink-0", gradients[person.color])}
                    style={{ width: 48, height: 48 }}
                  >
                    <User className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                  </div>
                }
              />
              <div className="min-w-0">
                <h3 className="text-base font-bold font-anek text-foreground leading-tight truncate">{person.name}</h3>
                <p className="text-xs text-primary font-roboto font-semibold mt-0.5 leading-snug">{person.role}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" aria-label="Fechar">
              <X className="h-4 w-4" />
            </button>
          </div>

          <span className={cn("inline-block mt-3 rounded-full px-2.5 py-1 text-[9px] font-bold font-roboto uppercase tracking-wider", levelColors[person.color])}>
            {person.level}
          </span>

          <p className="mt-3 text-xs text-muted-foreground font-roboto leading-relaxed">{person.description}</p>

          <div className="mt-4 flex flex-col gap-1.5">
            {person.responsibilities.map((r) => (
              <div key={r} className="flex items-start gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs font-roboto text-foreground">{r}</span>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

const POPOVER_W = 340;

/**
 * Floating detail popover positioned beside an anchor element. Rendered through
 * a portal (so no parent overflow clips it), it prefers the anchor's right side
 * and flips left when there isn't room. Enters with a soft Apple-style spring,
 * and dismisses on scroll, outside-click or Escape.
 */
function PersonPopover({ id, anchorEl, onClose }: { id: string; anchorEl: HTMLElement; onClose: () => void }) {
  const popRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0, caret: 24, side: "right" as "right" | "left", ready: false });
  const [show, setShow] = useState(false);

  const place = useCallback(() => {
    const a = anchorEl.getBoundingClientRect();
    const popH = popRef.current?.offsetHeight ?? 280;
    const gap = 12;
    const margin = 8;
    const side = window.innerWidth - a.right >= POPOVER_W + gap || a.left < POPOVER_W + gap ? "right" : "left";
    let left = side === "right" ? a.right + gap : a.left - gap - POPOVER_W;
    left = Math.max(margin, Math.min(left, window.innerWidth - POPOVER_W - margin));
    const anchorMidY = a.top + a.height / 2;
    let top = anchorMidY - popH / 2;
    top = Math.max(margin, Math.min(top, window.innerHeight - popH - margin));
    const caret = Math.max(16, Math.min(anchorMidY - top, popH - 16));
    setPos({ left, top, caret, side, ready: true });
  }, [anchorEl]);

  useLayoutEffect(() => { place(); }, [place]);

  // Gentle enter on the next frame, once positioned
  useEffect(() => {
    const r = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // Close on scroll; reflow on resize
  useEffect(() => {
    const onScroll = () => onClose();
    const onResize = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [place, onClose]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t) || anchorEl.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [anchorEl, onClose]);

  const visible = show && pos.ready;
  return createPortal(
    <div
      ref={popRef}
      style={{
        position: "fixed",
        left: pos.left,
        top: pos.top,
        width: POPOVER_W,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
        transformOrigin: pos.side === "right" ? "left center" : "right center",
        transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }}
      className="z-[60]"
    >
      {/* caret pointing toward the anchor */}
      <div
        className={cn("absolute h-3 w-3 rotate-45 bg-card", outlineColors[orgPeople[id].color], pos.side === "right" ? "-left-1.5 border-l border-b" : "-right-1.5 border-r border-t")}
        style={{ top: pos.caret - 6 }}
      />
      <PersonDetails id={id} onClose={onClose} />
    </div>,
    document.body
  );
}

// ─── Org Chart ─────────────────────────────────────────────────────────────────

function OrgChart() {
  const [selected, setSelected] = useState<{ id: string; el: HTMLElement } | null>(null);
  const activeId = selected?.id ?? null;

  // ── Connector measurement ──────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [paths, setPaths] = useState<{ d: string; dashed?: boolean }[]>([]);

  const closePopover = useCallback(() => setSelected(null), []);
  const toggle = (id: string) => {
    const el = nodeRefs.current.get(id) ?? null;
    setSelected((prev) => (prev?.id === id || !el ? null : { id, el }));
  };

  // Stable per-id ref callback so React doesn't re-register on every render
  const registerNode = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) nodeRefs.current.set(id, el);
      else nodeRefs.current.delete(id);
    },
    []
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const c = container.getBoundingClientRect();
    const next: { d: string; dashed?: boolean }[] = [];
    for (const { from, to, kind, dashed } of ORG_EDGES) {
      const pe = nodeRefs.current.get(from);
      const ce = nodeRefs.current.get(to);
      if (!pe || !ce) continue;
      const pr = pe.getBoundingClientRect();
      const cr = ce.getBoundingClientRect();
      if (kind === "v") {
        // parent bottom-center → child top-center
        const x1 = pr.left + pr.width / 2 - c.left;
        const y1 = pr.bottom - c.top;
        const x2 = cr.left + cr.width / 2 - c.left;
        const y2 = cr.top - c.top;
        next.push({ d: elbowPath(x1, y1, x2, y2), dashed });
      } else {
        // horizontal sibling: parent side-center → child opposite side-center
        const y1 = pr.top + pr.height / 2 - c.top;
        const y2 = cr.top + cr.height / 2 - c.top;
        const x1 = (kind === "hl" ? pr.left : pr.right) - c.left;
        const x2 = (kind === "hl" ? cr.right : cr.left) - c.left;
        next.push({ d: `M ${x1} ${y1} L ${x2} ${y2}`, dashed });
      }
    }
    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    // Re-measure once webfonts settle, since they can shift card sizes
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(measure).catch(() => {});
    const t = setTimeout(measure, 120);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  return (
    <div data-org className="w-full">
      {/* The tree may be wider than the viewport on small screens; scroll only there.
          On md+ it fits, so no scrollbar/box appears and the page just expands. */}
      <div className="-mx-4 px-4 overflow-x-auto md:mx-0 md:px-0 md:overflow-visible">
        <div ref={containerRef} className="relative w-fit min-w-full mx-auto pt-1 pb-2">

          {/* Connector overlay — sits behind the opaque cards so curves appear to
              meet each card's edge. */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
            {paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="none"
                style={{ stroke: "hsl(var(--border))" }}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray={p.dashed ? "5 4" : undefined}
              />
            ))}
          </svg>

          <div className="relative flex flex-col items-center" style={{ zIndex: 1 }}>

            {/* CEO */}
            <PersonCard id="raul" activeId={activeId} onToggle={toggle} size="lg" cardRef={registerNode("raul")} />

            {/* Diretoria — Beatriz alone, centered. */}
            <div style={{ marginTop: ROW_GAP }}>
              <PersonCard id="beatriz" activeId={activeId} onToggle={toggle} size="md" cardRef={registerNode("beatriz")} />
            </div>

            {/* Coordenação + CX — Lilian, Daniel, Debora on the same row below Beatriz.
                Lines curve downward from Beatriz to each of them. */}
            <div className="flex items-start gap-8 sm:gap-12" style={{ marginTop: ROW_GAP }}>
              <PersonCard id="lilian" activeId={activeId} onToggle={toggle} size="sm" cardRef={registerNode("lilian")} />
              <PersonCard id="daniel" activeId={activeId} onToggle={toggle} size="md" cardRef={registerNode("daniel")} />
              <PersonCard id="debora" activeId={activeId} onToggle={toggle} size="sm" cardRef={registerNode("debora")} />
            </div>

            {/* Squads de produto — Gerência na mesma altura das demais categorias. */}
            <div className="flex items-start justify-center gap-5 sm:gap-8" style={{ marginTop: ROW_GAP }}>
              <CategoryColumn catId="cat-gerencia"    label="Gerência"    ids={["ariadne"]}            activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-designers"   label="Designers"   ids={["armando", "eria"]}    activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-analistas"   label="Analistas"   ids={["jeniffer", "elane"]}  activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-conteudo"    label="Conteúdo"    ids={["mateus"]}              activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-assistencia" label="Assistência" ids={["ana", "hiago"]}       activeId={activeId} onToggle={toggle} registerNode={registerNode} />
            </div>
          </div>
        </div>
      </div>

      {/* Detail popover opens right beside the selected person */}
      {selected && <PersonPopover key={selected.id} id={selected.id} anchorEl={selected.el} onClose={closePopover} />}

      {/* Legend + hint */}
      <div className="mt-8 pt-6 border-t flex flex-wrap gap-x-5 gap-y-2 items-center justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {(
            [
              { color: "ceo" as OrgColor, label: "CEO" },
              { color: "director" as OrgColor, label: "Diretoria" },
              { color: "coordinator" as OrgColor, label: "Coordenação" },
              { color: "cx" as OrgColor, label: "Relacionamento / CX" },
              { color: "product-senior" as OrgColor, label: "Gerência" },
              { color: "product-pleno" as OrgColor, label: "Pleno" },
              { color: "product-junior" as OrgColor, label: "Júnior" },
            ] as { color: OrgColor; label: string }[]
          ).map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={cn("h-3 w-3 rounded-sm bg-gradient-to-br shadow-sm", gradients[color])} />
              <span className="text-[10px] font-roboto text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <span className="text-[10px] font-roboto text-muted-foreground italic">
          Clique em qualquer pessoa para ver detalhes
        </span>
      </div>
    </div>
  );
}

// ─── Other page data ──────────────────────────────────────────────────────────

const pillars = [
  { icon: Database, title: "Dados", desc: "Realizamos pesquisas com membros e leads, coletamos dados de desempenho e comportamento para tomar decisões que evoluam nossas entregas." },
  { icon: Palette, title: "Design", desc: "Desenhamos interfaces elegantes, protótipos e plataformas finais que garantem a experiência encantadora para cada usuário." },
  { icon: Rocket, title: "Inovação", desc: "Mantemos o radar ligado no mercado para acompanhar tendências, boas práticas e ações de concorrentes, para estarmos sempre um passo à frente." },
  { icon: ListOrdered, title: "Priorização", desc: "Fazemos a gestão contínua do backlog de produto com base em dados de performance para priorizar demandas do negócio com necessidades reais dos membros." },
  { icon: FileText, title: "Conteúdo", desc: "Escrevemos e revisamos todos os conteúdos dos nossos produtos, além de e-mails, sites e materiais educativos com tom e voz alinhados com a marca." },
  { icon: Users, title: "Colaboração cross", desc: "Atuamos como ponte entre diversas áreas da empresa para assegurar que todos os times estejam alinhados na direção estratégica dos projetos." },
  { icon: Gift, title: "Experiências", desc: "Não ficamos só no digital. Ativamos os cinco sentidos por meio do planejamento, desenho e produção de experiências com produtos físicos e eventos." },
  { icon: MessageCircle, title: "Comunidade", desc: "Fortalecemos o relacionamento com nossos membros por meio de uma comunidade ativa, fornecendo badges, campanhas e dinâmicas que estreitam laços." },
  { icon: Lightbulb, title: "Marketing de produto", desc: "Cuidamos da divulgação estratégica com domínio de ferramentas como sites e comunicação ativa na comunidade para agregar ainda mais valor." },
];

// Ícones vêm da fonte única de áreas da empresa (src/data/areasEmpresa.ts)
// para manter a iconografia consistente com o Tom e Voz e demais seções.
const network = [
  { area: "Consultoria", icon: areaIcons.Consultoria, desc: "Caminhamos junto dos consultores para entender o que o investidor precisa no dia a dia e transformar isso em produto." },
  { area: "Tecnologia", icon: areaIcons.Tecnologia, desc: "Desenvolvemos sites, plataformas e sistemas em parceria com os times de Infraestrutura e Desenvolvimento, sempre pensando em performance, estabilidade e experiência do usuário." },
  { area: "Marketing", icon: areaIcons.Marketing, desc: "Transformamos estratégias em páginas, campanhas e experiências que conectam nossos produtos com quem realmente importa: nossos membros." },
  { area: "Audiovisual", icon: areaIcons.Audiovisual, desc: "Participamos do planejamento e acompanhamos a produção dos conteúdos para garantir que tudo chegue aos alunos com a qualidade que esperamos." },
  { area: "Financeiro", icon: areaIcons.Financeiro, desc: "Planejamos custos e acompanhamos gastos para desenvolver produtos sustentáveis e bem estruturados." },
  { area: "Capital Humano", icon: areaIcons["Capital Humano"], desc: "Apoiamos treinamentos, integração de novos colaboradores e iniciativas que ajudam o time a evoluir continuamente." },
  { area: "Logística", icon: areaIcons.Logística, desc: "Planejamos e acompanhamos a produção e a distribuição dos nossos materiais físicos para garantir que a experiência continue mesmo fora do digital." },
  { area: "Comercial & Relacionamento", icon: areaIcons["Comercial & Relacionamento"], desc: "Com o Comercial, acompanhamos indicadores e oportunidades de crescimento. Com o Relacionamento, transformamos o feedback dos membros em melhorias para os produtos." },
  { area: "Jurídico", icon: areaIcons.Jurídico, desc: "Trabalhamos em conjunto para garantir que nossos produtos, comunicações e materiais estejam alinhados às exigências legais e de compliance." },
];

// A visualização isométrica de "Nossa estrutura" vive em
// src/components/widgets/EstruturaIsometrica.tsx e recebe `network` acima.

const dayToDay = [
  { icon: Search, title: "Pesquisa & Análise de dados", tagline: "Lemos os números para entender as pessoas.", desc: "Travou no Typeform ou não sabe como ler os números de um dashboard? Nós traduzimos os dados. Fazemos pesquisas com leads, membros e com os próprios piratas para encontrar os problemas reais e guiar os próximos passos do produto.", quemChamar: ["Ana Beatriz", "Hiago", "Ariadne"] },
  { icon: Monitor, title: "Plataformas & Tecnologia", tagline: "A engenharia por trás do produto.", desc: "Encontrou algum erro na plataforma de aulas ou em algum de nossos sites? Nós sabemos como construir e ajustar cada detalhe técnico.", quemChamar: ["Elane", "Hiago", "Armando", "Éria", "Mateus", "Ana Beatriz"] },
  { icon: Palette, title: "Design (Físico & Digital)", tagline: "Identidade visual e experiência tangível.", desc: "Cuidamos da nossa marca de ponta a ponta, do digital aos materiais físicos que os membros recebem. Se você precisa das logos oficiais, fotos do Raul, paleta de cores ou quer desenvolver novos kits e brindes (como meias e bonés), nós garantimos que o visual saia com a qualidade que a AUVP exige.", quemChamar: ["Armando", "Éria"] },
  { icon: PenTool, title: "Copy & Redação", tagline: "Estratégia em cada palavra.", desc: "De apostilas, roteiros e mapas mentais até este texto que você está lendo. Se você precisa criar ou revisar um playbook e garantir que o material não tenha jargões de marketing ou cara de inteligência artificial, nossos redatores estão prontos para ajudar.", quemChamar: ["Jeniffer", "Mateus", "Ana"] },
  { icon: Settings, title: "Produtividade & Gestão", tagline: "Fazemos projetos rodarem.", desc: "Planilhas, ClickUp, fluxos de trabalho e priorização. Se o desafio é gestão de tempo, de pessoas ou aumentar a eficiência do time, somos especialistas em transformar caos em projetos executados.", quemChamar: ["Beatriz Henriques", "Daniel", "Ariadne"] },
  { icon: Heart, title: "CX & relacionamento com membros", tagline: "Ouvimos o mercado e cuidamos de cada membro.", desc: "Nós mapeamos o mercado e ouvimos quem consome o nosso conteúdo para aplicar melhorias práticas. Da análise de dados à mediação dos grupos de WhatsApp, nosso papel é garantir que o convívio e a experiência do membro mantenham o padrão da AUVP.", quemChamar: ["Beatriz Henriques", "Lilian", "Debora"] },
];

// ─── Section helpers ──────────────────────────────────────────────────────────

function Section({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[800ms] ease-apple will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-bold font-anek text-foreground mb-2 leading-tight">{children}</h2>;
}

// ─── Voo do cubo do Produto, conduzido pelo scroll (telas largas) ────────────
// Entre "Nossa estrutura" e "Nossa rotina na prática" o cubo central é
// dirigido pelo scroll: ao rolar para baixo ele sai da cena, cruza o centro
// da tela e pousa entre os cards da rotina — que se afastam para os lados
// SIMULTANEAMENTE, no mesmo progresso. Rolar para cima reverte tudo, ponto a
// ponto, até o cubo voltar ao lugar original. Clicar no cubo apenas rola a
// página suavemente (o scroll conduz a animação). Quando o cubo ancora,
// linhas de energia se traçam até cada card.
//
// A interação exige largura real (≥ INTERACTION_MIN_W): os cards invadem as
// margens fora do container e por isso telas de notebook ficam de fora.

const INTERACTION_MIN_W = 1536; // px — margem suficiente p/ os cards saírem da página
const SPREAD_PX = 96;           // afastamento máximo de cada coluna de cards
const DOCK_W = 160;             // largura do cubo em voo/ancorado (px)
const DOCK_H = Math.round(DOCK_W * (116 / 128)); // proporção do viewBox do cubo
const FLY_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Curva da rolagem por clique — pontas bem mais lentas que a cúbica. */
const easeInOutQuint = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2);

/** transform que centra o overlay (DOCK_W×DOCK_H) no ponto (x, y) da tela */
const tf = (x: number, y: number, s: number) =>
  `translate(${x - DOCK_W / 2}px, ${y - DOCK_H / 2}px) scale(${s})`;

/**
 * Rolagem suave com curva própria: centraliza `el` no viewport com
 * ease-in-out (lenta no início e no fim) e duração proporcional à
 * distância. O scrollIntoView nativo é rápido demais e não dá controle
 * sobre a curva. Retorna uma função de cancelamento; rolar manualmente
 * (wheel/touch) também interrompe a animação.
 */
function smoothScrollToCenter(el: Element): () => void {
  const rect = el.getBoundingClientRect();
  const start = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(0, Math.min(start + rect.top + rect.height / 2 - window.innerHeight / 2, max));
  const dist = target - start;
  if (Math.abs(dist) < 2) return () => {};

  const duration = Math.min(3400, Math.max(2200, Math.abs(dist) * 1.9));
  const t0 = performance.now();
  let raf = 0;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });

  const step = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + dist * easeInOutQuint(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else cancel();
  };
  raf = requestAnimationFrame(step);
  return cancel;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TimePage() {
  const [teamRef, teamVisible] = useReveal(0.05);
  const [orgOpen, setOrgOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{ id: string; el: HTMLElement } | null>(null);
  const orgToggleRef = useRef<HTMLButtonElement>(null);
  const [showOrgHint, setShowOrgHint] = useState(false);

  /* Rolagem para a âncora do hash. O salto nativo do navegador não serve
     aqui: quando ele acontece, a página ainda está montando e as seções
     entram com animação de reveal, então o destino ainda não tem altura. */
  useEffect(() => {
    const alvo = window.location.hash.slice(1);
    if (!alvo) return;
    const t = setTimeout(() => {
      document.getElementById(alvo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const selectMember = useCallback((id: string, el: HTMLElement) => {
    setSelectedMember((prev) => (prev?.id === id ? null : { id, el }));
  }, []);
  const closeMember = useCallback(() => setSelectedMember(null), []);

  const dismissOrgHint = useCallback(() => {
    setShowOrgHint(false);
  }, []);

  // ── Voo do cubo do Produto, conduzido pelo scroll ──
  const reducedMotion = useReducedMotion();
  const [ativo, setAtivo] = useState(false); // largura suficiente e sem reduced-motion
  const [fase, setFase] = useState<"cena" | "voo" | "ancorado">("cena");
  const flyRef = useRef<HTMLDivElement>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sceneAnchorRef = useRef<SVGGElement | null>(null);
  const rafRef = useRef(0);
  const [linhas, setLinhas] = useState<{ cx: number; cy: number; pts: { x: number; y: number }[] } | null>(null);

  useEffect(() => {
    const check = () => setAtivo(window.innerWidth >= INTERACTION_MIN_W && !reducedMotion);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reducedMotion]);

  /** Um passo da animação: progresso = posição do scroll entre as âncoras.
      Cards e cubo avançam juntos, no mesmo eased — afastamento simultâneo. */
  const updateVoo = useCallback(() => {
    const scene = sceneAnchorRef.current;
    const dock = dockRef.current;
    if (!scene || !dock) return;
    const s = scene.getBoundingClientRect();
    const d = dock.getBoundingClientRect();
    const sc = s.top + s.height / 2;
    const span = d.top + d.height / 2 - sc; // distância fixa entre as âncoras na página
    const raw = span > 0 ? (window.innerHeight / 2 - sc) / span : 0;
    // pequenas zonas mortas nas pontas para o cubo assentar com folga
    const p = Math.min(1, Math.max(0, (raw - 0.06) / 0.88));
    const eased = easeInOutCubic(p);

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = eased > 0 ? `translateX(${(i % 2 === 0 ? -1 : 1) * SPREAD_PX * eased}px)` : "";
    });

    setFase(p <= 0 ? "cena" : p >= 1 ? "ancorado" : "voo");

    const el = flyRef.current;
    if (el && p > 0 && p < 1) {
      const sx = s.left + s.width / 2;
      const sy = s.top + s.height / 2;
      const dx = d.left + d.width / 2;
      const dy = d.top + d.height / 2;
      const x = sx + (dx - sx) * eased;
      // leve arco: o cubo sobe um pouco ao cruzar o meio do caminho
      const y = sy + (dy - sy) * eased - Math.sin(Math.PI * eased) * 28;
      const s0 = s.width / DOCK_W;
      el.style.transform = tf(x, y, s0 + (1 - s0) * eased);
    }
  }, []);

  useEffect(() => {
    if (!ativo) {
      setFase("cena");
      cardRefs.current.forEach((el) => { if (el) el.style.transform = ""; });
      return;
    }
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateVoo);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ativo, updateVoo]);

  // Posiciona o overlay antes do primeiro paint quando a fase vira "voo"
  useLayoutEffect(() => {
    if (fase === "voo") updateVoo();
  }, [fase, updateVoo]);

  // O clique apenas rola a página — o scroll conduz (e pode reverter) o voo.
  // A rolagem usa curva própria (ease-in-out, lenta nas pontas) porque o
  // scrollIntoView nativo é rápido demais e não permite ajustar a curva.
  const cancelScrollRef = useRef<() => void>(() => {});
  const rolarAte = useCallback((el: Element | null) => {
    if (!el) return;
    cancelScrollRef.current();
    cancelScrollRef.current = smoothScrollToCenter(el);
  }, []);
  const irParaRotina = useCallback(() => rolarAte(dockRef.current), [rolarAte]);
  const voltarParaCena = useCallback(() => rolarAte(sceneAnchorRef.current), [rolarAte]);

  useEffect(() => () => cancelScrollRef.current(), []);

  // Linhas cubo → cards: medidas assim que o cubo ancora (os cards já estão
  // na posição final, movidos no mesmo progresso do cubo). Remede em resize.
  useEffect(() => {
    if (fase !== "ancorado") { setLinhas(null); return; }
    let alive = true;
    const medir = () => {
      const wrap = gridWrapRef.current;
      const dock = dockRef.current;
      if (!wrap || !dock) return;
      const w = wrap.getBoundingClientRect();
      const dr = dock.getBoundingClientRect();
      const pts = cardRefs.current
        .map((el, i) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: (i % 2 === 0 ? r.right : r.left) - w.left, y: r.top + r.height / 2 - w.top };
        })
        .filter((p): p is { x: number; y: number } => p !== null);
      if (alive) setLinhas({ cx: dr.left + dr.width / 2 - w.left, cy: dr.top + dr.height / 2 - w.top, pts });
    };
    const timer = window.setTimeout(medir, 60);
    window.addEventListener("resize", medir);
    return () => {
      alive = false;
      window.clearTimeout(timer);
      window.removeEventListener("resize", medir);
    };
  }, [fase]);

  useEffect(() => {
    const el = orgToggleRef.current;
    if (!el) return;
    let dismissTimer: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowOrgHint(true);
          obs.disconnect();
          dismissTimer = setTimeout(dismissOrgHint, 5000);
        }
      },
      { threshold: 0.8 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(dismissTimer);
    };
  }, [dismissOrgHint]);

  return (
    <PageShell
      footer="Time de Produto e CX — AUVP"
      mainClassName="py-16 space-y-24"
      hero={
        <PageHero
          icon={Users}
          title="Nossa tripulação"
          description={
            <>
              Aqui a excelência é o mínimo. Juntamos especialistas em{" "}
              <span className="font-semibold text-foreground">design</span>,{" "}
              <span className="font-semibold text-foreground">copy</span>,{" "}
              <span className="font-semibold text-foreground">gestão</span> e{" "}
              <span className="font-semibold text-foreground">dados</span> com um único foco:
              manter o padrão de qualidade da maior escola de investimentos do país.
            </>
          }
          /* Respiro extra embaixo: os cards do time sobem com margem negativa
             e flutuam sobre a dobra do hero — sem isso encostariam no texto.
             Só este padding controla a distância até os cards; a sobreposição
             sobre a dobra depende da margem negativa deles, não daqui. */
          className="pb-8 md:pb-14"
        />
      }
    >
      <>


        <div
          ref={teamRef}
          className={cn(
            "relative z-10 -mt-20 md:-mt-28 transition-[opacity,transform] duration-[800ms] ease-apple will-change-transform",
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Team member cards — lifted to overlap the hero seam for a 3D feel */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-5 drop-shadow-2xl">
            {TEAM_ORDER.map((id) => (
              <MemberCard key={id} id={id} active={selectedMember?.id === id} onSelect={selectMember} />
            ))}
          </div>
          {selectedMember && (
            <PersonPopover key={selectedMember.id} id={selectedMember.id} anchorEl={selectedMember.el} onClose={closeMember} />
          )}

          {/* Org chart toggle — a divider line spanning the cards' width with a
              discreet "ver organograma" label hugging its right end. */}
          <div className="relative">
            {showOrgHint && (
              <div className="absolute top-full mt-2 right-0 z-50 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-none">
                <div className="relative bg-primary text-primary-foreground text-xs font-roboto font-semibold px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap">
                  <div className="absolute -top-1.5 right-6 w-3 h-3 bg-primary rotate-45 rounded-sm" />
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    Veja como funciona o organograma de nosso time
                  </span>
                </div>
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  ref={orgToggleRef}
                  onClick={() => { setOrgOpen((v) => !v); dismissOrgHint(); }}
                  className="group w-full flex items-center gap-3 mt-1 mb-2"
                  aria-expanded={orgOpen}
                >
                  <span className="h-px flex-1 bg-border" />
                  <span className="flex items-center gap-1.5 text-xs font-semibold font-roboto text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-apple">
                    {orgOpen ? "Esconder organograma" : "Ver organograma"}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500 ease-apple", orgOpen && "rotate-180")} />
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[220px] text-center text-xs">
                Veja a estrutura hierárquica completa do time de Produto e CX
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Collapsible org chart */}
          {orgOpen && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-500 ease-apple">
              <OrgChart />
            </div>
          )}
        </div>

        {/* Rede interna — banded background to set it apart from the rest */}
        <Section className="relative rounded-3xl border bg-muted/40 dark:bg-muted/20 px-6 py-10 md:px-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="lg:flex-1">
              <SectionTitle>Nossa estrutura</SectionTitle>
              <p className="text-muted-foreground font-roboto max-w-md mb-10 lg:mb-0">
                Nenhum time trabalha sozinho. O nosso trabalho acontece em parceria com praticamente
                todas as áreas da empresa. Cada time contribui com uma parte do processo para que a
                experiência final seja a melhor possível. Passe o mouse ou clique em cada área para
                entender como trabalhamos juntos.
              </p>
            </div>
            <EstruturaIsometrica
              items={network}
              produtoAusente={ativo && fase !== "cena"}
              onProdutoClick={ativo ? (fase === "cena" ? irParaRotina : voltarParaCena) : undefined}
              produtoAnchorRef={(el) => { sceneAnchorRef.current = el; }}
            />
          </div>
        </Section>

        <Section id="rotina-na-pratica" className="scroll-mt-24">
          <SectionTitle>Nossa rotina na prática</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">Veja a especialidade de cada membro do time de produtos. Saiba exatamente qual pirata procurar quando precisar destravar uma demanda.</p>
          <div ref={gridWrapRef} className="relative">
            {/* Linhas de energia cubo → cards (aparecem no fim do afastamento) */}
            {fase === "ancorado" && linhas && (
              <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" aria-hidden="true">
                {linhas.pts.map((p, i) => {
                  const d = `M ${linhas.cx} ${linhas.cy} L ${p.x} ${p.y}`;
                  return (
                    <g key={i}>
                      <path
                        d={d}
                        pathLength={1}
                        fill="none"
                        stroke="hsl(var(--foreground) / 0.3)"
                        strokeWidth={1.2}
                        strokeDasharray="1"
                        strokeDashoffset={1}
                        strokeLinecap="round"
                        style={{ animation: `estrutura-draw 0.55s ${FLY_EASE} ${i * 0.07}s forwards` }}
                      />
                      <circle cx={p.x} cy={p.y} r={2.5} fill="hsl(var(--primary))" className="animate-in fade-in duration-500" style={{ animationDelay: `${0.4 + i * 0.07}s`, animationFillMode: "both" }} />
                      {!reducedMotion && (
                        <g>
                          <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${0.7 + i * 0.35}s`} repeatCount="indefinite" path={d} />
                          <circle r={3.5} fill="hsl(var(--primary) / 0.25)" />
                          <circle r={1.6} fill="hsl(var(--primary))" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dayToDay.map((item, i) => {
                const Icon = item.icon;
                const orphan = i === dayToDay.length - 1 && dayToDay.length % 2 === 1;
                return (
                  <div
                    key={i}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    /* O afastamento lateral é aplicado por frame em updateVoo(),
                       no mesmo progresso do cubo — sem transition, para o
                       movimento acompanhar o scroll com precisão. */
                    className={cn("will-change-transform", orphan && "md:col-span-2")}
                  >
                    <div className="h-full rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-[transform,box-shadow,border-color] duration-300 ease-apple will-change-transform flex flex-col gap-4">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 mt-0.5"><Icon className="h-6 w-6 text-primary" /></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold font-anek text-foreground leading-tight mb-0.5">{item.title}</h3>
                          <p className="text-sm font-semibold text-primary font-roboto leading-tight">{item.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
                      <div className="pt-3 border-t flex items-start gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-roboto shrink-0 mt-1.5">Quem chamar:</span>
                        {item.quemChamar.map((name) => (
                          <span key={name} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold font-roboto">{name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Âncora do pouso + cubo ancorado entre os cards (desktop) */}
            <div
              ref={dockRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
              style={{ width: DOCK_W, height: DOCK_H }}
            />
            {fase === "ancorado" && (
              <button
                type="button"
                onClick={voltarParaCena}
                aria-label="Devolver o cubo do Produto para a estrutura"
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none transition-transform duration-300 ease-apple hover:scale-[1.04]"
                style={{ width: DOCK_W, height: DOCK_H }}
              >
                <ProdutoCubeGraphic className="h-full w-full" />
              </button>
            )}
          </div>
        </Section>

        <Section>
          <SectionTitle>O que sustenta nossas entregas</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">Nove princípios que orientam como trabalhamos, priorizamos e entregamos valor.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <div key={i} className="group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-[transform,box-shadow,border-color] duration-300 ease-apple will-change-transform">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 ease-apple"><Icon className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h3 className="font-bold font-anek text-foreground mb-2 leading-tight">{pilar.title}</h3>
                      <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{pilar.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Cubo do Produto em voo — overlay fixo, fora de qualquer ancestral
            com transform (as Sections usam translate no reveal, o que
            quebraria o position: fixed). O transform é posicionado por
            updateVoo() a cada frame de scroll; o useLayoutEffect garante a
            posição antes do paint. O !mt-0 neutraliza o space-y do <main>,
            que deslocaria o elemento fixo. */}
        {ativo && fase === "voo" && (
          <div
            ref={flyRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-40 !mt-0 will-change-transform"
            style={{ width: DOCK_W, height: DOCK_H }}
          >
            <ProdutoCubeGraphic className="h-full w-full" />
          </div>
        )}
      </>
    </PageShell>
  );
}
