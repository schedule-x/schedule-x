import PluginBase from '../../interfaces/plugin.interface'
import TimeGridDragHandler from './time-grid-drag-handler.interface'
import { DayBoundariesDateTime } from '../../types/day-boundaries-date-time'
import DateGridDragHandler from './date-grid-drag-handler.interface'
import DragHandlerDependencies from './drag-handler-dependencies.interface'
import MonthGridDragHandler from './month-grid-drag-handler.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'

export default interface DragAndDropPlugin extends PluginBase<string> {
  startTimeGridDrag(
    dependencies: DragHandlerDependencies,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandler

  startDateGridDrag(
    dependencies: DragHandlerDependencies
  ): DateGridDragHandler

  startMonthGridDrag(
    calendarEvent: CalendarEventInternal,
    $app: CalendarAppSingleton
  ): MonthGridDragHandler

  setInterval(minutes: number): void
}
