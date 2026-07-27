import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Users, Palette, Volume2, Map, Newspaper,
  ExternalLink, Sun, Moon, CalendarDays, User, Layers, ScanFace,
} from "lucide-react";
import { CatIcon } from "@phosphor-icons/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sections, categoryLabels } from "@/data/designSystemSections";
import { solucoesSections } from "@/data/solucoes";
import { teamMembers } from "@/data/time";
import { gerarIcs } from "@/data/eventos";
import { tomEVozSections, tomEVozGroupLabels, TOM_E_VOZ_AUTH_KEY, TOM_E_VOZ_UNLOCKED_EVENT } from "@/data/tomEVozSections";
import { TRIGGER_CAT_EVENT } from "@/components/EasterEgg";
import { useTheme } from "@/contexts/ThemeContext";
import { useCareca } from "@/contexts/CarecaContext";

/** Evento global disparado pelo botão de busca do header. */
export const OPEN_PALETTE_EVENT = "auvp:open-palette";

const paginas = [
  { label: "Central de Produto", path: "/", icon: Home, keywords: "hub início home central" },
  { label: "Nosso Time", path: "/time", icon: Users, keywords: "time organograma pessoas equipe" },
  { label: "Design System", path: "/design-system", icon: Palette, keywords: "componentes tokens cores tipografia" },
  { label: "Manual de Tom e Voz", path: "/tom-e-voz", icon: Volume2, keywords: "comunicação escrita linguagem voz" },
  { label: "Nossas Soluções", path: "/solucoes", icon: Layers, keywords: "produtos soluções guia vendas escola sempre pro analítica internacional agro conta" },
  { label: "Roadmap", path: "/roadmap", icon: Map, keywords: "roadmap entregas trimestre planejamento" },
  { label: "Mural de Novidades", path: "/novidades", icon: Newspaper, keywords: "novidades atualizações mural mensal" },
];

const linksExternos = [
  { label: "Código de Ética", href: "https://produtosauvp.github.io/etica/" },
];

export function baixarAgendaIcs() {
  const blob = new Blob([gerarIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "agenda-time-de-produto-auvp.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tomEVozUnlocked, setTomEVozUnlocked] = useState(
    () => sessionStorage.getItem(TOM_E_VOZ_AUTH_KEY) === "true"
  );
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { careca, toggleCareca } = useCareca();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    // Desbloqueia a seção do Tom e Voz na busca assim que a senha é
    // digitada, sem precisar reabrir a paleta.
    const onTomEVozUnlocked = () => setTomEVozUnlocked(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    window.addEventListener(TOM_E_VOZ_UNLOCKED_EVENT, onTomEVozUnlocked);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
      window.removeEventListener(TOM_E_VOZ_UNLOCKED_EVENT, onTomEVozUnlocked);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  const goToSection = (path: string, id: string) => {
    navigate(path);
    // aguarda a página montar antes de rolar até a seção
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <CommandInput
        placeholder="Buscar páginas, componentes, pessoas…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>Nada encontrado. Tente outro termo.</CommandEmpty>

        <CommandGroup heading="Páginas">
          {paginas.map((p) => {
            const Icon = p.icon;
            return (
              <CommandItem key={p.path} value={`${p.label} ${p.keywords}`} onSelect={() => run(() => navigate(p.path))}>
                <Icon className="mr-2 shrink-0" />
                {p.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Componentes do Design System">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <CommandItem
                key={s.id}
                value={`${s.label} ${s.keywords ?? ""} ${categoryLabels[s.category] ?? ""}`}
                onSelect={() => run(() => goToSection("/design-system", s.id))}
              >
                <Icon className="mr-2 shrink-0" />
                <span className="flex-1">{s.label}</span>
                <span className="text-xs text-muted-foreground">{categoryLabels[s.category]}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Nossas Soluções">
          {solucoesSections.map((s) => {
            const Icon = s.icon;
            return (
              <CommandItem
                key={s.id}
                value={`${s.label} soluções produto auvp ${s.anchors.map((a) => a.label).join(" ")}`}
                onSelect={() => run(() => goToSection("/solucoes", s.id))}
              >
                <Icon className="mr-2 shrink-0" />
                <span className="flex-1">{s.label}</span>
                <span className="text-xs text-muted-foreground">Nossas Soluções</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        {/* Só aparece depois que a senha do manual é preenchida — antes
            disso, o conteúdo continua restrito também na busca global. */}
        {tomEVozUnlocked && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Manual de Tom e Voz">
              {tomEVozSections.map((s) => {
                const Icon = s.icon;
                return (
                  <CommandItem
                    key={s.id}
                    value={`${s.label} tom e voz ${tomEVozGroupLabels[s.group] ?? ""}`}
                    onSelect={() => run(() => goToSection("/tom-e-voz", s.id))}
                  >
                    <Icon className="mr-2 shrink-0" />
                    <span className="flex-1">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{tomEVozGroupLabels[s.group]}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Time de Produto">
          {teamMembers.map((m) => (
            <CommandItem key={m.id} value={`${m.name} ${m.role}`} onSelect={() => run(() => navigate("/time"))}>
              <User className="mr-2 shrink-0" />
              <span className="flex-1">{m.name}</span>
              <span className="text-xs text-muted-foreground">{m.role}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Ações">
          <CommandItem value="alternar tema claro escuro dark light" onSelect={() => run(toggle)}>
            {theme === "dark" ? <Sun className="mr-2 shrink-0" /> : <Moon className="mr-2 shrink-0" />}
            Alternar tema {theme === "dark" ? "claro" : "escuro"}
          </CommandItem>
          <CommandItem value="exportar agenda calendário ics eventos" onSelect={() => run(baixarAgendaIcs)}>
            <CalendarDays className="mr-2 shrink-0" />
            Exportar agenda do time (.ics)
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Links externos">
          {linksExternos.map((l) => (
            <CommandItem
              key={l.href}
              value={l.label}
              onSelect={() => run(() => window.open(l.href, "_blank", "noopener,noreferrer"))}
            >
              <ExternalLink className="mr-2 shrink-0" />
              {l.label}
            </CommandItem>
          ))}
          {/* Easter egg — o Jorginho só aparece pra quem procura por ele. */}
          <CommandItem
            value="jorginho gato cat miau meow surpresa easter egg"
            onSelect={() => run(() => window.dispatchEvent(new CustomEvent(TRIGGER_CAT_EVENT)))}
          >
            <CatIcon size={32} className="mr-2 shrink-0" style={{ width: 32, height: 32 }} />
            Jorginho
          </CommandItem>
          {/* Easter egg — o Modo Careca só existe pra quem busca por ele:
              fica fora da lista inicial e só entra quando algo é digitado. */}
          {query.trim() !== "" && (
            <CommandItem
              className="group"
              value="modo careca ricardo cabelo raspar easter egg"
              onSelect={() => run(toggleCareca)}
            >
              <ScanFace className="mr-2 shrink-0" />
              <span className="flex-1">{careca ? "Desativar Modo Careca" : "Modo Careca"}</span>
              {/* Dica revelada no hover (ou navegando com o teclado) */}
              <span className="text-xs italic text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-data-[selected=true]:opacity-100">
                ou modo Ricardo
              </span>
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
