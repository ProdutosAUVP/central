import {
  GraduationCap, RefreshCw, Award, Layers, BarChart3, Globe2, Tractor, Landmark, Table2,
  Sprout, TrendingUp, Umbrella, Video, Headset, BookOpen, Users, CheckCircle2,
  Database, ShieldCheck, ChartPie, Presentation, LineChart, CloudSun, FileText,
  Coins, HandCoins, Percent, Gem, MessageCircle, CreditCard, Sparkles, Crown,
  PieChart,
  type LucideIcon,
} from "lucide-react";

/**
 * Nossas Soluções — conteúdo integral do antigo "Guia de Vendas" (Projeto
 * Delta), agora parte da Central. Os dados vivem aqui; a renderização fica
 * em src/pages/SolucoesPage.tsx.
 *
 * Os IDs de seção e âncora reproduzem os do guia original
 * (produtosauvp.github.io/projetodelta) para que links antigos com hash
 * continuem funcionando após o redirecionamento.
 */

/* ============================================================
   Navegação (subnav da página + busca global)
   ============================================================ */

export interface SolucaoSection {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Âncoras internas da seção (aparecem na busca global). */
  anchors: { id: string; label: string }[];
}

export const solucoesSections: SolucaoSection[] = [
  {
    id: "auvp-escola", label: "Escola", icon: GraduationCap,
    anchors: [
      { id: "escola-publico", label: "Para quem é" },
      { id: "escola-o-que-e", label: "O que é AUVP?" },
      { id: "escola-cronograma", label: "Cronograma" },
      { id: "escola-ferramentas", label: "Ferramentas" },
      { id: "escola-garantia", label: "Garantia" },
    ],
  },
  {
    id: "auvp-sempre", label: "Sempre", icon: RefreshCw,
    anchors: [
      { id: "sempre-publico", label: "Para quem é" },
      { id: "sempre-o-que-e", label: "O que é?" },
      { id: "sempre-cronograma", label: "Módulos" },
      { id: "sempre-ferramentas", label: "Benefícios" },
    ],
  },
  {
    id: "auvp-pro", label: "PRO", icon: Award,
    anchors: [
      { id: "pro-publico", label: "Para quem é" },
      { id: "pro-o-que-e", label: "O que é?" },
      { id: "pro-cronograma", label: "Cronograma" },
    ],
  },
  {
    id: "auvp-analitica", label: "Analítica", icon: BarChart3,
    anchors: [
      { id: "analitica-publico", label: "Para quem é" },
      { id: "analitica-o-que-e", label: "O que é?" },
    ],
  },
  {
    id: "auvp-internacional", label: "Internacional", icon: Globe2,
    anchors: [
      { id: "internacional-publico", label: "Para quem é" },
      { id: "internacional-o-que-e", label: "O que é?" },
      { id: "internacional-cronograma", label: "Cronograma" },
    ],
  },
  {
    id: "auvp-agro", label: "Agro", icon: Tractor,
    anchors: [
      { id: "agro-publico", label: "Para quem é" },
      { id: "agro-subprodutos", label: "Subprodutos" },
    ],
  },
  {
    id: "auvp-conta", label: "AUVP Banking", icon: Landmark,
    anchors: [
      { id: "conta-publico", label: "Para quem é" },
      { id: "conta-o-que-e", label: "Contas Integradas" },
      { id: "conta-modelos", label: "Modelos e Planos" },
      { id: "conta-abertura", label: "Abertura de Conta" },
      { id: "conta-plataforma", label: "Plataforma de Investimentos" },
      { id: "conta-beneficios", label: "Benefícios e Cartão" },
    ],
  },
  /* Fecho da página: o Ecossistema resume como os produtos se encaixam, então
     vem depois de todos eles e logo antes da tabela-resumo. Como as duas são
     seções de síntese, e não de um produto, nenhuma tem cor de marca. */
  { id: "ecossistema", label: "Ecossistema", icon: Layers, anchors: [] },
  { id: "resumo-produtos", label: "Resumo", icon: Table2, anchors: [] },
];

/* ============================================================
   Ecossistema — dobra "Tudo começa na escola"
   Conteúdo transposto da LP da Escola (ProdutosAUVP/lp-auvp-escola-prod,
   seção #ecosys-section), com o texto passado para a 3ª pessoa da Central.
   ============================================================ */

export interface EcossistemaEtapa {
  titulo: string;
  icon: LucideIcon;
  /** Marca as etapas opcionais, sinalizadas com asterisco na LP. */
  opcional?: boolean;
  itens: { label: string; desc: string }[];
}

export const ecossistemaHero = {
  titulo: "Tudo começa na escola",
  subtitulo:
    "Muito além de um curso: um ecossistema completo de educação, proteção e estrutura patrimonial, a partir da matrícula.",
  rodape:
    "Soluções adicionais e opcionais, disponíveis para contratação à medida que o patrimônio evolui.",
};

export const ecossistemaEtapas: EcossistemaEtapa[] = [
  {
    titulo: "Aprendizado",
    icon: GraduationCap,
    itens: [
      { label: "+120 aulas", desc: "do zero ao avançado" },
      { label: "Comunidade 24h", desc: "com especialistas" },
      { label: "Plantão ao vivo", desc: "8 semanas com Raul Sena" },
    ],
  },
  {
    titulo: "Acompanhamento",
    icon: PieChart,
    itens: [
      { label: "Open Finance", desc: "os gastos num só lugar" },
      { label: "Carteiras recomendadas", desc: "para o perfil do aluno" },
      { label: "Plataforma de investimentos", desc: "exclusiva para alunos" },
    ],
  },
  {
    titulo: "Proteção da Família",
    icon: ShieldCheck,
    opcional: true,
    itens: [
      { label: "Seguro de vida", desc: "proteção para toda a família" },
      { label: "Análise de crédito", desc: "o financiamento mais barato" },
      { label: "Previdência privada", desc: "com a menor taxa do mercado" },
    ],
  },
  {
    titulo: "Patrimônio & Consultoria",
    icon: Landmark,
    opcional: true,
    itens: [
      { label: "Consultor privado", desc: "+R$ 300 mil · private bank +R$ 5 mi" },
      { label: "Holding imobiliária", desc: "organização e sucessão" },
      { label: "Offshore e AMC", desc: "para grandes clientes" },
    ],
  },
];

/* O bloco do cartão de crédito que vinha junto desta dobra na LP saiu da
   Central: os cartões AUVP são detalhados na seção AUVP Banking
   (`conta-beneficios`), que é a fonte da informação. */

/* ============================================================
   Tipos compartilhados
   ============================================================ */

export interface Aula {
  num: string;
  titulo: string;
  duracao: string;
}

export interface Modulo {
  titulo: string;
  /** Thumb 16:9 do módulo — quando ausente, renderiza `icon`. */
  img?: string;
  icon?: LucideIcon;
  /** Pills de metadados (nº de aulas, duração…). */
  meta: string[];
  desc?: string;
  aulas: Aula[];
  /** Banner de observação exibido dentro do corpo expandido. */
  obs?: string;
}

export interface InfoCard {
  titulo: string;
  desc: string;
  icon?: LucideIcon;
  img?: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  /** Prefixo em negrito (opcional). */
  destaque?: string;
  texto: string;
}

export interface QuickInfo {
  tipo: "investimento" | "site" | "acesso";
  texto: string;
  href?: string;
}

/* ============================================================
   AUVP Escola
   ============================================================ */

const wp = "https://www.auvp.com.br/wp-content/uploads";
const gh = "https://github.com/design-auvp/projetodelta/blob/main";
const ghProd = "https://github.com/ProdutosAUVP/projetodelta/blob/main";

export const escolaInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento: 12 vezes de R$ 297,00 (R$ 3.564,00) ou R$ 2.997,00 à vista" },
  { tipo: "site", texto: "auvp.com.br", href: "https://www.auvp.com.br/" },
  { tipo: "acesso", texto: "Tempo de acesso: 1 ano (treinamento completo)" },
];

export const escolaHero = {
  badge: "Produto Principal",
  img: `${gh}/AUVP-A-maior-escola-de-investimentos-do-Brasil-AUVP.png?raw=true`,
  paraQuemE: "A AUVP Escola é para quem quer se aprofundar no mundo dos investimentos e entende que o caminho para a liberdade financeira está na disciplina e na construção de conhecimento sólido, não em atalhos.",
};

export const escolaPublico: InfoCard[] = [
  { icon: Sprout, titulo: "Conhecimento do zero", desc: "Nunca investiu e precisa de uma base que vá do fundamental ao avançado." },
  { icon: TrendingUp, titulo: "Aperfeiçoamento", desc: "Já investe, mas quer estruturar melhor a carteira, otimizar a rentabilidade e expandir para o mercado internacional." },
  { icon: Umbrella, titulo: "Viver de renda", desc: "Tem o objetivo claro de viver dos próprios investimentos e busca o planejamento e a estratégia necessários para construir esse futuro." },
];

export const escolaFeatures: FeatureItem[] = [
  { icon: Video, destaque: "Conteúdo detalhado:", texto: "mais de 100 aulas gravadas, disponíveis para assistir quando e onde for mais conveniente para o aluno, que estuda no próprio ritmo." },
  { icon: Headset, destaque: "Suporte contínuo:", texto: "durante 2 meses, acesso a plantões de dúvidas ao vivo, toda segunda-feira, às 19h. Um momento para revisar o conteúdo e esclarecer dúvidas diretamente com Raul Sena." },
  { icon: BookOpen, destaque: "Material complementar:", texto: "ebooks e mapas mentais para garantir a compreensão e a aplicação prática do conhecimento." },
  { icon: Users, destaque: "Comunidade Ativa:", texto: "acesso à maior comunidade de investidores do Brasil, disponível para tirar dúvidas e compartilhar experiências." },
];

export const escolaDuracao = "Duração completa do treinamento: 1843 min | aproximadamente 30 horas.";

export const escolaModulos: Modulo[] = [
  {
    titulo: "Preparando o seu cérebro",
    img: `${wp}/2024/09/MODULO-1-768x481.png`,
    meta: ["10 Aulas padrão", "1 Aula bônus", "> 3h 40min"],
    desc: "Aborda a mudança de perspectiva sobre o dinheiro, tratando de crenças limitantes, liberdade financeira e da disciplina necessária para alcançar os objetivos.",
    aulas: [
      { num: "Aula 01", titulo: "Preparando seu cérebro", duracao: "04:49" },
      { num: "Aula 02", titulo: "Por que os ricos ficam cada vez mais ricos?", duracao: "13:37" },
      { num: "Aula 03", titulo: "Crenças limitantes", duracao: "17:09" },
      { num: "Aula 04", titulo: "Juros Compostos", duracao: "15:43" },
      { num: "Aula 05", titulo: "O que é Liberdade Financeira?", duracao: "20:07" },
      { num: "Bônus", titulo: "AUVP Crédito", duracao: "02:42" },
      { num: "Aula 06", titulo: "Como não cair em golpes", duracao: "23:28" },
      { num: "Aula 07", titulo: "Metade salada e metade droga", duracao: "07:19" },
      { num: "Aula 08", titulo: "Autoajuda é o caralho", duracao: "11:09" },
      { num: "Aula 09", titulo: "Pare de procrastinar", duracao: "13:19" },
      { num: "Aula 10", titulo: "Aula da família", duracao: "01:21:33" },
      { num: "Bônus", titulo: "Onde investir sua reserva de emergência", duracao: "11:16" },
    ],
  },
  {
    titulo: "Organizando sua vida financeira",
    img: `${wp}/2024/09/MODULO-2-768x481.png`,
    meta: ["6 Aulas padrão", "1h 24min"],
    desc: "Ensina a identificar gargalos, a fazer o orçamento doméstico, a verdade sobre financiamentos, consórcios e previdência privada e como chegar ao primeiro milhão para viver de renda.",
    aulas: [
      { num: "Aula 01", titulo: "Finanças pessoais", duracao: "20:30" },
      { num: "Aula 02", titulo: "Como usar seu cartão de crédito", duracao: "19:00" },
      { num: "Aula 03", titulo: "Como resolver as dívidas", duracao: "05:55" },
      { num: "Aula 04", titulo: "Financiamento de imóvel faz sentido?", duracao: "19:39" },
      { num: "Aula Bônus", titulo: "Quando faz sentido amortizar?", duracao: "07:25" },
      { num: "Aula 05", titulo: "Consórcios SÃO TOPS?", duracao: "09:30" },
      { num: "Aula 06", titulo: "Viver de renda e primeiro milhão", duracao: "10:17" },
    ],
  },
  {
    titulo: "Renda fixa",
    img: `${wp}/2024/09/MODULO-3-768x481.png`,
    meta: ["17 Aulas padrão", "2 Aulas bônus", "5 horas"],
    desc: "Explora Tesouro Direto, CDBs, Debêntures e LCIs/LCAs e apresenta conceitos como Marcação a Mercado, Contrafluxo e Juros Semestrais.",
    aulas: [
      { num: "Aula 01", titulo: "O que é Renda Fixa?", duracao: "11:40" },
      { num: "Aula 02", titulo: "Escolhendo uma corretora", duracao: "13:20" },
      { num: "Aula 03", titulo: "Introdução ao Tesouro Direto", duracao: "17:55" },
      { num: "Aula 04", titulo: "Tesouro Selic", duracao: "15:49" },
      { num: "Aula 05", titulo: "Tesouro pré-fixado", duracao: "13:51" },
      { num: "Aula 06", titulo: "Tesouro IPCA+", duracao: "07:50" },
      { num: "Aula 07", titulo: "Marcação a mercado", duracao: "03:32" },
      { num: "Aula 07", titulo: "Marcação a mercado - Parte 2", duracao: "18:00" },
      { num: "Aula 08", titulo: "Tesouro Prefixado e IPCA+ com Juros Semestrais", duracao: "05:19" },
      { num: "Bônus", titulo: "Conhecendo nossos ETF's - AUPO11", duracao: "20:36" },
      { num: "Bônus", titulo: "Conhecendo nossos ETF's - AREA11", duracao: "13:38" },
      { num: "Aula 09", titulo: "Tesouro Educa+ e Renda+", duracao: "06:31" },
      { num: "Aula 10", titulo: "CDBs, LCs e RDBs", duracao: "27:00" },
      { num: "Aula 11", titulo: "LCI e LCA", duracao: "08:15" },
      { num: "Aula 12", titulo: "CRI's e CRA's", duracao: "10:53" },
      { num: "Aula 13", titulo: "Debentures", duracao: "17:21" },
      { num: "Aula 14", titulo: "Previdência Privada", duracao: "11:19" },
      { num: "Aula 15", titulo: "Fundos de Investimento", duracao: "24:38" },
      { num: "Aula 16", titulo: "Contrafluxo", duracao: "26:07" },
      { num: "Aula 17", titulo: "Montando uma carteira de Renda Fixa", duracao: "07:55" },
    ],
  },
  {
    titulo: "Renda variável",
    img: `${wp}/2024/09/MODULO-4-768x481.png`,
    meta: ["21 Aulas padrão", "3 Aulas bônus", "09h 39min"],
    desc: "Aborda proventos, dividendos e data ex, desdobramentos e grupamentos, índices e ETF's, fundos imobiliários, FIIs, fiagro e fi-infra e, claro, ensina a construir uma carteira de ações brasileiras.",
    aulas: [
      { num: "Aula 01", titulo: "Introdução à Renda Variável", duracao: "03:28" },
      { num: "Aula 02", titulo: "Bolsa de Valores", duracao: "17:26" },
      { num: "Aula 03", titulo: "Ações: Preço x Valor", duracao: "10:24" },
      { num: "Aula 04", titulo: "Abertura de capital (IPO)", duracao: "20:43" },
      { num: "Aula 05", titulo: "Nomenclaturas e termos da bolsa", duracao: "27:05" },
      { num: "Aula 06", titulo: "As escolas de investimento", duracao: "27:41" },
      { num: "Aula 07", titulo: "Analisando ações", duracao: "07:23" },
      { num: "Aula 07", titulo: "Análise de ações - Parte 2", duracao: "50:50" },
      { num: "Aula 07", titulo: "Análise de ações - Parte 3", duracao: "31:27" },
      { num: "Aula 07", titulo: "Análise de ações - Parte 4", duracao: "33:05" },
      { num: "Aula 08", titulo: "Comprando ações, na prática", duracao: "09:40" },
      { num: "Aula 09", titulo: "Inserindo no diagrama", duracao: "33:19" },
      { num: "Aula 10", titulo: "Pra que serve o preço médio?", duracao: "16:02" },
      { num: "Aula 11", titulo: "Proventos", duracao: "17:56" },
      { num: "Aula 12", titulo: "Dividendos e Data EX", duracao: "19:38" },
      { num: "Aula 13", titulo: "Desdobramentos e Grupamentos", duracao: "11:30" },
      { num: "Aula 14", titulo: "Aluguel de Ações", duracao: "10:30" },
      { num: "Aula 15", titulo: "Índices e ETF's", duracao: "13:51" },
      { num: "Aula 16", titulo: "Fundos Imobiliários", duracao: "21:38" },
      { num: "Aula 16", titulo: "Como analisar FIIs na prática? Parte 2", duracao: "10:21" },
      { num: "Aula 16", titulo: "Analisando um FII na prática - Parte 3", duracao: "21:17" },
      { num: "Aula 16", titulo: "Como identificar FIIs de qualidade - Parte 4", duracao: "16:41" },
      { num: "Aula 17", titulo: "Fiagro e fundos de papéis", duracao: "19:02" },
      { num: "Aula 18", titulo: "Fi-Infra", duracao: "09:54" },
      { num: "Extra", titulo: "Small Caps", duracao: "32:26" },
      { num: "Aula 19", titulo: "O método burro", duracao: "08:23" },
      { num: "Aula 20", titulo: "Como montar uma carteira de investimentos", duracao: "21:09" },
      { num: "Extra", titulo: "Por que o brasileiro gosta de investir em dividendos?", duracao: "18:20" },
      { num: "Extra", titulo: "Armadilhas do Mercado Financeiro", duracao: "21:40" },
    ],
  },
  {
    titulo: "Reserva de valor",
    img: `${wp}/2024/09/MODULO-5-768x481.png`,
    meta: ["7 Aulas padrão", "2 Aulas bônus", "2h 16min"],
    desc: "Explica como comprar ouro físico ou na bolsa, o que são fundos de ouro, Bitcoin, blockchain e as maneiras de armazenar a moeda virtual.",
    aulas: [
      { num: "Aula 01", titulo: "O que é uma reserva de valor, e qual a sua função?", duracao: "19:11" },
      { num: "Aula 02", titulo: "Comprando ouro físico", duracao: "14:03" },
      { num: "Aula 03", titulo: "Como investir em ouro", duracao: "11:49" },
      { num: "Aula 04", titulo: "História do bitcoin", duracao: "19:57" },
      { num: "Aula 05", titulo: "Por que ter Bitcoin?", duracao: "12:09" },
      { num: "Aula 06", titulo: "Qual o momento certo de comprar Bitcoin?", duracao: "07:45" },
      { num: "Aula 07", titulo: "Armazenando e protegendo seus Bitcoins", duracao: "28:11" },
      { num: "Extra", titulo: "Os ciclos ESTRANHOS do Bitcoin", duracao: "13:51" },
      { num: "Bônus", titulo: "O que são e quais os benefícios dos stablecoins", duracao: "10:11" },
    ],
  },
  {
    titulo: "Investindo no exterior",
    img: `${wp}/2024/09/MODULO-6-768x481.png`,
    meta: ["12 Aulas padrão", "3h 13min"],
    desc: "Explica como funciona o mercado norte-americano, as corretoras, as diferenças entre o mercado dos EUA e o do Brasil, além de ETF's, Reits, Stocks e Renda Fixa nos Estados Unidos.",
    aulas: [
      { num: "Aula 01", titulo: "Por que investir no exterior?", duracao: "25:09" },
      { num: "Aula 02", titulo: "Como funciona o mercado americano?", duracao: "13:19" },
      { num: "Aula 03", titulo: "Mercado dos EUA x Brasil", duracao: "13:29" },
      { num: "Aula 04", titulo: "ETFs Internacionais", duracao: "14:36" },
      { num: "Aula 04", titulo: "ETFs Internacionais - Parte 2", duracao: "18:02" },
      { num: "Aula 04", titulo: "ETFs Internacionais - Parte 3", duracao: "12:26" },
      { num: "Aula 05", titulo: "REITs", duracao: "25:33" },
      { num: "Aula 06", titulo: "Stocks (Ações Americanas)", duracao: "13:38" },
      { num: "Aula 06", titulo: "Stocks (Ações Americanas) - Setor de Consumo", duracao: "16:09" },
      { num: "Aula 06", titulo: "Stocks (Ações Americanas) - Setor de Energia", duracao: "16:35" },
      { num: "Aula 06", titulo: "Stocks (Ações Americanas) - Setor de Tecnologia", duracao: "18:06" },
      { num: "Aula 07", titulo: "Renda fixa nos Estados Unidos", duracao: "19:07" },
    ],
  },
  {
    titulo: "O começo",
    img: `${wp}/2025/05/MODULO-7-768x481.jpg`,
    meta: ["4 Aulas padrão", "1h 6min"],
    desc: "Ensina a operacionalizar e gerir a carteira de forma autônoma, com o auxílio das ferramentas e das demais soluções da AUVP.",
    aulas: [
      { num: "Aula 01", titulo: "Operacionalizando sua Carteira", duracao: "19:51" },
      { num: "Aula 02", titulo: "Corrigindo os erros da sua carteira", duracao: "12:39" },
      { num: "Aula 03", titulo: "O que a AUVP ainda pode fazer por você?", duracao: "16:31" },
      { num: "Aula 04", titulo: "Planejando sua liberdade financeira", duracao: "17:09" },
    ],
  },
  {
    titulo: "Bônus: Imposto de Renda",
    img: `${wp}/2025/05/MODULO-BONUS-768x481.jpg`,
    meta: ["12 Aulas padrão", "3h 13min"],
    desc: "Descomplica a declaração de Imposto de Renda para investidores: como declarar e pagar tributos corretamente.",
    obs: "Este módulo será regravado anualmente, de acordo com mudanças na dinâmica de IR.",
    aulas: [
      { num: "Aula 01", titulo: "O que é Imposto de Renda?", duracao: "17:41" },
      { num: "Aula 02", titulo: "Preparando a declaração", duracao: "09:05" },
      { num: "Aula 03", titulo: "O que é e como funciona o IR no Brasil", duracao: "24:38" },
      { num: "Aula 04", titulo: "Declarando ações", duracao: "24:12" },
      { num: "Aula 05", titulo: "Imposto de Renda na Renda Fixa", duracao: "17:00" },
      { num: "Aula 06", titulo: "Imposto de Renda nos Fundos de Investimento", duracao: "05:32" },
      { num: "Aula 07", titulo: "Imposto de Renda nos FIIs, Fiagros e FI-Infras", duracao: "14:03" },
      { num: "Aula 08", titulo: "Declarando dividendos, JCP, rendimentos e bonificações", duracao: "21:24" },
      { num: "Aula 09", titulo: "Investimentos Internacionais", duracao: "19:25" },
      { num: "Aula 10", titulo: "Criptomoedas", duracao: "24:45" },
      { num: "Aula 11", titulo: "Como gerar um DARF?", duracao: "06:41" },
      { num: "Aula 12", titulo: "Declaração de Autônomo com Carnê-Leão", duracao: "08:17" },
    ],
  },
  {
    titulo: "Bônus: Criptomoedas",
    img: `${ghProd}/cripto.jpg?raw=true`,
    meta: ["15 Aulas", "~2 horas (131 min)"],
    desc: "Apresenta os fundamentos para investir em criptoativos com segurança.",
    aulas: [
      { num: "Aula 0", titulo: "Introdução ao módulo de criptomoedas", duracao: "03:15" },
      { num: "Aula 01", titulo: "Por que o Bitcoin foi criado? O problema do dinheiro fiduciário e a inflação", duracao: "07:34" },
      { num: "Aula 02", titulo: "Blockchain explicada para uma criança", duracao: "04:38" },
      { num: "Aula 03", titulo: "Ethereum (ETH) e os contratos inteligentes", duracao: "05:28" },
      { num: "Aula 04", titulo: "A diferença entre \"Coin\" e \"Token\"", duracao: "05:02" },
      { num: "Aula 05", titulo: "DeFi (Finanças Descentralizadas)", duracao: "09:46" },
      { num: "Aula 06", titulo: "Stablecoins: O Dólar na Blockchain", duracao: "08:41" },
      { num: "Aula 07", titulo: "Analisando Altcoins: fundamentos reais", duracao: "13:46" },
      { num: "Aula 08", titulo: "Airdrops, ICOs e outras receitas", duracao: "09:59" },
      { num: "Aula 09", titulo: "Narrativas e Setores", duracao: "08:47" },
      { num: "Aula 10", titulo: "O perigo das Memecoins e Shitcoins", duracao: "06:27" },
      { num: "Aula 11", titulo: "Not Your Keys, Not Your Coins (Auto-custódia)", duracao: "06:52" },
      { num: "Aula 12", titulo: "Como comprar de forma 100% anônima?", duracao: "14:35" },
      { num: "Aula 13", titulo: "Como identificar um golpe no universo cripto?", duracao: "06:59" },
      { num: "Aula 14", titulo: "Qual o melhor momento para comprar? Analisando indicadores", duracao: "18:56" },
    ],
  },
  {
    titulo: "Bônus: AUVP Analítica",
    img: `${ghProd}/thumb%20analitica.jpg?raw=true`,
    meta: ["10 Aulas", "~1 hora (85 min)"],
    desc: "Ensina a extrair o máximo da ferramenta de inteligência da AUVP para avaliar ativos com precisão.",
    aulas: [
      { num: "Aula 01", titulo: "Bem-vindo à AUVP Analítica", duracao: "07:27" },
      { num: "Aula 02", titulo: "Ações, Stocks e REITs", duracao: "16:59" },
      { num: "Aula 03", titulo: "Fundos imobiliários", duracao: "06:35" },
      { num: "Aula 04", titulo: "Metodologias da AUVP Analítica", duracao: "11:07" },
      { num: "Aula 05", titulo: "Filtros e visualizações", duracao: "17:12" },
      { num: "Aula 06", titulo: "Comparador", duracao: "04:10" },
      { num: "Aula 07", titulo: "Simulador de investimentos", duracao: "06:18" },
      { num: "Aula 08", titulo: "ETF's", duracao: "06:35" },
      { num: "Aula 09", titulo: "Agenda e previsão de dividendos", duracao: "04:06" },
      { num: "Aula 10", titulo: "Outras funcionalidades", duracao: "05:00" },
    ],
  },
  {
    titulo: "Bônus: Indicadores",
    icon: ChartPie,
    meta: ["8 Aulas", "~52 min"],
    aulas: [
      { num: "Bônus", titulo: "ROE (Return on Equity)", duracao: "02:48" },
      { num: "Bônus", titulo: "Cotação", duracao: "12:35" },
      { num: "Bônus", titulo: "Dívida Líquida x Dívida Bruta", duracao: "01:36" },
      { num: "Bônus", titulo: "Dividend Yield", duracao: "10:55" },
      { num: "Bônus", titulo: "EBIT (Earnings Before Interest and Taxes)", duracao: "03:43" },
      { num: "Bônus", titulo: "P/VPA - Preço sobre Valor Patrimonial por Ação", duracao: "10:51" },
      { num: "Bônus", titulo: "P/L - Preço sobre Lucro", duracao: "05:19" },
      { num: "Bônus", titulo: "Emissão de cotas", duracao: "04:42" },
    ],
  },
  {
    titulo: "Bônus: Masterclasses",
    icon: Presentation,
    meta: ["4 Aulas", "2h 38min"],
    aulas: [
      { num: "Aula 01", titulo: "O que são os ETFs globais e por que eles são fundamentais?", duracao: "53:27" },
      { num: "Aula 02", titulo: "Marcação a mercado", duracao: "14:04" },
      { num: "Aula 03", titulo: "A leitura e interpretação de indicadores", duracao: "54:33" },
      { num: "Aula 04", titulo: "A importância de se blindar do consumismo", duracao: "37:32" },
    ],
  },
];

export const obsAjustesRegulares =
  "A quantidade de aulas e módulos sofrerá ajustes regulares, pois a AUVP produz e disponibiliza novos conteúdos aos membros continuamente, como forma de preservar a qualidade e manter a evolução constante dos produtos.";

export const escolaFerramentas: InfoCard[] = [
  { img: `${gh}/COMUNIDADE.png?raw=true`, titulo: "Comunidade", desc: "uma comunidade exclusiva para o aluno interagir com outros alunos e tirar dúvidas com os especialistas da AUVP." },
  { img: `${gh}/PIAR.png?raw=true`, titulo: "PIAR", desc: "o sistema ajuda a montar e balancear a carteira de acordo com o perfil de investidor." },
  { img: `${gh}/DIAGRAMA%20DO%20CERRADO.png?raw=true`, titulo: "Diagrama do cerrado", desc: "ferramenta de rebalanceamento de carteira que mantém os investimentos protegidos e otimizados conforme as mudanças do mercado." },
  { img: `${gh}/OR%C3%87AMENTO%20DOM%C3%89STICO.png?raw=true`, titulo: "Orçamento doméstico", desc: "um planejamento financeiro que organiza o fluxo de dinheiro da casa com base nas metas e nos rendimentos do próprio aluno." },
];

export const escolaGarantia = {
  selo: `${gh}/Prancheta-55-300x300.png?raw=true`,
  titulo: "Aprendizado Garantido",
  texto: "Caso o aluno conclua todas as aulas, emita o certificado e não se sinta seguro para investir, a AUVP devolve o valor pago.",
};

/* ============================================================
   AUVP Sempre
   ============================================================ */

export const sempreInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento: R$ 49,90 por mês ou R$ 548,90 ao ano" },
  { tipo: "site", texto: "auvp.com.br/auvp-sempre", href: "https://www.auvp.com.br/auvp-sempre/" },
  { tipo: "acesso", texto: "Tempo de acesso: recorrente enquanto a assinatura se manter" },
];

export const sempreHero = {
  badge: "Exclusivo para assinantes AUVP Sempre",
  img: `${gh}/AUVP-Sempre-AUVP.png?raw=true`,
  paraQuemE: "A AUVP Sempre é um benefício exclusivo de quem já é aluno da AUVP Escola.",
  oQueE: "A AUVP Sempre é uma assinatura contínua projetada para alunos que concluíram a AUVP Escola. Ela oferece acesso a módulos de conteúdo avançado, ferramentas exclusivas, suporte especializado e uma comunidade para investidores que desejam evoluir constantemente e se manter protegidos no mercado financeiro.",
};

const prod = "https://prod.auvp.com.br/wp-content/uploads";

export const sempreModulos: Modulo[] = [
  {
    titulo: "Análise de setores",
    img: `${prod}/2025/09/thumb-treinamento-1.jpg`,
    meta: ["13 Aulas", "~10 horas (620 min)"],
    desc: "Destrincha os pontos mais importantes para entender cada setor da economia. Ensina como funciona o ciclo de crescimento de empresas em diferentes áreas e quais indicadores realmente importam para investir com estratégia.",
    aulas: [
      { num: "Aula 01", titulo: "Bancos", duracao: "43:28" },
      { num: "Aula 02", titulo: "Petróleo", duracao: "42:25" },
      { num: "Aula 03", titulo: "Energia Elétrica", duracao: "35:14" },
      { num: "Aula 04", titulo: "Mineração", duracao: "34:57" },
      { num: "Aula 05", titulo: "Saneamento", duracao: "47:50" },
      { num: "Aula 06", titulo: "Proteína Animal", duracao: "39:26" },
      { num: "Aula 07", titulo: "Operadoras e Planos de Saúde", duracao: "43:40" },
      { num: "Aula 08", titulo: "Telecomunicações", duracao: "48:16" },
      { num: "Aula 09", titulo: "Varejo Alimentar", duracao: "42:34" },
      { num: "Aula 10", titulo: "Lojas e E-commerce (Varejo)", duracao: "58:20" },
      { num: "Aula 11", titulo: "Imobiliário", duracao: "01:06:49" },
      { num: "Aula 12", titulo: "Transporte e Logística", duracao: "01:01:02" },
      { num: "Aula 13", titulo: "Indústrias", duracao: "56:04" },
    ],
  },
  {
    titulo: "Geopolítica",
    img: `${prod}/2025/09/thumb-treinamento.jpg`,
    meta: ["China: 03 | EUA: 10 | Índia: 03", "~7,6 horas (456 min)"],
    desc: "Este conteúdo mostra como decisões políticas, guerras, políticas econômicas e relações internacionais afetam diretamente os investimentos, desenvolvendo uma visão estratégica para antecipar movimentos do mercado e proteger a carteira.",
    aulas: [
      { num: "Mód 1 - 00", titulo: "Boas vindas (China)", duracao: "19:26" },
      { num: "Mód 1 - 01", titulo: "Retorno do Império do Meio", duracao: "32:03" },
      { num: "Mód 1 - 02", titulo: "A Ascensão Econômica da China", duracao: "37:28" },
      { num: "Mód 1 - 03", titulo: "Desafios e Futuro da China", duracao: "53:10" },
      { num: "Mód 2 - 01", titulo: "Introdução à Geopolítica dos EUA", duracao: "17:48" },
      { num: "Mód 2 - 02", titulo: "Colonização e Expansão", duracao: "22:40" },
      { num: "Mód 2 - 03", titulo: "Ascenção da América e seu papel nas Grandes Guerras Mundiais", duracao: "35:56" },
      { num: "Mód 2 - 04", titulo: "Pós-Guerra Fria", duracao: "21:02" },
      { num: "Mód 2 - 05", titulo: "EUA e China", duracao: "36:24" },
      { num: "Mód 2 - 06", titulo: "EUA e Rússia", duracao: "19:20" },
      { num: "Mód 2 - 07", titulo: "EUA e Oriente Médio", duracao: "25:49" },
      { num: "Mód 2 - 08", titulo: "EUA e Europa", duracao: "19:15" },
      { num: "Mód 2 - 09", titulo: "EUA e a América Latina", duracao: "11:32" },
      { num: "Mód 2 - 10", titulo: "A Nova Ordem Mundial", duracao: "21:51" },
      { num: "Mód 3 - 01", titulo: "Índia e as relações geopolíticas", duracao: "21:59" },
      { num: "Mód 3 - 02", titulo: "Potência emergente e crescimento econômico", duracao: "21:52" },
      { num: "Mód 3 - 03", titulo: "Relações geopolíticas, estratégicas e internacionais", duracao: "38:50" },
    ],
  },
  {
    titulo: "Valuation",
    img: `${prod}/2026/03/9650cccc4a538335429d2752327ee254.jpg`,
    meta: ["11 Aulas", "~5,53 horas (332 min)"],
    desc: "Aborda a matemática por trás das grandes decisões. Ensina fundamentos da análise contábil, como a leitura de Balanços, DREs e Fluxos de Caixa, para encontrar o valor real de qualquer empresa.",
    aulas: [
      { num: "Aula 01", titulo: "Introdução", duracao: "08:31" },
      { num: "Aula 02", titulo: "Balanço Patrimonial", duracao: "35:15" },
      { num: "Aula 03", titulo: "DRE", duracao: "41:52" },
      { num: "Aula 4.1", titulo: "Fluxo de caixa", duracao: "29:03" },
      { num: "Aula 4.2", titulo: "Capital de giro", duracao: "36:40" },
      { num: "Aula 4.3", titulo: "Fluxo de caixa da firma", duracao: "18:39" },
      { num: "Aula 4.4", titulo: "Fluxo de caixa do acionista", duracao: "22:02" },
      { num: "Aula 05", titulo: "KE E CAPM - Parte 1", duracao: "21:30" },
      { num: "Aula 05", titulo: "WACC, KE E CAPM - Parte 2", duracao: "23:33" },
      { num: "Aula 06", titulo: "Valuation Vivara Parte 1", duracao: "52:21" },
      { num: "Aula 06", titulo: "Valuation Vivara Parte 2", duracao: "42:34" },
    ],
  },
  {
    titulo: "Aulas Técnicas",
    img: `${prod}/2025/09/thumb-treinamento-2.jpg`,
    meta: ["15 Aulas", "~4,22 horas (253 min)"],
    desc: "Auxilia na compreensão da saúde financeira de empresas e na tomada de decisões de investimento fundamentadas. Ensina a interpretar balanços, DRE, fluxo de caixa e estrutura de capital.",
    aulas: [
      { num: "Aula 01", titulo: "Balanço Patrimonial", duracao: "30:00" },
      { num: "Aula 02", titulo: "O segredo dos Grandes Investidores: como o DRE Pode Mudar Seu Jogo!", duracao: "21:56" },
      { num: "Aula 03", titulo: "Domine o FLUXO DE CAIXA: Guia completo para Investidores!", duracao: "17:27" },
      { num: "Aula 04", titulo: "Evite armadilhas: a relação entre balanço patrimonial, DRE e Fluxo de Caixa", duracao: "12:55" },
      { num: "Aula 05", titulo: "Liquidez corrente: Como analisar e aplicar", duracao: "16:53" },
      { num: "Aula 06", titulo: "EBIT e EBITDA: como podem transformar seus investimentos!", duracao: "09:51" },
      { num: "Aula 07", titulo: "Entenda ROE, ROIC e ROA e melhore suas decisões de investimento!", duracao: "21:31" },
      { num: "Aula 08", titulo: "O que é WACC? Aprenda a calcular o custo médio ponderado de capital", duracao: "17:19" },
      { num: "Aula 09", titulo: "O que é payback e taxa de retorno? Aprenda a calcular de forma simples", duracao: "18:00" },
      { num: "Aula 10", titulo: "Passo a passo para analisar os resultados de uma instituição financeira", duracao: "15:49" },
      { num: "Aula 11", titulo: "A fórmula mágica de Joel Greenblatt", duracao: "10:05" },
      { num: "Aula 12", titulo: "Conheça o método DuPont", duracao: "15:13" },
      { num: "Aula 13", titulo: "Como aplicar o método bazin para aumentar seus lucros", duracao: "17:49" },
      { num: "Aula 14", titulo: "Valor Intrínseco: Warren Buffet usa esta fórmula! Entenda o método de Graham", duracao: "13:54" },
      { num: "Aula 15", titulo: "RMG, Sales-and-Leaseback e WAULT", duracao: "13:58" },
    ],
  },
  {
    titulo: "AUVP Internacional (bônus com 2 primeiros módulos)",
    img: `${prod}/2025/09/thumb-treinamento-3.jpg`,
    meta: ["Mód 1: 16 Aulas | Mód 2: 11 Aulas", "~8,73 horas (524 min)"],
    desc: "Em dois módulos, mergulha na Renda Fixa Internacional, ensina sobre stocks, REITs e Private Equity, e explica como o ciclo econômico impacta os investimentos. Assim, ajuda a expandir oportunidades no mercado global.",
    aulas: [
      { num: "Mód 1 - 00", titulo: "Onboarding", duracao: "03:49" },
      { num: "Mód 1 - 01", titulo: "O que é e como funciona a renda fixa internacional", duracao: "31:06" },
      { num: "Mód 1 - 02", titulo: "Como ter segurança e liquidez em dólar", duracao: "07:39" },
      { num: "Mód 1 - 03", titulo: "Como fazer uma análise de crédito", duracao: "21:02" },
      { num: "Mód 1 - 04", titulo: "Análise de crédito na prática", duracao: "26:58" },
      { num: "Mód 1 - 05", titulo: "Conhecendo ETF de renda fixa", duracao: "09:14" },
      { num: "Mód 1 - 06", titulo: "ETF de renda fixa na prática", duracao: "28:47" },
      { num: "Mód 1 - 07", titulo: "Como montar sua reserva de emergência no exterior", duracao: "15:08" },
      { num: "Mód 1 - 08", titulo: "Como montar uma carteira de títulos de renda fixa", duracao: "09:23" },
      { num: "Mód 1 - 09", titulo: "Ações internacionais: growth, value, dividendos e outros", duracao: "26:54" },
      { num: "Mód 1 - 10", titulo: "Como escolher ações americanas", duracao: "17:27" },
      { num: "Mód 1 - 11", titulo: "O que são ETFs e como eles ajudam na diversificação", duracao: "23:21" },
      { num: "Mód 1 - 12", titulo: "Como usar a estratégia core-satellite com ETFs", duracao: "13:10" },
      { num: "Mód 1 - 13", titulo: "Como escolher os melhores ETFs para sua carteira", duracao: "09:25" },
      { num: "Mód 1 - 14", titulo: "Analisando ETFs na prática", duracao: "27:37" },
      { num: "Mód 1 - 15", titulo: "Onde investir: ações individuais ou ETFs?", duracao: "12:20" },
      { num: "Mód 2 - 01", titulo: "Investimentos Alternativos", duracao: "39:42" },
      { num: "Mód 2 - 02", titulo: "Entendendo REITs", duracao: "19:37" },
      { num: "Mód 2 - 03", titulo: "Perfis, estratégias e estruturas de REITs", duracao: "16:12" },
      { num: "Mód 2 - 04", titulo: "Como analisar REITs, na prática", duracao: "25:48" },
      { num: "Mód 2 - 05", titulo: "Entendendo os setores dos REITS", duracao: "19:35" },
      { num: "Mód 2 - 06", titulo: "Como escolher e monitorar os REITS", duracao: "15:58" },
      { num: "Mód 2 - 07", titulo: "Commodities - Perenidade do Ouro", duracao: "26:34" },
      { num: "Mód 2 - 08", titulo: "Commodities - Compreendendo seu papel na economia real", duracao: "25:40" },
      { num: "Mód 2 - 09", titulo: "Commodities Agrícolas - Inflação, clima e segurança", duracao: "15:54" },
      { num: "Mód 2 - 10", titulo: "Ciclos econômicos das commodities", duracao: "18:30" },
      { num: "Mód 2 - 11", titulo: "Petróleo - Energia, poder geopolítico e ciclos econômicos", duracao: "17:13" },
    ],
  },
  {
    titulo: "Indicadores",
    img: `${ghProd}/indicadores.jpg?raw=true`,
    meta: ["9 Aulas", "~5 horas (321 min)"],
    desc: "Ensina a interpretar e analisar os principais indicadores fundamentalistas para avaliar a saúde financeira de empresas e tomar decisões de investimento mais assertivas.",
    aulas: [
      { num: "Aula 0", titulo: "Introdução ao Módulo de Indicadores", duracao: "06:24" },
      { num: "Aula 1", titulo: "Endividamento", duracao: "31:59" },
      { num: "Aula 2", titulo: "Rentabilidade (ROE e ROIC)", duracao: "46:33" },
      { num: "Aula 3", titulo: "Indicadores de valuation baseados em geração de caixa", duracao: "39:24" },
      { num: "Aula 4", titulo: "ROA e Giro do Ativo", duracao: "28:43" },
      { num: "Aula 5", titulo: "Liquidez", duracao: "35:44" },
      { num: "Aula 6", titulo: "Mensurando a eficiência da empresa", duracao: "36:27" },
      { num: "Aula 7", titulo: "Indicadores de valuation baseados em equity", duracao: "39:43" },
      { num: "Aula 8", titulo: "Dividend Yield e Payout", duracao: "42:49" },
      { num: "Aula 9", titulo: "CAGR", duracao: "13:53" },
    ],
  },
];

export const sempreBeneficios: InfoCard[] = [
  { img: `${gh}/Analise-de-a%C3%A7%C3%B5es-e-indicadores-AUVP-Anal%C3%ADtica.png?raw=true`, titulo: "AUVP Analítica", desc: "Acesso completo e sempre ativo à ferramenta exclusiva da AUVP, que apoia decisões fundamentadas com dados atualizados." },
  { img: `${gh}/DIAGRAMA%20DO%20CERRADO.png?raw=true`, titulo: "Diagrama do Cerrado", desc: "Ferramenta exclusiva de rebalanceamento, que permite gerenciar a carteira com segurança e manter os investimentos otimizados." },
  { img: `${gh}/OR%C3%87AMENTO%20DOM%C3%89STICO.png?raw=true`, titulo: "Orçamento Doméstico", desc: "Ferramenta de planejamento financeiro completo para organizar o fluxo de dinheiro." },
  { img: `${ghProd}/COMUNIDADE.png?raw=true`, titulo: "Comunidade Ativa", desc: "A maior comunidade de investidores do Brasil segue disponível para tirar dúvidas, interagir com especialistas e compartilhar experiências." },
  { img: `${ghProd}/Captura%20de%20tela%202026-07-24%20113031.png?raw=true`, titulo: "Aulas Atualizadas", desc: "Acesso contínuo ao treinamento AUVP Escola com aulas e conteúdos constantemente renovados." },
  { img: `${ghProd}/Captura%20de%20tela%202026-07-24%20112002.png?raw=true`, titulo: "Live Semanal", desc: "Live e plantão de dúvidas diretamente com o Raul toda semana. Um contato próximo e constante, enquanto for assinante." },
];

/* ============================================================
   AUVP PRO
   ============================================================ */

export const proInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento da Certificação CPA: R$ 497,00" },
  { tipo: "site", texto: "auvp.pro", href: "https://www.auvp.pro" },
  { tipo: "acesso", texto: "Tempo de acesso: 1 ano, liberação automática ao treinamento" },
];

export const proHero = {
  badge: "B2B / Certificações",
  img: `${gh}/AUVP-Pro.png?raw=true`,
  paraQuemE: "Pessoas que desejam conquistar as certificações CPA, C-Pro-R ou C-Pro-I para ampliar as oportunidades de atuação como especialistas em investimentos, além de profissionais já certificados que buscam se destacar por meio de uma gestão de carteiras mais eficiente, segura e estratégica.",
  oQueE: "A AUVP Pro é a plataforma de ensino profissionalizante da AUVP, com foco exclusivo em treinamentos que ajudem o aluno a conquistar qualquer uma das certificações oferecidas pela ANBIMA.",
};

export const proFeatures: FeatureItem[] = [
  { icon: CheckCircle2, destaque: "Conteúdo detalhado:", texto: "para cada certificação, temos um treinamento com conteúdos específicos e direcionados." },
  { icon: CheckCircle2, destaque: "Liberdade de acesso:", texto: "o conteúdo ficará gravado e disponível na plataforma, permitindo acesso 24 horas por dia, 7 dias por semana." },
  { icon: CheckCircle2, destaque: "Material complementar:", texto: "além das aulas em vídeo, poderá contar com e-books e mapas mentais para garantir aplicação do conhecimento de forma prática." },
  { icon: CheckCircle2, destaque: "Mão na massa de verdade:", texto: "simulados com resolução em vídeo, ensinando exatamente como os temas são cobrados nas certificações." },
  { icon: CheckCircle2, destaque: "Comunidade AUVP Escola:", texto: "nela o aluno terá acesso exclusivo a um tópico para discutir sobre as certificações, onde poderá interagir com outros alunos, trocar conhecimentos e identificar oportunidades de negócios." },
];

export const proCronograma = {
  intro: "O treinamento da Certificação CPA é estruturado nos seguintes módulos:",
  colunas: ["Módulo", "Título", "Aulas"],
  linhas: [
    ["Módulo 0", "Onboarding", "1"],
    ["Módulo 1", "Estrutura e Dinâmica do Sistema Financeiro Nacional", "9"],
    ["Módulo 2", "Produtos do Mercado Financeiro", "13"],
    ["Módulo 3", "Relacionamento com o Cliente - Prospecção, Atendimento e Suporte", "8"],
    ["Módulo 4", "Inovação e Desenvolvimento de Mercado", "7"],
  ],
  obs: "A quantidade de aulas pode sofrer ajustes, pois o projeto ainda está em fase de planejamento. No entanto, o número de temas abordados será mantido, uma vez que segue a grade oficial da certificação.",
};

/* ============================================================
   AUVP Analítica
   ============================================================ */

export const analiticaInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento: a depender do plano selecionado" },
  { tipo: "site", texto: "analitica.auvp.com.br", href: "https://analitica.auvp.com.br/" },
  { tipo: "acesso", texto: "Tempo de acesso: conforme a assinatura" },
];

export const analiticaHero = {
  badge: "Dados e Ferramentas",
  img: `${gh}/Analise-de-a%C3%A7%C3%B5es-e-indicadores-AUVP-Anal%C3%ADtica.png?raw=true`,
  paraQuemE: "Tanto a investidores iniciantes quanto experientes. A missão da AUVP Analítica é fornecer dados confiáveis e ferramentas analíticas para apoiar decisões de investimentos sem recomendações.",
  obs: "A AUVP Analítica possui em todos os planos de assinatura um período de 30 dias corridos de teste grátis. Após os 30 dias de teste, a cobrança é realizada no cartão de crédito inserido no checkout. Assim, a primeira cobrança só é realizada após os 30 dias corridos de teste.",
  oQueE: "A AUVP Analítica é um site voltado para a consulta de dados sobre investimentos em ações e fundos imobiliários.",
  freemium: "O serviço opera sob um modelo freemium, onde uma parte das funcionalidades está disponível gratuitamente para todos os usuários, enquanto recursos adicionais são oferecidos mediante assinatura paga.",
};

export const analiticaFeatures: FeatureItem[] = [
  { icon: Database, destaque: "Dados Diretos da CVM:", texto: "os dados disponíveis para consulta são replicados diretamente da CVM e de outros bancos de dados relevantes, permitindo que os usuários analisem o ativo escolhido com base em informações atualizadas e confiáveis." },
  { icon: ShieldCheck, destaque: "Análise Pessoal e Segura:", texto: "reforçamos que o produto possui apenas fins de conhecimento, para análise pessoal. Nenhuma das funcionalidades são recomendações de compra/venda de ativos." },
];

/* ============================================================
   AUVP Internacional
   ============================================================ */

export const internacionalInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento: R$ 3.997,00 à vista ou R$ 997 (caso já tenha a Escola)" },
  { tipo: "site", texto: "aulasauvp.com.br/auvp-internacional", href: "https://www.aulasauvp.com.br/auvp-internacional" },
  { tipo: "acesso", texto: "Tempo de acesso: 1 ano (prorrogação: R$ 49,50/mês)" },
];

export const internacionalHero = {
  badge: "Especialização",
  img: `${gh}/AUVP-Internacional.png?raw=true`,
  paraQuemE: "Investidores que buscam segurança e querem deixar de ser reféns da economia local para se tornarem Estrategistas Globais.",
  oQueE: "É o treinamento completo da AUVP, composto por 05 módulos exclusivos que vão desde os fundamentos práticos do investimento em dólar até as estratégias mais avançadas de alocação de ativos, leitura macroeconômica e blindagem sucessória no exterior.",
  duracao: "Duração completa: 1339 min | aproximadamente 22 horas e 19 minutos.",
};

export const internacionalModalidades = {
  intro: "A AUVP Internacional possui duas modalidades de aquisição:",
  itens: [
    { destaque: "Alunos da Escola (Base AUVP):", texto: "pode ser adquirida de forma individual como módulo extra (R$ 997)." },
    { destaque: "Novos Alunos:", texto: "pode ser vendida em conjunto com o treinamento da AUVP Escola." },
  ],
};

export const internacionalFeatures: FeatureItem[] = [
  { icon: CheckCircle2, texto: "Construir uma carteira global resiliente;" },
  { icon: CheckCircle2, texto: "Proteger o patrimônio do risco de moeda e inflação;" },
  { icon: CheckCircle2, texto: "Tomar decisões baseadas na Macroeconomia Aplicada;" },
  { icon: CheckCircle2, texto: "Blindar a sucessão do caro e lento inventário estrangeiro (probate)." },
];

export const internacionalCronograma = {
  colunas: ["Módulo", "Título", "Aulas"],
  linhas: [
    ["Módulo 01", "Fundamentos do Investimento Internacional", "15"],
    ["Módulo 02", "Ativos Alternativos e Estratégicos", "11"],
    ["Módulo 03", "Macroeconomia Aplicada para Investidores", "7"],
    ["Módulo 04", "Saída Fiscal e Planejamento de Vida no Exterior", "4"],
    ["Módulo 05", "Estruturação e Otimização de Portfólios Internacionais", "10"],
  ],
};

/* ============================================================
   AUVP Agro
   ============================================================ */

export const agroInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento: a depender do serviço contratado" },
  { tipo: "site", texto: "auvpagro.com.br", href: "https://auvpagro.com.br/" },
  { tipo: "acesso", texto: "Tempo de acesso: 1 ano (plataforma Agro)" },
];

export const agroHero = {
  badge: "Agronegócio",
  img: `${gh}/AUVP-Agro-Consultoria-Agro-Especializada.png?raw=true`,
  paraQuemE: "Desde produtores de soja, milho e pecuaristas que trabalham com gado de corte até gestores, sucessores, grandes tomadores de decisão e estudantes da área, buscamos atender ao produtor que quer deixar de ser refém das oscilações constantes de preços do mercado agropecuário.",
  oQueE: [
    "A missão da AUVP Agro é formar produtores e comercializadores que não ficam reféns da queda do preço da soja, milho e boi. AUVP Agro é um ecossistema de soluções e informações especializadas no mercado financeiro do agronegócio.",
    "Ela traz consigo as veias de educação, inteligência de mercado, plataformas, ferramentas e consultoria da AUVP para atender às necessidades e especificidades daqueles que vivem e adquirem patrimônio através do agro, especialmente aqueles que trabalham com milho, boi e soja.",
  ],
};

export const agroPlataforma = {
  desc: "A plataforma da AUVP Agro é o hub de inteligência do serviço e oferece suporte completo para a tomada de decisão no campo.",
  precos: [
    { label: "Alunos AUVP Escola:", valor: "R$ 2.496,96" },
    { label: "Não Alunos:", valor: "R$ 2.997,00" },
  ],
  beneficios: [
    { icon: LineChart, destaque: "Cotações em Tempo Real:", texto: "dados, tabelas regionais e análises de mercado (milho, soja, boi gordo, boi China, vaca gorda e novilha gorda)." },
    { icon: CloudSun, destaque: "Clima:", texto: "dados e informações meteorológicas integradas." },
    { icon: FileText, destaque: "Recomendações:", texto: "relatórios estratégicos sobre mercado, sustentabilidade e gestão." },
    { icon: Video, destaque: "Análises Ao Vivo:", texto: "transmissões semanais sobre mercados globais/locais e dados de exportação." },
  ] as FeatureItem[],
  treinamentos: [
    { icon: ShieldCheck, titulo: "Treinamento de Hedge", badge: "60 aulas", desc: "Detalhes da proteção de preços no agro." },
    { icon: Users, titulo: "Treinamento de Sucessão", badge: "4 aulas", desc: "Para sucessores de propriedades agrícolas manterem e ampliarem o legado." },
    { icon: Landmark, titulo: "Treinamento de Crédito Rural", badge: "1 aula", desc: "Como funciona, linhas de crédito e análise bancária." },
  ],
  obs: "A quantidade de aulas e módulos sofrerá ajustes regulares com novos conteúdos.",
};

export const agroConsultoria = [
  { destaque: "Status Atual:", texto: "o atendimento é realizado via fee fixo, negociado diretamente com cada membro. (Serviço em fase de transição para uma estrutura mais robusta.)" },
  { destaque: "Futuro Próximo:", texto: "o serviço será formalmente integrado à estrutura da assessoria em modelo de spread." },
];

export const agroFazendas = {
  info: [
    { tipo: "investimento", texto: "Investimento: Plano Único para Divulgação de Venda por R$ 389,00 (ou 3x de R$ 130,00)" },
    { tipo: "site", texto: "auvpfazendas.com.br", href: "https://auvpfazendas.com.br/" },
  ] as QuickInfo[],
  desc: "Catálogo que simplifica a compra e venda de propriedades rurais no Brasil, conectando compradores e vendedores com suporte completo.",
  obs: "No momento as operações da AUVP Fazendas estão despriorizadas.",
};

/* ============================================================
   AUVP Banking (AUVP Capital)
   ============================================================ */

export const contaInfo: QuickInfo[] = [
  { tipo: "investimento", texto: "Investimento: variável de acordo com a modalidade de contratação" },
  { tipo: "site", texto: "auvpcapital.com.br/planos", href: "https://auvpcapital.com.br/planos/" },
  { tipo: "acesso", texto: "Tempo de acesso: contínuo, enquanto a conta estiver ativa" },
];

export const contaHero = {
  badge: "Ecossistema Financeiro",
  img: `${gh}/Planos-AUVP-Capital.png?raw=true`,
  paraQuemE: "O AUVP Banking é destinado exclusivamente aos alunos do treinamento da AUVP, funcionando como uma extensão prática do que é ensinado e permitindo que o cliente aplique e gerencie os investimentos com suporte da consultoria.",
};

export const contaInvestimentos = {
  titulo: "A conta de investimentos",
  icon: TrendingUp,
  intro: [
    "Ambiente que permite acessar o mercado financeiro, investir, acompanhar e movimentar ativos.",
    "Por meio dela, é possível comprar e vender ativos, diversificar e gerir investimentos e, também, realizar operações financeiras no geral como:",
  ],
  itens: ["Depósitos;", "Saques;", "Transferências;", "Pagamento de despesas relacionadas aos investimentos."],
  fechamento: "Esta conta funciona de forma integrada à conta bancária, oferecendo acesso a diversos produtos no Brasil e no exterior, com mais praticidade na gestão financeira.",
};

export const contaBanking = {
  titulo: "A conta banking AUVP",
  icon: Landmark,
  intro: [
    "A conta banking da AUVP é a conta utilizada para a movimentação financeira do dia a dia, integrada ao ecossistema da AUVP e à estrutura do BTG Pactual.",
    "Por meio dela, é possível:",
  ],
  itens: [
    "Realizar Pix, transferências e pagamentos;",
    "Fazer depósitos e saques;",
    "Utilizar cartão de crédito e débito;",
    "Gerenciar despesas e entradas de forma centralizada.",
  ],
  fechamento: "Ela funciona de forma integrada à conta de investimentos, permitindo mais praticidade ao concentrar movimentações e investimentos em um único ambiente.",
};

export interface PlanoConta {
  tag: string;
  desc: string;
  taxaLabel: string;
  taxa: string;
  taxaDesc: string;
  destaque?: boolean;
}

export const contaPlanos: PlanoConta[] = [
  {
    tag: "Plano \"Se Vira Aí\"",
    desc: "(Autoatendimento) O membro investe com autonomia total, usando a plataforma e usufruindo dos benefícios de ser membro da AUVP Capital.",
    taxaLabel: "Taxa:",
    taxa: "0,025% a 0,033% a.m.",
    taxaDesc: "(0,3% a 0,4% a.a.)",
  },
  {
    tag: "Plano \"Me diz o que fazer\"",
    desc: "(Básico) Orientação em investimentos para quem quer clareza e direção na hora de montar ou ajustar a carteira.",
    taxaLabel: "Taxa:",
    taxa: "0,075% a.m.",
    taxaDesc: "(0,9% a.a.)",
  },
  {
    tag: "Plano \"Resolve Aí\"",
    desc: "O plano Resolve aí é um serviço de consultoria completa, com acompanhamento ativo, personalização e responsabilidade técnica sobre o patrimônio orientado.",
    taxaLabel: "Taxa:",
    taxa: "Definida conforme patrimônio orientado",
    taxaDesc: "(variável)",
    destaque: true,
  },
];

export const contaBeneficios: FeatureItem[] = [
  { icon: HandCoins, destaque: "Cashback em Renda Fixa:", texto: "aplicável ao investimento em alguns títulos de renda fixa disponíveis na plataforma. Esse valor corresponde a uma parte do spread da operação e pode variar conforme o título, o emissor e a taxa negociada." },
  { icon: TrendingUp, destaque: "Cashback de aluguel de ações:", texto: "o membro recebe pelo aluguel das próprias ações e uma porcentagem a mais sobre esse valor." },
  { icon: Percent, destaque: "Isenção de Taxa de Corretagem:", texto: "taxa de corretagem zero nas operações." },
  { icon: Gem, destaque: "Kinvo premium:", texto: "12 meses de acesso gratuito." },
  { icon: MessageCircle, destaque: "Seleção Curada de Títulos de Renda Fixa:", texto: "a AUVP envia diariamente uma seleção exclusiva dos melhores títulos de renda fixa, escolhidos a dedo, ao membro via WhatsApp." },
  { icon: CreditCard, destaque: "Acesso a Cartões de crédito AUVP Capital:", texto: "sujeitos à análise." },
];

/* ------------------------------------------------------------
   Cartões AUVP
   ------------------------------------------------------------ */

export const cartaoIntro =
  "Os cartões AUVP reúnem funções de crédito e débito no mesmo cartão, permitindo centralizar movimentações em uma única solução. Além disso, o membro pode personalizar o cartão com benefícios adicionais, escolhendo entre cashback na fatura ou programa de pontos, além de módulos extras conforme a necessidade.";

export interface CartaoModulo {
  titulo: string;
  /** Observação curta sobre o módulo (ex.: se é gratuito). */
  nota?: string;
  itens: string[];
  link?: { label: string; href: string };
}

export interface CartaoAUVP {
  nome: string;
  icon: LucideIcon;
  /** Para quem o cartão é indicado. */
  publico: string;
  /** Cartões com estrutura detalhada (Platinum e Black). */
  fidelidade?: { intro: string; opcoes: string[] };
  modulosIntro?: string;
  modulos?: CartaoModulo[];
  /** Observação de liberação/limite, quando houver. */
  liberacao?: string;
  /** Cartões descritos em texto corrido (Ultrablue e World Legend). */
  descricao?: string[];
}

/** Módulos comuns ao Platinum e ao Black — evita divergirem por descuido. */
const moduloEntretenimento: CartaoModulo = {
  titulo: "Entretenimento",
  nota: "Gratuito e incluso no cartão.",
  itens: [
    "Descontos na Arena BTG",
    "Produtos Empiricus",
    "Mastercard Surpreenda",
    "Benefícios Mastercard",
    "Campanhas promocionais vigentes",
  ],
};

const moduloSeguranca: CartaoModulo = {
  titulo: "Segurança Extra",
  itens: [
    "Seguro Conta e Cartão",
    "Monitoramento de CPF",
    "Alertas e notificações via WhatsApp",
  ],
};

const moduloTransacional: CartaoModulo = {
  titulo: "Transacional",
  itens: [
    "10 dias sem juros no Limite da Conta",
    "Cashback em tags de mobilidade parceiras",
    "Saques ilimitados",
    "Cartões adicionais conforme regras vigentes",
  ],
};

const MODULOS_INTRO =
  "O membro pode selecionar os módulos de benefícios disponíveis e ajustar a configuração conforme a necessidade, de acordo com as opções vigentes no aplicativo.";

export const cartoesAuvp: CartaoAUVP[] = [
  {
    nome: "Cartão Platinum",
    icon: CreditCard,
    publico: "Voltado para membros que buscam praticidade, benefícios personalizáveis e boa relação custo-benefício.",
    fidelidade: {
      intro: "É possível optar entre:",
      opcoes: [
        "Pontos BTG: 1,6 pontos por dólar gasto",
        "Cashback BTG: 0,5% ou 0,75% sobre o valor da fatura",
      ],
    },
    modulosIntro: MODULOS_INTRO,
    modulos: [
      moduloEntretenimento,
      {
        titulo: "Viagem",
        itens: ["IOF Zero em compras internacionais, conforme regras vigentes"],
      },
      moduloSeguranca,
      moduloTransacional,
    ],
  },
  {
    nome: "Cartão Black",
    icon: Crown,
    publico: "Voltado para membros que buscam flexibilidade, permitindo combinar vantagens em viagens, investimentos, segurança, cashback, pontos e experiências exclusivas.",
    fidelidade: {
      intro: "É possível optar entre:",
      opcoes: [
        "Pontos BTG: 2,2 pontos por dólar gasto",
        "Cashback BTG: 1% sobre o valor da fatura",
      ],
    },
    modulosIntro: MODULOS_INTRO,
    modulos: [
      moduloEntretenimento,
      {
        titulo: "Viagem",
        nota: "Benefícios voltados para uso internacional.",
        itens: [
          "4 acessos gratuitos LoungeKey (modalidade Black)",
          "IOF Zero em compras internacionais, conforme regras vigentes",
        ],
        link: {
          label: "Consultar as salas VIP disponíveis",
          href: "https://airport.mastercard.com/pt/lounge-finder/terminal?airportcode=GRU&terminalcode=1428",
        },
      },
      {
        titulo: "Investimentos",
        itens: [
          "Acesso a fundo exclusivo com liquidez diária",
          "Sem taxa de administração",
          "Limite de aplicação conforme regras vigentes",
          "Conteúdo digital Exame",
        ],
      },
      moduloSeguranca,
      moduloTransacional,
    ],
    liberacao: "Liberação do Cartão Black — limite por investimentos: com investimentos a partir de R$ 5 mil em produtos elegíveis, o membro pode ter acesso ao Cartão Black. Além disso, o cartão pode contar com 6 primeiros meses de mensalidade grátis, conforme campanha vigente.",
  },
  {
    nome: "Cartão Ultrablue",
    icon: Sparkles,
    publico: "Voltado para membros que buscam exclusividade, alto nível de benefícios e uma experiência diferenciada no dia a dia e em viagens.",
    descricao: [
      "Oferece crédito ilimitado, IOF zero em compras internacionais, cashback ou pontos, acesso a salas VIP e benefícios premium em um pacote completo.",
      "Desenvolvido para quem possui patrimônio investido a partir de R$ 1 milhão e deseja unir conveniência, sofisticação e vantagens financeiras.",
    ],
  },
  {
    nome: "Cartão Ultrablue World Legend",
    icon: Crown,
    publico: "Uma evolução que ampliou os benefícios do Ultrablue.",
    descricao: [
      "Conecta o membro a vivências ainda mais exclusivas ao redor do mundo.",
    ],
  },
];

export const contaVideos = {
  plataforma: "https://raw.githubusercontent.com/design-auvp/projetodelta/main/IMG_1889.MP4",
  appBtg: "https://raw.githubusercontent.com/design-auvp/projetodelta/main/0324.mp4",
};

/* ============================================================
   Resumo de Produtos
   ============================================================ */

export interface ResumoProduto {
  produto: string;
  investimento: string;
  paraQuemE: string;
  duracao: string;
  site: { label: string; href: string };
}

export const resumoProdutos: ResumoProduto[] = [
  {
    produto: "AUVP Escola",
    investimento: "12x de R$ 297,00 (R$ 3.564,00) ou R$ 2.997,00 à vista",
    paraQuemE: "Iniciantes a avançados que buscam base sólida, aperfeiçoamento e planejamento para viver de renda.",
    duracao: "1843 min (~30 horas) — 2 meses de suporte ao vivo",
    site: { label: "auvp.com.br", href: "https://www.auvp.com.br/" },
  },
  {
    produto: "AUVP Sempre",
    investimento: "R$ 49,90/mês ou R$ 548,90/ano",
    paraQuemE: "Alunos que já concluíram a AUVP Escola e desejam evolução contínua, com módulos bônus sempre atualizados (Indicadores, Criptomoedas, AUVP Analítica e mais) e acesso às ferramentas exclusivas de decisão.",
    duracao: "Assinatura contínua",
    site: { label: "auvp.com.br/auvp-sempre", href: "https://www.auvp.com.br/auvp-sempre/" },
  },
  {
    produto: "AUVP PRO",
    investimento: "R$ 497,00 (Certificação CPA)",
    paraQuemE: "Profissionais buscando as certificações ANBIMA (CPA, C-Pro-R, C-Pro-I) ou especialistas em investimentos.",
    duracao: "Acesso liberado por 1 ano",
    site: { label: "auvp.pro", href: "https://www.auvp.pro" },
  },
  {
    produto: "AUVP Analítica",
    investimento: "A depender do plano selecionado",
    paraQuemE: "Investidores iniciantes a experientes buscando dados confiáveis e ferramentas analíticas de ações e FIIs.",
    duracao: "Assinatura contínua — 30 dias de teste grátis",
    site: { label: "analitica.auvp.com.br", href: "https://analitica.auvp.com.br/" },
  },
  {
    produto: "AUVP Internacional",
    investimento: "R$ 3.997,00 à vista ou R$ 997 (caso já tenha a Escola)",
    paraQuemE: "Investidores que buscam segurança, blindagem sucessória e expansão para o mercado global.",
    duracao: "1339 min (~22h19) — acesso de 1 ano. Prorrogação: R$ 49,50/mês",
    site: { label: "aulasauvp.com.br/auvp-internacional", href: "https://www.aulasauvp.com.br/auvp-internacional" },
  },
  {
    produto: "AUVP Agro",
    investimento: "A depender do serviço contratado",
    paraQuemE: "Toda a cadeia produtiva agro: produtores, gestores, sucessores e ecossistema de suporte.",
    duracao: "Acesso de 1 ano (Plataforma Agro)",
    site: { label: "auvpagro.com.br", href: "https://auvpagro.com.br/" },
  },
  {
    produto: "AUVP Banking (Conta e Cartões)",
    investimento: "Variável de acordo com a modalidade de contratação",
    paraQuemE: "Destinada exclusivamente para alunos do treinamento da AUVP.",
    duracao: "Contínua",
    site: { label: "auvpcapital.com.br/planos", href: "https://auvpcapital.com.br/planos/" },
  },
];
