import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CodeBlock } from "@/components/ui/code-block";

const faqItems = [
  { q: "O que está incluso?", a: "Acesso completo à plataforma de simulações e todos os módulos disponíveis." },
  { q: "Posso cancelar a qualquer momento?", a: "Sim, sem multas ou taxas adicionais. O cancelamento é imediato." },
  { q: "Como funciona o suporte?", a: "Suporte via chat, e-mail e comunidade exclusiva de alunos." },
];

export function FaqDuvidas() {
  return (
    <div className="space-y-12">
      <div>
        <div className="bg-muted/50 p-8 rounded-2xl">
          <div className="bg-card p-6 md:p-12 rounded-xl shadow-sm border border-border">
            <h2 className="font-bold font-anek text-left mb-6 text-accent text-3xl">Dúvidas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`light-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold text-foreground">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <CodeBlock collapsible
        tabs={[
          {
            label: "React",
            language: "tsx",
            code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqItems = [
  { q: "O que está incluso?", a: "Acesso completo à plataforma de simulações e todos os módulos disponíveis." },
  { q: "Posso cancelar a qualquer momento?", a: "Sim, sem multas ou taxas adicionais. O cancelamento é imediato." },
  { q: "Como funciona o suporte?", a: "Suporte via chat, e-mail e comunidade exclusiva de alunos." },
];

export function FaqDuvidas() {
  return (
    <div className="bg-muted/50 p-8 rounded-2xl">
      <div className="bg-card p-6 md:p-12 rounded-xl shadow-sm border border-border">
        <h2 className="font-bold font-anek text-left mb-6 text-accent text-3xl">
          Dúvidas Frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={\`faq-\${i}\`}>
              <AccordionTrigger className="text-lg font-semibold text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}`
          },
          {
            label: "HTML / CSS / JS",
            language: "html",
            code: `<!-- FAQ Dúvidas — espelho exato do preview -->
<div style="background:hsl(var(--muted) / 0.5); padding:2rem; border-radius:1rem;">
  <div style="background:hsl(var(--card)); padding:3rem; border-radius:0.75rem;
              box-shadow:0 1px 3px rgba(0,0,0,0.05);
              border:1px solid hsl(var(--border));">
    <h2 style="font-family:'Anek Latin',sans-serif; font-weight:700;
               text-align:left; margin:0 0 1.5rem 0;
               color:hsl(var(--accent)); font-size:1.875rem;">
      Dúvidas Frequentes
    </h2>

    <div class="faq" id="faq">
      <details class="faq-item">
        <summary>O que está incluso?</summary>
        <p>Acesso completo à plataforma de simulações e todos os módulos disponíveis.</p>
      </details>
      <details class="faq-item">
        <summary>Posso cancelar a qualquer momento?</summary>
        <p>Sim, sem multas ou taxas adicionais. O cancelamento é imediato.</p>
      </details>
      <details class="faq-item">
        <summary>Como funciona o suporte?</summary>
        <p>Suporte via chat, e-mail e comunidade exclusiva de alunos.</p>
      </details>
    </div>
  </div>
</div>

<style>
  .faq-item { border-bottom:1px solid hsl(var(--border)); }
  .faq-item summary {
    list-style:none;
    cursor:pointer;
    padding:1rem 0;
    font-family:'Roboto',sans-serif;
    font-size:1.125rem;
    font-weight:600;
    color:hsl(var(--foreground));
    display:flex; justify-content:space-between; align-items:center;
  }
  .faq-item summary::-webkit-details-marker { display:none; }
  .faq-item summary::after {
    content:"›"; transform:rotate(90deg);
    transition:transform .2s ease;
    color:hsl(var(--muted-foreground)); font-size:1.25rem;
  }
  .faq-item[open] summary::after { transform:rotate(-90deg); }
  .faq-item p {
    color:hsl(var(--muted-foreground));
    padding:0 0 1rem 0; margin:0;
    font-family:'Roboto',sans-serif;
  }
</style>

<script>
  // Garantir comportamento "single collapsible": só um aberto por vez.
  document.querySelectorAll('#faq .faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('#faq .faq-item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
</script>`
          }
        ]}
      />
    </div>
  );
}
