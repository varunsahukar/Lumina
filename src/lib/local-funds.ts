import { prisma } from "@/lib/prisma";
import { normalizeFunds } from "@/lib/backend-api";

type RawQueryClient = {
  $queryRawUnsafe<T = unknown>(query: string, ...values: unknown[]): Promise<T>;
};

interface LocalFundOptions {
  search?: string;
  market?: string;
  limit?: number;
}

export async function getLocalFunds(options: LocalFundOptions = {}) {
  const db = prisma as unknown as RawQueryClient;
  const columns = await getFundColumns(db);
  const values: unknown[] = [];
  const where = ["1 = 1"];

  if (columns.has("isActive")) {
    where.push(`"isActive" = true`);
  }

  if (options.market && columns.has("market")) {
    values.push(options.market);
    where.push(`"market"::text = $${values.length}`);
  }

  if (options.search) {
    values.push(`%${options.search}%`);
    const searchParam = `$${values.length}`;
    where.push(
      `(${columnExpression(columns, "name", columnExpression(columns, "schemeName", "''"))} ILIKE ${searchParam} OR ${columnExpression(columns, "amcName", "''")} ILIKE ${searchParam})`
    );
  }

  values.push(Math.max(1, Math.min(options.limit ?? 100, 500)));
  const limitParam = `$${values.length}`;
  const updatedOrder = columns.has("updatedAt") ? `"updatedAt" DESC NULLS LAST,` : "";
  const createdOrder = columns.has("createdAt") ? `"createdAt" DESC NULLS LAST,` : "";

  const funds = await db.$queryRawUnsafe<unknown[]>(
    `
      SELECT
        "id",
        ${columnExpression(columns, "schemeCode", `"id"`)} AS "schemeCode",
        ${columnExpression(columns, "name", columnExpression(columns, "schemeName", "''"))} AS "name",
        ${columnExpression(columns, "schemeName", columnExpression(columns, "name", "''"))} AS "schemeName",
        ${columnExpression(columns, "category", "''")} AS "category",
        ${columnExpression(columns, "subCategory", "''")} AS "subCategory",
        ${columnExpression(columns, "amcName", "''")} AS "amcName",
        ${columns.has("market") ? `"market"::text` : "'INDIA'"} AS "market",
        ${columnExpression(columns, "currency", "'INR'")} AS "currency",
        ${columnExpression(columns, "nav", "0")} AS "nav",
        ${columnExpression(columns, "navDate", "NULL")} AS "navDate",
        ${columnExpression(columns, "prevNav", "NULL")} AS "prevNav",
        ${columnExpression(columns, "changePercent", "NULL")} AS "changePercent",
        ${columnExpression(columns, "aum", "NULL")} AS "aum",
        ${columnExpression(columns, "expenseRatio", "NULL")} AS "expenseRatio",
        ${columnExpression(columns, "minInvestment", "NULL")} AS "minInvestment",
        ${columnExpression(columns, "sharpeRatio", "NULL")} AS "sharpeRatio",
        ${columnExpression(columns, "alpha", "NULL")} AS "alpha",
        ${columnExpression(columns, "beta", "NULL")} AS "beta",
        ${columnExpression(columns, "stdDeviation", "NULL")} AS "stdDeviation",
        ${columnExpression(columns, "returns1y", "NULL")} AS "returns1y",
        ${columnExpression(columns, "returns3y", "NULL")} AS "returns3y",
        ${columnExpression(columns, "returns5y", "NULL")} AS "returns5y",
        ${columnExpression(columns, "returns10y", "NULL")} AS "returns10y",
        ${columnExpression(columns, "managerName", "NULL")} AS "managerName",
        ${columnExpression(columns, "launchDate", "NULL")} AS "launchDate",
        ${columnExpression(columns, "benchmarkIndex", "NULL")} AS "benchmarkIndex",
        ${columnExpression(columns, "isActive", "true")} AS "isActive",
        ${columnExpression(columns, "lastSyncedAt", "NULL")} AS "lastSyncedAt",
        ${columnExpression(columns, "createdAt", "NULL")} AS "createdAt",
        ${columnExpression(columns, "updatedAt", "NULL")} AS "updatedAt"
      FROM "Fund"
      WHERE ${where.join(" AND ")}
      ORDER BY ${updatedOrder} ${createdOrder} ${columnExpression(columns, "name", columnExpression(columns, "schemeName", `"id"`))} ASC
      LIMIT ${limitParam}
    `,
    ...values
  );

  return normalizeFunds(funds);
}

async function getFundColumns(db: RawQueryClient) {
  const rows = await db.$queryRawUnsafe<Array<{ column_name: string }>>(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = 'Fund'
    `
  );

  return new Set(rows.map((row) => row.column_name));
}

function columnExpression(columns: Set<string>, column: string, fallback: string) {
  return columns.has(column) ? `"${column}"` : fallback;
}
