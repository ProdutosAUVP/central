import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, Loader, Sparkles, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/widgets/Tag";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  marcosOrdenados,
  indiceMarcoAtual,
  type Marco,
  type MarcoStatus,
} from "@/data/roadmapMarcos";

/* ── Geometria da onda ────────────────────────────────────────────────────
   Os marcos são distribuídos com passo constante (stride) e a onda é uma
   cossenoide de meio período por passo. Assim cada marco cai exatamente numa
   crista (índice par) ou num vale (índice ímpar) — e é isso que decide se o
   cartão nasce acima ou abaixo da linha, sem nenhum cálculo extra.

   Duas medidas: a ampla (sm+) e a compacta (telas estreitas), em que passo e
   cartão encolhem para que o marco vizinho continue aparecendo na borda. */
interface Geo {
  stride: number;  // distância horizontal entre marcos
  pad: number;     // respiro antes do primeiro e depois do último marco
  amp: number;     // amplitude da onda
  mid: number;     // eixo central da onda dentro da faixa
  h: number;       // altura da faixa
  cardW: number;
  cardH: number;
  gap: number;     // vão entre o nó e o cartão
}

const GEO_AMPLA:    Geo = { stride: 300, pad: 168, amp: 46, mid: 230, h: 460, cardW: 232, cardH: 140, gap: 32 };
const GEO_COMPACTA: Geo = { stride: 224, pad: 126, amp: 42, mid: 224, h: 450, cardW: 186, cardH: 150, gap: 26 };

const nX = (g: Geo, i: number) => g.pad + g.stride * i;
const nY = (g: Geo, i: number) => g.mid - g.amp * (i % 2 === 0 ? 1 : -1);
const ondaY = (g: Geo, x: number, fase = 0, amp = g.amp) =>
  g.mid - amp * Math.cos((Math.PI * (x - g.pad)) / g.stride + fase);

/** Caminho da onda amostrado a cada 8px — suave o bastante e barato de gerar. */
function caminhoOnda(g: Geo, largura: number, fase = 0, amp = g.amp): string {
  const pontos: string[] = [];
  for (let x = 0; x <= largura; x += 8) pontos.push(`${x} ${ondaY(g, x, fase, amp).toFixed(2)}`);
  pontos.push(`${largura} ${ondaY(g, largura, fase, amp).toFixed(2)}`);
  return `M ${pontos.join(" L ")}`;
}

/** Alterna para a medida compacta em telas estreitas (abaixo do breakpoint sm). */
function useGeometria(): Geo {
  const [compacta, setCompacta] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setCompacta(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return compacta ? GEO_COMPACTA : GEO_AMPLA;
}

const statusConfig: Record<MarcoStatus, { label: string; icon: React.ElementType; classe: string }> = {
  "concluido":    { label: "Entregue",   icon: CheckCircle2,  classe: "text-[hsl(var(--success))]" },
  "em-andamento": { label: "Rolando",    icon: Loader,        classe: "text-primary" },
  "planejado":    { label: "Vem por aí", icon: Sparkles,      classe: "text-muted-foreground" },
  "adiado":       { label: "Adiada",     icon: CalendarClock, classe: "text-[hsl(var(--warning))]" },
};

/**
 * Posição, em px, da linha do "hoje" sobre a onda. Interpola entre o último
 * marco que já passou e o próximo, para a trilha colorida parar exatamente
 * onde estamos no ano.
 */
function xDeHoje(g: Geo, hoje: string, largura: number): number {
  const passados = marcosOrdenados.filter((m) => m.data <= hoje).length;
  if (passados === 0) return 0;
  if (passados === marcosOrdenados.length) return largura;
  const t0 = new Date(marcosOrdenados[passados - 1].data).getTime();
  const t1 = new Date(marcosOrdenados[passados].data).getTime();
  const t  = new Date(hoje).getTime();
  const frac = t1 === t0 ? 0 : Math.min(Math.max((t - t0) / (t1 - t0), 0), 1);
  return nX(g, passados - 1) + frac * g.stride;
}

/* ── Cartão de um marco ───────────────────────────────────────────────────── */

function MarcoCard({ marco, ativo }: { marco: Marco; ativo: boolean }) {
  const cfg = statusConfig[marco.status];
  const Icon = cfg.icon;
  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl border bg-card p-3 sm:p-3.5 text-left flex flex-col gap-1.5 overflow-hidden",
        "transition-[transform,box-shadow,border-color] duration-300 ease-apple",
        ativo
          ? "border-primary/50 shadow-xl -translate-y-0.5"
          : "sm:group-hover:border-primary/30 sm:group-hover:shadow-lg sm:group-hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg leading-none shrink-0" aria-hidden="true">{marco.emoji}</span>
        <Tag tone={marco.tone} className="text-[9px] truncate">{marco.periodo}</Tag>
      </div>
      <p className="font-bold font-anek text-foreground text-[13px] sm:text-sm leading-tight line-clamp-2">
        {marco.titulo}
      </p>
      <p className="text-[11px] text-muted-foreground font-roboto leading-snug line-clamp-2">
        {marco.descricao}
      </p>
      <span className={cn("mt-auto inline-flex items-center gap-1 text-[9px] font-bold font-roboto uppercase tracking-wider", cfg.classe)}>
        <Icon className="h-3 w-3 shrink-0" />
        {cfg.label}
      </span>
    </div>
  );
}

/* ── Trilha ───────────────────────────────────────────────────────────────── */

export function RoadmapTimeline() {
  const marcos = marcosOrdenados;
  const total = marcos.length;
  const g = useGeometria();
  const W = g.pad * 2 + g.stride * (total - 1);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(() => indiceMarcoAtual());
  const reducedMotion = useReducedMotion();

  const hoje = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const progressoX = useMemo(() => xDeHoje(g, hoje, W), [g, hoje, W]);

  const ondaPrincipal = useMemo(() => caminhoOnda(g, W), [g, W]);
  /* As fitas de fundo são desenhadas um período mais longas que a trilha
     para que, ao deslizarem esse mesmo período, nunca deixem buraco na
     ponta direita — o excedente fica fora do viewBox e é cortado. */
  const periodo = g.stride * 2;
  const ondaFundo1 = useMemo(() => caminhoOnda(g, W + periodo, 0.45, g.amp * 0.8), [g, W, periodo]);
  const ondaFundo2 = useMemo(() => caminhoOnda(g, W + periodo, -0.45, g.amp * 0.9), [g, W, periodo]);

  /** Régua de períodos sob a trilha — um rótulo por período, na ordem da onda. */
  const regua = useMemo(() => {
    const vistos = new Map<string, number>();
    marcos.forEach((m, i) => { if (!vistos.has(m.periodo)) vistos.set(m.periodo, i); });
    return Array.from(vistos, ([periodo, indice]) => ({ periodo, indice }));
  }, [marcos]);

  const irPara = useCallback((i: number, suave = true) => {
    const alvo = Math.min(Math.max(i, 0), total - 1);
    setAtivo(alvo);
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({
      left: nX(g, alvo) - el.clientWidth / 2,
      behavior: suave && !reducedMotion ? "smooth" : "auto",
    });
  }, [g, total, reducedMotion]);

  /* Abre já centralizado no marco do momento — sem animação, para não
     "puxar" a página assim que a seção entra na tela. Recentraliza também
     quando a medida troca (rotação de tela, redimensionamento). */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = nX(g, indiceMarcoAtual()) - el.clientWidth / 2;
  }, [g]);

  /* Rolagem manual manda no marco em foco: o cartão mais próximo do centro
     da janela vira o ativo, mantendo régua e painel sempre em sincronia. */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const centro = el.scrollLeft + el.clientWidth / 2;
      const i = Math.round((centro - g.pad) / g.stride);
      setAtivo(Math.min(Math.max(i, 0), total - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [g, total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); irPara(ativo + 1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); irPara(ativo - 1); }
  };

  const marcoAtivo = marcos[ativo];
  const cfgAtivo = statusConfig[marcoAtivo.status];
  const IconAtivo = cfgAtivo.icon;

  return (
    <div className="rounded-3xl border bg-card overflow-hidden">
      {/* ── Faixa da onda ────────────────────────────────────────────── */}
      <div className="relative">
        {/* Cenário: brilhos e triângulos flutuando ao fundo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-primary/[0.04]" />
          <div className="absolute -left-16 top-4 h-56 w-56 rounded-full bg-[hsl(var(--chart-5)/0.10)] blur-3xl" />
          <div className="absolute right-0 -bottom-16 h-64 w-64 rounded-full bg-[hsl(var(--chart-3)/0.10)] blur-3xl" />
          <div className="absolute left-1/3 -top-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* Setas */}
        <button
          onClick={() => irPara(ativo - 1)}
          disabled={ativo === 0}
          aria-label="Marco anterior"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border bg-background/80 backdrop-blur text-foreground shadow-lg transition-[opacity,transform,border-color] duration-300 ease-apple disabled:opacity-30 sm:hover:border-primary/40 sm:hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={() => irPara(ativo + 1)}
          disabled={ativo === total - 1}
          aria-label="Próximo marco"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border bg-background/80 backdrop-blur text-foreground shadow-lg transition-[opacity,transform,border-color] duration-300 ease-apple disabled:opacity-30 sm:hover:border-primary/40 sm:hover:scale-105"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Véus laterais — deixam claro que a trilha continua para os lados */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 bg-gradient-to-r from-card to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 bg-gradient-to-l from-card to-transparent" aria-hidden="true" />

        <div
          ref={scrollerRef}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-label="Trilha de marcos do Time de Produto"
          className="relative overflow-x-auto overflow-y-hidden timeline-scrollbar outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          style={{ scrollSnapType: "x proximity" }}
        >
          <div className="relative" style={{ width: W, height: g.h }}>
            <svg
              width={W}
              height={g.h}
              viewBox={`0 0 ${W} ${g.h}`}
              className="absolute inset-0"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="rt-onda" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
                  <stop offset="0%"   style={{ stopColor: "hsl(var(--chart-1))" }} />
                  <stop offset="35%"  style={{ stopColor: "hsl(var(--chart-5))" }} />
                  <stop offset="70%"  style={{ stopColor: "hsl(var(--chart-3))" }} />
                  <stop offset="100%" style={{ stopColor: "hsl(var(--chart-2))" }} />
                </linearGradient>
                <clipPath id="rt-feito">
                  <rect x="0" y="0" width={Math.max(progressoX, 0)} height={g.h} />
                </clipPath>
                <filter id="rt-glow" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
              </defs>

              {/* Ondas de fundo — correm de leve, como água sob a trilha */}
              <g
                className={reducedMotion ? undefined : "roadmap-fita"}
                style={{ "--periodo": `${periodo}px`, "--dur": "18s" } as React.CSSProperties}
              >
                <path d={ondaFundo1} fill="none" stroke="url(#rt-onda)" strokeWidth="14" strokeLinecap="round" opacity="0.10" />
              </g>
              <g
                className={reducedMotion ? undefined : "roadmap-fita"}
                style={{ "--periodo": `${periodo}px`, "--dur": "11s" } as React.CSSProperties}
              >
                <path d={ondaFundo2} fill="none" stroke="url(#rt-onda)" strokeWidth="9" strokeLinecap="round" opacity="0.14" />
              </g>

              {/* Trecho ainda por vir — pontilhado que caminha para a frente */}
              <path
                d={ondaPrincipal}
                className={reducedMotion ? undefined : "roadmap-porvir"}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 12"
              />

              {/* Trecho já percorrido — colorido, com brilho que respira */}
              <g clipPath="url(#rt-feito)">
                <path
                  d={ondaPrincipal}
                  className={reducedMotion ? undefined : "roadmap-luz"}
                  fill="none" stroke="url(#rt-onda)" strokeWidth="10" strokeLinecap="round"
                  opacity="0.35" filter="url(#rt-glow)"
                />
                <path d={ondaPrincipal} fill="none" stroke="url(#rt-onda)" strokeWidth="4" strokeLinecap="round" />
                {/* Conta de luz percorrendo a trilha até o "hoje". Vai em
                    --primary (verde no claro, dourado no escuro) porque
                    branco sobre o cartão claro some: a linha só pareceria
                    falhada em vez de acesa. */}
                {!reducedMotion && (
                  <g>
                    <circle r="15" fill="hsl(var(--primary))" opacity="0.3" filter="url(#rt-glow)" />
                    <circle r="6" fill="hsl(var(--primary))" />
                    <circle r="2.2" fill="hsl(var(--primary-foreground))" />
                    <animateMotion dur="7s" repeatCount="indefinite" path={ondaPrincipal} />
                  </g>
                )}
              </g>

              {/* Marca do "hoje" sobre a onda */}
              {progressoX > 0 && progressoX < W && (
                <g>
                  <line
                    x1={progressoX} y1={ondaY(g, progressoX) - 74}
                    x2={progressoX} y2={ondaY(g, progressoX) + 62}
                    stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5"
                  />
                  <rect
                    x={progressoX - 25} y={ondaY(g, progressoX) - 91}
                    width="50" height="18" rx="9"
                    fill="hsl(var(--primary))"
                  />
                  <text
                    x={progressoX} y={ondaY(g, progressoX) - 78}
                    textAnchor="middle"
                    className="font-roboto"
                    style={{ fill: "hsl(var(--primary-foreground))", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}
                  >
                    HOJE
                  </text>
                  <circle cx={progressoX} cy={ondaY(g, progressoX)} r="5" fill="hsl(var(--primary))" />
                  <circle cx={progressoX} cy={ondaY(g, progressoX)} r="5" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5">
                    {!reducedMotion && (
                      <>
                        <animate attributeName="r" values="5;16;5" dur="2.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" repeatCount="indefinite" />
                      </>
                    )}
                  </circle>
                </g>
              )}

              {/* Nós + hastes que ligam cada nó ao seu cartão */}
              {marcos.map((m, i) => {
                const x = nX(g, i), y = nY(g, i);
                const acima = i % 2 === 0;
                const feito = m.status === "concluido";
                const rolando = m.status === "em-andamento";
                const adiado = m.status === "adiado";
                const cheio = feito || rolando;
                const selecionado = i === ativo;
                return (
                  <g key={m.id}>
                    <line
                      x1={x} y1={acima ? y - 11 : y + 11}
                      x2={x} y2={acima ? y - g.gap : y + g.gap}
                      stroke={selecionado ? "hsl(var(--primary))" : "hsl(var(--border))"}
                      strokeWidth="2"
                    />
                    {selecionado && (
                      <circle cx={x} cy={y} r="18" fill="hsl(var(--primary))" opacity="0.16" />
                    )}
                    {rolando && !reducedMotion && (
                      <circle cx={x} cy={y} r="11" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
                        <animate attributeName="r" values="11;20;11" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={x} cy={y} r="11" fill="hsl(var(--card))" />
                    {/* Adiado: anel tracejado em âmbar — some da trilha cheia
                        sem sumir do mapa, mesmo estando no trecho já passado. */}
                    <circle
                      cx={x} cy={y} r="9"
                      fill={cheio ? "hsl(var(--primary))" : "hsl(var(--card))"}
                      stroke={
                        cheio ? "hsl(var(--primary))"
                        : adiado ? "hsl(var(--warning))"
                        : "hsl(var(--muted-foreground))"
                      }
                      strokeWidth="2.5"
                      strokeDasharray={adiado ? "3.5 3" : undefined}
                      opacity={cheio || adiado ? 1 : 0.55}
                    />
                    {feito && <circle cx={x} cy={y} r="3.2" fill="hsl(var(--primary-foreground))" />}
                  </g>
                );
              })}
            </svg>

            {/* Cartões — crista para cima, vale para baixo */}
            {marcos.map((m, i) => {
              const x = nX(g, i), y = nY(g, i);
              const acima = i % 2 === 0;
              return (
                <button
                  key={m.id}
                  onClick={() => irPara(i)}
                  aria-current={i === ativo ? "true" : undefined}
                  className="group absolute z-10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                  style={{
                    left: x - g.cardW / 2,
                    top: acima ? y - g.gap - g.cardH : y + g.gap,
                    width: g.cardW,
                    height: g.cardH,
                    scrollSnapAlign: "center",
                  }}
                >
                  <MarcoCard marco={m} ativo={i === ativo} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Régua de períodos ────────────────────────────────────────── */}
      <div className="border-t bg-muted/20 px-3 py-2.5">
        <div className="flex items-center justify-start sm:justify-center gap-1 overflow-x-auto no-scrollbar">
          {regua.map(({ periodo, indice }) => {
            const selecionado = marcoAtivo.periodo === periodo;
            return (
              <button
                key={periodo}
                onClick={() => irPara(indice)}
                className={cn(
                  "relative shrink-0 px-2.5 py-1 text-[11px] font-semibold font-roboto whitespace-nowrap transition-colors duration-300",
                  selecionado ? "text-primary" : "text-muted-foreground sm:hover:text-foreground"
                )}
              >
                {periodo}
                <span
                  className={cn(
                    "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary origin-center transition-transform duration-300 ease-apple",
                    selecionado ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Painel do marco em foco ──────────────────────────────────── */}
      <div className="border-t px-4 sm:px-6 py-5">
        <div key={marcoAtivo.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
          <div className="flex items-start gap-3 flex-wrap">
            <span className="text-2xl leading-none shrink-0" aria-hidden="true">{marcoAtivo.emoji}</span>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold font-anek text-foreground text-base sm:text-lg leading-tight">
                  {marcoAtivo.titulo}
                </h3>
                <Tag tone={marcoAtivo.tone} className="text-[9px]">
                  <IconAtivo className="h-3 w-3" />
                  {cfgAtivo.label}
                </Tag>
              </div>
              <p className="mt-0.5 text-xs font-roboto text-muted-foreground">
                {marcoAtivo.quando}
                {marcoAtivo.dataAssumida && (
                  <span className="ml-1.5 italic opacity-80">(data aproximada)</span>
                )}
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground font-roboto leading-relaxed max-w-3xl">
            {marcoAtivo.descricao}
          </p>

          {marcoAtivo.detalhes && (
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {marcoAtivo.detalhes.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-roboto text-muted-foreground leading-snug">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          )}

          {(marcoAtivo.to || marcoAtivo.href) && (
            <div className="mt-4">
              {marcoAtivo.to ? (
                <Link
                  to={marcoAtivo.to}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold font-roboto text-primary sm:hover:underline"
                >
                  Ver na Central
                  <ChevronRight className="h-3.5 w-3.5 sm:group-hover:translate-x-0.5 transition-transform duration-300 ease-apple" />
                </Link>
              ) : (
                <a
                  href={marcoAtivo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold font-roboto text-primary sm:hover:underline"
                >
                  Abrir link
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
