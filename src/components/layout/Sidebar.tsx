"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Compass, FileText, Layers, PieChart, Settings, Shield, Target, Users } from "lucide-react";
import { useAppStore, UserRole } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { roleDefinitions, roleOrder } from "@/lib/roles";
import { AgencyLogo } from "@/components/agency/AgencyPrimitives";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  name: string;
  href: string;
  icon: keyof typeof iconMap;
  code: string;
}

const iconMap = {
  compass: Compass,
  file: FileText,
  layers: Layers,
  pie: PieChart,
  settings: Settings,
  shield: Shield,
  target: Target,
  users: Users,
};

const navItems = Object.fromEntries(
  roleOrder.map((role) => [role, roleDefinitions[role].nav])
) as Record<UserRole, NavItem[]>;

export default function Sidebar() {
  const pathname = usePathname();
  const { activeRole, setActiveRole } = useAppStore();
  const activeDefinition = roleDefinitions[activeRole];

  return (
    <aside className="hidden min-h-screen w-[290px] shrink-0 border-r-[3px] border-black bg-[#0b0b0b] text-[#f7eee8] md:flex md:flex-col">
      <div className="border-b border-[#262626] px-7 py-7">
        <AgencyLogo dark />
      </div>

      <div className="border-b border-[#262626] px-7 py-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#77716d]">
          Active workspace
        </p>
        <p className="text-xl font-bold text-[#f7eee8]">{activeDefinition.label}</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-[#9d9793]">
          {activeDefinition.description}
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems[activeRole].map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.icon];
          return (
            <Link
              key={`${item.code}-${item.name}`}
              href={item.href}
              className={cn(
                "group grid grid-cols-[2rem_1fr_auto] items-center border border-transparent px-3 py-4 text-sm font-bold transition-colors",
                isActive
                  ? "border-[#4ba1a7] bg-[#123f45] text-[#f7eee8]"
                  : "text-[#9d9793] hover:border-[#333] hover:bg-[#111]",
              )}
            >
              <span className={isActive ? "text-[#4ba1a7]" : "text-[#77716d]"}>{item.code}</span>
              <span>{item.name}</span>
              <Icon className="h-4 w-4" />
            </Link>
          );
        })}
      </nav>

      <div className="space-y-4 border-t border-[#262626] p-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-14 w-full items-center justify-between border-[3px] border-[#77716d] bg-[#0b0b0b] px-4 text-sm font-bold text-[#f7eee8] shadow-[7px_7px_0_#4b4b4b]">
              Switch Role
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={10}
            className="w-[260px] rounded-none border-[3px] border-black bg-[#f7eee8] p-1 text-black shadow-[8px_8px_0_#000]"
          >
            {roleOrder.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => setActiveRole(role)}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 rounded-none px-4 py-3 text-left focus:bg-[#c95545] focus:text-[#f7eee8]",
                  activeRole === role && "bg-[#4ba1a7] text-black",
                )}
              >
                <span className="font-heading text-sm font-extrabold leading-none">
                  {roleDefinitions[role].label}
                </span>
                <span className="font-body text-[0.72rem] font-bold leading-snug opacity-70">
                  {roleDefinitions[role].description}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
