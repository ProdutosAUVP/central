# Integração Claude Code ↔ Figma

Passo a passo para transformar o design system documentado neste repositório
num arquivo Figma, rodando o Claude Code **localmente no terminal**.

---

## 0. Por que precisa ser local

Duas restrições, nesta ordem:

1. **Escrever no Figma só acontece de dentro do Figma.** A REST API do Figma é
   somente leitura para o conteúdo de arquivos — ela lê o JSON do documento,
   comentários, variáveis e webhooks, mas **não cria nem modifica nós no
   canvas**. O único caminho de escrita é a Plugin API, e é exatamente ela que
   o **MCP server do Figma** expõe através do recurso *write to canvas*.
2. **O MCP roda junto do processo do Claude Code.** A conexão e o OAuth ficam
   presos à máquina onde o `claude` está executando. Numa sessão de nuvem não
   há browser para o callback do OAuth, e a política de rede do container
   bloqueia `figma.com` inteiro (o `CONNECT` volta 403 antes de qualquer
   autenticação).

O repositório estar no GitHub é irrelevante — o Claude Code sempre trabalha
sobre uma cópia local, aqui obtida com `git clone`.

---

## 1. Preparar a máquina

```bash
git clone https://github.com/ProdutosAUVP/central
cd central
git checkout claude/claude-figma-integration-5oyu69
npm install
```

Confirme que você **não** está numa sessão de nuvem:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://mcp.figma.com/mcp
```

- Resposta com código HTTP real (`400`, `401`, `405`) → está local, siga.
- `000` com `CONNECT tunnel failed` → ainda é sessão remota, pare aqui.

Abra o Claude Code na raiz do projeto:

```bash
claude
```

---

## 2. Conectar o MCP do Figma

Dentro da sessão:

```
/plugin install figma@claude-plugins-official
```

Ou, pelo terminal, antes de abrir o `claude`:

```bash
claude plugin install figma@claude-plugins-official
```

O plugin traz as configurações do MCP server e as Agent Skills dos fluxos
comuns. Depois:

```
/mcp
```

Selecione `figma` → **Authenticate**. Abre o browser, você autoriza, volta.
O servidor deve aparecer como **connected**.

> Alternativa sem plugin, apontando direto no servidor remoto:
> `claude mcp add --transport http figma https://mcp.figma.com/mcp`

### Preparar o destino

1. Abra o Figma (desktop ou browser) e **crie o arquivo de destino** — ex.
   `AUVP · Design System`.
2. Deixe esse arquivo aberto e em foco. O *write to canvas* escreve no arquivo
   ativo, então trocar de aba no meio do processo escreve no lugar errado.
3. Crie as páginas vazias que vão receber o conteúdo:
   `01 Tokens`, `02 Componentes`, `03 Widgets`, `04 Telas`.

---

## 3. Fase A — Tokens → Figma Variables

**Esta fase vem primeiro e não é opcional.** Se os componentes forem criados
antes das variáveis, cada cor entra hardcoded e o arquivo nasce impossível de
manter.

### 3.1 Extrair os tokens do CSS

```bash
node scripts/figma/extract-tokens.mjs
```

Gera `docs/figma/design-tokens.json` a partir de `src/index.css`. São **67
tokens** (62 cores, 4 strings de fonte, 1 número), cada um com o valor nos
**quatro modos** de marca × tema:

| Modo | Seletor no CSS |
|---|---|
| `capital-light` | `:root` |
| `escola-light` | `:root` + `.escola` |
| `capital-dark` | `:root` + `.dark` |
| `escola-dark` | `:root` + `.escola` + `.dark` + `.dark.escola` |

O script aplica a cascata: cada bloco do CSS só carrega o que sobrescreve, e o
JSON entrega o conjunto **completo** de cada modo. As cores saem convertidas de
HSL para hex (o Figma não aceita a notação HSL crua do Tailwind) e o campo
`css` preserva o valor original para conferência.

Ficam de fora, de propósito: `--cubo-produto-*` (tokens de um widget só, não do
sistema) e `--sol-*` (as cores por solução, que vivem em bloco próprio).

### 3.2 Criar a coleção no Figma

Prompt para o Claude:

> Leia `docs/figma/design-tokens.json`. No arquivo Figma aberto, crie uma
> coleção de variáveis chamada `AUVP Design Tokens` com os quatro modos
> `capital-light`, `escola-light`, `capital-dark`, `escola-dark`.
>
> Organize as variáveis em grupos por prefixo: `color/base` (background,
> foreground, card, popover, border, input, ring), `color/brand` (primary,
> secondary, accent, brand, cta, incluindo os `-emphasis` e `-foreground`),
> `color/status` (success, warning, info, error, destructive),
> `color/chart` (chart-1..8, chart-seq-*, chart-div-*), `color/sidebar`,
> `number` (radius) e `string` (as fontes).
>
> Use o campo `valor` de cada modo. Não crie nada hardcoded fora da coleção.
> Ao terminar, liste quais tokens não foram criados e por quê.

> ⚠️ **Plano do Figma.** Quatro modos por coleção exige plano **Professional**
> ou superior. No Starter cada coleção aceita só 1 modo — nesse caso, crie
> quatro coleções separadas e troque a coleção em vez do modo. Verifique o
> plano antes de começar, senão a fase falha no meio.

### 3.2.1 O que já foi criado

Arquivo de destino: **DESIGN SYSTEM AUVP** — `fileKey` `P4tAGZvCMXzY6d5ovKIyNQ`. O plano do
arquivo é Professional, então os quatro modos couberam numa coleção só.

A coleção `AUVP Design Tokens` tem os **67 tokens** distribuídos em `color/base` (11),
`color/brand` (17), `color/status` (10), `color/chart` (16), `color/sidebar` (8),
`color/effect` (1), `number` (1) e `string` (3). Cada variável leva `scopes` restritos —
`TEXT_FILL` nos `-foreground`, `STROKE_COLOR` em `border`/`input`/`ring`, `FONT_FAMILY` nas
fontes, `CORNER_RADIUS` no radius — e o code syntax `var(--token)`, que faz o Dev Mode
apontar de volta para o nome real no `src/index.css`.

Duas coisas que o CSS obrigou a decidir na hora de criar as variáveis:

- **`--spotlight` não existe em `:root`.** O valor de `capital-light` veio do bloco `.light`
  (`transparent`); nos dois modos escuros, o alias `hsl(var(--primary) / 0.07)` foi resolvido
  à mão para a cor de `--primary` **daquele modo** com alpha 0,07. Alias de variável no Figma
  não carrega opacidade, então o token virou cor literal com alpha em vez de referência.

- **`.light.escola` diverge da cascata em dois tokens.** `--card-foreground` e
  `--popover-foreground` valem `110 78% 9%` (o verde da Capital) em `:root` + `.escola`, mas
  `220 15% 15%` (o cinza da Escola) em `.light.escola`. O Figma seguiu a cascata, que é o que
  a aplicação mostra por padrão. Tem cara de correção que nunca voltou para o bloco `.escola`
  — vale confirmar com quem escreveu antes de mexer.

> Os blocos `.light` e `.light.escola` (linhas 797 e 855) são **parciais**: existem para forçar
> tema claro dentro de uma página escura e não redeclaram fontes, radius nem a sidebar. Por isso
> o extrator continua lendo `:root` como base do modo claro. O segundo bloco `.dark` (linha 706)
> só define `--cubo-*`, que está fora do sistema de propósito.

### 3.3 Tipografia

As três famílias são Google Fonts e existem nativamente no Figma:
`Anek Latin` (display), `Roboto` (corpo), `Sora` (interface, usada nos botões).

> Crie os text styles a partir da escala tipográfica da página
> `/design-system`, nomeando `display/*`, `body/*` e `ui/*` conforme a família.

---

## 4. Fase B — Componentes base → Figma Components

Aqui o objetivo é **component com variantes de verdade**, não print de tela.

Nove componentes deste repositório declaram variantes via `cva` e são os
candidatos naturais: `button`, `badge`, `alert`, `label`, `toggle`,
`navigation-menu`, `sheet`, `sidebar`, `toast`.

Comece pelo `button`, que é o mais denso — **8 variantes × 5 tamanhos**:

| | |
|---|---|
| `variant` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `cta`, `cta-inverted` |
| `size` | `default` (h-40), `sm` (h-36), `lg` (h-48), `xl` (h-56), `icon` (40×40) |

Prompt:

> Leia `src/components/ui/button.tsx`. As variantes estão no `cva`, com as
> classes Tailwind resolvidas pelos tokens de `src/index.css`.
>
> Crie no Figma um Component Set `Button` com as propriedades `variant`
> (8 valores) e `size` (5 valores), mais uma propriedade booleana `disabled`.
>
> Regras:
> - Auto layout horizontal, `gap: 8`, alinhamento central.
> - Altura e padding conforme o `size`; `rounded-[5px]` → corner radius 5.
> - Fonte Sora, semibold, uppercase.
> - **Toda cor referenciando a variável correspondente da coleção
>   `AUVP Design Tokens`** — nunca um hex solto. `bg-primary` →
>   `color/brand/primary`, `text-primary-foreground` →
>   `color/brand/primary-foreground`, e assim por diante.
> - `disabled` = opacidade 50%.
>
> Ignore os estados de `hover` — o Figma não os representa em variantes. Se
> quiser documentá-los, crie uma propriedade `state` separada em vez de
> misturar com `variant`.

Repita para os demais, um por vez. **Não peça os nove de uma vez** — a
qualidade cai e fica caro de corrigir depois.

Ao final de cada componente, valide:

```
Liste todas as cores do Component Set que NÃO estão ligadas a uma variável.
```

---

## 5. Fase C — Widgets complexos via code-to-canvas

Os 61 `ComponentShowcase` de `src/pages/DesignSystem.tsx` e os widgets de
`src/components/widgets/` (menus, plataforma, tabela de preços, jornada) não
compensam reconstruir à mão. Para eles, use o caminho **web → Figma**, que
envia a interface renderizada como camadas editáveis.

### 5.1 Subir o dev server

```bash
npm run dev   # localhost:8080
```

### 5.2 Usar os snippets já isolados

`src/components/widgets/html-snippets/` já tem **21 arquivos HTML standalone** —
são a melhor entrada possível, porque não trazem o cromo da página:

```
checkbox.html          choicebox.html         jornada-heroi.html
livro-*.html (7)       marca-logos.html       tabela-precos.html
plataforma-*.html (7)
```

Prompt:

> Suba `src/components/widgets/html-snippets/tabela-precos.html` num preview
> local com os tokens de `src/index.css` aplicados, e envie para a página
> `03 Widgets` do Figma como camadas editáveis. Depois, ligue as cores às
> variáveis de `AUVP Design Tokens` onde houver correspondência exata.

### 5.3 Para o resto, criar uma rota de captura

A `/design-system` tem 1741 linhas e muito cromo em volta. Vale criar uma rota
temporária que renderiza **um** showcase por vez, fundo neutro, sem nav:

```
Crie uma rota /captura/:secao que renderiza só o ComponentShowcase daquele id,
sem GlobalNav e sem PageHero, com padding 48px e fundo var(--background).
```

Aí a captura fica limpa e você percorre os ids seção por seção (`buttons`,
`form-inputs`, `cards-containers`, `menus-superiores`, `steps`, …).

> Lembre de **não commitar** a rota de captura, ou de deixá-la fora do build.

---

## 6. Validação antes de fechar

```
No arquivo Figma, faça um relatório:
1. Quantas cores estão hardcoded (não ligadas a variável) e onde.
2. Quais componentes do repositório ainda não têm equivalente no Figma.
3. Para cada Component Set, se as variantes batem com o cva de origem.
```

Teste a troca de modo no Figma (capital ↔ escola, light ↔ dark). Se algum
elemento não muda junto, é cor hardcoded — volte e ligue à variável.

---

## 7. Commit

```bash
git add docs/figma scripts/figma
git commit -m "docs: guia e extrator de tokens para a integração com o Figma"
git push -u origin claude/claude-figma-integration-5oyu69
```

O arquivo Figma em si vive no Figma; o que fica versionado aqui é o extrator,
o JSON de tokens e este guia.

---

## 8. V2 — bidirecional

Fica para depois, mas o caminho existe e vale desenhar já:

**Código → Figma (tokens).** Rodar o extrator no CI e pedir ao agente que
atualize as variáveis quando `src/index.css` mudar. Se a AUVP tiver plano
**Enterprise**, dá para automatizar de verdade pela REST API de variáveis
(`POST /v1/files/:key/variables`) — é o único endpoint de escrita real da API,
e é exclusivo desse plano.

**Figma → código (tokens).** Sem Enterprise, a alternativa madura é o plugin
**Tokens Studio**, que sincroniza tokens com um repositório GitHub nos dois
sentidos e não depende do plano do Figma.

**Componentes.** O **Figma Code Connect** mapeia cada componente do Figma para
o componente real do repositório, de forma que o Dev Mode mostre o código de
verdade (`<Button variant="cta">`) em vez de CSS gerado. É o que fecha o ciclo
sem tentar gerar React a partir do desenho — direção que, na prática, produz
código descartável.

**O que não tentar:** manter o Figma como fonte da verdade e gerar
`src/components/ui/*` a partir dele. Os componentes aqui são shadcn/ui com
Radix por baixo, com comportamento de acessibilidade que nenhum desenho
carrega. O Figma deve ser espelho do código, não origem.

---

## Limites conhecidos

- **REST API não escreve no canvas.** Todo caminho de escrita passa pelo MCP
  server ou por um plugin.
- **Estados não existem em variante.** `hover`, `focus` e `active` do `cva` não
  têm representação nativa; documente-os como propriedade separada ou em nota.
- **`.dark` com `!important`.** As travas de contraste em `src/index.css`
  (linhas 436-483) reescrevem classes hardcoded no tema escuro. Componentes que
  dependem delas vão parecer diferentes na captura e no app — confira o dark
  manualmente.
- **Write to canvas está em beta** e é gratuito durante o período; a Figma já
  sinalizou que será cobrado por uso depois.
