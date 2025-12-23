import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileCheck,
  AlertTriangle,
  Database,
  BookOpen,
  MessageCircle,
  Shield,
  Settings,
  Building2,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Check Policy", icon: FileCheck, href: "/check-policy" },
  { label: "Conflicts", icon: AlertTriangle, href: "/conflicts" },
  { label: "Policy Database", icon: Database, href: "/policy-database" },
  { label: "Readability", icon: BookOpen, href: "/readability" },
  { label: "Chat Assistant", icon: MessageCircle, href: "/chat" },
  { label: "Admin", icon: Shield, href: "/admin" },
];

const bottomNavItems: NavItem[] = [{ label: "Settings", icon: Settings, href: "/settings" }];

interface SidebarProps {
  collapsed: boolean;
  currentPath?: string;
}

export function Sidebar({ collapsed, currentPath }: SidebarProps) {
  const location = useLocation();
  const activePath = currentPath || location.pathname;

  return (
    <aside
      className={cn(
        "flex flex-col min-h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-0 overflow-hidden opacity-0" : "w-64 opacity-100",
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold text-foreground">PoliSync</span>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">ANZ</span>
        </div>
      </div>

      {/* Powered By Section */}
      <div className="px-6 py-4 border-b border-sidebar-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Powered by</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">L</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">lyzr</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
              <span className="text-[10px] font-bold text-muted-foreground">F</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">firstsource</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Section */}
        <div className="mt-4 p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">PP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Pratik Panda</p>
              <span className="text-xs px-1.5 py-0.5 bg-primary text-primary-foreground rounded">author</span>
            </div>
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  );
}
