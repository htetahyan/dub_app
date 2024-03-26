import type { Config } from "drizzle-kit";
export default {
    schema: "./src/db/schema/schema.ts",
    out: "./src/db/migrations",
    driver:"mysql2",

 
    dbCredentials: {
     uri: process.env.DB_STRING!,
    
    }
} satisfies Config;