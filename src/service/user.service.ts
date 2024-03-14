import {db} from "~/db/db";

import { NewUser, sessions, users} from "~/db/schema/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";


export const findExistORCreateUser = async (email: string,name: string) => {
try {
    const user=await db.select().from(users).where(eq(users.email, email))
    if (user.length > 0) {
        return user[0]
    } else {
        const newUser:NewUser={
            email,
            name,

        }
        const result=await db.insert(users).values(newUser)
        return result[0]
    }
}catch (e) {
    throw new Error("Failed to create user")
}

}
export const createSession = async (id: number,agent: string) => {
try {
    return await db.insert(sessions).values({user_id: id , created_at: new Date(),agent})
}catch (e) {
    throw new Error("Failed to create session")
}
}