# CLAUDE.md — Central de Produto AUVP

Guia de navegação para IAs. Leia este arquivo antes de explorar o repositório.

## O que é este projeto

SPA React + TypeScript implantada no GitHub Pages (`/central/`). É uma intranet da AUVP Capital com as seções principais: Design System, Time, Tom e Voz, Nossas Soluções (guia dos produtos, ex-Projeto Delta), Escola e Roadmap.

## Entry points

| Arquivo | Papel |
|---------|-------|
| `src/App.tsx` | Roteador (React Router v6) + todos os providers |
| `src/main.tsx` | Mount do React |
| `src/index.css` | CSS global + variáveis de tema (HSL) |
| `index.html` | HTML base do Vite |
| `vite.config.ts` | Base path `/central/` para GitHub Pages |

## Onde está cada coisa

```
src/pages/          → Uma página por rota (Hub, DesignSystem, TimePage, etc.)
src/components/ui/  → Componentes base shadcn/ui — NÃO editar diretamente
src/components/widgets/ → Componentes customizados AUVP
src/components/GlobalNav.tsx → Navegação global responsiva
src/components/TeamPhoto.tsx → Âncora única das fotos de colaborador
src/components/ProdutosFisicos.tsx → Card e filtro de categorias dos produtos físicos
src/components/widgets/RoadmapTimeline.tsx → Trilha em onda do Hub (dados em src/data/roadmapMarcos.ts)
src/components/PageHero.tsx → Hero padrão de todas as páginas (ícone, título, descrição, ações)
src/components/VoltarParaCentral.tsx → Atalho de volta ao Hub das sub-páginas
src/contexts/       → ThemeContext, BrandContext, ViewContext, CarecaContext
src/assets/team/    → Fotos dos colaboradores (importadas via Vite ?url)
src/assets/team/careca/ → Versões careca (Modo Megabrain), mesmo enquadramento
src/assets/team.ts  → Exporta as fotos como URLs
src/assets/produtos-fisicos/ → Fotos dos brindes/produtos físicos (WebP otimizado)
src/assets/produtosFisicos.ts → Exporta as fotos como URLs (chave = slug)
src/assets/novidades/ → Capas próprias das entregas do Mural (WebP, paisagem)
src/assets/novidades.ts → Exporta as capas como URLs (chave = destaque.imagem)
src/assets/olhos.ts → Logos SVG
src/lib/utils.ts    → cn() e publicUrl()
public/             → Assets estáticos (SVGs dos logos, 404.html)
PRODUTOS FÍSICOS TRATADOS/ → Mockups tratados dos produtos físicos (fonte do catálogo)
docs/fotos-originais/ → Fotos originais em alta resolução (não usadas no build)
docs/fotos-originais/produtos-fisicos/ → Fotos originais (sem tratamento) dos produtos físicos
archive/v2-design-system/ → Iteração anterior do projeto (inativa)
```

## Rotas

```
/               → src/pages/Hub.tsx
/design-system  → src/pages/DesignSystem.tsx   (página maior: 1741 linhas)
/time           → src/pages/TimePage.tsx
/tom-e-voz      → src/pages/TomEVozPage.tsx
/solucoes       → src/pages/SolucoesPage.tsx  (Nossas Soluções — dados em src/data/solucoes.ts)
/escola         → src/pages/EscolaPage.tsx
/roadmap        → src/pages/RoadmapPage.tsx
/novidades      → src/pages/NovidadesPage.tsx
/produtos-fisicos → src/pages/ProdutosFisicosPage.tsx  (catálogo completo — dados em src/data/produtosFisicos.ts)
*               → src/pages/NotFound.tsx
```

## Padrões importantes

**Referenciar assets em `/public`** — sempre usar `publicUrl()`:
```tsx
import { publicUrl } from "@/lib/utils";
<img src={publicUrl("/olho-branco.svg")} />
```
Sem isso, o path quebra no GitHub Pages (base `/central/`).

**Alias `@/`** aponta para `src/`. Use em todos os imports internos.

**Componentes base** (`src/components/ui/`) são gerados pelo shadcn/ui CLI. Não editar manualmente — use a CLI para adicionar/atualizar: `npx shadcn@latest add <component>`.

**Tema dark/light** — `ThemeContext` aplica a classe `dark` no `<html>` e persiste em `localStorage` como `auvp-theme`. O `index.html` lê isso antes do React montar para evitar flash.

**Hero das páginas** — toda página de conteúdo abre com `<PageHero>` passado pela prop `hero` do `PageShell`. É o que mantém Nosso Time, Design System, Tom e Voz, Nossas Soluções, Novidades e Produtos Físicos com a mesma cara. Sub-páginas do Hub (que não aparecem na navegação global) passam `actions={<VoltarParaCentral />}`.

**Marca** — `BrandContext` alterna entre `capital` e `escola`. A classe é aplicada no `<html>`. Componentes na pasta `widgets/` podem ter variantes por marca.

**Fotos do time** — sempre renderizar com `<TeamPhoto id="raul" alt="…" />` (`src/components/TeamPhoto.tsx`). É a âncora única: garante o mesmo enquadramento (`object-cover object-top`) em todos os ambientes e faz o Modo Megabrain trocar a foto em todos eles ao mesmo tempo. Não importe `teamPhotos`/`teamPhotosCareca` (nem uma foto solta de `src/assets/`) direto numa tela — foto fora da âncora fica inconsistente entre os modos.

As URLs em si continuam vindo de `src/assets/team.ts` (normal) e `src/assets/team/careca/` (Megabrain). Ao adicionar uma foto nova, gere a versão careca no **mesmo enquadramento e mesmo tamanho** (640×640) da original.

O mapa `MEMORIAM`, no mesmo arquivo, marca quem é homenageado: no hover a foto fica em preto e branco e a homenagem aparece por cima. Como mora na âncora, vale para o Hub, /time (grade, organograma e popover) e Tom e Voz de uma vez só.

**Trilha do roadmap (Hub)** — os marcos vêm de `src/data/roadmapMarcos.ts` e ocupam, no Hub, o lugar que antes era do calendário. A maior parte das datas sai das Atualizações da Escola (`src/data/novidades.ts`), que é o registro mês a mês do que foi entregue; marcos sem registro por lá levam `dataAssumida: true` (a estimativa fica no comentário do item e a interface mostra "data aproximada"). A ordem na onda vem do campo `data`, e cada marco cai numa crista (cartão acima) ou num vale (cartão abaixo) conforme o índice — não há posição manual. A agenda de eventos (`src/data/eventos.ts`) continua viva na exportação `.ics` da Command Palette.

**Métricas (Microsoft Clarity)** — `src/lib/clarity.ts` carrega o script e expõe a API; `src/components/ClarityTracker.tsx` (dentro do Router e dos providers) alimenta as variáveis de sessão: `pagina`, `rota`, `tema`, `marca` e `megabrain`, mais um pseudônimo estável (`pirata-xxxxxxxx`) guardado em `localStorage`. O ID do projeto é público e fica versionado no código; `VITE_CLARITY_PROJECT_ID` é override opcional. **Só liga em produção** — dev e preview local ficam de fora para não sujar as métricas. Para etiquetar algo novo, use `clarityTag`/`clarityTags` no lugar de chamar `window.clarity` direto.

**Mural de Novidades** — `src/data/novidades.ts` é o registro mês a mês, do mais recente para o mais antigo, e alimenta duas telas: `/novidades` mostra o histórico inteiro, e o carrossel do Hub mostra só os itens marcados com `destaque`. O carrossel varre **todos** os meses, não um período fixo — para promover uma entrega, basta acrescentar `destaque: {}` ao item; `titulo` e `descricao` dentro dele são opcionais e servem para dar ao card do Hub uma copy mais curta que a da edição do mês. `destaque.imagem` é procurada primeiro em `novidadeArtes` (`src/assets/novidades.ts` — capa própria da entrega) e depois em `lpScreenshots` (`src/assets/lps.ts` — screenshot da LP do produto); sem ela o card usa o painel da marca em vez de emprestar a screenshot de outro produto. As duas famílias de arte são renderizadas de formas diferentes no carrossel: a screenshot de LP é alta e preenche o painel recortada pelo topo, enquanto a capa é paisagem, tem título centralizado e aparece inteira sobre um fundo desfocado dela mesma. Capa nova: gere o WebP (largura máxima 960px) em `src/assets/novidades/` e registre a chave em `src/assets/novidades.ts`. `envolvidos` credita quem assinou a entrega e aparece nas duas telas.

**Produtos físicos** — o catálogo vem de `src/data/produtosFisicos.ts` e espelha a pasta `PRODUTOS FÍSICOS TRATADOS/`: cada item tem um mockup tratado correspondente. As fotos são exportadas por `src/assets/produtosFisicos.ts` (mesma ideia do time). Para incluir um produto:

1. adicione o mockup tratado em `PRODUTOS FÍSICOS TRATADOS/`;
2. gere o WebP em 900×1200 (3:4, recorte `cover` — a foto preenche o card inteiro) em `src/assets/produtos-fisicos/<slug>.webp`;
3. registre o item no `catalogo` de `src/data/produtosFisicos.ts` com o mesmo slug.

Os quatro primeiros itens do catálogo são os destaques exibidos no Hub (`PRODUTOS_FISICOS_DESTAQUE`); o resto aparece em `/produtos-fisicos`. Card e filtro de categorias são compartilhados via `src/components/ProdutosFisicos.tsx`. Os originais sem tratamento ficam em `docs/fotos-originais/produtos-fisicos/` e não entram no build.

**Catálogo de menus (Design System)** — `src/components/widgets/MenusSuperiores.tsx` e `src/components/widgets/MenusLaterais.tsx` reúnem seis modelos de menu superior e seis de menu lateral, cada um num `ComponentShowcase` próprio, nas seções `/design-system#menus-superiores` e `#menus-laterais`. São modelos **independentes** (institucional, mega menu de catálogo, barra flutuante, portal em duas linhas, pílula deslizante, busca protagonista; documentação, editorial escura, trilho de ícones, workspace recolhível, drawer sobreposto, árvore de referência) — existem para a liderança escolher um ou dois, não para serem variações de um mesmo componente. Os modelos escuros por decisão de estilo (barra flutuante e editorial) usam cores literais (`bg-[#09090b]`, `text-[#a1a1aa]`) em vez de `bg-zinc-950`/`text-zinc-400`: as travas de contraste de `.dark` no `src/index.css` neutralizam as classes hardcoded da paleta Tailwind e apagariam a superfície escura no tema escuro.

**Produto com frente e verso** — quando o produto tem os dois lados desenhados (a caneca AUPO11 é o caso), o card vira a foto em 3D: a frente fica em repouso e o verso aparece no hover. Não há campo novo em `src/data/produtosFisicos.ts` para isso: basta registrar o segundo WebP na chave `<slug>-verso` em `src/assets/produtosFisicos.ts` (mesmo 900×1200 da frente) que `produtosFisicos` resolve o `imgVerso` e o card liga a virada sozinho. Fora do mouse a virada continua acessível: um botão cobre a foto e vira no clique (toque) e no foco (teclado), com o selo "Frente"/"Verso" no canto indicando o lado visível.

## Como adicionar uma nova página

1. Criar `src/pages/NovaPagina.tsx`
2. Importar e registrar rota em `src/App.tsx`
3. Adicionar link em `src/components/GlobalNav.tsx` (sistemas principais) ou só em
   `src/components/CommandPalette.tsx` (sub-páginas do Hub, como `/novidades` e
   `/produtos-fisicos`)

## Como adicionar um widget ao Design System

1. Criar componente em `src/components/widgets/NomeWidget.tsx`
2. Importar e adicionar em `src/pages/DesignSystem.tsx` dentro de um `<ComponentShowcase>`

## Pull Requests

Todo PR deve ser escrito **em português**: título, descrição e comentários. Isso inclui PRs gerados por IA.

## Build e deploy

```bash
npm run dev          # dev server em localhost:8080
npm run build        # build de produção
npm run test         # testes (Vitest)
npm run lint         # ESLint
```

Deploy automático: push em `main` → GitHub Actions → GitHub Pages.

## O que NÃO está no build

- `docs/fotos-originais/` — fotos de alta resolução do time e dos produtos físicos (master, não usadas no app)
- `PRODUTOS FÍSICOS TRATADOS/` — mockups tratados em PNG (master do catálogo; o app usa os WebP derivados)
- `archive/v2-design-system/` — projeto Lovable.dev anterior (inativo)
