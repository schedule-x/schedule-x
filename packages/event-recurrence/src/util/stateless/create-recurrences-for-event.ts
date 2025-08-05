import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RecurrenceSet } from '../../../../recurrence/src'
import { parseRFC5545ToSX, parseRFC5545ToTemporal, parseSXToRFC5545, parseTemporalToRFC5545 } from '../../../../recurrence/src/parsers/rrule/parse-rrule'
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
  // if there is no count or until in the rrule, set an until date to range.end but in rfc string format
  if (!rrule.includes('COUNT') && !rrule.includes('UNTIL')) {
    if (!rrule.endsWith(';')) rrule += ';'
    rrule += `UNTIL=${parseTemporalToRFC5545(range.end)};`
  }

  const recurrenceSet = new RecurrenceSet({
    dtstart: parseTemporalToRFC5545(calendarEvent.start),
    dtend: parseTemporalToRFC5545(calendarEvent.end),
    rrule,
    exdate,
  }).getRecurrences()

  if (!recurrenceSet || recurrenceSet.length === 0) return []

  if (recurrenceSet[0].start === parseRFC5545ToSX(parseTemporalToRFC5545(calendarEvent.start))) {
    recurrenceSet.splice(0, 1) // skip the first occurrence because this is the original event
  }

  return recurrenceSet.map((recurrence) => {
    const eventCopy: AugmentedEvent = deepCloneEvent(calendarEvent, $app)
    eventCopy.start = parseRFC5545ToTemporal(parseSXToRFC5545(recurrence.start), $app.config.timezone.value)
    eventCopy.end = parseRFC5545ToTemporal(parseSXToRFC5545(recurrence.end), $app.config.timezone.value)
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
  // if there is no count or until in the rrule, set an until date to range.end but in rfc string format
  if (!rrule.includes('COUNT') && !rrule.includes('UNTIL')) {
    if (!rrule.endsWith(';')) rrule += ';'
    rrule += `UNTIL=${parseTemporalToRFC5545(range.end)};`
  }

  const recurrenceSet = new RecurrenceSet({
    dtstart: parseTemporalToRFC5545(backgroundEvent.start),
    dtend: parseTemporalToRFC5545(backgroundEvent.end),
    rrule,
    exdate,
  }).getRecurrences()

  if (!recurrenceSet || recurrenceSet.length === 0) return []

  if (parseSXToRFC5545(recurrenceSet[0].start) === parseTemporalToRFC5545(backgroundEvent.start)) {
    recurrenceSet.splice(0, 1) // skip the first occurrence because this is the original event
  }

  return recurrenceSet.map((recurrence) => {
    const eventCopy: AugmentedBackgroundEvent = structuredClone(backgroundEvent)
    eventCopy.start = parseRFC5545ToTemporal(parseSXToRFC5545(recurrence.start), $app.config.timezone.value)
    eventCopy.end = parseRFC5545ToTemporal(parseSXToRFC5545(recurrence.end), $app.config.timezone.value)
    eventCopy.isCopy = true
    return eventCopy
  })
}
