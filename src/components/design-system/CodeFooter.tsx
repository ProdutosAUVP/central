import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { ChevronDown, Bot, Check, Copy } from "lucide-react";

interface CodeFooterProps {
  title: string;
  hasCode: boolean;
  effectiveCode: string;
  htmlCode?: string;
  aiFoodPrompt: string;
  /**
   * Exibe apenas o AI-Food (sem abas React/HTML). Usado quando o widget já
   * renderiza o próprio bloco de código, evitando duplicação.
   */
  aiFoodOnly?: boolean;
}

export function CodeFooter({ title, hasCode, effectiveCode, htmlCode, aiFoodPrompt, aiFoodOnly = false }: CodeFooterProps) {
  const [showCode, setShowCode] = useState(false);
  const [codeTab, setCodeTab] = useState<"react" | "html" | "ai-food">(aiFoodOnly ? "ai-food" : "react");
  const [aiFoodCopied, setAIFoodCopied] = useState(false);

  const handleCopyAIFood = () => {
    navigator.clipboard.writeText(aiFoodPrompt);
    setAIFoodCopied(true);
    setTimeout(() => setAIFoodCopied(false), 2500);
  };

  return (
    <div className="border-t">
      <button
        onClick={() => setShowCode((s) => !s)}
        aria-expanded={showCode}
        className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
      >
        <span>{aiFoodOnly ? "AI-Food (Prompt)" : `Ver código${!hasCode ? " (pendente)" : ""}`}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", showCode && "rotate-180")} />
      </button>
      {showCode && (
        <div>
          {!aiFoodOnly && (
          <div role="tablist" aria-label="Formato do código" className="flex gap-1 px-6 pb-2 pt-1">
            <button
              role="tab"
              aria-selected={codeTab === "react"}
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
                role="tab"
                aria-selected={codeTab === "html"}
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
              role="tab"
              aria-selected={codeTab === "ai-food"}
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
          )}

          {codeTab === "ai-food" ? (
            <div className="border-t border-emerald-900/40 bg-[#0a1628]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-900/30">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold font-roboto uppercase tracking-wider text-emerald-400">
                    AI-Food — {title}
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
}
