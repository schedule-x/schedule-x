import { EventId } from '@schedule-x/shared/src/types/event-id'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export default interface EventsFacade {
  get(id: EventId): CalendarEventExternal | undefined
  getAll(): CalendarEventExternal[]
  add(event: CalendarEventExternal): void
  update(event: CalendarEventExternal): void
  remove(id: EventId): void
}
