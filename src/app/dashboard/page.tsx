import React from 'react';
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import {Terminal} from "lucide-react";
import VerifyEmailAlert from "~/components/dashboard/VerifyEmailAlert";
import AddNewDubbing from '~/components/dashboard/AddNewDubbing';

const Page = () => {
    return (
        <div className={'p-2  '}>
            {//<VerifyEmailAlert/>
            }
            <AddNewDubbing/>

        </div>
    );
};

export default Page;