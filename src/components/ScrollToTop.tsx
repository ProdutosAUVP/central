import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Ao navegar de uma seção da Central para outra, a página volta ao topo.
 *
 * Sem isso o React Router mantém a posição do scroll ao trocar de rota, e
 * quem estava no meio do Design System caía no meio do Nosso Time.
 *
 * Duas exceções deliberadas:
 * - URLs com hash (ex.: /solucoes#auvp-escola) — a própria página rola até
 *   a âncora; voltar ao topo aqui brigaria com esse comportamento;
 * - navegação POP (voltar/avançar do navegador) — aí o esperado é retomar
 *   de onde o usuário estava, e o browser já restaura a posição.
 *
 * useLayoutEffect (em vez de useEffect) posiciona antes do primeiro paint,
 * evitando o flash da página nova já rolada.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (hash || navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}
