

/**
 * @type {import('next').NextConfig}
 */
import createMDX from '@next/mdx'
import rehypeHighlight from "rehype-highlight";
const nextConfig = {
 pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

    images: {
    remotePatterns: [{protocol: "https", hostname: "res.cloudinary.com"}, {protocol: "https", hostname: "images.unsplash.com"}, {protocol: "https", hostname: "lh3.googleusercontent.com"}, {protocol: "https", hostname: "cdn.pixabay.com"}],        // Adding policies:

}
}

const withMdx= createMDX({
    options:{

        rehypePlugins: [rehypeHighlight],
    }
})
export default withMdx(nextConfig)
