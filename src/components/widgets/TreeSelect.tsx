import React, { useRef, useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { useIsDark } from "@/hooks/use-is-dark";

interface TreeNode {
  key: string;
  label: string;
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    key: "rv",
    label: "Renda Variável",
    children: [
      { key: "acoes", label: "Ações", children: [
        { key: "acoes-br", label: "Brasil" },
        { key: "acoes-us", label: "EUA" },
      ]},
      { key: "fiis", label: "FIIs" },
      { key: "etfs", label: "ETFs" },
    ],
  },
  {
    key: "rf",
    label: "Renda Fixa",
    children: [
      { key: "tesouro", label: "Tesouro Direto" },
      { key: "cdb", label: "CDB / LCI / LCA" },
      { key: "deb", label: "Debêntures" },
    ],
  },
  {
    key: "alt",
    label: "Alternativos",
    children: [
      { key: "cripto", label: "Criptoativos" },
      { key: "ouro", label: "Ouro" },
    ],
  },
];

function findPath(nodes: TreeNode[], key: string, path: string[] = []): string[] | null {
  for (const n of nodes) {
    const next = [...path, n.label];
    if (n.key === key) return next;
    if (n.children) {
      const r = findPath(n.children, key, next);
      if (r) return r;
    }
  }
  return null;
}

function TreeNodes({
  nodes,
  expanded,
  onToggleExpand,
  selectedKey,
  onSelect,
  depth = 0,
}: {
  nodes: TreeNode[];
  expanded: Set<string>;
  onToggleExpand: (k: string) => void;
  selectedKey: string | null;
  onSelect: (k: string) => void;
  depth?: number;
}) {
  return (
    <ul>
      {nodes.map((node) => {
        const isOpen = expanded.has(node.key);
        const hasChildren = !!node.children?.length;
        const isSelected = selectedKey === node.key;
        return (
          <li key={node.key}>
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-muted/60 transition-colors",
                isSelected && "bg-accent/10 text-accent font-semibold"
              )}
              style={{ paddingLeft: `${depth * 14 + 8}px` }}
              onClick={() => onSelect(node.key)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasChildren) onToggleExpand(node.key);
                }}
                className={cn(
                  "h-4 w-4 flex items-center justify-center text-muted-foreground shrink-0",
                  !hasChildren && "invisible"
                )}
              >
                {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
              <span className="flex-1 truncate font-roboto">{node.label}</span>
              {isSelected && <Check className="h-3.5 w-3.5 text-accent" />}
            </div>
            {hasChildren && isOpen && (
              <TreeNodes
                nodes={node.children!}
                expanded={expanded}
                onToggleExpand={onToggleExpand}
                selectedKey={selectedKey}
                onSelect={onSelect}
                depth={depth + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function TreeSelectWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["rv", "rf"]));
  const [selectedKey, setSelectedKey] = useState<string | null>("acoes-br");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = useIsDark(triggerRef);

  const path = selectedKey ? findPath(TREE, selectedKey) : null;
  const display = path ? path.join(" / ") : "Selecionar categoria";

  const toggleExpand = (k: string) => {
    const next = new Set(expanded);
    next.has(k) ? next.delete(k) : next.add(k);
    setExpanded(next);
  };

  return (
    <ComponentShowcase
      title="TreeSelect (seleção hierárquica)"
      description="Select com nodes expansíveis em popover, exibindo o caminho completo da seleção."
      code={`// TreeSelect component code`}
      htmlCode={`<!-- TreeSelect HTML -->`}
    >
      <div className="w-full max-w-md">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button ref={triggerRef} variant="outline" className="w-full justify-between font-roboto normal-case">
              <span className="truncate text-sm">{display}</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-[--radix-popover-trigger-width] p-2", isDark && "dark")} align="start">
            <TreeNodes
              nodes={TREE}
              expanded={expanded}
              onToggleExpand={toggleExpand}
              selectedKey={selectedKey}
              onSelect={(k) => {
                setSelectedKey(k);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Selecionado: {selectedKey ?? "—"}
        </p>
      </div>
    </ComponentShowcase>
  );
}
