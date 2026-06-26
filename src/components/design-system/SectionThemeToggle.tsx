import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useBrand } from "@/contexts/BrandContext";
import { useSystemView } from "@/contexts/ViewContext";
import { generateComponentPrompt } from "@/lib/ai-food-generator";
import { cn } from "@/lib/utils";
import { Sun, Moon, ChevronDown, Bot, Check, Copy } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface SectionThemeToggleProps {
  children: React.ReactNode;
  className?: string;
  /** Se true, não envolve em borda/card — apenas aplica o .dark e o botão flutuante. */
  bare?: boolean;
  label?: string;
  /** Título do componente — exibido no AI-Food. */
  title?: string;
  /** Descrição do componente — incluída no prompt AI-Food. */
  description?: string;
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
export function SectionThemeToggle({ children, className, bare = false, label, title, description, code, htmlCode, selfDocumented = false }: SectionThemeToggleProps) {
  const { theme } = useTheme();
  const { brand } = useBrand();
  const { view } = useSystemView();
  const [isDark, setIsDark] = useState(theme === "dark");
  const [showCode, setShowCode] = useState(false);
  const [codeTab, setCodeTab] = useState<"react" | "html" | "ai-food">("react");
  const [aiFoodCopied, setAIFoodCopied] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const aiFoodTitle = title ?? label ?? "Componente";
  const aiFoodPrompt = generateComponentPrompt(brand, view, aiFoodTitle, description, code, htmlCode);

  const handleCopyAIFood = () => {
    navigator.clipboard.writeText(aiFoodPrompt);
    setAIFoodCopied(true);
    setTimeout(() => setAIFoodCopied(false), 2500);
  };

  const effectiveCode =
    code ??
    `// TODO: snippet React deste componente ainda não foi fornecido.\n// Passe a prop \`code\` (e opcionalmente \`htmlCode\`) ao SectionThemeToggle\n// para que o bloco "Ver código" exiba o conteúdo correto.`;
  const hasCode = Boolean(code);

  const themeButton = (
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
          <div className="flex gap-1 px-6 pb-2 pt-1">
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
            {htmlCode && (
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
            )}
            <button
              onClick={() => setCodeTab("ai-food")}
              className={cn(
                "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1",
                codeTab === "ai-food"
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Bot className="h-3 w-3" />
              AI-Food
            </button>
          </div>

          {codeTab === "ai-food" ? (
            <div className="border-t border-emerald-900/40 bg-[#0a1628]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-900/30">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold font-roboto uppercase tracking-wider text-emerald-400">
                    AI-Food — {aiFoodTitle}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-roboto">
                    Prompt isolado · pronto para qualquer IA
                  </span>
                </div>
                <button
                  onClick={handleCopyAIFood}
                  className={cn(
                    "inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-[11px] font-bold font-roboto uppercase tracking-wider transition-all",
                    aiFoodCopied
                      ? "bg-emerald-500 text-white"
                      : "bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800/80 border border-emerald-700/50"
                  )}
                >
                  {aiFoodCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {aiFoodCopied ? "Copiado" : "Copiar"}
                </button>
              </div>
              <div className="p-5 max-h-[360px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-emerald-300/90 selection:bg-emerald-500/30 selection:text-white">
                  {aiFoodPrompt}
                </pre>
              </div>
            </div>
          ) : (
            <CodeBlock
              code={codeTab === "html" && htmlCode ? htmlCode : effectiveCode}
              language={codeTab === "html" && htmlCode ? "html" : "tsx"}
              className="border-0 rounded-none border-t"
            />
          )}
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
            {themeButton}
          </div>
        </div>
        <div className={cn(isDark ? "dark" : "light", brand === "escola" && "escola")}>
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
        {themeButton}
      </div>
      <div className={cn(isDark ? "dark" : "light", brand === "escola" && "escola")}>
        <div className="bg-background text-foreground">{children}</div>
      </div>
      {codeFooter}
    </div>
  );
}
