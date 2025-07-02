export default function CustomFooter() {
  return (
    <footer
      style={{ paddingTop: '1.5em', paddingBottom: '1.5em', borderTop: '1px solid rgba(0, 0, 0, 0.06)', backgroundColor: 'rgba(243,244,246)' }}
      className="nx-pb-[env(safe-area-inset-bottom)] print:nx-bg-transparent">

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', maxWidth: '1440px', margin: '0 auto', color: 'rgb(75, 85, 99)' }}>
        <div>
          <div
            style={{ marginBottom: '1em' }}
            className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">©
            2023-present
          </div>

          <div
            style={{ marginBottom: '1em' }}
            className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
            Tom Österlund, Schedule-X
          </div>
        </div>

        <div className={'footer-links'} style={{ marginInlineEnd: '2em' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.75em' }}>Company</h3>

          <div
            style={{ marginBottom: '0.75em', textDecoration: 'underline' }}>
            <a href="/newsletter">Newsletter</a>
          </div>

          <div
            style={{ marginBottom: '0.75em', textDecoration: 'underline' }}>
            <a href="/imprint">Imprint</a>
          </div>

          <div
            style={{ marginBottom: '0.75em', textDecoration: 'underline' }}>
            <a href="/procurement">Procurement</a>
          </div>
        </div>

        <div className={'footer-links'}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.75em' }}>Resources</h3>

          <div
            style={{ marginBottom: '0.75em', textDecoration: 'underline' }}>
            <a href="/affiliate-program">Affiliate program</a>
          </div>

          <div
            style={{ marginBottom: '0.75em', textDecoration: 'underline' }}>
            <a href="/attributions">Attributions</a>
          </div>

          <div
            style={{ textDecoration: 'underline' }}>
            <a href="/privacy">Privacy policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
