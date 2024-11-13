import { Podkova } from 'next/font/google'
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
import 'rsuite/dist/rsuite-no-reset.min.css'

import Script from 'next/script'

const podkova = Podkova({
  subsets: ['latin-ext'],
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  let alxScript = false
  if (typeof window === 'object') alxScript = true

  return (
    <main className={podkova.className + ' main'}>
      <Component {...pageProps} />
      {alxScript && window?.location.hostname !== 'localhost' && (
        <Script
          data-domain="schedule-x.dev"
          src="https://analytics.schedule-x.com/js/script.js"
          defer
        />
      )}
      <Script>
        {`window.lemonSqueezyAffiliateConfig = { store: "schedule-x" };`}
      </Script>
      <Script src="https://lmsqueezy.com/affiliate.js" defer />
    </main>
  )
}
