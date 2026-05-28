import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useBrand } from "@/contexts/BrandContext";

const steps = [
  {
    stage: "Etapa 1",
    title: "Primeiros Passos",
    subtitle: "Organização financeira",
    salaryRange: "R$ 30k - 50k",
    salaryLabel: "Média Estimada",
    salaryUnit: "/ano",
  },
  {
    stage: "Etapa 2",
    title: "Construção de Patrimônio",
    subtitle: "Aportes consistentes",
    salaryRange: "R$ 65k - 91k",
    salaryLabel: "Média Estimada",
    salaryUnit: "/ano",
  },
  {
    stage: "Etapa 3",
    title: "Aceleração",
    subtitle: "Renda passiva crescente",
    salaryRange: "R$ 120k - 180k",
    salaryLabel: "Média Estimada",
    salaryUnit: "/ano",
  },
  {
    stage: "Etapa 4",
    title: "Liberdade Financeira",
    subtitle: "Independência total",
    salaryRange: "R$ 250k+",
    salaryLabel: "Média Estimada",
    salaryUnit: "/ano",
  },
];

export function JornadaHeroi() {
  const [activeStep, setActiveStep] = useState(1);
  const { brand } = useBrand();
  const step = steps[activeStep];
  const progress = (activeStep / (steps.length - 1)) * 100;

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
      <div className="bg-background/40 rounded-xl p-5 md:p-8 border border-border/60 shadow-sm">
        {/* Floating tooltip */}
        <div className="flex justify-center mb-8">
          <div className="relative animate-bounce">
            <div className="relative bg-primary text-primary-foreground text-[11px] font-bold uppercase px-3 py-1.5 shadow-lg whitespace-nowrap tracking-wider">
              Clique nos pontos para ver a progressão
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative w-full h-14 flex items-center justify-between mb-6 md:mb-10 px-2.5 select-none">
          {/* Track */}
          <div className="absolute top-1/2 left-[22px] right-[22px] h-[3px] -translate-y-1/2 z-10">
            <div className="absolute inset-0 bg-muted-foreground/15 rounded-full" />
            <div
              className="absolute inset-y-0 left-0 bg-brand-gradient rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Points */}
          {steps.map((_, i) => {
            const isActive = i <= activeStep;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "relative z-20 w-6 h-6 rounded-full border-2 bg-background transition-all duration-300 hover:scale-[1.15]",
                  isActive ? "border-accent" : "border-muted-foreground/40"
                )}
              >
                {isActive && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          key={activeStep}
          className="text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div>
            <Badge className="mb-3 uppercase tracking-widest text-xs font-extrabold font-anek">
              {step.stage}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 font-anek">{step.title}</h3>
            <p className="text-sm md:text-lg text-muted-foreground font-roboto">{step.subtitle}</p>
          </div>
          <div className="bg-background/60 rounded-xl p-6 border shadow-inner flex flex-col items-center justify-center">
            <p className="text-[11px] uppercase tracking-widest font-bold mb-1 text-accent font-roboto">
              {step.salaryLabel}
            </p>
            <div className="text-3xl md:text-5xl font-black font-anek min-w-[220px] md:min-w-[280px] text-center">
              {step.salaryRange}
              <span className="text-xs font-bold text-muted-foreground ml-1 font-roboto">{step.salaryUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Salary comparison table */}
      <div className="mt-8 bg-background/40 rounded-xl p-5 md:p-8 border border-border/60">
        <h4 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">
          Comparativo de Evolução
        </h4>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between py-3 border-b border-foreground/5 last:border-0 transition-colors cursor-pointer",
                i === activeStep ? "bg-primary/5 -mx-3 px-3 rounded" : "hover:bg-muted/50"
              )}
              onClick={() => setActiveStep(i)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    i <= activeStep ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
                <span className={cn("text-sm", i === activeStep ? "font-bold" : "text-muted-foreground")}>
                  {s.stage} — {s.title}
                </span>
              </div>
              <span className={cn("text-sm font-bold", i === activeStep ? "text-accent" : "text-muted-foreground")}>
                {s.salaryRange}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
