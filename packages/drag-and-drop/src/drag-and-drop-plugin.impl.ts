import DragAndDropPlugin from './drag-and-drop-plugin.interface'
import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import TimeGridDragHandler from './time-grid-drag-handler'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'

class DragAndDropPluginImpl implements DragAndDropPlugin {
  name = PluginName.DragAndDrop

  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent,
    eventCopy: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ): TimeGridDragHandler {
    return new TimeGridDragHandler($app, event, eventCopy, updateCopy)
  }
}

export const createDragAndDropPlugin = () => new DragAndDropPluginImpl()
