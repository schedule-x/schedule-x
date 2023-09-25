import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import Plugin from '@schedule-x/shared/src/interfaces/plugin.interface'
import TimeGridDragHandler from './time-grid-drag-handler'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'

export default interface DragAndDropPlugin extends Plugin {
  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent,
    eventCopy: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ): TimeGridDragHandler
}
