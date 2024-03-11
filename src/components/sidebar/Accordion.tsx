import React from 'react';
import Image from "next/image";
import {dropDown_icon} from "~/assets/exporter";

const Accordion = ({children,title}: { children: React.ReactNode, title: string }) => {
    return (
        <div>
            <div
                className="group flex flex-col gap-2 rounded-lg  p-5  "
                tabIndex={1}
            >
                <div className="flex cursor-pointer items-center justify-between">
                    <span>EDUSN</span>
                    <Image
                        src={dropDown_icon} alt={'dropdown'}
                        className="h-5 w-5 transition-all duration-500 group-focus:-rotate-180"
                    />
                </div>
                <div
                    className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </div>
            </div>
        </div>
    );
};

export default Accordion;