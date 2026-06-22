import React, { useState } from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";

const TABS = [
  { title: "Apple", value: "apple" },
  { title: "Orange", value: "orange" },
  { title: "Mango", value: "mango" },
];

const CONTENT: Record<string, string> = {
  apple: "Lorem ipsum dolor sit amet — conteúdo da aba Apple.",
  orange: "Lorem ipsum dolor sit amet — conteúdo da aba Orange.",
  mango: "Lorem ipsum dolor sit amet — conteúdo da aba Mango.",
};

export function TabsGeistWidget() {
  const [selected, setSelected] = useState("apple");

  return (
    <ComponentShowcase
      title="Tabs"
      description="Tabs minimalistas inspiradas no Geist: rótulos discretos, divisor inferior contínuo e indicador em barra sob a aba ativa. Útil para alternar visualizações dentro de um mesmo contexto sem competir com o conteúdo."
      code={`const TABS = [
  { title: "Apple", value: "apple" },
  { title: "Orange", value: "orange" },
  { title: "Mango", value: "mango" },
];

const [selected, setSelected] = useState("apple");

<div className="w-full">
  <div role="tablist" className="relative flex items-center gap-6 border-b">
    {TABS.map((t) => {
      const active = selected === t.value;
      return (
        <button
          key={t.value}
          role="tab"
          aria-selected={active}
          onClick={() => setSelected(t.value)}
          className={cn(
            "relative -mb-px py-3 text-sm font-roboto transition-colors",
            active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t.title}
          {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground rounded-full" />}
        </button>
      );
    })}
  </div>
  <div className="pt-5 text-sm font-roboto text-foreground">
    {CONTENT[selected]}
  </div>
</div>`}
      htmlCode={`<style>
  .gtabs { font-family:'Roboto', sans-serif; }
  .gtabs__list { display:flex; gap:24px; align-items:center; border-bottom:1px solid hsl(var(--border, 120 10% 88%)); }
  .gtabs__tab {
    position:relative; background:none; border:none; cursor:pointer;
    padding:12px 0; margin-bottom:-1px;
    font-size:14px; color:hsl(var(--muted-foreground, 110 10% 40%));
    transition:color .15s ease;
  }
  .gtabs__tab:hover { color:hsl(var(--foreground, 110 78% 9%)); }
  .gtabs__tab[aria-selected="true"] { color:hsl(var(--foreground, 110 78% 9%)); font-weight:500; }
  .gtabs__tab[aria-selected="true"]::after {
    content:""; position:absolute; left:0; right:0; bottom:-1px;
    height:2px; background:hsl(var(--foreground, 110 78% 9%)); border-radius:2px;
  }
  .gtabs__panel { padding-top:20px; font-size:14px; color:hsl(var(--foreground, 110 78% 9%)); }
</style>

<div class="gtabs">
  <div class="gtabs__list" role="tablist">
    <button class="gtabs__tab" role="tab" aria-selected="true"  data-v="apple">Apple</button>
    <button class="gtabs__tab" role="tab" aria-selected="false" data-v="orange">Orange</button>
    <button class="gtabs__tab" role="tab" aria-selected="false" data-v="mango">Mango</button>
  </div>
  <div class="gtabs__panel" id="gtabs-panel">Lorem ipsum dolor sit amet — conteúdo da aba Apple.</div>
</div>

<script>
  (function () {
    const map = {
      apple: "Lorem ipsum dolor sit amet — conteúdo da aba Apple.",
      orange: "Lorem ipsum dolor sit amet — conteúdo da aba Orange.",
      mango: "Lorem ipsum dolor sit amet — conteúdo da aba Mango."
    };
    document.querySelectorAll('.gtabs__tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gtabs__tab').forEach(b => b.setAttribute('aria-selected', 'false'));
        btn.setAttribute('aria-selected', 'true');
        document.getElementById('gtabs-panel').textContent = map[btn.dataset.v];
      });
    });
  })();
</script>`}
    >
      <div className="w-full">
        <div role="tablist" className="relative flex items-center gap-6 border-b border-border">
          {TABS.map((t) => {
            const active = selected === t.value;
            return (
              <button
                key={t.value}
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(t.value)}
                className={cn(
                  "relative -mb-px py-3 text-sm font-roboto transition-colors outline-none focus-visible:text-foreground",
                  active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.title}
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground rounded-full" />
                )}
              </button>
            );
          })}
        </div>
        <div className="pt-5 text-sm font-roboto text-foreground min-h-[60px]">
          {CONTENT[selected]}
        </div>
      </div>
    </ComponentShowcase>
  );
}
