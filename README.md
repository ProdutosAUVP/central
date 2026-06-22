# Central de Produto — AUVP

Hub interno da AUVP Capital com Design System, documentação do Time de Produto e Manual de Tom e Voz.

Acesso: **https://produtosauvp.github.io/central/**

---

## O que é

A Central de Produto é uma intranet centralizada para os times de Produto, Design e Conteúdo da AUVP. Ela reúne em um só lugar:

- **Design System** — biblioteca de componentes, guias de estilo, paletas de cores, tipografia e exemplos de código prontos para uso
- **Time de Produto** — organograma, perfis dos colaboradores e estrutura dos times
- **Tom e Voz** — manual de comunicação da marca por produto e área da empresa
- **Escola AUVP** — documentação do produto educacional
- **Roadmap e Novidades** — planejamento e atualizações recentes

---

## Páginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Hub | Página inicial com acessos rápidos, produtos e novidades |
| `/design-system` | Design System | Showcase interativo de componentes com código React e HTML |
| `/time` | Time | Organograma e cards dos colaboradores |
| `/tom-e-voz` | Tom e Voz | Manual de comunicação por área e produto |
| `/escola` | Escola AUVP | Documentação do produto educacional |
| `/roadmap` | Roadmap | Planejamento de produto |
| `/novidades` | Novidades | Atualizações recentes |

---

## Stack Técnica

| Categoria | Tecnologia |
|-----------|-----------|
| Framework UI | React 18 + TypeScript 5 |
| Build | Vite 5 (SWC) |
| Roteamento | React Router v6 |
| Estilização | Tailwind CSS 3 + CSS Variables |
| Componentes base | shadcn/ui + Radix UI |
| Ícones | Lucide React |
| Gráficos | Recharts |
| Formulários | React Hook Form + Zod |
| Estado servidor | TanStack React Query |
| Temas | next-themes (dark/light + capital/escola) |
| Testes | Vitest + Testing Library |
| Deploy | GitHub Actions → GitHub Pages |

---

## Estrutura do Projeto

```
central/
├── src/
│   ├── pages/              # Páginas da aplicação (uma por rota)
│   │   ├── Hub.tsx         # Página inicial
│   │   ├── DesignSystem.tsx
│   │   ├── TimePage.tsx
│   │   ├── TomEVozPage.tsx
│   │   ├── EscolaPage.tsx
│   │   ├── RoadmapPage.tsx
│   │   └── NovidadesPage.tsx
│   ├── components/
│   │   ├── GlobalNav.tsx           # Navegação global responsiva
│   │   ├── ui/                     # Componentes base (shadcn/ui — não editar)
│   │   ├── widgets/                # Componentes customizados da AUVP
│   │   └── design-system/          # Controles de demo (toggles de tema/marca)
│   ├── contexts/
│   │   ├── ThemeContext.tsx         # Dark/light mode
│   │   ├── BrandContext.tsx         # Capital / Escola
│   │   └── ViewContext.tsx
│   ├── hooks/
│   │   ├── use-is-dark.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── assets/
│   │   ├── team/                   # Fotos dos colaboradores (usadas no app)
│   │   ├── team.ts                 # Exporta as fotos como URLs via Vite
│   │   └── olhos.ts                # Logos SVG
│   ├── lib/
│   │   └── utils.ts                # cn() + publicUrl()
│   ├── App.tsx                     # Roteador + providers
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Variáveis CSS e estilos globais
├── public/                         # Assets estáticos (servidos diretamente)
│   ├── olho-amarelo.svg
│   ├── olho-branco.svg
│   ├── olho-preto.svg
│   └── 404.html                    # Fallback para SPA no GitHub Pages
├── docs/
│   └── fotos-originais/            # Fotos de alta resolução do time (não usadas no build)
├── archive/
│   └── v2-design-system/           # Iteração anterior do projeto (Lovable.dev)
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: build + deploy no GitHub Pages
├── index.html                      # Entry HTML do Vite
├── vite.config.ts                  # Base path /central/ para GitHub Pages
├── tailwind.config.ts
└── tsconfig.json
```

---

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 8080)
npm run dev

# Build de produção
npm run build

# Rodar testes
npm run test

# Lint
npm run lint
```

O app roda em `http://localhost:8080/central/`.

---

## Deploy

O deploy é automático via GitHub Actions ao fazer push na branch `main`:

1. Instala dependências
2. Roda `npm run build` com `VITE_BASE=/central/`
3. Publica o `dist/` no GitHub Pages

O workflow está em `.github/workflows/deploy.yml`.

---

## Convenções

**Adicionar uma nova página:**
1. Criar o componente em `src/pages/NomeDaPagina.tsx`
2. Importar e adicionar a rota em `src/App.tsx`
3. Adicionar o link de navegação em `src/components/GlobalNav.tsx`

**Referenciar assets em `/public`:**
```tsx
import { publicUrl } from "@/lib/utils";
<img src={publicUrl("/olho-branco.svg")} />
```
Necessário por causa do base path `/central/` no GitHub Pages.

**Adicionar fotos de colaboradores:**
1. Colocar a foto em `src/assets/team/` (formato recomendado: `.webp` ou `.png`)
2. Exportar em `src/assets/team.ts`

**Tema e Marca:**
- `ThemeContext` — dark/light (persiste em `localStorage` como `auvp-theme`)
- `BrandContext` — `capital` (padrão) ou `escola` (aplica classe no `<html>`)

---

## Testes

```bash
npm run test        # roda uma vez
npm run test:watch  # modo watch
```

Os testes ficam em `src/components/widgets/__tests__/` e `src/test/`.
