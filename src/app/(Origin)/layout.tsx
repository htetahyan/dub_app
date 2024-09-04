
import "../globals.css";


import Providers from "~/providers/Provider";

import dynamic from "next/dynamic";
const Header=dynamic(()=>import("~/components/Header"),{ssr:false})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={'font-primary text-primary'} >
      <Providers>


<Header/>
      {children}



          </Providers>
      </body>
    </html>
  );
}
