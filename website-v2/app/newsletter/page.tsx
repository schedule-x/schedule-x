import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter signup',
  description: 'Sign up for the Schedule-X newsletter to receive updates on new features, tutorials, and more.',
}

export default function NewsletterPage() {
  return (
    <main className="sx-content-page sx-newsletter-page">
      <h1>Newsletter signup</h1>
      <iframe
        allowFullScreen
        className="sx-newsletter-frame"
        src="https://a467ac2a.sibforms.com/serve/MUIFACtCuvb75u3td5WtQzf9goaBLPgZ7_dILA_rNsAZGiRpAquo-rw4Gw7r7gM2UX8_Y9F0rWZ7mVTrisYvy_r-ex8j2crcI2rVFgUMvqWzTPifp_GRBDhCTLFEbrPYxxbn_271P1vN29wlB0XoOFGzlUPFobTCfFTIl5a-H2lRKPNIdco0wF91dSygQvgrrNg2xD0_TW2XQk0a"
        title="Schedule-X newsletter signup"
      />
    </main>
  )
}
