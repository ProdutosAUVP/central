import React, { useEffect, useMemo, useRef, useState } from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";
import { olhoBranco, olhoPreto } from "@/assets/olhos";
import {
  MENU_AUVP, UTILITARIOS_MENU_AUVP, ITEM_PADRAO_MENU, itemMenu, gruposComItens,
} from "@/data/menusCatalogo";
import {
  Search, ChevronRight, ChevronDown, ChevronsLeft, Settings, LifeBuoy,
  X, Menu as MenuIcon, LogOut, Users, ArrowRight,
} from "lucide-react";

/**
 * Catálogo de menus laterais
 * --------------------------
 * Seis modelos independentes de navegação lateral para apresentar à
 * liderança. Cada um assume uma densidade e um tipo de página diferente
 * (documentação, leitura longa, app compacto, workspace, mobile e
 * referência técnica), então não são variações de um mesmo componente.
 *
 * TODOS usam a mesma navegação de exemplo (`src/data/menusCatalogo.ts`): o
 * catálogo compara formas de navegar, não conteúdos. O que muda de um
 * modelo para o outro é quanto da hierarquia cada um consegue mostrar.
 *
 * Os modelos são NAVEGÁVEIS de verdade: clicar num item troca a página
 * mostrada ao lado, a busca filtra, o índice acompanha a rolagem, o drawer
 * abre e fecha no clique, no Esc e no overlay, e o item ativo carrega
 * aria-current.
 *
 * Tudo vive dentro de uma moldura de altura fixa que simula a página — nada
 * usa position: fixed, e nenhum overlay escapa do palco, porque o
 * ComponentShowcase tem `overflow-hidden` na raiz e cortaria o que vazasse.
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

/** Moldura de página: menu de um lado, conteúdo do outro. */
function Palco({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex w-full h-[400px] rounded-xl border border-border bg-background overflow-hidden", className)}>
      {children}
    </div>
  );
}

/** Blocos cinzas que representam o conteúdo da página aberta. */
function ConteudoFantasma({ titulo }: { titulo: string }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden p-6">
      <p className="text-[10px] font-roboto uppercase tracking-wider text-muted-foreground">Você está em</p>
      <p className="mt-0.5 text-sm font-anek font-bold text-foreground">{titulo}</p>
      <div className="mt-4 space-y-2.5">
        {[100, 92, 78, 96, 64, 88].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-muted" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-24 rounded-lg border border-border bg-muted/40" />
        ))}
      </div>
    </div>
  );
}

const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const GRUPOS = gruposComItens();
const COM_FILHOS = itemMenu(ITEM_PADRAO_MENU);

/* --------------------------------------------------- */
/* 1. Documentação — busca + grupos colapsáveis         */
/* --------------------------------------------------- */

export function LateralDocumentacao() {
  const [ativo, setAtivo] = useState(COM_FILHOS.label);
  const [busca, setBusca] = useState("");
  const [abertos, setAbertos] = useState<Record<string, boolean>>(
    Object.fromEntries(GRUPOS.map((g) => [g.titulo, true]))
  );

  // A busca filtra a lista de verdade; com filtro ativo todos os grupos abrem.
  const q = normalizar(busca.trim());
  const grupos = useMemo(() => {
    if (!q) return GRUPOS;
    return GRUPOS.map((g) => ({
      ...g,
      itens: g.itens.filter((i) => normalizar(i.label).includes(q)),
    })).filter((g) => g.itens.length > 0);
  }, [q]);

  return (
    <Palco>
      <nav aria-label="Conteúdo" className="w-60 shrink-0 overflow-y-auto border-r border-border py-4">
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar…"
              aria-label="Buscar no menu"
              className="h-9 w-full rounded-md border border-border bg-background pl-8 pr-3 text-sm font-roboto text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground/30"
            />
          </div>
        </div>

        {grupos.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm font-roboto text-muted-foreground">
            Nenhum item encontrado.
          </p>
        ) : (
          <div className="space-y-1 px-2">
            {grupos.map((g) => {
              const aberto = q ? true : abertos[g.titulo] ?? false;
              return (
                <div key={g.titulo}>
                  <button
                    onClick={() => setAbertos((p) => ({ ...p, [g.titulo]: !aberto }))}
                    aria-expanded={aberto}
                    className="flex w-full items-start justify-between gap-2 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                  >
                    <span className="flex-1 text-left leading-tight">{g.titulo}</span>
                    <ChevronRight className={cn("mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform", aberto && "rotate-90")} />
                  </button>
                  {aberto && (
                    <ul className="mb-1 mt-1 space-y-0.5">
                      {g.itens.map((i) => (
                        <li key={i.id}>
                          <button
                            onClick={() => setAtivo(i.label)}
                            aria-current={ativo === i.label ? "page" : undefined}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-lg py-2 pl-6 pr-3 text-left text-sm font-anek leading-tight transition-colors",
                              ativo === i.label
                                ? "bg-muted font-semibold text-foreground"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                            )}
                          >
                            <i.icon className="h-4 w-4 shrink-0" />
                            <span className="flex-1">{i.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
      <ConteudoFantasma titulo={ativo} />
    </Palco>
  );
}

/* ---------------------------------------------------------- */
/* 2. Índice sem fundo — à direita do conteúdo, depois do hero */
/* ---------------------------------------------------------- */

export function LateralIndiceSemFundo() {
  const [ativo, setAtivo] = useState(MENU_AUVP[0].id);
  const rolagemRef = useRef<HTMLDivElement>(null);
  const marcandoRef = useRef(false);

  const irPara = (id: string) => {
    const container = rolagemRef.current;
    const secao = container?.querySelector<HTMLElement>(`[data-secao="${id}"]`);
    if (!container || !secao) return;
    // Trava o spy enquanto a rolagem suave acontece, senão o destaque
    // pisca nas seções do caminho.
    marcandoRef.current = true;
    setAtivo(id);
    container.scrollTo({ top: secao.offsetTop - 12, behavior: "smooth" });
    window.setTimeout(() => {
      marcandoRef.current = false;
    }, 500);
  };

  // Scroll-spy: o índice acompanha a leitura, que é o ponto deste modelo.
  const aoRolar = () => {
    if (marcandoRef.current) return;
    const container = rolagemRef.current;
    if (!container) return;
    const secoes = Array.from(container.querySelectorAll<HTMLElement>("[data-secao]"));
    const atual = secoes.filter((s) => s.offsetTop - 24 <= container.scrollTop).pop() ?? secoes[0];
    if (atual) setAtivo(atual.dataset.secao!);
  };

  return (
    <Palco className="h-[440px] flex-col">
      {/* Hero: o índice só começa depois dele. */}
      <div className="shrink-0 border-b border-border bg-muted/30 px-8 py-6">
        <p className="text-[10px] font-roboto uppercase tracking-wider text-muted-foreground">Manual</p>
        <h3 className="mt-1 font-anek text-xl font-bold leading-tight text-foreground">
          Guia da plataforma AUVP
        </h3>
        <p className="mt-1 max-w-md text-xs font-roboto leading-relaxed text-muted-foreground">
          Tudo o que existe na plataforma, explicado na ordem em que você vai usar.
        </p>
      </div>

      <div ref={rolagemRef} onScroll={aoRolar} className="flex flex-1 gap-8 overflow-y-auto px-8 py-6">
        <div className="min-w-0 flex-1 space-y-8">
          {MENU_AUVP.map((item) => (
            <section key={item.id} data-secao={item.id} className="scroll-mt-4">
              <h4 className="font-anek text-sm font-bold text-foreground">{item.label}</h4>
              <p className="mt-1 text-xs font-roboto leading-relaxed text-muted-foreground">{item.desc}</p>
              <div className="mt-3 space-y-2">
                {[100, 88, 72].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* O menu: sem fundo, sem borda de caixa — só tipografia e um traço. */}
        <nav aria-label="Nesta página" className="sticky top-0 hidden w-44 shrink-0 self-start md:block">
          <p className="mb-3 text-[10px] font-roboto font-bold uppercase tracking-wider text-muted-foreground">
            Nesta página
          </p>
          <ul className="space-y-0.5 border-l border-border">
            {MENU_AUVP.map((item) => {
              const on = ativo === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => irPara(item.id)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "-ml-px flex w-full items-center border-l py-1.5 pl-3 text-left text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                      on
                        ? "border-foreground font-semibold text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="mt-4 inline-flex items-center gap-1.5 pl-3 text-xs font-roboto text-muted-foreground transition-colors hover:text-foreground">
            {UTILITARIOS_MENU_AUVP[2]}
            <ArrowRight className="h-3 w-3" />
          </button>
        </nav>
      </div>
    </Palco>
  );
}

/* ------------------------------------------------- */
/* 3. Trilho de ícones com flyout no hover e no foco  */
/* ------------------------------------------------- */

export function LateralTrilhoIcones() {
  const [ativo, setAtivo] = useState(COM_FILHOS.label);
  // Um ícone sozinho não se explica: o rótulo precisa aparecer também
  // para quem navega por teclado, não só no hover do mouse.
  const [emFoco, setEmFoco] = useState<string | null>(null);

  return (
    <Palco>
      <nav aria-label="Áreas" className="relative flex w-[68px] shrink-0 flex-col items-center border-r border-border bg-muted/30 py-4">
        <div className="mb-6">
          <img src={olhoPreto.url} alt="AUVP" className="h-7 w-7 dark:hidden" />
          <img src={olhoBranco.url} alt="" aria-hidden="true" className="hidden h-7 w-7 dark:block" />
        </div>

        <ul className="flex flex-1 flex-col items-center gap-1.5">
          {MENU_AUVP.map((i) => (
            <li
              key={i.id}
              className="relative"
              onMouseEnter={() => setEmFoco(i.label)}
              onMouseLeave={() => setEmFoco((f) => (f === i.label ? null : f))}
            >
              <button
                onClick={() => setAtivo(i.label)}
                onFocus={() => setEmFoco(i.label)}
                onBlur={() => setEmFoco((f) => (f === i.label ? null : f))}
                aria-label={i.label}
                aria-current={ativo === i.label ? "page" : undefined}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  ativo === i.label
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <i.icon className="h-[18px] w-[18px]" />
              </button>
              {ativo === i.label && (
                <span aria-hidden="true" className="absolute -left-[14px] top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-foreground" />
              )}
              {i.contador && (
                <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-roboto font-bold text-primary-foreground">
                  {i.contador}
                </span>
              )}

              <div
                role="tooltip"
                className="pointer-events-none absolute left-full top-1/2 z-30 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs font-anek shadow-lg transition-all duration-150"
                style={{ opacity: emFoco === i.label ? 1 : 0, transform: `translateY(-50%) translateX(${emFoco === i.label ? 0 : -4}px)` }}
              >
                {i.label}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-1.5 pt-2">
          <button
            onClick={() => setAtivo("Configurações")}
            aria-label="Configurações"
            aria-current={ativo === "Configurações" ? "page" : undefined}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
              ativo === "Configurações" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-[18px] w-[18px]" />
          </button>
          <button
            onClick={() => setAtivo("Minha conta")}
            aria-label="Minha conta"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[10px] font-roboto font-bold transition-colors hover:bg-muted/70"
          >
            RC
          </button>
        </div>
      </nav>
      <ConteudoFantasma titulo={ativo} />
    </Palco>
  );
}

/* -------------------------------------------------------- */
/* 4. Workspace de app — grupos, contadores e recolhimento   */
/* -------------------------------------------------------- */

export function LateralWorkspace() {
  const [ativo, setAtivo] = useState(COM_FILHOS.label);
  const [recolhida, setRecolhida] = useState(false);

  return (
    <Palco>
      <nav
        aria-label="Navegação do workspace"
        className={cn(
          "flex shrink-0 flex-col border-r border-border bg-card transition-[width] duration-300",
          recolhida ? "w-[68px]" : "w-64"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="flex items-center gap-2.5 border-b border-border p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background text-xs font-anek font-bold">
            AU
          </div>
          {!recolhida && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-anek font-semibold leading-tight">AUVP Capital</p>
              <p className="truncate text-[11px] font-roboto text-muted-foreground">Plano Produto</p>
            </div>
          )}
          <button
            onClick={() => setRecolhida((r) => !r)}
            aria-label={recolhida ? "Expandir menu" : "Recolher menu"}
            aria-expanded={!recolhida}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronsLeft className={cn("h-4 w-4 transition-transform", recolhida && "rotate-180")} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-2">
          {GRUPOS.map((g) => (
            <div key={g.titulo}>
              {!recolhida && (
                <p className="px-3 pb-1 pt-1 text-[10px] font-roboto font-bold uppercase tracking-wider text-muted-foreground">
                  {g.titulo}
                </p>
              )}
              <ul className="space-y-0.5">
                {g.itens.map((i) => (
                  <li key={i.id}>
                    <button
                      onClick={() => setAtivo(i.label)}
                      title={recolhida ? i.label : undefined}
                      aria-label={recolhida ? i.label : undefined}
                      aria-current={ativo === i.label ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-anek transition-colors",
                        recolhida && "justify-center px-0",
                        ativo === i.label
                          ? "bg-muted font-semibold text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <i.icon className="h-4 w-4 shrink-0" />
                      {!recolhida && (
                        <>
                          <span className="flex-1 truncate">{i.label}</span>
                          {i.contador && (
                            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-roboto font-bold text-primary">
                              {i.contador}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-2">
          <button
            onClick={() => setAtivo(UTILITARIOS_MENU_AUVP[0])}
            title={recolhida ? UTILITARIOS_MENU_AUVP[0] : undefined}
            aria-current={ativo === UTILITARIOS_MENU_AUVP[0] ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-anek transition-colors",
              recolhida && "justify-center px-0",
              ativo === UTILITARIOS_MENU_AUVP[0]
                ? "bg-muted font-semibold text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <LifeBuoy className="h-4 w-4 shrink-0" />
            {!recolhida && <span className="truncate">{UTILITARIOS_MENU_AUVP[0]}</span>}
          </button>
          <button
            onClick={() => setAtivo("Minha conta")}
            title={recolhida ? "Minha conta" : undefined}
            className={cn(
              "mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted/60",
              recolhida && "justify-center px-0"
            )}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-roboto font-bold">
              RC
            </span>
            {!recolhida && (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-anek font-medium leading-tight text-foreground">Raul Cardoso</span>
                  <span className="block truncate text-[10px] font-roboto text-muted-foreground">produto@auvp</span>
                </span>
                <LogOut className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </>
            )}
          </button>
        </div>
      </nav>
      <ConteudoFantasma titulo={ativo} />
    </Palco>
  );
}

/* ---------------------------------------------- */
/* 5. Drawer sobreposto — mobile e telas estreitas */
/* ---------------------------------------------- */

export function LateralDrawerSobreposto() {
  const [aberto, setAberto] = useState(true);
  const [pagina, setPagina] = useState(COM_FILHOS.label);
  const [expandido, setExpandido] = useState<string | null>(ITEM_PADRAO_MENU);
  const ref = useFecharAoSair(aberto, setAberto);

  const navegar = (destino: string) => {
    setPagina(destino);
    setAberto(false);
  };

  return (
    <Palco className="relative">
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
          <button
            onClick={() => setAberto(true)}
            aria-expanded={aberto}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-xs font-anek font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
          >
            <MenuIcon className="h-4 w-4" />
            Menu
          </button>
          <div className="mx-auto">
            <img src={olhoPreto.url} alt="AUVP" className="h-7 w-7 dark:hidden" />
            <img src={olhoBranco.url} alt="" aria-hidden="true" className="hidden h-7 w-7 dark:block" />
          </div>
          <button aria-label="Buscar" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>
        </header>
        <ConteudoFantasma titulo={pagina} />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-black/50 transition-opacity duration-300"
        style={{ opacity: aberto ? 1 : 0, pointerEvents: aberto ? "auto" : "none" }}
        onClick={() => setAberto(false)}
      />

      <nav
        ref={ref}
        aria-label="Navegação"
        aria-hidden={!aberto}
        className="absolute inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-background shadow-2xl transition-transform duration-300"
        style={{ transform: aberto ? "translateX(0)" : "translateX(-100%)", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">Navegar</span>
          <button
            onClick={() => setAberto(false)}
            aria-label="Fechar menu"
            tabIndex={aberto ? 0 : -1}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto py-2">
          {MENU_AUVP.map((i) => {
            const temFilhos = Boolean(i.filhos?.length);
            const expandidoAqui = expandido === i.id;
            return (
              <li key={i.id}>
                <button
                  onClick={() => (temFilhos ? setExpandido(expandidoAqui ? null : i.id) : navegar(i.label))}
                  tabIndex={aberto ? 0 : -1}
                  aria-expanded={temFilhos ? expandidoAqui : undefined}
                  aria-current={pagina === i.label ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-anek transition-colors hover:bg-muted",
                    pagina === i.label ? "font-semibold text-foreground" : "text-foreground"
                  )}
                >
                  {i.label}
                  {temFilhos && (
                    <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", expandidoAqui && "rotate-90")} />
                  )}
                </button>
                {temFilhos && expandidoAqui && (
                  <ul className="bg-muted/30 pb-1">
                    {i.filhos!.map((f) => (
                      <li key={f.id}>
                        <button
                          onClick={() => navegar(f.label)}
                          tabIndex={aberto ? 0 : -1}
                          aria-current={pagina === f.label ? "page" : undefined}
                          className={cn(
                            "w-full py-2 pl-8 pr-4 text-left text-sm font-roboto transition-colors hover:text-foreground",
                            pagina === f.label ? "font-semibold text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {f.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="border-t border-border px-4 py-3">
          <button
            onClick={() => navegar("Minha conta")}
            tabIndex={aberto ? 0 : -1}
            className="inline-flex items-center gap-2 rounded text-xs font-roboto text-muted-foreground transition-colors hover:text-foreground"
          >
            <Users className="h-3.5 w-3.5" />
            Entrar na conta
          </button>
        </div>
      </nav>
    </Palco>
  );
}

/* ------------------------------------------------------- */
/* 6. Árvore de referência — grupo, item e filho aninhados  */
/* ------------------------------------------------------- */

type NoArvore = { id: string; label: string; icon?: React.ElementType; filhos?: NoArvore[] };

const ARVORE: NoArvore[] = GRUPOS.map((g) => ({
  id: g.titulo,
  label: g.titulo,
  filhos: g.itens.map((i) => ({
    id: i.id,
    label: i.label,
    icon: i.icon,
    filhos: i.filhos?.map((f) => ({ id: f.id, label: f.label })),
  })),
}));

function NoLista({
  no,
  nivel,
  ativo,
  setAtivo,
}: {
  no: NoArvore;
  nivel: number;
  ativo: string;
  setAtivo: (v: string) => void;
}) {
  const [aberto, setAberto] = useState(nivel === 0 || no.id === ITEM_PADRAO_MENU);
  const temFilhos = Boolean(no.filhos?.length);
  const Icon = no.icon;

  return (
    <li>
      <button
        onClick={() => (temFilhos ? setAberto((a) => !a) : setAtivo(no.label))}
        aria-expanded={temFilhos ? aberto : undefined}
        aria-current={!temFilhos && ativo === no.label ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left text-sm font-anek transition-colors",
          !temFilhos && ativo === no.label
            ? "bg-muted font-semibold text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: nivel === 0 ? 8 : 10 }}
      >
        {temFilhos ? (
          <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 transition-transform", !aberto && "-rotate-90")} />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        <span className={cn("truncate", nivel === 0 && "font-semibold uppercase tracking-wider text-foreground")}>
          {no.label}
        </span>
      </button>

      {temFilhos && aberto && (
        <ul className="ml-[13px] border-l border-border pl-2">
          {no.filhos!.map((f) => (
            <NoLista key={f.id} no={f} nivel={nivel + 1} ativo={ativo} setAtivo={setAtivo} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function LateralArvore() {
  const [ativo, setAtivo] = useState(COM_FILHOS.filhos![0].label);

  return (
    <Palco className="h-[440px]">
      <nav aria-label="Referência" className="w-64 shrink-0 overflow-y-auto border-r border-border p-3">
        <div className="mb-3 flex items-center gap-2 px-1">
          <img src={olhoPreto.url} alt="AUVP" className="h-6 w-6 dark:hidden" />
          <img src={olhoBranco.url} alt="" aria-hidden="true" className="hidden h-6 w-6 dark:block" />
          <span className="text-sm font-anek font-bold">Documentação</span>
        </div>
        <ul className="space-y-0.5">
          {ARVORE.map((no) => (
            <NoLista key={no.id} no={no} nivel={0} ativo={ativo} setAtivo={setAtivo} />
          ))}
        </ul>
      </nav>
      <ConteudoFantasma titulo={ativo} />
    </Palco>
  );
}

/* ------------------------------------------------------------------ */
/* Catálogo — os seis modelos, cada um no seu ComponentShowcase        */
/* ------------------------------------------------------------------ */

const CODIGO_DOC = `import { gruposComItens } from "@/data/menusCatalogo";  // mesma lista nos doze modelos

const GRUPOS = gruposComItens();
const q = normalizar(busca.trim());

// a busca filtra de verdade; com filtro ativo todos os grupos abrem
const grupos = useMemo(() => {
  if (!q) return GRUPOS;
  return GRUPOS.map((g) => ({ ...g, itens: g.itens.filter((i) => normalizar(i.label).includes(q)) }))
               .filter((g) => g.itens.length > 0);
}, [q]);

<nav aria-label="Conteúdo" className="w-60 shrink-0 overflow-y-auto border-r border-border py-4">
  <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar no menu" className="h-9 w-full rounded-md border border-border pl-8" />

  {grupos.map((g) => (
    <div key={g.titulo}>
      <button onClick={() => alternar(g.titulo)} aria-expanded={aberto} className="flex w-full items-start justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider">
        {g.titulo}
        <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", aberto && "rotate-90")} />
      </button>
      {aberto && g.itens.map((i) => (
        <button onClick={() => setAtivo(i.label)} aria-current={ativo === i.label ? "page" : undefined} className={sidebarItemClass(ativo === i.label, "pl-6")}>
          <i.icon className="h-4 w-4" />
          {i.label}
        </button>
      ))}
    </div>
  ))}
</nav>`;

const CODIGO_INDICE = `{/* o índice começa DEPOIS do hero e mora à direita do texto, sem superfície */}
<div className="border-b border-border bg-muted/30 px-8 py-6">…hero…</div>

<div ref={rolagemRef} onScroll={aoRolar} className="flex flex-1 gap-8 overflow-y-auto px-8 py-6">
  <div className="min-w-0 flex-1 space-y-8">
    {MENU_AUVP.map((item) => <section key={item.id} data-secao={item.id}>…</section>)}
  </div>

  <nav aria-label="Nesta página" className="sticky top-0 w-44 shrink-0 self-start">
    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Nesta página</p>
    {/* a única "caixa" é a linha guia: border-l na lista, e o item ativo
        sobrepõe a sua própria borda com -ml-px */}
    <ul className="space-y-0.5 border-l border-border">
      {MENU_AUVP.map((item) => (
        <li key={item.id}>
          <button onClick={() => irPara(item.id)} aria-current={on ? "true" : undefined}
                  className={cn("-ml-px w-full border-l py-1.5 pl-3 text-left text-sm",
                    on ? "border-foreground font-semibold text-foreground" : "border-transparent text-muted-foreground hover:border-border")}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </nav>
</div>

// scroll-spy: o índice acompanha a leitura
const aoRolar = () => {
  if (marcandoRef.current) return;   // travado durante a rolagem suave do clique
  const secoes = [...container.querySelectorAll("[data-secao]")];
  const atual = secoes.filter((s) => s.offsetTop - 24 <= container.scrollTop).pop();
  if (atual) setAtivo(atual.dataset.secao);
};`;

const CODIGO_TRILHO = `const [emFoco, setEmFoco] = useState<string | null>(null);

<nav aria-label="Áreas" className="flex w-[68px] flex-col items-center border-r border-border bg-muted/30 py-4">
  {MENU_AUVP.map((i) => (
    <li key={i.id} className="relative"
        onMouseEnter={() => setEmFoco(i.label)}
        onMouseLeave={() => setEmFoco((f) => (f === i.label ? null : f))}>
      <button
        onClick={() => setAtivo(i.label)}
        onFocus={() => setEmFoco(i.label)}          {/* o rótulo também aparece no teclado */}
        onBlur={() => setEmFoco((f) => (f === i.label ? null : f))}
        aria-label={i.label}
        aria-current={ativo === i.label ? "page" : undefined}
        className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ativo === i.label ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}
      >
        <i.icon className="h-[18px] w-[18px]" />
      </button>

      {/* marcador do item ativo encostado na borda do trilho */}
      {ativo === i.label && <span className="absolute -left-[14px] top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-foreground" />}

      {/* contador cabe no trilho como bolha sobre o ícone */}
      {i.contador && <span className="absolute -right-0.5 -top-0.5 rounded-full bg-primary px-1 text-[9px] text-primary-foreground">{i.contador}</span>}

      {/* flyout com o rótulo — o ícone sozinho nunca basta */}
      <div role="tooltip" className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs shadow-lg"
           style={{ opacity: emFoco === i.label ? 1 : 0 }}>
        {i.label}
      </div>
    </li>
  ))}
</nav>`;

const CODIGO_WORKSPACE = `<nav className={cn("flex flex-col border-r border-border bg-card transition-[width] duration-300", recolhida ? "w-[68px]" : "w-64")}>
  {/* cabeçalho: workspace + botão de recolher */}
  <div className="flex items-center gap-2.5 border-b border-border p-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">AU</div>
    {!recolhida && <div><p className="text-sm font-semibold">AUVP Capital</p><p className="text-[11px] text-muted-foreground">Plano Produto</p></div>}
    <button onClick={() => setRecolhida((r) => !r)} aria-label={recolhida ? "Expandir menu" : "Recolher menu"} aria-expanded={!recolhida}>
      <ChevronsLeft className={cn("h-4 w-4", recolhida && "rotate-180")} />
    </button>
  </div>

  {/* mesmos grupos da lista compartilhada; recolhido vira só ícone, com title/aria-label pelo rótulo */}
  {gruposComItens().map((g) => (
    <div key={g.titulo}>
      {!recolhida && <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{g.titulo}</p>}
      {g.itens.map((i) => (
        <button onClick={() => setAtivo(i.label)} title={recolhida ? i.label : undefined} aria-current={ativo === i.label ? "page" : undefined}
                className={cn("flex w-full items-center gap-2.5 rounded-lg px-3 py-2", recolhida && "justify-center px-0")}>
          <i.icon className="h-4 w-4" />
          {!recolhida && <><span className="flex-1 truncate">{i.label}</span>
            {i.contador && <span className="rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">{i.contador}</span>}</>}
        </button>
      ))}
    </div>
  ))}
</nav>`;

const CODIGO_DRAWER = `const ref = useFecharAoSair(aberto, setAberto);   // Esc + clique fora
const navegar = (destino: string) => { setPagina(destino); setAberto(false); };

{/* overlay escurece a página e fecha no clique */}
<div className="absolute inset-0 z-10 bg-black/50 transition-opacity duration-300"
     style={{ opacity: aberto ? 1 : 0, pointerEvents: aberto ? "auto" : "none" }}
     onClick={() => setAberto(false)} />

{/* painel entra deslizando pela esquerda; fechado, sai da ordem de tabulação */}
<nav ref={ref} aria-hidden={!aberto}
     className="absolute inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-background shadow-2xl transition-transform duration-300"
     style={{ transform: aberto ? "translateX(0)" : "translateX(-100%)" }}>
  <ul className="flex-1 overflow-y-auto py-2">
    {MENU_AUVP.map((i) => (
      <li key={i.id}>
        <button onClick={() => (i.filhos ? setExpandido(...) : navegar(i.label))} tabIndex={aberto ? 0 : -1} aria-expanded={i.filhos ? expandidoAqui : undefined}>
          {i.label}
          {i.filhos && <ChevronRight className={cn("h-4 w-4", expandidoAqui && "rotate-90")} />}
        </button>
        {/* submenu abre no próprio painel, sem empurrar uma segunda camada */}
        {expandidoAqui && <ul className="bg-muted/30">{i.filhos.map((f) => <li key={f.id}><button onClick={() => navegar(f.label)} className="pl-8">{f.label}</button></li>)}</ul>}
      </li>
    ))}
  </ul>
</nav>`;

const CODIGO_ARVORE = `// grupo → item → filho: a árvore é a mesma lista, só que inteira
const ARVORE = gruposComItens().map((g) => ({
  id: g.titulo, label: g.titulo,
  filhos: g.itens.map((i) => ({ id: i.id, label: i.label, icon: i.icon, filhos: i.filhos })),
}));

function No({ no, nivel, ativo, setAtivo }) {
  const [aberto, setAberto] = useState(nivel === 0);
  const temFilhos = Boolean(no.filhos?.length);

  return (
    <li>
      <button
        onClick={() => (temFilhos ? setAberto((a) => !a) : setAtivo(no.label))}
        aria-expanded={temFilhos ? aberto : undefined}
        aria-current={!temFilhos && ativo === no.label ? "page" : undefined}
        style={{ paddingLeft: nivel === 0 ? 8 : 10 }}
        className="flex w-full items-center gap-1.5 rounded-md py-1.5 text-left text-sm"
      >
        {temFilhos ? <ChevronDown className={cn("h-3.5 w-3.5", !aberto && "-rotate-90")} /> : <span className="w-3.5" />}
        <span className="truncate">{no.label}</span>
      </button>

      {/* a linha guia é a borda do próprio <ul> do nível de baixo */}
      {temFilhos && aberto && (
        <ul className="ml-[13px] border-l border-border pl-2">
          {no.filhos.map((f) => <No key={f.id} no={f} nivel={nivel + 1} ativo={ativo} setAtivo={setAtivo} />)}
        </ul>
      )}
    </li>
  );
}`;

export function MenusLaterais() {
  return (
    <div className="w-full space-y-8">
      <ComponentShowcase
        title="1. Documentação com grupos colapsáveis"
        description="O menu do próprio Design System: a busca filtra a lista, as categorias abrem e fecham e o item ativo ganha fundo sutil. Aguenta dezenas de destinos sem virar uma lista infinita — é o modelo para conteúdo longo e catalogado."
        code={CODIGO_DOC}
      >
        <LateralDocumentacao />
      </ComponentShowcase>

      <ComponentShowcase
        title="2. Índice à direita, sem fundo"
        description="Não é uma barra: é um índice que começa depois do hero, à direita do texto, sem superfície própria — só tipografia e um traço no item ativo. Acompanha a leitura (scroll-spy) e não rouba largura do conteúdo. Modelo para páginas longas: manuais, políticas e artigos."
        code={CODIGO_INDICE}
      >
        <LateralIndiceSemFundo />
      </ComponentShowcase>

      <ComponentShowcase
        title="3. Trilho de ícones com flyout"
        description="Barra estreita só de ícones, com marcador na borda, contador em bolha e o rótulo aparecendo em flyout no hover e no foco do teclado. Devolve largura ao conteúdo em telas de trabalho — exige ícones inequívocos e no máximo seis ou sete destinos."
        code={CODIGO_TRILHO}
      >
        <LateralTrilhoIcones />
      </ComponentShowcase>

      <ComponentShowcase
        title="4. Workspace recolhível"
        description="Cabeçalho com o contexto da conta, grupos de itens com contadores e rodapé fixo com usuário e ajuda. Recolhe para um trilho de ícones sem trocar de componente. É o modelo para telas logadas e uso diário."
        code={CODIGO_WORKSPACE}
      >
        <LateralWorkspace />
      </ComponentShowcase>

      <ComponentShowcase
        title="5. Drawer sobreposto"
        description="O menu não ocupa espaço: entra deslizando por cima do conteúdo, com overlay que escurece a página e fecha no clique ou no Esc. Os itens com seta abrem submenu no próprio painel. Modelo para mobile e telas estreitas."
        code={CODIGO_DRAWER}
      >
        <LateralDrawerSobreposto />
      </ComponentShowcase>

      <ComponentShowcase
        title="6. Árvore de referência"
        description="Grupo, item e filho aninhados com linha guia e chevrons por nó, mostrando a hierarquia inteira de uma vez. Para documentação técnica e bases de conhecimento, onde o usuário precisa enxergar onde está dentro da estrutura."
        code={CODIGO_ARVORE}
      >
        <LateralArvore />
      </ComponentShowcase>
    </div>
  );
}
