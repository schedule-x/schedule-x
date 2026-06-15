import {
  ArrowRight,
  CalendarDays,
  Cloud,
  CloudCog,
  Database,
  SlidersHorizontal,
  Github,
  Network,
  ShieldCheck,
  Unplug,
} from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import LandingCalendarDemo from '@/components/landing-calendar-demo'
import Logo from '@/components/logo'

const customerLogos = [
  { src: '/images/logos/AkzoNobel_logo.png', alt: 'AkzoNobel' },
  { src: '/images/logos/eu-commission.png', alt: 'European Commission' },
  { src: '/images/logos/octave.png', alt: 'Octave' },
  { src: '/images/logos/logo-dover.png', alt: 'Dover' },
  { src: '/images/logos/ballys.png', alt: "Bally's" },
  { src: '/images/logos/osu.png', alt: 'Ohio State University' },
  { src: '/images/logos/keenfinity.png', alt: 'Keenfinity' },
  { src: '/images/logos/iService.png', alt: 'iService' },
  { src: '/images/logos/statushub.svg', alt: 'Status Hub' },
]

const testimonials = [
  {
    quote:
      'Schedule-X is great. Its flexibility and constant improvement distinguish it from similar community tools.',
    name: 'Vukadin Nedeljkovic',
    role: 'Team Lead',
  },
  {
    quote:
      "We're using the premium version of Schedule-X and have nothing but good things to say. It meets all our needs for a resource scheduling component being easy to work with, configurable, and extremely easy to integrate.",
    name: 'Mike',
    role: 'Co-Founder & CTO @ Zinya Global',
  },
]

const capabilities = [
  {
    icon: CloudCog,
    title: 'Cloud API',
    tags: ['Hosted'],
    description:
      'Create users, calendars, events, and browser tokens through a hosted API shaped around real scheduling interfaces.',
    action: 'Learn more',
    href: '/docs/cloud',
  },
  {
    icon: Unplug,
    title: 'Provider sync',
    tags: ['Google Calendar', 'Cloud'],
    description:
      'Connect Google Calendar accounts, map provider records, and keep events moving through recurring sync workflows.',
    action: 'Learn more',
    href: '/docs/cloud/google-calendar-sync',
  },
  {
    icon: CalendarDays,
    title: 'Schedule-X UI',
    tags: ['Open source'],
    description:
      'Use the same calendar engine across React, Vue, Angular, Svelte, and Preact with plugins, themes, and custom content.',
    action: 'Learn more',
    href: '/docs/frontend',
  },
  {
    icon: SlidersHorizontal,
    title: 'Configure',
    tags: ['Hundreds of options'],
    description:
      'Shape the Schedule-X calendar around your product with hundreds of options for views, plugins, interactions, localization, and custom rendering.',
    action: 'Learn more',
    href: '/docs/frontend/calendar/configuration',
  },
]

const cloudFeatures = [
  {
    icon: ShieldCheck,
    title: 'App-owned auth',
    description:
      'Your product keeps its own login. Schedule-X Cloud handles calendar users and short-lived frontend tokens for browser sessions.',
  },
  {
    icon: Database,
    title: 'Calendar records',
    description:
      'Create the core records your calendar product needs and persist event writes through browser or server workflows.',
  },
  {
    icon: Network,
    title: 'Provider sync',
    description:
      'Connect Google Calendar accounts and sync provider calendars without rebuilding the whole integration from scratch.',
  },
]

export default function HomePage() {
  return (
    <main className="sx-landing">
      <div className="sx-landing-shell">
        <header className="sx-header">
          <Link className="sx-brand" href="/">
            <Logo />
          </Link>
          <nav className="sx-header-links" aria-label="Main navigation">
            <Link href="/docs/cloud">Cloud docs</Link>
            <Link href="/docs/frontend">UI docs</Link>
            <Link className="sx-nav-github" href="https://github.com/schedule-x/schedule-x" target="_blank">
              <Github aria-hidden="true" size={18} />
              GitHub
            </Link>
            <Link className="sx-button sx-button-primary" href="/docs/cloud/quickstart">
              Get started
            </Link>
          </nav>
        </header>

        <section className="sx-hero">
          <div className="sx-hero-content">
            <h1>
              Calendar infrastructure from API to UI.
            </h1>
            <p className="sx-hero-copy">
              Hosted users, calendars, events, provider sync, short-lived
              browser tokens, and a polished Schedule-X interface your product
              can own.
            </p>
            <div className="sx-hero-actions">
              <Link className="sx-button sx-button-primary" href="/docs/cloud/quickstart">
                Start with Cloud
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="sx-button sx-button-secondary" href="/docs/frontend">
                UI library
              </Link>
              <Link className="sx-button sx-button-secondary" href="mailto:tom@schedule-x.dev">
                Request access
              </Link>
            </div>
            <div className="sx-hero-proof" aria-label="Schedule-X paths">
              <span>Hosted calendar backend</span>
              <span>Standalone UI components</span>
              <span>Sync-ready product workflows</span>
            </div>
          </div>

          <div className="sx-product-stage" aria-label="Schedule-X product preview">
            <span className="sx-demo-pill">Live interactive demo</span>
            <div className="sx-product-frame">
              <LandingCalendarDemo />
            </div>
          </div>
        </section>

        <section className="sx-capability-section" aria-label="Schedule-X product areas">
          <h2>Explore our features</h2>
          <div className="sx-capability-grid">
            {capabilities.map((capability) => {
              const Icon = capability.icon

              return (
                <article className="sx-capability-card" key={capability.title}>
                  <Icon className="sx-capability-icon" aria-hidden="true" size={38} strokeWidth={2.6} />
                  <h3>{capability.title}</h3>
                  <div className="sx-card-tags" aria-label={`${capability.title} tags`}>
                    {capability.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p>{capability.description}</p>
                  <AnimatedArrowLink href={capability.href}>{capability.action}</AnimatedArrowLink>
                </article>
              )
            })}
          </div>
          <AnimatedArrowLink className="sx-capability-more" href="/docs">
            Show all docs
          </AnimatedArrowLink>
        </section>

        <section className="sx-logo-section" aria-label="Schedule-X customers">
          <p>Used by teams at</p>
          <div className="sx-logo-rail">
            {[...customerLogos, ...customerLogos].map((logo, index) => (
              <div className="sx-logo-item" key={`${logo.alt}-${index}`}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </section>

        <section className="sx-section sx-cloud-section">
          <div className="sx-section-header">
            <h2>Everything behind a production calendar.</h2>
            <p>
              Keep your organization API token on the server, map your users to
              Cloud users, create calendars, issue short-lived browser tokens,
              and load config that the Schedule-X UI can render immediately.
            </p>
          </div>
          <div className="sx-feature-grid">
            {cloudFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <article className="sx-feature" key={feature.title}>
                  <span className="sx-feature-icon">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="sx-testimonials-section">
          <div className="sx-testimonials-copy">
            <span>Developer feedback</span>
            <h2>Trusted where calendar UI has to feel native.</h2>
          </div>
          <div className="sx-testimonials-grid">
            {testimonials.map((testimonial) => (
              <figure className="sx-testimonial" key={testimonial.name}>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="sx-section sx-system-section">
          <div className="sx-system-intro">
            <span>Product path</span>
            <h2>How do you want to build?</h2>
            <p>Two ways to ship calendar features.</p>
          </div>

          <div className="sx-system-builder">
            <div className="sx-system-switch" aria-label="Schedule-X adoption paths">
              <span>Cloud owns infrastructure</span>
              <span>Bring your own backend</span>
            </div>

            <div className="sx-system-options">
              <article className="sx-system-option sx-system-option-cloud">
                <span className="sx-system-option-icon">
                  <Cloud aria-hidden="true" size={54} />
                </span>
                <div className="sx-system-option-copy">
                  <h3>Use Schedule-X Cloud</h3>
                  <p>We run the infrastructure.</p>
                  <div className="sx-system-pills">
                    <span>
                      <Database aria-hidden="true" size={13} />
                      Hosted API
                    </span>
                    <span>
                      <ShieldCheck aria-hidden="true" size={13} />
                      Browser tokens
                    </span>
                    <span>
                      <CalendarDays aria-hidden="true" size={13} />
                      Data & sync
                    </span>
                  </div>
                  <Link className="sx-system-cta" href="/docs/cloud">
                    Cloud docs
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
              </article>

              <article className="sx-system-option sx-system-option-ui">
                <span className="sx-system-option-icon">
                  <CalendarDays aria-hidden="true" size={54} />
                </span>
                <div className="sx-system-option-copy">
                  <h3>Use Schedule-X UI</h3>
                  <p>You handle data and auth.</p>
                  <div className="sx-system-pills">
                    <span>
                      <SlidersHorizontal aria-hidden="true" size={13} />
                      Frameworks
                    </span>
                    <span>
                      <CloudCog aria-hidden="true" size={13} />
                      Plugins
                    </span>
                    <span>
                      <ShieldCheck aria-hidden="true" size={13} />
                      Themes
                    </span>
                    <span>
                      <Database aria-hidden="true" size={13} />
                      Persistence
                    </span>
                  </div>
                  <Link className="sx-system-cta" href="/docs/frontend">
                    UI docs
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function AnimatedArrowLink({
  children,
  className,
  href,
}: {
  children: ReactNode
  className?: string
  href: string
}) {
  return (
    <Link className={`sx-animated-link${className ? ` ${className}` : ''}`} href={href}>
      <span className="sx-link-arrow sx-link-arrow-before">
        <ArrowRight aria-hidden="true" size={18} />
      </span>
      <span className="sx-link-label">{children}</span>
      <span className="sx-link-arrow sx-link-arrow-after">
        <ArrowRight aria-hidden="true" size={18} />
      </span>
    </Link>
  )
}
