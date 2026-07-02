import type { TagTone } from "@/components/widgets/Tag";

/**
 * Agenda do Time de Produto — fonte única.
 * Consumida pelo calendário do Hub, pelo pill de "próximo evento" do hero
 * e pela exportação .ics.
 */

export interface Evento {
  date: string; // "YYYY-MM-DD"
  titulo: string;
  tag: string;
  tone: TagTone;
  hora?: string;
  responsavel?: string;
  descricao?: string;
}

export const eventos: Evento[] = [
  { date: "2026-06-23", titulo: "Sprint Planning — Q2 Sprint 12", tag: "Sprint", tone: "blue", hora: "10:00", responsavel: "Daniel Machado", descricao: "Alinhamento e planejamento das entregas do sprint." },
  { date: "2026-06-24", titulo: "Design Review Semanal", tag: "Design", tone: "violet", hora: "14:00", responsavel: "Armando & Éria" },
  { date: "2026-06-30", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tone: "green", hora: "09:00", responsavel: "Beatriz Henriques", descricao: "Nova turma com novidades no produto educacional." },
  { date: "2026-06-30", titulo: "Product Roadmap Review Q3", tag: "Roadmap", tone: "magenta", hora: "16:00", responsavel: "Beatriz Henriques", descricao: "Revisão do roadmap e prioridades para o Q3." },
  { date: "2026-07-07", titulo: "Sprint Planning — Q3 Sprint 1", tag: "Sprint", tone: "blue", hora: "10:00", responsavel: "Daniel Machado" },
  { date: "2026-07-10", titulo: "Workshop de UX Research", tag: "Time", tone: "graphite", hora: "09:00", responsavel: "Ariadne Carneiro", descricao: "Metodologias de pesquisa qualitativa com usuários reais." },
  { date: "2026-07-14", titulo: "Design Review Semanal", tag: "Design", tone: "violet", hora: "14:00", responsavel: "Armando & Éria" },
  { date: "2026-07-16", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tone: "green", hora: "09:00", responsavel: "Beatriz Henriques" },
  { date: "2026-07-21", titulo: "Retrospectiva Q3 Sprint 1", tag: "Processo", tone: "amber", hora: "15:00", responsavel: "Daniel Machado", descricao: "Pontos de melhoria e lições aprendidas no sprint." },
  { date: "2026-08-03", titulo: "Sprint Planning — Q3 Sprint 2", tag: "Sprint", tone: "blue", hora: "10:00", responsavel: "Daniel Machado" },
  { date: "2026-08-11", titulo: "Review de OKRs Q3", tag: "Roadmap", tone: "magenta", hora: "14:00", responsavel: "Beatriz Henriques", descricao: "Análise de progresso dos OKRs trimestrais." },
  { date: "2026-08-17", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tone: "green", hora: "09:00", responsavel: "Beatriz Henriques" },
  { date: "2026-09-01", titulo: "Kick-off Q4", tag: "Processo", tone: "amber", hora: "10:00", responsavel: "Beatriz Henriques", descricao: "Alinhamento estratégico para o último trimestre do ano." },
  { date: "2026-09-08", titulo: "Sprint Planning — Q4 Sprint 1", tag: "Sprint", tone: "blue", hora: "10:00", responsavel: "Daniel Machado" },
  { date: "2026-09-15", titulo: "Lançamento turma AUVP Escola", tag: "Produto", tone: "green", hora: "09:00", responsavel: "Beatriz Henriques" },
  { date: "2026-09-22", titulo: "Design Review Semanal", tag: "Design", tone: "violet", hora: "14:00", responsavel: "Armando & Éria" },
  { date: "2026-09-28", titulo: "Retrospectiva Q4 Sprint 1", tag: "Processo", tone: "amber", hora: "15:00", responsavel: "Daniel Machado" },
];

/** Eventos de hoje em diante, ordenados por data (e hora). */
export function proximosEventos(limit?: number, ref: Date = new Date()): Evento[] {
  const hoje = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, "0")}-${String(ref.getDate()).padStart(2, "0")}`;
  const futuros = eventos
    .filter((e) => e.date >= hoje)
    .sort((a, b) => (a.date + (a.hora ?? "")) < (b.date + (b.hora ?? "")) ? -1 : 1);
  return limit ? futuros.slice(0, limit) : futuros;
}

/** Gera o conteúdo de um arquivo .ics com todos os eventos da agenda. */
export function gerarIcs(): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const linhas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AUVP//Central de Produto//PT",
    "CALSCALE:GREGORIAN",
  ];
  eventos.forEach((e, i) => {
    const data = e.date.replace(/-/g, "");
    const hora = (e.hora ?? "09:00").replace(":", "") + "00";
    const fimH = String(Number((e.hora ?? "09:00").slice(0, 2)) + 1).padStart(2, "0");
    const fim = fimH + (e.hora ?? "09:00").slice(3, 5).padStart(2, "0") + "00";
    const desc = [e.descricao, e.responsavel ? `Responsável: ${e.responsavel}` : ""].filter(Boolean).join(" — ");
    linhas.push(
      "BEGIN:VEVENT",
      `UID:central-auvp-${e.date}-${i}@auvp`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${data}T${hora}`,
      `DTEND:${data}T${fim}`,
      `SUMMARY:[${e.tag}] ${e.titulo}`,
      desc ? `DESCRIPTION:${desc.replace(/\n/g, "\\n")}` : "",
      "END:VEVENT"
    );
  });
  linhas.push("END:VCALENDAR");
  return linhas.filter(Boolean).join("\r\n");
}
