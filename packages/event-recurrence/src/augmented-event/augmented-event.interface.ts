import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RRule, RRuleSet } from 'rrule'

export interface AugmentedEvent extends CalendarEventInternal {
  rrule?: RRule | RRuleSet

  _recurrenceSourceId?: string
  _durationInMinutes?: number
}
