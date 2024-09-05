import { CalendarEventInternal } from './calendar-event.interface'
import { Signal } from '@preact/signals'
import { BackgroundEvent } from './background-event'

export type EventsFilterPredicate =
  | ((event: CalendarEventInternal) => boolean)
  | undefined

export default interface CalendarEvents {
  list: Signal<CalendarEventInternal[]>
  filterPredicate: Signal<EventsFilterPredicate>
  backgroundEvents: Signal<BackgroundEvent[]>
}
