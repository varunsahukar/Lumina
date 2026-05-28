"use client";

import { useAppStore } from "@/store/useStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FilterPanel() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  } = useAppStore();

  const categories = ["All", "Equity", "Debt", "Hybrid"];

  return (
    <div className="space-y-6 border-[3px] border-black bg-[#f7eee8] p-5 text-[#070707] shadow-[8px_8px_0_#000] dark:border-[#f7eee8]/30 dark:bg-[#0b0b0b] dark:text-[#f7eee8] dark:shadow-[8px_8px_0_#c95545]">
      <div className="flex items-center gap-2 border-b-[3px] border-black pb-3 dark:border-[#f7eee8]/20">
        <SlidersHorizontal className="h-4 w-4 text-[#c95545] dark:text-[#4ba1a7]" />
        <h3 className="text-sm font-bold uppercase tracking-[0.14em]">
          Advanced Filters
        </h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs font-bold uppercase tracking-[0.12em] text-[#5b5652] dark:text-[#bdb5ae]">
          Search Fund or AMC
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5b5652] dark:text-[#bdb5ae]" />
          <Input
            id="search"
            placeholder="e.g. Parag Parikh, HDFC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-none border-[3px] border-black bg-white pl-9 text-sm font-bold text-black placeholder:text-[#7a716b] focus-visible:ring-[#c95545] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#f7eee8] dark:placeholder:text-[#8e8985] dark:focus-visible:ring-[#4ba1a7]"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <Label className="text-xs font-bold uppercase tracking-[0.12em] text-[#5b5652] dark:text-[#bdb5ae]">
          Category
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "border-[3px] px-3 py-3 text-xs font-bold transition-colors",
                selectedCategory === cat
                  ? "border-black bg-[#4ba1a7] text-black dark:border-[#f7eee8] dark:bg-[#4ba1a7] dark:text-[#082f33]"
                  : "border-black bg-white text-[#5b5652] hover:bg-[#eadfd8] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#bdb5ae] dark:hover:bg-[#1f1f1f]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort" className="text-xs font-bold uppercase tracking-[0.12em] text-[#5b5652] dark:text-[#bdb5ae]">
          Rank & Sort By
        </Label>
        <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
          <SelectTrigger
            id="sort"
            className="h-12 rounded-none border-[3px] border-black bg-white text-sm font-bold text-black focus:ring-[#c95545] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#f7eee8] dark:focus:ring-[#4ba1a7]"
          >
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-[3px] border-black bg-[#f7eee8] text-black dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:text-[#f7eee8]">
            <SelectItem value="returns3y" className="cursor-pointer rounded-none focus:bg-[#4ba1a7] focus:text-black">
              3-Year Annual Returns
            </SelectItem>
            <SelectItem value="returns1y" className="cursor-pointer rounded-none focus:bg-[#4ba1a7] focus:text-black">
              1-Year Return Performance
            </SelectItem>
            <SelectItem value="returns5y" className="cursor-pointer rounded-none focus:bg-[#4ba1a7] focus:text-black">
              5-Year Long-Term CAGR
            </SelectItem>
            <SelectItem value="aum" className="cursor-pointer rounded-none focus:bg-[#4ba1a7] focus:text-black">
              Total Assets (AUM size)
            </SelectItem>
            <SelectItem value="sharpeRatio" className="cursor-pointer rounded-none focus:bg-[#4ba1a7] focus:text-black">
              Risk-Adjusted (Sharpe Ratio)
            </SelectItem>
            <SelectItem value="expenseRatio" className="cursor-pointer rounded-none focus:bg-[#4ba1a7] focus:text-black">
              Low Expense Ratio
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between border-t-[3px] border-black pt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5b5652] dark:border-[#f7eee8]/20 dark:text-[#bdb5ae]">
        <span className="flex items-center">
          <BarChart className="mr-1 h-3 w-3 text-[#c95545] dark:text-[#4ba1a7]" />
          Indian Market Direct Plans
        </span>
        <span className="border border-black bg-white px-2 py-1 text-black dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#f7eee8]">
          AMFI Feeds Active
        </span>
      </div>
    </div>
  );
}
