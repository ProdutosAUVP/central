import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

interface RateProps {
  value: number;
  onChange?: (v: number) => void;
  count?: number;
  allowHalf?: boolean;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

export function Rate({
  value,
  onChange,
  count = 5,
  allowHalf = false,
  size = "md",
  readOnly = false,
}: RateProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };

  const handleClick = (e: React.MouseEvent, idx: number) => {
    if (readOnly || !onChange) return;
    if (!allowHalf) return onChange(idx + 1);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    onChange(idx + (isHalf ? 0.5 : 1));
  };

  const handleMove = (e: React.MouseEvent, idx: number) => {
    if (readOnly) return;
    if (!allowHalf) return setHover(idx + 1);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHover(idx + (isHalf ? 0.5 : 1));
  };

  return (
    <div
      className={cn("inline-flex items-center gap-1", readOnly && "pointer-events-none")}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: count }, (_, i) => {
        const fill = Math.max(0, Math.min(1, display - i));
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => handleClick(e, i)}
            onMouseMove={(e) => handleMove(e, i)}
            className={cn(
              "relative transition-transform",
              !readOnly && "cursor-pointer hover:scale-110"
            )}
            aria-label={`${i + 1} estrelas`}
          >
            <Star className={cn(sizes[size], "text-muted-foreground/40")} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={cn(sizes[size], "text-warning fill-warning")} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function RateWidget() {
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(2.5);
  const [v3, setV3] = useState(4);

  return (
    <div className="space-y-6">
      <ComponentShowcase
        title="Rate — interativo"
        description="Estrelas clicáveis com hover preview e label de valor."
        code={`function Rate({ value, onChange, count = 5, allowHalf = false, size = "md", readOnly = false }) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };

  const handleClick = (e, idx) => {
    if (readOnly || !onChange) return;
    if (!allowHalf) return onChange(idx + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    onChange(idx + (isHalf ? 0.5 : 1));
  };

  const handleMove = (e, idx) => {
    if (readOnly) return;
    if (!allowHalf) return setHover(idx + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHover(idx + (isHalf ? 0.5 : 1));
  };

  return (
    <div
      className={cn("inline-flex items-center gap-1", readOnly && "pointer-events-none")}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: count }, (_, i) => {
        const fill = Math.max(0, Math.min(1, display - i));
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => handleClick(e, i)}
            onMouseMove={(e) => handleMove(e, i)}
            className={cn("relative transition-transform", !readOnly && "cursor-pointer hover:scale-110")}
            aria-label={\`\${i + 1} estrelas\`}
          >
            <Star className={cn(sizes[size], "text-muted-foreground/40")} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: \`\${fill * 100}%\` }}>
              <Star className={cn(sizes[size], "text-warning fill-warning")} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

const [v1, setV1] = useState(3);

<div className="flex items-center gap-4">
  <Rate value={v1} onChange={setV1} />
  <span className="text-sm font-mono text-muted-foreground">{v1.toFixed(1)} / 5</span>
</div>`}
        htmlCode={`<style>
  .rate { display:inline-flex; gap:4px; align-items:center; }
  .rate-star { position:relative; width:24px; height:24px; cursor:pointer; transition:transform .15s; }
  .rate-star:hover { transform:scale(1.1); }
  .rate-star svg { width:100%; height:100%; }
  .rate-star .empty { color:hsl(var(--muted-foreground, 110 10% 40%) / 0.4); }
  .rate-star .fill { position:absolute; inset:0; overflow:hidden; color:hsl(var(--warning, 38 92% 50%)); }
  .rate-val { font-family:monospace; font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin-left:12px; }
</style>

<div style="display:flex; align-items:center; gap:16px;">
  <div id="rate" class="rate"></div>
  <span id="rate-val" class="rate-val">3.0 / 5</span>
</div>

<script>
  const STAR = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  let rateVal = 3;
  function rateRender() {
    const c = document.getElementById('rate'); c.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const fill = Math.max(0, Math.min(1, rateVal - i));
      const btn = document.createElement('button');
      btn.className = 'rate-star';
      btn.innerHTML = '<span class="empty">' + STAR + '</span>' +
        '<span class="fill" style="width:' + (fill * 100) + '%">' + STAR + '</span>';
      btn.onclick = () => { rateVal = i + 1; document.getElementById('rate-val').textContent = rateVal.toFixed(1) + ' / 5'; rateRender(); };
      c.appendChild(btn);
    }
  }
  rateRender();
</script>`}
      >
        <div className="flex items-center gap-4">
          <Rate value={v1} onChange={setV1} />
          <span className="text-sm font-mono text-muted-foreground">{v1.toFixed(1)} / 5</span>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Rate — meias estrelas"
        description="Clique na metade esquerda da estrela para meio ponto."
        code={`const [v2, setV2] = useState(2.5);

<div className="flex items-center gap-4">
  <Rate value={v2} onChange={setV2} allowHalf size="lg" />
  <span className="text-sm font-mono text-muted-foreground">{v2.toFixed(1)} / 5</span>
</div>`}
        htmlCode={`<style>
  .rate-half { display:inline-flex; gap:4px; align-items:center; }
  .rate-half .rate-star { position:relative; width:32px; height:32px; cursor:pointer; transition:transform .15s; }
  .rate-half .rate-star:hover { transform:scale(1.1); }
  .rate-half .empty { color:hsl(var(--muted-foreground, 110 10% 40%) / 0.4); display:block; width:100%; height:100%; }
  .rate-half .fill { position:absolute; inset:0; overflow:hidden; color:hsl(var(--warning, 38 92% 50%)); }
  .rate-half svg { width:100%; height:100%; }
</style>

<div style="display:flex; align-items:center; gap:16px;">
  <div id="rateHalf" class="rate-half"></div>
  <span id="rateHalfVal" style="font-family:monospace; font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%));">2.5 / 5</span>
</div>

<script>
  const HALF_STAR = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  let halfVal = 2.5, halfHover = null;
  const halfRoot = document.getElementById('rateHalf');
  function halfRender() {
    const display = halfHover ?? halfVal;
    halfRoot.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const fill = Math.max(0, Math.min(1, display - i));
      const btn = document.createElement('button');
      btn.className = 'rate-star';
      btn.innerHTML = '<span class="empty">' + HALF_STAR + '</span>' +
        '<span class="fill" style="width:' + (fill * 100) + '%">' + HALF_STAR + '</span>';
      btn.onmousemove = (e) => {
        const r = btn.getBoundingClientRect();
        const isHalf = (e.clientX - r.left) < r.width / 2;
        halfHover = i + (isHalf ? 0.5 : 1); halfRender();
      };
      btn.onclick = (e) => {
        const r = btn.getBoundingClientRect();
        const isHalf = (e.clientX - r.left) < r.width / 2;
        halfVal = i + (isHalf ? 0.5 : 1);
        document.getElementById('rateHalfVal').textContent = halfVal.toFixed(1) + ' / 5';
        halfRender();
      };
      halfRoot.appendChild(btn);
    }
  }
  halfRoot.onmouseleave = () => { halfHover = null; halfRender(); };
  halfRender();
</script>`}
      >
        <div className="flex items-center gap-4">
          <Rate value={v2} onChange={setV2} allowHalf size="lg" />
          <span className="text-sm font-mono text-muted-foreground">{v2.toFixed(1)} / 5</span>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Rate — somente leitura"
        description="Para exibição de avaliações já recebidas (cards de produtos, depoimentos)."
        code={`<div className="flex items-center gap-3">
  <Rate value={4} readOnly size="sm" />
  <Rate value={4.5} allowHalf readOnly />
  <Rate value={5} readOnly size="lg" />
</div>`}
        htmlCode={`<style>
  .rate-ro { display:inline-flex; gap:2px; align-items:center; pointer-events:none; }
  .rate-ro .star { position:relative; width:var(--s, 24px); height:var(--s, 24px); }
  .rate-ro .star svg { width:100%; height:100%; }
  .rate-ro .empty { color:hsl(var(--muted-foreground, 110 10% 40%) / 0.4); }
  .rate-ro .fill { position:absolute; inset:0; overflow:hidden; color:hsl(var(--warning, 38 92% 50%)); }
  .rate-sm { --s:16px; }
  .rate-md { --s:24px; }
  .rate-lg { --s:32px; }
</style>

<!-- Use o template abaixo trocando as classes 'sm/md/lg' e a porcentagem de width:fill -->
<div class="rate-ro rate-sm">
  <!-- 4 estrelas cheias -->
  <span class="star"><span class="empty">★</span><span class="fill" style="width:100%">★</span></span>
  <!-- ... 4× ... -->
  <!-- 1 estrela vazia -->
  <span class="star"><span class="empty">★</span><span class="fill" style="width:0%">★</span></span>
</div>
<div class="rate-ro rate-md">
  <!-- 4 cheias + 1 metade -->
  <span class="star"><span class="empty">★</span><span class="fill" style="width:100%">★</span></span>
  <span class="star"><span class="empty">★</span><span class="fill" style="width:50%">★</span></span>
</div>
<div class="rate-ro rate-lg">
  <!-- 5 cheias -->
  <span class="star"><span class="empty">★</span><span class="fill" style="width:100%">★</span></span>
</div>`}
      >
        <div className="flex items-center gap-3">
          <Rate value={v3} readOnly size="sm" />
          <Rate value={4.5} allowHalf readOnly />
          <Rate value={5} readOnly size="lg" />
        </div>
      </ComponentShowcase>
    </div>
  );
}
