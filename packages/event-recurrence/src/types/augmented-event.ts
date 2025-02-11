import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

export interface AugmentedEvent extends CalendarEventInternal {
  isCopy?: boolean
}

export interface AugmentedBackgroundEvent extends BackgroundEvent {
  isCopy?: boolean
}
