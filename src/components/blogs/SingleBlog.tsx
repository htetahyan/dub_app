import React, {FC} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Button} from "~/components/Button";
import {BLOG} from "~/db/schema/schema";

const SingleBlog:FC<BLOG> = ({created_at,id,content,title,image,author_id,view_count,slug}) => {
    const date = new Date().toDateString();

    return (
        <div className={'flex flex-col gap-3  '}>
           <div className={'w-full h-[200px] relative overflow-hidden rounded-lg transition-transform hover:scale-105'}>
               <Image src={image!} alt={''} objectFit={'cover'}
                      layout={'fill'}
                     />
           </div>
            <div className={'flex flex-col gap-2'}>
                <h1 className={'text-subheading text-primary'}>{title}</h1>
                <h1 className={'text-caption p-2 w-fit rounded-2xl bg-gray-200'}>{'s'}</h1>
        </div>
            <div className={'flex    justify-between items-center gap-2'}>
            <h1 className={'text-caption'}>{date}</h1>
                <Link href={`/blogs/${slug}`} className={'text-primary font-semibold  '}>
                    <Button variant={'ghost'} className={'underline text-caption italic'}>
                        Read
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SingleBlog;
