import React from "react";
import { Inbox, Search, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="flex-1 min-w-[240px] border border-dashed rounded-xl p-8 text-center bg-muted/20">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-muted text-muted-foreground dark:text-accent mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {action && <Button size="sm">{action}</Button>}
    </div>
  );
}

export function EmptyWidget() {
  return (
    <ComponentShowcase
      title="Empty (estado vazio)"
      description="Placeholder para listas, tabelas e buscas sem resultado. Inclui ícone, título, descrição curta e CTA opcional para guiar a próxima ação."
      code={`<div className="border border-dashed rounded-xl p-8 text-center bg-muted/20">
  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-muted mb-4">
    <Inbox className="h-6 w-6 text-muted-foreground" />
  </div>
  <h4 className="font-semibold mb-1">Nenhum item encontrado</h4>
  <p className="text-sm text-muted-foreground mb-4">
    Adicione seu primeiro item para começar.
  </p>
  <Button size="sm">Criar item</Button>
</div>`}
      htmlCode={`<style>
  .empty-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  @media (max-width:768px) { .empty-grid { grid-template-columns:1fr; } }
  .empty {
    border:1px dashed hsl(var(--border, 120 10% 88%)); border-radius:12px;
    padding:32px; text-align:center;
    background:hsl(var(--muted, 120 10% 95%) / 0.2);
    font-family:'Roboto', sans-serif;
  }
  .empty-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:56px; height:56px; border-radius:9999px;
    background:hsl(var(--muted, 120 10% 95%));
    color:hsl(var(--muted-foreground, 110 10% 40%));
    margin-bottom:16px;
  }
  .empty-icon svg { width:24px; height:24px; }
  .empty h4 {
    font-weight:600; margin:0 0 4px;
    color:hsl(var(--foreground, 110 78% 9%));
    font-family:'Anek Latin', sans-serif;
  }
  .empty p { font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%)); margin:0 0 16px; }
  .empty button {
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
    padding:8px 16px; border-radius:8px; border:none;
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:12px; cursor:pointer;
  }
</style>

<div class="empty-grid">
  <div class="empty">
    <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg></div>
    <h4>Nenhum item</h4>
    <p>Adicione seu primeiro item para começar.</p>
    <button>CRIAR ITEM</button>
  </div>
  <div class="empty">
    <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
    <h4>Sem resultados</h4>
    <p>Tente ajustar os filtros ou termos de busca.</p>
  </div>
  <div class="empty">
    <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg></div>
    <h4>Arquivos não encontrados</h4>
    <p>Faça upload de pelo menos um arquivo.</p>
    <button>FAZER UPLOAD</button>
  </div>
</div>`}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <EmptyState icon={Inbox} title="Nenhum item" description="Adicione seu primeiro item para começar." action="Criar item" />
        <EmptyState icon={Search} title="Sem resultados" description="Tente ajustar os filtros ou termos de busca." />
        <EmptyState icon={FileX} title="Arquivos não encontrados" description="Faça upload de pelo menos um arquivo." action="Fazer upload" />
      </div>
    </ComponentShowcase>
  );
}
