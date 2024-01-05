import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'

export class TimeGridEventResizer {
  private lastIntervalDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private calendarEvent: CalendarEventInternal,
    private initialY: number,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number
  ) {
    this.setupEventListeners()
  }

  setupEventListeners() {
    console.log('initiating time grid event resizer')
    ;(this.$app.elements.calendarWrapper as HTMLElement).addEventListener(
      'mousemove',
      this.handleMouseMove
    )
  }

  private handleMouseMove = (event: MouseEvent) => {
    const pixelDiffY = event.clientY - this.initialY
    const timePointsDiffY = pixelDiffY * this.timePointsPerPixel()
    const currentIntervalDiff = Math.round(
      timePointsDiffY / this.CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const timeDidNotChange = currentIntervalDiff === this.lastIntervalDiff
    if (timeDidNotChange) return

    const pointsToAdd =
      currentIntervalDiff > this.lastIntervalDiff
        ? this.CHANGE_THRESHOLD_IN_TIME_POINTS
        : -this.CHANGE_THRESHOLD_IN_TIME_POINTS
    this.setTimeForEventCopy(pointsToAdd)
  }

  private timePointsPerPixel(): number {
    return getTimePointsPerPixel(this.$app)
  }

  // TODO: maybe refactor to shared
  private setTimeForEventCopy(pointsToAdd: number) {
    // const newStart = addTimePointsToDateTime(this.calendarEvent.start, pointsToAdd)
    // const newEnd = addTimePointsToDateTime(this.calendarEvent.end, pointsToAdd)
    // if (newStart < addDays(this.dayBoundariesDateTime.start, this.lastDaysDiff))
    //   return
    // if (newEnd > addDays(this.dayBoundariesDateTime.end, this.lastDaysDiff))
    //   return
    //
    // this.calendarEvent.start = newStart
    // this.calendarEvent.end = newEnd
    // this.updateCopy(this.eventCopy)
  }
}
