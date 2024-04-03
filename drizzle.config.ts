import type { Config } from "drizzle-kit";
export default {
    schema: "./src/db/schema/schema.ts",
    out: "./src/db/migrations",
    driver:"mysql2",

 
    dbCredentials: {
        host: process.env.DB_HOST !,
        database: process.env.DB_NAME!,
        port:  process.env.DB_PORT as unknown as number,
        user: process.env.DB_USER !,
        password: process.env.DB_PASSWORD! ,
    
    }
} satisfies Config;