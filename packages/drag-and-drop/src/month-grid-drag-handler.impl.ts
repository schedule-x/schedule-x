import MonthGridDragHandler from '@schedule-x/shared/src/interfaces/drag-and-drop/month-grid-drag-handler.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { updateDraggedEvent } from './utils/stateless/update-dragged-event'
import { testIfShouldAbort } from './utils/stateless/test-if-should-abort'

export default class MonthGridDragHandlerImpl implements MonthGridDragHandler {
  private allDayElements: NodeListOf<HTMLDivElement>
  private currentDragoverDate: string | undefined
  private eventNDays: number
  private readonly originalStart: Temporal.ZonedDateTime | Temporal.PlainDate
  private readonly originalEnd: Temporal.ZonedDateTime | Temporal.PlainDate

  private readonly MONTH_DAY_CLASS_NAME = 'sx__month-grid-day'
  private readonly MONTH_DAY_SELECTOR = `.${this.MONTH_DAY_CLASS_NAME}`
  private readonly DAY_DRAGOVER_CLASS_NAME = 'sx__month-grid-day--dragover'

  constructor(
    private calendarEvent: CalendarEventInternal,
    private $app: CalendarAppSingleton
  ) {
    this.originalStart = this.calendarEvent.start
    this.originalEnd = this.calendarEvent.end
    this.allDayElements = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelectorAll(this.MONTH_DAY_SELECTOR) as NodeListOf<HTMLDivElement>
    this.eventNDays =
      calculateDaysDifference(
        this.calendarEvent.start,
        this.calendarEvent.end
      ) + 1
    this.init()
  }

  private init() {
    document.addEventListener('dragend', this.handleDragEnd, { once: true })
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
    this.allDayElements.forEach((el) => {
      el.addEventListener('dragover', this.handleDragOver)
    })
    this.setCalendarEventPointerEventsTo('none')
  }

  private handleDragOver = (e: MouseEvent) => {
    e.preventDefault()
    let dayElement: HTMLDivElement = e.target as HTMLDivElement
    if (
      !(dayElement instanceof HTMLDivElement) ||
      !dayElement.classList.contains(this.MONTH_DAY_CLASS_NAME)
    )
      dayElement = (e.target as Element).closest(
        this.MONTH_DAY_SELECTOR
      ) as HTMLDivElement

    if (this.currentDragoverDate === dayElement.dataset.date) return

    this.currentDragoverDate = dayElement.dataset.date as string
    const newEndDate = addDays(
      Temporal.PlainDate.from(this.currentDragoverDate),
      this.eventNDays - 1
    )

    this.allDayElements.forEach((el) => {
      const dayElementDate = el.dataset.date as string
      if (
        dayElementDate >= (this.currentDragoverDate as string) &&
        dayElementDate <= newEndDate.toString()
      ) {
        el.classList.add(this.DAY_DRAGOVER_CLASS_NAME)
      } else {
        el.classList.remove(this.DAY_DRAGOVER_CLASS_NAME)
      }
    })
  }

  private handleDragEnd = async () => {
    document.removeEventListener('mouseup', this.handleMouseUp)
    this.allDayElements.forEach((el) => {
      el.removeEventListener('dragover', this.handleDragOver)
      el.classList.remove(this.DAY_DRAGOVER_CLASS_NAME)
    })
    this.setCalendarEventPointerEventsTo('auto')

    const updatedEvent = this.createUpdatedEvent()

    const shouldAbort = await testIfShouldAbort(
      this.$app,
      updatedEvent,
      this.originalStart,
      this.originalEnd
    )

    if (shouldAbort) return

    this.updateCalendarEvent(updatedEvent)
  }

  private handleMouseUp = async () => {
    document.removeEventListener('dragend', this.handleDragEnd)
    this.setCalendarEventPointerEventsTo('auto')
  }

  private setCalendarEventPointerEventsTo = (
    pointerEvents: 'auto' | 'none'
  ) => {
    ;(
      this.$app.elements.calendarWrapper?.querySelectorAll(
        '.sx__event'
      ) as NodeListOf<HTMLDivElement>
    ).forEach((el) => {
      if (String(el.dataset.eventId) === String(this.calendarEvent.id)) return

      el.style.pointerEvents = pointerEvents
    })
  }

  private createUpdatedEvent = (): CalendarEventInternal => {
    const eventCopy = deepCloneEvent(this.calendarEvent, this.$app)
    const diffOldDateAndNewDate = calculateDaysDifference(
      Temporal.PlainDate.from(this.calendarEvent.start),
      Temporal.PlainDate.from(this.currentDragoverDate as string)
    )
    eventCopy.start = addDays(eventCopy.start, diffOldDateAndNewDate)
    eventCopy.end = addDays(eventCopy.end, diffOldDateAndNewDate)

    return eventCopy
  }

  private updateCalendarEvent = (newEvent: CalendarEventInternal) => {
    updateDraggedEvent(this.$app, newEvent, this.originalStart)
  }
}
