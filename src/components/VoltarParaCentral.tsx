import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atalho de volta para a página inicial da Central. As sub-páginas do Hub
 * (Mural de Novidades e Produtos Físicos) não aparecem na navegação global,
 * então precisam de um caminho de volta explícito — no hero e no rodapé.
 */
export function VoltarParaCentral({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs font-semibold font-roboto text-muted-foreground transition-colors duration-300 sm:hover:border-primary/40 sm:hover:text-primary",
        className
      )}
    >
      <ArrowLeft className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-apple sm:group-hover:-translate-x-0.5" />
      Voltar para a Central
    </Link>
  );
}
