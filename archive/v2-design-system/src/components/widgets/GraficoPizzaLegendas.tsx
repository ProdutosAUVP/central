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
  itemStyle: { color: "hsl(222 47% 11%)" },
  labelStyle: { color: "hsl(222 47% 11%)" },
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

/** Legenda horizontal (várias linhas) abaixo do gráfico */
export function GraficoPizzaLegendaHorizontal() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-md mx-auto">
      <Donut size={200} />

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-3">
        {data.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }}
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

/** Legenda horizontal em linha única (com scroll horizontal se faltar espaço) */
export function GraficoPizzaLegendaHorizontalUmaLinha() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-2xl mx-auto">
      <Donut size={200} />

      <div className="mt-3 overflow-x-auto">
        <div className="flex flex-nowrap items-center justify-center gap-x-4 whitespace-nowrap min-w-min">
          {data.map((s, i) => (
            <div key={s.name} className="flex items-center gap-1.5 shrink-0">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }}
              />
              <span className="text-[11px] text-muted-foreground">
                {s.name}{" "}
                <span className="font-medium text-foreground tabular-nums">{s.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Legenda vertical à esquerda do gráfico */
export function GraficoPizzaLegendaVertical() {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-xl mx-auto">
      <div className="grid grid-cols-[minmax(160px,1fr)_1.2fr] gap-6 items-center">
        {/* Legenda */}
        <ul className="space-y-2">
          {data.map((s, i) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <li key={s.name} className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }}
                />
                <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
                  <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                  <span className="text-xs font-medium text-foreground tabular-nums">
                    {s.value} <span className="text-muted-foreground">({pct}%)</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Donut */}
        <Donut size={220} />
      </div>
    </div>
  );
}

/** Legenda vertical à direita do gráfico */
export function GraficoPizzaLegendaVerticalDireita() {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] max-w-xl mx-auto">
      <div className="grid grid-cols-[1.2fr_minmax(160px,1fr)] gap-6 items-center">
        {/* Donut */}
        <Donut size={220} />

        {/* Legenda */}
        <ul className="space-y-2">
          {data.map((s, i) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <li key={s.name} className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(--chart-${(i % 8) + 1}))` }}
                />
                <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
                  <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                  <span className="text-xs font-medium text-foreground tabular-nums">
                    {s.value} <span className="text-muted-foreground">({pct}%)</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const REACT_HORIZONTAL = `import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Renda Fixa", value: 35 },
  { name: "Ações BR",   value: 22 },
  { name: "Ações US",   value: 18 },
  { name: "FIIs",       value: 12 },
  { name: "Cripto",     value: 7 },
  { name: "Outros",     value: 6 },
];

export function DonutLegendaHorizontal() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6">
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%"
              innerRadius={60} outerRadius={90}
              paddingAngle={3} dataKey="value"
              stroke="none" cornerRadius={4}>
              {data.map((_, i) => (
                <Cell key={i} fill={\`hsl(var(--chart-\${(i % 8) + 1}))\`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-3">
        {data.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: \`hsl(var(--chart-\${(i % 8) + 1}))\` }} />
            <span className="text-[11px] text-muted-foreground">
              {s.name} <span className="font-medium text-foreground tabular-nums">{s.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`;

const REACT_HORIZONTAL_LINHA = `// Mesma estrutura do donut horizontal, mas a legenda
// fica em uma única linha (com scroll horizontal em telas estreitas).

<div className="mt-3 overflow-x-auto">
  <div className="flex flex-nowrap items-center justify-center gap-x-4 whitespace-nowrap min-w-min">
    {data.map((s, i) => (
      <div key={s.name} className="flex items-center gap-1.5 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: \`hsl(var(--chart-\${(i % 8) + 1}))\` }} />
        <span className="text-[11px] text-muted-foreground">
          {s.name} <span className="font-medium text-foreground tabular-nums">{s.value}</span>
        </span>
      </div>
    ))}
  </div>
</div>`;

const REACT_VERTICAL = `import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [/* ...mesmos itens... */];

export function DonutLegendaVertical() {
  const total = data.reduce((a, d) => a + d.value, 0);

  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6">
      <div className="grid grid-cols-[minmax(160px,1fr)_1.2fr] gap-6 items-center">
        <ul className="space-y-2">
          {data.map((s, i) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <li key={s.name} className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: \`hsl(var(--chart-\${(i % 8) + 1}))\` }} />
                <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
                  <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                  <span className="text-xs font-medium text-foreground tabular-nums">
                    {s.value} <span className="text-muted-foreground">({pct}%)</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%"
                innerRadius={66} outerRadius={99}
                paddingAngle={3} dataKey="value"
                stroke="none" cornerRadius={4}>
                {data.map((_, i) => (
                  <Cell key={i} fill={\`hsl(var(--chart-\${(i % 8) + 1}))\`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}`;

const REACT_VERTICAL_DIREITA = `// Mesma estrutura da legenda vertical, invertendo a ordem
// das colunas: donut à esquerda, lista à direita.

<div className="grid grid-cols-[1.2fr_minmax(160px,1fr)] gap-6 items-center">
  <div className="h-[220px] w-full">{/* ...donut igual... */}</div>
  <ul className="space-y-2">{/* ...lista igual... */}</ul>
</div>`;

export function GraficoPizzaLegendas() {
  return (
    <div className="space-y-10">
      <p className="text-muted-foreground">
        Variações do donut AUVP com posicionamento alternativo da legenda — abaixo (em duas
        configurações) ou ao lado, à esquerda ou à direita do gráfico.
      </p>

      {/* Horizontal — múltiplas linhas */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Legenda horizontal (abaixo)</h3>
          <p className="text-sm text-muted-foreground">Bullets em linha, com quebra automática.</p>
        </div>
        <GraficoPizzaLegendaHorizontal />
        <div>
          <h4 className="font-semibold text-foreground mb-2">Código</h4>
          <CodeBlock collapsible
            tabs={[{ label: "React", language: "tsx", code: REACT_HORIZONTAL }]}
          />
        </div>
      </div>

      {/* Horizontal — uma linha */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Legenda horizontal em uma única linha</h3>
          <p className="text-sm text-muted-foreground">
            Variação compacta sem quebra; em telas estreitas a legenda rola horizontalmente.
          </p>
        </div>
        <GraficoPizzaLegendaHorizontalUmaLinha />
        <div>
          <h4 className="font-semibold text-foreground mb-2">Código</h4>
          <CodeBlock collapsible
            tabs={[{ label: "React", language: "tsx", code: REACT_HORIZONTAL_LINHA }]}
          />
        </div>
      </div>

      {/* Vertical — esquerda */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Legenda vertical (à esquerda)</h3>
          <p className="text-sm text-muted-foreground">Lista vertical com nome, valor e percentual.</p>
        </div>
        <GraficoPizzaLegendaVertical />
        <div>
          <h4 className="font-semibold text-foreground mb-2">Código</h4>
          <CodeBlock collapsible
            tabs={[{ label: "React", language: "tsx", code: REACT_VERTICAL }]}
          />
        </div>
      </div>

      {/* Vertical — direita */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Legenda vertical (à direita)</h3>
          <p className="text-sm text-muted-foreground">
            Mesma lista, agora à direita do donut — útil quando o título/contexto fica acima.
          </p>
        </div>
        <GraficoPizzaLegendaVerticalDireita />
        <div>
          <h4 className="font-semibold text-foreground mb-2">Código</h4>
          <CodeBlock collapsible
            tabs={[{ label: "React", language: "tsx", code: REACT_VERTICAL_DIREITA }]}
          />
        </div>
      </div>
    </div>
  );
}
