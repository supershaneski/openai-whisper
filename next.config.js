const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
]

module.exports = {
    webpack: function(config) {
      config.resolve.fallback = { fs: false }
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      return config
    },
    env: {
        siteTitle: 'openai Whisper - Sample WebApp',
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        }
      ]
    },
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    trailingSlash: true,
    exportPathMap: async function(
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' },
      };
    }
}