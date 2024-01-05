import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { TimeGridEventResizer } from './time-grid-event-resizer'

class ResizePlugin implements PluginBase {
  name = 'resize'
  $app: CalendarAppSingleton | null = null

  init($app: CalendarAppSingleton) {
    this.$app = $app
  }

  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    mouseDownEvent: MouseEvent
  ) {
    if (!this.$app) return this.logError()

    // TODO: let implementer configure threshold
    new TimeGridEventResizer(
      this.$app,
      calendarEvent,
      mouseDownEvent.clientY,
      25
    )
  }

  // createDateGridEventResizer() {}
  //
  // createMonthGridEventResizer() {}

  private logError() {
    console.error('The calendar is not yet initialized. Cannot resize events.')
  }
}
