import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { updateEventsList } from './utils/stateless/update-events-list'

export class TimeGridEventResizer {
  private readonly originalEventEnd: string
  private lastIntervalDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private calendarEvent: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private initialY: number,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number,
    private dayBoundariesDateTime: DayBoundariesDateTime
  ) {
    this.setupEventListeners()
    this.originalEventEnd = this.calendarEvent.end
    ;(this.$app.elements.calendarWrapper as HTMLElement).classList.add(
      'sx__is-resizing'
    )
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

    this.setNewTimeForEventEnd(
      this.CHANGE_THRESHOLD_IN_TIME_POINTS * currentIntervalDiff
    )
  }

  private setNewTimeForEventEnd(pointsToAdd: number, shouldUpdateList = false) {
    const endBeforeUpdate = this.calendarEvent.end
    const newEnd = addTimePointsToDateTime(this.originalEventEnd, pointsToAdd)
    if (
      newEnd > this.dayBoundariesDateTime.end ||
      newEnd <= this.calendarEvent.start
    )
      return

    this.calendarEvent.end = newEnd
    this.updateCopy(this.calendarEvent)

    if (shouldUpdateList) {
      updateEventsList(this.$app, this.calendarEvent, endBeforeUpdate, newEnd)
    }
  }

  private handleMouseUp = () => {
    this.setNewTimeForEventEnd(
      this.CHANGE_THRESHOLD_IN_TIME_POINTS * this.lastIntervalDiff,
      true
    )
    this.updateCopy(undefined)
    ;(this.$app.elements.calendarWrapper as HTMLElement).classList.remove(
      'sx__is-resizing'
    )
    ;(this.$app.elements.calendarWrapper as HTMLElement).removeEventListener(
      'mousemove',
      this.handleMouseMove
    )

    if (this.$app.config.callbacks.onEventUpdate) {
      this.$app.config.callbacks.onEventUpdate(
        this.calendarEvent._getExternalEvent()
      )
    }
  }
}
