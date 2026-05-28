const { Client } = require('pg');

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    const fundMarketType = await client.query(
      "SELECT 1 FROM pg_type WHERE typname = 'FundMarket'",
    );

    if (fundMarketType.rowCount === 0) {
      await client.query(
        'CREATE TYPE "FundMarket" AS ENUM (\'INDIA\', \'USA\', \'INTERNATIONAL\')',
      );
    }

    await client.query('ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "name" TEXT');
    await client.query('UPDATE "Fund" SET "name" = "schemeName" WHERE "name" IS NULL');
    await client.query('ALTER TABLE "Fund" ALTER COLUMN "name" SET NOT NULL');
    await client.query(
      'ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "market" "FundMarket" NOT NULL DEFAULT \'INDIA\'',
    );
    await client.query(
      'ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT \'INR\'',
    );
    await client.query('ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "navDate" TIMESTAMP');
    await client.query('ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "prevNav" DOUBLE PRECISION');
    await client.query(
      'ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "changePercent" DOUBLE PRECISION',
    );
    await client.query(
      'ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "minInvestment" DOUBLE PRECISION',
    );
    await client.query(
      'ALTER TABLE "Fund" ADD COLUMN IF NOT EXISTS "lastSyncedAt" TIMESTAMP',
    );

    console.log('Fund runtime columns are present.');
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
