import { NextRequest, NextResponse } from "next/server";
import {
  backendErrorResponse,
  backendFetch,
  describeBackendError,
  toNumber,
  unwrapApiData,
} from "@/lib/backend-api";
import { getLocalFundHistory } from "@/lib/local-funds";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "30";
    let history: any[];
    let source = "backend";

    try {
      const backendPayload = await backendFetch<any[] | { data?: any[] }>(
        `/funds/${encodeURIComponent(params.id)}/history?days=${encodeURIComponent(days)}`
      );
      history = unwrapApiData<any[]>(backendPayload);
    } catch (error) {
      console.warn(
        "Backend fund history unavailable, falling back to local database:",
        describeBackendError(error)
      );
      history = await getLocalFundHistory(params.id, { days: Number(days) || 30 });
      source = "database-fallback";
    }

    return NextResponse.json({
      success: true,
      source,
      data: history.map((point) => ({
        ...point,
        nav: toNumber(point.nav) ?? 0,
      })),
    });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
