import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RecurrenceSet } from '../../../../recurrence/src'
import {
  parseTemporalToRFC5545,
  parseRFC5545ToTemporal,
} from '../../../../recurrence/src/parsers/rrule/parse-rrule'
import { compareTemporalDates } from '../../../../recurrence/src/rrule/utils/stateless/iterator-utils'
import {
  AugmentedBackgroundEvent,
  AugmentedEvent,
} from '../../types/augmented-event'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

export const createRecurrencesForEvent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  rrule: string,
  range: DateRange,
  exdate?: string[] | undefined
) => {
  // Parse exdate strings to Temporal objects matching the event's date type
  const parsedExdate = exdate?.map((dateStr) =>
    parseRFC5545ToTemporal(dateStr, $app.config.timezone.value)
  )

  // if there is no count or until in the rrule, set an until date to range.end
  // Ensure the UNTIL type matches the event's start type
  if (!rrule.includes('COUNT') && !rrule.includes('UNTIL')) {
    if (!rrule.endsWith(';')) rrule += ';'
    // Convert range.end to match the type of calendarEvent.start if needed
    let until: Temporal.ZonedDateTime | Temporal.PlainDate = range.end
    if (calendarEvent.start instanceof Temporal.PlainDate) {
      // range.end is typed as ZonedDateTime; convert to PlainDate when the event is all-day
      until = (range.end as Temporal.ZonedDateTime).toPlainDate()
    }
    rrule += `UNTIL=${parseTemporalToRFC5545(until)};`
  }

  const recurrenceSet = new RecurrenceSet({
    dtstart: calendarEvent.start,
    dtend: calendarEvent.end,
    rrule,
    exdate: parsedExdate,
    timezone: $app.config.timezone.value,
  }).getRecurrences()

  if (!recurrenceSet || recurrenceSet.length === 0) return []

  if (compareTemporalDates(recurrenceSet[0].start, calendarEvent.start) === 0) {
    recurrenceSet.splice(0, 1) // skip the first occurrence because this is the original event
  }

  return recurrenceSet.map((recurrence) => {
    const eventCopy: AugmentedEvent = deepCloneEvent(calendarEvent, $app)
    eventCopy.start = recurrence.start
    eventCopy.end = recurrence.end
    eventCopy.isCopy = true

    return eventCopy
  })
}

export const createRecurrencesForBackgroundEvent = (
  $app: CalendarAppSingleton,
  backgroundEvent: BackgroundEvent,
  rrule: string,
  range: DateRange,
  exdate?: string[] | undefined
) => {
  // Parse exdate strings to Temporal objects matching the event's date type
  const parsedExdate = exdate?.map((dateStr) =>
    parseRFC5545ToTemporal(dateStr, $app.config.timezone.value)
  )

  // if there is no count or until in the rrule, set an until date to range.end
  // Ensure the UNTIL type matches the event's start type
  if (!rrule.includes('COUNT') && !rrule.includes('UNTIL')) {
    if (!rrule.endsWith(';')) rrule += ';'
    // Convert range.end to match the type of backgroundEvent.start if needed
    let until: Temporal.ZonedDateTime | Temporal.PlainDate = range.end
    if (backgroundEvent.start instanceof Temporal.PlainDate) {
      until = (range.end as Temporal.ZonedDateTime).toPlainDate()
    }
    rrule += `UNTIL=${parseTemporalToRFC5545(until)};`
  }

  const recurrenceSet = new RecurrenceSet({
    dtstart: backgroundEvent.start,
    dtend: backgroundEvent.end,
    rrule,
    exdate: parsedExdate,
    timezone: $app.config.timezone.value,
  }).getRecurrences()

  if (!recurrenceSet || recurrenceSet.length === 0) return []

  if (
    compareTemporalDates(recurrenceSet[0].start, backgroundEvent.start) === 0
  ) {
    recurrenceSet.splice(0, 1) // skip the first occurrence because this is the original event
  }

  return recurrenceSet.map((recurrence) => {
    const eventCopy: AugmentedBackgroundEvent = structuredClone(backgroundEvent)
    eventCopy.start = recurrence.start
    eventCopy.end = recurrence.end
    eventCopy.isCopy = true
    return eventCopy
  })
}
