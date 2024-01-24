import EventsFacadeImpl from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventId } from '@schedule-x/shared/src/types/event-id'

export class EventsFacade extends EventsFacadeImpl {
  getAll(): CalendarEventExternal[] {
    return this.$app.calendarEvents.list.value
      .filter((event) => !event._isRecurrenceCopy)
      .map((event) => event._getExternalEvent())
  }

  remove(id: EventId) {
    this.$app.calendarEvents.list.value = [
      ...this.$app.calendarEvents.list.value,
    ].filter((event) => event.id !== id)
  }
}
