"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Database,
  Landmark,
  LineChart,
  Moon,
  ShieldCheck,
  Sun,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import { AgencyLogo } from "@/components/agency/AgencyPrimitives";
import InstrumentPreviewCard from "@/components/market/InstrumentPreviewCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

interface PrototypePage {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  stats: Array<{ label: string; value: string; note: string }>;
  points: string[];
  visual: "problem" | "funds" | "stocks" | "solution";
  icon: ComponentType<{ className?: string }>;
}

const prototypePages: PrototypePage[] = [
  {
    id: "01",
    eyebrow: "ABOUT US",
    title: "Decide before you invest.",
    accent: "Lumina turns fund and market data into clear actions.",
    body:
      "Most investors jump between tools. Lumina brings discovery, planning and orders into one simple flow.",
    stats: [
      { label: "User journey", value: "4", note: "discover, compare, plan, invest" },
      { label: "Core markets", value: "2", note: "mutual funds and listed equities" },
      { label: "Workspaces", value: "5", note: "investor, advisor, AMC, research, admin" },
    ],
    points: [
      "Find funds faster.",
      "Plan with live numbers.",
      "Keep each role focused.",
    ],
    visual: "problem",
    icon: CompassIcon,
  },
  {
    id: "02",
    eyebrow: "Mutual fund engine",
    title: "Compare funds quickly.",
    accent: "NAV, AUM, return and category data stay in one view.",
    body:
      "The fund view removes clutter. Users can compare schemes, open details and move into investing.",
    stats: [
      { label: "Inputs", value: "NAV", note: "AMFI and mfapi-backed data" },
      { label: "Output", value: "SIP", note: "planning from scheme returns" },
      { label: "Guardrail", value: "Risk", note: "category and allocation awareness" },
    ],
    points: [
      "Compare return, cost and size.",
      "Open a focused fund page.",
      "Invest and review payment.",
    ],
    visual: "funds",
    icon: WalletCards,
  },
  {
    id: "03",
    eyebrow: "Stock market context",
    title: "Use market context.",
    accent: "Stocks and sectors explain fund movement.",
    body:
      "Funds move with markets. Lumina keeps the key signals close to screening and research.",
    stats: [
      { label: "Signals", value: "Live", note: "market and quote-ready design" },
      { label: "Lens", value: "Sector", note: "allocation context" },
      { label: "Use case", value: "Rebalance", note: "portfolio action support" },
    ],
    points: [
      "See market momentum.",
      "Spot volatility early.",
      "Share the same signal view.",
    ],
    visual: "stocks",
    icon: TrendingUp,
  },
  {
    id: "04",
    eyebrow: "What Lumina solves",
    title: "From insight to action.",
    accent: "The next page opens the live fund surface.",
    body:
      "Lumina connects learning, screening, investing, portfolio tracking and reports.",
    stats: [
      { label: "Problem", value: "Noise", note: "too many disconnected finance tools" },
      { label: "Solution", value: "Flow", note: "learn, screen, invest, monitor" },
      { label: "Next step", value: "Live", note: "open the landing experience" },
    ],
    points: [
      "Investors can act directly.",
      "Teams get role-based views.",
      "Ops can track data health.",
    ],
    visual: "solution",
    icon: ShieldCheck,
  },
];

const sampleFundPreview = {
  name: "ICICI Prudential Bluechip Fund",
  ticker: "MF:120586",
  issuer: "ICICI Prudential AMC",
  category: "Large Cap Equity",
  description:
    "A compact fund preview with AMC, NAV, risk and yearly returns.",
  stats: [
    { label: "NAV", value: "INR 95.42" },
    { label: "3Y return", value: "18.6%", tone: "positive" as const },
    { label: "Expense", value: "0.92%" },
  ],
  history: [
    { label: "2021", value: 12.8, displayValue: "12.8%" },
    { label: "2022", value: 9.4, displayValue: "9.4%" },
    { label: "2023", value: 18.6, displayValue: "18.6%" },
    { label: "2024", value: 21.2, displayValue: "21.2%" },
    { label: "2025", value: 16.7, displayValue: "16.7%" },
  ],
};

const sampleStockPreview = {
  name: "Reliance Industries",
  ticker: "RELIANCE",
  issuer: "Reliance Industries Ltd",
  category: "Energy / Retail / Digital",
  description:
    "A simple stock preview with company details and revenue history.",
  stats: [
    { label: "Market cap", value: "INR 19.4T" },
    { label: "P/E", value: "24.8x" },
    { label: "1Y move", value: "+14.2%", tone: "positive" as const },
  ],
  history: [
    { label: "FY21", value: 5.4, displayValue: "5.4T" },
    { label: "FY22", value: 7.2, displayValue: "7.2T" },
    { label: "FY23", value: 8.8, displayValue: "8.8T" },
    { label: "FY24", value: 9.7, displayValue: "9.7T" },
    { label: "FY25", value: 10.1, displayValue: "10.1T" },
  ],
};

export default function PrototypeIntroExperience() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activePage, setActivePage] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const applyTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("lumina-theme", nextTheme);
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("lumina-theme");
    const nextTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    applyTheme(nextTheme);
  }, [applyTheme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number(visible.target.getAttribute("data-page-index"));
        if (Number.isFinite(index)) setActivePage(index);
      },
      { threshold: [0.45, 0.6, 0.75] },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const active = prototypePages[activePage];
  const progressWidth = useMemo(
    () => `${((activePage + 1) / prototypePages.length) * 100}%`,
    [activePage],
  );

  const scrollToPage = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lumina-landing prototype-intro min-h-screen">
      <div className="lumina-progress" style={{ width: progressWidth }} />

      <header className="lumina-shell lumina-header">
        <AgencyLogo dark={theme === "dark"} />
        <nav className="hidden items-center gap-3 lg:flex" aria-label="Prototype pages">
          {prototypePages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              className={cn("prototype-nav-button", activePage === index && "is-active")}
              onClick={() => scrollToPage(index)}
              aria-label={`Go to page ${page.id}: ${page.eyebrow}`}
            >
              <span>{page.id}</span>
              {page.eyebrow}
            </button>
          ))}
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
            className="hidden rounded-[4px] border-2 border-[var(--landing-ink)] bg-[var(--landing-ink)] px-5 font-black text-[var(--landing-bg)] shadow-[5px_5px_0_var(--landing-shadow)] hover:bg-[var(--landing-ink)] sm:inline-flex"
          >
            <Link href="/landing">
              Skip
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="snap-y snap-mandatory">
        {prototypePages.map((page, index) => (
          <section
            key={page.id}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            data-page-index={index}
            className="lumina-shell prototype-page grid min-h-[calc(100vh-5rem)] snap-start gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
          >
            <PrototypeCopy
              page={page}
              active={active.id === page.id}
              isLast={index === prototypePages.length - 1}
              onNext={() => scrollToPage(Math.min(index + 1, prototypePages.length - 1))}
            />
            <PrototypeVisual page={page} active={active.id === page.id} />
          </section>
        ))}
      </main>
    </div>
  );
}

function PrototypeCopy({
  page,
  active,
  isLast,
  onNext,
}: {
  page: PrototypePage;
  active: boolean;
  isLast: boolean;
  onNext: () => void;
}) {
  const Icon = page.icon;

  return (
    <div className={cn("prototype-copy", active && "is-active")}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="lumina-status">
          <Icon className="h-4 w-4" />
          Page {page.id}
        </span>
        <span className="lumina-chip">{page.eyebrow}</span>
      </div>

      <h1 className="max-w-4xl text-[2.85rem] font-black leading-[1] text-[var(--landing-ink)] sm:text-[4.25rem] lg:text-[5.35rem]">
        {page.title}
      </h1>
      <p className="mt-6 max-w-3xl text-xl font-black leading-[1.35] text-[var(--landing-red)] sm:text-2xl">
        {page.accent}
      </p>
      <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[var(--landing-muted)] sm:text-lg">
        {page.body}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {page.stats.map((stat) => (
          <article key={stat.label} className="prototype-stat">
            <p className="text-xs font-black uppercase text-[var(--landing-muted)]">{stat.label}</p>
            <p className="mt-3 agency-pixel text-[2.75rem] leading-none text-[var(--landing-ink)]">
              {stat.value}
            </p>
            <p className="mt-3 text-xs font-black uppercase leading-5 text-[var(--landing-muted)]">
              {stat.note}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {page.points.map((point) => (
          <div key={point} className="flex gap-3 text-sm font-bold leading-6 text-[var(--landing-ink)]">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--landing-teal)]" />
            <span>{point}</span>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap gap-4">
        {isLast ? (
          <Button
            asChild
            className="h-14 rounded-[4px] border-2 border-[var(--landing-ink)] bg-[var(--landing-red)] px-7 text-base font-black text-white shadow-[6px_6px_0_var(--landing-shadow)] hover:bg-[var(--landing-red)]"
          >
            <Link href="/landing">
              Let&apos;s go
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <Button
            type="button"
            className="h-14 rounded-[4px] border-2 border-[var(--landing-ink)] bg-[var(--landing-red)] px-7 text-base font-black text-white shadow-[6px_6px_0_var(--landing-shadow)] hover:bg-[var(--landing-red)]"
            onClick={onNext}
          >
            Continue
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        )}
        <Button
          asChild
          variant="outline"
          className="h-14 rounded-[4px] border-2 border-[var(--landing-ink)] bg-transparent px-7 text-base font-black text-[var(--landing-ink)] hover:bg-[var(--landing-panel)]"
        >
          <Link href="/landing">Open landing</Link>
        </Button>
      </div>
    </div>
  );
}

function PrototypeVisual({ page, active }: { page: PrototypePage; active: boolean }) {
  if (page.visual === "funds") return <MutualFundVisual active={active} />;
  if (page.visual === "stocks") return <StockMarketVisual active={active} />;
  if (page.visual === "solution") return <SolutionVisual active={active} />;
  return <ProblemVisual active={active} />;
}

function ProblemVisual({ active }: { active: boolean }) {
  const rows = [
    { label: "Fund facts", value: "NAV, AUM, returns", color: "bg-[var(--landing-red)]" },
    { label: "Market signals", value: "Index, sector, volatility", color: "bg-[var(--landing-teal)]" },
    { label: "Investor action", value: "Screen, plan, invest", color: "bg-[var(--landing-blue)]" },
  ];

  return (
    <div className={cn("prototype-board", active && "is-active")}>
      <div className="prototype-board-grid" />
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="lumina-label">Current problem</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Too many tools, no clean decision path.</h2>
          </div>
          <Database className="h-8 w-8 text-[var(--landing-red)]" />
        </div>

        <div className="grid gap-4">
          {rows.map((row, index) => (
            <article key={row.label} className="prototype-flow-row" style={{ animationDelay: `${index * 120}ms` }}>
              <span className={cn("h-4 w-4 shrink-0 border-2 border-[var(--landing-ink)]", row.color)} />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black">{row.label}</h3>
                <p className="mt-1 text-sm font-bold uppercase text-[var(--landing-muted)]">{row.value}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <SignalTile label="Static tables" value="slow" />
          <SignalTile label="No context" value="risky" />
          <SignalTile label="Broken handoff" value="costly" />
        </div>
      </div>
    </div>
  );
}

function MutualFundVisual({ active }: { active: boolean }) {
  return (
    <div className={cn("prototype-board", active && "is-active")}>
      <div className="prototype-board-grid" />
      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="lumina-label">Mutual fund model</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">Scheme intelligence stack</h2>
          <div className="mt-8 space-y-4">
            {["AMFI NAV sync", "Fund category ranking", "SIP outcome planning"].map((item, index) => (
              <article key={item} className="prototype-step-card" style={{ animationDelay: `${index * 130}ms` }}>
                <span className="text-xs font-black text-[var(--landing-red)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-black">{item}</h3>
              </article>
            ))}
          </div>
        </div>
        <InstrumentPreviewCard
          kind="fund"
          name={sampleFundPreview.name}
          ticker={sampleFundPreview.ticker}
          issuer={sampleFundPreview.issuer}
          category={sampleFundPreview.category}
          description={sampleFundPreview.description}
          priceLabel="Current NAV"
          priceValue="INR 95.42"
          stats={sampleFundPreview.stats}
          history={sampleFundPreview.history}
          historyLabel="Yearly return history"
          actionHref="/landing"
          actionLabel="Preview live fund"
        />
      </div>
    </div>
  );
}

function StockMarketVisual({ active }: { active: boolean }) {
  const heat = ["bg-[#c95545]", "bg-[#4ba1a7]", "bg-[#7b9cc8]", "bg-[#f0b75d]", "bg-[#2d8188]", "bg-[#cf6a5f]"];

  return (
    <div className={cn("prototype-board", active && "is-active")}>
      <div className="prototype-board-grid" />
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="lumina-label">Stock market layer</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Signals that explain fund movement.</h2>
          </div>
          <LineChart className="h-8 w-8 text-[var(--landing-teal)]" />
        </div>

        <div className="prototype-market-window">
          <div className="prototype-market-line" />
          <div className="prototype-market-line delay-150" />
          <div className="prototype-market-line delay-300" />
          <div className="grid grid-cols-6 gap-2">
            {heat.map((color, index) => (
              <span
                key={`${color}-${index}`}
                className={cn("prototype-heat-cell", color)}
                style={{ animationDelay: `${index * 90}ms` }}
              />
            ))}
          </div>
        </div>

        <InstrumentPreviewCard
          className="mt-7"
          kind="stock"
          name={sampleStockPreview.name}
          ticker={sampleStockPreview.ticker}
          issuer={sampleStockPreview.issuer}
          category={sampleStockPreview.category}
          description={sampleStockPreview.description}
          priceLabel="Last price"
          priceValue="INR 2,891"
          stats={sampleStockPreview.stats}
          history={sampleStockPreview.history}
          historyLabel="Revenue history"
          actionHref="/landing"
          actionLabel="Use this pattern"
        />
      </div>
    </div>
  );
}

function SolutionVisual({ active }: { active: boolean }) {
  const roles = [
    { label: "Investor", icon: WalletCards },
    { label: "Advisor", icon: Landmark },
    { label: "AMC", icon: Building2 },
    { label: "Research", icon: BarChart3 },
    { label: "Admin", icon: ShieldCheck },
  ];

  return (
    <div className={cn("prototype-board", active && "is-active")}>
      <div className="prototype-board-grid" />
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="lumina-label">Final system</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">One product, separate actions.</h2>
          </div>
          <Zap className="h-8 w-8 text-[var(--landing-red)]" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <article key={role.label} className="prototype-role-tile" style={{ animationDelay: `${index * 90}ms` }}>
                <Icon className="h-6 w-6 text-[var(--landing-red)]" />
                <h3 className="mt-5 text-lg font-black">{role.label}</h3>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <SignalTile label="Data" value="backend" />
          <SignalTile label="Actions" value="guided" />
          <SignalTile label="Reports" value="ready" />
        </div>

        <Button
          asChild
          className="mt-8 h-14 w-full rounded-[4px] border-2 border-[var(--landing-ink)] bg-[var(--landing-teal)] px-7 text-base font-black text-[#082f33] shadow-[6px_6px_0_var(--landing-shadow)] hover:bg-[var(--landing-teal)]"
        >
          <Link href="/landing">
            Let&apos;s go to the landing page
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function SignalTile({ label, value }: { label: string; value: string }) {
  return (
    <article className="border-2 border-[var(--landing-line)] bg-[var(--landing-panel-soft)] p-4">
      <p className="text-xs font-black uppercase text-[var(--landing-muted)]">{label}</p>
      <p className="mt-3 truncate text-2xl font-black text-[var(--landing-ink)]">{value}</p>
    </article>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return <LineChart className={className} />;
}
