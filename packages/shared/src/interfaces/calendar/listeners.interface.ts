import CalendarEventExternal from './calendar-event.interface'
import { DateRange } from '../../types/date-range'
import CalendarAppSingleton from './calendar-app-singleton'

export interface CalendarCallbacks {
  onEventClick?: (event: CalendarEventExternal, e: UIEvent) => void
  onDoubleClickEvent?: (event: CalendarEventExternal, e: UIEvent) => void
  onRangeUpdate?: (range: DateRange) => void
  onSelectedDateUpdate?: (date: string) => void
  onClickDate?: (date: string, e?: UIEvent) => void
  onDoubleClickDate?: (date: string, e?: UIEvent) => void
  onClickDateTime?: (dateTime: string, e?: UIEvent) => void
  onDoubleClickDateTime?: (dateTime: string, e?: UIEvent) => void
  onClickAgendaDate?: (date: string, e?: UIEvent) => void
  onDoubleClickAgendaDate?: (date: string, e?: UIEvent) => void
  onClickPlusEvents?: (date: string, e?: UIEvent) => void
  onMouseDownDateTime?: (dateTime: string, mouseDownEvent: MouseEvent) => void
  onMouseDownDateGridDate?: (date: string, mouseDownEvent: MouseEvent) => void
  onMouseDownMonthGridDate?: (date: string, mouseDownEvent: MouseEvent) => void
  onScrollDayIntoView?: (date: string) => void

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
