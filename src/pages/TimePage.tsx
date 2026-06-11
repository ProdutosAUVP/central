import React from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sun, Moon, ChevronDown, Mail, Linkedin,
  Target, Layers, GitBranch, Users, Compass,
  Lightbulb, BarChart2, Shield, Repeat, MessageCircle, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label={theme === "dark" ? "Tema claro" : "Tema escuro"} className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const leadership = [
  {
    name: "Raul Sena",
    role: "CEO & Fundador",
    area: "AUVP",
    initials: "RS",
    color: "bg-emerald-700",
  },
  {
    name: "Beatriz Henriques",
    role: "Head de Produto",
    area: "Produto",
    initials: "BH",
    color: "bg-emerald-600",
  },
  {
    name: "Daniel Machado",
    role: "Coordenador de Produto",
    area: "Produto",
    initials: "DM",
    color: "bg-teal-600",
  },
];

const team = [
  { name: "Ariadne Carneiro",    role: "Product Manager",       area: "Produto",       initials: "AR", color: "bg-slate-500" },
  { name: "Armando Custódio",    role: "Designer de Produtos",  area: "Produto",       initials: "AC", color: "bg-slate-500" },
  { name: "Éria Alencar",        role: "Designer de Produtos",  area: "Produto",       initials: "EA", color: "bg-slate-500" },
  { name: "Mateus Graff",        role: "Redator",               area: "Produto",       initials: "MG", color: "bg-slate-500" },
  { name: "Ana Beatriz",         role: "Assistente de Produto", area: "Produto",       initials: "AB", color: "bg-slate-500" },
  { name: "Hiago Felipe",        role: "Assistente de Produto", area: "Produto",       initials: "HF", color: "bg-slate-500" },
  { name: "Debora Sanders",      role: "Analista de Produto",   area: "Relacionamento",initials: "DS", color: "bg-slate-500" },
  { name: "Elane Rodrigues",     role: "Analista de Produto",   area: "Produto",       initials: "ER", color: "bg-slate-500" },
  { name: "Jeniffer Nascimento", role: "Analista de Produto",   area: "Produto",       initials: "JN", color: "bg-slate-500" },
];

const pilares = [
  { icon: Target, title: "Foco no Usuário", desc: "Todas as decisões de produto começam e terminam no usuário. Pesquisa, empatia e validação constante." },
  { icon: BarChart2, title: "Cultura de Dados", desc: "Decisões orientadas por métricas, experimentos e análise crítica de resultados." },
  { icon: Lightbulb, title: "Inovação Contínua", desc: "Incentivamos a curiosidade, a experimentação e o aprendizado com erros rápidos." },
  { icon: Layers, title: "Exceência Técnica", desc: "Código limpo, design consistente e arquitetura escalável são responsabilidade de todos." },
  { icon: MessageCircle, title: "Comunicação Aberta", desc: "Feedback honesto, discussões saudáveis e transparência em todas as direções." },
  { icon: Repeat, title: "Melhoria Iterativa", desc: "Entregamos valor incrementalmente, aprendemos com o mercado e ajustamos rapidamente." },
  { icon: Shield, title: "Responsabilidade", desc: "Donos dos resultados, não apenas das tarefas. Protagonismo e accountability em tudo." },
  { icon: Users, title: "Time Unido", desc: "Diversidade de perspectivas, inclusão ativa e uma cultura de suporte mútuo." },
  { icon: Globe, title: "Impacto Real", desc: "Medimos sucesso pelo impacto gerado na vida financeira dos brasileiros." },
];

const atuacao = [
  { title: "Definição de Estratégia de Produto", desc: "Alinhamos visão, OKRs e roadmap com as metas de negócio da AUVP." },
  { title: "Design de Experiência", desc: "Criamos interfaces intuitivas, acessíveis e consistentes com o Design System." },
  { title: "Desenvolvimento de Features", desc: "Desenvolvemos e mantemos as plataformas com qualidade e agilidade." },
  { title: "Pesquisa com Usuários", desc: "Realizamos entrevistas, testes e surveys para validar hipóteses continuamente." },
  { title: "Análise de Métricas", desc: "Monitoramos KPIs, comportamento de usuários e performance de funcionalidades." },
  { title: "Cultura e Processos", desc: "Mantemos a cultura de produto saudável através de rituais e boas práticas." },
  { title: "Colaboração Interdepartamental", desc: "Trabalhamos com Marketing, Comercial, Atendimento e outras áreas da AUVP." },
];

const conexoes = [
  { area: "Marketing", desc: "Campanhas, métricas de aquisição e posicionamento de produto." },
  { area: "Comercial", desc: "Feedback de vendas, proposta de valor e features para conversão." },
  { area: "Atendimento", desc: "Dores dos usuários, bugs reportados e oportunidades de melhoria." },
  { area: "Consultoria", desc: "Necessidades dos assessores e experiência da plataforma." },
  { area: "Capital Humano", desc: "Cultura organizacional, onboarding e desenvolvimento do time." },
  { area: "Financeiro", desc: "Budget de produto, ROI de features e planejamento." },
  { area: "Jurídico", desc: "Compliance, LGPD e regulatório de plataformas financeiras." },
  { area: "CEO", desc: "Visão estratégica, priorização e decisões de alto impacto." },
];

const processo = [
  { step: "01", title: "Discovery", desc: "Pesquisa de usuário, benchmarks, mapeamento de problemas e oportunidades." },
  { step: "02", title: "Definição", desc: "Priorização por impacto, alinhamento com stakeholders e escrita de especificações." },
  { step: "03", title: "Design", desc: "Prototipagem, validação com usuários e definição de UX/UI final." },
  { step: "04", title: "Desenvolvimento", desc: "Implementação iterativa com entregas semanais e code review." },
  { step: "05", title: "Lançamento", desc: "Deploy gradual, monitoramento de métricas e comunicação do lançamento." },
];

export default function TimePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <GlobalNav />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-12 space-y-20">

        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
            <Users className="h-3.5 w-3.5" /> Time de Produto
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-anek text-foreground mb-4">
            Construindo produtos que transformam
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-roboto">
            Somos o time responsável por criar, evoluir e entregar as plataformas que ajudam os brasileiros a investir melhor.
          </p>
        </section>

        {/* Organograma */}
        <section>
          <h2 className="text-2xl font-bold font-anek text-foreground mb-8 text-center">Organograma</h2>

          {/* Liderança */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            {leadership.map((person) => (
              <div key={person.name} className="flex flex-col items-center gap-2 p-5 rounded-xl border bg-card min-w-[160px] flex-1 max-w-[220px] mx-auto">
                <div className={cn("h-14 w-14 rounded-full flex items-center justify-center text-white font-bold font-anek text-lg", person.color)}>
                  {person.initials}
                </div>
                <div className="text-center">
                  <p className="font-bold font-anek text-foreground text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground font-roboto">{person.role}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-roboto">{person.area}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Linha de conexão visual */}
          <div className="flex justify-center mb-6">
            <div className="h-8 w-px bg-border" />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {team.map((person) => (
              <div key={person.name} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white font-bold font-anek text-sm shrink-0", person.color)}>
                  {person.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold font-anek text-foreground text-sm truncate">{person.name}</p>
                  <p className="text-xs text-muted-foreground font-roboto truncate">{person.role}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-roboto">{person.area}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pilares */}
        <section>
          <h2 className="text-2xl font-bold font-anek text-foreground mb-8 text-center">Nossos Pilares</h2>
          <Accordion type="multiple" className="w-full max-w-2xl mx-auto">
            {pilares.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <AccordionItem key={i} value={`pilar-${i}`}>
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-semibold font-anek text-foreground">{pilar.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground font-roboto pl-7">{pilar.desc}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>

        {/* Atuação */}
        <section>
          <h2 className="text-2xl font-bold font-anek text-foreground mb-8 text-center">Nossa Atuação</h2>
          <Accordion type="multiple" className="w-full max-w-2xl mx-auto">
            {atuacao.map((item, i) => (
              <AccordionItem key={i} value={`atuacao-${i}`}>
                <AccordionTrigger className="text-left font-semibold font-anek text-foreground">{item.title}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-roboto">{item.desc}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Conexões */}
        <section>
          <h2 className="text-2xl font-bold font-anek text-foreground mb-8 text-center">Conexões Internas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {conexoes.map((c, i) => (
              <div key={i} className="rounded-lg border bg-card p-4">
                <p className="font-bold font-anek text-foreground mb-1">{c.area}</p>
                <p className="text-xs text-muted-foreground font-roboto">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Processo */}
        <section>
          <h2 className="text-2xl font-bold font-anek text-foreground mb-8 text-center">Processo de Trabalho</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {processo.map((p, i) => (
              <div key={i} className="flex-1 rounded-lg border bg-card p-5 flex flex-col gap-2">
                <span className="text-3xl font-bold font-anek text-primary/30">{p.step}</span>
                <h3 className="font-bold font-anek text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-muted-foreground font-roboto">Time de Produto AUVP &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
