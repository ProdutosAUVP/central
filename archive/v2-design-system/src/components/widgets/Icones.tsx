import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Circle, ExternalLink } from "lucide-react";

function IconWeight({ label, prefixLabel, description, strokeWidth, fill, opacity }: {
  label: string;
  prefixLabel: string;
  description: string;
  strokeWidth: number;
  fill: string;
  opacity?: number;
}) {
  return (
    <div className="bg-muted border rounded-xl p-6 flex flex-col items-center justify-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round" className="text-foreground dark:text-accent">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
          fill={fill}
          fillOpacity={opacity ?? 1}
          stroke={strokeWidth === 0 ? "none" : "currentColor"}
          strokeWidth={strokeWidth || 1.5}
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          className={strokeWidth === 0 && fill === "currentColor" ? "fill-muted" : undefined}
          fill={strokeWidth === 0 && fill === "currentColor" ? undefined : fill === "none" ? "none" : "currentColor"}
          stroke={strokeWidth === 0 ? "none" : "currentColor"}
          strokeWidth={strokeWidth || 1.5}
        />
      </svg>
      <span className="font-mono text-xs text-muted-foreground font-bold">{prefixLabel}</span>
      <span className="text-[10px] text-muted-foreground">{description}</span>
    </div>
  );
}

export function Icones() {
  return (
    <div className="space-y-12">
      {/* Pesos e Variações */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Pesos e Variações (Weights)</h3>
        <p className="text-muted-foreground mb-4">
          A biblioteca permite alternar entre estilos apenas mudando o prefixo da classe do ícone. O padrão do design system é o <em>Regular</em>, usando <em>Fill</em> para interações de estado ativo ou vídeos.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <IconWeight label="Regular" prefixLabel="ph (Regular)" description="Padrão do sistema" strokeWidth={1.5} fill="none" />
          <IconWeight label="Fill" prefixLabel="ph-fill" description="Para estados ativos" strokeWidth={0} fill="currentColor" />
          <IconWeight label="Bold" prefixLabel="ph-bold" description="Ênfase extra" strokeWidth={2.5} fill="none" />
          <IconWeight label="Duotone" prefixLabel="ph-duotone" description="Estilo decorativo" strokeWidth={1.5} fill="currentColor" opacity={0.2} />
        </div>
      </div>

      {/* Implementação */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Implementação e Referência</h3>
        <p className="text-muted-foreground mb-4">
          No projeto HTML, os ícones são importados via CDN Phosphor Icons usando a tag <code className="text-sm bg-muted px-1 py-0.5 rounded">&lt;i&gt;</code>. No projeto React, utilize a biblioteca <code className="text-sm bg-muted px-1 py-0.5 rounded">lucide-react</code> (já instalada) ou instale <code className="text-sm bg-muted px-1 py-0.5 rounded">@phosphor-icons/react</code>.
        </p>

        <a
          href="https://phosphoricons.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold text-sm uppercase rounded-lg hover:opacity-90 transition-opacity mb-6"
        >
          Acessar Catálogo Phosphor <ExternalLink className="h-4 w-4" />
        </a>

        <CodeBlock collapsible
          tabs={[
            {
              label: "React",
              language: "tsx",
              code: `// Grade dos 4 pesos exibida no preview
// Recomendamos @phosphor-icons/react. Lucide-react também já está no projeto.
import { Eye } from "lucide-react";

function IconWeight({ prefixLabel, description, strokeWidth, fill, opacity }) {
  return (
    <div className="bg-muted border rounded-xl p-6 flex flex-col items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36" height="36" viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground dark:text-accent"
      >
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
          fill={fill}
          fillOpacity={opacity ?? 1}
          stroke={strokeWidth === 0 ? "none" : "currentColor"}
          strokeWidth={strokeWidth || 1.5}
        />
        <circle cx="12" cy="12" r="3"
          fill={fill === "none" ? "none" : "currentColor"}
          stroke={strokeWidth === 0 ? "none" : "currentColor"}
          strokeWidth={strokeWidth || 1.5}
        />
      </svg>
      <span className="font-mono text-xs text-muted-foreground font-bold">
        {prefixLabel}
      </span>
      <span className="text-[10px] text-muted-foreground">{description}</span>
    </div>
  );
}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  <IconWeight prefixLabel="ph (Regular)" description="Padrão do sistema"
    strokeWidth={1.5} fill="none" />
  <IconWeight prefixLabel="ph-fill" description="Para estados ativos"
    strokeWidth={0} fill="currentColor" />
  <IconWeight prefixLabel="ph-bold" description="Ênfase extra"
    strokeWidth={2.5} fill="none" />
  <IconWeight prefixLabel="ph-duotone" description="Estilo decorativo"
    strokeWidth={1.5} fill="currentColor" opacity={0.2} />
</div>`
            },
            {
              label: "HTML / CSS / JS",
              language: "html",
              code: `<!-- Phosphor Icons via CDN — espelha a grid de 4 pesos do preview -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<div class="weights-grid">
  <div class="weight-card">
    <i class="ph ph-eye"></i>
    <span class="weight-prefix">ph (Regular)</span>
    <span class="weight-desc">Padrão do sistema</span>
  </div>
  <div class="weight-card">
    <i class="ph-fill ph-eye"></i>
    <span class="weight-prefix">ph-fill</span>
    <span class="weight-desc">Para estados ativos</span>
  </div>
  <div class="weight-card">
    <i class="ph-bold ph-eye"></i>
    <span class="weight-prefix">ph-bold</span>
    <span class="weight-desc">Ênfase extra</span>
  </div>
  <div class="weight-card">
    <i class="ph-duotone ph-eye"></i>
    <span class="weight-prefix">ph-duotone</span>
    <span class="weight-desc">Estilo decorativo</span>
  </div>
</div>

<style>
  .weights-grid {
    display:grid; grid-template-columns:repeat(4, 1fr); gap:1.5rem;
  }
  .weight-card {
    background:hsl(var(--muted));
    border:1px solid hsl(var(--border));
    border-radius:12px;
    padding:1.5rem;
    display:flex; flex-direction:column; align-items:center; gap:.75rem;
    text-align:center;
  }
  .weight-card i {
    font-size:36px; color:hsl(var(--foreground));
  }
  .weight-prefix {
    font-family:ui-monospace,SFMono-Regular,monospace;
    font-size:.75rem; font-weight:700;
    color:hsl(var(--muted-foreground));
  }
  .weight-desc {
    font-size:10px; color:hsl(var(--muted-foreground));
  }
  @media (max-width:640px){
    .weights-grid { grid-template-columns:repeat(2, 1fr); }
  }
</style>`
            }
          ]}
        />
      </div>
    </div>
  );
}
