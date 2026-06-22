import React, { useState } from "react";
import { Check, Minus } from "lucide-react";

function GeistCheckbox({
  checked,
  disabled,
  indeterminate,
  onChange,
  children,
}: {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
  children: React.ReactNode;
}) {
  const isChecked = !!checked || !!indeterminate;
  return (
    <label
      className={`inline-flex items-center gap-2 font-roboto text-sm select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : !!checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.()}
        style={{ borderRadius: 4 }}
        className={`relative inline-flex items-center justify-center h-4 w-4 shrink-0 border transition-colors ${
          isChecked
            ? "bg-primary border-primary text-primary-foreground"
            : "bg-background border-input"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {indeterminate ? (
          <Minus className="h-3 w-3" strokeWidth={3} />
        ) : checked ? (
          <Check className="h-3 w-3" strokeWidth={3} />
        ) : null}
      </button>
      <span>{children}</span>
    </label>
  );
}

export function CheckboxDefault() {
  const [checked, setChecked] = useState(false);
  return (
    <GeistCheckbox checked={checked} onChange={() => setChecked((b) => !b)}>
      Option 1
    </GeistCheckbox>
  );
}

export function CheckboxDisabled() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-4 flex-initial">
      <GeistCheckbox disabled>Disabled</GeistCheckbox>
      <GeistCheckbox checked disabled>
        Disabled Checked
      </GeistCheckbox>
      <GeistCheckbox disabled indeterminate>
        Disabled Indeterminate
      </GeistCheckbox>
    </div>
  );
}
