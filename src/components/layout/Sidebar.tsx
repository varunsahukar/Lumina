"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore, UserRole } from "@/store/useStore";
import { cn } from "@/lib/utils";
import {
  Compass,
  PieChart,
  Target,
  FileText,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Building,
  UserCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { activeRole, setActiveRole } = useAppStore();

  // Define navigation lists for each of the 5 roles
  const navItems: Record<UserRole, NavItem[]> = {
    INVESTOR: [
      { name: "Market Screener", href: "/screener", icon: Compass },
      { name: "My Portfolio", href: "/portfolio", icon: PieChart },
      { name: "Goal Planner", href: "/dashboard", icon: Target },
      { name: "Advisor Hub", href: "/dashboard", icon: Sparkles },
      { name: "Tax Planner", href: "/reports", icon: FileText },
    ],
    ADVISOR: [
      { name: "Client Console", href: "/dashboard", icon: Users },
      { name: "Lead referrals", href: "/dashboard", icon: Award },
      { name: "Commissions", href: "/dashboard", icon: TrendingUp },
      { name: "Research Console", href: "/screener", icon: BookOpen },
    ],
    AMC: [
      { name: "Fund Manager", href: "/dashboard", icon: Building },
      { name: "AMC Factsheets", href: "/dashboard", icon: FileText },
      { name: "Lead Pipeline", href: "/dashboard", icon: Users },
      { name: "Views & Analytics", href: "/dashboard", icon: TrendingUp },
    ],
    RESEARCHER: [
      { name: "Research Center", href: "/dashboard", icon: BookOpen },
      { name: "Publish Insight", href: "/dashboard", icon: Sparkles },
      { name: "Readership Stats", href: "/dashboard", icon: TrendingUp },
    ],
    ADMIN: [
      { name: "System Control", href: "/dashboard", icon: Shield },
      { name: "User Settings", href: "/dashboard", icon: Settings },
      { name: "Audit Logging", href: "/reports", icon: FileText },
      { name: "Integrations", href: "/dashboard", icon: Layers },
    ],
  };

  const currentNav = navItems[activeRole] || [];

  // Helper to map role keys to readable labels
  const roleLabels: Record<UserRole, { label: string; color: string; desc: string }> = {
    INVESTOR: { label: "Investor Console", color: "from-emerald-400 to-teal-500 text-emerald-400", desc: "Browse, screen & buy" },
    ADVISOR: { label: "Advisor Panel", color: "from-blue-400 to-indigo-500 text-blue-400", desc: "Manage client portfolios" },
    AMC: { label: "AMC Control", color: "from-amber-400 to-orange-500 text-amber-400", desc: "List & track fund products" },
    RESEARCHER: { label: "Researcher Hub", color: "from-purple-400 to-pink-500 text-purple-400", desc: "Publish insights & analysis" },
    ADMIN: { label: "Platform Admin", color: "from-rose-400 to-red-500 text-rose-400", desc: "Full control & analytics" },
  };

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-slate-900 bg-black text-white min-h-screen">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-900 justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Shield className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            LuminaVest
          </span>
        </Link>
      </div>

      {/* Role Indicator Widget */}
      <div className="px-4 py-3 border-b border-slate-900 bg-slate-900/30">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Active Workspace
          </span>
          <span className={cn(
            "text-xs font-bold bg-gradient-to-r bg-clip-text text-transparent",
            roleLabels[activeRole].color
          )}>
            {roleLabels[activeRole].label}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {currentNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-300 group border border-transparent",
                isActive
                  ? "bg-slate-900 text-slate-100 border-slate-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 hover:border-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-4 w-4 stroke-[2] transition-colors duration-300",
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-500 group-hover:text-slate-400"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Switcher Control Panel */}
      <div className="p-4 border-t border-slate-900 bg-slate-900/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-slate-100 text-xs px-3 py-5 rounded-xl transition-all duration-300"
            >
              <span className="flex items-center">
                <UserCheck className="mr-2 h-4 w-4 text-emerald-400 stroke-[2]" />
                Switch Role
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-slate-950 border-slate-800 text-slate-300 rounded-xl p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {(Object.keys(roleLabels) as UserRole[]).map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => setActiveRole(role)}
                className={cn(
                  "flex flex-col items-start px-3 py-2 rounded-lg cursor-pointer focus:bg-slate-900 transition-colors duration-200",
                  activeRole === role ? "bg-slate-900 text-emerald-400" : "text-slate-400 focus:text-slate-200"
                )}
              >
                <span className="text-xs font-bold">{roleLabels[role].label}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{roleLabels[role].desc}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
