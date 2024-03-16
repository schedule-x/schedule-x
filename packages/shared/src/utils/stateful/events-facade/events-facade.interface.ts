import { EventId } from '../../../types/event-id'
import CalendarEventExternal from '../../../interfaces/calendar/calendar-event.interface'

export default interface EventsFacade {
  get(id: EventId): CalendarEventExternal | undefined
  getAll(): CalendarEventExternal[]
  add(event: CalendarEventExternal): void
  update(event: CalendarEventExternal): void
  remove(id: EventId): void
  set(events: CalendarEventExternal[]): void
}
