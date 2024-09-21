import siteConfig from "../../site-config";
import {Metadata} from "next";

const metaTag =(description:string,title:string): Metadata=>{
  return {  title,

    description: siteConfig.tagline,generator: 'Next.js',
    referrer: 'origin-when-cross-origin',

verification: {
  google:process.env.NEXT_PUBLIC_GOOGLE_KEY,

},
    creator: 'Contentally',
    applicationName: 'Contentally',
    appleWebApp: true,
    formatDetection: {
        telephone: false
    },

    metadataBase: new URL(siteConfig.url),
    keywords: ['contentally', 'ai video', 'dub ai','Text to speech','next','video highlight'],
    alternates: {
        canonical: new URL(siteConfig.url),
    },
    robots: {
        index: true,
        follow: true,

    },
    icons:[
    {
        rel:'icon',
sizes:'16x16',
            url:'/favicon.ico',
            type:'image/x-icon'
        }
        ,{
            rel: 'icon',
            type: 'image/png',
            sizes:'32x32',
            url: '/favicons/android-chrome-512x512.png'
        }
        ,{
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes:'180x180',
            url: '/favicons/apple-touch-icon.png'
        }
    ],

    twitter: {
        card: 'summary',

        title,
        description,
        creator: 'Contentally',
        images: ['https://contentally.ai/opengraph.png']
    },
    openGraph: {

        title,
        type: 'website',
        description,
        url: 'https://contentally.ai/opengraph.png',
        siteName: 'Contentally',


        images: [
            {
                url: 'https://contentally.ai/opengraph.png',
                width: 1200,
                height: 630
            }
        ]
    },

    category:'Technology'}
}
export default metaTag