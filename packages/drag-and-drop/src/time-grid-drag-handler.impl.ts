import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { setDateInDateTime } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import TimeGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/time-grid-drag-handler.interface'
import { updateDraggedEvent } from './utils/stateless/update-dragged-event'
import { EventCoordinates } from '@schedule-x/shared/src/interfaces/shared/event-coordinates'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'
import { testIfShouldAbort } from './utils/stateless/test-if-should-abort'
import { Temporal } from 'temporal-polyfill'

export default class TimeGridDragHandlerImpl implements TimeGridDragHandler {
  private readonly dayWidth: number
  private readonly startY: number
  private readonly startX
  private lastIntervalDiff = 0
  private lastDaysDiff = 0
  private readonly originalStart: Temporal.ZonedDateTime
  private readonly originalEnd: Temporal.ZonedDateTime

  constructor(
    private $app: CalendarAppSingleton,
    private eventCoordinates: EventCoordinates,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private dayBoundariesDateTime: DayBoundariesDateTime,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number
  ) {
    this.dayWidth = (
      ($app.elements.calendarWrapper as HTMLElement).querySelector(
        '.sx__time-grid-day'
      ) as HTMLDivElement
    ).clientWidth
    this.startY = this.eventCoordinates.clientY
    this.startX = this.eventCoordinates.clientX
    this.originalStart = Temporal.ZonedDateTime.from(this.eventCopy.start)  
    this.originalEnd = Temporal.ZonedDateTime.from(this.eventCopy.end)
    this.init()
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseOrTouchMove)
    document.addEventListener('mouseup', this.handleMouseUpOrTouchEnd)

    document.addEventListener('touchmove', this.handleMouseOrTouchMove, {
      passive: false,
    })
    document.addEventListener('touchend', this.handleMouseUpOrTouchEnd)
  }

  private handleMouseOrTouchMove = (uiEvent: UIEvent) => {
    const { clientX, clientY } = getEventCoordinates(uiEvent)
    const pixelDiffY = clientY - this.startY
    const timePointsDiffY = pixelDiffY * this.timePointsPerPixel()
    const currentIntervalDiff = Math.round(
      timePointsDiffY / this.CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const pixelDiffX = clientX - this.startX
    const currentDaysDiff = Math.round(pixelDiffX / this.dayWidth)

    this.handleVerticalMouseOrTouchMove(currentIntervalDiff)
    this.handleHorizontalMouseOrTouchMove(currentDaysDiff)
  }

  private timePointsPerPixel(): number {
    return getTimePointsPerPixel(this.$app)
  }

  private handleVerticalMouseOrTouchMove(currentIntervalDiff: number) {
    if (currentIntervalDiff === this.lastIntervalDiff) return

    const pointsToAdd =
      currentIntervalDiff > this.lastIntervalDiff
        ? this.CHANGE_THRESHOLD_IN_TIME_POINTS
        : -this.CHANGE_THRESHOLD_IN_TIME_POINTS
    this.setTimeForEventCopy(pointsToAdd)
    this.lastIntervalDiff = currentIntervalDiff
  }

  private setTimeForEventCopy(pointsToAdd: number) {
    const newStart = addTimePointsToDateTime(this.eventCopy.start as Temporal.ZonedDateTime, pointsToAdd)
    const newEnd = addTimePointsToDateTime(this.eventCopy.end as Temporal.ZonedDateTime, pointsToAdd)
    let currentDiff = this.lastDaysDiff

    if (this.$app.config.direction === 'rtl') {
      currentDiff = -currentDiff
    }

    if (newStart.toString() < addDays(this.dayBoundariesDateTime.start, currentDiff).toString()) return
    if (newEnd.toString() > addDays(this.dayBoundariesDateTime.end, currentDiff).toString()) return

    this.eventCopy.start = newStart
    this.eventCopy.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private handleHorizontalMouseOrTouchMove(totalDaysDiff: number) {
    if (totalDaysDiff === this.lastDaysDiff) return

    let diffToAdd = totalDaysDiff - this.lastDaysDiff
    if (this.$app.config.direction === 'rtl') diffToAdd = -diffToAdd

    const newStartDate = addDays(
      this.eventCopy.start,
      diffToAdd
    ) as Temporal.ZonedDateTime
    const newEndDate = addDays(this.eventCopy.end, diffToAdd) as Temporal.ZonedDateTime
    const newStart = setDateInDateTime(this.eventCopy.start as Temporal.ZonedDateTime, newStartDate)
    const newEnd = setDateInDateTime(this.eventCopy.end as Temporal.ZonedDateTime, newEndDate)

    if (newStart.toString() < (this.$app.calendarState.range.value as DateRange).start.toString())
      return
    if (newEnd.toString() > (this.$app.calendarState.range.value as DateRange).end.toString()) return

    this.setDateForEventCopy(newStart, newEnd)
    this.transformEventCopyPosition(totalDaysDiff)
    this.lastDaysDiff = totalDaysDiff
  }

  private setDateForEventCopy(newStart: Temporal.ZonedDateTime, newEnd: Temporal.ZonedDateTime) {
    this.eventCopy.start = newStart
    this.eventCopy.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private transformEventCopyPosition(totalDaysDiff: number) {
    const copyElement = (
      this.$app.elements.calendarWrapper as HTMLElement
    ).querySelector(
      '#' + getTimeGridEventCopyElementId(this.eventCopy.id)
    ) as HTMLDivElement
    copyElement.style.transform = `translateX(calc(${
      totalDaysDiff * 100
    }% + ${totalDaysDiff}px))`
  }

  private handleMouseUpOrTouchEnd = async () => {
    document.removeEventListener('mousemove', this.handleMouseOrTouchMove)
    document.removeEventListener('touchmove', this.handleMouseOrTouchMove)
    document.removeEventListener('mouseup', this.handleMouseUpOrTouchEnd)
    document.removeEventListener('touchend', this.handleMouseUpOrTouchEnd)
    this.updateCopy(undefined)

    const shouldAbort = await testIfShouldAbort(
      this.$app,
      this.eventCopy,
      this.originalStart,
      this.originalEnd,
      this.updateCopy
    )
    if (shouldAbort) return

    this.updateOriginalEvent()
  }

  private updateOriginalEvent() {
    if (this.lastIntervalDiff === 0 && this.lastDaysDiff === 0) return

    const dayIsSame = this.lastDaysDiff === 0
    const eventElement = document.querySelector(
      `[data-event-id="${this.eventCopy.id}"]`
    )
    const shouldHideEventToPreventFlickering =
      !dayIsSame && eventElement instanceof HTMLElement
    if (shouldHideEventToPreventFlickering) eventElement.style.display = 'none'

    updateDraggedEvent(this.$app, this.eventCopy, this.originalStart)
  }
}
