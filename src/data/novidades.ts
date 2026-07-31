/**
 * Fonte única do Mural de Novidades.
 * Consumida pelo Hub (accordion resumido) e pela página /novidades (mural completo).
 */

export interface NovidadeItem {
  emoji: string;
  titulo: string;
  descricao: string;
  /**
   * Comparação opcional "antes/depois" — categoria independente que só
   * renderiza quando ao menos um dos dois campos existe (ex.: um anúncio
   * sem estado anterior claro pode ter só `depois`).
   */
  antes?: string;
  depois?: string;
  /** Resultados/entregas concretas da seção. Categoria independente e opcional. */
  resultados?: string[];
  /** Quem assinou a entrega. Categoria independente e opcional. */
  envolvidos?: string[];
  /**
   * Marca a novidade como destaque do Mural do Hub.
   *
   * O carrossel do Hub reúne os destaques de toda a história — não só os do
   * mês mais recente —, por isso o texto curto do card mora aqui, separado
   * da copy longa da edição do mês. Campos ausentes caem no item.
   */
  destaque?: {
    titulo?: string;
    descricao?: string;
    /** Chave em `lpScreenshots`. Sem imagem, o card usa o painel da marca. */
    imagem?: string;
  };
  /** Link externo real. Itens sem link não renderizam CTA. */
  link?: string;
}

export interface NovidadeMensal {
  mes: string;
  ano: number;
  intro: string;
  items: NovidadeItem[];
  spoiler: string[];
  rodape?: string;
}

/** Mapa de nome do mês (pt-BR) → número com dois dígitos, para o badge do Mural. */
const MES_NUMERO: Record<string, string> = {
  janeiro: "01", fevereiro: "02", março: "03", marco: "03", abril: "04",
  maio: "05", junho: "06", julho: "07", agosto: "08", setembro: "09",
  outubro: "10", novembro: "11", dezembro: "12",
};

export const mesNumero = (mes: string) => MES_NUMERO[mes.trim().toLowerCase()] ?? "--";

export const novidadesMensais: NovidadeMensal[] = [
  {
    mes: "Julho", ano: 2026,
    intro: "Julho foi mês de coisa grande saindo do forno: o Minha AUVP no ar para todo mundo, uma casa nova para os ETFs e dois módulos novos na Escola. Bora ver o que a Equipe AUVP entregou?",
    items: [
      {
        emoji: "🖥️",
        titulo: "Minha AUVP — Hub 2.0",
        descricao: "O Minha AUVP (antigo hub de produtos) já está no ar para os membros! Desenvolvemos um visual mais moderno e funcionalidades para facilitar o uso das nossas soluções.",
        antes: "O Hub reunia os produtos numa interface antiga, pensada quando o catálogo era bem menor.",
        depois: "Minha AUVP: visual novo e funcionalidades que facilitam o acesso a todas as soluções em um só lugar.",
        envolvidos: ["Ariadne Carneiro", "Éria Alencar", "Vitor Manoel", "Witor Lomazzi", "Cauê Filipe", "João Lima", "Thiago Langsdorf"],
        destaque: {},
      },
      {
        emoji: "📊",
        titulo: "Novo site de ETFs",
        descricao: "Lançamos uma página oficial para centralizar e dar transparência a todas as informações técnicas, metodologias e composições dos nossos ETFs.",
        envolvidos: ["Armando Custódio", "Jeniffer Nascimento", "Hiago Felipe"],
        destaque: { imagem: "etfs" },
        link: "https://www.auvpetfs.com.br/",
      },
      {
        emoji: "📈",
        titulo: "Módulo de Indicadores (exclusivo AUVP Sempre)",
        descricao: "Promessa cumprida! Subimos um novo módulo exclusivo para os assinantes da AUVP Sempre, aprofundando a parte técnica de avaliação de empresas.",
        envolvidos: ["Matheus Graff", "Douglas Ribeiro", "Maximiliano Carneiro (Max)", "Lucas Magalhães", "Luis Guilherme Borges"],
        destaque: { titulo: "Módulo de Indicadores", imagem: "sempre" },
      },
      {
        emoji: "📒",
        titulo: "Módulo AUVP Analítica",
        descricao: "Liberamos na Escola um módulo completo ensinando o passo a passo para extrair o máximo da nossa ferramenta e todas as suas funcionalidades.",
        envolvidos: ["Jeniffer Nascimento", "Hemily Borges", "Maximiliano Carneiro (Max)", "Lucas Magalhães", "Luis Guilherme Borges"],
        destaque: { imagem: "analitica" },
      },
    ],
    spoiler: [
      "🧒 Educação Financeira para crianças — chega em agosto",
      "🧑‍🏫 Plano de Aula para professores — também em agosto",
      "📱 SuperApp da AUVP — previsto para dezembro",
      "💳 Cartão AUVP com benefícios exclusivos — em breve",
      "🏫 Projeto Statera (AUVP nas Escolas) — em breve",
    ],
    rodape: "E com isso, bora para agosto! Caso tenham mais sugestões ou ideias, podem mandar pra gente. Estamos de olho em tudo o que nos sugerem ;)",
  },
  {
    mes: "Junho", ano: 2026,
    intro: "Olá pessoal, como estamos? Neste mês de junho tivemos Copa do Mundo, festa junina e, como de costume: uma série de novidades e atualizações na AUVP. Então, bora conferir o que a Equipe AUVP fez nesse mês?",
    items: [
      {
        emoji: "📊",
        titulo: "AUVP Escola COMPLETAMENTE regravada",
        descricao: "A gente sempre acompanha os feedbacks de vocês e sabemos que manter o conteúdo atualizado é essencial para a experiência de aprendizagem. Por isso, revisamos a estrutura da AUVP Escola e neste mês concluímos a regravação integral de todas as aulas do treinamento — conteúdo 100% atualizado para facilitar a rotina de estudos e manter a qualidade de sempre nas nossas entregas.",
        antes: "Aulas gravadas em versões anteriores, com o conteúdo internacional concentrado em uma única aula de Stocks.",
        depois: "Treinamento inteiro regravado: Stocks dividida em 4 partes com análise setorial (P1 a P4), nova aula de Renda Fixa Internacional e módulo 7 repaginado.",
        resultados: [
          "Módulo 6: a antiga aula 06 sobre Stocks (Ações Americanas) agora está dividida em 4 partes mais detalhadas e focadas na análise setorial (P1, P2, P3 e P4)",
          "Módulo 6: nova aula 07 sobre Renda Fixa Internacional",
          "Módulo 7: nova versão com o conteúdo 100% repaginado",
          "Os e-books atualizados dos módulos 6 e 7 chegam em breve — os vídeos já estão liberados",
        ],
        envolvidos: ["Elane Rodrigues", "Ana Beatriz Melo", "Matheus Graff", "Maximiliano Carneiro (Max)", "Lucas Magalhães", "Luis Guilherme Borges", "Lucas Cassimiro"],
        destaque: {
          titulo: "AUVP Escola 100% Regravada",
          descricao: "Concluímos a regravação integral e a atualização de todo o conteúdo da AUVP Escola. Uma entrega focada em manter o nosso padrão de qualidade e entregar a melhor experiência de estudo possível.",
          imagem: "escola",
        },
        link: "https://www.aulasauvp.com.br/path-player?courseid=auvp&unit=6772ad0d1fe057e9530659d2Unit",
      },
      {
        emoji: "📓",
        titulo: "Cadernos de exercício em todos os módulos",
        descricao: "Para quem sentia falta de colocar o conhecimento em prática, lançamos Cadernos de Exercícios antes de todas as avaliações na plataforma da Escola. A ideia é simples: deixar o aprendizado mais dinâmico. Com atividades ligadas diretamente ao que é passado nas aulas, fica muito mais fácil assimilar os conceitos e fixar o conteúdo ao longo da jornada.",
        antes: "As avaliações vinham logo após as aulas, sem um material de prática entre elas.",
        depois: "Caderno de exercícios disponível antes da avaliação de cada módulo, do M1 ao M6.",
        envolvidos: ["Matheus Graff", "Armando Custódio"],
        destaque: {
          titulo: "Cadernos de Exercícios na Escola",
          descricao: "Implementamos atividades práticas antes das avaliações em todos os módulos da AUVP Escola para deixar a jornada de aprendizado dos alunos muito mais dinâmica e facilitar a fixação do conteúdo.",
          imagem: "escola",
        },
        link: "https://www.aulasauvp.com.br/path-player?courseid=auvp&unit=6a3d845094f35e363d0cbd26Unit",
      },
      {
        emoji: "🟢",
        titulo: "Badge da Camisa BR + AUVP",
        descricao: "Entramos com tudo no clima da Copa do Mundo e liberamos uma nova badge exclusiva na Comunidade para todos que conseguiram adquirir o Manto da AUVP. Para garantir a badge no seu perfil, é só postar uma foto vestindo a camisa no tópico oficial que criamos para isso.",
        link: "https://comunidade.auvp.com.br/topic/44214-badge-sele%C3%A7%C3%A3o-auvp/",
      },
      {
        emoji: "📊",
        titulo: "Comparador de ETFs e análises em vídeo na Analítica (exclusivo para assinantes)",
        descricao: "A AUVP Analítica lançou mais uma funcionalidade para facilitar a vida de quem investe ou tem interesse em investir em ETFs: um comparador exclusivo que permite colocar os ativos lado a lado e analisá-los com base em diferentes indicadores financeiros. Além disso, liberamos novos vídeos de análise com os Analistas da AUVP Capital focados em FIIs e ETFs, para quem quer investir com fundamento e adquirir ainda mais conhecimento técnico.",
        antes: "Analisar ETFs exigia abrir um ativo de cada vez e cruzar os indicadores manualmente.",
        depois: "Comparador coloca os ETFs lado a lado por indicador, com novos vídeos de análise de FIIs e ETFs pelo time de analistas.",
        link: "https://analitica.auvp.com.br/etfs/comparar",
      },
      {
        emoji: "🎥",
        titulo: "Giro da Bolsa Itinerante em SP",
        descricao: "Neste mês, o Giro da Bolsa Itinerante fez sua terceira parada na cidade de São Paulo. Quem estava presente acompanhou de perto a gravação do programa semanal do canal Investidor Sardinha, ao vivo e sem censura — e ainda teve uma galera que esticou a experiência conosco no after depois do evento. Poder sair de trás das telas e trocar ideia olho no olho com vocês não tem preço: são esses momentos que provam que a AUVP é bem mais do que uma escola de investimentos, é uma comunidade viva.",
        link: "https://www.youtube.com/watch?v=EMU2chjddxI&t=217s",
      },
    ],
    spoiler: [
      "🖥️ Novo HUB (Minha AUVP) — lançamento marcado para o dia 09 de julho!",
      "🗣️ Nova plataforma para sistema de indicações da AUVP (em fase de reformulação)",
      "📈 Módulo de Análise de indicadores AUVP Sempre (exclusivo para assinantes)",
      "📚 Novo Módulo 1 na AUVP Escola (em processo de criação)",
      "📱 SuperApp da AUVP (projeto centralizado ganhando forma)",
    ],
    rodape: "E com isso, bora para julho! Caso tenham mais sugestões ou ideias, podem mandar pra gente. Estamos de olho em tudo o que nos sugerem ;)",
  },
  {
    mes: "Maio", ano: 2026,
    intro: "Fala galerinha, como estamos? Maio acabou de terminar e, como de costume, a Equipe AUVP trabalhou firme pra atualizar nossos produtos e lançar novidades muuito requisitadas e especiais para vocês. Então, sem mais enrolação, bora conferir o que rolou por aqui durante o mês?",
    items: [
      { emoji: "🏛️", titulo: "Lançamento do treinamento completo para CPA da AUVP Pro", descricao: "A AUVP Pro entrou oficialmente em uma nova fase. Reformulamos completamente a nossa experiência de aprendizado para entregar materiais mais completos e ajudar você a estudar com foco e confiança.", resultados: ["Aulas repaginadas com explicações diretas e objetivas", "Simulados comentados para você treinar na prática", "Estrutura otimizada para se encaixar na sua rotina de estudos"] },
      { emoji: "🚜", titulo: "Novos materiais na Escola Agro", descricao: "Adicionamos novos e-books e materiais didáticos no treinamento de Hedge que facilitam seu aprendizado. Tudo isso já está disponível na plataforma Agro.", resultados: ["Cotações em tempo real de commodities (soja, milho, boi, etc.)", "Previsões climáticas detalhadas da sua região", "Cartas de recomendações semanais com análises de mercado", "Análises ao vivo com especialistas do agro"] },
      { emoji: "📊", titulo: "Ranking de ETFs Americanos e análises em vídeo na Analítica (exclusivo para assinantes)", descricao: "Nova funcionalidade para facilitar a vida de quem investe em ETFs Americanos. Os assinantes têm acesso a rankeamentos dos principais ativos com base em diferentes indicadores. Também liberamos novos vídeos de análise de empresas com nosso time de analistas.", antes: "Assinantes não tinham como comparar ETFs Americanos com base em indicadores, nem contavam com vídeos de análise de empresas na Analítica.", depois: "Ranking dos principais ativos por indicador e vídeos de análise do time de analistas, direto na Analítica." },
      { emoji: "🛠️", titulo: "Por trás das câmeras: melhorias na AUVP Escola", descricao: "Continuamos implementando melhorias técnicas, visuais e de conteúdo no ambiente de aulas. Essas correções só acontecem porque vocês compartilham feedbacks com a gente — obrigado!" },
      { emoji: "📌", titulo: "ETFs Irlandeses disponíveis na nossa plataforma", descricao: "Os tão pedidos ETFs Irlandeses (UCITS) já estão liberados para todos que possuem conta internacional da AUVP. Basta garantir que o aplicativo BTG Investimentos esteja atualizado para a versão mais recente." },
      { emoji: "🪩", titulo: "Private Day 2026 confirmado: dias 7 e 8 de novembro, Goiânia", descricao: "O Private Day está de volta, dessa vez MAIOR. Serão 2 dias completos de imersão com palestras sobre mercado, cenário econômico e negócios. No último dia: nossa tradicional festa com tema Disco Fever. Os ingressos do 1º lote já estão à venda!" },
    ],
    spoiler: ["🧑‍🏫 Novas aulas de Stocks no módulo 6 da Escola (em fase de edição)", "🗣️ Nova plataforma para sistema de indicações da AUVP (em fase de reformulação)", "💳 Cartão AUVP com benefícios exclusivos", "📈 Módulo de Análise de indicadores AUVP Sempre (exclusivo para assinantes)", "🎥 Nova edição do Giro da Bolsa Itinerante sem censura VEM AÍ…"],
    rodape: "E com isso, bora para junho! Caso tenham mais sugestões ou ideias, podem mandar pra gente. Estamos de olho em tudo o que nos sugerem ;)",
  },
  {
    mes: "Abril", ano: 2026,
    intro: "E aí pessoal, tudo joia? No mês de abril todo mundo que trabalha na AUVP se reuniu para o evento interno mais especial do ano, com mais de 200 piratas indo até o Rio de Janeiro. Rolou até presente pra quem encontrasse a gente nos aeroportos 😂 Depois de 3 dias de muita união, boas festas e o mar carioca, voltamos com ainda mais gás para entregar novidades exclusivas para vocês.",
    items: [
      { emoji: "🦁", titulo: "Atualizações no Módulo de Imposto de Renda", descricao: "O radar da Receita mudou alguns pontos em 2026. O módulo bônus de IR da AUVP Escola já está com todas as novas obrigatoriedades detalhadas, tudo para você não cair nas garras do Leão!", antes: "Módulo bônus de IR ainda refletia as regras dos anos anteriores.", depois: "Todas as novas obrigatoriedades de 2026 já detalhadas no módulo." },
      { emoji: "🪙", titulo: "Novo Módulo Bônus: Criptomoedas", descricao: "Liberamos um novo módulo com um dos conteúdos mais solicitados por vocês: criptomoedas. São 15 aulas explicando do zero sobre essa modalidade, de forma didática e alinhada com a filosofia buy and hold." },
      { emoji: "🚜", titulo: "60 novas aulas na Escola Agro", descricao: "Só nesse mês subimos 60 novas aulas para os treinamentos de Hedge, Sucessão e Crédito Rural. Além disso, temos uma área exclusiva na comunidade para a galera do Agro!", resultados: ["Cotações em tempo real de commodities (soja, milho, boi, etc.)", "Previsões climáticas detalhadas da sua região", "Cartas de recomendações semanais com análises de mercado", "Análises ao vivo com especialistas do agro"] },
      { emoji: "🔧", titulo: "Melhorias técnicas no Hub de Produtos", descricao: "Realizamos melhorias técnicas e corrigimos bugs que atrapalhavam sua experiência no Hub AUVP, para garantir que sua navegação seja cada vez mais fluida e intuitiva." },
      { emoji: "📊", titulo: "Visualização em tabela para análise de ativos na Analítica (exclusivo para assinantes)", descricao: "Nova funcionalidade para comparar ativos de forma prática. Agora você visualiza tudo de uma vez e ordena pelas colunas que mais importam para sua estratégia. Menos cliques, mais clareza." },
      { emoji: "🟢", titulo: "Convocação AUVP — Camisa BR x AUVP", descricao: "Lançamos a campanha para quem quer vestir o orgulho da nossa comunidade. Para ganhar sua camiseta vintage exclusiva: débito automático ativo, streaming mensal ativo, Open Finance com 80% do patrimônio e inscrição na campanha." },
    ],
    spoiler: ["🪩 Vendas do Private Day 2026 mais próximas do que nunca…", "👝 Consolidador de carteira segue em fase de testes", "🗣️ Nova plataforma para sistema de indicações da AUVP (em fase de prototipação)", "🧑‍🏫 Projeto da nova plataforma de aulas em colaboração com a comunidade de devs", "📚 Treinamento da AUVP Pro atualizado para novas certificações", "💳 Cartão AUVP com novos benefícios exclusivos (em breve)", "📊 Módulo de análise de Indicadores (exclusivo Sempre)", "📒 Módulo ensinando a usar a Analítica (finalizamos as gravações — logo liberamos)"],
    rodape: "Como sempre, feedbacks são muito bem-vindos. Tudo isso é pra deixar a AUVP cada vez melhor, mais clara pra vocês e mais forte como escola. Bora para maio!!",
  },
  {
    mes: "Março", ano: 2026,
    intro: "Fala pessoal, tudo bem? Março acabou de terminar e, nesse mês que pareceu não ter fim, tivemos várias atualizações e novidades especiais para vocês. Bora conferir tudo o que a Equipe AUVP trabalhou nesse mês?",
    items: [
      { emoji: "📌", titulo: "Atualização de módulo 6: nova aula 6.5 sobre REITs", descricao: "O módulo 6 já possui 6 aulas atualizadas, da 6.1 a 6.4 (dividida em três partes). A nova 6.5 explica todas as pormenoridades dos REITs para te dar um panorama completo sobre o investimento internacional." },
      { emoji: "📝", titulo: "Novas aulas no Módulo de Análise de Setores (exclusivo AUVP Sempre)", descricao: "Liberamos 12 aulas novas no Módulo de Análise de Setores. Para além do setor Bancário, você vai dominar: Mineração, Energia Elétrica, Petróleo, Saneamento, Proteína Animal e muito mais." },
      { emoji: "🚜", titulo: "Escola Agro de cara nova", descricao: "Demos uma repaginada e implementamos melhorias nos treinamentos de Hedge, Sucessão e Crédito Rural na plataforma Agro.", resultados: ["Cotações em tempo real de commodities (soja, milho, boi, etc.)", "Previsões climáticas detalhadas da sua região", "Cartas de recomendações semanais com análises de mercado", "Análises ao vivo com especialistas do agro"] },
      { emoji: "📊", titulo: "Análise dos Resultados mensais de FIIs com IA na AUVP Analítica (exclusivo para assinantes)", descricao: "Nova funcionalidade para facilitar o acompanhamento do desempenho mensal de Fundos Imobiliários. Os assinantes têm acesso a análises especialmente desenvolvidas com IA.", antes: "Acompanhar o desempenho mensal de FIIs exigia cruzar dados manualmente em diferentes fontes.", depois: "Análises mensais de FIIs geradas com IA, prontas para consulta direto na Analítica." },
      { emoji: "🔧", titulo: "Melhorias técnicas nas ferramentas", descricao: "Realizamos melhorias técnicas e visuais pontuais nas ferramentas AUVP para garantir navegação fluida e intuitiva.", resultados: ["Minhas Finanças", "Ferramentas AUVP"] },
      { emoji: "🧠", titulo: "Convocação aberta para construirmos o SUPER APP da AUVP", descricao: "Abrimos a primeira chamada para selecionar Designers UX/UI e Desenvolvedores para nos ajudarem a construir de forma colaborativa o Super APP da AUVP." },
      { emoji: "🎥", titulo: "Estreia do Giro da Bolsa Itinerante (sem censura) em BH", descricao: "A primeira edição em Belo Horizonte foi INCRÍVEL. Tivemos gravação ao vivo do Giro + um momento de troca e Baguncinha presencial com os membros. 📢 Próximo destino em breve — os ingressos esgotam RÁPIDO!" },
    ],
    spoiler: ["🪙 Módulo extra sobre criptomoedas (muuuuito em breve)", "👝 Consolidador de carteira segue em fase de testes", "🗣️ Nova plataforma para sistema de indicações da AUVP (em fase de prototipação)", "🧑‍🏫 Projeto da nova plataforma de aulas em colaboração com a comunidade de devs", "📚 Treinamento da AUVP Pro atualizado para novas certificações", "💳 Cartão AUVP com novos benefícios exclusivos (em breve)", "🪩 Preparativos para o Private Day 2026 já começaram por aqui"],
    rodape: "E com isso, bora para abril! Caso tenham mais sugestões ou ideias, podem mandar pra gente. Estamos de olho em tudo o que nos sugerem ;)",
  },
  {
    mes: "Fevereiro", ano: 2026,
    intro: "O mês de fevereiro foi mais curto, mas continuamos trabalhando em novidades exclusivas para vocês. Vem ver tudo o que temos de novidade!",
    items: [
      { emoji: "💷", titulo: "Atualização no módulo 6: 3 novas aulas sobre ETFs internacionais", descricao: "Dividimos a aula em 3 partes para te dar um panorama completo. Exploramos como esses fundos podem ser uma das formas mais simples de acessar o mercado internacional, incluindo ações, renda fixa, REITs e commodities." },
      { emoji: "📝", titulo: "Módulo de Valuation liberado (exclusivo AUVP Sempre)", descricao: "Aprenda a analisar empresas de verdade na prática. Domine leitura de Balanço, DRE e Fluxo de Caixa, aprenda a calcular retorno exigido (Ke / CAPM) e custo de capital (WACC), e descubra o valor real de uma empresa para definir o preço justo com margem de segurança." },
      { emoji: "🔴", titulo: "Aula extra no módulo 4: armadilhas do mercado — produtos financeiros ruins", descricao: "COE, opções… Raul mostra como identificar produtos que parecem bons mas travam seus rendimentos por trás de conflitos de interesse. Investir com autonomia também é saber dizer não ao que brilha mas não gera valor." },
      { emoji: "📉", titulo: "Aula extra no módulo 5: os ciclos estranhos do Bitcoin", descricao: "Raul explica o que realmente sustenta o preço do Bitcoin: a combinação entre escassez e utilidade da descentralização. Entenda por que uma posição pequena (1% a 5%) pode equilibrar risco e oportunidade no longo prazo." },
      { emoji: "🗺️", titulo: "Módulo de geopolítica: Índia (exclusivo AUVP Sempre)", descricao: "3 aulas completas sobre como a Índia está se posicionando no cenário global, seu crescimento como potência emergente e as relações estratégicas que moldam sua influência internacional." },
      { emoji: "🖥️", titulo: "Novo menu da AUVP em fase de testes", descricao: "Estamos testando um menu que unifica o acesso para diferentes links da AUVP — Hub, comunidade, analítica… Vamos subir o novo menu gradualmente em todas as nossas plataformas.", antes: "Cada plataforma AUVP (Hub, comunidade, Analítica…) tinha acesso espalhado, sem um menu unificado.", depois: "Menu único em fase de testes, unificando o acesso a todas as plataformas AUVP." },
    ],
    spoiler: ["👝 Consolidador de carteira está em fase de testes", "📈 Novo módulo de Indicadores e de análise de setores", "🗣️ Nova plataforma para sistema de indicações da AUVP", "🪙 Módulo extra sobre criptomoedas", "🧑‍🏫 Projeto da nova plataforma de aulas em colaboração com a comunidade de devs da AUVP"],
    rodape: "Bora pra março! E se tiverem mais sugestões ou ideias, é só mandar pra gente. Estamos de olho em tudo o que nos sugerem ;)",
  },
  {
    mes: "Janeiro", ano: 2026,
    intro: "Oi, pessoas! Tudo bem? Janeiro passou voando, e por aqui atuamos em algumas novidades bem interessantes para vocês. Bora lá? Listei tudo o que foi atualizado na plataforma e também dar um spoiler do que vem por aí.",
    items: [
      { emoji: "📌", titulo: "Atualização de módulo: nova aula 6.3 já está disponível", descricao: "O módulo 6 já possui 3 aulas atualizadas, da 6.1 a 6.3! A 6.3 conta com um panorama geral sobre a diferença do mercado americano em comparação com o brasileiro. Em fevereiro, mais atualizações." },
      { emoji: "📈", titulo: "ETFs: dúvidas que vocês sempre pediram", descricao: "O Raul gravou duas aulas novas e bem completas, explicando em cada detalhe o AUPO11 e o AREA11. Essas aulas já estão no ar, no Módulo 3, logo depois das explicações sobre Tesouro Direto e Juros Semestrais." },
      { emoji: "🎓", titulo: "Aulas complementares com o recurso de lousa", descricao: "Estamos usando o recurso da lousa para ensinar novos conceitos ou reforçar aqueles que vocês possuem mais dúvidas. Essas aulas extras ficam dentro dos módulos referentes aos temas.", resultados: ["Aula extra: Small caps", "Aula extra: Por que brasileiros gostam de investir para receber dividendos?"] },
      { emoji: "🔧", titulo: "Melhorias técnicas (pedido atendido!)", descricao: "Ajustamos o áudio de todas as aulas que estavam com som baixo. Revimos aula por aula e atualizamos tudo na plataforma. Se perceberem qualquer outro problema de áudio, podem comentar que a gente resolve.", antes: "Várias aulas estavam com o áudio baixo, dificultando o acompanhamento.", depois: "Áudio revisado aula por aula e corrigido em toda a plataforma." },
      { emoji: "📝", titulo: "Provas da AUVP Escola atualizadas", descricao: "Revisamos todas as provas, checando conteúdo, conceitos e enunciados. Agora as questões estão atualizadas, pensadas para checar de fato seu conhecimento." },
      { emoji: "🌍", titulo: "Módulos de Geopolítica (exclusivo AUVP Sempre)", descricao: "Panoramas completos das maiores potências mundiais, explicados por especialistas.", resultados: ["Módulo EUA: todas as aulas no ar, por Carlos Stuart (Mestre em Direito Econômico) ✅", "Módulo China: aulas atualizadas com slides novos ✅", "Módulo Índia: novas aulas em edição — em breve"] },
      { emoji: "🚜", titulo: "Plataforma Agro", descricao: "Para a galera do Agro, agora temos uma plataforma completa! Ideal para quem quer informação e ferramentas para tomar decisões com mais segurança.", resultados: ["Cotações em tempo real de commodities (soja, milho, boi, etc.)", "Previsões climáticas detalhadas da sua região", "Cartas de recomendações semanais com análises de mercado", "Análises ao vivo com especialistas do agro"] },
    ],
    spoiler: ["👝 Consolidador de carteira está em fase de testes", "👾 Correção de bugs no Hub de produtos para liberarmos novidades", "📈 Novo módulo de Indicadores", "📊 Módulo de Valuation e Módulo de análise de setores (exclusivo AUVP Sempre)"],
  },
];

/** Uma entrega em destaque no Mural do Hub, já resolvida com o mês de origem. */
export interface NovidadeDestaque {
  titulo: string;
  descricao: string;
  mes: string;
  ano: number;
  envolvidos?: string[];
  link?: string;
  /** Chave em `lpScreenshots`; ausente = card com o painel da marca. */
  imagem?: string;
}

/**
 * Destaques do Mural, varridos de toda a história — e não de um mês fixo.
 * A ordem é a cronológica da fonte (do mais recente para o mais antigo),
 * então basta marcar `destaque` num item para ele entrar no carrossel do Hub.
 */
export const novidadesDestaque: NovidadeDestaque[] = novidadesMensais.flatMap((mes) =>
  mes.items
    .filter((item) => item.destaque)
    .map((item) => ({
      titulo: item.destaque!.titulo ?? item.titulo,
      descricao: item.destaque!.descricao ?? item.descricao,
      mes: mes.mes,
      ano: mes.ano,
      envolvidos: item.envolvidos,
      link: item.link,
      imagem: item.destaque!.imagem,
    }))
);
