import { ThemeSwitch } from 'nextra-theme-docs'
import { usePathname } from 'next/navigation'

export default function CustomFooter() {
  const path = usePathname()

  return (
    <footer
      style={{ paddingTop: '1.5em', paddingBottom: '1.5em', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}
      className="nx-bg-gray-100 nx-pb-[env(safe-area-inset-bottom)] dark:nx-bg-neutral-900 print:nx-bg-transparent">

      {path === '/' && (
        <div style={{ marginBottom: '1em' }}
             className="footer-theme-switch nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
          <ThemeSwitch/>
        </div>
      )}

      <div
        style={{ marginBottom: '1em' }}
        className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">©
        2023-present Tom Österlund, Schedule-X
      </div>

      <div
        style={{ marginBottom: '1em', textDecoration: 'underline' }}
        className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)]">
        <a href="/newsletter">Newsletter</a>
      </div>

      <div
        style={{ textDecoration: 'underline' }}
        className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)]">
        <a href="/imprint">Imprint</a>
      </div>
    </footer>
  )
}
