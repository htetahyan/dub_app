import type { Config } from "drizzle-kit";
export default {
    schema: "./src/db/schema/schema.ts",
    out: "./src/db/migrations",
    driver:"mysql2",
 
    dbCredentials: {
      database:process.env.DB_NAME!,
        host:process.env.DB_HOST!,
        port:4000,
        
        user:process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
    }
} satisfies Config;