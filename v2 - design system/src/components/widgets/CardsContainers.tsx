import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function CardsContainers() {
  return (
    <div className="space-y-12">
      {/* Regra de ouro */}
      <div className="p-4 bg-primary/5 border-l-4 border-accent rounded">
        <h4 className="font-bold text-accent text-sm mb-1">Regra de Ouro</h4>
        <p className="text-sm text-foreground/80">Sempre utilizar <strong>Border Radius: 12px</strong> e manter o contraste <strong>baixo</strong> em relação ao fundo da dobra.</p>
      </div>

      {/* Dobra Escura — fundos fixos por demonstração */}
      <div className="bg-black p-4 md:p-8 rounded-xl border border-white/10 shadow-xl">
        <h3 className="text-white font-anek text-2xl font-bold mb-6">Dobra Escura (Preto Puro)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          <div className="p-6 rounded-[12px] border" style={{ backgroundColor: "#1B1B1B", borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-xs font-bold uppercase tracking-wider mb-2 inline-block px-2 py-0.5 rounded" style={{ color: "#FFFFFF", backgroundColor: "#5A8770" }}>Destaque</span>
            <h4 className="font-roboto text-xl font-bold mb-2" style={{ color: "#FFFFFF" }}>Fundo Cinza Chumbo</h4>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>Contraste baixo entre #000 e #1B1B1B</p>
          </div>
          <div className="p-6 rounded-[12px] border" style={{ backgroundColor: "#1B1B1B", borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-xs font-bold uppercase tracking-wider mb-2 inline-block px-2 py-0.5 rounded" style={{ color: "#FFFFFF", backgroundColor: "rgba(90, 135, 112, 0.8)" }}>Vantagem</span>
            <h4 className="font-roboto text-xl font-bold mb-2" style={{ color: "#FFFFFF" }}>Baixo Contraste</h4>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>Reduz cansaço visual e mantém hierarquia</p>
          </div>
        </div>
      </div>

      {/* Dobra Cinza Claro — fundos fixos por demonstração */}
      <div className="p-4 md:p-8 rounded-xl border" style={{ backgroundColor: "#F2F2F2", borderColor: "#E5E7EB" }}>
        <h3 className="font-anek text-2xl font-bold mb-6" style={{ color: "hsl(var(--primary))" }}>Dobra Cinza Claro</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          <div className="p-6 rounded-[12px] shadow-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(0,0,0,0.05)" }}>
            <span className="text-sm font-bold uppercase tracking-wider mb-2 block" style={{ color: "hsl(var(--primary))" }}>Destaque</span>
            <h4 className="font-roboto text-xl font-bold mb-2" style={{ color: "#111827" }}>Fundo Branco Puro</h4>
            <p className="text-sm" style={{ color: "#6B7280" }}>Limpo e elegante sobre #F2F2F2</p>
          </div>
          <div className="p-6 rounded-[12px] shadow-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(0,0,0,0.05)" }}>
            <span className="text-sm font-bold uppercase tracking-wider mb-2 block" style={{ color: "hsl(var(--primary))" }}>Vantagem</span>
            <h4 className="font-roboto text-xl font-bold mb-2" style={{ color: "#111827" }}>Baixo Contraste</h4>
            <p className="text-sm" style={{ color: "#6B7280" }}>Sutil e profissional</p>
          </div>
        </div>
      </div>

      {/* Dobra Branca — fundos fixos por demonstração */}
      <div className="p-4 md:p-8 rounded-xl border shadow-sm" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <h3 className="font-anek text-2xl font-bold mb-6" style={{ color: "hsl(var(--primary))" }}>Dobra Branca (Branco Puro)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          <div className="p-6 rounded-[12px] border" style={{ backgroundColor: "#F2F2F2", borderColor: "rgba(0,0,0,0.05)" }}>
            <span className="text-sm font-bold uppercase tracking-wider mb-2 block" style={{ color: "hsl(var(--primary))" }}>Destaque</span>
            <h4 className="font-roboto text-xl font-bold mb-2" style={{ color: "#111827" }}>Fundo Cinza Claro</h4>
            <p className="text-sm" style={{ color: "#6B7280" }}>Leve elevação visual sobre branco</p>
          </div>
          <div className="p-6 rounded-[12px] border" style={{ backgroundColor: "#F2F2F2", borderColor: "rgba(0,0,0,0.05)" }}>
            <span className="text-sm font-bold uppercase tracking-wider mb-2 block" style={{ color: "hsl(var(--primary))" }}>Vantagem</span>
            <h4 className="font-roboto text-xl font-bold mb-2" style={{ color: "#111827" }}>Baixo Contraste</h4>
            <p className="text-sm" style={{ color: "#6B7280" }}>Hierarquia sem agressividade visual</p>
          </div>
        </div>
      </div>
    </div>
  );
}
