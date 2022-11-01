module.exports = {
    webpack: function(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      return config
    },
    env: {
        siteTitle: 'openai Whisper - Sample WebApp',
    },
    trailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
}