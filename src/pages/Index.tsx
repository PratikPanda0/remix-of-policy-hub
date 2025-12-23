import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { FlipCard } from "@/components/dashboard/FlipCard";
import { RegulatoryUpdates } from "@/components/dashboard/RegulatoryUpdates";
import { ComplianceScheduler } from "@/components/dashboard/ComplianceScheduler";
import { FileText, Copy } from "lucide-react";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} currentPath="/" />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Uploaded Policies */}
          <KPICard
            title="Uploaded Policies"
            value={9}
            subtitle="Uploaded to database"
            footer="8 reviewed"
            icon={FileText}
            className="animate-fade-in"
            variant="default"
          />

          {/* Compliant - Flip Card */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <FlipCard className="min-h-[180px]" />
          </div>

          {/* Needs Review */}
          <KPICard
            title="Needs Review"
            value={3}
            subtitle="Policies that need review"
            variant="warning"
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Conflicts */}
          <KPICard
            title="Conflicts"
            value={10}
            subtitle="Policy conflicts detected"
            footer="Overlapping & contradictory policies"
            icon={Copy}
            variant="destructive"
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Regulatory Updates - Takes 2 columns */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <RegulatoryUpdates />
          </div>

          {/* Compliance Scheduler */}
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <ComplianceScheduler />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
