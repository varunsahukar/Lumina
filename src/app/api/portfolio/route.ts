import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/backend-api";
import { getActiveUserId } from "@/lib/session-user";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getActiveUserId();

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  const portfolios = await prisma.portfolio.findMany({
    where: { userId },
    include: {
      holdings: {
        include: {
          fund: true,
        },
      },
    },
  });

  const data = portfolios.map((portfolio) => {
    const holdings = portfolio.holdings.map((holding) => {
      const fund = holding.fund as any;
      const units = toNumber(holding.units) ?? 0;
      const avgNav = toNumber(holding.avgNav) ?? 0;
      const invested = toNumber(holding.investedAmount) ?? 0;
      const nav = toNumber(fund.nav) ?? 0;
      const value = units * nav;
      const returns = invested > 0 ? (value - invested) / invested : 0;
      const schemeName = fund.schemeName || fund.name || "";

      return {
        id: holding.id,
        fundId: holding.fundId,
        schemeName,
        name: schemeName,
        units,
        avgNav,
        nav,
        invested,
        value,
        returns,
        category: fund.category,
      };
    });

    const invested = holdings.reduce((sum, holding) => sum + holding.invested, 0);
    const value = holdings.reduce((sum, holding) => sum + holding.value, 0);

    return {
      id: portfolio.id,
      name: portfolio.name,
      invested,
      value,
      gain: value - invested,
      returns: invested > 0 ? (value - invested) / invested : 0,
      holdings,
    };
  });

  return NextResponse.json({
    success: true,
    source: "database",
    data,
  });
}
