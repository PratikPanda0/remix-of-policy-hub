import { useState } from "react";
import { Clock, Calendar, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ComplianceScheduler() {
  const [isActive, setIsActive] = useState(true);
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    setIsActive(checked);
    toast({
      title: checked ? "Scheduler Activated" : "Scheduler Deactivated",
      description: checked
        ? "Automated compliance checks are now enabled."
        : "Automated compliance checks have been disabled.",
      duration: 3000,
    });
  };

  return (
    <div className="bg-card rounded-xl p-5 card-shadow h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">Compliance Scheduler</h3>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
            isActive
              ? "bg-success/10 text-success"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isActive && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-5">
        Automate regular compliance checks
      </p>

      {/* Schedule Details */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Schedule</span>
          </div>
          <span className="text-sm text-foreground">Day 1 of each month at 09:00</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Next Run</span>
          </div>
          <span className="text-sm text-foreground">in 9 days</span>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between py-3 border-t border-border">
        <span className="text-sm font-medium text-foreground">Enable Scheduler</span>
        <Switch
          checked={isActive}
          onCheckedChange={handleToggle}
        />
      </div>

      {/* Configure Button */}
      <Button variant="outline" className="w-full mt-4">
        <Settings className="h-4 w-4 mr-2" />
        Configure Schedule
      </Button>

      {/* Footer Note */}
      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        Scheduled checks will analyze all approved policies and send notifications if compliance scores drop below thresholds.
      </p>
    </div>
  );
}
