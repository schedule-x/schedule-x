import { cloudCode, coreCode, premiumCode } from './setup-code'
import {
  getRecommendationAnalytics,
  setupAnalyticsEvents,
  type BackendNeed,
  type RecommendationDestinationId,
  type UiNeed,
} from './setup-analytics-contract'
import { SetupAnalyticsLink, SetupAnalyticsView } from './setup-analytics'

type Recommendation = {
  accent: 'core' | 'premium' | 'cloud'
  name: string
  reason: string
  tags: string[]
  codeLabel: string
  code: string
  primaryHref: string
  primaryLabel: string
  primaryDestination: RecommendationDestinationId
  secondaryHref: string
  secondaryLabel: string
  secondaryDestination: RecommendationDestinationId
  docsHref: string
  docsDestination: RecommendationDestinationId
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
      primaryDestination: 'cloud_signup',
      secondaryHref:
        'https://cloud.schedule-x.com/quickstart/with-calendar-sync/',
      secondaryLabel: 'Read the Cloud quickstart',
      secondaryDestination: 'cloud_sync_quickstart',
      docsHref: 'https://cloud.schedule-x.com/quickstart/',
      docsDestination: 'cloud_docs',
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
      primaryHref: '/premium?product=frontend#pricing',
      primaryLabel: 'Start 14-day trial',
      primaryDestination: 'premium_pricing',
      secondaryHref: '/demos/modal-and-sidebar',
      secondaryLabel: 'Preview an interactive demo',
      secondaryDestination: 'interactive_demo',
      docsHref: '/docs/calendar/installing-premium',
      docsDestination: 'docs_premium',
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
    primaryDestination: 'docs_calendar',
    secondaryHref: 'https://github.com/schedule-x/schedule-x',
    secondaryLabel: 'View the repository',
    secondaryDestination: 'github_repository',
    docsHref: '/docs/calendar',
    docsDestination: 'docs_calendar',
  }
}

export function SetupRecommendation({
  ui,
  backend,
}: {
  ui: UiNeed
  backend: BackendNeed
}) {
  const result = getRecommendation(ui, backend)
  const { pathId, recommendationId } = getRecommendationAnalytics(ui, backend)
  const recommendationProperties = {
    ui_need: ui,
    backend_need: backend,
    path_id: pathId,
    recommendation_id: recommendationId,
  }

  return (
    <main
      className={`setupWizard setupResult is-${result.accent} page-wrapper`}
    >
      <SetupAnalyticsView
        event={setupAnalyticsEvents.recommendationViewed}
        properties={recommendationProperties}
      />
      <div className="setupHeader">
        <span>Your setup</span>
        <SetupAnalyticsLink
          href={result.docsHref}
          analyticsEvent={setupAnalyticsEvents.recommendationClicked}
          analyticsProperties={{
            ...recommendationProperties,
            action_id: 'docs',
            destination_id: result.docsDestination,
          }}
        >
          Docs →
        </SetupAnalyticsLink>
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
            <SetupAnalyticsLink
              className="setupPrimaryAction"
              href={result.primaryHref}
              analyticsEvent={setupAnalyticsEvents.recommendationClicked}
              analyticsProperties={{
                ...recommendationProperties,
                action_id: 'primary',
                destination_id: result.primaryDestination,
              }}
            >
              {result.primaryLabel} →
            </SetupAnalyticsLink>
            <SetupAnalyticsLink
              className="setupSecondaryAction"
              href={result.secondaryHref}
              analyticsEvent={setupAnalyticsEvents.recommendationClicked}
              analyticsProperties={{
                ...recommendationProperties,
                action_id: 'secondary',
                destination_id: result.secondaryDestination,
              }}
            >
              {result.secondaryLabel} ↗
            </SetupAnalyticsLink>
          </div>
        </div>
        <div className="setupCodeArea">
          <div className="setupCode">
            <div className="setupCode__header">
              <span>{result.codeLabel}</span>
              <span className="setupCode__dots" aria-hidden="true">
                ● ● ●
              </span>
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
