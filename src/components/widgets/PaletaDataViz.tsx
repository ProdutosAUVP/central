import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useCssVarColor } from "@/hooks/use-css-var-color";

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
  const hex = useCssVarColor(ref, token)?.hex ?? "";

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
function DonutDemo() {
  const data = [
    { name: "Renda Fixa", value: 35 }, { name: "Ações BR", value: 22 },
    { name: "Ações US", value: 18 }, { name: "FIIs", value: 12 },
    { name: "Cripto", value: 7 }, { name: "Outros", value: 6 },
  ];
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 p-6">
      <h4 className="text-lg font-semibold tracking-tight">Distribuição de Carteira</h4>
      <p className="text-xs text-muted-foreground">Exemplo aplicando os tokens categóricos</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={82}
            paddingAngle={3} dataKey="value" stroke="none" cornerRadius={4}>
            {data.map((_, i) => (
              <Cell key={i} fill={\`hsl(var(--chart-\${(i % 8) + 1}))\`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Heatmap sequencial: célula colorida por intensidade (1 a 5)
// <td style={{ backgroundColor: \`hsl(var(--chart-seq-\${v}))\` }}>{v}</td>
// Cabeçalho: Ativo | Q1 | Q2 | Q3 | Q4

export function PaletaDataViz() {
  return (
    <div className="space-y-10">
      <h3 className="text-lg font-bold">Paleta Categórica (8 cores)</h3>
      {/* --chart-1 a --chart-8 em MiniSwatch, seguidos do DonutDemo */}
      <DonutDemo />

      <h3 className="text-lg font-bold">Paleta Sequencial (5 níveis)</h3>
      {/* --chart-seq-1 a --chart-seq-5 + TabelaIntensidadeDemo */}

      <h3 className="text-lg font-bold">Paleta Divergente</h3>
      {/* --chart-div-neg / --chart-div-mid / --chart-div-pos */}

      <h3 className="text-lg font-bold">Como usar</h3>
      {/* Os tokens estão definidos em src/index.css e mudam conforme a marca. */}
    </div>
  );
}

// CSS / inline
<div style={{ backgroundColor: 'hsl(var(--chart-2))' }} />

// Tailwind arbitrário
<div className="bg-[hsl(var(--chart-3))]" />`
            },
            {
              label: "HTML / CSS / JS",
              language: "html",
              code: `<!-- Tokens AUVP de Data Viz (Capital, light) — mesmos valores de src/index.css -->
<!-- Equivalente React: export function PaletaDataViz() -->
<style>
  :root {
    --chart-1: 152 80% 30%;   /* Verde AUVP */
    --chart-2: 270 60% 55%;   /* Violeta */
    --chart-3: 38 92% 55%;    /* Âmbar */
    --chart-4: 199 89% 48%;   /* Azul */
    --chart-5: 340 75% 55%;   /* Magenta */
    --chart-6: 15 80% 50%;    /* Vermelho-tijolo */
    --chart-7: 90 55% 40%;    /* Oliva */
    --chart-8: 220 30% 35%;   /* Grafite azulado */

    --chart-seq-1: 145 40% 92%;
    --chart-seq-2: 150 50% 78%;
    --chart-seq-3: 152 60% 60%;
    --chart-seq-4: 154 75% 40%;
    --chart-seq-5: 155 93% 11%;

    --chart-div-neg: 0 72% 51%;
    --chart-div-mid: 40 30% 92%;
    --chart-div-pos: 155 93% 25%;
  }
  .swatch { display:inline-block; width:32px; height:32px; border-radius:8px; }
  h3 { font-family:'Anek Latin',sans-serif; font-size:18px; font-weight:700; }
</style>

<h3>Paleta Categórica (8 cores)</h3>
<span class="swatch" style="background:hsl(var(--chart-1));"></span>
<span class="swatch" style="background:hsl(var(--chart-2));"></span>
<span class="swatch" style="background:hsl(var(--chart-3));"></span>

<!-- Card do donut: "Distribuição de Carteira" / "Exemplo aplicando os tokens categóricos" -->
<div class="card">
  <h4>Distribuição de Carteira</h4>
  <p>Exemplo aplicando os tokens categóricos</p>
  <canvas id="donut" width="240" height="240"></canvas>
</div>

<h3>Paleta Sequencial (5 níveis)</h3>
<!-- Heatmap: colunas Ativo | Q1 | Q2 | Q3 | Q4, célula com hsl(var(--chart-seq-N)) -->
<table>
  <thead><tr><th>Ativo</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr></thead>
  <tbody>
    <tr><td>Ativo A</td>
      <td style="background:hsl(var(--chart-seq-1));">1</td>
      <td style="background:hsl(var(--chart-seq-2));">2</td>
      <td style="background:hsl(var(--chart-seq-3));">3</td>
      <td style="background:hsl(var(--chart-seq-5)); color:#fff;">5</td></tr>
  </tbody>
</table>

<h3>Paleta Divergente</h3>
<span class="swatch" style="background:hsl(var(--chart-div-neg));"></span>
<span class="swatch" style="background:hsl(var(--chart-div-mid));"></span>
<span class="swatch" style="background:hsl(var(--chart-div-pos));"></span>

<h3>Como usar</h3>
<!-- Os tokens estão definidos em src/index.css e mudam conforme a marca ativa. -->

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
