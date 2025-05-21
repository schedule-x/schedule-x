import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RecurrenceSet } from '../../../../recurrence/src'
import { parseSXToRFC5545 } from '../../../../recurrence/src/parsers/rrule/parse-rrule'
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
    rrule += `UNTIL=${parseSXToRFC5545(range.end)};`
  }

  const recurrenceSet = new RecurrenceSet({
    dtstart: parseSXToRFC5545(calendarEvent.start),
    dtend: parseSXToRFC5545(calendarEvent.end),
    rrule,
    exdate,
  }).getRecurrences()

  if (recurrenceSet[0].start == calendarEvent.start) {
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
  backgroundEvent: BackgroundEvent,
  rrule: string,
  range: DateRange
) => {
  // if there is no count or until in the rrule, set an until date to range.end but in rfc string format
  if (!rrule.includes('COUNT') && !rrule.includes('UNTIL')) {
    if (!rrule.endsWith(';')) rrule += ';'
    rrule += `UNTIL=${parseSXToRFC5545(range.end)};`
  }

  const recurrenceSet = new RecurrenceSet({
    dtstart: parseSXToRFC5545(backgroundEvent.start),
    dtend: parseSXToRFC5545(backgroundEvent.end),
    rrule,
  })

  return recurrenceSet
    .getRecurrences()
    .slice(1) // skip the first occurrence because this is the original event
    .map((recurrence) => {
      const eventCopy: AugmentedBackgroundEvent =
        structuredClone(backgroundEvent)
      eventCopy.start = recurrence.start
      eventCopy.end = recurrence.end
      eventCopy.isCopy = true
      return eventCopy
    })
}
