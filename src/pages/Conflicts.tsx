import { useState } from "react";
import { Play, Trash2, Copy, AlertTriangle, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

const conflictStats = [
  { label: "Total Conflicts", value: 10, color: "text-foreground" },
  { label: "Contradictions", value: 3, color: "text-destructive" },
  { label: "Duplicates", value: 4, color: "text-primary" },
  { label: "Outdated", value: 3, color: "text-amber-500" },
];

const detectedConflicts = [
  {
    id: 1,
    type: "Contradiction",
    severity: "Low Severity",
    title: "Trading-in-ANZ-Securities-Policy vs ANZ-NZ-Code-Practice",
    description: "A thorough comparison reveals that Policy 1 (Trading-in-ANZ-Securities-Policy) governs employee trading, insider trading prohibitions, and pre-trade approvals within Australia, while Policy 2 (ANZ-NZ-Code-Practice) governs customer banking conduct and complaint handling in New Zealand.",
    policies: ["Trading-in-ANZ-Securities-Policy • Updated 2024-11-15", "ANZ-NZ-Code-Practice • Updated 2021-04-09"],
  },
  {
    id: 2,
    type: "Duplicate",
    severity: "Low Severity",
    title: "privacy-policy vs consumer-data-right-policy",
    description: "Both policies reproduce substantially identical complaint-handling content, including timeframes and escalation paths, creating redundancy and a risk of divergence if updates are not synchronized across the documents.",
    policies: ["privacy-policy • Updated 2025-04-01", "consumer-data-right-policy • Updated 2025-04-01"],
  },
  {
    id: 3,
    type: "Outdated",
    severity: "Low Severity",
    title: "Trading-in-ANZ-Securities-Policy vs consumer-data-right-policy",
    description: "A thorough comparison of the two policies shows they govern distinct regulatory domains (market conduct/insider trading vs consumer data rights and privacy) with no conflicting requirements, overlapping content, or references that appear superseded.",
    policies: ["Trading-in-ANZ-Securities-Policy • Updated 2024-11-15", "consumer-data-right-policy • Updated 2025-04-01"],
  },
  {
    id: 4,
    type: "Outdated",
    severity: "Low Severity",
    title: "Whistleblower-Policy vs Trading-in-ANZ-Securities-Policy",
    description: "The analysis identifies that trading and securities regulations often reference whistleblower protections. The outdated references in escalation processes could cause confusion if policies are not aligned.",
    policies: ["Whistleblower-Policy • Updated 2025-04-01", "Trading-in-ANZ-Securities-Policy • Updated 2024-11-15"],
  },
  {
    id: 5,
    type: "Contradiction",
    severity: "High Severity",
    title: "Customer Due Diligence Requirements",
    description: "Conflicting requirements for KYC verification timelines. AML Policy requires 24-hour verification while Customer Onboarding allows 72 hours for low-risk customers.",
    policies: ["AML Policy • Updated 2024-08-15", "Customer Onboarding Policy • Updated 2024-06-20"],
  },
  {
    id: 6,
    type: "Duplicate",
    severity: "Medium Severity",
    title: "Credit Risk Assessment Policy",
    description: "Duplicate content detected in sections 3.2 and 4.1 regarding credit assessment criteria and risk thresholds.",
    policies: ["Credit Risk Policy v2.1 • Updated 2024-09-01", "Lending Guidelines 2024 • Updated 2024-07-15"],
  },
  {
    id: 7,
    type: "Outdated",
    severity: "Low Severity",
    title: "Data Retention Guidelines",
    description: "References outdated APRA CPS 234 requirements from 2019. Current version is CPS 234 (amended 2023) with updated security controls.",
    policies: ["Data Management Policy • Updated 2022-03-10"],
  },
  {
    id: 8,
    type: "Duplicate",
    severity: "Medium Severity",
    title: "Complaint Handling Procedures",
    description: "Multiple policies define complaint handling procedures with slightly different escalation timelines, creating redundancy and operational ambiguity for frontline staff.",
    policies: ["Customer Service Policy • Updated 2024-05-20", "Disputes Resolution Policy • Updated 2024-03-15"],
  },
  {
    id: 9,
    type: "Contradiction",
    severity: "Medium Severity",
    title: "Third Party Risk Assessment",
    description: "Procurement Policy allows vendor self-assessment for contracts under $50K while Risk Policy mandates full due diligence for all third-party engagements regardless of value.",
    policies: ["Procurement Policy • Updated 2024-10-01", "Third Party Risk Policy • Updated 2024-09-15"],
  },
  {
    id: 10,
    type: "Duplicate",
    severity: "Low Severity",
    title: "Privacy Notice Requirements",
    description: "Privacy collection notices are duplicated across three policies with minor wording variations that could lead to inconsistent customer communications.",
    policies: ["Privacy Policy • Updated 2025-01-10", "Digital Banking Policy • Updated 2024-12-05"],
  },
];

export default function Conflicts() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [policyFile1, setPolicyFile1] = useState("");
  const [policyFile2, setPolicyFile2] = useState("");

  const getSeverityVariant = (severity: string) => {
    if (severity.includes("High")) return "destructive";
    if (severity.includes("Medium")) return "warning";
    return "secondary";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Duplicate":
        return <Copy className="h-4 w-4" />;
      case "Contradiction":
        return <AlertTriangle className="h-4 w-4" />;
      case "Outdated":
        return <Clock className="h-4 w-4" />;
      case "Overlap":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "Contradiction":
        return {
          border: "border-l-4 border-l-destructive border-destructive/20",
          bg: "bg-destructive/5",
          icon: "bg-destructive/10 text-destructive",
          badge: "border-destructive/30 text-destructive bg-destructive/10"
        };
      case "Duplicate":
        return {
          border: "border-l-4 border-l-primary border-primary/20",
          bg: "bg-primary/5",
          icon: "bg-primary/10 text-primary",
          badge: "border-primary/30 text-primary bg-primary/10"
        };
      case "Outdated":
        return {
          border: "border-l-4 border-l-amber-500 border-amber-500/20",
          bg: "bg-amber-500/5",
          icon: "bg-amber-500/10 text-amber-600",
          badge: "border-amber-500/30 text-amber-600 bg-amber-500/10"
        };
      default:
        return {
          border: "border-border",
          bg: "",
          icon: "bg-muted",
          badge: ""
        };
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/conflicts" />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} title="Policy Dashboard" />

        <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Policy Conflicts</h1>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
            <p className="text-muted-foreground mb-8">
              Compare and identify overlapping, redundant, contradictory, and outdated policies across ANZ
            </p>

            {/* Compare Policies Card */}
            <Card className="card-shadow mb-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Compare Policies</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select two policy files to compare and identify conflicts
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-end gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Policy File 1</label>
                    <Select value={policyFile1} onValueChange={setPolicyFile1}>
                      <SelectTrigger className="w-[200px] bg-background">
                        <SelectValue placeholder="Select first file" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        <SelectItem value="policy-1">Credit Risk Policy</SelectItem>
                        <SelectItem value="policy-2">AML Policy</SelectItem>
                        <SelectItem value="policy-3">Data Privacy Policy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Policy File 2</label>
                    <Select value={policyFile2} onValueChange={setPolicyFile2}>
                      <SelectTrigger className="w-[200px] bg-background">
                        <SelectValue placeholder="Select second file" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        <SelectItem value="policy-1">Credit Risk Policy</SelectItem>
                        <SelectItem value="policy-2">AML Policy</SelectItem>
                        <SelectItem value="policy-3">Data Privacy Policy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8">
                    <Play className="h-4 w-4 mr-2" />
                    Run Comparison
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {conflictStats.map((stat) => (
                <Card key={stat.label} className="card-shadow">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detected Conflicts */}
            <Card className="card-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Detected Conflicts</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on any conflict to view detailed policy comparison with highlighted differences
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {detectedConflicts.map((conflict) => {
                  const styles = getTypeStyles(conflict.type);
                  return (
                    <div
                      key={conflict.id}
                      className={cn(
                        "p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer",
                        styles.border,
                        styles.bg
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn("p-2 rounded-lg", styles.icon)}>
                          {getTypeIcon(conflict.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={cn("text-xs", styles.badge)}>
                              {conflict.type}
                            </Badge>
                            <Badge
                              variant={getSeverityVariant(conflict.severity) as any}
                              className="text-xs"
                            >
                              {conflict.severity}
                            </Badge>
                          </div>
                          <div className="space-y-1 mb-3">
                            {conflict.policies.map((policy, index) => (
                              <div key={policy} className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                <span className="text-sm text-primary font-medium">{policy}</span>
                                {index === 0 && conflict.policies.length > 1 && (
                                  <span className="text-xs text-muted-foreground ml-2">vs</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className={cn("p-3 rounded-md text-sm text-muted-foreground", styles.bg)}>
                            {conflict.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  );
}
