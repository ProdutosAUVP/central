import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useBrand } from "@/contexts/BrandContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Volume2, Palette, ChevronDown, X } from "lucide-react";

const systems = [
  {
    id: "design-system",
    label: "Design System",
    description: "Componentes, cores, tipografia e padrões visuais",
    icon: Palette,
    path: "/",
  },
  {
    id: "tom-e-voz",
    label: "Manual de Tom e Voz",
    description: "Diretrizes de comunicação verbal da AUVP Capital",
    icon: Volume2,
    path: "/tom-e-voz",
  },
];

export function GlobalNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { brand } = useBrand();
  const [showWelcome, setShowWelcome] = useState(false);

  const currentSystem = systems.find((s) => s.path === location.pathname) || systems[0];

  // Show welcome tooltip on first visit
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("auvp-nav-welcome");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("auvp-nav-welcome", "true");
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-lg",
          brand === "capital" ? "bg-brand-dark" : "bg-brand"
        )}
      >
        <img
          src={brand === "capital" ? "/olho-branco.svg" : "/olho-preto.svg"}
          alt="AUVP Logo"
          className="h-5 w-5 md:h-7 md:w-7"
        />
      </div>

      {/* Dropdown */}
      <DropdownMenu onOpenChange={(open) => { if (open) dismissWelcome(); }}>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none group rounded-xl px-2 py-1.5 -mx-2 hover:bg-muted transition-colors">
          <div className="text-left">
            <p className="text-sm font-bold font-anek leading-tight text-foreground">
              {currentSystem.label}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight font-roboto uppercase tracking-wider">AUVP</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-80 p-2 space-y-1 bg-popover border border-border shadow-lg">
          <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-wider font-roboto font-bold px-2 py-1.5">
            Navegar entre sistemas
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {systems.map((system) => {
            const Icon = system.icon;
            const isActive = location.pathname === system.path;
            return (
              <DropdownMenuItem
                key={system.id}
                onClick={() => navigate(system.path)}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors",
                  "focus:bg-muted hover:bg-muted data-[highlighted]:bg-muted",
                  isActive && "bg-muted/60 ring-1 ring-border"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center h-9 w-9 rounded-lg shrink-0 mt-0.5 border transition-colors",
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold font-anek text-foreground leading-tight">
                    {system.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug mt-1 font-roboto">
                    {system.description}
                  </p>
                </div>
                {isActive && (
                  <span className="text-[9px] font-bold text-foreground uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded-md bg-background border border-border font-roboto shrink-0">
                    Atual
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Welcome tooltip */}
      {showWelcome && (
        <div className="absolute top-full left-12 mt-3 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative bg-popover border border-border rounded-xl p-4 shadow-xl w-[380px] max-w-[calc(100vw-2rem)] backdrop-blur-xl">
            {/* Arrow */}
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-popover border-l border-t border-border rotate-45 rounded-sm" />
            <button
              onClick={dismissWelcome}
              className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Fechar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="pr-6">
              <p className="text-[10px] font-bold font-roboto uppercase tracking-wider text-muted-foreground mb-1.5">
                Dica de navegação
              </p>
              <p className="text-sm font-anek font-bold text-foreground leading-tight mb-1">
                Conheça o Manual de Tom e Voz
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-roboto">
                Use este menu para alternar entre o Design System e o Manual de Tom e Voz da AUVP.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
