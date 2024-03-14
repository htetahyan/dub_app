
import { drizzle } from "drizzle-orm/mysql2";
import { Pool } from "pg";
import dotenv from "dotenv";
import * as schema from './schema/schema';
import { users } from "./schema/schema";
import mysql from "mysql2/promise";
dotenv.config();

export const client = await mysql.createConnection({
    host:'62.72.58.176',
    database:'report',
    port:3306,
    user:'jeremys',
    password: 'report_ps',
    pool: {
        min: 2,
        max: 10
    },


});

export const db = drizzle(client);

