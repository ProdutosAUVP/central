import React from "react";
import { useBrand } from "@/contexts/BrandContext";
import { cn } from "@/lib/utils";
import { olhoBranco, olhoPreto, olhoAmarelo, downloadSvgBlob, downloadPngFromSvg } from "@/assets/olhos";
import { Star, AlertTriangle, ArrowDown, Download, FileImage, FileText } from "lucide-react";

const GITHUB_RAW = "https://raw.githubusercontent.com/armandocustodio-ds/designsystemauvp/main";

interface LogoCardProps {
  src: string;
  alt: string;
  label: string;
  height?: string;
  bg?: string;
  textColor?: string;
  borderClass?: string;
  badge?: string;
  badgeClass?: string;
  darkBg?: boolean;
}

async function downloadSvgFetch(src: string, filename: string) {
  try {
    const resp = await fetch(src);
    if (!resp.ok) throw new Error("fetch failed");
    const blob = await resp.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename + ".svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(src, "_blank");
  }
}

async function downloadPngFetch(src: string, filename: string) {
  try {
    const resp = await fetch(src);
    const svgText = await resp.text();
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const scale = 4;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = filename + ".png";
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };
    img.src = url;
  } catch {
    console.error("Erro ao gerar PNG");
  }
}

async function downloadPdf(src: string, filename: string) {
  try {
    const pdfWindow = window.open("", "_blank");
    if (pdfWindow) {
      pdfWindow.document.write(`
        <html><head><title>${filename}</title></head>
        <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;">
        <img src="${src}" style="max-width:100%;max-height:100vh;object-fit:contain"/>
        <script>setTimeout(function(){window.print()},500)<\/script></body></html>
      `);
    }
  } catch {
    console.error("Erro ao gerar PDF");
  }
}

function DownloadButtons({ src, filename, dark = false }: { src: string; filename: string; dark?: boolean }) {
  const btnClass = dark
    ? "text-neutral-300 hover:text-neutral-100 border-neutral-700 hover:border-neutral-500"
    : "text-neutral-500 hover:text-neutral-900 border-neutral-300 hover:border-neutral-500";

  return (
    <div className="flex items-center gap-1.5 mt-3">
      <button onClick={() => downloadSvgFetch(src, filename)} className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}>
        <Download className="h-3 w-3" /> SVG
      </button>
      <button onClick={() => downloadPngFetch(src, filename)} className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}>
        <FileImage className="h-3 w-3" /> PNG
      </button>
      <button onClick={() => downloadPdf(src, filename)} className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}>
        <FileText className="h-3 w-3" /> PDF
      </button>
    </div>
  );
}

function OlhoDownloadButtons({ svgRaw, svgUrl, filename, dark = false }: { svgRaw: string; svgUrl: string; filename: string; dark?: boolean }) {
  const btnClass = dark
    ? "text-neutral-300 hover:text-neutral-100 border-neutral-700 hover:border-neutral-500"
    : "text-neutral-500 hover:text-neutral-900 border-neutral-300 hover:border-neutral-500";

  return (
    <div className="flex items-center gap-1.5 mt-3">
      <button onClick={() => downloadSvgBlob(svgRaw, filename)} className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}>
        <Download className="h-3 w-3" /> SVG
      </button>
      <button onClick={() => downloadPngFromSvg(svgRaw, filename)} className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}>
        <FileImage className="h-3 w-3" /> PNG
      </button>
      <button onClick={() => downloadPdf(svgUrl, filename)} className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}>
        <FileText className="h-3 w-3" /> PDF
      </button>
    </div>
  );
}

function LogoCard({ src, alt, label, height = "h-24", bg = "bg-muted", textColor = "text-neutral-600", borderClass = "border", badge, badgeClass, darkBg = false }: LogoCardProps) {
  const filename = alt.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={cn("rounded-xl p-4 md:p-8 flex flex-col items-center justify-center relative", borderClass, bg)}>
      {badge && (
        <span className={cn("absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", badgeClass)}>{badge}</span>
      )}
      <img className={cn("mb-3 object-contain", height)} src={src} alt={alt} />
      <span className={cn("text-xs font-bold", textColor)}>{label}</span>
      <DownloadButtons src={src} filename={filename} dark={darkBg} />
    </div>
  );
}

export function MarcaLogos() {
  const { brand } = useBrand();

  return (
    <div className="space-y-12">
      {/* Símbolo (Olho) */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Símbolo — Olho AUVP</h3>
        <p className="text-muted-foreground mb-6">O olho é o símbolo da marca AUVP. Use a versão adequada conforme o fundo.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-xl p-10 flex flex-col items-center justify-center bg-neutral-100">
            <img src={olhoPreto.url} alt="Olho Preto" className="h-16 mb-4" />
            <span className="text-sm font-bold text-neutral-900 mb-1">Olho Preto</span>
            <span className="text-xs text-neutral-500">Para fundos claros</span>
            <OlhoDownloadButtons svgRaw={olhoPreto.raw} svgUrl={olhoPreto.url} filename="olho-preto" />
          </div>
          <div className="border border-neutral-800 rounded-xl p-10 flex flex-col items-center justify-center bg-neutral-900">
            <img src={olhoBranco.url} alt="Olho Branco" className="h-16 mb-4" />
            <span className="text-sm font-bold text-neutral-100 mb-1">Olho Branco</span>
            <span className="text-xs text-neutral-400">Para fundos escuros</span>
            <OlhoDownloadButtons svgRaw={olhoBranco.raw} svgUrl={olhoBranco.url} filename="olho-branco" dark />
          </div>
          <div className="border border-neutral-800 rounded-xl p-10 flex flex-col items-center justify-center bg-neutral-900">
            <img src={olhoAmarelo.url} alt="Olho Amarelo" className="h-16 mb-4" />
            <span className="text-sm font-bold text-neutral-100 mb-1">Olho Amarelo</span>
            <span className="text-xs text-neutral-400">Identidade AUVP Escola</span>
            <OlhoDownloadButtons svgRaw={olhoAmarelo.raw} svgUrl={olhoAmarelo.url} filename="olho-amarelo" dark />
          </div>
        </div>
      </div>

      {/* Logos por marca */}
      {brand === "capital" ? (
        <div>
          <h3 className="text-lg font-bold mb-2 font-anek">AUVP Capital</h3>
          <p className="text-muted-foreground mb-6">Logos oficiais da marca AUVP Capital.</p>
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Vertical (Preferencial)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <LogoCard src={`${GITHUB_RAW}/AUVP%20CAPITAL%20VERTICAL%20BRANCA.svg`} alt="AUVP Capital Vertical Branca" label="Branca (Principal)" bg="bg-neutral-900" borderClass="border-2 border-neutral-800" textColor="text-neutral-300" badge="Principal" badgeClass="text-neutral-100 bg-white/10" darkBg />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20CAPITAL%20VERTICAL%20PRETA.svg`} alt="AUVP Capital Vertical Preta" label="Preta — fundos claros" bg="bg-neutral-100" />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20CAPITAL%20VERTICAL%20AMARELA.svg`} alt="AUVP Capital Vertical Amarela" label="Amarela — destaque" bg="bg-neutral-100" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Horizontal</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LogoCard src={`${GITHUB_RAW}/AUVP%20CAPITAL%20HORIZONTAL%20BRANCA.svg`} alt="AUVP Capital Horizontal Branca" label="Branca (Principal)" height="h-10" bg="bg-neutral-900" borderClass="border-2 border-neutral-800" textColor="text-neutral-300" badge="Principal" badgeClass="text-neutral-100 bg-white/10" darkBg />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20CAPITAL%20HORIZONTAL%20PRETA.svg`} alt="AUVP Capital Horizontal Preta" label="Preta — fundos claros" height="h-10" bg="bg-neutral-100" />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20CAPITAL%20HORIZONTAL%20AMARELA.svg`} alt="AUVP Capital Horizontal Amarela" label="Amarela — destaque" height="h-10" bg="bg-neutral-100" />
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-2 font-anek">AUVP Escola</h3>
          <p className="text-muted-foreground mb-6">Logos oficiais da marca AUVP Escola.</p>
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Vertical (Preferencial)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <LogoCard src={`${GITHUB_RAW}/AUVP%20-%20VERTICAL%20AMARELO%20(PRINCIPAL).svg`} alt="AUVP Escola Vertical Amarelo" label="Amarela (Principal)" bg="bg-neutral-900" borderClass="border-2 border-neutral-800" textColor="text-neutral-300" badge="Principal" badgeClass="text-neutral-100 bg-white/10" darkBg />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20-%20VERTICAL%20PRETO.svg`} alt="AUVP Escola Vertical Preto" label="Preta — fundos claros" bg="bg-neutral-100" />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20-%20VERTICAL%20BRANCO.svg`} alt="AUVP Escola Vertical Branco" label="Branca — fundos escuros" bg="bg-neutral-900" borderClass="border border-neutral-800" textColor="text-neutral-300" darkBg />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Horizontal</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LogoCard src={`${GITHUB_RAW}/AUVP%20-%20HORIZONTAL%20AMARELO%20(PRINCIPAL).svg`} alt="AUVP Escola Horizontal Amarelo" label="Amarela (Principal)" height="h-10" bg="bg-neutral-900" borderClass="border-2 border-neutral-800" textColor="text-neutral-300" badge="Principal" badgeClass="text-neutral-100 bg-white/10" darkBg />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20-%20HORIZONTAL%20PRETO.svg`} alt="AUVP Escola Horizontal Preto" label="Preta — fundos claros" height="h-10" bg="bg-neutral-100" />
            <LogoCard src={`${GITHUB_RAW}/AUVP%20-%20HORIZONTAL%20BRANCO.svg`} alt="AUVP Escola Horizontal Branco" label="Branca — fundos escuros" height="h-10" bg="bg-neutral-900" borderClass="border border-neutral-800" textColor="text-neutral-300" darkBg />
          </div>
        </div>
      )}
    </div>
  );
}
