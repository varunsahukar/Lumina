import FundTable from "@/components/screener/FundTable";
import FilterPanel from "@/components/screener/FilterPanel";
import CompareBar from "@/components/screener/CompareBar";
import { Compass } from "lucide-react";

export default function ScreenerPage() {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/25 rounded-xl">
            <Compass className="h-5 w-5 text-emerald-400 stroke-[2]" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-100 sm:text-2xl">
            Mutual Fund Screener
          </h1>
        </div>
        <p className="text-xs text-slate-450 pl-1">
          Explore and filter Direct Plan mutual funds using daily AMFI NAV data and risk-adjusted Sharpe metrics.
        </p>
      </div>

      {/* Grid Layout splits filter controls and data grids */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>
        <div className="lg:col-span-3">
          <FundTable />
        </div>
      </div>

      {/* Floating Comparison Overlay Drawer */}
      <CompareBar />
    </div>
  );
}
