import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

// Build the database driver pool with robust fallback for build-time safety
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/luminavest";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
