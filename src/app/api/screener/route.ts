import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// High-fidelity fallback dataset of top Indian Mutual Funds
const MOCK_FUNDS = [
  {
    id: "fund_1",
    schemeCode: "120847",
    schemeName: "Parag Parikh Flexi Cap Fund - Direct Growth",
    amcName: "Parag Parikh Mutual Fund",
    category: "Equity",
    subCategory: "Flexi Cap",
    nav: 84.62,
    aum: 62450.50,
    expenseRatio: 0.0058,
    sharpeRatio: 1.84,
    alpha: 5.24,
    beta: 0.82,
    stdDeviation: 12.40,
    returns1y: 0.2840,
    returns3y: 0.2230,
    returns5y: 0.2410,
    returns10y: 0.1980,
    managerName: "Rajeev Thakkar",
    isActive: true,
  },
  {
    id: "fund_2",
    schemeCode: "119062",
    schemeName: "HDFC Mid-Cap Opportunities Fund - Direct Growth",
    amcName: "HDFC Mutual Fund",
    category: "Equity",
    subCategory: "Mid Cap",
    nav: 174.15,
    aum: 65200.20,
    expenseRatio: 0.0062,
    sharpeRatio: 1.62,
    alpha: 3.80,
    beta: 0.95,
    stdDeviation: 15.60,
    returns1y: 0.3680,
    returns3y: 0.2640,
    returns5y: 0.2290,
    returns10y: 0.2120,
    managerName: "Chirag Setalvad",
    isActive: true,
  },
  {
    id: "fund_3",
    schemeCode: "120716",
    schemeName: "SBI Bluechip Fund - Direct Growth",
    amcName: "SBI Mutual Fund",
    category: "Equity",
    subCategory: "Large Cap",
    nav: 92.40,
    aum: 44100.80,
    expenseRatio: 0.0085,
    sharpeRatio: 1.22,
    alpha: 1.15,
    beta: 0.88,
    stdDeviation: 11.20,
    returns1y: 0.1860,
    returns3y: 0.1640,
    returns5y: 0.1580,
    returns10y: 0.1490,
    managerName: "Sohini Andani",
    isActive: true,
  },
  {
    id: "fund_4",
    schemeCode: "125354",
    schemeName: "Nippon India Small Cap Fund - Direct Growth",
    amcName: "Nippon India Mutual Fund",
    category: "Equity",
    subCategory: "Small Cap",
    nav: 162.80,
    aum: 51200.00,
    expenseRatio: 0.0068,
    sharpeRatio: 1.95,
    alpha: 8.40,
    beta: 1.05,
    stdDeviation: 18.20,
    returns1y: 0.4420,
    returns3y: 0.3280,
    returns5y: 0.2860,
    returns10y: 0.2450,
    managerName: "Samir Rachh",
    isActive: true,
  },
  {
    id: "fund_5",
    schemeCode: "128045",
    schemeName: "ICICI Prudential Equity & Debt Fund - Direct Growth",
    amcName: "ICICI Prudential Mutual Fund",
    category: "Hybrid",
    subCategory: "Aggressive Hybrid",
    nav: 325.40,
    aum: 32400.10,
    expenseRatio: 0.0075,
    sharpeRatio: 1.48,
    alpha: 2.90,
    beta: 0.90,
    stdDeviation: 13.10,
    returns1y: 0.2680,
    returns3y: 0.2140,
    returns5y: 0.1940,
    returns10y: 0.1650,
    managerName: "Sankaran Naren",
    isActive: true,
  },
  {
    id: "fund_6",
    schemeCode: "123490",
    schemeName: "Aditya Birla Sun Life Medium Term Plan - Direct Growth",
    amcName: "Aditya Birla Sun Life Mutual Fund",
    category: "Debt",
    subCategory: "Medium Duration",
    nav: 38.12,
    aum: 12500.40,
    expenseRatio: 0.0045,
    sharpeRatio: 0.95,
    alpha: 0.20,
    beta: 0.35,
    stdDeviation: 3.40,
    returns1y: 0.0810,
    returns3y: 0.0760,
    returns5y: 0.0790,
    returns10y: 0.0820,
    managerName: "Sunaina da Cunha",
    isActive: true,
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "returns3y";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Attempt to query the database
    let dbFunds: any[] = [];
    try {
      dbFunds = await prisma.fund.findMany({
        where: {
          isActive: true,
          OR: search
            ? [
                { schemeName: { contains: search, mode: "insensitive" } },
                { amcName: { contains: search, mode: "insensitive" } },
              ]
            : undefined,
          category: category && category !== "All" ? category : undefined,
        },
        orderBy: {
          [sortBy]: sortOrder as any,
        },
        take: 30,
      });
    } catch (dbError: any) {
      console.warn("Database unavailable or empty, serving mock wealth-tech funds dataset:", dbError.message);
    }

    // If database returned records, format and serve them
    if (dbFunds.length > 0) {
      return NextResponse.json({
        success: true,
        source: "database",
        data: dbFunds.map(f => ({
          ...f,
          nav: Number(f.nav),
          aum: f.aum ? Number(f.aum) : null,
          expenseRatio: f.expenseRatio ? Number(f.expenseRatio) : null,
          sharpeRatio: f.sharpeRatio ? Number(f.sharpeRatio) : null,
          alpha: f.alpha ? Number(f.alpha) : null,
          beta: f.beta ? Number(f.beta) : null,
          stdDeviation: f.stdDeviation ? Number(f.stdDeviation) : null,
          returns1y: f.returns1y ? Number(f.returns1y) : null,
          returns3y: f.returns3y ? Number(f.returns3y) : null,
          returns5y: f.returns5y ? Number(f.returns5y) : null,
          returns10y: f.returns10y ? Number(f.returns10y) : null,
        }))
      });
    }

    // Otherwise, apply filtering logic on our premium fallback mockup dataset
    let filteredMock = [...MOCK_FUNDS];

    if (search) {
      const q = search.toLowerCase();
      filteredMock = filteredMock.filter(
        f => f.schemeName.toLowerCase().includes(q) || f.amcName.toLowerCase().includes(q)
      );
    }

    if (category && category !== "All") {
      filteredMock = filteredMock.filter(
        f => f.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Dynamic sorting
    filteredMock.sort((a: any, b: any) => {
      const aVal = a[sortBy] ?? 0;
      const bVal = b[sortBy] ?? 0;
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });

    return NextResponse.json({
      success: true,
      source: "mockup",
      data: filteredMock,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
