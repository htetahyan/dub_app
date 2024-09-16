'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Bag, DriveUpload, PlusIcon, MenuOpen, Speak, Tune, Logout } from '~/assets/exporter';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionTrigger } from '../ui/accordion';
import { AccordionItem } from '@radix-ui/react-accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { LogOut } from 'lucide-react';

const DashboardSidebar =  ({user}:any) => {
  const router=useRouter()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const logout=async()=>{
  const res=await fetch('/api/oauth/logout',{
    method:'POST',
  })
  const data=await res.json() ?? {};
  if(data?.message){
    toast.success(data.message ?? 'Logged out successfully')
    router.push('/')
  }
}
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const GoToVideoDubbing=()=>{
   if(user?.isSubscribed){ router.push('/dashboard/video-dubbing') }
    toast.warning('Please subscribe a plan to use this feature')
    

  }

  
  return (
    <div>
      {/* Mobile Sidebar Button */}
      <button className="p-2 lg:hidden" onClick={toggleSidebar}>
        <Image src={MenuOpen} alt="Menu opener" className="w-8 h-8" />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 bg-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:top-0 lg:w-[20vw] lg:block`}>
        <div className="w-full flex items-center justify-between p-4">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Image src={MenuOpen} alt="Menu opener" className="w-8 h-8" />
          </button>
        </div>

        <div className="w-full h-[1px] bg-gray-200" />
        <DashboardAvatar user={user}/>
        <div className="w-full mt-4 h-[1px] bg-gray-200" />
<div className='w-full grid grid-cols-2'>
        <Link href={'/dashboard'}>
          <Button variant={'ghost'} className="h-16 w-fit mx-auto mt-2 text-sm flex items-center justify-start gap-4 font-semibold">
            <Image src={PlusIcon} alt="audi" className="h-6 w-6" />
Audio          </Button>
        </Link>
        <Link href={'/dashboard/video-dubbing'}>
          <Button variant={'ghost'} disabled={!user?.isSubscribed}  className="h-16 w-fit mx-auto mt-2 text-sm flex items-center justify-start gap-4 font-semibold">
            <Image src={PlusIcon} alt="Add new dubbing" className="h-6 w-6" />
Video          </Button>
</Link>
          </div>
{!user?.isSubscribed && (
  <Alert variant="destructive" className="w-4/5 mx-auto mt-2">
    <AlertTitle>Subscribe</AlertTitle>
    <AlertDescription>
      Please subscribe a plan to use dubbing feature
    </AlertDescription>
    </Alert>
)}
        <div className="w-full mt-2 flex justify-center">
          <Accordion className="w-4/5" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-gray-500">Dashboards</AccordionTrigger>
              {dashboardLinks.map((dashboard, i) => (
                <Link key={i} onClick={toggleSidebar} href={'/dashboard' + dashboard.path}>
                  <AccordionContent className="w-full">
                    <Button variant={'ghost'} className="h-16 w-full mx-auto my-0 text-md flex items-center justify-start gap-4 font-semibold">
                      <Image src={dashboard.icon} alt="Dashboard link" className="h-6 w-6" />
                      {dashboard.name}
                    </Button>
                  </AccordionContent>
                </Link>
              ))}
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full mt-4 h-[1px] bg-gray-200" />
        <Button onClick={logout} variant={'destructive'} className="h-fit w-fit mx-auto mt-4 text-md flex items-center justify-start gap-4 font-semibold">
          Log out <LogOut className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;

const dashboardLinks = [
  { name: "My projects", path: "/my-projects", icon: DriveUpload },
  { name: "Subscriptions", path: "/subscriptions", icon: Bag },
  { name: "Profile Setting", path: "/settings", icon: Tune },
  { name: "Support", path: "/support", icon: Speak },
];

export const DashboardAvatar = ({ user }: { user: any }) => {
  return (
    <div className="w-full flex items-center justify-around px-4 mt-4">
      <Avatar>
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-semibold text-xl">{user.name ?? user.email}</h1>
        <p className="text-secondary">{user.credits} Credit left</p>
      </div>
    </div>
  );
};
