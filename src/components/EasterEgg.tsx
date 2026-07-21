import { useEffect, useRef, useState } from "react";
import { publicUrl } from "@/lib/utils";

/**
 * Easter egg: digitando o Konami code (↑ ↑ ↓ ↓ ← → ← → B A) — ou
 * encontrando o Jorginho escondido na busca global (Ctrl/Cmd+K) — o
 * gatinho da AUVP salta do canto da tela e a atravessa aos pulinhos,
 * miando num balão de quadrinhos e deixando um rastro de corações,
 * patinhas e notas musicais. Usa os assets remanescentes do antigo
 * gatinho de feedback (public/gatin1.webp, gatin2.webp e meow.mp3).
 */

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const WALK_DURATION_MS = 6500;
/** Duração do salto de entrada — o rastro de partículas só começa depois dele. */
const POP_MS = 600;
const PARTICLE_EMOJIS = ["💛", "🐾", "🎵", "✨", "💛", "🐾"];

/** Evento global — dispara o mesmo efeito do Konami code (usado pelo Jorginho na busca). */
export const TRIGGER_CAT_EVENT = "auvp:trigger-cat";

interface Particle {
  id: number;
  /** Posição horizontal (px) onde a partícula nasce — o rastro fica para trás do gato. */
  x: number;
  emoji: string;
  /** Deriva horizontal e rotação aleatórias enquanto flutua para cima. */
  drift: number;
  spin: number;
  size: number;
}

export function EasterEgg() {
  const [running, setRunning] = useState(false);
  const [frame, setFrame] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

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
    const onTrigger = () => setRunning(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(TRIGGER_CAT_EVENT, onTrigger);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(TRIGGER_CAT_EVENT, onTrigger);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const audio = new Audio(publicUrl("/meow.mp3"));
    audio.play().catch(() => {
      /* autoplay bloqueado — o gatinho passa em silêncio */
    });
    const start = performance.now();
    const walk = setInterval(() => setFrame((f) => (f + 1) % 2), 200);
    // Rastro: a caminhada em X é linear, então a posição atual do gato é
    // derivável do tempo decorrido — cada partícula nasce onde ele está.
    const spawn = setInterval(() => {
      const t = (performance.now() - start - POP_MS) / WALK_DURATION_MS;
      if (t <= 0.02 || t >= 0.96) return;
      const catX = t * (window.innerWidth + 280) - 140;
      setParticles((ps) => [
        ...ps.slice(-14),
        {
          id: idRef.current++,
          x: catX + 10 + Math.random() * 40,
          emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
          drift: (Math.random() - 0.5) * 70,
          spin: (Math.random() - 0.5) * 60,
          size: 16 + Math.random() * 12,
        },
      ]);
    }, 340);
    const done = setTimeout(() => {
      setRunning(false);
      setParticles([]);
    }, POP_MS + WALK_DURATION_MS + 400);
    return () => {
      clearInterval(walk);
      clearInterval(spawn);
      clearTimeout(done);
    };
  }, [running]);

  if (!running) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* Rastro de partículas — fica para trás enquanto o gato avança */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-14 select-none"
          style={{
            left: p.x,
            fontSize: p.size,
            "--drift": `${p.drift}px`,
            "--spin": `${p.spin}deg`,
            animation: "auvp-cat-float 1700ms ease-out forwards",
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}

      {/* Caminhada horizontal (linear) */}
      <div
        className="absolute inset-x-0 bottom-4"
        style={{ animation: `auvp-cat-walk ${POP_MS + WALK_DURATION_MS}ms linear forwards` }}
      >
        {/* Salto de entrada — pop elástico saindo de baixo da tela */}
        <div style={{ animation: `auvp-cat-pop ${POP_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1) both` }}>
          {/* Pulinhos contínuos com squash & stretch */}
          <div
            className="relative w-fit"
            style={{
              animation: `auvp-cat-hop 700ms ease-in-out ${POP_MS}ms infinite`,
              transformOrigin: "50% 100%",
            }}
          >
            {/* Balão de quadrinhos */}
            <div
              className="absolute -top-9 left-full -translate-x-3 rounded-2xl rounded-bl-sm border-2 border-foreground/80 bg-background px-3 py-1 text-sm font-bold font-anek text-foreground whitespace-nowrap"
              style={{ animation: `auvp-cat-bubble 2400ms ease-out ${POP_MS}ms both` }}
            >
              miau!
            </div>
            <img
              src={publicUrl(frame === 0 ? "/gatin1.webp" : "/gatin2.webp")}
              alt=""
              className="h-20 w-auto drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
