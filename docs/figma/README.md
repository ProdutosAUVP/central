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

### 4.1 O que já foi criado

Os nove componentes com `cva` viraram Component Sets, cada um na sua página, mais uma
família de ícones que o guia original não previa:

| Componente | Eixos | Variantes | Propriedades |
|---|---|---|---|
| `Button` | variant × size | 40 | `Label`, `Icon`, `Mostrar icone` |
| `Badge` | variant | 4 | `Label` |
| `Alert` | variant | 2 | `Title`, `Description`, `Icon` |
| `Toggle` | variant × size × state | 12 | `Label` |
| `Label` | — | 1 | `Label` |
| `Navigation Menu Trigger` | state | 3 | `Label` |
| `Sheet` | side | 4 | — |
| `Toast` | variant | 2 | `Title`, `Description`, `Fechar` |
| `Sidebar Menu Button` | variant × size | 6 | `Label`, `Icon` |
| `Icon` | name | 10 | — |

Auditoria final: **291 nós inspecionados, nenhuma cor fora de variável.**

Três correções ao que o guia assumia:

- **`label` e `navigation-menu` não têm eixos no `cva`.** O de `label` é só a classe base
  `text-sm font-medium leading-none`, então virou componente simples em vez de Component Set.
  Em `navigation-menu`, o `navigationMenuTriggerStyle` também não declara variantes — o eixo
  `state` que criei vem dos `data-attributes` (`data-active`, `data-state=open`), não do `cva`.

- **`sidebar` expõe as variantes do menu button**, não da sidebar inteira. O Component Set
  chama-se `Sidebar Menu Button` para não prometer o que não entrega.

- **`disabled` não virou propriedade booleana.** Propriedade booleana no Figma só controla
  visibilidade de camada; não aplica os 50% de opacidade de `disabled:opacity-50`. Representá-lo
  exigiria um terceiro eixo de variante (80 combinações no Button). Ficou documentado na página.

**Ícones.** O set `Icon` traz os dez glifos do `lucide-react` mais usados no código (`Check`,
`ChevronRight`, `ChevronDown`, `ChevronLeft`, `X`, `ArrowRight`, `Circle`, `Search`, `Info`,
`AlertTriangle`), com os paths reais da biblioteca em 16×16. Button, Alert, Toast e Sidebar
consomem por `INSTANCE_SWAP`, e o traço de cada instância segue o token de texto da variante —
sem isso o ícone herda `--foreground` e some sobre os fundos escuros.

> Detalhe de API que custou uma tentativa: o `defaultValue` de uma propriedade `INSTANCE_SWAP`
> é o **node id** do componente (`"21:5"`), não a `key`. Passar a `key` devolve
> `Property value is incompatible with component property type`.

> Outro: instância invisível não expõe `children`, e `query`/`findAll` a ignoram. Para pintar o
> ícone das variantes onde ele nasce oculto é preciso torná-lo visível, aplicar e ocultar de novo.

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

### 5.4 Estado da Fase C e como retomar

Sete widgets estão na página `03 Widgets` do arquivo: `plataforma-dashboard`,
`plataforma-cursos`, `plataforma-comunidade`, `plataforma-notas`, `plataforma-player`,
`plataforma-playlist` e `checkbox`. Faltam treze.

**O preview é obrigatório.** Rode `node scripts/figma/build-preview.mjs` antes de capturar:
onze snippets usam `hsl(var(--token))` e nenhum declara `:root`, então abertos direto eles
renderizam com cor inválida. Com os tokens injetados, a captura liga sozinha cerca de **65%**
das cores às variáveis da coleção — foram 82 de 126 pinturas no primeiro widget.

**Capture pela barra de ferramentas, não pela automação.** Depois da primeira captura o script
deixa uma barra na página com um botão de recapturar que gera ID novo sozinho. Navegando pelo
índice em `http://localhost:8080/central/_figma-preview/` você vê na hora se o widget
renderizou certo antes de mandar, e não depende de polling.

**O que falha.** O `choicebox` não passa: três tentativas, três `A solicitação expirou` na
barra. Provavelmente precisa ser refeito à mão. Outras capturas travam em `pending` ou
`processing` indefinidamente — quando isso acontece, o caminho é gerar um ID novo e repetir,
não continuar sondando. Fechar a aba no meio mata a captura em voo.

**Confira antes de mandar.** Nem todo snippet renderiza sozinho. Foi assim que se descobriu
que a família livro-* dependia de um CSS em arquivo separado — o `livro-base` tinha virado um
frame vazio no Figma e o `livro-default`, uma linha de texto solta.

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

## 8. Sincronização entre código e Figma

O que dá para automatizar depende do plano do Figma, e vale entender a divisão
antes de confiar em qualquer coisa.

**A REST API de variáveis do Figma — ler e escrever — é exclusiva do plano
Enterprise.** A AUVP está no **Pro**. Ou seja: nenhum CI consegue falar com as
variáveis do arquivo. O caminho que funciona no Pro é a Plugin API, que só roda
dentro do Figma — na prática, via MCP numa sessão do Claude Code.

Por isso a sincronia é dividida em duas metades, e só uma é automática:

| Metade | Como | Automatizável? |
|---|---|---|
| `src/index.css` → `design-tokens.json` | `npm run figma:tokens` | ✅ CI, sem rede |
| `design-tokens.json` ↔ Figma | MCP + snippet | ❌ precisa de sessão com o Figma |

A ponte entre as duas é um **hash canônico**: os dois lados serializam os
tokens no mesmo formato e reduzem a um número. Números iguais, lados
sincronizados. O hash fica gravado no próprio `design-tokens.json`.

### 8.1 A metade automática

```bash
npm run figma:check
```

Regenera os tokens a partir do CSS em memória e compara com o JSON commitado.
Se alguém mexer em `src/index.css` sem rodar o extrator, isso falha e diz
exatamente quais tokens e em que modo:

```
✗ docs/figma/design-tokens.json está defasado — 4 divergência(s):
   ~ --radius [capital-light] — CSS diz 14.4, JSON diz 12
```

Roda no CI pelo workflow `.github/workflows/design-tokens.yml`, disparado
quando `src/index.css`, o JSON ou `scripts/figma/` mudam. Não tem
dependências: é Node puro lendo dois arquivos, então o job leva segundos.

### 8.2 A metade que precisa do Figma

```bash
npm run figma:snippet
```

Imprime um trecho de JavaScript. Cole em `use_figma` (MCP do Figma) com o
arquivo do design system aberto. Ele devolve o hash do lado de lá e um dump
canônico.

- **Hashes iguais** → sincronizados, acabou.
- **Hashes diferentes** → salve o campo `dump` num arquivo e rode:

```bash
npm run figma:diff figma-dump.txt
```

Que responde o que interessa — quais tokens divergem, em que modo, e os dois
valores lado a lado:

```
► Valores divergentes (2):

   color/base/card-foreground
     escola-light: código=#0B2905@1.000  figma=#21242C@1.000
```

A partir daí você decide a direção: se o código está certo, o agente atualiza
as variáveis no Figma; se o Figma está certo, a correção vai para o CSS.

### 8.3 Onde a lógica mora

`scripts/figma/lib/tokens.mjs` é a fonte única: leitura do CSS, forma
canônica, hash, nomes e scopes usados no Figma. Tanto `extract-tokens.mjs`
quanto `sync.mjs` importam de lá — duplicar essa lógica seria o jeito mais
fácil de os dois lados divergirem sem ninguém perceber.

O snippet do Figma é a exceção: ele roda no sandbox do Figma e não tem como
importar o módulo. `sync.mjs snippet` o **gera** a partir das mesmas
constantes, e o retorno traz `tamanho` junto do hash — se os algoritmos
divergirem, o tamanho quase sempre difere antes do hash, o que separa
"algoritmo quebrado" de "valor diferente".

### 8.4 O que fica fora, de propósito

`--spotlight` não entra na conferência automática. Ele não existe em
`:root` (só no bloco `.light`) e nos modos escuros vale
`hsl(var(--primary) / 0.07)`. Alias no Figma não carrega opacidade, então a
variável guarda cor literal com alpha — forma incomparável com a do CSS por
regra. Conferir automaticamente daria falso alarme em toda execução.

Não é lacuna escondida: o `figma:check` imprime esse token e o motivo em toda
execução, para quem mexer nele saber que precisa de olho humano.

### 8.5 Componentes

Tokens são o que este ferramental cobre. Para os componentes, o caminho é o
**Figma Code Connect**, que mapeia cada componente do Figma para o do
repositório e faz o Dev Mode mostrar `<Button variant="cta">` em vez de CSS
gerado. Ainda não configurado.

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
