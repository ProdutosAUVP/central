import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { ChevronDown, Sun, Moon } from "lucide-react";

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  code?: string;
  htmlCode?: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentShowcase({ title, description, code, htmlCode, children, className }: ComponentShowcaseProps) {
  const effectiveCode =
    code ??
    `// TODO: snippet React deste componente ainda não foi fornecido.\n// Passe a prop \`code\` (e opcionalmente \`htmlCode\`) ao ComponentShowcase\n// para que o bloco "Ver código" exiba o conteúdo correto.`;
  const hasCode = Boolean(code);
  const [showCode, setShowCode] = useState(false);
  const [codeTab, setCodeTab] = useState<"react" | "html">("react");
  const [isDark, setIsDark] = useState(false);

  // Garante que qualquer .dark global anterior seja removida (legado)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold min-w-0 truncate">{title}</h3>
          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            aria-label={isDark ? "Visualizar em tema claro" : "Visualizar em tema escuro"}
            title={isDark ? "Tema claro" : "Tema escuro"}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 h-8 w-[88px] rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors text-[10px] font-roboto font-bold uppercase tracking-wider"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span>{isDark ? "Claro" : "Escuro"}</span>
          </button>
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1 pr-[104px]">{description}</p>}
      </div>

      <div className={cn(isDark && "dark")}>
        <div className="p-6 flex flex-wrap items-center gap-4 bg-background text-foreground">
          {children}
        </div>
      </div>

      <div className="border-t">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
        >
          <span>Ver código{!hasCode && " (pendente)"}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", showCode && "rotate-180")} />
        </button>
        {showCode && (
          <div>
            {htmlCode && (
              <div className="flex gap-1 px-6 pb-2">
                <button
                  onClick={() => setCodeTab("react")}
                  className={cn(
                    "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors",
                    codeTab === "react"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  React
                </button>
                <button
                  onClick={() => setCodeTab("html")}
                  className={cn(
                    "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors",
                    codeTab === "html"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  HTML / CSS / JS
                </button>
              </div>
            )}
            <CodeBlock
              code={codeTab === "html" && htmlCode ? htmlCode : effectiveCode}
              language={codeTab === "html" && htmlCode ? "html" : "tsx"}
              className="border-0 rounded-none border-t"
            />
          </div>
        )}
      </div>
    </div>
  );
}
