import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
const env = process.env;

const adapter = new PrismaBetterSqlite3({
  url: process.env?.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env?.NODE_ENV === "development"
        ? ["error", "warn", "query", "info"]
        : ["info"],
    adapter,
  });

if (env?.NODE_ENV == "production") globalForPrisma.prisma = prisma;
