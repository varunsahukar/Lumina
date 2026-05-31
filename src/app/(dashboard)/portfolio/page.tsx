"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  HelpCircle,
  Loader2,
  PieChartIcon,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PortfolioHolding {
  id: string;
  name: string;
  schemeName?: string;
  units: number;
  nav: number;
  value: number;
  invested: number;
  returns: number;
  category?: string;
}

interface PortfolioSummary {
  id: string;
  name: string;
  invested: number;
  value: number;
  gain: number;
  returns: number;
  holdings: PortfolioHolding[];
}

const COLORS = ["#c95545", "#2d8188", "#7b9cc8", "#f0b75d", "#4ba1a7", "#0b0b0b"];

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/portfolio", { cache: "no-store" });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Unable to load portfolio");
      }

      setPortfolios(json.data || []);
    } catch (err) {
      console.error("Failed to load portfolio", err);
      setError(err instanceof Error ? err.message : "Unable to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPortfolio();
  }, []);

  const holdings = useMemo(
    () => portfolios.flatMap((portfolio) => portfolio.holdings || []),
    [portfolios]
  );
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalInvested = holdings.reduce((sum, holding) => sum + holding.invested, 0);
  const totalGain = totalValue - totalInvested;
  const portfolioReturn = totalInvested > 0 ? totalGain / totalInvested : 0;

  const categoryData = useMemo(() => {
    const byCategory = new Map<string, number>();
    holdings.forEach((holding) => {
      const key = normalizeCategory(holding.category);
      byCategory.set(key, (byCategory.get(key) || 0) + holding.value);
    });
    return Array.from(byCategory, ([name, value]) => ({ name, value })).sort(
      (a, b) => b.value - a.value
    );
  }, [holdings]);

  const barData = holdings.slice(0, 8).map((holding) => ({
    name: compactName(holding.schemeName || holding.name),
    value: holding.value,
    invested: holding.invested,
  }));

  return (
    <div className="space-y-8 text-[#070707] dark:text-[#f7eee8]">
      <div className="flex flex-col gap-4 border-b-[3px] border-black pb-7 dark:border-[#f7eee8]/25 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center border-[3px] border-black bg-[#4ba1a7] shadow-[5px_5px_0_#000] dark:border-[#f7eee8] dark:bg-[#123f45] dark:shadow-[5px_5px_0_#c95545]">
            <PieChartIcon className="h-5 w-5 text-black dark:text-[#f7eee8]" />
          </div>
          <div>
            <h1 className="text-4xl font-black leading-none sm:text-5xl">
              Portfolio Analytics
            </h1>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#5b5652] dark:text-[#bdb5ae]">
              Holdings, allocation, returns and goals from live data.
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={loadPortfolio}
          disabled={isLoading}
          className="h-12 rounded-none border-[3px] border-black bg-[#4ba1a7] px-5 font-bold text-black shadow-[5px_5px_0_#000] hover:bg-[#5fb8be] dark:border-[#f7eee8]/25"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Sync portfolio
        </Button>
      </div>

      {error ? (
        <div className="border-[3px] border-[#c95545] bg-[#ffe5df] px-4 py-3 text-sm font-bold text-[#721f17] dark:bg-[#32110e] dark:text-[#ffd9d2]">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid min-h-[45vh] place-items-center">
          <div className="flex items-center gap-4 border-[3px] border-black bg-[#f7eee8] px-8 py-6 shadow-[8px_8px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
            <Loader2 className="h-6 w-6 animate-spin text-[#c95545] dark:text-[#4ba1a7]" />
            <span className="text-sm font-bold uppercase tracking-[0.18em]">
              Loading live holdings
            </span>
          </div>
        </div>
      ) : holdings.length === 0 ? (
        <EmptyPortfolioState />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <MetricCard
              label="Total portfolio worth"
              value={formatCurrency(totalValue)}
              note={`${holdings.length} live holdings`}
              tone="cream"
            />
            <MetricCard
              label="Personal return"
              value={formatPercent(portfolioReturn)}
              note={`${formatCurrency(totalGain)} absolute gain`}
              tone="red"
            />
            <MetricCard
              label="Invested capital"
              value={formatCurrency(totalInvested)}
              note={`${portfolios.length} active portfolios`}
              tone="teal"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] p-6 dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
              <div className="mb-6 flex items-center justify-between border-b-[3px] border-black pb-4 dark:border-[#f7eee8]/20">
                <h2 className="text-2xl font-bold">Asset allocation</h2>
                <Badge className="rounded-none border border-black bg-[#4ba1a7] text-black hover:bg-[#4ba1a7]">
                  Mutual funds
                </Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-[0.9fr_1fr] md:items-center">
                <div className="relative h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={68}
                        outerRadius={102}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<PortfolioTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b5652] dark:text-[#bdb5ae]">
                      Holdings
                    </span>
                    <span className="text-3xl font-black">{holdings.length}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {categoryData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 border-[3px] border-black bg-white p-3 text-sm font-bold dark:border-[#f7eee8]/25 dark:bg-[#141414]"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-3 w-3 shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                      <span>{formatPercent(totalValue > 0 ? item.value / totalValue : 0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="agency-hard-shadow-sm border-[3px] border-black bg-[#4ba1a7] p-6 text-[#082f33] dark:border-[#f7eee8]/25 dark:bg-[#123f45] dark:text-[#bcece6]">
              <div className="mb-6 flex items-center justify-between border-b-[3px] border-[#082f33]/40 pb-4">
                <h2 className="text-2xl font-bold">Goal readiness</h2>
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-5">
                <GoalReadiness
                  label="Core wealth goal"
                  current={totalValue}
                  target={Math.max(1000000, totalValue * 2.5)}
                />
                <GoalReadiness
                  label="Risk buffer"
                  current={Math.min(totalValue, Math.max(totalInvested * 0.25, 0))}
                  target={Math.max(250000, totalInvested * 0.5)}
                />
              </div>
              <div className="mt-7 flex items-start gap-3 border-[3px] border-[#082f33]/60 bg-[#dff5f1] p-4 text-sm font-bold dark:bg-[#0b0b0b]">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0" />
                Goals use current holdings for now.
              </div>
            </section>
          </div>

          <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] p-6 dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
            <div className="mb-6 flex items-center justify-between border-b-[3px] border-black pb-4 dark:border-[#f7eee8]/20">
              <h2 className="text-2xl font-bold">Holding value map</h2>
              <TrendingUp className="h-6 w-6 text-[#c95545] dark:text-[#4ba1a7]" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="currentColor" fontSize={11} tickLine={false} />
                  <YAxis stroke="currentColor" fontSize={11} tickLine={false} />
                  <Tooltip content={<PortfolioTooltip />} />
                  <Bar dataKey="value" fill="#c95545" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] p-6 dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Individual holdings</h2>
              <ShieldCheck className="h-6 w-6 text-[#2d8188] dark:text-[#4ba1a7]" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-y-[3px] border-black text-[10px] font-bold uppercase tracking-[0.12em] text-[#5b5652] dark:border-[#f7eee8]/25 dark:text-[#bdb5ae]">
                    <th className="py-3 pr-4">Direct scheme</th>
                    <th className="px-4 py-3">Units</th>
                    <th className="px-4 py-3">Invested</th>
                    <th className="px-4 py-3">Current value</th>
                    <th className="px-4 py-3">Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y-[3px] divide-black dark:divide-[#f7eee8]/20">
                  {holdings.map((holding) => (
                    <tr key={holding.id} className="font-bold">
                      <td className="max-w-[360px] py-4 pr-4 text-black dark:text-[#f7eee8]">
                        <span className="block truncate">
                          {holding.schemeName || holding.name}
                        </span>
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-[#5b5652] dark:text-[#bdb5ae]">
                          {normalizeCategory(holding.category)}
                        </span>
                      </td>
                      <td className="px-4 py-4">{holding.units.toFixed(4)}</td>
                      <td className="px-4 py-4">{formatCurrency(holding.invested)}</td>
                      <td className="px-4 py-4 text-black dark:text-[#f7eee8]">
                        {formatCurrency(holding.value)}
                      </td>
                      <td className="px-4 py-4 text-[#16804d] dark:text-[#4ba1a7]">
                        {formatPercent(holding.returns)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function EmptyPortfolioState() {
  return (
    <section className="agency-hard-shadow mx-auto max-w-3xl border-[3px] border-black bg-[#f7eee8] p-8 text-center dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
      <div className="mx-auto grid h-16 w-16 place-items-center border-[3px] border-black bg-[#4ba1a7] shadow-[5px_5px_0_#000] dark:border-[#f7eee8]/25">
        <HelpCircle className="h-8 w-8 text-black" />
      </div>
      <h2 className="mt-6 text-4xl font-black text-black dark:text-[#f7eee8]">
        No live holdings yet
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#5b5652] dark:text-[#bdb5ae]">
        Add an investment to see holdings, allocation and goal progress.
      </p>
      <Button
        asChild
        className="mt-7 h-12 rounded-none border-[3px] border-black bg-[#c95545] px-6 font-bold text-white shadow-[5px_5px_0_#000] hover:bg-[#d26354]"
      >
        <Link href="/dashboard?invest=1">
          Add investment
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </section>
  );
}

function MetricCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "cream" | "red" | "teal";
}) {
  const className = {
    cream: "bg-[#f7eee8] text-black dark:bg-[#0b0b0b] dark:text-[#f7eee8]",
    red: "bg-[#cf6a5f] text-black",
    teal: "bg-[#4ba1a7] text-[#082f33]",
  }[tone];

  return (
    <article className={`agency-hard-shadow-sm border-[3px] border-black p-6 dark:border-[#f7eee8]/25 ${className}`}>
      <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] opacity-70">
        {label}
      </p>
      <p className="agency-pixel text-[3.3rem] leading-none">{value}</p>
      <p className="mt-6 text-sm font-bold opacity-70">{note}</p>
    </article>
  );
}

function GoalReadiness({
  label,
  current,
  target,
}: {
  label: string;
  current: number;
  target: number;
}) {
  const progress = target > 0 ? Math.min(100, (current / target) * 100) : 0;

  return (
    <div className="border-[3px] border-[#082f33]/60 bg-[#dff5f1] p-4 dark:bg-[#0b0b0b]">
      <div className="flex items-center justify-between gap-4 text-sm font-bold">
        <span>{label}</span>
        <span>{progress.toFixed(0)}%</span>
      </div>
      <div className="mt-4 h-3 border-2 border-[#082f33] bg-white/50">
        <div className="h-full bg-[#c95545]" style={{ width: `${Math.max(2, progress)}%` }} />
      </div>
      <p className="mt-3 text-xs font-bold opacity-75">
        {formatCurrency(current)} of {formatCurrency(target)}
      </p>
    </div>
  );
}

function PortfolioTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0];

  return (
    <div className="border-[3px] border-black bg-[#0b0b0b] px-4 py-3 text-xs font-bold text-[#f7eee8] shadow-[5px_5px_0_#c95545]">
      <p>{row.name}</p>
      <p className="mt-1 text-[#4ba1a7]">{formatCurrency(Number(row.value || 0))}</p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value: number | null) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return "N/A";
  }
  const numeric = Number(value);
  const displayValue = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
  return `${displayValue.toFixed(2)}%`;
}

function normalizeCategory(category: unknown) {
  return String(category || "Uncategorised").replace(/\s+Scheme$/i, "");
}

function compactName(name: string) {
  return name.replace(/\s+-\s+Direct.*$/i, "").slice(0, 18);
}
