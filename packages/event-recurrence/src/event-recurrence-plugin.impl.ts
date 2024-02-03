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

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name: string = PluginName.EventRecurrence
  private $app: CalendarAppSingleton | null = null

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createRecurrenceForEvents()
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

  get eventsFacade(): EventsFacade {
    if (!this.$app) throw new Error('Plugin not initialized')

    return new EventsFacadeImpl(this.$app)
  }

  private createRecurrenceForEvents() {
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
