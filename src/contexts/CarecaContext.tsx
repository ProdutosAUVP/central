import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { teamPhotos, teamPhotosCareca } from "@/assets/team";

/**
 * Easter egg: "Modo Megabrain" (ou modo Ricardo). Ativado digitando
 * "megabrain" em qualquer página — fora de campos de texto, no espírito do
 * Konami code do Jorginho — ou clicando 3 vezes seguidas em qualquer foto
 * do Raul. Troca todas as fotos dos colaboradores pelas versões careca
 * depois de uma animação de scan na tela. O estado persiste em localStorage
 * e só volta ao normal acionando o easter egg de novo.
 */

const STORAGE_KEY = "auvp-careca";

/** Código secreto que liga/desliga o modo. */
const SECRET_CODE = "megabrain";

/** Cliques seguidos numa foto do Raul que também alternam o modo. */
const RAUL_CLICKS = 3;
/** Intervalo máximo (ms) entre um clique e outro para contarem como "seguidos". */
const RAUL_CLICK_WINDOW_MS = 1000;

/** Duração total do scan (ms) — precisa bater com `auvp-careca-scan` no CSS. */
export const SCAN_DURATION_MS = 1800;

interface CarecaContextValue {
  /** Modo careca ativo — fotos trocadas. */
  careca: boolean;
  /** Animação de scan em andamento. */
  scanning: boolean;
  /** Direção do scan em andamento: true = ativando, false = desativando. */
  activating: boolean;
  /** Dispara o scan e alterna o modo no meio da varredura. */
  toggleCareca: () => void;
}

const CarecaContext = createContext<CarecaContextValue | undefined>(undefined);

export function CarecaProvider({ children }: { children: React.ReactNode }) {
  const [careca, setCareca] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [scanning, setScanning] = useState(false);
  const [activating, setActivating] = useState(true);
  const timeoutsRef = useRef<number[]>([]);
  // Espelho do estado atual para o toggle saber a direção do scan sem
  // precisar depender de `careca` (o listener do código ficaria instável).
  const carecaRef = useRef(careca);
  useEffect(() => {
    carecaRef.current = careca;
  }, [careca]);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const toggleCareca = useCallback(() => {
    setScanning((alreadyScanning) => {
      if (alreadyScanning) return true;
      setActivating(!carecaRef.current);
      // As fotos trocam no meio da varredura, como se o scan as revelasse.
      timeoutsRef.current.push(
        window.setTimeout(() => {
          setCareca((c) => {
            const next = !c;
            try {
              localStorage.setItem(STORAGE_KEY, String(next));
            } catch {
              /* localStorage indisponível — o modo vale só para a sessão */
            }
            return next;
          });
        }, SCAN_DURATION_MS / 2),
        window.setTimeout(() => setScanning(false), SCAN_DURATION_MS),
      );
      return true;
    });
  }, []);

  // Escuta o código secreto sendo digitado. Teclas dentro de inputs,
  // textareas ou editores não contam — digitar "megabrain" na busca global,
  // por exemplo, não dispara o modo.
  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        progress = 0;
        return;
      }
      if (e.key.length !== 1) return; // Shift, setas etc. não zeram o progresso
      const key = e.key.toLowerCase();
      progress = key === SECRET_CODE[progress] ? progress + 1 : key === SECRET_CODE[0] ? 1 : 0;
      if (progress === SECRET_CODE.length) {
        progress = 0;
        toggleCareca();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleCareca]);

  // Escuta cliques em fotos do Raul (normal ou careca) em qualquer página —
  // 3 seguidos alternam o modo. Clicar em outra coisa zera a contagem.
  useEffect(() => {
    let clicks = 0;
    let lastTime = 0;
    const raulUrls = [teamPhotos.raul, teamPhotosCareca.raul].map(
      (u) => new URL(u, window.location.href).href
    );
    const onClick = (e: MouseEvent) => {
      const target = e.target as EventTarget | null;
      if (!(target instanceof HTMLImageElement) || !raulUrls.includes(target.src)) {
        clicks = 0;
        return;
      }
      clicks = e.timeStamp - lastTime <= RAUL_CLICK_WINDOW_MS ? clicks + 1 : 1;
      lastTime = e.timeStamp;
      if (clicks >= RAUL_CLICKS) {
        clicks = 0;
        toggleCareca();
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [toggleCareca]);

  return (
    <CarecaContext.Provider value={{ careca, scanning, activating, toggleCareca }}>
      {children}
    </CarecaContext.Provider>
  );
}

export function useCareca() {
  const ctx = useContext(CarecaContext);
  if (!ctx) throw new Error("useCareca must be used within CarecaProvider");
  return ctx;
}

/**
 * Fotos do time respeitando o modo careca. Substitui o import direto de
 * `teamPhotos` nos componentes que exibem colaboradores.
 */
export function useTeamPhotos(): Record<string, string> {
  const { careca } = useCareca();
  return careca ? { ...teamPhotos, ...teamPhotosCareca } : teamPhotos;
}
