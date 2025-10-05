import { PrismaClient } from "@prisma/client";

// Add prisma to the globalThis object in development to prevent multiple instances
// during hot-reloading. This is a common pattern for Next.js and Prisma.
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export default prisma;