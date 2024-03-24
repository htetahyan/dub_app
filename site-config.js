const siteConfig = {
    title: 'Welcome to My blogs site',
    tagline: 'Your personal guide to tech tutorials and tips. Explore easy-to-follow guides and helpful advice for developer.'
  ,
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: '/favicons/favicon.ico',
    organizationName: 'Htet Ah Yan',
}
module.exports = siteConfig;
