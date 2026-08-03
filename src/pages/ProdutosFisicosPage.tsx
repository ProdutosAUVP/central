import React, { useMemo, useState } from "react";
import { ArrowUp, Package, Shapes } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { VoltarParaCentral } from "@/components/VoltarParaCentral";
import { FiltroCategorias, ProdutoFisicoCard, type FiltroCategoria } from "@/components/ProdutosFisicos";
import { categoriasProdutosFisicos, produtosFisicos } from "@/data/produtosFisicos";

/**
 * Catálogo completo dos produtos físicos. O Hub mostra só os destaques e
 * manda para cá — mesmo padrão do Mural de Novidades. Card e filtro vêm de
 * `@/components/ProdutosFisicos`, compartilhados com o Hub.
 */

function Stat({ icon: Icon, valor, rotulo }: { icon: React.ElementType; valor: React.ReactNode; rotulo: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xl font-extrabold font-anek text-foreground leading-none">{valor}</p>
        <p className="text-[11px] text-muted-foreground font-roboto mt-0.5">{rotulo}</p>
      </div>
    </div>
  );
}

export default function ProdutosFisicosPage() {
  const [categoria, setCategoria] = useState<FiltroCategoria>("Todos");
  const lista = useMemo(
    () => (categoria === "Todos" ? produtosFisicos : produtosFisicos.filter((p) => p.categoria === categoria)),
    [categoria]
  );

  return (
    <PageShell
      width="7xl"
      footer="Produtos Físicos — Time de Produto AUVP"
      mainClassName="py-8 md:py-12 space-y-6"
      hero={
        <PageHero
          id="topo"
          icon={Package}
          title="Portfólio de Produtos Físicos"
          description="Brindes, kits e materiais de marca que o time planeja, desenha e produz — todos fotografados nos mockups tratados do acervo."
          actions={<VoltarParaCentral />}
        />
      }
    >

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat icon={Package} valor={produtosFisicos.length} rotulo="produtos no catálogo" />
        <Stat icon={Shapes} valor={categoriasProdutosFisicos.length} rotulo="categorias" />
      </div>

      {/* Filtro por categoria — sticky logo abaixo do header global */}
      <nav
        aria-label="Filtrar por categoria"
        className="sticky top-14 md:top-16 z-40 -mx-4 md:-mx-8 px-4 md:px-8 py-2.5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b"
      >
        <FiltroCategorias valor={categoria} onChange={setCategoria} />
      </nav>

      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 className="text-base sm:text-xl font-bold font-anek text-foreground">
          {categoria === "Todos" ? "Todos os produtos" : categoria}
        </h2>
        <p className="text-xs text-muted-foreground font-roboto">
          {lista.length} {lista.length === 1 ? "produto" : "produtos"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {lista.map((item) => (
          <ProdutoFisicoCard key={item.slug} item={item} />
        ))}
      </div>

      {/* Voltar ao topo e para a Central */}
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <a
          href="#topo"
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-xs font-semibold font-roboto text-muted-foreground transition-colors duration-300 sm:hover:border-primary/40 sm:hover:text-primary"
        >
          <ArrowUp className="h-3.5 w-3.5" /> Voltar ao topo
        </a>
        <VoltarParaCentral className="bg-card" />
      </div>

    </PageShell>
  );
}
