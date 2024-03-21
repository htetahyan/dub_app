import {MDXRemote} from 'next-mdx-remote/rsc';

import rehypeHighlight from "rehype-highlight";
import '~/app/arta.css'
import {getBlogsBySlug} from "~/service/server.service";
import Image from "next/image";
import Linker from "~/components/Linker";
import {arrow_right_icon} from "~/assets/exporter";
import React, {Suspense} from "react";

import {blurUrl} from "~/utils/utils";
import BackBtn from "~/components/BackBtn";
import Like from "~/components/Like";
import {id} from "postcss-selector-parser";
import {tryCatch} from "standard-as-callback/built/utils";
import {notFound} from "next/navigation";


const options = {
    mdxOptions: {

        rehypePlugins: [
            [rehypeHighlight]
        ],
    }} as any
        const page=async({params}:{params:{slug:string}})=>{
const {file,image,title,id}=await fetchData(params.slug)

    return (
        <div className={'w-full  h-fit grid gap-2 p-2 lg:p-4 text-primary'}>
<BackBtn/>
            <div className={'w-auto grid justify-center rounded-md lg:rounded-2xl overflow-hidden '}>

                <Image src={image!} alt={title!}
                                              blurDataURL={blurUrl}
                       fetchPriority={'low'}
                       width={4000}
                                                                                              height={1000}
                       loading={'lazy'}
                       placeholder={'blur'}
                                                                                              className={'w-full h-full justify-self-center '}/>
            </div>

            {/*<FileUploader/>*/}

            <h1 className={'text-subheading lg:text-heading text-primary mt-2 '}>How to secure api routes in 2024?</h1>
            <div className={'flex items-center px-2 mt-3 w-full justify-between  '}>
                <h2 className={' text-caption lg:text-body'}> 1/1/2022 Sun</h2>
                <h2 className={'lg:text-small '}> HtetAhYan</h2>
            </div>
          <div className={'flex  mt-4 items-center justify-between'}><div className={'flex items-center gap-3'}><Linker text={'gsap'} url={''} iconPath={arrow_right_icon}/>
            <Linker text={'Next.js'} url={''} iconPath={arrow_right_icon}/>
          </div>
              <Suspense fallback={<div className={'loader'}/>}>
              <Like id={id} />
              </Suspense>
          </div>
            <h1>{title}</h1>
            <MDXRemote source={file} options={options}/>
        </div>
    )
        }
export default page
const fetchData = async (blogSlug: string) => {
    'use server'
try {
    const { title, content, image, created_at,slug, id } = await getBlogsBySlug(blogSlug);
    const fetchMDX = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/htetahyan/HtetAhYan/main/codeblock.mdx`,{
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'Authorization': 'token ' + process.env.GITHUB_TOKEN
            },
            next:{tags:['github'], revalidate: 3600*24}});
        return await response.text(); // Decode base64 content
    };
    const mdxData = await fetchMDX();
    return {
        file: mdxData,
        image,
        title,
        id
    };
}catch (e){
        return notFound()
}

};
