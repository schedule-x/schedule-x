import '@schedule-x/theme-default/dist/index.css'
import Card from '../components/partials/card/card'
import dragAndDropIconWhite from '../assets/icons/drag-and-drop-white.svg'
import darkModeWhite from '../assets/icons/dark-mode-white.svg'
import customizeIconWhite from '../assets/icons/customize-white.svg'
import resizeWhite from '../assets/icons/resize-white.svg'
import i18nWhite from '../assets/icons/i18n-white.svg'
import responsiveWhite from '../assets/icons/responsive-white.svg'
import Link from 'next/link'
import AppCalendar from '../components/partials/app-calendar/app-calendar'

import { Metadata } from 'next';
import TextValuePropDevs from '../components/partials/landing-page/text-value-prop-devs'
import TextValuePropPremium from '../components/partials/landing-page/text-value-prop-premium'
import LogoSlide from '../components/partials/landing-page/logo-slide'
import Testimonials from '../components/partials/testimonials/testimonials'
import CloudPromotion from '../components/partials/cloud-promotion/cloud-promotion'

export const metadata: Metadata = {
  title: 'Modern JavaScript Event Calendar',
  description: 'Modern JavaScript Event calendar for React, Angular, Vue and plain JS. Modern alternative to Fullcalendar. Drag & drop, dark mode, event resizing and more.',
}

export default function LandingPage() {
  return (
    <>
      <div className={'landingPage page-wrapper'}>
        <section className="landingHero" aria-labelledby="landing-hero-title">
          <p className="pageEyebrow">Open-source calendar UI for developers</p>
          <h1 id="landing-hero-title">
            The modern JavaScript event calendar
          </h1>

          <h2>
            A modern JavaScript event calendar with the views, interactions,
            and framework integrations you need to move from prototype to production.
          </h2>

          <div className={'landingPageActions'}>
            <Link className="landingPageAction buttonPrimary" href={'/docs/calendar'}>
              <span>Get started</span><span aria-hidden="true">→</span>
            </Link>

            <Link className="landingTextLink" href={'https://github.com/schedule-x/schedule-x'} target="_blank">
              View on GitHub <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <div className="platformStrip" aria-label="Schedule-X highlights">
          <span>React, Vue, Angular, Svelte</span>
          <span>Responsive by default</span>
          <span>i18n support</span>
          <span>Drag and drop</span>
          <span>Dark mode</span>
        </div>

        <section className="calendarShowcase" aria-label="Interactive Schedule-X calendar demo">
          <div className="calendarShowcase__topline">
            <span>Interactive demo</span>
            <span>Built with Schedule-X</span>
          </div>
          <AppCalendar/>
          <div className="calendarShowcase__caption">
            <span>A production-ready calendar, running directly in the browser.</span>
            <Link href="/demos/calendar">Open full demo →</Link>
          </div>
        </section>

        <LogoSlide />

        <Testimonials />

        <section className={'landingPageSection'}>
          <div className={'features-heading'}>
            <TextValuePropDevs />
          </div>

          <div className={'landingPageCards'}>
            <Card
              icon={customizeIconWhite}
              title={'Customizable'}
              description={
                'Choose which views to display, set custom day boundaries or even write a plugin.'
              }
            />

            <Card
              icon={dragAndDropIconWhite}
              title={'Drag and drop'}
              description={'Reschedule events through a classic drag and drop.'}
            />

            <Card
              icon={resizeWhite}
              title={'Event resizing'}
              description={
                'Resize events by dragging the edges.'
              }
            />
          </div>

          <div className={'landingPageCards'}>
            <Card
              icon={darkModeWhite}
              title={'Dark mode'}
              description={
                'Built with light- and dark modes in mind. Toggle between them, simply by calling a method.'
              }
            />

            <Card
              icon={i18nWhite}
              title={'i18n'}
              description={'Supports multiple languages out of the box.'}
            />

            <Card
              icon={responsiveWhite}
              title={'Responsive'}
              description={
                'Works on all devices, from desktop to mobile'
              }
            />
          </div>
        </section>

        <section className={'landingPageSection premiumLandingSection hasMarginBottom'}>
          <div className={'features-heading'}>
            <TextValuePropPremium />

            <ul>
              <li>
                <span>Build event modal- and form with recurrence options ~100 hours</span>
                <span className="comparisonStatus isNegative" aria-label="Not included">×</span>
              </li>
              <li>
                <span>Build Drag-to-create ~40 hours</span>
                <span className="comparisonStatus isNegative" aria-label="Not included">×</span>
              </li>
              <li>
                <span>Build Resource view ~100 hours</span>
                <span className="comparisonStatus isNegative" aria-label="Not included">×</span>
              </li>
              <li>
                <span>Install and configure Schedule-X premium ~1 hour</span>
                <span className="comparisonStatus isPositive" aria-label="Included">✓</span>
              </li>
            </ul>

            <Link href={'/premium'}>
              <button className={'landingPageAction buttonPrimary hasMarginBottom'}>
                Get premium →
              </button>
            </Link>

            <video autoPlay loop playsInline muted id={'demo'} className="landingPageDemoVideo" width={1000}
                   height={390}>
              <source src={'https://d19hgxvhjb2new.cloudfront.net/website/premium-demo.mp4'} type={'video/mp4'}/>
            </video>
          </div>
        </section>

        <CloudPromotion />

      </div>
    </>
  )
}
