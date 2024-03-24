import {MDXRemote} from 'next-mdx-remote/rsc';
import rehypeHighlight from "rehype-highlight";
import '~/app/arta.css'
import {getAuthorProfile, getBlogsBySlug} from "~/service/server.service";
import Image from "next/image";
import React, {Suspense} from "react";
import {blurUrl} from "~/utils/utils";
import BackBtn from "~/components/BackBtn";
import Like from "~/components/Like";
import {notFound} from "next/navigation";
import {BlurImage} from "~/components/BlurImage";
import {Metadata} from "next";
import MetaTag, {keywords} from "~/utils/MetaTag";

const options = {
    mdxOptions: {

        rehypePlugins: [
            [rehypeHighlight]
        ],
    }} as any
        const page=async({params}:{params:{slug:string}})=>{
const {file,image,title,author,id,created_at,techs}=await fetchData(params.slug)
            const date= new Date(created_at!*1000).toDateString()
    return (
        <div className={'w-full relative  justify-center  h-fit grid gap-2 md:p-2 lg:p-4 text-primary'}>
<BackBtn/>

            <div className={'w-full h-[60vh] relative grid justify-center rounded-md lg:rounded-2xl overflow-hidden '}>

                <BlurImage src={image!} alt={title! || ' image'}
                       objectFit={'contain'}
blurDataURL={image!}
                       fetchPriority={'low'}
                       loading={'lazy'}
                       placeholder={'blur'}
                       layout={'fill'} className={'w-full h-full justify-self-center '}/>
            </div>
            <div className={'flex items-center px-2 mt-3 w-full justify-between  '}>
                <h2 className={' text-small lg:text-body'}> {date}</h2>
           <div className={'flex items-center gap-3'}>
               <div className={'w-10 h-10 relative'}><Image src={author?.photo!} alt={'author'}
                       blurDataURL={blurUrl}
                                                                 objectFit={'cover'}
                     layout={'fill'} className={'rounded-full'}
                       loading={'lazy'} placeholder={'blur'}/>
               </div>
                <h2 className={' text-small lg:text-caption underline '}> {author?.name}</h2></div>
            </div>
          <div className={'flex  mt-4 items-center justify-between'}>
              <Suspense fallback={<div className={'loader'}/>}>
              <Like id={id} />
              </Suspense>
          </div>
            <Suspense fallback={<div className={'loader'}/>}>
                <div className="w-[95%] md:w-[90%] justify-self-center grid gap-2 flex-wrap whitespace-normal">
                    <MDXRemote source={file} options={options} />
                    <div className={'h-0.5 w-full bg-gray-600'}/>
                </div>
            </Suspense>
         
        </div>
    )
        }
export default page
const fetchData = async (blogSlug: string) => {
    'use server'
try {
    const { title, content, image, created_at,slug, id,author_id,techs } = await getBlogsBySlug(blogSlug);

    const fetchMDX = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/htetahyan/HtetAhYan/main/${content}.mdx`,{
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'Authorization': 'token ' + process.env.GITHUB_TOKEN
            },
next: {revalidate: 3600},
         });
        return await response.text(); // Decode base64 content
    };

    const [mdxData,author]=await Promise.all([fetchMDX(),getAuthorProfile(author_id!)])

    return {
        file: mdxData,
        image,
        title,
        id,
        techs,

        author,created_at
    };
}catch (e){

        return notFound()
}

};
export const generateMetadata = async ({params}: { params: { slug: string } }) :Promise<Metadata>=> {
    const {title,image} = await fetchData(params.slug);
   return await MetaTag(title!,'Read More ...',image!,params.slug)

}