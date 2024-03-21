import React from 'react';
import Header from "~/components/Header";

import AccordionContainer from "~/components/sidebar/AccordionContainer";
import {getUserProfile} from "~/service/server.service";


const Sidebar = async ({children}: { children: React.ReactNode }) => {

const userData=await getUserProfile()
    return (
        <div>
            <Header user={userData}/>

<div className={'fixed top-0 h-screen w-screen -z-10 bg-gradient-to-b from-slate-50 to-fuchsia-50'}></div>
            <div className={'grid lg:grid-cols-5  '}>
                <AccordionContainer />
<div className={'lg:col-start-2 lg:col-end-6'}>
                {children}
</div>
</div>

        </div>
    );
};

export default Sidebar;
