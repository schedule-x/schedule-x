import DateGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/date-grid-drag-handler.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/calendar/src/types/date-range'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'

export default class DateGridDragHandlerImpl implements DateGridDragHandler {
  private readonly startX: number
  private readonly dayWidth: number
  private readonly originalStart: string
  private readonly originalEnd: string
  private readonly rangeStartDate: string
  private readonly rangeEndDate: string
  private lastNDaysInGrid: number
  private lastDaysDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ) {
    this.startX = event.clientX
    this.dayWidth = (
      this.$app.elements.calendarWrapper!.querySelector(
        '.sx__time-grid-day'
      ) as HTMLDivElement
    ).clientWidth
    this.originalStart = this.eventCopy.time.start
    this.originalEnd = this.eventCopy.time.end
    this.rangeStartDate = dateFromDateTime(
      (this.$app.calendarState.range.value as DateRange).start
    )
    this.rangeEndDate = dateFromDateTime(
      (this.$app.calendarState.range.value as DateRange).end
    )
    this.lastNDaysInGrid = this.eventCopy._nDaysInGrid as number
    this.init()
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (e: MouseEvent) => {
    const pixelDiffX = e.clientX - this.startX
    const currentDaysDiff = Math.round(pixelDiffX / this.dayWidth)
    if (currentDaysDiff === this.lastDaysDiff) return

    const newStart = addDays(this.originalStart, currentDaysDiff)
    const newEnd = addDays(this.originalEnd, currentDaysDiff)
    const newStartDate = dateFromDateTime(newStart)
    const newEndDate = dateFromDateTime(newEnd)
    if (newStartDate > this.rangeEndDate) return
    if (newEndDate < this.rangeStartDate) return

    this.eventCopy.time.start = newStart
    this.eventCopy.time.end = newEnd
    // todo: calculate _nDaysInGrid anew for eventCopy
    const newStartIsInWeek =
      newStartDate >= this.rangeStartDate && newStartDate <= this.rangeEndDate
    const firstDateInGrid = newStartIsInWeek
      ? newStartDate
      : this.rangeStartDate
    const lastDateIsInGrid =
      newEndDate >= this.rangeStartDate && newEndDate <= this.rangeEndDate
    const lastDateInGrid = lastDateIsInGrid ? newEndDate : this.rangeEndDate
    // calculate days between firstDateInGrid and lastDateInGrid
    const nDaysInGrid =
      Math.round(
        (new Date(lastDateInGrid).getTime() -
          new Date(firstDateInGrid).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1

    this.eventCopy._nDaysInGrid = nDaysInGrid
    if (newStartDate >= this.rangeStartDate)
      this.transformEventCopyPosition(newStartDate)
    this.updateCopy(this.eventCopy)
    this.lastDaysDiff = currentDaysDiff
    this.lastNDaysInGrid = nDaysInGrid
  }

  // copied from time-grid-drag-handler
  private transformEventCopyPosition(newStartDate: string) {
    // newStartDate - originalStartDate = daysToShift
    const dateFromOriginalStart = dateFromDateTime(this.originalStart)

    const daysToShift = Math.round(
      (new Date(newStartDate).getTime() -
        new Date(
          dateFromOriginalStart >= this.rangeStartDate
            ? dateFromOriginalStart
            : this.rangeStartDate
        ).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    console.log(daysToShift)
    const copyElement = this.$app.elements.calendarWrapper!.querySelector(
      '#' + getTimeGridEventCopyElementId(this.eventCopy.id)
    ) as HTMLDivElement
    console.log(
      `translateX(calc(${daysToShift * this.dayWidth}px + ${daysToShift}px))`
    )
    copyElement.style.transform = `translateX(calc(${
      daysToShift * this.dayWidth
    }px + ${daysToShift}px))`
  }

  private handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    this.updateOriginalEvent()
    this.updateCopy(undefined)
  }

  private updateOriginalEvent() {
    if (this.lastDaysDiff === 0) return

    // todo: reuse from time-grid-drag-handler instead of copy-pasting
    const indexOfEventToUpdate = this.$app.calendarEvents.list.value.findIndex(
      (event) => event.id === this.eventCopy.id
    )
    const updatedList = [...this.$app.calendarEvents.list.value]
    updatedList.splice(indexOfEventToUpdate, 1, this.eventCopy)
    this.$app.calendarEvents.list.value = updatedList
  }
}
