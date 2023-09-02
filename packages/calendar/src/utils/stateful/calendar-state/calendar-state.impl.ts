import CalendarState from './calendar-state.interface'
import { signal } from '@preact/signals'
import { ViewName } from '../../../types/view-name'
import { DateRange } from '../../../types/date-range'
import CalendarConfigInternal from '../config/calendar-config'
import { InternalViewName } from '../../../enums/internal-view.enum'
import {
  toIntegers,
  toJSDate,
} from '../../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import { toDateTimeString } from '../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits
): CalendarState => {
  const view = signal<ViewName>(calendarConfig.defaultView)
  const range = signal<DateRange | null>(null)

  const handleDateSelection = (date: string) => {
    if (view.value === InternalViewName.Week) {
      const weekForDate = timeUnitsImpl.getWeekFor(toJSDate(date))
      const newRangeStart = toDateTimeString(weekForDate[0])
      const newRangeEnd = toDateTimeString(weekForDate[weekForDate.length - 1])
      range.value = {
        start: newRangeStart,
        end: newRangeEnd,
      }
    }

    if (view.value === InternalViewName.Month) {
      const { year, month } = toIntegers(date)
      const monthForDate = timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
        year,
        month
      )
      const newRangeStart = toDateTimeString(monthForDate[0][0])
      const newRangeEnd = toDateTimeString(
        monthForDate[monthForDate.length - 1][
          monthForDate[monthForDate.length - 1].length - 1
        ]
      )
      range.value = {
        start: newRangeStart,
        end: newRangeEnd,
      }
    }

    if (view.value === InternalViewName.Day) {
      const newRangeStart = date
      const newRangeEnd = date
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
