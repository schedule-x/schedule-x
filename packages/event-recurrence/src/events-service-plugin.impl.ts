import { CalendarAppSingleton } from '@schedule-x/shared/src'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import { EventsFacadeImpl } from './util/stateful/events-facade'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { EventsService } from '@schedule-x/shared/src/interfaces/events-service/events-service.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { AugmentedBackgroundEvent } from './types/augmented-event'
import { createRecurrencesForBackgroundEvent } from './util/stateless/create-recurrences-for-event'

import { validateEvents } from '@schedule-x/shared/src/utils/stateless/validation/validate-events'

class EventsServicePluginImpl implements EventsService {
  name: string = 'eventsService'
  $app!: CalendarAppSingleton
  eventsFacade!: EventsFacade

  beforeRender($app: CalendarAppSingleton): void {
    this.$app = $app

    // TODO v3: move methods from events facade to here, and remove events facade
    this.eventsFacade = new EventsFacadeImpl(this.$app)
  }

  add(event: CalendarEventExternal): void {
    if (!this.$app) this.throwNotInitializedError()

    validateEvents([event])

    this.eventsFacade.add(event)
  }

  update(event: CalendarEventExternal): void {
    if (!this.$app) this.throwNotInitializedError()

    validateEvents([event])

    this.eventsFacade.update(event)
  }

  remove(eventId: EventId): void {
    if (!this.$app) this.throwNotInitializedError()

    this.eventsFacade.remove(eventId)
  }

  get(eventId: EventId): CalendarEventExternal | undefined {
    if (!this.$app) this.throwNotInitializedError()

    return this.eventsFacade.get(eventId)
  }

  getAll(): CalendarEventExternal[] {
    if (!this.$app) this.throwNotInitializedError()

    return this.eventsFacade.getAll()
  }

  set(events: CalendarEventExternal[]): void {
    if (!this.$app) this.throwNotInitializedError()

    validateEvents(events)

    this.eventsFacade.set(events)
  }

  private throwNotInitializedError() {
    throw new Error(
      'Plugin not yet initialized. The events service plugin is not intended to add the initial events. For adding events upon rendering, add them directly to the configuration object passed to `createCalendar`, or `useCalendarApp` if you are using the React component'
    )
  }

  setBackgroundEvents(backgroundEvents: BackgroundEvent[]): void {
    if (!this.$app) this.throwNotInitializedError()

    const newBackgroundEvents: AugmentedBackgroundEvent[] = []
    for (const event of backgroundEvents) {
      newBackgroundEvents.push({
        ...event,
      })
      const rrule = event.rrule
      const exdate = event.exdate
      if (rrule && this.$app.calendarState.range.value) {
        newBackgroundEvents.push(
          ...createRecurrencesForBackgroundEvent(
            event,
            rrule,
            this.$app.calendarState.range.value,
            exdate
          )
        )
      }
    }

    this.$app.calendarEvents.backgroundEvents.value = newBackgroundEvents
  }
}

export const createEventsServicePlugin = () => {
  return definePlugin('eventsService', new EventsServicePluginImpl())
}
