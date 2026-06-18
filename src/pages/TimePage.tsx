import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { GlobalNav } from "@/components/GlobalNav";
import { olhoBranco } from "@/assets/olhos";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sun, Moon,
  Database, Palette, Rocket, ListOrdered, FileText, Users, Gift, MessageCircle, Lightbulb,
  Search, Monitor, PenTool, BarChart2, Settings, Heart, ChevronRight, ChevronDown, User, X,
  Headphones, Video, TrendingUp, Cpu, Wallet, Megaphone, Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Tema claro" : "Tema escuro"}
      className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

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
  director:        "from-indigo-600 via-indigo-800 to-violet-900",
  coordinator:     "from-emerald-600 via-emerald-700 to-green-900",
  cx:              "from-purple-500 via-purple-700 to-fuchsia-800",
  "product-senior":"from-teal-500 via-teal-700 to-emerald-800",
  "product-pleno": "from-green-500 via-green-600 to-emerald-700",
  "product-junior":"from-emerald-400 via-emerald-600 to-teal-700",
};

const levelColors: Record<OrgColor, string> = {
  ceo:             "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
  director:        "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300",
  coordinator:     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  cx:              "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
  "product-senior":"bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300",
  "product-pleno": "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300",
  "product-junior":"bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
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
    id: "lilian", name: "Lilian Machado", role: "Especialista em CX",
    initials: "LM", color: "cx", level: "Especialista", rank: 2,
    description: "Placeholder: Especialista em experiência do cliente, responsável pelo relacionamento, satisfação e fidelização dos membros.",
    responsibilities: ["Estratégia de relacionamento com membros", "Mapeamento da jornada do cliente", "Monitoramento de NPS", "Projetos especiais de CX"],
  },
  debora: {
    id: "debora", name: "Debora Sanders", role: "Analista de CX Sr. II",
    initials: "DS", color: "cx", level: "Sênior", rank: 3,
    description: "Placeholder: Analista sênior de CX, referência no time em pesquisa de usuário e análise de experiência.",
    responsibilities: ["Pesquisa de usuário (quali e quanti)", "Análise de jornada e touchpoints", "Benchmarking de CX", "Mentoria do time de CX"],
  },
  daniel: {
    id: "daniel", name: "Daniel Machado", role: "Coordenador de produto",
    initials: "DM", color: "coordinator", level: "Coordenador", rank: 2,
    description: "Placeholder: Coordena as iniciativas de produto, liderando cinco verticais independentes de atuação no dia a dia.",
    responsibilities: ["Gestão de backlog e roadmap", "Coordenação de squads", "Acompanhamento de entregas", "Rituais de produto"],
  },
  ariadne: {
    id: "ariadne", name: "Ariadne Carneiro", role: "Gerente de produto",
    initials: "AC", color: "product-senior", level: "Gerente", rank: 3,
    description: "Placeholder: Gerente de produto responsável por roadmap, priorização e entrega de valor para os membros.",
    responsibilities: ["Definição de roadmap", "Priorização de features", "Gestão de OKRs", "Alinhamento com stakeholders"],
  },
  armando: {
    id: "armando", name: "Armando Neto", role: "Designer de Produto Pl. I",
    initials: "AN", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Placeholder: Designer de produto pleno, responsável por interfaces digitais e protótipos de alta fidelidade.",
    responsibilities: ["UI/UX Design", "Prototipação e wireframes", "Design system", "Colaboração em pesquisas"],
  },
  eria: {
    id: "eria", name: "Éria Alencar", role: "Designer de Produto Pl. I",
    initials: "EA", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Placeholder: Designer de produto pleno com foco em design visual e experiência do usuário.",
    responsibilities: ["Visual design e identidade", "UX research", "Motion e micro-interações", "Assets para marketing"],
  },
  mateus: {
    id: "mateus", name: "Mateus Graff", role: "Redator Pl. I",
    initials: "MG", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Placeholder: Redator de produto pleno, responsável por conteúdo estratégico e copywriting.",
    responsibilities: ["Copywriting de produto", "Apostilas e materiais educativos", "Roteiros audiovisuais", "Revisão editorial"],
  },
  jeniffer: {
    id: "jeniffer", name: "Jeniffer Nascimento", role: "Analista de Produto Pl. I",
    initials: "JN", color: "product-pleno", level: "Pleno", rank: 4,
    description: "Placeholder: Analista de produto pleno, focada em análise de dados, requisitos e documentação.",
    responsibilities: ["Análise de dados e métricas", "Levantamento de requisitos", "Documentação de produto", "Suporte ao gerente"],
  },
  elane: {
    id: "elane", name: "Elane Rodrigues", role: "Analista de Produto Jr. I",
    initials: "ER", color: "product-junior", level: "Júnior", rank: 5,
    description: "Placeholder: Analista de produto júnior, apoia nas análises e pesquisas do time.",
    responsibilities: ["Pesquisa e coleta de dados", "Análise de métricas básicas", "Apoio ao PM e analistas", "Documentação operacional"],
  },
  ana: {
    id: "ana", name: "Ana Beatriz Melo", role: "Assistente de Produto",
    initials: "AB", color: "product-junior", level: "Júnior", rank: 5,
    description: "Placeholder: Assistente de produto, apoia diversas frentes do time com organização e execução.",
    responsibilities: ["Suporte operacional ao time", "Pesquisa assistida", "Organização de processos", "Comunicação interna"],
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

      {/* Avatar (photo placeholder — swap for <img> when photos exist) */}
      <div
        className={cn("rounded-full bg-gradient-to-br flex items-center justify-center font-bold font-anek text-white shadow ring-2 ring-card", gradients[person.color])}
        style={{ width: avatar, height: avatar, fontSize: Math.round(avatar * 0.38) }}
      >
        {person.initials}
      </div>

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
  { from: "beatriz", to: "lilian", kind: "hl", dashed: true },
  { from: "beatriz", to: "debora", kind: "hr" },
  { from: "beatriz", to: "daniel", kind: "v" },
  { from: "daniel", to: "ariadne", kind: "v" },
  { from: "ariadne", to: "cat-designers", kind: "v" },
  { from: "ariadne", to: "cat-analistas", kind: "v" },
  { from: "ariadne", to: "cat-conteudo", kind: "v" },
  { from: "ariadne", to: "cat-educacional", kind: "v" },
  { from: "cat-designers", to: "armando", kind: "v" },
  { from: "cat-designers", to: "eria", kind: "v" },
  { from: "cat-analistas", to: "jeniffer", kind: "v" },
  { from: "cat-analistas", to: "elane", kind: "v" },
  { from: "cat-conteudo", to: "mateus", kind: "v" },
  { from: "cat-educacional", to: "ana", kind: "v" },
  { from: "cat-educacional", to: "hiago", kind: "v" },
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
      {/* Photo placeholder — fills the entire top of the card.
          Swap the inner icon for an <img> once real photos exist. */}
      <div className={cn("relative w-full aspect-[4/3] bg-gradient-to-br flex items-center justify-center", gradients[person.color])}>
        <User className="h-10 w-10 text-white/70" strokeWidth={1.5} />
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
    <div className="relative rounded-2xl border bg-card shadow-xl overflow-hidden">
      <div className="flex">
        <div className={cn("w-1.5 shrink-0 bg-gradient-to-b", gradients[person.color])} />
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Photo placeholder */}
              <div
                className={cn("rounded-xl flex items-center justify-center text-white shadow bg-gradient-to-br shrink-0", gradients[person.color])}
                style={{ width: 48, height: 48 }}
              >
                <User className="h-6 w-6 text-white/80" strokeWidth={1.5} />
              </div>
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
        className={cn("absolute h-3 w-3 rotate-45 bg-card border-border", pos.side === "right" ? "-left-1.5 border-l border-b" : "-right-1.5 border-r border-t")}
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

            {/* Diretoria — Beatriz centered, flanked by the Relacionamento/CX
                pair (Lilian + Debora), one on each side. */}
            <div className="flex items-center gap-8 sm:gap-12" style={{ marginTop: ROW_GAP }}>
              <PersonCard id="lilian" activeId={activeId} onToggle={toggle} size="sm" cardRef={registerNode("lilian")} />
              <PersonCard id="beatriz" activeId={activeId} onToggle={toggle} size="md" cardRef={registerNode("beatriz")} />
              <PersonCard id="debora" activeId={activeId} onToggle={toggle} size="sm" cardRef={registerNode("debora")} />
            </div>

            {/* Coordenação — Daniel directly below Beatriz, centered, so the whole
                Produto subtree stays centered on screen. */}
            <div style={{ marginTop: ROW_GAP }}>
              <PersonCard id="daniel" activeId={activeId} onToggle={toggle} size="md" cardRef={registerNode("daniel")} />
            </div>

            {/* Gerência — Ariadne (Sênior) sits one level above the Plenos. */}
            <div style={{ marginTop: ROW_GAP }}>
              <PersonCard id="ariadne" activeId={activeId} onToggle={toggle} size="sm" cardRef={registerNode("ariadne")} />
            </div>

            {/* Squads de produto — categories fan out below Ariadne, centered. */}
            <div className="flex items-start justify-center gap-5 sm:gap-8" style={{ marginTop: ROW_GAP }}>
              <CategoryColumn catId="cat-designers"   label="Designers"   ids={["armando", "eria"]}   activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-analistas"   label="Analistas"   ids={["jeniffer", "elane"]} activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-conteudo"    label="Conteúdo"    ids={["mateus"]}             activeId={activeId} onToggle={toggle} registerNode={registerNode} />
              <CategoryColumn catId="cat-educacional" label="Educacional" ids={["ana", "hiago"]}      activeId={activeId} onToggle={toggle} registerNode={registerNode} />
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

const network = [
  { area: "Atendimento", icon: Headphones, desc: "Escutamos as dores dos membros para aprimorar constantemente os produtos do ecossistema." },
  { area: "Consultoria", icon: Users, desc: "Executamos estratégias de relacionamento para aumentar a proximidade do investidor com a marca." },
  { area: "Audiovisual", icon: Video, desc: "Acompanhamos a criação e captação de perto para entregar o melhor conteúdo de finanças do país." },
  { area: "Vendas", icon: TrendingUp, desc: "Analisamos métricas de conversão para garantir o crescimento sustentável da base e a retenção." },
  { area: "Tecnologia", icon: Cpu, desc: "Atuamos no desenvolvimento de plataformas focadas na experiência e usabilidade do usuário." },
  { area: "Financeiro", icon: Wallet, desc: "Fazemos a gestão de custos focada na eficiência operacional e na solidez do negócio." },
  { area: "Marketing", icon: Megaphone, desc: "Criamos estratégias de aquisição baseadas em autoridade, educação e transparência." },
  { area: "Jurídico", icon: Scale, desc: "Asseguramos a conformidade com as normas do mercado financeiro e a segurança institucional." },
];

// ─── Orbit Network ──────────────────────────────────────────────────────────
// "A rede que nos conecta": Produto sits at the center while the partner areas
// orbit around it. The whole ring rotates slowly; each card counter-rotates so
// its text stays upright. Pauses on hover and respects reduced-motion.

const ORBIT_SIZE = 520; // px — desktop canvas
const ORBIT_R = 192; // px — orbit radius

function OrbitNetwork() {
  const center = ORBIT_SIZE / 2;
  const n = network.length;
  const angleAt = (i: number) => (i / n) * 360 - 90; // start at top, clockwise
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const paused = active !== null || hovered !== null;

  return (
    <>
      {/* Desktop: orbital visualization */}
      <div className="hidden lg:block shrink-0">
        <div className="group relative select-none" style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }}>
          {/* Rotating system: connector lines + orbiting cards */}
          <div className={cn("absolute inset-0 animate-orbit motion-reduce:animate-none group-hover:[animation-play-state:paused] will-change-transform", paused && "[animation-play-state:paused]")}>
            <svg viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx={center} cy={center} r={ORBIT_R} fill="none" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="2 7" opacity={0.7} />
              {network.map((_, i) => {
                const rad = (angleAt(i) * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={center + ORBIT_R * Math.cos(rad)}
                    y2={center + ORBIT_R * Math.sin(rad)}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                    opacity={0.45}
                  />
                );
              })}
            </svg>

            {network.map((item, i) => {
              const deg = angleAt(i);
              const Icon = item.icon;
              const open = active === i || hovered === i;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${deg}deg) translateX(${ORBIT_R}px) rotate(${-deg}deg)`, zIndex: open ? 30 : 10 }}
                >
                  {/* zero-size anchor; reverse-spin pivots exactly on the orbit point
                      to cancel the ring rotation → text stays upright */}
                  <div className={cn("relative h-0 w-0 animate-orbit-reverse motion-reduce:animate-none group-hover:[animation-play-state:paused] will-change-transform", paused && "[animation-play-state:paused]")}>
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                      onClick={() => setActive((a) => (a === i ? null : i))}
                      className={cn(
                        "absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card text-left overflow-hidden outline-none transition-[width,height,box-shadow,border-color] duration-300 ease-apple",
                        open ? "w-[236px] h-[154px] p-4 shadow-2xl border-primary/40" : "w-[158px] h-[68px] p-3 shadow-lg border-border"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h3 className="font-bold font-anek text-foreground text-sm leading-tight">{item.area}</h3>
                      </div>
                      <p className={cn("text-[11px] text-muted-foreground font-roboto leading-snug overflow-hidden transition-all duration-300 ease-apple", open ? "opacity-100 max-h-24 mt-2.5" : "opacity-0 max-h-0 mt-0")}>
                        {item.desc}
                      </p>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center — Produto ball (static), with the AUVP eye */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-2xl animate-soft-pulse motion-reduce:animate-none" />
            <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-primary to-emerald-700 dark:from-emerald-500 dark:to-emerald-800 shadow-xl ring-4 ring-background flex items-center justify-center">
              <img src={olhoBranco.url} alt="Produto AUVP" className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet fallback: Produto on top, areas in a grid */}
      <div className="lg:hidden">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-emerald-700 dark:from-emerald-500 dark:to-emerald-800 shadow-lg ring-4 ring-background flex items-center justify-center">
            <img src={olhoBranco.url} alt="Produto AUVP" className="h-10 w-10" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {network.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="rounded-2xl border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-bold font-anek text-foreground text-sm">{item.area}</h3>
                </div>
                <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const dayToDay = [
  { icon: Search, title: "Pesquisa & Análise de dados", tagline: "Mestres em decifrar comportamentos.", desc: "Precisa de ajuda com o Typeform ou quer entender o que um dashboard está dizendo? Realizamos pesquisas quantitativas e qualitativas com leads, membros (e até piratas!) para mapear dores e gerar insights reais.", quemChamar: ["Ana Beatriz", "Hiago", "Ariadne"] },
  { icon: Monitor, title: "Plataformas & Tecnologia", tagline: "Sua ideia funcionando sem bugs.", desc: "Encontrou um erro na plataforma de aulas ou em algum de nossos sites? Nós sabemos como construir e ajustar cada detalhe técnico.", quemChamar: ["Elane", "Hiago", "Armando", "Éria", "Mateus", "Ana Beatriz"] },
  { icon: Palette, title: "Design (Físico & Digital)", tagline: "Identidade visual e experiência tangível.", desc: "Da estética impecável da AUVP em mídias digitais e OOH, aos produtos que nossos membros amam usar. Se você precisa de cores, logos da AUVP, fotos do Raul, elementos visuais ou quer criar brindes, como meias e bonés a kits exclusivos, este é o lugar.", quemChamar: ["Armando", "Éria"] },
  { icon: PenTool, title: "Copy & Redação", tagline: "Estratégia em cada palavra.", desc: "De apostilas, roteiros de vídeo e mapas mentais a este texto que você lê agora. Quer revisar uma copy, um playbook ou criar materiais institucionais com narrativa estratégica? Nossa redação está pronta para ajudar.", quemChamar: ["Jeniffer", "Mateus", "Ana"] },
  { icon: BarChart2, title: "Monitoramento de mercado & CX", tagline: "Encantamento levado a sério.", desc: "Quem é nosso público e o que ele busca? Analisamos o mercado para sugerir melhorias e garantir que o CX seja mais do que uma sigla, criando conexões que encantam de verdade.", quemChamar: ["Beatriz Henriques", "Debora"] },
  { icon: Settings, title: "Produtividade & Gestão", tagline: "Fazemos projetos rodarem.", desc: "Planilhas, ClickUp, fluxos de trabalho e priorização. Se o desafio é gestão de tempo, de pessoas ou aumentar a eficiência do time, somos especialistas em transformar caos em projetos executados.", quemChamar: ["Beatriz Henriques", "Daniel", "Ariadne"] },
  { icon: Heart, title: "Relacionamento com membros", tagline: "Cuidando da nossa comunidade de ponta a ponta.", desc: "Seja mediando grupos de WhatsApp ou encontrando a resposta ideal para aquele membro que quer crescer conosco. Atuamos diretamente na linha de frente para garantir a melhor convivência.", quemChamar: ["Beatriz Henriques", "Debora"] },
];

// ─── Section helpers ──────────────────────────────────────────────────────────

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold font-roboto uppercase tracking-[0.15em] text-primary mb-3">{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-bold font-anek text-foreground mb-2 leading-tight">{children}</h2>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TimePage() {
  const [teamRef, teamVisible] = useReveal(0.05);
  const [orgOpen, setOrgOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{ id: string; el: HTMLElement } | null>(null);

  const selectMember = useCallback((id: string, el: HTMLElement) => {
    setSelectedMember((prev) => (prev?.id === id ? null : { id, el }));
  }, []);
  const closeMember = useCallback(() => setSelectedMember(null), []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <GlobalNav />
          <ThemeToggle />
        </div>
      </header>

      <div
        className="relative border-b overflow-hidden"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(155 93% 11% / 0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(155 93% 11% / 0.04) 0%, transparent 50%)" }}
      >
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <SectionLabel>Time de Produto e CX</SectionLabel>
            <h1 className="text-5xl md:text-7xl font-bold font-anek text-foreground leading-[1.05] mb-6">
              Conheça o <span className="text-primary">time</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-roboto leading-relaxed max-w-2xl">
              Formamos um time multidisciplinar, que navega entre{" "}
              <span className="font-semibold text-foreground">design</span>,{" "}
              <span className="font-semibold text-foreground">redação</span>,{" "}
              <span className="font-semibold text-foreground">gestão de projetos</span> e,
              é claro, <span className="font-semibold text-foreground">dados</span>.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-16 space-y-24">

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
          <button
            onClick={() => setOrgOpen((v) => !v)}
            className="group w-full flex items-center gap-3 mt-1 mb-2"
            aria-expanded={orgOpen}
          >
            <span className="h-px flex-1 bg-border" />
            <span className="flex items-center gap-1.5 text-xs font-semibold font-roboto text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-apple">
              {orgOpen ? "Esconder organograma" : "Ver organograma"}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500 ease-apple", orgOpen && "rotate-180")} />
            </span>
          </button>

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
              <SectionLabel>Rede interna</SectionLabel>
              <SectionTitle>A rede que nos conecta</SectionTitle>
              <p className="text-muted-foreground font-roboto max-w-md mb-10 lg:mb-0">
                Trabalhamos em parceria com todas as áreas da AUVP para garantir que produto e negócio andem juntos.
                Passe o mouse ou clique em cada área para saber mais.
              </p>
            </div>
            <OrbitNetwork />
          </div>
        </Section>

        <Section>
          <SectionLabel>Dia a dia</SectionLabel>
          <SectionTitle>O que fazemos no dia a dia</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">Conheça a atuação de cada especialista e saiba exatamente a quem recorrer para resolver seus desafios.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayToDay.map((item, i) => {
              const Icon = item.icon;
              const orphan = i === dayToDay.length - 1 && dayToDay.length % 2 === 1;
              return (
                <div key={i} className={cn("rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-[transform,box-shadow,border-color] duration-300 ease-apple will-change-transform flex flex-col gap-4", orphan && "md:col-span-2")}>
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
              );
            })}
          </div>
        </Section>

        <Section>
          <SectionLabel>Pilares</SectionLabel>
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

      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-muted-foreground font-roboto">Time de Produto e CX — AUVP &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
