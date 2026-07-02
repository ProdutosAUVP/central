import type React from "react";
import {
  BookOpen, Megaphone, Users, Heart,
  Landmark, GraduationCap,
  Anchor, Sparkles, Mic, Building2, Wheat,
  BarChart3, DollarSign, CreditCard, Shield, Award, Plane,
} from "lucide-react";

/**
 * Seções do Manual de Tom e Voz — fonte única.
 * Consumida pela sidebar de navegação de /tom-e-voz e pela command palette
 * (que só as exibe quando o manual já foi desbloqueado pela senha).
 */

export type TomEVozSection = {
  id: string;
  label: string;
  icon: React.ElementType;
  group: string;
};

export const tomEVozGroupLabels: Record<string, string> = {
  introducao: "Introdução",
  areas: "Áreas da Empresa",
  produtos: "Produtos",
};

export const tomEVozSections: TomEVozSection[] = [
  { id: "fundamentos", label: "Fundamentos", icon: BookOpen, group: "introducao" },
  { id: "raul", label: "Voz do Raul", icon: Mic, group: "introducao" },

  { id: "marketing", label: "Marketing", icon: Megaphone, group: "areas" },
  { id: "comercial", label: "Comercial", icon: Users, group: "areas" },
  { id: "atendimento", label: "Atendimento", icon: Heart, group: "areas" },
  { id: "consultoria", label: "Consultoria", icon: Landmark, group: "areas" },
  { id: "produto-wealth", label: "AUVP Wealth", icon: Building2, group: "areas" },
  { id: "capital", label: "Capital Humano", icon: Anchor, group: "areas" },
  { id: "produto-cx", label: "Produto e Cx", icon: Sparkles, group: "areas" },

  { id: "produto-agro", label: "Agro", icon: Wheat, group: "produtos" },
  { id: "produto-escola", label: "Escola", icon: GraduationCap, group: "produtos" },
  { id: "produto-analitica", label: "Analítica", icon: BarChart3, group: "produtos" },
  { id: "produto-cambio", label: "Câmbio", icon: DollarSign, group: "produtos" },
  { id: "produto-credito", label: "Crédito", icon: CreditCard, group: "produtos" },
  { id: "produto-seguros", label: "Seguros", icon: Shield, group: "produtos" },
  { id: "produto-pro", label: "Pro", icon: Award, group: "produtos" },
  { id: "produto-experience", label: "Experience", icon: Plane, group: "produtos" },
];

export const tomEVozGroups = Object.entries(tomEVozGroupLabels).map(([key, label]) => ({
  label,
  items: tomEVozSections.filter((s) => s.group === key),
}));

/** Chave usada no sessionStorage pelo gate de senha do Tom e Voz. */
export const TOM_E_VOZ_AUTH_KEY = "tom-e-voz-auth";

/**
 * Evento disparado ao desbloquear o manual com a senha correta.
 * A command palette escuta este evento para passar a exibir as seções
 * do Tom e Voz na busca global assim que o usuário se autentica,
 * sem precisar navegar/recarregar a página primeiro.
 */
export const TOM_E_VOZ_UNLOCKED_EVENT = "auvp:tom-e-voz-unlocked";
