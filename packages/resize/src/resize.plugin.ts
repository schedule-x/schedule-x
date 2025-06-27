import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { TimeGridEventResizer } from './time-grid-event-resizer'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { DateGridEventResizer } from './date-grid-event-resizer'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'

class ResizePluginImpl implements ResizePlugin {
  name = PluginName.Resize
  $app: CalendarAppSingleton | null = null

  constructor(private minutesPerInterval: number) {}

  onRender($app: CalendarAppSingleton) {
    this.$app = $app
  }

  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    uiEvent: MouseEvent | TouchEvent,
    dayBoundariesDateTime: { start: string; end: string }
  ) {
    if (!this.$app) return this.logError()

    const { clientY } = getEventCoordinates(uiEvent)
    new TimeGridEventResizer(
      this.$app,
      calendarEvent,
      updateCopy,
      clientY,
      this.getTimePointsForIntervalConfig(),
      dayBoundariesDateTime
    )
  }

  createDateGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    uiEvent: MouseEvent | TouchEvent
  ) {
    if (!this.$app) return this.logError()

    const { clientX } = getEventCoordinates(uiEvent)
    new DateGridEventResizer(this.$app, calendarEvent, updateCopy, clientX)
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

export const createResizePlugin = (minutesPerInterval = 15) => {
  return definePlugin(
    'resize',
    new ResizePluginImpl(minutesPerInterval)
  ) as ResizePluginImpl & {
    name: 'resize'
  }
}
