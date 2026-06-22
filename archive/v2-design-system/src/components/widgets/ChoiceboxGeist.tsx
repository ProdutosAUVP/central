import React, { useState } from "react";
import { Check, Minus } from "lucide-react";

type Item = {
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
};

function Indicator({
  type,
  selected,
  disabled,
}: {
  type: "radio" | "checkbox";
  selected: boolean;
  disabled?: boolean;
}) {
  if (type === "radio") {
    return (
      <span
        className={`relative inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-full border transition-colors ${
          selected
            ? "border-primary bg-primary"
            : "border-input bg-background"
        } ${disabled ? "opacity-50" : ""}`}
      >
        {selected && (
          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
        )}
      </span>
    );
  }
  return (
    <span
      style={{ borderRadius: 4 }}
      className={`relative inline-flex items-center justify-center h-4 w-4 shrink-0 border transition-colors ${
        selected
          ? "bg-primary border-primary text-primary-foreground"
          : "bg-background border-input"
      } ${disabled ? "opacity-50" : ""}`}
    >
      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
    </span>
  );
}

function ChoiceboxGroup({
  label,
  showLabel,
  type,
  direction = "row",
  disabled,
  items,
  value,
  onChange,
}: {
  label: string;
  showLabel?: boolean;
  type: "radio" | "checkbox";
  direction?: "row" | "column";
  disabled?: boolean;
  items: Item[];
  value: string | string[];
  onChange: (v: any) => void;
}) {
  const isSelected = (v: string) =>
    Array.isArray(value) ? value.includes(v) : value === v;

  const toggle = (v: string) => {
    if (type === "radio") {
      onChange(v);
    } else {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    }
  };

  return (
    <div className="font-roboto">
      {showLabel && (
        <div className="text-xs text-muted-foreground mb-2">{label}</div>
      )}
      <div
        className={`flex gap-3 ${
          direction === "column" ? "flex-col" : "flex-row flex-wrap"
        }`}
        role={type === "radio" ? "radiogroup" : "group"}
        aria-label={label}
      >
        {items.map((item) => {
          const itemDisabled = disabled || item.disabled;
          const selected = isSelected(item.value);
          return (
            <button
              key={item.value}
              type="button"
              role={type === "radio" ? "radio" : "checkbox"}
              aria-checked={selected}
              disabled={itemDisabled}
              onClick={() => !itemDisabled && toggle(item.value)}
              className={`flex items-start gap-3 text-left p-3 border transition-all min-w-[200px] flex-1 ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-foreground/30"
              } ${
                itemDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              style={{ borderRadius: 12 }}
            >
              <span className="mt-0.5">
                <Indicator
                  type={type}
                  selected={selected}
                  disabled={itemDisabled}
                />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const PLAN_ITEMS: Item[] = [
  { value: "trial", title: "Pro Trial", description: "Grátis por duas semanas" },
  { value: "pro", title: "Pro", description: "Comece agora" },
];

export function ChoiceboxRadio() {
  const [value, setValue] = useState("trial");
  return (
    <ChoiceboxGroup
      label="Selecione um plano"
      type="radio"
      direction="row"
      items={PLAN_ITEMS}
      value={value}
      onChange={setValue}
    />
  );
}

export function ChoiceboxCheckbox() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ChoiceboxGroup
      label="Selecione um plano"
      type="checkbox"
      direction="row"
      items={PLAN_ITEMS}
      value={value}
      onChange={setValue}
    />
  );
}

export function ChoiceboxDisabled() {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-stretch justify-start gap-6 flex-initial">
      <ChoiceboxGroup
        label="Grupo desabilitado"
        showLabel
        type="radio"
        direction="row"
        disabled
        items={PLAN_ITEMS}
        value={value}
        onChange={setValue}
      />
      <ChoiceboxGroup
        label="Item individual desabilitado"
        showLabel
        type="checkbox"
        direction="row"
        items={[
          { ...PLAN_ITEMS[0], disabled: true },
          PLAN_ITEMS[1],
        ]}
        value={value2}
        onChange={setValue2}
      />
    </div>
  );
}
