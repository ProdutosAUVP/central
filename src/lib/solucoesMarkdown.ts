import {
  escolaInfo, escolaHero, escolaPublico, escolaFeatures, escolaDuracao, escolaModulos,
  obsAjustesRegulares, escolaFerramentas, escolaGarantia,
  sempreInfo, sempreHero, sempreModulos, sempreBeneficios,
  proInfo, proHero, proFeatures, proCronograma,
  analiticaInfo, analiticaHero, analiticaFeatures,
  internacionalInfo, internacionalHero, internacionalModalidades, internacionalFeatures, internacionalCronograma,
  agroInfo, agroHero, agroPlataforma, agroConsultoria, agroFazendas,
  contaInfo, contaHero, contaInvestimentos, contaBanking, contaPlanos, contaBeneficios,
  cartaoIntro, cartoesAuvp,
  resumoProdutos,
  type QuickInfo, type InfoCard, type FeatureItem, type Modulo,
} from "@/data/solucoes";

/* ============================================================
   Helpers de formatação
   ============================================================ */

function linhas(...partes: (string | null | undefined | false)[]): string {
  return partes.filter((p): p is string => Boolean(p)).join("\n");
}

function bloco(...partes: (string | null | undefined | false)[]): string {
  return partes.filter((p): p is string => Boolean(p)).join("\n\n");
}

function quickInfo(info: QuickInfo[]): string {
  return info
    .map((i) => (i.tipo === "site" && i.href ? `- ${i.texto}: ${i.href}` : `- ${i.texto}`))
    .join("\n");
}

function infoCards(cards: InfoCard[]): string {
  return cards.map((c) => `- **${c.titulo}** — ${c.desc}`).join("\n");
}

function featureItems(items: FeatureItem[]): string {
  return items.map((f) => `- ${f.destaque ? `**${f.destaque}** ` : ""}${f.texto}`).join("\n");
}

function tabela(colunas: string[], linhasTabela: string[][]): string {
  const header = `| ${colunas.join(" | ")} |`;
  const sep = `| ${colunas.map(() => "---").join(" | ")} |`;
  const corpo = linhasTabela.map((l) => `| ${l.join(" | ")} |`).join("\n");
  return `${header}\n${sep}\n${corpo}`;
}

function modulos(lista: Modulo[]): string {
  return lista
    .map((m) => {
      const meta = m.meta.length ? ` _(${m.meta.join(" · ")})_` : "";
      const aulas = m.aulas.map((a) => `  - ${a.num} — ${a.titulo} (${a.duracao})`).join("\n");
      return bloco(
        `#### ${m.titulo}${meta}`,
        m.desc,
        m.obs && `> ${m.obs}`,
        aulas
      );
    })
    .join("\n\n");
}

/* ============================================================
   Geração do markdown
   ============================================================ */

export function gerarResumoSolucoesMarkdown(): string {
  const partes: string[] = [];

  partes.push(bloco(
    "# Nossas Soluções — Central de Produto AUVP",
    "Compilado de todos os produtos digitais da AUVP: para quem são, o que entregam, cronogramas de conteúdo, ferramentas, planos e condições."
  ));

  /* ---------------- AUVP Escola ---------------- */
  partes.push(bloco(
    "## AUVP Escola",
    `_${escolaHero.badge}_`,
    escolaHero.paraQuemE,
    quickInfo(escolaInfo),
    "### É para quem busca",
    infoCards(escolaPublico),
    "### O que é AUVP?",
    featureItems(escolaFeatures),
    `**${escolaDuracao}**`,
    "### Cronograma de conteúdo",
    modulos(escolaModulos),
    `> ${obsAjustesRegulares}`,
    "### Ferramentas AUVP",
    infoCards(escolaFerramentas),
    "### Garantia",
    `**${escolaGarantia.titulo}** — ${escolaGarantia.texto}`
  ));

  /* ---------------- AUVP Sempre ---------------- */
  partes.push(bloco(
    "## AUVP Sempre",
    `_${sempreHero.badge}_`,
    sempreHero.paraQuemE,
    sempreHero.oQueE,
    quickInfo(sempreInfo),
    "### Módulos",
    modulos(sempreModulos),
    "### Benefícios",
    infoCards(sempreBeneficios)
  ));

  /* ---------------- AUVP PRO ---------------- */
  partes.push(bloco(
    "## AUVP PRO",
    `_${proHero.badge}_`,
    proHero.paraQuemE,
    proHero.oQueE,
    quickInfo(proInfo),
    "### Benefícios",
    featureItems(proFeatures),
    "### Cronograma",
    proCronograma.intro,
    tabela(proCronograma.colunas, proCronograma.linhas),
    `> ${proCronograma.obs}`
  ));

  /* ---------------- AUVP Analítica ---------------- */
  partes.push(bloco(
    "## AUVP Analítica",
    `_${analiticaHero.badge}_`,
    analiticaHero.paraQuemE,
    analiticaHero.oQueE,
    analiticaHero.freemium,
    quickInfo(analiticaInfo),
    "### Diferenciais",
    featureItems(analiticaFeatures),
    `> ${analiticaHero.obs}`
  ));

  /* ---------------- AUVP Internacional ---------------- */
  partes.push(bloco(
    "## AUVP Internacional",
    `_${internacionalHero.badge}_`,
    internacionalHero.paraQuemE,
    internacionalHero.oQueE,
    `**${internacionalHero.duracao}**`,
    quickInfo(internacionalInfo),
    "### Modalidades de aquisição",
    internacionalModalidades.intro,
    internacionalModalidades.itens.map((i) => `- **${i.destaque}** ${i.texto}`).join("\n"),
    "### O que você vai conseguir",
    featureItems(internacionalFeatures),
    "### Cronograma",
    tabela(internacionalCronograma.colunas, internacionalCronograma.linhas)
  ));

  /* ---------------- AUVP Agro ---------------- */
  partes.push(bloco(
    "## AUVP Agro",
    `_${agroHero.badge}_`,
    agroHero.paraQuemE,
    ...agroHero.oQueE,
    quickInfo(agroInfo),
    "### Plataforma",
    agroPlataforma.desc,
    agroPlataforma.precos.map((p) => `- ${p.label} ${p.valor}`).join("\n"),
    "**Benefícios:**",
    featureItems(agroPlataforma.beneficios),
    "**Treinamentos:**",
    agroPlataforma.treinamentos
      .map((t) => `- **${t.titulo}** _(${t.badge})_ — ${t.desc}`)
      .join("\n"),
    `> ${agroPlataforma.obs}`,
    "### Consultoria",
    agroConsultoria.map((i) => `- **${i.destaque}** ${i.texto}`).join("\n"),
    "### AUVP Fazendas",
    agroFazendas.desc,
    quickInfo(agroFazendas.info),
    `> ${agroFazendas.obs}`
  ));

  /* ---------------- AUVP Banking (Conta e Cartões) ---------------- */
  partes.push(bloco(
    "## AUVP Banking (Conta e Cartões)",
    `_${contaHero.badge}_`,
    contaHero.paraQuemE,
    quickInfo(contaInfo),
    `### ${contaInvestimentos.titulo}`,
    ...contaInvestimentos.intro,
    contaInvestimentos.itens.map((i) => `- ${i}`).join("\n"),
    contaInvestimentos.fechamento,
    `### ${contaBanking.titulo}`,
    ...contaBanking.intro,
    contaBanking.itens.map((i) => `- ${i}`).join("\n"),
    contaBanking.fechamento,
    "### Planos",
    contaPlanos
      .map((p) => `- **${p.tag}**${p.destaque ? " ⭐" : ""} — ${p.desc} ${p.taxaLabel} ${p.taxa} ${p.taxaDesc}`)
      .join("\n"),
    "### Benefícios",
    featureItems(contaBeneficios),
    "### Cartões AUVP",
    cartaoIntro,
    cartoesAuvp
      .map((c) => {
        const fidelidade = c.fidelidade
          ? bloco(c.fidelidade.intro, c.fidelidade.opcoes.map((o) => `  - ${o}`).join("\n"))
          : null;
        const mods = c.modulos
          ? c.modulos
              .map((m) =>
                bloco(
                  `  - **${m.titulo}**${m.nota ? ` _(${m.nota})_` : ""}`,
                  m.itens.map((i) => `    - ${i}`).join("\n"),
                  m.link && `    - [${m.link.label}](${m.link.href})`
                )
              )
              .join("\n")
          : null;
        const descricao = c.descricao ? c.descricao.join(" ") : null;
        return bloco(
          `#### ${c.nome}`,
          c.publico,
          fidelidade,
          mods,
          c.liberacao && `> ${c.liberacao}`,
          descricao
        );
      })
      .join("\n\n")
  ));

  /* ---------------- Resumo comparativo ---------------- */
  partes.push(bloco(
    "## Resumo de Produtos",
    "Tabela comparativa com as informações objetivas de cada produto do ecossistema AUVP.",
    tabela(
      ["Produto", "Investimento", "Para quem é", "Duração / Tempo de Acesso", "Site Oficial"],
      resumoProdutos.map((p) => [
        p.produto,
        p.investimento,
        p.paraQuemE,
        p.duracao,
        `[${p.site.label}](${p.site.href})`,
      ])
    )
  ));

  return partes.join("\n\n---\n\n");
}

/** Aciona o download do resumo compilado em Markdown. */
export function baixarResumoSolucoesMarkdown(): void {
  const blob = new Blob([gerarResumoSolucoesMarkdown()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nossas-solucoes-resumo.md";
  a.click();
  URL.revokeObjectURL(url);
}
