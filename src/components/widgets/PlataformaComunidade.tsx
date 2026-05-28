import React, { useState } from "react";
import { MessageCircle, ChevronUp, ChevronDown, ThumbsUp, Share2, ShieldCheck, CheckCircle } from "lucide-react";

export function PlataformaComunidade() {
  const [showReplies, setShowReplies] = useState(false);
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  return (
    <div className="space-y-8">
      {/* Thread */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="bg-muted/50 border-b border-border px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-accent" />
            <div>
              <span className="text-sm font-bold font-anek text-foreground">Dúvidas da Aula</span>
              <span className="text-xs text-muted-foreground font-roboto ml-2">01. O despertar financeiro</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="text-xs border border-border rounded-lg px-2 py-1 text-muted-foreground font-roboto bg-background">
              <option>Mais recentes</option>
              <option>Mais votados</option>
              <option>Sem resposta</option>
            </select>
            <button
              onClick={() => setShowNewQuestion(!showNewQuestion)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-bold font-anek transition-colors uppercase"
            >
              Perguntar
            </button>
          </div>
        </div>

        {/* New question form */}
        {showNewQuestion && (
          <div className="border-b border-border p-6 bg-primary/5">
            <textarea
              placeholder="Escreva sua dúvida..."
              className="w-full text-sm border border-border rounded-lg px-3 py-3 h-24 resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-primary/30 font-roboto mb-3 bg-background text-foreground"
            />
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground font-roboto">Suporta Markdown básico</p>
              <div className="flex gap-2">
                <button onClick={() => setShowNewQuestion(false)} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg font-roboto transition-colors">
                  Cancelar
                </button>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-bold font-anek transition-colors uppercase">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="divide-y divide-border">
          {/* Thread 1 */}
          <div className="p-6">
            <div className="flex gap-4">
              {/* Vote */}
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                <button className="text-muted-foreground/40 hover:text-accent transition-colors"><ChevronUp className="h-5 w-5" /></button>
                <span className="text-sm font-bold text-foreground font-anek">12</span>
                <button className="text-muted-foreground/40 hover:text-destructive transition-colors"><ChevronDown className="h-5 w-5" /></button>
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">M</div>
                  <span className="text-sm font-bold text-foreground font-anek">Maria C.</span>
                  <span className="text-[10px] text-muted-foreground font-roboto">há 3 dias</span>
                </div>
                <p className="text-sm text-foreground/80 font-roboto leading-relaxed mb-3">
                  Qual a diferença prática entre a taxa Selic e o CDI? Ambos parecem acompanhar valores similares, mas não entendi quando usar um vs outro como referência.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 font-roboto"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> 3 respostas
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-roboto">
                    <Share2 className="h-3.5 w-3.5" /> Compartilhar
                  </button>
                </div>

                {/* Replies */}
                {showReplies && (
                  <div className="mt-4 space-y-3 pl-4 border-l-2 border-accent/30">
                    {/* Instructor Reply */}
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-accent-foreground text-xs font-bold">R</div>
                        <span className="text-sm font-bold text-foreground font-anek">Raul Sena</span>
                        <span className="text-[9px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded uppercase tracking-wider">Instrutor</span>
                        <span className="text-[10px] text-muted-foreground font-roboto">há 2 dias</span>
                      </div>
                      <p className="text-sm text-foreground/80 font-roboto leading-relaxed">
                        Ótima pergunta! A Selic é a taxa básica de juros definida pelo COPOM/Banco Central. O CDI caminha muito próximo da Selic (~0.10% abaixo). Na prática, investimentos de renda fixa usam o CDI como referência porque é a taxa do mercado interbancário.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" /> 8
                        </button>
                      </div>
                    </div>

                    {/* Student Reply */}
                    <div className="rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">P</div>
                        <span className="text-sm font-bold text-foreground font-anek">Pedro R.</span>
                        <span className="text-[10px] text-muted-foreground font-roboto">há 1 dia</span>
                      </div>
                      <p className="text-sm text-foreground/80 font-roboto leading-relaxed">
                        Complementando: o site do Banco Central publica ambas as taxas diariamente. Vale acompanhar!
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" /> 3
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thread 2 - Unanswered */}
          <div className="p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                <button className="text-muted-foreground/40 hover:text-accent transition-colors"><ChevronUp className="h-5 w-5" /></button>
                <span className="text-sm font-bold text-foreground font-anek">5</span>
                <button className="text-muted-foreground/40 hover:text-destructive transition-colors"><ChevronDown className="h-5 w-5" /></button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">A</div>
                  <span className="text-sm font-bold text-foreground font-anek">Ana L.</span>
                  <span className="text-[10px] text-muted-foreground font-roboto">há 5 horas</span>
                  <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Sem resposta</span>
                </div>
                <p className="text-sm text-foreground/80 font-roboto leading-relaxed mb-3">
                  No minuto 18:30 o Raul menciona "marcação a mercado". Alguém pode explicar de forma simples o que isso significa na prática para quem tem Tesouro IPCA+?
                </p>
                <button className="text-xs text-accent font-bold hover:text-accent/80 transition-colors flex items-center gap-1 font-roboto">
                  <MessageCircle className="h-3.5 w-3.5" /> Responder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <h4 className="font-bold text-foreground font-anek mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" /> Regras da Comunidade
          </h4>
          <ul className="space-y-2 text-sm text-foreground/80 font-roboto">
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Perguntas vinculadas ao <strong>contexto da aula</strong> são priorizadas</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Instrutores têm badge <strong>"Instrutor"</strong> com destaque visual</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Sistema de <strong>votos</strong> para elevar as melhores respostas</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> <strong>Notificação</strong> via e-mail quando alguém responde sua dúvida</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Moderação automática com filtro de <strong>spam e links externos</strong></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
