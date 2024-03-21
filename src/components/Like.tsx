
import React from 'react';
import Image from "next/image";
import {like_fill, like_outline_icon} from "~/assets/exporter";
import {getLikes, isUserLiked, toggleLike} from "~/service/server.service";
import {Button} from "~/components/Button";
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";
export const revalidate = 0
export const dynamic = 'force-dynamic'
const fetchLike = async (id: number) => {
    'use server'
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/like?id=${id}`, { method: 'GET',cache: 'no-store' ,next: {tags: ['likes']}});
    const likesData = await response.json();
       return  isEmpty(likesData)? 0 : likesData.likes.length
};
const isEmpty = (obj: {}) => Object.keys(obj).length === 0;
const Like = async ({id}: { id: number, }) => {
const likes= await fetchLike(id)
    const isLiked=await isUserLiked(id)
  const source=isLiked?  like_fill:like_outline_icon
    const clickLike = async () => {
        'use server'
        try {
        await toggleLike(id, cookies().get('access_token')?.value!)
revalidateTag('likes')
        }catch (e ){
            redirect('/login')
        }
    }
    return (
        <form  className={'w-fit h-fit flex items-center gap-2 cursor-pointer '}
action={clickLike}
         >
            <Button type={'submit'} variant={'ghost'} >

            <Image src={source} alt={'like'} className={'w-6 h-6'}/>

            </Button>
        <p className={'text-small italic'}>{likes}</p>
        </form>
    );
};

export default Like;

