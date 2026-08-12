/**
 * AI-Food Generator — gera prompts standalone para qualquer componente do Design System AUVP.
 * Cada prompt é 100% isolado: inclui regras de marca, código do componente, todos os estados
 * e checklist de entrega. Funciona em qualquer IA (ChatGPT, Claude, Cursor, Gemini, etc.).
 */

// ─── Regras de marca ────────────────────────────────────────────────────────

const CAPITAL_BASE = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM — AUVP CAPITAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDENTIDADE
Assessoria de investimentos institucional, séria, sóbria, técnica.
Referência estética: Bloomberg + JP Morgan + finança bancária moderna.
❌ NUNCA: liquid glass, gradientes coloridos, emojis decorativos, estética startup colorida.

PALETA OFICIAL (use SOMENTE estas cores)
• Verde Institucional: #023619  → primária, botões, títulos
• Verde Escuro:        #011F0E  → hover de botões verdes
• Amarelo Destaque:    #EFBE4F  → acentos em fundo ESCURO apenas
• Branco Puro:         #FFFFFF
• Cinza Claro:         #F2F2F2
• Cinza Médio:         #6B6B6B  → textos secundários
• Cinza Chumbo:        #1B1B1B  → cards em dark
• Preto Puro:          #000000
❌ PROIBIDO: roxo, rosa, azul, gradientes coloridos, neon

TIPOGRAFIA
• H1:        Anek Latin 600  54px desktop / 36px mobile  lh 1.1  ls -0.02em
• H2:        Anek Latin 600  41px / 30px                 lh 1.15
• H3:        Anek Latin 600  28px / 22px
• Subtítulo: Roboto     400  20px                         lh 1.5   #6B6B6B
• Corpo:     Roboto     400  17px                         lh 1.6
• Eyebrow:   Sora       700  12px UPPERCASE               ls 0.15em  #023619
• Botão/CTA: Sora       700  14px UPPERCASE               ls 0.05em  (exclusivo botões)

BOTÕES — identidade visual mais marcante
• border-radius: 5px (padrão do Design System) — NUNCA pílulas (rounded-full)
• Padding:        py-[18px] px-[32px]
• Border:         SEMPRE 1px solid
• Primário (fundo claro):  bg #023619  text #FFF   border #023619
  Hover:                   bg transparent  text #023619  border #023619
• Outline  (fundo escuro): bg transparent  text #FFF  border #FFF
  Hover:                   bg #FFF  text #023619  border #FFF
• Transition:     all 240ms ease

CARDS
• border-radius: 12px SEMPRE
• Padding: 30px desktop / 20px mobile
• Hover: shadow-[0_8px_24px_rgba(0,0,0,0.06)] translateY(-2px) transition 240ms
• Fundo branco   → card #F2F2F2
• Fundo #F2F2F2  → card #FFF
• Fundo preto    → card #1B1B1B
❌ PROIBIDO: backdrop-blur, liquid glass, transparências translúcidas

LAYOUT E RITMO VERTICAL
• Sections alternam: #FFF → #F2F2F2 → #FFF → #000 → #FFF
• Padding vertical: 60px mobile / 90px desktop
• Container: max-w 1200px padding-inline 24px
• TODOS os gaps múltiplos de 15px (15, 30, 45, 60px)`;

const ESCOLA_BASE = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM — AUVP ESCOLA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDENTIDADE
Educação financeira independente, rebelde, cultura pirata (estilo Anthony Bourdain goiano).
Visual sofisticado, premium, editorial. Referência: Apple Education + Masterclass + revista de luxo.
Glassmorphism É a assinatura visual — usar em cards de LP.
❌ NUNCA use verde da Capital (#023619) — exceto dentro de texto de botão dourado.

PALETA OFICIAL
• Dourado Principal:  #EFBF4E  → acentos, ícones, botão primário, slider thumb
• Dourado Escuro:     #D4A73D  → tipografia de destaque, eyebrow, badges
• Dourado Profundo:   #B8860B  → textos sobre fundo claro com forte destaque
• Verde Capital:      #023619  → SOMENTE em texto dentro de botões dourados
• Cinza Texto:        #18181B
• Cinza Secundário:   #52525B / #71717A
• Translúcido claro:  rgba(255,255,255,0.5)  rgba(255,255,255,0.85)
• Border translúcida: rgba(0,0,0,0.12)
❌ PROIBIDO: verde Capital como cor de fundo/borda, azul, roxo, cores saturadas

FUNDO DE PÁGINA (assinatura da Escola)
• NUNCA fundo branco chapado — use gradiente radial cinza sutil:
  background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%);
• Sections de impacto (fundo escuro):
  background: radial-gradient(ellipse at center, rgba(239,191,78,0.08) 0%, #18181b 70%);

CARDS TRANSLÚCIDOS (assinatura visual)
• background: rgba(255,255,255,0.5)
• backdrop-filter: blur(24px)  -webkit-backdrop-filter: blur(24px)
• border: 1px solid rgba(0,0,0,0.12)
• border-radius: 16px  padding: 32px
• Hover: translateY(-8px)  box-shadow: 0 20px 40px -10px rgba(239,191,78,0.25)
         border-color: rgba(239,191,78,0.4)  transition: 320ms ease
• Em fundo escuro: bg rgba(255,255,255,0.05)  border rgba(255,255,255,0.1)

TIPOGRAFIA
• Eyebrow: Anek Latin 600 13px UPPERCASE ls 1.5px #D4A73D
           bg rgba(239,191,78,0.1) px-3 py-1.5 rounded-full inline-flex
• H1: Anek Latin 700  56px / 36px mobile  ls -0.025em  lh 1.05  #18181B
• H2: Anek Latin 600  42px / 30px          ls -0.02em
• H3: Anek Latin 600  28px
• Corpo: Roboto 400  17px  #52525B  lh 1.65
• Destaque dourado inline: <span class="text-[#D4A73D] font-semibold">
• Botão/CTA: Sora 700 14px UPPERCASE ls 0.05em (exclusivo botões)

BOTÕES (regra UNIFICADA com Capital em LPs)
• border-radius: 5px em LP (padrão do Design System) — NUNCA pílulas (rounded-full)
• Primário (fundo claro): bg #EFBF4E  text #023619  border #EFBF4E
  Hover: bg transparent  border #EFBF4E  text #18181B
• Outline: bg transparent  text #18181B  border #18181B
  Hover:   bg #18181B  text #EFBF4E
• Em fundo escuro: bg #EFBF4E  text #18181B. Hover: transparent + border dourada

TAGS / BADGES
• rounded-full  px-3 py-1.5  text-[13px] Anek semibold UPPERCASE tracking-[1.5px]
  text-[#D4A73D]  bg-[rgba(239,191,78,0.1)]  border border-[rgba(239,191,78,0.2)]`;

const FERRAMENTAS_EXTRA = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTO: FERRAMENTAS / CALCULADORAS / WIDGETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Container pai: bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto
  (rounded-2xl é a ÚNICA exceção à regra de bordas de cards)
• Botões: rounded-[5px] — mesmo padrão do Design System
• Tabs/pílulas: rounded-full (permitido apenas em ferramentas)
• Valores financeiros: tabular-nums font-anek font-bold text-4xl
• Inputs: bg-gray-50 rounded-xl px-4 py-3 (sem border visível no default)
• Labels de input: Roboto 500 13px UPPERCASE tracking-wider text-gray-500
• Sliders:
  - Track: h-2 bg-gray-200 rounded-full
  - Fill: cor primária da marca
  - Thumb: 20px circular bg-primária border-2 border-white shadow-md
  - Capital: accent-color #023619 | Escola: accent-color #EFBF4E
• Caixa de resultado: bg-green-50 (Capital) / bg-gray-50 (Escola)
  rounded-xl p-5 mt-6`;

const PLATAFORMA_EXTRA = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTO: PLATAFORMA EAD (AUVP ESCOLA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Light mode (padrão): body bg-gray-50  cards bg-white border border-gray-200
• Dark mode (toggle): body bg-zinc-950  cards bg-zinc-900 border border-zinc-800
• Vídeo: SEMPRE bg-black aspect-video — mesmo em light mode
• Aula ativa (em andamento):  bg-yellow-50 border-l-4 border-yellow-500
• Aula concluída:              ícone text-emerald-500
• Aula bloqueada:              opacity-60 ícone text-gray-400
• Progresso: barra h-2 bg-gray-200 fill bg-[#EFBF4E] rounded-full
• Título de módulo: Anek 700 24px text-gray-900 (light) / text-white (dark)
• Título de aula:   Anek 600 18px text-gray-900
• Meta (duração):   Roboto 400 13px text-gray-500
• Breadcrumb:       Roboto 500 14px text-gray-600`;

const ESTADOS_UNIVERSAIS = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTADOS OBRIGATÓRIOS — implemente TODOS os aplicáveis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Default (idle)              — aparência padrão sem interação
□ Hover                       — transition 240ms ease (320ms na Escola LP)
□ Active / Pressed            — estado de clique (scale 0.98 ou brightness 0.9)
□ Focus                       — outline 2px offset 2px na cor primária (acessibilidade)
□ Disabled                    — opacity 50%, cursor not-allowed, pointer-events none
□ Loading (se aplicável)      — spinner 20px + texto "Carregando..." + disabled
□ Error / Validação (se aplic.)— border-color #DC2626 + mensagem abaixo em text-sm
□ Sucesso (se aplicável)      — ícone check + feedback visual 2-4s auto-dismiss
□ Empty state (se aplicável)  — ilustração/ícone + CTA para ação primária
□ Responsivo                  — mobile-first; breakpoints sm(640) md(768) lg(1024)`;

const CHECKLIST = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKLIST ANTES DE ENTREGAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Todos os estados visuais implementados
□ Transições fluidas (240ms ease padrão)
□ Tipografia correta: Anek (títulos/valores) / Roboto (corpo/labels) / Sora (botões CTA)
□ Paleta de cores da marca respeitada sem exceções
□ Gaps e espaçamentos múltiplos de 15px
□ Responsivo mobile/desktop testado
□ Acessibilidade: aria-label nos ícones, focus-visible ring, contraste ≥ 4.5:1
□ Capital: sem liquid glass, sem gradientes coloridos, botões com border-radius 5px
□ Escola LP: cards translúcidos (backdrop-blur 24px), gradiente radial no fundo
□ Escola Ferramentas: botões rounded-[5px], slider thumb dourado
□ Plataforma: vídeo sempre bg-black, aula ativa com border-l-4 amarela`;

// ─── Função principal ────────────────────────────────────────────────────────

export function generateComponentPrompt(
  brand: "capital" | "escola",
  view: "institucional" | "ferramentas" | "plataforma",
  title: string,
  description: string | undefined,
  code: string | undefined,
  htmlCode: string | undefined
): string {
  const brandLabel = brand === "capital" ? "AUVP Capital" : "AUVP Escola";
  const viewLabel =
    view === "institucional"
      ? ""
      : view === "ferramentas"
      ? "Ferramentas / Calculadoras"
      : "Plataforma EAD";

  const brandRules = brand === "capital" ? CAPITAL_BASE : ESCOLA_BASE;
  const viewExtra =
    view === "ferramentas"
      ? FERRAMENTAS_EXTRA
      : view === "plataforma"
      ? PLATAFORMA_EXTRA
      : "";

  const sep = "━".repeat(60);

  const codeBlock = code
    ? `\n${sep}\nCÓDIGO REACT / TSX\n${sep}\n${code}`
    : "";

  const htmlBlock = htmlCode
    ? `\n${sep}\nCÓDIGO HTML / CSS / JS\n${sep}\n${htmlCode}`
    : "";

  const descBlock = description ? `\n${description}` : "";

  return `Você é um Desenvolvedor Front-end Especialista. Replique EXATAMENTE o componente abaixo, pertencente ao Design System ${brandLabel}${viewLabel ? ` (${viewLabel})` : ""}.

${sep}
COMPONENTE: ${title.toUpperCase()}
${sep}${descBlock}${codeBlock}${htmlBlock}

${brandRules}${viewExtra ? `\n${viewExtra}` : ""}

${ESTADOS_UNIVERSAIS}

${CHECKLIST}

${sep}
INSTRUÇÕES FINAIS
${sep}
1. Analise o código acima e entenda cada detalhe visual e funcional.
2. Replique o componente "${title}" com TODOS os estados listados acima.
3. Respeite RIGOROSAMENTE a paleta de cores, tipografia e espaçamentos do Design System ${brandLabel}.
4. Entregue código limpo, pronto para produção, sem comentários de explicação.
5. Se precisar de props adicionais, liste-as com seus tipos TypeScript.

Agora replique o componente "${title}":`;
}

// ─── Prompt global por brand/view ────────────────────────────────────────────

export function getGlobalPromptRules(
  brand: "capital" | "escola",
  view: "institucional" | "ferramentas" | "plataforma"
): string {
  const brandRules = brand === "capital" ? CAPITAL_BASE : ESCOLA_BASE;
  const viewExtra =
    view === "ferramentas"
      ? FERRAMENTAS_EXTRA
      : view === "plataforma"
      ? PLATAFORMA_EXTRA
      : "";
  return brandRules + (viewExtra ? `\n${viewExtra}` : "");
}
