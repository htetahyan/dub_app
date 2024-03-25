import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
import * as schema from './schema/schema';
import mysql from "mysql2/promise";

dotenv.config();

const config = {
    host: process.env.DB_HOST ,
    database: process.env.DB_NAME,
    port:  4000,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
};

// Function to initialize the database connection
export async function initDb() {
    const client = mysql.createPool(config);
    return drizzle(client);
}
export const db=await initDb().catch((e)=>{console.log(e)})
