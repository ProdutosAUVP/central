import React, { useEffect, useId, useRef, useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * O "i" que explica uma dobra da Central.
 *
 * Não usa o Tooltip do shadcn de propósito: aquele só abre no hover, e em
 * telas de toque — onde hover não existe — o botão ficava sem resposta
 * nenhuma. Aqui o painel abre das duas formas: passar o mouse mostra, e
 * clicar (ou tocar) fixa até fechar. Escape e clique fora fecham.
 *
 * O painel se posiciona pelo ancestral posicionado mais próximo, e não pelo
 * botão: ancorado no botão, ele começaria no meio da linha do título e
 * vazaria pela direita em telas estreitas. Quem usa este componente precisa
 * ter `relative` na linha do cabeçalho — é o que alinha o painel à margem
 * esquerda da dobra.
 */
export function InfoDobra({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  /** Fixado por clique: o painel sobrevive ao mouse sair de cima. */
  const [fixado, setFixado] = useState(false);
  const areaRef = useRef<HTMLSpanElement>(null);
  const painelId = useId();

  const fechar = () => { setAberto(false); setFixado(false); };

  useEffect(() => {
    if (!aberto) return;
    const clicouFora = (e: PointerEvent) => {
      if (!areaRef.current?.contains(e.target as Node)) fechar();
    };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") fechar(); };
    document.addEventListener("pointerdown", clicouFora);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", clicouFora);
      document.removeEventListener("keydown", escape);
    };
  }, [aberto]);

  return (
    <span ref={areaRef} className="contents">
      <button
        type="button"
        aria-label={`Sobre a seção ${titulo}`}
        aria-expanded={aberto}
        aria-controls={aberto ? painelId : undefined}
        className={cn(
          "shrink-0 rounded-full transition-colors duration-300 ease-apple",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          aberto ? "text-muted-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
        )}
        onClick={() => {
          if (fixado) fechar();
          else { setAberto(true); setFixado(true); }
        }}
        /* Só o mouse abre por aproximação — no toque, o pointerenter chega
           junto com o clique e as duas coisas brigariam. */
        onPointerEnter={(e) => { if (e.pointerType === "mouse") setAberto(true); }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse" && !fixado) setAberto(false); }}
        onFocus={() => setAberto(true)}
        onBlur={() => { if (!fixado) setAberto(false); }}
      >
        <Info className="h-4 w-4" />
      </button>

      {aberto && (
        <div
          id={painelId}
          role="note"
          className={cn(
            "absolute left-0 top-full z-50 mt-1 w-[min(30rem,100%)]",
            "rounded-xl border bg-popover p-4 shadow-xl",
            "text-xs font-roboto leading-relaxed text-muted-foreground",
            "animate-in fade-in slide-in-from-top-1 duration-200"
          )}
        >
          {children}
        </div>
      )}
    </span>
  );
}
