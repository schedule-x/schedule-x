import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import EventsFacadeImpl from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventId } from '@schedule-x/shared/src/types/event-id'

class EventsServicePluginImpl implements PluginBase {
  name = 'EventsServicePlugin'
  $app!: CalendarAppSingleton
  eventsFacade!: EventsFacade

  init($app: CalendarAppSingleton) {
    this.$app = $app
    this.eventsFacade = new EventsFacadeImpl($app)
  }

  update(event: CalendarEventExternal) {
    this.eventsFacade.update(event)
  }

  add(event: CalendarEventExternal) {
    this.eventsFacade.add(event)
  }

  remove(id: EventId) {
    this.eventsFacade.remove(id)
  }

  get(id: EventId) {
    return this.eventsFacade.get(id)
  }

  getAll() {
    return this.eventsFacade.getAll()
  }

  set(events: CalendarEventExternal[]) {
    this.eventsFacade.set(events)
  }
}

export const createEventsServicePlugin = () => {
  return new EventsServicePluginImpl()
}
