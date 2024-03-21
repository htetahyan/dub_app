import "@code-hike/mdx/dist/index.css"
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
        <div className={'w-screen relative   h-fit grid gap-2 p-2 lg:p-4 text-primary'}>
<BackBtn/>
            <div className={'w-screen grid justify-center rounded-md lg:rounded-2xl overflow-hidden '}>

                <Image src={image!} alt={title!}
                                              blurDataURL={blurUrl}
                       fetchPriority={'low'}
                       width={400}
                                                                                              height={100}
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
    const { title, content, image, created_at,slug, id } = await getBlogsBySlug(blogSlug);

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

    const mdxData = await fetchMDX();
    console.log(slug)
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
