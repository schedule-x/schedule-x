import EventsFacade from './events-facade.interface'
import CalendarAppSingleton from '../../../interfaces/calendar/calendar-app-singleton'
import CalendarEventExternal from '../../../interfaces/calendar/calendar-event.interface'
import { EventId } from '../../../types/event-id'
import { externalEventToInternal } from '../../stateless/calendar/external-event-to-internal'

export default class EventsFacadeImpl implements EventsFacade {
  constructor(protected $app: CalendarAppSingleton) {}

  set(events: CalendarEventExternal[]): void {
    this.$app.calendarEvents.list.value = events.map((event) =>
      externalEventToInternal(event, this.$app.config)
    )
  }

  add(event: CalendarEventExternal): void {
    const newEvent = externalEventToInternal(event, this.$app.config)
    newEvent._createdAt = new Date()
    const copiedEvents = [...this.$app.calendarEvents.list.value]
    copiedEvents.push(newEvent)
    this.$app.calendarEvents.list.value = copiedEvents
  }

  get(id: EventId): CalendarEventExternal | undefined {
    return this.$app.calendarEvents.list.value
      .find((event) => event.id === id)
      ?._getExternalEvent()
  }

  getAll(): CalendarEventExternal[] {
    return this.$app.calendarEvents.list.value.map((event) =>
      event._getExternalEvent()
    )
  }

  remove(id: EventId): void {
    const index = this.$app.calendarEvents.list.value.findIndex(
      (event) => event.id === id
    )
    const copiedEvents = [...this.$app.calendarEvents.list.value]
    copiedEvents.splice(index, 1)
    this.$app.calendarEvents.list.value = copiedEvents
  }

  update(event: CalendarEventExternal): void {
    const index = this.$app.calendarEvents.list.value.findIndex(
      (e) => e.id === event.id
    )
    const copiedEvents = [...this.$app.calendarEvents.list.value]
    copiedEvents.splice(
      index,
      1,
      externalEventToInternal(event, this.$app.config)
    )
    this.$app.calendarEvents.list.value = copiedEvents
  }
}
