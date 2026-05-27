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

<ol className="flex items-start">
  {STEPS.map((s, i) => {
    const status = i < current ? "done" : i === current ? "active" : "pending";
    return (
      <li key={i} className="flex-1 flex flex-col items-center relative px-2">
        {i < STEPS.length - 1 && (
          <div className={cn("absolute top-4 left-1/2 w-full h-0.5",
            i < current ? "bg-primary" : "bg-border")} />
        )}
        <div className={cn("h-8 w-8 rounded-full border-2 z-10 flex items-center justify-center text-xs font-bold bg-background",
          status === "done" && "bg-primary text-primary-foreground border-primary",
          status === "active" && "border-accent text-accent",
          status === "pending" && "border-border text-muted-foreground")}>
          {status === "done" ? <Check className="h-4 w-4" /> : i + 1}
        </div>
        <p className="text-sm font-anek font-semibold mt-2 text-center">{s.title}</p>
        <p className="text-xs text-muted-foreground text-center">{s.desc}</p>
      </li>
    );
  })}
</ol>`}
      htmlCode={`<!-- steps com linha de progresso -->`}
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
