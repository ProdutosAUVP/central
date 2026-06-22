import React, { useState } from "react";
import { PenLine, Trash2, Send, Info, CheckCircle, Lightbulb } from "lucide-react";

const initialNotes = [
  {
    id: 1,
    timestamp: "05:32",
    lesson: "Aula 01",
    ago: "há 2 dias",
    text: 'Conceito de juros compostos: "juros sobre juros". Lembrar da fórmula M = C(1+i)^t para as próximas aulas de renda fixa.',
    highlight: true,
  },
  {
    id: 2,
    timestamp: "12:15",
    lesson: "Aula 01",
    ago: "há 2 dias",
    text: "IPCA vs CDI: IPCA mede inflação, CDI é taxa de referência interbancária. Pesquisar dados do Banco Central.",
    highlight: false,
  },
  {
    id: 3,
    timestamp: "22:48",
    lesson: "Aula 02",
    ago: "há 1 dia",
    text: "Tesouro Selic tem liquidez D+1. Para reserva de emergência é a melhor opção. Anotar limite de R$1M/mês para venda.",
    highlight: false,
  },
];

export function PlataformaNotas() {
  const [notes] = useState(initialNotes);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Notes Panel */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="bg-muted/50 border-b border-border px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold font-anek text-foreground">Minhas Anotações</span>
          </div>
          <button className="text-xs font-bold text-accent hover:text-accent/80 transition-colors font-anek uppercase tracking-wider">
            + Nova Nota
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`rounded-lg p-4 group relative ${
                note.highlight
                  ? "bg-primary/5 border border-primary/20"
                  : "bg-card border border-border hover:border-accent/20 transition-colors"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <button className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded font-mono hover:bg-accent/20 transition-colors cursor-pointer">
                  ⏱ {note.timestamp}
                </button>
                <span className="text-[10px] text-muted-foreground font-roboto">{note.lesson} • {note.ago}</span>
                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-sm text-foreground/80 font-roboto leading-relaxed">{note.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Escreva sua anotação..."
              className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-primary/30 font-roboto bg-background text-foreground"
            />
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold font-anek transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 font-roboto flex items-center gap-1">
            <Info className="h-3 w-3" /> A nota será vinculada ao timestamp atual do vídeo automaticamente.
          </p>
        </div>
      </div>

      {/* Specs */}
      <div className="space-y-6">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <h4 className="font-bold text-foreground font-anek mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent" /> Diretrizes de UX
          </h4>
          <ul className="space-y-2 text-sm text-foreground/80 font-roboto">
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Notas são <strong>auto-salvas</strong> após 2s de inatividade (debounce)</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Clicar no timestamp <strong>busca o vídeo</strong> para aquele momento exato</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Suporte a <strong>Markdown básico</strong> (negrito, itálico, listas)</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Exportação em <strong>PDF</strong> com todas as notas de um módulo</li>
            <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" /> Atalho de teclado: <kbd className="bg-muted border border-border px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+Shift+N</kbd></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
