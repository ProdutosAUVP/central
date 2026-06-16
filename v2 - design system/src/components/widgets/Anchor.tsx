import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

const ANCHORS = [
  { id: "anc-intro", label: "Introdução" },
  { id: "anc-conceitos", label: "Conceitos" },
  { id: "anc-aplicacao", label: "Aplicação" },
  { id: "anc-conclusao", label: "Conclusão" },
];

export function AnchorWidget() {
  const [active, setActive] = useState("anc-intro");

  useEffect(() => {
    const onScroll = () => {
      let current = ANCHORS[0].id;
      for (const a of ANCHORS) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= 120) current = a.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ComponentShowcase
      title="Anchor (navegação com scroll spy)"
      description="Menu lateral de âncoras que rola até a seção e destaca automaticamente o item visível. Usa borda lateral (left border) como indicador ativo."
      code={`const ANCHORS = [
  { id: "anc-intro", label: "Introdução" },
  { id: "anc-conceitos", label: "Conceitos" },
  { id: "anc-aplicacao", label: "Aplicação" },
  { id: "anc-conclusao", label: "Conclusão" },
];

const [active, setActive] = useState("anc-intro");

useEffect(() => {
  const onScroll = () => {
    let current = ANCHORS[0].id;
    for (const a of ANCHORS) {
      const el = document.getElementById(a.id);
      if (el && el.getBoundingClientRect().top <= 120) current = a.id;
    }
    setActive(current);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}, []);

<div className="w-full grid grid-cols-[200px_1fr] gap-6">
  <nav className="sticky top-20 self-start border-l border-border">
    {ANCHORS.map((a) => (
      <a
        key={a.id}
        href={\`#\${a.id}\`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className={cn(
          "block pl-3 py-1.5 -ml-px border-l-2 text-sm font-roboto transition-colors",
          active === a.id
            ? "border-accent text-accent font-semibold"
            : "border-transparent text-muted-foreground hover:text-foreground"
        )}
      >
        {a.label}
      </a>
    ))}
  </nav>
  <div className="space-y-6">
    {ANCHORS.map((a) => (
      <div key={a.id} id={a.id} className="rounded-lg border bg-card p-4 min-h-[120px]">
        <h4 className="font-anek font-bold text-lg mb-2">{a.label}</h4>
        <p className="text-sm text-muted-foreground font-roboto">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus.
        </p>
      </div>
    ))}
  </div>
</div>`}
      htmlCode={`<nav id="anchor-nav" style="border-left:1px solid #e5e7eb; padding-left:0;">
  <a href="#sec1" data-id="sec1">Introdução</a>
  <a href="#sec2" data-id="sec2">Conceitos</a>
  <a href="#sec3" data-id="sec3">Aplicação</a>
</nav>

<style>
  #anchor-nav a { display:block; padding:6px 12px; margin-left:-1px; border-left:2px solid transparent; color:#6b7280; font-family:'Roboto'; text-decoration:none; }
  #anchor-nav a.active { border-color:hsl(var(--primary)); color:hsl(var(--primary)); font-weight:600; }
</style>

<script>
  const links = document.querySelectorAll('#anchor-nav a');
  function update() {
    let current = links[0].dataset.id;
    links.forEach(l => {
      const el = document.getElementById(l.dataset.id);
      if (el && el.getBoundingClientRect().top <= 120) current = l.dataset.id;
    });
    links.forEach(l => l.classList.toggle('active', l.dataset.id === current));
  }
  window.addEventListener('scroll', update); update();
</script>`}
    >
      <div className="w-full grid grid-cols-[200px_1fr] gap-6">
        <nav className="sticky top-20 self-start border-l border-border">
          {ANCHORS.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "block pl-3 py-1.5 -ml-px border-l-2 text-sm font-roboto transition-colors",
                active === a.id
                  ? "border-accent text-accent font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {a.label}
            </a>
          ))}
        </nav>
        <div className="space-y-6">
          {ANCHORS.map((a) => (
            <div key={a.id} id={a.id} className="rounded-lg border bg-card p-4 min-h-[120px]">
              <h4 className="font-anek font-bold text-lg mb-2">{a.label}</h4>
              <p className="text-sm text-muted-foreground font-roboto">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus.
              </p>
            </div>
          ))}
        </div>
      </div>
    </ComponentShowcase>
  );
}
