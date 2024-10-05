import PluginBase from '../plugin.interface'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'

export interface ResizePlugin extends PluginBase<string> {
  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    mouseDownEvent: MouseEvent,
    dayBoundariesDateTime: { start: string; end: string }
  ): void

  createDateGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    mouseDownEvent: MouseEvent
  ): void
}
