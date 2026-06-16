import React from "react";
import { Play, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const courses = [
  {
    title: "Ações Brasileiras",
    desc: "Análise fundamentalista e avaliação de empresas listadas na B3.",
    progress: 45,
    status: "Em Andamento",
    statusClass: "bg-background/90 text-foreground border border-border/50",
  },
  {
    title: "Reserva de Emergência",
    desc: "Aprenda a montar sua base de segurança com liquidez diária.",
    progress: 100,
    status: "Concluído",
    statusClass: "bg-emerald-100 border border-emerald-200 text-emerald-700",
  },
  {
    title: "Fundos Imobiliários",
    desc: "Invista em imóveis de forma inteligente com cotas de FIIs.",
    progress: 0,
    status: "Novo",
    statusClass: "bg-accent/10 border border-accent/20 text-accent",
  },
];

export function PlataformaCursos() {
  return (
    <div className="bg-muted/50 p-8 md:p-12 rounded-2xl border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.title}
            className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/30 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            {/* Cover */}
            <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-muted-foreground/40" />
              <div className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm ${course.statusClass}`}>
                {course.status}
              </div>
              {/* Play overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                  <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <h4 className="text-foreground font-anek font-bold text-xl leading-tight mb-2 group-hover:text-accent transition-colors">
                {course.title}
              </h4>
              <p className="text-muted-foreground text-sm font-roboto mb-4 line-clamp-2">
                {course.desc}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-roboto font-bold">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className={course.progress === 100 ? "text-emerald-600" : "text-accent"}>
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
