import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import { EventsFacadeImpl } from './util/stateful/events-facade'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

class EventsServicePluginImpl implements PluginBase {
  name: string = 'EventsServicePlugin'
  $app!: CalendarAppSingleton
  eventsFacade!: EventsFacade

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.eventsFacade = new EventsFacadeImpl(this.$app)
  }

  add(event: CalendarEventExternal): void {
    this.eventsFacade.add(event)
  }

  update(event: CalendarEventExternal): void {
    this.eventsFacade.update(event)
  }

  remove(eventId: string): void {
    this.eventsFacade.remove(eventId)
  }

  get(eventId: string): CalendarEventExternal | undefined {
    return this.eventsFacade.get(eventId)
  }

  getAll(): CalendarEventExternal[] {
    return this.eventsFacade.getAll()
  }

  set(events: CalendarEventExternal[]): void {
    this.eventsFacade.set(events)
  }
}

export const createEventsServicePlugin = (): EventsServicePluginImpl =>
  new EventsServicePluginImpl()
