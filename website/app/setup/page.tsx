import type { Metadata } from 'next'
import Link from 'next/link'
import { cloudCode, coreCode, premiumCode } from './setup-code'

export const metadata: Metadata = {
  title: 'Find Your Schedule-X Setup',
  description:
    'Answer two questions and get the Schedule-X setup that matches your calendar.',
}

type UiNeed = 'display' | 'interactive'
type BackendNeed = 'cloud' | 'frontend'
type SearchParams = Promise<Record<string, string | string[] | undefined>>

const getValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

const getUiNeed = (value: string | undefined): UiNeed | undefined =>
  value === 'display' || value === 'interactive' ? value : undefined

const getBackendNeed = (value: string | undefined): BackendNeed | undefined =>
  value === 'cloud' || value === 'frontend' ? value : undefined

function Progress({ step }: { step: 1 | 2 }) {
  return (
    <div className="setupProgress" aria-label={`Step ${step} of 2`}>
      <span>{step} of 2</span>
      <span className="setupProgress__track" aria-hidden="true">
        <span style={{ width: step === 1 ? '50%' : '100%' }} />
      </span>
    </div>
  )
}

function SetupToolbar({ step, docsHref }: { step: 1 | 2; docsHref: string }) {
  return (
    <div className="setupToolbar">
      <Progress step={step} />
      <Link className="setupDocsLink" href={docsHref}>
        Skip to docs →
      </Link>
    </div>
  )
}

function UiQuestion() {
  return (
    <main className="setupWizard page-wrapper">
      <section className="setupQuestion" aria-labelledby="setup-ui-title">
        <SetupToolbar step={1} docsHref="/docs/calendar" />
        <h1 id="setup-ui-title">What should your calendar do?</h1>
        <p className="setupIntro">
          First, tell us how people will use the calendar.
        </p>
        <div className="setupChoices">
          <Link className="setupChoice" href="/setup?ui=display">
            <span className="setupChoice__number">01</span>
            <span className="setupChoice__icon" aria-hidden="true">
              ◫
            </span>
            <strong>Only display calendar events</strong>
            <span>
              Show events in responsive views, with support for localization,
              dark mode, and 100+ configuration options.
            </span>
            <b>Choose display only →</b>
          </Link>
          <Link className="setupChoice" href="/setup?ui=interactive">
            <span className="setupChoice__number">02</span>
            <span className="setupChoice__icon isWarm" aria-hidden="true">
              ↕
            </span>
            <strong>Let users plan and edit</strong>
            <span>
              Add interactive features like event drag &amp; drop, resizing,
              drawing, or add resource views and Gantt charts.
            </span>
            <b>Choose interactive calendar →</b>
          </Link>
        </div>
        <p className="setupPrivacy">
          No signup or email required to see your recommendation.
        </p>
      </section>
    </main>
  )
}

function BackendQuestion({ ui }: { ui: UiNeed }) {
  const selectedLabel =
    ui === 'interactive' ? 'Let users plan and edit' : 'Display calendar events'
  const docsHref =
    ui === 'interactive'
      ? '/docs/calendar/installing-premium'
      : '/docs/calendar'

  return (
    <main className="setupWizard page-wrapper">
      <section className="setupQuestion" aria-labelledby="setup-backend-title">
        <SetupToolbar step={2} docsHref={docsHref} />
        <Link className="setupPrevious" href="/setup">
          ← Back to UI choice <span>· {selectedLabel}</span>
        </Link>
        <h1 id="setup-backend-title">
          Should we handle the calendar backend too?
        </h1>
        <p className="setupIntro">
          Choose whether you only need the frontend, or want Schedule-X to host
          calendar data and manage synchronization.
        </p>
        <div className="setupChoices">
          <Link
            className="setupChoice"
            href={`/setup?ui=${ui}&backend=frontend`}
          >
            <span className="setupChoice__number">01</span>
            <span className="setupChoice__icon" aria-hidden="true">
              ⌁
            </span>
            <strong>No, frontend only</strong>
            <span>
              I’ll store events and build any backend integration or
              synchronization myself.
            </span>
            <b>Keep my setup frontend-only →</b>
          </Link>
          <Link className="setupChoice" href={`/setup?ui=${ui}&backend=cloud`}>
            <span className="setupChoice__number">02</span>
            <span className="setupChoice__icon isCloud" aria-hidden="true">
              ↻
            </span>
            <strong>Yes, handle it for me</strong>
            <span>
              Ship your end-to-end calendar today—with hosted events,
              recurrence, real-time updates, and two-way Google Calendar sync
              already handled.
            </span>
            <b>Show me the end-to-end setup →</b>
          </Link>
        </div>
      </section>
    </main>
  )
}

type Recommendation = {
  accent: 'core' | 'premium' | 'cloud'
  name: string
  reason: string
  tags: string[]
  codeLabel: string
  code: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  docsHref: string
}

function getRecommendation(ui: UiNeed, backend: BackendNeed): Recommendation {
  if (backend === 'cloud') {
    return {
      accent: 'cloud',
      name: 'Cloud',
      reason:
        'You want Schedule-X to host calendar data and manage synchronization. Cloud combines the right calendar UI with the complete backend and provider-sync layer.',
      tags: ['Hosted data', 'Recurring events', 'Google sync'],
      codeLabel: 'schedule-x-cloud / quickstart',
      code: cloudCode,
      primaryHref: 'https://cloud.schedule-x.com/console/signup',
      primaryLabel: 'Start building free',
      secondaryHref:
        'https://cloud.schedule-x.com/quickstart/with-calendar-sync/',
      secondaryLabel: 'Read the Cloud quickstart',
      docsHref: 'https://cloud.schedule-x.com/quickstart/',
    }
  }

  if (ui === 'interactive') {
    return {
      accent: 'premium',
      name: 'Premium',
      reason:
        'You want users to plan and edit, but you’ll manage event storage yourself. Premium adds advanced interactions without requiring Schedule-X Cloud.',
      tags: ['Plan and edit', 'Frontend only', 'Your backend'],
      codeLabel: 'schedule-x-premium / interactive calendar',
      code: premiumCode,
      primaryHref: '/premium#pricing',
      primaryLabel: 'Start 14-day trial',
      secondaryHref: '/demos/modal-and-sidebar',
      secondaryLabel: 'Preview an interactive demo',
      docsHref: '/docs/calendar/installing-premium',
    }
  }

  return {
    accent: 'core',
    name: 'Open Source',
    reason:
      'You only need to display events and you’ll manage the data yourself. The open-source calendar gives you the complete frontend without a paid license or hosted backend.',
    tags: ['Display events', 'Frontend only', 'MIT licensed'],
    codeLabel: 'schedule-x / calendar',
    code: coreCode,
    primaryHref: '/docs/calendar',
    primaryLabel: 'Open the docs',
    secondaryHref: 'https://github.com/schedule-x/schedule-x',
    secondaryLabel: 'View the repository',
    docsHref: '/docs/calendar',
  }
}

function Recommendation({ ui, backend }: { ui: UiNeed; backend: BackendNeed }) {
  const result = getRecommendation(ui, backend)

  return (
    <main
      className={`setupWizard setupResult is-${result.accent} page-wrapper`}
    >
      <div className="setupHeader">
        <span>Your setup</span>
        <Link href={result.docsHref}>Docs →</Link>
      </div>
      <section
        className="setupResult__body"
        aria-labelledby="setup-result-title"
      >
        <div className="setupResult__copy">
          <p className="setupResult__eyebrow">Your recommended setup</p>
          <h1 id="setup-result-title">
            Schedule-X <span>{result.name}</span>
          </h1>
          <p className="setupResult__reason">{result.reason}</p>
          <ul className="setupTags" aria-label="Selected requirements">
            {result.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="setupResult__actions">
            <Link className="setupPrimaryAction" href={result.primaryHref}>
              {result.primaryLabel} →
            </Link>
            <Link className="setupSecondaryAction" href={result.secondaryHref}>
              {result.secondaryLabel} ↗
            </Link>
          </div>
        </div>
        <div className="setupCodeArea">
          <div className="setupCode">
            <div className="setupCode__header">
              <span>{result.codeLabel}</span>
              <span aria-hidden="true">● ● ●</span>
            </div>
            <pre>
              <code>{result.code}</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function SetupPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const ui = getUiNeed(getValue(params.ui))
  const backend = getBackendNeed(getValue(params.backend))

  if (!ui) return <UiQuestion />
  if (!backend) return <BackendQuestion ui={ui} />
  return <Recommendation ui={ui} backend={backend} />
}
