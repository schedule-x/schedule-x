import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from './components/theme/logo'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: Logo,
  project: {
    link: 'https://github.com/schedule-x/schedule-x',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase:
    'https://github.com/schedule-x/schedule-x/tree/main/website',
  footer: {
    text: `© 2023-present Tom Österlund`,
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Schedule-X',
      }
    }
  },

  head: (
    <>
      <link rel="shortcut icon" href="/images/favicon_io/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicon_io/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon_io/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon_io/favicon-16x16.png"
      />
    </>
  ),
}

export default config
