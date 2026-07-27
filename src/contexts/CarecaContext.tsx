import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { teamPhotos, teamPhotosCareca } from "@/assets/team";

/**
 * Easter egg: "Modo Careca" (ou modo Ricardo). Ativado apenas pela busca
 * global (Ctrl/Cmd+K), troca todas as fotos dos colaboradores pelas versões
 * careca depois de uma animação de scan na tela. O estado persiste em
 * localStorage e só volta ao normal acionando o modo de novo.
 */

const STORAGE_KEY = "auvp-careca";

/** Duração total do scan (ms) — precisa bater com `auvp-careca-scan` no CSS. */
export const SCAN_DURATION_MS = 1800;

interface CarecaContextValue {
  /** Modo careca ativo — fotos trocadas. */
  careca: boolean;
  /** Animação de scan em andamento. */
  scanning: boolean;
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
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const toggleCareca = useCallback(() => {
    setScanning((alreadyScanning) => {
      if (alreadyScanning) return true;
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

  return (
    <CarecaContext.Provider value={{ careca, scanning, toggleCareca }}>
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
