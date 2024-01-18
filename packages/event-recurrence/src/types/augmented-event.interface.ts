import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventRRule } from '../utils/stateful/event-rrule'

export interface AugmentedEvent extends CalendarEventInternal {
  rrule?: EventRRule

  _durationInMinutes?: number
}
