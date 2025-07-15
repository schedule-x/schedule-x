import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { updateEventsList } from './utils/stateless/update-events-list'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { Temporal } from 'temporal-polyfill'

export class TimeGridEventResizer {
  private readonly originalEventEnd: Temporal.ZonedDateTime
  private lastIntervalDiff = 0
  private lastValidEnd: Temporal.ZonedDateTime

  constructor(
    private $app: CalendarAppSingleton,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private initialY: number,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number,
    private dayBoundariesDateTime: DayBoundariesDateTime
  ) {
    this.originalEventEnd = this.eventCopy.end as Temporal.ZonedDateTime
    this.lastValidEnd = this.eventCopy.end as Temporal.ZonedDateTime
    const calendarWrapper = this.$app.elements.calendarWrapper
    if (!calendarWrapper) return

    calendarWrapper.classList.add('sx__is-resizing')
    this.setupEventListeners()
  }

  setupEventListeners() {
    ;(this.$app.elements.calendarWrapper as HTMLElement).addEventListener(
      'mousemove',
      this.handleMouseOrTouchMove
    )
    document.addEventListener('mouseup', this.handleMouseUpOrTouchEnd, {
      once: true,
    })
    ;(this.$app.elements.calendarWrapper as HTMLElement).addEventListener(
      'touchmove',
      this.handleMouseOrTouchMove,
      { passive: false }
    )
    document.addEventListener('touchend', this.handleMouseUpOrTouchEnd, {
      once: true,
    })
  }

  private handleMouseOrTouchMove = (event: UIEvent) => {
    const { clientY } = getEventCoordinates(event)
    const pixelDiffY = clientY - this.initialY
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

  private setNewTimeForEventEnd(pointsToAdd: number) {
    const newEnd = addTimePointsToDateTime(this.originalEventEnd, pointsToAdd)

    if (
      newEnd.toString() > this.dayBoundariesDateTime.end.toString() ||
      newEnd.toString() <= this.eventCopy.start.toString()
    )
      return

    this.lastValidEnd = newEnd
    this.eventCopy.end = this.lastValidEnd
    this.updateCopy(this.eventCopy)
  }

  private handleMouseUpOrTouchEnd = async () => {
    const onBeforeEventUpdate =
      this.$app.config.callbacks.onBeforeEventUpdateAsync ||
      this.$app.config.callbacks.onBeforeEventUpdate
    if (onBeforeEventUpdate) {
      const oldEvent = this.eventCopy._getExternalEvent()
      oldEvent.end = this.originalEventEnd
      const newEvent = this.eventCopy._getExternalEvent()
      const validationResult = await onBeforeEventUpdate(
        oldEvent,
        newEvent,
        this.$app
      )

      if (!validationResult) {
        this.eventCopy.end = this.originalEventEnd
        this.finish()
        return
      }
    }

    this.setNewTimeForEventEnd(
      this.CHANGE_THRESHOLD_IN_TIME_POINTS * this.lastIntervalDiff
    )
    updateEventsList(
      this.$app,
      this.eventCopy,
      this.originalEventEnd,
      this.lastValidEnd
    )
    this.finish()

    if (this.$app.config.callbacks.onEventUpdate) {
      this.$app.config.callbacks.onEventUpdate(
        this.eventCopy._getExternalEvent()
      )
    }
  }

  private finish() {
    this.updateCopy(undefined)
    ;(this.$app.elements.calendarWrapper as HTMLElement).classList.remove(
      'sx__is-resizing'
    )
    ;(this.$app.elements.calendarWrapper as HTMLElement).removeEventListener(
      'mousemove',
      this.handleMouseOrTouchMove
    )
    ;(this.$app.elements.calendarWrapper as HTMLElement).removeEventListener(
      'touchmove',
      this.handleMouseOrTouchMove
    )
  }
}
