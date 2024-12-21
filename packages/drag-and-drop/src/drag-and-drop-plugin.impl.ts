import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import TimeGridDragHandlerImpl from './time-grid-drag-handler.impl'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import DateGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/date-grid-drag-handler.interface'
import DateGridDragHandlerImpl from './date-grid-drag-handler.impl'
import MonthGridDragHandlerImpl from './month-grid-drag-handler.impl'
import MonthGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/month-grid-drag-handler.interface'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import TimeGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/time-grid-drag-handler.interface'
import DragHandlerDependencies from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-handler-dependencies.interface'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'

class DragAndDropPluginImpl implements DragAndDropPlugin {
  name = PluginName.DragAndDrop

  onRender($app: CalendarAppSingleton) {
    if (!$app.elements.calendarWrapper) return

    $app.elements.calendarWrapper.dataset.hasDnd = 'true'
  }

  constructor(private minutesPerInterval: number) {}

  createTimeGridDragHandler(
    dependencies: DragHandlerDependencies,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandler {
    return new TimeGridDragHandlerImpl(
      dependencies.$app,
      dependencies.eventCoordinates,
      dependencies.eventCopy,
      dependencies.updateCopy,
      dayBoundariesDateTime,
      this.getTimePointsForIntervalConfig()
    )
  }

  private getTimePointsForIntervalConfig(): number {
    if (this.minutesPerInterval < 1 || this.minutesPerInterval > 60) {
      console.warn(
        `Invalid value for minutesPerInterval: ${this.minutesPerInterval} (must be between 1-60).\nDefaulting to 15 minutes`
      )
      this.minutesPerInterval = 15
    }

    return Math.round((this.minutesPerInterval / 60) * 100)
  }

  createDateGridDragHandler(
    dependencies: DragHandlerDependencies
  ): DateGridDragHandler {
    return new DateGridDragHandlerImpl(
      dependencies.$app,
      dependencies.eventCoordinates,
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

export const createDragAndDropPlugin = (minutesPerInterval = 15) => {
  return definePlugin(
    'dragAndDrop',
    new DragAndDropPluginImpl(minutesPerInterval)
  ) as DragAndDropPluginImpl & {
    name: PluginName.DragAndDrop
  }
}
