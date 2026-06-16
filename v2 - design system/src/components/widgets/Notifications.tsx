import React, { useState, useCallback, useRef, useEffect } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

type NotifType = "success" | "info" | "warning" | "error";

interface NotifItem {
  id: number;
  type: NotifType;
  title: string;
  description?: string;
}

const META: Record<NotifType, { icon: React.ElementType; color: string; ring: string }> = {
  success: { icon: CheckCircle2, color: "text-success", ring: "ring-success/30" },
  info: { icon: Info, color: "text-info", ring: "ring-info/30" },
  warning: { icon: AlertTriangle, color: "text-warning", ring: "ring-warning/30" },
  error: { icon: XCircle, color: "text-error", ring: "ring-error/30" },
};

function NotificationCard({ item, onClose }: { item: NotifItem; onClose: () => void }) {
  const m = META[item.type];
  const Icon = m.icon;
  return (
    <div
      className={cn(
        "pointer-events-auto w-80 rounded-2xl border bg-card text-card-foreground shadow-lg ring-1",
        m.ring,
        "p-4 flex gap-3 animate-in slide-in-from-right fade-in duration-300"
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", m.color)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold font-anek leading-tight">{item.title}</p>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 font-roboto">{item.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Notifications() {
  const [items, setItems] = useState<NotifItem[]>([]);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [isDark, setIsDark] = useState(false);

  // Detecta se algum ancestral (ComponentShowcase) tem .dark, sincronizando com o toggle local
  useEffect(() => {
    const node = anchorRef.current;
    if (!node) return;
    const detect = () => {
      let el: HTMLElement | null = node;
      while (el) {
        if (el.classList?.contains("dark")) return setIsDark(true);
        el = el.parentElement;
      }
      setIsDark(false);
    };
    detect();
    const observer = new MutationObserver(detect);
    let el: HTMLElement | null = node;
    while (el) {
      observer.observe(el, { attributes: true, attributeFilter: ["class"] });
      el = el.parentElement;
    }
    return () => observer.disconnect();
  }, []);

  const push = useCallback((type: NotifType) => {
    const id = Date.now() + Math.random();
    const samples: Record<NotifType, { title: string; description: string }> = {
      success: { title: "Operação concluída", description: "Sua ação foi processada com sucesso." },
      info: { title: "Nova atualização", description: "Há novidades disponíveis na sua conta." },
      warning: { title: "Atenção necessária", description: "Verifique os dados antes de prosseguir." },
      error: { title: "Algo deu errado", description: "Não foi possível concluir a operação." },
    };
    setItems((prev) => [...prev, { id, type, ...samples[type] }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 5000);
  }, []);

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="space-y-6">
      <ComponentShowcase
        title="Notificações empilháveis"
        description="Diferente do Toast: persistem em pilha no canto, com tipo semântico (success/info/warning/error), título, descrição e fechar manual. Ideais para fluxos longos (uploads, salvamentos, alertas de sistema)."
        code={`type NotifType = "success" | "info" | "warning" | "error";

interface NotifItem { id: number; type: NotifType; title: string; description?: string }

const META = {
  success: { icon: CheckCircle2, color: "text-success", ring: "ring-success/30" },
  info:    { icon: Info,          color: "text-info",    ring: "ring-info/30" },
  warning: { icon: AlertTriangle, color: "text-warning", ring: "ring-warning/30" },
  error:   { icon: XCircle,       color: "text-error",   ring: "ring-error/30" },
};

function NotificationCard({ item, onClose }) {
  const m = META[item.type];
  const Icon = m.icon;
  return (
    <div className={cn(
      "pointer-events-auto w-80 rounded-2xl border bg-card text-card-foreground shadow-lg ring-1",
      m.ring,
      "p-4 flex gap-3 animate-in slide-in-from-right fade-in duration-300"
    )}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", m.color)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold font-anek leading-tight">{item.title}</p>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 font-roboto">{item.description}</p>
        )}
      </div>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" aria-label="Fechar">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

const [items, setItems] = useState<NotifItem[]>([]);

const push = useCallback((type: NotifType) => {
  const id = Date.now() + Math.random();
  const samples = {
    success: { title: "Operação concluída", description: "Sua ação foi processada com sucesso." },
    info:    { title: "Nova atualização",   description: "Há novidades disponíveis na sua conta." },
    warning: { title: "Atenção necessária", description: "Verifique os dados antes de prosseguir." },
    error:   { title: "Algo deu errado",    description: "Não foi possível concluir a operação." },
  };
  setItems((prev) => [...prev, { id, type, ...samples[type] }]);
  setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 5000);
}, []);

const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

<>
  <Button onClick={() => push("success")} className="bg-success hover:bg-success/90 text-success-foreground">Success</Button>
  <Button onClick={() => push("info")}    className="bg-info hover:bg-info/90 text-info-foreground">Info</Button>
  <Button onClick={() => push("warning")} className="bg-warning hover:bg-warning/90 text-warning-foreground">Warning</Button>
  <Button onClick={() => push("error")}   className="bg-error hover:bg-error/90 text-error-foreground">Error</Button>

  <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    {items.map((i) => <NotificationCard key={i.id} item={i} onClose={() => remove(i.id)} />)}
  </div>
</>`}
        htmlCode={`<!-- Pilha de notificações -->
<div id="notif-stack" style="position:fixed; top:80px; right:24px; z-index:100; display:flex; flex-direction:column; gap:12px;"></div>

<button onclick="pushNotif('success','Operação concluída','Sua ação foi processada.')">Success</button>

<style>
  .notif { width:320px; padding:16px; border-radius:16px; background:#fff; border:1px solid #e5e7eb; box-shadow:0 8px 20px rgba(0,0,0,.08); display:flex; gap:12px; font-family:'Roboto',sans-serif; animation: slideIn .3s ease-out; }
  .notif--success { box-shadow:0 0 0 1px rgba(34,197,94,.3), 0 8px 20px rgba(0,0,0,.08); }
  .notif--info    { box-shadow:0 0 0 1px rgba(59,130,246,.3), 0 8px 20px rgba(0,0,0,.08); }
  .notif--warning { box-shadow:0 0 0 1px rgba(245,158,11,.3), 0 8px 20px rgba(0,0,0,.08); }
  .notif--error   { box-shadow:0 0 0 1px rgba(239,68,68,.3),  0 8px 20px rgba(0,0,0,.08); }
  .notif__title { font-family:'Anek Latin',sans-serif; font-weight:600; font-size:14px; }
  .notif__desc  { font-size:12px; color:#6b7280; margin-top:4px; }
  .notif__close { background:none; border:none; cursor:pointer; color:#9ca3af; }
  @keyframes slideIn { from { transform: translateX(20px); opacity:0; } to { transform: translateX(0); opacity:1; } }
</style>

<script>
  const ICONS = { success:'✓', info:'ℹ', warning:'⚠', error:'✕' };
  function pushNotif(type, title, desc) {
    const stack = document.getElementById('notif-stack');
    const el = document.createElement('div');
    el.className = 'notif notif--' + type;
    el.innerHTML = \`<span style="font-size:20px;">\${ICONS[type]}</span>
      <div style="flex:1;"><div class="notif__title">\${title}</div><div class="notif__desc">\${desc}</div></div>
      <button class="notif__close" onclick="this.parentElement.remove()">×</button>\`;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
</script>`}
      >
        {/* Sentinela invisível para detectar a classe .dark do toggle do ComponentShowcase */}
        <span ref={anchorRef} aria-hidden="true" className="sr-only" />
        <Button onClick={() => push("success")} className="bg-success hover:bg-success/90 text-success-foreground">
          Success
        </Button>
        <Button onClick={() => push("info")} className="bg-info hover:bg-info/90 text-info-foreground">
          Info
        </Button>
        <Button onClick={() => push("warning")} className="bg-warning hover:bg-warning/90 text-warning-foreground">
          Warning
        </Button>
        <Button onClick={() => push("error")} className="bg-error hover:bg-error/90 text-error-foreground">
          Error
        </Button>
      </ComponentShowcase>

      <div className={cn(isDark && "dark")}>
        <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3 pointer-events-none bg-transparent">
          {items.map((i) => (
            <NotificationCard key={i.id} item={i} onClose={() => remove(i.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
