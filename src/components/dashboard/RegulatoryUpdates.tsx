import { RefreshCw, Building } from "lucide-react";

export function RegulatoryUpdates() {
  return (
    <div className="bg-card rounded-xl p-5 card-shadow h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">Regulatory Updates</h3>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-smooth">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground mb-4">
        Recent regulatory changes in APRA, ASIC, and ASX
      </p>

      {/* Region Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground">
          <span className="text-xs">AU</span>
          <span>Australia</span>
        </span>
      </div>

      {/* Loading State */}
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-muted rounded-full"></div>
          <div className="absolute top-0 left-0 w-10 h-10 border-2 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Loading regulatory updates...</p>
      </div>
    </div>
  );
}
