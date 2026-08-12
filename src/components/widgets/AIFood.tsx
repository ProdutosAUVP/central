import React, { useState, useMemo } from "react";
import { useBrand } from "@/contexts/BrandContext";
import { useSystemView, viewLabels } from "@/contexts/ViewContext";
import { Copy, Check, Bot, Sparkles, Code2, Layers, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Master Prompts — 100% standalone, sem dependência externa ────────────────

const masterPrompts = {
  capital: {
    institucional: `Você é um Desenvolvedor Front-end Especialista. Gere seções de Landing Page ou Site Institucional para a marca AUVP Capital seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente: contém tudo que você precisa saber sobre o Design System AUVP Capital.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. ESSÊNCIA DA MARCA (inegociável)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A AUVP Capital é uma assessoria de investimentos institucional, séria, sóbria e técnica.
Referência estética: Bloomberg + JP Morgan + finança bancária moderna.
Tom: direto, com autoridade técnica. Sem promessas de enriquecimento.
❌ NUNCA: liquid glass, gradientes coloridos, emojis decorativos, estética startup colorida.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PALETA OFICIAL (use SOMENTE estas cores)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Verde Institucional: #023619  → primária, botões, títulos em fundo claro
• Verde Escuro:        #011F0E  → hover de botões verdes
• Amarelo Destaque:    #EFBE4F  → acentos em fundo ESCURO apenas (nunca em fundo claro)
• Branco Puro:         #FFFFFF
• Cinza Claro:         #F2F2F2
• Cinza Médio:         #6B6B6B  → textos secundários em fundo claro
• Cinza Chumbo:        #1B1B1B  → cards em dark
• Preto Puro:          #000000
❌ PROIBIDO: roxo, rosa, azul, gradientes coloridos, neon

Cores de texto por fundo:
• Fundo claro (#FFF / #F2F2F2): título #023619 | corpo #1B1B1B | secundário #6B6B6B
• Fundo escuro (#000 / #1B1B1B): título #FFF (ou #EFBE4F destaque) | corpo #F2F2F2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TIPOGRAFIA (regras estritas)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• H1:        Anek Latin 600  54px desktop / 36px mobile  lh 1.1   ls -0.02em
• H2:        Anek Latin 600  41px / 30px                 lh 1.15
• H3:        Anek Latin 600  28px / 22px
• Subtítulo: Roboto     400  20px                         lh 1.5   #6B6B6B
• Corpo:     Roboto     400  17px                         lh 1.6
• Eyebrow:   Sora       700  12px UPPERCASE               ls 0.15em  #023619
• Botão/CTA: Sora       700  14px UPPERCASE               ls 0.05em  (exclusivo botões)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. BOTÕES (identidade visual mais marcante da Capital)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• border-radius: 5px (padrão do Design System)
• Padding: py-[18px] px-[32px]
• Border: SEMPRE 1px solid
• Primário (fundo claro): bg #023619  text #FFF   border #023619
  Hover: bg transparent  text #023619  border #023619
• Outline (fundo escuro): bg transparent  text #FFF  border #FFF
  Hover: bg #FFF  text #023619  border #FFF
• Transition: all 240ms ease
• Ícone interno: 16px  gap 8px  alinhado verticalmente

Estados do botão:
• Default → Hover (240ms) → Active (scale 0.99) → Focus (ring 2px offset 2px #023619)
• Disabled: opacity 50%  cursor not-allowed  pointer-events none
• Loading: spinner 16px + "Carregando..." + disabled

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. CARDS E CONTAINERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• border-radius: 12px SEMPRE (exceto botões)
• Padding: 30px desktop / 20px mobile
• Hover: shadow-[0_8px_24px_rgba(0,0,0,0.06)] translateY(-2px) transition 240ms
• Fundo branco   → card bg #F2F2F2
• Fundo #F2F2F2  → card bg #FFF
• Fundo preto    → card bg #1B1B1B
• Border opcional: 1px solid rgba(0,0,0,0.06) em fundos claros
❌ PROIBIDO: backdrop-blur, liquid glass, transparências translúcidas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. LAYOUT E RITMO VERTICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Sections alternam obrigatoriamente: #FFF → #F2F2F2 → #FFF → #000 (impacto) → #FFF
• Padding-block: 60px mobile / 90px desktop
• Container: max-w 1200px  padding-inline 24px
• TODOS os gaps múltiplos de 15px: gap-[15px] gap-[30px] gap-[45px] gap-[60px]
• Espaçamento título→corpo: mb-[30px]  |  corpo→CTA: mb-[45px]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ELEMENTOS AVANÇADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tabs/pílulas: bordas retas, fundo sólido, ativo bg #023619 text white
• Timeline: bolinhas sólidas #023619 + border-white 3px + conector linha sólida #023619
• Badges: bg sólido (nunca translúcido), rounded 4px
• Separadores: 1px solid rgba(0,0,0,0.08)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. CATÁLOGO DE COMPONENTES DISPONÍVEIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use SOMENTE estes componentes. Se precisar de algo fora da lista, descreva em comentário.

Fundamentos: Marca & Logos | Tipografia (Anek/Roboto/Sora) | Paleta + Data Viz | Ícones Phosphor
Layout: Cards & Containers | Botões (Primário/Outline/Ghost/Destrutivo) | Grid e Espaçamento

Seções de Página:
• Grade Curricular (tabs pill-style + carrossel mobile)
• Contagem Regressiva (timer, cards de unidade)
• FAQ / Accordion (dropdown)
• Tabela de Preços (toggle individual/pacotes, badge de desconto)
• Jornada do Herói (timeline interativa + glow + progresso)
• Widgets Flutuantes (botão circular 64px WhatsApp com pulse, ícone SVG oficial)
• Calculadora de Rendimentos (versão LP)
• Calculadora de Câmbio (versão ferramenta)

Feedback & Overlays: Tooltip | Notificação/Toast | Popconfirm | Spin | Skeleton | Empty | Result
Navegação: Drawer | Steps/Wizard | Segmented | Anchor/ScrollSpy | Tabs | Tour
Entrada: Upload | Rate | AutoComplete | TreeSelect | Transfer | Mentions | Cascader | Checkbox | Choicebox
Exibição: Statistic/KPI | Timeline | Tree | Descriptions | Tabela | Progress Bar | Gráfico Pizza | Watermark

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. EXEMPLO DE HERO INSTITUCIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<section class="bg-white py-[90px]">
  <div class="max-w-[1200px] mx-auto px-6">
    <span class="font-sora text-[12px] font-bold uppercase tracking-[0.15em] text-[#023619]">Assessoria Patrimonial</span>
    <h1 class="font-anek text-[54px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#023619] mt-[15px]">
      Patrimônio construído com método.
    </h1>
    <p class="font-roboto text-[20px] text-[#6B6B6B] mt-[30px] max-w-[640px]">
      Estratégias diversificadas para preservação e crescimento de capital de longo prazo.
    </p>
    <div class="flex gap-[15px] mt-[45px]">
      <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-[#023619] text-white border border-[#023619] hover:bg-transparent hover:text-[#023619] transition-all duration-[240ms]">
        Falar com assessor
      </button>
      <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-transparent text-[#023619] border border-[#023619] hover:bg-[#023619] hover:text-white transition-all duration-[240ms]">
        Ver portfólio
      </button>
    </div>
  </div>
</section>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Botões com border-radius: 5px
□ Cards com radius 12px
□ Tipografia Anek/Roboto/Sora corretamente atribuída com pesos exatos
□ Múltiplos de 15px em todos os gaps
□ Sem backdrop-blur, sem gradientes coloridos
□ Alternância de fundo entre sections respeitada
□ Todos os estados dos botões: default, hover, active, focus, disabled, loading
□ Acessibilidade: aria-label, focus-visible ring, contraste ≥ 4.5:1

Agora gere a seção solicitada:`,

    ferramentas: `Você é um Desenvolvedor Front-end Especialista. Gere um Widget ou Calculadora para a marca AUVP Capital seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente: contém tudo que você precisa saber.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ferramentas são usadas DENTRO de LPs ou como apps standalone. Linguagem visual: "fintech moderna"
(estrutura Nubank-like, paleta verde institucional). O usuário precisa LER NÚMEROS rápido.
Hierarquia tipográfica é tudo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CONTAINER PAI (padrão fixo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
• bg-white obrigatório (fura o fundo mesmo em LP escura)
• rounded-2xl (16px) — ÚNICA exceção à regra de bordas retas da Capital
• shadow-xl: shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
• max-w-md (448px) padrão | max-w-lg para calculadoras complexas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TIPOGRAFIA HIERÁRQUICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Título da ferramenta:         Anek Latin 700  22px  #1B1B1B
• Valor monetário (resultado):  Anek Latin 700  36px  #023619  tabular-nums
• Valor secundário:             Anek Latin 600  20px  #1B1B1B
• Labels de input:              Roboto     500  13px  #6B6B6B  UPPERCASE tracking-wider
• Texto auxiliar / disclaimer:  Roboto     400  12px  #9CA3AF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. PALETA APLICADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Verde primário (CTA, slider, positivo): #023619
• Verde claro (highlight ativo):          bg-green-50 (#F0FDF4)
• Cinza input:   bg-gray-50 (#F9FAFB)  border border-gray-100
• Positivo delta %: #16A34A
• Negativo delta %: #DC2626
• Divisores:     border-gray-100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. INPUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-gray-50 rounded-xl px-4 py-3">
  <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Label</label>
  <div class="flex items-center">
    <span class="text-gray-400 mr-2">R$</span>
    <input class="bg-transparent border-0 text-2xl font-anek font-bold text-gray-900 w-full focus:outline-none" />
  </div>
</div>

Estados do input:
• Default: bg-gray-50 sem borda visível
• Focus:   ring-2 ring-[#023619]/30 border-[#023619]/50
• Error:   ring-2 ring-red-500/30 border-red-500/50 + mensagem abaixo
• Disabled: opacity 50% cursor not-allowed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SLIDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Track:  h-2 bg-gray-200 rounded-full
• Fill:   bg-[#023619]
• Thumb:  20px circular  bg-[#023619]  border-2 border-white  shadow-md  cursor-pointer
• accent-color: #023619
• Labels min/max: text-xs text-gray-400 flex justify-between mt-1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. BOTÕES (DIFERENTE da LP institucional — aqui são arredondados)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Primário:   bg-[#023619] text-white  font-sora font-bold uppercase text-sm  py-3 px-6  rounded-[5px]  hover:bg-[#011F0E]
• Secundário: bg-green-50  text-[#023619]  rounded-[5px]  py-3 px-6
• Tab/pílula: rounded-full px-4 py-2  |  ativo: bg-[#023619] text-white  |  inativo: bg-gray-100 text-gray-600

Estados do botão:
• Default → Hover → Active (brightness-90) → Focus (ring 2px #023619) → Disabled (opacity 50%)
• Loading: spinner 16px inline + "Calculando..." + pointer-events none

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. CAIXA DE RESULTADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-green-50 rounded-xl p-5 mt-6">
  <p class="font-roboto text-xs uppercase tracking-wider text-[#023619]/70 font-medium">Você terá em 10 anos</p>
  <p class="font-anek text-4xl font-bold text-[#023619] mt-2 tabular-nums">R$ 1.234.567</p>
  <p class="font-roboto text-sm text-gray-500 mt-1">Rendimento: <span class="text-green-600 font-semibold">+R$ 234.567 (23,4%)</span></p>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. ESTADOS OBRIGATÓRIOS PARA FERRAMENTAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Idle — valores de exemplo pré-preenchidos
□ Editando — input com focus ring verde
□ Calculando — botão disabled + spinner inline
□ Resultado — caixa verde animada (fade-in 300ms)
□ Reset — volta ao estado idle sem flash
□ Erro de validação — mensagem abaixo do input, border vermelha
□ Valor zerado — resultado mostra R$ 0,00 sem colapsar layout
□ Valor máximo — testa overflow numérico (ex: R$ 9.999.999)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Card pai: bg-white + rounded-2xl + shadow-xl
□ Botões: rounded-[5px] (border-radius: 5px)
□ Slider: thumb #023619 + border-white 2px + shadow
□ Valores: tabular-nums + font-anek + cor #023619
□ Labels: Roboto 500 uppercase
□ Todos os 8 estados da ferramenta implementados
□ Responsivo: max-w-md centrado, mobile com padding lateral

Agora gere a ferramenta solicitada:`,

    plataforma: `Este contexto não se aplica. A AUVP Capital não utiliza a visão Plataforma EAD.`,
  },

  escola: {
    institucional: `Você é um Desenvolvedor Front-end Especialista. Gere seções de Landing Page ou Site Institucional para a marca AUVP Escola seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente: contém tudo que você precisa saber.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. ESSÊNCIA DA MARCA (inegociável)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A AUVP Escola é educação financeira INDEPENDENTE, rebelde, cultura pirata (estilo Anthony Bourdain goiano).
Antítese de banco/instituição financeira tradicional.
Visual: sofisticado, premium, editorial. Referência: Apple Education + Masterclass + revista de luxo.
Glassmorphism É a assinatura visual (cards translúcidos com blur).
❌ NUNCA use verde da Capital (#023619) como cor de fundo, borda ou ícone.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PALETA OFICIAL GOLD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dourado Principal:  #EFBF4E  → acentos, ícones, botão primário, slider thumb
• Dourado Escuro:     #D4A73D  → tipografia de destaque, eyebrow, badges ativos
• Dourado Profundo:   #B8860B  → textos sobre fundo claro com forte destaque
• Verde Capital:      #023619  → SOMENTE como cor de TEXTO dentro de botões dourados
• Cinza Texto:        #18181B
• Cinza Secundário:   #52525B / #71717A
• Translúcido claro:  rgba(255,255,255,0.5)  rgba(255,255,255,0.85)
• Border translúcida: rgba(0,0,0,0.12)
• Tag dourada bg:     rgba(239,191,78,0.1)
❌ PROIBIDO: verde Capital como cor de fundo/borda, azul, roxo, cores saturadas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. FUNDO DE PÁGINA (assinatura da Escola)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• NUNCA fundo branco chapado. Sempre gradiente radial:
  background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%);

• Sections de impacto (fundo escuro):
  background: radial-gradient(ellipse at center, rgba(239,191,78,0.08) 0%, #18181b 70%);

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. CARDS TRANSLÚCIDOS (assinatura visual — obrigatório em LP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
.escola-glass-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 32px;
  transition: transform 320ms ease, box-shadow 320ms ease;
}
.escola-glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(239, 191, 78, 0.25);
  border-color: rgba(239, 191, 78, 0.4);
}

Em fundo escuro: bg rgba(255,255,255,0.05)  border rgba(255,255,255,0.1)
border-radius: 16px padrão | 12px cards menores

Estados do card:
• Default → Hover (translateY -8px + glow dourado 320ms) → Focus (ring dourado 2px)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. TIPOGRAFIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Eyebrow: Anek Latin 600 13px UPPERCASE ls 1.5px text-[#D4A73D]
           inline-flex px-3 py-1.5 rounded-full bg-[rgba(239,191,78,0.1)]
• H1: Anek Latin 700  56px / 36px mobile  ls -0.025em  lh 1.05  #18181B
• H2: Anek Latin 600  42px / 30px          ls -0.02em
• H3: Anek Latin 600  28px
• Corpo: Roboto 400  17px  #52525B  lh 1.65
• Destaque dourado inline: <span class="text-[#D4A73D] font-semibold">texto</span>
• Botão/CTA: Sora 700  14px UPPERCASE  ls 0.05em

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. BOTÕES (regra unificada com Capital em LPs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• ❌ NUNCA rounded-full em LP. Pílulas só em Ferramentas.
• border-radius: 5px (padrão do Design System)
• Padding: py-[18px] px-[32px]
• Primário (fundo claro): bg #EFBF4E  text #023619  border #EFBF4E
  Hover: bg transparent  border #EFBF4E  text #18181B
• Outline: bg transparent  text #18181B  border #18181B
  Hover:   bg #18181B  text #EFBF4E
• Em fundo escuro: bg #EFBF4E  text #18181B
  Hover: bg transparent  border #EFBF4E  text #EFBF4E
• Transition: all 300ms ease

Estados do botão:
• Default → Hover → Active (brightness-90) → Focus (ring 2px #EFBF4E offset 2px)
• Disabled: opacity 50%  cursor not-allowed
• Loading: spinner dourado 16px + "Carregando..." + disabled

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. TAGS / BADGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-anek font-semibold uppercase tracking-[1.5px] text-[#D4A73D] bg-[rgba(239,191,78,0.1)] border border-[rgba(239,191,78,0.2)]">
  Educação Financeira
</span>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. CATÁLOGO DE COMPONENTES DISPONÍVEIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use SOMENTE estes componentes:

Fundamentos: Marca & Logos | Tipografia (Anek/Roboto/Sora) | Paleta Gold + Data Viz | Ícones Phosphor
Layout: Cards Translúcidos | Botões (Primário dourado/Outline) | Grid e Espaçamento

Seções de Página:
• Grade Curricular (tabs pill-style + carrossel mobile)
• Contagem Regressiva (timer, cards de unidade)
• FAQ / Accordion
• Tabela de Preços (toggle individual/pacotes, badge de desconto)
• Jornada do Herói (timeline interativa + glow dourado + progresso)
• Widgets Flutuantes (botão circular 64px WhatsApp, pulse, SVG oficial)
• Calculadora de Rendimentos (versão LP)

Feedback & Overlays: Tooltip | Toast | Popconfirm | Spin | Skeleton | Empty | Result
Navegação: Drawer | Steps/Wizard | Segmented | Anchor/ScrollSpy | Tabs | Tour
Entrada: Upload | Rate | AutoComplete | TreeSelect | Transfer | Mentions | Cascader | Checkbox | Choicebox
Exibição: Statistic/KPI | Timeline | Tree | Descriptions | Tabela | Progress Bar | Gráfico Pizza | Watermark

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. EXEMPLO DE HERO LP ESCOLA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<section style="background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%); padding: 120px 0;">
  <div class="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-[60px] items-center">
    <div>
      <span class="inline-flex px-3 py-1.5 rounded-full text-[13px] font-anek font-semibold uppercase tracking-[1.5px] text-[#D4A73D] bg-[rgba(239,191,78,0.1)]">
        Curso AUVP Pro
      </span>
      <h1 class="font-anek text-[56px] font-bold leading-[1.05] tracking-[-0.025em] text-[#18181B] mt-6">
        A escola que <span class="text-[#D4A73D]">o banco</span> não quer que você frequente.
      </h1>
      <p class="font-roboto text-[17px] text-[#52525B] leading-[1.65] mt-6 max-w-[480px]">
        Educação financeira independente, sem produtos para te empurrar.
      </p>
      <div class="flex gap-[15px] mt-[45px]">
        <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-[#EFBF4E] text-[#023619] border border-[#EFBF4E] hover:bg-transparent hover:text-[#18181B] transition-all duration-[300ms]">
          Quero estudar
        </button>
        <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-transparent text-[#18181B] border border-[#18181B] hover:bg-[#18181B] hover:text-[#EFBF4E] transition-all duration-[300ms]">
          Ver grade
        </button>
      </div>
    </div>
    <div class="escola-glass-card">
      <!-- conteúdo do card translúcido -->
    </div>
  </div>
</section>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Cards com backdrop-filter: blur(24px)
□ Fundos com gradiente radial (nunca branco chapado)
□ Botões com border-radius: 5px em LP — pílula PROIBIDA
□ Eyebrow dourado com tracking 1.5px e pill container
□ Verde Capital SOMENTE em texto de botão dourado
□ Hover de card: translateY(-8px) + glow dourado 320ms
□ Todos os estados dos botões: default, hover, active, focus, disabled, loading
□ Acessibilidade: aria-label, focus ring dourado, contraste ≥ 4.5:1

Agora gere a seção solicitada:`,

    ferramentas: `Você é um Desenvolvedor Front-end Especialista. Gere uma Calculadora ou Widget para a marca AUVP Escola seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ferramentas educacionais que demonstram conceitos (juros compostos, inflação, aporte, FIRE, etc.).
Estilo: editorial premium, dourado sutil, foco em leitura limpa de números.
❌ NUNCA use verde da Capital (#023619). Aqui o destaque é GOLD.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CONTAINER PAI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto border border-gray-100">
• bg-white sempre
• rounded-2xl (16px)
• Shadow elegante e suave
• Border 1px sutil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. PALETA APLICADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dourado (resultado principal): #D4A73D ou #B8860B
• Dourado claro (highlight input ativo): bg-[#EFBF4E]/10
• Cinza neutro (comparações/negativo): text-zinc-500
• Inputs: bg-gray-50
• Botão primário: bg-[#EFBF4E] text-zinc-900

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. TIPOGRAFIA HIERÁRQUICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Título da ferramenta:         Anek Latin 600  22px  #18181B
• Valor em destaque (resultado):Anek Latin 700  36px  #B8860B  tabular-nums
• Valor secundário:             Anek Latin 600  20px  #18181B
• Labels:                       Roboto     500  13px  UPPERCASE  tracking-wider  #71717A
• Texto auxiliar:               Roboto     400  12px  #A1A1AA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. INPUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
  <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Label</label>
  <div class="flex items-center">
    <span class="text-gray-400 mr-2 font-roboto">R$</span>
    <input class="bg-transparent border-0 text-2xl font-anek font-bold text-gray-900 w-full focus:outline-none" />
  </div>
</div>

Estados:
• Default: bg-gray-50 border-gray-100
• Focus:   ring-2 ring-[#EFBF4E]/40 border-[#EFBF4E]/60
• Error:   ring-2 ring-red-500/30 + mensagem text-sm text-red-500

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SLIDERS (regra crítica)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
input[type="range"]::-webkit-slider-thumb {
  width: 22px; height: 22px;
  background: #EFBF4E;
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
}
Track: h-1.5 bg-d1d5db rounded-full
accent-color: #EFBF4E

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. BOTÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Primário:   bg-[#EFBF4E] text-zinc-900  font-sora font-bold uppercase text-sm  py-3 px-6  rounded-[5px]  hover:bg-[#D4A73D]
• Secundário: bg-zinc-100  text-zinc-700   rounded-[5px]  py-3 px-6
• Tab/pílula: rounded-full px-4 py-2  |  ativo: bg-[#EFBF4E] text-zinc-900  |  inativo: bg-zinc-100 text-zinc-600

Estados:
• Default → Hover (D4A73D) → Active (brightness-90) → Focus (ring #EFBF4E) → Disabled (opacity 50%)
• Loading: spinner dourado + "Calculando..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. CAIXA DE RESULTADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-100">
  <p class="font-roboto text-xs uppercase tracking-wider text-gray-500 font-medium">Total acumulado</p>
  <p class="font-anek text-4xl font-bold text-[#B8860B] mt-2 tabular-nums">R$ 1.234.567</p>
  <p class="font-roboto text-sm text-zinc-500 mt-1">Em 10 anos com aporte de R$ 1.000/mês</p>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. ESTADOS OBRIGATÓRIOS PARA FERRAMENTAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Idle — valores de exemplo pré-preenchidos
□ Editando — input com focus ring dourado
□ Calculando — botão disabled + spinner dourado inline
□ Resultado — caixa cinza animada (fade-in 300ms), valor dourado
□ Reset — volta ao idle sem flash
□ Erro de validação — border dourada → vermelha + msg abaixo
□ Valor zerado — R$ 0,00 sem colapsar layout
□ Valor máximo — overflow numérico testado

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Sem verde Capital — apenas dourado e cinzas
□ Slider: thumb dourado #EFBF4E + border-white 3px + shadow
□ Valores: font-anek + tabular-nums + cor #B8860B
□ Container: bg-white + rounded-2xl + shadow suave
□ Botões: rounded-[5px] (border-radius: 5px)
□ Todos os 8 estados da ferramenta implementados

Agora gere a ferramenta solicitada:`,

    plataforma: `Você é um Desenvolvedor Front-end Especialista. Gere interfaces de Plataforma EAD para a AUVP Escola seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Plataforma onde o aluno consome aulas, lê materiais, acompanha progresso, interage em comunidade.
Estética: limpa, clara, focada em leitura longa, sem fadiga visual. Referência: Notion + Skool + Masterclass (light mode).
❌ NÃO é o visual translúcido da LP. Aqui é UI funcional sólida.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. LIGHT MODE (padrão obrigatório)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Body / fundo:     bg-gray-50 (#F9FAFB)
• Cards / sidebars: bg-white + border border-gray-200
• Divisores:        border-gray-100
• Hover de listas:  bg-gray-50

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. DARK MODE (toggle alternativo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Body:   bg-zinc-950
• Cards:  bg-zinc-900 + border border-zinc-800
• Divisores: border-zinc-800

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. TIPOGRAFIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Título de módulo: Anek 700  24px  text-gray-900 (light) / text-white (dark)
• Título de aula:   Anek 600  18px  text-gray-900
• Meta (duração):   Roboto 400  13px  text-gray-500
• Conteúdo/corpo:   Roboto 400  16px  text-gray-700  lh 1.65
• Breadcrumb:       Roboto 500  14px  text-gray-600

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. IDENTIDADE GOLD — uso pontual e estratégico
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cor primária: #EFBF4E (ou text-yellow-500 / bg-yellow-500 no Tailwind)
Em fundo claro, prefira text-yellow-600 (#CA8A04) para contraste.

Aplicações:
• Ícone Play ativo:           text-yellow-600
• Barra de progresso de vídeo: bg-[#EFBF4E]
• Aula em curso na playlist:   bg-yellow-50 border-l-4 border-yellow-500
• Badge "Em andamento":        bg-yellow-100 text-yellow-800
• Botão CTA de aula:           bg-[#EFBF4E] text-zinc-900 hover:bg-[#D4A73D]
• Aulas concluídas:            ícone text-emerald-500
• Aulas bloqueadas:            ícone text-gray-400 opacity-60

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. VIDEO PLAYER (regra fixa)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Container: SEMPRE bg-black + aspect-video (mesmo no light mode)
• Controles: dark sobre vídeo, gradiente from-black/80 to-transparent na parte inferior
• Botão Play central: w-16 h-16 rounded-full bg-white/20 backdrop-blur + ícone branco
• Barra de progresso: h-1 bg-white/20 + fill bg-[#EFBF4E]
• Tempo: text-white text-xs font-mono

Estados do player:
• Idle (poster)     — thumbnail + botão Play centrado
• Loading           — spinner dourado centralizado
• Playing           — controles visíveis no hover, ocultos após 3s
• Paused            — controles sempre visíveis
• Buffering         — barra de progresso pulsando
• Erro              — ícone + mensagem "Vídeo indisponível"
• Concluído         — overlay com botão "Próxima aula →"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. PLAYLIST DE AULAS (sidebar)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Estados de cada item:
• Concluída:    ícone CheckCircle text-emerald-500  |  texto text-gray-500  |  hover bg-gray-50
• Em andamento: bg-yellow-50  border-l-4 border-yellow-500  ícone PlayCircle text-yellow-600
• Disponível:   hover bg-gray-50  |  ícone PlayCircle text-gray-400
• Bloqueada:    opacity-60  ícone Lock text-gray-400  cursor-not-allowed

<aside class="w-80 bg-white border-l border-gray-200">
  <!-- Aula concluída -->
  <li class="flex gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
    <CheckCircle class="w-5 h-5 text-emerald-500 shrink-0" />
    <div><p class="font-anek font-semibold text-sm text-gray-900 truncate">O que é renda fixa</p>
    <p class="font-roboto text-xs text-gray-500">12:34</p></div>
  </li>
  <!-- Em andamento -->
  <li class="flex gap-3 px-4 py-3 bg-yellow-50 border-l-4 border-yellow-500">
    <PlayCircle class="w-5 h-5 text-yellow-600 shrink-0" />
    <div><p class="font-anek font-semibold text-sm text-gray-900 truncate">CDB, LCI e LCA na prática</p>
    <p class="font-roboto text-xs text-yellow-700">Assistindo · 4:21 / 18:00</p></div>
  </li>
  <!-- Bloqueada -->
  <li class="flex gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 opacity-60">
    <Lock class="w-5 h-5 text-gray-400 shrink-0" />
    <div><p class="font-anek font-semibold text-sm text-gray-900 truncate">Tesouro Direto</p>
    <p class="font-roboto text-xs text-gray-500">15:20</p></div>
  </li>
</aside>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. PROGRESSO DO MÓDULO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="px-4 py-3 bg-white border-t border-gray-200">
  <div class="flex justify-between text-xs font-roboto text-gray-500 mb-2">
    <span>Progresso do módulo</span>
    <span class="font-semibold text-yellow-600">37%</span>
  </div>
  <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
    <div class="h-full bg-[#EFBF4E] rounded-full transition-all duration-500" style="width: 37%"></div>
  </div>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. LAYOUT BASE DA TELA DE AULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="min-h-screen bg-gray-50">
  <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
    <!-- breadcrumb + logo + avatar do aluno -->
  </header>
  <main class="flex h-[calc(100vh-65px)]">
    <section class="flex-1 overflow-y-auto p-6">
      <div class="aspect-video bg-black rounded-xl overflow-hidden mb-6"><!-- player --></div>
      <h1 class="font-anek text-3xl font-bold text-gray-900">Título da aula</h1>
      <p class="font-roboto text-base text-gray-700 mt-4 leading-relaxed">Descrição...</p>
    </section>
    <aside class="w-80 bg-white border-l border-gray-200 overflow-y-auto"><!-- playlist --></aside>
  </main>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Light mode como padrão (bg-gray-50)
□ Vídeo SEMPRE bg-black (mesmo em light mode)
□ Aula em curso: bg-yellow-50 + border-l-4 border-yellow-500
□ Concluída: text-emerald-500
□ Bloqueada: opacity-60 + text-gray-400
□ Player com todos os 7 estados implementados
□ Progresso: barra bg-[#EFBF4E] com transition-all
□ Tipografia: Anek (títulos), Roboto (meta/corpo), Sora (botões CTA)
□ Gold #EFBF4E apenas em CTAs, progresso e playlist ativa

Agora gere a interface solicitada:`,
  },
};

// ─── Catálogos de componentes ─────────────────────────────────────────────────

const componentCatalog = {
  institucional: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CATÁLOGO COMPLETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use SOMENTE componentes desta lista:

Fundamentos: Marca & Logos | Tipografia (Anek/Roboto/Sora) | Cores + Data Viz | Ícones Phosphor
Layout: Cards & Containers | Botões | Grid e Espaçamento

Seções LP: Grade Curricular | Contagem Regressiva | FAQ Accordion | Tabela de Preços
          Jornada do Herói | Widgets Flutuantes | Calculadora de Rendimentos

Feedback: Tooltip | Toast/Notificação | Popconfirm | Spin | Skeleton | Empty | Result
Navegação: Drawer | Steps/Wizard | Segmented | Tabs | Anchor | Tour
Entrada:   Upload | Rate | AutoComplete | TreeSelect | Transfer | Mentions | Cascader
Exibição:  Statistic | Timeline | Tree | Descriptions | Tabela | Progress Bar | Gráfico Pizza | Watermark`,

  ferramentas: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CATÁLOGO COMPLETO — FERRAMENTAS / CALCULADORAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fundamentos aplicáveis: Tipografia | Cores | Ícones Phosphor

Entradas (núcleo): AutoComplete | TreeSelect | Transfer | Cascader | Mentions | Rate | Upload
Resultados:        Statistic/KPI | Gráfico Pizza | Timeline | Descriptions | Tree | Empty | Result
Feedback:          Spin | Skeleton | Toast | Popconfirm (reset) | Tooltip (dicas nos campos)
Navegação:         Steps (multi-step) | Segmented (alternância) | Anchor (resultados longos) | Tour | Drawer (filtros)
Container:         Cards radius 12px | Layout múltiplos de 15px | Botões Sora Bold UPPERCASE`,

  plataforma: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CATÁLOGO COMPLETO — PLATAFORMA EAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Específicos EAD: Visualização de Cursos | Video Player | Playlist | Dashboard do Aluno
                  Notas & Anotações | Avaliação de Aulas | Certificados | Comunidade & Dúvidas

Globais reutilizáveis: Statistic | Timeline | Steps | Tree | Descriptions | Empty | Result | Tour
                        Segmented | Anchor | Tooltip | Toast | Skeleton | Spin | Popconfirm
                        AutoComplete (busca) | Rate (avaliar aula) | Mentions (comentários)
                        Upload (exercícios) | Cascader / TreeSelect (filtros) | Transfer | Watermark
                        Gráfico Pizza (progresso)

Hierarquia obrigatória: Player → Conteúdo → Playlist. Componentes auxiliares são satélites.`,
};

// ─── Componente ───────────────────────────────────────────────────────────────

type TabId = "global" | "componentes";

export function AIFood() {
  const { brand } = useBrand();
  const { view } = useSystemView();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("global");

  const prompt = useMemo(() => {
    const base = masterPrompts[brand]?.[view];
    if (!base) return "Prompt não disponível para esta combinação.";
    const catalog = componentCatalog[view as keyof typeof componentCatalog] ?? "";
    return base + catalog;
  }, [brand, view]);

  const brandLabel = brand === "capital" ? "AUVP Capital" : "AUVP Escola";
  const brandColor = brand === "capital" ? "text-[#22c55e]/70" : "text-[#EFBF4E]/70";
  const promptColor = brand === "capital" ? "text-[#4ade80]" : "text-[#fbbf24]";
  const selectionColor = brand === "capital"
    ? "selection:bg-[#4ade80]/30 selection:text-white"
    : "selection:bg-[#fbbf24]/30 selection:text-white";

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/10">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-anek">AI-Food</h2>
            <p className="text-xs text-muted-foreground font-roboto uppercase tracking-wider">Alimentadores automáticos para qualquer IA</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold font-roboto uppercase tracking-wider">Prompt Global</span>
            </div>
            <p className="text-xs text-muted-foreground font-roboto leading-relaxed">
              Alimenta a IA com todas as regras do Design System {brandLabel} para gerar seções do zero.
            </p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold font-roboto uppercase tracking-wider">Por Componente</span>
            </div>
            <p className="text-xs text-muted-foreground font-roboto leading-relaxed">
              Cada componente do Design System tem seu próprio AI-Food com código + estados + regras.
            </p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold font-roboto uppercase tracking-wider">100% Isolado</span>
            </div>
            <p className="text-xs text-muted-foreground font-roboto leading-relaxed">
              Cada prompt é autossuficiente: funciona no ChatGPT, Claude, Cursor ou qualquer outra IA.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b">
        <button
          onClick={() => setActiveTab("global")}
          className={`px-4 py-2 text-sm font-medium font-roboto border-b-2 transition-colors ${
            activeTab === "global"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Prompt Global
          </span>
        </button>
        <button
          onClick={() => setActiveTab("componentes")}
          className={`px-4 py-2 text-sm font-medium font-roboto border-b-2 transition-colors ${
            activeTab === "componentes"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            Por Componente
          </span>
        </button>
      </div>

      {activeTab === "global" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-roboto leading-relaxed max-w-3xl">
            Master Prompt gerado automaticamente para{" "}
            <strong className="text-foreground">{brandLabel}</strong> /{" "}
            <strong className="text-foreground">{viewLabels[view]}</strong>.
            Inclui paleta, tipografia, botões, cards, layout, componentes disponíveis e checklist completo.
          </p>

          <div className="bg-[#0f172a] rounded-xl overflow-hidden relative border border-[#1e293b] shadow-xl">
            {/* Copy button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="bg-white text-[#0f172a] hover:bg-gray-200 font-bold shadow-lg gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copiado!" : "Copiar Prompt"}
              </Button>
            </div>

            {/* Info bar */}
            <div className="flex items-center gap-2 px-6 pt-4 pb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest font-roboto ${brandColor}`}>
                {brandLabel}
              </span>
              <span className="text-[#334155]">•</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest font-roboto ${brandColor}`}>
                {viewLabels[view]}
              </span>
              <span className="text-[#334155]">•</span>
              <span className="text-[10px] font-bold uppercase tracking-widest font-roboto text-[#334155]">
                Prompt Standalone
              </span>
            </div>

            {/* Prompt content */}
            <div className="p-6 pt-2 overflow-x-auto max-h-[600px] overflow-y-auto">
              <pre className={`whitespace-pre-wrap font-mono text-[13px] leading-relaxed ${promptColor} ${selectionColor}`}>
                {prompt}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === "componentes" && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold font-anek text-foreground mb-1">
                  AI-Food por componente — como usar
                </p>
                <p className="text-sm text-muted-foreground font-roboto leading-relaxed">
                  Cada componente do Design System tem um botão <strong className="text-foreground">AI-Food</strong> no cabeçalho do showcase.
                  Clique nele para expandir o prompt isolado daquele componente específico — inclui código React,
                  código HTML, regras do Design System e todos os estados visuais obrigatórios.
                  O prompt é 100% standalone: cole direto no ChatGPT, Claude, Cursor ou qualquer IA.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Botões", href: "#buttons", desc: "Primário, Outline, Ghost, Destrutivo — todos os estados (hover, active, focus, disabled, loading)" },
              { label: "Cards & Containers", href: "#cards-containers", desc: "Variantes de fundo claro e escuro, hover com sombra, bordas e padding" },
              { label: "Calculadoras", href: "#tool-calc", desc: "Container, inputs, sliders, caixa de resultado — 8 estados da ferramenta" },
              { label: "Grade Curricular", href: "#grade", desc: "Tabs pill, carrossel mobile, estados de módulo (aberto, fechado, ativo)" },
              { label: "Tabela de Preços", href: "#pricing", desc: "Toggle individual/pacote, badge de desconto, plano em destaque" },
              { label: "Video Player", href: "#plat-player", desc: "7 estados: idle, loading, playing, paused, buffering, error, concluído" },
              { label: "Playlist de Aulas", href: "#plat-playlist", desc: "Estados: concluída, em andamento, disponível, bloqueada" },
              { label: "Jornada do Herói", href: "#journey", desc: "Timeline interativa com glow, progresso e estados de etapa" },
              { label: "Notificações/Toasts", href: "#notifications", desc: "Success, warning, info, error — auto-dismiss 4s, ações inline" },
              { label: "Steps / Wizard", href: "#steps", desc: "Etapas: pendente, atual, concluída, com erro" },
              { label: "Statistic / KPI", href: "#statistic", desc: "Valor principal, delta positivo/negativo, loading skeleton" },
              { label: "Widgets Flutuantes", href: "#floaters", desc: "WhatsApp com pulse, balão de texto, animações de float" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={`Ir para ${item.label} no Design System`}
                className="group rounded-lg border bg-card p-4 flex items-start gap-3 transition-all duration-200 hover:border-accent/60 hover:shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Bot className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold font-anek text-foreground group-hover:underline underline-offset-2">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-roboto mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground font-roboto text-center pt-2">
            As caixas acima levam direto ao componente no Design System. Lá, clique no botão{" "}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-foreground font-bold text-[10px] uppercase tracking-wider">
              <Bot className="h-3 w-3" /> AI-Food
            </span>{" "}
            no cabeçalho do showcase para gerar e copiar o prompt isolado.
          </p>
        </div>
      )}
    </div>
  );
}
