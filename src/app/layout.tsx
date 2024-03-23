import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";
import Footer from "~/components/Footer";
import MetaTag from "~/utils/MetaTag";
const NeueMontrealRegular=localFont(
    {
        src: '../fonts/NeueMontreal-Regular.woff2',
        variable: '--font-NeuMontrealRegular',

    }
)
export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${NeueMontrealRegular.variable}`}>
        <body className={'font-primary text-primary'} >
        {children}
        </body>
        </html>
    );
}
