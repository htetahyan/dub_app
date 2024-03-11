import {MDXRemote} from 'next-mdx-remote/rsc';
import {atob} from "node:buffer";
import {serialize} from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import '~/app/arta.css'
import {notFound} from "next/navigation";
import {Button} from "~/components/Button";
import {postFormData} from "~/service/api.service";

const options = {
    mdxOptions: {

        rehypePlugins: [
            [rehypeHighlight]
        ],
    }} as any
        const page=async({params}:{params:{title:string}})=>{
const data=await fetchDat()

    return (
        <div>
            <Button onClick={postFormData}>post</Button>
            <h1>{params.title}</h1>
            <MDXRemote source={data} options={options} />
        </div>
    )
}
export default page
 const fetchDat=async()=>{
    try {
        const res = await fetch('https://api.github.com/repos/htetahyan/HtetAhYan/contents/codeblock.mdx')
        const data = await res.json()
        // Decode base64 content
        // Decode base64 content
        return   atob(data.content);

    }catch (error) {
         notFound()
    }
 }
