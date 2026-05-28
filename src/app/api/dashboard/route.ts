import { NextResponse } from "next/server";
import {
  backendFetch,
  normalizeFunds,
  toNumber,
} from "@/lib/backend-api";
import { getLocalFunds } from "@/lib/local-funds";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function toPercent(value: unknown): number | null {
  const numeric = toNumber(value);
  if (numeric === null) return null;
  return Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
}

export async function GET() {
  try {
    let source = "backend";
    let summary: any = {};
    let fundList: any[] = [];

    try {
      [summary, fundList] = await Promise.all([
        backendFetch<any>("/funds/stats/summary"),
        backendFetch<any[]>("/funds?market=INDIA&limit=100"),
      ]);
    } catch (error) {
      console.warn("Backend dashboard unavailable, falling back to local database:", error);
      source = "database-fallback";
      fundList = await getLocalFunds({ market: "INDIA", limit: 100 });
      summary = { totalFunds: fundList.length };
    }

    const funds = normalizeFunds(fundList);
    const usersCount = await prisma.user.count().catch(() => 0);
    const totalAum = funds.reduce(
      (sum, fund) => sum + (toNumber(fund.aum) ?? 0),
      0
    );
    const fundsWithReturns = funds.filter((fund) => fund.returns3y !== null);
    const avgEquityReturns =
      fundsWithReturns.length > 0
        ? (fundsWithReturns.reduce(
            (sum, fund) => sum + (toPercent(fund.returns3y) ?? 0),
            0
          ) /
            fundsWithReturns.length)
        : toNumber(summary.averageChangePercent) ?? 0;

    const recentFunds = funds
      .sort((a, b) => (toNumber(b.aum) ?? 0) - (toNumber(a.aum) ?? 0))
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      source,
      data: {
        fundsCount: summary.totalFunds ?? funds.length,
        usersCount,
        totalAum,
        avgEquityReturns: Number(avgEquityReturns.toFixed(2)),
        recentFunds: recentFunds.map(f => ({
          id: f.id,
          schemeName: f.schemeName,
          category: f.category,
          nav: toNumber(f.nav) ?? 0,
          aum: toNumber(f.aum) ?? 0,
          returns3y: toPercent(f.returns3y) ?? 0
        })),
        summary,
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load dashboard";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
