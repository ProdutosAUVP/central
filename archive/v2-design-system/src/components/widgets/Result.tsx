import React from "react";
import { CheckCircle2, XCircle, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { cn } from "@/lib/utils";

type ResultStatus = "success" | "error" | "403";

const config = {
  success: { Icon: CheckCircle2, color: "text-success bg-success/15", title: "Pagamento confirmado", desc: "Seu acesso à AUVP Pro foi liberado. Boas-vindas!" },
  error: { Icon: XCircle, color: "text-destructive bg-destructive/15", title: "Falha no pagamento", desc: "Não conseguimos processar seu cartão. Tente outro método." },
  "403": { Icon: ShieldOff, color: "text-warning bg-warning/15", title: "Acesso negado", desc: "Você não tem permissão para visualizar este conteúdo." },
};

function Result({ status }: { status: ResultStatus }) {
  const c = config[status];
  return (
    <div className="flex-1 min-w-[260px] border rounded-xl p-8 text-center bg-card">
      <div className={cn("inline-flex items-center justify-center h-16 w-16 rounded-full mb-4", c.color)}>
        <c.Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold font-anek mb-2">{c.title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{c.desc}</p>
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm">Voltar</Button>
        <Button size="sm">{status === "success" ? "Acessar plataforma" : "Tentar novamente"}</Button>
      </div>
    </div>
  );
}

export function ResultWidget() {
  return (
    <ComponentShowcase
      title="Result (página de resultado)"
      description="Tela cheia de feedback após operações críticas (pagamento, envio de formulário, erro 403/404/500). Usa tokens semânticos success/error/warning."
      code={`type ResultStatus = "success" | "error" | "403";

const config = {
  success: { Icon: CheckCircle2, color: "text-success bg-success/15", title: "Pagamento confirmado", desc: "Seu acesso à AUVP Pro foi liberado. Boas-vindas!" },
  error: { Icon: XCircle, color: "text-destructive bg-destructive/15", title: "Falha no pagamento", desc: "Não conseguimos processar seu cartão. Tente outro método." },
  "403": { Icon: ShieldOff, color: "text-warning bg-warning/15", title: "Acesso negado", desc: "Você não tem permissão para visualizar este conteúdo." },
};

function Result({ status }: { status: ResultStatus }) {
  const c = config[status];
  return (
    <div className="flex-1 min-w-[260px] border rounded-xl p-8 text-center bg-card">
      <div className={cn("inline-flex items-center justify-center h-16 w-16 rounded-full mb-4", c.color)}>
        <c.Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold font-anek mb-2">{c.title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{c.desc}</p>
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm">Voltar</Button>
        <Button size="sm">{status === "success" ? "Acessar plataforma" : "Tentar novamente"}</Button>
      </div>
    </div>
  );
}

<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
  <Result status="success" />
  <Result status="error" />
  <Result status="403" />
</div>`}
      htmlCode={`<style>
  .result { border:1px solid #e5e7eb; border-radius:12px; padding:32px; text-align:center; background:#fff; max-width:440px; }
  .result-icon { display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; margin-bottom:16px; font-size:32px; }
  .result-icon.success { background:rgba(34,197,94,.15); color:#16a34a; }
  .result-icon.error { background:rgba(239,68,68,.15); color:#dc2626; }
  .result-icon.warn { background:rgba(245,158,11,.15); color:#d97706; }
  .result h3 { font-family:'Anek Latin'; font-size:20px; font-weight:700; margin:0 0 8px; }
  .result p { color:#6b7280; font-size:14px; margin:0 0 24px; }
  .result-actions { display:flex; gap:8px; justify-content:center; }
  .result-actions button { padding:8px 16px; border-radius:8px; font-family:'Roboto'; font-weight:700; font-size:12px; text-transform:uppercase; cursor:pointer; border:1px solid #e5e7eb; background:#fff; }
  .result-actions .primary { background:hsl(var(--primary)); color:#fff; border:none; }
</style>

<div class="result">
  <div class="result-icon success">✓</div>
  <h3>Pagamento confirmado</h3>
  <p>Seu acesso foi liberado.</p>
  <div class="result-actions">
    <button>Voltar</button>
    <button class="primary">Acessar plataforma</button>
  </div>
</div>`}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <Result status="success" />
        <Result status="error" />
        <Result status="403" />
      </div>
    </ComponentShowcase>
  );
}
