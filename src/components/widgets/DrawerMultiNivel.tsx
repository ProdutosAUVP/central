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
    <button onclick="dClose()" class="d-close" aria-label="Fechar">×</button>
  </div>
  <div class="d-body">
    <div class="d-card"><p class="d-card-title">Categoria</p><p class="d-card-text">Lorem ipsum.</p></div>
  </div>
</aside>`}
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
    <Button onClick={() => setN2(true)}>Abrir nível 2 →</Button>
    <Sheet open={n2} onOpenChange={setN2}>
      <SheetContent side="right" className="w-[420px] sm:max-w-[420px]">...</SheetContent>
    </Sheet>
  </SheetContent>
</Sheet>`}
      htmlCode={`<button onclick="dnOpen(1)" class="dn-trigger">Abrir nível 1</button>`}
    >
      <Sheet open={open1} onOpenChange={setOpen1}>
        <SheetTrigger asChild>
          <Button ref={triggerRef}>Abrir nível 1</Button>
        </SheetTrigger>
        <SheetContent side="right" className={cn(isDark && "dark")} style={{ width: DRAWER_WIDTH, maxWidth: DRAWER_WIDTH }}>
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
