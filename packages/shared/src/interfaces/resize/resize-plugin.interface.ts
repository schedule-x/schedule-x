import PluginBase from '../plugin.interface'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'

export interface ResizePlugin extends PluginBase {
  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    mouseDownEvent: MouseEvent,
    dayBoundariesDateTime: { start: string; end: string }
  ): void
}
