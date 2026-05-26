"use client";

import { useState } from "react";
import { useAppStore, Fund } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { X, Sliders, CheckCircle, Scale, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  const formatPercent = (value: number | null) => {
    if (!value) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatAUM = (value: number | null) => {
    if (!value) return "N/A";
    if (value >= 1000) return `₹${(value / 1000).toFixed(2)}K Cr`;
    return `₹${value.toFixed(1)} Cr`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-slide-up">
      {/* Floating compare pill */}
      <div className="bg-black/90 backdrop-blur-lg border border-[#1a1a1a]/80 rounded-2xl p-4  flex items-center justify-between text-white gap-4">
        <div className="flex items-center space-x-3 overflow-x-auto py-1 scrollbar-none flex-1">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg hidden sm:block shrink-0">
            <Scale className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-center space-x-2">
            {compareList.map((fund) => (
              <div
                key={fund.id}
                className="flex items-center space-x-1.5 bg-black px-2.5 py-1.5 rounded-xl border border-[#1a1a1a] text-[10px] font-bold text-[#a3a3a3] shrink-0"
              >
                <span className="truncate max-w-[120px]">
                  {fund.schemeName.split(" - ")[0]}
                </span>
                <button
                  onClick={() => removeFromCompare(fund.id)}
                  className="p-0.5 hover:bg-slate-850 rounded-full text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-[11px] text-[#a3a3a3] hover:text-white font-bold px-2 py-1.5"
          >
            Clear
          </button>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 hover:text-slate-950 text-xs font-extrabold rounded-xl px-4 py-4 h-auto ">
                Compare Side-by-Side
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-black border-[#1a1a1a] text-white rounded-3xl p-6 ">
              <DialogHeader className="border-b border-[#1a1a1a] pb-3">
                <DialogTitle className="flex items-center text-md font-extrabold tracking-tight">
                  <Scale className="h-5 w-5 text-emerald-400 mr-2" />
                  Side-by-Side Fund Diagnostics
                </DialogTitle>
              </DialogHeader>

              {/* Side by Side Comparative Specification Grid */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1a1a1a]">
                      <th className="py-3 pr-4 font-bold text-[#a3a3a3] w-1/4">Comparison Metric</th>
                      {compareList.map((fund) => (
                        <th key={fund.id} className="py-3 px-4 font-extrabold text-emerald-400 w-1/4">
                          {fund.schemeName.split(" - ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Category & Type</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-medium text-white">
                          {fund.category} • {fund.subCategory || "Direct Plan"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Current NAV</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-extrabold text-white">
                          ₹{fund.nav.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Total Assets (AUM)</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-medium text-white">
                          {formatAUM(fund.aum)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Expense Ratio</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-extrabold text-slate-350">
                          {formatPercent(fund.expenseRatio)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">3-Year Annual CAGR</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-extrabold text-emerald-450">
                          {formatPercent(fund.returns3y)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">1-Year returns</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-medium text-[#a3a3a3]">
                          {formatPercent(fund.returns1y)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Risk-Adjusted (Sharpe)</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-bold text-white">
                          {fund.sharpeRatio?.toFixed(2) || "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Alpha / Beta Coefficient</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-medium text-[#a3a3a3]">
                          α: {fund.alpha?.toFixed(2) ?? "N/A"} | β: {fund.beta?.toFixed(2) ?? "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-[#a3a3a3]">Fund Manager</td>
                      {compareList.map((fund) => (
                        <td key={fund.id} className="py-3.5 px-4 font-medium text-white">
                          {fund.managerName || "N/A"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Regulatory audit indicator */}
              <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] text-[#a3a3a3] font-medium">
                <span className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1.5 text-emerald-400" />
                  SEBI Compliant Comparison Matrix
                </span>
                <span>AMFI Real-time feed certified</span>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
