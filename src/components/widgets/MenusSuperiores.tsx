import React, { useLayoutEffect, useRef, useState } from "react";
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
 * Todos usam os tokens do design system (background, foreground, muted,
 * border, primary), então acompanham tema claro/escuro e a troca de marca.
 * A exceção intencional é o modelo flutuante, que é sempre escuro por
 * decisão de estilo.
 */

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
  const [hover, setHover] = useState<string | null>(null);

  return (
    <Palco>
      <header className="border-b border-border bg-background/95">
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Olho className="h-8 w-8" />
            <span className="text-[9px] font-bold font-roboto uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 leading-none">
              v1
            </span>
            <nav className="hidden sm:flex items-center gap-0.5 ml-1">
              {SISTEMAS.map((s) => (
                <div
                  key={s.id}
                  className="relative"
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <button
                    onClick={() => setAtivo(s.id)}
                    className={cn(
                      "relative px-3 py-2 text-sm font-anek rounded-lg transition-colors",
                      ativo === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {s.label}
                    {ativo === s.id && (
                      <span className="absolute bottom-1 left-3 right-3 h-px bg-foreground/30 rounded-full" />
                    )}
                  </button>

                  <div
                    className="absolute top-full left-1/2 z-30 mt-1.5 w-[220px]"
                    style={{
                      transform: hover === s.id ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-5px)",
                      opacity: hover === s.id ? 1 : 0,
                      pointerEvents: hover === s.id ? "auto" : "none",
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
              <span className="inline-flex items-center gap-1 px-3 py-2 text-sm font-anek text-muted-foreground">
                Código de Ética
                <ExternalLink className="h-3 w-3" />
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <div className="h-14 bg-muted/20" />
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

export function MenuMegaCatalogo() {
  const [aberto, setAberto] = useState(true);

  return (
    <Palco>
      <div onMouseLeave={() => setAberto(false)}>
        <header className="border-b border-border bg-background">
          <div className="flex h-16 items-center gap-8 px-5">
            <Olho className="h-8 w-8 shrink-0" />
            <nav className="flex items-center gap-6">
              {["Aulas", "Minhas Finanças", "Comunidade"].map((l) => (
                <button key={l} className="py-5 text-sm font-anek text-muted-foreground hover:text-foreground transition-colors">
                  {l}
                </button>
              ))}
              <button
                onMouseEnter={() => setAberto(true)}
                onClick={() => setAberto((a) => !a)}
                className={cn(
                  "relative py-5 text-sm font-anek transition-colors",
                  aberto ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Ferramentas
                {aberto && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
              </button>
              <button className="py-5 text-sm font-anek text-muted-foreground hover:text-foreground transition-colors">
                Minha AUVP
              </button>
            </nav>
            <div className="ml-auto flex items-center gap-3 text-muted-foreground">
              <Search className="h-4 w-4" />
              <Gift className="h-4 w-4" />
              <User className="h-4 w-4" />
            </div>
          </div>
        </header>

        <div
          className="overflow-hidden border-b border-border bg-background transition-all duration-300"
          style={{ maxHeight: aberto ? 420 : 0, opacity: aberto ? 1 : 0 }}
        >
          <div className="grid gap-8 px-5 py-8 md:grid-cols-[1fr_240px]">
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {CATALOGO.map((item) => (
                <button key={item.label} className="group flex flex-col items-center gap-2 text-center">
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
                    <button className="text-sm font-roboto text-muted-foreground hover:text-foreground transition-colors text-left">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 bg-muted/20" />
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

  return (
    <Palco className="bg-muted/40">
      <div className="p-6">
        <div
          onMouseLeave={() => setAberto(false)}
          className="rounded-2xl bg-[#09090b] text-[#fafafa] shadow-2xl ring-1 ring-white/10 overflow-hidden"
        >
          <div className="flex h-16 items-center gap-7 px-6">
            <div className="flex items-center gap-2 shrink-0">
              <img src={olhoBranco.url} alt="AUVP" className="h-7 w-7" />
              <span className="font-anek text-sm font-bold">AUVP</span>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              {["Produtos", "Preços"].map((l) => (
                <button key={l} className="rounded-lg px-3 py-2 text-sm font-anek text-[#a1a1aa] hover:text-white transition-colors">
                  {l}
                </button>
              ))}
              <button
                onMouseEnter={() => setAberto(true)}
                onClick={() => setAberto((a) => !a)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-anek transition-colors",
                  aberto ? "bg-white/10 text-white" : "text-[#a1a1aa] hover:text-white"
                )}
              >
                Recursos
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", aberto && "rotate-180")} />
              </button>
              <button className="rounded-lg px-3 py-2 text-sm font-anek text-[#a1a1aa] hover:text-white transition-colors">
                Docs
              </button>
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-lg px-3 py-2 text-sm font-anek text-[#d4d4d8] hover:text-white transition-colors">
                Entrar
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#fafafa] px-3.5 py-2 text-sm font-anek font-semibold text-[#09090b] hover:bg-[#e4e4e7] transition-colors">
                Começar
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden border-t border-white/10 transition-all duration-300"
            style={{ maxHeight: aberto ? 400 : 0, opacity: aberto ? 1 : 0 }}
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
                        <button className="flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-white/5">
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
                      <button className="inline-flex items-center gap-1.5 text-sm font-roboto text-[#d4d4d8] hover:text-white transition-colors">
                        {l}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-anek font-semibold text-white hover:bg-white/5 transition-colors">
                  <BookOpen className="h-3.5 w-3.5" />
                  Documentação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Palco>
  );
}

/* ------------------------------------------------------ */
/* 4. Portal em duas linhas — utilitários + navegação      */
/* ------------------------------------------------------ */

const PORTAL_ABAS = ["Início", "Mercado", "Educação", "Ferramentas", "Comunidade"];

export function MenuDuasLinhas() {
  const [ativo, setAtivo] = useState("Mercado");

  return (
    <Palco>
      <div className="flex h-9 items-center justify-between border-b border-border bg-muted/40 px-5">
        <div className="flex items-center gap-4">
          {["AUVP Capital", "AUVP Escola", "Comunidade"].map((l, i) => (
            <button
              key={l}
              className={cn(
                "text-xs font-roboto transition-colors hover:text-foreground",
                i === 0 ? "font-bold text-foreground" : "text-muted-foreground"
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-xs font-roboto text-muted-foreground hover:text-foreground transition-colors">
            Suporte
          </button>
          <button className="inline-flex items-center gap-1 text-xs font-roboto text-muted-foreground hover:text-foreground transition-colors">
            Para Empresas
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>

      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center gap-6 px-5">
          <div className="flex items-center gap-2 shrink-0">
            <Olho className="h-8 w-8" />
            <span className="font-anek text-base font-bold leading-none">AUVP</span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {PORTAL_ABAS.map((l) => (
              <button
                key={l}
                onClick={() => setAtivo(l)}
                className={cn(
                  "relative px-3 py-5 text-sm font-anek transition-colors",
                  ativo === l ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l}
                {ativo === l && <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full bg-primary" />}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 sm:flex">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-roboto text-muted-foreground">Buscar no portal</span>
            </div>
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-roboto font-bold">
              RC
            </div>
          </div>
        </div>
      </header>
      <div className="h-10 bg-muted/20" />
    </Palco>
  );
}

/* ---------------------------------------------------- */
/* 5. Centralizado com pílula deslizante (marketing/LP)  */
/* ---------------------------------------------------- */

const PILULA_ITENS = ["Visão geral", "Recursos", "Planos", "Clientes", "Blog"];

export function MenuPilulaDeslizante() {
  const [ativo, setAtivo] = useState("Recursos");
  const listaRef = useRef<HTMLDivElement>(null);
  const [pilula, setPilula] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;
    const alvo = lista.querySelector<HTMLElement>(`[data-item="${ativo}"]`);
    if (!alvo) return;
    setPilula({ left: alvo.offsetLeft, width: alvo.offsetWidth });
  }, [ativo]);

  return (
    <Palco>
      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center px-5">
          <div className="flex items-center gap-2">
            <Olho className="h-8 w-8" />
            <span className="font-anek text-base font-bold leading-none">AUVP</span>
          </div>

          <div ref={listaRef} className="relative mx-auto hidden items-center gap-1 rounded-full border border-border bg-muted/40 p-1 md:flex">
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm ring-1 ring-border transition-all duration-300"
              style={{ left: pilula.left, width: pilula.width, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            />
            {PILULA_ITENS.map((l) => (
              <button
                key={l}
                data-item={l}
                onClick={() => setAtivo(l)}
                className={cn(
                  "relative z-10 rounded-full px-3.5 py-1.5 text-sm font-anek transition-colors",
                  ativo === l ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-lg px-3 py-2 text-sm font-anek text-muted-foreground hover:text-foreground transition-colors">
              Entrar
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-anek font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Assinar
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>
      <div className="h-14 bg-muted/20" />
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

  return (
    <Palco>
      <div className="relative">
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

            <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 transition-colors focus-within:border-foreground/30">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-sm font-roboto text-muted-foreground">Buscar ativos, aulas e ferramentas…</span>
              <span className="hidden items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-roboto text-muted-foreground sm:inline-flex">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <HelpCircle className="h-4 w-4" />
              </button>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-roboto font-bold">
                RC
              </div>
            </div>
          </div>
        </header>

        <div
          className="overflow-hidden border-b border-border bg-background transition-all duration-300"
          style={{ maxHeight: aberto ? 220 : 0, opacity: aberto ? 1 : 0 }}
        >
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
            {APP_MENU.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-3 text-left transition-colors hover:bg-muted"
              >
                <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-anek">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-14 bg-muted/20" />
      </div>
    </Palco>
  );
}

/* ------------------------------------------------------------------ */
/* Catálogo — os seis modelos, cada um no seu ComponentShowcase        */
/* ------------------------------------------------------------------ */

const CODIGO_INSTITUCIONAL = `<header className="border-b border-border bg-background/95">
  <div className="flex h-16 items-center justify-between px-5">
    <div className="flex items-center gap-3">
      <Olho className="h-8 w-8" />
      <nav className="flex items-center gap-0.5">
        {SISTEMAS.map((s) => (
          <div key={s.id} className="relative" onMouseEnter={...} onMouseLeave={...}>
            <button className={ativo === s.id ? "text-foreground" : "text-muted-foreground hover:bg-muted"}>
              {s.label}
              {ativo === s.id && <span className="absolute bottom-1 left-3 right-3 h-px bg-foreground/30" />}
            </button>
            {/* popover descritivo, sempre no DOM, animado por opacity + translateY */}
          </div>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-1.5"><SearchButton /><ThemeToggle /></div>
  </div>
</header>`;

const CODIGO_MEGA = `<header className="border-b border-border bg-background">
  <div className="flex h-16 items-center gap-8 px-5">
    <Olho className="h-8 w-8" />
    <nav className="flex items-center gap-6">
      <button onMouseEnter={() => setAberto(true)} className="relative py-5 text-sm font-anek">
        Ferramentas
        {aberto && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
      </button>
    </nav>
  </div>
</header>

{/* painel full-bleed: grid de miniaturas + coluna editorial */}
<div style={{ maxHeight: aberto ? 420 : 0, opacity: aberto ? 1 : 0 }} className="overflow-hidden transition-all">
  <div className="grid gap-8 px-5 py-8 md:grid-cols-[1fr_240px]">
    <div className="grid grid-cols-4 gap-x-6 gap-y-7">
      {CATALOGO.map((i) => (
        <button className="group flex flex-col items-center gap-2">
          <span className="flex h-16 w-full items-center justify-center rounded-lg bg-muted"><i.icon /></span>
          <span className="text-xs font-anek font-medium">{i.label}</span>
        </button>
      ))}
    </div>
    <div className="border-l border-border pl-8">…Conheça…</div>
  </div>
</div>`;

const CODIGO_FLUTUANTE = `<div className="p-6">
  <div className="rounded-2xl bg-[#09090b] text-[#fafafa] shadow-2xl ring-1 ring-white/10 overflow-hidden">
    <div className="flex h-16 items-center gap-7 px-6">
      <img src={olhoBranco.url} className="h-7 w-7" />
      <nav className="flex items-center gap-1">
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-anek text-[#a1a1aa] hover:text-white">
          Recursos <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button className="px-3 py-2 text-sm text-[#d4d4d8]">Entrar</button>
        <button className="rounded-lg bg-[#fafafa] px-3.5 py-2 text-sm font-semibold text-[#09090b]">Começar</button>
      </div>
    </div>

    {/* mega painel escuro: colunas de item + descrição, CTA à direita */}
    <div className="border-t border-white/10" style={{ maxHeight: aberto ? 400 : 0 }}>
      <div className="grid gap-8 p-6 md:grid-cols-[1fr_1fr_220px]">…</div>
    </div>
  </div>
</div>`;

const CODIGO_DUAS_LINHAS = `{/* linha 1 — utilitários */}
<div className="flex h-9 items-center justify-between border-b border-border bg-muted/40 px-5">
  <div className="flex gap-4">…marcas…</div>
  <div className="flex gap-4">Suporte · Para Empresas ↗</div>
</div>

{/* linha 2 — navegação principal */}
<header className="border-b border-border bg-background">
  <div className="flex h-16 items-center gap-6 px-5">
    <Olho className="h-8 w-8" />
    <nav className="flex items-center gap-1">
      {ABAS.map((l) => (
        <button className="relative px-3 py-5 text-sm font-anek">
          {l}
          {ativo === l && <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full bg-primary" />}
        </button>
      ))}
    </nav>
    <div className="ml-auto flex items-center gap-3"><Busca /><Bell /><Avatar /></div>
  </div>
</header>`;

const CODIGO_PILULA = `const listaRef = useRef<HTMLDivElement>(null);
const [pilula, setPilula] = useState({ left: 0, width: 0 });

useLayoutEffect(() => {
  const alvo = listaRef.current?.querySelector<HTMLElement>('[data-item="' + ativo + '"]');
  if (alvo) setPilula({ left: alvo.offsetLeft, width: alvo.offsetWidth });
}, [ativo]);

<div ref={listaRef} className="relative mx-auto flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
  <span
    className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm ring-1 ring-border transition-all duration-300"
    style={{ left: pilula.left, width: pilula.width }}
  />
  {ITENS.map((l) => (
    <button key={l} data-item={l} onClick={() => setAtivo(l)} className="relative z-10 rounded-full px-3.5 py-1.5 text-sm">
      {l}
    </button>
  ))}
</div>`;

const CODIGO_BUSCA = `<header className="border-b border-border bg-background">
  <div className="flex h-14 items-center gap-3 px-4">
    <button onClick={() => setAberto((a) => !a)} className="h-9 w-9 rounded-lg border border-border"><MenuIcon /></button>
    <Olho className="h-7 w-7" />

    <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input placeholder="Buscar ativos, aulas e ferramentas…" className="flex-1 bg-transparent text-sm outline-none" />
      <kbd className="rounded-md border border-border bg-background px-1.5 text-[10px]">⌘K</kbd>
    </div>

    <div className="flex items-center gap-1.5"><HelpCircle /><Bell /><Avatar /></div>
  </div>
</header>

{/* gaveta de atalhos abaixo da barra */}
<div style={{ maxHeight: aberto ? 220 : 0 }} className="overflow-hidden transition-all">…</div>`;

export function MenusSuperiores() {
  return (
    <div className="w-full space-y-8">
      <ComponentShowcase
        title="1. Institucional com popover"
        description="O menu da própria Central. Links em texto, item ativo marcado por um filete discreto e um popover que descreve cada destino no hover. Bom para poucos itens de peso igual, quando o nome sozinho não explica o que tem lá dentro."
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
        description="Navegação centralizada dentro de um trilho arredondado; a pílula do item ativo desliza medindo a posição real do botão. Poucos itens, muito acabamento — indicado para landing pages e páginas de venda."
        code={CODIGO_PILULA}
      >
        <MenuPilulaDeslizante />
      </ComponentShowcase>

      <ComponentShowcase
        title="6. App com busca protagonista"
        description="A busca ocupa o centro da barra e os links viram uma gaveta de atalhos atrás do botão de menu. Para telas logadas, onde o usuário chega sabendo o que procura e a navegação por lista é secundária."
        code={CODIGO_BUSCA}
      >
        <MenuBuscaProtagonista />
      </ComponentShowcase>
    </div>
  );
}
