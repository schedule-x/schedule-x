type JsonObject = Record<string, unknown>

function typeName(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

function looksLikePlainDate(value: unknown): boolean {
  if (typeof value !== 'string') return false
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function looksLikeZonedDateTime(value: unknown): boolean {
  if (typeof value !== 'string') return false
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value) && value.includes('[')
}

function timeKind(value: unknown): 'plainDate' | 'zonedDateTime' | 'unknown' {
  if (looksLikePlainDate(value)) return 'plainDate'
  if (looksLikeZonedDateTime(value)) return 'zonedDateTime'

  if (typeof value === 'object' && value !== null) {
    const constructorName = (value as { constructor?: { name?: string } })
      .constructor?.name
    if (constructorName === 'PlainDate') return 'plainDate'
    if (constructorName === 'ZonedDateTime') return 'zonedDateTime'
  }

  return 'unknown'
}

export function validateEvent(event: JsonObject, calendars?: JsonObject) {
  const issues: string[] = []
  const warnings: string[] = []

  if (!('id' in event)) issues.push('Event is missing required property `id`.')
  if (!('start' in event))
    issues.push('Event is missing required property `start`.')
  if (!('end' in event))
    issues.push('Event is missing required property `end`.')

  if ('id' in event && !['string', 'number'].includes(typeName(event.id))) {
    issues.push('`id` should be a string or number.')
  }

  const startKind = timeKind(event.start)
  const endKind = timeKind(event.end)

  if (startKind === 'unknown') {
    warnings.push(
      '`start` should be Temporal.PlainDate for full-day events or Temporal.ZonedDateTime for timed events.'
    )
  }

  if (endKind === 'unknown') {
    warnings.push(
      '`end` should be Temporal.PlainDate for full-day events or Temporal.ZonedDateTime for timed events.'
    )
  }

  if (
    startKind !== 'unknown' &&
    endKind !== 'unknown' &&
    startKind !== endKind
  ) {
    issues.push(
      '`start` and `end` must use the same Temporal type. Do not mix PlainDate and ZonedDateTime in one event.'
    )
  }

  if (
    'calendarId' in event &&
    calendars &&
    typeof event.calendarId === 'string' &&
    !(event.calendarId in calendars)
  ) {
    warnings.push(
      '`calendarId` does not match any key in the provided calendars config.'
    )
  }

  if ('_options' in event && typeName(event._options) !== 'object') {
    issues.push('`_options` should be an object when provided.')
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    docs: ['https://schedule-x.dev/docs/calendar/events'],
  }
}

export function validateCalendarConfig(config: JsonObject) {
  const issues: string[] = []
  const warnings: string[] = []

  if (!Array.isArray(config.views) || config.views.length === 0) {
    issues.push('`views` must be a non-empty array of Schedule-X views.')
  }

  if ('events' in config && !Array.isArray(config.events)) {
    issues.push('`events` should be an array when provided.')
  }

  if ('selectedDate' in config && !looksLikePlainDate(config.selectedDate)) {
    warnings.push('`selectedDate` should be a Temporal.PlainDate.')
  }

  if (typeof config.dayBoundaries === 'object' && config.dayBoundaries) {
    const boundaries = config.dayBoundaries as JsonObject
    for (const key of ['start', 'end']) {
      const value = boundaries[key]
      if (typeof value !== 'string' || !/^\d{2}:00$/.test(value)) {
        issues.push(
          `dayBoundaries.${key} must be a whole hour string in HH:00 format.`
        )
      }
    }
  }

  if (!('plugins' in config)) {
    warnings.push(
      'Add @schedule-x/events-service when the app needs event CRUD after render.'
    )
  }

  warnings.push(
    'Make sure @schedule-x/theme-default/dist/index.css is imported unless the app provides a custom theme.'
  )

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    docs: ['https://schedule-x.dev/docs/calendar/configuration'],
  }
}
