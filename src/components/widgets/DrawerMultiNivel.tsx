import React, { useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsDark } from "@/hooks/use-is-dark";

const DRAWER_WIDTH = 420;

export function DrawerSimples() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = useIsDark(triggerRef);

  return (
    <ComponentShowcase
      title="Drawer único"
      description="Painel lateral simples para edição, detalhes ou formulários secundários sem sair do contexto principal."
      code={`const [open, setOpen] = useState(false);

<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button>Abrir drawer</Button></SheetTrigger>
  <SheetContent side="right" className="w-[420px] sm:max-w-[420px]">
    <SheetHeader>
      <SheetTitle>Edição</SheetTitle>
      <SheetDescription>Detalhes do registro selecionado.</SheetDescription>
    </SheetHeader>
    <div className="py-6">...</div>
  </SheetContent>
</Sheet>`}
      htmlCode={`<button onclick="dOpen()" class="d-trigger">Abrir drawer</button>

<div id="d-overlay" onclick="dClose()" class="d-overlay"></div>
<aside id="d-panel" class="d-panel">
  <div class="d-header">
    <h3 class="d-title">Edição</h3>
    <p class="d-desc">Detalhes do registro selecionado.</p>
    <button onclick="dClose()" class="d-close" aria-label="Fechar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="d-body">
    <div class="d-card">
      <p class="d-card-title">Categoria</p>
      <p class="d-card-text">Lorem ipsum dolor sit amet consectetur.</p>
    </div>
    <div class="d-card">
      <p class="d-card-title">Descrição</p>
      <p class="d-card-text">Sed do eiusmod tempor incididunt ut labore.</p>
    </div>
  </div>
</aside>

<style>
  .d-trigger {
    padding:10px 16px;
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    border:none; border-radius:12px;
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:13px; cursor:pointer;
  }
  .d-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:50; backdrop-filter:blur(4px); }
  .d-overlay.open { display:block; }
  .d-panel {
    position:fixed; top:0; bottom:0; right:0; width:420px;
    background:hsl(var(--background, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    padding:24px; box-shadow:-4px 0 24px rgba(0,0,0,.1);
    transform:translateX(100%); transition:transform .3s; z-index:60;
    font-family:'Roboto', sans-serif;
  }
  .d-panel.open { transform:translateX(0); }
  .d-title { font-family:'Anek Latin', sans-serif; font-weight:600; margin:0; }
  .d-desc { font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin:4px 0 0; }
  .d-close {
    position:absolute; top:16px; right:16px; width:24px; height:24px;
    background:none; border:none; cursor:pointer;
    color:hsl(var(--background, 0 0% 100%));
    background:hsl(var(--foreground, 110 78% 9%) / 0.5);
    border-radius:6px; padding:4px;
  }
  .d-close svg { width:100%; height:100%; }
  .d-body { display:flex; flex-direction:column; gap:12px; padding-top:24px; }
  .d-card { border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:8px; padding:16px; }
  .d-card-title { font-family:'Anek Latin', sans-serif; font-weight:600; margin:0 0 4px; }
  .d-card-text { font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin:0; }
</style>

<script>
  function dOpen() {
    document.getElementById('d-panel').classList.add('open');
    document.getElementById('d-overlay').classList.add('open');
  }
  function dClose() {
    document.getElementById('d-panel').classList.remove('open');
    document.getElementById('d-overlay').classList.remove('open');
  }
</script>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button ref={triggerRef}>Abrir drawer</Button>
        </SheetTrigger>
        <SheetContent side="right" className={cn("w-[420px] sm:max-w-[420px]", isDark && "dark")}>
          <SheetHeader>
            <SheetTitle className="font-anek">Edição</SheetTitle>
            <SheetDescription>Detalhes do registro selecionado.</SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-3">
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-anek font-semibold dark:text-white">Categoria</p>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-anek font-semibold dark:text-white">Descrição</p>
              <p className="text-sm text-muted-foreground">Sed do eiusmod tempor incididunt ut labore.</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </ComponentShowcase>
  );
}

export function DrawerMultiNivel() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = useIsDark(triggerRef);

  return (
    <ComponentShowcase
      title="Drawer multi-nível (push)"
      description="Drawers empilhados que abrem em sequência preservando a hierarquia. Todos os níveis compartilham a mesma largura para manter consistência visual ao navegar entre camadas."
      code={`const W = 420;
const [n1, setN1] = useState(false);
const [n2, setN2] = useState(false);

<Sheet open={n1} onOpenChange={setN1}>
  <SheetTrigger asChild><Button>Abrir nível 1</Button></SheetTrigger>
  <SheetContent side="right" className="w-[420px] sm:max-w-[420px]">
    <SheetHeader>...</SheetHeader>
    <Button onClick={() => setN2(true)}>Abrir nível 2 →</Button>

    <Sheet open={n2} onOpenChange={setN2}>
      {/* mesma largura do nível anterior */}
      <SheetContent side="right" className="w-[420px] sm:max-w-[420px]">
        ...
      </SheetContent>
    </Sheet>
  </SheetContent>
</Sheet>`}
      htmlCode={`<button onclick="dnOpen(1)" class="dn-trigger">Abrir nível 1</button>

<div id="dn-overlay" onclick="dnCloseAll()" class="dn-overlay"></div>

<aside id="dn1" class="dn-panel" style="right:0;">
  <header>
    <h3>Edição — Nível 1</h3>
    <p>Lorem ipsum dolor sit amet consectetur.</p>
    <button onclick="dnClose(1)" class="dn-close" aria-label="Fechar">×</button>
  </header>
  <div class="dn-card">
    <p class="dn-card-title">Categoria principal</p>
    <p class="dn-card-text">Lorem ipsum dolor sit amet.</p>
  </div>
  <button onclick="dnOpen(2)" class="dn-link">
    <span>Editar subitem (Nível 2)</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>
</aside>

<aside id="dn2" class="dn-panel" style="right:420px;">
  <header>
    <h3>Subitem — Nível 2</h3>
    <p>Detalhes do subitem selecionado.</p>
    <button onclick="dnClose(2)" class="dn-close" aria-label="Fechar">×</button>
  </header>
  <div class="dn-card">
    <p class="dn-card-title">Atributo</p>
    <p class="dn-card-text">Consectetur adipiscing elit.</p>
  </div>
  <button onclick="dnOpen(3)" class="dn-link">
    <span>Editar metadado (Nível 3)</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>
</aside>

<aside id="dn3" class="dn-panel" style="right:840px;">
  <header>
    <h3>Metadado — Nível 3</h3>
    <p>Última camada do drawer empilhado.</p>
    <button onclick="dnClose(3)" class="dn-close" aria-label="Fechar">×</button>
  </header>
  <div class="dn-card">
    <p class="dn-card-title">Valor</p>
    <p class="dn-card-text">Sed do eiusmod tempor.</p>
  </div>
</aside>

<style>
  .dn-trigger {
    padding:10px 16px; background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    border:none; border-radius:12px;
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:13px; cursor:pointer;
  }
  .dn-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:50; backdrop-filter:blur(4px); }
  .dn-overlay.open { display:block; }
  .dn-panel {
    position:fixed; top:0; bottom:0; width:420px; max-width:420px;
    background:hsl(var(--background, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    padding:24px; box-shadow:-4px 0 24px rgba(0,0,0,.1);
    transform:translateX(100%); transition:transform .3s; z-index:60;
    font-family:'Roboto', sans-serif;
  }
  .dn-panel.open { transform:translateX(0); }
  .dn-panel h3 { font-family:'Anek Latin', sans-serif; font-weight:600; margin:0; }
  .dn-panel header p { font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin:4px 0 24px; }
  .dn-close {
    position:absolute; top:16px; right:16px; width:28px; height:28px;
    border:none; cursor:pointer; font-size:18px;
    background:hsl(var(--foreground, 110 78% 9%) / 0.5);
    color:hsl(var(--background, 0 0% 100%));
    border-radius:6px;
  }
  .dn-card { border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:8px; padding:16px; margin-bottom:12px; }
  .dn-card-title { font-family:'Anek Latin', sans-serif; font-weight:600; margin:0 0 4px; }
  .dn-card-text { font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin:0; }
  .dn-link {
    width:100%; display:flex; align-items:center; justify-content:space-between;
    padding:10px 14px; border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:8px; background:transparent;
    color:hsl(var(--foreground, 110 78% 9%));
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:12px; cursor:pointer;
  }
  .dn-link svg { width:16px; height:16px; }
</style>

<script>
  // Largura fixa: todos os níveis = 420px. dnX está em right:(X-1)*420
  function dnOpen(n) {
    document.getElementById('dn-overlay').classList.add('open');
    for (let i = 1; i <= n; i++) document.getElementById('dn' + i).classList.add('open');
  }
  function dnClose(n) {
    // fecha o nível atual e os superiores
    for (let i = n; i <= 3; i++) document.getElementById('dn' + i).classList.remove('open');
    if (n === 1) document.getElementById('dn-overlay').classList.remove('open');
  }
  function dnCloseAll() {
    [1, 2, 3].forEach(i => document.getElementById('dn' + i).classList.remove('open'));
    document.getElementById('dn-overlay').classList.remove('open');
  }
</script>`}
    >
      <Sheet open={open1} onOpenChange={setOpen1}>
        <SheetTrigger asChild>
          <Button ref={triggerRef}>Abrir nível 1</Button>
        </SheetTrigger>
        <SheetContent side="right" className={cn(`w-[${DRAWER_WIDTH}px] sm:max-w-[${DRAWER_WIDTH}px]`, isDark && "dark")} style={{ width: DRAWER_WIDTH, maxWidth: DRAWER_WIDTH }}>
          <SheetHeader>
            <SheetTitle className="font-anek">Edição — Nível 1</SheetTitle>
            <SheetDescription>Lorem ipsum dolor sit amet consectetur.</SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-3">
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-anek font-semibold dark:text-white">Categoria principal</p>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
            </div>
            <Button variant="outline" className="w-full justify-between dark:text-white" onClick={() => setOpen2(true)}>
              <span>Editar subitem (Nível 2)</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Sheet open={open2} onOpenChange={setOpen2}>
            <SheetContent side="right" className={cn(isDark && "dark")} style={{ width: DRAWER_WIDTH, maxWidth: DRAWER_WIDTH }}>
              <SheetHeader>
                <SheetTitle className="font-anek">Subitem — Nível 2</SheetTitle>
                <SheetDescription>Detalhes do subitem selecionado.</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-3">
                <div className="rounded-lg border p-4 space-y-1">
                  <p className="font-anek font-semibold dark:text-white">Atributo</p>
                  <p className="text-sm text-muted-foreground">Consectetur adipiscing elit.</p>
                </div>
                <Button variant="outline" className="w-full justify-between dark:text-white" onClick={() => setOpen3(true)}>
                  <span>Editar metadado (Nível 3)</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Sheet open={open3} onOpenChange={setOpen3}>
                <SheetContent side="right" className={cn(isDark && "dark")} style={{ width: DRAWER_WIDTH, maxWidth: DRAWER_WIDTH }}>
                  <SheetHeader>
                    <SheetTitle className="font-anek">Metadado — Nível 3</SheetTitle>
                    <SheetDescription>Última camada do drawer empilhado.</SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <div className="rounded-lg border p-4 space-y-1">
                      <p className="font-anek font-semibold dark:text-white">Valor</p>
                      <p className="text-sm text-muted-foreground">Sed do eiusmod tempor.</p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </SheetContent>
          </Sheet>
        </SheetContent>
      </Sheet>
    </ComponentShowcase>
  );
}
