import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { BrandProvider } from "@/contexts/BrandContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ViewProvider } from "@/contexts/ViewContext";

import Hub from "@/pages/Hub";
import TimePage from "@/pages/TimePage";
import DesignSystem from "@/pages/DesignSystem";
import TomEVozPage from "@/pages/TomEVozPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold font-anek mb-2">Algo deu errado</h1>
            <p className="text-muted-foreground mb-4">Recarregue a página para tentar novamente.</p>
            <button onClick={() => window.location.reload()} className="text-primary underline">Recarregar</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrandProvider>
            <ViewProvider>
              <TooltipProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                  <Routes>
                    <Route path="/" element={<Hub />} />
                    <Route path="/time" element={<TimePage />} />
                    <Route path="/design-system" element={<DesignSystem />} />
                    <Route path="/tom-e-voz" element={<TomEVozPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                <Toaster />
              </TooltipProvider>
            </ViewProvider>
          </BrandProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
