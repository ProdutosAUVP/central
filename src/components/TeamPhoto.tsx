import React from "react";
import { cn } from "@/lib/utils";
import { useTeamPhotos } from "@/contexts/CarecaContext";

/**
 * Foto de colaborador — âncora única de todas as fotos do time.
 *
 * Toda foto de gente na Central passa por aqui: Hub, /time (grade,
 * organograma e popover) e Tom e Voz. Isso garante duas coisas:
 *
 * 1. o mesmo enquadramento (`object-cover object-top`) em qualquer ambiente,
 *    independente do formato do container;
 * 2. a mesma fonte de dados (`useTeamPhotos`), então o Modo Megabrain troca a
 *    foto em todos os lugares ao mesmo tempo — nada fica com a versão antiga.
 *
 * Nunca importe `teamPhotos`/`teamPhotosCareca` direto num componente de tela.
 */

/** Enquadramento compartilhado por todas as fotos de colaborador. */
export const TEAM_PHOTO_ANCHOR = "object-cover object-top";

interface TeamPhotoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  /** Id do colaborador — mesma chave de `orgPeople`/`teamMembers`. */
  id: string;
  alt: string;
  /** Renderizado quando o colaborador não tem foto cadastrada. */
  fallback?: React.ReactNode;
}

export function TeamPhoto({ id, alt, className, fallback = null, ...rest }: TeamPhotoProps) {
  const teamPhotos = useTeamPhotos();
  const src = teamPhotos[id];
  if (!src) return <>{fallback}</>;
  return <img src={src} alt={alt} className={cn(TEAM_PHOTO_ANCHOR, className)} {...rest} />;
}
