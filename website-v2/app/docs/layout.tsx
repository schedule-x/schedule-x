import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      tabs={[
        {
          title: 'Cloud',
          description: 'Hosted backend, sync, SDK, and API docs',
          url: '/docs/cloud',
        },
        {
          title: 'UI',
          description: 'Standalone Schedule-X calendar UI docs',
          url: '/docs/frontend',
        },
      ]}
    >
      {children}
    </DocsLayout>
  )
}
