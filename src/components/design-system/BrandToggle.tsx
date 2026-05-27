import { useBrand } from "@/contexts/BrandContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const brandLabels = {
  capital: "AUVP Capital",
  escola: "AUVP Escola",
} as const;

export function BrandToggle() {
  const { brand, setBrand } = useBrand();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-semibold font-roboto hover:opacity-80 transition-opacity focus:outline-none">
          {brandLabels[brand]}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        <DropdownMenuItem
          onClick={() => setBrand("capital")}
          className={brand === "capital" ? "font-bold text-primary" : ""}
        >
          AUVP Capital
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setBrand("escola")}
          className={brand === "escola" ? "font-bold text-primary" : ""}
        >
          AUVP Escola
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
