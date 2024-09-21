import {MetadataRoute} from "next";
import siteConfig from "../../site-config";


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            priority: 1,

        },

    ]
}