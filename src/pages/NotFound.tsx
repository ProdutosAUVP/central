import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { olhoBranco } from "@/assets/olhos";
import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";

/**
 * 404 com identidade AUVP: o olho da marca segue o cursor "procurando"
 * a página que não existe.
 */
const NotFound = () => {
  const location = useLocation();
  const eyeRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = eyeRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.min(10, Math.hypot(dx, dy) / 30);
      const ang = Math.atan2(dy, dx);
      setOffset({ x: Math.cos(ang) * dist, y: Math.sin(ang) * dist });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div
          ref={eyeRef}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-dark shadow-xl"
        >
          <img
            src={olhoBranco.url}
            alt="Olho AUVP procurando a página"
            className="h-14 w-14 transition-transform duration-100 ease-linear"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          />
        </div>
        <h1 className="mb-2 text-6xl font-bold font-anek text-foreground">404</h1>
        <p className="mb-1 text-lg font-anek font-semibold text-foreground">
          Nem o olho da AUVP achou essa página.
        </p>
        <p className="mb-8 text-sm text-muted-foreground font-roboto leading-relaxed">
          O endereço <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{location.pathname}</code> não
          existe — ou navegou para longe da carteira. Que tal voltar ao porto seguro?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] bg-primary text-primary-foreground text-sm font-semibold font-sora uppercase border border-primary hover:bg-transparent hover:text-primary transition-all duration-300"
          >
            <Home className="h-4 w-4" />
            Voltar à Central
          </Link>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[5px] border border-input bg-background text-foreground text-sm font-semibold font-sora uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            <Search className="h-4 w-4" />
            Buscar na Central
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
