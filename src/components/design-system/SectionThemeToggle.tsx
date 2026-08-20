import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useBrand } from "@/contexts/BrandContext";
import { useSystemView } from "@/contexts/ViewContext";
import { generateComponentPrompt } from "@/lib/ai-food-generator";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import { CodeFooter } from "@/components/design-system/CodeFooter";

interface SectionThemeToggleProps {
  children: React.ReactNode;
  className?: string;
  /** Se true, não envolve em borda/card — apenas aplica o .dark e o botão flutuante. */
  bare?: boolean;
  label?: string;
  /** Título do componente — exibido no AI-Food. */
  title?: string;
  /** Descrição do componente — incluída no prompt AI-Food. */
  description?: string;
  /** Código React/TSX exibido em dropdown "Ver código", igual ao ComponentShowcase. */
  code?: string;
  /** Versão HTML / CSS / JS opcional, exibida em aba secundária. */
  htmlCode?: string;
  /**
   * Marque `true` quando o widget filho já renderiza o próprio bloco "Ver código"
   * (CodeBlock interno). Suprime as abas React/HTML do footer para evitar
   * duplicação, mas mantém o AI-Food (gerado a partir de `code`) — a menos
   * que `aiFood` seja `false`.
   */
  selfDocumented?: boolean;
  /**
   * Defina `false` quando o widget filho já renderiza o próprio AI-Food
   * (ex.: GraficoPizza), suprimindo o footer AI-Food padrão.
   */
  aiFood?: boolean;
}

/**
 * Wrapper genérico que adiciona um toggle local de tema claro/escuro a qualquer
 * seção do Design System que não use ComponentShowcase. O toggle aplica a classe
 * `.dark` apenas ao conteúdo interno, mantendo o tema de outras seções intacto.
 */
export function SectionThemeToggle({ children, className, bare = false, label, title, description, code, htmlCode, selfDocumented = false, aiFood = true }: SectionThemeToggleProps) {
  const { theme } = useTheme();
  const { brand } = useBrand();
  const { view } = useSystemView();
  const [isDark, setIsDark] = useState(theme === "dark");
  const [userOverrode, setUserOverrode] = useState(false);

  useEffect(() => {
    if (!userOverrode) setIsDark(theme === "dark");
  }, [theme, userOverrode]);

  const aiFoodTitle = title ?? label ?? "Componente";

  const aiFoodPrompt = useMemo(
    () => generateComponentPrompt(brand, view, aiFoodTitle, description, code, htmlCode),
    [brand, view, aiFoodTitle, description, code, htmlCode]
  );

  const effectiveCode =
    code ??
    `// TODO: snippet React deste componente ainda não foi fornecido.\n// Passe a prop \`code\` (e opcionalmente \`htmlCode\`) ao SectionThemeToggle\n// para que o bloco "Ver código" exiba o conteúdo correto.`;
  const hasCode = Boolean(code);

  const themeButton = (
    <button
      type="button"
      onClick={() => { setUserOverrode(true); setIsDark((d) => !d); }}
      aria-label={isDark ? "Visualizar em tema claro" : "Visualizar em tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
      className="shrink-0 inline-flex items-center justify-center gap-1.5 h-8 w-[88px] rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors text-[10px] font-roboto font-bold uppercase tracking-wider"
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      <span>{isDark ? "Claro" : "Escuro"}</span>
    </button>
  );

  // Widget auto-documentado: sem abas React/HTML (já renderiza o próprio
  // código), mas mantém o AI-Food quando houver `code` para alimentar o prompt.
  const codeFooter = selfDocumented ? (
    aiFood && hasCode ? (
      <CodeFooter
        title={aiFoodTitle}
        hasCode={hasCode}
        effectiveCode={effectiveCode}
        htmlCode={htmlCode}
        aiFoodPrompt={aiFoodPrompt}
        aiFoodOnly
      />
    ) : null
  ) : (
    <CodeFooter
      title={aiFoodTitle}
      hasCode={hasCode}
      effectiveCode={effectiveCode}
      htmlCode={htmlCode}
      aiFoodPrompt={aiFoodPrompt}
    />
  );

  if (bare) {
    return (
      <div
        className={cn("border rounded-lg overflow-hidden bg-card", className)}
        data-ds-showcase={aiFoodTitle}
        data-ds-description={description}
      >
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
              {label ?? "Pré-visualização"}
            </span>
            {themeButton}
          </div>
        </div>
        <div className={cn(isDark ? "dark" : "light", brand === "escola" && "escola")}>
          <div className="p-6 bg-background text-foreground" data-ds-preview="">{children}</div>
        </div>
        {codeFooter}
      </div>
    );
  }

  return (
    <div
      className={cn("border rounded-lg overflow-hidden bg-card", className)}
      data-ds-showcase={aiFoodTitle}
      data-ds-description={description}
    >
      <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between gap-4">
        <span className="text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
          {label ?? "Pré-visualização"}
        </span>
        {themeButton}
      </div>
      <div className={cn(isDark ? "dark" : "light", brand === "escola" && "escola")}>
        <div className="bg-background text-foreground" data-ds-preview="">{children}</div>
      </div>
      {codeFooter}
    </div>
  );
}
