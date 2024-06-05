import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import { EventsFacadeImpl } from './util/stateful/events-facade'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventId } from '@schedule-x/shared/src/types/event-id'

class EventsServicePluginImpl implements PluginBase {
  name: string = 'EventsServicePlugin'
  $app!: CalendarAppSingleton
  eventsFacade!: EventsFacade

  beforeInit($app: CalendarAppSingleton): void {
    this.$app = $app

    // TODO v2: move methods from events facade to here, and remove events facade
    this.eventsFacade = new EventsFacadeImpl(this.$app)
  }

  add(event: CalendarEventExternal): void {
    if (!this.$app) this.throwNotInitializedError()

    this.eventsFacade.add(event)
  }

  update(event: CalendarEventExternal): void {
    if (!this.$app) this.throwNotInitializedError()

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

    this.eventsFacade.set(events)
  }

  private throwNotInitializedError() {
    throw new Error(
      'Plugin not yet initialized. The events service plugin is not intended to add the initial events. For adding events upon rendering, add them directly to the configuration object passed to `createCalendar`, or `useCalendarApp` if you are using the React component'
    )
  }
}

export const createEventsServicePlugin = (): EventsServicePluginImpl =>
  new EventsServicePluginImpl()
