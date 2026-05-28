import { NextRequest, NextResponse } from "next/server";
import {
  backendFetch,
  normalizeFunds,
  toNumber,
} from "@/lib/backend-api";
import { getLocalFunds } from "@/lib/local-funds";
import { prisma } from "@/lib/prisma";
import { getActiveUserId } from "@/lib/session-user";

type UserRole = "INVESTOR" | "ADVISOR" | "AMC" | "RESEARCHER" | "ADMIN";
type MetricTone = "cream" | "red" | "blue" | "teal" | "black";

interface FundRow {
  id: string;
  schemeName?: string;
  name?: string;
  category?: string | null;
  amcName?: string | null;
  nav?: number | null;
  aum?: number | null;
  returns3y?: number | null;
}

interface Metric {
  label: string;
  value: string;
  note: string;
  tone: MetricTone;
}

const roles = new Set<UserRole>(["INVESTOR", "ADVISOR", "AMC", "RESEARCHER", "ADMIN"]);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const role = parseRole(searchParams.get("role"));
  const userId = await getActiveUserId();

  try {
    const [{ funds, source }, db] = await Promise.all([
      loadFunds(),
      loadDatabaseSnapshot(userId),
    ]);

    const fundStats = buildFundStats(funds);
    const portfolioTotals = buildPortfolioTotals(db.portfolios);
    const goals = buildGoals(portfolioTotals.value);
    const profile = buildRoleProfile(role, {
      fundStats,
      portfolioTotals,
      db,
      goals,
      source,
    });

    return NextResponse.json({
      success: true,
      source,
      data: {
        role,
        profile,
        chartData: fundStats.categories.slice(0, 6).map((category) => ({
          name: category.name,
          views: category.funds,
          aum: category.aum,
          avgReturn: category.avgReturn,
        })),
        activity: buildActivity(role, funds, db, source),
        goals,
        totals: {
          fundsCount: funds.length,
          usersCount: db.usersCount,
          portfoliosCount: db.portfoliosCount,
          transactionsCount: db.transactionsCount,
          totalAum: fundStats.totalAum,
          portfolioValue: portfolioTotals.value,
          portfolioInvested: portfolioTotals.invested,
          avgReturn: fundStats.avgReturn,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load workspace";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

async function loadFunds() {
  try {
    const backendFunds = await backendFetch<FundRow[]>("/funds?market=INDIA&limit=100");
    return {
      source: "backend",
      funds: normalizeFunds(backendFunds) as FundRow[],
    };
  } catch {
    return {
      source: "database-fallback",
      funds: (await getLocalFunds({ market: "INDIA", limit: 100 })) as FundRow[],
    };
  }
}

async function loadDatabaseSnapshot(userId: string | null) {
  const [
    usersCount,
    portfoliosCount,
    transactionsCount,
    portfolios,
    transactions,
  ] = await Promise.all([
    prisma.user.count().catch(() => 0),
    prisma.portfolio.count().catch(() => 0),
    prisma.transaction.count().catch(() => 0),
    userId
      ? prisma.portfolio
          .findMany({
            where: { userId },
            include: {
              holdings: {
                include: {
                  fund: true,
                },
              },
            },
            orderBy: { createdAt: "asc" },
          })
          .catch(() => [])
      : Promise.resolve([]),
    userId
      ? prisma.transaction
          .findMany({
            where: { userId },
            include: { fund: true },
            orderBy: { date: "desc" },
            take: 8,
          })
          .catch(() => [])
      : Promise.resolve([]),
  ]);

  return {
    usersCount,
    portfoliosCount,
    transactionsCount,
    portfolios,
    transactions,
  };
}

function buildFundStats(funds: FundRow[]) {
  const categories = new Map<
    string,
    { name: string; funds: number; aum: number; returnSum: number; returnCount: number }
  >();
  let totalAum = 0;
  let returnSum = 0;
  let returnCount = 0;

  funds.forEach((fund) => {
    const category = normalizeCategory(fund.category);
    const aum = toNumber(fund.aum) ?? 0;
    const fundReturn = toPercent(fund.returns3y);
    const bucket =
      categories.get(category) ||
      { name: category, funds: 0, aum: 0, returnSum: 0, returnCount: 0 };

    bucket.funds += 1;
    bucket.aum += aum;
    if (fundReturn !== null) {
      bucket.returnSum += fundReturn;
      bucket.returnCount += 1;
      returnSum += fundReturn;
      returnCount += 1;
    }
    totalAum += aum;
    categories.set(category, bucket);
  });

  return {
    totalAum,
    avgReturn: returnCount > 0 ? returnSum / returnCount : 0,
    categories: Array.from(categories.values())
      .map((category) => ({
        name: category.name,
        funds: category.funds,
        aum: category.aum,
        avgReturn:
          category.returnCount > 0 ? category.returnSum / category.returnCount : 0,
      }))
      .sort((a, b) => b.funds - a.funds),
  };
}

function buildPortfolioTotals(portfolios: any[]) {
  return portfolios.reduce(
    (totals, portfolio) => {
      const holdings = portfolio.holdings || [];
      holdings.forEach((holding: any) => {
        const units = toNumber(holding.units) ?? 0;
        const invested = toNumber(holding.investedAmount) ?? 0;
        const nav = toNumber(holding.fund?.nav) ?? 0;
        totals.invested += invested;
        totals.value += units * nav;
        totals.holdings += 1;
      });
      return totals;
    },
    { invested: 0, value: 0, holdings: 0 }
  );
}

function buildGoals(portfolioValue: number) {
  const target = Math.max(1000000, Math.ceil((portfolioValue || 250000) * 2.5));
  const progress = target > 0 ? Math.min(100, (portfolioValue / target) * 100) : 0;

  return [
    {
      id: "core-wealth",
      name: "Core wealth goal",
      current: portfolioValue,
      target,
      progress,
      note:
        portfolioValue > 0
          ? "Calculated from live portfolio value"
          : "Investments will update this goal automatically",
    },
  ];
}

function buildRoleProfile(
  role: UserRole,
  context: {
    fundStats: ReturnType<typeof buildFundStats>;
    portfolioTotals: ReturnType<typeof buildPortfolioTotals>;
    db: Awaited<ReturnType<typeof loadDatabaseSnapshot>>;
    goals: ReturnType<typeof buildGoals>;
    source: string;
  }
) {
  const { fundStats, portfolioTotals, db, goals, source } = context;
  const portfolioReturn =
    portfolioTotals.invested > 0
      ? ((portfolioTotals.value - portfolioTotals.invested) / portfolioTotals.invested) * 100
      : 0;
  const avgGoalProgress =
    goals.reduce((sum, goal) => sum + goal.progress, 0) / Math.max(1, goals.length);
  const syncNote = source === "backend" ? "Nest backend live" : "Local database fallback";

  const baseSteps = [
    {
      id: "01",
      title: "Live snapshot",
      body: `${fundStats.categories.reduce((sum, item) => sum + item.funds, 0)} funds loaded from ${syncNote.toLowerCase()}.`,
    },
    {
      id: "02",
      title: "Portfolio signal",
      body: `${db.portfoliosCount} portfolios and ${db.transactionsCount} investment transactions are available in the database.`,
      red: true,
    },
    {
      id: "03",
      title: "Action layer",
      body: roleActionBody(role),
    },
  ];

  const profiles: Record<UserRole, any> = {
    INVESTOR: {
      eyebrow: "Investor workspace",
      title: "From capital to",
      pixel: "confident moves",
      intro:
        "A direct investing console using live funds, portfolio holdings and transaction history.",
      metrics: [
        {
          label: "Total worth",
          value: formatCompactCurrency(portfolioTotals.value),
          note: `${portfolioTotals.holdings} live holdings`,
          tone: "cream",
        },
        {
          label: "XIRR proxy",
          value: `${portfolioReturn.toFixed(1)}%`,
          note: `${formatCompactCurrency(portfolioTotals.invested)} invested`,
          tone: "red",
        },
        {
          label: "Goals",
          value: `${goals.length}`,
          note: `${avgGoalProgress.toFixed(0)}% portfolio-derived progress`,
          tone: "blue",
        },
      ],
      included: [
        "Direct fund screening",
        "Live investment execution",
        "Goal planning from holdings",
        "Portfolio monitoring",
        "Payment confirmation flow",
      ],
      steps: baseSteps,
    },
    ADVISOR: {
      eyebrow: "Advisor workspace",
      title: "From client data to",
      pixel: "better advice",
      intro:
        "A live advisory workspace driven by users, portfolios, holdings and current fund metrics.",
      metrics: [
        {
          label: "AUA",
          value: formatCompactCurrency(portfolioTotals.value),
          note: `${db.portfoliosCount} client portfolios`,
          tone: "cream",
        },
        {
          label: "Clients",
          value: `${db.usersCount}`,
          note: `${portfolioTotals.holdings} mapped holdings`,
          tone: "teal",
        },
        {
          label: "Reviews",
          value: `${db.transactionsCount}`,
          note: "Investment events to review",
          tone: "red",
        },
      ],
      included: ["Client console", "Suitability review", "Portfolio checks", "Fund shortlist", "Action notes"],
      steps: baseSteps,
    },
    AMC: {
      eyebrow: "AMC control",
      title: "From scheme data to",
      pixel: "market reach",
      intro:
        "A product control surface fed by live fund counts, AUM, categories and AMFI-backed scheme rows.",
      metrics: [
        {
          label: "AUM",
          value: formatCompactCurrency(fundStats.totalAum),
          note: `${fundStats.categories.length} categories tracked`,
          tone: "blue",
        },
        {
          label: "Schemes",
          value: `${fundStats.categories.reduce((sum, item) => sum + item.funds, 0)}`,
          note: syncNote,
          tone: "cream",
        },
        {
          label: "Avg 3Y",
          value: `${fundStats.avgReturn.toFixed(1)}%`,
          note: "Return-bearing schemes",
          tone: "teal",
        },
      ],
      included: ["Fund manager", "Category pulse", "AUM ranking", "Scheme freshness", "Direct inflow checks"],
      steps: baseSteps,
    },
    RESEARCHER: {
      eyebrow: "Research hub",
      title: "From insight to",
      pixel: "trusted signal",
      intro:
        "Research signals are calculated from live fund returns, categories and backend market-data coverage.",
      metrics: [
        {
          label: "Signals",
          value: `${fundStats.categories.reduce((sum, item) => sum + item.funds, 0)}`,
          note: "Live fund rows available",
          tone: "cream",
        },
        {
          label: "Avg 3Y",
          value: `${fundStats.avgReturn.toFixed(1)}%`,
          note: "Research benchmark",
          tone: "red",
        },
        {
          label: "Categories",
          value: `${fundStats.categories.length}`,
          note: "Universe segmentation",
          tone: "blue",
        },
      ],
      included: ["Research center", "Fund signal ranking", "Category mix", "Return outliers", "Insight queue"],
      steps: baseSteps,
    },
    ADMIN: {
      eyebrow: "System admin",
      title: "From platform logs to",
      pixel: "stable ops",
      intro:
        "A runtime console for users, portfolios, transactions, sync status and backend fund availability.",
      metrics: [
        {
          label: "Funds",
          value: `${fundStats.categories.reduce((sum, item) => sum + item.funds, 0)}`,
          note: syncNote,
          tone: "black",
        },
        {
          label: "Users",
          value: `${db.usersCount}`,
          note: "Database accounts",
          tone: "cream",
        },
        {
          label: "Orders",
          value: `${db.transactionsCount}`,
          note: `${db.portfoliosCount} portfolios`,
          tone: "teal",
        },
      ],
      included: ["System control", "User registry", "Portfolio audit", "Fund sync monitor", "Runtime checks"],
      steps: baseSteps,
    },
  };

  return profiles[role];
}

function buildActivity(
  role: UserRole,
  funds: FundRow[],
  db: Awaited<ReturnType<typeof loadDatabaseSnapshot>>,
  source: string
) {
  if (role === "ADVISOR") {
    return db.portfolios.slice(0, 5).map((portfolio: any) => {
      const holdings = portfolio.holdings || [];
      const value = holdings.reduce((sum: number, holding: any) => {
        const units = toNumber(holding.units) ?? 0;
        const nav = toNumber(holding.fund?.nav) ?? 0;
        return sum + units * nav;
      }, 0);

      return {
        label: portfolio.name,
        value: formatCompactCurrency(value),
        note: `${holdings.length} holdings`,
      };
    });
  }

  if (role === "AMC") {
    return [...funds]
      .sort((a, b) => (toNumber(b.aum) ?? 0) - (toNumber(a.aum) ?? 0))
      .slice(0, 5)
      .map((fund) => ({
        label: fund.schemeName || fund.name || "Unnamed scheme",
        value: formatCompactCurrency(toNumber(fund.aum) ?? 0),
        note: normalizeCategory(fund.category),
      }));
  }

  if (role === "RESEARCHER") {
    return [...funds]
      .sort((a, b) => (toPercent(b.returns3y) ?? -Infinity) - (toPercent(a.returns3y) ?? -Infinity))
      .slice(0, 5)
      .map((fund) => ({
        label: fund.schemeName || fund.name || "Unnamed scheme",
        value: `${(toPercent(fund.returns3y) ?? 0).toFixed(1)}%`,
        note: `${normalizeCategory(fund.category)} 3Y return`,
      }));
  }

  if (role === "ADMIN") {
    return [
      { label: "Fund data source", value: source, note: "Current frontend API mode" },
      { label: "Users", value: `${db.usersCount}`, note: "Registered accounts" },
      { label: "Portfolios", value: `${db.portfoliosCount}`, note: "Database records" },
      { label: "Transactions", value: `${db.transactionsCount}`, note: "Completed order rows" },
    ];
  }

  const transactions = db.transactions.slice(0, 5).map((transaction: any) => ({
    label: transaction.fund?.name || "Investment",
    value: formatCompactCurrency(toNumber(transaction.amount) ?? 0),
    note: `${transaction.type} ${transaction.status}`,
  }));

  if (transactions.length > 0) return transactions;

  return funds.slice(0, 5).map((fund) => ({
    label: fund.schemeName || fund.name || "Fund",
    value: formatNav(fund.nav),
    note: normalizeCategory(fund.category),
  }));
}

function parseRole(role: string | null): UserRole {
  return role && roles.has(role as UserRole) ? (role as UserRole) : "INVESTOR";
}

function normalizeCategory(category: unknown) {
  const label = String(category || "Uncategorised").replace(/\s+Scheme$/i, "");
  return label || "Uncategorised";
}

function toPercent(value: unknown) {
  const numeric = toNumber(value);
  if (numeric === null) return null;
  return Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
}

function formatCompactCurrency(value: number) {
  const amount = Number.isFinite(value) ? Math.abs(value) : 0;
  const sign = value < 0 ? "-" : "";

  if (amount >= 10000000) return `${sign}₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `${sign}₹${(amount / 100000).toFixed(2)}L`;
  return `${sign}₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatNav(value: unknown) {
  const nav = toNumber(value) ?? 0;
  return `₹${nav.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function roleActionBody(role: UserRole) {
  const body: Record<UserRole, string> = {
    INVESTOR: "Move from fund selection to a real database transaction and payment confirmation page.",
    ADVISOR: "Prioritise client reviews using live portfolio values and completed investment events.",
    AMC: "Watch product reach with scheme counts, AUM ranking and category distribution.",
    RESEARCHER: "Convert return outliers and category movement into publishable research signals.",
    ADMIN: "Monitor users, funds, portfolios and order records from the live database snapshot.",
  };

  return body[role];
}
