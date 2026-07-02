import React from "react";
import {
  GraduationCap, BookOpen, Users, Clock,
  TrendingUp, BarChart2,
  Wrench, Headphones, Shield
} from "lucide-react";
import { PageShell } from "@/components/PageShell";

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4 border-b pb-3">
      <Icon className="h-5 w-5 text-primary shrink-0" />
      <h2 className="font-bold font-anek text-xl text-foreground">{children}</h2>
    </div>
  );
}

function Card({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-6 ${accent ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-foreground/80 font-roboto leading-relaxed mb-3 last:mb-0">{children}</p>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-bold font-anek text-base text-foreground mb-2 mt-4 first:mt-0">{children}</h3>;
}

export default function EscolaPage() {
  return (
    <PageShell width="4xl" footer="AUVP Escola — Documentação interna do Time de Produto" mainClassName="py-12 space-y-8">

        {/* Hero */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-roboto uppercase tracking-wider mb-4">
            <GraduationCap className="h-3.5 w-3.5" /> AUVP Escola
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground mb-3">
            Documentação do Produto
          </h1>
          <p className="text-muted-foreground font-roboto">
            Visão completa sobre proposta de valor, funcionamento e diferenciais da AUVP Escola.
          </p>
        </div>

        {/* Proposta de Valor */}
        <Card>
          <SectionTitle icon={BookOpen}>Proposta de Valor</SectionTitle>
          <P>O objetivo do produto é transformar qualquer pessoa, do absoluto zero a um investidor no Brasil e no mundo. Conhecendo todas as modalidades de investimento que fazem sentido ao investidor de longo prazo, aquele que acredita na metodologia "Buy and hold".</P>
          <P>O aluno irá comprar o produto se perceber a necessidade de cuidar melhor do seu patrimônio, seja para iniciar os investimentos ou para começar a ter uma melhor organização financeira.</P>
          <P>Quem também poderá se interessar pelo produto são os profissionais que desejam iniciar uma carreira no mercado financeiro. Atualmente a AUVP ajuda esses profissionais, mas não os prepara assertivamente para uma certificação. Por isso, nasce um novo produto: um curso preparatório da AUVP para a certificação do CEA.</P>
          <P>Nossos clientes esperam um maior conhecimento sobre quais são os melhores investimentos em renda fixa ou variável para a alocação dos seus aportes, qual o momento de se aplicar em cada tipo de ativo buscando maior rentabilidade e segurança para o alcance da liberdade financeira.</P>
          <P>Ao final dos estudos, o aluno será capaz de realizar aportes com estratégias avançadas e bem definidas sobre qual o tipo de investimento ideal para o seu perfil de investidor e de acordo com a sua situação atual, de idade, renda, estrutura familiar e afins.</P>
          <div className="mt-4 rounded-lg bg-muted/60 p-4 space-y-2">
            <p className="text-sm font-roboto text-foreground/80">⏱ Treinamento de <strong>8 semanas</strong> com mais de <strong>100 aulas</strong></p>
            <p className="text-sm font-roboto text-foreground/80">🎯 Módulos desenvolvidos de forma didática para <strong>qualquer pessoa</strong>, independente de idade ou conhecimento prévio</p>
            <p className="text-sm font-roboto text-foreground/80">🚫 Esta não é uma promessa de dinheiro fácil</p>
          </div>
        </Card>

        {/* Módulos e Liberação */}
        <Card>
          <SectionTitle icon={Clock}>Módulos e Formato de Liberação</SectionTitle>
          <P>Atualmente se inicia uma nova turma a cada mês e o início das aulas é em conjunto para toda a turma, após a aula de inauguração chamada "Saindo da caverna". Porém, logo após a compra o aluno já possui acesso à plataforma de aulas com a aula 0 liberada para visualização. Esta aula se chama <strong>"Aula 0 - Boas vindas e aprendendo sobre a plataforma"</strong>.</P>
          <P>Depois, a partir da data de início da turma, o módulo 1 é liberado e os próximos módulos são liberados no momento em que o anterior é concluído. Exemplo: concluiu o módulo 1, terá acesso ao módulo 2; concluiu o módulo 2, terá acesso ao módulo 3 e assim por diante.</P>
          <P>A única exceção é referente ao módulo 7, imposto de renda, pois trata-se de um bônus e esse módulo é liberado junto com o módulo 1.</P>
          <P>A cada semana os alunos terão acesso a uma aula ao vivo para tirar dúvidas com o expert Raul Sena. Essas aulas ao vivo têm a duração média de 2h e acontecem todas as segundas-feiras às 19h.</P>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-wider font-roboto mb-1">Tempo de Acesso</p>
              <p className="text-sm font-roboto text-foreground/80">8 semanas de acompanhamento + 1 ano de acesso ao conteúdo e comunidade. Lives ao vivo apenas nas 8 semanas.</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-wider font-roboto mb-1">Lives</p>
              <p className="text-sm font-roboto text-foreground/80">8 lives exclusivas, toda segunda-feira às 19h. Ficam gravadas para quem perder. Unem alunos das turmas em andamento e assinantes "AUVP Para Sempre".</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-wider font-roboto mb-1">Prazo de Reembolso</p>
              <p className="text-sm font-roboto text-foreground/80">7 dias após a liberação do 1º módulo. Garantia estendida após conclusão mediante apresentação do certificado. Reembolso também em caso de falência, perda de emprego, dívidas, luto ou problemas de saúde.</p>
            </div>
          </div>
        </Card>

        {/* Comunidade */}
        <Card accent>
          <SectionTitle icon={Users}>Comunidade</SectionTitle>
          <P>A AUVP conta com uma comunidade exclusiva na nossa plataforma própria. Nela, o aluno tem acesso a interação com outros sardinhas, troca de conhecimentos, oportunidades de negócios. É essa rede que faz toda a diferença para envolver o aluno com o produto.</P>
          <P>O acesso à comunidade é de <strong>1 ano</strong> a contar a data de início da turma.</P>
        </Card>

        {/* Taxa Private */}
        <Card>
          <SectionTitle icon={TrendingUp}>Taxa Private</SectionTitle>
          <P>A AUVP tem a sua própria plataforma de investimentos, a <strong>iSaEx</strong>, e todos os alunos têm acesso à nossa Taxa Private. Essa é uma taxa especial que o mercado oferece para os seus maiores clientes, mas sendo alunos da AUVP a sua rentabilidade aumenta automaticamente.</P>
          <P>A taxa private se refere a taxas de rentabilidade diferenciadas, e isso é expressivo em títulos privados (LCIs, LCAs, CDBs, LFs). Títulos públicos têm as mesmas taxas em todas as corretoras.</P>
        </Card>

        {/* Diagrama do Cerrado */}
        <Card>
          <SectionTitle icon={BarChart2}>Diagrama do Cerrado | Carteira</SectionTitle>
          <P>O Diagrama do Cerrado é a ferramenta exclusiva de rebalanceamento e gerenciamento de carteira da AUVP. Ela ajuda a rebalancear os aportes para que a carteira esteja sempre equilibrada e protegida.</P>
          <P>Esta ferramenta utiliza o <strong>método burro</strong>, que consiste em comprar ações quando a bolsa está em alta e vender quando a bolsa está em queda.</P>
        </Card>

        {/* Ferramentas AUVP */}
        <Card>
          <SectionTitle icon={Wrench}>Ferramentas AUVP</SectionTitle>
          <P>A AUVP possui uma área com todas as ferramentas necessárias para apoio às aulas:</P>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {["Orçamento Doméstico", "Metas", "Primeiro Milhão", "Ativos e Passivos"].map((tool) => (
              <div key={tool} className="rounded-lg bg-muted/60 p-3 text-center">
                <p className="text-sm font-semibold font-anek text-foreground">{tool}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Atendimento */}
        <Card>
          <SectionTitle icon={Headphones}>Como Funciona o Atendimento</SectionTitle>
          <P>No período de acesso, o aluno terá todo o suporte sobre a utilização da plataforma ou sobre o conteúdo.</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-wider font-roboto mb-1">Dúvidas de Conteúdo</p>
              <p className="text-sm font-roboto text-foreground/80">Publicadas na comunidade, onde um dos monitores realiza o atendimento.</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-wider font-roboto mb-1">Suporte Técnico</p>
              <p className="text-sm font-roboto text-foreground/80">Bugs e problemas de plataforma via <strong>WhatsApp</strong> ou <strong>E-mail</strong>.</p>
            </div>
          </div>
        </Card>

        {/* PIAR */}
        <Card accent>
          <SectionTitle icon={Shield}>PIAR — Plataforma Integrada de Avaliação de Riscos</SectionTitle>
          <P>O PIAR da AUVP é um sistema que tem como finalidade coletar informações importantes sobre a maneira de pensar do aluno e transformar isso em sugestões de alocação para aportes financeiros.</P>
          <P>Esta ferramenta <strong>não substitui</strong> os perfis de investidores realizados e fornecidos pelas corretoras.</P>
        </Card>

    </PageShell>
  );
}
