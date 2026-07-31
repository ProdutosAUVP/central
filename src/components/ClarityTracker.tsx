import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useBrand } from "@/contexts/BrandContext";
import { useCareca } from "@/contexts/CarecaContext";
import { clarityIdentify, clarityTags, idAnonimo } from "@/lib/clarity";

/**
 * Alimenta o Clarity com as variáveis de sessão da Central.
 *
 * Fica dentro do Router e dos providers porque é daí que vêm os dados que
 * dão sentido a uma gravação: em que página a pessoa está, em que tema, em
 * que marca. Sem isso o painel só mostra sessões anônimas e indistinguíveis.
 *
 * Não renderiza nada.
 */

/** Nome legível de cada rota — o path cru não diz muito no painel. */
const NOMES_DE_ROTA: Record<string, string> = {
  "/": "Hub",
  "/time": "Nosso Time",
  "/roadmap": "Roadmap",
  "/novidades": "Novidades",
  "/design-system": "Design System",
  "/tom-e-voz": "Tom e Voz",
  "/solucoes": "Nossas Soluções",
  "/produtos-fisicos": "Produtos Físicos",
};

export function ClarityTracker() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const { brand } = useBrand();
  const { careca } = useCareca();

  const pagina = NOMES_DE_ROTA[pathname] ?? "Não encontrada";

  /* Identificação: uma vez por sessão. O apelido da página vai junto para o
     painel mostrar onde a pessoa entrou, não só quem ela é. */
  useEffect(() => {
    clarityIdentify(idAnonimo(), pagina);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Página: reenviada a cada navegação, já que numa SPA o Clarity não
     percebe a troca de rota sozinho. */
  useEffect(() => {
    clarityTags({ pagina, rota: pathname });
  }, [pagina, pathname]);

  /* Preferências: mudam pouco, mas mudam durante a sessão — e é justamente
     o antes/depois que interessa numa gravação. */
  useEffect(() => {
    clarityTags({
      tema: theme,
      marca: brand,
      megabrain: careca ? "ligado" : "desligado",
    });
  }, [theme, brand, careca]);

  return null;
}
