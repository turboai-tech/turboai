import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    transpilePackages: ['superjson'],
    async redirects() {
        return [
            {
            source: '/overview',
            destination: '/',
            permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [new URL('https://nextuipro.nyc3.cdn.digitaloceanspaces.com/**')],
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);