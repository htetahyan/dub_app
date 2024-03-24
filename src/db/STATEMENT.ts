import {sql} from "drizzle-orm/sql/sql";
import {blog, users} from "~/db/schema/schema";

export const selectUserFromEmail=(email:string) => sql`select * from ${users} where ${users.email} = ${email}`;
export const selectUserFromId=(id:number) => sql`select * from ${users} where ${users.id} = ${id}`
export const createUser=(email:string,name:string) => sql`insert into ${users}(${users.email},${users.name}) values(${email},${name}})`
export const selectBlogFromTitle=(title:string) => sql`select * from ${blog} where ${blog.title} = ${title}`
export const getDateAndSlugFromBlog=() => sql`select ${blog.created_at},${blog.slug} from ${blog}`
export const createBlog=(title:string,content:string,author_id:number) => sql`insert into ${blog}(${blog.title},${blog.content},${blog.author_id}) values(${title},${content},${author_id})`