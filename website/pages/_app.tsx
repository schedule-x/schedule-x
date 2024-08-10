import { Podkova } from 'next/font/google'
import '../theme/index.scss'
import '../components/pages/landing-page.scss'
import '../components/pages/calendar-demo.scss'
import '../components/partials/card/card.scss'
import Script from 'next/script'

const podkova = Podkova({
  subsets: ['latin-ext'],
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  let alxScript = false
  if (typeof window === 'object') alxScript = true

  return <main className={podkova.className + ' main'}><Component {...pageProps} />
    {alxScript && window?.location.hostname !== 'localhost' && <Script data-domain="schedule-x.dev" src="https://analytics.schedule-x.com/js/script.js" defer />}
  </main>
}
