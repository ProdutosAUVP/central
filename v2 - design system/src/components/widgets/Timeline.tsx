import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2, Clock, AlertCircle, Circle,
  Star, Medal, Award, Crown, Gem, Flame, Trophy,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/* ============================================================
 * 1) Timeline linear (vertical clássica) — legado
 * ============================================================ */

type Status = "done" | "active" | "pending" | "error";
interface LinearItem { status: Status; title: string; description: string; date: string; }

const linearItems: LinearItem[] = [
  { status: "done", title: "Inscrição confirmada", description: "Pagamento aprovado via PIX.", date: "12/01/2026 09:14" },
  { status: "done", title: "Acesso liberado", description: "Plataforma desbloqueada para o aluno.", date: "12/01/2026 09:15" },
  { status: "active", title: "Curso em andamento", description: "Módulo 4 de 8 — Renda Variável.", date: "Hoje" },
  { status: "pending", title: "Certificado", description: "Disponível ao concluir 100% do curso.", date: "Pendente" },
  { status: "error", title: "Avaliação reprovada", description: "Tentativa 1/3 — refazer em 24h.", date: "20/03/2026" },
];

const iconMap = {
  done: { Icon: CheckCircle2, color: "text-success bg-success/15" },
  active: { Icon: Clock, color: "text-accent bg-primary/15 ring-2 ring-primary/30" },
  pending: { Icon: Circle, color: "text-muted-foreground bg-muted" },
  error: { Icon: AlertCircle, color: "text-destructive bg-destructive/15" },
};

function LinearTimeline() {
  return (
    <ol className="relative w-full space-y-6">
      {/* Linha vertical centralizada nos nós (nó = 32px → centro em 16px) */}
      <span
        aria-hidden
        className="absolute left-4 top-2 bottom-2 w-px bg-border -translate-x-1/2"
      />
      {linearItems.map((it, i) => {
        const { Icon, color } = iconMap[it.status];
        return (
          <li key={i} className="relative pl-12 min-h-8">
            <span className="absolute left-0 top-0 h-8 w-8 rounded-full bg-background" aria-hidden />
            <span
              className={cn(
                "absolute left-0 top-0 flex items-center justify-center h-8 w-8 rounded-full",
                color
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <h4 className="font-semibold text-foreground font-anek leading-tight">{it.title}</h4>
            <p className="text-sm text-muted-foreground mt-0.5 font-roboto">{it.description}</p>
            <span className="text-[11px] uppercase tracking-wider font-roboto text-muted-foreground mt-1 block">
              {it.date}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================
 * 2) Timeline de Trilha (Marcos) — horizontal + vertical
 *    Inspirada na Trilha do Embaixador.
 * ============================================================ */

interface Milestone {
  id: number;
  title: string;
  conversionsRequired: number;
  prize: string;
  prizeDescription: string;
}

const milestones: Milestone[] = [
  { id: 1, title: "Primeiros passos",  conversionsRequired: 1,   prize: "Kit boas-vindas", prizeDescription: "Caneca e adesivos exclusivos." },
  { id: 2, title: "Aspirante",         conversionsRequired: 5,   prize: "Camiseta oficial", prizeDescription: "Edição limitada da marca." },
  { id: 3, title: "Embaixador Bronze", conversionsRequired: 15,  prize: "Certificado", prizeDescription: "Diploma físico de reconhecimento." },
  { id: 4, title: "Embaixador Prata",  conversionsRequired: 30,  prize: "Mentoria 1:1", prizeDescription: "1 hora com especialista." },
  { id: 5, title: "Embaixador Ouro",   conversionsRequired: 60,  prize: "Imersão presencial", prizeDescription: "Acesso ao evento anual." },
  { id: 6, title: "Embaixador Platina",conversionsRequired: 100, prize: "Comissão dobrada", prizeDescription: "Bônus permanente nas indicações." },
  { id: 7, title: "Embaixador Master", conversionsRequired: 150, prize: "Viagem internacional", prizeDescription: "Pacote completo para 2 pessoas." },
];

const milestoneIcons: Record<number, React.ElementType> = {
  1: Star, 2: Medal, 3: Award, 4: Crown, 5: Gem, 6: Flame, 7: Trophy,
};

/* ---------- Horizontal (desktop) ---------- */

interface TrilhaHProps {
  current: number;
  selected: number;
  onSelect: (id: number) => void;
}

function HorizontalTrilha({ current, selected, onSelect }: TrilhaHProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const needsScroll = milestones.length > 10;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  const nextIndex = milestones.findIndex((m) => m.id > current);

  return (
    <div className="relative w-full">
      {/* Fades */}
      {needsScroll && canScrollLeft && (
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10" />
      )}
      {needsScroll && canScrollRight && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10" />
      )}

      {/* Setas */}
      {needsScroll && canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 top-6 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {needsScroll && canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 top-6 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
          aria-label="Rolar para a direita"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Scroll area */}
      <div
        ref={scrollRef}
        className={cn(
          "timeline-scrollbar overflow-x-auto pt-6 pb-8",
          needsScroll ? "px-10" : "px-2"
        )}
      >
        <div className={cn("flex items-start", needsScroll ? "min-w-max" : "w-full")}>
          {milestones.map((m, i) => {
            const reached = m.id <= current;
            const isNext = i === nextIndex;
            const isSelected = m.id === selected;
            const Icon = milestoneIcons[m.id] ?? Star;
            const isLast = i === milestones.length - 1;

            // Conector da DIREITA do nó atual (metade esquerda do segmento i→i+1)
            const nextReached = milestones[i + 1]?.id <= current;
            const connectorClass = !isLast
              ? reached
                ? "bg-primary"
                : "bg-border dark:bg-[hsl(145_20%_44%/0.6)]"
              : "";

            return (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col items-center",
                  needsScroll ? "w-[88px] shrink-0" : "flex-1 min-w-[88px]"
                )}
              >
                {/* Linha de nó + conector */}
                <div className="flex items-center w-full">
                  {/* spacer esquerdo (metade do conector) */}
                  <div className={cn("flex-1 h-[3px] transition-colors duration-300", i === 0 ? "bg-transparent" : connectorClassPrev(i, current))} />

                  {/* Nó */}
                  <button
                    type="button"
                    onClick={() => onSelect(m.id)}
                    className={cn(
                      "relative h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0",
                      reached
                        ? "bg-primary border-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
                        : isNext
                        ? "bg-card border-accent text-accent shadow-[0_0_10px_hsl(var(--primary)/0.2)]"
                        : "bg-muted border-border text-muted-foreground",
                      isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                    )}
                    aria-label={m.title}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={reached ? 2.5 : 2}
                      fill={reached ? "currentColor" : "none"}
                    />
                  </button>

                  {/* spacer direito (metade do conector seguinte) */}
                  <div className={cn("flex-1 h-[3px] transition-colors duration-300", isLast ? "bg-transparent" : connectorClass)} />
                </div>

                {/* Label */}
                <div className="w-[88px] text-center mt-3 px-1">
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-wider font-roboto",
                    reached ? "text-accent" : isNext ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {m.conversionsRequired} ind.
                  </p>
                  <p className={cn(
                    "text-[11px] mt-0.5 font-roboto leading-tight line-clamp-2",
                    reached || isNext ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {m.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Conector da ESQUERDA do nó atual (metade direita do segmento i-1→i)
function connectorClassPrev(i: number, current: number) {
  const prevReached = milestones[i - 1]?.id <= current;
  const thisReached = milestones[i]?.id <= current;
  if (thisReached) return "bg-primary";
  if (prevReached) return "bg-border dark:bg-[hsl(145_20%_44%/0.6)]";
  return "bg-border dark:bg-[hsl(145_20%_44%/0.6)]";
}

/* ---------- Vertical (mobile / Trilha mobile) ---------- */

interface TrilhaVProps {
  current: number;
  progressNow: number; // ex.: indicações atuais para barra de progresso
}

function VerticalTrilha({ current, progressNow }: TrilhaVProps) {
  const nextIndex = milestones.findIndex((m) => m.id > current);

  return (
    <ol className="w-full space-y-0">
      {milestones.map((m, i) => {
        const reached = m.id <= current;
        const isNext = i === nextIndex;
        const isLast = i === milestones.length - 1;
        const Icon = milestoneIcons[m.id] ?? Star;

        // Conector
        const nextReached = milestones[i + 1]?.id <= current;
        const connectorClass = reached && nextReached
          ? "bg-primary"
          : reached && !nextReached
          ? "bg-gradient-to-b from-primary to-border"
          : "bg-border";

        // Progresso (só no próximo)
        const remaining = Math.max(0, m.conversionsRequired - progressNow);
        const progressPercent = Math.min(100, (progressNow / m.conversionsRequired) * 100);

        return (
          <li key={m.id} className="flex gap-4">
            {/* Coluna do nó */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className={cn(
                  "h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  reached
                    ? "bg-primary border-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.25)]"
                    : isNext
                    ? "bg-card border-accent text-accent shadow-[0_0_8px_hsl(var(--primary)/0.15)]"
                    : "bg-muted border-border text-muted-foreground"
                )}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  strokeWidth={reached ? 2.5 : 2}
                  fill={reached ? "currentColor" : "none"}
                />
              </div>
              {!isLast && (
                <div className={cn("w-[2px] flex-1 min-h-[16px] my-1 transition-colors duration-300", connectorClass)} />
              )}
            </div>

            {/* Conteúdo */}
            <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-sm font-anek text-foreground">{m.title}</h4>
                {reached && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-success/15 text-success font-roboto">
                    Conquistado
                  </span>
                )}
                {isNext && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/15 text-accent font-roboto">
                    Próximo
                  </span>
                )}
              </div>

              <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground font-roboto mt-1">
                {m.conversionsRequired} indicações
              </p>

              {/* Chip de prêmio */}
              <div className="mt-2 inline-flex flex-col items-start bg-muted px-3 py-2 rounded-xl">
                <p className="text-xs font-bold text-foreground font-roboto">{m.prize}</p>
                <p className="text-[11px] text-muted-foreground font-roboto">{m.prizeDescription}</p>
              </div>

              {/* Progresso só no próximo */}
              {isNext && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-roboto mb-1">
                    <span className="text-muted-foreground">Faltam {remaining} indicações</span>
                    <span className="font-bold text-accent">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================
 * Widget exportado — três variações em abas
 * ============================================================ */

export function TimelineWidget() {
  const [selected, setSelected] = useState(3);
  const current = 3; // último marco conquistado
  const progressNow = 22; // indicações atuais (entre marco 3 e 4)

  return (
    <ComponentShowcase
      title="Timeline (linha do tempo)"
      description="Três variações: Linear (eventos com status semânticos), Trilha Horizontal (marcos com nós conectados — desktop) e Trilha Vertical (mobile, com barra de progresso e prêmios)."
      code={`// Trilha Horizontal — nós conectados com fade lateral e setas
const milestones = [
  { id: 1, title: 'Aspirante', conversionsRequired: 5, ... },
  ...
];

const reached = m.id <= current;       // já conquistado
const isNext  = i === nextIndex;       // próximo marco

<button className={cn(
  "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-200",
  reached
    ? "bg-primary border-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
    : isNext
    ? "bg-card border-accent text-accent shadow-[0_0_10px_hsl(var(--primary)/0.2)]"
    : "bg-muted border-border text-muted-foreground",
  isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
)}>
  <Icon className="h-5 w-5" fill={reached ? 'currentColor' : 'none'} />
</button>

// Conector com gradiente entre nós
const connector = reached && nextReached
  ? "bg-primary"
  : reached
  ? "bg-gradient-to-r from-primary to-border"
  : "bg-border";`}
      htmlCode={`<style>
  .trilha { display:flex; gap:0; align-items:flex-start; padding:8px; }
  .trilha-step { flex:1; display:flex; flex-direction:column; align-items:center; min-width:88px; }
  .trilha-row { display:flex; align-items:center; width:100%; }
  .trilha-line { flex:1; height:3px; background:#e5e7eb; transition:background .3s; }
  .trilha-line.reached { background:hsl(var(--primary)); }
  .trilha-line.gradient { background:linear-gradient(to right, hsl(var(--primary)), #e5e7eb); }
  .trilha-node {
    width:48px; height:48px; border-radius:50%; border:2px solid #e5e7eb;
    background:#f3f4f6; color:#6b7280; display:flex; align-items:center; justify-content:center;
    transition:all .2s; cursor:pointer; flex-shrink:0;
  }
  .trilha-node.reached { background:hsl(var(--primary)); color:#fff; border-color:hsl(var(--primary));
    box-shadow:0 0 16px hsl(var(--primary)/.3); }
  .trilha-node.next { background:#fff; color:hsl(var(--primary)); border-color:hsl(var(--primary));
    box-shadow:0 0 10px hsl(var(--primary)/.2); }
  .trilha-label { width:88px; text-align:center; margin-top:12px; }
  .trilha-label .ind { font:700 10px/1 'Roboto'; text-transform:uppercase; letter-spacing:.08em; color:#6b7280; }
  .trilha-label .title { font:400 11px/1.2 'Roboto'; color:#111; margin-top:2px; }

  .timeline-scrollbar::-webkit-scrollbar { height:4px; }
  .timeline-scrollbar::-webkit-scrollbar-thumb { background:hsl(var(--primary)/.3); border-radius:9999px; }
</style>

<div class="trilha">
  <div class="trilha-step">
    <div class="trilha-row">
      <div class="trilha-line" style="visibility:hidden"></div>
      <div class="trilha-node reached">★</div>
      <div class="trilha-line reached"></div>
    </div>
    <div class="trilha-label">
      <p class="ind">5 ind.</p>
      <p class="title">Aspirante</p>
    </div>
  </div>
  <!-- demais steps... -->
</div>`}
    >
      <div className="w-full">
        <Tabs defaultValue="linear" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-6">
            <TabsTrigger value="linear" className="font-roboto">Linear</TabsTrigger>
            <TabsTrigger value="trilha-h" className="font-roboto">Trilha Horizontal</TabsTrigger>
            <TabsTrigger value="trilha-v" className="font-roboto">Trilha Vertical</TabsTrigger>
          </TabsList>

          <TabsContent value="linear" className="mt-0">
            <LinearTimeline />
          </TabsContent>

          <TabsContent value="trilha-h" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4">
              <HorizontalTrilha current={current} selected={selected} onSelect={setSelected} />
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground font-roboto">
                  Marco selecionado
                </p>
                <p className="text-sm font-anek font-bold mt-1">
                  {milestones.find((m) => m.id === selected)?.title} —{" "}
                  <span className="text-accent">
                    {milestones.find((m) => m.id === selected)?.prize}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground font-roboto mt-0.5">
                  {milestones.find((m) => m.id === selected)?.prizeDescription}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trilha-v" className="mt-0">
            <div className="max-w-md mx-auto rounded-xl border border-border bg-card p-5">
              <VerticalTrilha current={current} progressNow={progressNow} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ComponentShowcase>
  );
}
