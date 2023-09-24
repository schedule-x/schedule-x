import DragAndDropPlugin from './drag-and-drop-plugin.interface'
import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import TimeGridDragHandler from './time-grid-drag-handler'

class DragAndDropPluginImpl implements DragAndDropPlugin {
  name = PluginName.DragAndDrop

  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent,
    calendarEventId: string | number | symbol
  ): TimeGridDragHandler {
    return new TimeGridDragHandler($app, event, calendarEventId)
  }
}

export const createDragAndDropPlugin = () => new DragAndDropPluginImpl()
