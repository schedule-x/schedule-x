import DateGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/date-grid-drag-handler.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/calendar/src/types/date-range'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'

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
    this.init()
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseMove)
    // document.addEventListener('mouseup', this.handleMouseUp, { once: true })
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
    console.log(this.eventCopy.time)
    this.updateCopy(this.eventCopy)
    this.lastDaysDiff = currentDaysDiff
  }

  private handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    this.updateCopy(undefined)
  }
}
