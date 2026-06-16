import { useSystemView, viewLabels } from "@/contexts/ViewContext";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const { view, setView, availableViews } = useSystemView();

  return (
    <div className="bg-muted/50 p-1 rounded-lg flex relative border shadow-inner overflow-hidden">
      {availableViews.map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={cn(
            "flex-1 py-1.5 px-2 text-[9px] leading-tight tracking-wide font-bold uppercase relative z-10 transition-colors rounded-md font-roboto whitespace-nowrap text-center",
            view === v
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {viewLabels[v]}
        </button>
      ))}
    </div>
  );
}
