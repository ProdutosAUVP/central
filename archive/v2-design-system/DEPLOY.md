# Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages via GitHub Actions.

## Passo a passo

### 1. Criar o repositório
1. Acesse https://github.com/new
2. Crie o repositório (ex: `auvp-design-system`), **público** se quiser GitHub Pages gratuito
3. **Não** inicialize com README/.gitignore/license

### 2. Subir o código
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

### 3. Definir o `base` do Vite
O site no GitHub Pages fica em `https://<usuario>.github.io/<repo>/`, portanto os assets precisam ser servidos a partir de `/<repo>/`.

Edite `.github/workflows/deploy.yml` e ajuste a etapa de build para passar a variável:

```yaml
      - name: Build
        run: npm run build
        env:
          VITE_BASE: /<repo>/
```

> Se for usar **domínio customizado** na raiz, mantenha `VITE_BASE` ausente (default `/`) e adicione um arquivo `public/CNAME` com o domínio.

### 4. Ativar o GitHub Pages
1. No repositório: **Settings → Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Faça um novo push (ou rode o workflow manualmente em **Actions → Deploy to GitHub Pages → Run workflow**)
4. URL final aparece no resumo do workflow

### 5. Rotas (SPA)
O projeto usa `BrowserRouter`. O workflow já copia `dist/index.html` como `dist/404.html`, então rotas como `/tom-e-voz` funcionam mesmo após F5 (o GitHub Pages devolve o 404.html e o React Router assume).

### 6. Domínio customizado (opcional)
1. Crie `public/CNAME` com uma única linha contendo o domínio (`exemplo.com.br`)
2. Configure os DNS conforme docs do GitHub Pages
3. Use `VITE_BASE=/` (default)

## Manutenção
Todo push na `main` dispara o deploy automaticamente.
