import type { Metadata } from "next";

import "../globals.css";
import DashboardSidebar from "~/components/dashboard/DashboardSidebar";



//export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning
>

        <body className="flex w-screen"  >
<DashboardSidebar/>
        {children}
        </body>
        </html>
    );
}
