import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from './components/theme/logo'

const config: DocsThemeConfig = {
  logo: Logo,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
}

export default config
