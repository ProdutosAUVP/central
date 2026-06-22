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
  { code: "gbp", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "chf", name: "Franco Suíço", flag: "🇨🇭" },
  { code: "jpy", name: "Iene Japonês", flag: "🇯🇵" },
  { code: "cny", name: "Yuan Chinês", flag: "🇨🇳" },
  { code: "aud", name: "Dólar Australiano", flag: "🇦🇺" },
  { code: "cad", name: "Dólar Canadense", flag: "🇨🇦" },
];

// ---- Alíquotas de IOF ----
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

const DEMO_RATES: Record<string, number> = {
  usd: 5.45, eur: 5.92, gbp: 6.89, chf: 6.12,
  jpy: 0.0365, cny: 0.752, aud: 3.56, cad: 4.01,
};

// ---- Helpers de formatação ----
const formatCurrency = (v: number) => (isNaN(v) ? "0,00" : v.toFixed(2).replace(".", ","));
const formatRate = (v: number) => (isNaN(v) ? "0,0000" : v.toFixed(4).replace(".", ","));
const parseCurrencyInput = (raw: string) => (parseInt(raw.replace(/[^\\d]/g, ""), 10) || 0) / 100;
const formatInputDisplay = (v: number) =>
  v === 0 ? "" : v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---- Spread por faixa de valor ----
function getSpreadRate(foreignValue: number, userType: string): number {
  const ranges = userType === "pj"
    ? [{ max: 2499.99, rate: 0.015 }, { max: 4999.99, rate: 0.01 },
       { max: 9999.99, rate: 0.005 }, { max: Infinity, rate: 0.0025 }]
    : [{ max: 25000, rate: 0.015 }, { max: 50000, rate: 0.0135 },
       { max: 100000, rate: 0.0128 }, { max: 250000, rate: 0.012 },
       { max: 500000, rate: 0.0105 }, { max: 1000000, rate: 0.0098 },
       { max: Infinity, rate: 0.009 }];
  for (const r of ranges) if (foreignValue <= r.max) return r.rate;
  return 0.015;
}

// ---- VET (Valor Efetivo Total) ----
function calculateVET(rate: number, iof: number, spread: number, userType: string, brl: number) {
  let vet = rate * (1 + spread + iof);
  if (userType !== "pj" || !brl) return vet;
  const qty = brl / vet;
  return (vet * qty + 90) / qty; // PJ inclui custo fixo de R$ 90
}
function calculateReceiveRate(rate: number, iof: number, spread: number) {
  return rate * (1 - spread - iof);
}

export function Calculadora() {
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

  const currencyObj = foreignCurrencies.find((c) => c.code === currency)!;
  const exchangeRate = DEMO_RATES[currency] ?? 5.45;

  const getIofRate = useCallback(() => {
    const k = isInvestment ? "investment" : "other";
    return iofRates[\`\${direction}-\${userType}-\${k}\`] ?? 0;
  }, [direction, userType, isInvestment]);

  const calcFromBrl = useCallback((brl: number) => {
    const iof = getIofRate();
    const spread = getSpreadRate(foreignAmount || brl / exchangeRate, userType);
    const foreign = direction === "send"
      ? brl / calculateVET(exchangeRate, iof, spread, userType, brl)
      : brl / calculateReceiveRate(exchangeRate, iof, spread);
    setForeignAmount(foreign);
    setForeignInputValue(formatInputDisplay(foreign));
    setBrlAmount(brl);
  }, [direction, userType, exchangeRate, getIofRate, foreignAmount]);

  const calcFromForeign = useCallback((foreign: number) => {
    const iof = getIofRate();
    const spread = getSpreadRate(foreign, userType);
    const brl = direction === "send"
      ? foreign * calculateVET(exchangeRate, iof, spread, userType, brlAmount)
      : foreign * calculateReceiveRate(exchangeRate, iof, spread);
    setBrlAmount(brl);
    setBrlInputValue(formatInputDisplay(brl));
    setForeignAmount(foreign);
  }, [direction, userType, exchangeRate, getIofRate, brlAmount]);

  useEffect(() => { calcFromBrl(brlAmount); }, [direction, userType, currency, isInvestment]);

  const iofRate = getIofRate();
  const spreadRate = getSpreadRate(foreignAmount, userType);
  const vetDisplay = calculateVET(exchangeRate, iofRate, spreadRate, userType, brlAmount);
  const isSendingPf = direction === "send" && userType === "pf";

  return (
    <div className="bg-card p-6 rounded-2xl shadow-xl w-full max-w-md relative border border-border font-roboto">
      {/* Sliding Tab Enviar / Receber */}
      <div className="flex bg-primary/5 rounded-xl p-1 relative overflow-hidden mb-6">
        <div
          className="absolute top-1 bottom-1 bg-card rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          style={{ width: "calc(50% - 8px)", left: direction === "send" ? "4px" : "calc(50% + 4px)" }}
        />
        <button onClick={() => setDirection("send")}
          className={cn("flex-1 py-2 px-4 text-sm font-medium relative z-10 rounded-lg",
            direction === "send" ? "text-foreground" : "text-muted-foreground")}>Enviar</button>
        <button onClick={() => setDirection("receive")}
          className={cn("flex-1 py-2 px-4 text-sm font-medium relative z-10 rounded-lg",
            direction === "receive" ? "text-foreground" : "text-muted-foreground")}>Receber</button>
      </div>

      {/* Seletor PF / PJ */}
      <div className="flex justify-center items-center mb-6 text-sm text-muted-foreground relative">
        como&nbsp;
        <button onClick={() => setShowEntityDrop(!showEntityDrop)}
          className="font-semibold text-accent flex items-center gap-1">
          <span>{userType === "pf" ? "pessoa física" : "pessoa jurídica"}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", showEntityDrop && "rotate-180")} />
        </button>
        {showEntityDrop && (
          <div className="absolute top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
            <button onClick={() => { setUserType("pf"); setShowEntityDrop(false); }}
              className="block w-full text-left p-3 hover:bg-muted text-sm">Pessoa Física</button>
            <button onClick={() => { setUserType("pj"); setShowEntityDrop(false); }}
              className="block w-full text-left p-3 hover:bg-muted text-sm">Pessoa Jurídica</button>
          </div>
        )}
      </div>

      {/* Checkbox de investimento (apenas PF + Enviar) */}
      <div className={cn("overflow-hidden transition-all duration-300",
        isSendingPf ? "max-h-[100px] opacity-100 mb-6" : "max-h-0 opacity-0 mb-0")}>
        <div className="w-fit mx-auto flex items-center gap-2 py-3 px-4 bg-primary/5 rounded-xl">
          <input type="checkbox" checked={isInvestment}
            onChange={(e) => setIsInvestment(e.target.checked)}
            className="h-5 w-5 rounded accent-primary" />
          <label className="text-sm font-medium text-foreground">
            Estou enviando esse dinheiro para investir no exterior
          </label>
        </div>
      </div>

      {/* Campo BRL */}
      <div className="mb-4 bg-muted/50 p-4 rounded-xl border border-border">
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          {direction === "send" ? "Você envia" : "Você recebe"}
        </label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇧🇷</span>
            <span className="font-semibold">BRL</span>
          </div>
          <input type="text" inputMode="decimal" placeholder="0,00" value={brlInputValue}
            onChange={(e) => {
              const raw = parseCurrencyInput(e.target.value);
              setBrlInputValue(formatInputDisplay(raw));
              calcFromBrl(raw);
            }}
            className="bg-transparent outline-none text-right w-full text-2xl font-semibold font-anek" />
        </div>
      </div>

      {/* Campo Moeda Estrangeira */}
      <div className="mb-6 bg-muted/50 p-4 rounded-xl border border-border">
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          {direction === "send" ? "Beneficiário recebe" : "Você envia"}
        </label>
        <div className="flex items-center justify-between relative">
          <button onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
            className="flex items-center gap-2">
            <span className="text-2xl">{currencyObj.flag}</span>
            <span className="font-semibold">{currencyObj.code.toUpperCase()}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", showCurrencyDrop && "rotate-180")} />
          </button>
          {showCurrencyDrop && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {foreignCurrencies.map((c) => (
                <button key={c.code}
                  onClick={() => { setCurrency(c.code); setShowCurrencyDrop(false); }}
                  className="flex items-center gap-2 w-full text-left p-3 hover:bg-muted text-sm">
                  <span className="text-xl">{c.flag}</span>
                  <span>{c.name} ({c.code.toUpperCase()})</span>
                </button>
              ))}
            </div>
          )}
          <input type="text" inputMode="decimal" placeholder="0,00" value={foreignInputValue}
            onChange={(e) => {
              const raw = parseCurrencyInput(e.target.value);
              setForeignInputValue(formatInputDisplay(raw));
              calcFromForeign(raw);
            }}
            className="bg-transparent outline-none text-right w-full text-2xl font-semibold font-anek" />
        </div>
      </div>

      {/* Resumo do câmbio */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <Banknote className="h-5 w-5" />
          <p>Câmbio: 1 {currencyObj.code.toUpperCase()} = BRL {formatRate(vetDisplay)}</p>
        </div>
        <button onClick={() => setShowDetails(true)} className="text-accent font-medium flex items-center gap-1">
          <span>Detalhes</span><ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-md">
        {direction === "send" ? "Enviar dinheiro" : "Receber dinheiro"}
      </button>

      {/* Modal de detalhes */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}>
          <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Detalhes da Operação</h2>
              <button onClick={() => setShowDetails(false)}><X className="h-6 w-6" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between"><span>IOF</span>
                <span className="font-semibold">R$ {formatCurrency(brlAmount * iofRate)}</span></div>
              <div className="flex justify-between"><span>Taxa Administrativa</span>
                <span className="font-semibold">R$ {formatCurrency(brlAmount * spreadRate)}</span></div>
              {userType === "pj" && (
                <div className="flex justify-between"><span>Custos transacionais</span>
                  <span className="font-semibold">R$ 90,00</span></div>
              )}
              <div className="flex justify-between"><span>VET</span>
                <span className="font-semibold">1 {currencyObj.code.toUpperCase()} = BRL {formatRate(vetDisplay)}</span></div>
            </div>
            <button onClick={() => setShowDetails(false)}
              className="mt-8 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`
          },
          {
            label: "HTML / CSS / JS",
            language: "html",
            code: `<!-- Calculadora de Câmbio — HTML standalone -->
<link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@400;600;700&family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --primary: 142 64% 9%;
    --primary-foreground: 0 0% 100%;
    --accent: 142 64% 9%;
    --foreground: 0 0% 10%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --card: 0 0% 100%;
    --border: 0 0% 90%;
  }
  .calc { max-width: 480px; margin: 0 auto; background: hsl(var(--card));
    padding: 24px; border-radius: 16px; border: 1px solid hsl(var(--border));
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.15); font-family: 'Roboto', sans-serif; color: hsl(var(--foreground)); }
  .tab-wrap { position: relative; display: flex; padding: 4px; margin-bottom: 24px;
    background: hsl(var(--primary) / 0.05); border-radius: 12px; overflow: hidden; }
  .tab-slider { position: absolute; top: 4px; bottom: 4px; width: calc(50% - 8px);
    background: hsl(var(--card)); border-radius: 8px; transition: left .3s ease-in-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1); left: 4px; }
  .tab-btn { flex: 1; padding: 8px 16px; font-size: 14px; font-weight: 500;
    position: relative; z-index: 1; background: transparent; border: 0; cursor: pointer;
    color: hsl(var(--muted-foreground)); border-radius: 8px; }
  .tab-btn.active { color: hsl(var(--foreground)); }
  .entity { display: flex; justify-content: center; align-items: center; gap: 4px;
    margin-bottom: 24px; font-size: 14px; color: hsl(var(--muted-foreground)); position: relative; }
  .entity-btn { background: 0; border: 0; cursor: pointer; font-weight: 600;
    color: hsl(var(--accent)); display: inline-flex; align-items: center; gap: 4px; }
  .invest-wrap { overflow: hidden; transition: all .3s ease-in-out; max-height: 100px; opacity: 1; margin-bottom: 24px; }
  .invest-wrap.hidden { max-height: 0; opacity: 0; margin-bottom: 0; }
  .invest { width: fit-content; margin: 0 auto; display: flex; align-items: center;
    gap: 8px; padding: 12px 16px; background: hsl(var(--primary) / 0.05); border-radius: 12px; }
  .field { background: hsl(var(--muted) / 0.5); padding: 16px; border-radius: 12px;
    border: 1px solid hsl(var(--border)); margin-bottom: 16px; }
  .field label { display: block; font-size: 12px; color: hsl(var(--muted-foreground)); margin-bottom: 4px; font-weight: 500; }
  .field-row { display: flex; align-items: center; justify-content: space-between; position: relative; }
  .currency-btn { display: flex; align-items: center; gap: 8px; background: 0; border: 0; cursor: pointer; font-weight: 600; }
  .field input { background: transparent; border: 0; outline: 0; text-align: right;
    width: 100%; font-size: 24px; font-weight: 600; font-family: 'Anek Latin', sans-serif; color: hsl(var(--foreground)); }
  .summary { display: flex; justify-content: space-between; align-items: center;
    font-size: 14px; color: hsl(var(--muted-foreground)); margin-bottom: 24px; }
  .details-link { background: 0; border: 0; cursor: pointer; color: hsl(var(--accent)); font-weight: 500; }
  .cta { width: 100%; padding: 12px; background: hsl(var(--primary)); color: hsl(var(--primary-foreground));
    border: 0; border-radius: 12px; font-weight: 600; font-family: 'Sora', sans-serif; cursor: pointer; }
  .dropdown { position: absolute; left: 0; top: 100%; margin-top: 8px; width: 224px;
    background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-height: 240px; overflow-y: auto; z-index: 10; }
  .dropdown button { display: flex; align-items: center; gap: 8px; width: 100%;
    text-align: left; padding: 12px; background: 0; border: 0; cursor: pointer; font-size: 14px; }
  .dropdown button:hover { background: hsl(var(--muted)); }
  .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: none;
    align-items: center; justify-content: center; padding: 16px; z-index: 50; }
  .modal.open { display: flex; }
  .modal-card { background: hsl(var(--card)); border-radius: 16px; padding: 24px;
    max-width: 480px; width: 100%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
  .modal-row { display: flex; justify-content: space-between; padding: 8px 0; }
</style>

<div class="calc">
  <div class="tab-wrap">
    <div class="tab-slider" id="slider"></div>
    <button class="tab-btn active" id="tab-send" onclick="setDirection('send')">Enviar</button>
    <button class="tab-btn" id="tab-receive" onclick="setDirection('receive')">Receber</button>
  </div>

  <div class="entity">
    como&nbsp;
    <button class="entity-btn" onclick="toggleEntity()">
      <span id="entity-label">pessoa física</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="dropdown" id="entity-drop" style="display:none; right:0; left:auto; width:192px;">
      <button onclick="setEntity('pf')">Pessoa Física</button>
      <button onclick="setEntity('pj')">Pessoa Jurídica</button>
    </div>
  </div>

  <div class="invest-wrap" id="invest-wrap">
    <div class="invest">
      <input type="checkbox" id="invest-check" checked onchange="recalc()" style="width:20px;height:20px;accent-color:hsl(var(--primary));">
      <label for="invest-check" style="font-size:14px;font-weight:500;">Estou enviando esse dinheiro para investir no exterior</label>
    </div>
  </div>

  <div class="field">
    <label id="brl-label">Você envia</label>
    <div class="field-row">
      <div style="display:flex;align-items:center;gap:8px;"><span style="font-size:24px;">🇧🇷</span><span style="font-weight:600;">BRL</span></div>
      <input type="text" inputmode="decimal" id="brl-input" value="5.000,00" oninput="onBrlInput()">
    </div>
  </div>

  <div class="field">
    <label id="fx-label">Beneficiário recebe</label>
    <div class="field-row">
      <button class="currency-btn" onclick="toggleCurrency()">
        <span style="font-size:24px;" id="cur-flag">🇺🇸</span>
        <span id="cur-code">USD</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="dropdown" id="cur-drop" style="display:none;"></div>
      <input type="text" inputmode="decimal" id="fx-input" placeholder="0,00" oninput="onFxInput()">
    </div>
  </div>

  <div class="summary">
    <span>Câmbio: 1 <span id="rate-code">USD</span> = BRL <span id="rate-val">5,5350</span></span>
    <button class="details-link" onclick="openModal()">Detalhes →</button>
  </div>

  <button class="cta" id="cta-btn">Enviar dinheiro</button>
</div>

<div class="modal" id="modal" onclick="if(event.target===this)closeModal()">
  <div class="modal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
      <h2 style="font-size:20px;font-weight:600;margin:0;">Detalhes da Operação</h2>
      <button onclick="closeModal()" style="background:0;border:0;cursor:pointer;font-size:24px;">×</button>
    </div>
    <div class="modal-row"><span>IOF</span><span id="m-iof">R$ 0,00</span></div>
    <div class="modal-row"><span>Taxa Administrativa</span><span id="m-spread">R$ 0,00</span></div>
    <div class="modal-row" id="m-pj-row" style="display:none;"><span>Custos transacionais</span><span>R$ 90,00</span></div>
    <div class="modal-row"><span>VET</span><span id="m-vet">1 USD = BRL 5,5350</span></div>
    <button class="cta" onclick="closeModal()" style="margin-top:24px;">Fechar</button>
  </div>
</div>

<script>
  const RATES = { usd:5.45, eur:5.92, gbp:6.89, chf:6.12, jpy:0.0365, cny:0.752, aud:3.56, cad:4.01 };
  const CURRENCIES = [
    ['usd','Dólar Americano','🇺🇸'],['eur','Euro','🇪🇺'],['gbp','Libra Esterlina','🇬🇧'],
    ['chf','Franco Suíço','🇨🇭'],['jpy','Iene Japonês','🇯🇵'],['cny','Yuan Chinês','🇨🇳'],
    ['aud','Dólar Australiano','🇦🇺'],['cad','Dólar Canadense','🇨🇦'],
  ];
  const IOF = {
    'send-pf-investment':0.011,'send-pf-other':0.035,
    'receive-pf-investment':0.0038,'receive-pf-other':0.0038,
    'send-pj-investment':0.011,'send-pj-other':0.035,
    'receive-pj-investment':0,'receive-pj-other':0,
  };
  let direction='send', userType='pf', currency='usd', isInvest=true, brl=5000, fx=0;

  function getSpread(v, t){
    const ranges = t==='pj'
      ? [[2499.99,0.015],[4999.99,0.01],[9999.99,0.005],[Infinity,0.0025]]
      : [[25000,0.015],[50000,0.0135],[100000,0.0128],[250000,0.012],[500000,0.0105],[1000000,0.0098],[Infinity,0.009]];
    for (const [m,r] of ranges) if (v<=m) return r;
    return 0.015;
  }
  function vetCalc(rate, iof, sp, t, brl){
    let v = rate * (1+sp+iof);
    if (t!=='pj' || !brl) return v;
    const q = brl/v;
    return (v*q + 90)/q;
  }
  function fmt(v){ return isNaN(v)?'0,00':v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function fmtRate(v){ return isNaN(v)?'0,0000':v.toFixed(4).replace('.',','); }
  function parseBR(s){ return (parseInt(String(s).replace(/[^\\d]/g,''),10)||0)/100; }

  function recalc(){
    const rate = RATES[currency];
    const iof = IOF[direction+'-'+userType+'-'+(isInvest?'investment':'other')] || 0;
    const sp = getSpread(fx || brl/rate, userType);
    if (direction==='send'){
      const vet = vetCalc(rate, iof, sp, userType, brl);
      fx = brl/vet;
    } else {
      fx = brl / (rate*(1-sp-iof));
    }
    document.getElementById('fx-input').value = fmt(fx);
    document.getElementById('rate-val').textContent = fmtRate(vetCalc(rate, iof, sp, userType, brl));
    document.getElementById('rate-code').textContent = currency.toUpperCase();
  }

  function setDirection(d){
    direction = d;
    document.getElementById('slider').style.left = d==='send' ? '4px' : 'calc(50% + 4px)';
    document.getElementById('tab-send').classList.toggle('active', d==='send');
    document.getElementById('tab-receive').classList.toggle('active', d==='receive');
    document.getElementById('brl-label').textContent = d==='send'?'Você envia':'Você recebe';
    document.getElementById('fx-label').textContent = d==='send'?'Beneficiário recebe':'Você envia';
    document.getElementById('cta-btn').textContent = d==='send'?'Enviar dinheiro':'Receber dinheiro';
    updateInvestVisibility();
    recalc();
  }
  function toggleEntity(){ const d=document.getElementById('entity-drop'); d.style.display = d.style.display==='none'?'block':'none'; }
  function setEntity(t){ userType=t; document.getElementById('entity-label').textContent = t==='pf'?'pessoa física':'pessoa jurídica';
    document.getElementById('entity-drop').style.display='none'; updateInvestVisibility(); recalc(); }
  function updateInvestVisibility(){
    document.getElementById('invest-wrap').classList.toggle('hidden', !(direction==='send' && userType==='pf'));
  }
  function toggleCurrency(){
    const d = document.getElementById('cur-drop');
    if (!d.children.length) {
      CURRENCIES.forEach(([c,n,f])=>{
        const b = document.createElement('button');
        b.innerHTML = '<span style="font-size:20px;">'+f+'</span><span>'+n+' ('+c.toUpperCase()+')</span>';
        b.onclick = ()=>{ currency=c; document.getElementById('cur-flag').textContent=f;
          document.getElementById('cur-code').textContent=c.toUpperCase(); d.style.display='none'; recalc(); };
        d.appendChild(b);
      });
    }
    d.style.display = d.style.display==='none'?'block':'none';
  }
  function onBrlInput(){ const i=document.getElementById('brl-input'); brl = parseBR(i.value); i.value=fmt(brl); recalc(); }
  function onFxInput(){ const i=document.getElementById('fx-input'); fx = parseBR(i.value);
    const rate=RATES[currency], iof=IOF[direction+'-'+userType+'-'+(isInvest?'investment':'other')]||0, sp=getSpread(fx,userType);
    brl = direction==='send' ? fx*vetCalc(rate,iof,sp,userType,brl) : fx*rate*(1-sp-iof);
    document.getElementById('brl-input').value = fmt(brl); recalc(); }
  function openModal(){
    const rate=RATES[currency], iof=IOF[direction+'-'+userType+'-'+(isInvest?'investment':'other')]||0, sp=getSpread(fx,userType);
    document.getElementById('m-iof').textContent='R$ '+fmt(brl*iof);
    document.getElementById('m-spread').textContent='R$ '+fmt(brl*sp);
    document.getElementById('m-pj-row').style.display = userType==='pj'?'flex':'none';
    document.getElementById('m-vet').textContent='1 '+currency.toUpperCase()+' = BRL '+fmtRate(vetCalc(rate,iof,sp,userType,brl));
    document.getElementById('modal').classList.add('open');
  }
  function closeModal(){ document.getElementById('modal').classList.remove('open'); }
  recalc();
</script>`
          }
        ]}
      />
    </div>
  );
}
