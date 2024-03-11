
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";
import * as schema from './schema/schema';
import { users } from "./schema/schema";

dotenv.config();

export const client = new Pool({
    connectionString: process.env.NEON_DB,
});

export const db = drizzle(client,{schema});

