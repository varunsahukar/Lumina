import { PrismaClient } from "../src/generated/prisma/client";
import axios from "axios";
import { subDays, format } from "date-fns";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/luminavest";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

// Helper to generate a random float between min and max
function randomFloat(min: number, max: number, decimals: number = 4) {
  const rand = Math.random() * (max - min) + min;
  return parseFloat(rand.toFixed(decimals));
}

// Curated list of popular AMC keywords we want to prioritize
const POPULAR_AMCS = [
  "SBI Mutual Fund",
  "HDFC Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "Axis Mutual Fund",
  "Nippon India Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Kotak Mahindra Mutual Fund",
  "UTI Mutual Fund",
  "Aditya Birla Sun Life Mutual Fund",
  "Parag Parikh Mutual Fund",
  "DSP Mutual Fund",
  "Quant Mutual Fund",
];

// Curated list of specific high-profile funds to guarantee in seed data
const TARGET_FUNDS = [
  "Parag Parikh Flexi Cap Fund",
  "SBI Bluechip Fund",
  "HDFC Mid-Cap Opportunities Fund",
  "ICICI Prudential Bluechip Fund",
  "Axis Small Cap Fund",
  "Nippon India Small Cap Fund",
  "Quant Active Fund",
  "Mirae Asset Large Cap Fund",
  "HDFC Index Fund-Nifty 50 Plan",
  "SBI Liquid Fund",
];

interface ParsedFund {
  schemeCode: string;
  schemeName: string;
  amcName: string;
  category: string;
  subCategory: string;
  nav: number;
  dateStr: string;
}

async function fetchAndParseAMFIData(): Promise<ParsedFund[]> {
  console.log("Fetching live data from AMFI...");
  const response = await axios.get("https://www.amfiindia.com/spages/NAVAll.txt");
  const text: string = response.data;
  
  const lines = text.split("\n");
  const funds: ParsedFund[] = [];
  let currentAmc = "";
  let currentCategory = "Other";
  let currentSubCategory = "General";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Header lines
    if (line.startsWith("Scheme Code")) continue;

    // Detect Categories
    if (line.startsWith("Open Ended Schemes") || line.startsWith("Close Ended Schemes") || line.startsWith("Interval Schemes")) {
      // Example line: Open Ended Schemes ( Equity Scheme - Large Cap Fund )
      const categoryMatch = line.match(/\(([^)]+)\)/);
      if (categoryMatch && categoryMatch[1]) {
        const parts = categoryMatch[1].split("-");
        currentCategory = parts[0]?.trim() || "Other";
        currentSubCategory = parts[1]?.trim() || "General";
      } else {
        currentCategory = line;
        currentSubCategory = "General";
      }
      continue;
    }

    // Detect AMC (usually a single line with Mutual Fund name)
    if (!line.includes(";") && !line.includes("-")) {
      if (line.endsWith("Mutual Fund")) {
        currentAmc = line;
      }
      continue;
    }

    // Parse actual fund row
    const parts = line.split(";");
    if (parts.length >= 6) {
      const schemeCode = parts[0]?.trim();
      const schemeName = parts[3]?.trim();
      const navStr = parts[4]?.trim();
      const dateStr = parts[5]?.trim();

      if (schemeCode && schemeName && navStr && !isNaN(parseFloat(navStr))) {
        funds.push({
          schemeCode,
          schemeName,
          amcName: currentAmc || "Independent AMC",
          category: currentCategory,
          subCategory: currentSubCategory,
          nav: parseFloat(navStr),
          dateStr,
        });
      }
    }
  }

  return funds;
}

async function main() {
  try {
    console.log("Starting Seeding Process...");
    const allFunds = await fetchAndParseAMFIData();
    console.log(`Successfully parsed ${allFunds.length} funds from AMFI.`);

    // Filter funds to keep a manageable but rich set of ~50-80 highly relevant funds
    const curatedFunds: ParsedFund[] = [];
    const seenSchemeCodes = new Set<string>();

    for (const fund of allFunds) {
      // Remove duplicate codes
      if (seenSchemeCodes.has(fund.schemeCode)) continue;

      // Check if it is a target high-profile fund
      const isTarget = TARGET_FUNDS.some(tf => fund.schemeName.toLowerCase().includes(tf.toLowerCase()));
      // Check if it belongs to a popular AMC
      const isPopularAmc = POPULAR_AMCS.some(amc => fund.amcName.toLowerCase().includes(amc.toLowerCase()));
      // Check if it is direct growth plan (highly preferred in retail)
      const isDirectGrowth = fund.schemeName.toLowerCase().includes("direct") && fund.schemeName.toLowerCase().includes("growth");

      if (isTarget || (isPopularAmc && isDirectGrowth)) {
        curatedFunds.push(fund);
        seenSchemeCodes.add(fund.schemeCode);
      }
    }

    // Limit to top 60 funds to keep database lightweight but highly functional
    const selectedFunds = curatedFunds.slice(0, 65);
    console.log(`Selected ${selectedFunds.length} curated funds for seeding.`);

    // Clear existing data (in order of relations)
    console.log("Cleaning database...");
    await prisma.navHistory.deleteMany({});
    await prisma.holding.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.watchlist.deleteMany({});
    await prisma.fund.deleteMany({});
    console.log("Database cleared.");

    const benchmarkMap: Record<string, string> = {
      "Equity Scheme": "Nifty 50 TRI",
      "Debt Scheme": "Nifty Composite Debt Index",
      "Hybrid Scheme": "Nifty 50 Hybrid Composite Index",
      "Liquid Scheme": "Nifty 1D Rate Index",
      "Solution Oriented Scheme": "Nifty 50 TRI",
    };

    const managerNames = [
      "Sankaran Naren",
      "Neelesh Surana",
      "Rajeev Thakkar",
      "R. Srinivasan",
      "Anupam Tiwari",
      "Niket Shah",
      "Vashisth Prasad",
      "Sandeep Tandon",
    ];

    for (let idx = 0; idx < selectedFunds.length; idx++) {
      const f = selectedFunds[idx];
      const categoryType = f.category;

      // Dynamic metrics generation based on category for realistic profiles
      let returns1y = randomFloat(8.5, 45.0, 2);
      let returns3y = randomFloat(10.0, 35.0, 2);
      let returns5y = randomFloat(12.0, 28.0, 2);
      let returns10y = randomFloat(11.0, 22.0, 2);
      let sharpeRatio = randomFloat(0.8, 2.5, 2);
      let beta = randomFloat(0.75, 1.25, 2);
      let stdDeviation = randomFloat(10.0, 22.0, 2); // standard dev in %
      let alpha = randomFloat(-1.5, 6.0, 2);
      let expenseRatio = randomFloat(0.15, 2.1, 2) / 100; // between 0.15% and 2.1%
      const aum = randomFloat(500, 48000, 2); // AUM in Crores

      if (categoryType.includes("Debt")) {
        returns1y = randomFloat(5.5, 9.5, 2);
        returns3y = randomFloat(6.0, 8.5, 2);
        returns5y = randomFloat(6.5, 9.0, 2);
        returns10y = randomFloat(7.0, 8.8, 2);
        sharpeRatio = randomFloat(1.2, 3.2, 2);
        beta = randomFloat(0.1, 0.4, 2);
        stdDeviation = randomFloat(1.5, 4.5, 2);
        alpha = randomFloat(0.2, 1.8, 2);
        expenseRatio = randomFloat(0.08, 0.95, 2) / 100;
      } else if (categoryType.includes("Liquid")) {
        returns1y = randomFloat(6.2, 7.5, 2);
        returns3y = randomFloat(5.5, 6.8, 2);
        returns5y = randomFloat(5.2, 6.5, 2);
        returns10y = randomFloat(5.8, 6.8, 2);
        sharpeRatio = randomFloat(2.0, 4.5, 2);
        beta = randomFloat(0.01, 0.1, 2);
        stdDeviation = randomFloat(0.2, 0.8, 2);
        alpha = randomFloat(0.1, 0.9, 2);
        expenseRatio = randomFloat(0.05, 0.35, 2) / 100;
      } else if (categoryType.includes("Hybrid")) {
        returns1y = randomFloat(7.5, 25.0, 2);
        returns3y = randomFloat(9.0, 20.0, 2);
        returns5y = randomFloat(10.0, 18.0, 2);
        returns10y = randomFloat(9.5, 16.0, 2);
        sharpeRatio = randomFloat(0.9, 2.0, 2);
        beta = randomFloat(0.55, 0.85, 2);
        stdDeviation = randomFloat(6.5, 12.0, 2);
        alpha = randomFloat(-0.5, 3.5, 2);
        expenseRatio = randomFloat(0.35, 1.8, 2) / 100;
      }

      const launchDate = subDays(new Date(), Math.round(randomFloat(2000, 6000, 0)));
      const managerName = managerNames[idx % managerNames.length];
      const benchmarkIndex = benchmarkMap[categoryType] || "Nifty 50 TRI";

      console.log(`Seeding fund [${idx + 1}/${selectedFunds.length}]: ${f.schemeName}`);

      const createdFund = await prisma.fund.create({
        data: {
          schemeCode: f.schemeCode,
          schemeName: f.schemeName,
          amcName: f.amcName,
          category: f.category,
          subCategory: f.subCategory,
          nav: f.nav,
          aum: aum,
          expenseRatio: expenseRatio,
          sharpeRatio: sharpeRatio,
          alpha: alpha,
          beta: beta,
          stdDeviation: stdDeviation,
          returns1y: returns1y,
          returns3y: returns3y,
          returns5y: returns5y,
          returns10y: returns10y,
          managerName: managerName,
          launchDate: launchDate,
          benchmarkIndex: benchmarkIndex,
        },
      });

      // Generate realistic daily historical NAV records for past 90 days for plotting charts
      const historyData = [];
      let lastNav = f.nav;
      
      // Let's create history going back 90 days
      for (let day = 90; day >= 0; day--) {
        const historyDate = subDays(new Date(), day);
        // Exclude weekends for mutual funds trading days
        const dayOfWeek = historyDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;

        // Generate minor random walk for historical NAV
        let percentChange = randomFloat(-0.018, 0.02, 5); // between -1.8% and +2%
        
        // Add a small upward trend depending on general returns
        const categoryTrend = categoryType.includes("Debt") || categoryType.includes("Liquid") ? 0.0003 : 0.0007;
        percentChange += categoryTrend;

        const dayNav = lastNav / (1 + percentChange);
        lastNav = dayNav;

        historyData.push({
          fundId: createdFund.id,
          nav: parseFloat(dayNav.toFixed(4)),
          date: historyDate,
        });
      }

      // Bulk create history for this fund
      if (historyData.length > 0) {
        await prisma.navHistory.createMany({
          data: historyData,
          skipDuplicates: true,
        });
      }
    }

    console.log("Seeding complete! Database is fully populated with rich live-parsed funds & historical logs.");
  } catch (error) {
    console.error("Error in seeding process:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
