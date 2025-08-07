import { addDays, CalendarAppSingleton } from '@schedule-x/shared/src'
import { AugmentedEvent } from '../../types/augmented-event'
import { getDurationInMinutesTemporal } from '@schedule-x/recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import { EventId } from '@schedule-x/shared/src/types/event-id'

import { addMinutesToTemporal } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

export class ResizeUpdater {
  constructor(private $app: CalendarAppSingleton) {}

  update(
    eventId: EventId,
    oldEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate,
    newEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate
  ): AugmentedEvent {
    this.deleteAllCopiesForEvent(eventId)
    const eventToUpdate = this.$app!.calendarEvents.list.value.find(
      (event) => event.id === eventId && !event.isCopy
    )
    if (!eventToUpdate) throw new Error('Tried to update a non-existing event')

    eventToUpdate.end = this.getNewEventEnd(
      newEventEnd,
      eventToUpdate,
      oldEventEnd
    )

    return eventToUpdate
  }

  private getNewEventEnd(
    newEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate,
    eventToUpdate: AugmentedEvent,
    oldEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate
  ) {
    return newEventEnd instanceof Temporal.ZonedDateTime
      ? addMinutesToTemporal(
          eventToUpdate.end,
          getDurationInMinutesTemporal(
            oldEventEnd as Temporal.ZonedDateTime,
            newEventEnd as Temporal.ZonedDateTime
          )
        )
      : addDays(
          eventToUpdate.end,
          calculateDaysDifference(oldEventEnd, newEventEnd)
        )
  }

  private deleteAllCopiesForEvent(eventId: EventId) {
    this.$app!.calendarEvents.list.value =
      this.$app!.calendarEvents.list.value.filter(
        (event) => event.id !== eventId || !event.isCopy
      )
  }
}
