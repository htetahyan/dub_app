import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";
import metaTag from "~/components/MetaTag";

import {Toaster} from "~/components/ui/sonner";
import Script from "next/script";
const NeueMontrealRegular=localFont(
    {
        src: '../fonts/EuclidCircularB-Medium.woff',
        variable: '--font-NeuMontrealRegular',

    }
)

//export const metadata: Metadata = await MetaTag()
export const metadata: Metadata =metaTag("Transform your video to another language within a minute","Contentally")

    export const viewport = {
        width: 'device-width',
        initialScale: 1,
      };
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" 

              className={`${NeueMontrealRegular.variable}`}>
        

        <body className={'font-secondary'} >
        <Toaster position={'top-right'}/>
        {children}
        </body>
        <Script id={ "tawkto" } type="text/javascript">
  {`
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/66ec4c204cbc4814f7db6388/1i85gioo6';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  `}
</Script>
<Script id="google" async src="https://www.googletagmanager.com/gtag/js?id=G-P55SK1JCCP"></Script>
<Script id="google-script">
{`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P55SK1JCCP');`}
</Script>
        </html>
    );
}
