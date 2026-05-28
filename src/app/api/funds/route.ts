import { NextRequest, NextResponse } from "next/server";
import {
  backendErrorResponse,
  backendFetch,
  normalizeFunds,
} from "@/lib/backend-api";
import { getLocalFunds } from "@/lib/local-funds";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const backendParams = new URLSearchParams(searchParams);

    if (!backendParams.has("limit")) {
      backendParams.set("limit", "50");
    }

    let funds: any[];
    let source = "backend";

    try {
      funds = await backendFetch<any[]>(`/funds?${backendParams}`);
    } catch (error) {
      console.warn("Backend funds unavailable, falling back to local database:", error);
      funds = await getLocalFunds({
        search: backendParams.get("search") || undefined,
        market: backendParams.get("market") || undefined,
        limit: Number(backendParams.get("limit") || 50),
      });
      source = "database-fallback";
    }

    return NextResponse.json({
      success: true,
      source,
      data: normalizeFunds(funds),
      funds: normalizeFunds(funds),
    });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
