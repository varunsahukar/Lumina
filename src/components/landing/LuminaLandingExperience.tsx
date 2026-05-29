"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Database,
  Loader2,
  Moon,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AgencyLogo, PixelIcon } from "@/components/agency/AgencyPrimitives";
import InstrumentPreviewCard from "@/components/market/InstrumentPreviewCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentType, PointerEvent } from "react";

type Theme = "light" | "dark";

interface Fund {
  id: string;
  schemeName?: string;
  name?: string;
  amcName?: string | null;
  category?: string | null;
  nav?: number | null;
  aum?: number | null;
  expenseRatio?: number | null;
  sharpeRatio?: number | null;
  returns1y?: number | null;
  returns3y?: number | null;
  returns5y?: number | null;
  returns10y?: number | null;
  changePercent?: number | null;
}

interface DashboardData {
  fundsCount?: number;
  usersCount?: number;
  totalAum?: number;
  avgEquityReturns?: number | string;
  recentFunds?: Fund[];
}

interface DashboardResponse {
  success: boolean;
  source?: string;
  data?: DashboardData;
  error?: string;
}

interface FundsResponse {
  success: boolean;
  source?: string;
  data?: Fund[];
  funds?: Fund[];
  error?: string;
}

interface CategoryPoint {
  name: string;
  funds: number;
  aum: number;
  avgReturn: number;
}

const categoryColors = ["#c95545", "#2d8188", "#7b9cc8", "#f0b75d", "#7f5af0", "#35a66f"];

const workflow = [
  {
    id: "01",
    icon: Database,
    title: "Backend sync",
    body: "The page reads fund counts, AUM and recent funds from the existing Next API proxy.",
  },
  {
    id: "02",
    icon: Search,
    title: "Live discovery",
    body: "Funds from the backend power the explorer, market tape, category chart and fund focus panel.",
  },
  {
    id: "03",
    icon: SlidersHorizontal,
    title: "Interactive planning",
    body: "The SIP lab uses the selected live fund return to animate a projected five year outcome.",
  },
];

const faqItems = [
  {
    question: "Is this showing real fund data?",
    answer:
      "Yes. The live surfaces read from /api/dashboard and /api/funds, which are backed by the Nest fund services through the frontend proxy layer.",
  },
  {
    question: "What happens if the backend is unavailable?",
    answer:
      "The UI keeps running and clearly shows the backend state. It does not replace the live panels with fake fund rows.",
  },
  {
    question: "Can I compare funds from here?",
    answer:
      "The live explorer links into the screener so the same backend-backed fund universe can be filtered and compared.",
  },
];

export default function LuminaLandingExperience() {
  const shellRef = useRef<HTMLDivElement>(null);
  const selectedPreviewRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null);
  const [monthlySip, setMonthlySip] = useState(25000);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const applyTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("lumina-theme", nextTheme);
    setTheme(nextTheme);
  }, []);

  const loadLiveData = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    const dashboardRequest = fetch("/api/dashboard", {
      cache: "no-store",
      signal,
    }).then(readApiResponse<DashboardResponse>);

    const fundsRequest = fetch("/api/funds?market=INDIA&limit=16", {
      cache: "no-store",
      signal,
    }).then(readApiResponse<FundsResponse>);

    const [dashboardResult, fundsResult] = await Promise.allSettled([
      dashboardRequest,
      fundsRequest,
    ]);

    if (signal?.aborted) return;

    const failures: string[] = [];

    if (dashboardResult.status === "fulfilled") {
      setDashboard(dashboardResult.value.data ?? null);
      setSource(dashboardResult.value.source ?? "backend");
    } else {
      setDashboard(null);
      failures.push(errorMessage(dashboardResult.reason));
    }

    if (fundsResult.status === "fulfilled") {
      const nextFunds = fundsResult.value.data ?? fundsResult.value.funds ?? [];
      setFunds(nextFunds);
      setSource((current) => current ?? fundsResult.value.source ?? "backend");
    } else {
      setFunds([]);
      failures.push(errorMessage(fundsResult.reason));
    }

    setError(failures.length ? failures.join(" ") : null);
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("lumina-theme");
    const nextTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    applyTheme(nextTheme);
  }, [applyTheme]);

  useEffect(() => {
    const controller = new AbortController();
    void loadLiveData(controller.signal).catch((reason) => {
      if (!controller.signal.aborted) {
        setError(errorMessage(reason));
        setIsLoading(false);
      }
    });

    return () => controller.abort();
  }, [loadLiveData]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const fundUniverse = useMemo(() => {
    if (funds.length > 0) return funds;
    return dashboard?.recentFunds ?? [];
  }, [dashboard?.recentFunds, funds]);

  useEffect(() => {
    if (fundUniverse.length === 0) return;
    if (!selectedFundId || !fundUniverse.some((fund) => fund.id === selectedFundId)) {
      setSelectedFundId(fundUniverse[0].id);
    }
  }, [fundUniverse, selectedFundId]);

  const selectedFund = useMemo(() => {
    return fundUniverse.find((fund) => fund.id === selectedFundId) ?? fundUniverse[0] ?? null;
  }, [fundUniverse, selectedFundId]);

  const topFunds = useMemo(() => {
    return [...fundUniverse]
      .sort((a, b) => (percentNumber(b.returns3y) ?? -Infinity) - (percentNumber(a.returns3y) ?? -Infinity))
      .slice(0, 6);
  }, [fundUniverse]);

  const categoryData = useMemo(() => buildCategoryData(fundUniverse), [fundUniverse]);
  const performanceData = useMemo(() => buildPerformanceData(selectedFund), [selectedFund]);

  const fundsCount = dashboard?.fundsCount ?? fundUniverse.length;
  const totalAum =
    dashboard?.totalAum ??
    fundUniverse.reduce((sum, fund) => sum + (Number(fund.aum) || 0), 0);
  const avgReturn =
    numberOrNull(dashboard?.avgEquityReturns) ??
    average(fundUniverse.map((fund) => percentNumber(fund.returns3y)).filter(isNumber));
  const selectedReturn = percentNumber(selectedFund?.returns3y) ?? avgReturn ?? 0;
  const projectedValue = projectSip(monthlySip, selectedReturn, 60);
  const investedValue = monthlySip * 60;
  const hasLiveData = fundUniverse.length > 0 || !!dashboard;
  const liveState = isLoading
    ? "Syncing"
    : error && hasLiveData
      ? "Partial live data"
      : error
        ? "Backend offline"
        : "Live backend";

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    shellRef.current?.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
    shellRef.current?.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
  };

  const handleSelectFund = (fundId: string) => {
    setSelectedFundId(fundId);
    window.requestAnimationFrame(() => {
      selectedPreviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  return (
    <div
      ref={shellRef}
      className="lumina-landing min-h-screen overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <div className="lumina-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="lumina-shell lumina-header">
        <AgencyLogo dark={theme === "dark"} />
        <nav className="hidden items-center gap-7 text-xs font-bold uppercase text-[var(--landing-muted)] md:flex">
          <a className="lumina-nav-link" href="#live">
            Live data
          </a>
          <a className="lumina-nav-link" href="#explorer">
            Explorer
          </a>
          <a className="lumina-nav-link" href="#planning">
            Planning
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lumina-icon-button"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button
            asChild
            className="hidden rounded-[4px] border-2 border-[var(--landing-ink)] bg-[var(--landing-ink)] px-5 font-bold text-[var(--landing-bg)] shadow-[5px_5px_0_var(--landing-shadow)] hover:bg-[var(--landing-ink)] md:inline-flex"
          >
            <Link href="/screener">
              Screener
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="lumina-shell grid min-h-[calc(100vh-5rem)] gap-10 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="lumina-reveal">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <LiveStatus state={liveState} isLoading={isLoading} />
              {source ? <span className="lumina-chip">Source: {source}</span> : null}
              {lastUpdated ? <span className="lumina-chip">{formatTime(lastUpdated)}</span> : null}
            </div>

            <h1 className="max-w-4xl text-[3.35rem] font-black leading-[0.98] text-[var(--landing-ink)] sm:text-[5.3rem] lg:text-[6.2rem]">
              Live mutual fund intelligence
              <span className="agency-pixel block text-[3.4rem] text-[var(--landing-red)] sm:text-[5rem] lg:text-[5.7rem]">
                for wealth decisions
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg font-semibold leading-[1.55] text-[var(--landing-muted)] sm:text-xl">
              A real-time investing surface powered by backend fund data, animated analytics,
              live category movement and an interactive planning lab.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-[4px] border-2 border-[var(--landing-ink)] bg-[var(--landing-red)] px-6 font-black text-white shadow-[6px_6px_0_var(--landing-shadow)] hover:bg-[var(--landing-red)]"
              >
                <Link href="/screener">
                  Open live screener
                  <Search className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-[4px] border-2 border-[var(--landing-ink)] bg-transparent px-6 font-black text-[var(--landing-ink)] hover:bg-[var(--landing-panel)]"
                onClick={() => void loadLiveData().catch((reason) => setError(errorMessage(reason)))}
              >
                <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                Refresh data
              </Button>
            </div>

            <div id="live" className="mt-10 grid gap-4 sm:grid-cols-3">
              <LiveMetric
                label="Listed funds"
                value={fundsCount}
                formatter={(value) => formatInteger(value)}
                note={hasLiveData ? "from backend" : "awaiting backend"}
                icon={Database}
              />
              <LiveMetric
                label="Tracked AUM"
                value={totalAum}
                formatter={formatAum}
                note={hasLiveData ? "live aggregate" : "not loaded"}
                icon={WalletCards}
              />
              <LiveMetric
                label="Avg 3Y return"
                value={avgReturn ?? 0}
                formatter={(value) => `${value.toFixed(1)}%`}
                note={avgReturn === null ? "not available" : "fund universe"}
                icon={TrendingUp}
              />
            </div>

            {error ? (
              <div className="mt-5 border-2 border-[var(--landing-red)] bg-[var(--landing-red-soft)] p-4 text-sm font-bold text-[var(--landing-ink)]">
                {error}
              </div>
            ) : null}
          </div>

          <HeroBoard
            selectedFund={selectedFund}
            performanceData={performanceData}
            categoryData={categoryData}
            isLoading={isLoading}
          />
        </section>

        <MarketTape funds={fundUniverse} isLoading={isLoading} />

        <section id="explorer" className="lumina-shell grid gap-8 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="lumina-panel lumina-reveal">
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="lumina-label">Live fund explorer</p>
                <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                  Rank, inspect and move into the screener.
                </h2>
              </div>
              <PixelIcon kind="chart" className="shrink-0" />
            </div>

            <div className="space-y-3">
              {topFunds.length > 0 ? (
                topFunds.map((fund, index) => (
                  <button
                    type="button"
                    key={fund.id}
                    onClick={() => handleSelectFund(fund.id)}
                    aria-pressed={selectedFund?.id === fund.id}
                    className={cn(
                      "lumina-fund-row group w-full text-left",
                      selectedFund?.id === fund.id && "is-active",
                    )}
                  >
                    <span className="lumina-rank">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-black">
                        {fund.schemeName || fund.name || "Unnamed fund"}
                      </span>
                      <span className="block text-xs font-bold uppercase text-[var(--landing-muted)]">
                        {fund.category || "Category pending"}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-lg font-black text-[var(--landing-green)]">
                        {formatPercent(fund.returns3y)}
                      </span>
                      <span className="block text-xs font-bold text-[var(--landing-muted)]">
                        {selectedFund?.id === fund.id ? "Preview" : "3Y"}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <EmptyState isLoading={isLoading} label="Waiting for live fund rows" />
              )}
            </div>
          </div>

          <div className="grid gap-8">
            <div ref={selectedPreviewRef}>
              <SelectedFundPanel fund={selectedFund} performanceData={performanceData} />
            </div>
            <CategoryPanel data={categoryData} isLoading={isLoading} />
          </div>
        </section>

        <section id="planning" className="lumina-shell grid gap-8 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div className="lumina-panel lumina-reveal">
            <p className="lumina-label">Planning lab</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Model a five year SIP with the selected live return.
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <PlanningStat label="Monthly SIP" value={formatCurrency(monthlySip)} />
              <PlanningStat label="Invested" value={formatCurrency(investedValue)} />
              <PlanningStat label="Projected" value={formatCurrency(projectedValue)} highlight />
            </div>

            <label className="mt-10 block">
              <span className="mb-4 flex items-center justify-between text-sm font-black uppercase text-[var(--landing-muted)]">
                <span>SIP amount</span>
                <span>{formatCurrency(monthlySip)}</span>
              </span>
              <input
                className="lumina-range"
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={monthlySip}
                onChange={(event) => setMonthlySip(Number(event.target.value))}
              />
            </label>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="border-2 border-[var(--landing-line)] p-5">
                <p className="text-xs font-black uppercase text-[var(--landing-muted)]">Selected return</p>
                <p className="mt-3 agency-pixel text-[3.5rem] text-[var(--landing-red)]">
                  {selectedReturn.toFixed(1)}%
                </p>
              </div>
              <div className="border-2 border-[var(--landing-line)] p-5">
                <p className="text-xs font-black uppercase text-[var(--landing-muted)]">Estimated gain</p>
                <p className="mt-3 agency-pixel text-[3.5rem] text-[var(--landing-teal)]">
                  {formatCurrency(projectedValue - investedValue)}
                </p>
              </div>
            </div>
          </div>

          <div className="lumina-panel lumina-reveal lumina-ladder">
            <p className="lumina-label">Operating flow</p>
            <div className="mt-8 space-y-5">
              {workflow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.id} className="lumina-step" style={{ animationDelay: `${index * 120}ms` }}>
                    <div className="lumina-step-icon">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-[var(--landing-red)]">{step.id}</span>
                        <h3 className="text-xl font-black">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-sm font-semibold leading-6 text-[var(--landing-muted)]">
                        {step.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lumina-shell grid gap-8 py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lumina-reveal">
            <p className="lumina-label">Confidence layer</p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Fast answers for a live investing surface.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <TrustTile icon={ShieldCheck} label="Proxy-backed" body="Frontend calls stay on the existing /api contract." />
              <TrustTile icon={CheckCircle2} label="No fake rows" body="Offline states are explicit and visible." />
              <TrustTile icon={Zap} label="Animated UI" body="Motion is CSS-driven and respects reduced motion." />
              <TrustTile icon={BarChart3} label="Real charts" body="Charts are built from loaded fund records." />
            </div>
          </div>

          <div className="lumina-panel lumina-reveal">
            {faqItems.map((item, index) => (
              <button
                key={item.question}
                type="button"
                className="w-full border-b border-[var(--landing-line)] py-6 text-left last:border-b-0"
                onClick={() => setOpenFaq(index)}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-xl font-black">{item.question}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-[var(--landing-ink)] text-sm font-black">
                    {openFaq === index ? "-" : "+"}
                  </span>
                </span>
                <span
                  className={cn(
                    "grid overflow-hidden text-sm font-semibold leading-6 text-[var(--landing-muted)] transition-all duration-300",
                    openFaq === index ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <span className="min-h-0">{item.answer}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function HeroBoard({
  selectedFund,
  performanceData,
  categoryData,
  isLoading,
}: {
  selectedFund: Fund | null;
  performanceData: Array<{ period: string; value: number }>;
  categoryData: CategoryPoint[];
  isLoading: boolean;
}) {
  return (
    <div className="lumina-hero-panel lumina-reveal">
      <div className="lumina-scanline" />
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-5">
          <div>
            <p className="lumina-label">Live command board</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              {selectedFund?.schemeName || selectedFund?.name || "Awaiting backend fund"}
            </h2>
            <p className="mt-3 text-sm font-bold uppercase text-[var(--landing-muted)]">
              {selectedFund?.category || "No category loaded"}
            </p>
          </div>
          {isLoading ? (
            <Loader2 className="h-7 w-7 animate-spin text-[var(--landing-red)]" />
          ) : (
            <span className="lumina-live-dot" aria-hidden="true" />
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <BoardMetric label="NAV" value={formatNav(selectedFund?.nav)} />
          <BoardMetric label="AUM" value={formatAum(Number(selectedFund?.aum ?? 0))} />
          <BoardMetric label="Expense" value={formatPercent(selectedFund?.expenseRatio)} />
        </div>

        <div className="mt-8 h-72">
          {performanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ left: 0, right: 10, top: 12, bottom: 0 }}>
                <defs>
                  <linearGradient id="landingReturnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c95545" stopOpacity={0.72} />
                    <stop offset="100%" stopColor="#2d8188" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--landing-chart-grid)" strokeDasharray="4 4" />
                <XAxis dataKey="period" stroke="var(--landing-muted)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--landing-muted)" tickLine={false} axisLine={false} width={34} />
                <Tooltip content={<LandingTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#c95545"
                  strokeWidth={3}
                  fill="url(#landingReturnGradient)"
                  animationDuration={900}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState isLoading={isLoading} label="Return history is loading" />
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(categoryData.length > 0 ? categoryData.slice(0, 2) : [{ name: "No live categories", funds: 0, aum: 0, avgReturn: 0 }]).map((category) => (
            <div key={category.name} className="border-2 border-[var(--landing-line)] p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="truncate text-sm font-black">{category.name}</p>
                <p className="text-sm font-black text-[var(--landing-teal)]">{category.funds}</p>
              </div>
              <div className="mt-4 h-2 bg-[var(--landing-track)]">
                <div
                  className="h-full bg-[var(--landing-red)] transition-all duration-700"
                  style={{ width: `${Math.min(100, category.funds * 18)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketTape({ funds, isLoading }: { funds: Fund[]; isLoading: boolean }) {
  const tapeFunds = funds.slice(0, 10);

  return (
    <section className="border-y-2 border-[var(--landing-ink)] bg-[var(--landing-red)] py-4 text-white">
      <div className="lumina-tape">
        {tapeFunds.length > 0 ? (
          [...tapeFunds, ...tapeFunds].map((fund, index) => (
            <div key={`${fund.id}-${index}`} className="lumina-tape-item">
              <span>{fund.schemeName || fund.name || "Fund"}</span>
              <span>{formatNav(fund.nav)}</span>
              <span>{formatPercent(fund.returns3y)}</span>
            </div>
          ))
        ) : (
          <div className="lumina-tape-item">
            {isLoading ? "Syncing live fund tape" : "Start the backend to populate the live fund tape"}
          </div>
        )}
      </div>
    </section>
  );
}

function SelectedFundPanel({
  fund,
  performanceData,
}: {
  fund: Fund | null;
  performanceData: Array<{ period: string; value: number }>;
}) {
  const fundName = fund?.schemeName || fund?.name || "No fund selected";
  const fundDescription = fund
    ? `${fundName} is shown with the same simple preview pattern used for stocks: details first, key stats second, and readable yearly history last.`
    : "Select a live scheme to see company or AMC details, key stats and a compact yearly history preview.";
  const history = performanceData.map((point) => ({
    label: point.period,
    value: Math.max(0, point.value),
    displayValue: `${point.value.toFixed(1)}%`,
  }));

  return (
    <InstrumentPreviewCard
      className="lumina-reveal"
      kind="fund"
      name={fundName}
      ticker={fund?.id ? `FUND:${String(fund.id).slice(0, 8)}` : undefined}
      issuer={fund?.amcName || "AMC pending"}
      category={fund?.category || "Select a live scheme"}
      description={fundDescription}
      priceLabel="Current NAV"
      priceValue={formatNav(fund?.nav)}
      stats={[
        { label: "1Y return", value: formatPercent(fund?.returns1y) },
        { label: "3Y return", value: formatPercent(fund?.returns3y), tone: "positive" },
        { label: "Expense", value: formatPercent(fund?.expenseRatio) },
      ]}
      history={history}
      historyLabel="Return history"
      actionHref={fund?.id ? `/funds/${encodeURIComponent(fund.id)}` : "/screener"}
      actionLabel={fund?.id ? "Open fund details" : "Open screener"}
    />
  );
}

function CategoryPanel({ data, isLoading }: { data: CategoryPoint[]; isLoading: boolean }) {
  return (
    <div className="lumina-panel lumina-reveal">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="lumina-label">Category pulse</p>
          <h3 className="mt-2 text-2xl font-black">Backend universe mix</h3>
        </div>
        <BarChart3 className="h-6 w-6 text-[var(--landing-red)]" />
      </div>

      <div className="space-y-4">
        {data.length > 0 ? (
          data.slice(0, 5).map((category, index) => (
            <div key={category.name}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black">
                <span className="truncate">{category.name}</span>
                <span className="text-[var(--landing-muted)]">{category.funds} funds</span>
              </div>
              <div className="h-3 overflow-hidden border border-[var(--landing-line)] bg-[var(--landing-track)]">
                <div
                  className="h-full lumina-bar"
                  style={{
                    width: `${Math.max(10, Math.min(100, category.funds * 14))}%`,
                    backgroundColor: categoryColors[index % categoryColors.length],
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyState isLoading={isLoading} label="Waiting for category data" />
        )}
      </div>
    </div>
  );
}

function LiveStatus({ state, isLoading }: { state: string; isLoading: boolean }) {
  return (
    <span className="lumina-status">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="lumina-live-dot" />}
      {state}
    </span>
  );
}

function LiveMetric({
  label,
  value,
  formatter,
  note,
  icon: Icon,
}: {
  label: string;
  value: number;
  formatter: (value: number) => string;
  note: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const animatedValue = useCountUp(value);

  return (
    <article className="lumina-metric">
      <div className="mb-7 flex items-center justify-between">
        <p className="text-xs font-black uppercase text-[var(--landing-muted)]">{label}</p>
        <Icon className="h-5 w-5 text-[var(--landing-red)]" />
      </div>
      <p className="agency-pixel text-[3.2rem] leading-none text-[var(--landing-ink)]">
        {formatter(animatedValue)}
      </p>
      <p className="mt-5 text-xs font-black uppercase text-[var(--landing-muted)]">{note}</p>
    </article>
  );
}

function BoardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-[var(--landing-line)] bg-[var(--landing-panel-soft)] p-4">
      <p className="text-xs font-black uppercase text-[var(--landing-muted)]">{label}</p>
      <p className="mt-2 truncate text-xl font-black">{value}</p>
    </div>
  );
}

function PlanningStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn("border-2 border-[var(--landing-line)] p-5", highlight && "bg-[var(--landing-teal)] text-white")}>
      <p className={cn("text-xs font-black uppercase", highlight ? "text-white/75" : "text-[var(--landing-muted)]")}>
        {label}
      </p>
      <p className="mt-3 text-2xl font-black">{value}</p>
    </div>
  );
}

function TrustTile({
  icon: Icon,
  label,
  body,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  body: string;
}) {
  return (
    <article className="border-2 border-[var(--landing-line)] bg-[var(--landing-panel)] p-5">
      <Icon className="h-6 w-6 text-[var(--landing-red)]" />
      <h3 className="mt-5 text-xl font-black">{label}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-[var(--landing-muted)]">{body}</p>
    </article>
  );
}

function EmptyState({ isLoading, label }: { isLoading: boolean; label: string }) {
  return (
    <div className="grid min-h-[11rem] place-items-center border-2 border-dashed border-[var(--landing-line)] bg-[var(--landing-panel-soft)] p-6 text-center">
      <div>
        {isLoading ? (
          <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-[var(--landing-red)]" />
        ) : (
          <Database className="mx-auto mb-4 h-6 w-6 text-[var(--landing-muted)]" />
        )}
        <p className="text-sm font-black uppercase text-[var(--landing-muted)]">{label}</p>
      </div>
    </div>
  );
}

function LandingTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="border-2 border-[var(--landing-ink)] bg-[var(--landing-panel)] p-3 text-sm font-black shadow-[5px_5px_0_var(--landing-shadow)]">
      <p>{label}</p>
      <p className="text-[var(--landing-red)]">{Number(payload[0].value).toFixed(2)}%</p>
    </div>
  );
}

function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const start = performance.now();
    const from = valueRef.current;
    const delta = target - from;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 850);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = from + delta * eased;
      valueRef.current = nextValue;
      setValue(nextValue);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

async function readApiResponse<T extends { success: boolean; error?: string }>(response: Response): Promise<T> {
  const payload = (await response.json()) as T;

  if (!response.ok || !payload.success) {
    throw new Error(payload.error || `Request failed with ${response.status}`);
  }

  return payload;
}

function buildCategoryData(funds: Fund[]): CategoryPoint[] {
  const categories = new Map<string, { funds: number; aum: number; returnSum: number; returnCount: number }>();

  funds.forEach((fund) => {
    const name = fund.category || "Uncategorised";
    const current = categories.get(name) ?? { funds: 0, aum: 0, returnSum: 0, returnCount: 0 };
    const fundReturn = percentNumber(fund.returns3y);
    current.funds += 1;
    current.aum += Number(fund.aum) || 0;
    if (fundReturn !== null) {
      current.returnSum += fundReturn;
      current.returnCount += 1;
    }
    categories.set(name, current);
  });

  return Array.from(categories.entries())
    .map(([name, value]) => ({
      name,
      funds: value.funds,
      aum: value.aum,
      avgReturn: value.returnCount > 0 ? value.returnSum / value.returnCount : 0,
    }))
    .sort((a, b) => b.funds - a.funds)
    .slice(0, 6);
}

function buildPerformanceData(fund: Fund | null): Array<{ period: string; value: number }> {
  if (!fund) return [];

  return [
    ["1Y", fund.returns1y],
    ["3Y", fund.returns3y],
    ["5Y", fund.returns5y],
    ["10Y", fund.returns10y],
  ]
    .map(([period, value]) => ({ period: String(period), value: percentNumber(value as number | null | undefined) }))
    .filter((item): item is { period: string; value: number } => item.value !== null);
}

function projectSip(monthlyAmount: number, annualReturnPercent: number, months: number) {
  const monthlyRate = annualReturnPercent / 100 / 12;

  if (!Number.isFinite(monthlyRate) || monthlyRate <= 0) {
    return monthlyAmount * months;
  }

  return monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
}

function average(values: number[]) {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function percentNumber(value: number | string | null | undefined) {
  const numeric = numberOrNull(value);
  if (numeric === null) return null;
  return Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
}

function numberOrNull(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function isNumber(value: number | null): value is number {
  return value !== null && Number.isFinite(value);
}

function formatInteger(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.max(0, value));
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "INR 0";
  if (Math.abs(value) >= 10000000) return `INR ${(value / 10000000).toFixed(2)} Cr`;
  if (Math.abs(value) >= 100000) return `INR ${(value / 100000).toFixed(2)} L`;
  return `INR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}

function formatAum(value: number) {
  if (!value || !Number.isFinite(value)) return "Awaiting";
  if (value >= 100000) return `INR ${(value / 100000).toFixed(2)} L Cr`;
  if (value >= 1000) return `INR ${(value / 1000).toFixed(2)}K Cr`;
  return `INR ${value.toFixed(1)} Cr`;
}

function formatNav(value: number | null | undefined) {
  const numeric = numberOrNull(value);
  return numeric === null ? "Awaiting" : `INR ${numeric.toFixed(2)}`;
}

function formatPercent(value: number | string | null | undefined) {
  const numeric = percentNumber(value);
  return numeric === null ? "Awaiting" : `${numeric.toFixed(2)}%`;
}

function formatTime(value: Date) {
  return `Updated ${value.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function errorMessage(reason: unknown) {
  return reason instanceof Error ? reason.message : "Unable to load live backend data.";
}
