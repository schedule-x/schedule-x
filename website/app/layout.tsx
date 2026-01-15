import '../theme/index.scss'
import '../components/pages/landing-page.scss'
import '../components/pages/calendar-demo.scss'
import '../components/partials/card/card.scss'

import '../components/pages/premium.scss'
import '../components/partials/card/card.scss'
import '../components/partials/sales-card/sales-card.scss'

import '@schedule-x/theme-default/dist/index.css'
import '@schedule-x/timezone-select/index.css'
import '@sx-premium/sidebar/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import '@sx-premium/drag-to-create/index.css'
import '@sx-premium/resource-scheduler/index.css'
import '@sx-premium/scheduling-assistant/index.css'
import '@sx-premium/time-grid-resource-view/index.css'
import '../components/partials/app-dropdown/app-dropdown.scss'
import '../components/partials/pricing-card/pricing-card.scss'
import 'rsuite/dist/rsuite-no-reset.min.css';
import 'swiper/css';
import '@fontsource-variable/podkova';

import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import React from "react";

import Script from 'next/script'
import CookieConsent from '../components/CookieConsent'
import Logo from '../components/theme/logo'
import CustomFooter from '../components/theme/custom-footer'

  const navbar = (
    <Navbar
      chatLink={'https://discord.gg/GyJQAxRgNF'}
      logo={<Logo />}
      // ... Your additional navbar options
    />
  )

  export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html
        // Not required, but good for SEO
        lang="en"
        // Required to be set
        dir="ltr"
        // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
        suppressHydrationWarning
      >
      <Head
        // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          nextThemes={{
            forcedTheme: 'light',
          }}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/schedule-x/schedule-x/tree/main/website"
          footer={<CustomFooter />}
          /* banner={<Banner key="v3-is-here" storageKey="v3-is-here" dismissible={false}>
            <a href="/docs/calendar/major-version-migrations" target="_blank">
              <span style={{ backgroundColor: '#f6e05e', color: '#000', borderRadius: '4px', padding: '2px 6px', marginRight: '5px', fontSize: '0.75rem' }}>
              v3
              </span>
              is here! Temporal API, timezones, and more  🥳
            </a>
          </Banner>} */
        >
          {children}
        </Layout>

        <Script src="https://app.lemonsqueezy.com/js/lemon.js"/>
        
        <Script data-domain="schedule-x.dev" src="https://analytics.schedule-x.com/js/script.js" defer/>

        <Script>
          {`window.lemonSqueezyAffiliateConfig = { store: "schedule-x" };`}
        </Script>

        <Script src="https://lmsqueezy.com/affiliate.js" defer/>
        <CookieConsent />
      </body>
      </html>
    )
  }
