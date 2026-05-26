const frameworkPackages: Record<string, string[]> = {
  vanilla: [
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    'temporal-polyfill',
  ],
  react: [
    '@schedule-x/react',
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    'temporal-polyfill',
  ],
  vue: [
    '@schedule-x/vue',
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    'temporal-polyfill',
  ],
  angular: [
    '@schedule-x/angular',
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    'temporal-polyfill',
  ],
  svelte: [
    '@schedule-x/svelte',
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    'temporal-polyfill',
  ],
  preact: [
    '@schedule-x/preact',
    '@schedule-x/calendar',
    '@schedule-x/theme-default',
    'temporal-polyfill',
  ],
}

const knownFrameworks = Object.keys(frameworkPackages)

function normalizeFramework(framework: string): string {
  const normalized = framework.toLowerCase().trim()
  return knownFrameworks.includes(normalized) ? normalized : 'vanilla'
}

export function getStarter(frameworkInput: string, features: string[] = []) {
  const framework = normalizeFramework(frameworkInput)
  const wantsEventsService = features.some((feature) =>
    ['crud', 'events-service', 'event updates', 'update events'].includes(
      feature.toLowerCase()
    )
  )
  const packages = [
    ...frameworkPackages[framework],
    ...(wantsEventsService ? ['@schedule-x/events-service'] : []),
  ]

  const pluginImport = wantsEventsService
    ? "import { createEventsServicePlugin } from '@schedule-x/events-service'\n"
    : ''
  const pluginCreate = wantsEventsService
    ? 'const eventsService = createEventsServicePlugin()\n\n'
    : ''
  const plugins = wantsEventsService ? ',\n  plugins: [eventsService]' : ''

  const vanillaCode = `import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar'
${pluginImport}import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

${pluginCreate}const calendar = createCalendar({
  views: [createViewMonthGrid()],
  events: [
    {
      id: 1,
      title: 'Coffee with Ada',
      start: Temporal.ZonedDateTime.from('2026-05-26T10:00:00+02:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2026-05-26T10:30:00+02:00[Europe/Berlin]'),
    },
  ]${plugins},
})

calendar.render(document.getElementById('calendar'))`

  const reactCode = `import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewMonthGrid } from '@schedule-x/calendar'
${pluginImport}import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

export function Calendar() {
  const calendar = useCalendarApp({
    views: [createViewMonthGrid()],
    events: [
      {
        id: 1,
        title: 'Coffee with Ada',
        start: Temporal.ZonedDateTime.from('2026-05-26T10:00:00+02:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2026-05-26T10:30:00+02:00[Europe/Berlin]'),
      },
    ]${plugins},
  })

  return <ScheduleXCalendar calendarApp={calendar} />
}`

  return {
    framework,
    install: `npm install ${packages.join(' ')}`,
    notes: [
      'Import @schedule-x/theme-default/dist/index.css unless the project provides its own theme.',
      'Use Temporal.PlainDate for full-day events and Temporal.ZonedDateTime for timed events.',
      'Use @schedule-x/events-service for event CRUD after render.',
    ],
    code: framework === 'react' ? reactCode : vanillaCode,
  }
}
