import React, { useState } from "react";
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";

interface Node {
  key: string;
  label: string;
  children?: Node[];
}

const DATA: Node[] = [
  {
    key: "capital", label: "AUVP Capital", children: [
      { key: "marca", label: "Marca", children: [
        { key: "logo", label: "logo.svg" },
        { key: "manual", label: "manual.pdf" },
      ]},
      { key: "site", label: "Sites", children: [
        { key: "home", label: "home.tsx" },
        { key: "lps", label: "Landing Pages", children: [
          { key: "lp1", label: "renda-fixa.tsx" },
          { key: "lp2", label: "fundos.tsx" },
        ]},
      ]},
    ],
  },
  {
    key: "escola", label: "AUVP Escola", children: [
      { key: "cursos", label: "Cursos", children: [
        { key: "fundamentos", label: "Fundamentos.mp4" },
      ]},
    ],
  },
];

function TreeNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!node.children?.length;

  return (
    <li>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-sm font-roboto text-left hover:bg-muted/60 transition-colors",
          !hasChildren && "cursor-default"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          <ChevronRight className={cn("h-3.5 w-3.5 opacity-60 transition-transform shrink-0", open && "rotate-90")} />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {hasChildren ? (
          open ? <FolderOpen className="h-4 w-4 text-accent shrink-0" /> : <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && open && (
        <ul>
          {node.children!.map((c) => (
            <TreeNode key={c.key} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TreeWidget() {
  return (
    <ComponentShowcase
      title="Tree (árvore de arquivos)"
      description="Estrutura hierárquica expansível com ícones de pasta/arquivo. Ideal para explorar arquivos, taxonomias e organogramas."
      code={`function TreeNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!node.children?.length;
  // ...
}`}
      htmlCode={`<!-- Tree HTML -->`}
    >
      <div className="w-full max-w-md border rounded-lg p-3 bg-card">
        <ul>
          {DATA.map((n) => <TreeNode key={n.key} node={n} />)}
        </ul>
      </div>
    </ComponentShowcase>
  );
}
