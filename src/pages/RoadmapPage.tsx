import React, { useState } from "react";
import { Map, Circle, CheckCircle2, Clock, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/PageShell";
import { Tag, type TagTone } from "@/components/widgets/Tag";

type Status = "concluido" | "em-progresso" | "planejado" | "futuro";

interface Item {
  produto: string;
  titulo: string;
  desc: string;
  status: Status;
  trimestre: string;
}

const statusConfig: Record<Status, { label: string; tone: TagTone; icon: React.ElementType }> = {
  "concluido":    { label: "Concluído",    tone: "success", icon: CheckCircle2 },
  "em-progresso": { label: "Em progresso", tone: "info",    icon: Hourglass    },
  "planejado":    { label: "Planejado",    tone: "warning", icon: Clock        },
  "futuro":       { label: "Futuro",       tone: "neutral", icon: Circle       },
};

const roadmap: Item[] = [
  // Concluídos
  { produto: "Design System",   titulo: "Novos componentes de data viz",         desc: "Paleta de 8 cores para gráficos (pizza, barras, linhas) com suporte a dark mode.",                       status: "concluido",    trimestre: "Q2 2025" },
  { produto: "Tom e Voz",       titulo: "Expansão para novos produtos",           desc: "Seções de tom e voz para Agro, Analítica, Câmbio e Seguros.",                                            status: "concluido",    trimestre: "Q1 2025" },
  { produto: "Central",         titulo: "Deploy no GitHub Pages",                 desc: "Publicação da Central de Produto em produção com CI/CD automatizado.",                                   status: "concluido",    trimestre: "Q2 2025" },
  { produto: "AUVP Escola",     titulo: "Documentação do produto",                desc: "Proposta de valor, módulos, comunidade, ferramentas e PIAR documentados.",                               status: "concluido",    trimestre: "Q2 2025" },

  // Em progresso
  { produto: "Design System",   titulo: "Tokens de espaçamento e elevação",       desc: "Padronização de spacing scale e shadow tokens para consistência entre plataformas.",                    status: "em-progresso", trimestre: "Q2 2025" },
  { produto: "Central",         titulo: "Roadmap interativo",                     desc: "Página de roadmap com filtros por produto e status para o time interno.",                                status: "em-progresso", trimestre: "Q2 2025" },
  { produto: "AUVP Escola",     titulo: "Integração com métricas de engajamento", desc: "Dashboard de conclusão de módulos, taxa de presença nas lives e NPS dos alunos.",                       status: "em-progresso", trimestre: "Q2 2025" },

  // Planejados
  { produto: "Design System",   titulo: "Guia de acessibilidade",                 desc: "Checklist WCAG 2.1 AA, padrões de contraste e navegação por teclado para todos os componentes.",       status: "planejado",    trimestre: "Q3 2025" },
  { produto: "AUVP Analítica",  titulo: "Alertas inteligentes de carteira",       desc: "Notificações automáticas quando um ativo sair dos limites de alocação definidos pelo usuário.",         status: "planejado",    trimestre: "Q3 2025" },
  { produto: "AUVP Escola",     titulo: "App mobile",                             desc: "Versão nativa para iOS e Android com acesso às aulas, comunidade e ferramentas offline.",               status: "planejado",    trimestre: "Q3 2025" },
  { produto: "AUVP Agro",       titulo: "MVP de plataforma",                      desc: "Primeira versão com cadastro de propriedades, controle de receitas e integração de commodities.",       status: "planejado",    trimestre: "Q4 2025" },

  // Futuro
  { produto: "AUVP Pro",        titulo: "Preparatório CEA",                       desc: "Curso preparatório para a certificação CEA com simulados e trilha personalizada.",                      status: "futuro",       trimestre: "2026"    },
  { produto: "AUVP Experience", titulo: "Portal do participante",                 desc: "Área exclusiva para membros com programação, conteúdos e networking dos eventos premium.",              status: "futuro",       trimestre: "2026"    },
  { produto: "AUVP Crédito",    titulo: "Lançamento público",                     desc: "Saída do modo de desenvolvimento para acesso aberto aos membros da AUVP Capital.",                      status: "futuro",       trimestre: "2026"    },
  { produto: "Design System",   titulo: "Biblioteca de motion design",            desc: "Padrões de animação, transições e micro-interações para uso em todos os produtos.",                     status: "futuro",       trimestre: "2026"    },
];

const allProdutos = ["Todos", ...Array.from(new Set(roadmap.map((i) => i.produto))).sort()];
const allStatuses: { key: Status | "todos"; label: string }[] = [
  { key: "todos",        label: "Todos" },
  { key: "concluido",    label: "Concluído" },
  { key: "em-progresso", label: "Em progresso" },
  { key: "planejado",    label: "Planejado" },
  { key: "futuro",       label: "Futuro" },
];

export default function RoadmapPage() {
  const [filterProduto, setFilterProduto] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState<Status | "todos">("todos");

  const filtered = roadmap.filter((item) => {
    const matchProduto = filterProduto === "Todos" || item.produto === filterProduto;
    const matchStatus  = filterStatus  === "todos"  || item.status  === filterStatus;
    return matchProduto && matchStatus;
  });

  const grouped = filtered.reduce<Record<string, Item[]>>((acc, item) => {
    (acc[item.trimestre] ??= []).push(item);
    return acc;
  }, {});

  const trimestreOrder = ["Q2 2025", "Q1 2025", "Q3 2025", "Q4 2025", "2026"];
  const sortedTrimestres = Object.keys(grouped).sort(
    (a, b) => trimestreOrder.indexOf(a) - trimestreOrder.indexOf(b)
  );

  return (
    <PageShell width="5xl" footer="Roadmap do Time de Produto AUVP" mainClassName="py-12 space-y-10">

        {/* Hero */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
            <Map className="h-3.5 w-3.5" /> Roadmap
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">
            Produtos e Entregas Futuras
          </h1>
          <p className="text-muted-foreground font-roboto max-w-2xl">
            Acompanhe o que está sendo construído, o que está planejado e o que já foi entregue pelo Time de Produto da AUVP.
          </p>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(statusConfig).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <Tag key={key} tone={cfg.tone} className="px-3 py-1.5 text-xs normal-case tracking-normal">
                <Icon className="h-3.5 w-3.5" />
                {cfg.label}
              </Tag>
            );
          })}
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            {allProdutos.map((p) => (
              <button
                key={p}
                onClick={() => setFilterProduto(p)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold font-roboto border transition-colors",
                  filterProduto === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-muted"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 sm:border-l sm:pl-4">
            {allStatuses.map((s) => (
              <button
                key={s.key}
                onClick={() => setFilterStatus(s.key)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold font-roboto border transition-colors",
                  filterStatus === s.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:bg-muted"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Itens agrupados por trimestre */}
        {sortedTrimestres.length === 0 ? (
          <p className="text-muted-foreground font-roboto text-sm">Nenhum item encontrado com os filtros selecionados.</p>
        ) : (
          sortedTrimestres.map((trimestre) => {
            const itens = grouped[trimestre];
            const concluidos = itens.filter((i) => i.status === "concluido").length;
            const progresso = Math.round((concluidos / itens.length) * 100);
            return (
            <section key={trimestre}>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <h2 className="text-lg font-bold font-anek text-foreground">{trimestre}</h2>
                <div className="flex-1 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 w-24 rounded-full bg-muted overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progresso}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Progresso de ${trimestre}`}
                  >
                    <div
                      className="h-full rounded-full bg-[hsl(var(--success))] transition-[width] duration-500 ease-apple"
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-roboto whitespace-nowrap">
                    {concluidos}/{itens.length} concluído{concluidos === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {itens.map((item, i) => {
                  const cfg = statusConfig[item.status];
                  const Icon = cfg.icon;
                  return (
                    <div key={i} className="rounded-xl border bg-card p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-roboto">{item.produto}</span>
                        <Tag tone={cfg.tone} className="shrink-0">
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </Tag>
                      </div>
                      <div>
                        <p className="font-semibold font-anek text-foreground text-sm mb-1">{item.titulo}</p>
                        <p className="text-xs text-muted-foreground font-roboto leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            );
          })
        )}

    </PageShell>
  );
}
