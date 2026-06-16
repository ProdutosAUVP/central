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

/** Card de exemplo — replica o padrão visual aplicado nos dashboards AUVP */
function PieDemo() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.12)] transition-shadow duration-200 max-w-md">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-lg tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
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

const REACT_CODE = `import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight } from "lucide-react";

const data = [
  { name: "Convert.", value: 42 },
  { name: "Lead",     value: 28 },
  { name: "Clicou",   value: 18 },
  { name: "Expirada", value: 12 },
];

export function StatusDonut() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6
                    shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)]
                    hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.12)]
                    transition-shadow duration-200">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-anek text-lg font-semibold tracking-tight">
          Status das Indicações
        </h2>
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground
                               flex items-center gap-1 transition-colors duration-200">
          Ver tudo <ArrowRight size={12} />
        </a>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Distribuição por status atual</p>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={55} outerRadius={82}
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
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-2">
        {data.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full shrink-0"
                 style={{ backgroundColor: \`hsl(var(--chart-\${(i % 8) + 1}))\` }} />
            <span className="text-[11px] text-muted-foreground">
              {s.name}{" "}
              <span className="font-medium text-foreground tabular-nums">{s.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`;

const HTML_CODE = `<!-- AUVP — Donut Chart (HTML/CSS/JS standalone)
     Requer Chart.js v4 carregado por CDN. Tokens hsl(var(--chart-N))
     devem estar definidos no :root do projeto. -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>

<div class="auvp-card">
  <header>
    <h2>Status das Indicações</h2>
    <a href="#">Ver tudo →</a>
  </header>
  <p class="auvp-sub">Distribuição por status atual</p>

  <div class="auvp-canvas-wrap">
    <canvas id="auvpDonut"></canvas>
  </div>

  <ul class="auvp-legend" id="auvpLegend"></ul>
</div>

<style>
  .auvp-card{
    max-width: 420px;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid hsl(var(--border) / .4);
    background: hsl(var(--card) / .6);
    backdrop-filter: blur(24px);
    box-shadow: 0 8px 32px -8px hsl(var(--foreground) / .08);
    font-family: var(--font-body, system-ui, sans-serif);
  }
  .auvp-card header{ display:flex; justify-content:space-between; align-items:center; }
  .auvp-card h2{
    font-family: var(--font-display, system-ui);
    font-size: 18px; font-weight:600; letter-spacing:-.01em; margin:0;
    color: hsl(var(--foreground));
  }
  .auvp-card a{ font-size:12px; color: hsl(var(--muted-foreground)); text-decoration:none; }
  .auvp-card a:hover{ color: hsl(var(--foreground)); }
  .auvp-sub{ font-size:12px; color: hsl(var(--muted-foreground)); margin: 4px 0 16px; }
  .auvp-canvas-wrap{ height: 180px; position: relative; }
  .auvp-legend{
    display:flex; flex-wrap:wrap; justify-content:center;
    gap: 6px 16px; margin: 8px 0 0; padding:0; list-style:none;
  }
  .auvp-legend li{ display:flex; align-items:center; gap:6px; font-size:11px; color: hsl(var(--muted-foreground)); }
  .auvp-legend .dot{ width:10px; height:10px; border-radius:9999px; display:inline-block; }
  .auvp-legend strong{ color: hsl(var(--foreground)); font-variant-numeric: tabular-nums; font-weight:500; }
</style>

<script>
  const data = [
    { name: "Convert.", value: 42 },
    { name: "Lead",     value: 28 },
    { name: "Clicou",   value: 18 },
    { name: "Expirada", value: 12 },
  ];
  const colors = data.map((_, i) => \`hsl(var(--chart-\${(i % 8) + 1}))\`);

  new Chart(document.getElementById("auvpDonut"), {
    type: "doughnut",
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 4,        // bordas arredondadas
        spacing: 3,             // paddingAngle equivalente
      }]
    },
    options: {
      cutout: "67%",            // innerRadius/outerRadius equivalente
      plugins: { legend: { display: false } },
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  const legend = document.getElementById("auvpLegend");
  data.forEach((d, i) => {
    const li = document.createElement("li");
    li.innerHTML = \`<span class="dot" style="background:\${colors[i]}"></span>
                    \${d.name} <strong>\${d.value}</strong>\`;
    legend.appendChild(li);
  });
</script>`;

const AI_PROMPT = `[CONTEXTO AUVP — DESIGN SYSTEM]
Você está implementando um gráfico de pizza (donut chart) seguindo o Design System da AUVP Capital. Use Recharts no React e Chart.js no HTML standalone. As cores DEVEM vir dos tokens semânticos --chart-1 até --chart-8 definidos em src/index.css — nunca cores hardcoded.

[ESTILO OBRIGATÓRIO — NUNCA QUEBRE]
1. Tipo: SEMPRE donut (não pie sólido). innerRadius/outerRadius proporcional 55/82 ou equivalente (cutout ~67% no Chart.js).
2. Cantos: SEMPRE arredondados — cornerRadius={4} no Recharts, borderRadius:4 no Chart.js.
3. Espaçamento entre fatias: paddingAngle={3} no Recharts, spacing:3 no Chart.js. Isso destaca o cap arredondado.
4. Sem stroke: stroke="none" no Recharts, borderWidth:0 no Chart.js.
5. Cores: percorrer os tokens hsl(var(--chart-N)) com N de 1 a 8, em loop. A primeira fatia é sempre a cor da marca (--chart-1).
6. Container: card com classes "rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)]".
7. Header do card: título em font-anek (display) 18px semibold + link "Ver tudo →" à direita em text-xs muted.
8. Subtítulo: text-xs text-muted-foreground com descrição curta da métrica.
9. Altura do gráfico: 180px (h-[180px]). Use ResponsiveContainer no Recharts.
10. Tooltip: fundo hsl(var(--popover)), borda hsl(var(--border)), border-radius 8px, fonte 12px.
11. Legenda: renderizada manualmente abaixo do gráfico (NUNCA a legenda padrão da lib). Bolinha 10px (rounded-full), nome em text-muted-foreground 11px, valor em font-medium text-foreground com tabular-nums.

[REGRAS DE DADOS]
- Estrutura mínima: { name: string, value: number }
- Filtre fatias com value === 0 antes de renderizar.
- Ordem das fatias = ordem natural do dado (não reordene por valor sem motivo de produto).
- Máximo recomendado: 8 fatias. Acima disso, agrupe o resto em "Outros".

[O QUE NUNCA FAZER]
- ❌ NUNCA usar cores fora dos tokens --chart-N.
- ❌ NUNCA usar pie sólido (sem furo no centro).
- ❌ NUNCA usar bordas retas — sempre cornerRadius.
- ❌ NUNCA usar a legenda padrão da biblioteca.
- ❌ NUNCA aplicar gradientes nas fatias.
- ❌ NUNCA omitir o paddingAngle/spacing — ele é parte da identidade visual.

[ENTREGÁVEL]
Retorne o componente pronto para uso, com dados de exemplo coerentes com o contexto solicitado, comentários apenas onde indispensável.`;

export function GraficoPizza() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Padrão oficial de gráfico de pizza (donut) usado em dashboards e relatórios da AUVP.
        Sempre arredondado, com paddingAngle de 3°, sem stroke, e usando os tokens da paleta
        categórica (<code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">--chart-1</code> a{" "}
        <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">--chart-8</code>) para
        adaptação automática entre Capital e Escola.
      </p>

      {/* Demo */}
      <div className="flex justify-center">
        <PieDemo />
      </div>

      {/* Especificação resumida */}
      <div className="rounded-lg border bg-muted/30 p-5 space-y-2 text-sm">
        <h4 className="font-semibold text-foreground">Especificação técnica</h4>
        <ul className="space-y-1 text-muted-foreground list-disc pl-5">
          <li><strong className="text-foreground">Tipo:</strong> donut (innerRadius 55 / outerRadius 82, ou cutout ~67%).</li>
          <li><strong className="text-foreground">cornerRadius:</strong> 4px — bordas sempre arredondadas.</li>
          <li><strong className="text-foreground">paddingAngle:</strong> 3° entre fatias.</li>
          <li><strong className="text-foreground">stroke:</strong> none.</li>
          <li><strong className="text-foreground">Cores:</strong> tokens <code className="font-mono text-xs bg-background px-1 rounded">hsl(var(--chart-N))</code>, N de 1 a 8 em loop.</li>
          <li><strong className="text-foreground">Altura padrão:</strong> 180px.</li>
          <li><strong className="text-foreground">Legenda:</strong> custom, abaixo do gráfico (não a legenda da lib).</li>
        </ul>
      </div>

      {/* Código com tabs React/HTML */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">Código de referência</h4>
        <CodeBlock collapsible
          tabs={[
            { label: "React", language: "tsx", code: REACT_CODE },
            { label: "HTML / CSS / JS", language: "html", code: HTML_CODE },
          ]}
        />
      </div>

      {/* AI Prompt */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">AI-Food (Prompt)</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Cole este prompt em qualquer IA generativa (ChatGPT, Claude, Cursor) para que ela produza
          gráficos de pizza fiéis ao padrão AUVP, mesmo fora deste projeto.
        </p>
        <CodeBlock collapsible language="markdown" code={AI_PROMPT} />
      </div>
    </div>
  );
}
