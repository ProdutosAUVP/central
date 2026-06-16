import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Brand = "capital" | "escola";

interface BrandContextValue {
  brand: Brand;
  setBrand: (brand: Brand) => void;
  toggle: () => void;
}

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand>("capital");

  const toggle = useCallback(() => {
    setBrand((b) => (b === "capital" ? "escola" : "capital"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (brand === "escola") {
      root.classList.add("escola");
    } else {
      root.classList.remove("escola");
    }
  }, [brand]);

  return (
    <BrandContext.Provider value={{ brand, setBrand, toggle }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
