import {db} from "~/db/db";

import {InferSelectUser, NewUser, sessions, users} from "~/db/schema/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";


export const findExistORCreateUser = async (email: string,name: string) => {
try {
    const user=await db.query.users.findFirst({
        where: eq(users.email, email)
    })
    if (user) {
        return user
    } else {
        const newUser:NewUser={
            email,
            name,

        }
        return await db.insert(users).values(newUser).returning()
    }
}catch (e) {
    throw new Error("Failed to find user")
}

}
export const createSession = async (id: number,agent: string) => {
try {
    return await db.insert(sessions).values({user_id: id , created_at: new Date(),agent}).returning()
}catch (e) {
    throw new Error("Failed to create session")
}
}