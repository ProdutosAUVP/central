import { useState, useCallback } from "react";
import { publicUrl, cn } from "@/lib/utils";

declare global {
  interface Window {
    Userback?: { open?: () => void };
  }
}

export function FeedbackButton() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    new Audio(publicUrl("/meow.mp3")).play().catch(() => {});

    // Tenta a API JS primeiro
    if (typeof window.Userback?.open === "function") {
      window.Userback.open();
      return;
    }

    // Fallback: encontra o botão do Userback abaixo via elementFromPoint.
    // Desabilita pointer-events do gatinho por um instante para que
    // elementFromPoint retorne o elemento logo abaixo.
    const btn = e.currentTarget;
    const x = e.clientX;
    const y = e.clientY;
    btn.style.pointerEvents = "none";
    const target = document.elementFromPoint(x, y) as HTMLElement | null;
    btn.style.pointerEvents = "";
    if (target && target !== btn && target !== document.documentElement && target !== document.body) {
      target.click();
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-end gap-2 pointer-events-none">
      {/* Tooltip */}
      <div
        className={cn(
          "pointer-events-none bg-popover/95 backdrop-blur-sm border border-border/60 rounded-xl px-3 py-1.5 shadow-lg",
          "text-xs font-roboto font-medium text-popover-foreground whitespace-nowrap",
          "transition-all duration-200 ease-apple",
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
        )}
      >
        Enviar feedback
      </div>

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActive(false); }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onClick={handleClick}
        className={cn(
          "pointer-events-auto w-[3.25rem] h-[3.25rem] rounded-full overflow-hidden",
          "ring-2 ring-border/40 shadow-lg transition-all duration-200 ease-apple",
          "hover:ring-primary/40 hover:shadow-xl hover:scale-110",
          "focus-visible:outline-none focus-visible:ring-primary",
          active && "scale-95"
        )}
        aria-label="Enviar feedback"
      >
        <img
          src={publicUrl(hovered ? "/gatin2.webp" : "/gatin1.webp")}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      </button>
    </div>
  );
}
