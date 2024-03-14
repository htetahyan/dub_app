
import createMDX from '@next/mdx'
import rehypeHighlight from "rehype-highlight";
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
 pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
images: {
    remotePatterns: [{protocol: "https", hostname: "res.cloudinary.com"}],        // Adding policies:
    /*  async headers() {
          return [
              {
                  source: '/(.*)',
                  headers: [
                      {
                          key: 'X-Frame-Options',
                          value: 'DENY',
                      },
                      {
                          key: 'Content-Security-Policy',
                          value:
                              "default-src 'self' 'https://blog.logrocket.com'; image-src 'https://unsplash.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
                      },
                      {
                          key: 'X-Content-Type-Options',
                          value: 'nosniff',
                      },
                      {
                          key: 'Permissions-Policy',
                          value: "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com')",
                      },
                      {
                          key: 'Referrer-Policy',
                          value: 'origin-when-cross-origin',
                      },
                  ],
              },
          ];
      },*/
}
}
const withMDX = createMDX({
 options:{
  rehypePlugins: [
      rehypeHighlight
  ]
 }
})

export default withMDX(nextConfig)