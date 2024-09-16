import type { Metadata } from "next";
import Footer from "~/components/Footer";
import Header from "~/components/Header";



//export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
  <>
       <Header/>
        {children}
        <Footer/>
        </>
    );
}
