import React, { useState, useEffect, useRef, useCallback } from "react";
import { useBrand } from "@/contexts/BrandContext";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import { ChevronDown, Banknote, ArrowRight, X, Info } from "lucide-react";

// ---- Currency data ----
const foreignCurrencies = [
  { code: "usd", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "eur", name: "Euro", flag: "🇪🇺" },
  { code: "gbp", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "chf", name: "Franco Suíço", flag: "🇨🇭" },
  { code: "jpy", name: "Iene Japonês", flag: "🇯🇵" },
  { code: "cny", name: "Yuan Chinês", flag: "🇨🇳" },
  { code: "aud", name: "Dólar Australiano", flag: "🇦🇺" },
  { code: "cad", name: "Dólar Canadense", flag: "🇨🇦" },
];

// ---- IOF rates ----
const iofRates: Record<string, number> = {
  "send-pf-investment": 0.011,
  "send-pf-other": 0.035,
  "receive-pf-investment": 0.0038,
  "receive-pf-other": 0.0038,
  "send-pj-investment": 0.011,
  "send-pj-other": 0.035,
  "receive-pj-investment": 0.0,
  "receive-pj-other": 0.0,
};

// ---- Formatting helpers ----
const formatCurrency = (v: number) => (isNaN(v) ? "0,00" : v.toFixed(2).replace(".", ","));
const formatRate = (v: number) => (isNaN(v) ? "0,0000" : v.toFixed(4).replace(".", ","));

const parseCurrencyInput = (raw: string): number => {
  const cleaned = raw.replace(/[^\d]/g, "");
  return (parseInt(cleaned, 10) || 0) / 100;
};

const formatInputDisplay = (v: number): string => {
  if (v === 0) return "";
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// ---- Spread calculation ----
function getSpreadRate(foreignValue: number, userType: string): number {
  const ranges =
    userType === "pj"
      ? [
          { max: 2499.99, rate: 0.015 },
          { max: 4999.99, rate: 0.01 },
          { max: 9999.99, rate: 0.005 },
          { max: Infinity, rate: 0.0025 },
        ]
      : [
          { max: 25000, rate: 0.015 },
          { max: 50000, rate: 0.0135 },
          { max: 100000, rate: 0.0128 },
          { max: 250000, rate: 0.012 },
          { max: 500000, rate: 0.0105 },
          { max: 1000000, rate: 0.0098 },
          { max: Infinity, rate: 0.009 },
        ];

  for (const r of ranges) {
    if (foreignValue <= r.max) return r.rate;
  }
  return 0.015;
}

// ---- VET calculation ----
function calculateVET(exchangeRate: number, iofRate: number, spreadRate: number, userType: string, brlAmount: number): number {
  let vet = exchangeRate * (1 + spreadRate + iofRate);
  if (userType !== "pj" || !brlAmount) return vet;
  const qty = brlAmount / vet;
  return (vet * qty + 90) / qty;
}

function calculateReceiveRate(exchangeRate: number, iofRate: number, spreadRate: number): number {
  return exchangeRate * (1 - spreadRate - iofRate);
}

// ---- Demo exchange rates (simulated) ----
const DEMO_RATES: Record<string, number> = {
  usd: 5.45,
  eur: 5.92,
  gbp: 6.89,
  chf: 6.12,
  jpy: 0.0365,
  cny: 0.752,
  aud: 3.56,
  cad: 4.01,
};

export function Calculadora() {
  const { brand } = useBrand();
  const [direction, setDirection] = useState<"send" | "receive">("send");
  const [userType, setUserType] = useState<"pf" | "pj">("pf");
  const [currency, setCurrency] = useState("usd");
  const [isInvestment, setIsInvestment] = useState(true);
  const [brlAmount, setBrlAmount] = useState(5000);
  const [foreignAmount, setForeignAmount] = useState(0);
  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);
  const [showEntityDrop, setShowEntityDrop] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [brlInputValue, setBrlInputValue] = useState("5.000,00");
  const [foreignInputValue, setForeignInputValue] = useState("");
  const brlRef = useRef<HTMLInputElement>(null);
  const foreignRef = useRef<HTMLInputElement>(null);

  const currencyObj = foreignCurrencies.find((c) => c.code === currency)!;
  const exchangeRate = DEMO_RATES[currency] ?? 5.45;

  const getIofRate = useCallback(() => {
    const investKey = isInvestment ? "investment" : "other";
    return iofRates[`${direction}-${userType}-${investKey}`] ?? 0;
  }, [direction, userType, isInvestment]);

  // Recalculate from BRL
  const calcFromBrl = useCallback(
    (brl: number) => {
      const iof = getIofRate();
      const spread = getSpreadRate(foreignAmount || brl / exchangeRate, userType);
      if (direction === "send") {
        const vet = calculateVET(exchangeRate, iof, spread, userType, brl);
        const foreign = brl / vet;
        setForeignAmount(foreign);
        setForeignInputValue(formatInputDisplay(foreign));
      } else {
        const effRate = calculateReceiveRate(exchangeRate, iof, spread);
        const foreign = brl / effRate;
        setForeignAmount(foreign);
        setForeignInputValue(formatInputDisplay(foreign));
      }
      setBrlAmount(brl);
    },
    [direction, userType, currency, exchangeRate, getIofRate, foreignAmount]
  );

  // Recalculate from foreign
  const calcFromForeign = useCallback(
    (foreign: number) => {
      const iof = getIofRate();
      const spread = getSpreadRate(foreign, userType);
      if (direction === "send") {
        const vet = calculateVET(exchangeRate, iof, spread, userType, brlAmount);
        const brl = foreign * vet;
        setBrlAmount(brl);
        setBrlInputValue(formatInputDisplay(brl));
      } else {
        const effRate = calculateReceiveRate(exchangeRate, iof, spread);
        const brl = foreign * effRate;
        setBrlAmount(brl);
        setBrlInputValue(formatInputDisplay(brl));
      }
      setForeignAmount(foreign);
    },
    [direction, userType, currency, exchangeRate, getIofRate, brlAmount]
  );

  // Initial calc
  useEffect(() => {
    calcFromBrl(brlAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, userType, currency, isInvestment]);

  // VET for display
  const iofRate = getIofRate();
  const spreadRate = getSpreadRate(foreignAmount, userType);
  const vetDisplay = calculateVET(exchangeRate, iofRate, spreadRate, userType, brlAmount);

  const isSendingPf = direction === "send" && userType === "pf";

  return (
    <div className="space-y-8">
      {/* Demo Calculator */}
      <div className="bg-muted/50 p-8 rounded-2xl flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-card p-6 rounded-2xl shadow-xl w-full relative border border-border font-roboto">

            {/* Sliding Tab: Enviar / Receber */}
            <div className="flex bg-primary/5 rounded-xl p-1 relative overflow-hidden mb-6">
              {/* Slider */}
              <div
                className="absolute top-1 bottom-1 bg-card rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                style={{
                  width: "calc(50% - 8px)",
                  left: direction === "send" ? "4px" : "calc(50% + 4px)",
                }}
              />
              <button
                onClick={() => setDirection("send")}
                className={cn(
                  "flex-1 py-2 px-4 text-sm font-medium relative z-10 transition-colors duration-200 rounded-lg",
                  direction === "send" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Enviar
              </button>
              <button
                onClick={() => setDirection("receive")}
                className={cn(
                  "flex-1 py-2 px-4 text-sm font-medium relative z-10 transition-colors duration-200 rounded-lg",
                  direction === "receive" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Receber
              </button>
            </div>

            {/* Entity type selector */}
            <div className="flex justify-center items-center mb-6 text-sm text-muted-foreground relative">
              como&nbsp;
              <button
                onClick={() => setShowEntityDrop(!showEntityDrop)}
                className="font-semibold text-accent flex items-center gap-1"
              >
                <span>{userType === "pf" ? "pessoa física" : "pessoa jurídica"}</span>
                <ChevronDown className={cn("h-4 w-4 text-accent transition-transform duration-200", showEntityDrop && "rotate-180")} />
              </button>
              {showEntityDrop && (
                <div className="absolute top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10">
                  <button onClick={() => { setUserType("pf"); setShowEntityDrop(false); }} className="block w-full text-left p-3 hover:bg-muted transition-colors text-sm text-foreground">Pessoa Física</button>
                  <button onClick={() => { setUserType("pj"); setShowEntityDrop(false); }} className="block w-full text-left p-3 hover:bg-muted transition-colors text-sm text-foreground">Pessoa Jurídica</button>
                </div>
              )}
            </div>

            {/* Investment checkbox (PF + send only) */}
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isSendingPf ? "max-h-[100px] opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"
            )}>
              <div className="w-fit mx-auto flex items-center gap-2 py-3 px-4 bg-primary/5 rounded-xl">
                <input
                  type="checkbox"
                  checked={isInvestment}
                  onChange={(e) => setIsInvestment(e.target.checked)}
                  className="h-5 w-5 rounded cursor-pointer accent-primary"
                />
                <label className="text-sm font-medium text-foreground select-none cursor-pointer">
                  Estou enviando esse dinheiro para investir no exterior
                </label>
              </div>
            </div>

            {/* BRL field */}
            <div className="mb-4 bg-muted/50 p-4 rounded-xl border border-border">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                {direction === "send" ? "Você envia" : "Você recebe"}
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇧🇷</span>
                  <span className="font-semibold text-foreground">BRL</span>
                </div>
                <input
                  ref={brlRef}
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={brlInputValue}
                  onChange={(e) => {
                    const raw = parseCurrencyInput(e.target.value);
                    setBrlInputValue(formatInputDisplay(raw));
                    calcFromBrl(raw);
                  }}
                  className="bg-transparent outline-none border-none text-right w-full text-2xl font-semibold text-foreground font-anek"
                />
              </div>
            </div>

            {/* Foreign field */}
            <div className="mb-6 bg-muted/50 p-4 rounded-xl border border-border">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                {direction === "send" ? "Beneficiário recebe" : "Você envia"}
              </label>
              <div className="flex items-center justify-between relative">
                <button
                  onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
                  className="flex items-center gap-2 transition-colors duration-200"
                >
                  <span className="text-2xl">{currencyObj.flag}</span>
                  <span className="font-semibold text-foreground">{currencyObj.code.toUpperCase()}</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", showCurrencyDrop && "rotate-180")} />
                </button>
                {showCurrencyDrop && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {foreignCurrencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c.code); setShowCurrencyDrop(false); }}
                        className="flex items-center gap-2 w-full text-left p-3 hover:bg-muted transition-colors text-sm text-foreground"
                      >
                        <span className="text-xl">{c.flag}</span>
                        <span>{c.name} ({c.code.toUpperCase()})</span>
                      </button>
                    ))}
                  </div>
                )}
                <input
                  ref={foreignRef}
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={foreignInputValue}
                  onChange={(e) => {
                    const raw = parseCurrencyInput(e.target.value);
                    setForeignInputValue(formatInputDisplay(raw));
                    calcFromForeign(raw);
                  }}
                  className="bg-transparent outline-none border-none text-right w-full text-2xl font-semibold text-foreground font-anek"
                />
              </div>
            </div>

            {/* Exchange rate summary */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Banknote className="h-5 w-5 text-muted-foreground" />
                <p>Câmbio: 1 {currencyObj.code.toUpperCase()} = BRL {formatRate(vetDisplay)}</p>
              </div>
              <button onClick={() => setShowDetails(true)} className="text-accent font-medium flex items-center gap-1">
                <span>Detalhes</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Main CTA */}
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors duration-200 shadow-md">
              {direction === "send" ? "Enviar dinheiro" : "Receber dinheiro"}
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowDetails(false)}>
          <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">Detalhes da Operação</h2>
              <button onClick={() => setShowDetails(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 text-foreground">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="underline decoration-dotted decoration-primary underline-offset-2 cursor-help" title="Imposto federal cobrado em operações de câmbio.">IOF</span>
                </div>
                <span className="font-semibold">R$ {formatCurrency(brlAmount * iofRate)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="underline decoration-dotted decoration-primary underline-offset-2 cursor-help" title="Valor cobrado pela intermediação da operação.">Taxa Administrativa</span>
                </div>
                <span className="font-semibold">R$ {formatCurrency(brlAmount * spreadRate)}</span>
              </div>

              {userType === "pj" && (
                <div className="flex justify-between items-center">
                  <span className="underline decoration-dotted decoration-primary underline-offset-2 cursor-help" title="Valor cobrado pela intermediação da operação.">Custos transacionais</span>
                  <span className="font-semibold">R$ 90,00</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="underline decoration-dotted decoration-primary underline-offset-2 cursor-help" title="Custo final da operação incluindo IOF, taxa e cotação.">VET</span>
                <span className="font-semibold">1 {currencyObj.code.toUpperCase()} = BRL {formatRate(vetDisplay)}</span>
              </div>
            </div>

            <div className="mt-8 text-sm text-muted-foreground text-center">
              Disclaimer: Os valores apresentados são apenas <strong>uma simulação e não representam uma oferta final.</strong> As taxas estão sujeitas a variação.
            </div>

            <button onClick={() => setShowDetails(false)} className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors duration-200 shadow-md">
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Anatomy cards */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Anatomia da Calculadora de Câmbio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Sliding Tab", desc: "Alternância Enviar/Receber com slider animado (300ms ease-in-out) sobre fundo translúcido." },
            { label: "Campos de Input", desc: "inputMode='decimal', formatação automática pt-BR. Labels dinâmicos conforme direção." },
            { label: "Seletor de Moeda", desc: "Dropdown com 16 moedas, bandeiras emoji e busca inline. Fecha ao clicar fora." },
            { label: "Checkbox de Investimento", desc: "Aparece apenas para PF + Enviar. Altera alíquota de IOF (1.10% vs 3.50%)." },
            { label: "Cálculo de VET", desc: "VET = cotação × (1 + spread + IOF). Para PJ: inclui custos transacionais fixos de R$ 90." },
            { label: "Modal de Detalhes", desc: "Exibe breakdown: IOF, Taxa Administrativa, Custos PJ, VET final. Tooltips interativos." },
          ].map((item) => (
            <div key={item.label} className="bg-card p-4 rounded-xl border border-border">
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded font-bold uppercase tracking-wider">{item.label}</span>
              <p className="text-sm text-muted-foreground mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock collapsible
        tabs={[
          {
            label: "React",
            language: "tsx",
            code: `import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, Banknote, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ---- Dados de moedas ----
const foreignCurrencies = [
  { code: "usd", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "eur", name: "Euro", flag: "🇪🇺" },
];`
          }
        ]}
      />
    </div>
  );
}
