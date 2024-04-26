import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { getTimeGridDayWidth } from '@schedule-x/shared/src/utils/stateless/calendar/get-time-grid-day-width'
import { addDays } from '@schedule-x/shared/src'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { updateEventsList } from './utils/stateless/update-events-list'

export class DateGridEventResizer {
  private readonly dayWidth: number
  private readonly originalEventEnd: string
  private readonly ORIGINAL_NDAYS: number
  private lastNDaysDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private calendarEvent: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private initialX: number
  ) {
    this.setupEventListeners()
    this.originalEventEnd = calendarEvent.end
    this.dayWidth = getTimeGridDayWidth(this.$app)
    ;(this.$app.elements.calendarWrapper as HTMLElement).classList.add(
      'sx__is-resizing'
    )
    this.ORIGINAL_NDAYS = calendarEvent._nDaysInGrid || 0
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
    this.lastNDaysDiff = Math.floor(xDifference / this.dayWidth)
    this.setNewTimeForEventEnd()
  }

  private setNewTimeForEventEnd() {
    const newEnd = addDays(this.originalEventEnd, this.lastNDaysDiff)
    if (
      newEnd > (this.$app.calendarState.range.value as DateRange).end ||
      newEnd < this.calendarEvent.start ||
      newEnd <
        toDateString(
          toJSDate((this.$app.calendarState.range.value as DateRange).start)
        )
    )
      return

    this.calendarEvent.end = newEnd
    this.calendarEvent._nDaysInGrid = this.ORIGINAL_NDAYS + this.lastNDaysDiff
    this.updateCopy(this.calendarEvent)
  }

  private handleMouseUp = () => {
    updateEventsList(
      this.$app,
      this.calendarEvent,
      this.originalEventEnd,
      this.calendarEvent.end
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
