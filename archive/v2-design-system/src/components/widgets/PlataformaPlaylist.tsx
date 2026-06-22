import React from "react";
import { PlayCircle, CheckCircle, Lock } from "lucide-react";

export function PlataformaPlaylist() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Playlist visual */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 h-fit shadow-sm">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[1px] mb-2 px-2">
          Aulas do Módulo
        </span>

        {/* Active item */}
        <div className="bg-accent/10 border border-accent/30 p-3 rounded-lg flex gap-3 cursor-pointer shadow-sm relative">
          <PlayCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground text-sm font-bold font-anek leading-tight mb-1">01. O despertar financeiro</p>
            <span className="text-accent text-xs font-roboto">15:24 • Assistindo</span>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
        </div>

        {/* Completed item */}
        <div className="p-3 rounded-lg flex gap-3 cursor-pointer hover:bg-muted transition-colors border border-transparent">
          <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 opacity-80" />
          <div>
            <p className="text-muted-foreground text-sm font-bold font-anek leading-tight mb-1">02. Entendendo a inflação</p>
            <span className="text-muted-foreground text-xs font-roboto">22:10 • Concluído</span>
          </div>
        </div>

        {/* Locked item */}
        <div className="p-3 rounded-lg flex gap-3 cursor-pointer hover:bg-muted transition-colors border border-transparent">
          <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 bg-muted">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
          <div>
            <p className="text-muted-foreground/60 text-sm font-bold font-anek leading-tight mb-1">03. O poder dos juros compostos</p>
            <span className="text-muted-foreground/60 text-xs font-roboto">18:45</span>
          </div>
        </div>

        {/* Another locked */}
        <div className="p-3 rounded-lg flex gap-3 cursor-pointer hover:bg-muted transition-colors border border-transparent">
          <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 bg-muted">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
          <div>
            <p className="text-muted-foreground/60 text-sm font-bold font-anek leading-tight mb-1">04. Reserva de emergência</p>
            <span className="text-muted-foreground/60 text-xs font-roboto">14:20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
