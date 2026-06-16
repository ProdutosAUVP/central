import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface SectionThemeToggleProps {
  children: React.ReactNode;
  className?: string;
  /** Se true, não envolve em borda/card — apenas aplica o .dark e o botão flutuante. */
  bare?: boolean;
  label?: string;
  /** Código React/TSX exibido em dropdown "Ver código", igual ao ComponentShowcase. */
  code?: string;
  /** Versão HTML / CSS / JS opcional, exibida em aba secundária. */
  htmlCode?: string;
  /**
   * Marque `true` quando o widget filho já renderiza o próprio bloco "Ver código"
   * (CodeBlock interno). Suprime o footer padrão para evitar duplicação.
   */
  selfDocumented?: boolean;
}

/**
 * Wrapper genérico que adiciona um toggle local de tema claro/escuro a qualquer
 * seção do Design System que não use ComponentShowcase. O toggle aplica a classe
 * `.dark` apenas ao conteúdo interno, mantendo o tema de outras seções intacto.
 */
export function SectionThemeToggle({ children, className, bare = false, label, code, htmlCode, selfDocumented = false }: SectionThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [codeTab, setCodeTab] = useState<"react" | "html">("react");

  const button = (
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
  );

  // Sempre exibe o bloco "Ver código" para padronizar todos os showcases.
  // Quando nenhum código é fornecido, mostra um placeholder visível para
  // garantir que novos componentes nunca sejam adicionados sem snippet.
  const effectiveCode =
    code ??
    `// TODO: snippet React deste componente ainda não foi fornecido.\n// Passe a prop \`code\` (e opcionalmente \`htmlCode\`) ao SectionThemeToggle\n// para que o bloco "Ver código" exiba o conteúdo correto.`;
  const hasCode = Boolean(code);

  const codeFooter = selfDocumented ? null : (
    <div className="border-t">
      <button
        onClick={() => setShowCode((s) => !s)}
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
  );

  if (bare) {
    return (
      <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
              {label ?? "Pré-visualização"}
            </span>
            {button}
          </div>
        </div>
        <div className={cn(isDark && "dark")}>
          <div className="p-6 bg-background text-foreground">{children}</div>
        </div>
        {codeFooter}
      </div>
    );
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
      <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between gap-4">
        <span className="text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
          {label ?? "Pré-visualização"}
        </span>
        {button}
      </div>
      <div className={cn(isDark && "dark")}>
        <div className="bg-background text-foreground">{children}</div>
      </div>
      {codeFooter}
    </div>
  );
}
