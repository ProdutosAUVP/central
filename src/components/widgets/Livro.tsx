import React, { useEffect, useState } from "react";

/**
 * Componente Livro — inspirado no Book do Geist (Vercel).
 * Capa dividida em bloco superior colorido + área inferior branca com título.
 * Animação: estado 1 (fechado, plano) → estado 2 (aberto, levemente girado em 3D).
 */

type Variant = "default" | "simple" | "stripe";
type ResponsiveWidth = number | { sm?: number; md?: number; lg?: number };

type LivroProps = {
  title: string;
  /** Cor do bloco superior da capa (padrão: laranja). */
  color?: string;
  /** Cor do texto do título (sobre fundo branco). */
  textColor?: string;
  width?: ResponsiveWidth;
  variant?: Variant;
  illustration?: React.ReactNode;
  className?: string;
};

function useResponsiveWidth(width: ResponsiveWidth): number {
  const [w, setW] = useState<number>(() => {
    if (typeof width === "number") return width;
    if (typeof window === "undefined") return width.md ?? width.sm ?? 196;
    const vw = window.innerWidth;
    if (vw >= 1024 && width.lg) return width.lg;
    if (vw >= 768 && width.md) return width.md;
    return width.sm ?? width.md ?? 196;
  });

  useEffect(() => {
    if (typeof width === "number") {
      setW(width);
      return;
    }
    const update = () => {
      const vw = window.innerWidth;
      if (vw >= 1024 && width.lg) setW(width.lg);
      else if (vw >= 768 && width.md) setW(width.md);
      else setW(width.sm ?? width.md ?? 196);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  return w;
}

export function Livro({
  title,
  color = "#F0BF4F",
  textColor = "#111",
  width = 200,
  variant = "default",
  illustration,
  className,
}: LivroProps) {
  const w = useResponsiveWidth(width);
  const height = Math.round(w * 1.32);
  const depth = Math.max(10, Math.round(w * 0.05));
  const radius = 8;

  const showStripe = variant === "stripe";

  // Triângulo padrão quando nenhuma ilustração for passada.
  const defaultIllustration = (
    <svg width={Math.max(14, w * 0.09)} height={Math.max(14, w * 0.09)} viewBox="0 0 24 24" aria-hidden>
      <polygon points="12,4 22,20 2,20" fill="currentColor" />
    </svg>
  );

  return (
    <div
      className={`group/livro ${className ?? ""}`}
      style={{ width: w, height, perspective: 1400 }}
    >
      <div
        className="livro-inner relative w-full h-full transition-transform duration-500 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Páginas (lateral direita) — só aparece quando "aberto" pelo hover */}
        <div
          aria-hidden
          className="absolute top-1 bottom-1 opacity-0 transition-opacity duration-500 group-hover/livro:opacity-100"
          style={{
            right: 0,
            width: depth,
            transform: `translateZ(-${depth / 2}px) translateX(${depth / 2}px) rotateY(90deg)`,
            background:
              "repeating-linear-gradient(90deg, hsl(0 0% 96%) 0 1px, hsl(0 0% 88%) 1px 2px)",
            borderRadius: 2,
          }}
        />

        {/* Lombada — só aparece quando "aberto" pelo hover */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 opacity-0 transition-opacity duration-500 group-hover/livro:opacity-100"
          style={{
            left: 0,
            width: depth,
            transform: `translateZ(-${depth / 2}px) translateX(-${depth / 2}px) rotateY(-90deg)`,
            background: `linear-gradient(180deg, ${color}, color-mix(in oklab, ${color} 70%, black))`,
            borderRadius: 2,
          }}
        />

        {/* Capa */}
        <div
          className="absolute inset-0 overflow-hidden flex flex-col bg-white"
          style={{
            borderRadius: radius,
            boxShadow:
              "0 12px 24px -16px rgba(0,0,0,.25), 0 2px 6px rgba(0,0,0,.08), inset 0 0 0 1px rgba(0,0,0,.06)",
          }}
        >
          {/* Bloco superior colorido */}
          <div
            className="relative"
            style={{
              background: color,
              height: "52%",
            }}
          >
            {showStripe && (
              <span
                aria-hidden
                className="absolute left-0 right-0"
                style={{
                  bottom: "18%",
                  height: 6,
                  background: "color-mix(in oklab, " + color + " 55%, black)",
                  opacity: 0.55,
                }}
              />
            )}
          </div>

          {/* Área branca inferior com título e marcador */}
          <div
            className="flex-1 flex flex-col justify-between"
            style={{ padding: Math.max(12, w * 0.08), color: textColor }}
          >
            <h4
              className="font-anek font-bold leading-tight"
              style={{
                fontSize: Math.max(13, w * 0.085),
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h4>
            <div className="opacity-95" style={{ color: textColor }}>
              {illustration ?? defaultIllustration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Variantes para a documentação ============ */

export function LivroDefault() {
  return <Livro title="The user experience of the Frontend Cloud" />;
}

export function LivroVariants() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
      <Livro
        title="The user experience of the Frontend Cloud"
        variant="simple"
        width={196}
      />
      <Livro
        title="The user experience of the Frontend Cloud"
        variant="stripe"
        width={196}
      />
    </div>
  );
}

export function LivroCustomColor() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro
        color="#9D2127"
        textColor="#111"
        title="How Vercel improves your website's search engine ranking"
      />
      <Livro
        color="#7DC1C1"
        textColor="#111"
        title="Design Engineering at Vercel"
        variant="simple"
      />
      <Livro
        color="#F0BF4F"
        textColor="#111"
        title="The user experience of the Frontend Cloud"
      />
    </div>
  );
}

export function LivroResponsivo() {
  return (
    <Livro
      title="The user experience of the Frontend Cloud"
      width={{ sm: 150, md: 196 }}
    />
  );
}
