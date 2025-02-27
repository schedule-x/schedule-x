import { CalendarAppSingleton } from '@schedule-x/shared/src'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import EventsFacadeImpl from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { EventsService } from '@schedule-x/shared/src/interfaces/events-service/events-service.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

import { validateEvents } from '@schedule-x/shared/src/utils/stateless/validation/validate-events'

class EventsServicePluginImpl implements EventsService {
  name = 'EventsServicePlugin'
  $app!: CalendarAppSingleton
  eventsFacade!: EventsFacade

  beforeRender($app: CalendarAppSingleton) {
    this.$app = $app

    // TODO v3: move methods from events facade to here, and remove events facade
    this.eventsFacade = new EventsFacadeImpl($app)
  }

  update(event: CalendarEventExternal) {
    validateEvents([event])

    this.eventsFacade.update(event)
  }

  add(event: CalendarEventExternal) {
    validateEvents([event])

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
    validateEvents(events)

    this.eventsFacade.set(events)
  }

  setBackgroundEvents(backgroundEvents: BackgroundEvent[]): void {
    this.$app.calendarEvents.backgroundEvents.value = backgroundEvents
  }
}

export const createEventsServicePlugin = () => {
  return definePlugin('eventsService', new EventsServicePluginImpl())
}
