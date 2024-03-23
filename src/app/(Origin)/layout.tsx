import type { Metadata } from "next";

import "../globals.css";


import Providers from "~/providers/Provider";
import Sidebar from "~/components/sidebar/sidebar";

import Footer from "~/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={'font-primary text-primary'} >
      <Providers>
      <Sidebar>

      {children}
      </Sidebar>
          <Footer/>
          </Providers>
      </body>
    </html>
  );
}
