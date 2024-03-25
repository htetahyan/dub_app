import {db} from "~/db/db";

import { NewUser, sessions, users} from "~/db/schema/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";



export const findExistORCreateUser = async (email: string,name: string,picture:string):Promise<NewUser> => {
try {
    const res = await db?.select().from(users).where(eq(users.email, email))
if(res!.length>0){
    return res![0]
}else{
const user: NewUser = {
    email,
    name,
    photo: picture
}
await db?.insert(users).values(user)
 return await findExistORCreateUser(email,name,picture)

}}
catch (e:any) {
    throw new Error("Failed to "+e.message)
    
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

