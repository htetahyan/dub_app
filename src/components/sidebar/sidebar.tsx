import React from 'react';
import Header from "~/components/Header";
import Accordion from "~/components/sidebar/Accordion";

const Sidebar = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <Header/>

            <div className={'grid lg:grid-cols-5  '}>
                <div className={'sticky hidden lg:block top-[10vh] col-start-1 col-end-2 min-h-screen left-0 overflow-y-auto max-h-[90vh]'}>
                    <div className={'flex flex-col h-[calc(100%-10vh)] overflow-y-auto gap-2 '}>
                        <Accordion title={''}>
                            hello
                        </Accordion>

                    </div>
                </div>
<div className={'lg:col-start-2 lg:col-end-6'}>
                {children}
</div>
</div>

        </div>
    );
};

export default Sidebar;