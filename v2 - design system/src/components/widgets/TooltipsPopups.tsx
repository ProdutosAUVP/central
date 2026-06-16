import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

type Pos = "top" | "bottom" | "left" | "right";

function TooltipDemo({ pos }: { pos: Pos }) {
  // Posicionamento do balão em relação ao texto
  const balao =
    pos === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-3"
      : pos === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-3"
      : pos === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-3"
      : "left-full top-1/2 -translate-y-1/2 ml-3";

  // Setinha (quadrado rotacionado) sempre apontando para o trigger
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
</div>

// ──────────────────────────────────────────────────────────
// Posicionamento (top / bottom / left / right) — preview inferior
type Pos = "top" | "bottom" | "left" | "right";

function TooltipDemo({ pos }: { pos: Pos }) {
  const balao =
    pos === "top"    ? "bottom-full left-1/2 -translate-x-1/2 mb-3"
  : pos === "bottom" ? "top-full left-1/2 -translate-x-1/2 mt-3"
  : pos === "left"   ? "right-full top-1/2 -translate-y-1/2 mr-3"
  :                    "left-full top-1/2 -translate-y-1/2 ml-3";

  const seta =
    pos === "top"    ? "-bottom-1 left-1/2 -translate-x-1/2"
  : pos === "bottom" ? "-top-1 left-1/2 -translate-x-1/2"
  : pos === "left"   ? "-right-1 top-1/2 -translate-y-1/2"
  :                    "-left-1 top-1/2 -translate-y-1/2";

  return (
    <div className="relative inline-block group">
      <span className="text-sm font-medium text-foreground cursor-default">
        Texto de referência
      </span>
      <div
        role="tooltip"
        className={\`pointer-events-none absolute \${balao} z-10
                    bg-primary text-primary-foreground text-[11px]
                    font-roboto font-bold uppercase px-3 py-1.5 rounded-none
                    shadow-lg whitespace-nowrap opacity-0 scale-95
                    transition-all duration-150
                    group-hover:opacity-100 group-hover:scale-100\`}
      >
        Clique para interagir
        <div className={\`absolute \${seta} w-2 h-2 bg-primary rotate-45\`} />
      </div>
    </div>
  );
}

<div className="bg-card border border-border rounded-xl p-12">
  <div className="grid grid-cols-4 gap-4 items-center min-h-[140px]">
    <div className="flex justify-center"><TooltipDemo pos="top" /></div>
    <div className="flex justify-center"><TooltipDemo pos="bottom" /></div>
    <div className="flex justify-center"><TooltipDemo pos="left" /></div>
    <div className="flex justify-center"><TooltipDemo pos="right" /></div>
  </div>
  <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
    <div className="text-center text-sm font-roboto font-semibold">Top</div>
    <div className="text-center text-sm font-roboto font-semibold">Bottom</div>
    <div className="text-center text-sm font-roboto font-semibold">Left</div>
    <div className="text-center text-sm font-roboto font-semibold">Right</div>
  </div>
</div>`
          },
          {
            label: "HTML / CSS / JS",
            language: "html",
            code: `<!-- Tooltip animada (preview superior) -->
<div class="tt-stage">
  <div class="tt-bouncing">
    Clique para interagir
    <span class="tt-arrow tt-arrow-bottom"></span>
  </div>
</div>

<!-- Posicionamento — top / bottom / left / right (preview inferior) -->
<div class="tt-grid-card">
  <div class="tt-grid">
    <div class="tt-cell"><span class="tt-trigger" data-pos="top">Texto de referência<span class="tt-balloon">Clique para interagir<span class="tt-arrow"></span></span></span></div>
    <div class="tt-cell"><span class="tt-trigger" data-pos="bottom">Texto de referência<span class="tt-balloon">Clique para interagir<span class="tt-arrow"></span></span></span></div>
    <div class="tt-cell"><span class="tt-trigger" data-pos="left">Texto de referência<span class="tt-balloon">Clique para interagir<span class="tt-arrow"></span></span></span></div>
    <div class="tt-cell"><span class="tt-trigger" data-pos="right">Texto de referência<span class="tt-balloon">Clique para interagir<span class="tt-arrow"></span></span></span></div>
  </div>
  <div class="tt-labels">
    <div>Top</div><div>Bottom</div><div>Left</div><div>Right</div>
  </div>
</div>

<style>
  :root {
    --tt-bg: hsl(var(--primary));
    --tt-fg: hsl(var(--primary-foreground));
  }
  .tt-stage{
    background:hsl(var(--card)); border:1px solid hsl(var(--border));
    border-radius:12px; padding:3rem; min-height:200px;
    display:flex; align-items:center; justify-content:center;
  }
  .tt-bouncing{
    position:relative; background:var(--tt-bg); color:var(--tt-fg);
    font-family:'Roboto',sans-serif; font-size:11px; font-weight:700;
    text-transform:uppercase; padding:6px 12px; border-radius:0;
    box-shadow:0 10px 25px -5px rgba(0,0,0,.2);
    animation:tt-bounce 1s infinite;
  }
  @keyframes tt-bounce{
    0%,100%{ transform:translateY(-25%); animation-timing-function:cubic-bezier(.8,0,1,1); }
    50%   { transform:none;            animation-timing-function:cubic-bezier(0,0,.2,1); }
  }
  .tt-arrow,.tt-arrow-bottom{
    position:absolute; width:8px; height:8px; background:var(--tt-bg);
    transform:rotate(45deg);
  }
  .tt-arrow-bottom{ bottom:-4px; left:50%; margin-left:-4px; }

  .tt-grid-card{
    background:hsl(var(--card)); border:1px solid hsl(var(--border));
    border-radius:12px; padding:3rem;
  }
  .tt-grid{
    display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
    align-items:center; min-height:140px;
  }
  .tt-cell{ display:flex; justify-content:center; }
  .tt-trigger{
    position:relative; display:inline-block;
    font-size:14px; font-weight:500; color:hsl(var(--foreground));
    cursor:default;
  }
  .tt-balloon{
    position:absolute; z-index:10;
    background:var(--tt-bg); color:var(--tt-fg);
    font-family:'Roboto',sans-serif; font-size:11px; font-weight:700;
    text-transform:uppercase; padding:6px 12px;
    box-shadow:0 10px 25px -5px rgba(0,0,0,.2); white-space:nowrap;
    opacity:0; transform:scale(.95); transition:all .15s ease;
    pointer-events:none;
  }
  .tt-trigger:hover .tt-balloon{ opacity:1; transform:scale(1); }

  /* Posicionamento por data-pos */
  .tt-trigger[data-pos="top"]    .tt-balloon{ bottom:100%; left:50%; transform:translateX(-50%) scale(.95); margin-bottom:12px; }
  .tt-trigger[data-pos="top"]:hover .tt-balloon{ transform:translateX(-50%) scale(1); }
  .tt-trigger[data-pos="top"]    .tt-arrow{ bottom:-4px; left:50%; margin-left:-4px; }

  .tt-trigger[data-pos="bottom"] .tt-balloon{ top:100%; left:50%; transform:translateX(-50%) scale(.95); margin-top:12px; }
  .tt-trigger[data-pos="bottom"]:hover .tt-balloon{ transform:translateX(-50%) scale(1); }
  .tt-trigger[data-pos="bottom"] .tt-arrow{ top:-4px; left:50%; margin-left:-4px; }

  .tt-trigger[data-pos="left"]   .tt-balloon{ right:100%; top:50%; transform:translateY(-50%) scale(.95); margin-right:12px; }
  .tt-trigger[data-pos="left"]:hover .tt-balloon{ transform:translateY(-50%) scale(1); }
  .tt-trigger[data-pos="left"]   .tt-arrow{ right:-4px; top:50%; margin-top:-4px; }

  .tt-trigger[data-pos="right"]  .tt-balloon{ left:100%; top:50%; transform:translateY(-50%) scale(.95); margin-left:12px; }
  .tt-trigger[data-pos="right"]:hover .tt-balloon{ transform:translateY(-50%) scale(1); }
  .tt-trigger[data-pos="right"]  .tt-arrow{ left:-4px; top:50%; margin-top:-4px; }

  .tt-labels{
    display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
    margin-top:1.5rem; padding-top:1.5rem;
    border-top:1px solid hsl(var(--border));
    text-align:center; font-family:'Roboto',sans-serif;
    font-size:14px; font-weight:600; color:hsl(var(--foreground));
  }
</style>`
          }
        ]}
      />
    </div>
  );
}
