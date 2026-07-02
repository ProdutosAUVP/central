import { useEffect, useState } from "react";

/**
 * Retorna true quando o sistema operacional do usuário pede menos movimento
 * (prefers-reduced-motion: reduce). Usado para pausar animações dirigidas
 * por JS (carrossel, textos rotativos) — as de CSS são neutralizadas
 * globalmente no index.css.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
