import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

function buildWatermarkUrl(text: string, isDark = false) {
  const canvas = document.createElement("canvas");
  const size = 200;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.clearRect(0, 0, size, size);
  ctx.translate(size / 2, size / 2);
  ctx.rotate((-22 * Math.PI) / 180);
  ctx.font = "600 14px 'Sora', sans-serif";
  ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);
  return canvas.toDataURL();
}

export function WatermarkWidget() {
  const [text, setText] = useState("AUVP CONFIDENCIAL");
  const [bg, setBg] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detect = () => {
      const el = ref.current;
      const isDark = !!el?.closest(".dark");
      setBg(buildWatermarkUrl(text || " ", isDark));
    };
    detect();
    // Reage a toggles de tema (mudança de classe nos ancestrais)
    const observer = new MutationObserver(detect);
    let node: HTMLElement | null = ref.current;
    while (node) {
      observer.observe(node, { attributes: true, attributeFilter: ["class"] });
      node = node.parentElement;
    }
    return () => observer.disconnect();
  }, [text]);

  return (
    <ComponentShowcase
      title="Watermark (marca d'água)"
      description="Sobrepõe texto repetido em diagonal sobre conteúdo sensível (relatórios, PDFs, documentos internos). Renderizado via canvas em data URL."
      code={`function buildWatermarkUrl(text: string, isDark = false) {
  const canvas = document.createElement("canvas");
  const size = 200;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.clearRect(0, 0, size, size);
  ctx.translate(size / 2, size / 2);
  ctx.rotate((-22 * Math.PI) / 180);
  ctx.font = "600 14px 'Sora', sans-serif";
  ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);
  return canvas.toDataURL();
}

const [text, setText] = useState("AUVP CONFIDENCIAL");
const [bg, setBg] = useState("");
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const isDark = !!ref.current?.closest(".dark");
  setBg(buildWatermarkUrl(text || " ", isDark));
}, [text]);

<div className="w-full space-y-4">
  <div className="max-w-sm space-y-1.5">
    <Label htmlFor="wm-text" className="text-xs uppercase tracking-wider font-roboto">
      Texto da marca d'água
    </Label>
    <Input id="wm-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="AUVP CONFIDENCIAL" />
  </div>
  <div
    ref={ref}
    className="relative border rounded-xl p-6 bg-card overflow-hidden"
    style={bg ? { backgroundImage: \`url(\${bg})\`, backgroundRepeat: "repeat" } : undefined}
  >
    <div className="relative z-0">
      <h3 className="text-xl font-bold font-anek mb-3">Relatório de Carteira — Q1 2026</h3>
      <p className="text-sm text-foreground mb-2">
        Patrimônio total consolidado: <strong>R$ 1.245.000,00</strong>
      </p>
      <p className="text-sm text-muted-foreground mb-2">
        Distribuição: 45% Renda Fixa, 30% Ações, 15% FIIs, 10% Internacional.
      </p>
      <p className="text-sm text-muted-foreground">
        Documento sigiloso. Reprodução não autorizada é proibida.
      </p>
    </div>
  </div>
</div>`}
      htmlCode={`<style>
  .wm-container { position:relative; padding:24px; border:1px solid #e5e7eb; border-radius:12px; background:#fff; }
  .wm-container::before {
    content:'';
    position:absolute; inset:0;
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="100" y="100" text-anchor="middle" font-family="Sora,sans-serif" font-size="14" font-weight="600" fill="rgba(0,0,0,0.08)" transform="rotate(-22 100 100)">AUVP CONFIDENCIAL</text></svg>');
    background-repeat:repeat;
    pointer-events:none;
  }
</style>

<div class="wm-container">
  <h3>Documento sensível</h3>
  <p>Conteúdo protegido por marca d'água repetida em diagonal.</p>
</div>`}
    >
      <div className="w-full space-y-4">
        <div className="max-w-sm space-y-1.5">
          <Label htmlFor="wm-text" className="text-xs uppercase tracking-wider font-roboto">
            Texto da marca d'água
          </Label>
          <Input
            id="wm-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="AUVP CONFIDENCIAL"
          />
        </div>
        <div
          ref={ref}
          className="relative border rounded-xl p-6 bg-card overflow-hidden"
          style={bg ? { backgroundImage: `url(${bg})`, backgroundRepeat: "repeat" } : undefined}
        >
          <div className="relative z-0">
            <h3 className="text-xl font-bold font-anek mb-3">Relatório de Carteira — Q1 2026</h3>
            <p className="text-sm text-foreground mb-2">
              Patrimônio total consolidado: <strong>R$ 1.245.000,00</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Distribuição: 45% Renda Fixa, 30% Ações, 15% FIIs, 10% Internacional.
            </p>
            <p className="text-sm text-muted-foreground">
              Documento sigiloso. Reprodução não autorizada é proibida.
            </p>
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
