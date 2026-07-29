import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, CalendarDays, Newspaper, Rocket, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { VoltarParaCentral } from "@/components/VoltarParaCentral";
import { NovidadeCard } from "@/components/widgets/NovidadeCard";
import { novidadesMensais, mesNumero, type NovidadeMensal } from "@/data/novidades";
import { cn } from "@/lib/utils";

/**
 * Mural de Novidades completo. Renderiza a mesma fonte de dados do
 * accordion do Hub (src/data/novidades.ts) como uma linha do tempo:
 * hero com estatísticas, navegação por mês (com scroll-spy) e um
 * card por mês pendurado na linha vertical.
 */

const anchorId = (n: NovidadeMensal) => `mes-${mesNumero(n.mes)}-${n.ano}`;

/* Dados estáticos — calculados uma vez fora do componente. */
const mesIds = novidadesMensais.map(anchorId);
const totalAtualizacoes = novidadesMensais.reduce((acc, n) => acc + n.items.length, 0);
const spoilersNoRadar = novidadesMensais[0]?.spoiler.length ?? 0;

// ─── Scroll reveal (mesmo padrão do Hub/TimePage) ───────────────────────────

/* threshold 0: as seções de mês são altas — em telas pequenas uma fração
   percentual pode nunca ficar visível e o reveal nunca dispararia. */
function useReveal(threshold = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-apple will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Destaca na navegação o mês atualmente visível na viewport. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // Faixa estreita no terço superior da tela: o mês que a cruza é o ativo.
      { rootMargin: "-15% 0px -70% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Stat({ icon: Icon, valor, rotulo }: { icon: React.ElementType; valor: React.ReactNode; rotulo: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xl font-extrabold font-anek text-foreground leading-none">{valor}</p>
        <p className="text-[11px] text-muted-foreground font-roboto mt-0.5">{rotulo}</p>
      </div>
    </div>
  );
}

export default function NovidadesPage() {
  const mesAtivo = useScrollSpy(mesIds);

  return (
    <PageShell
      width="4xl"
      footer="Novidades — Time de Produto AUVP"
      mainClassName="py-8 md:py-12 space-y-6"
      hero={
        <PageHero
          id="topo"
          icon={Newspaper}
          title="Mural de Novidades"
          description="Tudo o que a Equipe AUVP entregou, mês a mês — atualizações, lançamentos e os spoilers do que vem por aí."
          actions={<VoltarParaCentral />}
        />
      }
    >

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat icon={CalendarDays} valor={novidadesMensais.length} rotulo="meses de entregas" />
        <Stat icon={Sparkles} valor={totalAtualizacoes} rotulo="atualizações publicadas" />
        <Stat icon={Rocket} valor={spoilersNoRadar} rotulo="spoilers no radar" />
      </div>

      {/* Navegação por mês — sticky logo abaixo do header global */}
      <nav
        aria-label="Ir para o mês"
        className="sticky top-14 md:top-16 z-40 -mx-4 md:-mx-8 px-4 md:px-8 py-2.5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b"
      >
        <div className="flex gap-2 overflow-x-auto timeline-scrollbar pb-0.5">
          {novidadesMensais.map((n) => {
            const id = anchorId(n);
            const ativo = mesAtivo === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold font-roboto transition-colors duration-300",
                  ativo
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground sm:hover:border-primary/40 sm:hover:text-primary"
                )}
              >
                {n.mes} {n.ano}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Linha do tempo */}
      <div className="relative space-y-8 md:space-y-10 pt-2">
        <div
          aria-hidden
          className="hidden sm:block absolute left-[21px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
        />
        {novidadesMensais.map((n, i) => (
          <Reveal key={anchorId(n)}>
            {/* scrollMarginTop inline: precisa somar header + nav sticky, e a
                regra global `section[id]` (5rem) venceria uma classe scroll-mt. */}
            <section id={anchorId(n)} style={{ scrollMarginTop: "7.5rem" }} className="relative sm:pl-16">

              {/* Nó do mês sobre a linha */}
              <div
                aria-hidden
                className="hidden sm:flex absolute left-0 top-5 h-11 w-11 items-center justify-center rounded-full border-2 border-primary/25 bg-background shadow-sm"
              >
                <span className="text-sm font-extrabold font-anek text-primary leading-none">{mesNumero(n.mes)}</span>
              </div>

              <article className="rounded-2xl border bg-card overflow-hidden transition-[border-color,box-shadow] duration-300 ease-apple sm:hover:border-primary/25 sm:hover:shadow-lg">
                <header className="flex flex-wrap items-center gap-3 px-5 py-4 md:px-6 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                  <div className="flex sm:hidden h-10 w-10 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 leading-none">
                    <span className="text-[8px] font-bold font-roboto uppercase tracking-wider mt-1.5">mês</span>
                    <span className="text-base font-extrabold font-anek leading-none">{mesNumero(n.mes)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold font-anek text-foreground leading-tight">
                      {n.mes} de {n.ano}
                    </h2>
                    <p className="text-[11px] text-muted-foreground font-roboto">{n.items.length} atualizações</p>
                  </div>
                  {i === 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold font-roboto uppercase tracking-wider text-primary">
                      <Sparkles className="h-3 w-3" /> Mais recente
                    </span>
                  )}
                </header>

                <div className="px-4 py-5 md:px-6 md:py-6 space-y-5">
                  {n.intro && (
                    <p className="text-sm font-roboto text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4">
                      {n.intro}
                    </p>
                  )}

                  <div className="space-y-3">
                    {n.items.map((item, j) => (
                      <NovidadeCard key={j} item={item} />
                    ))}
                  </div>

                  {n.spoiler.length > 0 && (
                    <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 md:p-5">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold font-roboto uppercase tracking-wider text-primary mb-3">
                        <Rocket className="h-3.5 w-3.5" /> O que vem por aí
                      </p>
                      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {n.spoiler.map((s, k) => (
                          <li key={k} className="text-xs font-roboto text-muted-foreground leading-relaxed">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {n.rodape && (
                    <p className="text-xs font-roboto text-muted-foreground italic border-t pt-4">{n.rodape}</p>
                  )}
                </div>
              </article>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Voltar ao topo e para a Central */}
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <a
          href="#topo"
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-xs font-semibold font-roboto text-muted-foreground transition-colors duration-300 sm:hover:border-primary/40 sm:hover:text-primary"
        >
          <ArrowUp className="h-3.5 w-3.5" /> Voltar ao topo
        </a>
        <VoltarParaCentral className="bg-card" />
      </div>

    </PageShell>
  );
}
