import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { setDateInDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import TimeGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/time-grid-drag-handler.interface'
import { updateDraggedEvent } from './utils/stateless/update-dragged-event'
import { EventCoordinates } from '@schedule-x/shared/src/interfaces/shared/event-coordinates'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'

export default class TimeGridDragHandlerImpl implements TimeGridDragHandler {
  private readonly dayWidth: number
  private readonly startY: number
  private readonly startX
  private lastIntervalDiff = 0
  private lastDaysDiff = 0
  private originalStart: string

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
    this.originalStart = this.eventCopy.start
    this.init()
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseOrTouchMove)
    document.addEventListener('mouseup', this.handleMouseUpOrTouchEnd, {
      once: true,
    })

    document.addEventListener('touchmove', this.handleMouseOrTouchMove, {
      passive: false,
    })
    document.addEventListener('touchend', this.handleMouseUpOrTouchEnd, {
      once: true,
    })
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
    const newStart = addTimePointsToDateTime(this.eventCopy.start, pointsToAdd)
    const newEnd = addTimePointsToDateTime(this.eventCopy.end, pointsToAdd)
    if (newStart < addDays(this.dayBoundariesDateTime.start, this.lastDaysDiff))
      return
    if (newEnd > addDays(this.dayBoundariesDateTime.end, this.lastDaysDiff))
      return

    this.eventCopy.start = newStart
    this.eventCopy.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private handleHorizontalMouseOrTouchMove(totalDaysDiff: number) {
    if (totalDaysDiff === this.lastDaysDiff) return
    const diffToAdd = totalDaysDiff - this.lastDaysDiff
    const newStartDate = addDays(
      dateFromDateTime(this.eventCopy.start),
      diffToAdd
    )
    const newEndDate = addDays(dateFromDateTime(this.eventCopy.end), diffToAdd)
    const newStart = setDateInDateTimeString(this.eventCopy.start, newStartDate)
    const newEnd = setDateInDateTimeString(this.eventCopy.end, newEndDate)

    if (newStart < (this.$app.calendarState.range.value as DateRange).start)
      return
    if (newEnd > (this.$app.calendarState.range.value as DateRange).end) return

    this.setDateForEventCopy(newStart, newEnd)
    this.transformEventCopyPosition(totalDaysDiff)
    this.lastDaysDiff = totalDaysDiff
  }

  private setDateForEventCopy(newStart: string, newEnd: string) {
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

  private handleMouseUpOrTouchEnd = () => {
    document.removeEventListener('mousemove', this.handleMouseOrTouchMove)
    document.removeEventListener('touchmove', this.handleMouseOrTouchMove)
    this.updateCopy(undefined)
    this.updateOriginalEvent()
  }

  private updateOriginalEvent() {
    if (this.lastIntervalDiff === 0 && this.lastDaysDiff === 0) return
    updateDraggedEvent(this.$app, this.eventCopy, this.originalStart)
  }
}
