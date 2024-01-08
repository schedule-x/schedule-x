import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

export class TimeGridEventResizer {
  private lastIntervalDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private calendarEvent: CalendarEventInternal,
    private initialY: number,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number,
    private dayBoundariesDateTime: DayBoundariesDateTime
  ) {
    this.setupEventListeners()
  }

  setupEventListeners() {
    ;(this.$app.elements.calendarWrapper as HTMLElement).addEventListener(
      'mousemove',
      this.handleMouseMove
    )
  }

  private handleMouseMove = (event: MouseEvent) => {
    const pixelDiffY = event.clientY - this.initialY
    const number = this.timePointsPerPixel()
    const timePointsDiffY = pixelDiffY * number
    const currentIntervalDiff = Math.round(
      timePointsDiffY / this.CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const timeDidNotChange = currentIntervalDiff === this.lastIntervalDiff
    if (timeDidNotChange) return

    this.setTimeForEventCopy(
      this.CHANGE_THRESHOLD_IN_TIME_POINTS * currentIntervalDiff
    )
  }

  private timePointsPerPixel(): number {
    return getTimePointsPerPixel(this.$app)
  }

  // TODO: maybe refactor to shared
  private setTimeForEventCopy(pointsToAdd: number) {
    const newStart = addTimePointsToDateTime(
      this.calendarEvent.start,
      pointsToAdd
    )
    const newEnd = addTimePointsToDateTime(this.calendarEvent.end, pointsToAdd)
    if (newStart < this.dayBoundariesDateTime.start) return
    if (newEnd > this.dayBoundariesDateTime.end) return

    this.calendarEvent.start = newStart
    this.calendarEvent.end = newEnd
    this.runSideEffects()
  }

  private runSideEffects() {
    const $app = this.$app as CalendarAppSingleton
    $app.calendarEvents.list.value = [...this.$app.calendarEvents.list.value]
    if ($app.config.callbacks.onEventUpdate) {
      $app.config.callbacks.onEventUpdate(
        this.calendarEvent._getExternalEvent()
      )
    }
  }
}
