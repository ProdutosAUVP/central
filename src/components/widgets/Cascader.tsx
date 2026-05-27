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
      code={`const [path, setPath] = useState<Node[]>([]);
const columns = [DATA];
for (const n of path) if (n.children?.length) columns.push(n.children);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">{path.map(n => n.label).join(' / ') || 'Selecionar'}</Button>
  </PopoverTrigger>
  <PopoverContent className="p-0 w-auto flex">
    {columns.map((col, depth) => (
      <div key={depth} className="flex flex-col w-44">
        {col.map(n => (
          <button key={n.key} onClick={() => select(n, depth)}
            className={path[depth]?.key === n.key ? 'bg-accent/10 text-accent' : ''}>
            {n.label}
          </button>
        ))}
      </div>
    ))}
  </PopoverContent>
</Popover>`}
      htmlCode={`<div style="position:relative;"><button onclick="toggleCsc()">Selecionar local</button></div>`}
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
