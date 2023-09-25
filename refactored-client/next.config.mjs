// @ts-check
import withPlaiceholder from "@plaiceholder/next";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,

    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],

        //! svg 는 @svgr/webpack 로 처리
      },
    },
  },
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    deviceSizes: [768, 1024],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
      {
        protocol: 'https',
        hostname: 'shop-phinf.pstatic.net',
        port: '',
        pathname: '/**/**',
      },
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        port: '',
        pathname: '/**/**',
      },
    ],
  },

  webpack: (config, options) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },

      //?
      // {
      //   test: /\.svg$/i,
      //   resourceQuery: /url/,  // *.svg?url
      //   use: fileLoaderRule.use,
      // },

      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/, // js, ts 외에 css 에선 url로 작동
        //! 윗줄 없어야 작동됨
        //https://github.com/vercel/next.js/issues/48177#issuecomment-1506251112

        resourceQuery: { not: /url/ }, // exclude if *.svg?url

        //import svg from './assets/file.svg?url' 로 하면 url로 사용 가능

        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default withPlaiceholder(nextConfig);
