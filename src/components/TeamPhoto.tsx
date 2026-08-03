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

/**
 * Colaboradores homenageados. A foto recebe o tratamento in memoriam em
 * qualquer tela: ao passar o mouse, ela fica em preto e branco e a homenagem
 * aparece por cima. Como mora aqui, na âncora, vale para o Hub, /time (grade,
 * organograma e popover) e Tom e Voz de uma vez só — inclusive no Modo
 * Megabrain, que só troca a URL da foto.
 */
const MEMORIAM: Record<string, string> = {
  hiago: "IN MEMORIAN",
};

interface TeamPhotoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  /** Id do colaborador — mesma chave de `orgPeople`/`teamMembers`. */
  id: string;
  alt: string;
  /** Renderizado quando o colaborador não tem foto cadastrada. */
  fallback?: React.ReactNode;
}

export function TeamPhoto({ id, alt, className, fallback = null, style, ...rest }: TeamPhotoProps) {
  const teamPhotos = useTeamPhotos();
  const src = teamPhotos[id];
  if (!src) return <>{fallback}</>;

  const homenagem = MEMORIAM[id];
  if (!homenagem) {
    return <img src={src} alt={alt} className={cn(TEAM_PHOTO_ANCHOR, className)} style={style} {...rest} />;
  }

  /* Com homenagem a foto ganha um invólucro, porque a legenda precisa de um
     elemento por cima dela. O invólucro é quem recebe o `className`/`style` do
     chamador (tamanho, arredondamento, posicionamento) e a foto passa a
     preenchê-lo — assim o layout de cada tela fica idêntico ao de uma foto
     comum. `container-type` deixa a legenda acompanhar a largura real do
     invólucro, que vai de um avatar de 44px do organograma ao card grande. */
  return (
    <span
      className={cn("group/memoriam relative block overflow-hidden", className)}
      style={{ ...style, containerType: "inline-size" }}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          TEAM_PHOTO_ANCHOR,
          "h-full w-full transition-[filter] duration-500 ease-apple sm:group-hover/memoriam:grayscale",
        )}
        {...rest}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 px-[6%] text-center opacity-0 transition-opacity duration-500 ease-apple sm:group-hover/memoriam:opacity-100">
        <span
          className="font-anek font-bold uppercase leading-tight tracking-[0.12em] text-white drop-shadow"
          style={{ fontSize: "min(12px, 13cqi)" }}
        >
          {homenagem}
        </span>
      </span>
    </span>
  );
}
