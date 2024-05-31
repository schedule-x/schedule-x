import { Podkova } from 'next/font/google'
import '../theme/index.scss'
import '../components/pages/landing-page.scss'
import '../components/pages/calendar-demo.scss'
import '../components/partials/card/card.scss'

const podkova = Podkova({
  subsets: ['latin-ext'],
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <main className={podkova.className + ' main'}><Component {...pageProps} /></main>
}
