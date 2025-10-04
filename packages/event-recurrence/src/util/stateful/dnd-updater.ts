import { addDays, CalendarAppSingleton } from '@schedule-x/shared/src'
import { RecurrenceSet } from '../../../../recurrence/src'
import { getDurationInMinutesTemporal } from '../../../../recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { addMinutesToTemporal } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

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

    const newDtStart =
      oldEventStart instanceof Temporal.ZonedDateTime
        ? addMinutesToTemporal(
            eventToUpdate.start as Temporal.ZonedDateTime,
            getDurationInMinutesTemporal(
              oldEventStart,
              newEventStart as Temporal.ZonedDateTime
            )
          )
        : addDays(
            eventToUpdate.start as Temporal.PlainDate,
            calculateDaysDifference(
              oldEventStart as Temporal.PlainDate,
              newEventStart as Temporal.PlainDate
            )
          )

    const newDtEnd =
      oldEventStart instanceof Temporal.ZonedDateTime
        ? addMinutesToTemporal(
            eventToUpdate.end as Temporal.ZonedDateTime,
            getDurationInMinutesTemporal(
              oldEventStart,
              newEventStart as Temporal.ZonedDateTime
            )
          )
        : addDays(
            eventToUpdate.end as Temporal.PlainDate,
            calculateDaysDifference(
              oldEventStart as Temporal.PlainDate,
              newEventStart as Temporal.PlainDate
            )
          )

    // Update the original event
    recurrenceSet.updateDtstartAndDtend(newDtStart, newDtEnd)
    eventToUpdate.start = recurrenceSet.getDtstart()
    eventToUpdate.end = recurrenceSet.getDtend()
    eventToUpdate._getForeignProperties().rrule = recurrenceSet.getRrule()

    return { updatedEvent: eventToUpdate, recurrenceSet }
  }
}
