import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma 7 moves datasource URL configuration out of schema.prisma.
    // Keep env override while providing a local SQLite fallback.
    url: process.env.DATABASE_URL ?? "file:./db/dev.db",
  },
});
