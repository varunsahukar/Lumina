import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/backend-api";
import { getActiveUserId } from "@/lib/session-user";

type OrderType = "BUY" | "SIP";

interface RawQueryClient {
  $queryRawUnsafe<T = unknown>(query: string, ...values: unknown[]): Promise<T>;
  $executeRawUnsafe(query: string, ...values: unknown[]): Promise<number>;
}

interface RawPrismaClient extends RawQueryClient {
  $transaction<T>(fn: (tx: RawQueryClient) => Promise<T>): Promise<T>;
}

interface FundProjection {
  nameExpression: string;
  categoryExpression: string;
  amcExpression: string;
  schemeCodeExpression: string;
  activeFilter: string;
}

const AUTO_PORTFOLIO_ID = "__auto__";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const userId = await getActiveUserId();

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const db = prisma as unknown as RawPrismaClient;
    const { searchParams } = new URL(request.url);
    const includeFunds = searchParams.get("includeFunds") === "true";
    const projection = await getFundProjection(db);

    const [portfolios, recentTransactions, funds] = await Promise.all([
      getPortfolioSummaries(db, userId, projection),
      getRecentTransactions(db, userId, projection),
      includeFunds ? getFundOptions(db, projection) : Promise.resolve([]),
    ]);

    return NextResponse.json({
      success: true,
      source: "database",
      data: {
        portfolios,
        recentTransactions,
        funds,
      },
    });
  } catch (error) {
    console.error("Investment snapshot error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to load investment console data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const userId = await getActiveUserId();

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const fundId = String(body.fundId || "");
  const portfolioId = typeof body.portfolioId === "string" ? body.portfolioId : "";
  const amount = Number(body.amount);
  const type = parseOrderType(body.type);

  if (!fundId) {
    return NextResponse.json(
      { success: false, error: "Fund is required" },
      { status: 400 }
    );
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { success: false, error: "Amount must be greater than zero" },
      { status: 400 }
    );
  }

  try {
    const db = prisma as unknown as RawPrismaClient;
    const projection = await getFundProjection(db);

    const investment = await db.$transaction(async (tx) => {
      const fund = await getFundById(tx, fundId, projection);

      if (!fund) {
        throw new InvestmentError("Fund not found", 404);
      }

      const nav = toNumber(fund.nav) ?? 0;

      if (nav <= 0) {
        throw new InvestmentError("Fund NAV is unavailable", 400);
      }

      const portfolio = await getOrCreatePortfolio(tx, userId, portfolioId);
      const units = Number((amount / nav).toFixed(4));
      const now = new Date();
      const transactionId = randomUUID();

      await tx.$executeRawUnsafe(
        `
          INSERT INTO "Transaction"
            ("id", "userId", "fundId", "type", "amount", "units", "nav", "date", "status", "createdAt")
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, 'COMPLETED', $9)
        `,
        transactionId,
        userId,
        fund.id,
        type,
        amount,
        units,
        nav,
        now,
        now
      );

      const holding = await upsertHolding(tx, {
        portfolioId: portfolio.id,
        fundId: fund.id,
        amount,
        units,
        nav,
        now,
      });

      return {
        transaction: {
          id: transactionId,
          type,
          amount,
          units,
          nav,
          status: "COMPLETED",
          date: now.toISOString(),
        },
        portfolio,
        holding,
        fund: {
          id: fund.id,
          schemeCode: fund.schemeCode,
          schemeName: fund.schemeName,
          name: fund.schemeName,
          category: fund.category,
          nav,
        },
      };
    });

    return NextResponse.json({
      success: true,
      source: "database",
      data: investment,
    });
  } catch (error) {
    if (error instanceof InvestmentError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }

    console.error("Investment creation error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to add investment" },
      { status: 500 }
    );
  }
}

function parseOrderType(value: unknown): OrderType {
  return value === "SIP" ? "SIP" : "BUY";
}

async function getFundProjection(db: RawQueryClient): Promise<FundProjection> {
  const rows = await db.$queryRawUnsafe<Array<{ column_name: string }>>(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = 'Fund'
    `
  );

  const columns = new Set(rows.map((row) => row.column_name));
  const nameColumn = columns.has("name")
    ? "name"
    : columns.has("schemeName")
      ? "schemeName"
      : null;

  if (!nameColumn || !columns.has("nav")) {
    throw new Error("Fund table is missing required columns");
  }

  return {
    nameExpression: `"${nameColumn}"`,
    categoryExpression: columns.has("category") ? `"category"` : "''",
    amcExpression: columns.has("amcName") ? `"amcName"` : "''",
    schemeCodeExpression: columns.has("schemeCode") ? `"schemeCode"` : `"id"`,
    activeFilter: columns.has("isActive") ? `AND "isActive" = true` : "",
  };
}

async function getFundById(
  db: RawQueryClient,
  fundId: string,
  projection: FundProjection
) {
  const rows = await db.$queryRawUnsafe<
    Array<{
      id: string;
      schemeCode: string;
      schemeName: string;
      category: string;
      amcName: string;
      nav: unknown;
    }>
  >(
    `
      SELECT
        "id",
        ${projection.schemeCodeExpression} AS "schemeCode",
        ${projection.nameExpression} AS "schemeName",
        ${projection.categoryExpression} AS "category",
        ${projection.amcExpression} AS "amcName",
        "nav"
      FROM "Fund"
      WHERE "id" = $1
      ${projection.activeFilter}
      LIMIT 1
    `,
    fundId
  );

  return rows[0] ?? null;
}

async function getFundOptions(db: RawQueryClient, projection: FundProjection) {
  const rows = await db.$queryRawUnsafe<
    Array<{
      id: string;
      schemeCode: string;
      schemeName: string;
      category: string;
      amcName: string;
      nav: unknown;
    }>
  >(
    `
      SELECT
        "id",
        ${projection.schemeCodeExpression} AS "schemeCode",
        ${projection.nameExpression} AS "schemeName",
        ${projection.categoryExpression} AS "category",
        ${projection.amcExpression} AS "amcName",
        "nav"
      FROM "Fund"
      WHERE "nav" > 0
      ${projection.activeFilter}
      ORDER BY "updatedAt" DESC NULLS LAST, "createdAt" DESC
      LIMIT 16
    `
  );

  return rows.map((fund) => ({
    id: fund.id,
    schemeCode: fund.schemeCode,
    schemeName: fund.schemeName,
    name: fund.schemeName,
    category: fund.category,
    amcName: fund.amcName,
    nav: toNumber(fund.nav) ?? 0,
  }));
}

async function getOrCreatePortfolio(
  db: RawQueryClient,
  userId: string,
  requestedPortfolioId?: string
) {
  const normalizedPortfolioId =
    requestedPortfolioId && requestedPortfolioId !== AUTO_PORTFOLIO_ID
      ? requestedPortfolioId
      : "";

  if (normalizedPortfolioId) {
    const rows = await db.$queryRawUnsafe<Array<{ id: string; name: string }>>(
      `
        SELECT "id", "name"
        FROM "Portfolio"
        WHERE "id" = $1
          AND "userId" = $2
        LIMIT 1
      `,
      normalizedPortfolioId,
      userId
    );

    if (!rows[0]) {
      throw new InvestmentError("Portfolio not found", 404);
    }

    return rows[0];
  }

  const existing = await db.$queryRawUnsafe<Array<{ id: string; name: string }>>(
    `
      SELECT "id", "name"
      FROM "Portfolio"
      WHERE "userId" = $1
      ORDER BY "createdAt" ASC
      LIMIT 1
    `,
    userId
  );

  if (existing[0]) {
    return existing[0];
  }

  const id = randomUUID();
  const now = new Date();

  const created = await db.$queryRawUnsafe<Array<{ id: string; name: string }>>(
    `
      INSERT INTO "Portfolio"
        ("id", "userId", "name", "createdAt", "updatedAt")
      VALUES
        ($1, $2, 'Core Portfolio', $3, $4)
      RETURNING "id", "name"
    `,
    id,
    userId,
    now,
    now
  );

  return created[0];
}

async function upsertHolding(
  db: RawQueryClient,
  params: {
    portfolioId: string;
    fundId: string;
    amount: number;
    units: number;
    nav: number;
    now: Date;
  }
) {
  const rows = await db.$queryRawUnsafe<
    Array<{
      id: string;
      units: unknown;
      investedAmount: unknown;
    }>
  >(
    `
      SELECT "id", "units", "investedAmount"
      FROM "Holding"
      WHERE "portfolioId" = $1
        AND "fundId" = $2
      ORDER BY "createdAt" ASC
      LIMIT 1
      FOR UPDATE
    `,
    params.portfolioId,
    params.fundId
  );

  const existing = rows[0];

  if (existing) {
    const oldUnits = toNumber(existing.units) ?? 0;
    const oldInvested = toNumber(existing.investedAmount) ?? 0;
    const newUnits = Number((oldUnits + params.units).toFixed(4));
    const newInvested = Number((oldInvested + params.amount).toFixed(2));
    const avgNav = Number((newInvested / newUnits).toFixed(4));

    await db.$executeRawUnsafe(
      `
        UPDATE "Holding"
        SET "units" = $1,
            "investedAmount" = $2,
            "avgNav" = $3,
            "updatedAt" = $4
        WHERE "id" = $5
      `,
      newUnits,
      newInvested,
      avgNav,
      params.now,
      existing.id
    );

    return {
      id: existing.id,
      units: newUnits,
      investedAmount: newInvested,
      avgNav,
    };
  }

  const id = randomUUID();

  await db.$executeRawUnsafe(
    `
      INSERT INTO "Holding"
        ("id", "portfolioId", "fundId", "units", "avgNav", "investedAmount", "purchaseDate", "createdAt", "updatedAt")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    id,
    params.portfolioId,
    params.fundId,
    params.units,
    params.nav,
    params.amount,
    params.now,
    params.now,
    params.now
  );

  return {
    id,
    units: params.units,
    investedAmount: params.amount,
    avgNav: params.nav,
  };
}

async function getPortfolioSummaries(
  db: RawQueryClient,
  userId: string,
  projection: FundProjection
) {
  const portfolios = await db.$queryRawUnsafe<Array<{ id: string; name: string }>>(
    `
      SELECT "id", "name"
      FROM "Portfolio"
      WHERE "userId" = $1
      ORDER BY "createdAt" ASC
    `,
    userId
  );

  const holdings = await db.$queryRawUnsafe<
    Array<{
      id: string;
      portfolioId: string;
      fundId: string;
      units: unknown;
      avgNav: unknown;
      investedAmount: unknown;
      nav: unknown;
      schemeName: string;
      category: string;
    }>
  >(
    `
      SELECT
        h."id",
        h."portfolioId",
        h."fundId",
        h."units",
        h."avgNav",
        h."investedAmount",
        f."nav",
        ${projection.nameExpression} AS "schemeName",
        ${projection.categoryExpression} AS "category"
      FROM "Holding" h
      INNER JOIN "Portfolio" p ON p."id" = h."portfolioId"
      INNER JOIN "Fund" f ON f."id" = h."fundId"
      WHERE p."userId" = $1
      ORDER BY h."updatedAt" DESC
    `,
    userId
  );

  return portfolios.map((portfolio) => {
    const portfolioHoldings = holdings
      .filter((holding) => holding.portfolioId === portfolio.id)
      .map((holding) => {
        const units = toNumber(holding.units) ?? 0;
        const avgNav = toNumber(holding.avgNav) ?? 0;
        const invested = toNumber(holding.investedAmount) ?? 0;
        const nav = toNumber(holding.nav) ?? 0;
        const value = units * nav;

        return {
          id: holding.id,
          fundId: holding.fundId,
          schemeName: holding.schemeName,
          name: holding.schemeName,
          category: holding.category,
          units,
          avgNav,
          nav,
          invested,
          value,
          returns: invested > 0 ? (value - invested) / invested : 0,
        };
      });

    const invested = portfolioHoldings.reduce((sum, holding) => sum + holding.invested, 0);
    const value = portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0);

    return {
      id: portfolio.id,
      name: portfolio.name,
      invested,
      value,
      gain: value - invested,
      returns: invested > 0 ? (value - invested) / invested : 0,
      holdings: portfolioHoldings,
    };
  });
}

async function getRecentTransactions(
  db: RawQueryClient,
  userId: string,
  projection: FundProjection
) {
  const rows = await db.$queryRawUnsafe<
    Array<{
      id: string;
      fundId: string;
      type: OrderType;
      amount: unknown;
      units: unknown;
      nav: unknown;
      date: unknown;
      status: string;
      schemeName: string;
    }>
  >(
    `
      SELECT
        t."id",
        t."fundId",
        t."type",
        t."amount",
        t."units",
        t."nav",
        t."date",
        t."status",
        ${projection.nameExpression} AS "schemeName"
      FROM "Transaction" t
      INNER JOIN "Fund" f ON f."id" = t."fundId"
      WHERE t."userId" = $1
      ORDER BY t."date" DESC
      LIMIT 8
    `,
    userId
  );

  return rows.map((transaction) => ({
    id: transaction.id,
    fundId: transaction.fundId,
    type: transaction.type,
    amount: toNumber(transaction.amount) ?? 0,
    units: toNumber(transaction.units) ?? 0,
    nav: toNumber(transaction.nav) ?? 0,
    date: toIsoDate(transaction.date),
    status: transaction.status,
    schemeName: transaction.schemeName,
    name: transaction.schemeName,
  }));
}

class InvestmentError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }
}

function toIsoDate(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}
