import {ProfilePage, WithContext} from "schema-dts";

export const jsonLd:WithContext<ProfilePage> ={
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Blog",
    description: "A Tech Blogs site",
    url: "https://blogs.htetahyan.online/",
    headline: "My Tech Blog",
    image: "https://blogs.htetahyan.online/opengraph-image.jpg",
    mainEntity: {
        "@type": "WebPage",
        "@id": "https://blogs.htetahyan.online/",
        name: "Blog",
        description: "A Tech Blogs site",
        url: "https://blogs.htetahyan.online/",

    },
    author: {
        "@type": "Person",
        name: "Htet Ah Yan",
        url: "https://blogs.htetahyan.online/",
    },
}