import '../theme/index.scss'
import '../components/pages/landing-page.scss'
import '../components/pages/calendar-demo.scss'
import '../components/partials/card/card.scss'

import '../components/pages/premium.scss'
import '../components/partials/card/card.scss'
import '../components/partials/sales-card/sales-card.scss'

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/sidebar/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import '@sx-premium/drag-to-create/index.css'
import '@sx-premium/resource-scheduler/index.css'
import '@sx-premium/scheduling-assistant/index.css'
import '../components/partials/app-dropdown/app-dropdown.scss'
import '../components/partials/pricing-card/pricing-card.scss'
import 'rsuite/dist/rsuite-no-reset.min.css';
import 'swiper/css';
import '@fontsource-variable/podkova';

import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import React from "react";
import Image from "next/image";

import Script from 'next/script'
import CookieConsent from '../components/CookieConsent'

// This default export is required in a new `pages/_app.js` file.
/* export default function MyApp({ Component, pageProps }) {
  let alxScript = false
  if (typeof window === 'object') alxScript = true

  return <main className={'main'}><Component {...pageProps} />
    <Script src="https://app.lemonsqueezy.com/js/lemon.js"/>
    {alxScript && window?.location.hostname !== 'localhost' &&
      <Script data-domain="schedule-x.dev" src="https://analytics.schedule-x.com/js/script.js" defer/>}
    <Script>
      {`window.lemonSqueezyAffiliateConfig = { store: "schedule-x" };`}
    </Script>
    <Script src="https://lmsqueezy.com/affiliate.js" defer/>
    <Script src="https://widget.senja.io/widget/68874853-36dd-407e-86f3-b6f17ba0fa99/platform.js"
            type="text/javascript" async></Script>
    <CookieConsent />
  </main>
} */
  const navbar = (
    <Navbar
      logo={<><Image src={'/tarvis_logo.png'} width={120} height={80} alt={'Tarvis logo'} /></>}
      // ... Your additional navbar options
    />
  )
  const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

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
        navbar={navbar}
        pageMap={await getPageMap()}
        docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
        footer={footer}
      >
        {children}
      </Layout>
      <Script data-domain={'tarvis.dev'} src={'https://analytics.schedule-x.com/js/script.js'} defer/>
      </body>
      </html>
    )
  }
