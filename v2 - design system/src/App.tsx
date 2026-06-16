import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/contexts/BrandContext";
import { ViewProvider } from "@/contexts/ViewContext";
import DesignSystem from "./pages/DesignSystem";
import TomEVozPage from "./pages/TomEVozPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrandProvider>
    <ViewProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DesignSystem />} />
            <Route path="/tom-e-voz" element={<TomEVozPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ViewProvider>
  </BrandProvider>
);

export default App;
