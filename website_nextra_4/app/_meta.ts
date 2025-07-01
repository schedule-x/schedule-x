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
  },
  demos: {
    display: 'hidden',
    title: 'Demos',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
}

export default meta
