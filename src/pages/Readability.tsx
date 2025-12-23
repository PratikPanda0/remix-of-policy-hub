import { useState } from "react";
import { RefreshCw, Play, ChevronRight, ChevronDown, Info, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

// Bank data
const banks = [
  { id: "anz", name: "ANZ", initials: "AN", color: "bg-blue-500" },
  { id: "cwb", name: "CWB", initials: "CW", color: "bg-amber-500" },
  { id: "nab", name: "NAB", initials: "NA", color: "bg-red-500" },
  { id: "westpac", name: "WESTPAC", initials: "WE", color: "bg-purple-500" },
];

// Metric details for expanded view
const getMetricDetails = (metric: string, value: number | string, data: any) => {
  const details: Record<string, { target: string; status: string; reason: string }> = {
    gradeLevel: {
      target: "9",
      status: Number(value) > 14 ? "critical" : Number(value) > 10 ? "warning" : "good",
      reason: `Avg sentence length ${data.avgSentenceLength} and 1.89 syllables/word yields grade ${value}.`,
    },
    fleschKincaid: {
      target: "60+",
      status: Number(value) < 30 ? "critical" : Number(value) < 50 ? "warning" : "good",
      reason: `Score of ${value} indicates ${Number(value) < 30 ? "very difficult" : Number(value) < 50 ? "difficult" : "fairly easy"} reading level.`,
    },
    loughranMcdonald: {
      target: "85+",
      status: Number(value) < 70 ? "warning" : "good",
      reason: `Financial readability score of ${value} based on domain-specific vocabulary analysis.`,
    },
    gunningFog: {
      target: "12",
      status: Number(value) > 17 ? "critical" : Number(value) > 14 ? "warning" : "good",
      reason: `Complex words and sentence length yield fog index of ${value}.`,
    },
    smogIndex: {
      target: "12",
      status: Number(value) > 16 ? "critical" : Number(value) > 14 ? "warning" : "good",
      reason: `SMOG grade of ${value} based on polysyllable count.`,
    },
    avgSentenceLength: {
      target: "15 words",
      status: parseInt(String(value)) > 25 ? "critical" : parseInt(String(value)) > 20 ? "warning" : "good",
      reason: `Average of ${value} per sentence affects readability.`,
    },
    passiveVoice: {
      target: "<10%",
      status: parseFloat(String(value)) > 25 ? "critical" : parseFloat(String(value)) > 10 ? "warning" : "good",
      reason: `${value} of sentences use passive voice construction.`,
    },
  };
  return details[metric] || { target: "-", status: "good", reason: "No additional details available." };
};

// Readability metrics data by section and bank
const readabilityData = [
  {
    section: "Purpose and Objective",
    banks: {
      anz: {
        gradeLevel: 14.5,
        fleschKincaid: 27.8,
        loughranMcdonald: 72,
        gunningFog: 19.1,
        smogIndex: 16.7,
        avgSentenceLength: "21 words",
        passiveVoice: "0.0%",
        issues: 2,
        recommendations: 1,
        quickWins: 1,
      },
      cwb: {
        gradeLevel: 16.4,
        fleschKincaid: 21.8,
        loughranMcdonald: 87,
        gunningFog: 21.5,
        smogIndex: 18.4,
        avgSentenceLength: "25 words",
        passiveVoice: "0.0%",
        issues: 2,
        recommendations: 1,
      },
      nab: {
        gradeLevel: 10.1,
        fleschKincaid: 46.2,
        loughranMcdonald: 84,
        gunningFog: 14.7,
        smogIndex: 13.2,
        avgSentenceLength: "13 words",
        passiveVoice: "6.2%",
        issues: 1,
      },
      westpac: {
        gradeLevel: 12.5,
        fleschKincaid: 32.1,
        loughranMcdonald: 70,
        gunningFog: 15.8,
        smogIndex: 14.1,
        avgSentenceLength: "15 words",
        passiveVoice: "16.7%",
        issues: 2,
        recommendations: 1,
        quickWins: 2,
      },
    },
  },
  {
    section: "Scope and Application",
    banks: {
      anz: {
        gradeLevel: 10.1,
        fleschKincaid: 54.6,
        loughranMcdonald: 100,
        gunningFog: 15,
        smogIndex: 13.8,
        avgSentenceLength: "18 words",
        passiveVoice: "0.0%",
        issues: 1,
      },
      cwb: {
        gradeLevel: 17.1,
        fleschKincaid: 24.5,
        loughranMcdonald: 86,
        gunningFog: 21,
        smogIndex: 18.1,
        avgSentenceLength: "29 words",
        passiveVoice: "50.0%",
        issues: 3,
        recommendations: 3,
        quickWins: 2,
      },
      nab: {
        gradeLevel: 9.3,
        fleschKincaid: 50.3,
        loughranMcdonald: 92,
        gunningFog: 14.2,
        smogIndex: 12.8,
        avgSentenceLength: "12 words",
        passiveVoice: "0.0%",
      },
      westpac: {
        gradeLevel: 9.3,
        fleschKincaid: 50.3,
        loughranMcdonald: 92,
        gunningFog: 14.2,
        smogIndex: 12.8,
        avgSentenceLength: "12 words",
        passiveVoice: "0.0%",
      },
    },
  },
  {
    section: "Core Insider Trading Prohibition",
    banks: {
      anz: {
        gradeLevel: 12,
        fleschKincaid: 39.3,
        loughranMcdonald: 92,
        gunningFog: 15.9,
        smogIndex: 14.4,
        avgSentenceLength: "17 words",
        passiveVoice: "25.0%",
        issues: 2,
        recommendations: 2,
        quickWins: 1,
      },
      cwb: {
        gradeLevel: 18.1,
        fleschKincaid: 27.4,
        loughranMcdonald: 85,
        gunningFog: 22,
        smogIndex: 18.2,
        avgSentenceLength: "35 words",
        passiveVoice: "12.5%",
        issues: 3,
        recommendations: 2,
        quickWins: 1,
      },
      nab: {
        gradeLevel: 11.9,
        fleschKincaid: 43.5,
        loughranMcdonald: 84,
        gunningFog: 14.8,
        smogIndex: 13.7,
        avgSentenceLength: "19 words",
        passiveVoice: "0.0%",
        issues: 1,
        recommendations: 1,
      },
      westpac: {
        gradeLevel: 11.9,
        fleschKincaid: 43.5,
        loughranMcdonald: 84,
        gunningFog: 14.8,
        smogIndex: 13.7,
        avgSentenceLength: "19 words",
        passiveVoice: "0.0%",
        issues: 1,
        recommendations: 1,
      },
    },
  },
];

// Helper to get color based on grade level
const getGradeLevelColor = (grade: number) => {
  if (grade <= 10) return { bg: "bg-emerald-50", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" };
  if (grade <= 14) return { bg: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" };
  return { bg: "bg-red-50", text: "text-red-600", badge: "bg-red-100 text-red-700" };
};

// Helper to get color based on Flesch-Kincaid score
const getFleschColor = (score: number) => {
  if (score >= 50) return { bg: "bg-emerald-50", text: "text-emerald-600" };
  if (score >= 30) return { bg: "bg-amber-50", text: "text-amber-600" };
  return { bg: "bg-red-50", text: "text-red-600" };
};

// Collapsible metric row component
const CollapsibleMetricRow = ({
  label,
  value,
  hasInfo = false,
  colorClass = "bg-muted/50",
  textColorClass = "text-foreground",
  metricKey,
  data,
  isBadge = false,
  badgeClass = "",
}: {
  label: string;
  value: string | number;
  hasInfo?: boolean;
  colorClass?: string;
  textColorClass?: string;
  metricKey?: string;
  data?: any;
  isBadge?: boolean;
  badgeClass?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const details = metricKey && data ? getMetricDetails(metricKey, value, data) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-amber-600";
      default:
        return "text-emerald-600";
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:opacity-80",
            colorClass
          )}
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-muted-foreground">{label}</span>
            {hasInfo && (
              <Tooltip>
                <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>More information about {label}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {isBadge ? (
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", badgeClass)}>
              {value}
            </span>
          ) : (
            <span className={cn("font-medium", textColorClass)}>{value}</span>
          )}
        </button>
      </CollapsibleTrigger>
      {details && (
        <CollapsibleContent>
          <div className="mt-1 ml-5 p-3 bg-muted/30 rounded-lg text-xs space-y-1">
            <div className="flex gap-2">
              <span className="text-muted-foreground">Target:</span>
              <span className="font-medium text-foreground">{details.target}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Status:</span>
              <span className={cn("font-medium", getStatusColor(details.status))}>{details.status}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Reason:</span>
              <span className="text-foreground">{details.reason}</span>
            </div>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

// Simple metric row (non-collapsible for issues, recommendations, quick wins)
const MetricRow = ({
  label,
  value,
  colorClass = "bg-muted/50",
  textColorClass = "text-foreground",
}: {
  label: string;
  value: string | number;
  colorClass?: string;
  textColorClass?: string;
}) => (
  <div className={cn("flex items-center justify-between px-3 py-2 rounded-lg text-sm", colorClass)}>
    <div className="flex items-center gap-2">
      <ChevronRight className="h-3 w-3 text-muted-foreground" />
      <span className="text-muted-foreground">{label}</span>
    </div>
    <span className={cn("font-medium", textColorClass)}>{value}</span>
  </div>
);

// Bank metrics card component
const BankMetricsCard = ({ data }: { data: any }) => {
  if (!data) return <div className="w-full" />;

  const gradeColors = getGradeLevelColor(data.gradeLevel);
  const fleschColors = getFleschColor(data.fleschKincaid);

  return (
    <div className="space-y-2 w-full">
      {/* Grade Level */}
      <CollapsibleMetricRow
        label="Grade Level"
        value={data.gradeLevel}
        colorClass={gradeColors.bg}
        metricKey="gradeLevel"
        data={data}
        isBadge
        badgeClass={gradeColors.badge}
      />

      {/* Flesch-Kincaid */}
      <CollapsibleMetricRow
        label="Flesch-Kincaid"
        value={data.fleschKincaid}
        hasInfo
        colorClass={fleschColors.bg}
        textColorClass={fleschColors.text}
        metricKey="fleschKincaid"
        data={data}
      />

      {/* Loughran-McDonald */}
      <CollapsibleMetricRow
        label="Loughran-McDonald"
        value={data.loughranMcdonald}
        hasInfo
        colorClass="bg-muted/30"
        metricKey="loughranMcdonald"
        data={data}
      />

      {/* Gunning Fog */}
      <CollapsibleMetricRow
        label="Gunning Fog"
        value={data.gunningFog}
        hasInfo
        colorClass="bg-muted/30"
        metricKey="gunningFog"
        data={data}
      />

      {/* SMOG Index */}
      <CollapsibleMetricRow
        label="SMOG Index"
        value={data.smogIndex}
        hasInfo
        colorClass="bg-muted/30"
        metricKey="smogIndex"
        data={data}
      />

      {/* Avg Sentence Length */}
      <CollapsibleMetricRow
        label="Avg Sentence Length"
        value={data.avgSentenceLength}
        colorClass="bg-emerald-50"
        textColorClass="text-emerald-600"
        metricKey="avgSentenceLength"
        data={data}
      />

      {/* Passive Voice */}
      <CollapsibleMetricRow
        label="Passive Voice"
        value={data.passiveVoice}
        colorClass={data.passiveVoice === "0.0%" ? "bg-muted/30" : "bg-amber-50"}
        textColorClass={data.passiveVoice === "0.0%" ? "text-muted-foreground" : "text-amber-600"}
        metricKey="passiveVoice"
        data={data}
      />

      {/* Issues */}
      {data.issues !== undefined && (
        <MetricRow
          label="Issues"
          value={data.issues}
          colorClass={data.issues > 2 ? "bg-red-50" : "bg-primary/5"}
          textColorClass={data.issues > 2 ? "text-red-600" : "text-primary"}
        />
      )}

      {/* Recommendations */}
      {data.recommendations !== undefined && (
        <MetricRow
          label="Recommendations"
          value={data.recommendations}
          colorClass="bg-primary/5"
          textColorClass="text-primary"
        />
      )}

      {/* Quick Wins */}
      {data.quickWins !== undefined && (
        <MetricRow
          label="Quick Wins"
          value={data.quickWins}
          colorClass="bg-primary/10"
          textColorClass="text-primary"
        />
      )}
    </div>
  );
};

export default function Readability() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("code-of-conduct");
  const [selectedAudience, setSelectedAudience] = useState("business-clients");

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/readability" />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} title="Policy Dashboard" />

        <div className="max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Readability Analysis</h1>
              <p className="text-muted-foreground">
                Analyze and compare readability scores across policy documents and sections
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Clear Analysis</Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Select Document Card */}
          <Card className="card-shadow mb-6">
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-1">Select Document</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Choose a policy document to analyze for readability
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Policy Document
                  </label>
                  <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="code-of-conduct">code-of-conduct</SelectItem>
                      <SelectItem value="whistleblower-policy">Whistleblower-Policy</SelectItem>
                      <SelectItem value="trading-policy">Trading-in-ANZ-Securities-Policy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Target Audience
                  </label>
                  <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="business-clients">Business clients</SelectItem>
                      <SelectItem value="retail-clients">Retail clients</SelectItem>
                      <SelectItem value="internal-staff">Internal staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="rounded-full">
                  <Play className="h-4 w-4 mr-2" />
                  Analyze Readability
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bank Policy Comparison */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-1">Bank Policy Comparison</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Readability analysis comparison across different banks by section
              </p>

              {/* Header Row */}
              <div className="grid grid-cols-5 gap-4 mb-4 px-4">
                <div className="text-sm font-medium text-muted-foreground">Section Name</div>
                {banks.map((bank) => (
                  <div key={bank.id} className="flex items-center gap-2">
                    <span className={cn("w-6 h-6 rounded text-white text-xs flex items-center justify-center font-medium", bank.color)}>
                      {bank.initials}
                    </span>
                    <span className="font-medium text-foreground">{bank.name}</span>
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              <div className="space-y-8">
                {readabilityData.map((row, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 items-start px-4 py-4 border-t border-border">
                    <div className="text-sm font-medium text-foreground pt-2">{row.section}</div>
                    <BankMetricsCard data={row.banks.anz} />
                    <BankMetricsCard data={row.banks.cwb} />
                    <BankMetricsCard data={row.banks.nab} />
                    <BankMetricsCard data={row.banks.westpac} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
