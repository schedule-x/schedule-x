import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import TimeGridDragHandler from './time-grid-drag-handler'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'

export default interface DragAndDropPlugin extends PluginBase {
  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent,
    eventCopy: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandler
}
