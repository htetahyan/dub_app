import 'server-only'
/*
import { db} from "~/db/db";

import {and, eq} from "drizzle-orm/sql/expressions/conditions";
import {asc} from "drizzle-orm";
import CacheHandler from "../../cache-handler.mjs";
import {cache} from "react";
import {extractUserIdFromToken} from "~/service/jwt.service";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import { unstable_cache} from "next/cache";


const cacheManager = new CacheHandler();


export const postFormData = async (url: string, formData: FormData) => {
    'use server'
    try {

        formData.append('cover_img', url);

        const apiUrl = `/api/admin/blog`;
        const response = await fetch(apiUrl, {
            method: 'POST',

            body: 's',
        });

        const data = await response.json();
        return data;
    } catch (error) {
throw new Error('An error occurred while fetching the data.')       // Handle the error appropriately, e.g., return a default value or rethrow the error
    }
};

export const getBlogsBySlug = async (slug: string) => {
    'use server'
const resBlog=await db?.select().from(blog).where(eq(blog.slug, slug))
    return resBlog?.[0]! || null

}
export const getBlogs = async (limit: number, offset: number) => {
'use server'
    const resBlog=await db?.select().from(blog).limit(limit).offset(offset).orderBy(asc(blog.id))

    return resBlog
}

export const fetchBlogs = cache(async (limit: number, offset: number) => {
    'use client'
    const response = await fetch(
        `/api/blogs?limit=${limit}&offset=${offset}`
        , {
        method: 'GET',
        cache: 'force-cache',
    });
    if (!response.ok) throw new Error('An error occurred while fetching the data.');
    return response.json();
});
export const revalidate = 3600 //1hr

export const getTypes = async (): Promise<TYPE[]> => {

    const key = 'types';
    let res = await cacheManager.get(key);

    if (!res) {
        try {
            const resBlog = await db?.select().from(type).orderBy(asc(type.id));


            await cacheManager.set(key, resBlog, { tags: ['types'] });
            return await getTypes()
        } catch (error) {
            throw error;
        }
    }

    // Return the cached result
    return res?.value as TYPE[];
};
export const getBlogsByTypeId = async (id: number) :Promise<BLOG[]>=> {
    'use server';
    const key = 'blog_type';
    let res = await cacheManager.get(key);
    if (!res) {
        try {
            const resBlog = await db?.select().from(blog).where(eq(blog.type_id, id)).orderBy(asc(blog.id));
            if (!resBlog) {
                return await getBlogsByTypeId(id);
            }
            await cacheManager.set(key, resBlog, { tags: ['types'] });

            return resBlog as BLOG[];
        } catch (error) {
            console.error('Error fetching types:', error);
            throw error;
        }
    }
    return res?.value as BLOG[];
}
export const isUserLiked=async (id:number)=>{
    'use server'
    const cookieStore = cookies()
    const user_id= await extractUserIdFromToken(cookieStore.get('access_token')?.value as string)
    if(!user_id) return false;
    const res=await  db?.select().from(likes).where(
        and(
            eq(likes.user_id, user_id),
            eq(likes.blog_id, id)
        )
    ) as any;

    return res.length>0
}


export const toggleLike=async (id:number,token:string)=>{
    'use server'
    const user_id= await extractUserIdFromToken(token)
    if(!user_id)  redirect('/login')
    const isLiked=await isUserLiked(id)
    if (isLiked){
         await db?.delete(likes).where(
             and(
                 eq(likes.user_id, user_id),
                 eq(likes.blog_id, id)
             )
         )
    }else {
   await db?.insert(likes).values({user_id:user_id,blog_id:id})}

}
export const getLikes=unstable_cache(async (id:number)=> {
    'use server'

    return await db?.select().from(likes).where(
        eq(likes.blog_id, id)
    ) as any
       },['likes'],{tags:['likes']}
)
export const getAuthorProfile=unstable_cache(async (id:number)=>{
    try {

        const res=await db!.select().from(users).where(eq(users.id, id))
        return res?.[0] || null
    }catch (e){
        console.log(e)
    }
},['author'],{tags:['author']})
*/

import {unstable_cache} from "next/cache";
import {extractUserIdFromToken} from "~/service/jwt.service";
import {prisma} from "~/utils/utils";
import {randomBytes} from "node:crypto";

export const getUserProfile=unstable_cache(async (token:string)=>{
    try {

        if(!token) return null
        const user_id=await extractUserIdFromToken(token)
        console.log(user_id,'profile')
        if(!user_id) return null
        const user=await prisma.user.findUnique({
            where:{
                id:user_id
            },
            select:{
                name:true,
                email:true,
                picture:true,
                id:true
                ,emailTokenSentAt:true
                ,isEmailVerified:true,
                createdAt:true

            }
        })

        return user || null
    }catch (e){
        console.log(e)
    }


},['profile'],{tags:['profile']})
// Function to generate an email verification token
export const generateEmailVerificationToken = () => {
    // generates a buffer containing 32 random bytes.
    // The 32 indicates the number of bytes to generate, and it is commonly used
    // for creating secure tokens or identifiers.
    return randomBytes(32).toString('hex');
};
export const getCachedProjects=unstable_cache(async (token) => {

    'use server'
    const userId= await extractUserIdFromToken(token)
      const projects=await prisma.dubbingProject.findMany({
          take: 3,
          skip: 0,
          
          orderBy: {
              createdAt: 'desc',
            },
            where: {
              userId:userId
            },
      })
    return projects
    },['projects'],{tags:['projects']})

    
    export const getCurrentPricing=unstable_cache(async (userId)=>{
        'use server'
        
const subscription=await prisma.subscription.findFirst({
     where:{
         userId:userId
     },select:{
         totalCredits:true
         ,credits:true,
         user:{
             select:{
                 credits:true
             }
         },
         planName:true,
         startDate:true,
         
         currentPeriodEnd:true,
         isActive:true
     }
 })
 const credits=subscription?.credits!+subscription?.user?.credits! || 0
 return {
     ...subscription,
     credits
 }
    })