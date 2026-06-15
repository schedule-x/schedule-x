import Link from 'next/link'
import Logo from '@/components/logo'

const productLinks = [
  { href: '/docs/cloud', label: 'Cloud docs' },
  { href: '/docs/frontend', label: 'UI docs' },
  { href: '/docs/cloud/quickstart', label: 'Quickstart' },
]

const companyLinks = [
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/imprint', label: 'Imprint' },
  { href: '/procurement', label: 'Procurement' },
]

const resourceLinks = [
  { href: '/affiliate-program', label: 'Affiliate program' },
  { href: '/attributions', label: 'Attributions' },
  { href: '/privacy', label: 'Privacy policy' },
]

const connectLinks = [
  { href: 'https://github.com/schedule-x/schedule-x', label: 'GitHub' },
  { href: 'https://discord.gg/GyJQAxRgNF', label: 'Discord' },
  { href: 'mailto:tom@schedule-x.dev', label: 'Contact' },
]

function FooterLinkColumn({
  links,
  title,
}: {
  links: { href: string; label: string }[]
  title: string
}) {
  return (
    <div className="sx-footer-links">
      <h3>{title}</h3>
      {links.map((link) => (
        link.href.startsWith('http') || link.href.startsWith('mailto:') ? (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ) : (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        )
      ))}
    </div>
  )
}

export default function SiteFooter() {
  return (
    <footer className="sx-footer">
      <div className="sx-footer-inner">
        <div className="sx-footer-main">
          <div className="sx-footer-brand">
            <Link className="sx-footer-logo" href="/" aria-label="Schedule-X home">
              <Logo />
            </Link>
            <p>
              Calendar infrastructure from API to UI. Build scheduling products
              with hosted workflows or the standalone open source calendar.
            </p>
          </div>

          <nav className="sx-footer-nav" aria-label="Footer navigation">
            <FooterLinkColumn links={productLinks} title="Product" />
            <FooterLinkColumn links={companyLinks} title="Company" />
            <FooterLinkColumn links={resourceLinks} title="Resources" />
            <FooterLinkColumn links={connectLinks} title="Connect" />
          </nav>
        </div>

        <div className="sx-footer-bottom">
          <span>© 2023-present Tom Österlund, Schedule-X</span>
          <Link href="/privacy">Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}
