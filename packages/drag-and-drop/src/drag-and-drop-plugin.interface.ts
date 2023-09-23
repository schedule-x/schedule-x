import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import Plugin from '@schedule-x/shared/src/interfaces/plugin.interface'
import TimeGridDragHandler from './time-grid-drag-handler'

export default interface DragAndDropPlugin extends Plugin {
  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent
  ): TimeGridDragHandler
}
