import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CodeBlock } from "@/components/ui/code-block";

const data = [
  { name: "Renda Fixa", value: 35 },
  { name: "Ações BR", value: 22 },
  { name: "Ações US", value: 18 },
  { name: "FIIs", value: 12 },
  { name: "Cripto", value: 7 },
  { name: "Outros", value: 6 },
];

const tooltipProps = {
  contentStyle: {
    background: "#ffffff",
    border: "1px solid hsl(0 0% 90%)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "hsl(222 47% 11%)",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
  },
};

function Donut({ size = 180 }: { size?: number }) {
  return (
    <div className="w-full" style={{ height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={Math.round(size * 0.3)}
            outerRadius={Math.round(size * 0.45)}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
            cornerRadius={4}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={`hsl(var(--chart-${(i % 8) + 1}))`} />
            ))}
          </Pie>
          <Tooltip {...tooltipProps} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GraficoPizzaLegendaHorizontal() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-md mx-auto">
      <Donut size={200} />
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-3">
        {data.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }} />
            <span className="text-[11px] text-muted-foreground">{s.name} <span className="font-medium text-foreground tabular-nums">{s.value}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GraficoPizzaLegendaHorizontalUmaLinha() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-2xl mx-auto">
      <Donut size={200} />
      <div className="mt-3 overflow-x-auto">
        <div className="flex flex-nowrap items-center justify-center gap-x-4 whitespace-nowrap min-w-min">
          {data.map((s, i) => (
            <div key={s.name} className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }} />
              <span className="text-[11px] text-muted-foreground">{s.name} <span className="font-medium text-foreground tabular-nums">{s.value}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GraficoPizzaLegendaVertical() {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-xl mx-auto">
      <div className="grid grid-cols-[minmax(160px,1fr)_1.2fr] gap-6 items-center">
        <ul className="space-y-2">
          {data.map((s, i) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <li key={s.name} className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }} />
                <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
                  <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                  <span className="text-xs font-medium text-foreground tabular-nums">{s.value} <span className="text-muted-foreground">({pct}%)</span></span>
                </div>
              </li>
            );
          })}
        </ul>
        <Donut size={220} />
      </div>
    </div>
  );
}

export function GraficoPizzaLegendaVerticalDireita() {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-xl mx-auto">
      <div className="grid grid-cols-[1.2fr_minmax(160px,1fr)] gap-6 items-center">
        <Donut size={220} />
        <ul className="space-y-2">
          {data.map((s, i) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <li key={s.name} className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }} />
                <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
                  <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                  <span className="text-xs font-medium text-foreground tabular-nums">{s.value} <span className="text-muted-foreground">({pct}%)</span></span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function GraficoPizzaLegendas() {
  return (
    <div className="space-y-10">
      <p className="text-muted-foreground">Variações do donut AUVP com posicionamento alternativo da legenda.</p>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Legenda horizontal (abaixo)</h3>
        <GraficoPizzaLegendaHorizontal />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Legenda horizontal em uma única linha</h3>
        <GraficoPizzaLegendaHorizontalUmaLinha />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Legenda vertical (à esquerda)</h3>
        <GraficoPizzaLegendaVertical />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Legenda vertical (à direita)</h3>
        <GraficoPizzaLegendaVerticalDireita />
      </div>
    </div>
  );
}
