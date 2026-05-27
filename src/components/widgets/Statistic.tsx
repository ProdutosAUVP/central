import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, DollarSign, Users, TrendingUp } from "lucide-react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Stat({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
  trend,
  decimals = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: { dir: "up" | "down"; pct: number };
  decimals?: number;
}) {
  const animated = useCountUp(value);
  return (
    <div className="flex-1 min-w-[180px] border rounded-xl p-5 bg-card">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider font-roboto">{label}</span>
      </div>
      <p className="text-3xl font-bold font-anek tracking-tight">
        {prefix}
        {animated.toLocaleString("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix && <span className="text-base text-muted-foreground ml-1">{suffix}</span>}
      </p>
      {trend && (
        <div
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold mt-2 px-2 py-0.5 rounded",
            trend.dir === "up" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          )}
        >
          {trend.dir === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {trend.pct}% vs mês anterior
        </div>
      )}
    </div>
  );
}

export function StatisticWidget() {
  return (
    <ComponentShowcase
      title="Statistic (KPIs animados)"
      description="Cards numéricos com contagem progressiva, prefixos/sufixos e indicador de tendência. Ideal para dashboards e seções de provas sociais."
      code={`function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    // ease-out cubic animation
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Stat icon={DollarSign} label="Receita" value={125430} prefix="R$ " trend={{ dir: "up", pct: 12.4 }} />
  <Stat icon={Users} label="Alunos Ativos" value={3842} trend={{ dir: "up", pct: 8.1 }} />
  <Stat icon={TrendingUp} label="Conversão" value={4.7} suffix="%" decimals={1} trend={{ dir: "down", pct: 0.3 }} />
</div>`}
      htmlCode={`<!-- KPIs com count-up via JS -->`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Stat icon={DollarSign} label="Receita" value={125430} prefix="R$ " trend={{ dir: "up", pct: 12.4 }} />
        <Stat icon={Users} label="Alunos Ativos" value={3842} trend={{ dir: "up", pct: 8.1 }} />
        <Stat icon={TrendingUp} label="Conversão" value={4.7} suffix="%" decimals={1} trend={{ dir: "down", pct: 0.3 }} />
      </div>
    </ComponentShowcase>
  );
}
