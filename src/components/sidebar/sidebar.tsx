import React from 'react';
import Header from "~/components/Header";
import Accordion from "~/components/sidebar/Accordion";
import AccordionContainer from "~/components/sidebar/AccordionContainer";

const Sidebar = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <Header/>
<div className={'fixed top-0 h-screen w-screen -z-10 bg-gradient-to-b from-slate-50 to-fuchsia-50'}></div>
            <div className={'grid lg:grid-cols-5  '}>
                <AccordionContainer/>
<div className={'lg:col-start-2 lg:col-end-6'}>
                {children}
</div>
</div>

        </div>
    );
};

export default Sidebar;
