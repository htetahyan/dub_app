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
import { Highlighter, LogOut, Music, Speech, VideoIcon, Videotape } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const DashboardSidebar = ({ user }: any) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  router.prefetch('/');

  const logout = async () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        const res = await fetch('/api/oauth/logout', { method: 'POST' }).finally(() => router.replace('/'));
        const data = res.json() as any;
        if (res.ok) resolve(data?.message!);
        else reject(data?.message!);
      }),
      {
        loading: 'logging out',
        closeButton: true,
        success: (msg: any) => msg ?? 'logged out successfully',
        error: (msg: any) => msg ?? 'cannot log out right now',
      }
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Array for three buttons
  const projectBtns = [
    { label: 'audio translation', icon: Music, path: '/audio-dubbing' },
    { label: 'video translation', icon: Videotape, path: '/video-dubbing' },
    { label: 'text to speech', icon: Speech, path: '/text-to-speech' },

  ];
projectBtns.forEach((btn) => {
  router.prefetch(btn.path);
})
  return (
    <div>
      {/* Mobile Sidebar Button */}
      <div className="w-full px-2 flex items-center justify-between">
        <button className="p-2 lg:hidden" onClick={toggleSidebar}>
          <Image src={MenuOpen} alt="Menu opener" className="w-8 h-8" />
        </button>
        <h1 className="pr-2 lg:hidden font-bold text-xl">Dashboard</h1>
      </div>

      {/* Buttons at the top */}
   

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-transform transform overflow-hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:top-0 lg:w-[20vw] lg:block`}
      >
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
        <h1 className="font-semibold  text-lg px-4 ">Projects</h1>

        <div className="w-full grid gap-2 px-4 ">
          {projectBtns.map((btn, i) => (
            <Link key={i} className='justify-self-start' href={'/dashboard' + btn.path as string} onClick={toggleSidebar}>
              <Button variant={'ghost'} className="h-8 w-full text-sm flex items-center gap-2 font-semibold">
<btn.icon className='h-5 w-5 text-secondary'/>                {btn.label}
              </Button>
            </Link>
          ))}
        </div>

        {!user?.isSubscribed && (
          <Alert variant="destructive" className="w-11/12 mx-auto mt-2">
            <AlertTitle>Subscribe</AlertTitle>
            <AlertDescription>
              Please subscribe to a plan to use the dubbing feature
            </AlertDescription>
          </Alert>
        )}

        {/* Accordion Links */}
        <div className="w-full mt-2 px-4">
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
        <div className="w-full mt-2 px-4">
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
  { name: 'My projects', path: '/my-projects', icon: DriveUpload },
  { name: 'Subscriptions', path: '/subscriptions', icon: Bag },
  { name: 'Profile Setting', path: '/settings', icon: Tune },
  { name: 'Support', path: '/support', icon: Speak },
];

export const DashboardAvatar = ({ user }: { user: any }) => {
  return (
    <div className="w-full flex items-center gap-4 px-4 mt-4">
      <Avatar>
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="text-secondary">
        <h1 className="font-semibold text-lg">{user.name ?? user.email}</h1>
        <p className="text-sm ">{user.credits} Credits left</p>
      </div>
    </div>
  );
};
