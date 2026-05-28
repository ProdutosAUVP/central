import React, { useState } from "react";
import { Copy, Check, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { areaPrompts, produtoPrompts, type AreaId, type ProdutoId } from "./TomEVozAIFoodData";

type Props =
  | { type: "area"; id: AreaId; label: string }
  | { type: "produto"; id: ProdutoId; label: string };

export function TomEVozAIFoodInline(props: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const prompt =
    props.type === "area"
      ? areaPrompts[props.id]
      : produtoPrompts[props.id];

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-xl border border-accent/20 bg-primary/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-accent/10 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-bold font-anek text-foreground">
          <Bot className="h-4 w-4 text-accent" />
          AI-Food — Prompt para {props.label}
        </span>
        <span className="text-xs text-muted-foreground">{open ? "Fechar" : "Expandir"}</span>
      </button>

      {open && (
        <div className="bg-[#0f172a] relative border-t border-accent/20">
          <div className="absolute top-3 right-3 z-10">
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="bg-white text-[#0f172a] hover:bg-gray-200 font-bold shadow-lg gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copiado!" : "Copiar Prompt"}
            </Button>
          </div>
          <div className="p-5 overflow-x-auto">
            <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#4ade80] selection:bg-[#4ade80]/30 selection:text-white">
              {prompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
