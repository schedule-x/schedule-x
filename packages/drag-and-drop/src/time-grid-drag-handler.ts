/* eslint-disable max-lines */
import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/calendar/src/types/date-range'
import { setDateInDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'

export default class TimeGridDragHandler {
  private readonly originalStart: string
  private readonly originalEnd: string
  private readonly dayWidth: number
  private readonly startY: number
  private readonly startX
  private lastChangeInIntervals = 0
  private lastTotalChangeInDays = 0

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

  get timePointsPerPixel(): number {
    return (
      this.$app.config.timePointsPerDay /
      this.$app.config.weekOptions.gridHeight
    )
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (typeof this.startY === 'undefined')
      throw new Error('startY is undefined')

    const pixelChangeY = e.clientY - this.startY
    const timePointsChangeY = pixelChangeY * this.timePointsPerPixel
    const currentChangeInIntervals = Math.round(
      timePointsChangeY / this.CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const pixelChangeX = e.clientX - this.startX
    const currentTotalChangeInDays = Math.round(pixelChangeX / this.dayWidth)

    this.handleVerticalMouseMove(currentChangeInIntervals)
    this.handleHorizontalMouseMove(currentTotalChangeInDays)
  }

  private handleVerticalMouseMove(currentChangeInIntervals: number) {
    if (currentChangeInIntervals === this.lastChangeInIntervals) return

    const pointsToAdd =
      currentChangeInIntervals > this.lastChangeInIntervals
        ? this.CHANGE_THRESHOLD_IN_TIME_POINTS
        : -this.CHANGE_THRESHOLD_IN_TIME_POINTS
    this.setTimeForEventCopy(pointsToAdd)
    this.lastChangeInIntervals = currentChangeInIntervals
  }

  private setTimeForEventCopy(pointsToAdd: number) {
    const newStart = addTimePointsToDateTime(
      this.eventCopy.time.start,
      pointsToAdd
    )
    const newEnd = addTimePointsToDateTime(this.eventCopy.time.end, pointsToAdd)
    if (
      newStart <
      addDays(this.dayBoundariesDateTime.start, this.lastTotalChangeInDays)
    )
      return
    if (
      newEnd >
      addDays(this.dayBoundariesDateTime.end, this.lastTotalChangeInDays)
    )
      return

    this.eventCopy.time.start = newStart
    this.eventCopy.time.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private handleHorizontalMouseMove(totalChangeInDays: number) {
    if (totalChangeInDays === this.lastTotalChangeInDays) return

    const newStartDate = addDays(
      dateFromDateTime(this.originalStart),
      totalChangeInDays
    )
    const newEndDate = addDays(
      dateFromDateTime(this.originalEnd),
      totalChangeInDays
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
    this.transformEventCopyPosition(totalChangeInDays)
    this.lastTotalChangeInDays = totalChangeInDays
  }

  private setDateForEventCopy(newStart: string, newEnd: string) {
    this.eventCopy.time.start = newStart
    this.eventCopy.time.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  private transformEventCopyPosition(totalChangeInDays: number) {
    const el = document.getElementById(
      getTimeGridEventCopyElementId(this.eventCopy.id)
    )
    if (!el) throw 'no event copy found to transition' // todo: custom error or no error?

    el.style.transform = `translateX(calc(${
      totalChangeInDays * 100
    }% + ${totalChangeInDays}px))`
  }

  private handleMouseUp = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    this.updateOriginalEvent()
    this.updateCopy(undefined)
  }

  private updateOriginalEvent() {
    if (this.lastChangeInIntervals === 0 && this.lastTotalChangeInDays === 0)
      return

    const eventToUpdate = this.$app.calendarEvents.list.value.find(
      (event) => event.id === this.eventCopy.id
    )
    if (!eventToUpdate) throw new Error('eventToUpdate is undefined')

    eventToUpdate.time.start = this.eventCopy.time.start
    eventToUpdate.time.end = this.eventCopy.time.end
    this.$app.calendarEvents.list.value = [
      ...this.$app.calendarEvents.list.value,
    ]
  }
}
