import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { TimeGridEventResizer } from './time-grid-event-resizer'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { DateGridEventResizer } from './date-grid-event-resizer'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { DateRange } from '@schedule-x/shared/src/types/date-range'

class ResizePluginImpl implements ResizePlugin {
  name = PluginName.Resize
  $app: CalendarAppSingleton | null = null

  constructor(private minutesPerInterval: number = 15) {
    this.minutesPerInterval = this.validateInterval(minutesPerInterval)
  }

  onRender($app: CalendarAppSingleton) {
    this.$app = $app
  }

  createTimeGridEventResizer(
    calendarEvent: CalendarEventInternal,
    updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    uiEvent: MouseEvent | TouchEvent,
    dayBoundariesDateTime: DateRange
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
    return (100 * this.minutesPerInterval) / 60
  }

  private logError() {
    console.error('The calendar is not yet initialized. Cannot resize events.')
  }

  private validateInterval(minutes: number): number {
    if (minutes < 5) {
      console.warn(`Interval must be at least 5 minutes. Setting to 5 minutes.`)
      return 5
    }
    if (minutes > 60) {
      console.warn(`Interval cannot exceed 60 minutes. Setting to 60 minutes.`)
      return 60
    }
    return minutes
  }

  public setInterval(minutes: number) {
    this.minutesPerInterval = this.validateInterval(minutes)
    return this
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
