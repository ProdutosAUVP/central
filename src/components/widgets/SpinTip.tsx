import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

interface SpinProps {
  tip?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spin({ tip, size = "md", className }: SpinProps) {
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 text-accent", className)}>
      <Loader2 className={cn(sizes[size], "animate-spin")} />
      {tip && (
        <p className="text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
          {tip}
        </p>
      )}
    </div>
  );
}

interface SpinOverlayProps {
  spinning: boolean;
  tip?: string;
  children: React.ReactNode;
}

export function SpinOverlay({ spinning, tip, children }: SpinOverlayProps) {
  return (
    <div className="relative">
      <div className={cn("transition-opacity", spinning && "opacity-40 pointer-events-none")}>
        {children}
      </div>
      {spinning && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-lg">
          <Spin tip={tip} size="lg" />
        </div>
      )}
    </div>
  );
}

export function SpinTipWidget() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <ComponentShowcase
        title="Spin (3 tamanhos + tip)"
        description="Indicador de carregamento com tag de mensagem em Sora uppercase, alinhado ao padrão AUVP de tooltips."
        code={`<>
  <Spin size="sm" />
  <Spin size="md" tip="Carregando" />
  <Spin size="lg" tip="Processando dados" />
</>`}
        htmlCode={`<div class="auvp-spin auvp-spin--lg"></div>`}
      >
        <Spin size="sm" />
        <Spin size="md" tip="Carregando" />
        <Spin size="lg" tip="Processando dados" />
      </ComponentShowcase>

      <ComponentShowcase
        title="Spin Overlay (sobre conteúdo)"
        description="Encobre uma área de conteúdo durante operações assíncronas, mantendo o layout estável."
        code={`<SpinOverlay spinning={loading} tip="Sincronizando">
  <div className="rounded-xl border bg-card p-6">
    <h4>Conteúdo</h4>
  </div>
</SpinOverlay>`}
        htmlCode={`<!-- overlay com backdrop-blur -->`}
      >
        <div className="w-full max-w-md">
          <SpinOverlay spinning={loading} tip="Sincronizando">
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <h4 className="font-anek font-bold text-lg">Lorem ipsum</h4>
              <p className="text-sm text-muted-foreground font-roboto">
                Conteúdo real fica visível mas inativo enquanto a operação acontece.
              </p>
              <div className="h-2 rounded-full bg-muted" />
              <div className="h-2 rounded-full bg-muted w-2/3" />
            </div>
          </SpinOverlay>
          <Button className="mt-4" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2500); }}>
            {loading ? "Carregando..." : "Disparar overlay"}
          </Button>
        </div>
      </ComponentShowcase>
    </div>
  );
}
