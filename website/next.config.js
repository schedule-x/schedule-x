const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  async redirects() {
    return [
      {
        source: '/docs/calendar/supported-languages',
        destination: '/docs/calendar/language',
        permanent: true,
      },
    ]
  },
})
