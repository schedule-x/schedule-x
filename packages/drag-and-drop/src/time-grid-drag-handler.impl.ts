import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/calendar/src/types/date-range'
import { setDateInDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import TimeGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/time-grid-drag-handler.interface'
import { replaceOriginalWithCopy } from './utils/stateless/replace-original-with-copy'

export default class TimeGridDragHandlerImpl implements TimeGridDragHandler {
  private readonly originalStart: string
  private readonly originalEnd: string
  private readonly dayWidth: number
  private readonly startY: number
  private readonly startX
  private lastIntervalDiff = 0
  private lastDaysDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private dayBoundariesDateTime: DayBoundariesDateTime,
    private readonly CHANGE_THRESHOLD_IN_TIME_POINTS: number
  ) {
    this.dayWidth = (
      document.querySelector('.sx__time-grid-day') as HTMLDivElement
    ).clientWidth
    this.originalStart = this.eventCopy.time.start
    this.originalEnd = this.eventCopy.time.end
    this.startY = this.event.clientY
    this.startX = this.event.clientX
    this.init()
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (e: MouseEvent) => {
    const pixelDiffY = e.clientY - this.startY
    const timePointsDiffY = pixelDiffY * this.timePointsPerPixel()
    const currentIntervalDiff = Math.round(
      timePointsDiffY / this.CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const pixelDiffX = e.clientX - this.startX
    const currentDaysDiff = Math.round(pixelDiffX / this.dayWidth)

    this.handleVerticalMouseMove(currentIntervalDiff)
    this.handleHorizontalMouseMove(currentDaysDiff)
  }

  private timePointsPerPixel(): number {
    return (
      this.$app.config.timePointsPerDay /
      this.$app.config.weekOptions.gridHeight
    )
  }

  private handleVerticalMouseMove(currentIntervalDiff: number) {
    if (currentIntervalDiff === this.lastIntervalDiff) return

    const pointsToAdd =
      currentIntervalDiff > this.lastIntervalDiff
        ? this.CHANGE_THRESHOLD_IN_TIME_POINTS
        : -this.CHANGE_THRESHOLD_IN_TIME_POINTS
    this.setTimeForEventCopy(pointsToAdd)
    this.lastIntervalDiff = currentIntervalDiff
  }

  private setTimeForEventCopy(pointsToAdd: number) {
    const newStart = addTimePointsToDateTime(
      this.eventCopy.time.start,
      pointsToAdd
    )
    const newEnd = addTimePointsToDateTime(this.eventCopy.time.end, pointsToAdd)
    if (newStart < addDays(this.dayBoundariesDateTime.start, this.lastDaysDiff))
      return
    if (newEnd > addDays(this.dayBoundariesDateTime.end, this.lastDaysDiff))
      return

    this.eventCopy.time.start = newStart
    this.eventCopy.time.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private handleHorizontalMouseMove(totalDaysDiff: number) {
    if (totalDaysDiff === this.lastDaysDiff) return

    const newStartDate = addDays(
      dateFromDateTime(this.originalStart),
      totalDaysDiff
    )
    const newEndDate = addDays(
      dateFromDateTime(this.originalEnd),
      totalDaysDiff
    )
    const newStart = setDateInDateTimeString(
      this.eventCopy.time.start,
      newStartDate
    )
    const newEnd = setDateInDateTimeString(this.eventCopy.time.end, newEndDate)

    if (newStart < (this.$app.calendarState.range.value as DateRange).start)
      return
    if (newEnd > (this.$app.calendarState.range.value as DateRange).end) return

    this.setDateForEventCopy(newStart, newEnd)
    this.transformEventCopyPosition(totalDaysDiff)
    this.lastDaysDiff = totalDaysDiff
  }

  private setDateForEventCopy(newStart: string, newEnd: string) {
    this.eventCopy.time.start = newStart
    this.eventCopy.time.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private transformEventCopyPosition(totalDaysDiff: number) {
    const copyElement = document.getElementById(
      getTimeGridEventCopyElementId(this.eventCopy.id)
    ) as HTMLDivElement
    copyElement.style.transform = `translateX(calc(${
      totalDaysDiff * 100
    }% + ${totalDaysDiff}px))`
  }

  private handleMouseUp = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    this.updateCopy(undefined)
    this.updateOriginalEvent()
  }

  private updateOriginalEvent() {
    if (this.lastIntervalDiff === 0 && this.lastDaysDiff === 0) return

    replaceOriginalWithCopy(this.$app, this.eventCopy)
  }
}
