import { useState } from "react";
import { Shield, Users, Key, Lock, UserPlus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

// Users data
const usersData = [
  {
    id: 1,
    name: "Sarah Williams",
    initials: "SW",
    email: "sarah.williams@anz.com",
    department: "HR Compliance",
    roles: ["Admin", "Policy Manager"],
    status: "active",
    lastLogin: "2024-11-04 09:30",
  },
  {
    id: 2,
    name: "Michael Chen",
    initials: "MC",
    email: "michael.chen@anz.com",
    department: "Legal",
    roles: ["Policy Reviewer"],
    status: "active",
    lastLogin: "2024-11-04 08:15",
  },
  {
    id: 3,
    name: "Emma Johnson",
    initials: "EJ",
    email: "emma.johnson@anz.com",
    department: "HR Operations",
    roles: ["Policy Viewer"],
    status: "active",
    lastLogin: "2024-11-03 16:45",
  },
  {
    id: 4,
    name: "David Kumar",
    initials: "DK",
    email: "david.kumar@anz.com",
    department: "Compliance",
    roles: ["Policy Manager", "Auditor"],
    status: "active",
    lastLogin: "2024-11-04 10:00",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    initials: "LA",
    email: "lisa.anderson@anz.com",
    department: "HR Policy",
    roles: ["Policy Creator"],
    status: "inactive",
    lastLogin: "2024-10-28 14:20",
  },
];

export default function Admin() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/admin" />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} title="Policy Dashboard" />

        <div className="max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin & Access Control</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Manage users, roles, and permissions for ANZ Policy Compliance System
          </p>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-full mb-6 w-fit">
              <TabsTrigger
                value="users"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <Shield className="h-4 w-4 mr-2" />
                Roles
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <Key className="h-4 w-4 mr-2" />
                Permissions
              </TabsTrigger>
              <TabsTrigger
                value="access-control"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <Lock className="h-4 w-4 mr-2" />
                Access Control
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">User Management</h2>
                      <p className="text-sm text-muted-foreground">Manage system users and their role assignments</p>
                    </div>
                    <Button className="rounded-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Department</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Roles</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Login</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersData.map((user) => (
                          <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 bg-primary/10">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                    {user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-foreground">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-primary">{user.email}</td>
                            <td className="py-4 px-4 text-muted-foreground">{user.department}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1 flex-wrap">
                                {user.roles.map((role) => (
                                  <Badge key={role} variant="outline" className="text-xs">
                                    {role}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                className={cn(
                                  "text-xs",
                                  user.status === "active"
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : "bg-muted text-muted-foreground border-border"
                                )}
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{user.lastLogin}</td>
                            <td className="py-4 px-4">
                              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roles Tab */}
            <TabsContent value="roles">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Role Management</h2>
                  <p className="text-muted-foreground">Configure and manage system roles</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Permissions</h2>
                  <p className="text-muted-foreground">Manage granular permissions for roles</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Access Control Tab */}
            <TabsContent value="access-control">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Access Control</h2>
                  <p className="text-muted-foreground">Configure access control policies</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
