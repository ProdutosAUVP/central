import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Swatch = { token: string; name: string };

const categorical: Swatch[] = [
  { token: "chart-1", name: "Série 1 — Marca" },
  { token: "chart-2", name: "Série 2" },
  { token: "chart-3", name: "Série 3" },
  { token: "chart-4", name: "Série 4" },
  { token: "chart-5", name: "Série 5" },
  { token: "chart-6", name: "Série 6" },
  { token: "chart-7", name: "Série 7" },
  { token: "chart-8", name: "Série 8" },
];

const sequential: Swatch[] = [
  { token: "chart-seq-1", name: "1" },
  { token: "chart-seq-2", name: "2" },
  { token: "chart-seq-3", name: "3" },
  { token: "chart-seq-4", name: "4" },
  { token: "chart-seq-5", name: "5" },
];

const divergent: Swatch[] = [
  { token: "chart-div-neg", name: "Negativo" },
  { token: "chart-div-mid", name: "Neutro" },
  { token: "chart-div-pos", name: "Positivo" },
];

function MiniSwatch({ token, name }: Swatch) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hex, setHex] = React.useState("");

  React.useEffect(() => {
    if (!ref.current) return;
    const raw = getComputedStyle(ref.current).getPropertyValue(`--${token}`).trim();
    const parts = raw.replace(/%/g, "").split(/\s+/).map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const [h, s, l] = parts;
      const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * c).toString(16).padStart(2, "0");
      };
      setHex(`#${f(0)}${f(8)}${f(4)}`.toUpperCase());
    }
  }, [token]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div
        className="h-20 rounded-lg border"
        style={{ backgroundColor: `hsl(var(--${token}))` }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-foreground">{name}</p>
        <p className="text-[11px] text-muted-foreground font-mono">--{token}</p>
        {hex && <p className="text-[11px] text-muted-foreground font-mono">{hex}</p>}
      </div>
    </div>
  );
}

/** Demo: Donut chart com Recharts seguindo o padrão AUVP
 *  (paddingAngle, cornerRadius, stroke="none") */
function DonutDemo() {
  const data = [
    { name: "Renda Fixa", value: 35 },
    { name: "Ações BR", value: 22 },
    { name: "Ações US", value: 18 },
    { name: "FIIs", value: 12 },
    { name: "Cripto", value: 7 },
    { name: "Outros", value: 6 },
  ];

  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] p-6">
      <div className="mb-1">
        <h4 className="text-lg font-semibold tracking-tight text-foreground">Distribuição de Carteira</h4>
        <p className="text-xs text-muted-foreground">Exemplo aplicando os tokens categóricos</p>
      </div>
      <div className="h-[200px] w-full">
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
              itemStyle={{ color: "hsl(222 47% 11%)" }}
              labelStyle={{ color: "hsl(222 47% 11%)" }}
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

/** Demo: Tabela com células de intensidade (escala sequencial) */
function TabelaIntensidadeDemo() {
  const rows = [
    { ativo: "Ativo A", q1: 1, q2: 2, q3: 3, q4: 5 },
    { ativo: "Ativo B", q1: 2, q2: 3, q3: 4, q4: 4 },
    { ativo: "Ativo C", q1: 5, q2: 4, q3: 2, q4: 1 },
    { ativo: "Ativo D", q1: 3, q2: 3, q3: 5, q4: 2 },
  ];
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 font-semibold text-foreground">Ativo</th>
            <th className="p-3 font-semibold text-foreground">Q1</th>
            <th className="p-3 font-semibold text-foreground">Q2</th>
            <th className="p-3 font-semibold text-foreground">Q3</th>
            <th className="p-3 font-semibold text-foreground">Q4</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.ativo} className="border-t border-border">
              <td className="p-3 font-medium text-foreground">{r.ativo}</td>
              {[r.q1, r.q2, r.q3, r.q4].map((v, i) => (
                <td
                  key={i}
                  className="p-3 text-center font-mono"
                  style={{
                    backgroundColor: `hsl(var(--chart-seq-${v}))`,
                    color: v >= 4 ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                  }}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PaletaDataViz() {
  return (
    <div className="space-y-10">
      {/* Categórica */}
      <div>
        <h3 className="text-lg font-bold mb-1 text-foreground">Paleta Categórica (8 cores)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use para séries distintas em gráficos de pizza, barras agrupadas, linhas múltiplas e tabelas com legenda.
          A primeira cor é sempre a cor da marca; as demais foram escolhidas para máximo contraste de matiz mantendo harmonia.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {categorical.map((s) => <MiniSwatch key={s.token} {...s} />)}
        </div>
        <DonutDemo />
      </div>

      {/* Sequencial */}
      <div>
        <h3 className="text-lg font-bold mb-1 text-foreground">Paleta Sequencial (5 níveis)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use para mapas de calor, tabelas de intensidade, progressão temporal ou indicadores ordinais.
          A escala vai do tom mais claro (baixa intensidade) ao mais escuro (alta intensidade).
        </p>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {sequential.map((s) => <MiniSwatch key={s.token} {...s} />)}
        </div>
        <TabelaIntensidadeDemo />
      </div>

      {/* Divergente */}
      <div>
        <h3 className="text-lg font-bold mb-1 text-foreground">Paleta Divergente</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use quando o dado tem ponto neutro com variação para os dois lados — ex.: rentabilidade (negativa/positiva),
          variação percentual, sentimento.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {divergent.map((s) => <MiniSwatch key={s.token} {...s} />)}
        </div>
      </div>

      {/* Como usar */}
      <div>
        <h3 className="text-lg font-bold mb-2 text-foreground">Como usar</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Os tokens estão definidos em <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">src/index.css</code> e
          mudam automaticamente conforme a marca ativa (Capital ou Escola).
        </p>
        <CodeBlock collapsible
          tabs={[
            {
              label: "React",
              language: "tsx",
              code: `import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Donut padrão AUVP — sempre rounded (cornerRadius) e com paddingAngle
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
        <Cell key={i} fill={\`hsl(var(--chart-\${(i % 8) + 1}))\`} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

// CSS / inline
<div style={{ backgroundColor: 'hsl(var(--chart-2))' }} />

// Tailwind arbitrário
<div className="bg-[hsl(var(--chart-3))]" />`
            },
            {
              label: "HTML / CSS / JS",
              language: "html",
              code: `<!-- Tokens AUVP de Data Viz: definidos em :root via CSS custom properties -->
<style>
  :root {
    --chart-1: 142 64% 12%;
    --chart-2: 38 78% 62%;
    --chart-3: 200 70% 45%;
    --chart-4: 12  76% 55%;
    --chart-5: 280 60% 55%;
    --chart-6: 165 55% 40%;
    --chart-7: 32  90% 50%;
    --chart-8: 240 50% 45%;
  }
  .swatch { display:inline-block; width:32px; height:32px; border-radius:8px; }
</style>

<!-- Uso direto via background-color -->
<span class="swatch" style="background:hsl(var(--chart-1));"></span>
<span class="swatch" style="background:hsl(var(--chart-2));"></span>
<span class="swatch" style="background:hsl(var(--chart-3));"></span>

<!-- Donut com Chart.js (cutout ~67% equivalente ao innerRadius do Recharts) -->
<canvas id="donut" width="240" height="240"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const colors = Array.from({ length: 8 }, (_, i) =>
    \`hsl(var(--chart-\${i + 1}))\`
  );
  new Chart(document.getElementById('donut'), {
    type: 'doughnut',
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: [0,1,2,3].map(i => colors[i]),
        borderWidth: 0,
        borderRadius: 4,
        spacing: 4,
      }],
    },
    options: { cutout: '67%', plugins: { legend: { display: false } } },
  });
</script>`
            }
          ]}
        />
      </div>
    </div>
  );
}
