import { EventId } from '../../types/event-id'
import CalendarEventExternal from '../calendar/calendar-event.interface'
import PluginBase from '../plugin.interface'
import { BackgroundEvent } from '../calendar/background-event'

export interface EventsService extends PluginBase<string> {
  get(id: EventId): CalendarEventExternal | undefined
  getAll(): CalendarEventExternal[]
  add(event: CalendarEventExternal): void
  update(event: CalendarEventExternal): void
  remove(id: EventId): void
  set(events: CalendarEventExternal[]): void
  setBackgroundEvents(backgroundEvents: BackgroundEvent[]): void
}
