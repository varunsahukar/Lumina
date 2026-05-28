import { NextRequest, NextResponse } from "next/server";
import {
  backendErrorResponse,
  backendFetch,
  normalizeFunds,
  toNumber,
} from "@/lib/backend-api";
import { getLocalFunds } from "@/lib/local-funds";

const SORT_FIELDS = new Set([
  "nav",
  "aum",
  "expenseRatio",
  "sharpeRatio",
  "returns1y",
  "returns3y",
  "returns5y",
  "returns10y",
  "changePercent",
]);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "returns3y";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

    const backendParams = new URLSearchParams({
      market: "INDIA",
      limit: "100",
    });

    if (search) backendParams.set("search", search);

    let source = "backend";
    let funds;

    try {
      const backendFunds = await backendFetch<any[]>(`/funds?${backendParams}`);
      funds = normalizeFunds(backendFunds);
    } catch (error) {
      console.warn("Backend screener unavailable, falling back to local database:", error);
      funds = await getLocalFunds({
        search,
        market: "INDIA",
        limit: 100,
      });
      source = "database-fallback";
    }

    if (category && category !== "All") {
      funds = funds.filter(
        (fund) => fund.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (SORT_FIELDS.has(sortBy)) {
      funds.sort((a: any, b: any) => {
        const aValue = toNumber(a[sortBy]);
        const bValue = toNumber(b[sortBy]);

        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return NextResponse.json({
      success: true,
      source,
      data: funds.slice(0, 50),
    });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
