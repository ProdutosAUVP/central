import React from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchButton } from "@/components/SearchButton";
import { cn } from "@/lib/utils";

/**
 * Casca de página compartilhada: header sticky (GlobalNav + busca + tema),
 * container do conteúdo e footer. Garante que toda página nova nasça
 * consistente sem duplicar estrutura.
 */

const widths = {
  "7xl": "max-w-7xl",
  "5xl": "max-w-5xl",
  "4xl": "max-w-4xl",
} as const;

interface PageShellProps {
  children: React.ReactNode;
  /** Largura máxima do main (o header é sempre 7xl). */
  width?: keyof typeof widths;
  /** Texto do footer. Se omitido, usa o padrão da Central. */
  footer?: string;
  /** Classes extras do <main> (espaçamento vertical etc.). */
  mainClassName?: string;
  /** Ações extras no header, antes do ThemeToggle. */
  headerActions?: React.ReactNode;
  /** Faixa de largura total renderizada entre o header e o <main> (ex.: PageHero). */
  hero?: React.ReactNode;
  /** Props extras aplicadas ao wrapper raiz (ex.: handlers do spotlight). */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function PageShell({
  children,
  width = "7xl",
  footer = "Central AUVP — Time de Produto",
  mainClassName,
  headerActions,
  hero,
  rootProps,
}: PageShellProps) {
  return (
    <div {...rootProps} className={cn("min-h-screen bg-background flex flex-col", rootProps?.className)}>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8 gap-2">
          <GlobalNav />
          <div className="flex items-center gap-2 shrink-0">
            {headerActions}
            <SearchButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {hero}

      <main className={cn("flex-1 mx-auto w-full px-4 md:px-8", widths[width], mainClassName)}>
        {children}
      </main>

      {/* O padding horizontal fica DENTRO do container com max-width, igual
          ao <main> — com ele no <footer> externo, o texto desalinhava do
          conteúdo em viewports mais largas que o max-width. */}
      <footer className="border-t py-6">
        <div className={cn("mx-auto px-4 md:px-8", widths[width])}>
          <p className="text-xs text-muted-foreground font-roboto">
            {footer} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
