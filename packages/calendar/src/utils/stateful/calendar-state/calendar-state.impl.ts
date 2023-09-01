import CalendarState from './calendar-state.interface'
import { signal } from '@preact/signals'
import { View } from '../../../types/view'
import { DateRange } from '../../../types/date-range'
import CalendarConfigInternal from '../config/calendar-config'
import { InternalView } from '../../../enums/internal-view.enum'
import { toJSDate } from '../../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import { toDateTimeString } from '../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits
): CalendarState => {
  const view = signal<View>(calendarConfig.defaultView)
  const range = signal<DateRange | null>(null)

  const handleDateSelection = (date: string) => {
    if (view.value === InternalView.Week) {
      const weekForDate = timeUnitsImpl.getWeekFor(toJSDate(date))
      const newRangeStart = toDateTimeString(weekForDate[0])
      const newRangeEnd = toDateTimeString(weekForDate[weekForDate.length - 1])
      range.value = {
        start: newRangeStart,
        end: newRangeEnd,
      }
    }
  }

  return {
    view,
    handleDateSelection,
    range,
  }
}
