import { useEffect, useState, RefObject } from "react";

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export interface CssVarColor {
  hex: string;
  rgb: string;
}

/**
 * Resolve um token HSL do design system (`--primary`, `--chart-1`, …) para
 * HEX/RGB no contexto do elemento, e RE-LÊ quando qualquer ancestral muda de
 * classe — troca de tema global (`dark` no <html>), de marca (`escola`) ou o
 * toggle local `.dark`/`.light` dos showcases.
 *
 * Ler dentro de um efeito comum com dependência no estado do tema mostra o
 * valor INVERTIDO: efeitos rodam de filho para pai, então o swatch lia as
 * variáveis antes de o ThemeProvider aplicar a classe no <html>. O
 * MutationObserver dispara depois da mutação real do DOM, sempre em sincronia
 * com o que está renderizado.
 */
export function useCssVarColor(ref: RefObject<HTMLElement>, token: string): CssVarColor | null {
  const [color, setColor] = useState<CssVarColor | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const read = () => {
      const raw = getComputedStyle(el).getPropertyValue(`--${token}`).trim();
      const parts = raw.replace(/%/g, "").split(/\s+/).map(Number);
      if (parts.length === 3 && !parts.some(isNaN)) {
        const [r, g, b] = hslToRgb(parts[0], parts[1], parts[2]);
        setColor({ hex: rgbToHex(r, g, b), rgb: `${r}, ${g}, ${b}` });
      }
    };

    read();
    const observer = new MutationObserver(read);
    let node: HTMLElement | null = el;
    while (node) {
      observer.observe(node, { attributes: true, attributeFilter: ["class"] });
      node = node.parentElement;
    }
    return () => observer.disconnect();
  }, [ref, token]);

  return color;
}
