import {MDXRemote} from 'next-mdx-remote/rsc';
import {atob} from "node:buffer";

import rehypeHighlight from "rehype-highlight";
import '~/app/arta.css'
import {notFound} from "next/navigation";
import {getBlogByTitle} from "~/service/server.service";
import Image from "next/image";
import Linker from "~/components/Linker";
import {arrow_right_icon} from "~/assets/exporter";
import React from "react";

import {blurUrl} from "~/utils/utils";
import BackBtn from "~/components/BackBtn";




const options = {
    mdxOptions: {

        rehypePlugins: [
            [rehypeHighlight]
        ],
    }} as any
        const page=async({params}:{params:{title:string}})=>{
const {file,image,title}=await fetchData(params.title)

    return (
        <div className={'w-full  h-fit grid gap-2 p-2 lg:p-4 text-primary'}>
<BackBtn/>
            <div className={'w-auto grid justify-center rounded-md lg:rounded-2xl overflow-hidden '}>

                <Image src={image!} alt={'sd'}
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
          <div className={'flex gap-4 mt-4'}>  <Linker text={'gsap'} url={''} iconPath={arrow_right_icon}/>
            <Linker text={'Next.js'} url={''} iconPath={arrow_right_icon}/></div>
            <h1>{params.title}</h1>
            <MDXRemote source={file} options={options}/>
        </div>
    )
        }
export default page
const fetchData = async (blogTitle: string) => {
    try {
        const {title,content,image,created_at}=await getBlogByTitle(blogTitle)

        const res = await fetch(`https://api.github.com/repos/htetahyan/HtetAhYan/contents/${content}.mdx`);

        const data = await res.json()

        // Decode base64 content
        // Decode base64 content
        const file=atob(data.content)
        return  {file,image,title};

    }catch (error) {
         notFound()
    }
 }
