"use client";

import { useEffect, useState } from "react";
import { useAppStore, Fund } from "@/store/useStore";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Check, Star, AlertCircle, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FundTable() {
  const { toast } = useToast();
  const {
    searchQuery,
    selectedCategory,
    sortBy,
    compareList,
    addToCompare,
    removeFromCompare,
  } = useAppStore();

  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch filtered funds reactively when parameters change
  useEffect(() => {
    async function fetchFunds() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          search: searchQuery,
          category: selectedCategory,
          sortBy: sortBy,
          sortOrder: sortBy === "expenseRatio" ? "asc" : "desc", // Low expense is better
        });
        const res = await fetch(`/api/screener?${query}`);
        const json = await res.json();
        if (json.success) {
          setFunds(json.data);
        }
      } catch (err) {
        console.error("Failed to load funds", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchFunds, 200); // Debounce typing queries
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  const handleCompareClick = (fund: Fund) => {
    const isAdded = compareList.find((f) => f.id === fund.id);
    if (isAdded) {
      removeFromCompare(fund.id);
    } else {
      if (compareList.length >= 3) {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 3 mutual funds side-by-side.",
          variant: "destructive",
        });
        return;
      }
      addToCompare(fund);
      toast({
        title: "Added to compare queue",
        description: `${fund.schemeName.split(" - ")[0]} has been added.`,
      });
    }
  };

  // Helper formatting routines
  const formatAUM = (value: number | null) => {
    if (!value) return "N/A";
    if (value >= 1000) return `₹${(value / 1000).toFixed(2)}K Cr`;
    return `₹${value.toFixed(1)} Cr`;
  };

  const formatPercent = (value: number | null) => {
    if (!value) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="space-y-4">
      {/* Search status panel */}
      <div className="flex items-center justify-between text-xs text-slate-450 px-1">
        <span>Showing {loading ? "..." : funds.length} funds matching criteria</span>
        <span className="flex items-center text-slate-500 font-medium">
          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
          Direct Plan - Growth Options Only
        </span>
      </div>

      {/* Main List Container */}
      <div className="space-y-3.5">
        {loading ? (
          // Glassmorphic Loading Skeleton Frames
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-slate-900/20 border border-slate-900/60 p-5 rounded-2xl flex flex-col space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-2/3 bg-slate-800" />
                  <Skeleton className="h-3 w-1/3 bg-slate-800" />
                </div>
                <Skeleton className="h-9 w-24 bg-slate-800" />
              </div>
              <div className="grid grid-cols-4 gap-4 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-1/2 bg-slate-800" />
                    <Skeleton className="h-4 w-3/4 bg-slate-800" />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : funds.length === 0 ? (
          // Empty State illustration card
          <div className="bg-slate-900/20 border border-slate-850 p-12 rounded-2xl flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-10 w-10 text-slate-600 mb-3 stroke-[1.5]" />
            <h3 className="font-bold text-slate-350 text-sm">No funds found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              We couldn&apos;t find any direct plans matching your keywords. Adjust your category filters or double check spelling!
            </p>
          </div>
        ) : (
          // High-end mutual fund lists
          funds.map((fund) => {
            const isCompared = !!compareList.find((f) => f.id === fund.id);
            return (
              <div
                key={fund.id}
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 hover:border-slate-800/80 p-5 rounded-2xl transition-all duration-300 group shadow-[0_2px_12px_rgba(0,0,0,0.15)] flex flex-col space-y-4"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1 pr-4">
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-400 transition-colors duration-300 leading-snug">
                      {fund.schemeName}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        {fund.amcName.split(" Mutual Fund")[0]}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-slate-850 text-slate-400 border-none hover:bg-slate-800 text-[10px] px-2 py-0.5 rounded-md"
                      >
                        {fund.category} • {fund.subCategory || "Direct Plan"}
                      </Badge>
                      {fund.sharpeRatio && fund.sharpeRatio >= 1.6 && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 text-[9px] px-1.5 py-0.5 rounded-md font-bold">
                          High Risk-Adjusted
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleCompareClick(fund)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all duration-300 ${
                        isCompared
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-750"
                      }`}
                    >
                      {isCompared ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 text-xs font-extrabold rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] px-4 py-4 h-auto group-hover:scale-[1.02] transition-all duration-300">
                      Invest Direct
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
                    </Button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-slate-850/60">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                      Current NAV
                    </span>
                    <p className="text-xs font-extrabold text-slate-200">
                      ₹{fund.nav.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                      3-Year returns (CAGR)
                    </span>
                    <p className="text-xs font-extrabold text-emerald-400">
                      {formatPercent(fund.returns3y)}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                      Total Assets (AUM)
                    </span>
                    <p className="text-xs font-extrabold text-slate-200">
                      {formatAUM(fund.aum)}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                      Expense Ratio
                    </span>
                    <p className="text-xs font-extrabold text-slate-350">
                      {formatPercent(fund.expenseRatio)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
