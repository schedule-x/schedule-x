import MonthGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/month-grid-drag-handler.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { calculateDaysDifference } from './utils/stateless/days-difference'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { deepCloneEvent } from '@schedule-x/calendar/src/utils/stateless/events/deep-clone-event'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { replaceOriginalWithCopy } from './utils/stateless/replace-original-with-copy'

export default class MonthGridDragHandlerImpl implements MonthGridDragHandler {
  private allDayElements: NodeListOf<HTMLDivElement>
  private currentDragoverDate: string | undefined
  private eventNDays: number

  constructor(
    private calendarEvent: CalendarEventInternal,
    private $app: CalendarAppSingleton
  ) {
    this.allDayElements = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelectorAll('.sx__month-day') as NodeListOf<HTMLDivElement>
    this.eventNDays =
      calculateDaysDifference(
        this.calendarEvent.time.start,
        this.calendarEvent.time.end
      ) + 1
    this.init()
  }

  private init() {
    document.addEventListener('dragend', this.handleDragEnd, { once: true })
    this.allDayElements.forEach((el) => {
      el.addEventListener('dragover', this.handleDragOver)
    })
    this.toggleCalendarEventPointerEvents('none')
  }

  private handleDragOver = (e: MouseEvent) => {
    e.preventDefault()
    let dayElement: HTMLDivElement = e.target as HTMLDivElement
    if (
      !(dayElement instanceof HTMLDivElement) ||
      !dayElement.classList.contains('sx__month-day')
    )
      dayElement = (e.target as Element).closest(
        '.sx__month-day'
      ) as HTMLDivElement

    if (this.currentDragoverDate === dayElement.dataset.date) return

    this.currentDragoverDate = dayElement.dataset.date as string
    const newEndDate = addDays(this.currentDragoverDate, this.eventNDays - 1)

    this.allDayElements.forEach((el) => {
      const dayElementDate = el.dataset.date as string
      if (
        dayElementDate >= (this.currentDragoverDate as string) &&
        dayElementDate <= newEndDate
      ) {
        el.classList.add('sx__month-day--dragover')
      } else {
        el.classList.remove('sx__month-day--dragover')
      }
    })
  }

  private handleDragEnd = (e: MouseEvent) => {
    this.allDayElements.forEach((el) => {
      el.removeEventListener('dragover', this.handleDragOver)
      el.classList.remove('sx__month-day--dragover')
    })
    this.toggleCalendarEventPointerEvents('auto')
    this.updateCalendarEvent()
  }

  private toggleCalendarEventPointerEvents = (
    pointerEvents: 'auto' | 'none'
  ) => {
    ;(
      this.$app.elements.calendarWrapper?.querySelectorAll(
        '.sx__event'
      ) as NodeListOf<HTMLDivElement>
    ).forEach((el) => {
      if (el.dataset.id === this.calendarEvent.id) return

      el.style.pointerEvents = pointerEvents
    })
  }

  private updateCalendarEvent = () => {
    const eventCopy = deepCloneEvent(this.calendarEvent, this.$app)
    const diffOldDateAndNewDate = calculateDaysDifference(
      dateFromDateTime(this.calendarEvent.time.start),
      dateFromDateTime(this.currentDragoverDate as string)
    )
    eventCopy.time.start = addDays(eventCopy.time.start, diffOldDateAndNewDate)
    eventCopy.time.end = addDays(eventCopy.time.end, diffOldDateAndNewDate)
    replaceOriginalWithCopy(this.$app, eventCopy)
  }
}
