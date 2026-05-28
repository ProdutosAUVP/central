import React, { useState, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { X } from "lucide-react";

interface Step {
  targetId: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  { targetId: "tour-1", title: "1. Patrimônio total", description: "Acompanhe a evolução do seu capital investido em tempo real." },
  { targetId: "tour-2", title: "2. Diversificação", description: "Visualize a alocação por classe de ativo no gráfico de pizza." },
  { targetId: "tour-3", title: "3. Configurações", description: "Ajuste alertas, integrações e preferências da sua conta." },
];

export function TourWidget() {
  const [step, setStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ top: number; left: number; w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    if (step < 0 || !containerRef.current) {
      setBox(null);
      return;
    }
    const target = containerRef.current.querySelector<HTMLElement>(`#${steps[step].targetId}`);
    const cont = containerRef.current.getBoundingClientRect();
    if (target) {
      const r = target.getBoundingClientRect();
      setBox({ top: r.top - cont.top, left: r.left - cont.left, w: r.width, h: r.height });
    }
  }, [step]);

  const start = () => setStep(0);
  const next = () => setStep((s) => (s < steps.length - 1 ? s + 1 : -1));
  const close = () => setStep(-1);

  return (
    <ComponentShowcase
      title="Tour (onboarding guiado)"
      description="Sequência de tooltips ancorados a elementos da UI com overlay e spotlight. Ideal para apresentar funcionalidades novas no primeiro acesso."
      code={`interface Step { targetId: string; title: string; description: string }

const steps: Step[] = [
  { targetId: "tour-1", title: "1. Patrimônio total", description: "Acompanhe a evolução do seu capital investido em tempo real." },
  { targetId: "tour-2", title: "2. Diversificação", description: "Visualize a alocação por classe de ativo no gráfico de pizza." },
  { targetId: "tour-3", title: "3. Configurações", description: "Ajuste alertas, integrações e preferências da sua conta." },
];

const [step, setStep] = useState(-1);
const containerRef = useRef<HTMLDivElement>(null);
const [box, setBox] = useState<{ top: number; left: number; w: number; h: number } | null>(null);

useLayoutEffect(() => {
  if (step < 0 || !containerRef.current) { setBox(null); return; }
  const target = containerRef.current.querySelector<HTMLElement>(\`#\${steps[step].targetId}\`);
  const cont = containerRef.current.getBoundingClientRect();
  if (target) {
    const r = target.getBoundingClientRect();
    setBox({ top: r.top - cont.top, left: r.left - cont.left, w: r.width, h: r.height });
  }
}, [step]);

const start = () => setStep(0);
const next = () => setStep((s) => (s < steps.length - 1 ? s + 1 : -1));
const close = () => setStep(-1);

<div className="w-full">
  <div className="flex justify-end mb-3">
    <Button onClick={start} size="sm" disabled={step >= 0}>
      {step >= 0 ? "Tour em andamento…" : "Iniciar tour"}
    </Button>
  </div>
  <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border rounded-xl bg-muted/20">
    <div id="tour-1" className="border rounded-lg p-5 bg-card">
      <p className="text-xs font-roboto uppercase text-muted-foreground">Patrimônio</p>
      <p className="text-2xl font-bold font-anek">R$ 125.430</p>
    </div>
    <div id="tour-2" className="border rounded-lg p-5 bg-card">
      <p className="text-xs font-roboto uppercase text-muted-foreground">Diversificação</p>
      <div className="flex items-center gap-2 mt-2">
        <div className="h-3 w-12 rounded-full bg-primary" />
        <div className="h-3 w-8 rounded-full bg-success" />
        <div className="h-3 w-6 rounded-full bg-warning" />
      </div>
    </div>
    <div id="tour-3" className="border rounded-lg p-5 bg-card">
      <p className="text-xs font-roboto uppercase text-muted-foreground">Configurações</p>
      <p className="text-sm text-foreground mt-1">Alertas, integrações…</p>
    </div>

    {step >= 0 && box && (
      <>
        <div className="absolute inset-0 bg-[hsl(145_20%_44%/0.7)] z-40 rounded-xl pointer-events-none" />
        <div
          className="absolute z-40 rounded-lg ring-4 ring-primary pointer-events-none transition-all duration-300"
          style={{ top: box.top, left: box.left, width: box.w, height: box.h }}
        />
        <div
          className="absolute z-50 bg-popover border rounded-lg p-4 shadow-xl w-[260px]"
          style={{
            top: Math.min(box.top + box.h + 12, (containerRef.current?.clientHeight ?? 0) - 160),
            left: Math.min(box.left, (containerRef.current?.clientWidth ?? 0) - 280),
          }}
        >
          <button onClick={close} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
          <h4 className="font-bold text-sm mb-1">{steps[step].title}</h4>
          <p className="text-xs text-muted-foreground mb-3">{steps[step].description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-roboto uppercase text-muted-foreground">
              {step + 1} de {steps.length}
            </span>
            <Button size="sm" onClick={next} className="h-7 text-xs">
              {step === steps.length - 1 ? "Concluir" : "Próximo"}
            </Button>
          </div>
        </div>
      </>
    )}
  </div>
</div>`}
      htmlCode={`<style>
  .tour-wrap { width:100%; font-family:'Roboto', sans-serif; }
  .tour-bar { display:flex; justify-content:flex-end; margin-bottom:12px; }
  .tour-start {
    padding:6px 16px; border-radius:8px; border:none; cursor:pointer;
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:12px;
  }
  .tour-start:disabled { opacity:.6; cursor:not-allowed; }
  .tour-grid {
    position:relative; display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;
    padding:24px; border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:12px; background:hsl(var(--muted, 120 10% 95%) / 0.2);
  }
  @media (max-width:768px) { .tour-grid { grid-template-columns:1fr; } }
  .tour-card {
    border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:8px;
    padding:20px; background:hsl(var(--card, 0 0% 100%));
  }
  .tour-card .label {
    font-size:11px; text-transform:uppercase;
    color:hsl(var(--muted-foreground, 110 10% 40%));
    font-family:'Roboto', sans-serif;
  }
  .tour-card .big {
    font-size:24px; font-weight:700;
    font-family:'Anek Latin', sans-serif;
    color:hsl(var(--foreground, 110 78% 9%));
  }
  .tour-pills { display:flex; gap:8px; margin-top:8px; }
  .tour-pills span { height:12px; border-radius:9999px; }
  .tour-pill-1 { width:48px; background:hsl(var(--primary, 155 93% 11%)); }
  .tour-pill-2 { width:32px; background:hsl(var(--success, 142 71% 45%)); }
  .tour-pill-3 { width:24px; background:hsl(var(--warning, 38 92% 50%)); }
  .tour-overlay {
    position:absolute; inset:0; z-index:40; border-radius:12px; pointer-events:none;
    background:hsl(145 20% 44% / 0.7);
  }
  .tour-spot {
    position:absolute; z-index:41; border-radius:8px; pointer-events:none;
    box-shadow:0 0 0 4px hsl(var(--primary, 155 93% 11%));
    transition:all .3s;
  }
  .tour-pop {
    position:absolute; z-index:50; width:260px;
    background:hsl(var(--popover, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:8px; padding:16px;
    box-shadow:0 8px 24px rgba(0,0,0,.15);
  }
  .tour-pop h4 { font-weight:700; font-size:14px; margin:0 0 4px; }
  .tour-pop p { font-size:12px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin:0 0 12px; }
  .tour-pop .row { display:flex; align-items:center; justify-content:space-between; }
  .tour-pop .count { font-size:10px; text-transform:uppercase; color:hsl(var(--muted-foreground, 110 10% 40%)); font-family:'Roboto', sans-serif; }
  .tour-pop button.next {
    height:28px; padding:0 12px; border-radius:6px; border:none; cursor:pointer;
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:11px;
  }
  .tour-pop button.close {
    position:absolute; top:8px; right:8px; background:none; border:none;
    color:hsl(var(--muted-foreground, 110 10% 40%));
    cursor:pointer; font-size:16px; line-height:1;
  }
</style>

<div class="tour-wrap">
  <div class="tour-bar">
    <button id="tour-start" class="tour-start" onclick="tourStart()">Iniciar tour</button>
  </div>
  <div id="tour-grid" class="tour-grid">
    <div id="tour-1" class="tour-card">
      <p class="label">Patrimônio</p>
      <p class="big">R$ 125.430</p>
    </div>
    <div id="tour-2" class="tour-card">
      <p class="label">Diversificação</p>
      <div class="tour-pills">
        <span class="tour-pill-1"></span>
        <span class="tour-pill-2"></span>
        <span class="tour-pill-3"></span>
      </div>
    </div>
    <div id="tour-3" class="tour-card">
      <p class="label">Configurações</p>
      <p style="font-size:14px; margin:4px 0 0; color:hsl(var(--foreground, 110 78% 9%));">Alertas, integrações…</p>
    </div>
  </div>
</div>

<script>
  const TOUR_STEPS = [
    { id:'tour-1', title:'1. Patrimônio total', desc:'Acompanhe a evolução do seu capital investido em tempo real.' },
    { id:'tour-2', title:'2. Diversificação', desc:'Visualize a alocação por classe de ativo no gráfico de pizza.' },
    { id:'tour-3', title:'3. Configurações', desc:'Ajuste alertas, integrações e preferências da sua conta.' }
  ];
  let tourStep = -1;
  function tourStart() { tourStep = 0; tourRender(); }
  function tourNext() { tourStep = tourStep < TOUR_STEPS.length - 1 ? tourStep + 1 : -1; tourRender(); }
  function tourClose() { tourStep = -1; tourRender(); }
  function tourRender() {
    const grid = document.getElementById('tour-grid');
    const startBtn = document.getElementById('tour-start');
    grid.querySelectorAll('.tour-overlay, .tour-spot, .tour-pop').forEach(n => n.remove());
    if (tourStep < 0) { startBtn.disabled = false; startBtn.textContent = 'Iniciar tour'; return; }
    startBtn.disabled = true; startBtn.textContent = 'Tour em andamento…';
    const step = TOUR_STEPS[tourStep];
    const target = document.getElementById(step.id);
    const cont = grid.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const top = r.top - cont.top, left = r.left - cont.left;
    grid.insertAdjacentHTML('beforeend', '<div class="tour-overlay"></div>');
    grid.insertAdjacentHTML('beforeend',
      '<div class="tour-spot" style="top:' + top + 'px;left:' + left + 'px;width:' + r.width + 'px;height:' + r.height + 'px;"></div>');
    const popTop = Math.min(top + r.height + 12, cont.height - 160);
    const popLeft = Math.min(left, cont.width - 280);
    grid.insertAdjacentHTML('beforeend',
      '<div class="tour-pop" style="top:' + popTop + 'px;left:' + popLeft + 'px;">' +
        '<button class="close" onclick="tourClose()">×</button>' +
        '<h4>' + step.title + '</h4>' +
        '<p>' + step.desc + '</p>' +
        '<div class="row">' +
          '<span class="count">' + (tourStep + 1) + ' de ' + TOUR_STEPS.length + '</span>' +
          '<button class="next" onclick="tourNext()">' + (tourStep === TOUR_STEPS.length - 1 ? 'Concluir' : 'Próximo') + '</button>' +
        '</div>' +
      '</div>');
  }
</script>`}
    >
      <div className="w-full">
        <div className="flex justify-end mb-3">
          <Button onClick={start} size="sm" disabled={step >= 0}>
            {step >= 0 ? "Tour em andamento…" : "Iniciar tour"}
          </Button>
        </div>
        <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border rounded-xl bg-muted/20">
          <div id="tour-1" className="border rounded-lg p-5 bg-card">
            <p className="text-xs font-roboto uppercase text-muted-foreground">Patrimônio</p>
            <p className="text-2xl font-bold font-anek">R$ 125.430</p>
          </div>
          <div id="tour-2" className="border rounded-lg p-5 bg-card">
            <p className="text-xs font-roboto uppercase text-muted-foreground">Diversificação</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-3 w-12 rounded-full bg-primary" />
              <div className="h-3 w-8 rounded-full bg-success" />
              <div className="h-3 w-6 rounded-full bg-warning" />
            </div>
          </div>
          <div id="tour-3" className="border rounded-lg p-5 bg-card">
            <p className="text-xs font-roboto uppercase text-muted-foreground">Configurações</p>
            <p className="text-sm text-foreground mt-1">Alertas, integrações…</p>
          </div>

          {step >= 0 && box && (
            <>
              <div className="absolute inset-0 bg-[hsl(145_20%_44%/0.7)] z-40 rounded-xl pointer-events-none" />
              <div
                className="absolute z-40 rounded-lg ring-4 ring-primary pointer-events-none transition-all duration-300"
                style={{ top: box.top, left: box.left, width: box.w, height: box.h, boxShadow: "0 0 0 9999px transparent" }}
              />
              <div
                className="absolute z-50 bg-popover border rounded-lg p-4 shadow-xl w-[260px]"
                style={{
                  top: Math.min(box.top + box.h + 12, (containerRef.current?.clientHeight ?? 0) - 160),
                  left: Math.min(box.left, (containerRef.current?.clientWidth ?? 0) - 280),
                }}
              >
                <button onClick={close} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
                <h4 className="font-bold text-sm mb-1">{steps[step].title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{steps[step].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-roboto uppercase text-muted-foreground">
                    {step + 1} de {steps.length}
                  </span>
                  <Button size="sm" onClick={next} className="h-7 text-xs">
                    {step === steps.length - 1 ? "Concluir" : "Próximo"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ComponentShowcase>
  );
}
