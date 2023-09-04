import { CalendarEventInternal } from '../calendar-event/calendar-event.interface'
import { Signal } from '@preact/signals'

export default interface CalendarEvents {
  list: Signal<CalendarEventInternal[]>
  createInternalEvents(): void
}
