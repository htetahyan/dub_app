import type { Config } from "drizzle-kit";
export default {
    schema: "./src/db/schema/schema.ts",
    out: "./src/db/migrations",
    driver:"mysql2",
    dbCredentials: {
      database:'report',
        host:'62.72.58.176',
        port:3306,
        user:'jeremys',
        password: 'report_ps',

    }
} satisfies Config;