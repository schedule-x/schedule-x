import DateGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/date-grid-drag-handler.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { getTimeGridDayWidth } from '@schedule-x/shared/src/utils/stateless/calendar/get-time-grid-day-width'
import { updateDraggedEvent } from './utils/stateless/update-dragged-event'
import { getDateGridEventCopy } from './utils/stateless/get-date-grid-event-copy'
import { EventCoordinates } from '@schedule-x/shared/src/interfaces/shared/event-coordinates'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { testIfShouldAbort } from './utils/stateless/test-if-should-abort'


export default class DateGridDragHandlerImpl implements DateGridDragHandler {
  private readonly startX: number
  private readonly dayWidth: number
  private readonly originalStart: Temporal.ZonedDateTime | Temporal.PlainDate
  private readonly originalEnd: Temporal.ZonedDateTime | Temporal.PlainDate
  private readonly rangeStartDate: Temporal.PlainDate
  private readonly rangeEndDate: Temporal.PlainDate
  private lastDaysDiff = 0

  constructor(
    private $app: CalendarAppSingleton,
    eventCoordinates: EventCoordinates,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ) {
    this.startX = eventCoordinates.clientX
    this.dayWidth = getTimeGridDayWidth(this.$app)
    this.originalStart = this.eventCopy.start instanceof Temporal.PlainDate ? Temporal.PlainDate.from(this.eventCopy.start.toString()) : Temporal.ZonedDateTime.from(this.eventCopy.start.toString())
    this.originalEnd = this.eventCopy.end instanceof Temporal.PlainDate ? Temporal.PlainDate.from(this.eventCopy.end.toString()) : Temporal.ZonedDateTime.from(this.eventCopy.end.toString())
    this.rangeStartDate = Temporal.PlainDate.from(
      (this.$app.calendarState.range.value as DateRange).start
    )
    this.rangeEndDate = Temporal.PlainDate.from(
      addDays(
        this.rangeStartDate,
        $app.config.weekOptions.value.nDays - 1
      )
    )
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
    const { clientX } = getEventCoordinates(uiEvent)
    const pixelDiffX = clientX - this.startX
    let currentDaysDiff = Math.round(pixelDiffX / this.dayWidth)
    if (this.$app.config.direction === 'rtl') currentDaysDiff *= -1

    if (currentDaysDiff === this.lastDaysDiff) return

    const newStart = addDays(this.originalStart, currentDaysDiff)
    const newStartDate = Temporal.PlainDate.from(newStart).toString()
    const newEnd = addDays(this.originalEnd, currentDaysDiff)
    const newEndDate = Temporal.PlainDate.from(newEnd).toString()

    if (newStartDate > this.rangeEndDate.toString()) return
    if (newEndDate < this.rangeStartDate.toString()) return

    this.eventCopy.start = newStart
    this.eventCopy.end = newEnd
    const newStartIsInWeek =
      newStart.toString() >= this.rangeStartDate.toString() && newStart.toString() <= this.rangeEndDate.toString()
    const firstDateInGrid = newStartIsInWeek
      ? newStart.toString()
      : this.rangeStartDate
    const lastDateIsInGrid =
      newEnd.toString() >= this.rangeStartDate.toString() && newEnd.toString() <= this.rangeEndDate.toString()
    const lastDateInGrid = lastDateIsInGrid ? newEnd.toString() : this.rangeEndDate.toString()
    this.eventCopy._nDaysInGrid =
      Math.round(
        (Temporal.PlainDate.from(firstDateInGrid).until(Temporal.PlainDate.from(lastDateInGrid)).total('days'))
      ) + 1

    /**
     * Transitioning the position sideways is not necessary as long as the start date is earlier than the first date in the grid.
     * While moving an event during a state as such, it will optically look as if its position is transitioned, since the event width is increased and decreased
     * as the event is moved.
     * */
    if (newStart.toString() >= this.rangeStartDate.toString())
      this.transformEventCopyPosition(newStart.toString())
    this.updateCopy(this.eventCopy)
    this.lastDaysDiff = currentDaysDiff
  }

  private transformEventCopyPosition(newStartDate: string) {
    const originalStartDate = this.originalStart.toString()
    const originalStartInGrid = originalStartDate >= this.rangeStartDate.toString()
      ? originalStartDate
      : this.rangeStartDate.toString()
    
    let daysToShift = Math.round(
      Temporal.PlainDate.from(originalStartInGrid).until(Temporal.PlainDate.from(newStartDate)).total('days')
    )

    if (this.$app.config.direction === 'rtl') daysToShift *= -1
    getDateGridEventCopy(this.$app, this.eventCopy).style.transform =
      `translateX(calc(${daysToShift * this.dayWidth}px + ${daysToShift}px))`
  }

  private handleMouseUpOrTouchEnd = async () => {
    document.removeEventListener('mousemove', this.handleMouseOrTouchMove)
    document.removeEventListener('touchmove', this.handleMouseOrTouchMove)

    const shouldAbort = await testIfShouldAbort(
      this.$app,
      this.eventCopy,
      this.originalStart,
      this.originalEnd,
      this.updateCopy
    )
    if (shouldAbort) return

    this.updateOriginalEvent()

    setTimeout(() => {
      this.updateCopy(undefined)
    }, 10) // Timeout needed to prevent the original from being displayed for a split second, before being removed from DOM.
  }

  private updateOriginalEvent() {
    if (this.lastDaysDiff === 0) return

    updateDraggedEvent(this.$app, this.eventCopy, this.originalStart)
  }
}
