import { NextResponse } from "next/server";

const configuredBackendApiUrl =
  process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL;

const defaultBackendApiUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/api";

export const BACKEND_API_URL = normalizeBackendApiUrl(
  configuredBackendApiUrl || defaultBackendApiUrl
);

function normalizeBackendApiUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);
    const pathname = url.pathname.replace(/\/+$/, "");

    if (!pathname || pathname === "/") {
      url.pathname = "/api";
      return url.toString().replace(/\/+$/, "");
    }

    return url.toString().replace(/\/+$/, "");
  } catch {
    return trimmed;
  }
}

function buildBackendUrl(path: string) {
  if (!BACKEND_API_URL) {
    throw new Error(
      "BACKEND_API_URL is not configured. Set it to the deployed Nest API URL, for example https://your-api.onrender.com/api."
    );
  }

  return `${BACKEND_API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function backendFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = buildBackendUrl(path);
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const message = await formatBackendError(response, url);
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

async function formatBackendError(response: Response, url: string) {
  const contentType = response.headers.get("content-type") || "";
  const body = await response.text();
  const bodyPreview = body
    ? body
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 240)
    : "";
  const htmlHint = contentType.includes("text/html")
    ? " The backend returned HTML, so BACKEND_API_URL likely points to the frontend or is missing the /api prefix."
    : "";

  return `Backend request failed: ${response.status} ${response.statusText} at ${url}.${htmlHint}${
    bodyPreview ? ` Response preview: ${bodyPreview}` : ""
  }`;
}

export function describeBackendError(error: unknown) {
  return error instanceof Error ? error.message : "Unknown backend error";
}

export function backendErrorResponse(error: unknown) {
  const message = describeBackendError(error);
  return NextResponse.json({ success: false, error: message }, { status: 502 });
}

export function unwrapApiData<T>(payload: T | { data?: T }): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    (payload as { data?: T }).data !== undefined
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeFund(fund: any) {
  const schemeName = fund.schemeName || fund.name || "";

  return {
    ...fund,
    schemeName,
    name: fund.name || schemeName,
    nav: toNumber(fund.nav) ?? 0,
    prevNav: toNumber(fund.prevNav),
    changePercent: toNumber(fund.changePercent),
    aum: toNumber(fund.aum),
    expenseRatio: toNumber(fund.expenseRatio),
    minInvestment: toNumber(fund.minInvestment),
    sharpeRatio: toNumber(fund.sharpeRatio),
    alpha: toNumber(fund.alpha),
    beta: toNumber(fund.beta),
    stdDeviation: toNumber(fund.stdDeviation),
    returns1y: toNumber(fund.returns1y),
    returns3y: toNumber(fund.returns3y),
    returns5y: toNumber(fund.returns5y),
    returns10y: toNumber(fund.returns10y),
  };
}

export function normalizeFunds(funds: any[]) {
  return funds.map(normalizeFund);
}
