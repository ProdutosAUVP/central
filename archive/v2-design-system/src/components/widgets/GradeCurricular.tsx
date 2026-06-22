import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useBrand } from "@/contexts/BrandContext";
import { BookOpen, BarChart3, Shield, Landmark, TrendingUp, PiggyBank, Target, Wallet } from "lucide-react";

const categories = [
  { id: "fundamentos", label: "Fundamentos" },
  { id: "renda-fixa", label: "Renda Fixa" },
  { id: "acoes", label: "Ações" },
  { id: "fiis", label: "FIIs" },
];

const modules: Record<string, { icon: React.ElementType; number: string; title: string; description: string }[]> = {
  fundamentos: [
    { icon: BookOpen, number: "01", title: "Mentalidade Financeira", description: "Construa uma base sólida para suas decisões." },
    { icon: BarChart3, number: "02", title: "Reserva de Emergência", description: "Monte sua proteção financeira essencial." },
    { icon: Shield, number: "03", title: "Proteção Patrimonial", description: "Seguros e estratégias de blindagem." },
    { icon: Landmark, number: "04", title: "Planejamento Tributário", description: "Otimize seus impostos legalmente." },
  ],
  "renda-fixa": [
    { icon: PiggyBank, number: "01", title: "Tesouro Direto", description: "Títulos públicos e suas estratégias." },
    { icon: Shield, number: "02", title: "CDB, LCI e LCA", description: "Renda fixa bancária com segurança." },
    { icon: Target, number: "03", title: "Debêntures", description: "Títulos de crédito privado." },
    { icon: TrendingUp, number: "04", title: "Estratégias Avançadas", description: "Marcação a mercado e arbitragem." },
  ],
  acoes: [
    { icon: TrendingUp, number: "01", title: "Análise Fundamentalista", description: "Avalie empresas com profundidade." },
    { icon: BarChart3, number: "02", title: "Valuation", description: "Precifique ações com métodos sólidos." },
    { icon: Wallet, number: "03", title: "Dividendos", description: "Construa renda passiva com ações." },
    { icon: Target, number: "04", title: "Small Caps", description: "Oportunidades em empresas menores." },
  ],
  fiis: [
    { icon: Landmark, number: "01", title: "Tijolo", description: "FIIs de imóveis físicos." },
    { icon: PiggyBank, number: "02", title: "Papel", description: "FIIs de recebíveis imobiliários." },
    { icon: BarChart3, number: "03", title: "FOFs", description: "Fundos de fundos imobiliários." },
    { icon: Target, number: "04", title: "Híbridos", description: "Estratégias diversificadas em FIIs." },
  ],
};

export function GradeCurricular() {
  const { brand } = useBrand();

  return (
    <div className="bg-muted/50 p-4 md:p-8 rounded-2xl border">
      <Tabs defaultValue="fundamentos" className="w-full">
        <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className={cn(
                "rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-wider border transition-all font-anek",
                "data-[state=active]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:border-primary data-[state=active]:shadow-lg",
                "data-[state=inactive]:bg-white/40 data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
              )}
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(modules).map(([key, items]) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((mod) => (
                <div
                  key={mod.number}
                  className="bg-background/60 backdrop-blur-md border border-border/50 rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                      <mod.icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-xs font-bold text-accent uppercase tracking-widest font-roboto">
                      {mod.number}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-1 font-anek">{mod.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-roboto">{mod.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
