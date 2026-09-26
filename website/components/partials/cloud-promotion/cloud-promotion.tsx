import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

const backendCode: ReactNode[] = [
  <><span className={'cloudCodeKeyword'}>import</span> {'{ ScheduleXServerClient }'}</>,
  <><span className={'cloudCodeKeyword'}>from</span> <span className={'cloudCodeString'}>&apos;@schedule-x-cloud/sdk/server&apos;</span></>,
  '\u00a0',
  <><span className={'cloudCodeKeyword'}>const</span> scheduleX =</>,
  <>  <span className={'cloudCodeKeyword'}>new</span> <span className={'cloudCodeFunction'}>ScheduleXServerClient</span>({'{'}</>,
  <>    <span className={'cloudCodeProperty'}>apiKey</span>: process.env.CLOUD_API_TOKEN!,</>,
  <>    <span className={'cloudCodeProperty'}>organizationId</span>: process.env.CLOUD_ORG_ID!,</>,
  '  })',
  '\u00a0',
  <>app.<span className={'cloudCodeFunction'}>post</span>(<span className={'cloudCodeString'}>&apos;/api/schedule-x/token&apos;</span>, <span className={'cloudCodeKeyword'}>async</span> (req, res) ={'>'} {'{'}</>,
  <>  <span className={'cloudCodeKeyword'}>const</span> session = <span className={'cloudCodeKeyword'}>await</span> scheduleX.auth</>,
  <>    .<span className={'cloudCodeFunction'}>createFrontendSession</span>({'{'}</>,
  <>      <span className={'cloudCodeProperty'}>externalUserId</span>: req.user.id,</>,
  '    })',
  '\u00a0',
  <>  res.<span className={'cloudCodeFunction'}>json</span>(session)</>,
  '})',
]

const frontendCode: ReactNode[] = [
  <><span className={'cloudCodeKeyword'}>import</span> {'{ createScheduleXCloudCalendar }'}</>,
  <><span className={'cloudCodeKeyword'}>from</span> <span className={'cloudCodeString'}>&apos;@schedule-x-cloud/sdk&apos;</span></>,
  '\u00a0',
  <><span className={'cloudCodeKeyword'}>const</span> getFrontendToken = <span className={'cloudCodeKeyword'}>async</span> () ={'>'}</>,
  <>  <span className={'cloudCodeFunction'}>fetch</span>(<span className={'cloudCodeString'}>&apos;/api/schedule-x/token&apos;</span>, {'{'}</>,
  <>    <span className={'cloudCodeProperty'}>method</span>: <span className={'cloudCodeString'}>&apos;POST&apos;</span>,</>,
  '  })',
  <>    .<span className={'cloudCodeFunction'}>then</span>((response) ={'>'}</>,
  <>      response.<span className={'cloudCodeFunction'}>json</span>()</>,
  '    )',
  <>    .<span className={'cloudCodeFunction'}>then</span>(({'{ token }'}) ={'>'} token)</>,
  '\u00a0',
  <><span className={'cloudCodeKeyword'}>const</span> calendar =</>,
  <>  <span className={'cloudCodeFunction'}>createScheduleXCloudCalendar</span>({'{'}</>,
  <>    <span className={'cloudCodeProperty'}>getFrontendToken</span>,</>,
  <>    <span className={'cloudCodeProperty'}>initialProviderSync</span>: <span className={'cloudCodeLiteral'}>true</span>,</>,
  '  })',
  '\u00a0',
  <>calendar.<span className={'cloudCodeFunction'}>render</span>(</>,
  <>  document.<span className={'cloudCodeFunction'}>getElementById</span>(<span className={'cloudCodeString'}>&apos;calendar&apos;</span>)!</>,
  ')',
]

function CodeSnippet({ lines }: { lines: ReactNode[] }) {
  return (
    <ol className={'cloudCodeLines'}>
      {lines.map((line, index) => (
        <li key={index}><code>{line}</code></li>
      ))}
    </ol>
  )
}

export default function CloudPromotion() {
  return (
    <section className={'cloudSection'} aria-labelledby={'cloud-section-heading'}>
      <Image
        className={'sectionImage'}
        src={'/images/website_section_fade_inclined.svg'}
        alt={''}
        width={1400}
        height={479}
      />

      <div className={'features-heading cloudSectionHeading'}>
        <div className={'featuresText'}>Schedule-X Cloud</div>

        <h3 id={'cloud-section-heading'}>
          End-to-End calendar in a few lines of code
        </h3>

        <p>
          Pair the Premium calendar UI with a fully managed backend for users,
          calendars, events, and two-way Google Calendar sync.
        </p>
      </div>

      <ul className={'cloudSectionCapabilities'} aria-label={'Cloud capabilities'}>
        <li><span aria-hidden={'true'}>✓</span> Managed backend</li>
        <li><span aria-hidden={'true'}>✓</span> Real-time updates</li>
        <li><span aria-hidden={'true'}>✓</span> Google Calendar sync</li>
      </ul>

      <div className={'cloudIntegrationPanel'}>
        <div className={'cloudIntegrationBar'}>
          <div className={'cloudWindowControls'} aria-hidden={'true'}>
            <span />
            <span />
            <span />
          </div>
          <span className={'cloudIntegrationTitle'}>schedule-x-cloud / quickstart</span>
          <span className={'cloudIntegrationMeta'}>2 steps · TypeScript</span>
        </div>

        <div className={'cloudSectionExamples'}>
          <article className={'cloudCodeCard'}>
            <header>
              <div>
                <span className={'cloudCodeStep'}>1</span>
                <div>
                  <span className={'cloudCodeEyebrow'}>Backend</span>
                  <h4>Create a secure session</h4>
                </div>
              </div>
              <span className={'cloudCodeFilename'}>server.ts</span>
            </header>

            <CodeSnippet lines={backendCode} />
          </article>

          <article className={'cloudCodeCard'}>
            <header>
              <div>
                <span className={'cloudCodeStep'}>2</span>
                <div>
                  <span className={'cloudCodeEyebrow'}>Frontend</span>
                  <h4>Render the synced calendar</h4>
                </div>
              </div>
              <span className={'cloudCodeFilename'}>calendar.ts</span>
            </header>

            <CodeSnippet lines={frontendCode} />
          </article>
        </div>

        <div className={'cloudIntegrationResult'}>
          <span className={'cloudResultIcon'} aria-hidden={'true'}>✓</span>
          <div className={'cloudIntegrationResultCopy'}>
            <strong>Calendar connected</strong>
            <span className={'cloudIntegrationResultDescription'}>
              Premium UI, managed data, and Google Calendar stay in sync.
            </span>
          </div>
        </div>
      </div>

      <div className={'cloudSectionActions'}>
        <Link
          className={'landingPageAction buttonPrimary'}
          href={'https://cloud.schedule-x.com/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Explore Schedule-X Cloud →
        </Link>
        <Link
          className={'cloudSectionDocsLink'}
          href={'https://cloud.schedule-x.com/quickstart/with-calendar-sync/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          Read the quickstart
        </Link>
      </div>
    </section>
  )
}
