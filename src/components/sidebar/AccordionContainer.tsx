
import React from 'react';
import Accordion from "~/components/sidebar/Accordion";
import {getBlogs, getTypes} from "~/service/server.service";
import {TYPE} from "~/db/schema/schema";

const AccordionContainer = async () => {
    const data=await getTypes() || []
    return (
        <div className={'sticky hidden lg:block top-[10vh] col-start-1 col-end-2 min-h-screen left-0 overflow-y-auto max-h-[90vh]'}>
            <div className={'flex flex-col h-[calc(100%-10vh)] overflow-y-auto gap-2 '}>


                {data?.map((data) => <Accordion id={data.id} title={data.name!}/>)}
            </div>
        </div>
    );
};

export default AccordionContainer;
