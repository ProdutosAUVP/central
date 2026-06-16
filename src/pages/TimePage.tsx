import React, { useState, useEffect, useRef } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

type Tier = "brain" | "star" | "one";

const leadership: { name: string; role: string; tier: Tier; initials: string }[] = [
  { name: "Raul Sena", role: "Sócio Responsável", tier: "brain", initials: "RS" },
  { name: "Beatriz Henriques", role: "Sócia — Diretora de Produto", tier: "brain", initials: "BH" },
  { name: "Daniel Machado", role: "Coordenador", tier: "brain", initials: "DM" },
];

const teamMembers: { name: string; role: string; tier: Tier; initials: string }[] = [
  { name: "Debora Sanders", role: "Analista de Produto Sr. II", tier: "star", initials: "DS" },
  { name: "Ariadne Carneiro", role: "Product Manager I", tier: "one", initials: "AC" },
  { name: "Armando Neto", role: "Designer de Produto Pl. I", tier: "one", initials: "AN" },
  { name: "Éria Alencar", role: "Designer de Produto Pl. I", tier: "one", initials: "EA" },
  { name: "Elane Rodrigues", role: "Analista de Produto Jr. I", tier: "one", initials: "ER" },
  { name: "Jeniffer Nascimento", role: "Analista de Produto Pl. I", tier: "one", initials: "JN" },
  { name: "Mateus Graff", role: "Redator Pl. I", tier: "one", initials: "MG" },
  { name: "Ana Beatriz Melo", role: "Assistente de Produto", tier: "one", initials: "AB" },
  { name: "Hiago Felipe Sousa", role: "Assistente de Produto", tier: "one", initials: "HF" },
];

const tierMeta: Record<Tier, { emoji: string; avatarClass: string; label: string }> = {
  brain: { emoji: "🧠", avatarClass: "bg-primary text-primary-foreground", label: "Liderança" },
  star: { emoji: "⭐", avatarClass: "bg-amber-500 text-white", label: "Sênior" },
  one: { emoji: "1️⃣", avatarClass: "bg-muted text-foreground", label: "Time" },
};

const pillars = [
  { emoji: "🔬", title: "Dados", desc: "Realizamos pesquisas com membros e leads, coletamos dados de desempenho e comportamento para tomar decisões que evoluam nossas entregas." },
  { emoji: "✏️", title: "Design", desc: "Desenhamos interfaces elegantes, protótipos e plataformas finais que garantem a experiência encantadora para cada usuário." },
  { emoji: "🚀", title: "Inovação", desc: "Mantemos o radar ligado no mercado para acompanhar tendências, boas práticas e ações de concorrentes, para estarmos sempre um passo à frente." },
  { emoji: "📄", title: "Priorização", desc: "Fazemos a gestão contínua do backlog de produto com base em dados de performance para priorizar demandas do negócio com necessidades reais dos membros." },
  { emoji: "🎯", title: "Conteúdo", desc: "Escrevemos e revisamos todos os conteúdos dos nossos produtos, além de e-mails, sites e materiais educativos com tom e voz alinhados com a marca." },
  { emoji: "🤝", title: "Colaboração cross", desc: "Atuamos como ponte entre diversas áreas da empresa para assegurar que todos os times estejam alinhados na direção estratégica dos projetos." },
  { emoji: "🎁", title: "Experiências", desc: "Não ficamos só no digital. Ativamos os cinco sentidos por meio do planejamento, desenho e produção de experiências com produtos físicos e eventos." },
  { emoji: "💬", title: "Comunidade", desc: "Fortalecemos o relacionamento com nossos membros por meio de uma comunidade ativa, fornecendo badges, campanhas e dinâmicas que estreitam laços." },
  { emoji: "💡", title: "Marketing de produto", desc: "Cuidamos da divulgação estratégica com domínio de ferramentas como sites e comunicação ativa na comunidade para agregar ainda mais valor." },
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
    emoji: "🔍",
    title: "Pesquisa & Análise de dados",
    tagline: "Mestres em decifrar comportamentos.",
    desc: "Precisa de ajuda com o Typeform ou quer entender o que um dashboard está dizendo? Realizamos pesquisas quantitativas e qualitativas com leads, membros (e até piratas!) para mapear dores e gerar insights reais.",
    quemChamar: ["Ana Beatriz", "Hiago", "Ariadne"],
  },
  {
    emoji: "💻",
    title: "Plataformas & Tecnologia",
    tagline: "Sua ideia funcionando sem bugs.",
    desc: "Encontrou um erro na plataforma de aulas ou em algum de nossos sites? Nós sabemos como construir e ajustar cada detalhe técnico.",
    quemChamar: ["Elane", "Hiago", "Armando", "Éria", "Mateus", "Ana Beatriz"],
  },
  {
    emoji: "🎨",
    title: "Design (Físico & Digital)",
    tagline: "Identidade visual e experiência tangível.",
    desc: "Da estética impecável da AUVP em mídias digitais e OOH, aos produtos que nossos membros amam usar. Se você precisa de cores, logos da AUVP, fotos do Raul, elementos visuais ou quer criar brindes, como meias e bonés a kits exclusivos, este é o lugar.",
    quemChamar: ["Armando", "Éria"],
  },
  {
    emoji: "✍️",
    title: "Copy & Redação",
    tagline: "Estratégia em cada palavra.",
    desc: "De apostilas, roteiros de vídeo e mapas mentais a este texto que você lê agora. Quer revisar uma copy, um playbook ou criar materiais institucionais com narrativa estratégica? Nossa redação está pronta para ajudar.",
    quemChamar: ["Jeniffer", "Mateus", "Ana"],
  },
  {
    emoji: "📊",
    title: "Monitoramento de mercado & CX",
    tagline: "Encantamento levado a sério.",
    desc: "Quem é nosso público e o que ele busca? Analisamos o mercado para sugerir melhorias e garantir que o CX seja mais do que uma sigla, criando conexões que encantam de verdade.",
    quemChamar: ["Beatriz Henriques", "Debora"],
  },
  {
    emoji: "⚙️",
    title: "Produtividade & Gestão",
    tagline: "Fazemos projetos rodarem.",
    desc: "Planilhas, ClickUp, fluxos de trabalho e priorização. Se o desafio é gestão de tempo, de pessoas ou aumentar a eficiência do time, somos especialistas em transformar caos em projetos executados.",
    quemChamar: ["Beatriz Henriques", "Daniel", "Ariadne"],
  },
  {
    emoji: "❤️",
    title: "Relacionamento com membros",
    tagline: "Cuidando da nossa comunidade de ponta a ponta.",
    desc: "Seja mediando grupos de WhatsApp ou encontrando a resposta ideal para aquele membro que quer crescer conosco. Atuamos diretamente na linha de frente para garantir a melhor convivência.",
    quemChamar: ["Beatriz Henriques", "Debora"],
  },
];

// ─── Person Card ──────────────────────────────────────────────────────────────

function PersonCard({
  person,
  large = false,
  onClick,
  delay = 0,
  visible = true,
}: {
  person: { name: string; role: string; tier: Tier; initials: string };
  large?: boolean;
  onClick?: () => void;
  delay?: number;
  visible?: boolean;
}) {
  const meta = tierMeta[person.tier];
  return (
    <button
      onClick={onClick}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "group w-full text-left rounded-2xl border bg-card transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        large
          ? "p-6 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
          : "p-4 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20",
        onClick && "cursor-pointer"
      )}
    >
      <div className={cn("flex gap-4", large ? "flex-col items-center text-center" : "items-center")}>
        <div className="relative shrink-0">
          <div
            className={cn(
              "rounded-full flex items-center justify-center font-bold font-anek",
              meta.avatarClass,
              large ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm"
            )}
          >
            {person.initials}
          </div>
          <span
            className={cn(
              "absolute -bottom-1 -right-1 leading-none select-none",
              large ? "text-lg" : "text-xs"
            )}
            aria-hidden
          >
            {meta.emoji}
          </span>
        </div>
        <div className="min-w-0">
          <p className={cn("font-bold font-anek text-foreground leading-tight", large ? "text-base" : "text-sm")}>
            {person.name}
          </p>
          <p className={cn("text-muted-foreground font-roboto leading-snug mt-0.5", large ? "text-sm" : "text-xs")}>
            {person.role}
          </p>
        </div>
      </div>
    </button>
  );
}

// ─── Section wrapper with reveal ─────────────────────────────────────────────

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
  const [selected, setSelected] = useState<(typeof teamMembers)[0] | null>(null);
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
        {/* dot grid */}
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
            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground font-roboto">
              <div className="flex items-center gap-2">
                <span className="text-base">🧠</span>
                <span>Liderança</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">⭐</span>
                <span>Sênior</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">1️⃣</span>
                <span>Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-16 space-y-24">

        {/* Team */}
        <div ref={teamRef}>
          <SectionLabel>Quem somos</SectionLabel>
          <SectionTitle>Nossa estrutura</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            {leadership.length + teamMembers.length} pessoas, uma direção — criar produtos que transformam a relação dos brasileiros com o dinheiro.
          </p>

          {/* Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {leadership.map((p, i) => (
              <PersonCard
                key={p.name}
                person={p}
                large
                visible={teamVisible}
                delay={i * 80}
                onClick={() => setSelected(p as typeof teamMembers[0])}
              />
            ))}
          </div>

          {/* Connector */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center gap-1">
              <div className="h-6 w-px bg-border" />
              <div className="h-2 w-2 rounded-full bg-border" />
            </div>
          </div>

          {/* Rest of team */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {teamMembers.map((p, i) => (
              <PersonCard
                key={p.name}
                person={p}
                visible={teamVisible}
                delay={300 + i * 60}
                onClick={() => setSelected(p)}
              />
            ))}
          </div>
        </div>

        {/* Person detail dialog */}
        <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <DialogContent className="max-w-sm">
            {selected && (() => {
              const meta = tierMeta[selected.tier];
              return (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-4 mb-1">
                      <div className="relative shrink-0">
                        <div className={cn("h-14 w-14 rounded-full flex items-center justify-center font-bold font-anek text-lg", meta.avatarClass)}>
                          {selected.initials}
                        </div>
                        <span className="absolute -bottom-1 -right-1 text-base" aria-hidden>{meta.emoji}</span>
                      </div>
                      <div>
                        <DialogTitle className="font-anek text-foreground leading-tight">{selected.name}</DialogTitle>
                        <p className="text-sm text-muted-foreground font-roboto mt-0.5">{selected.role}</p>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-roboto">{meta.label}</span>
                      </div>
                    </div>
                  </DialogHeader>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>

        {/* Pillars */}
        <Section>
          <SectionLabel>Pilares</SectionLabel>
          <SectionTitle>O que sustenta nossas entregas</SectionTitle>
          <p className="text-muted-foreground font-roboto mb-10 max-w-xl">
            Nove princípios que orientam como trabalhamos, priorizamos e entregamos valor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pilar, i) => (
              <div
                key={i}
                className="group rounded-2xl border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl leading-none shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    {pilar.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold font-anek text-foreground mb-2 leading-tight">{pilar.title}</h3>
                    <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{pilar.desc}</p>
                  </div>
                </div>
              </div>
            ))}
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
            {dayToDay.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl leading-none shrink-0 mt-0.5">{item.emoji}</div>
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
            ))}
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
