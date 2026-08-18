import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";
import { olhoBranco, olhoPreto } from "@/assets/olhos";
import {
  MENU_AUVP, UTILITARIOS_MENU_AUVP, PRODUTOS_MENU_AUVP, ITEM_PADRAO_MENU, itemMenu,
  type ItemMenu,
} from "@/data/menusCatalogo";
import {
  ChevronDown, Search, Bell, HelpCircle, User, ExternalLink,
  ArrowRight, Menu as MenuIcon, Command, Sun, BookOpen,
} from "lucide-react";

/**
 * Catálogo de menus superiores
 * ----------------------------
 * Seis modelos independentes de navegação de topo para apresentar à
 * liderança. Cada um resolve o problema de um jeito diferente (institucional,
 * catálogo, produto, portal, marketing e app) — não são variações de um
 * mesmo componente, e a ideia é escolher um ou dois depois da apresentação.
 *
 * TODOS usam a mesma navegação de exemplo (`src/data/menusCatalogo.ts`), de
 * propósito: o catálogo compara formas de navegar, não conteúdos. Com os
 * mesmos destinos em todo lugar, o que sobra na tela é só a decisão de
 * design. A única variação é o portal em duas linhas, onde trocar de produto
 * recorta essa mesma lista — que é justamente a possibilidade daquele modelo.
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

/** Logo da AUVP que troca com o tema — usada em todos os modelos. */
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

const COM_FILHOS = itemMenu(ITEM_PADRAO_MENU);

/* ------------------------------------------------------------------ */
/* 1. Institucional com popover — o menu da própria Central de Produto */
/* ------------------------------------------------------------------ */

export function MenuInstitucional() {
  const [ativo, setAtivo] = useState(ITEM_PADRAO_MENU);
  // O popover abre no hover E no foco, senão o menu não existe para o teclado.
  const [aberto, setAberto] = useState<string | null>(null);
  const paginaAtual = itemMenu(ativo);

  return (
    <Palco>
      <header className="border-b border-border bg-background/95">
        <div className="flex h-16 items-center justify-between gap-3 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Olho className="h-8 w-8 shrink-0" />
            <nav aria-label="Principal" className="hidden md:flex items-center gap-0.5">
              {MENU_AUVP.map((s, i) => {
                // O popover é largo e a moldura tem overflow-hidden: centralizar
                // no primeiro e no último item jogaria metade dele para fora.
                const alinhamento =
                  i === 0 ? "esquerda" : i === MENU_AUVP.length - 1 ? "direita" : "centro";
                const base = alinhamento === "centro" ? "translateX(-50%)" : "translateX(0)";
                return (
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
                      "relative whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      ativo === s.id ? "text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {s.label}
                    {ativo === s.id && (
                      <span className="absolute bottom-1 left-2.5 right-2.5 h-px rounded-full bg-foreground/30" />
                    )}
                  </button>

                  <div
                    id={`sistema-${s.id}`}
                    role="tooltip"
                    className={cn(
                      "absolute top-full z-30 mt-1.5 w-[220px]",
                      alinhamento === "centro" && "left-1/2",
                      alinhamento === "esquerda" && "left-0",
                      alinhamento === "direita" && "right-0"
                    )}
                    style={{
                      transform: `${base} translateY(${aberto === s.id ? "0" : "-5px"})`,
                      opacity: aberto === s.id ? 1 : 0,
                      pointerEvents: aberto === s.id ? "auto" : "none",
                      transition: "opacity 200ms cubic-bezier(0.22,1,0.36,1), transform 200ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div className="relative rounded-xl border border-border bg-popover p-3 shadow-lg">
                      <div
                        className={cn(
                          "absolute -top-1.5 h-3 w-3 rotate-45 rounded-sm border-l border-t border-border bg-popover",
                          alinhamento === "centro" && "left-1/2 -translate-x-1/2",
                          alinhamento === "esquerda" && "left-6",
                          alinhamento === "direita" && "right-6"
                        )}
                      />
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-anek font-medium leading-tight">{s.label}</p>
                          <p className="mt-0.5 text-xs font-roboto leading-snug text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button aria-label="Buscar" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Alternar tema" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
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

export function MenuMegaCatalogo() {
  // Qualquer item com filhos abre o SEU painel — é o que um mega menu de
  // catálogo faz de verdade, e mostra a lista inteira sem inventar rótulos.
  const [abertoId, setAbertoId] = useState<string | null>(ITEM_PADRAO_MENU);
  const [pagina, setPagina] = useState(COM_FILHOS.label);
  const ref = useFecharAoSair(abertoId !== null, (v) => !v && setAbertoId(null));

  const aberto = abertoId !== null ? itemMenu(abertoId) : null;

  const navegar = (destino: string) => {
    setPagina(destino);
    setAbertoId(null);
  };

  return (
    <Palco>
      <div ref={ref} onMouseLeave={() => setAbertoId(null)}>
        <header className="border-b border-border bg-background">
          <div className="flex h-16 items-center gap-5 px-5">
            <Olho className="h-8 w-8 shrink-0" />
            <nav aria-label="Principal" className="flex items-center gap-5">
              {MENU_AUVP.map((item) => {
                const temFilhos = Boolean(item.filhos?.length);
                const marcado = temFilhos ? abertoId === item.id : pagina === item.label;
                return (
                  <button
                    key={item.id}
                    onClick={() => (temFilhos ? setAbertoId((a) => (a === item.id ? null : item.id)) : navegar(item.label))}
                    onMouseEnter={temFilhos ? () => setAbertoId(item.id) : undefined}
                    aria-expanded={temFilhos ? abertoId === item.id : undefined}
                    aria-haspopup={temFilhos ? "true" : undefined}
                    aria-current={!temFilhos && pagina === item.label ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-1 whitespace-nowrap py-5 text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                      marcado ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {temFilhos && (
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", abertoId === item.id && "rotate-180")} />
                    )}
                    {marcado && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </nav>
            <div className="ml-auto flex items-center gap-1">
              {[
                { icon: Search, label: "Buscar" },
                { icon: Bell, label: "Notificações" },
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
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
              {(aberto?.filhos ?? COM_FILHOS.filhos!).map((filho) => (
                <button
                  key={filho.id}
                  onClick={() => navegar(filho.label)}
                  tabIndex={aberto ? 0 : -1}
                  className="group flex flex-col items-center gap-2 rounded-lg text-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex h-16 w-full items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-muted/70">
                    <filho.icon className="h-6 w-6 text-foreground/70" />
                  </span>
                  <span className="text-xs font-anek font-medium leading-tight">{filho.label}</span>
                </button>
              ))}
            </div>

            <div className="md:border-l md:border-border md:pl-8">
              <p className="mb-4 text-[10px] font-roboto font-bold uppercase tracking-wider text-muted-foreground">
                Conheça
              </p>
              <ul className="space-y-3">
                {UTILITARIOS_MENU_AUVP.map((l) => (
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
/* 3. Barra flutuante — cartão sobre o conteúdo (produto)     */
/* --------------------------------------------------------- */

export function MenuFlutuante() {
  const [abertoId, setAbertoId] = useState<string | null>(ITEM_PADRAO_MENU);
  const [pagina, setPagina] = useState(COM_FILHOS.label);
  const ref = useFecharAoSair(abertoId !== null, (v) => !v && setAbertoId(null));

  const aberto = abertoId !== null ? itemMenu(abertoId) : null;
  const filhos = aberto?.filhos ?? COM_FILHOS.filhos!;

  const navegar = (destino: string) => {
    setPagina(destino);
    setAbertoId(null);
  };

  return (
    <Palco className="bg-muted/40">
      <div className="p-6 pb-0">
        <div
          ref={ref}
          onMouseLeave={() => setAbertoId(null)}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <div className="flex h-16 items-center gap-3 px-5">
            <div className="flex shrink-0 items-center gap-2">
              <Olho className="h-7 w-7" />
              <span className="font-anek text-sm font-bold">AUVP</span>
            </div>
            <nav aria-label="Principal" className="hidden items-center gap-0.5 md:flex">
              {MENU_AUVP.map((item) => {
                const temFilhos = Boolean(item.filhos?.length);
                const marcado = temFilhos ? abertoId === item.id : pagina === item.label;
                return (
                  <button
                    key={item.id}
                    onClick={() => (temFilhos ? setAbertoId((a) => (a === item.id ? null : item.id)) : navegar(item.label))}
                    onMouseEnter={temFilhos ? () => setAbertoId(item.id) : undefined}
                    aria-expanded={temFilhos ? abertoId === item.id : undefined}
                    aria-haspopup={temFilhos ? "true" : undefined}
                    aria-current={!temFilhos && pagina === item.label ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      marcado ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {temFilhos && (
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", abertoId === item.id && "rotate-180")} />
                    )}
                  </button>
                );
              })}
            </nav>
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <button
                onClick={() => navegar("Entrar")}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-anek text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                Entrar
              </button>
              <button
                onClick={() => navegar("Criar conta")}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3.5 py-2 text-sm font-anek font-semibold text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Começar
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden border-t border-border transition-all duration-300"
            style={{ maxHeight: aberto ? 400 : 0, opacity: aberto ? 1 : 0 }}
            aria-hidden={!aberto}
          >
            <div className="grid gap-8 p-6 md:grid-cols-[1fr_220px]">
              <div>
                <p className="mb-4 text-[10px] font-roboto font-bold uppercase tracking-wider text-muted-foreground">
                  {aberto?.label ?? COM_FILHOS.label}
                </p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {filhos.map((filho) => (
                    <li key={filho.id}>
                      <button
                        onClick={() => navegar(filho.label)}
                        tabIndex={aberto ? 0 : -1}
                        className="flex w-full items-start gap-3 rounded-lg p-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <filho.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0">
                          <span className="block text-sm font-anek font-medium text-foreground">{filho.label}</span>
                          <span className="block text-xs font-roboto leading-snug text-muted-foreground">{filho.desc}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:border-l md:border-border md:pl-6">
                <p className="mb-4 text-[10px] font-roboto font-bold uppercase tracking-wider text-muted-foreground">
                  Comece por aqui
                </p>
                <ul className="space-y-3">
                  {UTILITARIOS_MENU_AUVP.map((l) => (
                    <li key={l}>
                      <button
                        onClick={() => navegar(l)}
                        tabIndex={aberto ? 0 : -1}
                        className="inline-flex items-center gap-1.5 rounded text-sm font-roboto text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-anek font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
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
/* 4. Portal em duas linhas — cor e itens por produto      */
/* ------------------------------------------------------ */

export function MenuDuasLinhas() {
  const [produtoId, setProdutoId] = useState<string>(PRODUTOS_MENU_AUVP[0].id);
  const [pagina, setPagina] = useState(itemMenu("financas").label);
  const [busca, setBusca] = useState("");

  const produto = PRODUTOS_MENU_AUVP.find((p) => p.id === produtoId)!;
  const itens: ItemMenu[] = produto.itens.map(itemMenu);

  // Trocar de produto troca o que está disponível: se a página aberta não
  // existe no produto novo, cai no primeiro item dele.
  const trocarProduto = (id: string) => {
    const alvo = PRODUTOS_MENU_AUVP.find((p) => p.id === id)!;
    setProdutoId(id);
    const continua = alvo.itens.some((i) => itemMenu(i).label === pagina);
    if (!continua) setPagina(itemMenu(alvo.itens[0]).label);
  };

  return (
    <Palco>
      {/* Linha 1 — a faixa veste a cor do produto ativo. */}
      <div
        className="flex h-10 items-center justify-between px-5 transition-colors duration-300"
        style={{ backgroundColor: `hsl(${produto.fundo})`, color: `hsl(${produto.texto})` }}
      >
        <div className="flex items-center gap-1">
          {PRODUTOS_MENU_AUVP.map((p) => (
            <button
              key={p.id}
              onClick={() => trocarProduto(p.id)}
              aria-pressed={p.id === produtoId}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-roboto outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-current",
                p.id === produtoId ? "font-bold opacity-100" : "opacity-60 hover:opacity-100"
              )}
              style={p.id === produtoId ? { backgroundColor: "rgb(255 255 255 / 0.15)" } : undefined}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPagina(UTILITARIOS_MENU_AUVP[0])}
            className="rounded text-xs font-roboto opacity-80 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current"
          >
            {UTILITARIOS_MENU_AUVP[0]}
          </button>
          <a
            href="https://auvp.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded text-xs font-roboto opacity-80 transition-opacity hover:opacity-100"
          >
            Para Empresas
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Linha 2 — navegação principal com os itens daquele produto. */}
      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center gap-5 px-5">
          <div className="flex shrink-0 items-center gap-2">
            <Olho className="h-8 w-8" />
            <span className="font-anek text-base font-bold leading-none">{produto.label}</span>
          </div>

          <nav aria-label={`Seções de ${produto.label}`} className="hidden items-center gap-1 md:flex">
            {itens.map((item) => (
              <button
                key={item.id}
                onClick={() => setPagina(item.label)}
                aria-current={pagina === item.label ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap px-3 py-5 text-sm font-anek transition-colors outline-none focus-visible:text-foreground",
                  pagina === item.label ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {pagina === item.label && (
                  <span
                    className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full"
                    style={{ backgroundColor: `hsl(${produto.fundo})` }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (busca.trim()) setPagina(`Busca: ${busca.trim()}`);
              }}
              className="hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 transition-colors focus-within:border-foreground/30 sm:flex"
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar"
                aria-label="Buscar no portal"
                className="w-24 bg-transparent text-xs font-roboto text-foreground outline-none placeholder:text-muted-foreground"
              />
            </form>
            <button
              onClick={() => setPagina("Minha conta")}
              aria-label="Minha conta"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-roboto font-bold transition-colors hover:bg-muted/70"
            >
              RC
            </button>
          </div>
        </div>
      </header>

      <PaginaFalsa titulo={`${produto.label} · ${pagina}`} />
    </Palco>
  );
}

/* ---------------------------------------------------- */
/* 5. Centralizado com pílula deslizante (marketing/LP)  */
/* ---------------------------------------------------- */

export function MenuPilulaDeslizante() {
  const [ativo, setAtivo] = useState(ITEM_PADRAO_MENU);
  const [pagina, setPagina] = useState(COM_FILHOS.label);
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

  return (
    <Palco>
      <header className="border-b border-border bg-background">
        <div className="flex h-16 items-center gap-3 px-5">
          <Olho className="h-8 w-8 shrink-0" />

          <nav
            aria-label="Principal"
            ref={listaRef}
            className="relative mx-auto hidden items-center gap-0.5 rounded-full border border-border bg-muted/40 p-1 md:flex"
          >
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm ring-1 ring-border transition-all duration-300"
              style={{ left: pilula.left, width: pilula.width, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            />
            {MENU_AUVP.map((item) => (
              <button
                key={item.id}
                data-item={item.id}
                onClick={() => {
                  setAtivo(item.id);
                  setPagina(item.label);
                }}
                onFocus={() => setAtivo(item.id)}
                aria-current={pagina === item.label ? "page" : undefined}
                className={cn(
                  "relative z-10 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-anek transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  ativo === item.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
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

export function MenuBuscaProtagonista() {
  const [aberto, setAberto] = useState(true);
  const [pagina, setPagina] = useState(itemMenu("inicio").label);
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
                placeholder="Buscar aulas, ativos e ferramentas…"
                aria-label="Buscar"
                className="flex-1 bg-transparent text-sm font-roboto text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="hidden items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-roboto text-muted-foreground sm:inline-flex">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </form>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navegar(UTILITARIOS_MENU_AUVP[0])}
                aria-label={UTILITARIOS_MENU_AUVP[0]}
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
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
            {MENU_AUVP.map((item) => (
              <button
                key={item.id}
                onClick={() => navegar(item.label)}
                tabIndex={aberto ? 0 : -1}
                aria-current={pagina === item.label ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-3 py-3 text-left transition-colors",
                  pagina === item.label ? "border-foreground/30 bg-muted" : "border-border bg-card hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-sm font-anek">{item.label}</span>
                {item.contador && (
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-roboto font-bold text-primary">
                    {item.contador}
                  </span>
                )}
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

const CODIGO_INSTITUCIONAL = `import { MENU_AUVP } from "@/data/menusCatalogo";  // mesma lista nos doze modelos

const [ativo, setAtivo] = useState("ferramentas");
const [aberto, setAberto] = useState<string | null>(null);

<nav aria-label="Principal" className="flex items-center gap-0.5">
  {MENU_AUVP.map((s) => (
    <div key={s.id} className="relative"
         onMouseEnter={() => setAberto(s.id)}
         onMouseLeave={() => setAberto((a) => (a === s.id ? null : a))}>
      <button
        onClick={() => setAtivo(s.id)}
        onFocus={() => setAberto(s.id)}          {/* abre no teclado, não só no mouse */}
        onBlur={() => setAberto((a) => (a === s.id ? null : a))}
        aria-current={ativo === s.id ? "page" : undefined}
        aria-describedby={"sistema-" + s.id}
        className="relative rounded-lg px-2.5 py-2 text-sm font-anek"
      >
        {s.label}
        {ativo === s.id && <span className="absolute bottom-1 left-2.5 right-2.5 h-px bg-foreground/30" />}
      </button>

      {/* popover sempre no DOM, animado por opacity + translateY */}
      <div id={"sistema-" + s.id} role="tooltip" className="absolute top-full left-1/2 z-30 mt-1.5 w-[220px]">…</div>
    </div>
  ))}
</nav>

{/* a página abaixo reserva altura: o showcase tem overflow-hidden e cortaria o popover */}
<PaginaFalsa titulo={paginaAtual.label} className="min-h-[168px]" />`;

const CODIGO_MEGA = `const [aberto, setAberto] = useState(true);
const ref = useFecharAoSair(aberto, setAberto);   // Esc + clique fora
const navegar = (destino: string) => { setPagina(destino); setAberto(false); };

<div ref={ref} onMouseLeave={() => setAberto(false)}>
  <nav aria-label="Principal" className="flex items-center gap-5">
    {MENU_AUVP.map((item) => {
      const temFilhos = Boolean(item.filhos?.length);   // todo item com filhos abre o seu painel
      return (
        <button
          onClick={() => (temFilhos ? setAbertoId((a) => (a === item.id ? null : item.id)) : navegar(item.label))}
          onMouseEnter={temFilhos ? () => setAbertoId(item.id) : undefined}
          aria-expanded={temFilhos ? abertoId === item.id : undefined}
          aria-current={!temFilhos && pagina === item.label ? "page" : undefined}
        >
          {item.label}
          {temFilhos && <ChevronDown className={cn("h-3.5 w-3.5", abertoId === item.id && "rotate-180")} />}
        </button>
      );
    })}
  </nav>

  {/* painel full-bleed: miniaturas dos filhos + coluna editorial */}
  <div style={{ maxHeight: aberto ? 420 : 0, opacity: aberto ? 1 : 0 }} aria-hidden={!aberto} className="overflow-hidden transition-all">
    {(aberto?.filhos ?? []).map((f) => (
      <button onClick={() => navegar(f.label)} tabIndex={aberto ? 0 : -1} className="group flex flex-col items-center gap-2">
        <span className="flex h-16 w-full items-center justify-center rounded-lg bg-muted"><f.icon /></span>
        <span className="text-xs font-anek font-medium">{f.label}</span>
      </button>
    ))}
  </div>
</div>`;

const CODIGO_FLUTUANTE = `{/* cartão flutuante em tokens do design system: acompanha claro/escuro
    e a troca de marca, em vez de fixar uma superfície escura */}
<div className="p-6">
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
    <div className="flex h-16 items-center gap-5 px-6">
      <Olho className="h-7 w-7" />
      <nav className="flex items-center gap-0.5">
        {MENU_AUVP.map((item) => {
          const temFilhos = Boolean(item.filhos?.length);   // cada item com filhos abre o SEU painel
          return (
            <button
              onClick={() => (temFilhos ? setAbertoId((a) => (a === item.id ? null : item.id)) : navegar(item.label))}
              onMouseEnter={temFilhos ? () => setAbertoId(item.id) : undefined}
              aria-expanded={temFilhos ? abertoId === item.id : undefined}
              className={cn("whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-anek", marcado ? "bg-muted text-foreground" : "text-muted-foreground")}
            >
              {item.label}
              {temFilhos && <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button className="px-3 py-2 text-sm text-muted-foreground">Entrar</button>
        <button className="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground">Começar</button>
      </div>
    </div>

    {/* mega painel: os filhos do item aberto em duas colunas, CTA à direita */}
    <div className="border-t border-border" style={{ maxHeight: aberto ? 400 : 0 }} aria-hidden={!aberto}>…</div>
  </div>
</div>`;

const CODIGO_DUAS_LINHAS = `const produto = PRODUTOS_MENU_AUVP.find((p) => p.id === produtoId);
const itens = produto.itens.map(itemMenu);        // cada produto recorta a mesma lista

// se a página aberta não existe no produto novo, cai no primeiro item dele
const trocarProduto = (id) => {
  const alvo = PRODUTOS_MENU_AUVP.find((p) => p.id === id);
  setProdutoId(id);
  if (!alvo.itens.some((i) => itemMenu(i).label === pagina)) setPagina(itemMenu(alvo.itens[0]).label);
};

{/* linha 1 — veste a cor do produto ativo (HSL literal: classe de paleta
    seria reescrita pelas travas de contraste de .dark no index.css) */}
<div className="flex h-10 items-center justify-between px-5 transition-colors duration-300"
     style={{ backgroundColor: "hsl(" + produto.fundo + ")", color: "hsl(" + produto.texto + ")" }}>
  {PRODUTOS_MENU_AUVP.map((p) => (
    <button onClick={() => trocarProduto(p.id)} aria-pressed={p.id === produtoId}>{p.label}</button>
  ))}
</div>

{/* linha 2 — só os itens daquele produto, com o sublinhado na cor dele */}
<nav aria-label={"Seções de " + produto.label} className="flex items-center gap-1">
  {itens.map((item) => (
    <button onClick={() => setPagina(item.label)} aria-current={pagina === item.label ? "page" : undefined} className="relative px-3 py-5">
      {item.label}
      {pagina === item.label && <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full" style={{ backgroundColor: "hsl(" + produto.fundo + ")" }} />}
    </button>
  ))}
</nav>`;

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

<nav ref={listaRef} className="relative mx-auto flex items-center gap-0.5 rounded-full border border-border bg-muted/40 p-1">
  <span className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm ring-1 ring-border transition-all duration-300"
        style={{ left: pilula.left, width: pilula.width }} />
  {MENU_AUVP.map((item) => (
    <button key={item.id} data-item={item.id} onClick={() => selecionar(item)} onFocus={() => setAtivo(item.id)}
            aria-current={pagina === item.label ? "page" : undefined} className="relative z-10 rounded-full px-3 py-1.5 text-sm">
      {item.label}
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
               placeholder="Buscar aulas, ativos e ferramentas…" className="flex-1 bg-transparent text-sm outline-none" />
        <kbd className="rounded-md border border-border bg-background px-1.5 text-[10px]">⌘K</kbd>
      </form>
    </div>
  </header>

  {/* gaveta de atalhos — os mesmos itens, com contador; fechada, saem da tabulação */}
  <div style={{ maxHeight: aberto ? 220 : 0 }} aria-hidden={!aberto} className="overflow-hidden transition-all">
    {MENU_AUVP.map((item) => (
      <button onClick={() => navegar(item.label)} tabIndex={aberto ? 0 : -1}>
        <item.icon className="h-4 w-4" />
        {item.label}
        {item.contador && <span className="rounded-full bg-primary/10 px-1.5 text-[10px] text-primary">{item.contador}</span>}
      </button>
    ))}
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
        description="O item com filhos abre um painel de largura total com miniaturas e uma coluna editorial à direita. Feito para quando há muitos destinos e o usuário escolhe pelo reconhecimento visual, não pela leitura da lista."
        code={CODIGO_MEGA}
      >
        <MenuMegaCatalogo />
      </ComponentShowcase>

      <ComponentShowcase
        title="3. Barra flutuante"
        description="Barra em cartão arredondado que flutua sobre o conteúdo, com CTA sólido à direita e mega painel em colunas de item + descrição. Usa os tokens do design system, então acompanha o tema claro e o escuro. Postura de produto: serve bem para landing pages e sites de produto."
        code={CODIGO_FLUTUANTE}
      >
        <MenuFlutuante />
      </ComponentShowcase>

      <ComponentShowcase
        title="4. Portal em duas linhas"
        description="A faixa de cima troca de produto e veste a cor dele; a linha de baixo mostra só os destinos daquele produto. Separa o que é ecossistema do que é navegação de conteúdo — o padrão de portais com mais de uma marca."
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
