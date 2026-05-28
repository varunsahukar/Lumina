import { NextRequest, NextResponse } from "next/server";
import {
  backendErrorResponse,
  backendFetch,
  normalizeFund,
} from "@/lib/backend-api";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fund = await backendFetch<any>(
      `/funds/${encodeURIComponent(params.id)}`
    );

    return NextResponse.json({
      success: true,
      source: "backend",
      data: normalizeFund(fund),
    });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
