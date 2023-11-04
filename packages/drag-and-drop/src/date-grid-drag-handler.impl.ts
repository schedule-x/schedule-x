import DateGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/date-grid-drag-handler.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { getTimeGridDayWidth } from './utils/stateless/get-time-grid-day-width'
import { replaceOriginalWithCopy } from './utils/stateless/replace-original-with-copy'
import { getDateGridEventCopy } from './utils/stateless/get-date-grid-event-copy'

const MS_PER_DAY = 1000 * 60 * 60 * 24

export default class DateGridDragHandlerImpl implements DateGridDragHandler {
  private readonly startX: number
  private readonly dayWidth: number
  private readonly originalStart: string
  private readonly originalEnd: string
  private readonly rangeStartDate: string
  private readonly rangeEndDate: string
  private lastDaysDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ) {
    this.startX = event.clientX
    this.dayWidth = getTimeGridDayWidth(this.$app)
    this.originalStart = this.eventCopy.time.start
    this.originalEnd = this.eventCopy.time.end
    this.rangeStartDate = dateFromDateTime(
      (this.$app.calendarState.range.value as DateRange).start
    )
    this.rangeEndDate = dateFromDateTime(
      (this.$app.calendarState.range.value as DateRange).end
    )
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
    const newStartIsInWeek =
      newStartDate >= this.rangeStartDate && newStartDate <= this.rangeEndDate
    const firstDateInGrid = newStartIsInWeek
      ? newStartDate
      : this.rangeStartDate
    const lastDateIsInGrid =
      newEndDate >= this.rangeStartDate && newEndDate <= this.rangeEndDate
    const lastDateInGrid = lastDateIsInGrid ? newEndDate : this.rangeEndDate
    this.eventCopy._nDaysInGrid =
      Math.round(
        (new Date(lastDateInGrid).getTime() -
          new Date(firstDateInGrid).getTime()) /
          MS_PER_DAY
      ) + 1

    /**
     * Transitioning the position sideways is not necessary as long as the start date is earlier than the first date in the grid.
     * While moving an event during a state as such, it will optically look as if its position is transitioned, since the event width is increased and decreased
     * as the event is moved.
     * */
    if (newStartDate >= this.rangeStartDate)
      this.transformEventCopyPosition(newStartDate)
    this.updateCopy(this.eventCopy)
    this.lastDaysDiff = currentDaysDiff
  }

  private transformEventCopyPosition(newStartDate: string) {
    const dateFromOriginalStart = dateFromDateTime(this.originalStart)
    const daysToShift = Math.round(
      (new Date(newStartDate).getTime() -
        new Date(
          dateFromOriginalStart >= this.rangeStartDate
            ? dateFromOriginalStart
            : this.rangeStartDate
        ).getTime()) /
        MS_PER_DAY
    )
    getDateGridEventCopy(
      this.$app,
      this.eventCopy
    ).style.transform = `translateX(calc(${
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

    replaceOriginalWithCopy(this.$app, this.eventCopy)
  }
}
