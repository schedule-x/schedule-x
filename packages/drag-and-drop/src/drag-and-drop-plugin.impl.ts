import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import TimeGridDragHandlerImpl from './time-grid-drag-handler.impl'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'

class DragAndDropPluginImpl implements DragAndDropPlugin {
  name = PluginName.DragAndDrop

  constructor(private minutesPerInterval: number) {}

  createTimeGridDragHandler(
    $app: CalendarAppSingleton,
    event: MouseEvent,
    eventCopy: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandlerImpl {
    return new TimeGridDragHandlerImpl(
      $app,
      event,
      eventCopy,
      updateCopy,
      dayBoundariesDateTime,
      this.getTimePointsForIntervalConfig()
    )
  }

  private getTimePointsForIntervalConfig(): number {
    if (this.minutesPerInterval === 60) return 100
    if (this.minutesPerInterval === 30) return 50
    return 25
  }
}

export const createDragAndDropPlugin = (minutesPerInterval = 15) =>
  new DragAndDropPluginImpl(minutesPerInterval)
