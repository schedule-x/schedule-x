import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { CalendarConfigExternal } from '@schedule-x/shared/src'

export const createDateSelectionCallback = (
  calendarState: CalendarState,
  config: CalendarConfigExternal
) => {
  let lastEmittedDate: string | null = null

  return (date: string) => {
    calendarState.setRange(date)
    if (config.callbacks?.onSelectedDateUpdate && date !== lastEmittedDate) {
      lastEmittedDate = date
      config.callbacks.onSelectedDateUpdate(date)
    }
  }
}
