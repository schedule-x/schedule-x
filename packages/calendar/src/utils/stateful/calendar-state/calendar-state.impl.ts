import CalendarState from './calendar-state.interface'
import { Signal, signal } from '@preact/signals'
import { ViewName } from '../../../types/view-name'
import { DateRange } from '../../../types/date-range'
import CalendarConfigInternal from '../config/calendar-config'
import { InternalViewName } from '../../../enums/internal-view.enum'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import {
  setRangeForDay,
  setRangeForMonth,
  setRangeForWeek,
} from '../../stateless/time/range/set-range'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits
): CalendarState => {
  const view = signal<ViewName>(calendarConfig.defaultView)
  const range = signal<DateRange | null>(null)

  const handleDateSelection = (date: string) => {
    if (view.value === InternalViewName.Week) {
      setRangeForWeek(date, timeUnitsImpl, calendarConfig, range)
    }

    if (view.value === InternalViewName.Month) {
      setRangeForMonth(date, timeUnitsImpl, range)
    }

    if (view.value === InternalViewName.Day) {
      setRangeForDay(date, calendarConfig, range)
    }
  }

  return {
    view,
    handleDateSelection,
    range,
  }
}
