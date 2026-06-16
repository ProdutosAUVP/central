import React, { createContext, useContext, useState, useCallback } from "react";
import { useBrand } from "@/contexts/BrandContext";

export type SystemView = "institucional" | "ferramentas" | "plataforma";

export const viewLabels: Record<SystemView, string> = {
  institucional: "Sites",
  ferramentas: "Ferramentas",
  plataforma: "Aulas",
};

interface ViewContextValue {
  view: SystemView;
  setView: (view: SystemView) => void;
  availableViews: SystemView[];
}

const ViewContext = createContext<ViewContextValue | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const { brand } = useBrand();
  const [view, setViewState] = useState<SystemView>("institucional");

  const availableViews: SystemView[] = brand === "capital"
    ? ["institucional", "ferramentas"]
    : ["institucional", "ferramentas", "plataforma"];

  const setView = useCallback((v: SystemView) => {
    setViewState(v);
  }, []);

  // Reset to institucional if current view isn't available for the brand
  React.useEffect(() => {
    if (!availableViews.includes(view)) {
      setViewState("institucional");
    }
  }, [brand, availableViews, view]);

  return (
    <ViewContext.Provider value={{ view, setView, availableViews }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useSystemView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useSystemView must be used within ViewProvider");
  return ctx;
}
