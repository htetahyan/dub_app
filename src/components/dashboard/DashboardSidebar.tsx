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

const DashboardSidebar = ({ user }: any) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = async () => {
    const res = await fetch('/api/oauth/logout', { method: 'POST' });
    const data = await res.json() ?? {};
    if (data?.message) {
      toast.success(data.message ?? 'Logged out successfully');
      router.push('/');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Mobile Sidebar Button */}
    <div className='w-full px-2 flex items-center justify-between'>  <button className="p-2 lg:hidden" onClick={toggleSidebar}>
        <Image src={MenuOpen} alt="Menu opener" className="w-8 h-8" />
      </button>
      <h1 className=" pr-2 lg:hidden font-bold text-xl">Dashboard</h1>
      </div>
      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 bg-white transition-transform transform overflow-hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:top-0 lg:w-[20vw] lg:block`}>
        <div className="w-full flex items-center justify-between p-4">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Image src={MenuOpen} alt="Menu opener" className="w-8 h-8" />
          </button>
          
        </div>

        <div className="w-full h-[1px] bg-gray-200" />
        <DashboardAvatar user={user} />
        <div className="w-full mt-4 h-[1px] bg-gray-200" />

        {/* Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 px-4">
          <Link href="/dashboard">
            <Button variant={'ghost'} disabled={!user?.isSubscribed} className="h-12 w-full text-sm flex items-center gap-2 font-semibold">
              <Image src={PlusIcon} alt="Audio" className="h-5 w-5" />
              Audio
            </Button>
          </Link>

          <Link href="/dashboard/video-dubbing">
            <Button variant={'ghost'} disabled={!user?.isSubscribed} className="h-12 w-full text-sm flex items-center gap-2 font-semibold">
              <Image src={PlusIcon} alt="Video" className="h-5 w-5" />
              Video
            </Button>
          </Link>

          <Link href="/dashboard/text-to-speech">
            <Button variant={'ghost'} className="h-12 w-full text-sm flex items-center gap-2 font-semibold">
              <Image src={PlusIcon} alt="TTS" className="h-5 w-5" />
              TTS
            </Button>
          </Link>
        </div>

        {!user?.isSubscribed && (
          <Alert variant="destructive" className="w-11/12 mx-auto mt-4">
            <AlertTitle>Subscribe</AlertTitle>
            <AlertDescription>
              Please subscribe to a plan to use the dubbing feature
            </AlertDescription>
          </Alert>
        )}

        {/* Accordion Links */}
        <div className="w-full mt-6 px-4">
          <Accordion className="w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-gray-600">Dashboards</AccordionTrigger>
              {dashboardLinks.map((dashboard, i) => (
                <Link key={i} href={'/dashboard' + dashboard.path} onClick={toggleSidebar}>
                  <AccordionContent className="w-full">
                    <Button variant={'ghost'} className="h-12 w-full text-md flex items-center gap-2 font-semibold">
                      <Image src={dashboard.icon} alt="Dashboard link" className="h-5 w-5" />
                      {dashboard.name}
                    </Button>
                  </AccordionContent>
                </Link>
              ))}
            </AccordionItem>
          </Accordion>
        </div>

        {/* Logout */}
        <div className="w-full mt-4 px-4">
          <Button onClick={logout} variant={'destructive'} className="h-12 w-full text-md flex items-center gap-2 font-semibold">
            Log out
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
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
    <div className="w-full flex items-center gap-4 px-4 mt-4">
      <Avatar>
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-semibold text-lg">{user.name ?? user.email}</h1>
        <p className="text-sm text-gray-500">{user.credits} Credits left</p>
      </div>
    </div>
  );
};
