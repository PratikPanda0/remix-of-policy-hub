import { useState } from "react";
import { Upload, Link, Wand2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const riskCategories = [
  { id: "financial", label: "Financial Penalty / Enforcement Risk" },
  { id: "reputational", label: "Reputational / Brand Harm Risk" },
  { id: "data", label: "Data Security & Privacy Risk" },
  { id: "consumer", label: "Consumer Harm & Conduct Risk" },
  { id: "crime", label: "Financial Crime & Sanctions Risk" },
];

export default function CheckPolicy() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [policyUrl, setPolicyUrl] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [selectedRisks, setSelectedRisks] = useState<string[]>(
    riskCategories.map((c) => c.id)
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const toggleRisk = (riskId: string) => {
    setSelectedRisks((prev) =>
      prev.includes(riskId)
        ? prev.filter((id) => id !== riskId)
        : [...prev, riskId]
    );
  };

  const toggleAll = () => {
    if (selectedRisks.length === riskCategories.length) {
      setSelectedRisks([]);
    } else {
      setSelectedRisks(riskCategories.map((c) => c.id));
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/check-policy" />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} title="Policy Dashboard" />

        <div className="max-w-6xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Check Policy Compliance
            </h1>
            <p className="text-muted-foreground mb-8">
              Provide a link to a policy document to analyze APRA compliance and receive detailed recommendations
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Upload & Analysis */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upload New Policy Card */}
                <Card className="card-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Upload className="h-5 w-5 text-primary" />
                      Upload New Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                          id="file-upload"
                        />
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Upload className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Policy Analysis Card */}
                <Card className="card-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Wand2 className="h-5 w-5 text-primary" />
                      Policy Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Input
                          placeholder="Enter policy URL or select from dropdown"
                          value={policyUrl}
                          onChange={(e) => setPolicyUrl(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
                        <SelectTrigger className="w-[200px] h-11 bg-background">
                          <SelectValue placeholder="Or select uploaded policy" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-lg z-50">
                          <SelectItem value="policy-1">Credit Risk Policy</SelectItem>
                          <SelectItem value="policy-2">AML Policy</SelectItem>
                          <SelectItem value="policy-3">Data Privacy Policy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium">
                      <Wand2 className="h-4 w-4 mr-2" />
                      Analyze Policy Compliance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Compliance Focus Areas */}
              <div>
                <Card className="card-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Compliance Focus Areas</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Select risk categories to include in the compliance analysis
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleAll}
                        className="text-xs"
                      >
                        {selectedRisks.length === riskCategories.length
                          ? "Deselect All"
                          : "Select All"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {riskCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={category.id}
                            checked={selectedRisks.includes(category.id)}
                            onCheckedChange={() => toggleRisk(category.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <label
                            htmlFor={category.id}
                            className="flex-1 text-sm font-medium cursor-pointer text-foreground"
                          >
                            {category.label}
                          </label>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
