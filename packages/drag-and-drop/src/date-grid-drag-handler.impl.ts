/* eslint-disable max-lines */
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

const MS_PER_DAY = 1000 * 60 * 60 * 24

export default class DateGridDragHandlerImpl implements DateGridDragHandler {
  private readonly startX: number
  private readonly dayWidth: number
  private readonly originalStart: string
  private readonly originalEnd: string
  private readonly rangeStartDate: string
  private readonly rangeEndDate: string
  private lastDaysDiff = 0
  private ctrlKeyPressed = false // ctrl key pressed
  private dateGridElement: HTMLDivElement // date grid element
  private maxGridRow = 0 // max grid row to place the event copy
  private currenteventCopyGridRow = '0' // current event copy grid row
  private eventCopyElement: HTMLElement | null

  constructor(
    private $app: CalendarAppSingleton,
    eventCoordinates: EventCoordinates,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ) {
    this.startX = eventCoordinates.clientX
    this.dayWidth = getTimeGridDayWidth(this.$app)
    this.originalStart = this.eventCopy.start
    this.originalEnd = this.eventCopy.end
    this.rangeStartDate = dateFromDateTime(
      (this.$app.calendarState.range.value as DateRange).start
    )
    this.rangeEndDate = addDays(
      this.rangeStartDate,
      $app.config.weekOptions.value.nDays - 1
    )
    this.dateGridElement = (
      this.$app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__date-grid') as HTMLDivElement // HTML element of the date grid

    this.eventCopyElement = (
      this.$app.elements.calendarWrapper as HTMLElement
    ).querySelector(`[data-event-id="${this.eventCopy.id}"]`) // HTML element of the event copy
    this.init()
  }

  private init() {
    // determine the max grid row of the date grid
    ;(
      (this.$app.elements.calendarWrapper as HTMLElement).querySelectorAll(
        '.sx__date-grid-cell'
      ) as NodeListOf<HTMLDivElement>
    ).forEach((el) => {
      if (parseInt(el.style.gridRow) > this.maxGridRow) {
        this.maxGridRow = parseInt(el.style.gridRow)
      }
    })

    this.maxGridRow++

    // set the cursor to move
    this.dateGridElement.style.cursor = 'move'

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

    // store the current grid row of the event copy
    this.currenteventCopyGridRow = (
      (this.$app.elements.calendarWrapper as HTMLElement).querySelector(
        `[data-event-id="${this.eventCopy.id}"]`
      ) as HTMLElement
    ).style.gridRow

    // move the event copy to the max grid row
    ;(
      (this.$app.elements.calendarWrapper as HTMLElement).querySelector(
        `[data-event-id="${this.eventCopy.id}"]`
      ) as HTMLElement
    ).style.gridRow = this.maxGridRow.toString()
  }

  private handleMouseOrTouchMove = (uiEvent: MouseEvent | TouchEvent) => {
    // if the ctrl key is pressed, set the cursor to copy and display the event copy
    this.ctrlKeyPressed = uiEvent.ctrlKey
    if (this.dateGridElement)
      if (this.ctrlKeyPressed) {
        this.dateGridElement.style.cursor = 'copy'
        if (this.eventCopyElement) {
          this.eventCopyElement.style.display = 'block'
        }
      } else {
        this.dateGridElement.style.cursor = 'move'
        if (this.eventCopyElement) {
          this.eventCopyElement.style.display = 'none'
        }
      }

    const { clientX } = getEventCoordinates(uiEvent)
    const pixelDiffX = clientX - this.startX
    const currentDaysDiff = Math.round(pixelDiffX / this.dayWidth)
    if (currentDaysDiff === this.lastDaysDiff) return

    const newStart = addDays(this.originalStart, currentDaysDiff)
    const newEnd = addDays(this.originalEnd, currentDaysDiff)
    const newStartDate = dateFromDateTime(newStart)
    const newEndDate = dateFromDateTime(newEnd)
    if (newStartDate > this.rangeEndDate) return
    if (newEndDate < this.rangeStartDate) return

    this.eventCopy.start = newStart
    this.eventCopy.end = newEnd
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
    getDateGridEventCopy(this.$app, this.eventCopy).style.transform =
      `translateX(calc(${daysToShift * this.dayWidth}px + ${daysToShift}px))`
  }

  private handleMouseUpOrTouchEnd = () => {
    document.removeEventListener('mousemove', this.handleMouseOrTouchMove)
    document.removeEventListener('touchmove', this.handleMouseOrTouchMove)
    this.dateGridElement.style.cursor = 'auto' // set the cursor to auto
    ;(
      (this.$app.elements.calendarWrapper as HTMLElement).querySelector(
        `[data-event-id="${this.eventCopy.id}"]`
      ) as HTMLElement
    ).style.gridRow = this.currenteventCopyGridRow //set back the event copy to its original grid row

    this.updateOriginalEvent()
    setTimeout(() => {
      this.updateCopy(undefined)
    }, 10) // Timeout needed to prevent the original from being displayed for a split second, before being removed from DOM.
  }

  private updateOriginalEvent() {
    if (this.lastDaysDiff === 0) return
    updateDraggedEvent(
      this.$app,
      this.eventCopy,
      this.originalStart,
      this.ctrlKeyPressed // to determine if the event should be copied or moved
    )
  }
}
