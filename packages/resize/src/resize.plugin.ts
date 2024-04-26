import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { TimeGridEventResizer } from './time-grid-event-resizer'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { DateGridEventResizer } from './date-grid-event-resizer'

class ResizePluginImpl implements ResizePlugin {
  name = PluginName.Resize
  $app: CalendarAppSingleton | null = null

  constructor(private minutesPerInterval: number) {}

  init($app: CalendarAppSingleton) {
    this.$app = $app
  }

  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    mouseDownEvent: MouseEvent,
    dayBoundariesDateTime: { start: string; end: string }
  ) {
    if (!this.$app) return this.logError()

    new TimeGridEventResizer(
      this.$app,
      calendarEvent,
      mouseDownEvent.clientY,
      this.getTimePointsForIntervalConfig(),
      dayBoundariesDateTime
    )
  }

  createDateGridEventResizer(
    calendarEvent: CalendarEventInternal,
    mouseDownEvent: MouseEvent
  ) {
    if (!this.$app) return this.logError()

    new DateGridEventResizer(this.$app, calendarEvent, mouseDownEvent.clientX)
  }

  private getTimePointsForIntervalConfig(): number {
    if (this.minutesPerInterval === 60) return 100
    if (this.minutesPerInterval === 30) return 50
    return 25
  }

  private logError() {
    console.error('The calendar is not yet initialized. Cannot resize events.')
  }
}

export const createResizePlugin = (minutesPerInterval = 15): ResizePlugin =>
  new ResizePluginImpl(minutesPerInterval)
