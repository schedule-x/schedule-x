import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { signal } from '@preact/signals'
import { ViewName } from '../../../types/view-name'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { View } from '../../../types/view'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits
): CalendarState => {
  const view = signal<ViewName>(
    calendarConfig.views.find(
      (view) => view.name === calendarConfig.defaultView
    )?.name || calendarConfig.views[0].name
  )
  const range = signal<DateRange | null>(null)

  const handleDateSelection = (date: string) => {
    const selectedView = calendarConfig.views.find(
      (availableView) => availableView.name === view.value
    )
    ;(selectedView as View).setDateRange({
      calendarConfig,
      date,
      range,
      timeUnitsImpl,
    })
  }

  const isCalendarSmall = signal<boolean | undefined>(undefined)

  return {
    view,
    handleDateSelection,
    range,
    isCalendarSmall,
  }
}
