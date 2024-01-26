import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

export class TimeGridEventResizer {
  private readonly originalEventEnd: string
  private lastIntervalDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private calendarEvent: CalendarEventInternal,
    private initialY: number,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number,
    private dayBoundariesDateTime: DayBoundariesDateTime
  ) {
    this.setupEventListeners()
    this.originalEventEnd = this.calendarEvent.end
  }

  setupEventListeners() {
    ;(this.$app.elements.calendarWrapper as HTMLElement).addEventListener(
      'mousemove',
      this.handleMouseMove
    )
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (event: MouseEvent) => {
    const pixelDiffY = event.clientY - this.initialY
    const timePointsDiffY = pixelDiffY * getTimePointsPerPixel(this.$app)
    const currentIntervalDiff = Math.round(
      timePointsDiffY / this.CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const timeDidNotChange = currentIntervalDiff === this.lastIntervalDiff
    if (timeDidNotChange) return
    this.lastIntervalDiff = currentIntervalDiff

    this.setTimeForEventCopy(
      this.CHANGE_THRESHOLD_IN_TIME_POINTS * currentIntervalDiff
    )
  }

  private setTimeForEventCopy(pointsToAdd: number) {
    const newEnd = addTimePointsToDateTime(this.originalEventEnd, pointsToAdd)
    if (
      newEnd > this.dayBoundariesDateTime.end ||
      newEnd <= this.calendarEvent.start
    )
      return

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

  private handleMouseUp = () => {
    ;(this.$app.elements.calendarWrapper as HTMLElement).removeEventListener(
      'mousemove',
      this.handleMouseMove
    )
  }
}
