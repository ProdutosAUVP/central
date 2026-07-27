import React from "react";
import { cn } from "@/lib/utils";

/**
 * Hero padrão das páginas de conteúdo (Design System, Tom e Voz, Nossas
 * Soluções): faixa com badge, título e descrição — mesmo estilo, tamanhos e
 * posicionamento em todas as páginas para que a Central pareça um único
 * programa. `actions` aceita botões extras alinhados à direita.
 */
interface PageHeroProps {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  id?: string;
}

export function PageHero({ icon: Icon, badge, title, description, actions, className, id }: PageHeroProps) {
  return (
    <div id={id} className={cn("-mx-4 md:-mx-8 border-b bg-muted/30 px-4 md:px-8 py-10 md:py-14", className)}>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
        <Icon className="h-3.5 w-3.5" /> {badge}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">{title}</h1>
          <p className="text-muted-foreground font-roboto max-w-2xl">{description}</p>
        </div>
        {actions}
      </div>
    </div>
  );
}
