import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { CalendarConfigExternal } from '@schedule-x/shared/src'


export const createDateSelectionCallback = (
  calendarState: CalendarState,
  config: CalendarConfigExternal
) => {
  let lastEmittedDate: Temporal.PlainDate | null = null

  return (date: Temporal.PlainDate) => {
    calendarState.setRange(date)
    if (config.callbacks?.onSelectedDateUpdate && date.toString() !== lastEmittedDate?.toString()) {
      lastEmittedDate = date
      config.callbacks.onSelectedDateUpdate(date)
    }
  }
}
