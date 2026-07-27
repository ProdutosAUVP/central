import { cn } from "@/lib/utils";

/**
 * Estilos compartilhados dos menus laterais das páginas de conteúdo
 * (Design System, Tom e Voz, Nossas Soluções). Fonte única para o visual
 * dos itens (estilo sutil de Nossas Soluções) e para a geometria do
 * container — mesma largura, posição sticky e paddings em todas as
 * páginas, evitando layout shift ao navegar entre seções.
 */

/** Container do menu lateral desktop, colado sob o header sticky. */
export const sidebarNavClass =
  "sticky top-16 max-h-[calc(100vh-4rem)] w-60 shrink-0 py-8 pr-4 overflow-y-auto hidden md:block";

/** Rótulo de grupo (categoria) dentro do menu. */
export const sidebarGroupLabelClass =
  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

/** Item de navegação — ativo recebe destaque sutil (bg-muted), não preenchido. */
export function sidebarItemClass(active: boolean, extra?: string) {
  return cn(
    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-anek text-left leading-tight transition-colors",
    active
      ? "bg-muted font-semibold text-foreground"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
    extra
  );
}
