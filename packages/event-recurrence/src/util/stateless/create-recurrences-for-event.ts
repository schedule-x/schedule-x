import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RecurrenceSet } from '../../../../recurrence/src'
import { parseSXToRFC5545 } from '../../../../recurrence/src/parsers/rrule/parse-rrule'
import { AugmentedEvent } from '../../types/augmented-event'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { CalendarAppSingleton } from '@schedule-x/shared/src'

export const createRecurrencesForEvent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  rrule: string
) => {
  const recurrenceSet = new RecurrenceSet({
    dtstart: parseSXToRFC5545(calendarEvent.start),
    dtend: parseSXToRFC5545(calendarEvent.end),
    rrule,
  })

  return recurrenceSet
    .getRecurrences()
    .slice(1) // skip the first occurrence because this is the original event
    .map((recurrence) => {
      const eventCopy: AugmentedEvent = deepCloneEvent(calendarEvent, $app)
      eventCopy.start = recurrence.start
      eventCopy.end = recurrence.end
      eventCopy.isCopy = true
      return eventCopy
    })
}
