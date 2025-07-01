import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: {
    display: "hidden",
    theme: {
      layout: 'full',
      sidebar: false,
      toc: true,
    }
  },
  docs: {
    type: 'page',
    href: 'docs',
    title: 'Docs'
  }
}

export default meta
