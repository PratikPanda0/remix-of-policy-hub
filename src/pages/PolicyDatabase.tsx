import { useState } from "react";
import { FileText, Eye, Edit, Download, Trash2, Check, Clock, Search, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

// Approved Policies data
const approvedPolicies = [
  {
    id: 1,
    name: "Whistleblower-Policy",
    author: "author",
    compliance: 100,
    countries: ["AU"],
    uploadDate: "11/4/2025",
  },
];

// Reviewed Policies data
const reviewedPolicies = [
  {
    id: 1,
    name: "Whistleblower-Policy",
    author: "author",
    countries: ["AU"],
    uploadDate: "11/4/2025",
  },
  {
    id: 2,
    name: "code-of-conduct",
    author: "author",
    countries: ["AU"],
    uploadDate: "11/4/2025",
  },
  {
    id: 3,
    name: "Trading-in-ANZ-Securities-Policy",
    author: "author",
    countries: ["AU"],
    uploadDate: "11/3/2025",
  },
  {
    id: 4,
    name: "code-of-conduct",
    author: "author",
    countries: ["AU"],
    uploadDate: "11/3/2025",
  },
];

// Needs Review Policies data
const needsReviewPolicies = [
  {
    id: 1,
    name: "Trading-in-ANZ-Securities-Policy",
    author: "author",
    createdDate: "11/10/2025",
    currentStep: "review",
    changesApplied: 1,
    comments: 1,
  },
  {
    id: 2,
    name: "code-of-conduct",
    author: "author",
    createdDate: "11/13/2025",
    currentStep: "editing",
    changesApplied: 2,
    comments: 0,
  },
  {
    id: 3,
    name: "Trading-in-ANZ-Securities-Policy",
    author: "author",
    createdDate: "11/5/2025",
    currentStep: "editing",
    changesApplied: 1,
    comments: 0,
  },
];

// Uploaded Policies data
const uploadedPolicies = [
  {
    id: 1,
    name: "anti-bribery-and-anti-corruption-policy.pdf",
    uploadedDate: "Nov 4, 2025, 09:05 PM",
    fileSize: "13.83 KB",
  },
  {
    id: 2,
    name: "code-of-conduct",
    uploadedDate: "Nov 3, 2025, 06:44 PM",
    fileSize: "7.48 KB",
  },
  {
    id: 3,
    name: "Whistleblower-Policy",
    uploadedDate: "Oct 31, 2025, 08:25 PM",
    fileSize: "97.59 KB",
  },
  {
    id: 4,
    name: "Trading-in-ANZ-Securities-Policy",
    uploadedDate: "Oct 31, 2025, 08:25 PM",
    fileSize: "29.82 KB",
  },
  {
    id: 5,
    name: "privacy-policy",
    uploadedDate: "Oct 31, 2025, 08:25 PM",
    fileSize: "52.10 KB",
  },
];

export default function PolicyDatabase() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("approved");

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/policy-database" />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} title="Policy Dashboard" />

        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Policy Database</h1>
          <p className="text-muted-foreground mb-8">Manage uploaded files and review documents</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-full mb-6 w-fit">
              <TabsTrigger
                value="approved"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Approved Policies
              </TabsTrigger>
              <TabsTrigger
                value="reviewed"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Reviewed Policies
              </TabsTrigger>
              <TabsTrigger
                value="needs-review"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Needs Review Policies
              </TabsTrigger>
              <TabsTrigger
                value="uploaded"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Uploaded Policies
              </TabsTrigger>
            </TabsList>

            {/* Approved Policies Tab */}
            <TabsContent value="approved">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search policies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 max-w-md"
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Document Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Countries</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Upload Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedPolicies.map((policy) => (
                          <tr key={policy.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground">{policy.name}</span>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                      <Check className="h-3 w-3 mr-1" />
                                      {policy.compliance}% Compliant
                                    </Badge>
                                  </div>
                                  <span className="text-sm text-muted-foreground">by {policy.author}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1">
                                {policy.countries.map((country) => (
                                  <Badge key={country} variant="outline" className="text-xs">
                                    <span className="text-primary font-medium">AU</span> {country}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{policy.uploadDate}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviewed Policies Tab */}
            <TabsContent value="reviewed">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search policies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 max-w-md"
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Document Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Countries</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Upload Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviewedPolicies.map((policy) => (
                          <tr key={policy.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <span className="font-medium text-foreground">{policy.name}</span>
                                  <p className="text-sm text-muted-foreground">by {policy.author}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1">
                                {policy.countries.map((country) => (
                                  <Badge key={country} variant="outline" className="text-xs">
                                    <span className="text-primary font-medium">AU</span> {country}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{policy.uploadDate}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Needs Review Policies Tab */}
            <TabsContent value="needs-review">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 max-w-md"
                />
              </div>

              <div className="space-y-4">
                {needsReviewPolicies.map((policy) => (
                  <Card key={policy.id} className="card-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{policy.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created by {policy.author} • {policy.createdDate}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            policy.currentStep === "review"
                              ? "border-primary text-primary"
                              : "border-primary text-primary"
                          )}
                        >
                          {policy.currentStep === "review" ? "Review" : "Editing"}
                        </Badge>
                      </div>

                      {/* Progress Steps */}
                      <div className="flex items-center gap-0 mb-4">
                        {/* Editing Step */}
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              policy.currentStep === "editing"
                                ? "bg-primary text-primary-foreground"
                                : "bg-emerald-500 text-white"
                            )}
                          >
                            {policy.currentStep === "editing" ? (
                              <Edit className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        <div
                          className={cn(
                            "flex-1 h-1",
                            policy.currentStep === "editing" ? "bg-muted" : "bg-emerald-500"
                          )}
                        />

                        {/* Review Step */}
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              policy.currentStep === "review"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <Eye className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="flex-1 h-1 bg-muted" />

                        {/* Approval Step */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      {/* Step Labels */}
                      <div className="flex justify-between mb-4">
                        <span
                          className={cn(
                            "text-xs",
                            policy.currentStep === "editing" ? "text-primary font-medium" : "text-emerald-500"
                          )}
                        >
                          Editing
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            policy.currentStep === "review" ? "text-primary font-medium" : "text-muted-foreground"
                          )}
                        >
                          Review
                        </span>
                        <span className="text-xs text-muted-foreground">Approval</span>
                      </div>

                      <p className="text-sm text-primary mb-4">
                        {policy.changesApplied} change{policy.changesApplied !== 1 ? "s" : ""} applied
                        {policy.comments > 0 && ` • ${policy.comments} comment${policy.comments !== 1 ? "s" : ""}`}
                      </p>

                      <div className="flex items-center gap-2">
                        {policy.currentStep === "review" ? (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Continue Editing
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Uploaded Policies Tab */}
            <TabsContent value="uploaded">
              <Card className="card-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Uploaded Policy Files</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    All <span className="text-primary">policy</span> files that have been uploaded to the system
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {uploadedPolicies.map((policy) => (
                    <Card key={policy.id} className="border">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium text-foreground">{policy.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Uploaded {policy.uploadedDate}
                            </div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {policy.fileSize}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
