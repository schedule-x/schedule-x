import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { TimeGridEventResizer } from './time-grid-event-resizer'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'

class ResizePluginImpl implements ResizePlugin {
  name = 'resize'
  $app: CalendarAppSingleton | null = null

  init($app: CalendarAppSingleton) {
    this.$app = $app
  }

  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    mouseDownEvent: MouseEvent,
    dayBoundariesDateTime: { start: string; end: string }
  ) {
    if (!this.$app) return this.logError()

    // TODO: let implementer configure threshold
    new TimeGridEventResizer(
      this.$app,
      calendarEvent,
      mouseDownEvent.clientY,
      25,
      dayBoundariesDateTime
    )
  }

  // createDateGridEventResizer() {}
  //
  // createMonthGridEventResizer() {}

  private logError() {
    console.error('The calendar is not yet initialized. Cannot resize events.')
  }
}

export const createResizePlugin = (): ResizePlugin => new ResizePluginImpl()
