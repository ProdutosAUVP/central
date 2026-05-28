import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

type Pos = "top" | "bottom" | "left" | "right";

function TooltipDemo({ pos }: { pos: Pos }) {
  const balao =
    pos === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-3"
      : pos === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-3"
      : pos === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-3"
      : "left-full top-1/2 -translate-y-1/2 ml-3";

  const seta =
    pos === "top"
      ? "-bottom-1 left-1/2 -translate-x-1/2"
      : pos === "bottom"
      ? "-top-1 left-1/2 -translate-x-1/2"
      : pos === "left"
      ? "-right-1 top-1/2 -translate-y-1/2"
      : "-left-1 top-1/2 -translate-y-1/2";

  return (
    <div className="relative inline-block group">
      <span className="text-sm font-medium text-foreground cursor-default">
        Texto de referência
      </span>
      <div
        role="tooltip"
        className={`pointer-events-none absolute ${balao} z-10 bg-primary text-primary-foreground text-[11px] font-roboto font-bold uppercase px-3 py-1.5 rounded-none shadow-lg whitespace-nowrap opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100`}
      >
        Clique para interagir
        <div className={`absolute ${seta} w-2 h-2 bg-primary rotate-45`} />
      </div>
    </div>
  );
}

export function TooltipsPopups() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Tooltip Animada de Conversão</h3>
        <p className="text-muted-foreground mb-4">
          Bordas retas (<code className="bg-muted px-1 rounded text-sm font-mono">rounded-none</code>), tipografia Roboto Uppercase e animação de flutuação vertical contínua.
        </p>
        <div className="bg-card border border-border p-12 rounded-xl flex items-center justify-center relative min-h-[200px]">
          <div className="relative bg-primary text-primary-foreground text-[11px] font-roboto font-bold uppercase px-3 py-1.5 rounded-none shadow-lg whitespace-nowrap animate-bounce">
            Clique para interagir
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Posicionamento em relação ao texto</h3>
        <p className="text-muted-foreground mb-6">
          Quatro variações: tooltip <strong>acima</strong> (vertical/topo), <strong>abaixo</strong> (vertical/base),
          à <strong>esquerda</strong> e à <strong>direita</strong> do elemento de referência.
        </p>
        <div className="bg-card border border-border rounded-xl p-12">
          <div className="grid grid-cols-4 gap-4 items-center min-h-[140px]">
            <div className="flex justify-center"><TooltipDemo pos="top" /></div>
            <div className="flex justify-center"><TooltipDemo pos="bottom" /></div>
            <div className="flex justify-center"><TooltipDemo pos="left" /></div>
            <div className="flex justify-center"><TooltipDemo pos="right" /></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center text-sm font-roboto font-semibold text-foreground">Top</div>
            <div className="text-center text-sm font-roboto font-semibold text-foreground">Bottom</div>
            <div className="text-center text-sm font-roboto font-semibold text-foreground">Left</div>
            <div className="text-center text-sm font-roboto font-semibold text-foreground">Right</div>
          </div>
        </div>
      </div>

      <CodeBlock collapsible
        tabs={[
          {
            label: "React",
            language: "tsx",
            code: `// Tooltip animada da landing page (preview superior)
<div className="bg-card border border-border p-12 rounded-xl flex items-center justify-center min-h-[200px]">
  <div className="relative bg-primary text-primary-foreground text-[11px]
                  font-roboto font-bold uppercase px-3 py-1.5 rounded-none
                  shadow-lg whitespace-nowrap animate-bounce">
    Clique para interagir
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2
                    w-2 h-2 bg-primary rotate-45" />
  </div>
</div>`
          }
        ]}
      />
    </div>
  );
}
