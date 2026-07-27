import React, { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { olhoBranco } from "@/assets/olhos";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Nossa estrutura — infográfico isométrico ("ecossistema" de áreas).
 *
 * O Produto é o cubo central luminoso; as demais áreas são cubos coloridos
 * de tamanhos variados assentados numa grade isométrica (projeção 2:1).
 * Linhas de energia percorrem o chão ligando o centro a cada área, com
 * pontos de luz em movimento. Passe o mouse (ou foque/clique) num cubo
 * para ver a descrição da área — a copy é a mesma da versão anterior.
 *
 * Os cubos flutuam e a cena "vaza" do card (overflow visível + margens
 * negativas) para reforçar a tridimensionalidade. prefers-reduced-motion:
 * animações CSS são neutralizadas globalmente no index.css e os pontos
 * SMIL são omitidos via useReducedMotion.
 */

export interface AreaEstrutura {
  area: string;
  icon: LucideIcon;
  desc: string;
}

// ─── Projeção isométrica 2:1 ─────────────────────────────────────────────────
// Coordenadas de grade (gx, gy) → tela: x cresce para a direita-baixo no eixo
// gx e para a esquerda-baixo no eixo gy. G é a meia-largura de um tile.
const G = 24;
const iso = (gx: number, gy: number) => ({ x: (gx - gy) * G, y: (gx + gy) * (G / 2) });

const VB = { x: -280, y: -206, w: 560, h: 366 }; // viewBox da cena
const PLANE = 5; // grade de -5..5 tiles

type Anchor = "above" | "below";

interface CubeSpec {
  g: [number, number];          // posição na grade
  w: number;                    // meia-largura do cubo (px de tela)
  h: number;                    // altura do cubo
  hsl: [number, number, number];// cor base da área
  anchor: Anchor;               // lado do rótulo/popover
  route: [number, number][];    // caminho da linha no chão, a partir do centro
}

// Layout fixo: 4 cubos grandes nos pontos cardeais da grade e 4 menores nas
// diagonais de tela, com rotas em L que desviam dos cubos intermediários.
const SPECS: Record<string, CubeSpec> = {
  Tecnologia:  { g: [-3.5, -3.5], w: 34, h: 40, hsl: [152, 68, 38], anchor: "above", route: [[0, 0], [0, -1.5], [-3.5, -1.5], [-3.5, -3.5]] },
  Vendas:      { g: [3.5, -3.5],  w: 31, h: 36, hsl: [38, 92, 48],  anchor: "above", route: [[0, 0], [1.5, 0], [1.5, -3.5], [3.5, -3.5]] },
  Atendimento: { g: [-3.5, 3.5],  w: 31, h: 36, hsl: [205, 78, 46], anchor: "above", route: [[0, 0], [-1.5, 0], [-1.5, 3.5], [-3.5, 3.5]] },
  Consultoria: { g: [3.5, 3.5],   w: 29, h: 32, hsl: [265, 60, 54], anchor: "below", route: [[0, 0], [0, 1.5], [3.5, 1.5], [3.5, 3.5]] },
  Marketing:   { g: [0, -3],      w: 22, h: 25, hsl: [15, 78, 50],  anchor: "above", route: [[0, 0], [0, -3]] },
  Audiovisual: { g: [-3, 0],      w: 18, h: 20, hsl: [330, 70, 52], anchor: "above", route: [[0, 0], [-3, 0]] },
  Financeiro:  { g: [0, 3],       w: 20, h: 22, hsl: [175, 60, 36], anchor: "below", route: [[0, 0], [0, 3]] },
  Jurídico:    { g: [3, 0],       w: 16, h: 17, hsl: [220, 26, 46], anchor: "below", route: [[0, 0], [3, 0]] },
};

const CENTER = { w: 48, h: 52 }; // cubo do Produto

// Faces de um cubo cuja base (losango inferior) está centrada em (cx, cy)
function cubeFaces(cx: number, cy: number, w: number, h: number) {
  const t = w / 2;
  return {
    top:   `${cx},${cy - t - h} ${cx + w},${cy - h} ${cx},${cy + t - h} ${cx - w},${cy - h}`,
    left:  `${cx - w},${cy - h} ${cx},${cy + t - h} ${cx},${cy + t} ${cx - w},${cy}`,
    right: `${cx},${cy + t - h} ${cx + w},${cy - h} ${cx + w},${cy} ${cx},${cy + t}`,
  };
}

const hsl = (h: number, s: number, l: number, a?: number) =>
  a === undefined ? `hsl(${h} ${s}% ${l}%)` : `hsl(${h} ${s}% ${l}% / ${a})`;

// Sombreamento clássico de iso: topo mais claro, face esquerda mais escura
const faceFills = ([h, s, l]: [number, number, number]) => ({
  top: hsl(h, Math.max(s - 8, 0), Math.min(l + 15, 92)),
  left: hsl(h, Math.min(s + 4, 100), Math.max(l - 13, 8)),
  right: hsl(h, s, l),
});

const routePath = (route: [number, number][]) =>
  route.map(([gx, gy], i) => { const p = iso(gx, gy); return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`; }).join(" ");

// Pontos fixos da grade que "cintilam" como nós de energia
const SPARKLES: [number, number][] = [[-2, -2], [2, 1], [-1, 3], [4, -2], [-4, -1], [1, -4], [-2, 4]];
// Tiles levemente preenchidos para dar textura ao chão
const TILES: [number, number][] = [[-2, -4], [1, -2], [-4, 1], [2, 2], [4, -1], [-1, 4], [3, -4], [-4, -3]];

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

export function EstruturaIsometrica({ items }: { items: AreaEstrutura[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [sceneRef, inView] = useInView();
  const reducedMotion = useReducedMotion();

  const open = hovered ?? active;

  // Apenas áreas com posição definida entram na cena; ordena do fundo para a
  // frente (algoritmo do pintor) pela profundidade gx + gy.
  const placed = items
    .filter((it) => SPECS[it.area])
    .sort((a, b) => (SPECS[a.area].g[0] + SPECS[a.area].g[1]) - (SPECS[b.area].g[0] + SPECS[b.area].g[1]));

  const openItem = open ? items.find((it) => it.area === open) : null;
  const openSpec = open ? SPECS[open] : null;

  // Posição do popover em % do container (o SVG escala com a largura)
  let popStyle: React.CSSProperties | null = null;
  if (openItem && openSpec) {
    const p = iso(openSpec.g[0], openSpec.g[1]);
    const anchorY = openSpec.anchor === "above" ? p.y - openSpec.h - openSpec.w / 2 - 8 : p.y + openSpec.w / 2 + 14;
    const tx = p.x < -140 ? "-14%" : p.x > 140 ? "-86%" : "-50%";
    popStyle = {
      left: `${((p.x - VB.x) / VB.w) * 100}%`,
      top: `${((anchorY - VB.y) / VB.h) * 100}%`,
      transform: `translate(${tx}, ${openSpec.anchor === "above" ? "-100%" : "0"})`,
    };
  }

  const centerFaces = cubeFaces(0, 0, CENTER.w, CENTER.h);

  return (
    <>
      {/* Desktop: cena isométrica */}
      <div className="hidden lg:block shrink-0">
        <div
          ref={sceneRef}
          className="relative select-none w-[540px] xl:w-[600px] lg:-my-10 xl:-mr-2"
          onMouseLeave={() => setHovered(null)}
        >
          <svg
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            className="w-full h-auto overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="estru-fade" gradientUnits="userSpaceOnUse" cx="0" cy="-10" r="300">
                <stop offset="0%" stopColor="white" />
                <stop offset="55%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>
              <mask id="estru-mask">
                <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill="url(#estru-fade)" />
              </mask>
              <radialGradient id="estru-glow" gradientUnits="userSpaceOnUse" cx="0" cy="-30" r="105">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.4)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
              </radialGradient>
              <filter id="estru-blur" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* ── Chão: grade isométrica com fade radial ── */}
            <g mask="url(#estru-mask)">
              {TILES.map(([i, j], k) => {
                const a = iso(i, j), b = iso(i + 1, j), c = iso(i + 1, j + 1), d = iso(i, j + 1);
                return <polygon key={k} points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="hsl(var(--foreground) / 0.04)" />;
              })}
              {Array.from({ length: PLANE * 2 + 1 }, (_, i) => i - PLANE).map((k) => {
                const a1 = iso(k, -PLANE), b1 = iso(k, PLANE);
                const a2 = iso(-PLANE, k), b2 = iso(PLANE, k);
                return (
                  <g key={k} stroke="hsl(var(--foreground) / 0.12)" strokeWidth={1}>
                    <line x1={a1.x} y1={a1.y} x2={b1.x} y2={b1.y} />
                    <line x1={a2.x} y1={a2.y} x2={b2.x} y2={b2.y} />
                  </g>
                );
              })}
              {/* Nós que cintilam na grade */}
              {SPARKLES.map(([gx, gy], i) => {
                const p = iso(gx, gy);
                return (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y} r={1.4}
                    fill="hsl(var(--foreground) / 0.45)"
                    style={{ animation: `estrutura-glow ${3 + (i % 3)}s ease-in-out ${i * 0.7}s infinite` }}
                  />
                );
              })}
            </g>

            {/* ── Linhas de conexão animadas (no chão, sob os cubos) ── */}
            {placed.map((it, i) => {
              const spec = SPECS[it.area];
              const d = routePath(spec.route);
              const bends = spec.route.slice(1, -1).map(([gx, gy]) => iso(gx, gy));
              return (
                <g key={it.area}>
                  <path d={d} fill="none" stroke="hsl(var(--foreground) / 0.22)" strokeWidth={1} strokeDasharray="1 5" strokeLinecap="round" />
                  {/* pulso de energia percorrendo a linha */}
                  <path
                    d={d} fill="none" stroke="hsl(var(--primary) / 0.55)" strokeWidth={1.5}
                    strokeDasharray="14 142" strokeLinecap="round"
                    style={{ animation: `estrutura-dash ${3 + (i % 4) * 0.4}s linear ${i * 0.35}s infinite` }}
                  />
                  {bends.map((b, j) => (
                    <circle key={j} cx={b.x} cy={b.y} r={1.7} fill="hsl(var(--foreground) / 0.35)" />
                  ))}
                  {/* ponto de luz viajando do centro até a área */}
                  {!reducedMotion && (
                    <g>
                      <animateMotion dur={`${2.8 + (i % 4) * 0.45}s`} begin={`${i * 0.55}s`} repeatCount="indefinite" path={d} />
                      <circle r={4.5} fill="hsl(var(--primary) / 0.25)" />
                      <circle r={1.9} fill="hsl(var(--primary))" />
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── Halo luminoso do Produto ── */}
            <circle
              cx={0} cy={-30} r={105}
              fill="url(#estru-glow)"
              style={{ animation: "estrutura-glow 4s ease-in-out infinite" }}
            />

            {/* ── Cubos das áreas (fundo → frente) + cubo central ── */}
            {(() => {
              const nodes: React.ReactNode[] = [];
              let centerDrawn = false;

              const drawCenter = () => (
                <g key="produto" style={inView ? { animation: "estrutura-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both" } : { opacity: 0 }}>
                  <ellipse cx={0} cy={4} rx={CENTER.w * 1.2} ry={CENTER.w * 0.5} fill="hsl(0 0% 0% / 0.22)" filter="url(#estru-blur)" />
                  <g style={{ animation: "estrutura-float 6s ease-in-out infinite" }}>
                    <polygon points={centerFaces.left} fill="hsl(216 16% 78%)" />
                    <polygon points={centerFaces.right} fill="hsl(210 22% 88%)" />
                    <polygon points={centerFaces.top} fill="hsl(0 0% 99%)" />
                    {/* rótulo aplicado na face frontal-direita, acompanhando o plano do cubo */}
                    <text
                      transform="matrix(1 -0.5 0 1 24 -12)"
                      textAnchor="middle"
                      fontSize={9.5}
                      fontWeight={800}
                      letterSpacing={1.5}
                      textLength={38}
                      lengthAdjust="spacingAndGlyphs"
                      fill="hsl(var(--brand-dark))"
                      className="font-anek"
                    >
                      PRODUTO
                    </text>
                  </g>
                </g>
              );

              placed.forEach((it, i) => {
                const spec = SPECS[it.area];
                const depth = spec.g[0] + spec.g[1];
                if (!centerDrawn && depth > 0) { nodes.push(drawCenter()); centerDrawn = true; }

                const p = iso(spec.g[0], spec.g[1]);
                const faces = cubeFaces(p.x, p.y, spec.w, spec.h);
                const fills = faceFills(spec.hsl);
                const topY = p.y - spec.h - spec.w / 2;
                const botY = p.y + spec.w / 2;
                const isOpen = open === it.area;
                const dimmed = open !== null && !isOpen;

                nodes.push(
                  <g
                    key={it.area}
                    role="button"
                    tabIndex={0}
                    aria-label={`${it.area}: ${it.desc}`}
                    className="cursor-pointer outline-none"
                    style={inView ? { animation: `estrutura-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.18 + i * 0.09}s both` } : { opacity: 0 }}
                    onMouseEnter={() => setHovered(it.area)}
                    onMouseLeave={() => setHovered((h) => (h === it.area ? null : h))}
                    onFocus={() => setHovered(it.area)}
                    onBlur={() => setHovered((h) => (h === it.area ? null : h))}
                    onClick={() => setActive((a) => (a === it.area ? null : it.area))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive((a) => (a === it.area ? null : it.area)); }
                      if (e.key === "Escape") { setActive(null); setHovered(null); }
                    }}
                  >
                    <g className={cn("transition-opacity duration-300 ease-apple", dimmed && "opacity-50")}>
                      <ellipse cx={p.x} cy={p.y + 2} rx={spec.w * 1.2} ry={spec.w * 0.5} fill="hsl(0 0% 0% / 0.2)" filter="url(#estru-blur)" />
                      <g style={{ animation: `estrutura-float ${5 + (i % 3)}s ease-in-out ${i * 0.5}s infinite` }}>
                        <g
                          className="transition-transform duration-300 ease-apple"
                          style={{ transformBox: "fill-box", transformOrigin: "center", transform: isOpen ? "scale(1.09)" : undefined }}
                        >
                          <polygon points={faces.left} fill={fills.left} />
                          <polygon points={faces.right} fill={fills.right} />
                          <polygon points={faces.top} fill={fills.top} />
                        </g>
                        {/* rótulo com linha-guia pontilhada, como num infográfico */}
                        {spec.anchor === "above" ? (
                          <>
                            <line x1={p.x} y1={topY - 5} x2={p.x} y2={topY - 22} stroke="hsl(var(--foreground) / 0.5)" strokeWidth={1.2} strokeDasharray="1 4" strokeLinecap="round" />
                            <text x={p.x} y={topY - 29} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="hsl(var(--foreground))" className="font-anek">
                              {it.area}
                            </text>
                          </>
                        ) : (
                          <>
                            <line x1={p.x} y1={botY + 5} x2={p.x} y2={botY + 20} stroke="hsl(var(--foreground) / 0.5)" strokeWidth={1.2} strokeDasharray="1 4" strokeLinecap="round" />
                            <text x={p.x} y={botY + 34} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="hsl(var(--foreground))" className="font-anek">
                              {it.area}
                            </text>
                          </>
                        )}
                      </g>
                      {/* área de clique generosa (os cubos pequenos são miúdos) */}
                      <circle cx={p.x} cy={p.y - spec.h / 2} r={spec.w + 16} fill="transparent" />
                    </g>
                  </g>
                );
              });

              if (!centerDrawn) nodes.push(drawCenter());
              return nodes;
            })()}
          </svg>

          {/* Popover com a descrição da área (mesma copy de antes) */}
          {openItem && popStyle && (
            <div
              className="absolute z-30 w-[248px] pointer-events-none rounded-2xl border border-primary/40 bg-card p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              style={popStyle}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <openItem.icon className="h-4 w-4" />
                </span>
                <h3 className="font-bold font-anek text-foreground text-sm leading-tight">{openItem.area}</h3>
              </div>
              <p className="text-[11px] text-muted-foreground font-roboto leading-snug mt-2.5">{openItem.desc}</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile / tablet: Produto no topo, áreas em grade */}
      <div className="lg:hidden">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-emerald-700 dark:from-emerald-500 dark:to-emerald-800 shadow-lg ring-4 ring-background flex items-center justify-center">
            <img src={olhoBranco.url} alt="Produto AUVP" className="h-10 w-10" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="rounded-2xl border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-apple hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-bold font-anek text-foreground text-sm">{item.area}</h3>
                </div>
                <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
