import React, { useState } from "react";
import { Star } from "lucide-react";

const ratingLabels = ["", "Péssima", "Ruim", "OK", "Boa", "Excelente!"];
const feedbackTags = ["Didática excelente", "Conteúdo prático", "Muito longa", "Precisa de exemplos", "Áudio ruim"];

export function PlataformaRating() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Rating Modal Preview */}
      <div className="bg-muted rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
        <div className="bg-card rounded-2xl shadow-xl border border-border w-full max-w-sm p-6 text-center">
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-6 w-6 text-accent" fill="hsl(var(--primary))" />
          </div>
          <h3 className="text-xl font-bold font-anek text-foreground mb-1">O que achou da aula?</h3>
          <p className="text-sm text-muted-foreground font-roboto mb-5">01. O despertar financeiro</p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setRating(i)}
                className={`transition-colors text-3xl ${
                  i <= rating ? "text-accent" : "text-muted-foreground/30 hover:text-accent/50"
                }`}
              >
                <Star className="h-7 w-7" fill={i <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground font-roboto mb-4">
            {rating > 0 ? ratingLabels[rating] : "Selecione uma nota"}
          </p>

          {/* Feedback tags */}
          {rating > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {feedbackTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs border rounded-full px-3 py-1.5 transition-colors font-roboto ${
                    selectedTags.includes(tag)
                      ? "border-accent text-accent bg-accent/10"
                      : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {rating > 0 && (
            <textarea
              placeholder="Deixe um comentário (opcional)..."
              className="w-full text-sm border border-border rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-primary/30 font-roboto mb-4 bg-background text-foreground"
            />
          )}

          <button
            disabled={rating === 0}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-anek text-sm uppercase tracking-wider py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enviar Avaliação
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground mt-3 block mx-auto font-roboto transition-colors">
            Pular
          </button>
        </div>
      </div>

      {/* Aggregate + Code */}
      <div className="space-y-6">
        {/* Rating Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold font-anek text-foreground mb-4">Resumo de Avaliações</h3>
          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground font-anek">4.7</p>
              <div className="flex text-accent text-sm mt-1 gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" />
                ))}
                <Star className="h-4 w-4" fill="currentColor" strokeWidth={0} style={{ clipPath: "inset(0 50% 0 0)" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-roboto">1.234 avaliações</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[
                { stars: 5, pct: 72 },
                { stars: 4, pct: 20 },
                { stars: 3, pct: 5 },
                { stars: 2, pct: 2 },
                { stars: 1, pct: 1 },
              ].map((r) => (
                <div key={r.stars} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4 font-roboto">{r.stars}</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-8 text-right font-roboto">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
