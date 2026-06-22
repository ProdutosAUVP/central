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
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(target * (1 - Math.pow(1 - t, 3))); // ease-out cubic
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Stat({ icon: Icon, label, value, prefix, suffix, trend, decimals = 0 }) {
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
        <div className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold mt-2 px-2 py-0.5 rounded",
          trend.dir === "up" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
        )}>
          {trend.dir === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {trend.pct}% vs mês anterior
        </div>
      )}
    </div>
  );
}

<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Stat icon={DollarSign} label="Receita" value={125430} prefix="R$ " trend={{ dir: "up", pct: 12.4 }} />
  <Stat icon={Users} label="Alunos Ativos" value={3842} trend={{ dir: "up", pct: 8.1 }} />
  <Stat icon={TrendingUp} label="Conversão" value={4.7} suffix="%" decimals={1} trend={{ dir: "down", pct: 0.3 }} />
</div>`}
      htmlCode={`<style>
  .stat-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }
  @media (max-width:768px) { .stat-grid { grid-template-columns:1fr; } }
  .stat {
    border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:12px; padding:20px;
    background:hsl(var(--card, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    font-family:'Roboto', sans-serif;
  }
  .stat-label {
    display:flex; align-items:center; gap:8px;
    color:hsl(var(--muted-foreground, 110 10% 40%));
    font-size:11px; font-weight:700; text-transform:uppercase;
    letter-spacing:.05em; font-family:'Roboto'; margin-bottom:12px;
  }
  .stat-label svg { width:16px; height:16px; }
  .stat-value {
    font-size:30px; font-weight:700;
    font-family:'Anek Latin', sans-serif;
    letter-spacing:-.02em; line-height:1.1;
  }
  .stat-suffix { font-size:16px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin-left:4px; }
  .stat-trend {
    display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:600;
    margin-top:8px; padding:2px 8px; border-radius:4px;
  }
  .stat-trend.up { background:hsl(var(--success, 142 71% 45%) / 0.15); color:hsl(var(--success, 142 71% 45%)); }
  .stat-trend.down { background:hsl(var(--destructive, 0 84% 60%) / 0.15); color:hsl(var(--destructive, 0 84% 60%)); }
  .stat-trend svg { width:12px; height:12px; }
</style>

<div class="stat-grid">
  <div class="stat">
    <div class="stat-label">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      Receita
    </div>
    <p class="stat-value" data-target="125430" data-prefix="R$ " data-decimals="0">R$ 0</p>
    <span class="stat-trend up">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
      12.4% vs mês anterior
    </span>
  </div>
  <div class="stat">
    <div class="stat-label">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      Alunos Ativos
    </div>
    <p class="stat-value" data-target="3842" data-decimals="0">0</p>
    <span class="stat-trend up">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
      8.1% vs mês anterior
    </span>
  </div>
  <div class="stat">
    <div class="stat-label">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      Conversão
    </div>
    <p class="stat-value" data-target="4.7" data-suffix="%" data-decimals="1">0.0<span class="stat-suffix">%</span></p>
    <span class="stat-trend down">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
      0.3% vs mês anterior
    </span>
  </div>
</div>

<script>
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const start = performance.now(), dur = 1200;
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = target * (1 - Math.pow(1 - t, 3));
      const formatted = v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      el.innerHTML = prefix + formatted + (suffix ? '<span class="stat-suffix">' + suffix + '</span>' : '');
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
</script>`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Stat icon={DollarSign} label="Receita" value={125430} prefix="R$ " trend={{ dir: "up", pct: 12.4 }} />
        <Stat icon={Users} label="Alunos Ativos" value={3842} trend={{ dir: "up", pct: 8.1 }} />
        <Stat icon={TrendingUp} label="Conversão" value={4.7} suffix="%" decimals={1} trend={{ dir: "down", pct: 0.3 }} />
      </div>
    </ComponentShowcase>
  );
}
