import type { Metadata } from 'next'
import {
  setupAnalyticsEvents,
  type BackendNeed,
  type UiNeed,
} from './setup-analytics-contract'
import { SetupAnalyticsLink, SetupAnalyticsView } from './setup-analytics'
import { SetupRecommendation } from './setup-recommendation'

export const metadata: Metadata = {
  title: 'Find Your Schedule-X Setup',
  description:
    'Answer two questions and get the Schedule-X setup that matches your calendar.',
}

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

function SetupToolbar({
  step,
  docsHref,
  docsDestination,
  ui,
}: {
  step: 1 | 2
  docsHref: string
  docsDestination: 'docs_calendar' | 'docs_premium'
  ui?: UiNeed
}) {
  return (
    <div className="setupToolbar">
      <Progress step={step} />
      <SetupAnalyticsLink
        className="setupDocsLink"
        href={docsHref}
        analyticsEvent={setupAnalyticsEvents.navigationClicked}
        analyticsProperties={{
          surface: step === 1 ? 'ui_question' : 'backend_question',
          action_id: 'skip_to_docs',
          destination_id: docsDestination,
          ...(ui ? { ui_need: ui } : {}),
        }}
      >
        Skip to docs →
      </SetupAnalyticsLink>
    </div>
  )
}

function UiQuestion() {
  return (
    <main className="setupWizard page-wrapper">
      <SetupAnalyticsView
        event={setupAnalyticsEvents.stepViewed}
        properties={{ step_id: 'ui' }}
      />
      <section className="setupQuestion" aria-labelledby="setup-ui-title">
        <SetupToolbar
          step={1}
          docsHref="/docs/calendar"
          docsDestination="docs_calendar"
        />
        <h1 id="setup-ui-title">What should your calendar do?</h1>
        <p className="setupIntro">
          First, tell us how people will use the calendar.
        </p>
        <div className="setupChoices">
          <SetupAnalyticsLink
            className="setupChoice"
            href="/setup?ui=display"
            analyticsEvent={setupAnalyticsEvents.uiSelected}
            analyticsProperties={{ ui_need: 'display' }}
          >
            <span className="setupChoice__number">01</span>
            <span className="setupChoice__icon" aria-hidden="true">
              ◫
            </span>
            <strong>Only display calendar events</strong>
            <span className="setupChoice__description">
              Show events in responsive views, with support for localization,
              dark mode, and 100+ configuration options.
            </span>
            <b>Choose display only →</b>
          </SetupAnalyticsLink>
          <SetupAnalyticsLink
            className="setupChoice"
            href="/setup?ui=interactive"
            analyticsEvent={setupAnalyticsEvents.uiSelected}
            analyticsProperties={{ ui_need: 'interactive' }}
          >
            <span className="setupChoice__number">02</span>
            <span className="setupChoice__icon isWarm" aria-hidden="true">
              ↕
            </span>
            <strong>Let users plan and edit</strong>
            <span className="setupChoice__description">
              Add interactive features like event drag &amp; drop, resizing,
              drawing, or add resource views and Gantt charts.
            </span>
            <b>Choose interactive calendar →</b>
          </SetupAnalyticsLink>
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
      <SetupAnalyticsView
        event={setupAnalyticsEvents.stepViewed}
        properties={{ step_id: 'backend', ui_need: ui }}
      />
      <section className="setupQuestion" aria-labelledby="setup-backend-title">
        <SetupToolbar
          step={2}
          docsHref={docsHref}
          docsDestination={
            ui === 'interactive' ? 'docs_premium' : 'docs_calendar'
          }
          ui={ui}
        />
        <SetupAnalyticsLink
          className="setupPrevious"
          href="/setup"
          analyticsEvent={setupAnalyticsEvents.navigationClicked}
          analyticsProperties={{
            surface: 'backend_question',
            action_id: 'back_to_ui',
            destination_id: 'setup_ui',
            ui_need: ui,
          }}
        >
          ← Back to UI choice <span>· {selectedLabel}</span>
        </SetupAnalyticsLink>
        <h1 id="setup-backend-title">
          Should we handle the calendar backend too?
        </h1>
        <p className="setupIntro">
          Choose whether you only need the frontend, or want Schedule-X to host
          calendar data and manage synchronization.
        </p>
        <div className="setupChoices">
          <SetupAnalyticsLink
            className="setupChoice"
            href={`/setup?ui=${ui}&backend=frontend`}
            analyticsEvent={setupAnalyticsEvents.backendSelected}
            analyticsProperties={{
              ui_need: ui,
              backend_need: 'frontend',
            }}
          >
            <span className="setupChoice__number">01</span>
            <span className="setupChoice__icon" aria-hidden="true">
              ⌁
            </span>
            <strong>No, frontend only</strong>
            <span className="setupChoice__description">
              I’ll store events and build any backend integration or
              synchronization myself.
            </span>
            <b>Keep my setup frontend-only →</b>
          </SetupAnalyticsLink>
          <SetupAnalyticsLink
            className="setupChoice"
            href={`/setup?ui=${ui}&backend=cloud`}
            analyticsEvent={setupAnalyticsEvents.backendSelected}
            analyticsProperties={{ ui_need: ui, backend_need: 'cloud' }}
          >
            <span className="setupChoice__number">02</span>
            <span className="setupChoice__icon isCloud" aria-hidden="true">
              ↻
            </span>
            <strong>Yes, handle it for me</strong>
            <span className="setupChoice__description">
              Ship your end-to-end calendar today—with hosted events,
              recurrence, real-time updates, and two-way Google Calendar sync
              already handled.
            </span>
            <b>Show me the end-to-end setup →</b>
          </SetupAnalyticsLink>
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
  return <SetupRecommendation ui={ui} backend={backend} />
}
