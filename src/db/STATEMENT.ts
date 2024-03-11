import {sql} from "drizzle-orm/sql/sql";
import {users} from "~/db/schema/schema";

export const selectUserFromEmail=(email:string) => sql`select * from ${users} where ${users.email} = ${email}`;
export const selectUserFromId=(id:number) => sql`select * from ${users} where ${users.id} = ${id}`
export const createUser=(email:string,name:string) => sql`insert into ${users}(${users.email},${users.name}) values(${email},${name}})`
