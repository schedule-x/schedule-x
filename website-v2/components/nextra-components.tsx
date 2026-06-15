import Link from 'next/link'
import type { ReactNode } from 'react'

type CardProps = {
  title: string
  href: string
  children?: ReactNode
}

function Card({ title, href, children }: CardProps) {
  return (
    <Link className="sx-mdx-card" href={href}>
      <strong>{title}</strong>
      {children ? <span>{children}</span> : null}
    </Link>
  )
}

function CardsRoot({ children }: { children: ReactNode; num?: number }) {
  return <div className="sx-mdx-cards">{children}</div>
}

CardsRoot.Card = Card

type TabsProps = {
  items?: string[]
  children: ReactNode
}

function TabsRoot({ items, children }: TabsProps) {
  return (
    <div className="sx-mdx-tabs">
      {items ? (
        <div className="sx-mdx-tabs-list">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      <div className="sx-mdx-tabs-panels">{children}</div>
    </div>
  )
}

TabsRoot.Tab = function Tab({ children }: { children: ReactNode }) {
  return <div className="sx-mdx-tab-panel">{children}</div>
}

export const Cards = CardsRoot
export const Tabs = TabsRoot

export function Callout({
  children,
  type = 'info',
}: {
  children: ReactNode
  type?: 'info' | 'warning' | 'error' | 'default'
}) {
  return <aside className={`sx-mdx-callout sx-mdx-callout-${type}`}>{children}</aside>
}
