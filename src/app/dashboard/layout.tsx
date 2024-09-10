import type { Metadata } from "next";

import "../globals.css";
import dynamic from "next/dynamic";
const DashboardSidebar=dynamic( ()=>import('~/components/dashboard/DashboardSidebar'),{ssr:true} )


//export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning
>

        <body className="flex w-screen relative overflow-x-hidden "  >
<DashboardSidebar/>
        {children}
        </body>
        </html>
    );
}
