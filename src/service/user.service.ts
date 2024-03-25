import {db} from "~/db/db";

import { NewUser, sessions, users} from "~/db/schema/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";



export const findExistORCreateUser = async (email: string,name: string,picture:string) => {
try {
    const user=await db?.select().from(users).where(eq(users.email, email))
    if (user!.length > 0) {
        return user![0]
    } else {
        const newUser:NewUser={
            email,
            name,
photo: picture
        }
        const result =await db?.insert(users).values(newUser) as unknown as InsertResult

        const user=await db?.select().from(users).where(eq(users.id, result.ResultSetHeader.insertId))
        console.log(result)
        console.log(user)
        return user?[0]:null
    }
}catch (e:any) {
    throw new Error("Failed to create user"+e.message)
}

}
export const createSession = async (id: number,agent: string) => {
try {
    return await db?.insert(sessions).values({user_id: id , created_at: new Date(),agent})
}catch (e) {
    throw new Error("Failed to create session")
}
}
export const logout =  async () => {
try {
    const res = await fetch('/api/logout', {method: 'POST'});
}catch (e) {
    throw new Error("Failed to (Auth)")
}
}
export const deleteSession = async (id: number) => {

try {
    return await db?.delete(sessions).where(eq(sessions.user_id, id))
}catch (e) {
    throw new Error("Failed to delete session")
}}

interface InsertResult {

    ResultSetHeader :{
    fieldCount: number,
        affectedRows: number,
        insertId: number,
        info: string,
        serverStatus: number,
        warningStatus: number,
        changedRows: number
},
}