## Contexto
O projeto e um Vite + React + TypeScript SPA que usa `react-router-dom` com `BrowserRouter`. Atualmente roda no Lovable. O objetivo e migrar o codigo-fonte para um repositorio GitHub e publicar via GitHub Pages.

## Problemas conhecidos do GitHub Pages com SPA
GitHub Pages e um host estatico. Com `BrowserRouter`, ao atualizar a pagina em `/tom-e-voz`, o servidor retorna 404 porque nao existe arquivo `tom-e-voz.html`. Existem duas solucoes:

| Abordagem | URL | Complexidade |
|-----------|-----|--------------|
| A) HashRouter | `site.github.io/repo/#/tom-e-voz` | Baixa |
| B) BrowserRouter + redirect 404.html | `site.github.io/repo/tom-e-voz` | Media |

## Plano de migracao

### 1. Criar repositorio no GitHub
1. Acesse https://github.com/new
2. Defina nome do repositorio (ex: `auvp-design-system`)
3. Escolha visibilidade (publico recomendado para GitHub Pages gratuito)
4. Nao inicialize com README, .gitignore ou license (o projeto ja tem esses arquivos)
5. Copie a URL do repositorio (ex: `https://github.com/usuario/auvp-design-system.git`)

### 2. Preparar o codigo para migracao

#### 2.1 Remover dependencias especificas do Lovable
No `package.json`:
- Remover `lovable-tagger` de `devDependencies`
- Executar `npm install` para atualizar o lockfile

#### 2.2 Adaptar Vite config para GitHub Pages
No `vite.config.ts`, adicionar a propriedade `base` para refletir o nome do repositorio:

```ts
export default defineConfig({
  base: '/auvp-design-system/',  // nome do repositorio entre barras
  // ... resto da config
});
```

Se for publicar no dominio customizado (sem subcaminho), use `base: '/'`.

#### 2.3 Adaptar o roteamento (escolher uma opcao)

**Opcao A: HashRouter (mais simples)**
Alterar `src/App.tsx`:
```tsx
import { HashRouter } from 'react-router-dom';
// substituir <BrowserRouter> por <HashRouter>
```

**Opcao B: BrowserRouter + 404 redirect (URLs limpas)**
- Manter `BrowserRouter` no codigo
- Criar um script que gera um `404.html` identico ao `index.html` na pasta `public/`
- Ou criar um `404.html` customizado que redireciona para `index.html` com a rota original (tecnica de redirect do SPA)
- Adicionar ao `vite.config.ts` um plugin ou script post-build para copiar o `index.html` gerado como `404.html`

**Recomendacao**: Opcao B para manter URLs limpas.

### 3. Criar workflow de GitHub Actions para deploy automatico

Criar arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      # Copia index.html como 404.html para SPA redirect (se usando BrowserRouter)
      - run: cp dist/index.html dist/404.html
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 4. Subir o codigo para o GitHub

```bash
# No diretorio do projeto
git init  # se ainda nao for um repo git
git add .
git commit -m "Initial commit - migration from Lovable"
git branch -M main
git remote add origin https://github.com/usuario/auvp-design-system.git
git push -u origin main
```

Se o projeto ja tiver historico git do Lovable, recomenda-se fazer um push force ou criar um novo repo limpo para evitar conflitos.

### 5. Configurar o GitHub Pages no repositorio

1. Va em Settings > Pages no repositorio GitHub
2. Em "Source", selecione "GitHub Actions"
3. O workflow `.github/workflows/deploy.yml` sera detectado automaticamente
4. Apos o primeiro push na branch `main`, o workflow sera executado
5. O site ficara disponivel em `https://usuario.github.io/auvp-design-system/`

### 6. Ajustes finais no codigo

#### 6.1 Metatags do index.html
Atualizar `index.html`:
- Alterar titulo e description se necessario
- Atualizar URLs Open Graph/Twitter se houver um novo dominio
- Atualizar o `favicon` se necessario

#### 6.2 Variaveis de ambiente
Se o projeto usar variaveis de ambiente (ex: URLs de API), verifique se existem em `.env` e se precisam ser commitadas ou configuradas no GitHub (Settings > Secrets and variables > Actions).

#### 6.3 Links absolutos vs relativos
Verificar se ha links absolutos no codigo que apontem para o dominio antigo do Lovable. Corrigir para caminhos relativos ou novo dominio.

### 7. Testar o deploy

1. Acesse a URL do GitHub Pages apos o primeiro workflow completar
2. Testar navegacao entre rotas (`/`, `/tom-e-voz`, 404)
3. Testar refresh (F5) em paginas que nao sejam a raiz
4. Verificar se assets (imagens, CSS, JS) carregam corretamente

### 8. Manutencao futura

- Toda alteracao na branch `main` dispara o workflow automaticamente
- Para deploys em ambiente de teste, criar branch `develop` sem workflow de deploy
- Para dominio customizado, adicione um arquivo `CNAME` na pasta `public/` com o dominio desejado

## Checklist resumido

- [ ] Criar repositorio no GitHub
- [ ] Remover `lovable-tagger` do package.json
- [ ] Adicionar `base` no vite.config.ts
- [ ] Escolher HashRouter ou implementar 404.html redirect
- [ ] Criar `.github/workflows/deploy.yml`
- [ ] Commit e push para o GitHub
- [ ] Configurar GitHub Pages source como "GitHub Actions"
- [ ] Testar o site publicado

## Observacao importante sobre BrowserRouter
Se escolher manter BrowserRouter, e **obrigatorio** que o servidor retorne `index.html` para qualquer rota. O GitHub Pages nao faz isso nativamente. A copia do `404.html` funciona porque o GitHub Pages serve o `404.html` quando a rota nao existe, e se esse arquivo for identico ao `index.html`, o React Router no cliente assume e renderiza a rota correta. A desvantagem e o status HTTP 404 que o navegador recebe, embora a pagina renderize corretamente.