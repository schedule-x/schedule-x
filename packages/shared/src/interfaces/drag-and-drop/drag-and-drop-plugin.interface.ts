import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import PluginBase from '../../interfaces/plugin.interface'
import TimeGridDragHandler from './time-grid-drag-handler.interface'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'
import { DayBoundariesDateTime } from '../../types/day-boundaries-date-time'

export default interface DragAndDropPlugin extends PluginBase {
  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent,
    eventCopy: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandler
}
