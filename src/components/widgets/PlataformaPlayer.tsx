import React from "react";
import { Play, Pause, Volume2, Captions, Settings, Maximize, CheckCircle } from "lucide-react";

export function PlataformaPlayer() {
  return (
    <div className="bg-card p-6 md:p-12 rounded-2xl border border-border flex flex-col gap-8 w-full">
      {/* Video Wrapper */}
      <div className="w-full aspect-video bg-black rounded-xl relative flex items-center justify-center group cursor-pointer overflow-hidden shadow-xl">
        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button central */}
        <div className="w-16 h-16 bg-primary/90 backdrop-blur rounded-full flex items-center justify-center text-primary-foreground transition-transform group-hover:scale-110 shadow-[0_0_30px_hsl(var(--primary)/0.3)] z-20">
          <Play className="h-7 w-7 ml-1" fill="currentColor" />
        </div>

        {/* Controls bar */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          {/* Progress bar */}
          <div className="w-full h-1 hover:h-2 bg-white/30 rounded-full cursor-pointer relative transition-all">
            <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-[35%] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform origin-center" />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button className="hover:text-accent transition-colors"><Pause className="h-5 w-5" /></button>
              <div className="flex items-center gap-2 group/vol">
                <button className="hover:text-accent transition-colors"><Volume2 className="h-5 w-5" /></button>
                <div className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300 h-1 bg-white/30 rounded-full cursor-pointer">
                  <div className="h-full bg-primary w-[80%]" />
                </div>
              </div>
              <span className="text-xs font-mono opacity-80">12:45 / 35:20</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-accent transition-colors"><Captions className="h-5 w-5" /></button>
              <button className="hover:text-accent transition-colors"><Settings className="h-5 w-5" /></button>
              <button className="hover:text-accent transition-colors"><Maximize className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-[1px] mb-2 block bg-accent/10 w-fit px-2 py-1 rounded">
            Módulo 1: Preparando seu cérebro
          </span>
          <h3 className="text-foreground font-anek text-3xl font-bold tracking-tight mb-4">
            01. O despertar financeiro
          </h3>
          <p className="text-muted-foreground text-sm font-roboto leading-relaxed mb-6">
            A hierarquia de textos no player enfatiza o nome da aula. Botões de ação como "Marcar como concluída" ou "Avaliar aula" devem vir logo abaixo deste bloco.
          </p>
          <button className="bg-card border border-border text-foreground hover:text-foreground hover:bg-muted px-6 py-3 rounded-full font-anek font-bold text-[13px] uppercase transition-all flex items-center gap-2 w-fit shadow-sm">
            <CheckCircle className="h-4 w-4" /> Concluir Aula
          </button>
        </div>
        <div className="bg-muted/50 border border-border p-6 rounded-xl">
          <h4 className="font-bold text-foreground font-anek mb-3">Diretrizes de Comportamento</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-roboto">
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Auto-hide: Overlay e botões desaparecem após 3s sem movimento do mouse.</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Contraste: O vídeo sempre possui fundo preto e controles brancos/dourados.</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Play State: O botão central deve ter backdrop-blur para não prejudicar a thumb.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
