import React, { useState, useEffect, useRef } from "react";
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
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
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
  | "ceo"
  | "director"
  | "coordinator"
  | "cx"
  | "product-senior"
  | "product-pleno"
  | "product-junior";

interface OrgPerson {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: OrgColor;
  level: string;
  description: string;
  responsibilities: string[];
}

const gradients: Record<OrgColor, string> = {
  ceo:             "from-rose-700 to-red-950",
  director:        "from-indigo-600 to-violet-900",
  coordinator:     "from-emerald-600 to-green-900",
  cx:              "from-purple-500 to-fuchsia-800",
  "product-senior":"from-teal-500 to-emerald-800",
  "product-pleno": "from-green-500 to-emerald-700",
  "product-junior":"from-emerald-400 to-teal-700",
};

const levelColors: Record<OrgColor, string> = {
  ceo:             "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  director:        "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
  coordinator:     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  cx:              "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
  "product-senior":"bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
  "product-pleno": "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  "product-junior":"bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
};

const orgPeople: Record<string, OrgPerson> = {
  raul: {
    id: "raul", name: "Raul Sena", role: "Fundador e CEO",
    initials: "RS", color: "ceo", level: "Liderança Executiva",
    description: "Placeholder: Visionário e fundador da AUVP, responsável pela direção estratégica e pelo crescimento de toda a empresa.",
    responsibilities: ["Visão e estratégia da empresa", "Cultura organizacional", "Parcerias estratégicas", "Decisões de alto impacto"],
  },
  beatriz: {
    id: "beatriz", name: "Beatriz Henriques", role: "Sócia e Diretora de Produto",
    initials: "BH", color: "director", level: "Liderança e Especialistas",
    description: "Placeholder: Dirige o time de produto e CX, conectando visão de negócio com execução, e liderando os dois grandes braços da área.",
    responsibilities: ["Direção estratégica de produto", "Gestão e desenvolvimento do time", "CX estratégico", "Alinhamento cross-funcional"],
  },
  lilian: {
    id: "lilian", name: "Lilian Machado", role: "Especialista em CX",
    initials: "LM", color: "cx", level: "Liderança e Especialistas",
    description: "Placeholder: Especialista em experiência do cliente, responsável pelo relacionamento, satisfação e fidelização dos membros.",
    responsibilities: ["Estratégia de relacionamento com membros", "Mapeamento da jornada do cliente", "Monitoramento de NPS", "Projetos especiais de CX"],
  },
  debora: {
    id: "debora", name: "Debora Sanders", role: "Analista de CX Sr. II",
    initials: "DS", color: "cx", level: "Sênior",
    description: "Placeholder: Analista sênior de CX, referência no time em pesquisa de usuário, análise de experiência e encantamento.",
    responsibilities: ["Pesquisa de usuário (quali e quanti)", "Análise de jornada e touchpoints", "Benchmarking de CX", "Mentoria do time de CX"],
  },
  daniel: {
    id: "daniel", name: "Daniel Machado", role: "Coordenador de produto",
    initials: "DM", color: "coordinator", level: "Liderança e Especialistas",
    description: "Placeholder: Coordena as iniciativas de produto, liderando cinco verticais independentes de atuação no dia a dia.",
    responsibilities: ["Gestão de backlog e roadmap", "Coordenação de squads", "Acompanhamento de entregas", "Rituais de produto"],
  },
  ariadne: {
    id: "ariadne", name: "Ariadne Carneiro", role: "Gerente de produto",
    initials: "AC", color: "product-senior", level: "Sênior",
    description: "Placeholder: Gerente de produto responsável por roadmap, priorização e entrega de valor contínuo para os membros.",
    responsibilities: ["Definição de roadmap", "Priorização de features", "Gestão de OKRs", "Alinhamento com stakeholders"],
  },
  armando: {
    id: "armando", name: "Armando Neto", role: "Designer de Produto Pl. I",
    initials: "AN", color: "product-pleno", level: "Pleno",
    description: "Placeholder: Designer de produto pleno, responsável por interfaces digitais e protótipos de alta fidelidade.",
    responsibilities: ["UI/UX Design", "Prototipação e wireframes", "Design system", "Colaboração em pesquisas"],
  },
  eria: {
    id: "eria", name: "Éria Alencar", role: "Designer de Produto Pl. I",
    initials: "EA", color: "product-pleno", level: "Pleno",
    description: "Placeholder: Designer de produto pleno com foco em design visual e na experiência do usuário.",
    responsibilities: ["Visual design e identidade", "UX research", "Motion e micro-interações", "Assets para marketing"],
  },
  mateus: {
    id: "mateus", name: "Mateus Graff", role: "Redator Pl. I",
    initials: "MG", color: "product-pleno", level: "Pleno",
    description: "Placeholder: Redator de produto pleno, responsável por conteúdo estratégico e copywriting em todos os produtos.",
    responsibilities: ["Copywriting de produto", "Apostilas e materiais educativos", "Roteiros audiovisuais", "Revisão editorial"],
  },
  jeniffer: {
    id: "jeniffer", name: "Jeniffer Nascimento", role: "Analista de Produto Pl. I",
    initials: "JN", color: "product-pleno", level: "Pleno",
    description: "Placeholder: Analista de produto pleno, focada em análise de dados, requisitos e documentação de produto.",
    responsibilities: ["Análise de dados e métricas", "Levantamento de requisitos", "Documentação de produto", "Suporte ao gerente"],
  },
  elane: {
    id: "elane", name: "Elane Rodrigues", role: "Analista de Produto Jr. I",
    initials: "ER", color: "product-junior", level: "Júnior",
    description: "Placeholder: Analista de produto júnior, apoia nas análises e pesquisas do time de produto.",
    responsibilities: ["Pesquisa e coleta de dados", "Análise de métricas básicas", "Apoio ao PM e analistas", "Documentação operacional"],
  },
  ana: {
    id: "ana", name: "Ana Beatriz Melo", role: "Assistente de Produto",
    initials: "AB", color: "product-junior", level: "Júnior",
    description: "Placeholder: Assistente de produto, apoia diversas frentes do time com organização e execução operacional.",
    responsibilities: ["Suporte operacional ao time", "Pesquisa assistida", "Organização de processos", "Comunicação interna"],
  },
  hiago: {
    id: "hiago", name: "Hiago Felipe Sousa", role: "Assistente de Produto",
    initials: "HF", color: "product-junior", level: "Júnior",
    description: "Placeholder: Assistente de produto, contribui com as demandas do time e no desenvolvimento de entregas.",
    responsibilities: ["Suporte às demandas do time", "Análise básica de dados", "Criação de documentações", "Apoio em pesquisas"],
  },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  person,
  sizePx,
  isActive,
}: {
  person: OrgPerson;
  sizePx: number;
  isActive: boolean;
}) {
  const fontSize = Math.round(sizePx * 0.32);
  return (
    <div
      className={cn(
        "relative rounded-full shrink-0 flex items-center justify-center font-bold font-anek text-white",
        "bg-gradient-to-br shadow-md transition-all duration-200",
        gradients[person.color],
        isActive
          ? "ring-4 ring-primary ring-offset-2 scale-110 shadow-lg"
          : "ring-2 ring-white/10 dark:ring-black/20 hover:ring-primary/40 hover:scale-105"
      )}
      style={{ width: sizePx, height: sizePx, fontSize }}
    >
      {/* Placeholder image layer — replace src with real photo later */}
      <img
        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(person.name)}&backgroundColor=transparent&fontSize=38&fontWeight=600`}
        alt={person.name}
        className="absolute inset-0 w-full h-full rounded-full object-cover opacity-0"
        aria-hidden
      />
      <span className="relative z-10 select-none">{person.initials}</span>
    </div>
  );
}

// ─── Person Node ──────────────────────────────────────────────────────────────

function PersonNode({
  id,
  activeId,
  onToggle,
  avatarSize = 64,
  maxLabelW = 120,
}: {
  id: string;
  activeId: string | null;
  onToggle: (id: string) => void;
  avatarSize?: number;
  maxLabelW?: number;
}) {
  const person = orgPeople[id];
  const isActive = activeId === id;

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(id); }}
      className="group flex flex-col items-center gap-2 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-primary rounded-xl p-1"
    >
      <Avatar person={person} sizePx={avatarSize} isActive={isActive} />
      <div
        className={cn(
          "rounded-xl border px-2.5 py-2 text-center transition-all duration-200",
          isActive
            ? "border-primary/60 bg-primary/5 shadow-sm"
            : "border-border bg-card group-hover:border-primary/30 group-hover:shadow-sm"
        )}
        style={{ minWidth: maxLabelW, maxWidth: maxLabelW + 24 }}
      >
        <p className="font-bold font-anek text-foreground text-xs leading-tight">{person.name}</p>
        <p className="text-[10px] text-muted-foreground font-roboto leading-tight mt-0.5">{person.role}</p>
        <span
          className={cn(
            "inline-block mt-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold font-roboto uppercase tracking-wider",
            levelColors[person.color]
          )}
        >
          {person.level}
        </span>
      </div>
    </button>
  );
}

// ─── Connector helpers ────────────────────────────────────────────────────────

function VLine({ h = 28 }: { h?: number }) {
  return <div className="w-px bg-border/70 mx-auto" style={{ height: h }} />;
}

function DashedHLine({ w = 64, label }: { w?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {label && (
        <span className="text-[8px] font-bold font-roboto tracking-[0.16em] text-muted-foreground/80 uppercase">
          {label}
        </span>
      )}
      <div className="border-t-2 border-dashed border-muted-foreground/40" style={{ width: w }} />
    </div>
  );
}

// ─── Selected Person Detail Panel ─────────────────────────────────────────────

function DetailPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const person = orgPeople[id];
  return (
    <div className="mt-10 rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-stretch">
        {/* Color stripe */}
        <div className={cn("w-1.5 shrink-0 bg-gradient-to-b", gradients[person.color])} />

        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div
                className={cn(
                  "rounded-full flex items-center justify-center font-bold font-anek text-white shadow-lg bg-gradient-to-br",
                  gradients[person.color]
                )}
                style={{ width: 88, height: 88, fontSize: 28 }}
              >
                {person.initials}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-anek text-foreground leading-tight">
                    {person.name}
                  </h3>
                  <p className="text-sm text-primary font-roboto font-semibold mt-0.5">{person.role}</p>
                  <span
                    className={cn(
                      "inline-block mt-2 rounded-full px-3 py-1 text-[10px] font-bold font-roboto uppercase tracking-wider",
                      levelColors[person.color]
                    )}
                  >
                    {person.level}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-1"
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-sm text-muted-foreground font-roboto leading-relaxed">
                {person.description}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {person.responsibilities.map((r) => (
                  <div key={r} className="flex items-start gap-2.5">
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

function OrgChart() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-org]")) setActiveId(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div data-org onClick={(e) => e.stopPropagation()}>

      {/* ════════════════════════════════════════════════════
          LIDERANÇA EXECUTIVA
          CEO → Diretora → (RELACIONAMENTO | PRODUTO)
      ════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-center">

        {/* Raul */}
        <PersonNode id="raul" activeId={activeId} onToggle={toggle} avatarSize={88} maxLabelW={148} />
        <VLine h={32} />

        {/* Beatriz row — RELACIONAMENTO branch sits to the left */}
        <div className="relative w-full flex justify-center items-start">

          {/* ── RELACIONAMENTO branch (left side) ── */}
          <div className="absolute right-[calc(50%+156px)] flex items-center gap-0 top-4">
            {/* Lilian + Debora stacked */}
            <div className="flex flex-col items-center gap-0">
              <PersonNode id="lilian" activeId={activeId} onToggle={toggle} avatarSize={68} maxLabelW={132} />
              <VLine h={20} />
              <PersonNode id="debora" activeId={activeId} onToggle={toggle} avatarSize={60} maxLabelW={132} />
            </div>

            {/* Dashed connector → Beatriz */}
            <div className="flex flex-col items-end ml-3">
              <DashedHLine w={72} label="relacionamento" />
            </div>
          </div>

          {/* ── Beatriz (center) ── */}
          <PersonNode id="beatriz" activeId={activeId} onToggle={toggle} avatarSize={80} maxLabelW={148} />
        </div>

        <VLine h={28} />

        {/* PRODUTO label */}
        <span className="text-[8px] font-bold font-roboto tracking-[0.18em] text-muted-foreground uppercase mb-1">
          produto
        </span>
        <VLine h={16} />

        {/* Daniel */}
        <PersonNode id="daniel" activeId={activeId} onToggle={toggle} avatarSize={76} maxLabelW={148} />
      </div>

      {/* ════════════════════════════════════════════════════
          5 VERTICAIS — Daniel → Gerência, Designers,
          Redatores, Analistas, Assistentes
      ════════════════════════════════════════════════════ */}
      <div className="mt-0 flex flex-col items-center">
        <VLine h={24} />

        {/* Horizontal spanning bar */}
        <div className="w-full max-w-4xl mx-auto relative flex justify-center">
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-border/70" />
        </div>

        {/* 5 columns */}
        <div className="grid grid-cols-5 w-full max-w-4xl gap-2 mt-0">

          {/* ── A: Gerência ── */}
          <div className="flex flex-col items-center">
            <VLine h={20} />
            <span className="text-[8px] font-bold font-roboto tracking-[0.14em] text-muted-foreground uppercase mb-3">
              Gerência
            </span>
            <PersonNode id="ariadne" activeId={activeId} onToggle={toggle} avatarSize={60} maxLabelW={110} />
          </div>

          {/* ── B: Designers ── */}
          <div className="flex flex-col items-center">
            <VLine h={20} />
            <span className="text-[8px] font-bold font-roboto tracking-[0.14em] text-muted-foreground uppercase mb-3">
              Designers
            </span>
            <div className="flex gap-2 flex-wrap justify-center">
              <PersonNode id="armando" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={100} />
              <PersonNode id="eria" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={100} />
            </div>
          </div>

          {/* ── C: Redatores ── */}
          <div className="flex flex-col items-center">
            <VLine h={20} />
            <span className="text-[8px] font-bold font-roboto tracking-[0.14em] text-muted-foreground uppercase mb-3">
              Redatores
            </span>
            <PersonNode id="mateus" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={110} />
          </div>

          {/* ── D: Analistas ── */}
          <div className="flex flex-col items-center">
            <VLine h={20} />
            <span className="text-[8px] font-bold font-roboto tracking-[0.14em] text-muted-foreground uppercase mb-3">
              Analistas
            </span>
            <div className="flex gap-2 flex-wrap justify-center">
              <PersonNode id="jeniffer" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={100} />
              <PersonNode id="elane" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={100} />
            </div>
          </div>

          {/* ── E: Assistentes ── */}
          <div className="flex flex-col items-center">
            <VLine h={20} />
            <span className="text-[8px] font-bold font-roboto tracking-[0.14em] text-muted-foreground uppercase mb-3">
              Assistentes
            </span>
            <div className="flex gap-2 flex-wrap justify-center">
              <PersonNode id="ana" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={100} />
              <PersonNode id="hiago" activeId={activeId} onToggle={toggle} avatarSize={56} maxLabelW={100} />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          SENIORIDADE LEGEND
      ════════════════════════════════════════════════════ */}
      <div className="mt-10 pt-6 border-t flex flex-wrap gap-x-5 gap-y-2 items-center justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {(
            [
              { color: "ceo" as OrgColor, label: "CEO" },
              { color: "director" as OrgColor, label: "Diretoria" },
              { color: "coordinator" as OrgColor, label: "Coordenação" },
              { color: "cx" as OrgColor, label: "CX / Especialistas" },
              { color: "product-senior" as OrgColor, label: "Sênior" },
              { color: "product-pleno" as OrgColor, label: "Pleno" },
              { color: "product-junior" as OrgColor, label: "Júnior" },
            ] as { color: OrgColor; label: string }[]
          ).map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={cn("h-2.5 w-2.5 rounded-full bg-gradient-to-br", gradients[color])} />
              <span className="text-[10px] font-roboto text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <span className="text-[10px] font-roboto text-muted-foreground italic">
          Clique em qualquer pessoa para ver detalhes
        </span>
      </div>

      {/* ════════════════════════════════════════════════════
          DETAIL PANEL — expands below in document flow
      ════════════════════════════════════════════════════ */}
      {activeId && (
        <DetailPanel key={activeId} id={activeId} onClose={() => setActiveId(null)} />
      )}
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
  {
    icon: Search, title: "Pesquisa & Análise de dados", tagline: "Mestres em decifrar comportamentos.",
    desc: "Precisa de ajuda com o Typeform ou quer entender o que um dashboard está dizendo? Realizamos pesquisas quantitativas e qualitativas com leads, membros (e até piratas!) para mapear dores e gerar insights reais.",
    quemChamar: ["Ana Beatriz", "Hiago", "Ariadne"],
  },
  {
    icon: Monitor, title: "Plataformas & Tecnologia", tagline: "Sua ideia funcionando sem bugs.",
    desc: "Encontrou um erro na plataforma de aulas ou em algum de nossos sites? Nós sabemos como construir e ajustar cada detalhe técnico.",
    quemChamar: ["Elane", "Hiago", "Armando", "Éria", "Mateus", "Ana Beatriz"],
  },
  {
    icon: Palette, title: "Design (Físico & Digital)", tagline: "Identidade visual e experiência tangível.",
    desc: "Da estética impecável da AUVP em mídias digitais e OOH, aos produtos que nossos membros amam usar. Se você precisa de cores, logos da AUVP, fotos do Raul, elementos visuais ou quer criar brindes, como meias e bonés a kits exclusivos, este é o lugar.",
    quemChamar: ["Armando", "Éria"],
  },
  {
    icon: PenTool, title: "Copy & Redação", tagline: "Estratégia em cada palavra.",
    desc: "De apostilas, roteiros de vídeo e mapas mentais a este texto que você lê agora. Quer revisar uma copy, um playbook ou criar materiais institucionais com narrativa estratégica? Nossa redação está pronta para ajudar.",
    quemChamar: ["Jeniffer", "Mateus", "Ana"],
  },
  {
    icon: BarChart2, title: "Monitoramento de mercado & CX", tagline: "Encantamento levado a sério.",
    desc: "Quem é nosso público e o que ele busca? Analisamos o mercado para sugerir melhorias e garantir que o CX seja mais do que uma sigla, criando conexões que encantam de verdade.",
    quemChamar: ["Beatriz Henriques", "Debora"],
  },
  {
    icon: Settings, title: "Produtividade & Gestão", tagline: "Fazemos projetos rodarem.",
    desc: "Planilhas, ClickUp, fluxos de trabalho e priorização. Se o desafio é gestão de tempo, de pessoas ou aumentar a eficiência do time, somos especialistas em transformar caos em projetos executados.",
    quemChamar: ["Beatriz Henriques", "Daniel", "Ariadne"],
  },
  {
    icon: Heart, title: "Relacionamento com membros", tagline: "Cuidando da nossa comunidade de ponta a ponta.",
    desc: "Seja mediando grupos de WhatsApp ou encontrando a resposta ideal para aquele membro que quer crescer conosco. Atuamos diretamente na linha de frente para garantir a melhor convivência.",
    quemChamar: ["Beatriz Henriques", "Debora"],
  },
];

// ─── Section helpers ──────────────────────────────────────────────────────────

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold font-roboto uppercase tracking-[0.15em] text-primary mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold font-anek text-foreground mb-2 leading-tight">
      {children}
    </h2>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TimePage() {
  const [teamRef, teamVisible] = useReveal(0.05);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <GlobalNav />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <div
        className="relative border-b overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(155 93% 11% / 0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(155 93% 11% / 0.04) 0%, transparent 50%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <SectionLabel>Time de Produto e CX</SectionLabel>
            <h1 className="text-5xl md:text-7xl font-bold font-anek text-foreground leading-[1.05] mb-6">
              Conheça o{" "}
              <span className="text-primary">time</span>
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

        {/* Nossa estrutura */}
        <div
          ref={teamRef}
          className={cn(
            "transition-all duration-700",
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <SectionLabel>Quem somos</SectionLabel>
          <SectionTitle>Nossa estrutura</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            {Object.keys(orgPeople).length} pessoas, uma direção — criar produtos que transformam a relação dos brasileiros com o dinheiro.
          </p>

          <OrgChart />
        </div>

        {/* Pillars */}
        <Section>
          <SectionLabel>Pilares</SectionLabel>
          <SectionTitle>O que sustenta nossas entregas</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            Nove princípios que orientam como trabalhamos, priorizamos e entregamos valor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
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

        {/* Network */}
        <Section>
          <SectionLabel>Rede interna</SectionLabel>
          <SectionTitle>A rede que nos conecta</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            Trabalhamos em parceria com todas as áreas da AUVP para garantir que produto e negócio andem juntos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {network.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card p-5 hover:shadow-sm hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <h3 className="font-bold font-anek text-foreground text-sm">{item.area}</h3>
                </div>
                <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Day-to-day */}
        <Section>
          <SectionLabel>Dia a dia</SectionLabel>
          <SectionTitle>O que fazemos no dia a dia</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            Conheça a atuação de cada especialista e saiba exatamente a quem recorrer para resolver seus desafios.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayToDay.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border bg-card p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold font-anek text-foreground leading-tight mb-0.5">{item.title}</h3>
                      <p className="text-sm font-semibold text-primary font-roboto leading-tight">{item.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
                  <div className="pt-3 border-t flex items-start gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-roboto shrink-0 mt-1.5">
                      Quem chamar:
                    </span>
                    {item.quemChamar.map((name) => (
                      <span
                        key={name}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold font-roboto"
                      >
                        {name}
                      </span>
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
          <p className="text-xs text-muted-foreground font-roboto">
            Time de Produto e CX — AUVP &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
