import React from 'react';
import Image from "next/image";
import {dropDown_icon} from "~/assets/exporter";
import Linker from "~/components/Linker";
import Link from "next/link";
import {getBlogsByTypeId} from "~/service/server.service";

const Accordion =async ({id,title}: { id: number, title: string }) => {
  const blog= await getBlogsByTypeId(id)
    return (
        <div className={'max-w-max'}>
            <div
                className="group flex flex-col gap-2 rounded-lg  p-2 h-fit  "
                tabIndex={1}
            >
                <div className="flex cursor-pointer items-center justify-between">
                    <span>{title}</span>
                    <Image
                        src={dropDown_icon} alt={'dropdown'}
                        className="h-5 w-5 transition-all duration-500 group-focus:-rotate-180"
                    />
                </div>
                <div
                    className="invisible h-auto max-h-0  items-center opacity-0 transition-all px-2 group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
                >
                    {blog?.map((blog)=>{
                        return(
                            <Link href={'/blogs/'+blog.slug} key={blog.id} prefetch className={'hover:underline'}>{blog.title}</Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
