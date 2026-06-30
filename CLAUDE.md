# CLAUDE.md — Central de Produto AUVP

Guia de navegação para IAs. Leia este arquivo antes de explorar o repositório.

## O que é este projeto

SPA React + TypeScript implantada no GitHub Pages (`/central/`). É uma intranet da AUVP Capital com cinco seções principais: Design System, Time, Tom e Voz, Escola e Roadmap.

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
src/contexts/       → ThemeContext, BrandContext, ViewContext
src/assets/team/    → Fotos dos colaboradores (importadas via Vite ?url)
src/assets/team.ts  → Exporta as fotos como URLs
src/assets/olhos.ts → Logos SVG
src/lib/utils.ts    → cn() e publicUrl()
public/             → Assets estáticos (SVGs dos logos, 404.html)
docs/fotos-originais/ → Fotos originais em alta resolução (não usadas no build)
archive/v2-design-system/ → Iteração anterior do projeto (inativa)
```

## Rotas

```
/               → src/pages/Hub.tsx
/design-system  → src/pages/DesignSystem.tsx   (página maior: 1741 linhas)
/time           → src/pages/TimePage.tsx
/tom-e-voz      → src/pages/TomEVozPage.tsx
/escola         → src/pages/EscolaPage.tsx
/roadmap        → src/pages/RoadmapPage.tsx
/novidades      → src/pages/NovidadesPage.tsx
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

**Marca** — `BrandContext` alterna entre `capital` e `escola`. A classe é aplicada no `<html>`. Componentes na pasta `widgets/` podem ter variantes por marca.

**Fotos do time** — importar de `src/assets/team.ts`, nunca diretamente da pasta. O arquivo mapeia nomes para URLs via Vite `?url`.

## Como adicionar uma nova página

1. Criar `src/pages/NovaPagina.tsx`
2. Importar e registrar rota em `src/App.tsx`
3. Adicionar link em `src/components/GlobalNav.tsx`

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

- `docs/fotos-originais/` — fotos de alta resolução do time (master, não usadas no app)
- `archive/v2-design-system/` — projeto Lovable.dev anterior (inativo)
