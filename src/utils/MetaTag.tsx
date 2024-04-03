import siteConfig from "../../site-config";
import {Metadata} from "next";
export const keywords = ['htetahyan', 'htetahyan.vercel.app', 'htetahyan.com','htetahyan portfolio','next','htet ah yan']
export const metaTag =async (title?:string,description?:string,image?:string,path?:string): Promise<Metadata>=>{

return {
    title: title || siteConfig.title,

    description: description || siteConfig.tagline,generator: 'Next.js',
    referrer: 'origin-when-cross-origin',

    verification: {
        google:process.env.NEXT_PUBLIC_GOOGLE_KEY,

    },
    formatDetection: {
        telephone: false
    },

    metadataBase: new URL(siteConfig.url),
    keywords: [...keywords, title || '',title?.split(' ').join('-') || ''] ,
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
            url:'/favicons/favicon.ico',
            type:'image/x-icon'
        }
        ,{
            rel: 'icon',
            type: 'image/png',
            sizes:'512x512',
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

        title: title || 'Htet Ah Yan',
        description: description || 'Blogs by Htet Ah Yan',
        creator: 'Htet Ah Yan',
        images: [image || process.env.NEXT_PUBLIC_BASE_URL + '/opengraph-image.jpg']
    },
    
    openGraph: {

        title: title || 'Htet Ah Yan\'s Blogs',
        type: 'website',
        description: description || 'Blogs by Htet Ah Yan',
        url: process.env.NEXT_PUBLIC_BASE_URL! + path ?? '/',
        siteName: 'Htet Ah Yan\'s Blog',
        

        images: [ 
            {url: image || process.env.NEXT_PUBLIC_BASE_URL + '/opengraph-image.jpg',
            width: 1200,
            height: 630
        }
            
        ]
    },

    category:'Technology'
}}
export default metaTag
