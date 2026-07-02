import React from "react";
import { Newspaper } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { NovidadeCard } from "@/components/widgets/NovidadeCard";
import { novidadesMensais, mesNumero } from "@/data/novidades";

/**
 * Mural de Novidades completo. Renderiza a mesma fonte de dados do
 * accordion do Hub (src/data/novidades.ts), mês a mês, sem colapsar.
 */
export default function NovidadesPage() {
  return (
    <PageShell width="4xl" footer="Novidades — Time de Produto AUVP" mainClassName="py-12 space-y-8">

      {/* Hero */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
          <Newspaper className="h-3.5 w-3.5" /> Novidades
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">
          Mural de Novidades
        </h1>
        <p className="text-muted-foreground font-roboto max-w-2xl">
          Tudo o que a Equipe AUVP entregou, mês a mês — atualizações, lançamentos e os spoilers do que vem por aí.
        </p>
      </div>

      {/* Meses */}
      <div className="space-y-6">
        {novidadesMensais.map((n, i) => (
          <section key={i} className="rounded-2xl border bg-card overflow-hidden">
            <header className="flex items-center gap-3 px-5 py-4 border-b bg-muted/30">
              <div className="flex flex-col h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 leading-none">
                <span className="text-[8px] font-bold font-roboto uppercase tracking-wider mt-1.5">mês</span>
                <span className="text-base font-extrabold font-anek leading-none">{mesNumero(n.mes)}</span>
              </div>
              <div>
                <h2 className="font-bold font-anek text-foreground leading-tight">{n.mes} {n.ano}</h2>
                <p className="text-[11px] text-muted-foreground font-roboto">{n.items.length} atualizações</p>
              </div>
            </header>

            <div className="px-5 py-6 space-y-5">
              {n.intro && (
                <p className="text-sm font-roboto text-muted-foreground leading-relaxed">{n.intro}</p>
              )}
              <div className="space-y-5">
                {n.items.map((item, j) => (
                  <NovidadeCard key={j} item={item} />
                ))}
              </div>
              {n.spoiler.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-[10px] font-bold font-roboto uppercase tracking-wider text-muted-foreground mb-3">
                    🚀 O que vem por aí
                  </p>
                  <ul className="space-y-1.5">
                    {n.spoiler.map((s, k) => (
                      <li key={k} className="text-xs font-roboto text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {n.rodape && (
                <p className="text-xs font-roboto text-muted-foreground italic border-t pt-4">{n.rodape}</p>
              )}
            </div>
          </section>
        ))}
      </div>

    </PageShell>
  );
}
