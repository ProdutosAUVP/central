import React from "react";
import { Award, CheckCircle, Download } from "lucide-react";

export function PlataformaCertificados() {
  return (
    <div className="space-y-8">
      {/* Certificate Preview */}
      <div className="bg-muted/50 p-8 rounded-2xl flex justify-center">
        <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-lg p-8 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="h-8 w-8 text-accent" />
          </div>
          <p className="text-xs font-bold text-accent uppercase tracking-[2px] mb-2 font-roboto">Certificado de Conclusão</p>
          <h3 className="text-2xl font-bold font-anek text-foreground mb-1">AUVP Escola</h3>
          <p className="text-muted-foreground font-roboto mb-6">Certifica que o aluno concluiu com sucesso o módulo</p>
          
          <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6">
            <h4 className="text-xl font-bold font-anek text-foreground mb-1">Renda Fixa Avançada</h4>
            <p className="text-sm text-muted-foreground font-roboto">12 aulas • 8h30 de conteúdo • Nota: 9.2/10</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-accent-foreground text-xs font-bold">R</div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground font-anek">Raul Sena</p>
              <p className="text-[10px] text-muted-foreground">Instrutor AUVP</p>
            </div>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-anek text-sm uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Download className="h-4 w-4" /> Baixar Certificado PDF
          </button>
        </div>
      </div>

      {/* Regras */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h4 className="font-bold text-foreground font-anek mb-3 flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" /> Regras de Emissão
        </h4>
        <ul className="space-y-2 text-sm text-foreground/80 font-roboto">
          <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Certificado emitido automaticamente ao concluir <strong>100% das aulas</strong> do módulo</li>
          <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Disponível em <strong>PDF</strong> com QR code de verificação</li>
          <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Nome do aluno, instrutor, carga horária e <strong>nota final</strong></li>
          <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Compartilhável nas redes sociais com <strong>link público</strong> de validação</li>
        </ul>
      </div>
    </div>
  );
}
