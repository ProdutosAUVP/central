import React, { useRef } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { useToast } from "@/hooks/use-toast";
import { useIsDark } from "@/hooks/use-is-dark";

export function PopconfirmWidget() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = useIsDark(triggerRef);

  return (
    <ComponentShowcase
      title="Popconfirm (confirmação inline)"
      description="Confirmação leve ancorada ao gatilho — ideal para ações destrutivas rápidas (excluir item, sair, descartar) sem abrir um Dialog completo."
      code={`const { toast } = useToast();
const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
    >
      <Trash2 className="h-4 w-4 mr-2" /> Excluir item
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-72" align="start">
    <div className="flex gap-3">
      <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
      <div className="flex-1 space-y-3">
        <div>
          <p className="text-sm font-semibold font-anek">Confirmar exclusão?</p>
          <p className="text-xs text-muted-foreground mt-1 font-roboto">
            Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            size="sm"
            className="bg-error text-error-foreground hover:bg-error/90"
            onClick={() => {
              setOpen(false);
              toast({ title: "Item excluído", description: "Lorem ipsum removido com sucesso." });
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
      htmlCode={`<div style="position:relative; display:inline-block;">
  <button id="trigger" onclick="document.getElementById('pop').style.display='block'"
    style="padding:8px 16px; border:1px solid #e5e7eb; border-radius:12px; background:#fff; font-family:'Sora'; font-weight:700; text-transform:uppercase; font-size:13px;">
    🗑 Excluir item
  </button>
  <div id="pop" style="display:none; position:absolute; top:calc(100% + 8px); left:0; width:288px; padding:16px; background:#fff; border:1px solid #e5e7eb; border-radius:12px; box-shadow:0 10px 24px rgba(0,0,0,.1); z-index:10;">
    <div style="display:flex; gap:12px;">
      <span style="color:#f59e0b; font-size:18px;">⚠</span>
      <div style="flex:1;">
        <p style="font-family:'Anek Latin'; font-weight:600; font-size:14px; margin:0;">Confirmar exclusão?</p>
        <p style="font-size:12px; color:#6b7280; margin:4px 0 12px;">Esta ação não pode ser desfeita.</p>
        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button onclick="document.getElementById('pop').style.display='none'"
            style="padding:6px 12px; background:transparent; border:none; cursor:pointer; font-family:'Sora'; font-weight:700; text-transform:uppercase; font-size:12px;">Cancelar</button>
          <button onclick="alert('Excluído!'); document.getElementById('pop').style.display='none'"
            style="padding:6px 12px; background:#ef4444; color:#fff; border:none; border-radius:8px; cursor:pointer; font-family:'Sora'; font-weight:700; text-transform:uppercase; font-size:12px;">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</div>`}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive dark:hover:bg-destructive dark:hover:text-destructive-foreground dark:hover:border-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Excluir item
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-72", isDark && "dark")} align="start">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm font-semibold font-anek">Confirmar exclusão?</p>
                <p className="text-xs text-muted-foreground mt-1 font-roboto">
                  Esta ação não pode ser desfeita.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  className="bg-error text-error-foreground hover:bg-error/90"
                  onClick={() => {
                    setOpen(false);
                    toast({
                      title: "Item excluído",
                      description: "Lorem ipsum removido com sucesso.",
                      className: isDark ? "dark bg-background text-foreground border-border" : undefined,
                    });
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentShowcase>
  );
}
