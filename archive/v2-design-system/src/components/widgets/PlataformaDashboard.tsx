import React from "react";
import { PlayCircle, Clock, Trophy, Flame, Rocket, BookOpen, Lock, Play, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type StatTone = "success" | "warning" | "info" | "neutral";

const stats: Array<{
  icon: React.ElementType;
  label: string;
  value: string;
  badge: string | null;
  tone: StatTone;
}> = [
  { icon: PlayCircle, label: "Aulas concluídas", value: "47", badge: "+12%", tone: "success" },
  { icon: Clock, label: "Tempo de estudo", value: "32h", badge: "+8h", tone: "success" },
  { icon: Trophy, label: "Certificados obtidos", value: "3", badge: null, tone: "neutral" },
  { icon: Flame, label: "Sequência de estudos", value: "7 dias", badge: "Streak!", tone: "warning" },
];

const moduleProgress: Array<{ name: string; pct: number; chart: string }> = [
  { name: "Renda Fixa", pct: 100, chart: "hsl(var(--success))" },
  { name: "Ações BR", pct: 45, chart: "hsl(var(--chart-1))" },
  { name: "FIIs", pct: 20, chart: "hsl(var(--chart-3))" },
];

const badges = [
  { icon: Rocket, label: "Primeira Aula", unlocked: true },
  { icon: Flame, label: "7 Dias Seguidos", unlocked: true },
  { icon: BookOpen, label: "Módulo Completo", unlocked: true },
  { icon: Lock, label: "Maratonista", unlocked: false },
  { icon: Lock, label: "Top 10 Ranking", unlocked: false },
  { icon: Lock, label: "Mestre AUVP", unlocked: false },
];

const continueWatching = [
  { title: "03. Análise de balanço patrimonial", module: "Ações BR", remaining: "18:32 restantes", pct: 65 },
  { title: "01. Introdução aos FIIs", module: "FIIs", remaining: "28:10 restantes", pct: 30 },
];

const weekDays = [
  { day: "Seg", h: 60 },
  { day: "Ter", h: 80 },
  { day: "Qua", h: 40 },
  { day: "Qui", h: 95 },
  { day: "Sex", h: 70 },
  { day: "Sáb", h: 30 },
  { day: "Dom", h: 50 },
];

function ToneBadge({ tone, children }: { tone: StatTone; children: React.ReactNode }) {
  const map: Record<StatTone, string> = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/15 text-warning-foreground border-warning/30 dark:text-warning",
    info: "bg-info/10 text-info border-info/20",
    neutral: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "text-[10px] font-roboto font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
        map[tone]
      )}
    >
      {children}
    </span>
  );
}

export function PlataformaDashboard() {
  const progressPct = Math.round(
    moduleProgress.reduce((acc, m) => acc + m.pct, 0) / moduleProgress.length
  );
  const completedModules = moduleProgress.filter((m) => m.pct === 100).length;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - progressPct / 100);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                {s.badge && <ToneBadge tone={s.tone}>{s.badge}</ToneBadge>}
              </div>
              <p className="text-2xl font-bold text-foreground font-anek leading-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground font-roboto mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Ring + Weekly */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-anek">Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset, transition: "stroke-dashoffset 1.5s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground font-anek leading-none">{progressPct}%</span>
                  <span className="text-[10px] text-muted-foreground font-roboto uppercase tracking-wider mt-1">
                    Concluído
                  </span>
                </div>
              </div>
              <div className="flex-1 w-full space-y-3">
                <p className="text-xs font-roboto text-muted-foreground">
                  <span className="font-bold text-foreground">{completedModules}</span> de{" "}
                  <span className="font-bold text-foreground">{moduleProgress.length}</span> módulos finalizados
                </p>
                {moduleProgress.map((m) => {
                  const status =
                    m.pct === 100 ? "Concluído" : m.pct > 0 ? "Em andamento" : "Não iniciado";
                  return (
                    <div key={m.name}>
                      <div className="flex justify-between items-center text-xs font-roboto mb-1.5 gap-2">
                        <span className="text-foreground font-bold truncate">{m.name}</span>
                        <span
                          className={cn(
                            "shrink-0 text-[10px] uppercase tracking-wider font-bold",
                            m.pct === 100 ? "text-success" : "text-muted-foreground"
                          )}
                        >
                          {status} · {m.pct}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-700",
                            m.pct === 100 ? "bg-success" : "bg-primary"
                          )}
                          style={{ width: `${m.pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-anek">Atividade Semanal</CardTitle>
            <Badge variant="secondary" className="font-roboto gap-1">
              <TrendingUp className="h-3 w-3" /> 4h12 média
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-36">
              {weekDays.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <div
                    className="w-full bg-primary/15 group-hover:bg-primary/25 rounded-t-md transition-colors relative overflow-hidden"
                    style={{ height: `${d.h}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 w-full bg-primary rounded-t-md"
                      style={{ height: `${Math.min(d.h, 70)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2 justify-between px-1">
              {weekDays.map((d) => (
                <span key={d.day} className="text-[10px] text-muted-foreground font-roboto w-full text-center uppercase tracking-wider">
                  {d.day}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conquistas */}
      <Card>
        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-anek">Conquistas</CardTitle>
          <Badge variant="outline" className="font-roboto">
            3 / {badges.length} desbloqueadas
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {badges.map((b) => (
              <div
                key={b.label}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors",
                  b.unlocked
                    ? "bg-primary/5 border-primary/20 hover:bg-accent/10"
                    : "bg-muted/40 border-border opacity-60"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shadow-sm",
                    b.unlocked
                      ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <b.icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "text-xs font-bold text-center font-anek leading-tight",
                    b.unlocked ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continuar assistindo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-anek">Continuar Assistindo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {continueWatching.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer group border border-transparent hover:border-border"
            >
              <div className="w-20 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                <Play className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground font-anek truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground font-roboto">
                  {item.module} • {item.remaining}
                </p>
                <Progress value={item.pct} className="h-1 mt-2" />
              </div>
              <Badge
                variant={item.pct > 50 ? "default" : "secondary"}
                className="shrink-0 font-roboto"
              >
                {item.pct}%
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
