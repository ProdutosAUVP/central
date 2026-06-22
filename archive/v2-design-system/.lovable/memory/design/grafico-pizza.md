---
name: grafico-pizza
description: Padrão oficial de gráfico de pizza (donut) AUVP — donut com cornerRadius 4, paddingAngle 3, stroke none, cores via tokens --chart-1..8, legenda custom abaixo. Documentado em /design-system seção "Gráfico de Pizza" com código React, HTML e AI prompt.
type: design
---
Gráfico de pizza AUVP é SEMPRE donut, com cornerRadius=4, paddingAngle=3, stroke="none", innerRadius=55/outerRadius=82 (ou cutout ~67% no Chart.js), cores via tokens hsl(var(--chart-N)) com N=1..8 em loop, container card translúcido (rounded-xl border-border/40 bg-card/60 backdrop-blur-xl), legenda renderizada manualmente abaixo (não usar a legenda da lib). Componente de referência: src/components/widgets/GraficoPizza.tsx
