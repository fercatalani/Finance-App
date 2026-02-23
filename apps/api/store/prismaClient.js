// Centralized Prisma client instance
// This is the bridge DB <-> ORM for the rest of the backend.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

/**
 * Avoid creating multiple PrismaClient instances in dev (nodemon reloads).
 */
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
