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

  const categories = ["All", "Equity", "Hybrid", "Debt"];

  return (
    <div className="bg-black/40 backdrop-blur-md border border-[#1a1a1a]/80 rounded-2xl p-5 space-y-6  text-white">
      <div className="flex items-center space-x-2 border-b border-[#1a1a1a] pb-3">
        <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-bold tracking-wide uppercase text-white">
          Advanced Filters
        </h3>
      </div>

      {/* Text Search Input */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs font-semibold text-[#a3a3a3]">
          Search Fund or AMC
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#a3a3a3]" />
          <Input
            id="search"
            placeholder="e.g. Parag Parikh, HDFC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-black border-[#1a1a1a] text-xs text-white focus:ring-1 focus:ring-emerald-500 rounded-xl py-5 placeholder:text-slate-650"
          />
        </div>
      </div>

      {/* Category Toggles */}
      <div className="space-y-2.5">
        <Label className="text-xs font-semibold text-[#a3a3a3]">Category</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 border",
                selectedCategory === cat
                  ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/40 text-emerald-400 "
                  : "bg-black/60 border-[#1a1a1a] text-[#a3a3a3] hover:text-white hover:border-[#1a1a1a]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Select */}
      <div className="space-y-2">
        <Label htmlFor="sort" className="text-xs font-semibold text-[#a3a3a3]">
          Rank & Sort By
        </Label>
        <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
          <SelectTrigger
            id="sort"
            className="bg-black border-[#1a1a1a] text-xs text-slate-350 focus:ring-emerald-500 rounded-xl py-5"
          >
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent className="bg-black border-[#1a1a1a] text-slate-350 rounded-xl">
            <SelectItem value="returns3y" className="cursor-pointer focus:bg-black focus:text-emerald-400">
              3-Year Annual Returns
            </SelectItem>
            <SelectItem value="returns1y" className="cursor-pointer focus:bg-black focus:text-emerald-400">
              1-Year Return Performance
            </SelectItem>
            <SelectItem value="returns5y" className="cursor-pointer focus:bg-black focus:text-emerald-400">
              5-Year Long-Term CAGR
            </SelectItem>
            <SelectItem value="aum" className="cursor-pointer focus:bg-black focus:text-emerald-400">
              Total Assets (AUM size)
            </SelectItem>
            <SelectItem value="sharpeRatio" className="cursor-pointer focus:bg-black focus:text-emerald-400">
              Risk-Adjusted (Sharpe Ratio)
            </SelectItem>
            <SelectItem value="expenseRatio" className="cursor-pointer focus:bg-black focus:text-emerald-400">
              Low Expense Ratio
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active filters dashboard stats */}
      <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] text-[#a3a3a3] font-medium">
        <span className="flex items-center">
          <BarChart className="h-3 w-3 mr-1 text-[#a3a3a3]" />
          Indian Market Direct Plans
        </span>
        <span className="bg-black px-2 py-0.5 rounded-full border border-[#1a1a1a] text-[#a3a3a3]">
          AMFI Feeds Active
        </span>
      </div>
    </div>
  );
}
