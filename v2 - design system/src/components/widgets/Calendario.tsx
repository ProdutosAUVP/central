import React, { useRef, useState } from "react";
import { startOfDay, subDays, subWeeks, subMonths, endOfDay } from "date-fns";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";
import { useIsDark } from "@/hooks/use-is-dark";

export function CalendarioWidget() {
  const [single, setSingle] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [picker, setPicker] = useState<Date | undefined>();
  const pickerTriggerRef = useRef<HTMLButtonElement>(null);
  const pickerIsDark = useIsDark(pickerTriggerRef);

  const now = new Date();
  const minDate = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());

  return (
    <div className="space-y-6">
      <ComponentShowcase
        title="Calendário — data única"
        description="Calendário inline para seleção de uma única data. Ideal para agendamentos rápidos e formulários simples."
        code={`const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={ptBR}
  className="rounded-xl border bg-card p-3 pointer-events-auto"
/>`}
        htmlCode={`<!-- O Calendar usa react-day-picker. Em HTML puro, o equivalente mais próximo é <input type="date">. -->
<label style="display:inline-flex; flex-direction:column; gap:8px; font-family:'Roboto', sans-serif; color:hsl(var(--foreground, 110 78% 9%));">
  <span style="font-size:14px; font-weight:600;">Selecione uma data</span>
  <input
    type="date"
    style="
      padding:10px 14px;
      border:1px solid hsl(var(--border, 120 10% 88%));
      border-radius:12px;
      background:hsl(var(--card, 0 0% 100%));
      color:hsl(var(--foreground, 110 78% 9%));
      font-family:'Roboto', sans-serif; font-size:14px;
      outline:none; cursor:pointer;
    "
  />
</label>`}
      >
        <div className="flex flex-col items-start gap-3">
          <Calendar
            mode="single"
            selected={single}
            onSelect={setSingle}
            locale={ptBR}
            classNames={{ day_today: "" }}
            className={cn("rounded-xl border bg-card p-3 pointer-events-auto")}
          />
          <p className="text-sm text-muted-foreground font-mono">
            {single ? format(single, "PPP", { locale: ptBR }) : "Nenhuma data selecionada"}
          </p>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Calendário — intervalo de datas"
        description="Seleção de um período (data inicial e final), com limite mínimo e máximo. Útil para reservas, relatórios e filtros por período."
        code={`import type { DateRange } from "react-day-picker";

const [range, setRange] = useState<DateRange | undefined>();
const now = new Date();
const minDate = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
const maxDate = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
  fromDate={minDate}
  toDate={maxDate}
  locale={ptBR}
  className="rounded-xl border bg-card p-3 pointer-events-auto"
/>`}
        htmlCode={`<!-- Equivalente HTML simples para seleção de período -->
<style>
  .dt-range { display:flex; gap:12px; font-family:'Roboto', sans-serif; color:hsl(var(--foreground, 110 78% 9%)); }
  .dt-range label { display:flex; flex-direction:column; gap:6px; font-size:13px; }
  .dt-range input {
    padding:10px 14px; border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:12px; background:hsl(var(--card, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    font-family:'Roboto', sans-serif; font-size:14px;
    outline:none; cursor:pointer;
  }
  .dt-range input:focus { border-color:hsl(var(--ring, 155 93% 11%)); }
</style>

<div class="dt-range">
  <label>
    <span>Início</span>
    <input type="date" id="dt-from" />
  </label>
  <label>
    <span>Fim</span>
    <input type="date" id="dt-to" />
  </label>
</div>`}
      >
        <div className="flex flex-col items-start gap-3">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            fromDate={minDate}
            toDate={maxDate}
            locale={ptBR}
            classNames={{ day_today: "" }}
            className={cn("rounded-xl border bg-card p-3 pointer-events-auto")}
          />
          <p className="text-sm text-muted-foreground font-mono">
            {range?.from
              ? `${format(range.from, "PPP", { locale: ptBR })}${range.to ? ` → ${format(range.to, "PPP", { locale: ptBR })}` : ""}`
              : "Nenhum período selecionado"}
          </p>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="DatePicker — popover compacto"
        description="Botão que abre o calendário em um popover. Recomendado para formulários onde o espaço é limitado."
        code={`const [date, setDate] = useState<Date | undefined>();

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={ptBR}
      initialFocus
      className="p-3 pointer-events-auto"
    />
  </PopoverContent>
</Popover>`}
        htmlCode={`<!-- Equivalente compacto: botão estilizado abrindo input nativo -->
<button onclick="document.getElementById('dp-native').showPicker?.()" style="
  display:inline-flex; align-items:center; gap:8px;
  width:260px; padding:8px 14px;
  background:hsl(var(--background, 0 0% 100%));
  color:hsl(var(--foreground, 110 78% 9%));
  border:1px solid hsl(var(--border, 120 10% 88%));
  border-radius:12px;
  font-family:'Roboto', sans-serif; font-size:14px;
  text-align:left; cursor:pointer;
">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  <span id="dp-label">Selecione uma data</span>
</button>
<input id="dp-native" type="date" style="position:absolute; opacity:0; pointer-events:none;" oninput="document.getElementById('dp-label').textContent = new Date(this.value).toLocaleDateString('pt-BR', { day:'numeric', month:'long', year:'numeric' })" />`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={pickerTriggerRef}
              variant="outline"
              className={cn(
                "w-[260px] justify-start text-left font-normal",
                !picker && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {picker ? format(picker, "PPP", { locale: ptBR }) : "Selecione uma data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-auto p-0", pickerIsDark && "dark")} align="start">
            <Calendar
              mode="single"
              selected={picker}
              onSelect={setPicker}
              locale={ptBR}
              today={undefined}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </ComponentShowcase>

      <CalendarioPresets />
    </div>
  );
}

const presets = {
  "ultimos-3-dias": {
    text: "Últimos 3 dias",
    start: startOfDay(subDays(new Date(), 3)),
    end: endOfDay(new Date()),
  },
  "ultimos-7-dias": {
    text: "Últimos 7 dias",
    start: startOfDay(subWeeks(new Date(), 1)),
    end: endOfDay(new Date()),
  },
  "ultimos-14-dias": {
    text: "Últimos 14 dias",
    start: startOfDay(subWeeks(new Date(), 2)),
    end: endOfDay(new Date()),
  },
  "ultimo-mes": {
    text: "Último mês",
    start: startOfDay(subMonths(new Date(), 1)),
    end: endOfDay(new Date()),
  },
} as const;

type PresetKey = keyof typeof presets;

function CalendarioPresets() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [activePreset, setActivePreset] = useState<PresetKey | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = useIsDark(triggerRef);

  const applyPreset = (key: PresetKey) => {
    const p = presets[key];
    setRange({ from: p.start, to: p.end });
    setActivePreset(key);
  };

  return (
    <ComponentShowcase
      title="Calendário — intervalo com presets (compact)"
      description="Versão compacta em popover: o trigger mostra o período selecionado e abre um painel com atalhos rápidos (últimos 3, 7, 14 dias e último mês) ao lado do calendário."
      code={`import { startOfDay, subDays, subWeeks, subMonths, endOfDay } from "date-fns";

const presets = {
  "ultimos-3-dias":  { text: "Últimos 3 dias",  start: startOfDay(subDays(new Date(), 3)),   end: endOfDay(new Date()) },
  "ultimos-7-dias":  { text: "Últimos 7 dias",  start: startOfDay(subWeeks(new Date(), 1)),  end: endOfDay(new Date()) },
  "ultimos-14-dias": { text: "Últimos 14 dias", start: startOfDay(subWeeks(new Date(), 2)),  end: endOfDay(new Date()) },
  "ultimo-mes":      { text: "Último mês",      start: startOfDay(subMonths(new Date(), 1)), end: endOfDay(new Date()) },
};

const [range, setRange] = useState<DateRange | undefined>();

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-[280px] justify-start font-normal">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {range?.from ? \`\${format(range.from, "dd/MM/yy")} → \${range.to ? format(range.to, "dd/MM/yy") : "…"}\` : "Selecione um período"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0 flex" align="start">
    <div className="flex flex-col gap-1 p-3 border-r">
      {Object.entries(presets).map(([key, p]) => (
        <Button key={key} variant="ghost" size="sm" onClick={() => setRange({ from: p.start, to: p.end })}>
          {p.text}
        </Button>
      ))}
    </div>
    <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={1} locale={ptBR} />
  </PopoverContent>
</Popover>`}
        htmlCode={`<!-- Equivalente simples: <details> com presets e dois inputs nativos -->
<style>
  .dpr { font-family:'Roboto', sans-serif; color:hsl(var(--foreground, 110 78% 9%)); }
  .dpr summary {
    display:inline-flex; align-items:center; gap:8px;
    width:280px; padding:8px 14px;
    background:hsl(var(--background, 0 0% 100%));
    border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:12px; cursor:pointer; font-size:14px; list-style:none;
  }
  .dpr summary::-webkit-details-marker { display:none; }
  .dpr-panel {
    display:flex; gap:12px; padding:12px; margin-top:8px;
    border:1px solid hsl(var(--border, 120 10% 88%));
    background:hsl(var(--popover, 0 0% 100%));
    border-radius:12px;
  }
  .dpr-presets { display:flex; flex-direction:column; gap:4px; padding-right:12px; border-right:1px solid hsl(var(--border, 120 10% 88%)); }
  .dpr-presets button {
    padding:6px 12px; border:none; background:transparent;
    color:hsl(var(--foreground, 110 78% 9%));
    font-family:'Sora', sans-serif; font-weight:700;
    text-transform:uppercase; font-size:11px; cursor:pointer; text-align:left;
    border-radius:6px;
  }
  .dpr-presets button:hover, .dpr-presets button.active {
    background:hsl(var(--primary, 155 93% 11%));
    color:hsl(var(--primary-foreground, 0 0% 100%));
  }
  .dpr-inputs { display:flex; gap:8px; }
  .dpr-inputs input {
    padding:8px 12px; border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:8px; background:hsl(var(--card, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    font-family:'Roboto'; font-size:14px;
  }
</style>

<details class="dpr">
  <summary>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    <span>Selecione um período</span>
  </summary>
  <div class="dpr-panel">
    <div class="dpr-presets">
      <button onclick="setPreset(3)">Últimos 3 dias</button>
      <button onclick="setPreset(7)">Últimos 7 dias</button>
      <button onclick="setPreset(14)">Últimos 14 dias</button>
      <button onclick="setPreset(30)">Último mês</button>
    </div>
    <div class="dpr-inputs">
      <input type="date" id="dpr-from" />
      <input type="date" id="dpr-to" />
    </div>
  </div>
</details>

<script>
  function setPreset(days) {
    const to = new Date(); const from = new Date(); from.setDate(to.getDate() - days);
    document.getElementById('dpr-from').value = from.toISOString().slice(0, 10);
    document.getElementById('dpr-to').value = to.toISOString().slice(0, 10);
  }
</script>`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !range?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from
              ? `${format(range.from, "dd/MM/yy", { locale: ptBR })} → ${range.to ? format(range.to, "dd/MM/yy", { locale: ptBR }) : "…"}`
              : "Selecione um período"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0 flex flex-col md:flex-row", isDark && "dark")} align="start">
          <div className="flex flex-row md:flex-col gap-1 p-3 md:border-r border-border md:w-44 overflow-x-auto md:overflow-visible">
            {(Object.keys(presets) as PresetKey[]).map((key) => (
              <Button
                key={key}
                variant={activePreset === key ? "default" : "ghost"}
                size="sm"
                className="justify-start shrink-0"
                onClick={() => applyPreset(key)}
              >
                {presets[key].text}
              </Button>
            ))}
          </div>
          <Calendar
            mode="range"
            selected={range}
            onSelect={(r) => {
              setRange(r);
              setActivePreset(null);
            }}
            numberOfMonths={1}
            locale={ptBR}
            today={undefined}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </ComponentShowcase>
  );
}
