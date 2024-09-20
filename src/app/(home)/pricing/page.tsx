import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { Spiral, Star, Vector14 } from '~/assets/exporter';
import Subscriptions from '~/components/home/Subscriptions';
import { getCurrentUser } from '~/service/user.service';

const Page = async () => {
    const accessToken = cookies().get('access_token')?.value;
    const user = await getCurrentUser(accessToken);

    return (
        <div className="h-fit  flex flex-col justify-center items-center relative overflow-x-hidden">
            <Image src={Spiral} alt="icon" className="w-20 top-4 h-auto absolute right-8" />
            <div className="absolute left-16 top-0 h-10 w-10 bg-slate-500 rounded-full" />
            <Image src={Star} alt="icon" className="w-20 h-auto absolute left-8 bottom-40" />

            <div className="relative mx-auto  left-0">
                <h1 className="lg:text-5xl text-3xl font-semibold font-secondary">
                    Save time &
                    <span className="relative inline-block text-center">
            money,
            <Image
                src={Vector14}
                alt="icon"
                className="absolute inset-0 w-96 h-12 -translate-x-1/2 -translate-y-1/2"
                style={{ top: '50%', left: '50%' }} // Adjust as needed
            />
          </span>
                    monetize globally
                </h1>
            </div>

            <div className="w-[90vw] mx-auto ">
                <Subscriptions user={user} />
            </div>
        </div>
    );
};

export default Page;
