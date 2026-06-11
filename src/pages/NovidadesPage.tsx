import React, { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label={theme === "dark" ? "Tema claro" : "Tema escuro"} className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

interface Novidade {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  date: string;
  autor: string;
  detalhes: string;
}

const novidades: Novidade[] = [
  {
    tag: "Design System",
    tagColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    title: "Novos componentes de data viz",
    desc: "Paleta de 8 cores otimizada para gráficos de pizza, barras e linhas com suporte a dark mode.",
    date: "Mai 2025",
    autor: "Armando Custódio",
    detalhes: "A atualização inclui tokens de cor dedicados para visualização de dados, garantindo contraste adequado tanto no tema claro quanto no escuro. Os novos componentes já estão disponíveis no Storybook e documentados no Design System com exemplos interativos.",
  },
  {
    tag: "Tom e Voz",
    tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    title: "Manual atualizado com novos produtos",
    desc: "Agro, Analítica, Câmbio e Seguros ganham seções de tom e voz específicas.",
    date: "Abr 2025",
    autor: "Mateus Graff",
    detalhes: "Cada novo produto recebeu diretrizes de linguagem, exemplos de erros e correções, e tabela de palavras proibidas vs. recomendadas. O manual completo está acessível pelo menu de navegação global em Tom e Voz.",
  },
  {
    tag: "Time",
    tagColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    title: "Organograma atualizado",
    desc: "Novos membros no time de Produto. Veja quem é quem e como nos conectamos.",
    date: "Mar 2025",
    autor: "Beatriz Henriques",
    detalhes: "O organograma reflete a estrutura atual com liderança (Raul Sena, Beatriz Henriques e Daniel Machado) e todos os membros do time, incluindo designers, PMs, redator e analistas. Acesse a página Time de Produto pelo menu.",
  },
  {
    tag: "AUVP Escola",
    tagColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    title: "Documentação completa do produto publicada",
    desc: "Proposta de valor, módulos, comunidade, ferramentas e PIAR agora documentados na Central.",
    date: "Jun 2025",
    autor: "Ariadne Carneiro",
    detalhes: "A documentação da AUVP Escola já está disponível na Central e inclui: proposta de valor, formato de liberação dos módulos, tempo de acesso, regras de reembolso, comunidade, Taxa Private, Diagrama do Cerrado, ferramentas de apoio e o PIAR. Acesse pelo Hub.",
  },
  {
    tag: "Central",
    tagColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    title: "Deploy no GitHub Pages",
    desc: "A Central de Produto está publicada em produção com CI/CD automatizado.",
    date: "Jun 2025",
    autor: "Daniel Machado",
    detalhes: "O pipeline de CI/CD via GitHub Actions realiza o build e deploy automaticamente a cada merge na branch main. A Central está disponível em https://produtosauvp.github.io/central/ com roteamento SPA configurado.",
  },
  {
    tag: "Roadmap",
    tagColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
    title: "Página de Roadmap lançada",
    desc: "Visualize entregas por trimestre com filtros por produto e status.",
    date: "Jun 2025",
    autor: "Hiago Felipe",
    detalhes: "O Roadmap reúne todas as entregas em andamento, planejadas e futuras em um único lugar. É possível filtrar por produto (Design System, AUVP Escola, Analítica etc.) e por status (Concluído, Em progresso, Planejado, Futuro).",
  },
  {
    tag: "Design System",
    tagColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    title: "CodeBlock com suporte a múltiplas linguagens",
    desc: "O componente CodeBlock agora suporta tabs de React, HTML, CSS e JS simultaneamente.",
    date: "Fev 2025",
    autor: "Armando Custódio",
    detalhes: "Cada widget do Design System agora exibe o código de implementação em múltiplas linguagens via tabs. Isso facilita a adoção por times com diferentes stacks, sem necessidade de consultar documentação externa.",
  },
  {
    tag: "Processo",
    tagColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    title: "Rituais de sprint revisados",
    desc: "Planning, review e retrospectiva com novos formatos para aumentar a objetividade.",
    date: "Jan 2025",
    autor: "Beatriz Henriques",
    detalhes: "Os rituais de sprint passaram por uma revisão baseada em feedback do time. Planning agora usa o formato de estimativa por pontos com referência visual. Review passou a incluir demo gravada. Retro usa o formato \"Continuar, Parar, Começar\".",
  },
];

const allTags = ["Todas", ...Array.from(new Set(novidades.map((n) => n.tag))).sort()];

export default function NovidadesPage() {
  const [filtro, setFiltro] = useState("Todas");

  const filtered = filtro === "Todas" ? novidades : novidades.filter((n) => n.tag === filtro);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <GlobalNav />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-12 space-y-8">

        {/* Hero */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
            <Newspaper className="h-3.5 w-3.5" /> Novidades
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">
            Novidades do Time de Produto
          </h1>
          <p className="text-muted-foreground font-roboto max-w-2xl">
            Atualizações, lançamentos e melhorias entregues pelo time. Fique por dentro do que está acontecendo.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFiltro(tag)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold font-roboto border transition-colors",
                filtro === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((n, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-roboto", n.tagColor)}>
                  {n.tag}
                </span>
                <span className="text-xs text-muted-foreground font-roboto">{n.date}</span>
              </div>
              <div>
                <h3 className="font-bold font-anek text-foreground mb-1 leading-snug">{n.title}</h3>
                <p className="text-sm text-muted-foreground font-roboto leading-relaxed">{n.desc}</p>
              </div>
              <p className="text-xs text-foreground/70 font-roboto leading-relaxed border-t pt-3">
                {n.detalhes}
              </p>
              <p className="text-[11px] text-muted-foreground font-roboto">
                Por <span className="font-semibold text-foreground">{n.autor}</span>
              </p>
            </div>
          ))}
        </div>

      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground font-roboto">Novidades — Time de Produto AUVP &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
