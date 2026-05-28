import React, { useMemo, useState } from "react";
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

interface Item {
  key: string;
  label: string;
}

const SOURCE: Item[] = Array.from({ length: 10 }, (_, i) => ({
  key: `item-${i + 1}`,
  label: `Lorem ipsum ${i + 1}`,
}));

function Panel({
  title,
  items,
  selected,
  onToggle,
  onToggleAll,
  query,
  setQuery,
}: {
  title: string;
  items: Item[];
  selected: Set<string>;
  onToggle: (k: string) => void;
  onToggleAll: (checked: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
}) {
  const filtered = useMemo(
    () => items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );
  const allChecked = filtered.length > 0 && filtered.every((i) => selected.has(i.key));
  const someChecked = filtered.some((i) => selected.has(i.key));
  const checkedCount = items.filter((i) => selected.has(i.key)).length;

  return (
    <div className="flex-1 min-w-0 rounded-xl border bg-card overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/40">
        <Checkbox
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={(v) => onToggleAll(!!v)}
        />
        <span className="text-sm font-anek font-semibold flex-1 truncate">{title}</span>
        <span className="text-xs text-muted-foreground font-mono">
          {checkedCount}/{items.length}
        </span>
      </div>
      <div className="p-2 border-b">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className="h-8 text-sm"
        />
      </div>
      <ul className="flex-1 max-h-64 overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <li className="px-3 py-6 text-center text-xs text-muted-foreground">Nenhum item</li>
        ) : (
          filtered.map((item) => {
            const checked = selected.has(item.key);
            return (
              <li key={item.key}>
                <label
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors",
                    checked && "bg-primary/5"
                  )}
                >
                  <Checkbox checked={checked} onCheckedChange={() => onToggle(item.key)} />
                  <span className="text-sm font-roboto truncate">{item.label}</span>
                </label>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export function TransferWidget() {
  const [target, setTarget] = useState<Set<string>>(new Set(["item-2", "item-5"]));
  const [leftSel, setLeftSel] = useState<Set<string>>(new Set());
  const [rightSel, setRightSel] = useState<Set<string>>(new Set());
  const [leftQ, setLeftQ] = useState("");
  const [rightQ, setRightQ] = useState("");

  const leftItems = SOURCE.filter((i) => !target.has(i.key));
  const rightItems = SOURCE.filter((i) => target.has(i.key));

  const moveRight = () => {
    const next = new Set(target);
    leftSel.forEach((k) => next.add(k));
    setTarget(next);
    setLeftSel(new Set());
  };
  const moveLeft = () => {
    const next = new Set(target);
    rightSel.forEach((k) => next.delete(k));
    setTarget(next);
    setRightSel(new Set());
  };
  const moveAllRight = () => setTarget(new Set(SOURCE.map((i) => i.key)));
  const moveAllLeft = () => setTarget(new Set());

  const toggle = (set: Set<string>, setSet: (s: Set<string>) => void, k: string) => {
    const next = new Set(set);
    next.has(k) ? next.delete(k) : next.add(k);
    setSet(next);
  };

  return (
    <ComponentShowcase
      title="Transfer (transferência entre listas)"
      description="Mover itens entre listas 'disponíveis' e 'selecionados' com checkboxes, busca e ações em massa."
      code={`// Transfer component code`}
      htmlCode={`<!-- Transfer HTML -->`}
    >
      <div className="w-full flex flex-col md:flex-row gap-3 items-stretch">
        <Panel
          title="Disponíveis"
          items={leftItems}
          selected={leftSel}
          onToggle={(k) => toggle(leftSel, setLeftSel, k)}
          onToggleAll={(checked) => {
            const filtered = leftItems.filter((i) => i.label.toLowerCase().includes(leftQ.toLowerCase()));
            setLeftSel(checked ? new Set(filtered.map((i) => i.key)) : new Set());
          }}
          query={leftQ}
          setQuery={setLeftQ}
        />
        <div className="flex md:flex-col flex-row gap-2 self-center">
          <Button size="icon" variant="outline" onClick={moveAllRight} title="Mover todos">
            <ChevronsRight className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={moveRight} disabled={leftSel.size === 0} title="Mover selecionados">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={moveLeft} disabled={rightSel.size === 0} title="Remover selecionados">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={moveAllLeft} title="Remover todos">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </div>
        <Panel
          title="Selecionados"
          items={rightItems}
          selected={rightSel}
          onToggle={(k) => toggle(rightSel, setRightSel, k)}
          onToggleAll={(checked) => {
            const filtered = rightItems.filter((i) => i.label.toLowerCase().includes(rightQ.toLowerCase()));
            setRightSel(checked ? new Set(filtered.map((i) => i.key)) : new Set());
          }}
          query={rightQ}
          setQuery={setRightQ}
        />
      </div>
    </ComponentShowcase>
  );
}
