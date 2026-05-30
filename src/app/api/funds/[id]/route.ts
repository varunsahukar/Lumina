import { NextRequest, NextResponse } from "next/server";
import {
  backendErrorResponse,
  backendFetch,
  describeBackendError,
  normalizeFund,
  unwrapApiData,
} from "@/lib/backend-api";
import { getLocalFund } from "@/lib/local-funds";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let fund: any;
    let source = "backend";

    try {
      const backendPayload = await backendFetch<any>(
        `/funds/${encodeURIComponent(params.id)}`
      );
      fund = unwrapApiData(backendPayload);
    } catch (error) {
      console.warn(
        "Backend fund detail unavailable, falling back to local database:",
        describeBackendError(error)
      );
      fund = await getLocalFund(params.id);
      source = "database-fallback";
    }

    if (!fund) {
      return NextResponse.json(
        { success: false, error: "Fund not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      source,
      data: normalizeFund(fund),
    });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
