import type { Config } from "drizzle-kit";
export default {
    schema: "./src/db/schema/schema.ts",
    out: "./src/db/migrations",
    driver:"pg",
    dbCredentials: {
        connectionString: process.env.NEON_DB!,
    }
} satisfies Config;
