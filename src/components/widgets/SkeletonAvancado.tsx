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
        htmlCode={`<style>.sk { background:linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.5) 50%, hsl(var(--muted)) 100%); background-size:200% 100%; animation:skPulse 1.5s ease-in-out infinite; border-radius:6px; } @keyframes skPulse { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }</style>`}
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
        htmlCode={`<!-- 2 cards de skeleton lado a lado -->`}
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
  <div className="grid grid-cols-4 gap-4 p-3 bg-muted/40">
    {[...Array(4)].map((_,i) => <Skeleton key={i} className="h-3 w-20" />)}
  </div>
  {[...Array(4)].map((_,r) => (
    <div key={r} className="grid grid-cols-4 gap-4 p-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  ))}
</div>`}
        htmlCode={`<!-- grade de skeleton 4 colunas -->`}
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
