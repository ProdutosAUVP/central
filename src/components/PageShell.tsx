import React from "react";
import { Search } from "lucide-react";
import { GlobalNav } from "@/components/GlobalNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";
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
  /** Props extras aplicadas ao wrapper raiz (ex.: handlers do spotlight). */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

function SearchButton() {
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))}
      aria-label="Buscar na Central (Ctrl+K)"
      className="group flex items-center gap-2 h-9 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors px-2.5 sm:px-3"
    >
      <Search className="h-4 w-4" />
      <span className="hidden lg:inline text-xs font-roboto">Buscar…</span>
      <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-roboto font-semibold text-muted-foreground">
        {isMac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}

export function PageShell({
  children,
  width = "7xl",
  footer = "Central AUVP — Time de Produto",
  mainClassName,
  headerActions,
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

      <main className={cn("flex-1 mx-auto w-full px-4 md:px-8", widths[width], mainClassName)}>
        {children}
      </main>

      <footer className="border-t py-6 px-4 md:px-8">
        <div className={cn("mx-auto", widths[width])}>
          <p className="text-xs text-muted-foreground font-roboto">
            {footer} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
