import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";

/* ---- WhatsApp SVG oficial (logotipo Meta/WhatsApp) ---- */
const WhatsAppSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill="#ffffff"
      d="M16.003 5.333c-5.89 0-10.667 4.777-10.667 10.667 0 1.88.493 3.715 1.427 5.333L5.333 26.667l5.493-1.413a10.62 10.62 0 0 0 5.177 1.32h.004c5.89 0 10.667-4.777 10.667-10.667S21.893 5.333 16.003 5.333zm0 19.467h-.004a8.79 8.79 0 0 1-4.48-1.227l-.32-.187-3.253.84.867-3.173-.213-.333a8.8 8.8 0 0 1-1.347-4.72c0-4.867 3.96-8.827 8.827-8.827 2.36 0 4.573.92 6.24 2.587a8.78 8.78 0 0 1 2.587 6.24c0 4.867-3.96 8.8-8.904 8.8zm4.843-6.587c-.267-.133-1.573-.773-1.813-.867-.24-.093-.413-.133-.587.133-.173.267-.667.867-.813 1.04-.147.173-.293.187-.56.067-.267-.133-1.12-.413-2.133-1.32-.787-.707-1.32-1.573-1.467-1.84-.147-.267-.013-.413.117-.547.12-.12.267-.307.4-.467.133-.16.173-.267.267-.44.093-.187.04-.347-.027-.48-.067-.133-.587-1.413-.8-1.933-.213-.507-.427-.44-.587-.453-.147-.013-.32-.013-.493-.013-.173 0-.453.067-.693.32-.24.267-.907.893-.907 2.173 0 1.28.933 2.52 1.067 2.693.133.173 1.84 2.813 4.467 3.947.627.267 1.107.427 1.493.547.627.2 1.2.173 1.653.107.507-.08 1.573-.64 1.787-1.267.213-.627.213-1.16.147-1.267-.067-.107-.24-.173-.507-.307z"
    />
  </svg>
);

const WHATSAPP_SVG_HTML = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path fill="#ffffff" d="M16.003 5.333c-5.89 0-10.667 4.777-10.667 10.667 0 1.88.493 3.715 1.427 5.333L5.333 26.667l5.493-1.413a10.62 10.62 0 0 0 5.177 1.32h.004c5.89 0 10.667-4.777 10.667-10.667S21.893 5.333 16.003 5.333zm0 19.467h-.004a8.79 8.79 0 0 1-4.48-1.227l-.32-.187-3.253.84.867-3.173-.213-.333a8.8 8.8 0 0 1-1.347-4.72c0-4.867 3.96-8.827 8.827-8.827 2.36 0 4.573.92 6.24 2.587a8.78 8.78 0 0 1 2.587 6.24c0 4.867-3.96 8.8-8.904 8.8zm4.843-6.587c-.267-.133-1.573-.773-1.813-.867-.24-.093-.413-.133-.587.133-.173.267-.667.867-.813 1.04-.147.173-.293.187-.56.067-.267-.133-1.12-.413-2.133-1.32-.787-.707-1.32-1.573-1.467-1.84-.147-.267-.013-.413.117-.547.12-.12.267-.307.4-.467.133-.16.173-.267.267-.44.093-.187.04-.347-.027-.48-.067-.133-.587-1.413-.8-1.933-.213-.507-.427-.44-.587-.453-.147-.013-.32-.013-.493-.013-.173 0-.453.067-.693.32-.24.267-.907.893-.907 2.173 0 1.28.933 2.52 1.067 2.693.133.173 1.84 2.813 4.467 3.947.627.267 1.107.427 1.493.547.627.2 1.2.173 1.653.107.507-.08 1.573-.64 1.787-1.267.213-.627.213-1.16.147-1.267-.067-.107-.24-.173-.507-.307z"/>
</svg>`;

/* ---- Porquinho SVG (apenas o rosto) ---- */
const PiggySvg = ({ className }: { className?: string }) => (
  <svg viewBox="28 10 44 40" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Orelhas */}
    <path d="M32 20 Q28 10 35 15" fill="#FFB6C1" stroke="#FF91A4" strokeWidth="1.5" />
    <path d="M68 20 Q72 10 65 15" fill="#FFB6C1" stroke="#FF91A4" strokeWidth="1.5" />
    {/* Cabeça */}
    <circle cx="50" cy="30" r="18" fill="#FFB6C1" />
    <circle cx="50" cy="30" r="18" fill="none" stroke="#FF91A4" strokeWidth="1.5" />
    {/* Focinho */}
    <ellipse cx="50" cy="35" rx="10" ry="7" fill="#FF91A4" />
    <circle cx="46" cy="33" r="1.8" fill="#D16B7A" />
    <circle cx="54" cy="33" r="1.8" fill="#D16B7A" />
    {/* Olhos */}
    <circle cx="42" cy="24" r="3.5" fill="#333" />
    <circle cx="43" cy="23" r="1.2" fill="#fff" />
    <circle cx="58" cy="24" r="3.5" fill="#333" />
    <circle cx="59" cy="23" r="1.2" fill="#fff" />
  </svg>
);

/* ---- Botão WhatsApp padronizado: gradiente verde + pulse elegante ---- */
const WhatsAppButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Fale conosco no WhatsApp"
    className={cn(
      "relative w-[64px] h-[64px] rounded-full shadow-lg cursor-pointer",
      "flex items-center justify-center",
      "bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)]",
      "hover:scale-110 active:scale-95 transition-transform duration-200",
      "animate-[waSoftPulse_12s_ease-in-out_infinite]",
      className,
    )}
  >
    {/* Anel pulsante atrás do botão */}
    <span
      aria-hidden
      className="absolute inset-1 rounded-full bg-[#25D366] animate-[waPulseRing_10.5s_cubic-bezier(0.22,1,0.36,1)_infinite] -z-0"
    />
    <WhatsAppSvg className="relative z-10 h-10 w-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
  </button>
);

/* ---- Botão circular genérico (padrão para flutuantes secundários) ---- */
const CircleIconButton = ({
  children,
  background = "linear-gradient(135deg,#FFB6C1 0%,#FF91A4 100%)",
  size = 60,
  ariaLabel,
  onClick,
  className,
  animateFloat = false,
}: {
  children: React.ReactNode;
  background?: string;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
  animateFloat?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    style={{ width: size, height: size, background }}
    className={cn(
      "relative rounded-full shadow-lg cursor-pointer flex items-center justify-center",
      "hover:scale-110 active:scale-95 transition-transform duration-200",
      animateFloat && "animate-[floatPiggy_3s_ease-in-out_infinite]",
      className,
    )}
  >
    <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
      {children}
    </span>
  </button>
);

/* ---- Demo de comportamento do popup ---- */
type PopupMode = "none" | "always" | "hover" | "click";

const PopupBubble = ({ visible }: { visible: boolean }) => (
  <div
    className={cn(
      "bg-white text-gray-900 dark:bg-[#2a2a2a] dark:text-white",
      "p-3 px-4 rounded-xl rounded-br-none shadow-lg mb-2.5 mr-2.5",
      "max-w-[200px] font-anek text-[14px] leading-snug relative border border-border",
      "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-bottom-right",
      visible
        ? "opacity-100 visible translate-y-0 scale-100"
        : "opacity-0 invisible translate-y-2.5 scale-90",
    )}
  >
    <strong>Fale conosco</strong> pelo WhatsApp
    <div className="absolute -bottom-1.5 right-2.5 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white dark:border-t-[#2a2a2a]" />
  </div>
);

function PopupDemo({
  title,
  badge,
  description,
  mode,
}: {
  title: string;
  badge: string;
  description: string;
  mode: PopupMode;
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const visible =
    mode === "always"
      ? true
      : mode === "hover"
      ? hovered
      : mode === "click"
      ? clicked
      : false;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-bold font-anek">{title}</h4>
          <span className="text-[10px] font-roboto font-bold uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded">
            {badge}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <div
        className="bg-muted/50 relative min-h-[200px] flex justify-end items-end p-5"
        onMouseEnter={() => mode === "hover" && setHovered(true)}
        onMouseLeave={() => mode === "hover" && setHovered(false)}
      >
        <div className="flex flex-col items-end">
          {mode !== "none" && <PopupBubble visible={visible} />}
          <WhatsAppButton onClick={() => mode === "click" && setClicked((v) => !v)} />
        </div>
      </div>
    </div>
  );
}

export function WidgetsFlutuantes() {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [snoring, setSnoring] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBubbleVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePiggyClick = () => {
    setSnoring(true);
    setBubbleVisible((v) => !v);
    setTimeout(() => setSnoring(false), 300);
  };

  return (
    <div className="space-y-12">
      {/* Callout */}
      <div className="bg-primary/5 border border-accent/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-foreground mb-1">Espaçamento Vertical Obrigatório</h4>
            <p className="text-sm text-foreground/80">
              Quando houver mais de um widget flutuante ativo, eles devem ser espaçados verticalmente com gap mínimo de <strong>30px</strong> entre cada flutuante.
            </p>
          </div>
        </div>
      </div>

      {/* Anatomia */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Anatomia do Widget Flutuante</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Container", desc: "position: fixed, z-index: 99999, pointer-events: none na área vazia. Animação slideUp de entrada (10s cubic-bezier)." },
            { label: "Ícone (Botão)", desc: "60×60px, drop-shadow, animação float (3s ease-in-out infinite). Hover: scale(1.1). Active: scale(0.95)." },
            { label: "Balão", desc: "Fundo branco, border-radius: 12px (sem canto inferior-direito), seta via ::after. Fonte Anek Latin 15px." },
          ].map((item) => (
            <div key={item.label} className="bg-card p-5 rounded-xl border border-border">
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded font-bold uppercase tracking-wider">{item.label}</span>
              <p className="text-sm text-muted-foreground mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Porquinho */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Exemplo: Widget Porquinho da Economia</h3>
        <div className="bg-muted/50 border border-border rounded-2xl relative min-h-[350px] overflow-hidden">
          {/* Mockup de página por trás */}
          <div className="p-8 space-y-3 opacity-30">
            <div className="h-4 w-2/3 bg-foreground/20 rounded" />
            <div className="h-4 w-full bg-foreground/20 rounded" />
            <div className="h-4 w-5/6 bg-foreground/20 rounded" />
            <div className="h-4 w-1/2 bg-foreground/20 rounded" />
            <div className="h-32 w-full bg-foreground/10 rounded-lg mt-4" />
          </div>

          {/* Widget flutuante real */}
          <div
            className="absolute bottom-[30px] right-[20px] flex flex-col items-end animate-[slideUpEntrance_1.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
            style={{ zIndex: 10 }}
          >
            {/* Balão */}
            <div
              className={cn(
                "bg-white text-gray-900 dark:bg-[#2a2a2a] dark:text-white p-3 px-4 rounded-xl rounded-br-none shadow-lg mb-2.5 max-w-[220px] font-anek text-[15px] leading-snug relative mr-2.5 border border-border",
                "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                bubbleVisible
                  ? "opacity-100 visible translate-y-0 scale-100"
                  : "opacity-0 invisible translate-y-2.5 scale-90"
              )}
            >
              Em breve, o melhor jeito de <strong>poupar o seu dinheiro</strong> no Brasil
              <div className="absolute -bottom-1.5 right-2.5 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white dark:border-t-[#2a2a2a]" />
            </div>

            {/* Botão porquinho dentro do círculo */}
            <div
              onClick={handlePiggyClick}
              className={cn(
                "relative shrink-0",
                snoring && "animate-[snortShake_0.3s_ease-in-out]"
              )}
            >
              <CircleIconButton ariaLabel="Abrir widget Porquinho da Economia">
                <PiggySvg className="w-[42px] h-[42px] block" />
              </CircleIconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Exemplo WhatsApp */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Exemplo: Widget WhatsApp</h3>
        <div className="bg-muted/50 border border-border rounded-2xl flex justify-end items-end relative min-h-[280px] overflow-hidden">
          {/* Mockup por trás */}
          <div className="absolute inset-0 p-8 space-y-3 opacity-30">
            <div className="h-4 w-2/3 bg-foreground/20 rounded" />
            <div className="h-4 w-full bg-foreground/20 rounded" />
            <div className="h-4 w-5/6 bg-foreground/20 rounded" />
          </div>

          <div className="flex flex-col items-end mr-5 mb-5 relative z-10">
            {/* Balão */}
            <div className="bg-white text-gray-900 dark:bg-[#2a2a2a] dark:text-white p-3 px-4 rounded-xl rounded-br-none shadow-lg mb-2.5 max-w-[220px] font-anek text-[15px] leading-snug relative mr-2.5 border border-border">
              <strong>Fale conosco</strong> pelo WhatsApp e tire suas dúvidas
              <div className="absolute -bottom-1.5 right-2.5 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white dark:border-t-[#2a2a2a]" />
            </div>
            {/* Ícone WhatsApp oficial */}
            <WhatsAppButton />
          </div>
        </div>
      </div>

      {/* Empilhamento */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Empilhamento Vertical</h3>
        <p className="text-muted-foreground mb-4">Quando dois ou mais flutuantes coexistem, devem ser empilhados com gap mínimo de 30px.</p>
        <div className="bg-muted/50 border border-border rounded-2xl flex justify-end items-end relative min-h-[300px] overflow-hidden">
          <div className="absolute bottom-[140px] right-5 animate-[floatPiggy_3s_ease-in-out_infinite]">
            <WhatsAppButton />
          </div>
          <div className="absolute bottom-10 right-5 animate-[floatPiggy_3s_ease-in-out_infinite_0.5s]">
            <CircleIconButton ariaLabel="Abrir widget Porquinho da Economia">
              <PiggySvg className="w-[42px] h-[42px]" />
            </CircleIconButton>
          </div>
          <div className="absolute right-[55px] bottom-[102px] h-7 border-r-2 border-dashed border-muted-foreground/40 flex items-center">
            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-muted px-2 text-[11px] font-bold text-muted-foreground whitespace-nowrap">≥ 30px gap</span>
          </div>
        </div>
      </div>

      {/* Padrão: Ícone dentro do círculo */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Padrão: Ícone dentro do Círculo</h3>
        <p className="text-muted-foreground mb-6">
          Todo flutuante deve obrigatoriamente apresentar o ícone <strong>dentro de um botão circular sólido</strong>.
          Nunca utilize uma arte SVG "solta" como flutuante — isso quebra a hierarquia visual, perde
          área de clique e prejudica o contraste com o fundo da página.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Correto */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <h4 className="font-bold font-anek">Correto</h4>
              <span className="text-[10px] font-roboto font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                Use
              </span>
            </div>
            <div className="bg-muted/50 min-h-[180px] flex items-center justify-center p-6">
              <CircleIconButton ariaLabel="Exemplo correto">
                <PiggySvg className="w-[42px] h-[42px]" />
              </CircleIconButton>
            </div>
          </div>
          {/* Incorreto */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <h4 className="font-bold font-anek">Incorreto</h4>
              <span className="text-[10px] font-roboto font-bold uppercase tracking-wider bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                Evite
              </span>
            </div>
            <div className="bg-muted/50 min-h-[180px] flex items-center justify-center p-6">
              <div className="w-[60px] h-[60px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
                <PiggySvg className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-accent/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div className="text-sm text-foreground/80 space-y-1.5">
              <p><strong>Especificações do círculo</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Diâmetro: <strong>60px</strong> (secundário) ou <strong>64px</strong> (WhatsApp).</li>
                <li>Fundo sólido ou gradiente diagonal (135°) consistente com a marca do flutuante. Ex.: WhatsApp <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">#25D366 → #128C7E</code>; Porquinho <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">#FFB6C1 → #FF91A4</code>.</li>
                <li>Ícone interno ocupa <strong>~65–70% do diâmetro</strong> (ex.: 40–42px num círculo de 60–64px), centralizado.</li>
                <li>Sombra: <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">box-shadow: 0 4px 15px rgba(0,0,0,0.2)</code>.</li>
                <li>Ícone com <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">drop-shadow(0 1px 2px rgba(0,0,0,0.25))</code> para destacar do círculo.</li>
                <li>Contraste mínimo de <strong>4.5:1</strong> entre ícone e fundo do círculo (WCAG AA).</li>
                <li>Hover: <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">scale(1.10)</code>. Active: <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">scale(0.95)</code>.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Animações Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { name: "slideUpEntrance", desc: "Entrada do container: translateY(150px) → 0 com fade-in. Duração longa (10s) para sensação suave." },
            { name: "floatPiggy", desc: "Flutuação contínua: translateY(0) → -8px → 0. Ciclo de 3s ease-in-out infinite." },
            { name: "snortShake", desc: "Ao clicar: rotate(-10° → 10° → -5° → 0°) com scale(1.1). Duração 0.3s." },
            { name: "bubble show/hide", desc: "Transição: opacity + translateY(10px) + scale(0.9) → normal. Easing: cubic-bezier(0.175, 0.885, 0.32, 1.275)." },
          ].map((anim) => (
            <div key={anim.name} className="bg-card p-4 rounded-xl border border-border">
              <code className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">{anim.name}</code>
              <p className="text-sm text-muted-foreground mt-2">{anim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comportamento do popup */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Comportamento do Popup de Texto</h3>
        <p className="text-muted-foreground mb-6">
          O balão (popup) que acompanha o flutuante é <strong>opcional</strong> e pode aparecer em três
          modos. Escolha um único modo por página; nunca combine "sempre visível" com gatilhos de
          interação.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sem popup */}
          <PopupDemo
            title="Sem popup"
            badge="Mínimo"
            description="Apenas o ícone flutuante. Use quando o contexto já é óbvio (ex.: rodapé com WhatsApp visível) ou quando há outros flutuantes ativos competindo por atenção."
            mode="none"
          />
          {/* Sempre visível */}
          <PopupDemo
            title="Popup sempre visível"
            badge="Persistente"
            description="O balão aparece junto com o ícone após o slideUp de entrada e permanece. Indicado para campanhas/CTAs de alta prioridade. Inclua um botão de fechar (×) opcional."
            mode="always"
          />
          {/* Hover */}
          <PopupDemo
            title="Popup ao passar o cursor (hover)"
            badge="Desktop"
            description="O balão aparece com fade + scale quando o cursor entra no ícone e desaparece ao sair. Em mobile (touch), comporta-se como o modo 'clique'. Bom para sites institucionais."
            mode="hover"
          />
          {/* Clique */}
          <PopupDemo
            title="Popup ao clicar (toggle)"
            badge="Universal"
            description="O balão é alternado por clique/tap. Padrão recomendado para mobile-first. O primeiro clique abre o balão; o segundo abre o link (ou um clique fora fecha)."
            mode="click"
          />
        </div>

        <div className="mt-6 bg-primary/5 border border-accent/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div className="text-sm text-foreground/80 space-y-1.5">
              <p><strong>Regras do balão</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Máximo de <strong>220px</strong> de largura, fonte Anek Latin 15px.</li>
                <li>Borda inferior-direita reta (continuidade visual com o ícone) e seta apontando para o flutuante.</li>
                <li>Transição: <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">opacity + translateY(10px) + scale(0.9)</code> com easing <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">cubic-bezier(0.175, 0.885, 0.32, 1.275)</code>.</li>
                <li>No modo "sempre visível", apareça com <strong>delay de 1,5s</strong> após o ícone para não competir com o slideUp.</li>
                <li>No modo "hover", use <code className="text-xs font-mono bg-accent/10 text-accent px-1 rounded">aria-describedby</code> apontando para o balão.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Código: comportamento do popup */}
        <div className="mt-6">
          <CodeBlock
            collapsible
            collapsibleLabel="Ver código — Comportamento do popup"
            tabs={[
              {
                label: "React",
                language: "tsx",
                code: `// 4 modos: "none" | "always" | "hover" | "click"
// Escolha UM modo por página — nunca combine "always" com gatilhos.
type PopupMode = "none" | "always" | "hover" | "click";

// Regras OBRIGATÓRIAS do balão:
// - max-width: 220px, font-family: 'Anek Latin', font-size: 15px
// - border-radius: 12px com canto inferior-direito reto (rounded-br-none) + seta
// - Transição: opacity + translateY(10px) + scale(0.9)
//   easing: cubic-bezier(0.175, 0.885, 0.32, 1.275); duração 300ms
// - Modo "always": apareça com delay de 1500ms (depois do slideUp do ícone)
// - Modo "hover": adicione aria-describedby no botão apontando para o balão
// - Em mobile/touch, "hover" deve se comportar como "click"

function PopupBubble({ visible, id }: { visible: boolean; id?: string }) {
  return (
    <div
      id={id}
      role="tooltip"
      className={[
        "bg-white text-gray-900 dark:bg-[#2a2a2a] dark:text-white",
        "p-3 px-4 rounded-xl rounded-br-none shadow-lg mb-2.5 mr-2.5",
        "max-w-[220px] font-anek text-[15px] leading-snug relative border border-border",
        "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-bottom-right",
        visible
          ? "opacity-100 visible translate-y-0 scale-100"
          : "opacity-0 invisible translate-y-2.5 scale-90",
      ].join(" ")}
    >
      <strong>Fale conosco</strong> pelo WhatsApp
      {/* Seta apontando para o flutuante (canto inferior-direito) */}
      <span className="absolute -bottom-1.5 right-2.5 w-0 h-0
                       border-l-[8px] border-l-transparent
                       border-t-[8px] border-t-white dark:border-t-[#2a2a2a]" />
    </div>
  );
}

function FloatingWidget({ mode }: { mode: PopupMode }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [alwaysOn, setAlwaysOn] = useState(false);

  // Modo "always": delay de 1,5s para não competir com o slideUp do ícone
  useEffect(() => {
    if (mode !== "always") return;
    const t = setTimeout(() => setAlwaysOn(true), 1500);
    return () => clearTimeout(t);
  }, [mode]);

  const visible =
    mode === "always" ? alwaysOn :
    mode === "hover"  ? hovered  :
    mode === "click"  ? clicked  : false;

  return (
    <div
      className="fixed bottom-5 right-5 z-[99999] flex flex-col items-end"
      onMouseEnter={() => mode === "hover" && setHovered(true)}
      onMouseLeave={() => mode === "hover" && setHovered(false)}
    >
      {mode !== "none" && <PopupBubble visible={visible} id="wa-tip" />}
      <WhatsAppButton
        aria-describedby={mode === "hover" ? "wa-tip" : undefined}
        onClick={() => mode === "click" && setClicked((v) => !v)}
      />
    </div>
  );
}`,
              },
              {
                label: "HTML / CSS / JS",
                language: "html",
                code: `<!--
  4 modos (atributo data-popup-mode):
    "none"   → apenas o ícone
    "always" → balão persistente (com delay de 1,5s)
    "hover"  → balão aparece no hover (desktop) / tap (mobile)
    "click"  → balão alterna por clique/tap
  Escolha UM modo por página.
-->

<style>
  .wa-wrap {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  /* Regras OBRIGATÓRIAS do balão */
  .wa-bubble {
    background: #fff;
    color: #111;
    padding: 12px 16px;
    border-radius: 12px;
    border-bottom-right-radius: 0;   /* canto reto + seta */
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    font-family: 'Anek Latin', sans-serif;
    font-size: 15px;
    line-height: 1.35;
    max-width: 220px;                 /* limite obrigatório */
    margin: 0 10px 10px 0;
    position: relative;
    transform-origin: bottom right;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px) scale(0.9);
    transition:
      opacity .3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      visibility .3s;
  }
  .wa-bubble::after {
    content: "";
    position: absolute;
    bottom: -6px; right: 10px;
    width: 0; height: 0;
    border-left: 8px solid transparent;
    border-top: 8px solid #fff;
  }

  /* Modo NONE — esconde o balão */
  .wa-wrap[data-popup-mode="none"] .wa-bubble { display: none; }

  /* Modo ALWAYS — visível após delay de 1,5s (classe .is-on aplicada via JS) */
  .wa-wrap[data-popup-mode="always"].is-on .wa-bubble {
    opacity: 1; visibility: visible; transform: translateY(0) scale(1);
  }

  /* Modo HOVER — desktop */
  @media (hover: hover) {
    .wa-wrap[data-popup-mode="hover"]:hover .wa-bubble {
      opacity: 1; visibility: visible; transform: translateY(0) scale(1);
    }
  }
  /* Touch: hover se comporta como click */
  @media (hover: none) {
    .wa-wrap[data-popup-mode="hover"].is-on .wa-bubble {
      opacity: 1; visibility: visible; transform: translateY(0) scale(1);
    }
  }

  /* Modo CLICK — toggle via classe .is-on */
  .wa-wrap[data-popup-mode="click"].is-on .wa-bubble {
    opacity: 1; visibility: visible; transform: translateY(0) scale(1);
  }
</style>

<div class="wa-wrap" data-popup-mode="click" id="waWrap">
  <div class="wa-bubble" id="waBubble" role="tooltip">
    <strong>Fale conosco</strong> pelo WhatsApp
  </div>
  <a class="wa-float" href="https://wa.me/55SEUNUMERO"
     aria-describedby="waBubble" aria-label="Fale conosco no WhatsApp">
    <!-- SVG oficial do WhatsApp aqui -->
  </a>
</div>

<script>
  const wrap = document.getElementById('waWrap');
  const mode = wrap.dataset.popupMode;

  // ALWAYS → delay obrigatório de 1500ms
  if (mode === 'always') {
    setTimeout(() => wrap.classList.add('is-on'), 1500);
  }

  // CLICK (e HOVER em touch) → toggle
  if (mode === 'click' || mode === 'hover') {
    wrap.addEventListener('click', (e) => {
      // 1º clique abre o balão; 2º clique segue o link
      if (!wrap.classList.contains('is-on')) {
        e.preventDefault();
        wrap.classList.add('is-on');
      }
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove('is-on');
    });
  }
</script>`,
              },
            ]}
          />
        </div>
      </div>

      {/* Código: Widget WhatsApp (oficial) */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Código — Widget WhatsApp</h3>
        <p className="text-muted-foreground mb-4">
          SVG oficial do WhatsApp dentro de um botão circular de <strong>64×64px</strong> com
          gradiente diagonal
          <code className="mx-1 text-xs font-mono bg-accent/10 text-accent px-1.5 py-0.5 rounded">#25D366 → #128C7E</code>
          e pulse elegante (anel + escala suave). Não substitua por ícones genéricos de chat.
        </p>
        <CodeBlock
          collapsible
          collapsibleLabel="Ver código — WhatsApp"
          tabs={[
            {
              label: "React",
              language: "tsx",
              code: `// tailwind.config.ts — keyframes do pulse (lento e cadenciado)
// waPulseRing: { '0%':   { transform: 'scale(0.98)', opacity: '0.32' },
//                '100%': { transform: 'scale(1.9)',  opacity: '0' } },
// waSoftPulse: { '0%,100%': { transform: 'scale(1)' },
//                '50%':     { transform: 'scale(1.012)' } }

// SVG OFICIAL do WhatsApp — NUNCA substituir por ícone genérico de chat
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="#ffffff" d="M16.003 5.333c-5.89 0-10.667 4.777-10.667 10.667 0 1.88.493 3.715 1.427 5.333L5.333 26.667l5.493-1.413a10.62 10.62 0 0 0 5.177 1.32h.004c5.89 0 10.667-4.777 10.667-10.667S21.893 5.333 16.003 5.333zm0 19.467h-.004a8.79 8.79 0 0 1-4.48-1.227l-.32-.187-3.253.84.867-3.173-.213-.333a8.8 8.8 0 0 1-1.347-4.72c0-4.867 3.96-8.827 8.827-8.827 2.36 0 4.573.92 6.24 2.587a8.78 8.78 0 0 1 2.587 6.24c0 4.867-3.96 8.8-8.904 8.8zm4.843-6.587c-.267-.133-1.573-.773-1.813-.867-.24-.093-.413-.133-.587.133-.173.267-.667.867-.813 1.04-.147.173-.293.187-.56.067-.267-.133-1.12-.413-2.133-1.32-.787-.707-1.32-1.573-1.467-1.84-.147-.267-.013-.413.117-.547.12-.12.267-.307.4-.467.133-.16.173-.267.267-.44.093-.187.04-.347-.027-.48-.067-.133-.587-1.413-.8-1.933-.213-.507-.427-.44-.587-.453-.147-.013-.32-.013-.493-.013-.173 0-.453.067-.693.32-.24.267-.907.893-.907 2.173 0 1.28.933 2.52 1.067 2.693.133.173 1.84 2.813 4.467 3.947.627.267 1.107.427 1.493.547.627.2 1.2.173 1.653.107.507-.08 1.573-.64 1.787-1.267.213-.627.213-1.16.147-1.267-.067-.107-.24-.173-.507-.307z"/>
  </svg>
);

<a
  href="https://wa.me/55SEUNUMERO"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Fale conosco no WhatsApp"
  className="fixed bottom-5 right-5 z-[99999] w-[64px] h-[64px] rounded-full
             flex items-center justify-center shadow-lg
             bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)]
             hover:scale-110 active:scale-95 transition-transform duration-200
             animate-[waSoftPulse_12s_ease-in-out_infinite]"
>
  {/* Anel pulsante atrás do ícone — lento e cadenciado */}
  <span aria-hidden
        className="absolute inset-1 rounded-full bg-[#25D366]
                   animate-[waPulseRing_10.5s_cubic-bezier(0.22,1,0.36,1)_infinite] -z-0" />
  {/* Ícone ocupa ~70% do círculo (40px em um botão de 64px) */}
  <WhatsAppIcon className="relative z-10 h-10 w-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
</a>`,
            },
            {
              label: "HTML / CSS / JS",
              language: "html",
              code: `<style>
@keyframes waPulseRing {
   0% { transform: scale(0.98); opacity: 0.32; }
  100% { transform: scale(1.9); opacity: 0; }
}
@keyframes waSoftPulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.012); }
}

.wa-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Gradiente diagonal: verde oficial → verde escuro WhatsApp */
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  box-shadow: 0 4px 15px rgba(0,0,0, 0.2);
  cursor: pointer;
  transition: transform .2s ease;
  animation: waSoftPulse 12s ease-in-out infinite;
}
.wa-float::before {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: #25D366;
  z-index: 0;
  animation: waPulseRing 10.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
.wa-float svg {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
}
.wa-float:hover  { transform: scale(1.10); }
.wa-float:active { transform: scale(0.95); }
</style>

<a class="wa-float" href="https://wa.me/55SEUNUMERO" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco no WhatsApp">
  ${WHATSAPP_SVG_HTML}
</a>`,
            },
          ]}
        />
      </div>

      {/* Código: Flutuante secundário (genérico) */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Código — Flutuante secundário</h3>
        <p className="text-muted-foreground mb-4">
          Modelo base para qualquer outro flutuante (Porquinho, promoções, suporte, etc.).
          O ícone deve ficar <strong>dentro de um botão circular</strong> de 60×60px com fundo sólido
          ou gradiente. Mantenha a animação <code className="text-xs font-mono bg-accent/10 text-accent px-1.5 py-0.5 rounded">floatPiggy</code>
          e empilhe acima do WhatsApp respeitando o gap mínimo de 30px.
        </p>
        <CodeBlock
          collapsible
          collapsibleLabel="Ver código — Flutuante secundário"
          tabs={[
            {
              label: "React",
              language: "tsx",
              code: `const [showBubble, setShowBubble] = useState(false);

useEffect(() => {
  const t = setTimeout(() => setShowBubble(true), 1500);
  return () => clearTimeout(t);
}, []);

<div className="fixed bottom-[110px] right-5 z-[99999] flex flex-col items-end pointer-events-none
                animate-[slideUpEntrance_1.5s_cubic-bezier(0.22,1,0.36,1)_forwards]">
  {showBubble && (
    <div className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white
                    p-3 px-4 rounded-xl rounded-br-none shadow-lg mb-2.5 mr-2.5
                    max-w-[220px] font-anek text-[15px] leading-snug
                    border border-border pointer-events-auto">
      Mensagem do widget
    </div>
  )}
  <button
    onClick={handleClick}
    aria-label="Abrir widget"
    className="pointer-events-auto relative w-[60px] h-[60px] rounded-full shadow-lg
               flex items-center justify-center
               bg-[linear-gradient(135deg,#FFB6C1_0%,#FF91A4_100%)]
               hover:scale-110 active:scale-95 transition-transform duration-200
               animate-[floatPiggy_3s_ease-in-out_infinite]"
  >
    {/* Ícone interno ocupa ~70% do círculo */}
    <img src="/seu-icone.svg" alt="" className="w-[42px] h-[42px]
               drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
  </button>
</div>

/* Empilhe acima do WhatsApp: bottom mínimo = 20px (WA) + 60px (ícone) + 30px (gap) = 110px */`,
            },
            {
              label: "HTML / CSS / JS",
              language: "html",
              code: `<style>
:root {
  --float-bottom-pos: 110px; /* 20 (WA) + 60 (ícone) + 30 (gap) */
  --float-right-pos: 20px;
  --float-size: 60px;
}

@keyframes slideUpEntrance {
  from { transform: translateY(150px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
@keyframes floatPiggy {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.float-widget {
  position: fixed;
  bottom: var(--float-bottom-pos);
  right: var(--float-right-pos);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  animation: slideUpEntrance 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.float-widget__bubble {
  background: #fff;
  color: #111;
  padding: 12px 16px;
  border-radius: 12px;
  border-bottom-right-radius: 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  font-family: 'Anek Latin', sans-serif;
  font-size: 15px;
  max-width: 220px;
  margin: 0 10px 10px 0;
  pointer-events: auto;
}
.float-widget__btn {
  position: relative;
  width: var(--float-size);
  height: var(--float-size);
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Fundo sólido ou gradiente diagonal coerente com a identidade do widget */
  background: linear-gradient(135deg, #FFB6C1 0%, #FF91A4 100%);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  cursor: pointer;
  pointer-events: auto;
  animation: floatPiggy 3s ease-in-out infinite;
  transition: transform .2s ease;
}
.float-widget__btn > img,
.float-widget__btn > svg {
  /* Ícone interno ocupa ~70% do diâmetro do círculo */
  width: 70%;
  height: 70%;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
}
.float-widget__btn:hover  { transform: scale(1.10); }
.float-widget__btn:active { transform: scale(0.95); }

@media (max-width: 480px) {
  :root {
    --float-bottom-pos: 95px;
    --float-right-pos: 15px;
    --float-size: 55px;
  }
}
</style>

<div class="float-widget">
  <div class="float-widget__bubble">Mensagem do widget</div>
  <button class="float-widget__btn" onclick="handleClick()" aria-label="Abrir widget">
    <img src="/seu-icone.svg" alt="" />
  </button>
</div>`,
            },
          ]}
        />
      </div>
    </div>
  );
}
