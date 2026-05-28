"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState("backend");
  const hasLoadedFundsRef = useRef(false);

  // Fetch filtered funds reactively when parameters change
  useEffect(() => {
    async function fetchFunds() {
      setLoading(!hasLoadedFundsRef.current);
      try {
        const query = new URLSearchParams({
          search: searchQuery,
          category: selectedCategory,
          sortBy: sortBy,
          sortOrder: sortBy === "expenseRatio" ? "asc" : "desc", // Low expense is better
        });
        const res = await fetch(`/api/screener?${query}`);
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Unable to load screener data");
        }

        let nextFunds = Array.isArray(json.data) ? json.data : [];
        let nextSource = json.source || "backend";
        let nextNotice: string | null = null;

        if (nextFunds.length === 0 && selectedCategory !== "All") {
          const fallbackQuery = new URLSearchParams({
            search: searchQuery,
            category: "All",
            sortBy,
            sortOrder: sortBy === "expenseRatio" ? "asc" : "desc",
          });
          const fallbackRes = await fetch(`/api/screener?${fallbackQuery}`);
          const fallbackJson = await fallbackRes.json();

          if (
            fallbackRes.ok &&
            fallbackJson.success &&
            Array.isArray(fallbackJson.data) &&
            fallbackJson.data.length > 0
          ) {
            nextFunds = fallbackJson.data;
            nextSource = fallbackJson.source || nextSource;
            nextNotice = `No ${selectedCategory} instruments are in the current feed yet. Showing all live instruments.`;
          }
        }

        if (Array.isArray(nextFunds)) {
          setFunds(nextFunds);
          setDataSource(nextSource);
          setError(null);
          setNotice(nextNotice);
          hasLoadedFundsRef.current = true;
        }
      } catch (err) {
        console.error("Failed to load funds", err);
        setError(
          hasLoadedFundsRef.current
            ? "Live refresh failed. Showing the last loaded instruments."
            : "Unable to load instruments from the backend."
        );
        setNotice(null);
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
    if (value === null || value === undefined || !Number.isFinite(Number(value))) return "N/A";
    const numeric = Number(value);
    const displayValue = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
    return `${displayValue.toFixed(2)}%`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 px-1 text-xs font-bold text-[#5b5652] dark:text-[#bdb5ae] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {loading ? "..." : funds.length} instruments matching criteria
          {dataSource === "database-fallback" ? " from local cache" : ""}
        </span>
        <span className="flex items-center">
          <Star className="mr-1 h-3 w-3 fill-[#c95545] text-[#c95545] dark:fill-[#4ba1a7] dark:text-[#4ba1a7]" />
          Direct Plan - Growth Options Only
        </span>
      </div>

      {error ? (
        <div className="border-[3px] border-[#c95545] bg-[#ffe5df] px-4 py-3 text-xs font-bold text-[#721f17] dark:border-[#c95545] dark:bg-[#32110e] dark:text-[#ffd9d2]">
          {error}
        </div>
      ) : null}

      {!error && notice ? (
        <div className="border-[3px] border-black bg-[#dff5f1] px-4 py-3 text-xs font-bold text-[#082f33] shadow-[4px_4px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#123f45] dark:text-[#bcece6] dark:shadow-[4px_4px_0_#4ba1a7]">
          {notice}
        </div>
      ) : null}

      <div className="space-y-3.5">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-4 border-[3px] border-black bg-[#f7eee8] p-5 shadow-[6px_6px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:shadow-[6px_6px_0_#c95545]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-2/3 bg-[#d8cec7] dark:bg-[#252525]" />
                  <Skeleton className="h-3 w-1/3 bg-[#d8cec7] dark:bg-[#252525]" />
                </div>
                <Skeleton className="h-9 w-24 bg-[#d8cec7] dark:bg-[#252525]" />
              </div>
              <div className="grid grid-cols-4 gap-4 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-1/2 bg-[#d8cec7] dark:bg-[#252525]" />
                    <Skeleton className="h-4 w-3/4 bg-[#d8cec7] dark:bg-[#252525]" />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : funds.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-[3px] border-black bg-[#f7eee8] p-12 text-center shadow-[8px_8px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:shadow-[8px_8px_0_#c95545]">
            <AlertCircle className="mb-3 h-10 w-10 text-[#c95545] dark:text-[#4ba1a7]" />
            <h3 className="text-sm font-bold text-black dark:text-[#f7eee8]">No funds found</h3>
            <p className="mt-1 max-w-sm text-xs font-semibold text-[#5b5652] dark:text-[#bdb5ae]">
              We couldn&apos;t find any direct plans matching your keywords. Adjust your category filters or double check spelling!
            </p>
          </div>
        ) : (
          funds.map((fund) => {
            const isCompared = !!compareList.find((f) => f.id === fund.id);
            return (
              <div
                key={fund.id}
                className="group flex flex-col space-y-4 border-[3px] border-black bg-[#f7eee8] p-5 shadow-[6px_6px_0_#000] transition-colors hover:bg-white dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:shadow-[6px_6px_0_#c95545] dark:hover:bg-[#111]"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1 space-y-2 pr-0 xl:pr-4">
                    <h3 className="text-sm font-bold leading-snug text-black transition-colors group-hover:text-[#c95545] dark:text-[#f7eee8] dark:group-hover:text-[#4ba1a7]">
                      {fund.schemeName}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5b5652] dark:text-[#bdb5ae]">
                        {fund.amcName.split(" Mutual Fund")[0]}
                      </span>
                      <Badge
                        variant="secondary"
                        className="rounded-none border border-black bg-white px-2 py-0.5 text-[10px] text-[#5b5652] hover:bg-white dark:border-[#f7eee8]/20 dark:bg-[#141414] dark:text-[#bdb5ae] dark:hover:bg-[#141414]"
                      >
                        {fund.category} • {fund.subCategory || "Direct Plan"}
                      </Badge>
                      {fund.sharpeRatio && fund.sharpeRatio >= 1.6 && (
                        <Badge className="rounded-none border border-[#4ba1a7] bg-[#dff5f1] px-1.5 py-0.5 text-[9px] font-bold text-[#082f33] hover:bg-[#dff5f1] dark:bg-[#123f45] dark:text-[#bcece6] dark:hover:bg-[#123f45]">
                          High Risk-Adjusted
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCompareClick(fund)}
                      className={`flex items-center space-x-1 border-[3px] px-3 py-2 text-[11px] font-bold transition-colors ${
                        isCompared
                          ? "border-black bg-[#4ba1a7] text-black dark:border-[#f7eee8] dark:text-[#082f33]"
                          : "border-black bg-white text-[#5b5652] hover:bg-[#eadfd8] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#bdb5ae] dark:hover:bg-[#1f1f1f]"
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
                    <Button
                      asChild
                      className="h-auto min-w-[132px] rounded-none border-[3px] border-black bg-[#c95545] px-5 py-2.5 text-xs font-extrabold text-white shadow-none transition-transform group-hover:scale-[1.02] hover:bg-[#d26354] dark:border-[#f7eee8]/25 dark:bg-[#4ba1a7] dark:text-[#082f33] dark:hover:bg-[#60b4ba]"
                    >
                      <Link href={`/dashboard?invest=1&fundId=${encodeURIComponent(fund.id)}`}>
                        <span className="whitespace-nowrap">Invest Direct</span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black bg-white dark:bg-[#f7eee8]">
                          <ArrowUpRight className="h-4 w-4 text-black" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t-[3px] border-black pt-3 dark:border-[#f7eee8]/20 md:grid-cols-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#5b5652] dark:text-[#bdb5ae]">
                      Current NAV
                    </span>
                    <p className="text-xs font-extrabold text-black dark:text-[#f7eee8]">
                      ₹{fund.nav.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#5b5652] dark:text-[#bdb5ae]">
                      3-Year returns (CAGR)
                    </span>
                    <p className="text-xs font-extrabold text-[#16804d] dark:text-[#4ba1a7]">
                      {formatPercent(fund.returns3y)}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#5b5652] dark:text-[#bdb5ae]">
                      Total Assets (AUM)
                    </span>
                    <p className="text-xs font-extrabold text-black dark:text-[#f7eee8]">
                      {formatAUM(fund.aum)}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#5b5652] dark:text-[#bdb5ae]">
                      Expense Ratio
                    </span>
                    <p className="text-xs font-extrabold text-[#c95545] dark:text-[#f0c7bf]">
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
