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
      code={`const steps = [
  { targetId: "tour-1", title: "1. Patrimônio total", description: "..." },
  { targetId: "tour-2", title: "2. Diversificação", description: "..." },
  { targetId: "tour-3", title: "3. Configurações", description: "..." },
];`}
      htmlCode={`<!-- Tour HTML -->`}
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
