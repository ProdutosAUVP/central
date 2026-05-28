import React, { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { useIsDark } from "@/hooks/use-is-dark";

const SUGGESTIONS = [
  "Petrobras (PETR4)",
  "Vale (VALE3)",
  "Itaú Unibanco (ITUB4)",
  "Banco do Brasil (BBAS3)",
  "Ambev (ABEV3)",
  "Magazine Luiza (MGLU3)",
  "WEG (WEGE3)",
  "Bradesco (BBDC4)",
  "Localiza (RENT3)",
  "Eletrobras (ELET3)",
  "JBS (JBSS3)",
  "Suzano (SUZB3)",
];

function highlight(text: string, query: string) {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-warning/30 text-foreground rounded px-0.5">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export function AutoCompleteWidget() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = useIsDark(inputRef);

  const filtered = useMemo(() => {
    if (!value.trim()) return [];
    return SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 6);
  }, [value]);

  const select = (s: string) => {
    setValue(s);
    setOpen(false);
    setActive(0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <ComponentShowcase
      title="AutoComplete (sugestões filtradas)"
      description="Input com sugestões em popover ancorado, navegação por teclado (↑ ↓ Enter Esc) e highlight do trecho buscado. Ideal para busca de ativos, tickers, cidades."
      code={`const [value, setValue] = useState("");
const [open, setOpen] = useState(false);
const [active, setActive] = useState(0);

const filtered = useMemo(() =>
  SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 6),
  [value]
);

<Popover open={open && filtered.length > 0} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input value={value} placeholder="Busque um ativo..."
        onChange={(e) => { setValue(e.target.value); setOpen(true); setActive(0); }}
        onKeyDown={onKey} className="pl-9" />
    </div>
  </PopoverTrigger>
  <PopoverContent className="w-[--radix-popover-trigger-width] p-1" align="start">
    <ul>
      {filtered.map((s, i) => (
        <li key={s}>
          <button onClick={() => select(s)}
            className={cn("w-full text-left px-3 py-2 rounded-md text-sm",
              active === i ? "bg-accent/10 text-accent" : "hover:bg-muted/60")}>
            {highlight(s, value)}
          </button>
        </li>
      ))}
    </ul>
  </PopoverContent>
</Popover>`}
      htmlCode={`<div class="ac-wrap"><input id="ac-input" class="ac-input" type="text" placeholder="Busque um ativo..." /><ul id="ac-list" class="ac-list"></ul></div>`}
    >
      <div className="w-full max-w-md">
        <Popover open={open && filtered.length > 0} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={value}
                placeholder="Busque um ativo..."
                onChange={(e) => {
                  setValue(e.target.value);
                  setOpen(true);
                  setActive(0);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKey}
                className="pl-9"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className={cn("w-[--radix-popover-trigger-width] p-1", isDark && "dark")}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <ul>
              {filtered.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(s)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm font-roboto transition-colors",
                      active === i ? "bg-accent/10 text-accent" : "hover:bg-muted/60"
                    )}
                  >
                    {highlight(s, value)}
                  </button>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Selecionado: {value || "—"}
        </p>
      </div>
    </ComponentShowcase>
  );
}
