import type { TagTone } from "@/components/widgets/Tag";

/**
 * Marcos do Time de Produto — fonte única da trilha exibida no Hub.
 *
 * A maior parte das datas vem das Atualizações da Escola
 * (`src/data/novidades.ts`), que é o registro mês a mês do que foi
 * entregue. Os marcos que não aparecem lá estão marcados com
 * `dataAssumida: true` — a estimativa está no comentário de cada item e
 * o componente sinaliza a data como aproximada na interface.
 */

export type MarcoStatus = "concluido" | "em-andamento" | "planejado" | "adiado";

export interface Marco {
  id: string;
  emoji: string;
  titulo: string;
  /** Rótulo completo da data, exibido no cartão (ex.: "Abril de 2026"). */
  quando: string;
  /** Rótulo curto usado na régua de períodos sob a trilha (ex.: "Abr"). */
  periodo: string;
  /** Data âncora (ISO) — define a ordem cronológica dos marcos na onda. */
  data: string;
  descricao: string;
  status: MarcoStatus;
  tone: TagTone;
  /** Sub-entregas mostradas no painel de detalhe ao selecionar o marco. */
  detalhes?: string[];
  /** Rota interna da Central relacionada ao marco. */
  to?: string;
  /** Link externo relacionado ao marco. */
  href?: string;
  /** Data estimada — não consta nas Atualizações da Escola. */
  dataAssumida?: boolean;
  /** Marco que acontece ao longo de vários meses, sem data única. */
  continuo?: boolean;
}

export const marcos: Marco[] = [
  {
    id: "hub-v1",
    emoji: "🖥️",
    titulo: "v1 do Hub",
    quando: "22 de outubro de 2025",
    periodo: "Out/25",
    data: "2025-10-22",
    status: "concluido",
    tone: "graphite",
    descricao:
      "Primeira versão do Hub de Produtos: um único endereço para o membro chegar na Escola, na Comunidade, na Analítica e nas ferramentas da AUVP.",
    detalhes: [
      "Acesso unificado aos produtos AUVP em uma só tela",
      "Base que serviu de aprendizado para o redesenho da Minha AUVP",
    ],
  },
  {
    id: "modulos",
    emoji: "📚",
    titulo: "Módulos liberados na Escola",
    quando: "Fevereiro a julho de 2026",
    periodo: "Fev–Jul",
    data: "2026-02-01",
    status: "em-andamento",
    tone: "violet",
    continuo: true,
    descricao:
      "Uma leva de módulos novos e atualizados entrou no ar ao longo do primeiro semestre — de Valuation a Criptomoedas.",
    detalhes: [
      "Fevereiro — Valuation: balanço, DRE, fluxo de caixa, Ke/CAPM e WACC (exclusivo AUVP Sempre)",
      "Março — Análise de Setores: 12 aulas novas, de mineração a proteína animal (exclusivo AUVP Sempre)",
      "Abril — Imposto de Renda atualizado com todas as obrigatoriedades de 2026",
      "Abril — Criptomoedas: 15 aulas do zero, alinhadas à filosofia buy and hold",
      "Junho — AUVP Analítica: módulo ensinando a usar a ferramenta na prática",
      "A caminho — Indicadores: análise fundamentalista (exclusivo AUVP Sempre)",
    ],
    to: "/solucoes",
  },
  {
    id: "giro-bh",
    emoji: "🎥",
    titulo: "Giro Itinerante · Belo Horizonte",
    quando: "Março de 2026",
    periodo: "Mar",
    data: "2026-03-15",
    status: "concluido",
    tone: "brick",
    descricao:
      "A estreia do Giro da Bolsa Itinerante (sem censura): o programa saiu do estúdio e foi gravado ao vivo em BH, com a comunidade na plateia.",
    detalhes: [
      "Primeira edição do formato itinerante",
      "Gravação ao vivo do Giro da Bolsa, sem censura",
      "Baguncinha presencial com os membros depois da gravação",
    ],
  },
  {
    id: "design-system",
    emoji: "🎨",
    titulo: "Design System",
    quando: "Abril de 2026",
    periodo: "Abr",
    data: "2026-04-05",
    status: "concluido",
    tone: "magenta",
    descricao:
      "Tokens, componentes e padrões de interface da AUVP reunidos e documentados — a base visual compartilhada por todos os produtos.",
    detalhes: [
      "Tokens de cor, tipografia e espaçamento com suporte a tema claro e escuro",
      "Biblioteca de componentes documentada e navegável dentro da Central",
      "Escala de cores adequada também para materiais impressos (CMYK)",
    ],
    to: "/design-system",
  },
  {
    id: "tom-e-voz",
    emoji: "🗣️",
    titulo: "Manual de Tom e Voz",
    quando: "Abril de 2026",
    periodo: "Abr",
    data: "2026-04-20",
    status: "concluido",
    tone: "blue",
    descricao:
      "O jeito AUVP de falar virou guia: diretrizes de linguagem por área e por produto, para a comunicação soar como uma só voz.",
    detalhes: [
      "Diretrizes de linguagem para cada área da empresa",
      "Seções específicas por produto — Capital, Escola, Agro, Analítica, Câmbio e Seguros",
    ],
    to: "/tom-e-voz",
  },
  {
    id: "qa-design",
    emoji: "💬",
    titulo: "Q&A de Design",
    // Sem data registrada nas Atualizações da Escola. Estimado para maio,
    // logo depois da publicação do Design System e do Manual de Tom e Voz.
    quando: "Maio de 2026",
    periodo: "Mai",
    data: "2026-05-10",
    dataAssumida: true,
    status: "concluido",
    tone: "amber",
    descricao:
      "Rodada aberta de perguntas e respostas do time de Design com a empresa: como pedir, como priorizamos e como usar o Design System no dia a dia.",
    detalhes: [
      "Sessão aberta para tirar dúvidas sobre a esteira de Design",
      "Como abrir uma solicitação e o que o time precisa receber junto",
    ],
  },
  {
    id: "pro-agro",
    emoji: "🚜",
    titulo: "Lançamento AUVP Pro e AUVP Agro",
    quando: "Maio de 2026",
    periodo: "Mai",
    data: "2026-05-20",
    status: "concluido",
    tone: "olive",
    descricao:
      "Duas verticais ganharam plataforma própria: a AUVP Pro com o treinamento completo para a CPA e a AUVP Agro com trilhas de Hedge, Sucessão e Crédito Rural.",
    detalhes: [
      "AUVP Pro — treinamento de CPA reformulado, com aulas repaginadas e simulados comentados",
      "AUVP Agro — plataforma no ar com cotações de commodities, previsão climática e cartas semanais",
      "60 novas aulas de Hedge, Sucessão e Crédito Rural liberadas em abril",
      "Área exclusiva do Agro dentro da Comunidade",
    ],
    href: "https://auvpagro.com.br/",
  },
  {
    id: "regravacao-escola",
    emoji: "🎬",
    titulo: "Regravação da Escola",
    quando: "Junho de 2026",
    periodo: "Jun",
    data: "2026-06-15",
    status: "concluido",
    tone: "green",
    descricao:
      "Todas as aulas do treinamento da AUVP Escola foram regravadas do zero — conteúdo 100% atualizado, do módulo 1 ao 7.",
    detalhes: [
      "Módulo 6 — a aula de Stocks virou 4 partes focadas em análise setorial (P1 a P4)",
      "Módulo 6 — nova aula de Renda Fixa Internacional",
      "Módulo 7 — conteúdo inteiro repaginado",
      "Cadernos de exercícios antes da avaliação de cada módulo, do M1 ao M6",
    ],
    href: "https://www.aulasauvp.com.br/path-player?courseid=auvp&unit=6772ad0d1fe057e9530659d2Unit",
  },
  {
    id: "giro-sp",
    emoji: "🎥",
    titulo: "Giro Itinerante · São Paulo",
    quando: "Junho de 2026",
    periodo: "Jun",
    data: "2026-06-20",
    status: "concluido",
    tone: "brick",
    descricao:
      "Terceira parada da estrada: gravação ao vivo em São Paulo, com uma galera esticando a noite no after junto do time.",
    detalhes: [
      "Terceira parada do Giro Itinerante",
      "Gravação ao vivo do programa do canal Investidor Sardinha",
      "After com os membros depois do evento",
    ],
    href: "https://www.youtube.com/watch?v=EMU2chjddxI&t=217s",
  },
  {
    id: "minha-auvp",
    emoji: "✨",
    titulo: 'Lançamento "Minha AUVP" (Hub V2)',
    quando: "9 de julho de 2026",
    periodo: "Jul",
    data: "2026-07-09",
    status: "concluido",
    tone: "primary",
    descricao:
      "O Hub renasceu como Minha AUVP: nova interface, dados integrados de ponta a ponta e um só lugar para acompanhar tudo o que o membro tem na AUVP.",
    detalhes: [
      "Interface migrada para o novo design, com a experiência inteira revista",
      "Integrações com Minhas Finanças, Analítica, Comunidade e diagrama",
      "Cards de produto personalizados conforme o que o membro já contratou",
      "Notificações no sininho funcionando de ponta a ponta",
    ],
  },
  {
    id: "giro-curitiba",
    emoji: "🎥",
    titulo: "Giro Itinerante · Curitiba",
    // Sem data confirmada — a edição foi adiada. A âncora só posiciona o
    // marco na trilha (depois de São Paulo); a interface não mostra data.
    quando: "Adiada — nova data a definir",
    periodo: "Adiada",
    data: "2026-07-15",
    status: "adiado",
    tone: "neutral",
    descricao:
      "A parada de Curitiba foi adiada. O destino segue no mapa do Giro Itinerante — assim que a nova data fechar, ela aparece aqui.",
  },
  {
    id: "sistema-indicacao",
    emoji: "🤝",
    titulo: "Sistema de indicação",
    quando: "Agosto de 2026",
    periodo: "Ago",
    data: "2026-08-15",
    status: "planejado",
    tone: "info",
    descricao:
      "A nova plataforma de indicações da AUVP, com liberação simultânea para membros da Escola e da Consultoria.",
    detalhes: [
      "Liberação simultânea para AUVP Escola e Consultoria",
      "Acompanhamento semanal de indicações e conversões no início da operação",
      "Logística de premiação definida — prêmios físicos e digitais",
    ],
  },
  {
    id: "encantamento",
    emoji: "💚",
    titulo: "Treinamento de encantamento do cliente",
    // Sem data registrada. Estimado para setembro, depois do sistema de
    // indicação, quando o time de CX assume a nova jornada.
    quando: "Setembro de 2026",
    periodo: "Set",
    data: "2026-09-15",
    dataAssumida: true,
    status: "planejado",
    tone: "success",
    descricao:
      "Formação do time em produto, encantamento e experiência do cliente — para que cada ponto de contato com o membro tenha a mesma temperatura.",
    detalhes: [
      "Trilha de produto para quem atende o membro no dia a dia",
      "Padrões de atendimento conectados ao Manual de Tom e Voz",
    ],
    to: "/tom-e-voz",
  },
  {
    id: "private-day",
    emoji: "🪩",
    titulo: "Private Day",
    quando: "7 e 8 de novembro de 2026",
    periodo: "Nov",
    data: "2026-11-07",
    status: "planejado",
    tone: "warning",
    descricao:
      "Dois dias completos de imersão em Goiânia, com palestras sobre mercado, cenário econômico e negócios — e a tradicional festa para fechar.",
    detalhes: [
      "2 dias de imersão em Goiânia",
      "Palestras sobre mercado, cenário econômico e negócios",
      "Festa de encerramento com tema Disco Fever",
      "1º lote de ingressos já à venda",
    ],
  },
];

/** Marcos em ordem cronológica — ordem em que aparecem na trilha. */
export const marcosOrdenados: Marco[] = [...marcos].sort((a, b) =>
  a.data < b.data ? -1 : a.data > b.data ? 1 : 0
);

/**
 * Índice do marco em foco na abertura da trilha: o primeiro que ainda não
 * passou (ou, se o ano já acabou, o último da lista).
 */
export function indiceMarcoAtual(ref: Date = new Date()): number {
  const hoje = ref.toISOString().slice(0, 10);
  const i = marcosOrdenados.findIndex((m) => m.data >= hoje);
  return i === -1 ? marcosOrdenados.length - 1 : i;
}

/** Próximo marco ainda por acontecer — usado no destaque do topo do Hub. */
export function proximoMarco(ref: Date = new Date()): Marco | undefined {
  const hoje = ref.toISOString().slice(0, 10);
  return marcosOrdenados.find((m) => m.data >= hoje);
}
