import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from './components/theme/logo'

const config: DocsThemeConfig = {
  logo: Logo,
  project: {
    link: 'https://github.com/schedule-x/schedule-x',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: `© 2023-present Tom Österlund`,
  },
}

export default config
