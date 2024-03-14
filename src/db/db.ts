
import { drizzle } from "drizzle-orm/mysql2";
import { Pool } from "pg";
import dotenv from "dotenv";
import * as schema from './schema/schema';
import { users } from "./schema/schema";
import mysql from "mysql2/promise";
dotenv.config();

const config = {
    host:'62.72.58.176',
    database:'report',
    port:3306,
    user:'jeremys',
    password: 'report_ps',


}
const  createConnectionWithReconnection=async()=> {
    try {
        const connection = await mysql.createConnection(config);

        // Listen for connection errors and attempt to reconnect
        connection.on('error', async (error) => {
            console.error('Connection error:', error);
            console.log('Attempting to reconnect...');
            await createConnectionWithReconnection();
        });

        return drizzle(connection);
    } catch (error) {
        console.error('Failed to connect:', error);
        console.log('Retrying connection...');
        await createConnectionWithReconnection();
    }
}

// Use the connection for database operations

export const client = await mysql.createConnection(config);
export const db = await createConnectionWithReconnection();

