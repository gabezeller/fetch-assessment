/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://frontend-take-home.fetch.com/dog-images/**')],
      },
};




export default nextConfig;
