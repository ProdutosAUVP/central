import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Volume2, MessageCircle, Megaphone, Users,
  CheckCircle, XCircle, ArrowRight, Lightbulb, BookOpen,
  AlertTriangle, Building2, Landmark, GraduationCap, BarChart3,
  Wheat, DollarSign, CreditCard, Shield, Award, Plane, Heart,
  Library, FileText, SlidersHorizontal, Mic, Handshake, Anchor, Sparkles } from
"lucide-react";
import * as Data from "./tom-e-voz/TomEVozData";
import { TomEVozAIFoodInline } from "./tom-e-voz/TomEVozAIFoodInline";
import bourdainImg from "@/assets/bourdain.jpg";
import raulImg from "@/assets/raul.webp";

/* ------------------------------------------------------------------ */
/*  Helpers de renderização                                            */
/* ------------------------------------------------------------------ */

function SectionTitle({ icon: Icon, children }: {icon: React.ElementType;children: React.ReactNode;}) {
  return (
    <div className="flex items-center gap-3 mb-6 border-b pb-4">
      <Icon className="h-6 w-6 text-accent shrink-0" />
      <h2 className="font-bold font-anek text-2xl md:text-3xl leading-tight text-foreground">{children}</h2>
    </div>);

}

function SubTitle({ children }: {children: React.ReactNode;}) {
  return <h3 className="font-bold font-anek mb-4 text-xl text-foreground">{children}</h3>;
}

function P({ children }: {children: React.ReactNode;}) {
  return <p className="text-sm text-foreground/80 font-roboto leading-relaxed whitespace-pre-wrap mb-4 last:mb-0">{children}</p>;
}

function CardBox({ accent, children }: {accent?: boolean;children: React.ReactNode;}) {
  return (
    <div className={`rounded-xl border p-6 md:p-8 ${accent ? "bg-primary/5 border-accent/15" : "bg-card"}`}>
      {children}
    </div>);

}

function BulletList({ items, icon }: {items: string[];icon?: "check" | "x" | "arrow";}) {
  const IconEl = icon === "x" ? XCircle : icon === "arrow" ? ArrowRight : CheckCircle;
  const color = icon === "x" ? "text-destructive/60" : "text-accent";
  return (
    <ul className="space-y-2">
      {items.map((item, i) =>
      <li key={i} className="flex gap-2 text-sm font-roboto text-foreground/80">
          <IconEl className={`h-4 w-4 mt-0.5 shrink-0 ${color}`} />
          <span>{item}</span>
        </li>
      )}
    </ul>);

}

function ProibidoCard({ proibido, motivo }: {proibido: string;motivo: string;}) {
  return (
    <div className="rounded-xl border p-4 bg-card flex flex-col sm:flex-row gap-3">
      <div className="flex items-start gap-2 sm:w-1/2">
        <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
        <span className="text-sm font-roboto font-semibold text-foreground/80">{proibido}</span>
      </div>
      <div className="flex items-start gap-2 sm:w-1/2">
        <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
        <span className="text-sm font-roboto text-foreground/80">{motivo}</span>
      </div>
    </div>);

}

function DataTable({ headers, rows }: {headers: string[];rows: string[][];}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {headers.map((h, i) =>
            <th key={i} className="text-left py-2 pr-4 font-bold font-anek text-foreground/60 uppercase tracking-wider text-xs">{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
          <tr key={i} className="border-b last:border-0">
              {row.map((cell, j) =>
            <td key={j} className="py-3 pr-4 font-roboto text-foreground/80">{cell}</td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}

/* ------------------------------------------------------------------ */
/*  COMPONENTE PRINCIPAL                                               */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  COMPONENTE PRINCIPAL                                               */
/* ------------------------------------------------------------------ */

export function TomEVoz() {

  return (
    <div className="space-y-0">

      {/* Bem-vindo */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-anek mb-3 text-foreground">Manual de Tom e Voz</h1>
        <p className="text-muted-foreground font-roboto leading-relaxed max-w-3xl">
          Este é o guia oficial de comunicação da AUVP. Aqui você encontra as diretrizes de voz,
          tom e linguagem para todas as áreas e produtos da empresa.
        </p>
      </div>

      {/* ============================================================= */}
      {/*  FUNDAMENTOS                                                   */}
      {/* ============================================================= */}
      <section id="fundamentos" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={BookOpen}>Fundamentos</SectionTitle>

        {/* Dicionário */}
        <CardBox>
          <SectionTitle icon={Library}>Dicionário do Manual</SectionTitle>
          <P>Se a ideia não é clara, ela é inútil. Sendo assim o que parece familiar para você pode ser um mar desconhecido para outro pirata, e ruído na comunicação é o primeiro passo para o fracasso. Por isso, antes de avançarmos, verifique o dicionário com palavras que vão surgir ao longo do manual.</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {Data.dicionario.map((d) =>
            <div key={d.termo} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{d.termo}</p>
                <p className="text-xs font-roboto text-foreground/70">{d.definicao}</p>
              </div>
            )}
          </div>
        </CardBox>

        {/* Introdução */}
        <CardBox>
          <SectionTitle icon={FileText}>{Data.introducaoManual.titulo}</SectionTitle>
          {Data.introducaoManual.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        {/* Tom e Voz — O que é isso? */}
        <CardBox>
          <SectionTitle icon={MessageCircle}>{Data.tomEVozIntro.titulo}</SectionTitle>
          {Data.tomEVozIntro.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        {/* Voz */}
        <CardBox accent>
          <SectionTitle icon={Volume2}>{Data.vozDefinicao.titulo}</SectionTitle>
          {Data.vozDefinicao.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        {/* Tom */}
        <CardBox>
          <SectionTitle icon={SlidersHorizontal}>{Data.tomDefinicao.titulo}</SectionTitle>
          {Data.tomDefinicao.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            {Data.tomDefinicao.regras.map((r) =>
            <div key={r.contexto} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1">{r.contexto}</p>
                <p className="text-sm font-roboto text-foreground/80">{r.descricao}</p>
              </div>
            )}
          </div>
          <P>{Data.tomDefinicao.conclusao}</P>
        </CardBox>



      </section>

      {/* ============================================================= */}
      {/*  VOZ DO RAUL                                                   */}
      {/* ============================================================= */}
      <section id="raul" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Lightbulb}>Voz do Raul</SectionTitle>

        <CardBox>
          <SectionTitle icon={Mic}>{Data.vozRaulSena.titulo}</SectionTitle>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={raulImg}
              alt="Raul Sena — fundador da AUVP"
              className="w-full md:w-48 lg:w-56 rounded-xl object-cover aspect-[1/1] shrink-0" />
            
            <div className="flex-1">
              {Data.vozRaulSena.paragrafos.slice(0, 2).map((p, i) => <P key={i}>{p}</P>)}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {Data.vozRaulSena.paragrafos.slice(2).map((p, i) => <P key={`rest-${i}`}>{p}</P>)}
          </div>
        </CardBox>

        <CardBox>
          <SectionTitle icon={XCircle}>{Data.vozRaulSena.comoNaoComunicar.titulo}</SectionTitle>
          <P>{Data.vozRaulSena.comoNaoComunicar.intro}</P>
          <BulletList items={Data.vozRaulSena.comoNaoComunicar.itens} icon="x" />
        </CardBox>

        <CardBox>
          <SectionTitle icon={AlertTriangle}>Exemplos de erros e correções</SectionTitle>
          <div className="space-y-4">
            {Data.vozRaulSena.exemplosErros.map((e, i) =>
            <div key={i} className="rounded-xl border overflow-hidden">
                <div className="bg-destructive/10 p-4 border-b border-destructive/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                    <div>
                      <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">❌ Erro</p>
                      <p className="text-sm font-roboto text-foreground/80">{e.erro}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 border-b">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">✅ Correção</p>
                      <p className="text-sm font-roboto text-foreground/80">{e.correcao}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <p className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1">Porquê</p>
                  <p className="text-sm font-roboto text-foreground/70">{e.porque}</p>
                </div>
              </div>
            )}
          </div>
        </CardBox>
      </section>

      {/* ============================================================= */}
      {/*  ÁREAS DA EMPRESA                                              */}
      {/* ============================================================= */}

      <div className="pt-[30px] pb-[45px] border-t border-border mt-[15px]">
        <h2 className="text-2xl md:text-4xl font-bold font-anek tracking-tight text-foreground mb-6">Áreas da Empresa</h2>
        <SubTitle>A voz que unifica diferentes áreas e os tons que as diferenciam</SubTitle>
        <P>Vale ressaltar que a voz é a identidade da AUVP, portanto, é única e imutável. Por esse motivo, trouxemos a forma de diferentes áreas se comunicarem, mudando o tom, mas mantendo a identidade da AUVP Capital de ponta a ponta.</P>
        <SubTitle>Fluxo de comunicação</SubTitle>
        <a
          href="https://miro.com/app/board/uXjVJhdPYKg=/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-roboto text-accent underline hover:text-accent/80 transition-colors">
          Acesse aqui o nosso fluxo</a>
      </div>

      <section id="marketing" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Megaphone}>Marketing</SectionTitle>

        <CardBox>
          <SectionTitle icon={Megaphone}>{Data.marketing.personalidade.titulo}</SectionTitle>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={bourdainImg}
              alt="Anthony Bourdain — referência de personalidade da marca"
              className="w-full md:w-56 lg:w-64 rounded-xl object-cover aspect-[3/4] shrink-0" />
            <div className="flex-1">
              {Data.marketing.personalidade.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
            </div>
          </div>
        </CardBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardBox>
            <SubTitle>{Data.marketing.guerrilha.titulo}</SubTitle>
            <P>{Data.marketing.guerrilha.paragrafo}</P>
          </CardBox>

          <CardBox>
            <SubTitle>{Data.marketing.liberdadeMedo.titulo}</SubTitle>
            <P>{Data.marketing.liberdadeMedo.paragrafo}</P>
          </CardBox>

          <CardBox>
            <SubTitle>{Data.marketing.luxo.titulo}</SubTitle>
            <P>{Data.marketing.luxo.paragrafo}</P>
          </CardBox>

          <CardBox>
            <SubTitle>{Data.marketing.psicologiaReversa.titulo}</SubTitle>
            <P>{Data.marketing.psicologiaReversa.paragrafo}</P>
          </CardBox>
        </div>

        <CardBox>
          <SubTitle>{Data.marketing.goias.titulo}</SubTitle>
          <P>{Data.marketing.goias.paragrafo}</P>
        </CardBox>

        {/* Canais */}
        <CardBox>
          <SectionTitle icon={Megaphone}>Gestão de canais</SectionTitle>
          <P>{Data.canaisData.intro}</P>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Data.canaisData.canais.map((c) =>
            <div key={c.nome} className="rounded-xl border p-5 bg-muted/30 hover:border-accent/30 transition-colors">
                <h4 className="font-bold font-anek mb-2">{c.nome}</h4>
                <p className="text-sm text-foreground/80 font-roboto leading-relaxed">{c.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>

        {/* Dont's do Marketing */}
        <div className="rounded-xl border border-destructive/20 p-6 md:p-8 bg-destructive/5">
          <SectionTitle icon={XCircle}>{Data.marketing.donts.titulo}</SectionTitle>
          <P>{Data.marketing.donts.intro}</P>
          <DataTable
            headers={["Dont's", "Por quê?"]}
            rows={Data.marketing.donts.itens.map((d) => [d.proibido, d.motivo])} />
          
        </div>

        {/* Funil de vendas — movido para Marketing conforme PDF */}
        <CardBox>
          <SectionTitle icon={ArrowRight}>Etapas do funil de vendas</SectionTitle>
          <DataTable
            headers={["Etapa do Funil", "Tom de Voz", "Gatilho Principal"]}
            rows={Data.funilVendas.map((f) => [f.etapa, f.tom, f.gatilho])} />
          
        </CardBox>
        <TomEVozAIFoodInline type="area" id="marketing" label="Marketing" />
      </section>

      {/* ============================================================= */}
      {/*  COMERCIAL                                                     */}
      {/* ============================================================= */}
      <section id="comercial" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Users}>Comercial</SectionTitle>

        <CardBox>
          <SectionTitle icon={Handshake}>{Data.comercial.titulo}</SectionTitle>
          <P>{Data.comercial.intro}</P>
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.comercial.pilares.intro}</SubTitle>
          <div className="space-y-4">
            {Data.comercial.pilares.itens.map((p) =>
            <div key={p.nome} className="rounded-lg bg-background/60 p-4">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{p.nome}</p>
                <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.comercial.audio.titulo}</SubTitle>
          <BulletList items={Data.comercial.audio.itens} icon="arrow" />
        </CardBox>

        <P>{Data.comercial.passoPasso}</P>

        <CardBox>
          <SubTitle>{Data.comercial.dicas.titulo}</SubTitle>
          <BulletList items={Data.comercial.dicas.itens} icon="check" />
        </CardBox>

        <CardBox>
          <SectionTitle icon={AlertTriangle}>Exemplos: Como NÃO vs Como comunicamos</SectionTitle>
          <div className="space-y-3">
            {Data.comercial.exemplos.map((e, i) =>
            <ProibidoCard key={i} proibido={e.erro} motivo={e.correcao} />
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.comercial.fluxo.titulo}</SubTitle>
          <BulletList items={Data.comercial.fluxo.itens} icon="arrow" />
        </CardBox>
        <TomEVozAIFoodInline type="area" id="comercial" label="Comercial" />
      </section>

      {/* ============================================================= */}
      {/*  ATENDIMENTO                                                   */}
      {/* ============================================================= */}
      <section id="atendimento" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Heart}>Atendimento</SectionTitle>

        <CardBox>
          <SectionTitle icon={Heart}>{Data.atendimento.titulo}</SectionTitle>
          {Data.atendimento.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.personalizacao.titulo}</SubTitle>
          <P>{Data.atendimento.personalizacao.paragrafo}</P>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.cuidados.titulo}</SubTitle>
          {Data.atendimento.cuidados.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.erros.titulo}</SubTitle>
          <P>{Data.atendimento.erros.intro}</P>
          {Data.atendimento.erros.itens.map((e) =>
          <div key={e.tipo} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{e.tipo}</p>
              <p className="text-sm font-roboto text-foreground/80">{e.descricao}</p>
            </div>
          )}
        </CardBox>

        <div className="rounded-xl border border-destructive/20 p-6 md:p-8 bg-destructive/5">
          <SubTitle>{Data.atendimento.diretrizesLinguisticas.titulo}</SubTitle>
          <P>{Data.atendimento.diretrizesLinguisticas.intro}</P>
          <DataTable
            headers={["❌ Terminantemente proibido", "✅ Use em vez disso"]}
            rows={Data.atendimento.diretrizesLinguisticas.tabela.map((t) => [t.proibido, t.use])} />
          
        </div>

        <CardBox>
          <SubTitle>{Data.atendimento.audioTexto.titulo}</SubTitle>
          {Data.atendimento.audioTexto.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.boasPraticas.titulo}</SubTitle>
          <BulletList items={Data.atendimento.boasPraticas.itens} icon="check" />
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.atendimento.seguranca.titulo}</SubTitle>
          <P>{Data.atendimento.seguranca.paragrafo}</P>
        </CardBox>
        <TomEVozAIFoodInline type="area" id="atendimento" label="Atendimento" />
      </section>

      {/* ============================================================= */}
      {/*  CONSULTORIA                                                   */}
      {/* ============================================================= */}
      <section id="consultoria" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Landmark}>Consultoria</SectionTitle>

        <CardBox>
          <SectionTitle icon={Landmark}>{Data.consultoria.titulo}</SectionTitle>
          <P>{Data.consultoria.intro}</P>
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.consultoria.pilares.titulo}</SubTitle>
          <div className="space-y-4">
            {Data.consultoria.pilares.itens.map((p) =>
            <div key={p.nome} className="rounded-lg bg-background/60 p-4">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{p.nome}</p>
                <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.consultoria.boasPraticas.titulo}</SubTitle>
          <BulletList items={Data.consultoria.boasPraticas.itens} icon="check" />
        </CardBox>

        <CardBox>
          <SubTitle>{Data.consultoria.gestaoCrises.titulo}</SubTitle>
          <P>{Data.consultoria.gestaoCrises.paragrafo}</P>
        </CardBox>

        <div className="rounded-xl border border-destructive/20 p-6 md:p-8 bg-destructive/5">
          <SectionTitle icon={XCircle}>{Data.consultoria.comoNaoComunicar.titulo}</SectionTitle>
          <P>{Data.consultoria.comoNaoComunicar.intro}</P>
          <div className="space-y-3">
            {Data.consultoria.comoNaoComunicar.itens.map((item, i) =>
            <ProibidoCard key={i} proibido={item.proibido} motivo={item.motivo} />
            )}
          </div>
        </div>

        <CardBox>
          <SubTitle>{Data.consultoria.fluxo.titulo}</SubTitle>
          <div className="space-y-3">
            {Data.consultoria.fluxo.itens.map((f) =>
            <div key={f.etapa} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{f.etapa}</p>
                <p className="text-sm font-roboto text-foreground/80">{f.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>
        <TomEVozAIFoodInline type="area" id="consultoria" label="Consultoria" />
      </section>


      {/* AUVP Wealth — área da empresa, logo após Consultoria */}
      <section id="produto-wealth" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Building2}>AUVP Wealth</SectionTitle>
        <CardBox>
          {Data.wealth.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>
        <CardBox>
          <SubTitle>{Data.wealth.boasPraticas.titulo}</SubTitle>
          <P>{Data.wealth.boasPraticas.intro}</P>
          <DataTable
            headers={["❌ Evite", "✅ Prefira", "Por quê?"]}
            rows={Data.wealth.boasPraticas.substituicoes.map((s) => [s.evite, s.prefira, s.porque])} />
        </CardBox>
        <CardBox>
          <SubTitle>{Data.wealth.praticasAbominadas.titulo}</SubTitle>
          <div className="space-y-3">
            {Data.wealth.praticasAbominadas.itens.map((item) =>
            <div key={item.pratica} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-destructive uppercase mb-1">{item.pratica}</p>
                <p className="text-sm font-roboto text-foreground/80">{item.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpWealth" label="AUVP Wealth" />
      </section>

      {/* ============================================================= */}
      {/*  CAPITAL HUMANO — antes de Produtos conforme PDF               */}
      {/* ============================================================= */}
      <section id="capital" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Anchor}>Capital Humano</SectionTitle>

        <CardBox>
          <SectionTitle icon={Anchor}>{Data.capitalHumano.titulo}</SectionTitle>
          {Data.capitalHumano.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.crises.titulo}</SubTitle>
          <P>{Data.capitalHumano.crises.paragrafo}</P>
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.capitalHumano.vocabulario.titulo}</SubTitle>
          <P>{Data.capitalHumano.vocabulario.intro}</P>
          <DataTable
            headers={["✅ Use com força (Interno)", "❌ Substitua / Evite", "Por quê?"]}
            rows={Data.capitalHumano.vocabulario.itens.map((v) => [v.use, v.evite, v.porque])} />
          
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.employerBranding.titulo}</SubTitle>
          <P>{Data.capitalHumano.employerBranding.paragrafo}</P>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.onboarding.titulo}</SubTitle>
          {Data.capitalHumano.onboarding.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.hellYesHellNo.titulo}</SubTitle>
          <P>{Data.capitalHumano.hellYesHellNo.intro}</P>
          <DataTable
            headers={["Hell Yes ✅", "Hell No ❌"]}
            rows={Data.capitalHumano.hellYesHellNo.pares.map((p) => [p.hellYes, p.hellNo])} />
        </CardBox>
        <TomEVozAIFoodInline type="area" id="capitalHumano" label="Capital Humano" />
      </section>

      {/* ============================================================= */}
      {/*  PRODUTO E CX — área da empresa, não produto                    */}
      {/* ============================================================= */}
      <section id="produto-cx" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Sparkles}>{Data.produtoCx.titulo}</SectionTitle>

        <CardBox>
          <P>{Data.produtoCx.intro}</P>
          <DataTable
            headers={["O que não usamos", "O que usamos"]}
            rows={Data.produtoCx.tabela} />
          
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.formatosSuportes.titulo}</SubTitle>
          <div className="space-y-3">
            {Data.formatosSuportes.itens.map((f) =>
            <div key={f.formato} className="flex flex-col sm:flex-row sm:items-start gap-2 rounded-lg bg-muted/50 p-3">
                <Badge variant="secondary" className="shrink-0 font-bold text-xs">{f.formato}</Badge>
                <p className="text-sm font-roboto text-foreground/80">{f.estilo}</p>
              </div>
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>Particularidades de conteúdos</SubTitle>
          <P>{Data.particularidadesConteudo.intro}</P>
          {Data.particularidadesConteudo.itens.map((item) =>
          <div key={item.nome} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase mb-1">{item.nome}</p>
              <p className="text-sm font-roboto text-foreground/80">{item.descricao}</p>
            </div>
          )}
        </CardBox>

        <CardBox>
          <SubTitle>Técnicas utilizadas na construção de conteúdos</SubTitle>
          <ul className="space-y-2 mt-2">
            {Data.particularidadesConteudo.tecnicas.map((t) => (
              <li key={t.nome} className="flex items-start gap-2 text-sm font-roboto text-foreground/80">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">{t.nome}:</strong> {t.descricao}</span>
              </li>
            ))}
          </ul>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.particularidadesConteudo.padroesAssinatura.titulo}</SubTitle>
          <P>{Data.particularidadesConteudo.padroesAssinatura.intro}</P>
          <ul className="space-y-2 mt-2">
            {Data.particularidadesConteudo.padroesAssinatura.itens.map((i) => (
              <li key={i.nome} className="flex items-start gap-2 text-sm font-roboto text-foreground/80">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">{i.nome}:</strong> {i.descricao}</span>
              </li>
            ))}
          </ul>
        </CardBox>
      </section>

      {/* ============================================================= */}
      {/*  PRODUTOS — seções individuais                                  */}
      {/* ============================================================= */}


      {/* AUVP Agro */}
      <section id="produto-agro" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Wheat}>Agro</SectionTitle>
        <CardBox>
          <P>{Data.agro.personalidade}</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-accent/10 p-3"><p className="text-xs font-bold text-accent uppercase mb-1">Voz</p><p className="text-sm font-roboto text-foreground/80">{Data.agro.voz}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Tom</p><p className="text-sm font-roboto text-foreground/80">{Data.agro.tom}</p></div>
          </div>
        </CardBox>
        <CardBox>
          <SubTitle>Diretrizes de Comunicação</SubTitle>
          <BulletList items={Data.agro.diretrizes} icon="check" />
        </CardBox>
        <CardBox>
          <SubTitle>Os pilares da dor e solução</SubTitle>
          {Data.agro.pilaresDorSolucao.map((p) =>
          <div key={p.nome} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase mb-1">{p.nome}</p>
              <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
            </div>
          )}
        </CardBox>
        <CardBox>
          <DataTable headers={["Situação", "✅ Como agir", "❌ O que evitar"]} rows={Data.agro.exemplos.map((e) => [e.situacao, e.comoAgir, e.evitar])} />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpAgro" label="AUVP Agro" />
      </section>

      {/* AUVP Escola */}
      <section id="produto-escola" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={GraduationCap}>Escola</SectionTitle>
        <CardBox>
          <P>{Data.escola.intro}</P>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-accent/10 p-3"><p className="text-xs font-bold text-accent uppercase mb-1">Voz</p><p className="text-sm font-roboto text-foreground/80">{Data.escola.voz}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Tom</p><p className="text-sm font-roboto text-foreground/80">{Data.escola.tom}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Filosofia</p><p className="text-sm font-roboto text-foreground/80">{Data.escola.filosofia}</p></div>
          </div>
        </CardBox>
        <CardBox>
          <SubTitle>{Data.escola.pilares.titulo}</SubTitle>
          <P>{Data.escola.pilares.intro}</P>
          <div className="rounded-lg bg-muted/50 p-3"><P>{Data.escola.pilares.exemplos}</P></div>
        </CardBox>
        <CardBox>
          <SubTitle>{Data.escola.realismo.titulo}</SubTitle>
          {Data.escola.realismo.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>
        <CardBox>
          <SubTitle>{Data.escola.estimulo.titulo}</SubTitle>
          <P>{Data.escola.estimulo.paragrafo}</P>
        </CardBox>
        <CardBox>
          <SubTitle>Aplicação prática em diferentes pontos de contato</SubTitle>
          <DataTable headers={["Cenário", "Tom de voz AUVP Escola", "Exemplo de aplicação"]} rows={Data.escola.aplicacaoPratica.map((a) => [a.cenario, a.tom, a.exemplo])} />
        </CardBox>
        <CardBox>
          <SubTitle>Aplicação prática dentro das aulas</SubTitle>
          <DataTable headers={["Situação de Aula", "Tom de Voz AUVP Escola", "Exemplo de aplicação"]} rows={Data.escola.aplicacaoAulas.map((a) => [a.situacao, a.tom, a.exemplo])} />
        </CardBox>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardBox>
            <SubTitle>Termos Proibidos</SubTitle>
            <BulletList items={Data.escola.termosProibidos} icon="x" />
          </CardBox>
          <CardBox>
            <SubTitle>Checklist de conteúdo</SubTitle>
            <BulletList items={Data.escola.checklist} icon="check" />
          </CardBox>
        </div>
        <TomEVozAIFoodInline type="produto" id="auvpEscola" label="AUVP Escola" />
      </section>

      {/* AUVP Analítica */}
      <section id="produto-analitica" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={BarChart3}>Analítica</SectionTitle>
        <CardBox>
          <P><strong>{Data.analitica.subtitulo}</strong></P>
          <P>{Data.analitica.intro}</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-accent/10 p-3"><p className="text-xs font-bold text-accent uppercase mb-1">Voz</p><p className="text-sm font-roboto text-foreground/80">{Data.analitica.voz}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Tom</p><p className="text-sm font-roboto text-foreground/80">{Data.analitica.tom}</p></div>
          </div>
        </CardBox>
        <CardBox>
          <SubTitle>Pilares de Comunicação</SubTitle>
          {Data.analitica.pilares.map((p) =>
          <div key={p.nome} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase mb-1">{p.nome}</p>
              <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
            </div>
          )}
        </CardBox>
        <CardBox>
          <SubTitle>Aplicação prática da comunicação na AUVP Analítica</SubTitle>
          <DataTable headers={["Cenário", "Tom de voz da AUVP Analítica", "Gatilho de copy"]} rows={Data.analitica.aplicacaoPratica.map((a) => [a.cenario, a.tom, a.gatilho])} />
        </CardBox>
        <CardBox>
          <SubTitle>Diretrizes linguísticas</SubTitle>
          <div className="space-y-2">
            <P><strong>Palavras de poder:</strong> {Data.analitica.diretrizes.palavrasPoder}</P>
            <P><strong>Termos para evitar:</strong> {Data.analitica.diretrizes.termosEvitar}</P>
            <P><strong>Assinatura padrão:</strong> {Data.analitica.diretrizes.assinatura}</P>
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm font-roboto text-destructive">⚠ {Data.analitica.diretrizes.atencao}</div>
          </div>
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpAnalitica" label="AUVP Analítica" />
      </section>

      {/* Câmbio */}
      <section id="produto-cambio" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={DollarSign}>Câmbio</SectionTitle>
        <CardBox>
          <P>{Data.cambio.intro}</P>
        </CardBox>
        <CardBox>
          <SubTitle>O que é particular neste produto?</SubTitle>
          <BulletList items={Data.cambio.particular} icon="arrow" />
        </CardBox>
        <CardBox>
          <DataTable headers={["❌ Palavras proibidas", "✅ Linguagem recomendada"]} rows={Data.cambio.proibido.map((p, i) => [p, Data.cambio.recomendado[i] || ""])} />
        </CardBox>
        <CardBox>
          <SubTitle>Evitar no formato</SubTitle>
          <BulletList items={Data.cambio.evitarFormato} icon="x" />
        </CardBox>
        <CardBox>
          <SubTitle>{Data.cambio.conversa.titulo}</SubTitle>
          <P>A abordagem deve seguir três pilares:</P>
          <BulletList items={Data.cambio.conversa.pilares} icon="check" />
          <div className="mt-3">
            <BulletList items={Data.cambio.conversa.primeirosPasso} icon="arrow" />
          </div>
          <P>Sempre explicar que a operação envolve:</P>
          <BulletList items={Data.cambio.conversa.explicar} icon="arrow" />
        </CardBox>
        <CardBox>
          <SubTitle>O que deve sempre ser reforçado?</SubTitle>
          <BulletList items={Data.cambio.reforcar} icon="check" />
        </CardBox>
        <CardBox>
          <SubTitle>O que Nunca Deve Ser Transmitido</SubTitle>
          <BulletList items={Data.cambio.nuncaTransmitir} icon="x" />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpCambio" label="AUVP Câmbio" />
      </section>

      {/* Crédito */}
      <section id="produto-credito" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={CreditCard}>Crédito</SectionTitle>
        <CardBox>
          <P>{Data.credito.intro}</P>
          <P>{Data.credito.complemento}</P>
          <div className="rounded-lg bg-accent/10 p-3"><P>{Data.credito.voz}</P></div>
        </CardBox>
        <CardBox>
          <SubTitle>O que é particular neste produto</SubTitle>
          <BulletList items={Data.credito.particular} icon="arrow" />
        </CardBox>
        <CardBox>
          <SubTitle>Como conversar com o membro?</SubTitle>
          <P>{Data.credito.conversaIntro}</P>
          <BulletList items={Data.credito.conversa} icon="check" />
        </CardBox>
        <CardBox>
          <SubTitle>Postura e responsabilidade</SubTitle>
          <P>{Data.credito.posturaIntro}</P>
          <BulletList items={Data.credito.postura} icon="x" />
        </CardBox>
        <CardBox>
          <DataTable headers={["Palavras e expressões proibidas", "Utilizar sempre"]} rows={Array.from({ length: Math.max(Data.credito.proibido.length, Data.credito.utilizar.length) }, (_, i) => [Data.credito.proibido[i] || "", Data.credito.utilizar[i] || ""])} />
        </CardBox>
        <CardBox>
          <SubTitle>Contra-mão</SubTitle>
          <DataTable headers={["O que NÃO pode ser utilizado (Contra-mão)", "Por que?"]} rows={Data.credito.contraMao.map((c) => [c.proibido, c.porque])} />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpCredito" label="AUVP Crédito" />
      </section>

      {/* Seguros */}
      <section id="produto-seguros" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Shield}>Seguros</SectionTitle>
        <CardBox>
          <P>{Data.seguros.intro}</P>
          <P>{Data.seguros.complemento}</P>
          <P>{Data.seguros.integracao}</P>
        </CardBox>
        <CardBox>
          <DataTable headers={["❌ Palavras proibidas", "✅ Linguagem recomendada"]} rows={Data.seguros.tabela.map((t) => [t.proibido, t.recomendado])} />
        </CardBox>
        <CardBox>
          <SubTitle>{Data.seguros.conversa.titulo}</SubTitle>
          <P>A abordagem deve seguir quatro etapas:</P>
          <BulletList items={Data.seguros.conversa.etapas} icon="arrow" />
          <P>{Data.seguros.conversa.regra}</P>
        </CardBox>
        <CardBox>
          <SubTitle>{Data.seguros.posturaComercial.titulo}</SubTitle>
          <P>{Data.seguros.posturaComercial.intro}</P>
          <BulletList items={Data.seguros.posturaComercial.itens} icon="x" />
        </CardBox>
        <CardBox>
          <SubTitle>{Data.seguros.integracaoEcossistema.titulo}</SubTitle>
          <P>{Data.seguros.integracaoEcossistema.intro}</P>
          <BulletList items={Data.seguros.integracaoEcossistema.areas} icon="check" />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpSeguros" label="AUVP Seguros" />
      </section>

      {/* AUVP Pro */}
      <section id="produto-pro" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Award}>Pro</SectionTitle>
        <CardBox>
          <P>{Data.auvpPro.intro}</P>
          <P>{Data.auvpPro.propositoTexto}</P>
          <BulletList items={Data.auvpPro.propositoCertificacoes} icon="arrow" />
        </CardBox>
        <CardBox>
          <P>A AUVP Pro oferece:</P>
          <BulletList items={Data.auvpPro.oferece} icon="arrow" />
        </CardBox>
        <CardBox>
          <P><strong>Voz da AUVP Pro:</strong> {Data.auvpPro.vozDescricao.replace("Voz da AUVP Pro: ", "")}</P>
        </CardBox>
        <CardBox>
          <P>A AUVP Pro não é:</P>
          <BulletList items={Data.auvpPro.naoE} icon="arrow" />
          <P>{Data.auvpPro.complementoNaoE}</P>
        </CardBox>
        <CardBox>
          <SubTitle>Diferenciais estratégicos</SubTitle>
          <P>A comunicação deve enfatizar três diferenciais principais:</P>
          {Data.auvpPro.diferenciais.map((d, i) =>
            <div key={d.nome} className="mb-4">
              <p className="text-sm font-bold text-foreground">{i + 1}. {d.nome}</p>
              <P>{d.descricao}</P>
            </div>
          )}
        </CardBox>
        <CardBox>
          <DataTable
            headers={["É permitido utilizar expressões como:", "Não é permitido utilizar:"]}
            rows={Array.from(
              { length: Math.max(Data.auvpPro.vocabulario.permitido.length, Data.auvpPro.vocabulario.naoPermitido.length) },
              (_, i) => [Data.auvpPro.vocabulario.permitido[i] || "", Data.auvpPro.vocabulario.naoPermitido[i] || ""]
            )}
          />
        </CardBox>
        <CardBox>
          <SubTitle>Estatísticas e percentuais</SubTitle>
          <DataTable
            headers={["Não devem ser utilizados:", "Podem ser utilizados dados estruturais objetivos, como:"]}
            rows={Array.from(
              { length: Math.max(Data.auvpPro.estatisticas.naoDevem.length, Data.auvpPro.estatisticas.podem.length) },
              (_, i) => [Data.auvpPro.estatisticas.naoDevem[i] || "", Data.auvpPro.estatisticas.podem[i] || ""]
            )}
          />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpPro" label="AUVP Pro" />
      </section>

      {/* AUVP Experience */}
      <section id="produto-experience" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Plane}>Experience</SectionTitle>
        <CardBox>
          <P>{Data.experience.intro}</P>
          <div className="rounded-lg bg-accent/10 p-3"><P>{Data.experience.tomVoz}</P></div>
        </CardBox>
        <CardBox>
          <SubTitle>O que é particular neste produto</SubTitle>
          <BulletList items={Data.experience.particular} icon="arrow" />
        </CardBox>
        <CardBox>
          <SubTitle>Pilares da comunicação</SubTitle>
          {Data.experience.pilaresComunicacao.map((p) =>
          <div key={p.nome} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase mb-1">{p.nome}</p>
              <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
            </div>
          )}
        </CardBox>
        <CardBox>
          <SubTitle>O que NÃO pode ser utilizado</SubTitle>
          {Data.experience.contraMao.map((c, i) => <ProibidoCard key={i} proibido={c.proibido} motivo={c.porque} />)}
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="auvpExperience" label="AUVP Experience" />
      </section>

    </div>);

}