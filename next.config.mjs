/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // News lives on ignitenews.com; the on-site section was removed.
      {
        source: '/news',
        destination: 'https://ignitenews.com',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
