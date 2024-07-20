const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextTranslate(nextConfig); 


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "events-mate-apps-sro",
    project: "events-mate-library",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
