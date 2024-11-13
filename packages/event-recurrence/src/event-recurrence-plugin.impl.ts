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
import { ResizeUpdater } from './util/stateful/resize-updater'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name: string = PluginName.EventRecurrence

  private $app: CalendarAppSingleton | null = null

  onRender($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createRecurrencesForEvents()
  }

  get eventsFacade(): EventsFacade {
    console.warn(
      '[Schedule-X warning]: the eventsFacade is deprecated and will be removed in v2. Please use the createEventsServicePlugin function from @schedule-x/event-recurrence instead. Docs: https://schedule-x.dev/docs/calendar/plugins/recurrence'
    )
    if (!this.$app)
      throw new Error(
        'Plugin not yet initialized. The events facade is not intended to add the initial events. For adding events upon rendering, add them directly to the configuration object passed to `createCalendar`, or `useCalendarApp` if you are using the React component'
      )

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
    const updatedEvent = new ResizeUpdater(
      this.$app as CalendarAppSingleton
    ).update(eventId, oldEventEnd, newEventEnd)

    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...this.createRecurrencesForEvent(
        updatedEvent,
        updatedEvent._getForeignProperties().rrule as string
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

export const createEventRecurrencePlugin = () => {
  return definePlugin(
    'eventRecurrence',
    new EventRecurrencePluginImpl() as EventRecurrencePlugin
  )
}
