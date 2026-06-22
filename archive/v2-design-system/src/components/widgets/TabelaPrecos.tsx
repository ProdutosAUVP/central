import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useBrand } from "@/contexts/BrandContext";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  paymentInfo: string;
  features: string[];
  featured?: boolean;
  featuredLabel?: string;
  discount?: string;
  highlightFeature?: string;
}

const individualPlans: PricingPlan[] = [
  {
    name: "AUVP Sempre",
    price: "R$ 797,00",
    paymentInfo: "PIX, cartão em até 12x ou boleto à vista.",
    features: [
      "Acesso vitalício à plataforma",
      "Comunidade exclusiva de investidores",
      "Aulas atualizadas periodicamente",
      "Certificado de conclusão",
    ],
  },
  {
    name: "AUVP Analítica",
    price: "R$ 997,00",
    paymentInfo: "PIX, cartão em até 12x ou boleto à vista.",
    features: [
      "Ferramenta de análise de ativos",
      "Indicadores fundamentalistas",
      "Rankings e comparativos",
      "Relatórios exclusivos",
    ],
  },
  {
    name: "Carteira AUVP",
    price: "R$ 997,00",
    paymentInfo: "PIX, cartão em até 12x ou boleto à vista.",
    features: [
      "Gestão inteligente da carteira",
      "Diagrama do Cerrado",
      "Rebalanceamento automático",
      "Acompanhamento de dividendos",
    ],
  },
];

const pacotePlans: PricingPlan[] = [
  {
    name: "Pacote Duplo",
    price: "R$ 1.497,00",
    paymentInfo: "Economia de R$ 297,00 em relação ao individual.",
    discount: "15% OFF",
    features: [
      "AUVP Sempre incluso",
      "AUVP Analítica inclusa",
      "Comunidade exclusiva",
      "Acesso vitalício",
    ],
  },
  {
    name: "Pacote Completo",
    price: "R$ 2.199,00",
    paymentInfo: "Economia de R$ 592,00. O melhor custo-benefício.",
    discount: "21% OFF",
    featured: true,
    featuredLabel: "O Mais Completo",
    features: [
      "AUVP Sempre incluso",
      "AUVP Analítica inclusa",
      "Carteira AUVP inclusa",
      "Acesso vitalício a tudo",
    ],
    highlightFeature: "21% de desconto no pacote completo",
  },
];

export function TabelaPrecos() {
  const [view, setView] = useState<"individual" | "pacotes">("individual");
  const { brand } = useBrand();
  const plans = view === "individual" ? individualPlans : pacotePlans;

  return (
    <div className="">
      {/* Toggle */}
      <div className="flex justify-center mb-8 relative">
        <div className="relative inline-flex items-center rounded-xl bg-foreground/5 border border-foreground/5 p-1 w-full max-w-sm">
          <div
            className={cn(
              "absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-[10px] bg-foreground transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-md",
              view === "pacotes" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
            )}
          />
          <button
            onClick={() => setView("individual")}
            className={cn(
              "relative z-10 flex-1 py-3 px-4 text-[13px] font-bold uppercase tracking-wider transition-colors duration-300 font-anek",
              view === "individual" ? "text-background" : "text-muted-foreground"
            )}
          >
            Individual
          </button>
          <button
            onClick={() => setView("pacotes")}
            className={cn(
              "relative z-10 flex-1 py-3 px-4 text-[13px] font-bold uppercase tracking-wider transition-colors duration-300 font-anek",
              view === "pacotes" ? "text-background" : "text-muted-foreground"
            )}
          >
            Pacotes
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={cn(
        "grid gap-6 pt-6",
        view === "individual" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
      )}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative bg-background/60 backdrop-blur-md border rounded-xl p-6 md:p-8 flex flex-col transition-all hover:shadow-lg",
              plan.featured ? "border-accent shadow-md" : "border-border/50"
            )}
          >
            {plan.featuredLabel && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground dark:bg-[hsl(145_20%_44%)] dark:text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase whitespace-nowrap shadow-md">
                {plan.featuredLabel}
              </div>
            )}

            {plan.discount && (
              <Badge variant="secondary" className="w-fit mb-3 bg-foreground text-background dark:bg-[hsl(145_20%_44%)] dark:text-white text-[10px] font-bold uppercase">
                {plan.discount}
              </Badge>
            )}

            <h3 className="text-2xl font-extrabold mb-4 font-anek">{plan.name}</h3>
            <span className="text-4xl font-black font-anek">{plan.price}</span>

            <div className="bg-foreground/[0.03] rounded-lg px-3 py-2 text-xs text-muted-foreground my-4 border-l-[3px] border-accent">
              {plan.paymentInfo}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[14px] text-muted-foreground font-roboto">
                  <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
              {plan.highlightFeature && (
                <li className="flex gap-3 text-sm font-bold text-accent">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {plan.highlightFeature}
                </li>
              )}
            </ul>

            <Button variant="cta" size="lg" className="w-full mt-auto">
              Começar Agora
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
