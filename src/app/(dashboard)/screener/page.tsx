import FundTable from "@/components/screener/FundTable";
import FilterPanel from "@/components/screener/FilterPanel";
import CompareBar from "@/components/screener/CompareBar";
import { Compass } from "lucide-react";

export default function ScreenerPage() {
  return (
    <div className="space-y-8 text-[#070707] dark:text-[#f7eee8]">
      <div className="flex flex-col gap-2 border-b-[3px] border-black pb-7 dark:border-[#f7eee8]/25">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center border-[3px] border-black bg-[#4ba1a7] shadow-[5px_5px_0_#000] dark:border-[#f7eee8] dark:bg-[#123f45] dark:shadow-[5px_5px_0_#c95545]">
            <Compass className="h-5 w-5 text-black dark:text-[#f7eee8]" />
          </div>
          <h1 className="text-4xl font-black leading-none sm:text-5xl">
            Mutual Fund Screener
          </h1>
        </div>
        <p className="max-w-3xl text-sm font-semibold leading-6 text-[#5b5652] dark:text-[#bdb5ae]">
          Explore and filter Direct Plan mutual funds using daily AMFI NAV data and risk-adjusted Sharpe metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
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
