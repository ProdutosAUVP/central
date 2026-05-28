import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface SegmentedProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}

export function Segmented<T extends string>({ options, value, onChange, size = "md" }: SegmentedProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex bg-muted rounded-lg p-1 gap-1",
        size === "sm" ? "text-xs" : "text-sm"
      )}
    >
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "px-3 py-1.5 rounded-md font-anek font-semibold transition-all",
            value === o.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SegmentedWidget() {
  const [v, setV] = useState<"day" | "week" | "month" | "year">("week");

  return (
    <ComponentShowcase
      title="Segmented (toggle compacto)"
      description="Seletor de opções estilo segmented control. Alternativa compacta a Tabs ou Radio Group para alternar entre poucas opções (ex: períodos, modos de visualização, filtros rápidos)."
      code={`const [v, setV] = useState('week');

<Segmented
  value={v}
  onChange={setV}
  options={[
    { label: 'Dia', value: 'day' },
    { label: 'Semana', value: 'week' },
    { label: 'Mês', value: 'month' },
    { label: 'Ano', value: 'year' },
  ]}
/>`}
      htmlCode={`<div class="segmented" id="seg">
  <button data-v="day">Dia</button>
  <button data-v="week" class="active">Semana</button>
  <button data-v="month">Mês</button>
  <button data-v="year">Ano</button>
</div>

<style>
  .segmented {
    display:inline-flex; gap:4px; padding:4px;
    background:hsl(var(--muted, 120 10% 95%));
    border-radius:8px;
  }
  .segmented button {
    padding:6px 12px; border:none; background:transparent; border-radius:6px;
    font-family:'Anek Latin', sans-serif; font-weight:600; font-size:14px;
    color:hsl(var(--muted-foreground, 110 10% 40%));
    cursor:pointer; transition:.2s;
  }
  .segmented button.active {
    background:hsl(var(--background, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    box-shadow:0 1px 2px rgba(0,0,0,.05);
  }
</style>

<script>
  document.querySelectorAll('#seg button').forEach(b => b.onclick = () => {
    document.querySelectorAll('#seg button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
</script>`}
    >
      <Segmented<"day" | "week" | "month" | "year">
        value={v}
        onChange={setV}
        options={[
          { label: "Dia", value: "day" },
          { label: "Semana", value: "week" },
          { label: "Mês", value: "month" },
          { label: "Ano", value: "year" },
        ]}
      />
    </ComponentShowcase>
  );
}

export function SwitchSimplesWidget() {
  const [checked, setChecked] = useState(true);

  return (
    <ComponentShowcase
      title="Switch (ligado/desligado)"
      description="Toggle simples estilo switch para alternar entre estados binários (on/off, ativo/inativo)."
      code={`const [checked, setChecked] = useState(true);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
/>`}
      htmlCode={`<label class="switch">
  <input type="checkbox" checked />
  <span class="slider"></span>
</label>

<style>
  .switch { position:relative; display:inline-block; width:44px; height:24px; }
  .switch input { opacity:0; width:0; height:0; }
  .slider {
    position:absolute; cursor:pointer; inset:0;
    background:hsl(var(--muted, 120 10% 88%));
    border-radius:9999px; transition:.3s;
  }
  .slider:before {
    position:absolute; content:""; height:20px; width:20px; left:2px; bottom:2px;
    background:hsl(var(--background, 0 0% 100%));
    border-radius:50%; transition:.3s; box-shadow:0 1px 3px rgba(0,0,0,.15);
  }
  .switch input:checked + .slider { background:hsl(var(--primary, 155 93% 11%)); }
  .switch input:checked + .slider:before { transform:translateX(20px); }
</style>`}
    >
      <Switch checked={checked} onCheckedChange={setChecked} />
    </ComponentShowcase>
  );
}

export function SwitchDisabledWidget() {
  const [disabled, setDisabled] = useState(true);

  return (
    <ComponentShowcase
      title="Switch com estado desabilitado"
      description="Switch cujo estado interativo pode ser alternado externamente via botão (controle de disponibilidade)."
      code={`const [disabled, setDisabled] = useState(true);

<div className="flex items-center gap-4">
  <Switch disabled={disabled} defaultChecked />
  <Button onClick={() => setDisabled(!disabled)}>
    Alternar disabled
  </Button>
</div>`}
      htmlCode={`<div style="display:flex; align-items:center; gap:16px;">
  <label class="switch">
    <input type="checkbox" id="sw-disabled" checked disabled />
    <span class="slider"></span>
  </label>
  <button id="sw-toggle" class="sw-btn">Alternar disabled</button>
</div>

<style>
  .switch { position:relative; display:inline-block; width:44px; height:24px; }
  .switch input { opacity:0; width:0; height:0; }
  .slider {
    position:absolute; cursor:pointer; inset:0;
    background:hsl(var(--muted, 120 10% 88%));
    border-radius:9999px; transition:.3s;
  }
  .slider:before {
    position:absolute; content:""; height:20px; width:20px; left:2px; bottom:2px;
    background:hsl(var(--background, 0 0% 100%));
    border-radius:50%; transition:.3s; box-shadow:0 1px 3px rgba(0,0,0,.15);
  }
  .switch input:checked + .slider { background:hsl(var(--primary, 155 93% 11%)); }
  .switch input:checked + .slider:before { transform:translateX(20px); }
  .switch input:disabled + .slider { opacity:.5; cursor:not-allowed; }
  .sw-btn {
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    padding:8px 16px; border-radius:8px; border:none;
    font-family:'Sora', sans-serif; font-weight:700; text-transform:uppercase; font-size:12px;
    cursor:pointer;
  }
</style>

<script>
  const swInput = document.getElementById('sw-disabled');
  document.getElementById('sw-toggle').onclick = () => { swInput.disabled = !swInput.disabled; };
</script>`}
    >
      <div className="flex items-center gap-4">
        <Switch disabled={disabled} defaultChecked />
        <Button onClick={() => setDisabled((d) => !d)}>
          Alternar disabled
        </Button>
      </div>
    </ComponentShowcase>
  );
}
