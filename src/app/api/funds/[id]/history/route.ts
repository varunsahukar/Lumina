import { NextRequest, NextResponse } from "next/server";
import { backendErrorResponse, backendFetch, toNumber } from "@/lib/backend-api";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "30";
    const history = await backendFetch<any[]>(
      `/funds/${encodeURIComponent(params.id)}/history?days=${encodeURIComponent(days)}`
    );

    return NextResponse.json({
      success: true,
      source: "backend",
      data: history.map((point) => ({
        ...point,
        nav: toNumber(point.nav) ?? 0,
      })),
    });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
