import React from "react";
import { useBrand } from "@/contexts/BrandContext";

export function Introducao() {
  const { brand } = useBrand();

  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 font-anek">
        Bem-vindo ao Design System AUVP
      </h1>
      <p className="text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
        A referência oficial de tokens visuais, componentes e padrões de interface das marcas AUVP Capital e AUVP Escola. Navegue pela sidebar para explorar cada área.
      </p>
    </div>
  );
}
