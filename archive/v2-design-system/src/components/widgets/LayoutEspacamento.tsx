import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function LayoutEspacamento() {
  return (
    <div className="space-y-12">
      {/* Breakpoints */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-bold mb-4 font-anek">Breakpoints e Containers</h3>
        <div className="space-y-4">
          {[
            { label: "Desktop", value: "1200px" },
            { label: "Tablet", value: "720px" },
            { label: "Mobile", value: "320px" },
          ].map((bp, i, arr) => (
            <div key={bp.label} className={`flex items-center justify-between ${i < arr.length - 1 ? "border-b border-border pb-2" : ""}`}>
              <span className="font-mono text-muted-foreground">{bp.label}</span>
              <span className="font-bold text-foreground">{bp.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Espaçamento Vertical */}
        <div>
          <h3 className="text-lg font-bold mb-4 font-anek">Espaçamento Vertical (Dobras)</h3>
          <div className="flex flex-col gap-0 border border-border rounded overflow-hidden max-w-md bg-muted">
            <div className="bg-card h-20 flex items-center justify-center text-muted-foreground">Conteúdo Dobra A</div>
            <div className="h-[60px] bg-destructive/10 w-full flex items-center justify-center text-destructive text-xs font-mono font-bold border-y border-destructive/20">
              60px Padding (Múltiplo de 15)
            </div>
            <div className="bg-card h-20 flex items-center justify-center text-muted-foreground">Conteúdo Dobra B</div>
          </div>
        </div>

        {/* Regra dos 15px */}
        <div>
          <h3 className="text-lg font-bold mb-4 font-anek">Regra dos 15px (Gaps & Margins)</h3>
          <div className="bg-card p-6 border border-border rounded-xl flex flex-col gap-[15px]">
            <div className="bg-muted h-10 w-full flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border">Elemento 1</div>
            <div className="h-[15px] bg-accent flex items-center justify-center text-accent-foreground text-[10px] font-mono font-bold">15px Gap</div>
            <div className="bg-muted h-10 w-full flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border">Elemento 2</div>
            <div className="h-[30px] bg-accent flex items-center justify-center text-accent-foreground text-[10px] font-mono font-bold">30px Gap</div>
            <div className="bg-muted h-10 w-full flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border">Elemento 3</div>
          </div>
        </div>
      </div>

      {/* Padding de Cards */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Padding de Cards</h3>
        <p className="text-sm text-muted-foreground mb-[32px] font-roboto">
          O padding pode variar de tamanho, mas sempre por múltiplos de 4 e mantendo as verticais 4px menores que as laterais.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          <div className="relative bg-card border border-border rounded-xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[12px] bg-accent/20 flex items-center justify-center text-[10px] font-mono font-bold text-accent">12px topo</div>
            <div className="absolute inset-x-0 bottom-0 h-[12px] bg-accent/20 flex items-center justify-center text-[10px] font-mono font-bold text-accent">12px base</div>
            <div className="absolute inset-y-0 left-0 w-[16px] bg-destructive/20 flex items-center justify-center text-[9px] font-mono font-bold text-destructive [writing-mode:vertical-rl] rotate-180">16px lat.</div>
            <div className="absolute inset-y-0 right-0 w-[16px] bg-destructive/20 flex items-center justify-center text-[9px] font-mono font-bold text-destructive [writing-mode:vertical-rl] rotate-180">16px lat.</div>
            <div className="px-[16px] py-[12px]">
              <div className="bg-muted border border-dashed border-border rounded p-6 flex items-center justify-center text-sm text-muted-foreground min-h-[120px]">
                Conteúdo do card
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-center gap-3 text-sm">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-mono text-muted-foreground">Padding lateral</span>
              <span className="font-bold text-foreground">16px</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-muted-foreground">Padding vertical</span>
              <span className="font-bold text-foreground">12px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Espaçamento entre título e conteúdo / dobras */}
      <div>
        <h3 className="text-lg font-bold mb-[32px] font-anek">Espaçamento entre Título, Conteúdo e Dobras</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-0">
          <div className="bg-muted/50 border border-dashed border-border rounded px-4 py-2 text-sm font-bold font-anek">Título da Seção</div>
          <div className="h-[32px] bg-accent/20 flex items-center justify-center text-[10px] font-mono font-bold text-accent">32px — Título → Conteúdo</div>
          <div className="bg-muted border border-dashed border-border rounded px-4 py-6 text-sm text-muted-foreground text-center">Conteúdo da Dobra A</div>
          <div className="h-[48px] bg-destructive/15 flex items-center justify-center text-[10px] font-mono font-bold text-destructive">48px — Entre Dobras</div>
          <div className="bg-muted/50 border border-dashed border-border rounded px-4 py-2 text-sm font-bold font-anek">Título da Próxima Seção</div>
          <div className="h-[32px] bg-accent/20 flex items-center justify-center text-[10px] font-mono font-bold text-accent">32px — Título → Conteúdo</div>
          <div className="bg-muted border border-dashed border-border rounded px-4 py-6 text-sm text-muted-foreground text-center">Conteúdo da Dobra B</div>
        </div>
      </div>

      {/* Bento Grid */}
      <div>
        <h3 className="text-lg font-bold mb-[32px] font-anek">Bento Grid (Muitos Cards)</h3>
        <p className="text-sm text-muted-foreground mb-4 font-roboto">
          Quando houver muitos cards, organize-os em formato <strong>bento</strong>, com gaps verticais e horizontais de <strong>12 a 16px</strong>.
        </p>
        <div
          className="w-full grid gap-[16px] p-[16px] bg-muted/40 rounded-xl border border-border"
          style={{
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, 90px)",
            gridTemplateAreas: `
              "hero hero hero hero aside3 aside3"
              "hero hero hero hero aside3 aside3"
              "aside2 aside2 aside4 aside4 aside3 aside3"
              "aside2 aside2 aside5 aside5 aside5 aside5"
            `,
          }}
        >
          <div className="rounded-[12px] bg-card border border-border flex flex-col items-center justify-center text-center px-[16px] py-[12px]" style={{ gridArea: "hero" }}>
            <span className="font-bold font-anek text-foreground">Hero</span>
            <span className="text-xs text-muted-foreground font-roboto">Destaque grande (4x2)</span>
          </div>
          <div className="rounded-[12px] bg-foreground text-background flex flex-col items-center justify-center text-center px-[16px] py-[12px]" style={{ gridArea: "aside2" }}>
            <span className="font-bold font-anek">Aside 2</span>
            <span className="text-xs opacity-70 font-roboto">Rodapé esquerdo (2x1)</span>
          </div>
          <div className="rounded-[12px] flex flex-col items-center justify-center text-center px-[16px] py-[12px]" style={{ gridArea: "aside3", backgroundColor: "#E9AB53", color: "#1a1a1a" }}>
            <span className="font-bold font-anek">Aside 3</span>
            <span className="text-xs opacity-80 font-roboto">Coluna alta (2x3)</span>
          </div>
          <div className="rounded-[12px] bg-card border border-border flex flex-col items-center justify-center text-center px-[16px] py-[12px]" style={{ gridArea: "aside4" }}>
            <span className="font-bold font-anek text-foreground">Aside 4</span>
            <span className="text-xs text-muted-foreground font-roboto">Centro inferior (2x1)</span>
          </div>
          <div className="rounded-[12px] bg-card border border-border flex flex-col items-center justify-center text-center px-[16px] py-[12px]" style={{ gridArea: "aside5" }}>
            <span className="font-bold font-anek text-foreground">Aside 5</span>
            <span className="text-xs text-muted-foreground font-roboto">Rodapé largo (4x1)</span>
          </div>
        </div>
      </div>

      <CodeBlock collapsible
        tabs={[
          {
            label: "React",
            language: "tsx",
            code: `// Padding de Cards
<div className="px-[16px] py-[12px] rounded-[12px] bg-card border">...</div>

// Espaçamento entre título da seção e conteúdo
<section>
  <h2 className="mb-[32px]">Título da Seção</h2>
  <div>Conteúdo</div>
</section>

// Espaçamento entre dobras (blocos)
<main className="space-y-[48px]">
  <section>...</section>
  <section>...</section>
</main>

// Bento Grid (gap 12-16px)
<div
  className="grid gap-[16px] p-[16px]"
  style={{
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    gridTemplateAreas: \`
      "hero hero hero hero aside3 aside3"
      "hero hero hero hero aside3 aside3"
      "aside2 aside2 aside4 aside4 aside3 aside3"
      "aside2 aside2 aside5 aside5 aside5 aside5"
    \`,
  }}
>
  <div style={{ gridArea: "hero" }} className="rounded-[12px] px-[16px] py-[12px]">Hero</div>
  <div style={{ gridArea: "aside2" }}>...</div>
</div>`
          },
          {
            label: "HTML / CSS / JS",
            language: "css",
            code: `/* Padding padrão de cards */
.card { padding: 12px 16px; border-radius: 12px; }

/* Título da seção → Conteúdo */
.section-title { margin-bottom: 32px; }

/* Entre dobras (blocos) */
.fold + .fold { margin-top: 48px; }

/* Bento Grid */
.bento {
  display: grid;
  gap: 16px;          /* 12-16px */
  padding: 16px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "hero hero hero hero aside3 aside3"
    "hero hero hero hero aside3 aside3"
    "aside2 aside2 aside4 aside4 aside3 aside3"
    "aside2 aside2 aside5 aside5 aside5 aside5";
}
.bento > .hero   { grid-area: hero; }
.bento > .aside2 { grid-area: aside2; }
.bento > .aside3 { grid-area: aside3; }
.bento > .aside4 { grid-area: aside4; }
.bento > .aside5 { grid-area: aside5; }`
          }
        ]}
      />
    </div>
  );
}
