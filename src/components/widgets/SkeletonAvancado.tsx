import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

export function SkeletonAvancado() {
  return (
    <div className="space-y-6">
      <ComponentShowcase
        title="Skeleton — Lista com avatar"
        description="Combinação avatar circular + linhas de texto. Padrão para feeds, comentários e listas de usuários."
        code={`<div className="flex items-start gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="flex-1 space-y-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
  </div>
</div>`}
        htmlCode={`<style>
  .sk {
    background:linear-gradient(90deg,
      hsl(var(--muted, 120 10% 95%)) 0%,
      hsl(var(--muted, 120 10% 95%) / 0.5) 50%,
      hsl(var(--muted, 120 10% 95%)) 100%);
    background-size:200% 100%;
    animation: skPulse 1.5s ease-in-out infinite;
    border-radius:6px;
  }
  @keyframes skPulse { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }
  .sk-list { display:flex; flex-direction:column; gap:20px; max-width:480px; }
  .sk-item { display:flex; gap:16px; align-items:flex-start; }
  .sk-item .avatar { width:48px; height:48px; border-radius:50%; flex-shrink:0; }
  .sk-item .lines { flex:1; display:flex; flex-direction:column; gap:8px; }
</style>

<div class="sk-list">
  <div class="sk-item">
    <div class="sk avatar"></div>
    <div class="lines">
      <div class="sk" style="height:16px; width:33%;"></div>
      <div class="sk" style="height:12px; width:100%;"></div>
      <div class="sk" style="height:12px; width:80%;"></div>
    </div>
  </div>
  <div class="sk-item">
    <div class="sk avatar"></div>
    <div class="lines">
      <div class="sk" style="height:16px; width:33%;"></div>
      <div class="sk" style="height:12px; width:100%;"></div>
      <div class="sk" style="height:12px; width:80%;"></div>
    </div>
  </div>
  <div class="sk-item">
    <div class="sk avatar"></div>
    <div class="lines">
      <div class="sk" style="height:16px; width:33%;"></div>
      <div class="sk" style="height:12px; width:100%;"></div>
      <div class="sk" style="height:12px; width:80%;"></div>
    </div>
  </div>
</div>`}
      >
        <div className="w-full max-w-md space-y-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Skeleton — Card de conteúdo"
        description="Imagem destacada + título + parágrafo + ações. Use para cards de produto, curso ou artigo."
        code={`<div className="rounded-xl border p-4 space-y-4">
  <Skeleton className="h-40 w-full rounded-lg" />
  <Skeleton className="h-5 w-2/3" />
  <Skeleton className="h-3 w-full" />
  <Skeleton className="h-3 w-5/6" />
  <div className="flex gap-2 pt-2">
    <Skeleton className="h-9 w-24 rounded-md" />
    <Skeleton className="h-9 w-24 rounded-md" />
  </div>
</div>`}
        htmlCode={`<div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px;">
  <div style="border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:12px; padding:16px; background:hsl(var(--card, 0 0% 100%)); display:flex; flex-direction:column; gap:16px;">
    <div class="sk" style="height:160px; border-radius:8px;"></div>
    <div class="sk" style="height:20px; width:66%;"></div>
    <div class="sk" style="height:12px; width:100%;"></div>
    <div class="sk" style="height:12px; width:83%;"></div>
    <div style="display:flex; gap:8px; margin-top:8px;">
      <div class="sk" style="height:36px; width:96px; border-radius:8px;"></div>
      <div class="sk" style="height:36px; width:96px; border-radius:8px;"></div>
    </div>
  </div>
  <div style="border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:12px; padding:16px; background:hsl(var(--card, 0 0% 100%)); display:flex; flex-direction:column; gap:16px;">
    <div class="sk" style="height:160px; border-radius:8px;"></div>
    <div class="sk" style="height:20px; width:66%;"></div>
    <div class="sk" style="height:12px; width:100%;"></div>
    <div class="sk" style="height:12px; width:83%;"></div>
    <div style="display:flex; gap:8px; margin-top:8px;">
      <div class="sk" style="height:36px; width:96px; border-radius:8px;"></div>
      <div class="sk" style="height:36px; width:96px; border-radius:8px;"></div>
    </div>
  </div>
</div>
<!-- requer a classe .sk com keyframes do primeiro exemplo -->`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-4 space-y-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Skeleton — Tabela"
        description="Cabeçalho + linhas com proporções variadas. Padrão para grids de dados e relatórios."
        code={`<div className="rounded-lg border divide-y">
  {/* header */}
  <div className="grid grid-cols-4 gap-4 p-3 bg-muted/40">
    {[...Array(4)].map((_,i) => <Skeleton key={i} className="h-3 w-20" />)}
  </div>
  {/* rows */}
  {[...Array(4)].map((_,r) => (
    <div key={r} className="grid grid-cols-4 gap-4 p-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  ))}
</div>`}
        htmlCode={`<div style="border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:8px; overflow:hidden;">
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px; background:hsl(var(--muted, 120 10% 95%) / 0.4);">
    <div class="sk" style="height:12px; width:80px;"></div>
    <div class="sk" style="height:12px; width:80px;"></div>
    <div class="sk" style="height:12px; width:80px;"></div>
    <div class="sk" style="height:12px; width:80px;"></div>
  </div>
  <!-- 4 linhas -->
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px; border-top:1px solid hsl(var(--border, 120 10% 88%));">
    <div class="sk" style="height:16px; width:75%;"></div>
    <div class="sk" style="height:16px; width:50%;"></div>
    <div class="sk" style="height:16px; width:66%;"></div>
    <div class="sk" style="height:16px; width:33%;"></div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px; border-top:1px solid hsl(var(--border, 120 10% 88%));">
    <div class="sk" style="height:16px; width:75%;"></div>
    <div class="sk" style="height:16px; width:50%;"></div>
    <div class="sk" style="height:16px; width:66%;"></div>
    <div class="sk" style="height:16px; width:33%;"></div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px; border-top:1px solid hsl(var(--border, 120 10% 88%));">
    <div class="sk" style="height:16px; width:75%;"></div>
    <div class="sk" style="height:16px; width:50%;"></div>
    <div class="sk" style="height:16px; width:66%;"></div>
    <div class="sk" style="height:16px; width:33%;"></div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px; border-top:1px solid hsl(var(--border, 120 10% 88%));">
    <div class="sk" style="height:16px; width:75%;"></div>
    <div class="sk" style="height:16px; width:50%;"></div>
    <div class="sk" style="height:16px; width:66%;"></div>
    <div class="sk" style="height:16px; width:33%;"></div>
  </div>
</div>
<!-- requer a classe .sk com keyframes do primeiro exemplo -->`}
      >
        <div className="w-full rounded-lg border divide-y">
          <div className="grid grid-cols-4 gap-4 p-3 bg-muted/40">
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-3 w-20" />)}
          </div>
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="grid grid-cols-4 gap-4 p-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </ComponentShowcase>
    </div>
  );
}
