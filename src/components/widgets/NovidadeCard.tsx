import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NovidadeItem } from "@/data/novidades";

/**
 * Card de uma entrada do Mural de Novidades — usado pelo accordion do Hub
 * e pela página /novidades, garantindo que as duas telas rendeirzem o
 * mesmo conteúdo da mesma forma.
 *
 * Cada categoria de informação (antes/depois, resultados, link) só
 * aparece quando o dado existe: como o espaçamento vem do `space-y-*`
 * do container pai, remover uma categoria nunca deixa vão nem divisor
 * solto — o card se reorganiza sozinho.
 */
export function NovidadeCard({ item }: { item: NovidadeItem }) {
  const temAntesDepois = Boolean(item.antes || item.depois);
  const temResultados = Boolean(item.resultados && item.resultados.length > 0);

  return (
    <div className="flex gap-3">
      <span className="text-base leading-none shrink-0 mt-0.5">{item.emoji}</span>
      <div className="flex-1 min-w-0 space-y-2.5">
        <div>
          <p className="font-bold font-anek text-foreground text-sm mb-1 leading-snug">{item.titulo}</p>
          <p className="text-xs font-roboto text-muted-foreground leading-relaxed">{item.descricao}</p>
        </div>

        {temAntesDepois && (
          <div
            className={cn(
              "grid gap-3 rounded-lg border bg-muted/30 p-3",
              item.antes && item.depois ? "sm:grid-cols-2" : "grid-cols-1"
            )}
          >
            {item.antes && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground font-roboto mb-1">
                  Antes
                </p>
                <p className="text-xs font-roboto text-muted-foreground leading-relaxed">{item.antes}</p>
              </div>
            )}
            {item.depois && (
              <div className={cn(item.antes && "sm:border-l sm:pl-3 border-border")}>
                <p className="text-[9px] font-bold uppercase tracking-wider text-primary font-roboto mb-1">
                  Como ficou
                </p>
                <p className="text-xs font-roboto text-foreground/80 leading-relaxed">{item.depois}</p>
              </div>
            )}
          </div>
        )}

        {temResultados && (
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground font-roboto mb-1.5">
              Resultados
            </p>
            <ul className="space-y-1">
              {item.resultados!.map((r, k) => (
                <li key={k} className="flex gap-2 text-xs font-roboto text-muted-foreground">
                  <span className="text-primary shrink-0 mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold font-roboto text-primary hover:underline"
          >
            Ver mais <ChevronRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
