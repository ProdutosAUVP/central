import React, { useEffect, useState } from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProgressGeistProps {
  value: number;
  className?: string;
  "aria-label"?: string;
}

export function ProgressGeist({ value, className, ...rest }: ProgressGeistProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...rest}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function ProgressGeistWidget() {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimated((v) => (v >= 100 ? 0 : v + 5));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <ComponentShowcase
      title="Progress"
      description="Barra de progresso minimalista inspirada no Geist: trilha clara, preenchimento sólido em foreground, cantos totalmente arredondados e transição suave."
      code={`interface ProgressGeistProps {
  value: number;
  className?: string;
}

function ProgressGeist({ value, className }: ProgressGeistProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
        style={{ width: \`\${v}%\` }}
      />
    </div>
  );
}

// Uso
<div className="space-y-4">
  <ProgressGeist value={40} />
  <ProgressGeist value={70} />
  <ProgressGeist value={100} />
</div>`}
      htmlCode={`<style>
  .gprog { position:relative; height:8px; width:100%; overflow:hidden; border-radius:9999px; background:#ececec; }
  .gprog__bar { height:100%; border-radius:9999px; background:hsl(var(--primary)); transition: width .5s ease-out; }
</style>

<div class="gprog"><div class="gprog__bar" style="width:40%"></div></div>
<div class="gprog" style="margin-top:16px"><div class="gprog__bar" style="width:70%"></div></div>
<div class="gprog" style="margin-top:16px"><div class="gprog__bar" style="width:100%"></div></div>`}
    >
      <div className="w-full max-w-2xl space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-5">
          <ProgressGeist value={40} aria-label="40%" />
          <ProgressGeist value={70} aria-label="70%" />
          <ProgressGeist value={100} aria-label="100%" />
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
            <span>Animado</span>
            <span>{animated}%</span>
          </div>
          <ProgressGeist value={animated} aria-label={`${animated}%`} />
          <div className="pt-2 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setAnimated(0)}>
              Reiniciar
            </Button>
            <Button size="sm" variant="outline" onClick={() => setAnimated(100)}>
              Completar
            </Button>
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
