import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

const data = [
  { name: "Convert.", value: 42 },
  { name: "Lead", value: 28 },
  { name: "Clicou", value: 18 },
  { name: "Expirada", value: 12 },
];

function PieDemo() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.12)] transition-shadow duration-200 max-w-md">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-lg tracking-tight text-foreground font-anek">
          Status das Indicações
        </h2>
        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-200">
          Ver tudo <ArrowRight size={12} />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Distribuição por status atual</p>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={82}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={`hsl(var(--chart-${i + 1}))`} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid hsl(0 0% 90%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(222 47% 11%)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-2">
        {data.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
            />
            <span className="text-[11px] text-muted-foreground">
              {s.name}{" "}
              <span className="font-medium text-foreground tabular-nums">{s.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GraficoPizza() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Padrão oficial de gráfico de pizza (donut) usado em dashboards e relatórios da AUVP.
        Sempre arredondado, com paddingAngle de 3°, sem stroke, e usando os tokens da paleta
        categórica.
      </p>

      <div className="flex justify-center">
        <PieDemo />
      </div>

      <div className="rounded-lg border bg-muted/30 p-5 space-y-2 text-sm">
        <h4 className="font-semibold text-foreground">Especificação técnica</h4>
        <ul className="space-y-1 text-muted-foreground list-disc pl-5">
          <li><strong className="text-foreground">Tipo:</strong> donut (innerRadius 55 / outerRadius 82).</li>
          <li><strong className="text-foreground">cornerRadius:</strong> 4px.</li>
          <li><strong className="text-foreground">paddingAngle:</strong> 3° entre fatias.</li>
          <li><strong className="text-foreground">stroke:</strong> none.</li>
          <li><strong className="text-foreground">Cores:</strong> tokens <code className="font-mono text-xs bg-background px-1 rounded">hsl(var(--chart-N))</code>, N de 1 a 8.</li>
        </ul>
      </div>
    </div>
  );
}
