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
            code: `export function LayoutEspacamento() {
  return (
    <div className="space-y-12">
      {/* Breakpoints */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-bold mb-4 font-anek">Breakpoints e Containers</h3>
        {[
          { label: "Desktop", value: "1200px" },
          { label: "Tablet", value: "720px" },
          { label: "Mobile", value: "320px" },
        ].map((bp) => (
          <div key={bp.label} className="flex items-center justify-between border-b border-border pb-2">
            <span className="font-mono text-muted-foreground">{bp.label}</span>
            <span className="font-bold text-foreground">{bp.value}</span>
          </div>
        ))}
      </div>

      {/* Espaçamento Vertical */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Espaçamento Vertical (Dobras)</h3>
        <div className="flex flex-col border border-border rounded overflow-hidden max-w-md bg-muted">
          <div className="bg-card h-20 flex items-center justify-center text-muted-foreground">Conteúdo Dobra A</div>
          <div className="h-[60px] bg-destructive/10 flex items-center justify-center text-destructive text-xs font-mono font-bold">
            60px Padding (Múltiplo de 15)
          </div>
          <div className="bg-card h-20 flex items-center justify-center text-muted-foreground">Conteúdo Dobra B</div>
        </div>
      </div>

      {/* Regra dos 15px */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Regra dos 15px (Gaps & Margins)</h3>
        <div className="bg-card p-6 border border-border rounded-xl flex flex-col gap-[15px]">
          <div className="bg-muted h-10 border border-dashed border-border text-xs">Elemento 1</div>
          <div className="h-[15px] bg-accent text-accent-foreground text-[10px] font-mono font-bold">15px Gap</div>
          <div className="bg-muted h-10 border border-dashed border-border text-xs">Elemento 2</div>
          <div className="h-[30px] bg-accent text-accent-foreground text-[10px] font-mono font-bold">30px Gap</div>
          <div className="bg-muted h-10 border border-dashed border-border text-xs">Elemento 3</div>
        </div>
      </div>

      {/* Padding de Cards */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Padding de Cards</h3>
        <div className="relative bg-card border border-border rounded-xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[12px] bg-accent/20 text-accent text-[10px]">12px topo</div>
          <div className="absolute inset-x-0 bottom-0 h-[12px] bg-accent/20 text-accent text-[10px]">12px base</div>
          <div className="absolute inset-y-0 left-0 w-[16px] bg-destructive/20 text-destructive text-[9px]">16px lat.</div>
          <div className="absolute inset-y-0 right-0 w-[16px] bg-destructive/20 text-destructive text-[9px]">16px lat.</div>
          <div className="px-[16px] py-[12px]">
            <div className="bg-muted border border-dashed border-border rounded p-6 min-h-[120px]">Conteúdo do card</div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="font-mono text-muted-foreground">Padding lateral</span>
            <span className="font-bold text-foreground">16px</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-muted-foreground">Padding vertical</span>
            <span className="font-bold text-foreground">12px</span>
          </div>
        </div>
      </div>

      {/* Título, Conteúdo e Dobras */}
      <div>
        <h3 className="text-lg font-bold mb-[32px] font-anek">Espaçamento entre Título, Conteúdo e Dobras</h3>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="bg-muted/50 border border-dashed rounded px-4 py-2 text-sm font-bold font-anek">Título da Seção</div>
          <div className="h-[32px] bg-accent/20 text-accent text-[10px] font-mono font-bold">32px — Título → Conteúdo</div>
          <div className="bg-muted border border-dashed rounded px-4 py-6 text-sm text-center">Conteúdo da Dobra A</div>
          <div className="h-[48px] bg-destructive/15 text-destructive text-[10px] font-mono font-bold">48px — Entre Dobras</div>
          <div className="bg-muted/50 border border-dashed rounded px-4 py-2 text-sm font-bold font-anek">Título da Próxima Seção</div>
          <div className="h-[32px] bg-accent/20 text-accent text-[10px] font-mono font-bold">32px — Título → Conteúdo</div>
          <div className="bg-muted border border-dashed rounded px-4 py-6 text-sm text-center">Conteúdo da Dobra B</div>
        </div>
      </div>

      {/* Bento Grid */}
      <div>
        <h3 className="text-lg font-bold mb-[32px] font-anek">Bento Grid (Muitos Cards)</h3>
        <div
          className="w-full grid gap-[16px] p-[16px] bg-muted/40 rounded-xl border border-border"
          style={{
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, 90px)",
            gridTemplateAreas: \`
              "hero hero hero hero aside3 aside3"
              "hero hero hero hero aside3 aside3"
              "aside2 aside2 aside4 aside4 aside3 aside3"
              "aside2 aside2 aside5 aside5 aside5 aside5"
            \`,
          }}
        >
          <div className="rounded-[12px] bg-card border px-[16px] py-[12px]" style={{ gridArea: "hero" }}>
            <span className="font-bold font-anek">Hero</span>
            <span className="text-xs text-muted-foreground">Destaque grande (4x2)</span>
          </div>
          <div className="rounded-[12px] bg-foreground text-background px-[16px] py-[12px]" style={{ gridArea: "aside2" }}>
            <span className="font-bold font-anek">Aside 2</span>
            <span className="text-xs opacity-70">Rodapé esquerdo (2x1)</span>
          </div>
          <div className="rounded-[12px] px-[16px] py-[12px]" style={{ gridArea: "aside3", backgroundColor: "#E9AB53", color: "#1a1a1a" }}>
            <span className="font-bold font-anek">Aside 3</span>
            <span className="text-xs opacity-80">Coluna alta (2x3)</span>
          </div>
          <div className="rounded-[12px] bg-card border px-[16px] py-[12px]" style={{ gridArea: "aside4" }}>
            <span className="font-bold font-anek">Aside 4</span>
            <span className="text-xs text-muted-foreground">Centro inferior (2x1)</span>
          </div>
          <div className="rounded-[12px] bg-card border px-[16px] py-[12px]" style={{ gridArea: "aside5" }}>
            <span className="font-bold font-anek">Aside 5</span>
            <span className="text-xs text-muted-foreground">Rodapé largo (4x1)</span>
          </div>
        </div>
      </div>
    </div>
  );
}`
          },
          {
            label: "HTML / CSS / JS",
            language: "html",
            code: `<h3>Breakpoints e Containers</h3>
<div class="panel">
  <div class="row"><span>Desktop</span><b>1200px</b></div>
  <div class="row"><span>Tablet</span><b>720px</b></div>
  <div class="row"><span>Mobile</span><b>320px</b></div>
</div>

<h3>Espaçamento Vertical (Dobras)</h3>
<div class="dobras">
  <div class="dobra">Conteúdo Dobra A</div>
  <div class="gap gap-60">60px Padding (Múltiplo de 15)</div>
  <div class="dobra">Conteúdo Dobra B</div>
</div>

<h3>Regra dos 15px (Gaps &amp; Margins)</h3>
<div class="stack-15">
  <div class="el">Elemento 1</div>
  <div class="gap gap-15">15px Gap</div>
  <div class="el">Elemento 2</div>
  <div class="gap gap-30">30px Gap</div>
  <div class="el">Elemento 3</div>
</div>

<h3>Padding de Cards</h3>
<div class="card-anatomia">
  <span class="edge top">12px topo</span>
  <span class="edge bottom">12px base</span>
  <span class="edge left">16px lat.</span>
  <span class="edge right">16px lat.</span>
  <div class="card-conteudo">Conteúdo do card</div>
</div>
<div class="panel">
  <div class="row"><span>Padding lateral</span><b>16px</b></div>
  <div class="row"><span>Padding vertical</span><b>12px</b></div>
</div>

<h3>Espaçamento entre Título, Conteúdo e Dobras</h3>
<div class="ritmo">
  <div class="titulo">Título da Seção</div>
  <div class="gap gap-32">32px — Título → Conteúdo</div>
  <div class="conteudo">Conteúdo da Dobra A</div>
  <div class="gap gap-48">48px — Entre Dobras</div>
  <div class="titulo">Título da Próxima Seção</div>
  <div class="gap gap-32">32px — Título → Conteúdo</div>
  <div class="conteudo">Conteúdo da Dobra B</div>
</div>

<h3>Bento Grid (Muitos Cards)</h3>
<div class="bento">
  <div class="hero"><b>Hero</b><span>Destaque grande (4x2)</span></div>
  <div class="aside2"><b>Aside 2</b><span>Rodapé esquerdo (2x1)</span></div>
  <div class="aside3"><b>Aside 3</b><span>Coluna alta (2x3)</span></div>
  <div class="aside4"><b>Aside 4</b><span>Centro inferior (2x1)</span></div>
  <div class="aside5"><b>Aside 5</b><span>Rodapé largo (4x1)</span></div>
</div>

<style>
  h3 { font-family:'Anek Latin',sans-serif; font-size:18px; font-weight:700; margin:2rem 0 1rem; }
  .panel { background:#fff; border:1px solid #e5e5e5; border-radius:12px; padding:1.5rem; }
  .row { display:flex; justify-content:space-between; border-bottom:1px solid #e5e5e5; padding-bottom:.5rem; }
  .row span { font-family:monospace; color:#6b7280; }

  .dobras { border:1px solid #e5e5e5; border-radius:4px; overflow:hidden; max-width:28rem; }
  .dobra { background:#fff; height:80px; display:flex; align-items:center; justify-content:center; color:#6b7280; }

  .gap { display:flex; align-items:center; justify-content:center;
    font-family:monospace; font-size:10px; font-weight:700; }
  .gap-60 { height:60px; background:rgba(220,38,38,.1); color:#dc2626; }
  .gap-15 { height:15px; background:#023619; color:#fff; }
  .gap-30 { height:30px; background:#023619; color:#fff; }
  .gap-32 { height:32px; background:rgba(2,54,25,.2); color:#023619; }
  .gap-48 { height:48px; background:rgba(220,38,38,.15); color:#dc2626; }

  .stack-15 { background:#fff; border:1px solid #e5e5e5; border-radius:12px; padding:1.5rem;
    display:flex; flex-direction:column; gap:15px; }
  .el { background:#f5f5f5; height:40px; border:1px dashed #d4d4d4; font-size:12px;
    display:flex; align-items:center; justify-content:center; color:#6b7280; }

  /* Padding padrão de cards: 12px vertical / 16px lateral */
  .card-anatomia { position:relative; background:#fff; border:1px solid #e5e5e5;
    border-radius:12px; overflow:hidden; padding:12px 16px; }
  .card-conteudo { background:#f5f5f5; border:1px dashed #d4d4d4; border-radius:4px;
    min-height:120px; display:flex; align-items:center; justify-content:center; color:#6b7280; }
  .edge { position:absolute; font-family:monospace; font-size:10px; }

  .ritmo { background:#fff; border:1px solid #e5e5e5; border-radius:12px; padding:1.5rem; }
  .titulo { background:#fafafa; border:1px dashed #d4d4d4; border-radius:4px;
    padding:.5rem 1rem; font-family:'Anek Latin',sans-serif; font-weight:700; font-size:14px; }
  .conteudo { background:#f5f5f5; border:1px dashed #d4d4d4; border-radius:4px;
    padding:1.5rem 1rem; font-size:14px; color:#6b7280; text-align:center; }

  /* Bento Grid — gaps de 12 a 16px */
  .bento {
    display:grid; gap:16px; padding:16px;
    background:#fafafa; border:1px solid #e5e5e5; border-radius:12px;
    grid-template-columns:repeat(6, 1fr);
    grid-template-rows:repeat(4, 90px);
    grid-template-areas:
      "hero hero hero hero aside3 aside3"
      "hero hero hero hero aside3 aside3"
      "aside2 aside2 aside4 aside4 aside3 aside3"
      "aside2 aside2 aside5 aside5 aside5 aside5";
  }
  .bento > div { border-radius:12px; padding:12px 16px; background:#fff; border:1px solid #e5e5e5;
    display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
  .bento b { font-family:'Anek Latin',sans-serif; }
  .bento span { font-size:12px; color:#6b7280; }
  .bento > .hero   { grid-area:hero; }
  .bento > .aside2 { grid-area:aside2; background:#111; color:#fff; }
  .bento > .aside3 { grid-area:aside3; background:#E9AB53; color:#1a1a1a; }
  .bento > .aside4 { grid-area:aside4; }
  .bento > .aside5 { grid-area:aside5; }
</style>`
          }
        ]}
      />
    </div>
  );
}
