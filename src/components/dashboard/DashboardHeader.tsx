import { PanelLeft } from "lucide-react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  title?: string;
}

export function DashboardHeader({ onToggleSidebar, title = "Policy Dashboard" }: DashboardHeaderProps) {
  return (
    <header className="flex items-center gap-3 mb-6">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth"
        aria-label="Toggle sidebar"
      >
        <PanelLeft className="h-5 w-5 text-muted-foreground" />
      </button>
      <div className="h-6 w-px bg-border" />
      <h1 className="text-lg font-medium text-foreground">{title}</h1>
    </header>
  );
}
