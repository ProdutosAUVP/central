import type { LucideIcon } from "lucide-react";
import {
  Headphones, Handshake, Video, TrendingUp, Cpu, Wallet, Megaphone, Scale,
  UsersRound, Truck,
} from "lucide-react";

/**
 * Ícones canônicos das áreas da empresa — fonte única.
 *
 * Toda seção da Central que referencia uma área (Nosso Time, Tom e Voz,
 * command palette…) deve importar o ícone daqui, para que a mesma área
 * apareça sempre com a mesma iconografia. "Comercial" (Tom e Voz) e
 * "Vendas" (Nosso Time) são a mesma área da empresa.
 */
export const areaIcons = {
  Atendimento: Headphones,
  Consultoria: Handshake,
  Audiovisual: Video,
  Vendas: TrendingUp,
  Comercial: TrendingUp,
  Tecnologia: Cpu,
  Financeiro: Wallet,
  Marketing: Megaphone,
  Jurídico: Scale,
  "Capital Humano": UsersRound,
  Logística: Truck,
} satisfies Record<string, LucideIcon>;
