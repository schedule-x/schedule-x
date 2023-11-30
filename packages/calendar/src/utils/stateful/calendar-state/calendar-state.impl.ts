import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { effect, signal } from '@preact/signals'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import EventColors from '../event-colors/event-colors'

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
  const isDark = signal<boolean>(calendarConfig.isDark || false)

  effect(() => {
    const eventColors = new EventColors(calendarConfig)
    if (isDark.value) {
      eventColors.setDark()
    } else {
      eventColors.setLight()
    }
  })

  return {
    isDark,
    view,
    handleDateSelection,
    range,
    isCalendarSmall,
  }
}
