import { useState } from "react";
import { cn } from "@/lib/utils";
import { RefreshCw, RotateCcw } from "lucide-react";

interface FlipCardProps {
  className?: string;
}

export function FlipCard({ className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("perspective-1000 h-full", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-full flip-card-inner cursor-pointer",
          isFlipped && "flipped"
        )}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="h-full bg-card rounded-xl p-5 card-shadow transition-smooth hover:card-shadow-hover">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground">Compliant</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                  ✓ 12.5%
                </span>
                <RefreshCw className="h-5 w-5 text-muted-foreground/60" />
              </div>
            </div>

            {/* Value */}
            <p className="text-4xl font-bold text-success mb-2">1</p>

            {/* Subtitle */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm text-muted-foreground">Compliance rate on target</span>
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground">1 of 8 reviewed policies</p>
            <p className="text-xs text-primary mt-2 font-medium">Click to view average score</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="h-full bg-card rounded-xl p-5 card-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">Average Compliance Score</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  average
                </span>
              </div>
              <button 
                className="p-1.5 rounded-lg hover:bg-muted transition-smooth"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Large Percentage */}
            <p className="text-4xl font-bold text-foreground mb-2">69.4%</p>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground mb-1">Overall compliance rate</p>

            {/* Footer */}
            <p className="text-xs text-muted-foreground">Across 8 reviewed policies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
