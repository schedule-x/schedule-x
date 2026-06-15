import '@schedule-x/theme-default/dist/index.css'
import './global.css'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import { JetBrains_Mono, Open_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import SiteFooter from '@/components/site-footer'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Schedule-X - End-to-end web calendar product',
    template: '%s | Schedule-X',
  },
  description:
    'Schedule-X Cloud gives teams a hosted calendar backend, sync workflows, and a Schedule-X-ready frontend calendar UI.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${mono.variable} flex min-h-screen flex-col`}>
        <RootProvider>{children}</RootProvider>
        <SiteFooter />
      </body>
    </html>
  )
}
