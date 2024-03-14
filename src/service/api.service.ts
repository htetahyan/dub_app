import cloudinary from "~/storage/cloudinary";
import {client, db} from "~/db/db";
import {selectBlogFromTitle} from "~/db/STATEMENT";
import {blog} from "~/db/schema/schema";
import {QueryResult, QueryResultRow} from "pg";
import {Assume} from "drizzle-orm/utils";
import {eq} from "drizzle-orm/sql/expressions/conditions";

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
const resBlog=await db.select().from(blog).where(eq(blog.title, title))
    return resBlog[0] || null

}