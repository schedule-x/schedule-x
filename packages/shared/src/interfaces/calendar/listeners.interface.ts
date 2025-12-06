import CalendarEventExternal from './calendar-event.interface'
import { DateRange } from '../../types/date-range'
import CalendarAppSingleton from './calendar-app-singleton'

export interface CalendarCallbacks {
  onEventClick?: (event: CalendarEventExternal, e: UIEvent) => void
  onDoubleClickEvent?: (event: CalendarEventExternal, e: UIEvent) => void
  onRangeUpdate?: (range: DateRange) => void
  /**
   * Fetch events for the given date range.
   * This callback is called every time onRangeUpdate runs, and also once on render.
   * The returned events will be converted to internal events and set as $app.calendarEvents.list.value
   *
   * @param range The date range to fetch events for
   * @returns Promise resolving to an array of calendar events
   * */
  fetchEvents?: (range: DateRange) => Promise<CalendarEventExternal[]>
  onSelectedDateUpdate?: (date: Temporal.PlainDate) => void
  onClickDate?: (date: Temporal.PlainDate, e?: UIEvent) => void
  onDoubleClickDate?: (date: Temporal.PlainDate, e?: UIEvent) => void
  onClickDateTime?: (dateTime: Temporal.ZonedDateTime, e?: UIEvent) => void
  onDoubleClickDateTime?: (
    dateTime: Temporal.ZonedDateTime,
    e?: UIEvent
  ) => void
  onClickAgendaDate?: (date: Temporal.PlainDate, e?: UIEvent) => void
  onDoubleClickAgendaDate?: (date: Temporal.PlainDate, e?: UIEvent) => void
  onClickPlusEvents?: (date: Temporal.PlainDate, e?: UIEvent) => void
  onMouseDownDateTime?: (
    dateTime: Temporal.ZonedDateTime,
    mouseDownEvent: MouseEvent
  ) => void
  onMouseDownDateGridDate?: (
    date: Temporal.PlainDate,
    mouseDownEvent: MouseEvent
  ) => void
  onMouseDownMonthGridDate?: (
    date: Temporal.PlainDate,
    mouseDownEvent: MouseEvent
  ) => void
  onScrollDayIntoView?: (date: Temporal.PlainDate) => void

  /**
   * Run a validator function before updating an event.
   * Return false to prevent the event from being updated.
   * Return true to allow the event to be updated.
   *
   * @param oldEvent The event before the update
   * @param newEvent The event after the update
   * @param $app The calendar app singleton
   * */
  onBeforeEventUpdate?: (
    oldEvent: CalendarEventExternal,
    newEvent: CalendarEventExternal,
    $app: CalendarAppSingleton
  ) => boolean

  // see docs for onBeforeEventUpdate
  onBeforeEventUpdateAsync?: (
    oldEvent: CalendarEventExternal,
    newEvent: CalendarEventExternal,
    $app: CalendarAppSingleton
  ) => Promise<boolean>

  /**
   * Receive the updated event after it has been updated by for example drag & drop, resize or the interactive event modal.
   *
   * @param event The updated event
   * */
  onEventUpdate?: (event: CalendarEventExternal) => void

  beforeRender?: ($app: CalendarAppSingleton) => void
  onRender?: ($app: CalendarAppSingleton) => void

  isCalendarSmall?: ($app: CalendarAppSingleton) => boolean
}
