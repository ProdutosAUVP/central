import { useCareca, SCAN_DURATION_MS } from "@/contexts/CarecaContext";

/**
 * Overlay do "Modo Careca": uma linha de scan varre a tela de cima a baixo
 * enquanto as fotos dos colaboradores são trocadas no meio da varredura —
 * como se o scanner estivesse "raspando" o cabelo de todo mundo.
 */
export function CarecaScanEffect() {
  const { scanning } = useCareca();

  if (!scanning) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
      aria-hidden="true"
      style={{ animation: `auvp-careca-tint ${SCAN_DURATION_MS}ms ease-in-out both` }}
    >
      {/* Leve tom esverdeado de "scanner" sobre a tela inteira */}
      <div className="absolute inset-0 bg-emerald-400/[0.07]" />

      {/* Linha de scan com rastro — varre do topo até embaixo */}
      <div
        className="absolute inset-x-0 top-0"
        style={{ animation: `auvp-careca-scan ${SCAN_DURATION_MS}ms cubic-bezier(0.45, 0, 0.55, 1) both` }}
      >
        {/* Rastro que fica para trás da linha */}
        <div className="h-32 w-full -translate-y-full bg-gradient-to-b from-transparent to-emerald-400/25" />
        {/* A linha em si, com brilho */}
        <div
          className="h-[3px] w-full -translate-y-full bg-emerald-300"
          style={{ boxShadow: "0 0 14px 3px rgba(52, 211, 153, 0.9), 0 0 44px 10px rgba(52, 211, 153, 0.45)" }}
        />
      </div>
    </div>
  );
}
