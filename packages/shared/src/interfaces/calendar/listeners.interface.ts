import CalendarEventExternal from './calendar-event.interface'
import { DateRange } from '../../types/date-range'
import CalendarAppSingleton from './calendar-app-singleton'

export interface CalendarCallbacks {
  onEventClick?: (event: CalendarEventExternal) => void
  onDoubleClickEvent?: (event: CalendarEventExternal) => void
  onRangeUpdate?: (range: DateRange) => void
  onSelectedDateUpdate?: (date: string) => void
  onClickDate?: (date: string) => void
  onDoubleClickDate?: (date: string) => void
  onClickDateTime?: (dateTime: string) => void
  onDoubleClickDateTime?: (dateTime: string) => void
  onClickAgendaDate?: (date: string) => void
  onDoubleClickAgendaDate?: (date: string) => void
  onClickPlusEvents?: (date: string) => void

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
