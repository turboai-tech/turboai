import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
            source: '/overview',
            destination: '/',
            permanent: true,
            },
        ];
    },
    
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);