import React from "react";
import { Link } from "react-router-dom";
import { GlobalNav } from "@/components/GlobalNav";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  BookOpen, Palette, Volume2, Users, ExternalLink,
  Sun, Moon, ChevronRight, Newspaper, Zap,
  BarChart3, GraduationCap, MessageSquare, Settings,
  FileText, Lightbulb, Gift, Trophy
} from "lucide-react";
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
  { label: "Design System", desc: "Componentes e tokens", icon: Palette, to: "/design-system", internal: true },
  { label: "Tom e Voz", desc: "Guia de comunicação", icon: Volume2, to: "/tom-e-voz", internal: true },
  { label: "Time de Produto", desc: "Organograma e pilares", icon: Users, to: "/time", internal: true },
  { label: "Figma", desc: "Arquivos de design", icon: ExternalLink, href: "https://figma.com", internal: false },
  { label: "GitHub", desc: "Repositórios", icon: ExternalLink, href: "https://github.com/produtosauvp", internal: false },
  { label: "Notion", desc: "Documentações", icon: FileText, href: "#", internal: false },
  { label: "Analytics", desc: "Métricas de produto", icon: BarChart3, href: "#", internal: false },
  { label: "AUVP Escola", desc: "Plataforma de cursos", icon: GraduationCap, to: "/escola", internal: true, newTab: true },
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

const faqs = [
  { q: "Como acesso o Design System?", a: "Clique em 'Design System' nos Acessos Rápidos ou use o menu de navegação global no canto superior esquerdo." },
  { q: "O que é o Manual de Tom e Voz?", a: "É o guia de comunicação verbal da AUVP, com diretrizes de linguagem para cada área e produto da empresa." },
  { q: "Como sugiro um novo componente?", a: "Abra uma issue no repositório do Design System no GitHub ou entre em contato com o time de Produto." },
  { q: "Com que frequência o Design System é atualizado?", a: "O Design System é atualizado continuamente. Novidades são comunicadas na seção 'Novidades do Mês' desta Central." },
];

export default function Hub() {
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

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
        {/* Hero */}
        <section>
          <p className="text-sm text-muted-foreground font-roboto mb-2">{todayCapitalized}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">
            Central AUVP
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Hub interno do Time de Produto. Encontre ferramentas, documentações, o time e os sistemas em um único lugar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/design-system" className="inline-flex items-center gap-2 h-10 px-5 rounded-[5px] bg-primary text-primary-foreground text-sm font-semibold font-sora uppercase border border-primary hover:bg-transparent hover:text-primary transition-all">
              <Palette className="h-4 w-4" />
              Design System
            </Link>
            <Link to="/time" className="inline-flex items-center gap-2 h-10 px-5 rounded-[5px] border border-input bg-background text-foreground text-sm font-semibold font-sora uppercase hover:bg-accent hover:text-accent-foreground transition-all">
              <Users className="h-4 w-4" />
              Conhecer o Time
            </Link>
          </div>
        </section>

        {/* Novidades */}
        <section>
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-bold font-anek text-foreground">Novidades do Mês</h2>
            </div>
            <Link to="/roadmap" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold font-roboto text-primary hover:underline">
              Ver mais <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {novidades.map((n, i) => (
              <div key={i} className="rounded-lg border bg-card p-5 flex flex-col gap-3">
                <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit font-roboto", n.tagColor)}>{n.tag}</span>
                <h3 className="font-semibold font-anek text-foreground leading-snug">{n.title}</h3>
                <p className="text-sm text-muted-foreground font-roboto leading-relaxed flex-1">{n.desc}</p>
                <p className="text-xs text-muted-foreground font-roboto">{n.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Acessos Rápidos */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold font-anek text-foreground">Acessos Rápidos</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {accessLinks.map((link, i) => {
              const Icon = link.icon;
              const content = (
                <div className="rounded-lg border bg-card p-4 flex flex-col gap-2 hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    {!link.internal && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="font-semibold font-anek text-sm text-foreground">{link.label}</p>
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

        {/* Produtos */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold font-anek text-foreground">Produtos Internos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {produtos.map((p, i) => {
              const card = (
                <div className={cn("rounded-lg border bg-card p-4 flex flex-col gap-2 h-full", p.to && "hover:bg-muted/50 transition-colors cursor-pointer")}>
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

        {/* Docs e Playbooks */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold font-anek text-foreground">Documentações e Playbooks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {docs.map((d, i) => {
              const Icon = d.icon;
              return (
                <a key={i} href={d.href} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  <span className="text-sm font-medium text-foreground">{d.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </a>
              );
            })}
          </div>
        </section>

        {/* Benefícios */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Gift className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold font-anek text-foreground">Benefícios e Campanhas</h2>
          </div>
          <div className="rounded-lg border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground text-sm font-roboto">Em breve — benefícios e campanhas internas do time.</p>
          </div>
        </section>

        {/* Gamificação */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold font-anek text-foreground">Gamificação</h2>
          </div>
          <div className="rounded-lg border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground text-sm font-roboto">Em breve — ranking, conquistas e reconhecimento do time.</p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold font-anek text-foreground">Perguntas Frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-2xl">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-medium font-roboto text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-roboto">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-muted-foreground font-roboto">Central AUVP — Time de Produto &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
