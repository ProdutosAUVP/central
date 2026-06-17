import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sun, Moon,
  Database, Palette, Rocket, ListOrdered, FileText, Users, Gift, MessageCircle, Lightbulb,
  Search, Monitor, PenTool, BarChart2, Settings, Heart, ChevronRight,
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
  lg: { w: 184, avatar: 58 },
  md: { w: 160, avatar: 50 },
  sm: { w: 140, avatar: 42 },
};

function PersonCard({
  id,
  activeId,
  onToggle,
  size = "md",
  register,
}: {
  id: string;
  activeId: string | null;
  onToggle: (id: string) => void;
  size?: CardSize;
  register?: (id: string, el: HTMLElement | null) => void;
}) {
  const person = orgPeople[id];
  const isActive = activeId === id;
  const { w, avatar } = cardDims[size];

  return (
    <button
      ref={(el) => register?.(id, el)}
      onClick={(e) => { e.stopPropagation(); onToggle(id); }}
      style={{ width: w }}
      className={cn(
        "relative z-10 shrink-0 rounded-xl border bg-card text-center cursor-pointer overflow-hidden",
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

// Small caption that also acts as a connector anchor for its team's branch
function CatLabel({
  id,
  label,
  color = "text-muted-foreground",
  register,
}: {
  id: string;
  label: string;
  color?: string;
  register: (id: string, el: HTMLElement | null) => void;
}) {
  return (
    <span
      ref={(el) => register(id, el)}
      className={cn("relative z-10 text-[9px] font-bold font-roboto tracking-[0.15em] uppercase whitespace-nowrap", color)}
    >
      {label}
    </span>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const person = orgPeople[id];
  return (
    <div className="relative mt-6 rounded-2xl border bg-card shadow-md overflow-hidden animate-in fade-in duration-200">
      <div className="flex">
        <div className={cn("w-1.5 shrink-0 bg-gradient-to-b", gradients[person.color])} />
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Large avatar */}
            <div
              className={cn("rounded-2xl flex items-center justify-center font-bold font-anek text-white shadow-md bg-gradient-to-br shrink-0", gradients[person.color])}
              style={{ width: 80, height: 80, fontSize: 26 }}
            >
              {person.initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-anek text-foreground leading-tight">{person.name}</h3>
                  <p className="text-sm text-primary font-roboto font-semibold mt-0.5">{person.role}</p>
                  <span className={cn("inline-block mt-2 rounded-full px-3 py-1 text-[10px] font-bold font-roboto uppercase tracking-wider", levelColors[person.color])}>
                    {person.level}
                  </span>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 text-lg leading-none shrink-0" aria-label="Fechar">✕</button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-roboto leading-relaxed">{person.description}</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
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
      </div>
    </div>
  );
}

// ─── Org Chart ─────────────────────────────────────────────────────────────────

// Parent → child edges. Curved connectors are drawn between the parent's bottom
// edge and the child's top edge. Category labels are intermediate anchors so the
// lines visibly "come out of" each team.
const EDGES: [string, string][] = [
  ["raul", "beatriz"],
  ["beatriz", "lilian"],
  ["beatriz", "debora"],
  ["beatriz", "daniel"],
  ["daniel", "cat-ger"],
  ["daniel", "cat-des"],
  ["daniel", "cat-ana"],
  ["daniel", "cat-con"],
  ["daniel", "cat-edu"],
  ["cat-ger", "ariadne"],
  ["cat-des", "armando"],
  ["cat-des", "eria"],
  ["cat-ana", "jeniffer"],
  ["cat-ana", "elane"],
  ["cat-con", "mateus"],
  ["cat-edu", "ana"],
  ["cat-edu", "hiago"],
];

// Fixed column unit so people of the same rank line up across every team column
const U = 150; // single-card column width
const D = U * 2; // double-card column width (Designers, Educacional)

// One horizontal rank row; cells keep a fixed width so columns stay aligned
function RankRow({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center items-start">{children}</div>;
}

function Cell({ w, children }: { w: number; children?: React.ReactNode }) {
  return (
    <div style={{ width: w }} className="flex justify-center items-start gap-2">
      {children}
    </div>
  );
}

function OrgChart() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  // Connector geometry — measured from the DOM so curves follow the real layout
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<string, HTMLElement | null>>({});
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const register = useCallback((id: string, el: HTMLElement | null) => {
    nodes.current[id] = el;
  }, []);

  const recompute = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const c = wrap.getBoundingClientRect();
    const next: string[] = [];
    for (const [from, to] of EDGES) {
      const a = nodes.current[from];
      const b = nodes.current[to];
      if (!a || !b) continue;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const x1 = ar.left - c.left + ar.width / 2;
      const y1 = ar.bottom - c.top;
      const x2 = br.left - c.left + br.width / 2;
      const y2 = br.top - c.top;
      const my = (y1 + y2) / 2;
      // Smooth cubic curve: vertical tangents at both ends, soft S in between
      next.push(`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`);
    }
    setPaths(next);
    setSize({ w: wrap.scrollWidth, h: wrap.scrollHeight });
  }, []);

  useLayoutEffect(() => {
    recompute();
    const t = setTimeout(recompute, 120); // re-measure after fonts/layout settle
    const ro = new ResizeObserver(recompute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", recompute);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-org]")) setActiveId(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const P = (id: string, sz: CardSize = "sm") => (
    <PersonCard id={id} activeId={activeId} onToggle={toggle} size={sz} register={register} />
  );

  return (
    <div data-org onClick={(e) => e.stopPropagation()} className="w-full">
      {/* Wide org chart: scroll only on small screens; on md+ it just expands the page */}
      <div className="-mx-4 px-4 overflow-x-auto md:mx-0 md:px-0 md:overflow-visible">
        <div ref={wrapRef} className="relative mx-auto w-max pt-1 pb-2">

          {/* Curved connector layer — sits behind the cards */}
          <svg
            className="absolute left-0 top-0 z-0 pointer-events-none overflow-visible"
            width={size.w}
            height={size.h}
            fill="none"
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.35}
                strokeWidth={2}
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Centred spine above the grid: CEO → Diretora */}
          <div className="flex flex-col items-center">
            {P("raul", "lg")}
            <div style={{ height: 28 }} />
            {P("beatriz", "md")}
            <div style={{ height: 28 }} />
          </div>

          {/* Arm labels */}
          <RankRow>
            <Cell w={U}>
              <CatLabel id="lbl-rel" label="Relacionamento" color="text-purple-500 dark:text-purple-400" register={register} />
            </Cell>
            <Cell w={U * 7}>
              <CatLabel id="lbl-prod" label="Produto" color="text-emerald-600 dark:text-emerald-400" register={register} />
            </Cell>
          </RankRow>

          {/* Rank 2 — Especialista / Coordenador */}
          <div style={{ height: 14 }} />
          <RankRow>
            <Cell w={U}>{P("lilian")}</Cell>
            <Cell w={U * 7}>{P("daniel", "md")}</Cell>
          </RankRow>

          {/* Category labels (anchors for the "lines out of each team") */}
          <div style={{ height: 30 }} />
          <RankRow>
            <Cell w={U} />
            <Cell w={U}><CatLabel id="cat-ger" label="Gerência" register={register} /></Cell>
            <Cell w={D}><CatLabel id="cat-des" label="Designers" register={register} /></Cell>
            <Cell w={U}><CatLabel id="cat-ana" label="Analistas" register={register} /></Cell>
            <Cell w={U}><CatLabel id="cat-con" label="Conteúdo" register={register} /></Cell>
            <Cell w={D}><CatLabel id="cat-edu" label="Educacional" register={register} /></Cell>
          </RankRow>

          {/* Rank 3 — Sênior (Debora & Ariadne at the same height) */}
          <div style={{ height: 30 }} />
          <RankRow>
            <Cell w={U}>{P("debora")}</Cell>
            <Cell w={U}>{P("ariadne")}</Cell>
            <Cell w={D} />
            <Cell w={U} />
            <Cell w={U} />
            <Cell w={D} />
          </RankRow>

          {/* Rank 4 — Pleno */}
          <div style={{ height: 36 }} />
          <RankRow>
            <Cell w={U} />
            <Cell w={U} />
            <Cell w={D}>{P("armando")}{P("eria")}</Cell>
            <Cell w={U}>{P("jeniffer")}</Cell>
            <Cell w={U}>{P("mateus")}</Cell>
            <Cell w={D} />
          </RankRow>

          {/* Rank 5 — Júnior */}
          <div style={{ height: 36 }} />
          <RankRow>
            <Cell w={U} />
            <Cell w={U} />
            <Cell w={D} />
            <Cell w={U}>{P("elane")}</Cell>
            <Cell w={U} />
            <Cell w={D}>{P("ana")}{P("hiago")}</Cell>
          </RankRow>
        </div>
      </div>

      {/* Detail panel — opens directly below the chart */}
      {activeId && <DetailPanel key={activeId} id={activeId} onClose={() => setActiveId(null)} />}

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
  { area: "Atendimento", desc: "Escutamos as dores dos membros para aprimorar constantemente os produtos do ecossistema." },
  { area: "Consultoria", desc: "Executamos estratégias de relacionamento para aumentar a proximidade do investidor com a marca." },
  { area: "Audiovisual", desc: "Acompanhamos a criação e captação de perto para entregar o melhor conteúdo de finanças do país." },
  { area: "Vendas", desc: "Analisamos métricas de conversão para garantir o crescimento sustentável da base e a retenção." },
  { area: "Tecnologia", desc: "Atuamos no desenvolvimento de plataformas focadas na experiência e usabilidade do usuário." },
  { area: "Financeiro", desc: "Fazemos a gestão de custos focada na eficiência operacional e na solidez do negócio." },
  { area: "Marketing", desc: "Criamos estratégias de aquisição baseadas em autoridade, educação e transparência." },
  { area: "Jurídico", desc: "Asseguramos a conformidade com as normas do mercado financeiro e a segurança institucional." },
];

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
    <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", className)}>
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

        <div ref={teamRef} className={cn("transition-all duration-700", teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <SectionLabel>Quem somos</SectionLabel>
          <SectionTitle>Nossa estrutura</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            {Object.keys(orgPeople).length} pessoas, uma direção — criar produtos que transformam a relação dos brasileiros com o dinheiro.
          </p>
          <OrgChart />
        </div>

        <Section>
          <SectionLabel>Pilares</SectionLabel>
          <SectionTitle>O que sustenta nossas entregas</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">Nove princípios que orientam como trabalhamos, priorizamos e entregamos valor.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <div key={i} className="group rounded-2xl border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"><Icon className="h-6 w-6 text-primary" /></div>
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

        <Section>
          <SectionLabel>Rede interna</SectionLabel>
          <SectionTitle>A rede que nos conecta</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">Trabalhamos em parceria com todas as áreas da AUVP para garantir que produto e negócio andem juntos.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {network.map((item, i) => (
              <div key={i} className="rounded-2xl border bg-card p-5 hover:shadow-sm hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <h3 className="font-bold font-anek text-foreground text-sm">{item.area}</h3>
                </div>
                <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionLabel>Dia a dia</SectionLabel>
          <SectionTitle>O que fazemos no dia a dia</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">Conheça a atuação de cada especialista e saiba exatamente a quem recorrer para resolver seus desafios.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayToDay.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="rounded-2xl border bg-card p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
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

      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-muted-foreground font-roboto">Time de Produto e CX — AUVP &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
