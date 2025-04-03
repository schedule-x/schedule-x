import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { getTimeGridDayWidth } from '@schedule-x/shared/src/utils/stateless/calendar/get-time-grid-day-width'
import { addDays } from '@schedule-x/shared/src'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { updateEventsList } from './utils/stateless/update-events-list'

export class DateGridEventResizer {
  private readonly dayWidth: number = 0
  private readonly originalEventEnd: string
  private readonly ORIGINAL_NDAYS: number
  private lastNDaysDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private initialX: number
  ) {
    this.originalEventEnd = eventCopy.end
    this.ORIGINAL_NDAYS = eventCopy._nDaysInGrid || 0
    const calendarWrapper = this.$app.elements.calendarWrapper

    if (!calendarWrapper) return

    calendarWrapper.classList.add('sx__is-resizing')
    this.dayWidth = getTimeGridDayWidth(this.$app)
    this.setupEventListeners()
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
    let lastNDaysDiff = Math.floor(xDifference / this.dayWidth)
    if (this.$app.config.direction === 'rtl') lastNDaysDiff *= -1

    this.lastNDaysDiff = lastNDaysDiff
    this.setNewTimeForEventEnd()
  }

  private setNewTimeForEventEnd() {
    const newEnd = addDays(this.originalEventEnd, this.lastNDaysDiff)
    if (
      newEnd > (this.$app.calendarState.range.value as DateRange).end ||
      newEnd < this.eventCopy.start ||
      newEnd <
        toDateString(
          toJSDate((this.$app.calendarState.range.value as DateRange).start)
        )
    )
      return

    this.eventCopy.end = newEnd
    this.eventCopy._nDaysInGrid = this.ORIGINAL_NDAYS + this.lastNDaysDiff
    this.updateCopy(this.eventCopy)
  }

  private handleMouseUp = () => {
    const onBeforeEventUpdate = this.$app.config.callbacks.onBeforeEventUpdate
    if (onBeforeEventUpdate) {
      const oldEvent = this.eventCopy._getExternalEvent()
      oldEvent.end = this.originalEventEnd
      const newEvent = this.eventCopy._getExternalEvent()
      const validationResult = onBeforeEventUpdate(
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

    updateEventsList(
      this.$app,
      this.eventCopy,
      this.originalEventEnd,
      this.eventCopy.end
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
      this.handleMouseMove
    )
  }
}
