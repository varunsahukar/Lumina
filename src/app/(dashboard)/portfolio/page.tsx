"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  TrendingUp,
  UploadCloud,
  FileText,
  PieChartIcon,
  Target,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

// Mock holdings populated upon CAS parsing simulation
const MOCK_HOLDINGS = [
  { name: "Parag Parikh Flexi Cap Direct", units: 480.20, nav: 84.62, value: 40634.50, invested: 28000, returns: 0.451 },
  { name: "HDFC Mid-Cap Opportunities Direct", units: 280.12, nav: 174.15, value: 48782.90, invested: 32000, returns: 0.524 },
  { name: "Nippon India Small Cap Direct", units: 320.40, nav: 162.80, value: 52161.10, invested: 30000, returns: 0.738 },
  { name: "ICICI Prudential Equity & Debt Hybrid", units: 140.10, nav: 325.40, value: 45588.50, invested: 35000, returns: 0.302 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#a855f7"];

export default function PortfolioPage() {
  const { toast } = useToast();
  const [isUploaded, setIsUploaded] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCasSimulation = () => {
    setParsing(true);
    setProgress(10);
    
    // Simulate real-time progress steps for high-fidelity interactive liveness
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setParsing(false);
            setIsUploaded(true);
            toast({
              title: "CAS Upload parsed successfully!",
              description: "Extracted 4 direct plan portfolios with full XIRR analysis.",
            });
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const chartData = [
    { name: "Flexi Cap", value: 40634.50 },
    { name: "Mid Cap", value: 48782.90 },
    { name: "Small Cap", value: 52161.10 },
    { name: "Hybrid", value: 45588.50 },
  ];

  const formatPercent = (value: number | null) => {
    if (!value) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/25 rounded-xl">
            <PieChartIcon className="h-5 w-5 text-emerald-400 stroke-[2]" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-100 sm:text-2xl">
            My Portfolio Analytics
          </h1>
        </div>
        <p className="text-xs text-slate-450 pl-1">
          Perform immediate diagnostics, absolute return parsing, and XIRR tracking on your personal investments.
        </p>
      </div>

      {!isUploaded ? (
        // State 1: Premium CAS Upload Drag-Drop simulation panel
        <div className="max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 space-y-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <UploadCloud className="h-10 w-10 text-emerald-400 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-200">Parse Common Account Statement (CAS)</h2>
              <p className="text-xs text-slate-550 max-w-md mx-auto leading-relaxed">
                Drag and drop your CAMS / Karvy consolidated PDF statement here to immediately perform diagnostics on direct vs regular plan leakage.
              </p>
            </div>
          </div>

          {parsing ? (
            // Simulation progress bar
            <div className="space-y-3 max-w-sm mx-auto">
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>Parsing PDF & matching AMFI feeds...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-slate-950 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500" />
            </div>
          ) : (
            // Upload trigger buttons
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                onClick={handleCasSimulation}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold text-xs px-6 py-5 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-all duration-300"
              >
                Simulate CAS Statement Upload
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-slate-800 bg-slate-950 text-slate-350 hover:bg-slate-900 text-xs px-6 py-5 rounded-xl transition-all duration-300"
              >
                Learn How to Download CAS Statement
              </Button>
            </div>
          )}

          {/* Secure indicator tag */}
          <div className="pt-4 border-t border-slate-900/60 flex items-center justify-center text-[10px] text-slate-650 font-medium">
            <ShieldCheck className="h-4 w-4 mr-1 text-emerald-500" />
            We support zero-storage PII isolation inside localized Edge sandboxes.
          </div>
        </div>
      ) : (
        // State 2: High-end Diagnostics Dashboard View
        <div className="space-y-6 animate-fade-in">
          {/* Metrics summary highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Portfolio Value FROST card */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Total Portfolio Worth
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-105">
                  ₹1,87,167.00
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 text-xs">
                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-none font-bold">
                  +₹62,167.00 Absolute Gain
                </Badge>
                <span className="text-slate-500 font-semibold text-[10px]">
                  Invested: ₹1.25L
                </span>
              </div>
            </div>

            {/* XIRR Rate Speedometer FROST card */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Personal Annualized XIRR
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-400">
                  24.82%
                </h2>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center text-[10px]">
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                  Outperforming Benchmark by +4.2%
                </span>
              </div>
            </div>

            {/* AI Diagnostics Advice FROST card */}
            <div className="bg-gradient-to-br from-slate-900/40 to-emerald-950/10 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between space-y-4 group">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    Lumina AI Doctor Insight
                  </span>
                  <Sparkles className="h-4 w-4 text-emerald-400 fill-emerald-400/20 group-hover:animate-pulse" />
                </div>
                <p className="text-xs text-slate-350 leading-relaxed pt-1.5">
                  &quot;Switched 100% to direct plans. High Sharpe ratios index. Your small cap mid cap overlap is under 8%—optimally diversified.&quot;
                </p>
              </div>
              <button className="text-[11px] text-slate-450 hover:text-slate-200 font-bold flex items-center transition-colors">
                Run Advanced Holding Scan
                <ChevronRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>

          {/* Asset Allocation Recharts and Goals grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut Chart visual widget */}
            <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <h3 className="text-sm font-bold text-slate-200">Asset Division Diagnostic</h3>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Mutual Funds Only</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Donut graph */}
                <div className="h-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px", fontSize: "11px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Holdings</span>
                    <span className="text-md font-extrabold">4 Plans</span>
                  </div>
                </div>

                {/* Donut chart legend list */}
                <div className="space-y-2.5">
                  {chartData.map((item, idx) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[idx] }} />
                        <span className="text-slate-400 font-semibold">{item.name}</span>
                      </div>
                      <span className="font-extrabold text-slate-250">
                        {((item.value / 187167) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Goal milestoner tracking lists */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center space-x-1.5">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-200">Linked Wealth Goals</h3>
                </div>
                <button className="text-[10px] text-slate-450 hover:text-slate-200 font-bold">Edit</button>
              </div>

              {/* Goals Progress bar list */}
              <div className="space-y-4.5 flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-350">Retirement Fund 2045</span>
                    <span className="font-bold text-emerald-400">62% reached</span>
                  </div>
                  <Progress value={62} className="h-1.5 bg-slate-950 [&>div]:bg-emerald-400" />
                  <span className="text-[9px] text-slate-550 block font-medium">Target: ₹1.5 Cr | Current: ₹93,500</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-350">First Home Downpayment</span>
                    <span className="font-bold text-blue-400">30% reached</span>
                  </div>
                  <Progress value={30} className="h-1.5 bg-slate-950 [&>div]:bg-blue-400" />
                  <span className="text-[9px] text-slate-550 block font-medium">Target: ₹20 Lakhs | Current: ₹60,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Holdings breakdown table list */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] space-y-4">
            <h3 className="text-sm font-bold text-slate-250">Individual Portfolio Breakdown</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-850/60 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 pr-4">Direct Scheme Option Name</th>
                    <th className="py-3 px-4">Allotted Units</th>
                    <th className="py-3 px-4">Invested Amount</th>
                    <th className="py-3 px-4">Current Value</th>
                    <th className="py-3 px-4">Abs. Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/30 text-slate-300">
                  {MOCK_HOLDINGS.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-900/10">
                      <td className="py-4 pr-4 font-bold text-slate-100">{h.name}</td>
                      <td className="py-4 px-4 font-semibold text-slate-350">{h.units.toFixed(2)}</td>
                      <td className="py-4 px-4 font-bold">₹{h.invested.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 font-extrabold text-slate-100">₹{h.value.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 font-extrabold text-emerald-400">+{formatPercent(h.returns)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
