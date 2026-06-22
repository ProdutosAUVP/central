import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown } from "lucide-react";

interface CodeTab {
  label: string;
  language: string;
  code: string;
}

interface CodeBlockProps {
  code?: string;
  language?: string;
  className?: string;
  tabs?: CodeTab[];
  /** Se true, encapsula o bloco no dropdown padrão "Ver código". Default: false (uso interno do ComponentShowcase). */
  collapsible?: boolean;
  /** Rótulo do dropdown quando `collapsible` é true. Default: "Ver código". */
  collapsibleLabel?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
  tabs,
  collapsible = false,
  collapsibleLabel = "Ver código",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);

  const activeCode = tabs ? tabs[activeTab].code : code;
  const activeLanguage = tabs ? tabs[activeTab].language : language;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inner = (
    <div className={cn("relative rounded-lg border bg-muted/50 overflow-hidden", !collapsible && className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/80">
        <div className="flex items-center gap-1">
          {tabs ? (
            tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors",
                  activeTab === i
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))
          ) : (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{activeLanguage}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-foreground/90">{activeCode}</code>
      </pre>
    </div>
  );

  if (!collapsible) return inner;

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
      >
        <span>{collapsibleLabel}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="border-t">{React.cloneElement(inner, { className: "border-0 rounded-none" })}</div>}
    </div>
  );
}
