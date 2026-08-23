/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // From the Show posts are read from disk at runtime; make sure the
  // content directory ships with the serverless/standalone build.
  outputFileTracingIncludes: {
    '/shows/[title]': ['./content/**/*'],
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
