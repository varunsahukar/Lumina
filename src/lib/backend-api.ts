import { NextResponse } from "next/server";

export const BACKEND_API_URL = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:3001/api"
).replace(/\/$/, "");

export async function backendFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${BACKEND_API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Backend request failed: ${response.status} ${response.statusText}${
        message ? ` - ${message}` : ""
      }`
    );
  }

  return response.json() as Promise<T>;
}

export function backendErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown backend error";
  return NextResponse.json({ success: false, error: message }, { status: 502 });
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
