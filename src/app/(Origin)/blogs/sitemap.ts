import {MetadataRoute} from "next";
import {db} from "~/db/db";
import siteConfig from "../../../../site-config";
import {getDateAndSlugFromBlog} from "~/db/STATEMENT";
import {cache} from "react";



export default async function sitemap({
                                          id,
                                      }: {
    id: number
}): Promise<MetadataRoute.Sitemap> {
    // Google's limit is 50,000 URLs per sitemap

    const blogs = await getAllBlogs()

    return blogs?.map((blog:any) => ({
        url: `${siteConfig.url}/blogs/${blog?.slug}`,
        lastModified: new Date(blog?.created_at*1000),
    })) as MetadataRoute.Sitemap

}

const getAllBlogs= cache(async ()=>{

const blogs= await db?.execute(getDateAndSlugFromBlog()) as any
 
    return blogs?.[0]
})