import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Alternador de tema claro/escuro compartilhado.
 * Antes cada página declarava a própria cópia deste componente.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
