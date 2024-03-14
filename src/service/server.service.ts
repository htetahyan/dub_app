
import {client, db} from "~/db/db";
import {blog} from "~/db/schema/schema";

import {eq} from "drizzle-orm/sql/expressions/conditions";
import {asc} from "drizzle-orm";

export const postFormData = async (url: string, formData: FormData) => {
    'use server'
    try {

        formData.append('cover_img', url);
        // Assuming your API is hosted on the same domain as your Next.js app
        const apiUrl = `/api/admin/blog`;
        const response = await fetch(apiUrl, {
            method: 'POST',

            body: 's',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        // Handle the error appropriately, e.g., return a default value or rethrow the error
    }
};

export const getBlogByTitle = async (title: string) => {
    'use server'
const resBlog=await db!.select().from(blog).where(eq(blog.title, title))
    return resBlog[0] || null

}
export const getBlogs = async (limit: number, offset: number) => {
'use server'
    const resBlog=await db!.select().from(blog).limit(limit).offset(offset).orderBy(asc(blog.id)).finally(()=>client.end())
    if(!resBlog) return client.connect() ;
    return resBlog
}

