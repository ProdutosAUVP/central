import React from "react";
import { Check, ChevronRight } from "lucide-react";
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
    <div className="group/nc flex gap-3.5 rounded-xl border bg-card p-4 transition-[border-color,box-shadow] duration-300 ease-apple sm:hover:border-primary/30 sm:hover:shadow-md">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-base leading-none">
        {item.emoji}
      </span>
      <div className="flex-1 min-w-0 space-y-3">
        <div>
          <p className="font-bold font-anek text-foreground text-sm mb-1 leading-snug">{item.titulo}</p>
          <p className="text-xs font-roboto text-muted-foreground leading-relaxed">{item.descricao}</p>
        </div>

        {temAntesDepois && (
          <div
            className={cn(
              "grid gap-px overflow-hidden rounded-lg border bg-border",
              item.antes && item.depois && "sm:grid-cols-2"
            )}
          >
            {item.antes && (
              <div className="bg-muted/40 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground font-roboto mb-1">
                  Antes
                </p>
                <p className="text-xs font-roboto text-muted-foreground leading-relaxed">{item.antes}</p>
              </div>
            )}
            {item.depois && (
              <div className="bg-primary/5 p-3">
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
                  <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-px" strokeWidth={3} />
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
            className="inline-flex items-center gap-1 text-xs font-semibold font-roboto text-primary sm:hover:underline"
          >
            Ver mais{" "}
            <ChevronRight className="h-3 w-3 transition-transform duration-300 ease-apple sm:group-hover/nc:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}
