import React from "react";
import { Image as ImageIcon, LayoutGrid, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { tagToneClasses } from "@/components/widgets/Tag";
import {
  categoriaVisual,
  categoriasProdutosFisicos,
  contagemPorCategoria,
  produtosFisicos,
  type CategoriaProdutoFisico,
  type ProdutoFisico,
} from "@/data/produtosFisicos";

/**
 * Peças compartilhadas do catálogo de produtos físicos: o card do produto e o
 * seletor de categorias. Hub (destaques) e /produtos-fisicos (catálogo
 * completo) usam os mesmos componentes para não divergirem visualmente.
 */

export type FiltroCategoria = CategoriaProdutoFisico | "Todos";

/** Selo da categoria — ícone + nome, no lugar da tag de texto solta. */
export function CategoriaBadge({ categoria, className }: { categoria: CategoriaProdutoFisico; className?: string }) {
  const { tone, icon: Icon } = categoriaVisual[categoria];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold font-roboto uppercase tracking-wider",
        tagToneClasses[tone],
        className
      )}
    >
      <Icon className="h-3 w-3 shrink-0" strokeWidth={2.5} />
      {categoria}
    </span>
  );
}

export function ProdutoFisicoCard({ item }: { item: ProdutoFisico }) {
  const temVerso = Boolean(item.img && item.imgVerso);
  const [virado, setVirado] = React.useState(false);

  /* Só o mouse vira a foto ao passar por cima: no toque o `pointerenter`
     dispara junto do toque e brigaria com o clique que também vira. */
  const viraNoMouse = (proximoEstado: boolean) => (e: React.PointerEvent) => {
    if (temVerso && e.pointerType === "mouse") setVirado(proximoEstado);
  };

  return (
    <div
      className="group rounded-2xl border bg-card overflow-hidden flex flex-col transition-[transform,box-shadow,border-color] duration-300 ease-apple sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:border-primary/30"
      onPointerEnter={viraNoMouse(true)}
      onPointerLeave={viraNoMouse(false)}
    >
      {/* 3:4 é a proporção nativa dos mockups tratados — a foto preenche o
          quadro inteiro, sem faixa de fundo sobrando. */}
      <div className="relative aspect-[3/4] bg-muted/50 flex flex-col items-center justify-center gap-2 border-b overflow-hidden [perspective:1200px]">
        {item.img ? (
          temVerso ? (
            <>
              {/* Produto com os dois lados desenhados (caneca AUPO11): a foto
                  gira em 3D — frente em repouso, verso no hover. No toque e no
                  teclado quem vira é o botão que cobre a foto. */}
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-700 ease-apple [transform-style:preserve-3d] motion-reduce:transition-none",
                  virado && "[transform:rotateY(180deg)]"
                )}
              >
                <img
                  src={item.img}
                  alt={item.nome}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden]"
                />
                <img
                  src={item.imgVerso}
                  alt={`${item.nome} — verso`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
                />
              </div>
              <button
                type="button"
                aria-pressed={virado}
                aria-label={virado ? `Ver a frente da ${item.nome}` : `Ver o verso da ${item.nome}`}
                onClick={() => setVirado((v) => !v)}
                onFocus={() => setVirado(true)}
                onBlur={() => setVirado(false)}
                className="absolute inset-0 z-10 cursor-pointer rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-background/85 backdrop-blur-sm px-2 py-1 text-[10px] font-bold font-roboto uppercase tracking-wider text-foreground shadow-sm">
                  <RotateCw className="h-3 w-3 shrink-0" strokeWidth={2.5} />
                  {virado ? "Verso" : "Frente"}
                </span>
              </button>
            </>
          ) : (
            <img
              src={item.img}
              alt={item.nome}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-apple sm:group-hover:scale-105"
            />
          )
        ) : (
          <>
            <ImageIcon className="h-8 w-8 text-muted-foreground/40 transition-transform duration-300 ease-apple sm:group-hover:scale-110 sm:group-hover:text-primary/40" />
            <span className="text-[10px] text-muted-foreground font-roboto">Adicionar foto</span>
          </>
        )}
      </div>
      <div className="p-3 flex flex-col items-start gap-1.5">
        <CategoriaBadge categoria={item.categoria} />
        <p className="font-semibold font-anek text-foreground text-sm leading-snug">{item.nome}</p>
        <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

function FiltroBotao({
  ativo,
  onClick,
  icon: Icon,
  tone,
  label,
  total,
}: {
  ativo: boolean;
  onClick: () => void;
  icon: React.ElementType;
  tone: string;
  label: string;
  total: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={ativo}
      className={cn(
        "group flex items-center gap-2.5 shrink-0 rounded-xl border bg-card pl-2 pr-3.5 py-2 text-left transition-[border-color,box-shadow,background-color] duration-300 ease-apple",
        ativo
          ? "border-primary ring-2 ring-primary/25 bg-primary/5"
          : "sm:hover:border-primary/40 sm:hover:shadow-sm"
      )}
    >
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg shrink-0", tone)}>
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold font-anek text-foreground leading-tight whitespace-nowrap">{label}</span>
        <span className="block text-[10px] text-muted-foreground font-roboto leading-tight mt-0.5">
          {total} {total === 1 ? "item" : "itens"}
        </span>
      </span>
    </button>
  );
}

/** Seletor de categorias — cards com ícone e contagem, no lugar das pills. */
export function FiltroCategorias({
  valor,
  onChange,
  className,
}: {
  valor: FiltroCategoria;
  onChange: (categoria: FiltroCategoria) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Filtrar produtos por categoria"
      className={cn("flex gap-2 overflow-x-auto timeline-scrollbar pb-1 -mx-1 px-1", className)}
    >
      <FiltroBotao
        ativo={valor === "Todos"}
        onClick={() => onChange("Todos")}
        icon={LayoutGrid}
        tone="bg-primary/10 text-primary"
        label="Todos"
        total={produtosFisicos.length}
      />
      {categoriasProdutosFisicos.map((cat) => {
        const { tone, icon } = categoriaVisual[cat];
        return (
          <FiltroBotao
            key={cat}
            ativo={valor === cat}
            onClick={() => onChange(cat)}
            icon={icon}
            tone={tagToneClasses[tone]}
            label={cat}
            total={contagemPorCategoria[cat]}
          />
        );
      })}
    </div>
  );
}
