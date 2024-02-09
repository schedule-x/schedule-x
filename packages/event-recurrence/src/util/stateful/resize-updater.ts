import {
  addDays,
  addMinutes,
  CalendarAppSingleton,
} from '@schedule-x/shared/src'
import { AugmentedEvent } from '../../types/augmented-event'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { getDurationInMinutes } from '@schedule-x/recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { EventId } from '@schedule-x/shared/src/types/event-id'

export class ResizeUpdater {
  constructor(private $app: CalendarAppSingleton) {}

  update(
    eventId: EventId,
    oldEventEnd: string,
    newEventEnd: string
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
    newEventEnd: string,
    eventToUpdate: AugmentedEvent,
    oldEventEnd: string
  ) {
    return dateTimeStringRegex.test(newEventEnd)
      ? addMinutes(
          eventToUpdate.end,
          getDurationInMinutes(oldEventEnd, newEventEnd)
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
