// src/scripts/seed-funds.ts
/**
 * Seed script for initial Fund data.
 * Uses Prisma client directly. Run with:
 *   npx ts-node ./src/scripts/seed-funds.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

enum FundMarket {
  INDIA = 'INDIA',
  USA = 'USA',
  INTERNATIONAL = 'INTERNATIONAL',
}

dotenv.config();

const prisma = new PrismaClient();

/**
 * Example static data – a few Indian and US funds.
 * In production you would call the sync services instead.
 */
const seedData = [
  // Indian funds (sample scheme codes from the spec)
  {
    schemeCode: '119598',
    name: 'Sample Indian Fund A',
    market: FundMarket.INDIA,
    currency: 'INR',
    nav: 100.0,
    navDate: new Date(),
  },
  {
    schemeCode: '120503',
    name: 'Sample Indian Fund B',
    market: FundMarket.INDIA,
    currency: 'INR',
    nav: 85.5,
    navDate: new Date(),
  },
  // US funds (using ticker symbols as schemeCode)
  {
    schemeCode: 'VFIAX',
    name: 'Vanguard 500 Index',
    market: FundMarket.USA,
    currency: 'USD',
    nav: 528.45,
    navDate: new Date('2025-05-27'),
  },
  {
    schemeCode: 'FXAIX',
    name: 'Fidelity 500 Index',
    market: FundMarket.USA,
    currency: 'USD',
    nav: 530.12,
    navDate: new Date('2025-05-27'),
  },
];

async function main() {
  console.log('🔽 Starting fund seeding...');
  for (const fund of seedData) {
    await prisma.fund.upsert({
      where: { schemeCode: fund.schemeCode },
      create: {
        schemeCode: fund.schemeCode,
        name: fund.name,
        market: fund.market,
        currency: fund.currency,
        nav: fund.nav,
        navDate: fund.navDate,
        // optional fields left as defaults
      },
      update: {
        nav: fund.nav,
        navDate: fund.navDate,
        name: fund.name,
        market: fund.market,
        currency: fund.currency,
      },
    });
    console.log(`✅ Upserted ${fund.schemeCode} – ${fund.name}`);
  }
  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
