import {
  addDays,
  addMinutes,
  CalendarAppSingleton,
} from '@schedule-x/shared/src'
import { RecurrenceSet } from '../../../../recurrence/src'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { getDurationInMinutes } from '../../../../recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { parseRFC5545ToSX } from '../../../../recurrence/src/parsers/rrule/parse-rrule'
import { EventId } from '@schedule-x/shared/src/types/event-id'

export class DndUpdater {
  constructor(private $app: CalendarAppSingleton) {}

  update(eventId: EventId, oldEventStart: string, newEventStart: string) {
    const eventToUpdate = this.$app!.calendarEvents.list.value.find(
      (event) => event.id === eventId && !event.isCopy
    )
    if (!eventToUpdate) throw new Error('Tried to update a non-existing event')

    this.$app!.calendarEvents.list.value =
      this.$app!.calendarEvents.list.value.filter(
        (event) => event.id !== eventId || !event.isCopy
      )

    const recurrenceSet = new RecurrenceSet({
      dtstart: eventToUpdate.start,
      dtend: eventToUpdate.end,
      rrule: eventToUpdate._getForeignProperties().rrule as string,
    })

    const newDtStart = dateTimeStringRegex.test(newEventStart)
      ? addMinutes(
          eventToUpdate.start,
          getDurationInMinutes(oldEventStart, newEventStart)
        )
      : addDays(
          eventToUpdate.start,
          calculateDaysDifference(oldEventStart, newEventStart)
        )

    // Update the original event
    recurrenceSet.updateDtstart(newDtStart)
    eventToUpdate.start = parseRFC5545ToSX(recurrenceSet.getDtstart())
    eventToUpdate.end = parseRFC5545ToSX(recurrenceSet.getDtend())
    eventToUpdate._getForeignProperties().rrule = recurrenceSet.getRrule()

    return { updatedEvent: eventToUpdate, recurrenceSet }
  }
}
