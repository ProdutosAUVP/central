import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }: { command: string }) => ({
  // Base para GitHub Pages — aplicada APENAS no build de produção.
  // No dev/preview (Lovable, vite dev) usa "/" para nao quebrar a navegacao.
  // O workflow do GitHub Actions define VITE_BASE=/central-de-produto/ no build.
  base: command === "build" ? (process.env.VITE_BASE ?? "/central-de-produto/") : "/",
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
