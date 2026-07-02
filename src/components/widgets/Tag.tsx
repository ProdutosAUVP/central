import React from "react";
import { cn } from "@/lib/utils";

/**
 * Tag — badge tokenizado do Design System AUVP.
 *
 * Substitui classes Tailwind hardcoded (bg-emerald-100, text-blue-800…)
 * pelos tokens de dataviz (--chart-*) e semânticos (--success, --info…),
 * que já se adaptam a light/dark e às marcas Capital/Escola. Assim as
 * tags não dependem da camada defensiva de overrides do dark mode.
 */

export type TagTone =
  | "green"
  | "violet"
  | "amber"
  | "blue"
  | "magenta"
  | "brick"
  | "olive"
  | "graphite"
  | "success"
  | "warning"
  | "info"
  | "error"
  | "neutral"
  | "primary";

export const tagToneClasses: Record<TagTone, string> = {
  green:    "bg-[hsl(var(--chart-1)/0.14)] text-[hsl(var(--chart-1))]",
  violet:   "bg-[hsl(var(--chart-2)/0.14)] text-[hsl(var(--chart-2))]",
  amber:    "bg-[hsl(var(--chart-3)/0.16)] text-[hsl(var(--chart-3))]",
  blue:     "bg-[hsl(var(--chart-4)/0.14)] text-[hsl(var(--chart-4))]",
  magenta:  "bg-[hsl(var(--chart-5)/0.14)] text-[hsl(var(--chart-5))]",
  brick:    "bg-[hsl(var(--chart-6)/0.14)] text-[hsl(var(--chart-6))]",
  olive:    "bg-[hsl(var(--chart-7)/0.16)] text-[hsl(var(--chart-7))]",
  graphite: "bg-[hsl(var(--chart-8)/0.14)] text-[hsl(var(--chart-8))]",
  success:  "bg-[hsl(var(--success)/0.14)] text-[hsl(var(--success))]",
  warning:  "bg-[hsl(var(--warning)/0.16)] text-[hsl(var(--warning))]",
  info:     "bg-[hsl(var(--info)/0.14)] text-[hsl(var(--info))]",
  error:    "bg-[hsl(var(--error)/0.14)] text-[hsl(var(--error))]",
  neutral:  "bg-muted text-muted-foreground",
  primary:  "bg-primary/10 text-primary",
};

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
}

export function Tag({ tone = "neutral", className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-roboto",
        tagToneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
