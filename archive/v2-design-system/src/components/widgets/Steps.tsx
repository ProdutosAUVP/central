import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

const STEPS = [
  { title: "Cadastro", desc: "Dados básicos" },
  { title: "Perfil", desc: "Suitability" },
  { title: "Plano", desc: "Escolha" },
  { title: "Pagamento", desc: "Confirmação" },
];

export function StepsWidget() {
  const [current, setCurrent] = useState(1);

  return (
    <ComponentShowcase
      title="Steps (wizard horizontal)"
      description="Etapas numeradas com estado completo / atual / pendente e linha de progresso. Ideal para onboarding, checkouts e fluxos de cadastro."
      code={`const STEPS = [
  { title: "Cadastro", desc: "Dados básicos" },
  { title: "Perfil", desc: "Suitability" },
  { title: "Plano", desc: "Escolha" },
  { title: "Pagamento", desc: "Confirmação" },
];

const [current, setCurrent] = useState(1);

<div className="w-full space-y-6">
  <ol className="flex items-start">
    {STEPS.map((s, i) => {
      const status = i < current ? "done" : i === current ? "active" : "pending";
      return (
        <li key={i} className="flex-1 flex flex-col items-center relative px-2">
          {i < STEPS.length - 1 && (
            <div className={cn(
              "absolute top-4 left-1/2 w-full h-0.5",
              i < current ? "bg-primary" : "bg-border"
            )} />
          )}
          <div className={cn(
            "h-8 w-8 rounded-full border-2 z-10 flex items-center justify-center text-xs font-bold bg-background",
            status === "done" && "bg-primary text-primary-foreground border-primary",
            status === "active" && "border-accent text-accent",
            status === "pending" && "border-border text-muted-foreground"
          )}>
            {status === "done" ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          <p className="text-sm font-anek font-semibold mt-2 text-center">{s.title}</p>
          <p className="text-xs text-muted-foreground text-center">{s.desc}</p>
        </li>
      );
    })}
  </ol>
  <div className="flex justify-center gap-2">
    <Button variant="outline" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
      Voltar
    </Button>
    <Button size="sm" onClick={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))} disabled={current === STEPS.length - 1}>
      Avançar
    </Button>
  </div>
</div>`}
      htmlCode={`<div class="steps-wrap">
  <ol id="steps" class="steps"></ol>
  <div class="steps-actions">
    <button onclick="stepGo(-1)" class="btn-outline">Voltar</button>
    <button onclick="stepGo(1)" class="btn-primary">Avançar</button>
  </div>
</div>

<style>
  .steps-wrap { width:100%; display:flex; flex-direction:column; gap:24px; font-family:'Roboto', sans-serif; }
  .steps { display:flex; list-style:none; margin:0; padding:0; align-items:flex-start; }
  .step { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; padding:0 8px; }
  .step__line { position:absolute; top:16px; left:50%; width:100%; height:2px; background:hsl(var(--border, 120 10% 88%)); z-index:1; }
  .step__line.done { background:hsl(var(--primary, 155 93% 11%)); }
  .step__circle {
    width:32px; height:32px; border-radius:50%; border:2px solid hsl(var(--border, 120 10% 88%));
    background:hsl(var(--background, 0 0% 100%));
    display:flex; align-items:center; justify-content:center; font-weight:700; z-index:2;
    color:hsl(var(--muted-foreground, 110 10% 40%)); font-size:12px;
  }
  .step__circle.done {
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    border-color:hsl(var(--primary, 155 93% 11%));
  }
  .step__circle.active {
    border-color:hsl(var(--accent, 155 93% 11%));
    color:hsl(var(--accent, 155 93% 11%));
  }
  .step__title { font-family:'Anek Latin', sans-serif; font-weight:600; font-size:14px; margin-top:8px; text-align:center; color:hsl(var(--foreground, 110 78% 9%)); }
  .step__desc { font-size:12px; color:hsl(var(--muted-foreground, 110 10% 40%)); text-align:center; }
  .steps-actions { display:flex; gap:8px; justify-content:center; }
  .steps-actions button {
    padding:6px 16px; border-radius:8px; font-family:'Sora', sans-serif;
    font-weight:700; text-transform:uppercase; font-size:12px; cursor:pointer;
  }
  .btn-outline { background:transparent; border:1px solid hsl(var(--border, 120 10% 88%)); color:hsl(var(--foreground, 110 78% 9%)); }
  .btn-primary { background:hsl(var(--primary, 155 93% 11%)); color:hsl(var(--primary-foreground, 0 0% 100%)); border:none; }
  .btn-outline:disabled, .btn-primary:disabled { opacity:.5; cursor:not-allowed; }
</style>

<script>
  const STEPS = [
    { title:'Cadastro', desc:'Dados básicos' },
    { title:'Perfil', desc:'Suitability' },
    { title:'Plano', desc:'Escolha' },
    { title:'Pagamento', desc:'Confirmação' }
  ];
  let stepCurrent = 1;
  function stepGo(d) { stepCurrent = Math.max(0, Math.min(STEPS.length - 1, stepCurrent + d)); stepRender(); }
  function stepRender() {
    const ol = document.getElementById('steps'); ol.innerHTML = '';
    STEPS.forEach((s, i) => {
      const status = i < stepCurrent ? 'done' : i === stepCurrent ? 'active' : '';
      const li = document.createElement('li'); li.className = 'step';
      li.innerHTML =
        (i < STEPS.length - 1 ? '<div class="step__line ' + (i < stepCurrent ? 'done' : '') + '"></div>' : '') +
        '<div class="step__circle ' + status + '">' + (i < stepCurrent ? '✓' : i + 1) + '</div>' +
        '<p class="step__title">' + s.title + '</p>' +
        '<p class="step__desc">' + s.desc + '</p>';
      ol.appendChild(li);
    });
  }
  stepRender();
</script>`}
    >
      <div className="w-full space-y-6">
        <ol className="flex items-start">
          {STEPS.map((s, i) => {
            const status = i < current ? "done" : i === current ? "active" : "pending";
            return (
              <li key={i} className="flex-1 flex flex-col items-center relative px-2">
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-4 left-1/2 w-full h-0.5",
                      i < current ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "h-8 w-8 rounded-full border-2 z-10 flex items-center justify-center text-xs font-bold bg-background",
                    status === "done" && "bg-primary text-primary-foreground border-primary",
                    status === "active" && "border-accent text-accent",
                    status === "pending" && "border-border text-muted-foreground"
                  )}
                >
                  {status === "done" ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <p className="text-sm font-anek font-semibold mt-2 text-center">{s.title}</p>
                <p className="text-xs text-muted-foreground text-center">{s.desc}</p>
              </li>
            );
          })}
        </ol>
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
            Voltar
          </Button>
          <Button size="sm" onClick={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))} disabled={current === STEPS.length - 1}>
            Avançar
          </Button>
        </div>
      </div>
    </ComponentShowcase>
  );
}
