import "@google/model-viewer";
import { olho3dUrl } from "@/assets/olho3d";
import { Download } from "lucide-react";

export function Olho3D() {
  return (
    <div className="rounded-xl border-2 border-neutral-800 bg-neutral-900 p-6 md:p-8 flex flex-col items-center">
      <model-viewer
        src={olho3dUrl}
        alt="Olho AUVP em 3D"
        camera-controls
        auto-rotate
        disable-zoom={false}
        shadow-intensity="1"
        exposure="1"
        style={{ width: "100%", height: "360px", backgroundColor: "transparent" }}
      />
      <div className="mt-4 flex flex-col items-center gap-1">
        <span className="text-sm font-bold text-neutral-100">Olho AUVP — Modelo 3D</span>
        <span className="text-xs text-neutral-400">Arraste para girar</span>
      </div>
      <a
        href={olho3dUrl}
        download="olho-auvp-3d.glb"
        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 transition-colors mt-4"
        title="Baixar GLB"
      >
        <Download className="h-3 w-3" /> GLB
      </a>
    </div>
  );
}
