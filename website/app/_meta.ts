import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: {
    display: "hidden",
    theme: {
      layout: 'full',
      sidebar: false,
      toc: true,
      timestamp: false,
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
  premium: {
    title: 'Premium',
    type: 'page',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      timestamp: false
    }
  },
  imprint: {
    display: 'hidden',
    title: 'Imprint',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  newsletter: {
    display: 'hidden',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  attributions: {
    display: 'hidden',
    title: 'Attributions',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  privacy: {
    display: 'hidden',
    title: 'Privacy policys',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  'premium-changelog': {
    display: 'hidden',
    title: 'Changelog for Schedule-X premium'
  },
  'validate-license-key': {
    display: 'hidden',
    title: 'Imprint',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  'affiliate-program': {
    display: 'hidden',
    title: 'Affiliate program',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  'terms-and-conditions': {
    display: 'hidden',
    title: 'Terms and conditions',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  },
  procurement: {
    display: 'hidden',
    title: 'Procurement',
    type: 'page',
    theme: {
      sidebar: false,
      toc: false
    }
  }
}

export default meta
