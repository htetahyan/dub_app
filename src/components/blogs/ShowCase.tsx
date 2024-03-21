'use client'
import React, { useState } from 'react';
import SingleBlog from "~/components/blogs/SingleBlog";
import { Button } from "~/components/Button";
import useSWRInfinite from "swr/infinite";
import {BLOG} from "~/db/schema/schema";

const ShowCase = () => {

    const { data, error, isValidating, size,setSize } = useSWRInfinite(
        (index) => `/api/blogs?limit=10&offset=${index* 10}`,
        fetchBlogs,

    );
    const [lastLoadedIndex, setLastLoadedIndex] = useState(0);
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (isValidating && data && typeof data[data.length - 1] === 'undefined');
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || data?.[data.length - 1]?.length < 10;
    if (data && size > lastLoadedIndex) {
        setLastLoadedIndex(size);
    }
    return (
        <div id={'showcase'} className={'grid grid-cols-1 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-4 w-full mt-3 py-2'}>
            {data?.map((pageData, i) => (
                pageData.map((blog: BLOG
                ) => (
                <div key={i} className={`${lastLoadedIndex <= i && 'loader'}`}>    <SingleBlog
                    type_id={blog.type_id}
                    techs={blog.techs}
                    key={blog.id}
                    title={blog.title}
                    image={blog.image}
                    view_count={blog.view_count}
                    id={blog.id}
                    content={blog.content}
                    created_at={blog.created_at}

                    author_id={blog.author_id} slug={blog.slug}                    />
                </div>
                ))
            ))}
            {isLoadingMore && <div className={'loader relative right-0'}/> }
            <div className={'flex justify-center lg:col-span-3'}>

                {!isLoadingMore && !isReachingEnd && <Button variant={'ghost'} onClick={() => setSize(size + 1)}>Load More</Button>}
                {isReachingEnd && <p>No more blogs to load.</p>}
            </div>
        </div>
    );
};

export default ShowCase;

const fetchBlogs = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
 next:{revalidate:0}
    });
    if (!response.ok) throw new Error('An error occurred while fetching the data.');
    return response.json();
};
