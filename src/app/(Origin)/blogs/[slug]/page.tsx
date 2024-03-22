import {MDXRemote} from 'next-mdx-remote/rsc';


import rehypeHighlight from "rehype-highlight";
import '~/app/arta.css'
import {getAuthorProfile, getBlogsBySlug} from "~/service/server.service";
import Image from "next/image";
import Linker from "~/components/Linker";
import {arrow_right_icon} from "~/assets/exporter";
import React, {Suspense} from "react";

import {blurUrl} from "~/utils/utils";
import BackBtn from "~/components/BackBtn";
import Like from "~/components/Like";
import {notFound} from "next/navigation";
const options = {
    mdxOptions: {

        rehypePlugins: [
            [rehypeHighlight]
        ],
    }} as any
        const page=async({params}:{params:{slug:string}})=>{
const {file,image,title,author,id,created_at}=await fetchData(params.slug)
            const date= new Date(created_at!*1000).toDateString()
    return (
        <div className={'w-full relative   h-fit grid gap-2 p-2 lg:p-4 text-primary'}>
<BackBtn/>
            <div className={'w-full h-[60vh] relative grid justify-center rounded-md lg:rounded-2xl overflow-hidden '}>

                <Image src={image!} alt={title!}
                       objectFit={'contain'}
                                              blurDataURL={blurUrl}
                       fetchPriority={'low'}
                       loading={'lazy'}
                       placeholder={'blur'}
                       layout={'fill'}
                                                                                              className={'w-full h-full justify-self-center '}/>
            </div>

                  <h1 className={'text-subheading lg:text-heading text-primary mt-2 '}>{title}</h1>
            <div className={'flex items-center px-2 mt-3 w-full justify-between  '}>
                <h2 className={' text-caption lg:text-body'}> {date}</h2>
           <div className={'flex items-center gap-3'}>    <Image src={author?.photo!} alt={'author'}
                       blurDataURL={blurUrl}
                       width={50} height={50} className={'rounded-full'}
                       loading={'lazy'} placeholder={'blur'}/>
                <h2 className={'text-caption underline '}> {author?.name}</h2></div>
            </div>
          <div className={'flex  mt-4 items-center justify-between'}><div className={'flex items-center gap-3'}><Linker text={'gsap'} url={''} iconPath={arrow_right_icon}/>
            <Linker text={'Next.js'} url={''} iconPath={arrow_right_icon}/>
          </div>
              <Suspense fallback={<div className={'loader'}/>}>
              <Like id={id} />
              </Suspense>
          </div>
            <h1>{title}</h1>
            <Suspense fallback={<div className={'loader'}/>}>

                <div className="max-w-[90%] flex-wrap whitespace-normal">
                    <MDXRemote source={file} options={options} />
                </div>
            </Suspense>

        </div>
    )
        }
export default page
const fetchData = async (blogSlug: string) => {
    'use server'
try {
    const { title, content, image, created_at,slug, id,author_id } = await getBlogsBySlug(blogSlug);

    const fetchMDX = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/htetahyan/HtetAhYan/main/${content}.mdx`,{
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'Authorization': 'token ' + process.env.GITHUB_TOKEN
            },
cache:'no-store'
         });
        return await response.text(); // Decode base64 content
    };

    const [mdxData,author]=await Promise.all([fetchMDX(),getAuthorProfile(author_id!)])

    return {
        file: mdxData,
        image,
        title,
        id,
        author,created_at
    };
}catch (e){

        return notFound()
}

};
