import { useState, useCallback } from "react";
import { publicUrl, cn } from "@/lib/utils";

declare global {
  interface Window {
    Userback?: {
      /** Next-Gen: abre o formulário de feedback. */
      openForm?: () => void;
      /** Clássico: open(feedback_type, destination). */
      open?: (feedbackType?: string, destination?: string) => void;
      hide?: () => void;
      hideLauncher?: () => void;
    };
  }
}

export function FeedbackButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback(() => {
    new Audio(publicUrl("/meow.mp3")).play().catch(() => {});

    let tries = 0;
    const trigger = () => {
      const ub = window.Userback;
      // Widget Next-Gen (o que a AUVP usa): openForm() abre o formulário
      // de feedback direto. É a API correta — o open() clássico não abria.
      if (ub?.openForm) {
        try { ub.openForm(); } catch { /* widget indisponível */ }
        return;
      }
      // Fallback para o widget clássico: open(feedback_type, destination).
      if (ub?.open) {
        try { ub.open("general", "form"); } catch { /* widget indisponível */ }
        return;
      }
      // Script do Userback ainda carregando de forma assíncrona — tenta de novo por até 6s.
      if (tries++ < 12) setTimeout(trigger, 500);
    };
    trigger();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-end gap-2 pointer-events-none">
      {/* Tooltip permanente com seta apontando para o gatinho */}
      <div className="relative pointer-events-none px-3 py-1.5 rounded-xl text-xs font-roboto font-medium whitespace-nowrap bg-card border border-border shadow-md text-foreground">
        Sentiu falta de algo?
        <span className="absolute -bottom-[5px] right-7 w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45" />
      </div>

      {/* Botão gatinho */}
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className={cn(
          "pointer-events-auto w-14 h-14 rounded-full overflow-hidden",
          "border-2 border-border bg-card",
          "shadow-md hover:shadow-xl",
          "transition-all duration-300 ease-apple",
          "hover:border-primary/50 hover:scale-110",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
        aria-label="Enviar review"
      >
        <img
          src={publicUrl(hovered ? "/gatin2.webp" : "/gatin1.webp")}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-150"
          draggable={false}
        />
      </button>
    </div>
  );
}
