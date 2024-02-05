/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventRecurrencePlugin } from '@schedule-x/shared/src/interfaces/event-recurrence/event-recurrence-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DndUpdater } from './util/stateful/dnd-updater'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import { EventsFacadeImpl } from './util/stateful/events-facade'
import { createRecurrencesForEvent } from './util/stateless/create-recurrences-for-event'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { addDays, addMinutes } from '@schedule-x/shared'
import { getDurationInMinutes } from '@schedule-x/recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name: string = PluginName.EventRecurrence
  private $app: CalendarAppSingleton | null = null
  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createRecurrencesForEvents()
  }

  get eventsFacade(): EventsFacade {
    if (!this.$app) throw new Error('Plugin not yet initialized')

    return new EventsFacadeImpl(this.$app)
  }

  updateRecurrenceDND(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ): void {
    const { updatedEvent, recurrenceSet } = new DndUpdater(
      this.$app as CalendarAppSingleton
    ).update(eventId, oldEventStart, newEventStart)

    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...this.createRecurrencesForEvent(updatedEvent, recurrenceSet.getRrule()),
    ]
  }

  updateRecurrenceOnResize(
    eventId: EventId,
    oldEventEnd: string,
    newEventEnd: string
  ): void {
    this.$app!.calendarEvents.list.value =
      this.$app!.calendarEvents.list.value.filter(
        (event) => event.id !== eventId || !event.isCopy
      )
    const eventToUpdate = this.$app!.calendarEvents.list.value.find(
      (event) => event.id === eventId && !event.isCopy
    )
    if (!eventToUpdate) throw new Error('Tried to update a non-existing event')

    eventToUpdate.end = dateTimeStringRegex.test(newEventEnd)
      ? addMinutes(
          eventToUpdate.end,
          getDurationInMinutes(oldEventEnd, newEventEnd)
        )
      : addDays(
          eventToUpdate.end,
          calculateDaysDifference(oldEventEnd, newEventEnd)
        )

    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...this.createRecurrencesForEvent(
        eventToUpdate,
        eventToUpdate._getForeignProperties().rrule as string
      ),
    ]
  }

  private createRecurrencesForEvents() {
    const recurrencesToCreate: CalendarEventInternal[] = []
    const $app = this.$app as CalendarAppSingleton

    $app.calendarEvents.list.value.forEach((event) => {
      const rrule = event._getForeignProperties().rrule as string | undefined

      if (rrule) {
        recurrencesToCreate.push(
          ...this.createRecurrencesForEvent(event, rrule)
        )
      }
    })

    $app.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...recurrencesToCreate,
    ]
  }

  private createRecurrencesForEvent(
    calendarEvent: CalendarEventInternal,
    rrule: string
  ) {
    return createRecurrencesForEvent(
      this.$app as CalendarAppSingleton,
      calendarEvent,
      rrule
    )
  }
}

export const createEventRecurrencePlugin = (): EventRecurrencePlugin => {
  return new EventRecurrencePluginImpl() as EventRecurrencePlugin
}
