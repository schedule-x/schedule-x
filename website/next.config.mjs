import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})

// Export the final Next.js config with Nextra included
export default withNextra({
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: 'https://cloud.schedule-x.com/favicon.png',
        permanent: false,
      },
      {
        source: '/icon.png',
        destination: 'https://cloud.schedule-x.com/favicon.png',
        permanent: false,
      },
      {
        source: '/apple-icon.png',
        destination: 'https://cloud.schedule-x.com/favicon.png',
        permanent: false,
      },
      {
        source: '/premium-changelog',
        destination: 'https://github.com/schedule-x/premium-changelog',
        permanent: true,
      },
    ]
  },
})
