import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { olhoBranco, olhoPreto } from "@/assets/olhos";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Volume2, Palette, ChevronDown, X, Home, Users, ExternalLink, Layers } from "lucide-react";

const externalLinks = [
  {
    id: "codigo-etica",
    label: "Código de Ética",
    href: "https://produtosauvp.github.io/etica/",
  },
];

const systems = [
  {
    id: "hub",
    label: "Central de Produto",
    description: "Página inicial e visão geral dos sistemas",
    icon: Home,
    path: "/",
  },
  {
    id: "time",
    label: "Nosso Time",
    description: "Missão, pilares e estrutura do time de produto",
    icon: Users,
    path: "/time",
  },
  {
    id: "design-system",
    label: "Design System",
    description: "Componentes, cores, tipografia e padrões visuais",
    icon: Palette,
    path: "/design-system",
  },
  {
    id: "tom-e-voz",
    label: "Manual de Tom e Voz",
    description: "Diretrizes de comunicação verbal da AUVP Capital",
    icon: Volume2,
    path: "/tom-e-voz",
  },
  {
    id: "solucoes",
    label: "Nossas Soluções",
    description: "Guia completo dos produtos do ecossistema AUVP",
    icon: Layers,
    path: "/solucoes",
  },
];

export function GlobalNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const currentSystem = systems.find((s) => s.path === location.pathname) || systems[0];

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("auvp-nav-welcome");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setShowWelcome(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("auvp-nav-welcome", "true");
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Logo — sem caixa: o olho fica solto sobre o fundo da navegação e
          troca de cor por tema, já que precisa de contraste contra o fundo
          e não mais contra uma superfície própria. */}
      <div className="shrink-0">
        <img
          src={olhoPreto.url}
          alt="AUVP Logo"
          className="h-8 w-8 md:h-10 md:w-10 dark:hidden"
        />
        <img
          src={olhoBranco.url}
          alt=""
          aria-hidden="true"
          className="hidden h-8 w-8 md:h-10 md:w-10 dark:block"
        />
      </div>

      {/* Selo de versão */}
      <span className="shrink-0 text-[9px] font-bold font-roboto uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 leading-none">
        v1
      </span>

      {/* Mobile: dropdown */}
      <div className="md:hidden">
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

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-wider font-roboto font-bold px-2 py-1.5">
              Links externos
            </DropdownMenuLabel>
            {externalLinks.map((link) => (
              <DropdownMenuItem
                key={link.id}
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-colors focus:bg-muted hover:bg-muted data-[highlighted]:bg-muted"
                >
                  <span className="text-sm font-anek text-foreground">{link.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop: horizontal nav */}
      <nav className="hidden md:flex items-center gap-0.5">
        {systems.map((system) => {
          const Icon = system.icon;
          const isActive = location.pathname === system.path;
          const isHovered = hoveredId === system.id;
          return (
            <div
              key={system.id}
              className="relative"
              onMouseEnter={() => setHoveredId(system.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                onClick={() => navigate(system.path)}
                className={cn(
                  "relative px-3 py-2 text-sm font-normal font-anek rounded-lg transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {system.label}
                {isActive && (
                  <span className="absolute bottom-1 left-3 right-3 h-px bg-foreground/30 rounded-full" />
                )}
              </button>

              {/* Popup — sempre no DOM, entra e sai com CSS transition */}
              <div
                className="absolute top-full left-1/2 z-50 mt-1.5 w-[220px]"
                style={{
                  transform: isHovered
                    ? "translateX(-50%) translateY(0px)"
                    : "translateX(-50%) translateY(-5px)",
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? "auto" : "none",
                  transition: "opacity 200ms cubic-bezier(0.22,1,0.36,1), transform 200ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div className="relative bg-popover border border-border rounded-xl p-3 shadow-lg">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-popover border-l border-t border-border rotate-45 rounded-sm" />
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center h-8 w-8 rounded-lg shrink-0 border mt-0.5",
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card text-foreground border-border"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium font-anek text-foreground leading-tight">{system.label}</p>
                      <p className="text-xs text-muted-foreground font-roboto mt-0.5 leading-snug">{system.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Divisor vertical */}
        <div className="w-px h-4 bg-border mx-1.5 shrink-0" />

        {/* Links externos */}
        {externalLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-normal font-anek rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            {link.label}
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        ))}
      </nav>

      {/* Welcome tooltip — mobile only */}
      {showWelcome && (
        <div className="md:hidden absolute top-full left-12 mt-3 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative bg-popover border border-border rounded-xl p-4 shadow-xl w-[380px] max-w-[calc(100vw-2rem)] backdrop-blur-xl">
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
                Navegue entre as áreas da Central
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-roboto">
                Por aqui você acessa a visão geral da Central, o Nosso Time, o Design System e o Manual de Tom e Voz — tudo em um só lugar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
