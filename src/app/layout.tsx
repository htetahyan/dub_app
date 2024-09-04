import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";

import { cn } from "~/utils/utils";
import {Toaster} from "~/components/ui/sonner";
const NeueMontrealRegular=localFont(
    {
        src: '../fonts/EuclidCircularB-Medium.woff',
        variable: '--font-NeuMontrealRegular',

    }
)

//export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning

              className={`${NeueMontrealRegular.variable}`}>
        <Toaster />

        <body className={cn('font-default')} >

        {children}
        </body>
        </html>
    );
}
