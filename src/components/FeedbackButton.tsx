import { useState, useCallback } from "react";
import { publicUrl, cn } from "@/lib/utils";

declare global {
  interface Window {
    Userback?: { open?: () => void };
  }
}

export function FeedbackButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    new Audio(publicUrl("/meow.mp3")).play().catch(() => {});

    if (typeof window.Userback?.open === "function") {
      window.Userback.open();
      return;
    }

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
    <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Tooltip */}
      <div
        className={cn(
          "pointer-events-none px-3 py-1.5 rounded-xl text-xs font-roboto font-medium whitespace-nowrap",
          "bg-card border border-border shadow-md text-foreground",
          "transition-all duration-200 ease-apple",
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        Enviar review
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
