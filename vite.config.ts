import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode: _mode }: { mode: string }) => ({
  // Base para GitHub Pages.
  // - Se publicado em https://<user>.github.io/<repo>/ -> use "/<repo>/"
  // - Se publicado em dominio customizado (raiz) -> use "/"
  // Pode ser sobrescrito via env: VITE_BASE=/central/ npm run build
  // Na Vercel (process.env.VERCEL definido automaticamente pela plataforma) o site
  // é publicado na raiz do domínio, então o base cai para "/" sem configuração manual.
  base: process.env.VITE_BASE ?? (process.env.VERCEL ? "/" : "/central/"),
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true, // necessário para o auto-cleanup do Testing Library
    setupFiles: ["src/test/setup.ts"],
    // archive/ guarda a iteração anterior do projeto (inativa, fora do build)
    // — seus testes não devem rodar na suíte principal.
    exclude: ["node_modules/**", "archive/**"],
  },
}));
