import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";
import { olhoBranco, olhoPreto } from "@/assets/olhos";
import {
  ChevronDown, Search, Bell, Gift, HelpCircle, User, ExternalLink,
  BarChart3, Wallet, BookOpen, Calculator, Users, Video, GraduationCap,
  LineChart, Sparkles, LifeBuoy, FileText, ArrowRight, Menu as MenuIcon,
  Command, Sun,
} from "lucide-react";

/**
 * Catálogo de menus superiores
 * ----------------------------
 * Seis modelos independentes de navegação de topo para apresentar à
 * liderança. Cada um resolve o problema de um jeito diferente (institucional,
 * catálogo, produto SaaS, portal, marketing e app) — não são variações de um
 * mesmo componente, e a ideia é escolher um ou dois depois da apresentação.
 *
 * Os modelos são NAVEGÁVEIS de verdade: cada item leva a uma "página" dentro
 * da moldura, os painéis abrem e fecham no clique, no teclado (Esc) e ao
 * clicar fora, e o item ativo fica marcado com aria-current.
 *
 * IMPORTANTE — o ComponentShowcase tem `overflow-hidden` na raiz, então
 * qualquer popover que vazasse da moldura seria cortado. Por isso todo
 * overlay vive DENTRO do palco, que reserva altura suficiente para ele.
 *
 * Todos usam os tokens do design system (background, foreground, muted,
 * border, primary), então acompanham tema claro/escuro e a troca de marca.
 * A exceção intencional é o modelo flutuante, que é sempre escuro por
 * decisão de estilo — e por isso usa cores literais, já que as travas de
 * contraste de `.dark` no index.css neutralizam as classes zinc/white.
 */

/** Fecha um painel ao apertar Esc ou clicar fora dele. */
function useFecharAoSair(aberto: boolean, setAberto: (v: boolean) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoClicar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("mousedown", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, setAberto]);

  return ref;
}

/** Logo da AUVP que troca com o tema — usada em quase todos os modelos. */
function Olho({ className }: { className?: string }) {
  return (
    <>
      <img src={olhoPreto.url} alt="AUVP" className={cn("dark:hidden", className)} />
      <img src={olhoBranco.url} alt="" aria-hidden="true" className={cn("hidden dark:block", className)} />
    </>
  );
}

/** Moldura que simula uma página real embaixo do menu. */
function Palco({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full rounded-xl border border-border bg-background overflow-hidden", className)}>
      {children}
    </div>
  );
}

/**
 * Conteúdo fantasma da página. Mostra o destino atual, que é como o
 * catálogo prova que a navegação funcionou.
 */
function PaginaFalsa({ titulo, className }: { titulo: string; className?: string }) {
  return (
    <div className={cn("bg-muted/20 px-5 py-4", className)}>
      <p className="text-[10px] font-roboto uppercase tracking-wider text-muted-foreground">Você está em</p>
      <p className="mt-0.5 text-sm font-anek font-bold text-foreground">{titulo}</p>
      <div className="mt-3 space-y-2">
        {[100, 86, 70].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Institucional com popover — o menu da própria Central de Produto */
/* ------------------------------------------------------------------ */

const SISTEMAS = [
  { id: "central", label: "Central de Produto", desc: "Página inicial e visão geral dos sistemas", icon: Sparkles },
  { id: "time", label: "Nosso Time", desc: "Missão, pilares e estrutura do time", icon: Users },
  { id: "ds", label: "Design System", desc: "Componentes, cores e padrões visuais", icon: BookOpen },
  { id: "tom", label: "Tom e Voz", desc: "Diretrizes de comunicação verbal", icon: FileText },
];

export function MenuInstitucional() {
  const [ativo, setAtivo] = useState("ds");
  // O popover abre no hover E no foco, senão o menu não existe para o teclado.
  const [aberto, setAberto] = useState<string | null>(null);
  const paginaAtual = SISTEMAS.find((s) => s.id === ativo)!;

  return (
    <Palco>
      <header className="border-b border-border bg-background/95">
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Olho className="h-8 w-8" />
            <nav aria-label="Sistemas" className="hidden sm:flex items-center gap-0.5 ml-1">
              {SISTEMAS.map((s) => (
                <div
                  key={s.id}
                  className="relative"
                  onMouseEnter={() => setAberto(s.id)}
                  onMouseLeave={() => setAberto((a) => (a === s.id ? null : a))}
                >
                  <button
                    onClick={() => setAtivo(s.id)}
                    onFocus={() => setAberto(s.id)}
                    onBlur={() => setAberto((a) => (a === s.id ? null : a))}
                    aria-current={ativo === s.id ? "page" : undefined}
                    aria-describedby={`sistema-${s.id}`}
                    className={cn(
                      "relative px-3 py-2 text-sm font-anek rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      ativo === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {s.label}
                    {ativo === s.id && (
                      <span className="absolute bottom-1 left-3 right-3 h-px bg-foreground/30 rounded-full" />
                    )}
                  </button>

                  <div
                    id={`sistema-${s.id}`}
                    role="tooltip"
                    className="absolute top-full left-1/2 z-30 mt-1.5 w-[220px]"
                    style={{
                      transform: aberto === s.id ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-5px)",
                      opacity: aberto === s.id ? 1 : 0,
                      pointerEvents: aberto === s.id ? "auto" : "none",
                      transition: "opacity 200ms cubic-bezier(0.22,1,0.36,1), transform 200ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div className="relative bg-popover border border-border rounded-xl p-3 shadow-lg">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 bg-popover border-l border-t border-border rotate-45 rounded-sm" />
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card shrink-0">
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium font-anek leading-tight">{s.label}</p>
                          <p className="text-xs text-muted-foreground font-roboto mt-0.5 leading-snug">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mx-1.5 h-4 w-px bg-border" />
              <a
                href="https://produtosauvp.github.io/etica/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-anek text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Código de Ética
                <ExternalLink className="h-3 w-3" />
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <button aria-label="Buscar" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Alternar tema" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* A altura reservada aqui é o que impede o popover de ser cortado. */}
      <PaginaFalsa titulo={paginaAtual.label} className="min-h-[168px]" />
    </Palco>
  );
}

/* ------------------------------------------------------- */
/* 2. Mega menu de catálogo — miniaturas + coluna editorial */
/* ------------------------------------------------------- */

const CATALOGO = [
  { label: "Analítica", icon: BarChart3 },
  { label: "PIAR", icon: LineChart },
  { label: "Carteira", icon: Wallet },
  { label: "Dicionário", icon: BookOpen },
  { label: "Calculadoras", icon: Calculator },
  { label: "Comunidade", icon: Users },
  { label: "Lives", icon: Video },
  { label: "Certificados", icon: GraduationCap },
];

const CONHECA = [
  "Por que investir com a AUVP",
  "Como funciona o PIAR",
  "Quero ajuda para começar",
  "Perguntas frequentes",
];

const CATALOGO_LINKS = ["Aulas", "Minhas Finanças", "Comunidade"];

export function MenuMegaCatalogo() {
  const [aberto, setAberto] = useState(true);
  const [pagina, setPagina] = useState("Aulas");
  const ref = useFecharAoSair(aberto, setAberto);

  const navegar = (destino: string) => {
    setPagina(destino);
    setAberto(false);
  };

  return (
    <Palco>
      <div ref={ref} onMouseLeave={() => setAberto(false)}>
        <header className="border-b border-border bg-background">
          <div className="flex h-16 items-center gap-8 px-5">
            <Olho className="h-8 w-8 shrink-0" />
            <nav aria-label="Principal" className="flex items-center gap-6">
              {CATALOGO_LINKS.map((l) => (
                <button
                  key={l}
                  onClick={() => navegar(l)}
                  aria-current={pagina === l ? "page" : undefined}
                  className={cn(
                    "relative py-5 text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                    pagina === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l}
                  {pagina === l && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
                </button>
              ))}
              <button
                onMouseEnter={() => setAberto(true)}
                onClick={() => setAberto((a) => !a)}
                aria-expanded={aberto}
                aria-haspopup="true"
                className={cn(
                  "relative inline-flex items-center gap-1 py-5 text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                  aberto ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Ferramentas
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", aberto && "rotate-180")} />
                {aberto && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
              </button>
              <button
                onClick={() => navegar("Minha AUVP")}
                aria-current={pagina === "Minha AUVP" ? "page" : undefined}
                className={cn(
                  "relative py-5 text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                  pagina === "Minha AUVP" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Minha AUVP
                {pagina === "Minha AUVP" && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
              </button>
            </nav>
            <div className="ml-auto flex items-center gap-1">
              {[
                { icon: Search, label: "Buscar" },
                { icon: Gift, label: "Benefícios" },
                { icon: User, label: "Minha conta" },
              ].map((a) => (
                <button
                  key={a.label}
                  aria-label={a.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <a.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </header>

        <div
          className="overflow-hidden border-b border-border bg-background transition-all duration-300"
          style={{ maxHeight: aberto ? 420 : 0, opacity: aberto ? 1 : 0 }}
          aria-hidden={!aberto}
        >
          <div className="grid gap-8 px-5 py-8 md:grid-cols-[1fr_240px]">
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {CATALOGO.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navegar(item.label)}
                  tabIndex={aberto ? 0 : -1}
                  className="group flex flex-col items-center gap-2 rounded-lg text-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex h-16 w-full items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-muted/70">
                    <item.icon className="h-6 w-6 text-foreground/70" />
                  </span>
                  <span className="text-xs font-anek font-medium leading-tight">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="md:border-l md:border-border md:pl-8">
              <p className="mb-4 text-[10px] font-roboto font-bold uppercase tracking-wider text-muted-foreground">
                Conheça
              </p>
              <ul className="space-y-3">
                {CONHECA.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => navegar(l)}
                      tabIndex={aberto ? 0 : -1}
                      className="rounded text-left text-sm font-roboto text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PaginaFalsa titulo={pagina} />
    </Palco>
  );
}

/* --------------------------------------------------------- */
/* 3. Barra flutuante escura — pílula sobre o conteúdo (SaaS) */
/* --------------------------------------------------------- */

const COLUNAS_FLUTUANTE = [
  {
    titulo: "Casos de uso",
    itens: [
      { label: "Investir", desc: "Monte e acompanhe a sua carteira.", icon: LineChart },
      { label: "Aprender", desc: "Trilhas e aulas do começo ao fim.", icon: GraduationCap },
      { label: "Planejar", desc: "Metas, aportes e projeções.", icon: Calculator },
    ],
  },
  {
    titulo: "Recursos",
    itens: [
      { label: "Blog", desc: "Notícias e análises do mercado.", icon: FileText },
      { label: "Histórias", desc: "Como nossos alunos evoluíram.", icon: Users },
      { label: "Vídeos", desc: "Tutoriais das ferramentas.", icon: Video },
    ],
  },
];

export function MenuFlutuanteEscuro() {
  const [aberto, setAberto] = useState(true);
  const [pagina, setPagina] = useState("Produtos");
  const ref = useFecharAoSair(aberto, setAberto);

  const navegar = (destino: string) => {
    setPagina(destino);
    setAberto(false);
  };

  return (
    <Palco className="bg-muted/40">
      <div className="p-6 pb-0">
        <div
          ref={ref}
          onMouseLeave={() => setAberto(false)}
          className="rounded-2xl bg-[#09090b] text-[#fafafa] shadow-2xl ring-1 ring-white/10 overflow-hidden"
        >
          <div className="flex h-16 items-center gap-7 px-6">
            <div className="flex items-center gap-2 shrink-0">
              <img src={olhoBranco.url} alt="AUVP" className="h-7 w-7" />
              <span className="font-anek text-sm font-bold">AUVP</span>
            </div>
            <nav aria-label="Principal" className="hidden items-center gap-1 sm:flex">
              {["Produtos", "Preços"].map((l) => (
                <button
                  key={l}
                  onClick={() => navegar(l)}
                  aria-current={pagina === l ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                    pagina === l ? "bg-white/10 text-white" : "text-[#a1a1aa] hover:text-white"
                  )}
                >
                  {l}
                </button>
              ))}
              <button
                onMouseEnter={() => setAberto(true)}
                onClick={() => setAberto((a) => !a)}
                aria-expanded={aberto}
                aria-haspopup="true"
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  aberto ? "bg-white/10 text-white" : "text-[#a1a1aa] hover:text-white"
                )}
              >
                Recursos
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", aberto && "rotate-180")} />
              </button>
              <button
                onClick={() => navegar("Docs")}
                aria-current={pagina === "Docs" ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  pagina === "Docs" ? "bg-white/10 text-white" : "text-[#a1a1aa] hover:text-white"
                )}
              >
                Docs
              </button>
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => navegar("Entrar")}
                className="rounded-lg px-3 py-2 text-sm font-anek text-[#d4d4d8] transition-colors hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Entrar
              </button>
              <button
                onClick={() => navegar("Criar conta")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#fafafa] px-3.5 py-2 text-sm font-anek font-semibold text-[#09090b] transition-colors hover:bg-[#e4e4e7] outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Começar
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden border-t border-white/10 transition-all duration-300"
            style={{ maxHeight: aberto ? 400 : 0, opacity: aberto ? 1 : 0 }}
            aria-hidden={!aberto}
          >
            <div className="grid gap-8 p-6 md:grid-cols-[1fr_1fr_220px]">
              {COLUNAS_FLUTUANTE.map((col) => (
                <div key={col.titulo}>
                  <p className="mb-4 text-[10px] font-roboto font-bold uppercase tracking-wider text-[#71717a]">
                    {col.titulo}
                  </p>
                  <ul className="space-y-1">
                    {col.itens.map((item) => (
                      <li key={item.label}>
                        <button
                          onClick={() => navegar(item.label)}
                          tabIndex={aberto ? 0 : -1}
                          className="flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                          <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#a1a1aa]" />
                          <span className="min-w-0">
                            <span className="block text-sm font-anek font-medium text-white">{item.label}</span>
                            <span className="block text-xs font-roboto leading-snug text-[#a1a1aa]">{item.desc}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="md:border-l md:border-white/10 md:pl-6">
                <p className="mb-4 text-[10px] font-roboto font-bold uppercase tracking-wider text-[#71717a]">
                  Comece por aqui
                </p>
                <ul className="space-y-3">
                  {["Primeiros passos", "Convidar o time", "Integrações"].map((l) => (
                    <li key={l}>
                      <button
                        onClick={() => navegar(l)}
                        tabIndex={aberto ? 0 : -1}
                        className="inline-flex items-center gap-1.5 rounded text-sm font-roboto text-[#d4d4d8] transition-colors hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        {l}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navegar("Documentação")}
                  tabIndex={aberto ? 0 : -1}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-anek font-semibold text-white transition-colors hover:bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Documentação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaginaFalsa titulo={pagina} className="mt-6 bg-transparent" />
    </Palco>
  );
}

/* ------------------------------------------------------ */
/* 4. Portal em duas linhas — utilitários + navegação      */
/* ------------------------------------------------------ */

const PORTAL_ABAS = ["Início", "Mercado", "Educação", "Ferramentas", "Comunidade"];
const PORTAL_MARCAS = ["AUVP Capital", "AUVP Escola", "Comunidade"];

export function MenuDuasLinhas() {
  const [ativo, setAtivo] = useState("Mercado");
  const [marca, setMarca] = useState("AUVP Capital");
  const [busca, setBusca] = useState("");

  return (
    <Palco>
      <div className="flex h-9 items-center justify-between border-b border-border bg-muted/40 px-5">
        <div className="flex items-center gap-4">
          {PORTAL_MARCAS.map((l) => (
            <button
              key={l}
              onClick={() => setMarca(l)}
              aria-pressed={marca === l}
              className={cn(
                "rounded text-xs font-roboto transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
                marca === l ? "font-bold text-foreground" : "text-muted-foreground"
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAtivo("Suporte")}
            className="rounded text-xs font-roboto text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Suporte
          </button>
          <a
            href="https://auvp.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded text-xs font-roboto text-muted-foreground transition-colors hover:text-foreground"
          >
            Para Empresas
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center gap-6 px-5">
          <div className="flex items-center gap-2 shrink-0">
            <Olho className="h-8 w-8" />
            <span className="font-anek text-base font-bold leading-none">AUVP</span>
          </div>

          <nav aria-label="Seções do portal" className="hidden items-center gap-1 md:flex">
            {PORTAL_ABAS.map((l) => (
              <button
                key={l}
                onClick={() => setAtivo(l)}
                aria-current={ativo === l ? "page" : undefined}
                className={cn(
                  "relative px-3 py-5 text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                  ativo === l ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l}
                {ativo === l && <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full bg-primary" />}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (busca.trim()) setAtivo(`Busca: ${busca.trim()}`);
              }}
              className="hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 transition-colors focus-within:border-foreground/30 sm:flex"
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar no portal"
                aria-label="Buscar no portal"
                className="w-32 bg-transparent text-xs font-roboto text-foreground outline-none placeholder:text-muted-foreground"
              />
            </form>
            <button
              onClick={() => setAtivo("Notificações")}
              aria-label="Notificações"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <button
              onClick={() => setAtivo("Minha conta")}
              aria-label="Minha conta"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-roboto font-bold transition-colors hover:bg-muted/70"
            >
              RC
            </button>
          </div>
        </div>
      </header>

      <PaginaFalsa titulo={`${marca} · ${ativo}`} />
    </Palco>
  );
}

/* ---------------------------------------------------- */
/* 5. Centralizado com pílula deslizante (marketing/LP)  */
/* ---------------------------------------------------- */

const PILULA_ITENS = ["Visão geral", "Recursos", "Planos", "Clientes", "Blog"];

export function MenuPilulaDeslizante() {
  const [ativo, setAtivo] = useState("Recursos");
  const [pagina, setPagina] = useState("Recursos");
  const listaRef = useRef<HTMLDivElement>(null);
  const [pilula, setPilula] = useState({ left: 0, width: 0 });

  const medir = useCallback(() => {
    const lista = listaRef.current;
    if (!lista) return;
    const alvo = lista.querySelector<HTMLElement>(`[data-item="${ativo}"]`);
    if (alvo) setPilula({ left: alvo.offsetLeft, width: alvo.offsetWidth });
  }, [ativo]);

  useLayoutEffect(() => {
    medir();
  }, [medir]);

  // A pílula é medida em pixels, então precisa remedir quando o container
  // muda de largura (responsivo, troca de fonte, zoom).
  useEffect(() => {
    const lista = listaRef.current;
    if (!lista || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(medir);
    observer.observe(lista);
    return () => observer.disconnect();
  }, [medir]);

  const selecionar = (l: string) => {
    setAtivo(l);
    setPagina(l);
  };

  return (
    <Palco>
      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center px-5">
          <div className="flex items-center gap-2">
            <Olho className="h-8 w-8" />
            <span className="font-anek text-base font-bold leading-none">AUVP</span>
          </div>

          <nav
            aria-label="Principal"
            ref={listaRef}
            className="relative mx-auto hidden items-center gap-1 rounded-full border border-border bg-muted/40 p-1 md:flex"
          >
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm ring-1 ring-border transition-all duration-300"
              style={{ left: pilula.left, width: pilula.width, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            />
            {PILULA_ITENS.map((l) => (
              <button
                key={l}
                data-item={l}
                onClick={() => selecionar(l)}
                onFocus={() => setAtivo(l)}
                aria-current={pagina === l ? "page" : undefined}
                className={cn(
                  "relative z-10 rounded-full px-3.5 py-1.5 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  ativo === l ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setPagina("Entrar")}
              className="rounded-lg px-3 py-2 text-sm font-anek text-muted-foreground transition-colors hover:text-foreground"
            >
              Entrar
            </button>
            <button
              onClick={() => setPagina("Assinatura")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-anek font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Assinar
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <PaginaFalsa titulo={pagina} />
    </Palco>
  );
}

/* ------------------------------------------------- */
/* 6. App com busca protagonista (command bar)       */
/* ------------------------------------------------- */

const APP_MENU = [
  { label: "Dashboard", icon: BarChart3 },
  { label: "Carteira", icon: Wallet },
  { label: "Aulas", icon: GraduationCap },
  { label: "Suporte", icon: LifeBuoy },
];

export function MenuBuscaProtagonista() {
  const [aberto, setAberto] = useState(true);
  const [pagina, setPagina] = useState("Dashboard");
  const [busca, setBusca] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useFecharAoSair(aberto, setAberto);

  const navegar = (destino: string) => {
    setPagina(destino);
    setAberto(false);
  };

  return (
    <Palco>
      {/* ⌘K/Ctrl+K foca a busca quando o foco está dentro deste modelo. */}
      <div
        ref={ref}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        <header className="border-b border-border bg-background">
          <div className="flex h-14 items-center gap-3 px-4">
            <button
              onClick={() => setAberto((a) => !a)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors",
                aberto ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-expanded={aberto}
              aria-label="Abrir menu"
            >
              <MenuIcon className="h-4 w-4" />
            </button>
            <Olho className="h-7 w-7 shrink-0" />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (busca.trim()) navegar(`Busca: ${busca.trim()}`);
              }}
              onClick={() => inputRef.current?.focus()}
              className="mx-auto flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 transition-colors focus-within:border-foreground/30"
            >
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar ativos, aulas e ferramentas…"
                aria-label="Buscar"
                className="flex-1 bg-transparent text-sm font-roboto text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="hidden items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-roboto text-muted-foreground sm:inline-flex">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </form>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navegar("Ajuda")}
                aria-label="Ajuda"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => navegar("Notificações")}
                aria-label="Notificações"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <button
                onClick={() => navegar("Minha conta")}
                aria-label="Minha conta"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-roboto font-bold transition-colors hover:bg-muted/70"
              >
                RC
              </button>
            </div>
          </div>
        </header>

        <div
          className="overflow-hidden border-b border-border bg-background transition-all duration-300"
          style={{ maxHeight: aberto ? 220 : 0, opacity: aberto ? 1 : 0 }}
          aria-hidden={!aberto}
        >
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
            {APP_MENU.map((item) => (
              <button
                key={item.label}
                onClick={() => navegar(item.label)}
                tabIndex={aberto ? 0 : -1}
                aria-current={pagina === item.label ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-3 py-3 text-left transition-colors",
                  pagina === item.label ? "border-foreground/30 bg-muted" : "border-border bg-card hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-anek">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <PaginaFalsa titulo={pagina} />
    </Palco>
  );
}

/* ------------------------------------------------------------------ */
/* Catálogo — os seis modelos, cada um no seu ComponentShowcase        */
/* ------------------------------------------------------------------ */

const CODIGO_INSTITUCIONAL = `const [ativo, setAtivo] = useState("ds");
const [aberto, setAberto] = useState<string | null>(null);

<nav aria-label="Sistemas" className="flex items-center gap-0.5">
  {SISTEMAS.map((s) => (
    <div
      key={s.id}
      className="relative"
      onMouseEnter={() => setAberto(s.id)}
      onMouseLeave={() => setAberto((a) => (a === s.id ? null : a))}
    >
      <button
        onClick={() => setAtivo(s.id)}
        onFocus={() => setAberto(s.id)}          {/* abre no teclado, não só no mouse */}
        onBlur={() => setAberto((a) => (a === s.id ? null : a))}
        aria-current={ativo === s.id ? "page" : undefined}
        aria-describedby={"sistema-" + s.id}
        className="relative px-3 py-2 text-sm font-anek rounded-lg"
      >
        {s.label}
        {ativo === s.id && <span className="absolute bottom-1 left-3 right-3 h-px bg-foreground/30" />}
      </button>

      {/* popover sempre no DOM, animado por opacity + translateY */}
      <div id={"sistema-" + s.id} role="tooltip" className="absolute top-full left-1/2 z-30 mt-1.5 w-[220px]">…</div>
    </div>
  ))}
</nav>

{/* a página abaixo reserva altura: o showcase tem overflow-hidden e cortaria o popover */}
<PaginaFalsa titulo={paginaAtual.label} className="min-h-[168px]" />`;

const CODIGO_MEGA = `const [aberto, setAberto] = useState(true);
const [pagina, setPagina] = useState("Aulas");
const ref = useFecharAoSair(aberto, setAberto);   // Esc + clique fora

const navegar = (destino: string) => { setPagina(destino); setAberto(false); };

<div ref={ref} onMouseLeave={() => setAberto(false)}>
  <header className="border-b border-border bg-background">
    <nav className="flex items-center gap-6">
      <button onClick={() => navegar(l)} aria-current={pagina === l ? "page" : undefined}>{l}</button>
      <button onMouseEnter={() => setAberto(true)} onClick={() => setAberto((a) => !a)} aria-expanded={aberto}>
        Ferramentas <ChevronDown className={cn("h-3.5 w-3.5", aberto && "rotate-180")} />
      </button>
    </nav>
  </header>

  {/* painel full-bleed: grid de miniaturas + coluna editorial */}
  <div style={{ maxHeight: aberto ? 420 : 0, opacity: aberto ? 1 : 0 }} aria-hidden={!aberto} className="overflow-hidden transition-all">
    {CATALOGO.map((i) => (
      <button onClick={() => navegar(i.label)} tabIndex={aberto ? 0 : -1} className="group flex flex-col items-center gap-2">
        <span className="flex h-16 w-full items-center justify-center rounded-lg bg-muted"><i.icon /></span>
        <span className="text-xs font-anek font-medium">{i.label}</span>
      </button>
    ))}
  </div>
</div>`;

const CODIGO_FLUTUANTE = `<div className="rounded-2xl bg-[#09090b] text-[#fafafa] shadow-2xl ring-1 ring-white/10 overflow-hidden">
  {/* cores literais: as travas de contraste de .dark no index.css neutralizam
      bg-zinc-950/bg-white e apagariam esta superfície no tema escuro */}
  <div className="flex h-16 items-center gap-7 px-6">
    <img src={olhoBranco.url} className="h-7 w-7" />
    <nav className="flex items-center gap-1">
      <button onMouseEnter={() => setAberto(true)} onClick={() => setAberto((a) => !a)} aria-expanded={aberto}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[#a1a1aa] hover:text-white">
        Recursos <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </nav>
    <div className="ml-auto flex items-center gap-2">
      <button onClick={() => navegar("Entrar")} className="px-3 py-2 text-sm text-[#d4d4d8]">Entrar</button>
      <button onClick={() => navegar("Criar conta")} className="rounded-lg bg-[#fafafa] px-3.5 py-2 text-sm font-semibold text-[#09090b]">Começar</button>
    </div>
  </div>

  {/* mega painel escuro: colunas de item + descrição, CTA à direita */}
  <div className="border-t border-white/10" style={{ maxHeight: aberto ? 400 : 0 }} aria-hidden={!aberto}>…</div>
</div>`;

const CODIGO_DUAS_LINHAS = `{/* linha 1 — utilitários e troca de marca */}
<div className="flex h-9 items-center justify-between border-b border-border bg-muted/40 px-5">
  {MARCAS.map((l) => <button onClick={() => setMarca(l)} aria-pressed={marca === l}>{l}</button>)}
  <div className="flex gap-4">Suporte · Para Empresas ↗</div>
</div>

{/* linha 2 — navegação principal + busca que envia de verdade */}
<header className="border-b border-border bg-background">
  <div className="flex h-16 items-center gap-6 px-5">
    <nav className="flex items-center gap-1">
      {ABAS.map((l) => (
        <button onClick={() => setAtivo(l)} aria-current={ativo === l ? "page" : undefined} className="relative px-3 py-5 text-sm">
          {l}
          {ativo === l && <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full bg-primary" />}
        </button>
      ))}
    </nav>
    <form onSubmit={(e) => { e.preventDefault(); setAtivo("Busca: " + busca); }} className="ml-auto flex items-center gap-2 rounded-lg border border-border px-3 py-2">
      <Search className="h-3.5 w-3.5" />
      <input value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar no portal" className="bg-transparent outline-none" />
    </form>
  </div>
</header>`;

const CODIGO_PILULA = `const listaRef = useRef<HTMLDivElement>(null);
const [pilula, setPilula] = useState({ left: 0, width: 0 });

const medir = useCallback(() => {
  const alvo = listaRef.current?.querySelector<HTMLElement>('[data-item="' + ativo + '"]');
  if (alvo) setPilula({ left: alvo.offsetLeft, width: alvo.offsetWidth });
}, [ativo]);

useLayoutEffect(() => { medir(); }, [medir]);

// remede quando o container muda de largura — a pílula é posicionada em pixels
useEffect(() => {
  const observer = new ResizeObserver(medir);
  if (listaRef.current) observer.observe(listaRef.current);
  return () => observer.disconnect();
}, [medir]);

<nav ref={listaRef} className="relative mx-auto flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
  <span className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm ring-1 ring-border transition-all duration-300"
        style={{ left: pilula.left, width: pilula.width }} />
  {ITENS.map((l) => (
    <button key={l} data-item={l} onClick={() => selecionar(l)} onFocus={() => setAtivo(l)}
            aria-current={pagina === l ? "page" : undefined} className="relative z-10 rounded-full px-3.5 py-1.5 text-sm">
      {l}
    </button>
  ))}
</nav>`;

const CODIGO_BUSCA = `<div ref={ref} onKeyDown={(e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); inputRef.current?.focus(); }
}}>
  <header className="border-b border-border bg-background">
    <div className="flex h-14 items-center gap-3 px-4">
      <button onClick={() => setAberto((a) => !a)} aria-expanded={aberto} aria-label="Abrir menu"><MenuIcon /></button>

      <form onSubmit={(e) => { e.preventDefault(); navegar("Busca: " + busca); }}
            className="mx-auto flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input ref={inputRef} value={busca} onChange={(e) => setBusca(e.target.value)}
               placeholder="Buscar ativos, aulas e ferramentas…" className="flex-1 bg-transparent text-sm outline-none" />
        <kbd className="rounded-md border border-border bg-background px-1.5 text-[10px]">⌘K</kbd>
      </form>
    </div>
  </header>

  {/* gaveta de atalhos abaixo da barra — itens saem da ordem de tabulação quando fechada */}
  <div style={{ maxHeight: aberto ? 220 : 0 }} aria-hidden={!aberto} className="overflow-hidden transition-all">
    <button onClick={() => navegar(item.label)} tabIndex={aberto ? 0 : -1}>{item.label}</button>
  </div>
</div>`;

export function MenusSuperiores() {
  return (
    <div className="w-full space-y-8">
      <ComponentShowcase
        title="1. Institucional com popover"
        description="O menu da própria Central. Links em texto, item ativo marcado por um filete discreto e um popover que descreve cada destino no hover e no foco do teclado. Bom para poucos itens de peso igual, quando o nome sozinho não explica o que tem lá dentro."
        code={CODIGO_INSTITUCIONAL}
      >
        <MenuInstitucional />
      </ComponentShowcase>

      <ComponentShowcase
        title="2. Mega menu de catálogo"
        description="Um item abre um painel de largura total com miniaturas dos produtos e uma coluna editorial à direita. Feito para quando há muitos destinos e o usuário escolhe pelo reconhecimento visual, não pela leitura da lista."
        code={CODIGO_MEGA}
      >
        <MenuMegaCatalogo />
      </ComponentShowcase>

      <ComponentShowcase
        title="3. Barra flutuante escura"
        description="Barra em cartão arredondado que flutua sobre o conteúdo, sempre escura, com CTA sólido à direita e mega painel em colunas de item + descrição. Postura de produto SaaS: serve bem para landing pages e sites de produto."
        code={CODIGO_FLUTUANTE}
      >
        <MenuFlutuanteEscuro />
      </ComponentShowcase>

      <ComponentShowcase
        title="4. Portal em duas linhas"
        description="Uma faixa fina de utilitários e trocas de marca em cima, a navegação principal embaixo com busca, notificações e avatar. Separa o que é institucional do que é navegação de conteúdo — o padrão de portais e e-commerces."
        code={CODIGO_DUAS_LINHAS}
      >
        <MenuDuasLinhas />
      </ComponentShowcase>

      <ComponentShowcase
        title="5. Centralizado com pílula deslizante"
        description="Navegação centralizada dentro de um trilho arredondado; a pílula do item ativo desliza medindo a posição real do botão e acompanha o foco do teclado. Poucos itens, muito acabamento — indicado para landing pages e páginas de venda."
        code={CODIGO_PILULA}
      >
        <MenuPilulaDeslizante />
      </ComponentShowcase>

      <ComponentShowcase
        title="6. App com busca protagonista"
        description="A busca ocupa o centro da barra (com ⌘K) e os links viram uma gaveta de atalhos atrás do botão de menu. Para telas logadas, onde o usuário chega sabendo o que procura e a navegação por lista é secundária."
        code={CODIGO_BUSCA}
      >
        <MenuBuscaProtagonista />
      </ComponentShowcase>
    </div>
  );
}
