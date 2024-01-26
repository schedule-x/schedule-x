import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { getTimePointsPerPixel } from '@schedule-x/shared/src/utils/stateless/calendar/time-points-per-pixel'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { getTimeGridDayWidth } from '@schedule-x/drag-and-drop/src/utils/stateless/get-time-grid-day-width'
import { addDays } from '@schedule-x/shared'

export class DateGridEventResizer {
  private readonly dayWidth: number
  private readonly originalEventEnd: string

  constructor(
    private $app: CalendarAppSingleton,
    private calendarEvent: CalendarEventInternal,
    private initialX: number
  ) {
    this.setupEventListeners()
    this.originalEventEnd = calendarEvent.end
    this.dayWidth = getTimeGridDayWidth(this.$app)
  }

  setupEventListeners() {
    ;(this.$app.elements.calendarWrapper as HTMLElement).addEventListener(
      'mousemove',
      this.handleMouseMove
    )
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (event: MouseEvent) => {
    const xDifference = event.clientX - this.initialX
    const daysToAdd = Math.floor(xDifference / this.dayWidth)
    this.setEndForEvent(daysToAdd)
  }

  private setEndForEvent(daysToAdd: number) {
    const newEnd = addDays(this.originalEventEnd, daysToAdd)
    if (
      newEnd > (this.$app.calendarState.range.value as DateRange).end ||
      newEnd < this.calendarEvent.start
    )
      return

    this.calendarEvent.end = newEnd
    this.runSideEffects()
  }

  private runSideEffects() {
    const $app = this.$app as CalendarAppSingleton
    $app.calendarEvents.list.value = [...this.$app.calendarEvents.list.value]
    if ($app.config.callbacks.onEventUpdate) {
      $app.config.callbacks.onEventUpdate(
        this.calendarEvent._getExternalEvent()
      )
    }
  }

  private handleMouseUp = () => {
    ;(this.$app.elements.calendarWrapper as HTMLElement).removeEventListener(
      'mousemove',
      this.handleMouseMove
    )
  }
}
