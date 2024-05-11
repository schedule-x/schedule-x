import { CalendarEventInternal } from './calendar-event.interface'
import { Signal } from '@preact/signals'

export type EventsFilterPredicate =
  | ((event: CalendarEventInternal) => boolean)
  | undefined

export default interface CalendarEvents {
  list: Signal<CalendarEventInternal[]>
  filterPredicate: Signal<EventsFilterPredicate>
}
