import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { RecurrenceSet } from '../../../../recurrence/src'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import {
  applyTemporalShift,
  deriveTemporalShift,
  expectZonedDateTime,
} from '@schedule-x/recurrence/src/rrule/utils/stateless/temporal-shift'

export class DndUpdater {
  constructor(private $app: CalendarAppSingleton) {}

  update(
    eventId: EventId,
    oldEventStart: Temporal.ZonedDateTime | Temporal.PlainDate,
    newEventStart: Temporal.ZonedDateTime | Temporal.PlainDate
  ) {
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
      timezone: this.$app!.config.timezone.value,
    })

    const isAllDayEvent =
      eventToUpdate.start instanceof Temporal.PlainDate &&
      eventToUpdate.end instanceof Temporal.PlainDate
    const isTimedEvent =
      eventToUpdate.start instanceof Temporal.ZonedDateTime &&
      eventToUpdate.end instanceof Temporal.ZonedDateTime

    if (!isAllDayEvent && !isTimedEvent) {
      throw new Error('Unsupported Temporal type for recurrence update')
    }

    const shift = isAllDayEvent
      ? deriveTemporalShift(
          Temporal.PlainDate.from(oldEventStart),
          Temporal.PlainDate.from(newEventStart)
        )
      : deriveTemporalShift(
          expectZonedDateTime(
            oldEventStart,
            'Expected ZonedDateTime input for timed recurrence update'
          ),
          expectZonedDateTime(
            newEventStart,
            'Expected ZonedDateTime input for timed recurrence update'
          )
        )
    const newDtStart = applyTemporalShift(eventToUpdate.start, shift)
    const newDtEnd = applyTemporalShift(eventToUpdate.end, shift)

    // Update the original event
    recurrenceSet.updateDtstartAndDtend(newDtStart, newDtEnd)
    eventToUpdate.start = recurrenceSet.getDtstart()
    eventToUpdate.end = recurrenceSet.getDtend()
    eventToUpdate._getForeignProperties().rrule = recurrenceSet.getRrule()

    return { updatedEvent: eventToUpdate, recurrenceSet }
  }
}
