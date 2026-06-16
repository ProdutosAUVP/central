import React, { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

// ---- Annual rates by year (historical) ----
const ANNUAL_RATES_BY_YEAR: Record<number, number> = {
  1: 0.2287,
  2: 0.1311,
  3: 0.1766,
  4: 0.1508,
  5: 0.103,
  6: 0.0865,
  7: 0.1056,
  8: 0.109,
  9: 0.1228,
};

// Poupança: 0.5% fixo + TR (0.09% est.)
const MONTHLY_RATE_SAVINGS = 0.005 + 0.0009;

// ---- Log scale config ----
const INITIAL_MIN = 1000;
const INITIAL_MAX = 10_000_000;
const MONTHLY_MIN_LOG = 50;
const MONTHLY_MAX = 500_000;

function smartRound(v: number): number {
  if (v < 1000) return Math.round(v / 50) * 50;
  if (v < 10000) return Math.round(v / 100) * 100;
  if (v < 100000) return Math.round(v / 500) * 500;
  if (v < 1000000) return Math.round(v / 1000) * 1000;
  return Math.round(v / 5000) * 5000;
}

function logMapInitial(pos: number): number {
  const minv = Math.log(INITIAL_MIN);
  const maxv = Math.log(INITIAL_MAX);
  return smartRound(Math.exp(minv + ((maxv - minv) / 1000) * pos));
}

function logMapMonthly(pos: number): number {
  if (pos === 0) return 0;
  const minv = Math.log(MONTHLY_MIN_LOG);
  const maxv = Math.log(MONTHLY_MAX);
  return smartRound(Math.exp(minv + ((maxv - minv) / 999) * (pos - 1)));
}

const toMonthlyRate = (annual: number) => Math.pow(1 + annual, 1 / 12) - 1;

const fmtCurrency = (v: number, cents = false) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

const fmtPercent = (v: number) =>
  (v * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";

function futureValueAnnuity(pmt: number, rate: number, n: number): number {
  if (pmt <= 0) return 0;
  return pmt * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate);
}

// ---- Slider component ----
function InvestmentSlider({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className="text-xl font-semibold text-accent font-anek">{displayValue}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="investment-slider w-full"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${pct}%, hsl(var(--border)) ${pct}%, hsl(var(--border)) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mt-2 font-semibold">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export function CalculadoraRendimentos() {
  const [initialPos, setInitialPos] = useState(232);
  const [monthlyPos, setMonthlyPos] = useState(387);
  const [years, setYears] = useState(5);

  const initialInvestment = logMapInitial(initialPos);
  const monthlyContribution = logMapMonthly(monthlyPos);

  const annualRate = ANNUAL_RATES_BY_YEAR[years] ?? 0.12;
  const monthlyRate = toMonthlyRate(annualRate);
  const totalMonths = years * 12;

  // Portfolio
  const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, totalMonths);
  const fvMonthly = futureValueAnnuity(monthlyContribution, monthlyRate, totalMonths);
  const finalValue = fvInitial + fvMonthly;

  // Savings
  const fvInitialSav = initialInvestment * Math.pow(1 + MONTHLY_RATE_SAVINGS, totalMonths);
  const fvMonthlySav = futureValueAnnuity(monthlyContribution, MONTHLY_RATE_SAVINGS, totalMonths);
  const savingsValue = fvInitialSav + fvMonthlySav;

  // Scale effect for final value
  const scale = 0.8 + ((years - 1) / 8) * 0.2;

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <div className="bg-muted/50 p-4 md:p-8 rounded-2xl">
        <div className="w-full">
          <div className="bg-card p-4 md:p-6 rounded-2xl shadow-xl w-full border border-border font-anek space-y-6">
            <style>{`
              .investment-slider {
                -webkit-appearance: none;
                height: 0.5rem;
                border-radius: 0.25rem;
                outline: none;
                cursor: pointer;
              }
              .investment-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 1.25rem;
                height: 1.25rem;
                border-radius: 50%;
                background: hsl(var(--primary));
                border: 3px solid hsl(var(--card));
                box-shadow: 0 0 3px rgba(0,0,0,0.25);
                cursor: pointer;
              }
              .investment-slider::-moz-range-thumb {
                width: 1.25rem;
                height: 1.25rem;
                border-radius: 50%;
                background: hsl(var(--primary));
                border: 3px solid hsl(var(--card));
                box-shadow: 0 0 3px rgba(0,0,0,0.25);
                cursor: pointer;
              }
            `}</style>

            {/* Sliders */}
            <InvestmentSlider
              label="Seu investimento inicial"
              value={initialPos}
              displayValue={fmtCurrency(initialInvestment)}
              min={0}
              max={1000}
              step={1}
              onChange={setInitialPos}
              leftLabel="R$ 1 mil"
              rightLabel="R$ 10 mi"
            />

            <InvestmentSlider
              label="Aporte mensal adicional"
              value={monthlyPos}
              displayValue={fmtCurrency(monthlyContribution)}
              min={0}
              max={1000}
              step={1}
              onChange={setMonthlyPos}
              leftLabel="R$ 0"
              rightLabel="R$ 500 mil"
            />

            <InvestmentSlider
              label="Anos que você investe"
              value={years}
              displayValue={`${years} ano${years > 1 ? "s" : ""}`}
              min={1}
              max={9}
              step={1}
              onChange={setYears}
              leftLabel="1 ano"
              rightLabel="9 anos"
            />

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-xl items-end">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Valor estimado com uma carteira diversificada¹
                </p>
                <span
                  className="inline-block text-[clamp(1.5rem,6vw,2.5rem)] font-semibold transition-transform duration-200"
                  style={{ transform: `scale(${scale})`, transformOrigin: "bottom center", color: "hsl(142 71% 25%)" }}
                >
                  {fmtCurrency(finalValue, true)}
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Valor estimado na poupança²
                </p>
                <span className="inline-block text-[clamp(1.5rem,6vw,2.5rem)] font-semibold text-destructive scale-[0.8]" style={{ transformOrigin: "bottom center" }}>
                  {fmtCurrency(savingsValue, true)}
                </span>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="text-xs text-muted-foreground leading-tight space-y-1">
              <p>
                ¹ Simulação baseada em uma carteira teórica: 50% em títulos públicos indexados à inflação
                (IMA-B) e 50% em AUVP11. Rentabilidade histórica anualizada:{" "}
                <strong>{fmtPercent(annualRate)}</strong> a.a.
                <br />
                ² Regra da Poupança: 0,5% a.m. + TR (TR estimada em 0,09% a.m.).
              </p>
              <p className="opacity-75">
                Resultados passados não garantem retornos futuros. Valores estimados brutos, sem impostos ou inflação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Anatomy */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-anek">Anatomia da Calculadora de Rendimentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Escala Logarítmica", desc: "Sliders de investimento e aporte usam mapeamento log para cobrir ranges amplos (R$ 1 mil → R$ 10 mi) mantendo precisão." },
            { label: "Taxas Dinâmicas", desc: "Taxa anualizada muda conforme o prazo selecionado, baseada em dados históricos reais por período." },
            { label: "Comparação Visual", desc: "Carteira diversificada vs Poupança lado a lado. O resultado principal escala com o prazo para reforçar o impacto." },
            { label: "Arredondamento Inteligente", desc: "Valores são arredondados em faixas: <1k→R$ 50, <10k→R$ 100, <100k→R$ 500, para UX limpa." },
            { label: "Thumb Temática", desc: "Cor do thumb segue a paleta da marca ativa (--primary), integrando ao design system." },
            { label: "Disclaimers", desc: "Notas de rodapé com fonte menor, explicando metodologia e isenção de responsabilidade." },
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
            code: `// Calculadora de Rendimentos — React
const [initialPos, setInitialPos] = useState(232);
const [monthlyPos, setMonthlyPos] = useState(387);
const [years, setYears] = useState(5);

const initialInvestment = logMapInitial(initialPos);
const monthlyContribution = logMapMonthly(monthlyPos);
const annualRate = ANNUAL_RATES_BY_YEAR[years] ?? 0.12;
const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;

// FV = P × (1+r)^n + PMT × [((1+r)^n - 1) / r] × (1+r)
const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, years * 12);
const fvMonthly = pmt * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);

<InvestmentSlider label="Seu investimento inicial" value={initialPos}
  displayValue={fmtCurrency(initialInvestment)} onChange={setInitialPos} />`
          },
          {
            label: "HTML / CSS / JS",
            language: "html",
            code: `<!-- Calculadora de Rendimentos -->
<div class="calc-wrapper" style="background:#f5f5f5; padding:2rem; border-radius:1rem;">
  <div style="background:#fff; padding:1.5rem; border-radius:1rem; border:1px solid #e5e5e5;">
    <label>Seu investimento inicial</label>
    <input type="range" id="initialSlider" min="0" max="1000" value="232" />
    <span id="initialDisplay">R$ 5.000</span>

    <label>Aporte mensal adicional</label>
    <input type="range" id="monthlySlider" min="0" max="1000" value="387" />

    <label>Anos que você investe</label>
    <input type="range" id="yearsSlider" min="1" max="9" value="5" />
  </div>
</div>

<script>
  const RATES = {1:0.2287, 2:0.1311, 3:0.1766, 4:0.1508, 5:0.103, 6:0.0865, 7:0.1056, 8:0.109, 9:0.1228};

  function logMap(pos, min, max) {
    const minv = Math.log(min), maxv = Math.log(max);
    return Math.exp(minv + ((maxv - minv) / 1000) * pos);
  }

  function calculate() {
    const initial = logMap(initialSlider.value, 1000, 10000000);
    const monthly = monthlySlider.value == 0 ? 0 : logMap(monthlySlider.value, 50, 500000);
    const years = Number(yearsSlider.value);
    const rate = Math.pow(1 + RATES[years], 1/12) - 1;
    const n = years * 12;
    const fv = initial * Math.pow(1+rate, n) + monthly * ((Math.pow(1+rate,n)-1)/rate) * (1+rate);
    document.getElementById("result").textContent = fv.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
  }

  document.querySelectorAll("input[type=range]").forEach(el => el.addEventListener("input", calculate));
  calculate();
</script>`
          }
        ]}
      />
    </div>
  );
}
