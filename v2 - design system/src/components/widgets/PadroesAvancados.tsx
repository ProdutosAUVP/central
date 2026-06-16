import React from "react";
import { GradeCurricular } from "@/components/widgets/GradeCurricular";
import { TabelaPrecos } from "@/components/widgets/TabelaPrecos";
import { JornadaHeroi } from "@/components/widgets/JornadaHeroi";
import { CodeBlock } from "@/components/ui/code-block";
import { useBrand } from "@/contexts/BrandContext";

export function PadroesAvancados() {
  const { brand } = useBrand();

  return (
    <div className="space-y-16">
      {/* 1. Timelines */}
      <div>
        <h3 className="text-xl font-bold font-anek border-b border-border pb-2 mb-6 text-foreground">1. Timelines Animadas</h3>
        <p className="text-muted-foreground mb-4 font-roboto">
          Barra de progresso com gradiente e pontos interativos. Veja o widget completo na seção <strong>Jornada do Herói</strong>.
        </p>
        <div className="w-full">
          <JornadaHeroi />
        </div>
      </div>

      {/* 2. Precificação */}
      <div>
        <h3 className="text-xl font-bold font-anek border-b border-border pb-2 mb-6 text-foreground">2. Componentes de Precificação</h3>
        <p className="text-muted-foreground mb-4 font-roboto">
          Cards com backdrop-blur e transparência, badge de desconto e CTA. Veja o widget completo em <strong>Tabela de Preços</strong>.
        </p>
        <div className="w-full">
          <TabelaPrecos />
        </div>
      </div>

      {/* 3. Abas Pill-Style */}
      <div>
        <h3 className="text-xl font-bold font-anek border-b border-border pb-2 mb-6 text-foreground">3. Abas Pill-Style (Tabs)</h3>
        <p className="text-muted-foreground mb-4 font-roboto">
          Botões arredondados para alternar conteúdos. Aba ativa com fundo sólido e shadow. Veja em <strong>Grade Curricular</strong>.
        </p>
        <div className="bg-muted/50 p-8 border border-border rounded-xl flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            <button className="bg-primary text-primary-foreground border border-primary px-6 py-3 rounded-full font-bold text-[13px] uppercase shadow-lg font-anek">Categoria A</button>
            <button className="bg-card/40 border border-border text-muted-foreground hover:text-foreground px-6 py-3 rounded-full font-bold text-[13px] uppercase transition-all font-anek">Categoria B</button>
            <button className="bg-card/40 border border-border text-muted-foreground hover:text-foreground px-6 py-3 rounded-full font-bold text-[13px] uppercase transition-all font-anek">Categoria C</button>
          </div>
        </div>
      </div>

      {/* 4. Grade Curricular */}
      <div>
        <h3 className="text-xl font-bold font-anek border-b border-border pb-2 mb-6 text-foreground">4. Grade Curricular com Abas</h3>
        <p className="text-muted-foreground mb-4 font-roboto">
          Cards translúcidos com abas pill-style. Carrossel mobile, grid desktop.
        </p>
        <div className="w-full">
          <GradeCurricular />
        </div>
      </div>
    </div>
  );
}
