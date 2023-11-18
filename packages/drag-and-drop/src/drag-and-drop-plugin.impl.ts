import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import TimeGridDragHandlerImpl from './time-grid-drag-handler.impl'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import DateGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/date-grid-drag-handler.interface'
import DateGridDragHandlerImpl from './date-grid-drag-handler.impl'
import DragHandlerDependencies from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-handler-dependencies.interface'
import MonthGridDragHandlerImpl from './month-grid-drag-handler.impl'
import MonthGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/month-grid-drag-handler.interface'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import TimeGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/time-grid-drag-handler.interface'

class DragAndDropPluginImpl implements DragAndDropPlugin {
  name = PluginName.DragAndDrop

  constructor(private minutesPerInterval: number) {}

  createTimeGridDragHandler(
    dependencies: DragHandlerDependencies,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandler {
    return new TimeGridDragHandlerImpl(
      dependencies.$app,
      dependencies.event,
      dependencies.eventCopy,
      dependencies.updateCopy,
      dayBoundariesDateTime,
      this.getTimePointsForIntervalConfig()
    )
  }

  private getTimePointsForIntervalConfig(): number {
    if (this.minutesPerInterval === 60) return 100
    if (this.minutesPerInterval === 30) return 50
    return 25
  }

  createDateGridDragHandler(
    dependencies: DragHandlerDependencies
  ): DateGridDragHandler {
    return new DateGridDragHandlerImpl(
      dependencies.$app,
      dependencies.event,
      dependencies.eventCopy,
      dependencies.updateCopy
    )
  }

  createMonthGridDragHandler(
    calendarEvent: CalendarEventInternal,
    $app: CalendarAppSingleton
  ): MonthGridDragHandler {
    return new MonthGridDragHandlerImpl(calendarEvent, $app)
  }
}

export const createDragAndDropPlugin = (minutesPerInterval = 15) =>
  new DragAndDropPluginImpl(minutesPerInterval)
