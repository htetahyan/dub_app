import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
import * as schema from './schema/schema';
import mysql from "mysql2/promise";

dotenv.config();

const config = {
    host: process.env.DB_HOST || '62.72.58.176',
    database: process.env.DB_NAME || 'report',
    port:  3306,
    user: process.env.DB_USER || 'jeremys',
    password: process.env.DB_PASSWORD || 'report_ps',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    idleTimeout: 30000,
    keepAliveInitialDelay: 0
};

// Function to initialize the database connection
export async function initDb() {
    const client = await mysql.createConnection(config);
    return drizzle(client);
}
export const db=await initDb().catch((e)=>{console.log(e)})
