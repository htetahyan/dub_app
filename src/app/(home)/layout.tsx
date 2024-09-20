import type { Metadata } from "next";
import Footer from "~/components/Footer";
import dynamic from "next/dynamic";
const HeaderResponsive=dynamic(()=>import('~/components/HeaderResponsive'))


//export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
  <>
       <HeaderResponsive/>
        {children}
        <Footer/>
        </>
    );
}
