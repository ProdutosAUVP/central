import React, { useState, useMemo } from "react";
import { useBrand } from "@/contexts/BrandContext";
import { useSystemView, viewLabels } from "@/contexts/ViewContext";
import { Copy, Check, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const aiPrompts = {
  capital: {
    institucional: `Você atua como um Desenvolvedor Front-end Especialista. Gere o código (HTML, CSS com Tailwind) para uma seção de Landing Page (Sites & LPs) da marca AUVP Capital seguindo EXATAMENTE as regras do Design System abaixo:

[REGRAS DA AUVP CAPITAL — SITES & LPs]

## 0. ESSÊNCIA DA MARCA (obrigatório respeitar)
- AUVP Capital é uma assessoria de investimentos institucional, séria, sóbria e técnica. Pense Bloomberg + JP Morgan + estética bancária moderna.
- NUNCA use elementos lúdicos, glassmorphism translúcido, gradientes vibrantes, emojis decorativos ou estética "startup colorida".
- Tom: institucional, direto, com autoridade técnica. Sem promessas de enriquecimento.

## 1. PALETA OFICIAL (use SOMENTE estas cores)
- Verde Institucional: #023619 (primária, botões, títulos em fundo claro)
- Verde Escuro Profundo: #011F0E (hover de botões verdes)
- Amarelo Destaque: #EFBE4F (acentos pontuais em fundo escuro, NUNCA em fundo claro)
- Branco Puro: #FFFFFF
- Cinza Claro: #F2F2F2
- Cinza Médio (textos secundários): #6B6B6B
- Cinza Chumbo (cards em dark): #1B1B1B
- Preto Puro: #000000
- ❌ PROIBIDO: roxo, rosa, azul, gradientes coloridos, neon.

## 2. TIPOGRAFIA (regras estritas)
- H1: 'Anek Latin', font-weight 600, 54px (desktop) / 36px (mobile), line-height 1.1, letter-spacing -0.02em.
- H2: 'Anek Latin', font-weight 600, 41px / 30px mobile, line-height 1.15.
- H3: 'Anek Latin', font-weight 600, 28px / 22px mobile.
- Subtítulos: 'Roboto', 400, 20px, line-height 1.5, color #6B6B6B em fundo claro.
- Corpo: 'Roboto', 400, 17px, line-height 1.6.
- Eyebrow / pré-título: 'Sora', 700, 12px, UPPERCASE, letter-spacing 0.15em, cor #023619.
- Cores de texto:
  - Fundo claro (#FFF / #F2F2F2): título #023619, corpo #1B1B1B, secundário #6B6B6B.
  - Fundo escuro (#000 / #1B1B1B): título #FFFFFF (ou #EFBE4F para destaque), corpo #F2F2F2.

## 3. LAYOUT & RITMO VERTICAL
- Sections SEMPRE alternam fundo: #FFFFFF → #F2F2F2 → #FFFFFF → #000000 (dobra de impacto) → #FFFFFF.
- Padding vertical de section: padding-block: 60px (mobile) / 90px (desktop).
- Container central: max-width 1200px, padding-inline 24px.
- Grid e gaps OBRIGATORIAMENTE múltiplos de 15px: gap-[15px], gap-[30px], gap-[45px], gap-[60px].
- Espaçamento entre título e corpo: margin-bottom 30px. Entre corpo e CTA: 45px.

## 4. CARDS (regra de contraste baixo)
- Em fundo #FFFFFF → card bg #F2F2F2.
- Em fundo #F2F2F2 → card bg #FFFFFF.
- Em fundo #000000 → card bg #1B1B1B.
- border-radius: 12px SEMPRE. Sem exceção.
- Padding interno: 30px desktop / 20px mobile.
- Sombra: shadow-none por padrão. Apenas hover sutil: shadow-[0_8px_24px_rgba(0,0,0,0.06)] e translate-y-[-2px], transition 240ms.
- Border: opcional 1px solid rgba(0,0,0,0.06) em fundos claros.

## 5. BOTÕES (identidade visual mais marcante da Capital)
- Família: 'Sora', font-weight 700, UPPERCASE, letter-spacing 0.05em, font-size 14px.
- Formato: BORDAS RETAS — border-radius: 0px. Nunca arredondar.
- Padding: py-[18px] px-[32px].
- Border: SEMPRE 1px solid (mesma cor do fundo no default → fica "invisível").
- Variante Primária (fundo claro): bg #023619, text #FFF, border #023619. Hover: bg transparent, text #023619, border #023619.
- Variante Outline (fundo escuro): bg transparent, text #FFF, border #FFF. Hover: bg #FFF, text #023619, border #FFF.
- Transition: all 240ms ease.
- Ícones dentro do botão: 16px, gap 8px, alinhados verticalmente.

## 6. ELEMENTOS AVANÇADOS (Grade Curricular, Timeline, Countdown, Tabela de Preços)
- ❌ PROIBIDO backdrop-blur, glassmorphism, transparências translúcidas — isso é exclusivo da Escola.
- Use fundos sólidos: #1B1B1B (escuro) ou #FFFFFF (claro).
- Borders sólidas 1px: rgba(255,255,255,0.08) em dark / rgba(0,0,0,0.08) em light.
- Tabs / pílulas: bordas retas, fundo sólido, ativo com bg #023619 e texto branco.
- Timeline: bolinhas sólidas #023619 com border #FFF de 3px, conector linha sólida #023619.

## 7. EXEMPLO DE CÓDIGO (seção hero institucional)
\`\`\`html
<section class="bg-white py-[90px]">
  <div class="max-w-[1200px] mx-auto px-6">
    <span class="font-roboto text-[12px] font-bold uppercase tracking-[0.15em] text-[#023619]">Assessoria Patrimonial</span>
    <h1 class="font-anek text-[54px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#023619] mt-[15px]">Patrimônio construído com método.</h1>
    <p class="font-roboto text-[20px] text-[#6B6B6B] mt-[30px] max-w-[640px]">Estratégias diversificadas para preservação e crescimento de capital de longo prazo.</p>
    <div class="flex gap-[15px] mt-[45px]">
      <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-[#023619] text-white border border-[#023619] hover:bg-transparent hover:text-[#023619] transition-all duration-240">Falar com assessor</button>
      <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-transparent text-[#023619] border border-[#023619] hover:bg-[#023619] hover:text-white transition-all duration-240">Ver portfólio</button>
    </div>
  </div>
</section>
\`\`\`

## 8. CHECKLIST FINAL (revise antes de entregar)
- [ ] Nenhum border-radius em botão (deve ser 0)
- [ ] Cards com radius 12px
- [ ] Tipografia Anek/Roboto/Sora corretamente atribuída
- [ ] Múltiplos de 15px em todos os gaps
- [ ] Sem backdrop-blur, sem gradientes coloridos
- [ ] Alternância de fundo entre sections respeitada`,

    ferramentas: `Você atua como um Desenvolvedor Front-end Especialista. Gere o código (HTML, CSS com Tailwind) para um Widget ou Calculadora da marca AUVP Capital seguindo EXATAMENTE as regras do Design System abaixo:

[REGRAS DA AUVP CAPITAL — FERRAMENTAS / CALCULADORAS / WIDGETS]

## 0. CONTEXTO
- Ferramentas são usadas DENTRO de LPs ou em apps standalone. A linguagem visual muda: aqui é "fintech moderna" (Nubank-like em estrutura, mas com paleta verde institucional).
- O usuário precisa LER NÚMEROS rápido. Hierarquia tipográfica é tudo.

## 1. CONTAINER PAI (sempre o mesmo padrão)
- Tag: <div class="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
- bg-white obrigatório (mesmo se a LP for escura — o card "fura" o fundo).
- rounded-2xl (16px). Aqui SIM arredondamos — é a única exceção à regra de bordas retas da Capital.
- shadow-xl: shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)].
- max-w-md (448px) padrão. Para calculadoras complexas: max-w-lg.

## 2. TIPOGRAFIA HIERÁRQUICA
- Título da ferramenta: 'Anek Latin', 700, 22px, color #1B1B1B.
- Valor monetário em destaque (resultado): 'Anek Latin', 700, 36px, color #023619. Use tabular-nums.
- Valor secundário: 'Anek Latin', 600, 20px, color #1B1B1B.
- Labels de input: 'Roboto', 500, 14px, color #6B6B6B, uppercase opcional.
- Texto auxiliar / disclaimer: 'Roboto', 400, 12px, color #9CA3AF.

## 3. PALETA APLICADA
- Verde primário (CTA, slider thumb, valores positivos): #023619.
- Verde claro (highlights, abas ativas): bg-green-50 (#F0FDF4).
- Cinza input: bg-gray-50 (#F9FAFB) com border border-gray-100.
- Texto positivo: #16A34A (apenas em deltas %).
- Texto negativo: #DC2626.
- Divisores: border-gray-100.

## 4. INPUTS
- Container: bg-gray-50 rounded-xl px-4 py-3.
- Label acima: text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.
- Input number: bg-transparent border-0 text-2xl font-anek font-bold text-gray-900 w-full focus:outline-none.
- Prefixo "R$": text-gray-400 mr-2.

## 5. SLIDERS (range)
- Track: h-2 bg-gray-200 rounded-full.
- Fill: bg-[#023619].
- Thumb: 20px circular, bg-[#023619], border-2 border-white, shadow-md.
- accent-color: #023619.
- Labels min/max abaixo: text-xs text-gray-400 flex justify-between.

## 6. BOTÕES (DIFERENTE da LP institucional!)
- Aqui são ARREDONDADOS: rounded-xl (12px).
- Primário: bg-[#023619] text-white font-sora font-bold uppercase text-sm py-3 px-6 hover:bg-[#011F0E] transition.
- Secundário: bg-green-50 text-[#023619] rounded-xl py-3 px-6.
- Botão de tab/pílula: rounded-full px-4 py-2, ativo bg-[#023619] text-white, inativo bg-gray-100 text-gray-600.

## 7. CAIXA DE RESULTADO
\`\`\`html
<div class="bg-green-50 rounded-xl p-5 mt-6">
  <p class="font-roboto text-xs uppercase tracking-wider text-[#023619]/70 font-medium">Você terá em 10 anos</p>
  <p class="font-anek text-4xl font-bold text-[#023619] mt-2 tabular-nums">R$ 1.234.567</p>
  <p class="font-roboto text-sm text-gray-500 mt-1">Rendimento: <span class="text-green-600 font-semibold">+R$ 234.567 (23,4%)</span></p>
</div>
\`\`\`

## 8. EXEMPLO COMPLETO (calculadora simples)
\`\`\`html
<div class="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
  <h3 class="font-anek text-[22px] font-bold text-gray-900 mb-1">Simulador de Aporte</h3>
  <p class="font-roboto text-sm text-gray-500 mb-6">Veja quanto seu dinheiro pode render</p>

  <div class="space-y-4">
    <div class="bg-gray-50 rounded-xl px-4 py-3">
      <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Aporte mensal</label>
      <div class="flex items-center">
        <span class="text-gray-400 mr-2">R$</span>
        <input type="number" value="1000" class="bg-transparent border-0 text-2xl font-anek font-bold text-gray-900 w-full focus:outline-none" />
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Prazo: 10 anos</label>
      <input type="range" min="1" max="30" value="10" class="w-full accent-[#023619]" />
    </div>
  </div>

  <div class="bg-green-50 rounded-xl p-5 mt-6">
    <p class="font-roboto text-xs uppercase tracking-wider text-[#023619]/70 font-medium">Total acumulado</p>
    <p class="font-anek text-4xl font-bold text-[#023619] mt-2 tabular-nums">R$ 234.567</p>
  </div>

  <button class="w-full mt-6 bg-[#023619] text-white font-sora font-bold uppercase text-sm py-3 rounded-xl hover:bg-[#011F0E] transition">Quero investir</button>
</div>
\`\`\`

## 9. CHECKLIST
- [ ] Card pai sempre bg-white + rounded-2xl + shadow-xl
- [ ] Botões rounded-xl (NÃO retos como na LP)
- [ ] Sliders accent #023619
- [ ] Valores em tabular-nums e font-anek
- [ ] Labels Roboto, valores Anek`,

    plataforma: `Regra não se aplica. A AUVP Capital não utiliza visão de Plataforma EAD neste contexto.`,
  },

  escola: {
    institucional: `Você atua como um Desenvolvedor Front-end Especialista. Gere o código (HTML, CSS custom) para uma seção de Landing Page (Sites & LPs) da marca AUVP Escola seguindo EXATAMENTE as regras do Design System abaixo:

[REGRAS DA AUVP ESCOLA — SITES & LPs]

## 0. ESSÊNCIA DA MARCA
- AUVP Escola é educação financeira INDEPENDENTE, rebelde, com cultura pirata (estilo Anthony Bourdain). Antítese de banco/instituição financeira tradicional.
- Visual sofisticado, premium, com toque editorial. Pense Apple Education + Masterclass + revista de luxo.
- Glassmorphism é a assinatura visual (cards translúcidos com blur).
- ❌ NUNCA use verde da Capital — é um sinal de outra marca.

## 1. PALETA OFICIAL GOLD
- Dourado Principal: #efbf4e (acentos, ícones, botões secundários, hover, slider thumb)
- Dourado Escuro: #d4a73d (tipografia de destaque, eyebrow, badges)
- Dourado Profundo: #B8860B (textos sobre fundo claro com forte destaque)
- Verde Institucional: #023619 (USADO APENAS em texto de botões — herança da identidade unificada)
- Cinza Texto Principal: #18181b
- Cinza Texto Secundário: #52525b / #71717a
- Branco translúcido: rgba(255,255,255,0.5) e rgba(255,255,255,0.85)
- Fundo de tag dourada: rgba(239,191,78,0.1)
- Border translúcida: rgba(0,0,0,0.12)
- ❌ PROIBIDO: verde Capital, azul, roxo, cores saturadas vibrantes.

## 2. FUNDO DE PÁGINA (assinatura da Escola)
- NUNCA fundo branco chapado. Use gradiente radial cinza sutil:
\`\`\`css
background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%);
\`\`\`
- Para sections de impacto: fundo #18181b (preto suave) com glow dourado:
\`\`\`css
background: radial-gradient(ellipse at center, rgba(239,191,78,0.08) 0%, #18181b 70%);
\`\`\`

## 3. CARDS TRANSLÚCIDOS (assinatura visual)
\`\`\`css
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
\`\`\`
- Em fundo escuro: bg rgba(255,255,255,0.05), border rgba(255,255,255,0.1).
- border-radius: 16px padrão, 12px para cards menores. NUNCA arredondamento exagerado.

## 4. TIPOGRAFIA
- Eyebrow / pré-título: 'Anek Latin', 600, 13px, UPPERCASE, letter-spacing 1.5px, color #d4a73d. Fundo: rgba(239,191,78,0.1), padding 6px 12px, rounded-full inline-flex.
- H1: 'Anek Latin', 700, 56px / 36px mobile, color #18181b, letter-spacing -0.025em, line-height 1.05.
- H2: 'Anek Latin', 600, 42px / 30px, color #18181b, letter-spacing -0.02em.
- H3: 'Anek Latin', 600, 28px, color #18181b.
- Corpo: 'Roboto', 400, 17px, color #52525b, line-height 1.65.
- Destaque dourado em texto: <span class="text-[#d4a73d] font-semibold">.

## 5. BOTÕES (regra UNIFICADA com Capital)
- ❌ NUNCA rounded-full em LP. Pílulas só em Ferramentas.
- Formato: border-radius 0 (retas).
- Família: 'Sora', 700, UPPERCASE, letter-spacing 0.05em, font-size 14px.
- Padding: py-[18px] px-[32px].
- Variante Primária (botão dourado em fundo claro): bg #efbf4e, text #023619 (verde Capital — sim, é proposital), border #efbf4e. Hover: bg transparent, border #efbf4e visível, text #18181b.
- Variante Outline: bg transparent, text #18181b, border #18181b. Hover: bg #18181b, text #efbf4e.
- Em fundo escuro: bg #efbf4e, text #18181b. Hover: transparent + border dourada.

## 6. TAGS / BADGES
\`\`\`html
<span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-anek font-semibold uppercase tracking-[1.5px] text-[#d4a73d] bg-[rgba(239,191,78,0.1)] border border-[rgba(239,191,78,0.2)]">
  Educação Financeira
</span>
\`\`\`

## 7. EXEMPLO DE SEÇÃO HERO
\`\`\`html
<section style="background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%); padding: 120px 0;">
  <div class="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <span class="inline-flex px-3 py-1.5 rounded-full text-[13px] font-anek font-semibold uppercase tracking-[1.5px] text-[#d4a73d] bg-[rgba(239,191,78,0.1)]">Curso AUVP Pro</span>
      <h1 class="font-anek text-[56px] font-bold leading-[1.05] tracking-[-0.025em] text-[#18181b] mt-6">A escola que <span class="text-[#d4a73d]">o banco</span> não quer que você frequente.</h1>
      <p class="font-roboto text-[17px] text-[#52525b] leading-[1.65] mt-6 max-w-[480px]">Educação financeira independente, sem produtos para te empurrar.</p>
      <div class="flex gap-4 mt-10">
        <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-[#efbf4e] text-[#023619] border border-[#efbf4e] hover:bg-transparent hover:text-[#18181b] transition-all duration-300">Quero estudar</button>
        <button class="font-sora font-bold uppercase text-[14px] tracking-[0.05em] py-[18px] px-[32px] bg-transparent text-[#18181b] border border-[#18181b] hover:bg-[#18181b] hover:text-[#efbf4e] transition-all duration-300">Ver grade</button>
      </div>
    </div>
    <div class="escola-glass-card">
      <!-- conteúdo do card translúcido -->
    </div>
  </div>
</section>
\`\`\`

## 8. CHECKLIST
- [ ] Cards com backdrop-filter: blur(24px)
- [ ] Fundos com gradiente radial (nunca branco chapado)
- [ ] Botões retos (radius 0) — pílula é proibida em LP
- [ ] Eyebrow dourado com tracking alto
- [ ] Verde aparece SOMENTE em texto de botão dourado
- [ ] Hover de card: translateY(-8px) + glow dourado`,

    ferramentas: `Você atua como um Desenvolvedor Front-end Especialista. Gere o código para uma Calculadora ou Widget da marca AUVP Escola seguindo EXATAMENTE as regras abaixo:

[REGRAS DA AUVP ESCOLA — FERRAMENTAS / CALCULADORAS / WIDGETS]

## 0. CONTEXTO
- Ferramentas educacionais que demonstram conceitos (juros compostos, inflação, aporte, FIRE, etc.).
- Estilo: editorial premium, dourado sutil, foco em leitura limpa de números.
- ❌ NUNCA use verde da Capital. Aqui o destaque é GOLD.

## 1. CONTAINER PAI
\`\`\`html
<div class="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto border border-gray-100">
\`\`\`
- bg-white sempre.
- rounded-2xl (16px).
- Shadow suave e elegante (não muito pronunciada).
- Border 1px sutil para definir o card.

## 2. PALETA APLICADA
- Dourado destaque (valor positivo / resultado): #d4a73d ou #B8860B.
- Dourado claro (highlight de input ativo): bg-[#efbf4e]/10.
- Cinza neutro (negativo / comparações): text-zinc-500.
- Inputs: bg-gray-50.
- Botão primário: bg-[#efbf4e] text-zinc-900.

## 3. TIPOGRAFIA HIERÁRQUICA
- Título da ferramenta: 'Anek Latin', 600, 22px, color #18181b.
- Valor em destaque (resultado principal): 'Anek Latin', 700, 36px, color #B8860B, tabular-nums.
- Valor secundário: 'Anek Latin', 600, 20px, color #18181b.
- Labels: 'Roboto', 500, 13px, UPPERCASE, tracking-wider, color #71717a.
- Texto auxiliar: 'Roboto', 400, 12px, color #a1a1aa.

## 4. INPUTS
\`\`\`html
<div class="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
  <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Aporte mensal</label>
  <div class="flex items-center">
    <span class="text-gray-400 mr-2 font-roboto">R$</span>
    <input class="bg-transparent border-0 text-2xl font-anek font-bold text-gray-900 w-full focus:outline-none" />
  </div>
</div>
\`\`\`

## 5. SLIDERS (regra crítica)
\`\`\`css
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #d1d5db;
  border-radius: 9999px;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  background: #efbf4e;
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
}
\`\`\`
- Track cinza neutro #d1d5db.
- Thumb dourado #efbf4e com borda branca 3px + shadow suave.

## 6. BOTÕES
- Primário: bg-[#efbf4e] text-zinc-900 font-sora font-bold uppercase text-sm py-3 px-6 rounded-xl hover:bg-[#d4a73d] transition.
- Secundário: bg-zinc-100 text-zinc-700 rounded-xl py-3 px-6.
- Tabs/pílulas (permitido aqui!): rounded-full px-4 py-2, ativo bg-[#efbf4e] text-zinc-900.

## 7. CAIXA DE RESULTADO
\`\`\`html
<div class="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-100">
  <p class="font-roboto text-xs uppercase tracking-wider text-gray-500 font-medium">Total acumulado</p>
  <p class="font-anek text-4xl font-bold text-[#B8860B] mt-2 tabular-nums">R$ 1.234.567</p>
  <p class="font-roboto text-sm text-zinc-500 mt-1">Em 10 anos com aporte de R$ 1.000/mês</p>
</div>
\`\`\`

## 8. EXEMPLO COMPLETO
\`\`\`html
<div class="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto border border-gray-100">
  <h3 class="font-anek text-[22px] font-semibold text-zinc-900 mb-1">Simulador de Juros Compostos</h3>
  <p class="font-roboto text-sm text-zinc-500 mb-6">Entenda o poder do tempo</p>

  <div class="space-y-4">
    <div class="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
      <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Aporte inicial</label>
      <div class="flex items-center">
        <span class="text-gray-400 mr-2">R$</span>
        <input type="number" value="10000" class="bg-transparent border-0 text-2xl font-anek font-bold text-gray-900 w-full focus:outline-none" />
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Prazo: <span class="text-[#B8860B] font-semibold">10 anos</span></label>
      <input type="range" min="1" max="30" value="10" class="w-full" style="accent-color: #efbf4e;" />
      <div class="flex justify-between text-xs text-gray-400 mt-1"><span>1 ano</span><span>30 anos</span></div>
    </div>
  </div>

  <div class="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-100">
    <p class="font-roboto text-xs uppercase tracking-wider text-gray-500 font-medium">Total acumulado</p>
    <p class="font-anek text-4xl font-bold text-[#B8860B] mt-2 tabular-nums">R$ 234.567</p>
  </div>

  <button class="w-full mt-6 bg-[#efbf4e] text-zinc-900 font-sora font-bold uppercase text-sm py-3 rounded-xl hover:bg-[#d4a73d] transition">Quero aprender mais</button>
</div>
\`\`\`

## 9. CHECKLIST
- [ ] Sem verde — apenas dourado e cinzas
- [ ] Slider com thumb dourado + borda branca 3px
- [ ] Valores em font-anek + tabular-nums + cor #B8860B
- [ ] Card pai bg-white + rounded-2xl + shadow suave
- [ ] Botões rounded-xl (aqui é permitido)`,

    plataforma: `Você atua como um Desenvolvedor Front-end Especialista. Gere o código (HTML e Tailwind) para uma Plataforma EAD da AUVP Escola seguindo EXATAMENTE as regras abaixo:

[REGRAS DA AUVP ESCOLA — PLATAFORMA DE AULAS / EAD]

## 0. CONTEXTO
- Plataforma onde o aluno consome aulas, lê materiais, acompanha progresso, interage em comunidade.
- Estética: limpa, clara, focada em leitura longa, sem fadiga visual. Pense Notion + Skool + Masterclass (light mode).
- ❌ NUNCA é o look "translúcido" da LP. Aqui é UI funcional sólida.

## 1. MODO CLARO PADRÃO (Light Mode Default)
- Body / fundo geral: bg-gray-50 (#F9FAFB).
- Cards / sidebars / painéis: bg-white com border border-gray-200.
- Divisores: border-gray-100.
- Hover de listas: bg-gray-50.

## 2. MODO ESCURO ALTERNATIVO (toggle opcional)
- Body: bg-zinc-950.
- Cards: bg-zinc-900 com border border-zinc-800.
- Divisores: border-zinc-800.
- Mesmas regras de identidade gold se mantêm.

## 3. TIPOGRAFIA
- Título de módulo: 'Anek Latin', 700, 24px, text-gray-900 (light) / text-white (dark).
- Título de aula: 'Anek Latin', 600, 18px, text-gray-900.
- Meta info (duração, status): 'Roboto', 400, 13px, text-gray-500.
- Descrição/conteúdo: 'Roboto', 400, 16px, text-gray-700, line-height 1.65.
- Breadcrumb / navegação: 'Roboto', 500, 14px, text-gray-600.

## 4. IDENTIDADE GOLD (uso pontual e estratégico)
- Cor primária: #efbf4e (ou tailwind text-yellow-500 / bg-yellow-500).
- Em fundo claro, prefira text-yellow-600 (#CA8A04) para contraste melhor.
- Aplicações:
  - Ícone de Play ativo: text-yellow-600.
  - Barra de progresso de vídeo: bg-[#efbf4e].
  - Aula em curso na playlist: bg-yellow-50 border-l-4 border-yellow-500.
  - Badge "Em andamento": bg-yellow-100 text-yellow-800.
  - Botão CTA de aula: bg-[#efbf4e] text-zinc-900 hover:bg-[#d4a73d].
- Aulas concluídas: ícone check em text-emerald-500.
- Aulas bloqueadas: ícone lock em text-gray-400.

## 5. VIDEO PLAYER (regra fixa)
- Container do vídeo: SEMPRE bg-black com aspect-video, mesmo no light mode.
- Controles: estilo dark sobre o vídeo, com gradiente from-black/80 to-transparent na parte inferior.
- Botão Play central: w-16 h-16 rounded-full bg-white/20 backdrop-blur com ícone branco.
- Barra de progresso: h-1 bg-white/20 com fill bg-[#efbf4e].
- Tempo: text-white text-xs font-mono.

## 6. PLAYLIST (sidebar de aulas)
\`\`\`html
<aside class="w-80 bg-white border-l border-gray-200 overflow-y-auto">
  <div class="p-4 border-b border-gray-200">
    <h3 class="font-anek text-lg font-bold text-gray-900">Módulo 1 — Fundamentos</h3>
    <p class="font-roboto text-xs text-gray-500 mt-1">8 aulas · 2h 15min</p>
  </div>

  <ul>
    <!-- Aula concluída -->
    <li class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
      <CheckCircle class="w-5 h-5 text-emerald-500 shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="font-anek font-semibold text-sm text-gray-900 truncate">O que é renda fixa</p>
        <p class="font-roboto text-xs text-gray-500">12:34</p>
      </div>
    </li>

    <!-- Aula em andamento -->
    <li class="flex items-center gap-3 px-4 py-3 bg-yellow-50 border-l-4 border-yellow-500 cursor-pointer">
      <PlayCircle class="w-5 h-5 text-yellow-600 shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="font-anek font-semibold text-sm text-gray-900 truncate">CDB, LCI e LCA na prática</p>
        <p class="font-roboto text-xs text-yellow-700">Assistindo · 4:21 / 18:00</p>
      </div>
    </li>

    <!-- Aula bloqueada -->
    <li class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 opacity-60">
      <Lock class="w-5 h-5 text-gray-400 shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="font-anek font-semibold text-sm text-gray-900 truncate">Tesouro Direto</p>
        <p class="font-roboto text-xs text-gray-500">15:20</p>
      </div>
    </li>
  </ul>
</aside>
\`\`\`

## 7. BARRA DE PROGRESSO DO MÓDULO
\`\`\`html
<div class="px-4 py-3 bg-white border-t border-gray-200">
  <div class="flex justify-between text-xs font-roboto text-gray-500 mb-2">
    <span>Progresso do módulo</span>
    <span class="font-semibold text-yellow-600">37%</span>
  </div>
  <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
    <div class="h-full bg-[#efbf4e] rounded-full transition-all" style="width: 37%"></div>
  </div>
</div>
\`\`\`

## 8. LAYOUT BASE DA TELA DE AULA
\`\`\`html
<div class="min-h-screen bg-gray-50">
  <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
    <!-- breadcrumb + logo + user -->
  </header>
  <main class="flex">
    <section class="flex-1 p-6">
      <div class="aspect-video bg-black rounded-xl overflow-hidden mb-6"><!-- player --></div>
      <h1 class="font-anek text-3xl font-bold text-gray-900">Título da aula</h1>
      <p class="font-roboto text-base text-gray-700 mt-4 leading-relaxed">Descrição...</p>
    </section>
    <aside class="w-80 bg-white border-l border-gray-200"><!-- playlist --></aside>
  </main>
</div>
\`\`\`

## 9. CHECKLIST
- [ ] Light mode é o default (bg-gray-50)
- [ ] Vídeo SEMPRE bg-black (mesmo em light mode)
- [ ] Aula em curso: bg-yellow-50 + border-l-4 border-yellow-500
- [ ] Concluída: text-emerald-500
- [ ] Bloqueada: opacity-60 + text-gray-400
- [ ] Tipografia Anek para títulos, Roboto para meta/corpo
- [ ] Gold #efbf4e em progressos e CTAs`,
  },
};

// Catálogos compartilhados — listam componentes do Design System que a IA pode invocar
// dentro do prompt gerado. Mantenha sincronizado com a sidebar de DesignSystem.tsx.
const componentCatalog = {
  institucional: `

## 10. CATÁLOGO COMPLETO DO DESIGN SYSTEM (use quando fizer sentido)

### Fundamentos
- **Marca & Logos**: assinatura oficial em SVG/PNG/PDF. Respeite safe zone e versão preferencial por marca.
- **Tipografia**: Anek Latin (títulos), Roboto (corpo/labels), Sora Bold 700 (EXCLUSIVO para botões/CTAs).
- **Cores**: paleta institucional + Data Viz (8 categóricas, 5 sequenciais, 3 divergentes) + tokens de status (success/warning/info/error).
- **Ícones**: Phosphor Icons (Regular padrão; Fill para estado ativo; Bold p/ ênfase; Duotone p/ decorativo).

### Layout & Estrutura
- **Layout & Espaçamento**: múltiplos de 15px, max-w-1200px, dobras alternadas.
- **Cards & Containers**: radius 12px, hover translateY(-2px), badges de destaque para fundos escuros.
- **Botões**: Primário, Outline, Ghost, Destrutivo. Sora Bold UPPERCASE — exclusivo para CTAs.

### Seções de Página (use como blocos de LP)
- **Grade Curricular** (abas pill-style + carrossel mobile)
- **Contagem Regressiva** (timer com cards de unidade)
- **FAQ / Dúvidas** (Accordion)
- **Tabela de Preços** (toggle individual/pacotes, badge de desconto)
- **Jornada do Herói** (timeline interativa com glow e progresso)
- **Widgets Flutuantes** — botão circular 64×64px (WhatsApp) ou 60×60px (secundário), \`border-radius: 50%\`, posicionado \`fixed bottom-5 right-5\` com \`z-index: 99999\`. WhatsApp: SVG OFICIAL (branco) dentro do círculo ocupando ~70%, fundo gradiente \`linear-gradient(135deg,#25D366,#128C7E)\`, \`drop-shadow(0 1px 2px rgba(0,0,0,0.25))\`, pulse elegante (\`waSoftPulse 12s\` no botão + anel \`waPulseRing 10.5s cubic-bezier(0.22,1,0.36,1)\`, escala suave 0.98→1.9). Secundário (ex.: Porquinho): mesmo padrão "ícone-dentro-do-círculo", animação \`floatPiggy 3s ease-in-out infinite\`, empilhado acima do WhatsApp com gap mínimo de 30px (bottom 110px). Balão de texto opcional: largura máx 220px, Anek Latin 15px, borda inferior-direita reta, transição \`opacity + translateY + scale\` com easing \`cubic-bezier(0.175,0.885,0.32,1.275)\`; modos suportados: sem balão / sempre visível (delay 1.5s) / hover / clique. NUNCA substitua o WhatsApp por ícone genérico de chat.
- **Calculadora de Rendimentos** (versão site/LP)
- **Calculadora de Juros Compostos** (versão ferramenta)

### Feedback & Overlays
- **Tooltips & Popups** (Roboto bold uppercase 11px), **Notificações/Toasts** (success/warning/info/error, auto-dismiss 4s),
  **Popconfirm**, **Spin (Loading)**, **Skeleton Avançado**, **Result** (sucesso/erro/403/404), **Empty** (estado vazio com CTA).

### Navegação
- **Drawer Multi-nível**, **Steps (Wizard)**, **Segmented**, **Anchor (Scroll Spy)**, **Tour** (onboarding com spotlight).

### Entrada de Dados
- **Upload com Preview**, **Rate (Avaliação)**, **AutoComplete**, **TreeSelect**, **Transfer**, **Mentions**, **Cascader**.

### Exibição de Dados
- **Statistic (KPIs)**, **Timeline** (linear, trilha horizontal e trilha vertical), **Tree**, **Descriptions** (\`<dl>\`),
  **Gráfico de Pizza** (donut, paleta Data Viz), **Watermark**.

⚠️ Use SOMENTE componentes desta lista. Se precisar de algo fora dela, descreva-o em comentário no código antes de criá-lo.`,

  ferramentas: `

## 10. CATÁLOGO COMPLETO PARA FERRAMENTAS

### Fundamentos aplicáveis
- **Tipografia**: Anek (títulos/valores), Roboto (labels/auxiliar), Sora Bold (botões).
- **Cores**: paleta da marca + tokens de status (success/warning/info/error) e Data Viz para gráficos.
- **Ícones**: Phosphor Regular padrão; Fill para estados ativos.

### Entrada (núcleo das ferramentas)
- **AutoComplete** (busca de ativos), **TreeSelect** (classes), **Transfer** (lista de ativos), **Cascader** (categorias),
  **Mentions** (notas), **Rate**, **Upload com Preview**.

### Exibição de Resultados
- **Statistic (KPIs)**: número principal com tabular-nums.
- **Gráfico de Pizza** (donut, cores Data Viz).
- **Timeline** (linear / trilha): cronograma de aportes ou eventos.
- **Descriptions**: detalhamento técnico do resultado.
- **Tree**: hierarquia de carteiras.
- **Empty / Result**: quando não há dados ou após calcular.

### Feedback durante o cálculo
- **Spin** (loading), **Skeleton Avançado**, **Notificações** (toasts com tokens de status),
  **Popconfirm** (resetar), **Tooltips & Popups** (dicas em campos).

### Navegação interna
- **Steps (Wizard)** multi-step, **Segmented** alternar visões, **Anchor (Scroll Spy)** para resultados longos,
  **Tour** para onboarding da ferramenta, **Drawer Multi-nível** para filtros avançados.

### Container & Layout
- **Cards & Containers** (radius 12px, baixo contraste com a dobra).
- **Layout & Espaçamento** em múltiplos de 15px.
- **Botões** Sora Bold UPPERCASE.

### Calculadora de Juros Compostos
- Padrão de referência: Calculadora AUVP com slider thumb na cor da marca.

⚠️ Combine 2-4 desses componentes. Não invente novos sem necessidade.`,

  plataforma: `

## 10. CATÁLOGO COMPLETO DA PLATAFORMA EAD

### Específicos da Plataforma (AUVP Escola)
- **Visualização de Cursos** (grid), **Video Player**, **Lista de Aulas (Playlist)**, **Dashboard do Aluno**,
  **Notas & Anotações**, **Avaliação de Aulas**, **Certificados**, **Comunidade & Dúvidas**.

### Fundamentos aplicáveis
- **Tipografia** (Anek/Roboto/Sora), **Cores** (paleta Escola + tokens de status), **Ícones** Phosphor,
  **Layout & Espaçamento** (múltiplos de 15px), **Cards & Containers** (radius 12px), **Botões** Sora Bold.

### Componentes globais reutilizáveis aqui
- **Statistic** (progresso, horas assistidas), **Timeline** (cronograma do curso, trilha vertical p/ jornada),
  **Steps** (módulos), **Tree** (estrutura hierárquica), **Descriptions** (metadados da aula),
  **Empty** (sem aulas), **Result** (curso concluído), **Tour** (onboarding do aluno),
  **Segmented** (filtros), **Anchor** (navegação dentro de aula longa),
  **Tooltips & Popups**, **Notificações** (tokens success/warning/info/error),
  **Skeleton Avançado**, **Spin**, **Popconfirm**,
  **AutoComplete** (busca), **Rate** (avaliar aula), **Mentions** (comentários),
  **Upload com Preview** (envio de exercícios), **Cascader** / **TreeSelect** (filtros hierárquicos),
  **Transfer** (organizar playlists), **Watermark** (proteção de vídeo),
  **Gráfico de Pizza** (distribuição de progresso/categoria).

⚠️ Mantenha sempre a hierarquia: Player → Conteúdo → Playlist. Componentes auxiliares são satélites.`,
};

export function AIFood() {
  const { brand } = useBrand();
  const { view } = useSystemView();
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const base = aiPrompts[brand]?.[view];
    if (!base) return "Prompt não disponível para esta combinação.";
    const catalog = componentCatalog[view as keyof typeof componentCatalog] ?? "";
    return base + catalog;
  }, [brand, view]);

  const brandLabel = brand === "capital" ? "AUVP Capital" : "AUVP Escola";

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
            <h2 className="text-2xl font-bold font-anek">AI-Food (Prompt Builder)</h2>
          </div>
        </div>
        <p className="text-muted-foreground font-roboto leading-relaxed max-w-3xl">
          Este espaço gera automaticamente um Master Prompt para a IA baseado na{" "}
          <strong className="text-foreground">{brandLabel}</strong> e na visão de{" "}
          <strong className="text-foreground">{viewLabels[view]}</strong> ativa.
        </p>
      </div>

      {/* Prompt Display */}
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
          <span className={`text-[10px] font-bold uppercase tracking-widest font-roboto ${brand === "capital" ? "text-[#22c55e]/70" : "text-[#efbf4e]/70"}`}>
            {brandLabel}
          </span>
          <span className="text-[#334155]">•</span>
          <span className={`text-[10px] font-bold uppercase tracking-widest font-roboto ${brand === "capital" ? "text-[#22c55e]/70" : "text-[#efbf4e]/70"}`}>
            {viewLabels[view]}
          </span>
        </div>

        {/* Prompt content */}
        <div className="p-6 pt-2 overflow-x-auto">
          <pre className={`whitespace-pre-wrap font-mono text-[13px] leading-relaxed min-h-[400px] ${brand === "capital" ? "text-[#4ade80] selection:bg-[#4ade80]/30 selection:text-white" : "text-[#fbbf24] selection:bg-[#fbbf24]/30 selection:text-white"}`}>
            {prompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
