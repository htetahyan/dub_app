const siteConfig = {
    title: 'Blogs by HtetAhYan',
    tagline: 'Welcome to my tech Blogs website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: '/favicons/favicon.ico',
    organizationName: 'Htet Ah Yan',
}
module.exports = siteConfig;
