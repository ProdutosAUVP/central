import React from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

const items = [
  { label: "Nome", value: "Maria Silva" },
  { label: "CPF", value: "123.456.789-00" },
  { label: "E-mail", value: "maria@auvp.com.br" },
  { label: "Telefone", value: "(11) 98765-4321" },
  { label: "Plano", value: "AUVP Pro Anual" },
  { label: "Status", value: "Ativo" },
  { label: "Data de adesão", value: "12 de janeiro de 2026" },
  { label: "Próxima cobrança", value: "12 de janeiro de 2027" },
];

export function DescriptionsWidget() {
  return (
    <ComponentShowcase
      title="Descriptions (lista de propriedades)"
      description="Apresenta pares chave/valor estruturados em grid responsivo. Padrão para páginas de detalhe (perfil, pedido, fatura) — substitui listas DL com melhor leitura."
      code={`<dl className="border rounded-xl divide-y bg-card">
  {items.map((it, i) => (
    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-1 px-5 py-3">
      <dt className="text-xs font-bold uppercase tracking-wider font-roboto text-muted-foreground">
        {it.label}
      </dt>
      <dd className="md:col-span-2 text-sm font-roboto">{it.value}</dd>
    </div>
  ))}
</dl>`}
      htmlCode={`<style>
  .desc { border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:12px; background:hsl(var(--card, 0 0% 100%)); overflow:hidden; }
  .desc-row { display:grid; grid-template-columns:1fr 2fr; gap:4px; padding:12px 20px; border-bottom:1px solid hsl(var(--border, 120 10% 88%)); }
  .desc-row:last-child { border-bottom:none; }
  .desc-label { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:hsl(var(--muted-foreground, 110 10% 40%)); font-family:'Roboto', sans-serif; }
  .desc-value { font-size:14px; font-family:'Roboto', sans-serif; color:hsl(var(--foreground, 110 78% 9%)); }
  @media (max-width:640px) { .desc-row { grid-template-columns:1fr; } }
</style>

<dl class="desc">
  <div class="desc-row"><dt class="desc-label">Nome</dt><dd class="desc-value">Maria Silva</dd></div>
  <div class="desc-row"><dt class="desc-label">CPF</dt><dd class="desc-value">123.456.789-00</dd></div>
  <div class="desc-row"><dt class="desc-label">E-mail</dt><dd class="desc-value">maria@auvp.com.br</dd></div>
  <div class="desc-row"><dt class="desc-label">Telefone</dt><dd class="desc-value">(11) 98765-4321</dd></div>
  <div class="desc-row"><dt class="desc-label">Plano</dt><dd class="desc-value">AUVP Pro Anual</dd></div>
  <div class="desc-row"><dt class="desc-label">Status</dt><dd class="desc-value">Ativo</dd></div>
  <div class="desc-row"><dt class="desc-label">Data de adesão</dt><dd class="desc-value">12 de janeiro de 2026</dd></div>
  <div class="desc-row"><dt class="desc-label">Próxima cobrança</dt><dd class="desc-value">12 de janeiro de 2027</dd></div>
</dl>`}
    >
      <dl className="w-full border rounded-xl divide-y bg-card overflow-hidden">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-1 px-5 py-3">
            <dt className="text-xs font-bold uppercase tracking-wider font-roboto text-muted-foreground">
              {it.label}
            </dt>
            <dd className="md:col-span-2 text-sm font-roboto text-foreground">{it.value}</dd>
          </div>
        ))}
      </dl>
    </ComponentShowcase>
  );
}
