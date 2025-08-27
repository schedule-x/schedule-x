import { addDays, CalendarAppSingleton } from '@schedule-x/shared/src'
import { RecurrenceSet } from '../../../../recurrence/src'
import { getDurationInMinutesTemporal } from '../../../../recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import {
  parseRFC5545ToTemporal,
  parseTemporalToRFC5545,
} from '../../../../recurrence/src/parsers/rrule/parse-rrule'
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
      dtstart: parseTemporalToRFC5545(eventToUpdate.start),
      dtend: parseTemporalToRFC5545(eventToUpdate.end),
      rrule: eventToUpdate._getForeignProperties().rrule as string,
    })

    const newDtStart =
      oldEventStart instanceof Temporal.ZonedDateTime
        ? addMinutesToTemporal(
            eventToUpdate.start,
            getDurationInMinutesTemporal(
              oldEventStart,
              newEventStart as Temporal.ZonedDateTime
            )
          )
        : addDays(
            eventToUpdate.start,
            calculateDaysDifference(
              Temporal.PlainDate.from(oldEventStart),
              Temporal.PlainDate.from(newEventStart)
            )
          )

    const newDtEnd =
      oldEventStart instanceof Temporal.ZonedDateTime
        ? addMinutesToTemporal(
            eventToUpdate.end,
            getDurationInMinutesTemporal(
              oldEventStart,
              newEventStart as Temporal.ZonedDateTime
            )
          )
        : addDays(
            eventToUpdate.end,
            calculateDaysDifference(
              Temporal.PlainDate.from(oldEventStart),
              Temporal.PlainDate.from(newEventStart)
            )
          )

    // Update the original event
    recurrenceSet.updateDtstartAndDtend(
      parseTemporalToRFC5545(newDtStart),
      parseTemporalToRFC5545(newDtEnd)
    )
    eventToUpdate.start = parseRFC5545ToTemporal(
      recurrenceSet.getDtstart(),
      this.$app!.config.timezone.value
    )
    eventToUpdate.end = parseRFC5545ToTemporal(
      recurrenceSet.getDtend(),
      this.$app!.config.timezone.value
    )
    eventToUpdate._getForeignProperties().rrule = recurrenceSet.getRrule()

    return { updatedEvent: eventToUpdate, recurrenceSet }
  }
}
