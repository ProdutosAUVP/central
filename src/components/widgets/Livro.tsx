import React, { useEffect, useState } from "react";

type Variant = "default" | "simple" | "stripe";
type ResponsiveWidth = number | { sm?: number; md?: number; lg?: number };

type LivroProps = {
  title: string;
  /** Cor de destaque da capa (padrão: amarelo). */
  color?: string;
  /** Cor do texto do título. Ao definir, a capa inteira fica na cor de destaque. */
  textColor?: string;
  width?: ResponsiveWidth;
  variant?: Variant;
  /** Ilustração decorativa exibida na seção superior da capa. */
  illustration?: React.ReactNode;
  /** Ícone/logo exibido na seção superior da capa. */
  icon?: React.ReactNode;
  /** Aplica textura de pontos sobre a capa sólida. */
  textured?: boolean;
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
    if (typeof width === "number") { setW(width); return; }
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
  textColor,
  width = 200,
  variant = "default",
  illustration,
  icon,
  textured = false,
  className,
}: LivroProps) {
  const w = useResponsiveWidth(width);
  const height = Math.round(w * 1.32);
  const depth = Math.max(10, Math.round(w * 0.05));
  const radius = 8;
  const pad = Math.max(12, w * 0.08);

  const showStripe = variant === "stripe";
  const showGroove = variant !== "simple";

  // When textColor is explicit OR textured → full-color cover (no white bottom)
  const isSolidCover = textured || textColor !== undefined;
  const resolvedTextColor = textColor ?? (textured ? "#fff" : "#111");

  // Solid cover: outer container holds the color; top section becomes transparent
  const coverBg = isSolidCover ? color : "#fff";
  const topBg = isSolidCover ? "transparent" : color;

  const grooveIndent = showGroove ? Math.max(4, Math.round(w * 0.025)) : 0;

  return (
    <div
      className={`group/livro ${className ?? ""}`}
      style={{ width: w, height, perspective: 1400 }}
    >
      <div
        className="livro-inner relative w-full h-full transition-transform duration-500 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Pages (right side) — visible on hover */}
        <div
          aria-hidden
          className="absolute top-1 bottom-1 opacity-0 transition-opacity duration-500 group-hover/livro:opacity-100"
          style={{
            right: 0,
            width: depth,
            transform: `translateZ(-${depth / 2}px) translateX(${depth / 2}px) rotateY(90deg)`,
            background: "repeating-linear-gradient(90deg, hsl(0 0% 96%) 0 1px, hsl(0 0% 88%) 1px 2px)",
            borderRadius: 2,
          }}
        />

        {/* Spine — visible on hover */}
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

        {/* Cover */}
        <div
          className="absolute inset-0 overflow-hidden flex flex-col"
          style={{
            borderRadius: radius,
            background: coverBg,
            ...(textured && {
              backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }),
            boxShadow:
              "0 12px 24px -16px rgba(0,0,0,.25), 0 2px 6px rgba(0,0,0,.08), inset 0 0 0 1px rgba(0,0,0,.06)",
          }}
        >
          {/* Spine groove — default variant only */}
          {showGroove && (
            <div
              aria-hidden
              className="absolute top-0 bottom-0 z-10 pointer-events-none"
              style={{ left: 8, width: 1, background: "rgba(0,0,0,.12)" }}
            />
          )}

          {/* Top section — colored area with illustration / icon */}
          <div
            className="relative overflow-hidden"
            style={{ background: topBg, height: "52%" }}
          >
            {showStripe && (
              <span
                aria-hidden
                className="absolute left-0 right-0"
                style={{
                  bottom: "18%",
                  height: 6,
                  background: `color-mix(in oklab, ${color} 55%, black)`,
                  opacity: 0.55,
                }}
              />
            )}
            {illustration && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {illustration}
              </div>
            )}
            {icon && !illustration && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: `color-mix(in oklab, ${color} 15%, #000)` }}
              >
                {icon}
              </div>
            )}
          </div>

          {/* Bottom section — title */}
          <div
            className="flex-1 flex flex-col justify-end"
            style={{
              padding: pad,
              paddingLeft: pad + grooveIndent,
              color: resolvedTextColor,
            }}
          >
            <h4
              className="font-anek font-bold leading-tight"
              style={{ fontSize: Math.max(13, w * 0.085), letterSpacing: "-0.01em" }}
            >
              {title}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline illustrations & icons for showcase ── */

function IllustrationLines() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 84" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={-30 + i * 26} y1={90}
          x2={i * 26 + 56} y2={-10}
          stroke="rgba(0,0,0,.13)" strokeWidth="20"
        />
      ))}
    </svg>
  );
}

function IllustrationDots() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 84" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 17 + 8} cy={row * 17 + 8} r={2.5}
            fill="rgba(0,0,0,.15)"
            opacity={Math.max(0.3, 1 - (col + row) * 0.055)}
          />
        ))
      )}
    </svg>
  );
}

function IconBarChart({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity=".9" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" opacity=".7" />
    </svg>
  );
}

function IconOpenBook({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconCoin({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v1m0 8v1M9.5 9.5C9.5 8.7 10.2 8 11 8h2.5c.8 0 1.5.7 1.5 1.5S14.3 11 13.5 11H11c-.8 0-1.5.7-1.5 1.5S10.2 14 11 14h2.5c.8 0 1.5.7 1.5 1.5S14.3 17 13.5 17H11c-.8 0-1.5-.7-1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Showcase exports ── */

export function LivroDefault() {
  return <Livro title="The user experience of the Frontend Cloud" />;
}

export function LivroVariants() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial">
      <Livro title="The user experience of the Frontend Cloud" variant="simple" width={196} />
      <Livro title="The user experience of the Frontend Cloud" variant="stripe" width={196} />
    </div>
  );
}

export function LivroCustomColor() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro color="#9D2127" title="How Vercel improves your website's search engine ranking" />
      <Livro color="#7DC1C1" textColor="white" title="Design Engineering at Vercel" variant="simple" />
      <Livro color="#FED954" title="The user experience of the Frontend Cloud" />
    </div>
  );
}

export function LivroIcone() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro icon={<IconBarChart size={40} />} title="Fundamentos de Finanças" />
      <Livro icon={<IconOpenBook size={40} />} title="Guia Completo de Investimentos" />
      <Livro icon={<IconCoin size={40} />} title="Renda Fixa na Prática" />
    </div>
  );
}

export function LivroIlustrado() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro illustration={<IllustrationLines />} title="The user experience of the Frontend Cloud" />
      <Livro illustration={<IllustrationDots />} title="The user experience of the Frontend Cloud" variant="simple" />
    </div>
  );
}

export function LivroTamanhos() {
  return (
    <div className="flex flex-row items-baseline justify-start gap-8 flex-initial flex-wrap">
      <Livro title="The user experience of the Frontend Cloud" width={300} />
      <Livro title="The user experience of the Frontend Cloud" width={200} />
      <Livro title="The user experience of the Frontend Cloud" width={150} />
    </div>
  );
}

export function LivroTexturado() {
  return (
    <div className="flex flex-col gap-8 flex-initial">
      <div className="flex flex-row items-baseline justify-start gap-8 flex-wrap">
        <Livro color="#7DC1C1" textured title="Design Engineering at Vercel" />
        <Livro color="#9D2127" textured title="Design Engineering at Vercel" />
        <Livro color="#FED954" textured title="Design Engineering at Vercel" />
      </div>
      <div className="flex flex-row items-baseline justify-start gap-8 flex-wrap">
        <Livro color="#7DC1C1" textColor="white" textured title="Design Engineering at Vercel" variant="simple" />
        <Livro color="#9D2127" textColor="#ece4db" textured title="Design Engineering at Vercel" variant="simple" />
        <Livro color="#FED954" textColor="#9d3b05" textured title="Design Engineering at Vercel" variant="simple" />
      </div>
    </div>
  );
}

export function LivroResponsivo() {
  return <Livro title="The user experience of the Frontend Cloud" width={{ sm: 150, md: 196 }} />;
}
