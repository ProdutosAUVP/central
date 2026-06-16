import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

interface Node {
  key: string;
  label: string;
  children?: Node[];
}

const DATA: Node[] = [
  { key: "br", label: "Brasil", children: [
    { key: "sp", label: "São Paulo", children: [{ key: "spcap", label: "Capital" }, { key: "campinas", label: "Campinas" }] },
    { key: "rj", label: "Rio de Janeiro", children: [{ key: "rjcap", label: "Capital" }, { key: "niteroi", label: "Niterói" }] },
  ]},
  { key: "us", label: "EUA", children: [
    { key: "ny", label: "New York", children: [{ key: "manhattan", label: "Manhattan" }] },
    { key: "ca", label: "California", children: [{ key: "sf", label: "San Francisco" }] },
  ]},
];

export function CascaderWidget() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<Node[]>([]);
  const [isDark, setIsDark] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const check = () => setIsDark(!!el.closest(".dark"));
    check();
    const observer = new MutationObserver(check);
    let node: HTMLElement | null = el;
    while (node) {
      observer.observe(node, { attributes: true, attributeFilter: ["class"] });
      node = node.parentElement;
    }
    return () => observer.disconnect();
  }, []);

  const columns: Node[][] = [DATA];
  for (const n of path) {
    if (n.children?.length) columns.push(n.children);
  }

  const select = (n: Node, depth: number) => {
    const next = [...path.slice(0, depth), n];
    if (!n.children?.length) {
      setPath(next);
      setOpen(false);
    } else {
      setPath(next);
    }
  };

  const display = path.length ? path.map((n) => n.label).join(" / ") : "Selecionar local";

  return (
    <ComponentShowcase
      title="Cascader (drill-down em colunas)"
      description="Seletor que abre colunas em sequência (categoria → subcategoria → item). Diferente do TreeSelect, mantém cada nível visível lado a lado para comparar opções."
      code={`interface Node { key: string; label: string; children?: Node[] }

const DATA: Node[] = [
  { key: "br", label: "Brasil", children: [
    { key: "sp", label: "São Paulo", children: [
      { key: "spcap", label: "Capital" }, { key: "campinas", label: "Campinas" },
    ]},
    { key: "rj", label: "Rio de Janeiro", children: [
      { key: "rjcap", label: "Capital" }, { key: "niteroi", label: "Niterói" },
    ]},
  ]},
  { key: "us", label: "EUA", children: [
    { key: "ny", label: "New York", children: [{ key: "manhattan", label: "Manhattan" }] },
    { key: "ca", label: "California", children: [{ key: "sf", label: "San Francisco" }] },
  ]},
];

const [open, setOpen] = useState(false);
const [path, setPath] = useState<Node[]>([]);

const columns: Node[][] = [DATA];
for (const n of path) if (n.children?.length) columns.push(n.children);

const select = (n: Node, depth: number) => {
  const next = [...path.slice(0, depth), n];
  if (!n.children?.length) { setPath(next); setOpen(false); }
  else setPath(next);
};

const display = path.length ? path.map((n) => n.label).join(" / ") : "Selecionar local";

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-full justify-between font-roboto normal-case h-10">
      <span className="truncate text-sm">{display}</span>
      <ChevronDown className="h-4 w-4 opacity-60 shrink-0 ml-2" />
    </Button>
  </PopoverTrigger>
  <PopoverContent
    className="p-0 w-auto max-w-[min(95vw,640px)] overflow-hidden rounded-lg border shadow-lg"
    align="start"
    sideOffset={6}
  >
    <div className="flex divide-x divide-border bg-popover">
      {columns.map((col, depth) => {
        const headerLabel =
          depth === 0 ? "Nível 1" : path[depth - 1]?.label ?? \`Nível \${depth + 1}\`;
        return (
          <div key={depth} className="flex flex-col w-44 shrink-0">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/40 border-b">
              {headerLabel}
            </div>
            <ul className="max-h-[260px] overflow-y-auto py-1">
              {col.map((n) => {
                const isActive = path[depth]?.key === n.key;
                return (
                  <li key={n.key}>
                    <button
                      onClick={() => select(n, depth)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-roboto text-left transition-colors",
                        isActive
                          ? "bg-accent/10 text-accent font-semibold"
                          : "text-foreground hover:bg-muted/60"
                      )}
                    >
                      <span className="truncate">{n.label}</span>
                      {n.children?.length
                        ? <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
                        : <span className="w-3.5 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  </PopoverContent>
</Popover>`}
      htmlCode={`<div style="position:relative; max-width:400px;">
  <button id="csc-btn" onclick="document.getElementById('csc-pop').classList.toggle('open')"
    style="width:100%; display:flex; justify-content:space-between; padding:10px 14px; background:#fff; border:1px solid #e5e7eb; border-radius:8px; font-family:'Roboto'; cursor:pointer;">
    <span id="csc-label">Selecionar local</span><span>▾</span>
  </button>
  <div id="csc-pop" style="display:none; position:absolute; top:calc(100% + 4px); left:0; background:#fff; border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 8px 16px rgba(0,0,0,.08); z-index:10;">
    <div id="csc-cols" style="display:flex;"></div>
  </div>
</div>

<style>
  #csc-pop.open { display:block; }
  .csc-col { border-right:1px solid #e5e7eb; min-width:160px; max-height:240px; overflow:auto; }
  .csc-col:last-child { border-right:none; }
  .csc-item { display:flex; justify-content:space-between; padding:8px 12px; cursor:pointer; font-family:'Roboto'; font-size:14px; }
  .csc-item:hover, .csc-item.active { background:rgba(11,41,4,.08); color:hsl(var(--primary)); }
</style>

<script>
  const DATA = [{key:'br',label:'Brasil',children:[{key:'sp',label:'SP',children:[{key:'spcap',label:'Capital'}]}]},{key:'us',label:'EUA',children:[{key:'ny',label:'NY'}]}];
  let path = [];
  function render() {
    const cols = document.getElementById('csc-cols'); cols.innerHTML = '';
    let level = DATA, depth = 0;
    while (level) {
      const col = document.createElement('div'); col.className = 'csc-col';
      level.forEach(n => {
        const it = document.createElement('div'); it.className = 'csc-item' + (path[depth]?.key===n.key?' active':'');
        it.innerHTML = n.label + (n.children?' ›':'');
        it.onclick = () => { path = [...path.slice(0,depth), n]; if (!n.children) { document.getElementById('csc-label').textContent = path.map(p=>p.label).join(' / '); document.getElementById('csc-pop').classList.remove('open'); } render(); };
        col.appendChild(it);
      });
      cols.appendChild(col);
      level = path[depth]?.children; depth++;
    }
  }
  render();
</script>`}
    >
      <div className="w-full max-w-md">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button ref={triggerRef} variant="outline" className="w-full justify-between font-roboto normal-case h-10">
              <span className="truncate text-sm">{display}</span>
              <ChevronDown className="h-4 w-4 opacity-60 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn("p-0 w-auto max-w-[min(95vw,640px)] overflow-hidden rounded-lg border shadow-lg", isDark && "dark")}
            align="start"
            sideOffset={6}
          >
            <div className="flex divide-x divide-border bg-popover">
              {columns.map((col, depth) => {
                const headerLabel =
                  depth === 0 ? "Nível 1" : path[depth - 1]?.label ?? `Nível ${depth + 1}`;
                return (
                  <div key={depth} className="flex flex-col w-44 shrink-0">
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/40 border-b">
                      {headerLabel}
                    </div>
                    <ul className="max-h-[260px] overflow-y-auto py-1">
                      {col.map((n) => {
                        const isActive = path[depth]?.key === n.key;
                        return (
                          <li key={n.key}>
                            <button
                              onClick={() => select(n, depth)}
                              className={cn(
                                "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-roboto text-left transition-colors",
                                isActive
                                  ? "bg-accent/10 text-accent font-semibold"
                                  : "text-foreground hover:bg-muted/60"
                              )}
                            >
                              <span className="truncate">{n.label}</span>
                              {n.children?.length ? (
                                <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />
                              ) : (
                                <span className="w-3.5 shrink-0" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground mt-3 font-mono">
          Caminho: {path.length ? path.map((n) => n.key).join(" → ") : "—"}
        </p>
      </div>
    </ComponentShowcase>
  );
}
