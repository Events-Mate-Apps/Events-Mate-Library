import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */
export default nextTranslate({
  experimental: {
    // appDir: true,
  },
  images: {
    domains: [
      'weddmate.s3.eu-west-1.amazonaws.com',
      'images.unsplash.com'  // This line is already there
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'weddmate.s3.amazonaws.com',
        port: '',
        pathname: '/vendors/**',
      },
      {
        protocol: 'https',
        hostname: 'weddmate.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/vendors/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Only run in the client-side bundle
    if (!isServer) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });
    }
    return config;
  },
});