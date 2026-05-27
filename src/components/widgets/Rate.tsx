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
  // ...
}

const [v1, setV1] = useState(3);

<div className="flex items-center gap-4">
  <Rate value={v1} onChange={setV1} />
  <span className="text-sm font-mono text-muted-foreground">{v1.toFixed(1)} / 5</span>
</div>`}
        htmlCode={`<div style="display:flex; align-items:center; gap:16px;">
  <div id="rate" class="rate"></div>
  <span id="rate-val" style="font-family:monospace; font-size:14px;">3.0 / 5</span>
</div>`}
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
        htmlCode={`<!-- meias estrelas via onmousemove -->`}
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
        htmlCode={`<!-- pointer-events:none para somente leitura -->`}
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
