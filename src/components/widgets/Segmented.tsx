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
      htmlCode={`<div class="segmented" id="seg">...</div>`}
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
      htmlCode={`<label class="switch"><input type="checkbox" checked /><span class="slider"></span></label>`}
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
      htmlCode={`<input type="checkbox" id="sw-disabled" checked disabled />`}
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
