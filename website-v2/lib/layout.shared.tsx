import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Logo from '@/components/logo'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="sx-nav-title">
          <Logo />
        </span>
      ),
    },
    links: [
      {
        text: 'Cloud',
        url: '/docs/cloud',
        active: 'nested-url',
      },
      {
        text: 'UI',
        url: '/docs/frontend',
        active: 'nested-url',
      },
      {
        text: 'GitHub',
        url: 'https://github.com/schedule-x/schedule-x',
        external: true,
      },
    ],
  }
}
