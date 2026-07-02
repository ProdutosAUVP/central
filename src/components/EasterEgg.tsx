import { useEffect, useState } from "react";
import { publicUrl } from "@/lib/utils";

/**
 * Easter egg: digitando o Konami code (↑ ↑ ↓ ↓ ← → ← → B A) o gatinho da
 * AUVP atravessa a tela miando. Usa os assets remanescentes do antigo
 * gatinho de feedback (public/gatin1.webp, gatin2.webp e meow.mp3).
 */

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const WALK_DURATION_MS = 6000;

export function EasterEgg() {
  const [running, setRunning] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        setRunning(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!running) return;
    const audio = new Audio(publicUrl("/meow.mp3"));
    audio.play().catch(() => {
      /* autoplay bloqueado — o gatinho passa em silêncio */
    });
    const walk = setInterval(() => setFrame((f) => (f + 1) % 2), 180);
    const done = setTimeout(() => setRunning(false), WALK_DURATION_MS);
    return () => {
      clearInterval(walk);
      clearTimeout(done);
    };
  }, [running]);

  if (!running) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100]" aria-hidden="true">
      <img
        src={publicUrl(frame === 0 ? "/gatin1.webp" : "/gatin2.webp")}
        alt=""
        className="h-16 w-auto"
        style={{ animation: `auvp-cat-walk ${WALK_DURATION_MS}ms linear forwards` }}
      />
    </div>
  );
}
