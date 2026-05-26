"use client";

import { useState, useEffect } from "react";
import { useAppStore, UserRole } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp,
  Award,
  Users,
  Building,
  Shield,
  Sparkles,
  BookOpen,
  PieChart,
  Target,
  FileText,
  Activity,
  UserCheck,
  Server,
  Layers,
  ArrowUpRight,
  ChevronRight,
  ArrowDownRight,
  Database,
  Search,
  Loader2
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const { activeRole } = useAppStore();
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} triggered`,
      description: "Feature running inside sandboxed early-stage prototype environment.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  // Mock datasets for various roles
  const amcChartData = [
    { name: "Large Cap", views: 2400 },
    { name: "Mid Cap", views: 4500 },
    { name: "Small Cap", views: 7200 },
    { name: "Hybrid", views: 3200 },
    { name: "Debt", views: 1800 },
  ];

  return (
    <div className="space-y-6 text-white animate-fade-in">
      
      {/* 👤 INVESTOR ROLE DASHBOARD */}
      {activeRole === "INVESTOR" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Investor Dashboard
              </h1>
              <p className="text-xs text-[#a3a3a3]">
                Direct mutual fund investing, XIRR returns, and tax diagnostics.
              </p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-md font-bold">
                KRA Verified
              </Badge>
              <Badge className="bg-black border border-[#1a1a1a] text-[#a3a3a3] text-xs px-2.5 py-1 rounded-md font-bold">
                Moderate Risk Profile
              </Badge>
            </div>
          </div>

          {/* Metrics summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Net assets card */}
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Total Worth
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  ₹18,45,200.00
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 text-xs">
                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-none font-bold">
                  +₹6,45,200 Absolute Gain
                </Badge>
                <span className="text-[#a3a3a3] font-semibold text-[10px]">
                  Daily: +1.12%
                </span>
              </div>
            </div>

            {/* XIRR meter card */}
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Annualized Returns (XIRR)
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-400">
                  {stats?.avgEquityReturns || "18.42"}%
                </h2>
              </div>
              <div className="flex items-center justify-between text-xs text-[#a3a3a3]">
                <span className="flex items-center text-[10px]">
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                  Direct Plans alpha beat: +3.8%
                </span>
              </div>
            </div>

            {/* Active Goals card */}
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Goals Completion
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-blue-400">
                  2 Active Goals
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-[#a3a3a3] font-bold">
                  <span>Retirement Fund 2045</span>
                  <span>60% reached</span>
                </div>
                <Progress value={60} className="h-1 bg-black [&>div]:bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Invest Direct", desc: "Purchase mutual funds", icon: PlusCircleIcon, action: "Invest Direct" },
                { name: "Tax Diagnostics", desc: "Capital gains harvesting", icon: FileText, action: "Tax Diagnostics" },
                { name: "Risk Profiler", desc: "Evaluate risk appetite", icon: Target, action: "Risk Profiler" },
                { name: "Advisor Hub", desc: "Get portfolio matches", icon: Sparkles, action: "Advisor Hub" },
              ].map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.name}
                    onClick={() => handleQuickAction(act.action)}
                    className="p-4 bg-black border border-[#1a1a1a] hover:border-[#1a1a1a] hover:bg-black/60 rounded-xl transition-all duration-300 text-left space-y-2 group"
                  >
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg w-fit text-emerald-400 group-hover:scale-[1.05] transition-transform">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{act.name}</h4>
                      <p className="text-[10px] text-[#a3a3a3] mt-0.5">{act.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 🤝 ADVISOR ROLE DASHBOARD */}
      {activeRole === "ADVISOR" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Advisor Portal
              </h1>
              <p className="text-xs text-[#a3a3a3]">
                Manage client portfolios, inbound leads, and recurring commission dashboards.
              </p>
            </div>
            <Button
              onClick={() => handleQuickAction("Invite Client")}
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 hover:text-slate-950 text-xs font-bold rounded-xl px-4 py-4 h-auto shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            >
              <Users className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              Onboard New Client
            </Button>
          </div>

          {/* Advisor stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Assets Under Advisory (AUA)
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  ₹8.45 Crore
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 text-xs">
                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-none font-bold">
                  12 Active Clients
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Monthly Brokerage / Fees
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  ₹42,500.00
                </h2>
              </div>
              <span className="text-[#a3a3a3] font-semibold text-[10px]">
                SIP Commission payout: +₹8,400 monthly
              </span>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Inbound Client Leads
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-400">
                  3 Pending Match
                </h2>
              </div>
              <div className="flex items-center text-[10px] text-[#a3a3a3]">
                <Sparkles className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                Algorithm score matched based on HNI status
              </div>
            </div>
          </div>

          {/* Active Clients List */}
          <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">Your Active Clients</h3>
            <div className="space-y-3">
              {[
                { name: "Arjun Sharma", value: "₹2.45 Cr", status: "Balanced Hybrid", change: "+14.8%" },
                { name: "Priya Nair", value: "₹1.80 Cr", status: "Aggressive Equity", change: "+22.4%" },
                { name: "Dr. Sandeep Patel", value: "₹4.20 Cr", status: "Conservative Debt", change: "+8.9%" },
              ].map((client) => (
                <div
                  key={client.name}
                  className="flex items-center justify-between p-4 bg-black border border-[#1a1a1a] hover:border-[#1a1a1a] rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-black border border-[#1a1a1a] rounded-lg text-[#a3a3a3]">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{client.name}</h4>
                      <p className="text-[9px] text-[#a3a3a3] mt-0.5">{client.status} profile</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-white block">{client.value}</span>
                    <span className="text-[9px] font-bold text-emerald-400 mt-0.5">{client.change} Returns</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🏢 FUND HOUSE (AMC) DASHBOARD */}
      {activeRole === "AMC" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                AMC Control Center
              </h1>
              <p className="text-xs text-[#a3a3a3]">
                Track assets under management, daily views, and document uploads.
              </p>
            </div>
            <Button
              onClick={() => handleQuickAction("Upload Factsheet")}
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 hover:text-slate-950 text-xs font-bold rounded-xl px-4 py-4 h-auto shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            >
              <FileText className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              Upload Monthly Factsheet
            </Button>
          </div>

          {/* AMC stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Total Managed AUM
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  ₹{(stats?.totalAum / 1000).toFixed(2)} Lakh Crore
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 text-xs">
                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-none font-bold">
                  {stats?.fundsCount || "28"} Listed Direct Schemes
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Fund Page Views (24h)
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  18,900 Views
                </h2>
              </div>
              <span className="text-[#a3a3a3] font-semibold text-[10px]">
                Scheme code 120847 captures 38% clicks
              </span>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Direct Inflows (Weekly)
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-400">
                  +₹4.2 Crore
                </h2>
              </div>
              <div className="flex items-center text-[10px] text-[#a3a3a3]">
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                SIP inflows active for 12,400 mandates
              </div>
            </div>
          </div>

          {/* Daily views chart */}
          <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">Fund Views By Category</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={amcChartData}>
                  <RechartsXAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <RechartsYAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px", fontSize: "11px" }} />
                  <RechartsBar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 🔬 RESEARCH CONTRIBUTOR DASHBOARD */}
      {activeRole === "RESEARCHER" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Research Center
              </h1>
              <p className="text-xs text-[#a3a3a3]">
                Publish insights, monetize fund analyses, and track viewership analytics.
              </p>
            </div>
            <Button
              onClick={() => handleQuickAction("Publish Article")}
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 hover:text-slate-950 text-xs font-bold rounded-xl px-4 py-4 h-auto shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            >
              <BookOpen className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              Publish New Insight
            </Button>
          </div>

          {/* Researcher stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Total Article Views
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  48,200 Views
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 text-xs">
                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-none font-bold">
                  8 Insights Published
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Insight Subscriptions Revenue
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  ₹8,900.00
                </h2>
              </div>
              <span className="text-[#a3a3a3] font-semibold text-[10px]">
                Paid readers: 48 active HNIs
              </span>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                  Peer Review Credibility Score
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-400">
                  98.4%
                </h2>
              </div>
              <div className="flex items-center text-[10px] text-[#a3a3a3]">
                <Award className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                Top 5% researcher inside direct investing
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⚙️ ADMIN PLATFORM OWNER DASHBOARD */}
      {activeRole === "ADMIN" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                System Console
              </h1>
              <p className="text-xs text-[#a3a3a3]">
                Platform telemetries, database pool monitoring, and AMFI cron scheduler logs.
              </p>
            </div>
            <Button
              onClick={() => handleQuickAction("Trigger CRON AMFI")}
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 hover:text-slate-950 text-xs font-bold rounded-xl px-4 py-4 h-auto shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            >
              <Activity className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              Trigger AMFI NAV Feed Sync
            </Button>
          </div>

          {/* Admin stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                    Next.js Edge Clusters
                  </span>
                  <Server className="h-4 w-4 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-450">
                  99.99% Up
                </h2>
              </div>
              <span className="text-[#a3a3a3] font-semibold text-[10px]">
                Edge locations active in Mumbai, Singapore
              </span>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                    PostgreSQL DB Schemes
                  </span>
                  <Database className="h-4 w-4 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  {stats?.fundsCount || "0"} Seeded Funds
                </h2>
              </div>
              <span className="text-[#a3a3a3] font-semibold text-[10px]">
                AMFI NAV parsing pipeline healthy
              </span>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 rounded-2xl  flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider">
                    Registered Accounts
                  </span>
                  <Layers className="h-4 w-4 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  {stats?.usersCount || "0"} Active Users
                </h2>
              </div>
              <span className="text-[#a3a3a3] font-semibold text-[10px]">
                Role-based access controls active
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple missing icon component
function PlusCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}
