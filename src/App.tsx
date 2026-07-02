import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/contexts/BrandContext";
import { ViewProvider } from "@/contexts/ViewContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommandPalette } from "@/components/CommandPalette";
import { EasterEgg } from "@/components/EasterEgg";
import React from "react";
import Hub from "./pages/Hub";
import TimePage from "./pages/TimePage";
import RoadmapPage from "./pages/RoadmapPage";
import NovidadesPage from "./pages/NovidadesPage";
import DesignSystem from "./pages/DesignSystem";
import TomEVozPage from "./pages/TomEVozPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message ?? String(error) };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace", color: "#b00" }}>
          <h2>Algo deu errado ao renderizar o app.</h2>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{this.state.message}</pre>
          <button style={{ marginTop: 16 }} onClick={() => this.setState({ hasError: false, message: "" })}>
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <BrandProvider>
        <ViewProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <CommandPalette />
              <EasterEgg />
              <Routes>
                <Route path="/" element={<Hub />} />
                <Route path="/time" element={<TimePage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/novidades" element={<NovidadesPage />} />
                <Route path="/design-system" element={<DesignSystem />} />
                <Route path="/tom-e-voz" element={<TomEVozPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ViewProvider>
      </BrandProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
