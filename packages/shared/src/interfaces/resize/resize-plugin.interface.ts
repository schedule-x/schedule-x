import PluginBase from '../plugin.interface'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'

import { DateRange } from '../../types/date-range'

export interface ResizePlugin extends PluginBase<string> {
  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    uiEvent: MouseEvent | TouchEvent,
    dayBoundariesDateTime: DateRange
  ): void

  createDateGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    uiEvent: MouseEvent | TouchEvent
  ): void

  setInterval(minutes: number): void
}
