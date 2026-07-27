import React from "react";
import { cn } from "@/lib/utils";

/**
 * Hero padrão das páginas de conteúdo (Design System, Tom e Voz, Nossas
 * Soluções): faixa de largura total da página com caixinha de ícone,
 * título e descrição — mesmo estilo, tamanhos e posicionamento em todas
 * as páginas para que a Central pareça um único programa. O conteúdo
 * interno permanece alinhado ao container de 7xl das páginas. `actions`
 * aceita botões extras alinhados à direita.
 */
interface PageHeroProps {
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  id?: string;
}

export function PageHero({ icon: Icon, title, description, actions, className, id }: PageHeroProps) {
  return (
    <div id={id} className={cn("border-b bg-muted/30", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground">{title}</h1>
            </div>
            <p className="text-muted-foreground font-roboto max-w-2xl">{description}</p>
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
}
