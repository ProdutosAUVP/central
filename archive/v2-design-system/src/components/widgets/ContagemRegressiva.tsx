import React from "react";
import { useBrand } from "@/contexts/BrandContext";
import { CodeBlock } from "@/components/ui/code-block";

export function ContagemRegressiva() {
  const { brand } = useBrand();

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Blur backgrounds */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />

        <div className="bg-card/85 backdrop-blur-[20px] border border-border/50 shadow-lg rounded-xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-10 min-h-[300px]">
            <div className="text-center lg:text-left flex-1 z-10">
              <div className="mb-8">
                <span className="inline-block font-anek text-[13px] font-bold text-accent uppercase tracking-[1.5px] bg-accent/10 border border-accent/20 px-[14px] py-[6px] rounded-lg mb-[15px] leading-snug">
                  Inscrições em breve para a turma 54
                </span>
                <h2 className="text-foreground font-anek font-semibold text-3xl md:text-4xl lg:text-[41px] m-0 mb-3 leading-tight uppercase tracking-tight">
                  Vagas Limitadas
                </h2>
                <p className="text-muted-foreground font-roboto text-base lg:text-[17px] font-normal max-w-[500px] mx-auto lg:mx-0 leading-relaxed">
                  O cronômetro abaixo indica o tempo exato para você começar a sua jornada. Não perca esta oportunidade.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-[480px] mx-auto lg:mx-0">
                {[
                { value: "05", label: "Dias" },
                { value: "12", label: "Horas" },
                { value: "30", label: "Minutos" },
                { value: "45", label: "Segundos" }].
                map((item) =>
                <div key={item.label} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-3 md:py-4 flex flex-col items-center justify-center shadow-sm">
                    <span className="font-anek text-3xl md:text-[42px] font-extrabold text-foreground leading-none mb-1">{item.value}</span>
                    <span className="font-roboto text-[9px] uppercase text-accent font-bold tracking-[1px]">{item.label}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center z-10 w-full relative mt-8 lg:mt-0">
              <div className="w-full max-w-[400px] bg-muted rounded-xl aspect-video flex items-center justify-center">
                <span className="text-muted-foreground font-mono text-xs">[Imagem]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock collapsible
        tabs={[
          {
            label: "React",
            language: "tsx",
            code: `import { useEffect, useState } from "react";

export function ContagemRegressiva() {
  const [t, setT] = useState({ days: 5, hours: 12, minutes: 30, seconds: 45 });

  useEffect(() => {
    const target = new Date("2025-12-31T23:59:59").getTime();
    const id = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setT({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const units: Array<[keyof typeof t, string]> = [
    ["days", "Dias"],
    ["hours", "Horas"],
    ["minutes", "Minutos"],
    ["seconds", "Segundos"],
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />

      <div className="bg-card/85 backdrop-blur-[20px] border border-border/50 shadow-lg rounded-xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-10 min-h-[300px]">
          <div className="text-center lg:text-left flex-1 z-10">
            <div className="mb-8">
              <span className="inline-block font-anek text-[13px] font-bold text-accent
                               uppercase tracking-[1.5px] bg-accent/10 border border-accent/20
                               px-[14px] py-[6px] rounded-lg mb-[15px]">
                Inscrições em breve para a turma 54
              </span>
              <h2 className="text-foreground font-anek font-semibold
                             text-3xl md:text-4xl lg:text-[41px]
                             m-0 mb-3 leading-tight uppercase tracking-tight">
                Vagas Limitadas
              </h2>
              <p className="text-muted-foreground font-roboto text-base lg:text-[17px]
                            max-w-[500px] mx-auto lg:mx-0 leading-relaxed">
                O cronômetro abaixo indica o tempo exato para você começar a sua jornada.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-[480px] mx-auto lg:mx-0">
              {units.map(([key, label]) => (
                <div key={label}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl
                             p-3 md:py-4 flex flex-col items-center justify-center shadow-sm">
                  <span className="font-anek text-3xl md:text-[42px] font-extrabold
                                   text-foreground leading-none mb-1">
                    {String(t[key]).padStart(2, "0")}
                  </span>
                  <span className="font-roboto text-[9px] uppercase text-accent
                                   font-bold tracking-[1px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center z-10 w-full mt-8 lg:mt-0">
            <div className="w-full max-w-[400px] bg-muted rounded-xl aspect-video
                            flex items-center justify-center">
              <span className="text-muted-foreground font-mono text-xs">[Imagem]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`
          },
          {
            label: "HTML / CSS / JS",
            language: "html",
            code: `<!-- Contagem Regressiva — espelho do preview -->
<section class="cd-wrap">
  <div class="cd-blur cd-blur-tr"></div>
  <div class="cd-blur cd-blur-bl"></div>

  <div class="cd-card">
    <div class="cd-content">
      <span class="cd-pretag">Inscrições em breve para a turma 54</span>
      <h2 class="cd-title">Vagas Limitadas</h2>
      <p class="cd-sub">
        O cronômetro abaixo indica o tempo exato para você começar a sua jornada.
      </p>

      <div class="cd-grid">
        <div class="cd-unit"><span id="cd-days">05</span><small>Dias</small></div>
        <div class="cd-unit"><span id="cd-hours">12</span><small>Horas</small></div>
        <div class="cd-unit"><span id="cd-minutes">30</span><small>Minutos</small></div>
        <div class="cd-unit"><span id="cd-seconds">45</span><small>Segundos</small></div>
      </div>
    </div>

    <div class="cd-image">
      <div class="cd-image-placeholder">[Imagem]</div>
    </div>
  </div>
</section>

<style>
  .cd-wrap{ position:relative; overflow:hidden; border-radius:1rem; }
  .cd-blur{ position:absolute; width:16rem; height:16rem; border-radius:50%; filter:blur(48px); z-index:0; }
  .cd-blur-tr{ top:0; right:0; background:hsl(var(--accent) / .2); }
  .cd-blur-bl{ bottom:0; left:0; background:hsl(var(--accent) / .1); }

  .cd-card{
    position:relative; z-index:10;
    background:hsl(var(--card) / .85); backdrop-filter:blur(20px);
    border:1px solid hsl(var(--border) / .5); border-radius:.75rem;
    box-shadow:0 10px 25px -5px rgba(0,0,0,.08);
    display:flex; gap:2.5rem; padding:3rem; min-height:300px;
    align-items:center; justify-content:space-between;
  }
  @media (max-width:1024px){ .cd-card{ flex-direction:column; text-align:center; } }

  .cd-content{ flex:1; }
  .cd-pretag{
    display:inline-block; font-family:'Anek Latin',sans-serif; font-weight:700;
    font-size:13px; color:hsl(var(--accent)); text-transform:uppercase;
    letter-spacing:1.5px; background:hsl(var(--accent) / .1);
    border:1px solid hsl(var(--accent) / .2);
    padding:6px 14px; border-radius:.5rem; margin-bottom:15px;
  }
  .cd-title{
    font-family:'Anek Latin',sans-serif; font-weight:600;
    font-size:clamp(1.875rem, 4vw, 41px);
    text-transform:uppercase; letter-spacing:-.025em;
    color:hsl(var(--foreground)); margin:0 0 .75rem 0; line-height:1.1;
  }
  .cd-sub{
    font-family:'Roboto',sans-serif; font-size:17px;
    color:hsl(var(--muted-foreground)); max-width:500px;
    margin:0 0 2rem 0; line-height:1.6;
  }
  .cd-grid{
    display:grid; grid-template-columns:repeat(4, 1fr); gap:.75rem; max-width:480px;
  }
  .cd-unit{
    background:hsl(var(--card) / .6); backdrop-filter:blur(4px);
    border:1px solid hsl(var(--border) / .5); border-radius:.75rem;
    padding:1rem .75rem; display:flex; flex-direction:column;
    align-items:center; box-shadow:0 1px 2px rgba(0,0,0,.05);
  }
  .cd-unit span{
    font-family:'Anek Latin',sans-serif; font-weight:800;
    font-size:42px; line-height:1; color:hsl(var(--foreground));
    margin-bottom:.25rem;
  }
  .cd-unit small{
    font-family:'Roboto',sans-serif; font-size:9px; font-weight:700;
    text-transform:uppercase; letter-spacing:1px; color:hsl(var(--accent));
  }

  .cd-image{ flex:1; width:100%; max-width:400px; }
  .cd-image-placeholder{
    aspect-ratio:16/9; background:hsl(var(--muted));
    border-radius:.75rem; display:flex; align-items:center; justify-content:center;
    color:hsl(var(--muted-foreground)); font-family:ui-monospace,monospace; font-size:12px;
  }
</style>

<script>
  const target = new Date("2025-12-31T23:59:59").getTime();
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    document.getElementById("cd-days").textContent    = pad(Math.floor(diff / 86_400_000));
    document.getElementById("cd-hours").textContent   = pad(Math.floor((diff % 86_400_000) / 3_600_000));
    document.getElementById("cd-minutes").textContent = pad(Math.floor((diff % 3_600_000) / 60_000));
    document.getElementById("cd-seconds").textContent = pad(Math.floor((diff % 60_000) / 1_000));
  };
  tick();
  setInterval(tick, 1000);
</script>`
          }
        ]}
      />
      
    </div>);

}