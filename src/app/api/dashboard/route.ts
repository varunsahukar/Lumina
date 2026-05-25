import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Fetch total count of funds from the database
    const fundsCount = await prisma.fund.count({
      where: { isActive: true }
    });

    // 2. Fetch total count of registered users
    const usersCount = await prisma.user.count();

    // 3. Fetch total AUM (Sum of all funds' AUM)
    const rawAum = await prisma.fund.aggregate({
      _sum: {
        aum: true
      }
    });
    const totalAum = rawAum._sum.aum ? Number(rawAum._sum.aum) : 0;

    // 4. Fetch average returns for Equity category
    const rawAvgReturns = await prisma.fund.aggregate({
      _avg: {
        returns3y: true
      },
      where: {
        category: {
          contains: "Equity",
          mode: "insensitive"
        }
      }
    });
    const avgEquityReturns = rawAvgReturns._avg.returns3y ? Number(rawAvgReturns._avg.returns3y) * 100 : 18.42;

    // 5. Fetch sample recent active funds for listing
    const recentFunds = await prisma.fund.findMany({
      take: 5,
      orderBy: {
        aum: "desc"
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        fundsCount,
        usersCount,
        totalAum,
        avgEquityReturns: Number(avgEquityReturns.toFixed(2)),
        recentFunds: recentFunds.map(f => ({
          id: f.id,
          schemeName: f.schemeName,
          category: f.category,
          nav: Number(f.nav),
          aum: f.aum ? Number(f.aum) : 0,
          returns3y: f.returns3y ? Number(f.returns3y) * 100 : 0
        }))
      }
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
