import { Search } from "lucide-react";
import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";

/**
 * Botão que abre a command palette global (Ctrl/Cmd+K).
 * Deve estar presente no header de toda página da Central — extraído do
 * PageShell para ser reutilizável em páginas com layout de header próprio
 * (Design System e Tom e Voz têm sidebar/menu customizados).
 */
export function SearchButton() {
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
