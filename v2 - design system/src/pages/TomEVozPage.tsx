import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TomEVoz } from "@/components/widgets/TomEVoz";
import { GlobalNav } from "@/components/GlobalNav";
import { useBrand } from "@/contexts/BrandContext";
import {
  BookOpen, Megaphone, Users, Heart,
  Landmark, GraduationCap, Menu,
  Anchor, Sparkles, Mic, Building2, Wheat,
  BarChart3, DollarSign, CreditCard, Shield, Award, Plane,
  Lock, Eye, EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MANUAL_PASSWORD = "BUY-AND-HOLD";

type NavGroup = {
  label?: string;
  items: { id: string; label: string; icon: React.ElementType }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Introdução",
    items: [
      { id: "fundamentos", label: "Fundamentos", icon: BookOpen },
      { id: "raul", label: "Voz do Raul", icon: Mic },
    ],
  },
  {
    label: "Áreas da Empresa",
    items: [
      { id: "marketing", label: "Marketing", icon: Megaphone },
      { id: "comercial", label: "Comercial", icon: Users },
      { id: "atendimento", label: "Atendimento", icon: Heart },
      { id: "consultoria", label: "Consultoria", icon: Landmark },
      { id: "produto-wealth", label: "AUVP Wealth", icon: Building2 },
      { id: "capital", label: "Capital Humano", icon: Anchor },
      { id: "produto-cx", label: "Produto e Cx", icon: Sparkles },
    ],
  },
  {
    label: "Produtos",
    items: [
      { id: "produto-agro", label: "Agro", icon: Wheat },
      { id: "produto-escola", label: "Escola", icon: GraduationCap },
      { id: "produto-analitica", label: "Analítica", icon: BarChart3 },
      { id: "produto-cambio", label: "Câmbio", icon: DollarSign },
      { id: "produto-credito", label: "Crédito", icon: CreditCard },
      { id: "produto-seguros", label: "Seguros", icon: Shield },
      { id: "produto-pro", label: "Pro", icon: Award },
      { id: "produto-experience", label: "Experience", icon: Plane },
    ],
  },
];

const allSectionIds = navGroups.flatMap((g) => g.items.map((i) => i.id));

function SidebarNav({
  activeSection,
  scrollToSection,
}: {
  activeSection: string;
  scrollToSection: (id: string) => void;
}) {
  return (
    <>
      {navGroups.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && <div className="my-3 border-b border-border" />}
          {group.label && (
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              {group.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left leading-tight",
                    activeSection === id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default function TomEVozPage() {
  const { brand, setBrand } = useBrand();
  const [previousBrand] = useState(brand);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("fundamentos");

  // Password gate
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("tom-e-voz-auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MANUAL_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("tom-e-voz-auth", "true");
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setBrand("capital");
    return () => {
      setBrand(previousBrand);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const handleScroll = () => {
      const headerOffset = 100;
      let currentId = allSectionIds[0];

      for (const id of allSectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= headerOffset) {
          currentId = id;
        } else {
          break;
        }
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-dark mb-4">
              <img src="/olho-branco.svg" alt="AUVP Logo" className="h-9 w-9" />
            </div>
            <h1 className="text-xl font-bold font-anek text-foreground">Manual de Tom e Voz</h1>
            <p className="text-sm text-muted-foreground mt-1">Conteúdo restrito — insira a senha para acessar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className={cn("pl-10 pr-10", error && "border-destructive focus-visible:ring-destructive")}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-destructive">Senha incorreta. Tente novamente.</p>
            )}
            <Button type="submit" className="w-full">
              Acessar manual
            </Button>
          </form>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar para o Design System
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 md:gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-foreground/10">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold font-anek">Manual de Tom e Voz</p>
                      <p className="text-xs text-muted-foreground">Guia de comunicação AUVP</p>
                    </div>
                  </div>
                </div>
                <nav className="px-2 py-4">
                  <SidebarNav activeSection={activeSection} scrollToSection={scrollToSection} />
                </nav>
              </SheetContent>
            </Sheet>

            <GlobalNav />
          </div>
        </div>
      </header>

      <div className="container flex gap-0 relative px-4 md:px-8">
        <nav className="sticky top-16 h-[calc(100vh-4rem)] w-56 shrink-0 border-r py-[30px] pr-[15px] overflow-y-auto hidden md:block">
          <SidebarNav activeSection={activeSection} scrollToSection={scrollToSection} />
        </nav>

        <main className="flex-1 py-[60px] pl-0 md:pl-[45px] min-w-0 overflow-hidden max-w-4xl">
          <TomEVoz />
        </main>
      </div>
    </div>
  );
}