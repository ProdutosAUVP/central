import React, { useState, useEffect, useRef } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sun, Moon,
  Database, Palette, Rocket, ListOrdered, FileText, Users, Gift, MessageCircle, Lightbulb,
  Search, Monitor, PenTool, BarChart2, Settings, Heart, X,
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

// ─── Org Chart Data ────────────────────────────────────────────────────────────

type OrgColor = "ceo" | "director" | "coordinator" | "cx" | "product";

interface OrgPerson {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: OrgColor;
  description: string;
  responsibilities: string[];
}

const orgPeople: Record<string, OrgPerson> = {
  raul: {
    id: "raul", name: "Raul Sena", role: "Fundador e CEO", initials: "RS", color: "ceo",
    description: "Placeholder: Visionário e fundador da AUVP, responsável pela direção estratégica e crescimento da empresa.",
    responsibilities: ["Visão e estratégia da empresa", "Cultura organizacional", "Parcerias estratégicas", "Decisões de alto impacto"],
  },
  beatriz: {
    id: "beatriz", name: "Beatriz Henriques", role: "Sócia e Diretora de Produto", initials: "BH", color: "director",
    description: "Placeholder: Dirige o time de produto e CX, conectando visão de negócio com execução de produto.",
    responsibilities: ["Direção estratégica de produto", "Gestão e desenvolvimento do time", "CX estratégico", "Alinhamento cross-funcional"],
  },
  lilian: {
    id: "lilian", name: "Lilian Machado", role: "Especialista em CX", initials: "LM", color: "cx",
    description: "Placeholder: Especialista em experiência do cliente, responsável pelo relacionamento e satisfação dos membros.",
    responsibilities: ["Estratégia de relacionamento com membros", "Mapeamento da jornada do cliente", "Monitoramento de satisfação (NPS)", "Projetos especiais de CX"],
  },
  daniel: {
    id: "daniel", name: "Daniel Machado", role: "Coordenador de produto", initials: "DM", color: "coordinator",
    description: "Placeholder: Coordena as iniciativas de produto, liderando designers, redatores e analistas no dia a dia.",
    responsibilities: ["Gestão de backlog e roadmap", "Coordenação de squads", "Acompanhamento de entregas", "Rituais de produto"],
  },
  debora: {
    id: "debora", name: "Debora Sanders", role: "Analista de CX Sr. II", initials: "DS", color: "cx",
    description: "Placeholder: Analista sênior de CX, referência no time em pesquisa de usuário e análise de experiência.",
    responsibilities: ["Pesquisa de usuário (quali e quanti)", "Análise de jornada e touchpoints", "Benchmarking de CX", "Mentoria do time de CX"],
  },
  ariadne: {
    id: "ariadne", name: "Ariadne Carneiro", role: "Gerente de produto", initials: "AC", color: "product",
    description: "Placeholder: Gerente de produto responsável por roadmap, priorização e entrega de valor para os membros.",
    responsibilities: ["Definição de roadmap", "Priorização de features", "Gestão de OKRs", "Alinhamento com stakeholders"],
  },
  armando: {
    id: "armando", name: "Armando Neto", role: "Designer de Produto Pl. I", initials: "AN", color: "product",
    description: "Placeholder: Designer de produto pleno, responsável por interfaces digitais e protótipos de alta fidelidade.",
    responsibilities: ["UI/UX Design", "Prototipação e wireframes", "Design system", "Colaboração em pesquisas"],
  },
  eria: {
    id: "eria", name: "Éria Alencar", role: "Designer de Produto Pl. I", initials: "EA", color: "product",
    description: "Placeholder: Designer de produto pleno com foco em design visual e experiência do usuário.",
    responsibilities: ["Visual design e identidade", "UX research", "Motion e micro-interações", "Assets para marketing"],
  },
  mateus: {
    id: "mateus", name: "Mateus Graff", role: "Redator Pl. I", initials: "MG", color: "product",
    description: "Placeholder: Redator de produto pleno, responsável por conteúdo estratégico e copywriting dos produtos.",
    responsibilities: ["Copywriting de produto", "Apostilas e materiais educativos", "Roteiros e conteúdo audiovisual", "Revisão editorial"],
  },
  jeniffer: {
    id: "jeniffer", name: "Jeniffer Nascimento", role: "Analista de Produto Pl. I", initials: "JN", color: "product",
    description: "Placeholder: Analista de produto pleno, focada em análise de dados, requisitos e documentação de produto.",
    responsibilities: ["Análise de dados e métricas", "Levantamento de requisitos", "Documentação de produto", "Suporte ao gerente de produto"],
  },
  elane: {
    id: "elane", name: "Elane Rodrigues", role: "Analista de Produto Jr. I", initials: "ER", color: "product",
    description: "Placeholder: Analista de produto júnior, apoia nas análises e pesquisas do time de produto.",
    responsibilities: ["Pesquisa e coleta de dados", "Análise de métricas básicas", "Suporte ao PM e analistas", "Documentação operacional"],
  },
  ana: {
    id: "ana", name: "Ana Beatriz Melo", role: "Assistente de Produto", initials: "AB", color: "product",
    description: "Placeholder: Assistente de produto, apoia diversas frentes do time com organização e execução.",
    responsibilities: ["Suporte operacional ao time", "Pesquisa assistida", "Organização de processos", "Comunicação interna"],
  },
  hiago: {
    id: "hiago", name: "Hiago Felipe Sousa", role: "Assistente de Produto", initials: "HF", color: "product",
    description: "Placeholder: Assistente de produto, contribui com as demandas do time e desenvolvimento de entregas.",
    responsibilities: ["Suporte às demandas do time", "Análise básica de dados", "Criação de documentações", "Apoio em pesquisas"],
  },
};

const colorMap: Record<OrgColor, { card: string; initials: string }> = {
  ceo:         { card: "bg-[#6B1F1F] border-[#6B1F1F] text-white",                                                               initials: "bg-[#8B2A2A] text-white" },
  director:    { card: "bg-[#2A1F6B] border-[#2A1F6B] text-white",                                                               initials: "bg-[#3A2D8C] text-white" },
  coordinator: { card: "bg-[#1A4D25] border-[#1A4D25] text-white",                                                               initials: "bg-[#226330] text-white" },
  cx:          { card: "bg-purple-100 border-purple-300 text-purple-900 dark:bg-purple-950 dark:border-purple-700 dark:text-purple-100", initials: "bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100" },
  product:     { card: "bg-[#1A4D25] border-[#1A4D25] text-white",                                                               initials: "bg-[#226330] text-white" },
};

// ─── Org Node ─────────────────────────────────────────────────────────────────

function OrgNode({
  id,
  activeId,
  onToggle,
  compact = false,
  panelSide = "bottom",
}: {
  id: string;
  activeId: string | null;
  onToggle: (id: string) => void;
  compact?: boolean;
  panelSide?: "bottom" | "left" | "right";
}) {
  const person = orgPeople[id];
  const isActive = activeId === id;
  const c = colorMap[person.color];

  return (
    <div className="relative flex flex-col items-center" data-org-node>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(id); }}
        className={cn(
          "rounded-lg border-2 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          compact ? "px-2.5 py-1.5 min-w-[120px] max-w-[140px]" : "px-3 py-2.5 min-w-[148px] max-w-[168px]",
          c.card,
          isActive ? "ring-2 ring-white/60 ring-offset-1 scale-[1.04] shadow-lg" : "hover:brightness-110 hover:shadow-md"
        )}
      >
        <div className={cn("font-bold font-anek leading-tight", compact ? "text-[11px]" : "text-xs")}>
          {person.name}
        </div>
        <div className={cn("font-roboto leading-tight mt-0.5 opacity-85", compact ? "text-[9px]" : "text-[10px]")}>
          {person.role}
        </div>
      </button>

      {/* Detail panel */}
      {isActive && (
        <div
          className={cn(
            "absolute z-50 w-64 rounded-xl border bg-card shadow-2xl p-4 text-left",
            panelSide === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            panelSide === "left"   && "right-full top-0 mr-3",
            panelSide === "right"  && "left-full top-0 ml-3",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-bold font-anek text-foreground text-sm leading-tight">{person.name}</p>
              <p className="text-xs text-primary font-roboto font-semibold mt-0.5">{person.role}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(id); }}
              className="shrink-0 text-muted-foreground hover:text-foreground mt-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground font-roboto leading-relaxed mb-3">{person.description}</p>
          <ul className="space-y-1.5">
            {person.responsibilities.map((r) => (
              <li key={r} className="text-xs text-foreground font-roboto flex gap-1.5 items-start">
                <span className="mt-[5px] h-1 w-1 rounded-full bg-primary shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Connectors ───────────────────────────────────────────────────────────────

function VLine({ h = 6 }: { h?: number }) {
  return <div className="w-px bg-border mx-auto" style={{ height: `${h * 4}px` }} />;
}


// ─── Full Org Chart ────────────────────────────────────────────────────────────

function OrgChart() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-org-node]")) setActiveId(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className="overflow-x-auto pb-6 -mx-4 px-4">
      <div className="min-w-[820px] select-none">

        {/* ── LIDERANÇA E ESPECIALISTAS ── */}
        <div className="relative flex flex-col items-center">

          {/* CEO */}
          <OrgNode id="raul" activeId={activeId} onToggle={toggle} panelSide="bottom" />
          <VLine h={7} />

          {/* Beatriz row with Lilian side-branch */}
          <div className="relative w-full flex justify-center items-start">
            {/* Lilian – left side via dashed line */}
            <div className="absolute right-[calc(50%+108px)] flex items-center gap-0">
              <OrgNode id="lilian" activeId={activeId} onToggle={toggle} compact panelSide="left" />
              <div className="flex flex-col items-center ml-2 mr-1">
                <span className="text-[8px] font-roboto font-bold tracking-widest text-muted-foreground mb-0.5">
                  RELACIONAMENTO
                </span>
                <div className="w-20 border-t-2 border-dashed border-muted-foreground/50" />
              </div>
            </div>
            <OrgNode id="beatriz" activeId={activeId} onToggle={toggle} panelSide="bottom" />
          </div>

          {/* Beatriz → Daniel connector with PRODUTO label */}
          <div className="flex flex-col items-center">
            <VLine h={4} />
            <span className="text-[8px] font-roboto font-bold tracking-[0.18em] text-muted-foreground">PRODUTO</span>
            <VLine h={4} />
          </div>

          {/* Daniel */}
          <OrgNode id="daniel" activeId={activeId} onToggle={toggle} panelSide="bottom" />
        </div>

        {/* ── Branch connectors from Daniel down ── */}
        <div className="relative" style={{ height: "24px" }}>
          {/* Vertical from Daniel */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-border" />
          {/* Horizontal bar spanning the 4 columns */}
          <div className="absolute top-full -translate-y-px left-[12.5%] right-[12.5%] h-px bg-border" />
        </div>

        {/* ── SENIOR / PLENO / JUNIOR levels ── */}
        <div className="grid grid-cols-4 gap-3 mt-0">

          {/* ── Col 1: DESIGNERS ── */}
          <div className="flex flex-col items-center gap-0">
            <VLine h={6} />
            <span className="text-[8px] font-bold font-roboto tracking-widest text-muted-foreground mb-2">DESIGNERS</span>

            {/* SENIOR */}
            <OrgNode id="debora" activeId={activeId} onToggle={toggle} compact panelSide="right" />

            {/* SENIOR → PLENO connector */}
            <VLine h={5} />
            {/* Horizontal to two children */}
            <div className="relative w-[calc(50%+32px)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-border" />
            </div>

            {/* PLENO row */}
            <div className="flex gap-2 mt-0">
              <div className="flex flex-col items-center">
                <VLine h={5} />
                <OrgNode id="armando" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
              </div>
              <div className="flex flex-col items-center">
                <VLine h={5} />
                <OrgNode id="eria" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
              </div>
            </div>
          </div>

          {/* ── Col 2: REDATOR ── */}
          <div className="flex flex-col items-center">
            <VLine h={6} />
            <span className="text-[8px] font-bold font-roboto tracking-widest text-muted-foreground mb-2">REDATOR</span>
            {/* Spacer to align with SENIOR level row */}
            <div style={{ height: "44px" }} />
            <VLine h={5} />
            {/* PLENO */}
            <OrgNode id="mateus" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
          </div>

          {/* ── Col 3: ANALISTAS ── */}
          <div className="flex flex-col items-center">
            <VLine h={6} />
            <span className="text-[8px] font-bold font-roboto tracking-widest text-muted-foreground mb-2">ANALISTAS</span>

            {/* SENIOR */}
            <OrgNode id="ariadne" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />

            {/* SENIOR → PLENO connector */}
            <VLine h={5} />
            <div className="relative w-[calc(50%+32px)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-border" />
            </div>

            {/* PLENO + JUNIOR */}
            <div className="flex gap-2 mt-0">
              <div className="flex flex-col items-center">
                <VLine h={5} />
                <OrgNode id="jeniffer" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
              </div>
              <div className="flex flex-col items-center">
                <VLine h={5} />
                <OrgNode id="elane" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
              </div>
            </div>
          </div>

          {/* ── Col 4: ASSISTENTES ── */}
          <div className="flex flex-col items-center">
            <VLine h={6} />
            <span className="text-[8px] font-bold font-roboto tracking-widest text-muted-foreground mb-2">ASSISTENTES</span>
            {/* Spacer to align with SENIOR level row */}
            <div style={{ height: "44px" }} />
            <VLine h={5} />
            <div className="relative w-[calc(50%+32px)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-border" />
            </div>
            {/* JUNIOR */}
            <div className="flex gap-2 mt-0">
              <div className="flex flex-col items-center">
                <VLine h={5} />
                <OrgNode id="ana" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
              </div>
              <div className="flex flex-col items-center">
                <VLine h={5} />
                <OrgNode id="hiago" activeId={activeId} onToggle={toggle} compact panelSide="bottom" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Level legend ── */}
        <div className="mt-10 pt-6 border-t flex flex-wrap gap-x-6 gap-y-2">
          {[
            { color: "bg-[#6B1F1F]", label: "CEO" },
            { color: "bg-[#2A1F6B]", label: "Diretoria" },
            { color: "bg-purple-200 dark:bg-purple-900", label: "CX / Especialista", textColor: "text-purple-900 dark:text-purple-100" },
            { color: "bg-[#1A4D25]", label: "Time de Produto" },
          ].map(({ color, label, textColor }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={cn("h-2.5 w-2.5 rounded-sm border border-white/20", color)} />
              <span className={cn("text-[10px] font-roboto text-muted-foreground", textColor)}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-[10px] font-roboto text-muted-foreground italic">Clique em qualquer pessoa para ver detalhes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Other data ────────────────────────────────────────────────────────────────

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
    icon: Search,
    title: "Pesquisa & Análise de dados",
    tagline: "Mestres em decifrar comportamentos.",
    desc: "Precisa de ajuda com o Typeform ou quer entender o que um dashboard está dizendo? Realizamos pesquisas quantitativas e qualitativas com leads, membros (e até piratas!) para mapear dores e gerar insights reais.",
    quemChamar: ["Ana Beatriz", "Hiago", "Ariadne"],
  },
  {
    icon: Monitor,
    title: "Plataformas & Tecnologia",
    tagline: "Sua ideia funcionando sem bugs.",
    desc: "Encontrou um erro na plataforma de aulas ou em algum de nossos sites? Nós sabemos como construir e ajustar cada detalhe técnico.",
    quemChamar: ["Elane", "Hiago", "Armando", "Éria", "Mateus", "Ana Beatriz"],
  },
  {
    icon: Palette,
    title: "Design (Físico & Digital)",
    tagline: "Identidade visual e experiência tangível.",
    desc: "Da estética impecável da AUVP em mídias digitais e OOH, aos produtos que nossos membros amam usar. Se você precisa de cores, logos da AUVP, fotos do Raul, elementos visuais ou quer criar brindes, como meias e bonés a kits exclusivos, este é o lugar.",
    quemChamar: ["Armando", "Éria"],
  },
  {
    icon: PenTool,
    title: "Copy & Redação",
    tagline: "Estratégia em cada palavra.",
    desc: "De apostilas, roteiros de vídeo e mapas mentais a este texto que você lê agora. Quer revisar uma copy, um playbook ou criar materiais institucionais com narrativa estratégica? Nossa redação está pronta para ajudar.",
    quemChamar: ["Jeniffer", "Mateus", "Ana"],
  },
  {
    icon: BarChart2,
    title: "Monitoramento de mercado & CX",
    tagline: "Encantamento levado a sério.",
    desc: "Quem é nosso público e o que ele busca? Analisamos o mercado para sugerir melhorias e garantir que o CX seja mais do que uma sigla, criando conexões que encantam de verdade.",
    quemChamar: ["Beatriz Henriques", "Debora"],
  },
  {
    icon: Settings,
    title: "Produtividade & Gestão",
    tagline: "Fazemos projetos rodarem.",
    desc: "Planilhas, ClickUp, fluxos de trabalho e priorização. Se o desafio é gestão de tempo, de pessoas ou aumentar a eficiência do time, somos especialistas em transformar caos em projetos executados.",
    quemChamar: ["Beatriz Henriques", "Daniel", "Ariadne"],
  },
  {
    icon: Heart,
    title: "Relacionamento com membros",
    tagline: "Cuidando da nossa comunidade de ponta a ponta.",
    desc: "Seja mediando grupos de WhatsApp ou encontrando a resposta ideal para aquele membro que quer crescer conosco. Atuamos diretamente na linha de frente para garantir a melhor convivência.",
    quemChamar: ["Beatriz Henriques", "Debora"],
  },
];

// ─── Section wrapper with reveal ─────────────────────────────────────────────

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

        {/* Nossa estrutura – Org Chart */}
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
                  <p className="text-sm text-muted-foreground font-roboto leading-relaxed">
                    {item.desc}
                  </p>
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
