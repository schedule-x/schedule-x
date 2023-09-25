import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { Signal } from '@preact/signals'

export default interface CalendarEvents {
  list: Signal<CalendarEventInternal[]>
  createInternalEvents(): void
}
