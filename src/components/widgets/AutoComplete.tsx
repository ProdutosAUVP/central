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
      code={`const SUGGESTIONS = [
  "Petrobras (PETR4)", "Vale (VALE3)", "Itaú Unibanco (ITUB4)", "Banco do Brasil (BBAS3)",
  "Ambev (ABEV3)", "Magazine Luiza (MGLU3)", "WEG (WEGE3)", "Bradesco (BBDC4)",
  "Localiza (RENT3)", "Eletrobras (ELET3)", "JBS (JBSS3)", "Suzano (SUZB3)",
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

const [value, setValue] = useState("");
const [open, setOpen] = useState(false);
const [active, setActive] = useState(0);

const filtered = useMemo(() => {
  if (!value.trim()) return [];
  return SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 6);
}, [value]);

const select = (s: string) => { setValue(s); setOpen(false); setActive(0); };

const onKey = (e: React.KeyboardEvent) => {
  if (!filtered.length) return;
  if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % filtered.length); }
  else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + filtered.length) % filtered.length); }
  else if (e.key === "Enter") { e.preventDefault(); select(filtered[active]); }
  else if (e.key === "Escape") setOpen(false);
};

<div className="w-full max-w-md">
  <Popover open={open && filtered.length > 0} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          placeholder="Busque um ativo..."
          onChange={(e) => { setValue(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          className="pl-9"
        />
      </div>
    </PopoverTrigger>
    <PopoverContent
      className="w-[--radix-popover-trigger-width] p-1"
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
  <p className="text-xs text-muted-foreground mt-2 font-mono">Selecionado: {value || "—"}</p>
</div>`}
      htmlCode={`<style>
  .ac-wrap { position:relative; max-width:400px; font-family:'Roboto', sans-serif; }
  .ac-input {
    width:100%; padding:10px 14px 10px 36px;
    border:1px solid hsl(var(--input, 120 10% 88%));
    border-radius:8px; font-size:14px;
    background:hsl(var(--background, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    outline:none;
  }
  .ac-input:focus { border-color:hsl(var(--ring, 155 93% 11%)); box-shadow:0 0 0 2px hsl(var(--ring, 155 93% 11%) / 0.2); }
  .ac-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:hsl(var(--muted-foreground, 110 10% 40%)); width:16px; height:16px; }
  .ac-list {
    display:none; position:absolute; top:calc(100% + 4px); left:0; right:0;
    background:hsl(var(--popover, 0 0% 100%));
    border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:8px; box-shadow:0 8px 16px rgba(0,0,0,.08);
    list-style:none; margin:0; padding:4px; max-height:240px; overflow:auto; z-index:10;
  }
  .ac-list li button {
    width:100%; text-align:left; padding:8px 12px; border-radius:6px;
    cursor:pointer; font-family:'Roboto'; font-size:14px;
    background:transparent; border:none; color:hsl(var(--foreground, 110 78% 9%));
    transition:.15s;
  }
  .ac-list li button:hover, .ac-list li button.active {
    background:hsl(var(--accent, 155 93% 11%) / 0.1);
    color:hsl(var(--accent, 155 93% 11%));
  }
  .ac-list mark { background:hsl(var(--warning, 38 92% 50%) / 0.3); color:inherit; border-radius:2px; padding:0 2px; }
  .ac-selected { font-size:12px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin-top:8px; font-family:monospace; }
</style>

<div class="ac-wrap">
  <svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  <input id="ac-input" class="ac-input" type="text" placeholder="Busque um ativo..." oninput="acFilter(this.value)" onkeydown="acNav(event)" />
  <ul id="ac-list" class="ac-list"></ul>
</div>
<p class="ac-selected">Selecionado: <span id="ac-sel">—</span></p>

<script>
  const SUGGESTIONS = [
    'Petrobras (PETR4)','Vale (VALE3)','Itaú Unibanco (ITUB4)','Banco do Brasil (BBAS3)',
    'Ambev (ABEV3)','Magazine Luiza (MGLU3)','WEG (WEGE3)','Bradesco (BBDC4)',
    'Localiza (RENT3)','Eletrobras (ELET3)','JBS (JBSS3)','Suzano (SUZB3)'
  ];
  let acActive = 0, acCurrent = [], acQuery = '';
  function acFilter(q) {
    acQuery = q; acActive = 0;
    const list = document.getElementById('ac-list');
    if (!q.trim()) { list.style.display = 'none'; acCurrent = []; return; }
    acCurrent = SUGGESTIONS.filter(s => s.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
    acRender();
  }
  function acRender() {
    const list = document.getElementById('ac-list');
    list.style.display = acCurrent.length ? 'block' : 'none';
    list.innerHTML = '';
    acCurrent.forEach((s, i) => {
      const li = document.createElement('li');
      const btn = document.createElement('button'); btn.type = 'button';
      const idx = s.toLowerCase().indexOf(acQuery.toLowerCase());
      btn.innerHTML = idx >= 0
        ? s.slice(0, idx) + '<mark>' + s.slice(idx, idx + acQuery.length) + '</mark>' + s.slice(idx + acQuery.length)
        : s;
      if (i === acActive) btn.classList.add('active');
      btn.onmouseenter = () => { acActive = i; acRender(); };
      btn.onclick = () => acSelect(s);
      li.appendChild(btn); list.appendChild(li);
    });
  }
  function acSelect(s) {
    document.getElementById('ac-input').value = s;
    document.getElementById('ac-sel').textContent = s;
    document.getElementById('ac-list').style.display = 'none';
  }
  function acNav(e) {
    if (!acCurrent.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); acActive = (acActive + 1) % acCurrent.length; acRender(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); acActive = (acActive - 1 + acCurrent.length) % acCurrent.length; acRender(); }
    else if (e.key === 'Enter') { e.preventDefault(); acSelect(acCurrent[acActive]); }
    else if (e.key === 'Escape') { document.getElementById('ac-list').style.display = 'none'; }
  }
</script>`}
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
