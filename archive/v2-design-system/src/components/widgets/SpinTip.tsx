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
        code={`function Spin({ tip, size = "md", className }: { tip?: string; size?: "sm" | "md" | "lg"; className?: string }) {
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

<>
  <Spin size="sm" />
  <Spin size="md" tip="Carregando" />
  <Spin size="lg" tip="Processando dados" />
</>`}
        htmlCode={`<div style="display:flex; flex-direction:column; align-items:center; gap:12px; color:hsl(var(--primary));">
  <div class="auvp-spin auvp-spin--lg"></div>
  <span style="font-family:'Sora'; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; font-size:11px; color:#6b7280;">
    Processando dados
  </span>
</div>

<style>
  .auvp-spin { border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation: auvpSpin 1s linear infinite; }
  .auvp-spin--sm { width:16px; height:16px; }
  .auvp-spin--md { width:24px; height:24px; }
  .auvp-spin--lg { width:40px; height:40px; }
  @keyframes auvpSpin { to { transform: rotate(360deg); } }
</style>`}
      >
        <Spin size="sm" />
        <Spin size="md" tip="Carregando" />
        <Spin size="lg" tip="Processando dados" />
      </ComponentShowcase>

      <ComponentShowcase
        title="Spin Overlay (sobre conteúdo)"
        description="Encobre uma área de conteúdo durante operações assíncronas, mantendo o layout estável."
        code={`function SpinOverlay({ spinning, tip, children }: { spinning: boolean; tip?: string; children: React.ReactNode }) {
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

const [loading, setLoading] = useState(false);

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
</div>`}
        htmlCode={`<div style="position:relative;">
  <div id="content" style="opacity:0.4; pointer-events:none; padding:24px; border:1px solid #e5e7eb; border-radius:12px;">
    <h4>Lorem ipsum</h4>
    <p>Conteúdo encoberto durante o loading.</p>
  </div>
  <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.4); backdrop-filter:blur(4px); border-radius:12px;">
    <div class="auvp-spin auvp-spin--lg" style="color:hsl(var(--primary));"></div>
  </div>
</div>`}
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
