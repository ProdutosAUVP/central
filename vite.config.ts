import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode: _mode }: { mode: string }) => ({
  // Base para GitHub Pages.
  // - Se publicado em https://<user>.github.io/<repo>/ -> use "/<repo>/"
  // - Se publicado em dominio customizado (raiz) -> use "/"
  // Pode ser sobrescrito via env: VITE_BASE=/central/ npm run build
  base: process.env.VITE_BASE ?? "/central/",
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
}));
