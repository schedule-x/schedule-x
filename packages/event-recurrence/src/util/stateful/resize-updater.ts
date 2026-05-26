import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { AugmentedEvent } from '../../types/augmented-event'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import {
  applyTemporalShift,
  deriveTemporalShift,
  expectZonedDateTime,
} from '@schedule-x/recurrence/src/rrule/utils/stateless/temporal-shift'

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
    const isAllDayEvent = eventToUpdate.end instanceof Temporal.PlainDate
    const shift = isAllDayEvent
      ? deriveTemporalShift(
          Temporal.PlainDate.from(oldEventEnd),
          Temporal.PlainDate.from(newEventEnd)
        )
      : deriveTemporalShift(
          expectZonedDateTime(
            oldEventEnd,
            'Expected ZonedDateTime input for timed recurrence resize'
          ),
          expectZonedDateTime(
            newEventEnd,
            'Expected ZonedDateTime input for timed recurrence resize'
          )
        )
    return applyTemporalShift(eventToUpdate.end, shift)
  }

  private deleteAllCopiesForEvent(eventId: EventId) {
    this.$app!.calendarEvents.list.value =
      this.$app!.calendarEvents.list.value.filter(
        (event) => event.id !== eventId || !event.isCopy
      )
  }
}
